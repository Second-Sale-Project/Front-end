const express = require("express")
const nodemailer = require('nodemailer');
const cors = require("cors")
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const jwt = require("jsonwebtoken")
const multer = require("multer")
const upload = multer()
//const bcrypt = require('bcrypt');
const db = require("./db")
const e = require("express")
const { createPool } = require("mysql");
const { cp } = require("fs");
const app = express()

app.use(upload.array())
app.use(urlencodedParser)
app.use(express.json())
app.use(cors())
app.use(jsonParser)

//會員專區
app.post("/api/userProfiles", (req, res) => {
  const email = req.body.UserEmail
  const sqlUserData =
    "SELECT * FROM user JOIN address ON user.uId = address.uId WHERE email = ?"
  db.query(sqlUserData, email, (err, result) => {
    if (err) console.log(err)
    const address = result[0].city + result[0].district + result[0].remaining
    result[0].address = address
    res.send(result)
  })
})

app.post("/api/updateUser", (req, res) => {
  const email = req.body.email
  const name = req.body.name
  const phone = req.body.phone
  const address = req.body.address
  const city = address.substring(0, 3)
  const district = address.substring(3, 6)
  const remaining = address.substring(6, 100)
  const sqlGetUid = "SELECT uId FROM user WHERE email = ?"
  const sqlUpdateUser = "UPDATE user set name = ?,phone = ? WHERE email = ?"
  const sqlUpdateUserAddress =
    "UPDATE address set city = ?,district = ?,remaining = ? WHERE uId = ?"
  //const sqlUserData = "SELECT * FROM user JOIN address ON user.uId = address.uId WHERE email = ?";
  db.query(sqlGetUid, email, (err, result) => {
    if (err) console.log(err)
    const uId = result[0].uId
    db.query(sqlUpdateUser, [name, phone, email], (err, result) => {
      if (err) console.log(err)
      db.query(
        sqlUpdateUserAddress,
        [city, district, remaining, uId],
        (err, result) => {
          if (err) console.log(err)
          res.send(result)
        }
      )
    })
  })
})

//最愛收藏

app.post("/api/favorite", (req, res) => {
  const email = req.body.UserEmail
  const sqlGetUid = "SELECT uId FROM user WHERE email = ?"
  const sqlGetProduct =
    "SELECT p.pId,p.name,p.price,p.note,product_pic.image,product_status.status FROM product as p JOIN product_pic ON product_pic.pId=p.pId JOIN product_status ON product_status.pId = p.pId LEFT JOIN `favorite` ON p.pId = `favorite`.pId JOIN `user` ON `favorite`.uId = `user`.uId where user.uId = ?"
  db.query(sqlGetUid, email, (err, result) => {
    if (err) console.log(err)
    const uId = result[0].uId
    db.query(sqlGetProduct, uId, (err, result) => {
      if (err) console.log(err)

      res.send(result)
    })
  })
})

app.delete("/api/deleteFavorite/:id", (req, res) => {
  const pId = req.params.id
  const sqlDelete = "DELETE FROM favorite WHERE pId = ?"

  db.query(sqlDelete, pId, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

app.post("/api/addFavorite", (req, res) => {
  const pId = req.body.product.pId
  const email = req.body.email
  const sqlGetUid = "SELECT uId FROM user WHERE email = ?"
  const sqlAddFavorite =
    "INSERT INTO favorite (pId,uId,available) VALUES (?,?,?)"
  const sqlCheckFavorite = "SELECT pId FROM favorite WHERE pId = ? AND uId = ?"
  db.query(sqlGetUid, email, (err, result) => {
    if (err) console.log(err)

    const uId = result[0].uId
    db.query(sqlCheckFavorite, [pId, uId], (err, rows) => {
      if (err) console.log(err)

      if (rows.length >= 1) {
        const message = "product has add!"
        return res.send(message)
      } else {
        db.query(sqlAddFavorite, [pId, uId, 1], (err, result) => {
          if (err) console.log(err)
          const message = "Product add success"
          res.send(message)
        })
      }
    })
  })
})

//首頁產品
app.post("/api/products", (req, res) => {
  const email = req.body.UserEmail
  const sqlGetUid = "SELECT uId FROM user WHERE email = ?"
  const sqlGetFavoriteItem = "SELECT pId FROM favorite WHERE uId = ?"
  const sqlProduct =
    "SELECT p.pId,p.name,p.price,p.note,product_pic.image,product_status.status FROM product as p JOIN product_pic ON product_pic.pId=p.pId JOIN product_status ON product_status.pId = p.pId"
  db.query(sqlGetUid, email, (err, result) => {
    if (err) console.log(err)
    const uId = result[0].uId
    db.query(sqlGetFavoriteItem, uId, (err, rows) => {
      if (err) console.log(err)
      const Fpid = []
      for (var j = 0; j < rows.length; j++) {
        Fpid.push(rows[j].pId)
      }
      db.query(sqlProduct, (err, result) => {
        if (err) console.log(err)

        for (var i = 0; i < result.length; i++) {
          if (Fpid.includes(result[i].pId)) {
            result[i].isFavorite = true
          } else {
            result[i].isFavorite = false
          }
        }

        //console.log(result)
        res.send(result)
      })
    })
  })
})

app.get("/api/getProducts", (req, res) => {
  const sqlProduct =
    "SELECT p.pId,p.name,p.price,p.note,product_pic.image,product_status.status FROM product as p JOIN product_pic ON product_pic.pId=p.pId JOIN product_status ON product_status.pId = p.pId"
  db.query(sqlProduct, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

//訂閱方案

app.get("/api/GetPlan", (req, res) => {
  const sqlPlan = "SELECT * FROM plan_content"
  db.query(sqlPlan, (err, result) => {
    if (err) console.log(err)

    res.send(result)
  })
})

app.post("/api/GetPlanMember", (req, res) => {
  const uId = req.body.uId
  const sqlPlan = "SELECT * FROM plan WHERE uId = ?"
  db.query(sqlPlan, uId, (err, result) => {
    if (err) console.log(err)
    if (result) res.send(result)
    if (result == null) res.send(0)
  })
})

app.post("/api/GetPlanContent", (req, res) => {
  const planId = req.body.planId
  const sqlPlan = "SELECT * FROM plan_content WHERE planId = ?"
  db.query(sqlPlan, planId, (err, result) => {
    if (err) console.log(err)

    res.send(result)
  })
})
const addDays = (current, days) => {
  const due_date = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate() + days,
    current.getHours(),
    current.getMinutes(),
    current.getSeconds()
  )
  return due_date
}

app.post("/api/payForPlan", (req, res) => {
  const planId = req.body.planId
  const uId = req.body.uId
  const date = req.body.date
  const current = new Date()
  const due_date = addDays(current, date)
  const sqlAddPlan =
    "INSERT INTO plan (planId,uId,start_date,due_date) VALUES (?,?,?,?)"

  db.query(sqlAddPlan, [planId, uId, current, due_date], (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

//產品詳細資訊

app.post("/api/productDetail", (req, res) => {
  const pId = req.body.pId
  const sqlProductDetail = "SELECT * FROM product WHERE product.pId = ? "
  db.query(sqlProductDetail, pId, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

app.post("/api/productDetailImage", (req, res) => {
  const pId = req.body.pId;
  const sqlImage = "SELECT image FROM product_pic WHERE pId = ? ";
  db.query(sqlImage, pId, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

app.post("/api/productStatus", (req,res) => {
  const pId = req.body.pId;
  const sqlCheck = "SELECT status FROM product_status WHERE pId = ?";
  db.query(sqlCheck,pId,(err,result) => {
    if(err) console.log(err);
    res.send(result);
  })
})

//購物車


app.post("/api/getCartProduct", (req, res) => {
  const email = req.body.email
  const sqlGetUid = "SELECT uId FROM user WHERE email = ?"
  const sqlGetPid = "SELECT pId FROM cart WHERE uId = ?"
  const sqlGetProduct = "SELECT * FROM product WHERE product.pId = ?"
  db.query(sqlGetUid, email, (err, result) => {
    if (err) console.log(err)

    const uId = result[0].uId
    db.query(sqlGetPid, uId, (err, result) => {
      if (err) console.log(err)

      const pId = result[0].pId

      db.query(sqlGetProduct, pId, (err, result) => {
        if (err) console.log(err)
        res.send(result)
      })
    })
  })
})

app.post("/api/getCartProductImage", (req, res) => {
  const email = req.body.email
  const sqlGetUid = "SELECT uId FROM user WHERE email = ?"
  const sqlGetPid = "SELECT pId FROM cart WHERE uId = ?"
  const sqlGetProductImage = "SELECT image FROM product_pic WHERE pId = ?"
  db.query(sqlGetUid, email, (err, result) => {
    if (err) console.log(err)

    const uId = result[0].uId
    db.query(sqlGetPid, uId, (err, result) => {
      if (err) console.log(err)

      const pId = result[0].pId

      db.query(sqlGetProductImage, pId, (err, result) => {
        if (err) console.log(err)
        res.send(result)
      })
    })
  })
})

app.post("/api/userPlan",(req,res) => {
  const uId = req.body.uId;
  const sqlCheckPlan = "SELECT * FROM plan WHERE uId = ?";
  db.query(sqlCheckPlan,uId,(err,result) => {
    if(err) console.log(err);
    res.send(result);
  }) 
})

app.post("/api/addCart", (req, res) => {
  const pId = req.body.pId
  const email = req.body.email
  const sqlGetUid = "SELECT uId FROM user WHERE email = ?";
  const sqlAddCart = "INSERT INTO cart (pId,uId) VALUES(?,?)";
  const sqlCartCheck = "SELECT * FROM cart WHERE uId = ?";

  db.query(sqlGetUid, email, (err, result) => {
    if (err) console.log(err)

    const uId = result[0].uId
    db.query(sqlCartCheck,uId,(err,rows) =>{
      if(err) console.log(err);
      if(rows.length>=1){
        const message = "購物車中已有其他商品";
        res.send({message: '購物車中已有其他商品'});
      }
      else{
        db.query(sqlAddCart, [pId, uId], (err, result) => {
          if (err) {
            console.log(err)
          }
          res.send(result)
        })
      }
    })
  })
})

app.post("/api/deleteCart", (req, res) => {
  const email = req.body.email
  const pId = req.body.pId
  const sqlGetUid = "SELECT uId FROM user WHERE email = ?"
  const sqlDelete = "DELETE FROM cart WHERE  uId = ? AND pId = ?"
  db.query(sqlGetUid, email, (err, result) => {
    if (err) console.log(err)
    const uId = result[0].uId
    console.log(uId)
    db.query(sqlDelete, [uId, pId], (err, result) => {
      if (err) console.log(err)
      res.send(result)
    })
  })
})

app.post("/api/addOrder", (req, res) => {
  const pId = req.body.pId
  const uId = req.body.uId
  const staffId = req.body.isStaff
  const date = new Date()
  const sqlPlan = "SELECT * FROM plan WHERE uId = ?";
  const sqlupdateStatus = "UPDATE product_status SET status = ? WHERE pId = ?";
  const deleteCart = "DELETE FROM cart WHERE  uId = ? AND pId = ?";
  const sqladdOrder =
    "INSERT INTO transaction (pId,uId,staffId,planId,date,start_date,ShippingAddressId,deliveryId) VALUES (?,?,?,?,?,?,?,?)"

  db.query(sqlPlan, uId, (err, rows) => {
    if (err) console.log(err)
    const planId = rows[0].planId
    const start_date = rows[0].start_date
    db.query(
      sqladdOrder,
      [pId, uId, staffId, planId, date, start_date, uId, 0],
      (err, result) => {
        if (err) console.log(err);
        db.query(sqlupdateStatus,['unavailable',pId],(err,result) =>{
          if(err) console.log(err);
          db.query(deleteCart,[uId,pId],(err,result) =>{
            if(err) console.log(err);
          })
        })
      }
    )
  })
})

//新增 刪除 修改

app.delete("/api/delete/:id", (req, res) => {
  const pId = req.params.id
  const sqlDelete = "DELETE FROM product WHERE pId = ?"

  db.query(sqlDelete, pId, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
})

app.put("/api/update", (req, res) => {
  const pId = req.body.id
  const name = req.body.name
  const price = req.body.price
  const tags = req.body.tags
  const image = req.body.image
  const status = req.body.status
  const sqlUpdate =
    "UPDATE product SET name = ?,price = ?, note = ? WHERE pId = ?"
  const sqlUpdateImage = "UPDATE product_pic SET image = ? WHERE pId = ?"
  const sqlUpdateStatus = "UPDATE product_status SET status = ? WHERE pId = ?"

  db.query(sqlUpdate, [name, price, tags, pId], (err, result) => {
    if (err) console.log(err)
    db.query(sqlUpdateImage, [image, pId], (err, result) => {
      if (err) console.log(err)
    })
    db.query(sqlUpdateStatus, [status, pId], (err, result) => {
      if (err) console.log(err)
    })
    result = req.body
    res.send(result)
  })
})

app.post("/api/insert", (req, res) => {
  const name = req.body.name
  const price = req.body.price
  const tags = req.body.tags
  const image = req.body.image
  const status = req.body.status
  console.log(req.body)
  const sqlInsert = "INSERT INTO product (name, price, note) VALUES (?,?,?)"
  const sqlGetPid = "SELECT pId FROM product WHERE name = ?"
  const sqlInsertImage = "INSERT INTO product_pic (pId,image) VALUES (?,?)"
  const sqlInsertStatus = "INSERT INTO product_status (pId,status) VALUES (?,?)"

  db.query(sqlInsert, [name, price, tags], (err, result) => {
    if (err) {
      console.log(err)
    }
    db.query(sqlGetPid, name, (err, rows) => {
      if (err) console.log(err)
      const pId = rows[0].pId
      db.query(sqlInsertImage, [pId, image], (err, result) => {
        if (err) console.log(err)
      })
      db.query(sqlInsertStatus, [pId, status], (err, result) => {
        if (err) console.log(err)
      })
    })
    result = req.body
    res.send(result)
  })
})

//登入 註冊
const SECRET = "12321JKLSJKLSDFJK23423432"
const expiresIn = "1h"
const createToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn })
}

app.post("/api/login", (req, res) => {
  const { email, password } = req.body
  const sqlCheck = "SELECT * FROM user WHERE email = ?"
  db.query(sqlCheck, email, (err, rows) => {
    if (err) console.log(err)
    if (rows.length >= 1) {
      if (password == rows[0].password) {
        const uId = rows[0].uId
        const nickname = rows[0].name
        const isStaff = rows[0].isStaff
        const email = rows[0].email

        // jwt
        const jwToken = createToken({ nickname, isStaff, email, uId })
        return res.status(200).json(jwToken)
      } else {
        const status = 401
        const message = "Incorrect password"
        return res.status(status).json({ status, message })
      }
    } else {
      const status = 401
      const message = "Incorrect Email"
      return res.status(status).json({ status, message })
    }
  })
})

//mail

function Mail(address, token) {

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
      user: 'p.david00lin@gmail.com', // used email address
      pass: '1022david_lin1439' // address password
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
    html: `<p>Email was sent!</p>
          <p>this is your token please copy and paset to site</p></b>`+ token
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
};

app.post("/api/register", (req, res) => {
  //tokens
  const crypto = require('crypto');
  const nBytes = 4;
  // Max value
  // (= 4294967295) (= (1 << 4*8) - 1)
  const maxValue = new Buffer.from(Array(nBytes).fill(0xff)).readUIntBE(0, nBytes);
  function secureRandom() {
    const randomBytes = crypto.randomBytes(nBytes);
    const r = randomBytes.readUIntBE(0, nBytes);
    return r / maxValue * 100000000000000000;
  }

  const token = secureRandom();

  const nickname = req.body.nickname
  const birthday = req.body.birthday
  const gender = req.body.gender
  const phone = req.body.phone
  const address_remaining = req.body.address_remaining
  const email = req.body.email
  const password = req.body.password
  const isStaff = req.body.isStaff
  const county = req.body.county
  const district = req.body.district
  const zipCode = req.body.zipCode
  const birthdays = new Date(birthday)
  Mail(email, token) // this is for mail function, please set data to be can use...


  // ----- 1 steps
  const sqlCheck = "SELECT email FROM user WHERE email = ?";

  db.query(sqlCheck, email, (err, rows) => {
    if (err) console.log(err)

    if (rows.length >= 1) {
      const status = 401
      const message = "Email already exist"
      return res.status(status).json({ status, message })
    }
    else {
      const sqlRegister =
        "INSERT INTO user (isStaff,name,birthday,gender,phone,email,password,token) VALUES (?,?,?,?,?,?,?,?)"
      db.query(
        sqlRegister,
        [isStaff, nickname, birthdays, gender, phone, email, password, token],
        (err, result) => {
          if (err) {
            console.log(err)
            const status = 401
            const message = err
            return res.status(status).json({ status, message })
          }
          const sqlGetUid = "SELECT * FROM user where email = ?"
          db.query(sqlGetUid, email, (err, rows) => {
            if (err) console.log(err)

            if (rows.length >= 1) {
              const uId = rows[0].uId
              const sqlAddress =
                "INSERT INTO address (uId,city,district,remaining) VALUES(?,?,?,?)"
              db.query(
                sqlAddress,
                [uId, county, district, address_remaining],
                (err, result) => {
                  if (err) console.log(err)
                  const jwToken = createToken({ nickname, isStaff, uId, email })
                  res.status(200).json(jwToken)
                }
              )
            }
          })

        }
      )
    }
  })
})




app.post("/api/token", (req, res) => {
  const { token } = req.body;
  console.log(token);
  const sqlCheck = "SELECT * FROM user WHERE token = ?";
  const sqlVerify = "UPDATE user SET IsVerified = ? WHERE uId = ?";
  db.query(sqlCheck, token, (err, rows) => {
    if (err) console.log(err);
    if (rows.length >= 1) {
      if (token == rows[0].token) {
        if (rows[0].IsVerified == 1) {
          const status = 401;
          const message = 'this email isVerified!';
          return res.status(status).json({ status, message });
        }
        else {
          const nickname = rows[0].name;
          const { isStaff, email, uId } = rows[0];
          db.query(sqlVerify, [1, uId], (err, result) => {
            if (err) console.log(err);
            // jwt
            const jwToken = createToken({ nickname, isStaff, email, uId });
            return res.status(200).json(jwToken);
          })
        }
      }
      else {
        const status = 401;
        const message = 'Incorrect token';
        return res.status(status).json({ status, message });
      }
    }
    else {
      const status = 401;
      const message = 'Incorrect token';
      return res.status(status).json({ status, message });
    }
  })
})
app.get("/api/mail", (req, res) => {
  const sqlMails = "SELECT * FROM mail";
  db.query(sqlMails, (err, result) => {
    res.send(result);
  });
});


app.listen(3001, () => {
  console.log("running server 3001")
})

