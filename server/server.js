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
app.get('/getUser/:id/:password',async(req,res)=>{
  const user = req.params;
  console.log(user.password)
  const result = await client.db('PlateIt').collection('Users').findOne({username: user.id, password:user.password});
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
  console.log(result.length);
  for(let i = 0; i<result.length;i++){
    myarray.push({
      title: result[i].title,
      date: 'Tue Dec 18 2022 02:00:00 GMT-0500 (Eastern Standard Time)'
    }
      )
  }
  console.log(myarray)
  res.send(myarray)


})
app.get('/db/findOne/:db/:collection', async (req, res) => {
  const { db, collection } = req.params;
  const result = await client.db(db).collection(collection).findOne({});
  res.send(result);
});
app.post('/postRecipes',async(req,res) =>{
  // console.log(req.body.recipesInfo)
  let ana = req.body.recipesId;
  const matchDocument = {
    id: req.body.recipesInfo.id,
    image:req.body.recipesInfo.image,
    summary: req.body.recipesInfo.summary,
    instructions: req.body.recipesInfo.instructions,
    readyInMinutes: req.body.recipesInfo.readyInMinutes,
    startStr:req.body.recipesInfo.startStr,
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
//  const fetchUrl = "https://api.spoonacular.com/recipes/random?apiKey=38f636d29ea94887b7cc738ae94d4e0e&number=10";
//  const rawData = await fetch(fetchUrl);
//  const data =  await rawData.json();
//  if(checkRequest(data)){
//   for(let i =0; i < data.recipes.length; i++){
//     myarray.push({
//       id:data.recipes[i].id,
//       title:data.recipes[i].title,
//       image:data.recipes[i].image,
//       summary:data.recipes[i].summary,
//       readyInMinutes:data.recipes[i].readyInMinutes,
//       instructions:data.recipes[i].instructions
//     })
//   }
// }
myarray= [{"id":660368,"title":"Smoked Salmon Eggs Benedict With Lemon Dill Hollandaise","image":"https://spoonacular.com/recipeImages/660368-556x370.jpg","summary":"Smoked Salmon Eggs Benedict With Lemon Dill Hollandaise might be just the morn meal you are searching for. One serving contains <b>539 calories</b>, <b>41g of protein</b>, and <b>33g of fat</b>. For <b>$6.07 per serving</b>, this recipe <b>covers 41%</b> of your daily requirements of vitamins and minerals. This recipe from Foodista has 73 fans. A mixture of baby arugula, baby spinach, eggs, and a handful of other ingredients are all it takes to make this recipe so scrumptious. It is a good option if you're following a <b>pescatarian</b> diet. From preparation to the plate, this recipe takes around <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 92%</b>. This score is amazing. Try <a href=\"https://spoonacular.com/recipes/smoked-salmon-dill-eggs-benedict-792620\">Smoked Salmon Dill Eggs Benedict</a>, <a href=\"https://spoonacular.com/recipes/smoked-salmon-eggs-benedict-596988\">Smoked Salmon Eggs Benedict</a>, and <a href=\"https://spoonacular.com/recipes/smoked-salmon-eggs-benedict-78735\">Smoked Salmon Eggs Benedict</a> for similar recipes.","readyInMinutes":45,"instructions":"<ol><li>Make Lemon Dill Hollandaise:</li><li>Fill a medium saucepan about halfway with water, and bring to a gentle simmer over medium heat. Put the egg yolks and water in a heatproof bowl, season with a pinch of dill (if using dried), salt, and pepper. Whisk the ingredients together and then place the bowl on top of the saucepan. Keep stirring the egg mixture for about 5 minutes or until it begins to thicken. Make sure you dont scramble your eggs! Once the eggs are thickened, take the bowl off the water and set aside.</li><li>Poach the eggs:</li><li>Fill a medium saucepan with water, add a splash of white vinegar (optional, but this helps hold the whites together which results in nicely shaped eggs) and bring to a gentle simmer. You want tiny bubbles only, not a rolling boil. Gently add eggs to water and poach until deisred doneness.</li><li>Meanwhile, toast bread.</li><li>Place toast on plates and top with arugula, spinach and salmon. Place eggs on top of salmon and spoon hollandaise over the top. Garnish with dill, salt and freshly cracked black pepper and serve.</li></ol>"},{"id":642259,"title":"Eggless Blueberry and White Chocolate Baked Cheesecake","image":"https://spoonacular.com/recipeImages/642259-556x370.jpg","summary":"One serving contains <b>553 calories</b>, <b>9g of protein</b>, and <b>37g of fat</b>. For <b>$1.33 per serving</b>, this recipe <b>covers 8%</b> of your daily requirements of vitamins and minerals. A few people made this recipe, and 17 would say it hit the spot. If you have cream cheese, vanillan extract, granulated sugar, and a few other ingredients on hand, you can make it. From preparation to the plate, this recipe takes about <b>1 hour and 30 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 24%</b>. This score is rather bad. Try <a href=\"https://spoonacular.com/recipes/white-chocolate-blueberry-cheesecake-543349\">White Chocolate Blueberry Cheesecake</a>, <a href=\"https://spoonacular.com/recipes/blueberry-and-white-chocolate-cheesecake-51501\">Blueberry And White Chocolate Cheesecake</a>, and <a href=\"https://spoonacular.com/recipes/no-bake-white-chocolate-blueberry-cheesecake-718890\">No Bake White Chocolate Blueberry Cheesecake</a> for similar recipes.","readyInMinutes":90,"instructions":"<ol><li>Method for the base:</li><li>Combine the crushed digestive biscuits with the melted butter and mix thoroughly.</li><li>Firmly press the mixture into a greased 10 inch springform tin.</li><li>Method for the filling:</li><li>Beat together all of the ingredients (excluding the blueberries) until it has thickened. Kurma suggests not to overmix this.</li><li>Pour  of the mixture on top of the crust and scatter on the blueberries. Pour the rest of the cheese mixture over the blueberries. This method protects the blueberries from burning in the oven and the flour they are dusted in will stop them from sinking to the bottom of the cheesecake during cooking.</li><li>Bake at 180 degrees Celsius for 1  hours until set (I left mine for 1 hour because my fan oven cooks things a little quicker).</li><li>Allow to cool and refrigerate for at least 8 hours.</li><li>Cut into (extra) large wedges and serve.</li></ol>"},{"id":721059,"title":"Blueberry Almond Crescent Rolls","image":"https://spoonacular.com/recipeImages/721059-556x370.jpg","summary":"Blueberry Almond Crescent Rolls might be just the bread you are searching for. This recipe serves 8 and costs 79 cents per serving. One serving contains <b>247 calories</b>, <b>3g of protein</b>, and <b>12g of fat</b>. This recipe is liked by 122 foodies and cooks. Head to the store and pick up almond extract, regular crescent rolls, flour, and a few other things to make it today. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 11%</b>. This score is rather bad. Similar recipes include <a href=\"https://spoonacular.com/recipes/blueberry-cream-cheese-crescent-rolls-giveaway-532812\">Blueberry Cream Cheese Crescent Rolls & Giveaway</a>, <a href=\"https://spoonacular.com/recipes/pillsbury-refrigerated-crescent-dinner-rolls-or-pillsbury-crescent-creations-refrigerated-flaky-dough-sheet-549847\">Pillsbury® refrigerated crescent dinner rolls or Pillsbury® Crescent Creations™ refrigerated flaky dough sheet</a>, and <a href=\"https://spoonacular.com/recipes/crescent-rolls-489337\">Crescent Rolls</a>.","readyInMinutes":45,"instructions":"Preheat your oven to 375 degrees F and line a large baking sheet with parchment paper or a silicone baking mat. Set aside.In the bowl of your stand mixer, with paddle attachment fixed (or a handheld electric mixer may be used), combine the cream cheese, blueberry jam, 2 tablespoons of confectioner's sugar, flour, salt and  teaspoon of almond extract. Mix until smooth, about 30 seconds. Set aside.Lay your crescent roll wedges out on a large work surface. Take about a tablespoon of the cream cheese mixture and dollop it on the wide end of each crescent roll. Roll them up until the narrow end is sealed underneath. Transfer them to the prepared baking sheet and brush them with the egg wash. Sprinkle with turbinado sugar.Place the crescent rolls in the oven and bake for 13-15 minutes, or until puffed and golden. Remove from heat and transfer to a wire rack to cool.While the crescent rolls are cooling, prepare your glaze. In a medium bowl, combine the remaining  cup of confectioner's sugar, remaining  teaspoon of almond extract, and milk. Whisk until smooth. Adjust seasoning by adding a pinch of sea salt if you find that the glaze is too sweet. Drizzle the glaze on the slightly cooled crescent rolls and serve immediately. Enjoy!"},{"id":657159,"title":"Prosciutto and Mushroom Ravioli With Basil Browned Butter Sauce","image":"https://spoonacular.com/recipeImages/657159-556x370.jpg","summary":"The recipe Prosciutto and Mushroom Ravioli With Basil Browned Butter Sauce could satisfy your Mediterranean craving in around <b>45 minutes</b>. This recipe serves 4 and costs $1.91 per serving. This main course has <b>541 calories</b>, <b>16g of protein</b>, and <b>29g of fat</b> per serving. If you have mushrooms, butter, garlic, and a few other ingredients on hand, you can make it. To use up the onion you could follow this main course with the <a href=\"https://spoonacular.com/recipes/candy-corn-cupcakes-63881\">Candy Corn Cupcakes</a> as a dessert. 5 people were impressed by this recipe. All things considered, we decided this recipe <b>deserves a spoonacular score of 67%</b>. This score is solid. Try <a href=\"https://spoonacular.com/recipes/browned-butter-mushroom-ravioli-with-sage-574170\">Browned Butter Mushroom Ravioli with Sage</a>, <a href=\"https://spoonacular.com/recipes/pumpkin-ravioli-with-browned-butter-sage-sauce-657377\">Pumpkin Ravioli With Browned Butter Sage Sauce</a>, and <a href=\"https://spoonacular.com/recipes/herbed-veggie-risotto-with-browned-butter-mushroom-sauce-triplesbites-628556\">Herbed Veggie Risotto with Browned Butter Mushroom Sauce #TripleSBites</a> for similar recipes.","readyInMinutes":45,"instructions":"<ol><li>We'll start out by making the dough for our ravioli. Add to a food processor all of your ravioli ingredients.</li><li>Run the processor and mix the ingredients up well. If the dough looks like pebbles, it's a touch too dry. Add about 1/2-1 tsp of water and mix again. It should form a nice ball of dough. Once your dough is mixed, bring it out of the processor and knead it for a few minutes.</li><li>Cover your ball of pasta dough with plastic wrap and let it rest for a good twenty minutes.</li><li>While your dough is resting, let's whip up the tasty filling. Grab your skillet and heat up the butter on medium heat. Now add in the garlic.</li><li>Next we'll add in the proscuitto, onions and mushrooms.</li><li>Let it cook up for a minute or two and then add in the salt and oregano. Give it a swirl or two around the pan to mix in and then add in your spinach.</li><li>Let the spinach wilt down completely and then remove the mixture from the heat.</li><li>Now it's time to grab your well rested pasta dough and pop out some ravioli.</li><li>Rip off about a sixth of the ball and run it through your pasta maker (or hand roll it) to the desired thinness.</li><li>If you have a ravioli cutter you can use that, or you can use a glass to cut circles, or you can do like we did and use a cookie cutter to make fun shapes celebrating the holiday.</li><li>After you have your ravioli cut out, you'll drop a good teaspoonful of the prosciutto mixture into the center of the pasta.</li><li>Brush the edges with an egg wash (the egg white from one egg) and place another pasta piece over the top. Seal the edges with your fingers, a fork, or whatever puts a smile on your face.</li><li>Grab a pot, fill it up with water and set it to boil. The pasta will cook up quick (it will float when cooked)</li><li>Grab another pan, drop the butter into it and cook it on medium until it turns a beautiful golden brown and gives off a lovely nutty smell. At this point you'll turn the heat down just a notch and add in your garlic.</li><li>Now drop in your chopped basil, give it a swirl or two to let the basil wilt and your butter sauce is ready to rumble.</li><li>Drain your cooked up ravioli, dump them in the butter sauce and get them good and coated.</li><li>Serve them up with a little grated Parmesan or Romano over the top.</li></ol>"},{"id":633330,"title":"Bacon Wrapped Breadsticks","image":"https://spoonacular.com/recipeImages/633330-556x370.jpg","summary":"Bacon Wrapped Breadsticks might be just the hor d'oeuvre you are searching for. This recipe makes 4 servings with <b>264 calories</b>, <b>14g of protein</b>, and <b>20g of fat</b> each. For <b>$1.07 per serving</b>, this recipe <b>covers 8%</b> of your daily requirements of vitamins and minerals. 129 people have made this recipe and would make it again. Head to the store and pick up you will also need: parchment paper, cayenne pepper, garlic salt, and a few other things to make it today. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 33%</b>. This score is not so super. Try <a href=\"https://spoonacular.com/recipes/prosciutto-wrapped-breadsticks-284645\">Prosciutto-Wrapped Breadsticks</a>, <a href=\"https://spoonacular.com/recipes/prussian-leaf-wrapped-breadsticks-91572\">Prussian Leaf-Wrapped Breadsticks</a>, and <a href=\"https://spoonacular.com/recipes/prosciutto-wrapped-melon-and-breadsticks-52462\">Prosciutto-wrapped Melon And Breadsticks</a> for similar recipes.","readyInMinutes":45,"instructions":"<ol><li>Preheat oven to 350</li><li>Line cookie sheet with parchment paper.</li><li>In a medium size mixing bowl, combine the parmesan, garlic salt, cayenne and nutmeg.</li><li>GENTLY wrap each breadstick with a slice of bacon (so breadsticks dont break), then place wrapped bread sticks on a cookie sheet lined with parchment paper. If you break one, just cut bacon to fit and add to sheet. No one will care if the pieces are small.</li><li>Bake for 15 minutes or until bacon is cooked to your liking.</li><li>Next, roll the breadsticks in cheese & spices. Do this while bacon and breadsticks are still warm, then set aside and let cool. (Peter loves this part!)</li><li>Can be made a day ahead and even taste great cold (hey, its bacon)!</li></ol>"},{"id":715546,"title":"Key Lime Pie","image":"https://spoonacular.com/recipeImages/715546-556x370.jpg","summary":"The recipe Key Lime Pie could satisfy your Mexican craving in approximately <b>18 minutes</b>. One serving contains <b>764 calories</b>, <b>16g of protein</b>, and <b>27g of fat</b>. This recipe serves 5 and costs $1.86 per serving. Many people made this recipe, and 2848 would say it hit the spot. If you have condensed milk, juice of lime, cream, and a few other ingredients on hand, you can make it. All things considered, we decided this recipe <b>deserves a spoonacular score of 75%</b>. This score is pretty good. Try <a href=\"https://spoonacular.com/recipes/macadamia-key-lime-pie-911117\">Macadamia Key Lime Pie</a>, <a href=\"https://spoonacular.com/recipes/3-1-2-inch-miniature-key-lime-pies-918319\">3 1/2 Inch Miniature Key Lime Pies</a>, and <a href=\"https://spoonacular.com/recipes/key-lime-hatch-chile-gelato-how-to-use-hatch-chiles-916609\">Key Lime Hatch Chile Gelato: How to Use Hatch Chiles</a> for similar recipes.","readyInMinutes":18,"instructions":"Heat oven to 350.Mix your lime juice, condensed milk, sour cream, and lime zest in a medium bowl until creamed together well.Pour mixture into the graham cracker crust.Bake for 6 - 8 minutes in the oven, making sure that you do not brown the top of the pie.Pull your pie from the oven and allow to cool to room temp.Place in the refrigerator and allow to completely cool.When you are ready, add your whipped cream and top it with a little additional zest and serve."},{"id":635342,"title":"BLT Sandwich","image":"https://spoonacular.com/recipeImages/635342-556x370.jpg","summary":"Need a <b>dairy free main course</b>? BLT Sandwich could be an awesome recipe to try. This recipe makes 2 servings with <b>657 calories</b>, <b>20g of protein</b>, and <b>60g of fat</b> each. For <b>$2.6 per serving</b>, this recipe <b>covers 15%</b> of your daily requirements of vitamins and minerals. If you have pepper, thick- bacon, mayonnaise, and a few other ingredients on hand, you can make it. To use up the bread you could follow this main course with the <a href=\"https://spoonacular.com/recipes/coffee-cake-banana-bread-509375\">Coffee Cake Banana Bread</a> as a dessert. 63 people have made this recipe and would make it again. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 54%</b>. This score is solid. Try <a href=\"https://spoonacular.com/recipes/blt-salad-916021\">BLT Salad</a>, <a href=\"https://spoonacular.com/recipes/blt-salad-917813\">BLT Salad</a>, and <a href=\"https://spoonacular.com/recipes/black-eyed-peas-sandwich-lobia-sandwich-indian-sandwich-s-580105\">Black Eyed Peas Sandwich ~ Lobia Sandwich ~ Indian Sandwich s</a> for similar recipes.","readyInMinutes":45,"instructions":"<ol><li>Brown bacon in a skillet</li><li>Remove and pat off excess oil</li><li>Slice tomato into 1/4 inches slices</li><li>Toast bread</li><li>Spread a thin layer of mayonnaise on bread</li><li>Layer all ingredients on bread and close sandwich</li><li>Add fresh cracked black pepper</li></ol>"},{"id":664488,"title":"Vegan Strawberry Shortcake served with Vegan Whipped Cream","image":"https://spoonacular.com/recipeImages/664488-556x370.jpg","summary":"Vegan Strawberry Shortcake served with Vegan Whipped Cream takes roughly <b>roughly 45 minutes</b> from beginning to end. One serving contains <b>249 calories</b>, <b>4g of protein</b>, and <b>14g of fat</b>. For <b>68 cents per serving</b>, you get a dessert that serves 10. This recipe from Foodista requires flour, almond meal, turbinado sugar, and almond milk. 23 people have made this recipe and would make it again. It is perfect for <b>Mother's Day</b>. It is a good option if you're following a <b>dairy free</b> diet. Overall, this recipe earns a <b>not so awesome spoonacular score of 35%</b>. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/vegan-strawberry-shortcake-with-whipped-cream-57913\">Vegan Strawberry Shortcake With Whipped Cream</a>, <a href=\"https://spoonacular.com/recipes/easy-vegan-and-gluten-free-pancakes-strawberry-shortcake-+-whipped-cream-469936\">Easy Vegan and Gluten-Free Pancakes (Strawberry Shortcake + Whipped Cream)</a>, and <a href=\"https://spoonacular.com/recipes/strawberry-shortcake-with-vanilla-whipped-cream-58026\">Strawberry Shortcake With Vanilla Whipped Cream</a>.","readyInMinutes":45,"instructions":"Preheat your oven to 400 degrees F.\nAdd the sliced strawberries to a glass bowl and refrigerate until ready to use.\nCombine the flours, baking soda and salt in a medium-sized bowl and mix together well.\nIn a small bowl, add 1 teaspoon water and the sugar, and mix together a bit to help dissolve the sugar.\nIn a large bowl, combine the almond milk, vinegar, oil, sugar and almond extract. Whisk together.\nMake a well in the center of the dry ingredients and gradually add the wet ingredients. Mix everything together until combined.\nLine two baking sheets with parchment paper.\nDrop the batter by generous tablespoons, a few inches apart on the sheets (I recommend 5 per baking sheet).\nBake for 10-12 minutes, or until the shortcakes are just slightly golden.\nAllow the shortcakes to cool, then slice them in half with a serrated knife.\nAdd a generous dollop of whipped topping to the bottom half, then a spoonful of strawberries on top of that. Top with the remaining shortcake half.\nAdd a bit more whipped topping to the top of the shortcake, and spoon a few of the strawberries over it. Serve on individual dessert plates."},{"id":665779,"title":"Zucchini Ribbon and Ricotta Pizza","image":"https://spoonacular.com/recipeImages/665779-556x370.jpg","summary":"The recipe Zucchini Ribbon and Ricotta Pizza could satisfy your Mediterranean craving in about <b>about 45 minutes</b>. For <b>$8.19 per serving</b>, this recipe <b>covers 17%</b> of your daily requirements of vitamins and minerals. This main course has <b>1988 calories</b>, <b>68g of protein</b>, and <b>42g of fat</b> per serving. This recipe serves 4. This recipe is liked by 6 foodies and cooks. A mixture of pine nuts, parmesan cheese, salt, and a handful of other ingredients are all it takes to make this recipe so scrumptious. It is brought to you by Foodista. Overall, this recipe earns a <b>rather bad spoonacular score of 38%</b>. Try <a href=\"https://spoonacular.com/recipes/cherry-tomato-zucchini-ribbon-and-burrata-pizza-28033\">Cherry Tomato, Zucchini Ribbon, And Burrata Pizza</a>, <a href=\"https://spoonacular.com/recipes/bacon-asparagus-ribbon-pizza-with-zucchini-crust-894998\">Bacon Asparagus Ribbon Pizza with Zucchini Crust</a>, and <a href=\"https://spoonacular.com/recipes/carrot-ribbon-salad-with-lavender-ricotta-dressing-707431\">Carrot Ribbon Salad with Lavender-Ricotta Dressing</a> for similar recipes.","readyInMinutes":45,"instructions":"Preheat your oven according to the pizza crust package directions.\nIn a medium-sized bowl, combine the zucchini, olive oil, garlic, lemon zest and salt and pepper. Toss to combine well.\nDollop the ricotta cheese around the pizza crust and spread it out slightly.\nMound the zucchini over the cheese, then sprinkle the olives evenly over the zucchini.\nSprinkle on the pine nuts, then the Parmesan cheese.\nBake according to the pizza crust instructions. The cheese should be slightly melted and the crust crispy."},{"id":660697,"title":"Southern Fried Catfish","image":"https://spoonacular.com/recipeImages/660697-556x370.jpg","summary":"You can never have too many main course recipes, so give Southern Fried Catfish a try. Watching your figure? This dairy free and pescatarian recipe has <b>786 calories</b>, <b>101g of protein</b>, and <b>32g of fat</b> per serving. For <b>$8.78 per serving</b>, this recipe <b>covers 40%</b> of your daily requirements of vitamins and minerals. A few people made this recipe, and 39 would say it hit the spot. This recipe is typical of Southern cuisine. Head to the store and pick up dressed catfish, salt, garlic powder, and a few other things to make it today. To use up the salt you could follow this main course with the <a href=\"https://spoonacular.com/recipes/apple-turnovers-recipe-48175\">Apple Turnovers Recipe</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 94%</b>. This score is spectacular. Similar recipes include <a href=\"https://spoonacular.com/recipes/southern-fried-catfish-349181\">Southern Fried Catfish</a>, <a href=\"https://spoonacular.com/recipes/southern-fried-catfish-244061\">Southern Fried Catfish</a>, and <a href=\"https://spoonacular.com/recipes/southern-fried-catfish-301703\">Southern Fried Catfish</a>.","readyInMinutes":45,"instructions":"<ol><li>Combine flour, cornmeal, garlic powder and salt. Coat catfish with mixture, shaking off excess. Fill deep pot or 12-inch skillet half full with oil. Heat to 350 degrees. Add catfish in a single layer, and fry until golden brown, 5 to 6 minutes, depending on size. Remove and drain on paper towels.</li></ol>"}]
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
