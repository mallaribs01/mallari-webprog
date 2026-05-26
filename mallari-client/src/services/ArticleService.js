import axios from "axios";
import constants from "../../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

// GET ARTICLES
export const fetchArticles = () => API.get("/");

// CREATE ARTICLE
export const createArticle = (article) => API.post("/", article);

// UPDATE ARTICLE
export const updateArticle = (id, article) => API.put(`/${id}`, article);

// DELETE ARTICLE
export const deleteArticle = (id) => API.delete(`/${id}`);
