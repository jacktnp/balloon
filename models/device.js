var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var DeviceSchema = mongoose.Schema({
    code_device: {
        type: String
    },
    status_device: {
        type: String,
        default: 'Active'
    },
    name_type: {
        type: String
    },
    img:{
        type:[]
    },
    date: {
        type: String,
        default: new Date()
    }
});

var Device = module.exports = mongoose.model('device', DeviceSchema)


const createDevice = (device) => {
    const newDevice = Device.create(device).then(e => {
        return e
    })

    return newDevice
};
module.exports.createDevice = createDevice;



const updateDevice = async (device, id) => {
    console.log(id)
    var info = {}
    Object.keys(device).map((loopdata, index) => {
        info[loopdata] = Object.values(device)[index]
        console.log(info)
    })
    const updataProfile = await Device.findOneAndUpdate({
        _id: id
    }, {
        $set: info
    }, { new: true })
    return updataProfile
};
module.exports.updateDevice = updateDevice;


const deleteDevice = async (id) => {
    const deleteDevice = await Device.findOneAndRemove({
        _id: id
    })
    return deleteDevice
};
module.exports.deleteDevice = deleteDevice;

//   ------------------------------------------------------------
