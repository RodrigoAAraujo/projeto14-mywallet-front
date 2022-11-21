import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import CurrencyInput from "react-currency-input-field"
import { BackEndServer_Wallet } from "../Settings/urls"
import { UserContext } from "../API/user"
import { useContext, useState } from "react"
import { White } from "../Settings/colors"
import axios from "axios"
import dayjs from "dayjs"
import FormStyle from "../Assets/Styles/FormStyle"


export default function EditPage(){
    const{type, id} = useParams()
    const [value, setValue] = useState()
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    const [error, setError] = useState("")

    function sendEntry(e){
        e.preventDefault()

        if (localStorage.getItem("user")) {
            const data = JSON.parse(localStorage.getItem("user"))
            setUser(data)

            const body ={
                date: dayjs(Date.now()).format("DD/MM, hh:mm "),
                value: value,
                description: description,
                type: type
            }

            axios.put(`${BackEndServer_Wallet}/${id}`, body, {headers: {Authorization: `Bearer ${data.token}`, User: data.email}})
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
    return(
        <FormStyle>
            <header>
                <h1>New {type}</h1>
                <ion-icon name="log-out-outline" onClick={() => navigate(-1)}></ion-icon>
            </header>

            <form onSubmit={(e) => sendEntry(e)}>
                <CurrencyInput required  placeholder="Value" className="currency-input" decimalsLimit={2} 
                decimalSeparator="." groupSeparator="," prefix={type === "loss"? "-$": "$"} 
                onChange={(e) => setValue(e.target.value)}  
                />

                <input required type="text" placeholder={error.length > 0? error :"Description"} 
                className={error.length > 0? "error" : null} maxLength={50}
                value={description} onChange={(e) => setDescription(e.target.value)} />

                <button className="long" type="submit">Save {type}</button>
            </form>
        </FormStyle>
    )
}
