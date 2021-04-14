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
        result.description === "IT Student" ? ldaprole = "student" : ldaprole = "teacher"
        const resdata = {
            firstname: result.givenName,
            lastname: result.sn,
            email: email,
            role: ldaprole,
            uid: result.uSNCreated,
        }
        const token = 'Bearer ' + jwt.sign(
            { email: req.body.email, password: encrypepassword },
            'itkmitl',
            { expiresIn: "6h" })
        console.log('Authenticated successfully');

        const userLogin = await User.find({ email: email })


        const newUser = {
            email: email,
            role: ldaprole,
            contract: email,
            date: new Date
        }
        console.log(!userLogin)
        console.log(newUser)

        if (!userLogin[0]) {

            const createNewUser = await User.createUser(newUser)
            console.log(createNewUser)

        }

        return res.status(200).json({
            status: 'Success',
            data: resdata,
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

    res.send({
        "token": token,
        "user":userLogin
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
