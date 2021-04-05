/* import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native'; */

const booksArr = [];
booksArr.push(
  require('./TextFiles/9780321856715.json'),
  require('./TextFiles/9780321862969.json'),
  require('./TextFiles/9781118841471.json'),
  require('./TextFiles/9781430236054.json'),
  require('./TextFiles/9781430237105.json'),
  require('./TextFiles/9781430238072.json'),
  require('./TextFiles/9781430245124.json'),
  require('./TextFiles/9781430260226.json'),
  require('./TextFiles/9781449308360.json'),
  require('./TextFiles/9781449342753.json'),
  );

const newBooks = [];

export class Book {
  constructor(
    title,
    subtitle,
    isbn13,
    price,
    image,
    authors,
    publiser,
    pages,
    year,
    rating,
    description
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.isbn13 = isbn13;
    this.price = price;
    this.image = image;
    this.authors = authors;
    this.publiser = publiser;
    this.pages = pages;
    this.year = year;
    this.rating = rating;
    this.description = description;
  }
}

for (let bookObj of booksArr) {
  const newBook = new Book(
    bookObj.title,
    bookObj.subtitle,
    bookObj.isbn13,
    bookObj.price,
    bookObj.image,
    bookObj.authors,
    bookObj.publisher,
    bookObj.pages,
    bookObj.year,
    bookObj.rating,
    bookObj.desc,
  );
  newBooks.push(newBook);
}
//console.log(newBooks);

export default newBooks;
