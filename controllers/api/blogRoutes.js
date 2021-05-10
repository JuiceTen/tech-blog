const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/withAuth')

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            order: [['createdAt', 'DESC']],
        },
        {
            include: {
                model: User,
                attributes: ['name', 'email']
            }
        });

        res.status(200).json(blogData)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/:id', async (req, res) => { 
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id,
            },
        },
        {
            include: {
                model: User,
                attributes: ['name', 'email']
            }
        })

        if (!blogData) {
            res.status(404).json({message: 'no blog by this id'});
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err)
    }
})


router.post('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(blogData);

    } catch (err) {
        res.status(400).json(err)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({message: 'No blog found with this id'});
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update({
            title: req.body.title,
            content: req.body.content,
        },
            {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        }
        );

        if(!blogData) {
            res.status(404).json({message: 'No blog found with this id'});
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;