var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var port = 3000;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index', {title: 'Computer Not Working?'})
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.post('/contact/send', function(req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your@gmail.com',
            pass: 'yourpassword'            
        }
    });
    
    var mailOptions = {
        from: 'Brad Traversy <your@gmail.com>',
        to: 'test@email.com',
        subject: 'Website Submission test',
        text: 'You have a submission with the following details... ' + 
            'Name: ' + req.body.name +
            'Email: ' + req.body.email +
            'Message: ' +reg.body.message,
        html: '<p>You have a submission with the following details...</p>' + 
            '<ul>' + 
                '<li>Name: ' + req.body.name + '</li>' +
                '<li>Email: ' + req.body.email + '</li>' +
                '<li>Message: ' + req.body.message + '</li>' +
            '</ul>' 
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message Sent: ' + info.response);
            res.redirect('/');
        }
    })
});


app.listen(port);
console.log('Server is running on or port' + port);
