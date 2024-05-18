const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn"); // Corrected variable name
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-closeBtn");

const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"; // Corrected URL

// Function to get recipe
const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipe....</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`); // Corrected URL with HTTPS
        const response = await data.json();
        recipeContainer.innerHTML = "";
        response.meals.forEach((meal) => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe"); // Giving div its class
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs To <span>${meal.strCategory}</span></p>
            `;
            const button = document.createElement("button");
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button); // Appending button element
            // Adding event listener
            button.addEventListener("click", () => {
                openRecipePopup(meal);
            });
            recipeContainer.appendChild(recipeDiv); // One by one it will add
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fetching Recipe....</h2>";
    }
};

// Function to fetch ingredients
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measurement = meal[`strMeasure${i}`];
            ingredientList += `<li>${measurement} ${ingredient}</li>`; // Fixed closing tag
        } else {
            break;
        }
    }
    return ingredientList;
};
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3 class="ingredientList">Ingredients:</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <div class="recipeInstruction">
            <h3>Instruction:</h3>
            <p>${meal.strInstructions}</p> <!-- Corrected property name -->
        </div>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
};

// For closing
recipeCloseBtn.addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none"; // To not show details
});

// For searching
searchBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent auto submit
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the recipe in the search box!!!!</h2>`;
        return;
    }
    fetchRecipe(searchInput);
});

// const openRecipePopup = (meal) => {
//     recipeDetailsContent.innerHTML = `
//         <h2 class="recipeName">${meal.strMeal}</h2>
//         <h3 class="ingredientList">Ingredients:</h3>
//         <ul>${fetchIngredients(meal)}</ul>
//         <div class="recipeInstruction">
//             <h3>Instruction:</h3>
//             <p>${meal.strInstructions}</p> <!-- Corrected property name -->
//         </div>
//     `;
//     recipeDetailsContent.parentElement.style.display = "block";
// };

// // For closing
// recipeCloseBtn.addEventListener("click", () => {
//     recipeDetailsContent.parentElement.style.display = "none"; // To not show details
// });

// // For searching
// searchBtn.addEventListener("click", (e) => {
//     e.preventDefault(); // Prevent auto submit
//     const searchInput = searchBox.value.trim();
//     if (!searchInput) {
//         recipeContainer.innerHTML = `<h2>Type the recipe in the search box!!!!</h2>`;
//         return;
//     }
//     fetchRecipe(searchInput);
// });
