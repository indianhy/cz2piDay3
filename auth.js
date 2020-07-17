// JavaScript source code
var express = require('express')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');

var app = express()
var port = 4000
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(bodyParser.json())

const accessTokenSecret = 'thisismyaccesstokensecret';
const refreshTokenSecret = 'thisismyrefreshtokensecret';
const refreshTokens = [];

const users = [
    {
        username: 'admin',
        password: 'admin',
        role: 'admin'
    }, {
        username: 'himanshu',
        password: 'password123member',
        role: 'member'
    }
];


app.get('/', function (req, res) {
    res.sendFile(__dirname+'\\public\\login.html')
}) 

app.post('/login', urlencodedParser,function(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        var accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '1m' });
        var refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});


app.post('/token', (req, res) => {
    var token = req.body.token;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        var accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '1m' });

        res.json({
            accessToken
        });
    });
});

app.post('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);

    res.send("Logout successful");
});


app.listen(port, () => console.log(`JWT Authentication Server app listening at http://localhost:${port}`))


