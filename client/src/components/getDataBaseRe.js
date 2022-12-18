import React,{useState,useRef} from "react";
import Select from 'react-select';
function getInfor(){
console.log('hi')
const username =localStorage.getItem("username");   
const info =fetch(`/getAllRecipes/${username}`).then( response => response.json()).then((data) => {return data});

const getArray =   () =>{
   let myarray = []
    let b =info.then((a)=>{
        console.log(a)
        return a

    });
    console.log(b)
    return b
   

 }
 return getArray
}
export default getInfor;