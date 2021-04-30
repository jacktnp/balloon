const Borrow = require("../models/borrow");
const variable_status = require("../config/variable_status");
const { get } = require("../routes");


const addDays = function (days) {
    var date = new Date();
    date.setDate(date.getDate() + parseInt(days));
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
    res.send({ "borrow": borrow })
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
// --------------------------------------------------------------------------------------



function sendmail(username) {


    let transporter = nodemailer.createTransport({
        // host: 'gmail',
        secure: false,
        // service: 'Gmail',
        // auth: {
        //   user: 'prachyaprapawat@gmail.com',
        //   pass: 'prachya123',
        // },
        tls: {
            rejectUnauthorized: false
        },
        service: 'SendinBlue', // no need to set host or port etc.
        auth: {
            user: 'thanaponwps@gmail.com',
            pass: 'xsmtpsib-b30138123d97b037ccd7ed40b95f942e25253ef25ace0d8f87681dc61f74f822-Wx4BMCyZf9JGgamO'
        }
    });
    transporter.sendMail({
        from: 'thanaponwps@gmail.com',   // ผู้ส่ง
        to: "" + username,// ผู้รับ
        subject: "เลยกำหนดคืนของ Suppport ",                      // หัวข้อ
        text: 'เลยกำหนดคืนของ Suppport',                         // ข้อความ
        // html: "<br> Link:<a href= http://localhost:8080/test/validateRegister/" + validateRegisterToken + "> LISS <a>"  // ข้อความ
        html: `<b> กรุณาคืนของที่ยืม support  </b>`
    });
    return 0

}






const nodemailer = require("nodemailer");



module.exports.alertReturn = async (req, res, next) => {

    console.log(new Date().toISOString())
    const getBorrow = await Borrow.find({
        status: 'borrow',
        // date_return:
        // {
        //     $gte: { $date: new Date(today) }
        // }
    })
    let sendEmail = []
    getBorrow.map(data => {
        if (data.date_return.getTime() <= new Date().getTime()) {
            // sendEmail.email = data.email
            // sendEmail.date_return = data.date_return
            const objData = { email: data.email, date_return: data.date_return }
            sendEmail.push(objData)
        }
    })
    console.log(sendEmail)


    const username = ["boss003_@hotmail.com", 'prachyaprapawat@gmail.com']
    username.map(data => {
        sendmail(data)

    })


    res.send({ getBorrow: getBorrow })
}

