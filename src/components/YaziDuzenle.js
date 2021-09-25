import React,{useEffect, useState} from "react";
import { api } from "../api";
import YaziFormu from './YaziFormu';


const YaziDuzenle=(props)=>{

    const[yazi,setYazi]=useState({});
    const {id}=props.match.params;

    useEffect(() => {        
      api().get(`/posts/${id}`)
      .then((response)=>{
         // setYazi(response.data); bu şekilde tüm datayı degil sadece başlıgı ve content'i gönderecegiz
         setYazi({title:response.data.title,content:response.data.content});
      })
    }, [])

    return (
        <>
            <h1>Yazı Düzenleme Formu</h1>
            <YaziFormu yazi={yazi} />
       </>
    )
}

export default YaziDuzenle;