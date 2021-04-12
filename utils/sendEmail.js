const nodemailer = require("nodemailer");

const banUser = async (req, res, next) => {
    const user = {
        username,
        status,
    } = req.body

    let email_text = {}
    if (status == variable_status.user_status.ban) {
        email_text.subject = "LISS คุณถูกเเบบนครับ "
        email_text.text = "คุณถูกเเบบนครับ "
        email_text.html = "สามารถติดต่อกลับได้ในเมลนี้ครับผม "
    } else {
        email_text.subject = "LISS คุณถูกปลดเเบบนครับ "
        email_text.text = "คุณถูกปลดเเบบนครับ "
        email_text.html = "สามารถติดต่อกลับได้ในเมลนี้ครับผม "
    }

    let transporter = nodemailer.createTransport({
        host: 'gmail',
        secure: false,
        service: 'Gmail',
        auth: {
            user: 'prachyaprapawat@gmail.com',
            pass: 'prachya123',
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    transporter.sendMail({
        from: 'prachyaprapawat@gmail.com',   // ผู้ส่ง
        to: "" + username,// ผู้รับ
        subject: email_text.subject,                      // หัวข้อ
        text: email_text.text,                         // ข้อความ
        html: email_text.html  // ข้อความ
    }, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.messageId);
        }
    });
    console.log(user.status)
    const newUser = await User.updateUser({ status: user.status }, req.params.id)

    res.json({ "User": newUser }).status(200)
};
module.exports.banUser = banUser;