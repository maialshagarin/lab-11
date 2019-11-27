DROP TABLE IF EXISTS bookshelfs ;

CREATE TABLE bookshelfs (
    title varchar(256),
    authors varchar(256),
    typeIsban varchar(256),
    descriptions  varchar(256),
    image_url varchar(256)
    bookshelf varchar(256)
);
INSERT INTO bookshelfs (title, authors , typeIsban , descriptions , image_url)
 VALUES('John 17','mai','The typeIsbn','This will introduce the “John 17” experience and journey. A journey that began with a Pentecostal leader, Joe Tosini, and has since included Church leaders across the United States in a spirit of deep communion. This experience has included two personal and profound meetings with Pope Francis, each over two hours long, and more that forty Church leaders from the Evangelical, Pentecostal, and Catholic worlds. Those “encounters” have then been repeated locally in Arizona, Oregon, Texas, and New York. It is a movement led by the spirit that is not so much about ecumenical dialogue as a communion of friendship and love, as asked for by Jesus in John 17. Contributors: Joseph Tosini, Mike Herron, Don Curry, Gary Kinnaman, Bishop Eduardo Nevares, Bishop Thomas J. Olmsted, Sharon and Peter Poppleton, Joshua Butler, Linda Morris, Cal and Lisa Jernigan, Bishop Peter Smith, Peter Petrov, Brian and Gina Kruckenberg, Pat Markey, Michael Rudzena, Ryan Nunez, Ken Costa, Mark Buckley, Matt Maher, Bishop James Massa.','http://books.google.com/books/content?id=n617DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api');