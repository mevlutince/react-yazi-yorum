import React, { useEffect, useState } from "react";
import axios from "axios";
import YaziYorumlari from "./YaziYorumlari";



const YaziDetayi = (props) => {
  const { id } = props.match.params;
  const [yaziDetayi, setYaziDetayi] = useState({});
  const [yorumlar, setYorumlar] = useState([]);
  //const [display_name,setDisplay_name]=useState('');
  //const [body,setBody]=useState('');

  

  const handleCommentSubmit=(yorum)=>{

/* iki metodun tek bie axios ile kullanımı
axios.all([
  axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`),
  axios
  .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)
]).then((response)=>{
  setYaziDetayi(response[0].data);
  setYorumlar(response[0].data);
})
.catch((error) => {
      console.log("hata: ", error);
    });
*/
    axios
    .post(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`,yorum)
    .then((response)=>{
      setYorumlar([...yorumlar,response.data]);
    //  setYorum(YORUM_BASALANGIC);      
    }).catch((error) => {
      console.log("hata: ", error);
    });
  }

  
  useEffect(() => {
    axios
      .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
      .then((response) => {
        setYaziDetayi(response.data);
      })
      .catch((error) => {
        console.log("hata: ", error);
      });

    axios
      .get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)
      .then((response) => {
        console.log(response)
        setYorumlar(response.data);
      });
  }, []);

  return (
    <>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      <p>{yaziDetayi.content}</p>
      <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleCommentSubmit} />
     
    </>
  );
};

export default YaziDetayi;
