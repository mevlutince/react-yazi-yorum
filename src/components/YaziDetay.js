import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import SilModal from "./SilModal";
import YaziYorumlari from "./YaziYorumlari";

const YaziDetayi = (props) => {
  const { id } = props.match.params;
  const [yaziDetayi, setYaziDetayi] = useState({});
  const [yorumlar, setYorumlar] = useState([]);
  //const [display_name,setDisplay_name]=useState('');
  //const [body,setBody]=useState('');

  const handleCommentSubmit = (yorum) => {
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
    api()
      .post(`/posts/${id}/comments`, yorum)
      .then((response) => {
        setYorumlar([...yorumlar, response.data]);
        //  setYorum(YORUM_BASALANGIC);
      })
      .catch((error) => {
        console.log("hata: ", error);
      });
  };

  useEffect(() => {
    api()
      .get(`/posts/${id}`)
      .then((response) => {
        setYaziDetayi(response.data);
      })
      .catch((error) => {
        console.log("hata: ", error);
      });

    api()
      .get(`/posts/${id}/comments`)
      .then((response) => {
        console.log(response);
        setYorumlar(response.data);
      });
  }, []);

  return (
    <>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      
      <div className="ui buttons">
        <Link className="ui button blue" to={`/posts/${yaziDetayi.id}/edit`}>Düzenle</Link>
        <SilModal yazi={yaziDetayi} push={props.history.push} /> {/* SilMadal'ında silinecek verinin id'si gerekli bu yüzden veriyi gönderiyoruz */}
      </div>
      <p>{yaziDetayi.content}</p>
      <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleCommentSubmit} />
    </>
  );
};

export default YaziDetayi;
