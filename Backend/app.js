const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes')
const houseHoldRoutes = require('./routes/houseHold.routes')
const taskRoutes = require('./routes/task.routes')
const groceryRoutes = require('./routes/grocery.routes')
const notesRoutes = require('./routes/notes.routes')

connectToDb();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/user',userRoutes)
app.use('/houseHold',houseHoldRoutes)
app.use('/task',taskRoutes)
app.use('/grocery',groceryRoutes)
app.use('/note',notesRoutes)

app.get('/',(req,res) => {
    res.send('Hello World');
})

module.exports = app;