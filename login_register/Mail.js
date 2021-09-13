function Mail(address)  {
    const nodemailer = require('nodemailer');
    //
    // setting of SMTP
    //
    const options = {
    host: 'smtp.gmail.com', // mail server
    port: 465, // port
    secure: true, // if use 465 = true. else = false
    requireTLS: false,
    tls: {
        rejectUnauthorized: false,
    },
    auth: { // mail-setting
        user: 'p.david00lin@gmail.com', // user
        pass: '1022david_lin1439', // password
    },
    };

    //
    // mail message
    //
    const mail = {
    from: 'p.david00lin@gmail.com', // sending address
    to: address, // sending to address
    subject: 'Email Test Mail',
    text: `Email was sent!`,
    html: `<p>Email was sent!</p>`,
    };

    //
    // send setting
    //
    (async () => {
    try {
        const transport = nodemailer.createTransport(options);
        const result = await transport.sendMail(mail);
        console.log('+++ Sent +++');
        console.log(result);
    } catch (err) {
        console.log('--- Error ---');
        console.log(err);
    }
    })();
}

export default Mail;