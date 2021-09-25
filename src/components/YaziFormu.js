import { api } from "../api";
import React,{useState,useEffect} from "react";
import { withRouter } from "react-router"; 

const YaziFormu = (props) => {
//formu post işlemi yorumdan farklı bir şekilde yapıldı.burada form kullanmadık
// bu forma hem yeni yazıEkle formundan veri gelecek hem de yaziDuzenle den
    const [yazi,setYazi]=useState({title:"",content:""});
    const [hata,setHata]=useState("");

    const onInputChange=(event)=>setYazi({...yazi,[event.target.name]:event.target.value});   

    const onFormSubmit=(event)=>{
        event.preventDefault();
        setHata("");
      
        if(props.yazi.title){ // bir yazıyı düzenledigimizde ife girecek 
          api().put(`/posts/${props.match.params.id}`,yazi)
          .then((response)=>{
            console.log(response);
            props.history.push(`/posts/${props.match.params.id}`);// veri güncellenfikten sonra geri gönderiliyor
          }).catch((error)=>{
            setHata("Başlık ve yazı içerigi alanları zorunludur");
          })
        }else{
          api().post(`/posts`,yazi)
          .then(response=>props.history.push('/'))
          .catch(error=>{
              setHata("Başlık ve yazı içerigi alanları zorunludur");
          });
        }

       

    }

    useEffect(() => { //yazi duzenle formundan bir veri gelitrse çalışacak
      if(props.yazi.title && props.yazi.content) setYazi(props.yazi)
    }, [props.yazi])

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
