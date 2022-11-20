import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BackEndServer_SignUp } from "../Settings/urls"
import PasswordAlert from "./PasswordAlert"

export default function SignInForm(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const navigate = useNavigate()

    const [shake, setShake] = useState(false)
    const [extraInfo, setExtraInfo] = useState("")
    const [created, setCreated] = useState(false)
    
    function SingUp(e){
        e.preventDefault()

        if(password !== confirm){
            setShake(true)
            return 
        }
        
        const body = {
            name,
            email, 
            password,
        }

        axios.post(BackEndServer_SignUp, body)
            .then((res) => {
                setShake(true)
                setCreated(true)
            })
            .catch((err) => {
                setShake(true)
                setExtraInfo(err.response.data)
            })
    }

    return(
        <form onSubmit={(e) => SingUp(e)}>
            <input placeholder="Name" required type="text" min="3"
            value={name} onChange={(e) =>setName(e.target.value)}/>

            <input placeholder="E-mail" required type="email" 
            value={email} onChange={(e) =>setEmail(e.target.value)}/>
            
            <input placeholder="Password" required type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}/>

            <input placeholder="Confirm Password" required type="password"
            value={confirm} onChange={(e) => {setConfirm(e.target.value)}}/>

            <PasswordAlert password={password} equal={confirm} extra={extraInfo} shake={shake} setShake={setShake} created={created}/>

            <button className="long" type="submit">Sign up</button>
            <Link to="/">Have an account? Sign in</Link>
        </form>
    )
}
