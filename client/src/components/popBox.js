import Alert from "sweetalert2";
import '../styles/PopBox.css';

const PopBox = (data,event)=>{
    const username =localStorage.getItem("username");
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
            const request = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: data["id"], user:username,date: data["date"]})
            };
              fetch(`/delete-data`,request)
            event.event.remove();
        }
    })
}
export default PopBox