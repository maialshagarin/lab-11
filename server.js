'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;
const server = express();
server.use(cors());

// server.use(express.json);
server.use(express.static('./public'));
server.use(express.urlencoded({ extended: true }));
server.set('view engine', 'ejs');

server.get('/', (request, response) => {
    response.render('pages/index')
});
// console.log('ffffff');

// research route
server.get('/research', booksHandler);
// server.post('/research', booksHandler);



function booksHandler(request, response) {
    getBooks(request.query.data)
        .then(booksData => response.status(200).json(booksData))
      .then(response.redirect('/result.ejs'));  
};
function getBooks(data) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=dan';
    return superagent.get(url)
        .then(data => {
            // res.json(data.body)
            // console.log(data);
            let books = data.body;
            return books.items.map(book => {
                return new Book(book);
            })
        })}
function Book(data) {
    this.id= data.id;
    this.image_url = data.volumeInfo.imageLinks.thumbnail;
    this.title = data.volumeInfo.title;
    this.author = data.volumeInfo.authors;
    this.description = data.volumeInfo.description
}
server.listen(PORT, () => console.log(`listening to ${PORT}`));