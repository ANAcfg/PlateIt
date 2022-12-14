import React,{useState, useEffect,useRef,memo} from "react";
import Select from 'react-select';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import '../styles/App.css';


const test = [
  { label: 'pleasework', value: 'pleasework' },
];

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
  const [recepies,setRecipes] = useState([
    {title:"event 1", id:"1"},
    {title:"event 2", id: "2"}
  ]);


 



 
  


    
  return (
    <div className="App">

<div id="myModal" class="modal">
 
<div class="modal-content">
  <div id="close">&times;</div>
  <p>Some text in the Modal..</p>
</div>

</div>

      
      
      <h1 >
       Plate it!
      </h1>


    

      <div id = "searchbar">
      <Select
        options={test}
        onChange={opt => console.log(opt.label, opt.value)}
      />
      </div>
      <div></div>
      <div class="hide">I am shown when someone hovers over the div above.</div>

      <div class="tooltip-container">
  <p id="tooltip-text">The tooltip text{1}.</p>
</div>

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

          eventClick ={
            function(args){
              var modal = document.getElementById("myModal"); 
              modal.style.display = "block"; 
              var span = document.getElementById("close"); 

              span.addEventListener("click")

              

          
              

              

            

              

             

        
              
  
              
           
             
            
         
            
            }
           
            

          }

          

          

          
          
          

          />
      </div>
    </div>
    
  );
}

export default App;