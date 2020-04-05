const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const cors = require('cors')
const knex = require('knex')
const register = require('./controller/register')
const signin = require('./controller/signin')
const profile = require('./controller/profile')
const image = require('./controller/image')



const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        // ssl: true,
    },
})

// const db = knex({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'postgres',
//         password: '729467',
//         database: 'smartbrain'
//     }
// });

db.select('*').from('users').then(data => {
    console.log(data);
})

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => { res.send('work ') })

app.post('/signin', (req, res) => { signin.sigininHandle(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.registerHandle(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.profileHandle(req, res, db) })
app.put('/image', (req, res) => { image.imageHandle(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => { console.log(`app is running on port ${process.env.PORT}`) })

// res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:userID --> GET = user
// /image --> PUT --> user