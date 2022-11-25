const formidable = require('formidable')
const validator = require('validator')
const registerModel = require('../models/authModel')
const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




module.exports.userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    // 得到register的时候用户填的所有信息
    //console.log(fileds)
    const {
      userName, email, password, confirmPassword
    } = fields;
    const { image } = files;
    const error = [];


    if (!userName) {
      error.push('Please provide your user name')
    }
    if (!email) {
      error.push('Please provide your user Email')
    }
    if (email && !validator.isEmail(email)) {
      error.push('Please provide your valid Email')
    }
    if (!password) {
      error.push('Please provide your password')
    }
    if (!confirmPassword) {
      error.push('Please provide your confirmPassword')
    }
    if (password && confirmPassword && password !== confirmPassword) {
      error.push('You password and confirm password not same')
    }
    if (password && password.length < 6) {
      error.push('You password must not less than 6 chars')
    }
    if (Object.keys(files).length === 0) {
      error.push('Please provide your user image')
    }
    if (error.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error
        }
      })
    } else {
      const getImageName = files.image.originalFilename;
      const randNumber = Math.floor(Math.random() * 99999);
      const newImageName = randNumber + getImageName;
      files.image.originalFilename = newImageName;
      // files.image.filepath = `/Users/lyle/Desktop/pictures/${getImageName}`

      const newPath = `/Users/lyle/Desktop/iChat/frontend/public/image/${files.image.originalFilename}`;

      try {
        const checkUser = await registerModel.findOne({
          email: email
        });
        console.log('checkUser')
        if (checkUser) {
          res.status(404).json({
            error: {
              errorMessage: ['Your email aready exsited']
            }
          })
        } else {
          fs.copyFile(files.image.filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await registerModel.create({
                userName,
                email,
                password: await bcrypt.hash(password, 10),
                image: files.image.originalFilename
              });

              const token = jwt.sign({
                id: userCreate._id,
                email: userCreate.email,
                userName: userCreate.userName,
                image: userCreate.image,
                registerTime: userCreate.createdAt
              }, process.env.SECRET, {
                expiresIn: process.env.TOKEN_EXP
              })
              console.log(token)
              console.log('registration Complete successfully')

              const options = { expires: new Date(Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000) }
              res.status(201).cookie('authToken', token, options).json({
                successMessage: 'Your Register Successful', token
              })
            } else {
              res.status(500).json({
                error: {
                  errorMessage: ['Internal Server Error']
                }
              })
            }
          })
        }

      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ['Internal Server Error']
          }
        })
      }

    }
  })
  console.log('register is working');
}

module.exports.userLogin = async (req, res) => {
  console.log(req.body)
  const error = []
  const { email, password } = req.body
  if (!email) {
    error.push('Please provide your user Email')
  }
  if (!password) {
    error.push('Please provide your password')
  }
}