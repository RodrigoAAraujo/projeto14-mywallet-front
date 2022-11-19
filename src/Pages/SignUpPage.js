import styled from "styled-components";
import SignUpForm from "../Components/SignUpForm";
import { DarkPurple, White } from "../Settings/colors";

export default function SignUpPage() {
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