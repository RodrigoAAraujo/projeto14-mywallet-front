import { createContext, useState } from "react";

export const LoaderContext = createContext({})

export const LoaderProvider = (props) =>{
    const [load, setLoad] = useState(false)

    return(
        <LoaderContext.Provider value={{load, setLoad}}>
            {props.children}
        </LoaderContext.Provider>
    )
}
