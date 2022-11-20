import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../API/user"
import { BackEndServer_SignIn } from "../Settings/urls"


export default function SignInForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const [error, setError] = useState("")

    function SingIn(e) {
        e.preventDefault()

        const body = {
            email,
            password
        }

        axios.post(BackEndServer_SignIn, body)
            .then((res) => {
                setUser(res.data)
                localStorage.setItem("user", JSON.stringify(res.data))
                navigate(`/${res.data.name}/wallet`)
            })
            .catch((err) => {
                setError(err.response.data)
                setEmail("")
                setPassword("")
            })

    }

    return (
        <form onSubmit={(e) => SingIn(e)}>
            <input placeholder={error.length > 0? error :"E-mail"} className={error.length > 0? "error" : null} 
            required type="email" value={email} 
            onChange={(e) => {setEmail(e.target.value)}}/>

            <input placeholder={error.length > 0? error :"Password"} className={error.length > 0? "error" : null} 
            required type="password" value={password} 
            onChange={(e) => setPassword(e.target.value)}/>

            <button className="long" type="submit">Sign in</button>
            <Link to="/sign-up">First time? Sign up!</Link>
        </form>
    )
}

