import instance from ".";

const getAllCategories = async () => {
  const { data } = await instance.get("/getCategories");
  return data;
};

const addCategory = async (category) => {
  try {
    const { data } = await instance.post("/addCategory", category);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getRecipebyCategory = async (id) => {
  const { data } = await instance.get(`/getRecipesByCategory/${id}`);
  console.log(data);
  return data;
};

export { getAllCategories, getRecipebyCategory };
