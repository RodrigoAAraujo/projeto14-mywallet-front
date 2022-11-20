import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../API/user"
import { Black, Gray, LightGray, StrongGreen, StrongRed, White } from "../Settings/colors"
import { BackEndServer_Wallet } from "../Settings/urls"

export default function WalletHistory({ history }) {

    const total = 0

    return (
        <WalletStyle empty={history.length}>
            {history.length === 0 ?
                <h2>
                    No history or movimentation yet
                </h2> :
                <>
                    <ul>
                        {history.map((a, index) => <Action
                            action={a}
                            key={index}
                        />)}
                    </ul>
                    <footer>
                        <span>BALANCE</span>
                        <p>{total}</p>
                    </footer>
                </>
            }
        </WalletStyle>
    )
}

function Action({action}) {
    const{_id, date, description, value, type} = action

    const {user}= useContext(UserContext)
    const navigate = useNavigate()

    function deleteItem(){
        axios.delete(`${BackEndServer_Wallet}/${_id}`, {headers: {Authorization: `Bearer ${user.token}`, User: user.email}})
            .then(res =>{
                navigate("/")
            })
            .catch(err =>{
                if(err.response.status === 401){
                    localStorage.removeItem("user")
                    navigate("/")
                }
            })
    }

    return (
        <ActionStyle type={type}>
            <div>
                <h4>{date}</h4>
                <h3 onClick={() => navigate(`/${user.name}/wallet/edit/${type}/${_id}`)}>{description}</h3>
            </div>
            <div>
                <p>{value}</p>
                <ion-icon name="close-outline" onClick={() => deleteItem()}></ion-icon>
            </div>
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
    padding: 10px 15px;
    margin-bottom: 14px;
    
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    font-weight: 400;

    display: ${props => props.empty ? "flex" : "block"};


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
    justify-content: space-between;

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
        color: ${props => props.type == "loss"? `${StrongRed}`: `${StrongGreen}`}
    }

    
`