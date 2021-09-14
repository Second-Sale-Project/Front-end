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


//會員專區
app.post("/api/userProfiles", (req, res) => {
    const email = req.body.UserEmail;
    const sqlUserData = "SELECT * FROM user JOIN address ON user.uId = address.uId WHERE email = ?";
    db.query(sqlUserData, email, (err, result) => {
        if (err) console.log(err);
        const address = result[0].city + result[0].district + result[0].remaining;
        result[0].address = address;
        res.send(result);
    })
})

app.post("/api/updateUser", (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const city = address.substring(0, 3);
    const district = address.substring(3, 6);
    const remaining = address.substring(6, 100);
    const sqlGetUid = "SELECT uId FROM user WHERE email = ?"
    const sqlUpdateUser = "UPDATE user set name = ?,phone = ? WHERE email = ?";
    const sqlUpdateUserAddress = "UPDATE address set city = ?,district = ?,remaining = ? WHERE uId = ?";
    //const sqlUserData = "SELECT * FROM user JOIN address ON user.uId = address.uId WHERE email = ?";
    db.query(sqlGetUid, email, (err, result) => {
        if (err) console.log(err);
        const uId = result[0].uId;
        db.query(sqlUpdateUser, [name, phone, email], (err, result) => {
            if (err) console.log(err);
            db.query(sqlUpdateUserAddress, [city, district, remaining, uId], (err, result) => {
                if (err) console.log(err);
                res.send(result);

            })
        })
    })

})

//最愛收藏

app.post("/api/favorite", (req, res) => {
    const email = req.body.UserEmail;
    const sqlGetUid = "SELECT uId FROM user WHERE email = ?";
    const sqlGetProduct = "SELECT p.pId,p.name,p.price,p.note,product_pic.image,product_status.status FROM product as p JOIN product_pic ON product_pic.pId=p.pId JOIN product_status ON product_status.pId = p.pId LEFT JOIN `favorite` ON p.pId = `favorite`.pId JOIN `user` ON `favorite`.uId = `user`.uId where user.uId = ?";
    db.query(sqlGetUid, email, (err, result) => {
        if (err) console.log(err);
        const uId = result[0].uId;
        db.query(sqlGetProduct, uId, (err, result) => {
            if (err) console.log(err);
            console.log(result)
            res.send(result);
        })
    })
})

app.delete("/api/deleteFavorite/:id", (req, res) => {
    const pId = req.params.id;
    const sqlDelete = "DELETE FROM favorite WHERE pId = ?";

    db.query(sqlDelete, pId, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
})

app.post("/api/addFavorite", (req, res) => {
    const pId = req.body.product.pId;
    const email = req.body.email;
    const sqlGetUid = "SELECT uId FROM user WHERE email = ?";
    const sqlAddFavorite = "INSERT INTO favorite (pId,uId,available) VALUES (?,?,?)";
    const sqlCheckFavorite = "SELECT pId FROM favorite WHERE pId = ? AND uId = ?";
    db.query(sqlGetUid, email, (err, result) => {
        if (err) console.log(err);

        const uId = result[0].uId;
        db.query(sqlCheckFavorite, [pId, uId], (err, rows) => {
            if (err) console.log(err);

            if (rows.length >= 1) {
                const message = 'product has add!';
                return res.send(message);
            }
            else {
                db.query(sqlAddFavorite, [pId, uId, 1], (err, result) => {
                    if (err) console.log(err);
                    const message = 'Product add success';
                    res.send(message);
                })
            }
        })
    })
})


//首頁產品
app.post("/api/products", (req, res) => {
    const email = req.body.UserEmail;
    const sqlGetUid = "SELECT uId FROM user WHERE email = ?";
    const sqlGetFavoriteItem = "SELECT pId FROM favorite WHERE uId = ?";
    const sqlProduct = "SELECT p.pId,p.name,p.price,p.note,product_pic.image,product_status.status FROM product as p JOIN product_pic ON product_pic.pId=p.pId JOIN product_status ON product_status.pId = p.pId";
    db.query(sqlGetUid, email, (err, result) => {
        if (err) console.log(err);
        const uId = result[0].uId;
        db.query(sqlGetFavoriteItem, uId, (err, rows) => {
            if (err) console.log(err);
            const Fpid = [];
            for (var j = 0; j < rows.length; j++){
                Fpid.push(rows[j].pId);
            }
            console.log(Fpid)
            db.query(sqlProduct, (err, result) => {
                if (err) console.log(err);

                for (var i = 0; i < result.length; i++) {
                    
                    
                    if (Fpid.includes(result[i].pId) ){
                      
                        result[i].isFavorite = true;
                       
                    }
                    else{
                       
                        result[i].isFavorite = false;
                       
                        
                    }
                }
            
                //console.log(result)
                res.send(result)
            });
        })

    })
});

app.get("/api/getProducts", (req, res) => {
    const sqlProduct = "SELECT p.pId,p.name,p.price,p.note,product_pic.image,product_status.status FROM product as p JOIN product_pic ON product_pic.pId=p.pId JOIN product_status ON product_status.pId = p.pId";
    db.query(sqlProduct, (err, result) => {
        if(err) console.log(err)

        res.send(result);
    });

});


//產品詳細資訊

app.post("/api/productDetail",(req, res) => {
    const pId = req.body.pId;
    const sqlProductDetail = "SELECT * FROM product WHERE product.pId = ? ";
    const sqlImage = "SELECT image FROM product_pic WHERE pId = ? ";
    db.query(sqlProductDetail,pId,(err, result) => {
        if(err) console.log(err);
        res.send(result);
    })
})

app.post("/api/productDetailImage",(req, res) => {
    const pId = req.body.pId;
    const sqlImage = "SELECT image FROM product_pic WHERE pId = ? ";
    db.query(sqlImage,pId,(err,result) => {
        if(err) console.log(err);
        res.send(result);
    })
})

//購物車
app.post("/api/carts", (req, res) => {
    const pId = req.body.id;
    const email = req.body.email;
    const sqlGetUid = "SELECT uId FROM user WHERE email = ?"
    const sqlCarts = "SELECT * FROM carts WHERE pId = ? AND uId = ?"
    db.query(sqlGetUid, email, (err, result) => {
        if (err) console.log(err);

        const uId = result[0].uId;
        db.query(sqlCarts, [pId, uId], (err, rows) => {
            if (err) console.log(err);
            if (rows.length >= 1) {
                const sqlPlusCarts = "UPDATE carts SET amount = amount + 1 WHERE pId = ? AND uId = ?";
                db.query(sqlPlusCarts, [pId, uId], (err, result) => {
                    if (err) console.log(err);
                    res.send(result);
                })
            }
            else {
                const sqlInsertCarts = "INSERT INTO carts (pId,uId,amount) VALUES (?,?,?)";
                db.query(sqlInsertCarts, [pId, uId, 1], (err, result) => {
                    if (err) console.log(err);
                    res.send(result);
                })
            }
        })
    })

});
//新增 刪除 修改 

app.delete("/api/delete/:id", (req, res) => {
    const pId = req.params.id;
    const sqlDelete = "DELETE FROM product WHERE pId = ?";

    db.query(sqlDelete, pId, (err, result) => {
        if (err) console.log(err);
        res.send(result);

    });
});

app.put("/api/update", (req, res) => {
    const pId = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const tags = req.body.tags;
    const image = req.body.image;
    const status = req.body.status;
    const sqlUpdate = "UPDATE product SET name = ?,price = ?, note = ? WHERE pId = ?";
    const sqlUpdateImage = "UPDATE product_pic SET image = ? WHERE pId = ?";
    const sqlUpdateStatus = "UPDATE product_status SET status = ? WHERE pId = ?";

    db.query(sqlUpdate, [name, price, tags, pId], (err, result) => {
        if (err) console.log(err);
        db.query(sqlUpdateImage,[image,pId],(err,result) => {
            if(err) console.log(err);
        })
        db.query(sqlUpdateStatus,[status,pId],(err,result) => {
            if(err) console.log(err);
        })
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
    const sqlInsert = "INSERT INTO product (name, price, note) VALUES (?,?,?)";
    const sqlGetPid = "SELECT pId FROM product WHERE name = ?";
    const sqlInsertImage = "INSERT INTO product_pic (pId,image) VALUES (?,?)";
    const sqlInsertStatus = "INSERT INTO product_status (pId,status) VALUES (?,?)";

    db.query(sqlInsert, [name, price, tags], (err, result) => {
        if (err) {
            console.log(err)
        }
        db.query(sqlGetPid,name,(err, rows) => {
            if(err) console.log(err);
            const pId = rows[0].pId;
            db.query(sqlInsertImage,[pId,image],(err,result) =>{
                if(err) console.log(err);
            })
            db.query(sqlInsertStatus,[pId,status],(err,result) => {
                if(err) console.log(err);
            })
        })
        result = req.body;
        res.send(result)
    })

});


//登入 註冊
const SECRET = '12321JKLSJKLSDFJK23423432';
const expiresIn = '1h';
const createToken = payload => {
    return jwt.sign(payload, SECRET, { expiresIn });
};

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const sqlCheck = "SELECT * FROM user WHERE email = ?";
    db.query(sqlCheck, email, (err, rows) => {
        if (err) console.log(err);
        if (rows.length >= 1) {
            if (password == rows[0].password) {
                const nickname = rows[0].name;
                const isStaff = rows[0].isStaff;
                const email = rows[0].email;

                // jwt
                const jwToken = createToken({ nickname, isStaff, email });
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

app.post("/api/register", (req, res) => {
    const nickname = req.body.nickname;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const address_remaining = req.body.address_remaining;
    const email = req.body.email;
    const password = req.body.password;
    const isStaff = req.body.isStaff;
    const county = req.body.county;
    const district = req.body.district;
    const zipCode = req.body.zipCode;
    const birthdays = new Date(birthday);
    // ----- 1 steps
    const sqlCheck = "SELECT email FROM user WHERE email = ?";
    db.query(sqlCheck, email, (err, rows) => {
        if (err) console.log(err);

        if (rows.length >= 1) {
            const status = 401;
            const message = 'Email already exist';
            return res.status(status).json({ status, message });
        }
        else {
            const sqlRegister = "INSERT INTO user (isStaff,name,birthday,gender,phone,email,password) VALUES (?,?,?,?,?,?,?)";
            db.query(sqlRegister, [isStaff, nickname, birthdays, gender, phone, email, password], (err, result) => {
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
                        const sqlAddress = "INSERT INTO address (uId,city,district,remaining) VALUES(?,?,?,?)"
                        db.query(sqlAddress, [Uid, county, district, address_remaining], (err, result) => {
                            if (err) console.log(err);
                        })
                    }
                })
                const jwToken = createToken({ nickname, isStaff, email });
                res.status(200).json(jwToken);

            })
        }
    })
})



app.listen(3001, () => {
    console.log("running server 3001");
});
