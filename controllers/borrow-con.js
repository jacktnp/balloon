const Borrow = require("../models/borrow");
const variable_status = require("../config/variable_status");
const { get } = require("../routes");


const addDays = function (days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    console.log(date)
    return date;
}

const createBorrow = async (req, res, next) => {
    const borrow = {
        email,
        date_return,
        device,
    } = req.body
    console.log(borrow)
    borrow.date_return = addDays(date_return)
    borrow.date = date = new Date().toString()
    const newBorrow = await Borrow.createBorrow(borrow)
    res.send({ "borrow": newBorrow })
};
module.exports.createBorrow = createBorrow;



const updateBorrow = async (req, res, next) => {
    const borrow = {
        status,
    } = req.body
    if (req.body.date_return) {
        borrow.date_return = addDays(req.body.date_return)
    }
    const newBorrow = await Borrow.updateBorrow(borrow, req.params.id)

    res.send({ "borrow": newBorrow })
};

module.exports.updateBorrow = updateBorrow;




const deleteBorrow = async (req, res, next) => {
    const deleteBorrow = await Borrow.deleteBorrow(req.params.id)
    res.send({ "borrow": deleteBorrow })
};
module.exports.deleteBorrow = deleteBorrow;


const getAllBorrow = async (req, res, next) => {
    const getBorrow = await Borrow.find()
    res.send({ "borrow": getBorrow })
};
module.exports.getAllBorrow = getAllBorrow;


const getBorrowById = async (req, res, next) => {
    const getBorrow = await Borrow.find({ _id: req.params.id })
    res.send({ "borrow": getBorrow })
};
module.exports.getBorrowById = getBorrowById;

// --------------------------------------------------------------------------








module.exports.updateOneDeviceInBorrow = async (req, res, next) => {
    const {
        device_id,
        borrow_id
    } = req.body
    const getBorrow = await Borrow.findOne({
        device: {
            $elemMatch: { _id: device_id }
        },
        _id: borrow_id
    })
    let check = 0
    const updateDevice = getBorrow.device.map(data => {

        if (data._id === device_id) {
            data.status = "return"
        }
        if (data.status === 'borrow') {
            check++
        }
        return data
    })
    console.log(updateDevice)

    const newDevice = {
        device: updateDevice,
    }
    if (check === 0) {
        newDevice.status = "return"
    }
    const updateDeviceInBorrow = await Borrow.updateBorrow(newDevice, borrow_id)
    res.send({ getBorrow: updateDeviceInBorrow })

}

module.exports.updateAllDeviceInBorrow = async (req, res, next) => {
    const {
        borrow_id
    } = req.body
    const getBorrow = await Borrow.findOne({
        _id: borrow_id
    })
    const updateDevice = getBorrow.device.map(data => {
        data.status = "return"
        return data
    })
    const newDevice = {
        device: updateDevice,
    }

    newDevice.status = "return"
    const updateDeviceInBorrow = await Borrow.updateBorrow(newDevice, borrow_id)
    res.send({ getBorrow: updateDeviceInBorrow })

}


module.exports.supportAppoveReturn = async (req, res, next) => {
    // support ยืนยันการคืน
}

