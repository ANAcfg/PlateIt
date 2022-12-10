import React from 'react'
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import '../styles/App.css';


function App() {
  const events = [{title: "today's event", date: new Date()}];
  return (
    <div className="App">
      <h1 >
       Plate it!
      </h1>
      <div>
        <div>
          search recipies plans here!
        </div>

        <FullCalendar 
          deFaultView = "timeGridWeek"
          headerToolbar={{
            left: "",
            center: "title",
            right: "timeGridWeek,timeGridDay"
          }}
          plugins={[timeGridPlugin]}
          events={events}
          />
      </div>
    </div>
  );
}

export default App;
