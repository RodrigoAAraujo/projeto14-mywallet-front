import { useNavigate, useParams } from "react-router-dom"
import CurrencyInput from "react-currency-input-field"
import { BackEndServer_Wallet } from "../Settings/urls"
import { UserContext } from "../API/user"
import { useContext, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"
import FormStyle from "../Assets/Styles/FormStyle"
import { LoaderContext } from "../API/load"
import { ThreeDots } from "react-loader-spinner"
import { White } from "../Settings/colors"

export default function EditPage(){
    const{type, id} = useParams()
    const [value, setValue] = useState()
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const {load, setLoad} = useContext(LoaderContext)

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

            setLoad(true)

            axios.put(`${BackEndServer_Wallet}/${id}`, body, {headers: {Authorization: `Bearer ${data.token}`, User: data.email}})
                .then(()=>{
                    setError("")
                    setDescription("")
                    setLoad(false)
                })
                .catch((err) =>{
                    if(err.response.status === 401){
                        localStorage.removeItem("user")
                        navigate("/")
                        setLoad(false)
                    }
                    setError(err.response.data)
                    setDescription("")
                    setLoad(false)
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

                <button className="long" type="submit" disabled={load}>
                    {load?
                        <ThreeDots color={White} height="20" width="40" />:
                        `Save ${type}`
                    }
                </button>
            </form>
        </FormStyle>
    )
}
