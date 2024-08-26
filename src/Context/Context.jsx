import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context=createContext();

const ContextProvider=(props)=>{
    
    const [input, setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [prevPrompts, setPrevPrompts]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading, setLoading]=useState(false);
    const [resultData,setResultData]=useState("");
    const [menuOpen,setMenuOpen]=useState(false);

    const delayPara=(index,nextWord)=>{
        setTimeout(()=>{
            setResultData(prev=>prev+nextWord);
        },75*index)
        
        
    }

    const newChat=()=>{
        setLoading(false);
        setShowResult(false)
    }

    const onSent=async (prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response="";
        if(prompt!==undefined){
            setRecentPrompt(prompt);
            // setPrevPrompts(prev=>[...prev,prompt])
            response=await run(prompt);
        }
        else{
            setRecentPrompt(input);
            setPrevPrompts(prev=>[...prev,input])
            response=await run(input);
        }
        
        let responseArray=response.split("**")
        let newResponse="";
        for(let i=0;i<responseArray.length;i++){
            if(i%2!==1){
                newResponse+=responseArray[i];
            }
            else{
                newResponse+="<b>"+responseArray[i]+"</b>"
            }
        }
       
        const finalResponse=newResponse.replaceAll('*','<br/>');
        let finalResponseArray=finalResponse.split(' ');
        for(let i=0;i<finalResponseArray.length;i++){
            delayPara(i,finalResponseArray[i]+" ");
        }

        // setResultData(final3Response);
        console.log();
        
        console.log(resultData);
        
        setLoading(false);
        setInput("")
    }
    const contextValue={
        onSent,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        menuOpen,
        setMenuOpen,
        newChat

    }
    
    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    )
}
export default ContextProvider