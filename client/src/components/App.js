import React,{useState,useRef} from "react";
import Select from 'react-select';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import searchOptions from "./searchOptions"
import ExternalDrag from "./externalDrag";

import LoginPage from './Login';
import { BrowserRouter, Routes, Route, Await } from "react-router-dom";

import '../styles/App.css';

import PopBox from "./popBox";


function Main (){
  
  const [events,setEvent] =useState([]) 
    // { 
    //   title: "today's event", 
    //   date: new Date('Tue Dec 18 2022 02:00:00 GMT-0500 (Eastern Standard Time)'),
    //   defId: "70"
    // }];

  const username =localStorage.getItem("username");
  const [recipies,setRecipes] = useState([]);
  
  const[showRecipesTextBox,setShowRecipesTextBox] = useState(false);
  const[showSimilarTextBox,setSimilarTextBox] = useState(false);
  const recipesNames = useRef(null);
  const similarRecipes = useRef(null);
  


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
      response => {response.json()}
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
    recipesDetail["startStr"] = event.event.startStr
    PopBox(recipesDetail,event)

    

  }
  const HandleContent =(event) =>{
    let imgSrc = event.event._def.extendedProps.image
    return (
      <div className = "eventBox">
        <img  src = {imgSrc} alt ="RecipeImage"/>
      </div>
    )
  }
  async function getInfo  (event){  
    async function fetchData(){
      let response = await fetch(`/getAllRecipes/${username}`);
      let data = await response.json();
      data = JSON.stringify(data);
      data= JSON.parse(data);
      return data
    }
    let abc = await fetchData()
    let [cdf] = abc
    cdf.date = new Date('Tue Dec 18 2022 02:00:00 GMT-0500 (Eastern Standard Time)')
    // console.log([cdf],"result")
//  console.log([{ 
//   title: "today's event", 
//   date: new Date('Tue Dec 18 2022 02:00:00 GMT-0500 (Eastern Standard Time)'),
//   defId: "70"
// }])
 return ([cdf])
  }
  const saveData = (event)=>{
   
    let recipesDetail ={}
    recipesDetail["id"]=event.event._def.publicId
    recipesDetail["title"]=event.event._def.title
    recipesDetail["image"]=event.event._def.extendedProps.image
    recipesDetail["summary"]=event.event._def.extendedProps.summary
    recipesDetail["readyInMinutes"]=event.event._def.extendedProps.readyInMinutes
    recipesDetail["instructions"]=event.event._def.extendedProps.instructions
    recipesDetail["startStr"] = event.event.startStr
    const Data = {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipesInfo:  recipesDetail,user:username })
  };
    fetch(`/postRecipes`,Data)

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
          // selectable = {true}
          
          
    
          plugins={[timeGridPlugin,interactionPlugin]}
          eventReceive ={saveData}

          eventClick ={handlePopBox}
          height = {
            "auto"
          }
          eventContent={ HandleContent}
          events = {getInfo()}
            
          
        
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
