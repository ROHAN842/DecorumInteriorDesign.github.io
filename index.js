const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})


app.post("/ajax/email", function(request, response) {
    // response.json({ message: "email function not implemented!!!" });
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "modijihrohan@gmail.com", // this should be YOUR GMAIL account
            pass: "arremodiji" // this should be your password
        }
    });
    var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email}  MESSAGE: ${request.body.message}`;
    // var htmlBody = `<h2>Message Request From Decorum Interior</h2><p>from: ${request.body.name} <a href="mailto:${request.body.email}">${request.body.email}</a></p><p>${request.body.message}</p>`;
    var htmlBody = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${request.body.name}</li>
      <li>Email: ${request.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${request.body.message}</p>
  `;

    var mail = {
        // from: "rohancfsf@gmail.com", // sender address
        from: '"Customer Contact" <modijihrohan@gmail.com>', // sender address
        to: "rohanmodi790@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
        subject: "Mail From Decorum Interior Design", // Subject line
        text: textBody,
        html: htmlBody
    };
    transporter.sendMail(mail, function(err, info) {
        if (err) {
            console.log(err);
            response.json({ message: "message not sent: an error occured; check the server's console log" });
        } else {
            response.json({ message: `message sent: ${info.messageId}` });
        }
    });

});

app.listen(port, () => console.log("Server Started... at ${port}"));