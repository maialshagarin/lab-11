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

server.get('/searches', (request, response) => {
    response.render('pages/index')
});
// console.log('ffffff');

// research route
server.post('/searches', (request, response) => {

    let url = 'https://www.googleapis.com/books/v1/volumes?q=';
    if (request.body.choose === 'title') {
        url = url + request.body.search;
    } else if (request.body.choose === 'author') {
        url = url + request.body.search;
    }



    superagent.get(url)
        .then(data => {
            // res.json(data.body)
            //  console.log(data);
            let books = data.body.items;
            response.render('./pages/result', { 'x': books })

            // return books.items.map(book => {
            //     return new Book(book);
        });
});
// server.post('/research', booksHandler);



// function booksHandler(request, response) {
//     getBooks(request.query.data)
//         .then(booksData => response.status(200).json(booksData))
//       .then(response.render('./pages/result'));  
// };

///////// constructor Function///////////

function Book(data) {
    this.type = data.volumeInfo.industryIdentifiers.type || "nothing to show";
    this.image_url = data.volumeInfo.imageLinks.thumbnail || "nothing to show";
    this.title = data.volumeInfo.title;
    this.author = data.volumeInfo.authors[0];
    this.description = data.volumeInfo.description || "nothing to show";
}


///////////////Errors////////////////////
server.get('/boo', (request, response) => {
    throw new Error('whoops');
});
server.use('*', (request, response) => {
    response.status(404).send("Not Found");
});
server.use((error, request, response) => {
    response.status(500).send("error");
});
// /////////// listen to server///////////////
server.listen(PORT, () => console.log(`listening to ${PORT}`));