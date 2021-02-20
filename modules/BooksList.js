import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';

const booksObj = require('./TextFiles/BooksList.json');

const books = booksObj['books'];
const newBooks = [];

class Book {
  constructor(title, subtitle, isbn13, price, image) {
    if (title.length > 50) {
      this.title = title.slice(0, 55) + '...';
    } else {
      this.title = title;
    }
    this.subtitle = subtitle;
    this.isbn13 = isbn13;
    this.price = price;
    this.image = image;
  }
}

for (let bookObj of books) {
  const newBook = new Book(
    bookObj.title,
    bookObj.subtitle,
    bookObj.isbn13,
    bookObj.price,
    bookObj.image,
  );
  newBooks.push(newBook);
}

const BookImage = ({book}) => {
  switch (book.title) {
    case 'iOS Components and Frameworks':
      return (
        <Image
          source={require('../img/Image_01.png')}
          style={styles.bookImage}
        />
      );
    case 'Learning iOS Development':
      return (
        <Image
          source={require('../img/Image_02.png')}
          style={styles.bookImage}
        />
      );
    case 'Beginning iOS Programming':
      return (
        <Image
          source={require('../img/Image_03.png')}
          style={styles.bookImage}
        />
      );
    case 'Beginning iOS 5 Games Development':
      return (
        <Image
          source={require('../img/Image_05.png')}
          style={styles.bookImage}
        />
      );
    case 'More iOS 6 Development':
      return (
        <Image
          source={require('../img/Image_06.png')}
          style={styles.bookImage}
        />
      );
    case 'Beginning iOS 6 Development':
      return (
        <Image
          source={require('../img/Image_07.png')}
          style={styles.bookImage}
        />
      );
    case 'Beginning iOS 7 Development':
      return (
        <Image
          source={require('../img/Image_08.png')}
          style={styles.bookImage}
        />
      );
    case 'iOS 6 Programming Cookbook':
      return (
        <Image
          source={require('../img/Image_10.png')}
          style={styles.bookImage}
        />
      );
    default:
      return (
        <Image
          source={require('../img/Image_Default.png')}
          style={styles.bookImage}
        />
      );
  }
};

const BookItem = ({item}) => {
  return (
    <View style={styles.item}>
      <BookImage book={item} style={styles.bookImageContainer} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );
};

const BooksList = () => {
  const renderItem = ({item}) => {
    return <BookItem item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={newBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.isbn13}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    height: 160,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'relative',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
  },
  subtitle: {
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: '10%',
  },
  bookImage: {
    height: 150,
    width: 120,
  },
  bookImageContainer: {
    flex: 1,
  },
});

export default BooksList;
