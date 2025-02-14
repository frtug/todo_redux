import React, { useEffect, useState } from 'react'
function useCustom(url) {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetch(url);
            const result = await res.json();
            setData(result) 
            setLoading(false)

        }
        fetchData();
    },[url])
    return {data,loading}
}

export default useCustom; 

