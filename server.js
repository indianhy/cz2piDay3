// JavaScript source code
var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var jwt = require('jsonwebtoken')
var expressjwt = require("express-jwt");
var app = express()
var jsonParser = bodyParser.json()
var port = 3000
var urlencodedParser = bodyParser.urlencoded({ extended: false })



const accessTokenSecret = 'thisismyaccesstokensecret';


const authenticateJWT = (req, res, next) => {
    console.log(req.headers)
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' +file.originalname)
    }
})
var upload = multer({ storage: storage })

//var upload = multer({ dest: 'uploads/' })
app.get('/secret', authenticateJWT, function (req, res) {
    console.log(req)
    res.send(req.user)
    //res.sendFile(__dirname + '\\public\\index.html')
    
}) 

app.get('/', function (req, res) {
    res.send('This is public page')
}) 


app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    res.send("Upload successful!")

})

app.post('/uploadmultiple', authenticateJWT, upload.array('myFiles', 12), (req, res, next) => {

    const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }


    const files = req.files
    if (!files || files.length==0) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }

    res.send("Upload successful!")

})

app.listen(port, () => console.log(`Simple Node Server app listening at http://localhost:${port}`))
