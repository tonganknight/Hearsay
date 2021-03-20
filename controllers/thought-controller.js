const { Thought, User } = require('../models');
const { rawListeners } = require('../models/User');

const thoughtController ={ 
// get all thoughts
getAllthoughts(req, res) {
    Thought.find({})
    .populate({
        path: 'Thought',
        select: '-__v'
    })
    .select('-__v')
    .sort({_id: -1})
    .then(dbthoughtData => res.json(dbthoughtData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
//get thought by Id
getThoughtbyId({ params}, res) {
    Thought.findOne({ _id: params.id})
    .populate({
        path: "Thought",
        select: ('-__v')
    })
    .select('-__v')
    .then(dbthoughtData => {
        if(!dbthoughtData) {
            res.status(404).son({ message: 'No Thought matches this Id!'});
            return;
        }
        res.json(dbthoughtData)
    }
)},
//create thought
addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
    .then ((addid) => {
        //console.log("this is it", body._id)
        return User.findOneAndUpdate(
            {_id: body._id},
            {$push: { thought:_id} },
            { new: true },
        );
    })
    .then(dbthoughtData => {
        if (!dbthoughtData) {
            res.status(404).json({ message: 'No Thought matches this Id!'});
            return;
        }
        res.json(dbthoughtData);
    })
    .catch(err => res.json(err));
},
updatethought({ params, body}, res) {
    Thought.findOneAndUpdate({ _id: params }, body, { new: true, runValidators: true })
    .then(dbthoughtData => {
        if (!dbthoughtData) {
            res.status(404).json({ message: 'No Thought matches this Id'});
            return;
        }
        res.json(dbthoughtData);
    })
    .catch(err => res.status(400).json(err));
},
removethought({ params }, res) {
    console.log(params);
    Thought.findOneAndDelete({ _id: params.id})
    .then(deletedthought => {
        if (!deletedthought) {
            return res.status(404).json ({ message: 'No Thought matches this Id'});
        }
        return User.findOneAndUpdate(
            {_id: params.userId },
            { $pull: { thought: params.thoughtId} },
            {new: true}
        );
    })
    .then(dbthoughtData => {
        if (!dbthoughtData) {
            rawListeners.status(404).json({ message: 'No Thought matches this Id'});
            return;
        }
        res.json(dbthoughtData);
    })
    .catch(err => res.json(err));
}

};

module.exports = thoughtController;