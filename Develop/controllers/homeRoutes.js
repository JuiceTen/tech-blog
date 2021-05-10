const router = require('express').Router();
const { User, Blog, Comment} = require('../models')
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: {
                model: User,
                attributes: ['name', 'email']
            },
        });
        
        const blogs = blogData.map((blog) => blog.get({plain: true}));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['name', 'email']
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['name', 'email']
                }
            }
            ]
        });
         
        const blog = blogData.get({plain: true})

        res.render('blogs', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        
        res.status(500).json(err);
    }
});



router.get('/login', (req, res) => { 
    if (req.session.logged_in) {
        res.redirect('/')
    }
    res.render('login');
})

module.exports = router;