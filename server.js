'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });


const booksSchema = new mongoose.Schema({
    name: String,
    description:String,
    status:String,
    img:String
});

const UserSchema = new mongoose.Schema({
    
    books: [booksSchema],
    email:String
});

const mybookmodel = mongoose.model('book', booksSchema);
const userModel = mongoose.model('owner', UserSchema);


    const wijdan = new userModel({email: 'wijdankhaled178@gmail.com',
     books: [
        { name: 'The Growth Mindset', description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.', status: 'FAVORITE FIVE', img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg' },
        { name: 'The Momnt of Lift', description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.', status: 'RECOMMENDED TO ME', img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg'}
      ]})
    

  
    // wijdan.save();
    const wijdan2 = new userModel({email: 'wijdankhaled178@gmail.com',
    books: [
       { name: 'The Growth Mindset', description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.', status: 'FAVORITE FIVE', img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg' },
       { name: 'The Momnt of Lift', description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.', status: 'RECOMMENDED TO ME', img: 'https://m.media-amazon.com/images/I/71LESEKiazL._AC_UY436_QL65_.jpg'}
     ]})
// wijdan2.save();



app.get('/', homePageHandler);

function homePageHandler(req, res) {
    res.send('all good')
}

//http://localhost:3030/book?userEmail=wijdankhaled178@gmail.com

app.get('/book',getBook);

function getBook(req,res) {
    let userEmail = req.query.userEmail;
    
    userModel.find({email:userEmail},function(error,userData){
        if(error) {
            res.send('did not work')
        } else {
            res.send(userData[0].books)
        }

    })
}

//post
app.post('/addBook',(req,res)=>{
    let {name,description,status,userEmail}=req.body;
    userModel.find({email:userEmail},(error,userData)=>{
        if(error){
            res.send('some thing wet wrong')
        }
        else{
            userData[0].books.push({
                name:name,
                description:description,
                status:status
            })
            userData[0].save();
            res.send(userData[0].books);
        }
    })
})

//delete
app.delete('/deleteBook',(req,res)=>{
    let userEmail=req.query.email;
    const index=Number(req.query.index);
    userModel.find({email:userEmail},(error,userData)=>{
if(error){
    res.send('something went error');
}else{
    let newBooksArray=userData[0].books.filter((book,idx)=>{
        if(idx!= index){
            return book;
        }
    })
    userData[0].books=newBooksArray;
    userData[0].save();
    res.send(userData[0].books);
}
    })
});
//update
addEventListener.put('/updateBook/:index',(req,res)=>{
    let index=Number(req.params.index);
    let {name,description,status,userEmail}=req.body;
    userModel.find({email:email},(reror,userData)=>{
        if(error){
            res.send('error ')
        }else{
            userData[0].books[index].name=name;
            userData[0].books[index].description=description;
            userData[0].books[index].status=status;
            userData[0].save();
            res.send(userData[0].books);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
