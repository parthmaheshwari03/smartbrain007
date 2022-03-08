const express = require('express');
const bp = require('body-parser');
const bcrypt = require('bcrypt')
const cors = require('cors')
const knex = require('knex');
const { password } = require('pg/lib/defaults');

const register = require('./controllers/register')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '200123',
      database : 'smart-brain'
    }
  });

db.select('*').from('users').then(data => console.log(data));

const app = express();
app.use(bp.json());
app.use(cors());

const database = {
    users : [
        {
            id: '20',
            name: 'Parth',
            email: 'parth@gmail.com',
            password: 'parth0301',
            entries: 0,
            joined: new Date()
        }
    ]
}


app.get('/' , (req, res) =>{
    res.send(database.users);
})

app.post('/signin', (req,res) =>{

    const { email , password} = req.body
     
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const success = bcrypt.compareSync(password, data[0].hash )
        // console.log(data);
        // console.log(success)


        if(success){
            return db.select('*').from('users').where('email', '=', email)
                .then(user => {
                    res.json(user[0]);
                })
        }
        else{
            res.status(400).json('user not found')
        }
    })
    .catch(err => res.status(400).json('incorrect credentials'))
    
})


app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id',(req, res) => {
    const { id } = req.params ;
    
    db('users').where('id',id)
    .then(user => {
        if(user.length === 0){
            res.status(404).json('not found')
        }
        else{
            res.json(user[0])
        }
    })
    .catch(err =>{
        res.status(400).json('err getting user');
    });
    
})

app.put('/image', (req,res) => {
    const { id } = req.body ;
    db('users').where('id',id)
    .then(user => {
        if(user.length === 0){
            res.status(404).json('not found')
        }
        else{
            db('users').where('id', id).increment('entries', 1).returning('entries')
            .then(entries => res.json(entries[0].entries));
        }
    })
    .catch(err =>{
        res.status(400).json('err getting user');
    });
})

app.listen(3000, () => {
    console.log('app is runnin');
});
