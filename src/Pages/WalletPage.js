import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../API/user"
import { BackEndServer_LogOut, BackEndServer_Wallet } from "../Settings/urls"
import WalletHistory from "../Components/WalletHistory"
import { useNavigate } from "react-router-dom"
import { White } from "../Settings/colors"

export default function WalletPage() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const [history, setHistory] = useState([])

    const [render, setRender] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const data = JSON.parse(localStorage.getItem("user"))
            setUser(data)
            setRender(false)

            axios.get(BackEndServer_Wallet, { headers: { Authorization: `Bearer ${data.token}`, User: data.email } })
                .then(res => {
                    setHistory(res.data)
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        localStorage.removeItem("user")
                        navigate("/")
                    }
                })

        } else {
            navigate("/")
        }
    }, [render])

    function logOut() {

        axios.post(BackEndServer_LogOut, {}, { headers: { Authorization: `Bearer ${user.token}`, User: user.email } })
            .then(() => {
                localStorage.removeItem("user")
                navigate("/")
            })
            .catch(err => {
                if (err.response.status === 401) {
                    localStorage.removeItem("user")
                    navigate("/")
                } else {
                    navigate("/")
                }
            })
    }

    return (
        <WalletStyle>
            <header>
                <h2>Greeting, {user.name}</h2>
                <ion-icon name="log-out-outline" onClick={() => logOut()}></ion-icon>
            </header>
            
            <WalletHistory history={history} render={setRender} /> :
             
            <footer className="actions">
                <button className="short" onClick={() => navigate(`/${user.name}/wallet/input`)}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <h3>New Income</h3>
                </button>
                <button className="short" onClick={() => navigate(`/${user.name}/wallet/output`)}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <h3>New Outcome</h3>
                </button>
            </footer>
        </WalletStyle>
    )
}

const WalletStyle = styled.main`
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

    .actions{
        width: 90%;
        max-width: 400px;
        display: flex;
        justify-content: space-between;
    }
`