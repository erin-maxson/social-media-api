const { Thought, User } = require('../models');

const userController = {
    // Get all users
    getUsers(req, res) {
        Users.find()
            .select('-__v')
            .populate('thoughts')
            .then((users) => res.json(users))
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Get a user
    getUserId(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((thoughts) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((userDb) => res.json(userDb))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
               if (!user) {
                   res.status(404).json({ message: 'No user with that ID' });
                return;
            }
        User.updateMany(
                { _id: { $in: user.friends } },
                { $pull: { friends: req.params.id } }
            )
                    .then(() => {
                        Thought.deleteMany(
                            { username: user.username }
                        )
                            .then(() => {
                                res.json({ message: 'Successfully deleted!' });
                            })
                            .catch((err) => {
                                res.status(500).json(err)
                            })
                    })
                    .catch((err) => {
                        res.status(500).json(err)
                    })

}

module.exports = userController