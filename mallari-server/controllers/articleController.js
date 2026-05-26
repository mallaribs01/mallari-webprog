const Article = require("../models/Article");

// GET ARTICLES
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// CREATE ARTICLE
const createArticle = async (req, res) => {
  try {
    const article = new Article({
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      content: req.body.content,
      image: req.body.image,
      status: req.body.status,
    });

    const saved = await article.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// UPDATE ARTICLE
const updateArticle = async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        image: req.body.image,
        status: req.body.status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// DELETE ARTICLE
const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};