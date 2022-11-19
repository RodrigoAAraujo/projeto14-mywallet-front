import styled from "styled-components";
import SignInForm from "../Components/SigninForm";
import { DarkPurple, White } from "../Settings/colors";

export default function SignInPage() {
    return (
        <SignInPageStyle>
            <header>MyWallet</header>
            <SignInForm />
        </SignInPageStyle>
    )
}

const SignInPageStyle = styled.main`
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