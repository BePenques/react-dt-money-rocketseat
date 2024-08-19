import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { useMemo } from "react";

export function useSummary(){
    const transactions = useContextSelector(TransactionsContext,(context)=>{
        return context.transactions
    })
/* useMemo - faz a variavel summary só ser recriada em memoria
   se houver mudança na transactions. 
   Antes era criada toda vez que useSummary era renderizado, ou o pai Summary() era renderizado */
    const summary = useMemo(()=>{
        transactions.reduce(
            (acc, transaction)=>{ 

                if(transaction.type == 'income'){
                    acc.income += transaction.price;
                    acc.total += transaction.price;
                  
                }else{
                    acc.outcome += transaction.price;
                    acc.total -= transaction.price;
                }

                return acc;
            },
            {
                income: 0,
                outcome: 0,
                total: 0
            }
        )
    },[transactions])
        
        return summary;
}