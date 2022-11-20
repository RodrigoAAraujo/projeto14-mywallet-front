import { useEffect, useState } from "react"
import styled from "styled-components"
import { Gray, White } from "../Settings/colors"

export default function WalletHistory({ history }) {
    const [empty, setEmpty] = useState(true)

    useEffect(() => {
        if (history.length > 0) {
            setEmpty(false)
        }
    }, [])

    const total = 0

    return (
        <WalletStyle empty={empty}>
            {empty ?
                <h2>
                    No history or movimentation yet
                </h2> :
                <>
                    <ul>
                        {history.map((a) => <Action
                            action={a}
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
    const{id, date, title, value} = action

    return (
        <ActionStyle>
            <p>{date}</p>
            <h3>{title}</h3>
            <p>{value}</p>
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
    padding: 10px 15px;
    margin-bottom: 14px;
    
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    font-weight: 400;

    display: ${props => props.empty ? "flex" : "block"};
    justify-content: center;
    align-items: center;


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

        box-shadow: rgba(0,0,0,0.2) 0px -6px 16px 0px;   
        
        font-size: 17px;

        span{
            font-weight: 700;
        }
    }
`

const ActionStyle = styled.li`
`