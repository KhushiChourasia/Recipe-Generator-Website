const searchbtn=document.getElementById('search-btn');
const mealitem=document.getElementById('meal');
const mealrecipe=document.querySelector('.meal-recipe');
const closebutton=document.getElementById('close-button');



searchbtn.addEventListener('click',getMealItem);
mealitem.addEventListener('click',getMealRecipe);
closebutton.addEventListener('click', function() {
 // mealrecipe.classList.remove('show-recipe');
    mealrecipe.style.display='none';
});



function getMealItem() {
    let searchInputtxt=document.getElementById('search-bar-input').value.trim();
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputtxt}`)
   .then(response=>response.json())
   .then(data =>{
   /* console.log(data);*/
   let html=""
   if(data.meals){
    data.meals.forEach(meal=>{
        html+=`<div class="col" data-id="${meal.idMeal}">
        <div class="card shadow-sm">
          <img class="bd-placeholder-img card-img-top"  src="${meal.strMealThumb}"width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img"preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em"></text></svg>
          <div class="card-body">
              <p class="card-text">${meal.strMeal}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                
                <button type="button" allign="center"  class="recipe-btn btn " ><a href="#"></a>  Get Recipe</button>
              </div>
              <small class="text-body-secondary"></small>
            </div>
          </div>
        </div>
      </div>`
                
                  
                       
                    
             
        
    });
    mealitem.classList.remove('NotFound');
   }else{
   html="Sorry!!<br>We couldn't find any meals"
   mealitem.classList.add('NotFound');

   }
   mealitem.innerHTML=html;
   })
  

    
}
function getMealRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data =>makeRecipe(data.meals));
    }
    
}
function makeRecipe(meal) {
    console.log(meal);
    meal=meal[0];
    let html=`
                
                <button type = "button" class = "btn recipe-close-btn" id = "close-button">
                <i class=' bx bx-window-close'></i>
              </button>
              <div class="meal-detail">
              <h2 class="Recipe-title">${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" height="40" border-radius="50%">
                <h3>Recipe</h3>
                <p>${meal.strInstructions}</p>
                <a  class="video-link"    href="${meal.strYoutube}">Watch Video</a>
              </div>`
              mealrecipe.innerHTML=html;
              mealrecipe.classList.add('show-recipe');


              
    
}