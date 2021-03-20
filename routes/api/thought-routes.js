const router = require('express').Router();
const {
    getAllthoughts,
    getThoughtbyId,
    addThought,
    updatethought,
    removethought
} = require('../../controllers/thought-controller');


//set up for get all and post 
router
.route('/')
.get(getAllthoughts)
.post(addThought)

// set up getone and pu and delete
router
.route('/:id')
.get(getThoughtbyId)
.put(updatethought)
.delete(removethought);

module.exports = router;



