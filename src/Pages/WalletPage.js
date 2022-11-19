import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../API/user"
import { BackEndServer_Wallet } from "../Settings/urls"
import WalletHistory from "../Components/WalletHistory"

export default function WalletPage(){
    const user = useContext(UserContext)

    const [history, setHistory] = useState([])

    useEffect(() =>{
        async function CatchData(){
            try{
                const promisse = await axios.get(BackEndServer_Wallet, {headers: {Authorization: user.token}})
                setHistory(promisse)
            }catch(err){
                return err
            }
        }
        CatchData()
    }, [])

    return (
        <WalletStyle>
            <header></header>
            <WalletHistory history={history}/>
        
        
        </WalletStyle>
    )
}

const WalletStyle = styled.main`
`