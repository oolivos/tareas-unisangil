const express  = require('express')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()

mongoose.connect(
    process.env.MONGO_DB_CONN,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
);
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Conectado a mongo!!')
})

app.use(express.json())

app.use('/auth', require('./routes/authRoutes'))
app.use('/', require('./routes/routes'))

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080')
})