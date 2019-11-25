'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;
const server = express();
server.use(cors());

server.use(express.static('./public'));
server.use(express.urlencoded({ extended: true }));
server.set('view engine', 'ejs');

server.get('/', (request, response) => {
    response.render('pages/index')
});
console.log('ffffff');

// research route
server.get('/research', booksInfo);

// bookHandler  function
// function bookHandler (request,response){
//     // console.log('dddddddd',request.data)
//     booksInfo(request.data)

// .then(book=> response.status(200).json(book))}


// API
function booksInfo(data) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=dan';
    console.log('urllllllllllllllllllllllllllllll', url)
     superagent.get(url)
    console.log('sssssssssssssssssssssssurllllllllllllllllllllllllllllll', superagent.get(url))
        .then(books=> {
            // console.log('gggggggggggggggg', books);

            return new Books(books.volumeInfo)

        })
        // .then(book => response.status(200).json(book))
};


//constructure function
function Books(title) {
    this.image = books.volumeInfo.imageLinks.thumbnail;
    this.title = books.volumeInfo.title;
    this.author_name = books.volumeInfo.authors;
    this.description = books.volumeInfo.description;

}

server.listen(PORT, () => console.log(`listening to ${PORT}`));