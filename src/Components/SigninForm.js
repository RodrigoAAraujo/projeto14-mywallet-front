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

    function SingIn(e) {
        e.preventDefault()

        const body = {
            email,
            password
        }

        axios.post(BackEndServer_SignIn, body)
            .then((res) => {
                setUser(res)
                localStorage.setItem("user", JSON.stringify(res.data))
                console.log(res.data.name)
                navigate(`/${res.data.name}/wallet`)
            })
            .catch((err) => {
                return null
            })

    }

    return (
        <form onSubmit={(e) => SingIn(e)}>
            <input placeholder="E-mail" required type="email"
                value={email} onChange={(e) => setEmail(e.target.value)} />

            <input placeholder="Password" required type="password"
                value={password} onChange={(e) => setPassword(e.target.value)} />

            <button className="long" type="submit">Sign in</button>
            <Link to="/sign-up">First time? Sign up!</Link>
        </form>
    )
}

