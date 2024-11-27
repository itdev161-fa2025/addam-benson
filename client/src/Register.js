
/**

 * @route POST api/login

 * @desc Login user

 */

app.post(

 '/api/login',

 [

  check('email', 'Please enter a valid email').isEmail(),

  check('password', 'A password is required').exists()

 ],

 async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

   return res.status(422).json({ errors: errors.array() });

  } else {

   const { email, password } = req.body;

   try {

    // Check if user exists

    let user = await User.findOne({ email: email });

    if (!user) {

     return res

      .status(400)

      .json({ errors: [{ msg: 'Invalid email or password' }] });

    }



    // Check password

    const match = await bcrypt.compare(password, user.password);

    if (!match) {

     return res

      .status(400)

      .json({ errors: [{ msg: 'Invalid email or password' }] });

    }



    // Generate and return a JWT token

    returnToken(user, res);

   } catch (error) {

    res.status(500).send('Server error');

   }

  }

 }

);
const returnToken = (user, res) => {

 const payload = {

  user: {

   id: user.id

  }

 };



 jwt.sign(

  payload,

  config.get('jwtSecret'),

  { expiresIn: '10hr' },

  (err, token) => {

   if (err) throw err;

   res.json({ token: token });

  }

 );

};


import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';



const Register = ({ authenticateUser }) => {

 const navigate = useNavigate();

 const [userData, setUserData] = useState({

  name: '',

  email: '',

  password: '',

  passwordConfirm: '',

 });



 const [errorData, setErrorData] = useState({ errors: null });

  

 const { name, email, password, passwordConfirm } = userData;

 const { errors } = errorData;



 const onChange = e => {

  const { name, value } = e.target;

  setUserData({

   ...userData,

   [name]: value

  })

 }



 const registerUser = async() => {

  if (password !== passwordConfirm) {

   console.log('Passwords do not match');

  }

  else {

   const newUser = {

    name: name,

    email: email,

    password: password

   }



   try {

    const config = {

     headers: {

      'Content-Type': 'application/json'

     }

    }



    const body = JSON.stringify(newUser);

    const res = await axios.post('http://localhost:3001/api/users', body, config);

     

    // Store user data and redirect

    localStorage.setItem('token', res.data.token);

    navigate('/');

   } catch (error) {

    // Clear user data and set errors

    localStorage.removeItem('token');

     

    setErrorData({

     ...errors,

     errors: error.response.data.errors

    })

   }



   authenticateUser();

  }

 }



 return (

  <div>

   <h2>Register</h2>

   <div>

    <input

     type='text'

     placeholder='Name'

     name='name'

     value={name}

     onChange={e => onChange(e)}

    />

   </div>

   <div>

    <input

     type='text'

     placeholder='Email'

     name='email'

     value={email}

     onChange={e => onChange(e)}

    />

   </div>

   <div>

    <input

     type='text'

     placeholder='Password'

     name='password'

     value={password}

     onChange={e => onChange(e)}

    />

   </div>

   <div>

    <input

     type='text'

     placeholder='Confirm Password'

     name='passwordConfirm'

     value={passwordConfirm}

     onChange={e => onChange(e)}

    />

   </div>

   <div>

    <button onClick={() => registerUser()}>Register</button>

   </div>

   <div>

    {errors && errors.map(error => 

     <div key={error.msg}>{error.msg}</div>)}

   </div>

  </div>

 )

}



export default Register

