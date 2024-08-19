import {  ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface CreateTransactionInput{
    description: string;
    price: number;
    category: string;
    type: 'income'| 'outcome'
}

interface TransactionContextType{
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
}


interface TransactionsProviderProps{
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({children}: TransactionsProviderProps){
    
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const fetchTransactions = useCallback(async (query?: string)=>{

        const response = await api.get('transactions',{
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query,
            }
        })

        setTransactions(response.data);
    },[])
    // useCallback - evita que uma função seja recriada em memoria sem q nenhuma informação dela tenha mudado
    const  createTransaction = useCallback(async (data: CreateTransactionInput)=>{
        const {description, category, price, type } =  data;
        
        const response = await api.post('transactions',{
            description,
            category,
            price,
            type,
            createdAt: new Date()
        })

        setTransactions(state=>[response.data, ...state]);
    }, [])//2º param - array de dependencias como no userEffect
    //se depender de alguma informação de fora, precisa estar nesse array, 
    //se não o valor da inf estara desatualizado

    useEffect(()=>{       
        fetchTransactions();
    },[])
    
    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransaction
            }}>
            {children}
        </TransactionsContext.Provider>
    )
}