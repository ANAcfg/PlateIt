import React,{useState,useRef} from "react";
import Select from 'react-select';
import FullCalendar, { removeElement } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin,{EventDragStopArg} from '@fullcalendar/interaction';
import searchOptions from "./searchOptions"
import ExternalDrag from "./externalDrag";
import LoginPage from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../styles/App.css';

import PopBox from "./popBox";

function Main() {

  const [recipies,setRecipes] = useState([]);
  const[showRecipesTextBox,setShowRecipesTextBox] = useState(false);
  const[showSimilarTextBox,setSimilarTextBox] = useState(false);
  const[showPopBox,setPopBox] = useState(false);
  const recipesNames = useRef(null);
  const similarRecipes = useRef(null);
  const [recipieSent,setRecipeSent] = useState([]);


  const handleChange = (event) =>{
    if(event.value === 'RandomRecipes'){
      setShowRecipesTextBox(false);
      setSimilarTextBox(false);
      fetch(`/searchRandomRecipe`).then(
        response => response.json()
        ).then(
          data => {
            setRecipes(data)
          }
        )
    }
    else if(event.value === 'SearchRecipes'){
      setShowRecipesTextBox(true);
      setSimilarTextBox(false);
    }
    else{
      setShowRecipesTextBox(false);
      setSimilarTextBox(true);
    }
  }

const handleSubmit1 = (event) =>{
    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipesName: recipesNames.current.value })
  };
    fetch(`/searchByRecipesName`,requestOptions).then(
      response => response.json()
      ).then(
        data => {
        setRecipes(data)
        }
      )
   }
  const handleSubmit2 = (event) =>{
    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipesName:  similarRecipes.current.value })
  };
    fetch(`/searchSimilarRecipes`,requestOptions).then(
      response => response.json()
      ).then(
        data => {
          setRecipes(data)
        }
      )
   }
  const handlePopBox =(event) =>{
    
    let recipesDetail ={}
    recipesDetail["id"]=event.event._def.publicId
    recipesDetail["title"]=event.event._def.title
    recipesDetail["image"]=event.event._def.extendedProps.image
    recipesDetail["summary"]=event.event._def.extendedProps.summary
    recipesDetail["readyInMinutes"]=event.event._def.extendedProps.readyInMinutes
    recipesDetail["instructions"]=event.event._def.extendedProps.instructions
    PopBox(recipesDetail,event)

    

  }
  const HandleContent =(event) =>{
    let titleEvent =event.event._def.title
    let imgSrc = event.event._def.extendedProps.image
    return (
      <div className = "eventBox">
        <img  src = {imgSrc} alt ="RecipeImage"/>
      </div>
    )
  }
  return (
    <div className="App">
      <h1 >Plate it!</h1>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <div style={{width: "25%", padding: "20px"}}>
      <div id = "searchbar">
      <Select
        options={searchOptions}
        onChange={handleChange}
      />
      </div>
      {
        showRecipesTextBox?<form >
          <input ref ={recipesNames} type= 'text' id = 'recipesNames' placeholder="Enter a Recipe">
          </input>
          <button onClick={handleSubmit1}>Submit form</button>
       </form>:null

      }
      {
        showSimilarTextBox?<form >
          <input ref ={similarRecipes} type= 'number' id = 'similarNames' placeholder="Enter the Recipe ID">
          </input>
          <button onClick={handleSubmit2}>Submit form</button>
       </form>:null

      }
     
      </div>
      <div style={{width: "70%", padding: "20px"}}>
      <div>
        <div id = "draggable">
          {recipies.map((event) => (
            <ExternalDrag key ={event.id} event = {event}/>
          ))}
        </div>
        
        <FullCalendar
          headerToolbar={{
            left: "",
            center: "",
            right: "timeGridWeek,timeGridDay"
          }}
          selectable = {true}
          

          plugins={[timeGridPlugin,interactionPlugin]}

          eventClick ={handlePopBox}
          height = {
            "auto"
          }
          eventContent={ HandleContent}
        
         />
         </div>
         </div>
      </div>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="" element={<LoginPage/>} />  
          <Route path="/Main" element={<Main/>} />                
        </Routes>
    </BrowserRouter>
  );
}
export default App;
