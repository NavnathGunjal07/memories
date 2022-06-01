import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js'
import searchRoutes from './routes/search.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/search', searchRoutes);
// app.get('/', (req,res)=>{
//     res.send('hello to memories API');
// });
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>app.listen(PORT, ()=>console.log(`server running on ${PORT}`)))
.catch((error)=> console.log(error.message));

// mongoose.set('useFindAndModify',false);

