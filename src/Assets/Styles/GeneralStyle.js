import { createGlobalStyle } from "styled-components";
import { Black, Gray, LightPurple, White } from "../../Settings/colors";

const GeneralStyle = createGlobalStyle`
    input{
        width:90%;
        max-width: 600px;
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

    a{
        cursor: pointer;
        margin-top: 20px;

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
        max-width: 600px;
        font-size: 20px;
    }
    .short{
        width: 44%;
        text-align: left;
    }

`
export default GeneralStyle