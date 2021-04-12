const Type = require("../models/type");
const variable_status = require("../config/variable_status");



const createType = async (req, res, next) => {
    const type = {
        detail_type,
        name_type,
    } = req.body
    console.log(type)
    if (req.files) {
        var paths = req.files.map(file => ({ url: file.path, filename: file.filename }))
        type.img = paths
    }
    type.date = date = new Date().toString()
    const newType = await Type.createType(type)
    res.send({ "type": newType })
};
module.exports.createType = createType;


const updateType = async (req, res, next) => {
    const type = {
        status_type,
        detail_type,
        name_type,
    } = req.body
    if (req.files) {
        var paths = req.files.map(file => ({ url: file.path, filename: file.filename }))
        type.img = paths
    }
    const newType = await Type.updateType(type, req.params.id)


    res.send({ "type": newType })
};

module.exports.updateType = updateType;




const deleteType = async (req, res, next) => {
    const deleteType = await Type.deleteType(req.params.id)
    res.send({ "type": deleteType })
};
module.exports.deleteType = deleteType;


const getAllType = async (req, res, next) => {
    const getType = await Type.find()
    res.send({ "type": getType })
};
module.exports.getAllType = getAllType;


const getTypeById = async (req, res, next) => {
    const getType = await Type.find({ _id: req.params.id })
    res.send({ "type": getType })
};
module.exports.getTypeById = getTypeById;


module.exports.getTypeAndDevice = async (req, res, next) => {
    const getType = await Type.aggregate([
        { "$addFields": { "_id": { "$toString": "$_id" } } },

        {
            $lookup:
            {
                from: 'devices',
                localField: 'name_type',
                foreignField: 'name_type',
                as: 'device_in_type'
            }
        },
    ])
    res.send({ "type": getType })
};






// --------------------------------------------------------------------------
