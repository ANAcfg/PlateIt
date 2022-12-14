import React,{useState,useRef} from "react";
import Select from 'react-select';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import searchOptions from "./searchOptions"
import nutrientsOptions from "./nutrientsOptions";
import ExternalDrag from "./externalDrag";

import '../styles/App.css';

function App() {

  const [recipies,setRecipes] = useState([]);
  const [showNutrientsOptions, setNutrientsOptions] = useState(false)
  const[showRecipesTextBox,setShowRecipesTextBox] = useState(false);
  const[showSimilarTextBox,setSimilarTextBox] = useState(false);
  const recipesNames = useRef(null);
  const similarRecipes = useRef(null);


  const handleChange = (event) =>{
    if(event.value === 'RandomRecipes'){
      setShowRecipesTextBox(false);
      setSimilarTextBox(false);
      setNutrientsOptions(false);
      fetch(`/searchRandomRecipe`).then(
        response => response.json()
        ).then(
          data => {
            setRecipes(data)
          }
        )
    }
    else if(event.value === 'Nutrients'){
      setShowRecipesTextBox(false);
      setSimilarTextBox(false);
      setNutrientsOptions(true);
    }
    else if(event.value === 'SearchRecipes'){
      setShowRecipesTextBox(true);
      setSimilarTextBox(false);
      setNutrientsOptions(false);
    }
    else{
      setShowRecipesTextBox(false);
      setSimilarTextBox(true);
      setNutrientsOptions(false);

    }


  }

const handleSubmitNutrients = (event) =>{
  fetch(`/searchByNutrients${event.label}`).then(
    response => response.json()
    ).then(
      data => {
        setRecipes(data)
      }
    )
 }
const handleSubmit1 = (event) =>{
  console.log(recipesNames.current.value);
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
        //console.log(data)
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

   window.onload=function(){



    // selecting the elements for which we want to add a tooltip
    const target = document.getElementById("draggable");
    const tooltip = document.getElementById("tooltip-text");

    // change display to 'block' on mouseover
    target.addEventListener('mouseover', () => {
      tooltip.style.display = 'block';
    }, false);

    // change display to 'none' on mouseleave
    target.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    }, false);

    }




  return (
    <div className="App">
      <h1 >Plate it!</h1>

      <div id = "searchbar">
      <Select
        options={searchOptions}
        onChange={handleChange}
      />
      </div>
      <div></div>
      {
        showNutrientsOptions?<div >
        <Select
          options={nutrientsOptions}
          onChange={handleSubmitNutrients}
        />
        </div>:null
      }
      {
        showRecipesTextBox?<form >
          <input ref ={recipesNames} type= 'text' id = 'recipesNames' placeholder="Enter a Recipe">
          </input>
          <button onClick={handleSubmit1}>Submit form</button>
       </form>:null

      }
      {
        showSimilarTextBox?<form >
          <input ref ={similarRecipes} type= 'number' id = 'similarNames' placeholder="Enter the  Recipe Id to show similar results">
          </input>
          <button onClick={handleSubmit2}>Submit form</button>
       </form>:null

      }
{/* 
      <div className="hide">I am shown when someone hovers over the div above.</div>

      <div className="tooltip-container">
        <p id="tooltip-text">The tooltip text{1}.</p>
      </div> */}

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
          selectable

          plugins={[timeGridPlugin,interactionPlugin]}

          eventClick ={
            function(arg){
            // alert(arg.event.title)
            alert(arg.event.start)
            }

          }





         />
      </div>
    </div>
  );
}

export default App;
