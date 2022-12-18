import express from 'express';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import fetch from 'node-fetch';

const app = express();
const port = 3000; 


const uri = "mongodb+srv://PlateIt:Letgetana@cluster0.vhhnxc5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(express.json()) 
await client.connect();




 function checkRequest(data){
  if(data["status"]!= undefined){
    return false
  }
  return true
 }

app.post('/makeNewUser',async (req,res)=>{
  const matchDocument = {
    username: req.body.username,
    password:req.body.password

  }
  const result = await client.db('PlateIt').collection('Users').insertOne(matchDocument)
  const newCollection = await client.db('PlateIt').createCollection(req.body.username)
  res.send()

});
app.get('/getUser/:username/:password',async(req,res)=>{
  const user = req.params;
  console.log(user.password)
  const result = await client.db('PlateIt').collection('Users').findOne({username: user.username, password:user.password});
  res.send(result)
})
app.get('/findUser/:id',async(req,res)=>{
  const user = req.params;
  const result = await client.db('PlateIt').collection('Users').findOne({"username": user.id});
  res.send(result)
})
app.get('/getAllRecipes/:user',async(req,res)=>{
  let myarray =[]
  const result = await client.db("PlateIt").collection(req.params.user).find({}).toArray()
  for(let i = 0; i<result.length;i++){
    myarray.push({
      id:result[i].id,
      title: result[i].title,
      date: result[i].date,
      image:result[i].image,
      instructions:result[i].instructions,
      summary:result[i].summary,
      readyInMinutes:result[i].readyInMinutes

    }
      )
  }
  res.send(myarray)


})
app.get('/db/findOne/:db/:collection', async (req, res) => {
  const { db, collection } = req.params;
  const result = await client.db(db).collection(collection).findOne({});
  res.send(result);
});
app.post('/postRecipes',async(req,res) =>{
  const matchDocument = {
    id: req.body.recipesInfo.id,
    image:req.body.recipesInfo.image,
    summary: req.body.recipesInfo.summary,
    instructions: req.body.recipesInfo.instructions,
    readyInMinutes: req.body.recipesInfo.readyInMinutes,
    date:req.body.recipesInfo.date,
    title:req.body.recipesInfo.title

  }
  const result = await client.db('PlateIt').collection(req.body.user).insertOne(matchDocument)
  res.send()

})
app.delete('/delete-data',async(req,res)=>{
  let id = req.body.id
  const result = await client.db('PlateIt').collection(req.body.user).deleteOne({id:id, startStr:req.body.startStr})
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
  res.send(`${result.deletedCount} document(s) was/were deleted.`)

})
app.get('/searchRandomRecipe',async (req, res) => {
 let myarray = [];
 const fetchUrl = "https://api.spoonacular.com/recipes/random?apiKey=38f636d29ea94887b7cc738ae94d4e0e&number=10";
 const rawData = await fetch(fetchUrl);
 const data =  await rawData.json();
 if(checkRequest(data)){
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
   if(checkRequest(data)){
    for(let i =0; i < data.length; i++){
      ids += data[i].id
     if(i !=data.length-1){
        ids +=","
      }
    }
  }
  else{
    res.send(myarray);
  }
 const fetchUrl2 = `https://api.spoonacular.com/recipes/informationBulk?apiKey=38f636d29ea94887b7cc738ae94d4e0e&ids=${ids}`;
  const rawData2 = await fetch(fetchUrl2);
  const data2 =  await rawData2.json();
  if(checkRequest(data2)){
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
 }
  res.send(myarray);
 
 })
app.put('/searchSimilarRecipes',async (req, res) => {
  let search =req.body.recipesName
  let myarray = [];
  const fetchUrl = `https://api.spoonacular.com/recipes/${search}/similar?apiKey=38f636d29ea94887b7cc738ae94d4e0e&number=10`;
  const rawData = await fetch(fetchUrl);
  const data =  await rawData.json();
  if(checkRequest(data)){
    let ids = "";
    for(let i =0; i < data.length; i++){
      ids += data[i].id
      if(i !=data.length-1){
        ids +=","
      }
   }
  }
 else{
  res.send(myarray);
 }
 const fetchUrl2 = `https://api.spoonacular.com/recipes/informationBulk?38f636d29ea94887b7cc738ae94d4e0e&ids=${ids}`;
  const rawData2 = await fetch(fetchUrl2);
  const data2 =  await rawData2.json();
  if(checkRequest(data2)){
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
 }
  res.send(myarray);
 })
// Start the server on the defined port.
  app.listen(port, () => {
  console.log('Server started at port:', port);
})
