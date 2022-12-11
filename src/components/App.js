import React,{useState, useEffect,useRef,memo} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import '../styles/App.css';

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
      {event.title}

      </div>
      
    </div>
  )


});
function App() {
  // const events = [{title: "today's event", date: new Date()}];
  // let array  =[
  //     {title:"event 1", id:"1"},
  //     {title:"event 2", id: "2"}
  //   ]
  const [recepies,setRecepies] = useState([
    {title:"event 1", id:"1"},
    {title:"event 2", id: "2"}
  ]);

    
  return (
    <div className="App">
      <h1 >
       Plate it!
      </h1>
      <div>
        <div id = "draggable">
          {recepies.map((event) => (
            <ExternalDrag key ={event.id} event = {event}/>
          ))}
        </div>

        <FullCalendar 
          headerToolbar={{
            left: "",
            center: "title",
            right: "timeGridWeek,timeGridDay"
          }}
          plugins={[timeGridPlugin,interactionPlugin]}

          />
      </div>
    </div>
  );
}

export default App;
