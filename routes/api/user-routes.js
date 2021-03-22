const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addfriend,
    deletefriend
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
.put(updateUser)
.delete(deleteUser);

router
.route("/:userId/friends/:id")
.post(addfriend)
.delete(deletefriend)

module.exports =router;