import React,{useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import '../styles/App.css';


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
  useEffect(()=>{
    let draggableEl = document.getElementById("draggable");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl){
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return{
          title:title,
          id:id
        };
      }
    })
    


  });
  return (
    <div className="App">
      <h1 >
       Plate it!
      </h1>
      <div>
        <div id = "draggable">
          {recepies.map((event) => (
            <div 
              className="fc-event" 
              title={event.title}
              data = {event.id}
              key = {event.id}
              >
              {event.title}
            </div>
          ))
          }
        </div>

        <FullCalendar 
          deFaultView = "timeGridWeek"
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
