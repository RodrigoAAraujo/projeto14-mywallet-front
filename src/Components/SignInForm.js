import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BackEndServer_SignIn } from "../Settings/urls"


export default function SignInForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    async function SingIn(e){
        e.preventDefault()

        const body = {
            email, 
            password
        }
        console.log(body)
        try{
            await axios.post(BackEndServer_SignIn, body)
            navigate("/wallet")
        }catch(err){

        }
    }

    return(
        <form onSubmit={(e) => SingIn(e)}>
            <input placeholder="E-mail" required type="email"
            value={email} onChange={(e) =>setEmail(e.target.value)}/>

            <input placeholder="Password" required type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button className="long" type="submit">Sign in</button>
            <Link to="/sign-up">First time? Sign up!</Link>
        </form>
    )
}

