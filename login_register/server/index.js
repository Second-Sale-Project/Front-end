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


app.get("/api/products", (req, res) => {
    const sqlProduct = "SELECT * FROM products";
    db.query(sqlProduct, (err, result) => {
        res.send(result);
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const pid = req.params.id;
    console.log(req.params);
    const sqlDelete = "DELETE FROM products WHERE id = ?";

    db.query(sqlDelete, pid, (err, result) => {
        if (err) console.log(err);
        res.send(result);

    });
});

app.put("/api/update", (req, res) => {
    const pid = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const tags = req.body.tags;
    const image = req.body.image;
    const status = req.body.status;
    const sqlUpdate = "UPDATE products SET name = ?,price = ?, tags = ?, image = ?, status = ? WHERE id = ?";

    db.query(sqlUpdate, [name, price, tags, image, status, pid], (err, result) => {
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
    db.query(sqlInsert, [name, price, tags, image, status], (err, result) => {
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

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const sqlCheck = "SELECT * FROM users WHERE email = ?";
    db.query(sqlCheck, email, (err, rows) => {
        if (err) console.log(err);
        if (rows.length >= 1) {
            if (password == rows[0].password) {
                const { nickname, type } = rows[0];
                // jwt
                const jwToken = createToken({ nickname, type });
                return res.status(200).json(jwToken);
            }
            else {
                const status = 401;
                const message = 'Incorrect password';
                return res.status(status).json({ status, message });
            }
        }
        else {
            const status = 401;
            const message = 'Incorrect Email';
            return res.status(status).json({ status, message });
        }
    })
})

app.post("/api/register", (req,res) => {
    const nickname = req.body.nickname;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const address = req.body.address;
    const address_remaining=req.body.address_remaining;
    const email = req.body.email;
    const password = req.body.password;
    const isStaff = req.body.isStaff;
    const birthdays = new Date(birthday);
    // ----- 1 steps
    const sqlCheck = "SELECT email FROM user WHERE email = ?";
    db.query(sqlCheck,email,(err,rows) => {
        if(err) console.log(err);

        if(rows.length>=1){
            const status = 401;
            const message = 'Email already exist';
            return res.status(status).json({ status, message });
        }
        else{
            const sqlRegister = "INSERT INTO user (isStaff,name,birthday,gender,phone,email,password) VALUES (?,?,?,?,?,?,?)";
            db.query(sqlRegister,[isStaff,nickname,birthdays,gender,phone,email,password], (err,result) => {
            if (err) {
                console.log(err);
                const status = 401;
                const message = err;
                return res.status(status).json({ status, message });
            }
             const sqlGetUid = "SELECT * FROM user where email = ?";
             db.query(sqlGetUid, email, (err, rows) => {
                if (err) console.log(err);
                
                if (rows.length >= 1) {
                    const Uid = rows[0].uId;
                    console.log(address,address_remaining);
                    const sqlAddress = "INSERT INTO address (uId,district,remaining) VALUES(?,?,?)"
                    db.query(sqlAddress,[Uid,address,address_remaining], (err,result) => {
                        if(err) console.log(err);
                    })
                }
            })
            const jwToken = createToken({ nickname, isStaff, email });
            res.status(200).json(jwToken);
           
         })
        }
    })
})
// app.post("/api/register", (req, res) => {

//     const address = req.body.address;
//     const address_remaining = req.body.address_remaining;
//     console.log(req.body.address_remaining);
//     // ----- 1 step
//     //const sqlCheck = "SELECT email FROM user WHERE email = ?";

//     const sqlAddress = "INSERT INTO address (district, remaining) VALUES (?,?)";
//     db.query(sqlAddress, [address,address_remaining], (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//         result = req.body;
//         res.send(result)
//     })

// })


app.listen(3001, () => {
    console.log("running server 3001");
});
