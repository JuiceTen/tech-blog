const router = require('express').Router();
const {  Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({})
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/',withAuth, async (req, res) => {
    try{

        if(req.session) {
            const commentData = Comment.create({
                text: req.body.text,
                blog_id: req.body.blog_id,
                user_id: req.session.user_id,
                
            });

            res.status(200).json(commentData)
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({message: 'there is no comment with this id'});
            return;
        }

        res.status(200).json(commentData);

    } catch (err) {

        res.status(500).json(err)
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update({
            text: req.body.text,
        },
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
                blog_id: req.session.blog_id
            }
        },
        );

        if(!commentData) {
            res.status(404).json({message: 'there is no comment with this id'})
        }

        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;