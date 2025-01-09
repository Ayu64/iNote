const { toBeRequired } = require('@testing-library/jest-dom/matchers');
const  connectToMongo=require('./db');
const express=require('express');
const cors=require( 'cors');

connectToMongo();

const  PORT=27480;
const app=express();

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
res.send('hlo server')
});

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
// app.use('/uploads', express.static('uploads'));


app.listen(PORT, () =>{
    console.log(`iNoteBook backend listening at http://localhost:${PORT}`)
});

