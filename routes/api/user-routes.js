const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addfriend
} = require('../../controllers/user-controller');


//set up for get all and post
router
.route('/')
.get(getAllUsers)
.post(createUser);

// set up getone and put and delete
router
.route('/:id')
.get(getUserById)
.post(addfriend)
.put(updateUser)
.delete(deleteUser);

router
.route("/:id/")

module.exports =router;