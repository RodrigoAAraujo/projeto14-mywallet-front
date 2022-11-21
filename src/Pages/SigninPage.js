import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../API/user";
import SignInForm from "../Components/SigninForm";
import { White } from "../Settings/colors";

export default function SignInPage() {
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
        <SignInPageStyle>
            <header>MyWallet</header>
            <SignInForm />
        </SignInPageStyle>
    )
}

const SignInPageStyle = styled.main`
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
        width: 100%;
    }
`