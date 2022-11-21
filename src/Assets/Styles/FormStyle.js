import styled from "styled-components"
import { White } from "../../Settings/colors"

const FormStyle = styled.main`
    header{
        color:${White};
        display: flex;
        justify-content: space-between;
        width: 90%;
        max-width: 400px;

        font-family: 'Raleway', sans-serif;
        font-size: 26px;
        font-weight: 700;
        margin: 25px 0px;

        ion-icon{
            font-size: 32px;
            cursor: pointer;
        }
    }
    form{
        max-width: 400px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

`

export default FormStyle