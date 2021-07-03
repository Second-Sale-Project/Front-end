const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer();
//const bcrypt = require('bcrypt');
const db = require('./db');
const e = require("express");
const app = express();

app.use(upload.array()); 
app.use(urlencodedParser)
app.use(express.json());
app.use(cors());
app.use(jsonParser);

app.get("/api/products",(req,res) => {
    const sqlProduct = "SELECT * FROM products";
    db.query(sqlProduct, (err,result) => {
        res.send(result);
    });
});

app.delete("/api/delete/:id",(req,res) => {
    const pid = req.params.id;
    console.log(req.params);
    const sqlDelete = "DELETE FROM products WHERE id = ?";

    db.query(sqlDelete, pid,(err,result) => {
        if (err) console.log(err);
        res.send(result);

    });
});

app.put("/api/update",(req,res) => {
    const pid = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const tags = req.body.tags;
    const image = req.body.image;
    const status = req.body.status;
    const sqlUpdate = "UPDATE products SET name = ?,price = ?, tags = ?, image = ?, status = ? WHERE id = ?";

    db.query(sqlUpdate, [name, price, tags, image, status, pid],(err,result) => {
        if (err) console.log(err);
        result = req.body;
        res.send(result);

    });
});

app.post("/api/insert", (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const tags = req.body.tags;
    const image = req.body.image;
    const status = req.body.status;
    console.log(status);
    const sqlInsert = "INSERT INTO products (name, price, tags, image, status) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [name, price, tags, image, status], (err,result) => {
        if (err) {
            console.log(err)
        }
        result = req.body;
        res.send(result)
    })

});

const SECRET = '12321JKLSJKLSDFJK23423432';
const expiresIn = '1h';
const createToken = payload => {
    return jwt.sign(payload, SECRET, { expiresIn });
}; 

app.post("/api/login",(req,res) => {
    const { email, password } = req.body;
    const sqlCheck  = "SELECT * FROM users WHERE email = ?";
    db.query(sqlCheck,email,(err,rows) => {
        if(err) console.log(err);
        if(rows.length>=1){
           if(password == rows[0].password){
               const { nickname, type } = rows[0];
               // jwt
               const jwToken = createToken({ nickname, type });
               return res.status(200).json(jwToken);
           }
           else{
            const status = 401;
            const message = 'Incorrect password';
            return res.status(status).json({ status, message });
           }
        }
        else{
            const status = 401;
            const message = 'Incorrect Email';
            return res.status(status).json({ status, message });
        }
    })
})

app.post("/api/register", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const type = req.body.type;
    // ----- 1 step
    const sqlCheck = "SELECT email FROM users WHERE email = ?";
    db.query(sqlCheck,email,(err,rows) => {
        if(err) console.log(err)
        
        if(rows.length>=1){
            const status = 401;
            const message = 'Email already exist';
            return res.status(status).json({ status, message });
        }
        else{
            const sqlRegister = "INSERT INTO users (email,password,nickname,type) VALUES (?,?,?,?)";
            db.query(sqlRegister,[email, password, nickname, type], (err,result) => {
            if (err) {
                const status = 401;
                const message = err;
                return res.status(status).json({ status, message });
            }
            const jwToken = createToken({ nickname, type, email });
            res.status(200).json(jwToken);

         })
        }
    })
})


app.listen(3001, () => {
    console.log("running server 3001");
});
