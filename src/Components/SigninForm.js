import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../API/user"
import { BackEndServer_SignIn } from "../Settings/urls"
import { LoaderContext } from "../API/load"
import { ThreeDots } from "react-loader-spinner"
import { White } from "../Settings/colors"


export default function SignInForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const {load, setLoad} = useContext(LoaderContext)

    const [error, setError] = useState("")

    function SingIn(e) {
        e.preventDefault()

        const body = {
            email,
            password
        }
        setLoad(true)

        axios.post(BackEndServer_SignIn, body)
            .then((res) => {
                setUser(res.data)
                setLoad(false)
                localStorage.setItem("user", JSON.stringify(res.data))
                navigate(`/${res.data.name}/wallet`)
            })
            .catch((err) => {
                setEmail("")
                setPassword("")
                setError(err.response.data)
                setLoad(false)
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

            <button className="long" type="submit" disabled={load}>
                {load?
                    <ThreeDots color={White} height="20" width="40" />:
                    `Sign In`
                }
            </button>
            <Link to="/sign-up">First time? Sign up!</Link>
        </form>
    )
}

