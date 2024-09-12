import axios from "axios";

const fetchCategory = async () => {
  const response = await axios.get(
    "https://themealdb.com/api/json/v1/1/categories.php"
  );
  return response.data;
};

const fetchMealsByCategory = async (category:string) => {
  const response = await axios.get(
    `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  return response.data;
}

const getAllDetailsOfMeals = async (id:string) => {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  
  return response
}

export  {fetchCategory, fetchMealsByCategory, getAllDetailsOfMeals};
