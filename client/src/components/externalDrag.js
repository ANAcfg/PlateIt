import { Draggable } from '@fullcalendar/interaction';
import React,{useEffect,useRef,memo} from "react";

const ExternalDrag = memo(({event}) =>{
    let elemRef = useRef(null);
    useEffect(()=>{
      let draggable = new Draggable(elemRef.current, {
        
        eventData: function (){
          return{ ...event, create: true};
        }
      });
      return() => draggable.destroy()
    })
    return(
      <div 
        ref = {elemRef}
        className="fc-event" 
        title={event.title}
        >
        <div>
        <h4>{event.title}</h4>
        <img src={event.image} alt = "recipePicture"/>
      
        </div>
        
      </div>
    )
  });
  export default ExternalDrag