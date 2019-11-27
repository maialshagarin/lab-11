'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;
const server = express();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

server.use(cors());
server.use(express.static('./public'));
server.use(express.urlencoded({ extended: true }));
server.set('view engine', 'ejs');
// /////////////////////
server.get('/searches', (request, response) => {
    response.render('pages/index')
});
server.post('/addbook', addBookToDb)
server.post('/selector', selectBooks);
server.post('/searches', viewData);



function viewData(request, response) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=';
    if (request.body.choose === 'title') {
        url = url + request.body.search;
    } else if (request.body.choose === 'author') {
        url = url + request.body.search;
    }
    superagent.get(url)
        .then(data => {

            let books = data.body.items;
            response.render('pages/result', { 'x': books })
        });
};
function addBookToDb (request,response) {
// console.log('dddddddddddddddddddd',request.body);
    let SQL= 'INSERT INTO bookshelfs (title,authors, descriptions ,image, bookshelf) VALUES ($1 ,$2 ,$3, $4 , $5)';
    let { title, authors, descriptions, image ,bookshelf } = request.body;
    let values=[title, authors, descriptions, image ,bookshelf];
client.query(SQL,values)
.then (results =>{
    response.redirect('/searches');
})



    
}
function selectBooks(request, response) {
    let { title, authors, descriptions, image } = request.body;
    response.render('pages/forms', { data: request.body })
};

// server.post('/research', booksHandler);



// function booksHandler(request, response) {
//     getBooks(request.query.data)
//         .then(booksData => response.status(200).json(booksData))
//       .then(response.render('./pages/result'));  
// };

///////// constructor Function///////////

function Book(data) {
    this.typeIsbn = data.volumeInfo.industryIdentifiers.type || "nothing to show";
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
client.connect()
    .then(() => {
        server.listen(PORT, () => console.log(`listening to ${PORT}`));
    });
