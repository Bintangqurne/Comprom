const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Post } = require("../models");
const {OAuth2Client} = require('google-auth-library');
const axios = require('axios');

class userController {
    static async register(req, res, next) {
        try {
          const { fullName, email, password, image, address, description } = req.body;
          console.log(req.body, 'ini req body');
    
          const newUser = await User.create({
            fullName,
            email,
            password,
            image, 
            address,
            description
          });
          
          res.status(201).json({ fullName: newUser.fullName, id: newUser.id, email: newUser.email });
        } catch (error) {
          next(error)
        }
      }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "BadRequestLogin" };
      }

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "InvalidCredential" };
      }

      const checkPassword = comparePassword(password, findUser.password);
      if (!checkPassword) {
        throw { name: "InvalidCredential" };
      }
      
      const access_token = createToken({
        id: findUser.id,
      });
      const role = findUser.role
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async updateData(req, res, next){
    try {
      const {id} = req.params.id
      const data = await User.findByPk(id)
      const {fullName, email, image, address, description} = req.body
      const updated = await User.update({fullName, email, image, address, description},
        {
          where: {
            id
          }
        })
        if (!data) {
          throw {name: 'NotFound'}
      }
      res.status(200).json(fullName, email, image, address, description)
    } catch (error) {
      next(error)
    }
  }

  static async googleLogin(req, res, next){
    const token = req.headers['google-token']
    const client = new OAuth2Client()

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload = ticket.getPayload();
    console.log(payload, 'ini payload');
    const email = payload['email']; // subject id
    const image = payload['picture']
    
    const user = await User.findOne({
      where : {email}
    })
    if (!user) {
      await User.create({
        fullName: payload.name,
        email,
        password: 'Comprom-password-' + Date.now(),
        image
      },{
        hooks: false
      })
    }

    const access_token = createToken(
      { 
        id: user.id
      }
      )

    res.status(200).json({access_token})
  } catch (error) {
    console.log(error);
    next(error) 
  }
}

static async gitHub(req, res, next){
  try {
    const clientID = process.env.CLIENT_ID_GITHUB
    const clientSecret = process.env.CLIENT_SECRET_GITHUB
    const requestToken = req.query.code
      
    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json'
      }
    }).then(async (response) => {
      const accessToken = response.data.access_token
      let token = response.data.access_token
      
      // Fetch user data from GitHub
      const userData = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })


      console.log(userData, '<<<<<<');
      // Extract user information
      const email = userData.data.login + '@github.com'
      const image = userData.data.avatar_url
      const fullName = userData.data.name

      // Check if the user already exists in your database
      let user = await User.findOne({ where: { email } })
      let password = Math.random().toString();

      // If the user doesn't exist, create a new one
      if (!user) {
        user = await User.create({
          fullName,
          email,
          password,
          image
        }, {
          hooks: false
        })
      }

      // Create access token for the user
      const access_token = createToken({ id: user.id })

      // Redirect the user to the desired page with the access token
      res.redirect(`http://localhost:5173/gitHubLogin/${access_token}`)
      console.log(access_token, 'ini access token');
    })
  } catch (error) {
    console.log(error, 'ini error');
    next(error)
  }
}


static async usersMe(req, res, next){
  try {
      const user = await User.findByPk(req.user.id, {
          attributes: ['id', 'fullName', 'email', 'status', 'image', 'address', 'description']
      },)
      
      res.json(user)
  } catch (error) {
      next(error)
  }
}

static async user(req, res, next){
  try {
    const user = await User.findAll()
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

static async userByPk(req, res, next){
  try {
    const {id} = req.params
    const user = await User.findByPk(id)
    if(!user) {
      throw {name: "NotFound"}
    }
    
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

static async editUsers(req, res, next){
  try {
    const {id} = req.params
    const {fullName, image, address, description} = req.body
    const updated = await User.update({fullName, image, address, description}, {
      where: {
        id
      }
    })
    const data = await User.findByPk(id)
    console.log(data, 'ini data');
    if (!data) {
      throw {name: 'NotFound'}
  } else if (data.id !== req.user.id) {
      throw {name: 'Forbidden'}
  }  
  res.status(200).json({fullName, image, address, description})
  } catch (error) {
    next(error)
  }
}
}


module.exports = userController;
