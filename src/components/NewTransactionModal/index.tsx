import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContext } from 'react';


const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type:  z.enum(['income','outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal(){

    const {createTransaction} = useContext(TransactionsContext)

    const { 
        control,
        register,
         handleSubmit,
         formState: { isSubmitting },
         reset
     } =  useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues:{
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        const { description, price, category, type} = data;
        
        await createTransaction({
            description,
            price,
            category,
            type
        })

        reset();
    }
    return (
        <Dialog.Portal> {/* Portal- para brir em outro lugar, outro componente */}
            <Overlay/>  {/* fundo preto  */}
            <Content>
                    <Dialog.Title> Nova Transação </Dialog.Title>
                    <CloseButton>
                        <X/>
                    </CloseButton>
                    <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                        <input 
                        type="text" 
                        placeholder="Descrição" 
                        required
                        {...register('description')}
                        />
                        <input 
                        type="number"
                         placeholder="Valor" 
                         required
                         {...register('price', {valueAsNumber: true})}
                         />
                        <input 
                        type="text" 
                        placeholder="Categoria" 
                        required
                        {...register('category')}
                        />
                        {/* para monitorar o type e retornar o valor dele dinamicamente */}
                        <Controller 
                            control={control}
                            name="type"
                            render={({field})=>{
                                return(
                                    <TransactionType onValueChange={field.onChange} value={field.value}>
                                        <TransactionTypeButton variant="income" value="income">
                                            <ArrowCircleUp size={24}/>
                                            Entrada
                                        </TransactionTypeButton>
                                        <TransactionTypeButton variant="outcome" value="outcome">
                                            <ArrowCircleDown size={24}/>
                                            Saída
                                        </TransactionTypeButton>
                                    </TransactionType>
                                )
                            }}
                        />   

                        <button type="submit" disabled={isSubmitting}>
                            Cadastrar
                        </button>
                    </form>
                   
            </Content>
        </Dialog.Portal>
    )
}