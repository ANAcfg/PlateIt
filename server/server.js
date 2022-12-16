import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;
app.use(express.json()) 



// /*
// * GET Requests
// * */
// this requests is not really needed, i may take it away  later
 app.get('/searchByNutrients:nutrition', async (req, res) => {
  let search =req.params.nutrition.toString()
  let myarray = [];
  const fetchUrl = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=38f636d29ea94887b7cc738ae94d4e0e&maxCarbs=10`;
  const rawData = await fetch(fetchUrl);
  const data =  await rawData.json();
  let ids = ""
  for(let i =0; i < data.length; i++){
    ids += data[i].id
    if(i !=data.length-1){
      ids +=","
    }
  }
  const fetchUrl2 = `https://api.spoonacular.com/recipes/informationBulk?apiKey=38f636d29ea94887b7cc738ae94d4e0e&ids=${ids}`;
  const rawData2 = await fetch(fetchUrl2);
  const data2 =  await rawData2.json();
  for(let i =0; i < data2; i++){
    myarray.push({
      id:data2[i].id,
      title:data2[i].title,
      image:data2[i].image,
      summary:data2[i].summary,
      readyInMinutes:data2[i].readyInMinutes,
      instructions:data2[i].instructions
    })
  }
  res.send(data);

 })
 app.get('/searchRandomRecipe',async (req, res) => {
 let myarray = [];
 const fetchUrl = "https://api.spoonacular.com/recipes/random?apiKey=38f636d29ea94887b7cc738ae94d4e0e&number=10";
 const rawData = await fetch(fetchUrl);
 const data =  await rawData.json();
  for(let i =0; i < data.recipes.length; i++){
    myarray.push({
      id:data.recipes[i].id,
      title:data.recipes[i].title,
      image:data.recipes[i].image,
      summary:data.recipes[i].summary,
      readyInMinutes:data.recipes[i].readyInMinutes,
      instructions:data.recipes[i].instructions
    })
  }
 res.send(myarray);
})
app.put('/searchByRecipesName',async(req, res) => {
   let search =req.body.recipesName
   let myarray =[]
   const fetchUrl =`https://api.spoonacular.com/recipes/autocomplete?apiKey=38f636d29ea94887b7cc738ae94d4e0e&number=10&query=${search}`
   const rawData = await fetch(fetchUrl);
   const data =  await rawData.json();
   let ids = "";
  for(let i =0; i < data.length; i++){
    ids += data[i].id
    if(i !=data.length-1){
      ids +=","
    }
 }
 const fetchUrl2 = `https://api.spoonacular.com/recipes/informationBulk?apiKey=38f636d29ea94887b7cc738ae94d4e0e&ids=${ids}`;
  const rawData2 = await fetch(fetchUrl2);
  const data2 =  await rawData2.json();
  for(let i =0; i < data2.length; i++){
    myarray.push({
      id:data2[i].id,
      title:data2[i].title,
      image:data2[i].image,
      summary:data2[i].summary,
      readyInMinutes:data2[i].readyInMinutes,
      instructions:data2[i].instructions
    })
  }
  res.send(myarray);
 
 })
app.put('/searchSimilarRecipes',async (req, res) => {
  //let result = ""
  let search =req.body.recipesName
  let myarray = [];
  //https://api.spoonacular.com/recipes/{id}/similar?apiKey=d0f1f87614a744d89aec68cef7765d
  const fetchUrl = `https://api.spoonacular.com/recipes/${search}/similar?apiKey=38f636d29ea94887b7cc738ae94d4e0e&number=10`;
  const rawData = await fetch(fetchUrl);
  const data =  await rawData.json();
 
  let ids = "";
  for(let i =0; i < data.length; i++){
    ids += data[i].id
    if(i !=data.length-1){
      ids +=","
    }
 }
 const fetchUrl2 = `https://api.spoonacular.com/recipes/informationBulk?38f636d29ea94887b7cc738ae94d4e0e&ids=${ids}`;
  const rawData2 = await fetch(fetchUrl2);
  const data2 =  await rawData2.json();
  for(let i =0; i < data2.length; i++){
    myarray.push({
      id:data2[i].id,
      title:data2[i].title,
      image:data2[i].image,
      summary:data2[i].summary,
      readyInMinutes:data2[i].readyInMinutes,
      instructions:data2[i].instructions
    })
  }
  res.send(myarray);
 })
// Start the server on the defined port.
app.listen(port, () => {
  console.log('Server started at port:', port);
})
