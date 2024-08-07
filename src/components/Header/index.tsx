// import { HeaderContainer, HeaderContent,  } from "./styles";
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoimg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from "../NewTransactionModal";

export function Header(){
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoimg} alt="" />

                <Dialog.Root>         
                    <Dialog.Trigger asChild>                   
                        <NewTransactionButton>Nova Transação</NewTransactionButton>
                    </Dialog.Trigger>
                    <NewTransactionModal></NewTransactionModal>
                </Dialog.Root>
            </HeaderContent>        
        </HeaderContainer>
    )
}

{/* <Dialog.Trigger asChild>                   
<NewTransactionButton>Nova Transação</NewTransactionButton>
</Dialog.Trigger> */}