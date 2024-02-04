import instance from ".";

const getAllRecipes = async () => {
  const { data } = await instance.get("/recipes");
  return data;
};

const addRecipe = async (recipe) => {
  const formData = new FormData();

  for (const key in recipe) {
    if (!"cookTime prepTime ingredients steps".includes(key)) {
      formData.append(key, recipe[key]);
    }
  }

  recipe.ingredients?.forEach((a) => {
    formData.append("ingredients", a);
  });

  recipe.steps?.forEach((a) => {
    formData.append("steps", a);
  });

  for (let key in recipe.prepTime) {
    formData.append(`prepTime[${key}]`, recipe.prepTime[key]);
  }

  for (let key in recipe.cookTime) {
    formData.append(`cookTime[${key}]`, recipe.cookTime[key]);
  }

  const { data } = await instance.post("/addRecipe", formData);
  return data;
};

const getRecipeByID = async (id) => {
  const { data } = await instance.get(`/recipes/${id}`);
  return data;
};

const getUserRecipes = async () => {
  try {
    const { data } = await instance.get("/user/recipes");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllRecipes, addRecipe, getRecipeByID, getUserRecipes };
