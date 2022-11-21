import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate} from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../API/user"
import { Black, Blue, Gray, LighterGray, LightGray, StrongRed, White } from "../Settings/colors"
import { BackEndServer_Wallet } from "../Settings/urls"
import { LoaderContext } from "../API/load"
import { ThreeDots } from "react-loader-spinner"

export default function WalletHistory({ history, render}) {
    let total = 0

    if(history.length> 0){
        const values = history.map((e) => {
            if (e.type === "loss") {
                return -Number(e.value.replace("-$", "").replaceAll(",", "").trim())
            }
            return Number(e.value.replace("$", "").replace(",", "").trim())
        })
        values.forEach((e) => total += e)
    }
   

    return (
        <WalletStyle empty={history.length} color={total}>
            {history.length === 0 ?
                <h2>
                    No history or movimentation yet
                </h2> :
                <>
                    <ul>
                        {history.map((a, index) => <Action
                            action={a}
                            render={render}
                            key={index}
                        />)}
                    </ul>
                    <footer>
                        <span>BALANCE</span>
                        <p>{total.toFixed(2)}</p>
                    </footer>
                </>
            }
        </WalletStyle>
    )
}

function Action({ action, render}) {
    const { _id, date, description, value, type } = action
    const { user } = useContext(UserContext)
    const {load, setLoad} = useContext(LoaderContext)

    const [deleteScreen, setDeleteScreen] = useState(false)

    const navigate = useNavigate()

    function deleteItem() {
        setLoad(true)

        axios.delete(`${BackEndServer_Wallet}/${_id}`, { headers: { Authorization: `Bearer ${user.token}`, User: user.email } })
            .then(() => {
                setLoad(false)
                render(true)
            })
            .catch(() => {
                localStorage.removeItem("user")
                navigate("/")
                setLoad(false)
            })
    }

    return (
        <ActionStyle type={type}>
            <section>
                <div>
                    <h4>{date}</h4>
                    <h3 onClick={() => navigate(`/${user.name}/wallet/edit/${type}/${_id}`)}>{description}</h3>
                </div>
                <div>
                    <p>{value}</p>
                    <ion-icon name="close-outline" onClick={() => setDeleteScreen(true)}></ion-icon>
                </div>
            </section>
          
            {deleteScreen ?
                <DeleteScreen type={type}>
                    <h1> Confirm:</h1>

                    <div>
                        <button className="confirm" onClick={() => deleteItem()} disabled={load} >
                            {load?
                                <ThreeDots color={White} height="16" width="32" />:
                                `Delete`
                            }
                        </button>
                        <button className="back" onClick={() => setDeleteScreen(false)} disabled={load}>
                            {load?
                                <ThreeDots color={White} height="16" width="32" />:
                                `Go Back`
                            }
                        </button>
                    </div>

                </DeleteScreen>
                : null
            }
        </ActionStyle>
    )
}

const WalletStyle = styled.div`
    position: relative;
    border-radius:5px;
    background-color: ${White};
    width: 90%;
    max-width: 400px;
    min-height: 50vh;
    max-height: 70vh;
    padding: 5px 10px;
    margin-bottom: 14px;
    
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    font-weight: 400;

    display: ${props => props.empty === 0 ? "flex" : "block"};
    align-items: center;
    justify-content: center;


    h2{
        font-size: 20px;
        color: ${Gray};
        text-align: center;
    }

    footer{
        padding: 20px 15px;
        position: absolute;
        bottom: 0px; left: 0px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 3;

        box-shadow: rgba(0,0,0,0.2) 0px -6px 16px 0px;   
        
        font-size: 17px;

        span{
            font-weight: 700;
        }

        p{
            font-weight: 500;
            color: ${props => (props.color > 0) ? `${Blue}` : `${StrongRed}`}
        }
    }

    ul{
        width: 100%;
        overflow-y: scroll;
        margin-bottom: 50px;
        padding-bottom: 5px;
    }
`

const ActionStyle = styled.li`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    section{
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: ${White};
        z-index:3;

        div{
            display: flex;
            align-items: center;

            ion-icon{
                font-size: 20px;
                color: ${LightGray};
                margin-left: 6px;
                cursor: pointer;
            }
        }
        h3{
            color: ${Black};
            cursor: pointer;
        }
        h4{
            color: ${LightGray};
            margin-right: 6px;
        }
        p{
            font-weight: 500;
            color: ${props => props.type === "loss" ? `${StrongRed}` : `${Blue}`}
        }
    }   
`

const DeleteScreen =  styled.div`
    background-color: ${LighterGray};
    padding: 10px 10px 4px;
    margin-top: -6px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    animation: fade 0.5s ease-out;

    @keyframes fade {
        from{
            margin-top: -30px;
        }
        to{
            margin-top: -6px;
        }

    }

    h1{
        font-size: 17px;
        font-weight: 500;
    }

    button{
        padding: 2px 5px;
        border-radius: 15px;
        margin: 0px 3px;
    }
    .confirm{
        background-color: ${props => props.type === "loss"? `${Blue}`: `${StrongRed}` };
    }
    .back{
        background-color: ${props => props.type === "loss"? `${StrongRed}`: `${Blue}` };
    }

`
