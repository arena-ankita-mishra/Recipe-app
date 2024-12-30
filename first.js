const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipecontainer = document.querySelector(".recipe-container");
const recipedetailscontent = document.querySelector(".recipe-details-content");
const recipeclosebtn = document.querySelector(".recipe-close-btn");

// function to get recipe
const fetchRecipes = async (query) => {
  recipecontainer.innerHTML = "<h3>Fetching recipes...</h3>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();

    recipecontainer.innerHTML = "";
    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
  <img src="${meal.strMealThumb}">
  <h3>${meal.strMeal}</h3>
  <p><span>${meal.strArea}</span> Dish</p>
  <p>Belongs to <span>${meal.strCategory}</span> Category</p>
  `;
      // button view recipe
      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      //adding event listener to recipe button(popup area)
      button.addEventListener("click", () => {
        openRecipePopup(meal);
      });
      recipecontainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipecontainer.innerHTML = "<h3> Error in Fetching Recipes...</h3>";
  }
};

//function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strmeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};
const openRecipePopup = (meal) => {
  recipedetailscontent.innerHTML = `
<h2 class="recipeName">${meal.strMeal}</h2>
<h3>Ingredients:</h3>
<ul  class="ingredientsList">${fetchIngredients(meal)}</ul>

<div class="recipeInstructions">
  <h3>Instructions:</h3>
  <p>${meal.strInstructions}</p>
</div>
`;

  recipedetailscontent.parentElement.style.display = "block";
};

recipeclosebtn.addEventListener("click", () => {
  recipedetailscontent.parentElement.style.display = "none";
});
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipecontainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
    return;
  }
  fetchRecipes(searchInput);
  // console.log("Button clicked");
});
