const Borrow = require("../models/borrow");
const Device = require("../models/device");

const variable_status = require("../config/variable_status");
const { get } = require("../routes");
const nodemailer = require("nodemailer");


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
    const getBorrow = await Borrow.find({ status: "borrow", email: email })

    console.log(getBorrow.length)
    if (getBorrow.length > 0) {
        res.status(403).send({ "borrow": "cant borrow please return" })

    } else {
        console.log(borrow)
        borrow.date_return = addDays(date_return)
        borrow.date = date = new Date().toString()
        getDeviceId = device.map(data => {
            return data._id
        })
        console.log(getDeviceId)
        updateDevice = await Device.updateMany({
            _id: { $in: getDeviceId }
        }, {
            status_device: "borrow"
        })
        const newBorrow = await Borrow.createBorrow(borrow)
        res.send({ "borrow": borrow })
    }

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
    const getBorrow = await Borrow.aggregate([
        {
            $lookup:
            {
                from: 'users',
                localField: 'email',
                foreignField: 'email',
                as: 'user'
            }
        }
    ])


    res.send({ "borrow": getBorrow })
};
module.exports.getAllBorrow = getAllBorrow;


const getBorrowById = async (req, res, next) => {
    const getBorrow = await Borrow.Borrow.aggregate([
        {
            $match: {
                _id: req.params.id
            }
        },
        {
            $lookup:
            {
                from: 'users',
                localField: 'email',
                foreignField: 'email',
                as: 'user'
            }
        }
    ])



    // find({ _id: req.params.id })
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
    await Device.updateOne({
        _id: device_id
    }, {
        status_device: "active"
    })
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
    const getDeviceId = getBorrow.device.map(data => {
        return data._id
    })
    console.log(getDeviceId)
    await Device.updateMany({
        _id: { $in: getDeviceId }
    }, {
        status_device: "active"
    })


    newDevice.status = "return"
    const updateDeviceInBorrow = await Borrow.updateBorrow(newDevice, borrow_id)
    res.send({ getBorrow: updateDeviceInBorrow })

}


module.exports.supportAppoveReturn = async (req, res, next) => {
    // support ยืนยันการคืน
}



module.exports.historyUserBorrow = async (req, res, next) => {
    const getBorrow = await Borrow.find({
        email: req.params.id
    })
    res.send({ "borrow": getBorrow })
};



module.exports.historyAllBorrow = async (req, res, next) => {
    const getBorrow = await Borrow.aggregate([
        {
            $match: {
                status: "return"
            }
        },
        {
            $lookup:
            {
                from: 'users',
                localField: 'email',
                foreignField: 'email',
                as: 'user'
            }
        }
    ])
    res.send({ "borrow": getBorrow })
};






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
    }).catch(e => {
        console.log('mail :' + username + "  error")

    });


    return 0

}









module.exports.alertReturn = async (req, res, next) => {
    console.log(new Date().toISOString())
    const getBorrow = await Borrow.find({
        status: 'borrow',
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
    sendEmail.map(data => {

        sendmail(data.email)
    })
    res.send({ sendEmail: sendEmail })
}

module.exports.alertReturnByEmail = async (req, res, next) => {
    console.log(new Date().toISOString())
    const getBorrow = await Borrow.find({
        status: 'borrow',
        email:res.params.id
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
    sendEmail.map(data => {

        sendmail(data.email)
    })
    res.send({ sendEmail: sendEmail })
}

