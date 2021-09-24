import axios from "axios";
import React,{useState} from "react";
import { withRouter } from "react-router"; 

const YaziFormu = (props) => {
//formu post işlemi yorumdan farklı bir şekilde yapıldı.burada form kullanmadık
    const [yazi,setYazi]=useState({title:"",content:""});

    const onInputChange=(event)=>setYazi({...yazi,[event.target.name]:event.target.value});
    const [hata,setHata]=useState("");

    const onFormSubmit=(event)=>{
        event.preventDefault();
        setHata("");
        axios.post(`https://react-yazi-yorum.herokuapp.com/posts`,yazi)
        .then(response=>props.history.push('/'))
        .catch(error=>{
            setHata("Başlık ve yazı içerigi alanları zorunludur");
        });
    }

    return (
        <React.Fragment>
       { 
        hata &&  <div className="ui error message">
            <div className="header">Action Forbiden</div>
            <p>{hata}</p>
        </div>
        }

    <div className="ui form">
      <div className="field">
        <label>Yazi Başlığı</label>
       
        <input type="text" value={yazi.title} name="title" onChange={onInputChange}/>
      </div>
      <div className="field">
        <label>Yazı İçerigi</label>
        <textarea type="text" rows="3" value={yazi.content} name="content" onChange={onInputChange}></textarea>
      </div>
      <button className="ui button blue" onClick={onFormSubmit}>Gönder</button>
      <button className="ui button ">İptal Et</button>
    </div>
    </React.Fragment>
  );
};

export default withRouter(YaziFormu); //YaziFormunda histoyi yakalayabilmek için ekledik
