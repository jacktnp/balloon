var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var UserSchema = mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: String,
        default: 'active'
    },

    img: {
        type: []
    },
    contract: {
        type: String
    },
    role: {
        type: String
    },
    date: {
        type: String
    }
});

var User = module.exports = mongoose.model('user', UserSchema)


const createUser = (user) => {
    const newUser = User.create(user).then(e => {
        // console.log(e)
        return e
    })

    return newUser
};
module.exports.createUser = createUser;



const updateUser = async (user, id) => {
    console.log(id)
    var info = {}
    Object.keys(user).map((loopdata, index) => {
        info[loopdata] = Object.values(user)[index]
        console.log(info)
    })
    const updataProfile = await User.findOneAndUpdate({
        _id: id
    }, {
        $set: info
    }, { new: true })
    return updataProfile
};
module.exports.updateUser = updateUser;


const deleteUser = async (id) => {
    const deleteUser = await User.findOneAndRemove({
        _id: id
    })
    return deleteUser
};
module.exports.deleteUser = deleteUser;

//   ------------------------------------------------------------
