import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay } from './styles';
import { X } from 'phosphor-react';

export function NewTransactionModal(){
    return (
        <Dialog.Portal> {/* Portal- para brir em outro lugar, outro componente */}
            <Overlay/>  {/* fundo preto  */}
            <Content>
                    <Dialog.Title> Nova Transação </Dialog.Title>
                    <CloseButton>
                        <X/>
                    </CloseButton>
                    <form action="">
                        <input type="text" placeholder="Descrição" required/>
                        <input type="number" placeholder="Valor" required/>
                        <input type="text" placeholder="Categoria" required/>

                        <button type="submit">
                            Cadastrar
                        </button>
                    </form>
                   
            </Content>
        </Dialog.Portal>
    )
}