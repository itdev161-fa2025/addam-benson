import express from 'express';
import connectDatabase from './config/db';
import {check , validationResult} from express-Validator;
import { checkSchema } from 'express-validator';

const app = express();

connectDatabase();

app.get('/', (req, res) =>
res.send('api ping sent'));

app.listen(3000, () => console.log('Express server running on port 3000'));

app.post('/api/users',[
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a pasword with 6 or more characters').isLength({min: 6})
],
     (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }else{
        return res.send(res.body);
    }
});