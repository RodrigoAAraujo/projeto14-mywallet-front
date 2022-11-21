import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import CurrencyInput from "react-currency-input-field"
import styled from "styled-components"
import { UserContext } from "../API/user"
import axios from "axios"
import { BackEndServer_Wallet } from "../Settings/urls"
import dayjs from "dayjs"
import { White } from "../Settings/colors"
import FormStyle from "../Assets/Styles/FormStyle"


export default function OutputPage() {
    const [value, setValue] = useState()
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    const [error, setError] = useState("")

    function sendLoss(e){
        e.preventDefault()

        if (localStorage.getItem("user")) {
            const data = JSON.parse(localStorage.getItem("user"))
            setUser(data)

            const body ={
                date: dayjs(Date.now()).format("DD/MM, hh:mm "),
                value: value,
                description: description,
                type: "loss"
            }

            axios.post(BackEndServer_Wallet, body, {headers: {Authorization: data.token, User: data.email}})
                .then(res =>{
                    setError("")
                    setDescription("")
                })
                .catch(err =>{
                    if(err.response.status === 401){
                        localStorage.removeItem("user")
                        navigate("/")
                    }
                    setError(err.response.data)
                    setDescription("")
                })

        }else {
            navigate("/")
        }
    }


    return (
        <FormStyle>
            <header>
                <h1>New Expense</h1>
                <ion-icon name="log-out-outline" onClick={() => navigate(-1)}></ion-icon>
            </header>

            <form onSubmit={(e) => sendLoss(e)}>
                <CurrencyInput required placeholder="Value" className="currency-input"
                decimalsLimit={2} decimalSeparator="." groupSeparator="," prefix="-$"
                onChange={(e) => setValue(e.target.value)} 
                />

                <input required type="text" placeholder={error.length > 0? error :"Description"} 
                className={error.length > 0? "error" : null} maxLength={50}
                value={description} onChange={(e) => setDescription(e.target.value)} />

                <button className="long" type="submit">Save Expense</button>
            </form>
        </FormStyle>
    )
}
