import React,{useState} from "react";
import YorumFormu from "./YorumFormu";
import YorumListesi from "./YorumListesi";

const YaziYorumlari=(props)=>{
   
    return (
    <React.Fragment>
        <YorumListesi yorumlar={props.yorumlar} />
        <YorumFormu handleSubmit={props.handleSubmit} />
    </React.Fragment>
    )
}


export default YaziYorumlari;