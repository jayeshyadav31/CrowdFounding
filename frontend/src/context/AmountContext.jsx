import { createContext, useContext, useState } from "react";

const AmountContext=createContext()
export const useAmountContext=()=>{
    return useContext(AmountContext)
}
export const AmountContextProvider=({children})=>{
    const [amount,setAmount]=useState();
    return <AmountContext.Provider value={{amount,setAmount}}  >{children}</AmountContext.Provider>
}