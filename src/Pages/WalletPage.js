import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { UserContext } from "../API/user"
import { BackEndServer_Wallet } from "../Settings/urls"
import WalletHistory from "../Components/WalletHistory"
import { useNavigate, useParams } from "react-router-dom"
import { DarkPurple, White } from "../Settings/colors"

export default function WalletPage() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const { name } = useParams()

    const [history, setHistory] = useState([])

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const data = JSON.parse(localStorage.getItem("user"))

            if (data.name !== name) {
                localStorage.removeItem("user")
            }

            setUser(data)
        } else {
            navigate("/")
        }

        async function CatchData() {
            try {
                const promisse = await axios.get(BackEndServer_Wallet, { headers: { Authorization: user.token, User: user.email } })
                setHistory(promisse)
            } catch (err) {
                console.log(err)//Verify token and go back
            }
        }
        CatchData()
    }, [])

    return (
        <WalletStyle>
            <header>
                <h2>Greeting, {user.name}</h2>
                <ion-icon name="log-out-outline"></ion-icon>
            </header>
            <WalletHistory history={history} />
            <footer>
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

    footer{
        width: 90%;
        max-width: 400px;
        display: flex;
        justify-content: space-between;
    }
`