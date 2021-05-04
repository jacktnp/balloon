const loginLdap = require("../utils/ldap");
const Cryptr = require('cryptr');
const jwt = require('jsonwebtoken');
const User = require("../models/user");



module.exports.loginLadp = async (req, res, next) => {
    loginLdap.loginLdap(req.body.email, req.body.password).then(async (result) => {
        const cryptr = new Cryptr('secretepassword');
        const encrypepassword = cryptr.encrypt(req.body.password);
        const email = result.userPrincipalName.split("@")[0]
        let ldaprole = ''
        let img = ''
        const randomPictureWoman = [
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060265/webdesign-project/fp1_bke5qf.png',
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060263/webdesign-project/fp2_rf4wrd.png',
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060262/webdesign-project/fp4_deeoxs.png',
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060261/webdesign-project/fp3_pujqcy.png',
        ]
        const randomPictureSupport = [
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060264/webdesign-project/s3_zv6pi9.png',
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060263/webdesign-project/s2_pszlrg.png',
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060264/webdesign-project/s1_if0l3u.png',
        ]
        const randomPictureMan = [
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060262/webdesign-project/mp4_onmomr.png',
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060261/webdesign-project/mp2_ob9nno.png',
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060261/webdesign-project/mp3_vkcgfa.png',
            'https://res.cloudinary.com/dzrw6abfr/image/upload/v1620060261/webdesign-project/mp1_tnsmy7.png'
        ]
        if (result.description === "IT Student" || result.description === "Lecture") {
            ldaprole = "student"

            if (result.givenName.slice(0, 3) === 'นาย') {
                img = [{ url: randomPictureMan[Math.floor((Math.random() * 4))] }]
            } else {
                img = [{ url: randomPictureWoman[Math.floor((Math.random() * 4))] }]
            }
        } else {
            ldaprole = "support"
            img = [{ url: randomPictureSupport[Math.floor((Math.random() * 3))] }]
        }

        if (email === 'it60070031') {
            img = [{ url: 'https://res.cloudinary.com/dzrw6abfr/image/upload/v1619911565/webdesign-project/uldh9cdvjstvavcccc9i.jpg' }]
        }
        const resdata = {
            firstname: result.givenName,
            lastname: result.sn,
            email: email,
            role: ldaprole,
            uid: result.uSNCreated,
            img: img
        }
        const token = jwt.sign(
            { email: req.body.email, role: ldaprole },
            'MY_SECRET_KEY',
            { expiresIn: "1h" })
        console.log('Authenticated successfully');

        const userLogin = await User.find({ email: email })
        const contract = email.slice(2) + '@it.kmitl.ac.th'
        const fullname = resdata.firstname + " " + resdata.lastname
        const newUser = {
            email: email,
            role: ldaprole,
            contract: contract,
            date: new Date,
            fullname: fullname,
            img: img
        }
        if (!userLogin[0]) {
            const createNewUser = await User.createUser(newUser)
        }

        return res.status(200).json({
            status: 'Success',
            data: newUser,
            token: token
        })
    }).catch(err => {
        return res.status(403).json({
            status: 'fail',

        })

    })
};



module.exports.login = async (req, res, next) => {
    const userLogin = await User.findOne({ email: req.body.email })

    const token = jwt.sign(
        { email: req.body.email },
        process.env.MY_SECRET_KEY,
        { expiresIn: "6h" })


    const date = {
        "token": token,
        "user": userLogin
    }

    res.send({
        "data": date
    })
};


// module.exports.login = async (req, res, next) => {

//     const newUser = {
//         email: req.body.email,
//         role: req.body.role,
//         contract: email,
//         date: new Date
//     }
//     const createNewUser = await User.createUser(newUser)
//     return res.status(403).json({
//         status: 'fail',
//     })
// }

// --------------------------------------------------------------------------
