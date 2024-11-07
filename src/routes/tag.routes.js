const { Router } = require('express');
const tagRouter = Router();
const getAllTags = require('../handlers/handlerTags/handlerGetAllTags');
const createTag = require('../handlers/handlerTags/handlerCreateTag');


tagRouter.get('/', getAllTags);
tagRouter.post('/', createTag);

module.exports = tagRouter;