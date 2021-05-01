const Device = require("../models/device");
const variable_status = require("../config/variable_status");



const createDevice = async (req, res, next) => {
    const device = {
        code_device,
        name_type
    } = req.body
    console.log(device)

    const newDevice = await Device.createDevice(device)
    console.log(newDevice)
    res.send({ "device": newDevice })
};
module.exports.createDevice = createDevice;


const updateDevice = async (req, res, next) => {
    const device = {
        status_device,
        code_device,
        detail_device,
    } = req.body
    const newDevice = await Device.updateDevice(device, req.params.id)


    res.send({ "device": newDevice })
};
module.exports.updateDevice = updateDevice;




const deleteDevice = async (req, res, next) => {
    const deleteDevice = await Device.deleteDevice(req.params.id)
    res.send({ "device": deleteDevice })
};
module.exports.deleteDevice = deleteDevice;


const getAllDevice = async (req, res, next) => {
    const getDevice = await Device.find()
    res.send({ "device": getDevice })
};
module.exports.getAllDevice = getAllDevice;


const getDeviceById = async (req, res, next) => {
    const getDevice = await Device.find({ _id: req.params.id })
    res.send({ "device": getDevice })
};
module.exports.getDeviceById = getDeviceById;


const getDeviceByCode = async (req, res, next) => {
    const getDevice = await Device.find({ code_device: req.params.id })
    res.send({ "device": getDevice })
};
module.exports.getDeviceByCode = getDeviceByCode;



const getAllDeviceByType = async (req, res, next) => {
    const getDevice = await Device.find({name_type: req.params.id})
    res.send({ "device": getDevice })
};
module.exports.getAllDeviceByType = getAllDeviceByType;



// --------------------------------------------------------------------------
module.exports.getManyDevice = async (req, res, next) => {

    const getDevice = await Device.aggregate([
        {
            $match: { code_device: { $in: req.body.data } }
        },
        {
            $lookup:
            {
                from: 'types',
                localField: 'name_type',
                foreignField: 'name_type',
                as: 'device_in_type'
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$device_in_type", 0] }, "$$ROOT"] } }
        },
        {
            $project: {
                device_in_type: 0,
                date: 0,
                status_type: 0,
            }
        },
    ])



    res.send({ "device": getDevice })
};




