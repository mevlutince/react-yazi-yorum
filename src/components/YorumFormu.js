import React,{useState} from "react";

const YORUM_BASALANGIC={
    display_name:"",
    body:""
  }
  

const YorumFormu = (props) => {

    const handleOnChange=event=>{
        setYorum({...yorum,[event.target.name]:event.target.value});
      }
    
    const [yorum,setYorum]=useState(YORUM_BASALANGIC);
  return (
    <React.Fragment>
      <h3>Yorum Yaz</h3>
      <form
        className="ui form"
        onSubmit={(e) => {
          e.preventDefault();
          props.handleSubmit(yorum);
          setYorum(YORUM_BASALANGIC)
        }}
      >
        <div className="ui mini icon input">
          <input
            type="text"
            placeholder="Adınız..."
            onChange={handleOnChange}
            value={yorum.display_name}
            name="display_name"
          />
        </div>
        <textarea
          placeholder="Yorumunuz"
          rows="3"
          onChange={handleOnChange}
          value={yorum.body}
          name="body"
        ></textarea>
        <button className="ui button blue">Gönder</button>
      </form>
    </React.Fragment>
  );
};

export default YorumFormu;