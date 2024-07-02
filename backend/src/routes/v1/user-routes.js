const router = require('express').Router();
const { UserController } = require('../../controller')
router.get('/', (req, res) => {
    res.send('from user routes')
})

router.post('/signup', 
    UserController.signup
);

router.post('/verify',
    UserController.verify
);

router.post('/signin',
    UserController.signin
);

module.exports = router;