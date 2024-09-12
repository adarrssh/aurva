import axios from "axios";

const fetchCategory = async () => {
  const response = await axios.get(
    "http://themealdb.com/api/json/v1/1/categories.php"
  );
  return response.data;
};

const fetchMealsByCategory = async (category:string) => {
  const response = await axios.get(
    `http://themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  return response.data;
}

export  {fetchCategory, fetchMealsByCategory};
