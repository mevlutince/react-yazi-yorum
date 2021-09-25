import React, { useState } from "react";
import {Button,Modal} from "semantic-ui-react";
import { api } from "../api";

const SilModal=({yazi,push})=>{
    
    const [open,setOpen]=useState(false);
    const [hata,setHata]=useState("");
    const show=()=>setOpen(true);
    const close=()=>setOpen(false);

    const handleDelete=(id)=>{
        api().delete(`/posts/${id}`)
        .then(()=>{
            setHata("");
            close();
            push(`/`); //anasayfaya yönlendirecek
        })
        .catch(()=>{
            setHata("Yazi silinirken bir hata oluştu.");
        });
    }

    return(
        <>
        <Button color="red" onClick={show}>Sil</Button>
        <Modal size="mini" open={open} onClose={close}>
        <Modal.Header>Yazıyı Sil</Modal.Header>
        <Modal.Content>
            <p> <b>{yazi.title}</b> başlıklı yazıyı silmek istediginize emin misiniz.</p>
            {hata && <p>{hata}</p>}
        </Modal.Content>
        <Modal.Actions>
            <Button nagative onClick={close}>İptal</Button>
            <Button positive onClick={()=>handleDelete(yazi.id)} icon="delete" labelPosition="right" content="Evet,silmek istiyorum"  />
        </Modal.Actions>
        </Modal>
        </>
    )
    
}

export default SilModal;