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

export { getAllCategories };
