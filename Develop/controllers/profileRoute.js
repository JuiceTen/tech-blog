const router = require('express').Router();
const { User, Blog, Comment } = require('../models')
const withAuth = require('../utils/withAuth');


router.get('/', withAuth, async (req, res) => {
    try {
        const profileData = await User.findByPk(req.session.user_id, {
   
            attributes: {
                exclude: ['password']
            },
        
            include: [
                {
                    model: Blog,
                },
                {
                    model: Comment,
                }
            ]
        });

        const profile = profileData.get({plain: true})

        res.render('profile', {
            ...profile,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: {
                model: User,
                attributes: ['name', 'email']
            },
        });
         
        const blog = blogData.get({plain: true})

        res.render('edits', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        
        res.status(500).json(err);
    }
});



module.exports = router