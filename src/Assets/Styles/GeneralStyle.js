import { createGlobalStyle } from "styled-components";
import { Black, DarkPurple, Gray, LightPurple, StrongRed, White } from "../../Settings/colors";

const GeneralStyle = createGlobalStyle`
    input{
        width:90%;
        max-width: 500px;
        padding: 12px;
        margin-bottom: 13px;
        border-radius: 5px;
        cursor: text;

        font-family: 'Raleway', sans-serif;
        font-size: 18px;
        font-weight: 300;
        color: ${Black};

        ::placeholder{
            font-size: 20px;
            font-weight: 400;
            color: ${Gray};
        }
    }

    .currency-input{
        font-family: 'Roboto', sans-serif;
    }
    .error{
        ::placeholder{
            color: ${StrongRed};
        }
    }
    
    a{
        cursor: pointer;
        margin: 20px 0px;

        font-family: 'Raleway', sans-serif;
        font-size: 15px;
        font-weight: 700;
        text-decoration: none;
        color: ${White};

        :hover{
            opacity: 0.8;
        }
    }

    button{
        cursor: pointer;

        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        padding: 10px;
        border-radius: 5px;
        background-color: ${LightPurple};
        color: ${White};

        :hover{
            opacity: 0.8;
        }
    }

    .long{
        width:90%;
        max-width: 500px;
        font-size: 20px;

        display: flex;
        justify-content: center;
    }
    .short{
        aspect-ratio: 16/10;
        min-width: 140px;
        width:48%;
        font-size: 17px;

        text-align: left;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        ion-icon{
            font-size: 24px;
        }
    }
    main{
        background-color: ${DarkPurple};
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

`
export default GeneralStyle