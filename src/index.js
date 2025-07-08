require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');

const usersRoutes = require('./routes/users');

const middlewareLogRequest =  require('./middleware/logs');
const upload = require('./middleware/multer');

const app = express();

// MIDDLEWARE
app.use(middlewareLogRequest);
app.use(express.json());
app.use('/assets',express.static('public/images'))

// USER
app.use('/users', usersRoutes)

// UPLOAD
app.post('/upload', upload.single('photo'), (req, res) => {
    res.json({
        message: 'Upload berhasil',
    })
})

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`);
})