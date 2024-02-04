import React, { useContext, useState } from "react";
import "../App.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/categories";
import { addRecipe } from "../api/recipes";
import Alert from "../components/Alert";
import { UserContext } from "../context/UserContext";

const AddRecipe = () => {
  const [file, setFile] = useState(
    "https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png"
  );
  const { user } = useContext(UserContext);
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [""],
    cookTime: { value: "", type: "minutes" },
    steps: [""],
    category: "",
    prepTime: { value: "", type: "minutes" },
    servings: "",
    image: "",
  });
  const handleIngredientStepChange = (e, index, key) => {
    if (key === "ingrident") {
      const newIngredients = [...recipe.ingredients];
      newIngredients[index] = e.target.value;
      setRecipe({ ...recipe, ingredients: newIngredients });
    } else {
      const newSteps = [...recipe.steps];
      newSteps[index] = e.target.value;
      setRecipe({ ...recipe, steps: newSteps });
    }
  };

  const addSteporIngrident = (key) => {
    if (key === "ingrident") {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, ""],
      });
    } else {
      setRecipe({ ...recipe, steps: [...recipe.steps, ""] });
    }
  };

  const handleCookorPrepTime = (e, key) => {
    if (key === "cookTime") {
      const newCookTime = { ...recipe.cookTime, value: e.target.value };
      setRecipe({ ...recipe, cookTime: newCookTime });
    } else {
      const newPrepTime = { ...recipe.prepTime, value: e.target.value };
      setRecipe({ ...recipe, prepTime: newPrepTime });
    }
  };
  const handleCookorPrepType = (e, key) => {
    if (key === "cookTime") {
      const newCookTime = { ...recipe.cookTime, type: e.target.value };
      setRecipe({ ...recipe, cookTime: newCookTime });
    } else {
      const newPrepTime = { ...recipe.prepTime, type: e.target.value };
      setRecipe({ ...recipe, prepTime: newPrepTime });
    }
  };

  const removeSteporIngrident = (index, key) => {
    if (key === "ingrident") {
      const newIngredients = [...recipe.ingredients];
      newIngredients.splice(index, 1);
      setRecipe({ ...recipe, ingredients: newIngredients });
    } else {
      const newSteps = [...recipe.steps];
      newSteps.splice(index, 1);
      setRecipe({ ...recipe, steps: newSteps });
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setRecipe({
      title: "",
      ingredients: [""],
      cookTime: { value: "", type: "minutes" },
      steps: [""],
      category: "",
      prepTime: { value: "", type: "minutes" },
      servings: "",
      image: "",
    });
  };

  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: () => addRecipe(recipe),
    mutationKey: ["addRecipe"],
    onSuccess: () => {
      handleReset();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(recipe);
    mutate();
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return (
    <div className="container mx-auto p-5">
      <div className="font-bold">
        <h1 className="text-3xl  text-center  mainFont">Add Recipe</h1>
      </div>

      {user ? (
        <div className="m-3 flex justify-center">
          <form onSubmit={handleSubmit} className="w-full md:w-[50%]">
            <div className="block md:flex md:justify-between ">
              <div className="flex flex-col md:w-[50%]">
                <div className="mb-4 w-full ">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-bold text-gray-900"
                  >
                    {" "}
                    Recipe Title{" "}
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Give Your Recipe a Title"
                    value={recipe.title}
                    onChange={(e) =>
                      setRecipe({ ...recipe, title: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4 w-full ">
                  <label
                    htmlFor="servings"
                    className="block mb-2 text-sm font-bold text-gray-900"
                  >
                    {" "}
                    Servings{" "}
                  </label>
                  <input
                    type="number"
                    id="servings"
                    name="servings"
                    placeholder="Servings"
                    value={recipe.servings}
                    onChange={(e) =>
                      setRecipe({ ...recipe, servings: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4 w-full ">
                  <label
                    htmlFor="servings"
                    className="block mb-2 text-sm font-bold text-gray-900"
                  >
                    {" "}
                    Category
                  </label>
                  <input
                    list="category"
                    name="category"
                    onChange={(e) => {
                      setRecipe({ ...recipe, category: e.target.value });
                    }}
                    className="w-full border-2 border-gray-200 rounded p-2"
                    required
                  />
                  <datalist
                    id="category"
                    className="w-full border-2 border-gray-200 rounded p-2 "
                  >
                    {categories?.map((category) => (
                      <option value={category.categoryName} />
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-bold text-gray-900"
                >
                  {" "}
                  Upload an Image{" "}
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => {
                    setFile(URL.createObjectURL(e.target.files[0]));
                    setRecipe({ ...recipe, image: e.target.files[0] });
                  }}
                  className="file:mr-4 file:mb-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-black-700 hover:file:bg-red-100"
                  required
                />
                <img
                  src={file}
                  alt="recipePicture"
                  width={"260px"}
                  height={"260px"}
                />
              </div>
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="cookTime"
                className="block mb-2 text-sm font-bold text-gray-900"
              >
                {" "}
                Cook Time{" "}
              </label>
              <div className="grid grid-cols-2 gap-1 ">
                <input
                  type="number"
                  id="cookTime"
                  name="cookTime"
                  placeholder="Cook Time"
                  value={recipe.cookTime.value}
                  onChange={(e) => handleCookorPrepTime(e, "cookTime")}
                  className="p-2 border border-gray-300 rounded"
                  required
                />

                <select
                  value={recipe.cookTime.type}
                  className="border-2 border-gray-200 rounded p-2"
                  onChange={(e) => handleCookorPrepType(e, "cookTime")}
                >
                  <option value="minutes">Mins</option>
                  <option value="hours">Hours</option>
                  <option value="Days">Days</option>
                </select>
              </div>
            </div>
            <div className="mb-4 ">
              <label
                htmlFor="prepTime"
                className="block mb-2 text-sm font-bold text-gray-900"
              >
                {" "}
                Prep Time{" "}
              </label>
              <div className="grid grid-cols-2 gap-1 ">
                <input
                  type="number"
                  id="prepTime"
                  name="prepTime"
                  placeholder="Prep Time"
                  value={recipe.prepTime.value}
                  onChange={(e) => handleCookorPrepTime(e, "prepTime")}
                  className="p-2 border border-gray-300 rounded"
                  required
                />

                <select
                  value={recipe.prepTime.type}
                  className="border-2 border-gray-200 rounded p-2"
                  onChange={(e) => handleCookorPrepType(e, "cookTime")}
                >
                  <option value="minutes">Mins</option>
                  <option value="hours">Hours</option>
                  <option value="Days">Days</option>
                </select>
              </div>
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="ingridents"
                className="block mb-2 text-sm font-bold text-gray-900"
              >
                {" "}
                Ingridents{" "}
              </label>
              {recipe.ingredients.map((ingrident, index) => (
                <div key={index} className="grid grid-cols-3 gap-3 mb-2">
                  <input
                    type="text"
                    id="ingrident"
                    name="ingrident"
                    placeholder="Ingrident"
                    value={ingrident}
                    onChange={(e) =>
                      handleIngredientStepChange(e, index, "ingrident")
                    }
                    className="w-full p-2 border border-gray-300 rounded col-span-2"
                    required
                  />

                  <a
                    className="btn border-red-700  text-red-700 bg-transparent"
                    onClick={(e) => removeSteporIngrident(index, "ingrident")}
                  >
                    Remove
                  </a>
                </div>
              ))}
              <div className="grid grid-cols-1 mt-2">
                <a
                  className="btn border-[#FE6E63] bg-transparent text-black hover:bg-[#FE6E63] hover:text-white col-span-3 "
                  onClick={(e) => addSteporIngrident("ingrident")}
                >
                  Add Ingrident
                </a>
              </div>
            </div>

            <div className="mb-4 w-full ">
              <label
                htmlFor="steps"
                className="block mb-2 text-sm font-bold text-gray-900"
              >
                {" "}
                Steps{" "}
              </label>
              {recipe.steps.map((step, index) => (
                <div key={index} className="grid grid-cols-3 gap-3 mb-2">
                  <input
                    type="text"
                    id="steps"
                    name="steps"
                    placeholder="e.g 2 cups flour, sifted"
                    value={step}
                    onChange={(e) =>
                      handleIngredientStepChange(e, index, "step")
                    }
                    className="w-full p-2 border border-gray-300 rounded col-span-2"
                    required
                  />

                  <a
                    className="btn border-red-700  text-red-700 bg-transparent"
                    onClick={(e) => removeSteporIngrident(index, "step")}
                  >
                    Remove
                  </a>
                </div>
              ))}
              <div className="grid grid-cols-1 gap-3">
                <a
                  onClick={(e) => addSteporIngrident("step")}
                  className="btn border-[#FE6E63] bg-transparent text-black hover:bg-[#FE6E63] hover:text-white col-span-3 "
                >
                  Add Step
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="submit" className="btn bg-red-700 text-white">
                Add Recipe
              </button>
              <button
                type="reset"
                className="btn text-black"
                onClick={handleReset}
              >
                RESET
              </button>
            </div>
          </form>
          {isLoading ? (
            <Alert bg="bg-yellow-300" text="Adding Recipe..." />
          ) : null}
          {isSuccess ? (
            <Alert bg="bg-green-300" text="Recipe Added Successfully!" />
          ) : null}
        </div>
      ) : (
        <div className="flex justify-center">
          <Alert
            text="You need an account to view your recipes"
            bg="bg-red-700 text-white text-center w-[50%]"
          />
        </div>
      )}
    </div>
  );
};

export default AddRecipe;
