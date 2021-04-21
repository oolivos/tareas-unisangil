const express  = require('express')
const mongoose = require('mongoose')


const app = express()

mongoose.connect(
    'mongodb+srv://oolivos:12345@cluster0.s1nu5.mongodb.net/unisangil', 
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