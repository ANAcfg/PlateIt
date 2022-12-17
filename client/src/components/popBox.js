import React from 'react'
import Alert from "sweetalert2";
import '../styles/PopBox.css';

const PopBox = (data,event)=>{
    console.log(event)
    Alert.fire({
      confirmButtonText: "Remove Event",
      showCancelButton: true,
      cancelButtonText: "Close",
      title: `<strong>${data["title"]}</strong>`,
      imageUrl: data["image"],
      html: `<div className='modal-body'> 
                 ${data["summary"]} </div>`,         
    }).then ((result)=>{
        if (result.value) {
            event.event.remove();
        }
    })
}
export default PopBox