import React from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

class BaseManager extends React.Component {
  constructor(props) {
    super(props);

    this.dbInstance = openDatabase({name: 'HardwareAndroid.db'});
    this.state = {book_list: []};
  }

  createBookList() {
    this.dbInstance.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_book_list'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_book_list', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_book_list(isbn13 INTEGER PRIMARY KEY , title VARCHAR(255), subtitle VARCHAR(500), price INT(10), image  VARCHAR(255), url  VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }

  addBookList(isbn13, title, subtitle, price, image, url) {
    this.createBookList();
    this.dbInstance.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_book_list(isbn13, title, subtitle, price, image, url) VALUES (?, ?, ?, ?, ?, ?)',
        [isbn13, title, subtitle, price, image, url],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
        },
      );
    });
  }

  selectBookList(req) {
    return new Promise((resolve, reject) => {
      this.dbInstance.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_book_list WHERE title LIKE (?)',
          ['%' + req + '%'],
          (tx, results) => {
            const temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            resolve(temp);
          },
        );
      });
    });
  }

  createGallery() {
    this.dbInstance.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_gallery'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_gallery', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_gallery(id INTEGER PRIMARY KEY AUTOINCREMENT, url  VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }

  addGallery(url) {
    this.createGallery();
    this.dbInstance.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_gallery(url) VALUES ( ?)',
        [url],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
        },
      );
    });
  }

  selectGallery() {
    return new Promise((resolve, reject) => {
      this.dbInstance.transaction((tx) => {
        tx.executeSql('SELECT * FROM table_gallery', [], (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          resolve(temp);
        });
      });
    });
  }
}

export default BaseManager;
