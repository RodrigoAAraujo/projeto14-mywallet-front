import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import CurrencyInput from "react-currency-input-field"
import styled from "styled-components"
import { UserContext } from "../API/user"
import axios from "axios"
import { BackEndServer_Wallet } from "../Settings/urls"
import dayjs from "dayjs"
import { White } from "../Settings/colors"


export default function InputPage() {
    const [value, setValue] = useState()
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    function sendEntry(e){
        e.preventDefault()

        if (localStorage.getItem("user")) {
            const data = JSON.parse(localStorage.getItem("user"))
            setUser(data)

            const body ={
                date: dayjs(Date.now()).format("DD/MM, hh:mm "),
                value: value,
                description: description,
                type: "profit"
            }

            axios.post(BackEndServer_Wallet, body, {headers: {Authorization: `Bearer ${data.token}`, User: data.email}})
                .then(res =>{
                    console.log(res)
                })
                .catch(err =>{
                    if(err.response.status === 401){
                        localStorage.removeItem("user")
                        navigate("/")
                    }
                })

        }else {
            navigate("/")
        }
    }


    return (
        <InputStyle>
            <header>
                <h1>New Entry</h1>
                <ion-icon name="log-out-outline" onClick={() => navigate(-1)}></ion-icon>
            </header>

            <form onSubmit={(e) => sendEntry(e)}>
                <CurrencyInput required  placeholder="Value" className="currency-input"
                decimalsLimit={2} decimalSeparator="." groupSeparator="," prefix="$" allowNegativeValue={false}
                onChange={(e) => setValue(e.target.value)}  
                />

                <input required type="text" placeholder="Decription" maxLength={50}
                value={description} onChange={(e) => setDescription(e.target.value)} />

                <button className="long" type="submit">Save Entry</button>
            </form>
        </InputStyle>
    )
}

const InputStyle = styled.main`
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
    }

`