import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../API/user";
import SignUpForm from "../Components/SignUpForm";
import { DarkPurple, White } from "../Settings/colors";

export default function SignUpPage() {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem("user")){
            const data = JSON.parse(localStorage.getItem("user"))
    
            setUser(data)
            navigate(`/${data.name}/wallet`)
        }else{
            navigate("/")
        }
    }, [])


    return (
        <SignUpPageStyle>
            <header>MyWallet</header>
            <SignUpForm/>
        </SignUpPageStyle>
    )
}

const SignUpPageStyle = styled.main`
    background-color: ${DarkPurple};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    header{
        color: ${White};
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        font-weight: 400;
        text-align: center;
        margin-bottom: 27px;
    }
    form{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`