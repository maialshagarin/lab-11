'use strict';

require('dotenv').config();
const express = require ('express');
const cors = require('cors') ;

const PORT = process.env.PORT || 3000 ;
const server = express ();
server.use(cors());

server.use(express.static('./public'));
server .use(express.urlencoded({extended:true}));
server.set('view engine','ejs') ;

server.get('/',(request ,response) =>{ /////// prove the app work /////////
    response.render('pages/index')
}) ;


server.listen(PORT , ()=> console.log (`listening to ${PORT}`)) ;