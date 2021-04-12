var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var TypeSchema = mongoose.Schema({
    status_type: {
        type: String,
        default: 'active'
    },
    detail_type: {
        type: String
    },
    name_type: {
        type: String
    },
    img: {
        type: []
    },
    date: {
        type: String
    }
});

var Type = module.exports = mongoose.model('type', TypeSchema)


const createType = (type) => {
    const newType = Type.create(type).then(e => {
        // console.log(e)
        return e
    })

    return newType
};
module.exports.createType = createType;



const updateType = async (type, id) => {
    console.log(id)
    var info = {}
    Object.keys(type).map((loopdata, index) => {
        info[loopdata] = Object.values(type)[index]
        console.log(info)
    })
    const updataProfile = await Type.findOneAndUpdate({
        _id: id
    }, {
        $set: info
    })
    return updataProfile
};
module.exports.updateType = updateType;


const deleteType = async (id) => {
    const deleteType = await Type.findOneAndRemove({
        _id: id
    })
    return deleteType
};
module.exports.deleteType = deleteType;

//   ------------------------------------------------------------
