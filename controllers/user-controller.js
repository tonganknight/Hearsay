const { User, Thought } = require('../models');

const userController ={
//get all the users
getAllUsers(req, res) {
    User.find({})
    .populate({
        path: 'Thought',
        select: '-__v'
    })
    .select('-__v')
    .sort({_id: -1})
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
// get user by Id
getUserById({ params}, res) {
    User.findOne({ _id: params.id})
    .populate({
        path: "User",
        select: ('-__v')
    })
    .select('-__v')
    .then(dbUsersData => {
        if (!dbUsersData) {
            res.status(404).json({ message: 'No User with this Id!'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
},

//create User
createUser({ body}, res) {
    User.create(body)
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => res.status(400).json(err));
},
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUsersData => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  addfriend({ params, body }, res) {
    console.log(body);
    User.findOne({username: body.username
    })
    .then(dbUserData => {
      if(!dbUserData){
        return res.status(404).json ({ message: "No User matches this query"})
      }
      return User.findOneAndUpdate(
        {_id: params.id},
        {$push:{ Friend: body.username}}
        
      )
    })
  }
  }

module.exports = userController;