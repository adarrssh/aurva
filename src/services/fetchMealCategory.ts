import axios from "axios";

const fetchMealCategory = async () => {
  const response = await axios.get(
    "http://themealdb.com/api/json/v1/1/categories.php"
  );
  return response.data;
};

export default fetchMealCategory;
