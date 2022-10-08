const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbThoughts) => {
                res.json(dbThoughts)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // get thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((dbThoughts) => {
                !dbThoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(dbThoughts)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })

            .then((user) => {
                !user
                    ? res.status(404).json({ message: "No user with this ID" })
                    : res.json(user)
            })

            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    //updating thoughts
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought({
            _id: req.params.thoughtId
        })
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: "No thought found with this ID" })
                }
                return User.findOneAndUpdate(
                    { _id: req.params.username },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            })
            .then((user) => {
                res.json(user)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
addReaction(req, res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        { $push: {reactions: req.body}},
        {new: true}
    )
        .then((user)=> {
            !user
            ?res.status(404).json({message: "No user with this ID"})
            :res.json(user)
        })
        .catch((err)=> {
            res.status(500).json(err)
        })
},
deleteReaction(req, res) {
    Thought.findOneAndDelete(
        { _id: req.params.thoughtId},
        { $pull: {reactions: {reactionId: req.params.reactionId}}},
        {new: true}
    )
        .then((user) => {
            !user
            ?res.status(404).json({message: "No user with this ID"})
            :res.json(user)
        })
        .catch((err)=> {
            res.status(500).json(err)
        })
}
};

module.exports = thoughtController