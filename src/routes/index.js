const { Router } = require('express');
const userRouter = require('./user.routes');
const articleRouter = require('./article.routes');
const commentRouter = require('./comment.routes');
const tagRouter = require('./tag.routes');
const voteRouter = require('./vote.routes');
const likeRouter = require('./like.routes');



const router = Router();


router.use((req, res, next) => {
    console.log(`Solicitud a la ruta: ${req.url}`);
    next();
});


router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('/comments', commentRouter);
router.use('/tags', tagRouter);
router.use('/votes', voteRouter);
router.use('/likes', likeRouter);


module.exports = router;
