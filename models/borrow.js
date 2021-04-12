var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var BorrowSchema = mongoose.Schema({
    email: {
        type: String
    },
    date_return: {
        type: String
    },
    device: {
        type: [
            {
                _id: { type: String },
                code_device: { type: String },
                name_type: { type: String },
                status: {
                    type: String,
                    default: 'borrow'
                }
            }
        ]
    },
    status: {
        type: String,
        default: 'borrow'

    },
    date: {
        type: String,
        default: new Date
    }
});

var Borrow = module.exports = mongoose.model('borrow', BorrowSchema)


const createBorrow = (borrow) => {
    const newBorrow = Borrow.create(borrow).then(e => {
        // console.log(e)
        return e
    })

    return newBorrow
};
module.exports.createBorrow = createBorrow;



const updateBorrow = async (borrow, id) => {
    console.log(id)
    var info = {}
    Object.keys(borrow).map((loopdata, index) => {
        info[loopdata] = Object.values(borrow)[index]
        console.log(info)
    })
    const updataProfile = await Borrow.findOneAndUpdate({
        _id: id
    }, {
        $set: info
    }, { new: true })
    return updataProfile
};
module.exports.updateBorrow = updateBorrow;


const deleteBorrow = async (id) => {
    const deleteBorrow = await Borrow.findOneAndRemove({
        _id: id
    })
    return deleteBorrow
};
module.exports.deleteBorrow = deleteBorrow;

//   ------------------------------------------------------------



