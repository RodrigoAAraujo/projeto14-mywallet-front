import styled from "styled-components"
import {  LightGray, StrongGreen, StrongRed, White } from "../Settings/colors"

export default function PasswordAlert({password, equal, extra, shake, setShake, created}){

    if(shake){
        setTimeout(() => setShake(false), 1000)
    }

    return(
        <PasswordStyle shake={shake}>
            {created?
            <h3> Account Created !!</h3>:
            <>
                <h1>Password requirements:</h1>
                <p className={password.length >= 6? "valid": "invalid"}>Min lehgth: 6</p>
                <p className={password === equal? "valid": "invalid"}> Passwords equal</p>

                <h2>{extra}</h2>
            </>}  
        </PasswordStyle>
    )
}

const PasswordStyle = styled.div`
    background-color: ${White};
    border-radius: 5px;
    width: 90%;
    max-width: 500px;

    font-family: 'Raleway', sans-serif;
    font-size: 18px;
    font-weight: 700;
    padding: 15px;
    margin-bottom: 15px;

    animation: ${props => props.shake? "shake 1s": "null" };

    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }
        
        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }

    p{
        margin:4px 0px
    }
    h1{
        color: ${LightGray};
        margin-bottom: 14px;
    }
    h2{
        margin-top: 10px;
        font-size: 20px;
        font-weight: 700;
        color: ${StrongRed};
    }
    h3{
        font-size: 26px;
        color: ${StrongGreen};
        text-align: center;
        margin:15px 0px
    }
 

    .valid{
        color: ${StrongGreen};
    }
    .invalid{
        color: ${StrongRed};
    }
`