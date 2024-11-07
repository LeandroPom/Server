const { Router } = require('express');
const articleRouter = Router();
const getAllArticles = require('../handlers/handlerArticles/handlerGetAllArticles');
const createArticle = require('../handlers/handlerArticles/handlerCreateArticle');


articleRouter.get('/', getAllArticles);
articleRouter.post('/', createArticle);

module.exports = articleRouter;