import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {ListView} from 'realm/react-native';
import newBooks from './BooksParse';
import {SearchBar} from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import BaseManager from './database';

const manager = new BaseManager();
const data = [];
const img_path_section = {
  'Image_01.png': require('../img/Image_01.png'),
  'Image_02.png': require('../img/Image_02.png'),
  'Image_03.png': require('../img/Image_03.png'),
  'Image_05.png': require('../img/Image_05.png'),
  'Image_06.png': require('../img/Image_06.png'),
  'Image_07.png': require('../img/Image_07.png'),
  'Image_08.png': require('../img/Image_08.png'),
  'Image_10.png': require('../img/Image_10.png'),
};

class BookList extends React.Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds.cloneWithRows([])};
    this.getDataSearch('');
  }

  componentWillMount() {
    this.getDataSearch(this.state.search);
  }

  row: Array<any> = [];

  deleteBook = (title, index) => {
    newBooks.forEach(function (item, index) {
      if (item.title === title) {
        delete newBooks[index];
      }
    });
    this.row[index].close();
  };

  getDataSearch(req) {
    if (req && req.length > 3) {
      this.timeoutPromise(
        1000,
        fetch(`https://api.itbook.store/1.0/search/${req}`)
          .then((respsonse) => respsonse.json())
          .then((data) => {
            console.log(data);
            data.books.forEach((book) =>
              manager.addBookList(
                book.isbn13,
                book.title,
                book.subtitle,
                book.price,
                book.image,
                book.url,
              ),
            );
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(data.books),
            });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.setState({loading: false});
          }),
      ).catch((error) => {
        manager.selectBookList(req).then((temp) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(temp),
          });
        });
      });
    } else {
      this.setState({dataSource: this.state.dataSource.cloneWithRows([])});
    }
  }

  timeoutPromise(ms, promise) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('promise timeout'));
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        },
      );
    });
  }

  getDetailBook = (isbn13) => {
    return fetch(`https://api.itbook.store/1.0/books/${isbn13}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  RightActions = (progress, dragX, height, rowData, index) => {
    const scale = dragX.interpolate({
      inputRange: [0, 0],
      outputRange: [1.2, 0],
    });
    return (
      <>
        <TouchableOpacity onPress={() => this.deleteBook(rowData.title, index)}>
          <View style={swipeableStyle(height)}>
            <Animated.Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontWeight: '600',
                transform: [{scale}],
              }}>
              Delete
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  _renderRow(rowData, index) {
    let img_path;
    try {
      img_path = img_path_section[rowData.image];
    } catch (e) {
      img_path = require('../img/Image_Default.png');
    }
    let height;
    height =
      rowData.title.length < 50
        ? 160
        : 160 + (Math.floor(rowData.title.length) / 25 - 4) * 25;
    return (
      <Swipeable
        ref={(ref) => (this.row[index] = ref)}
        friction={3}
        overshootRight={false}
        overshootFriction={1}
        renderRightActions={(progress, dragX) =>
          this.RightActions(progress, dragX, height, rowData, index)
        }>
        <TouchableHighlight
          onPress={this.OpenSecondActivity.bind(
            this,
            this.getDetailBook(rowData.isbn13),
          )}
          underlayColor="#fff7"
          style={containerStyle(height)}>
          <View style={itemStyle(height)}>
            <Image style={styles.bookImage} source={{uri: rowData.image}} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{rowData.title}</Text>
              <Text style={styles.subtitle}>{rowData.subtitle}</Text>
              <Text style={styles.price}>{rowData.price}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  }

  OpenSecondActivity(rowData) {
    this.props.navigation.navigate('DetailBook', {
      ListViewClickItemHolder: rowData,
    });
  }

  updateSearch = (search) => {
    try {
      search = search.replace(/\s/g, '');
      if (search !== '') {
        this.getDataSearch(search);
      } else {
        this.componentWillMount();
      }
    } catch (e) {
      this.componentWillMount();
    }
  };

  render() {
    const {search} = this.state;
    return (
      <>
        <SearchBar
          searchIcon={{size: 24}}
          platform="android"
          lightTheme={true}
          round={true}
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{height: 50}}
          onChangeText={this.updateSearch}
          onClear={this.updateSearch}
          value={search}
        />
        {this.state.dataSource.getRowCount() == 0 ? (
          <Text style={{textAlign: 'center', marginTop: 20, fontSize: 15}}>
            No items found
          </Text>
        ) : (
          <ListView
            enableEmptySections={true}
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderRow={(rowData, sectionID, rowID, higlightRow) =>
              this._renderRow(rowData, rowID)
            }
          />
        )}
      </>
    );
  }
}

const containerStyle = function (height) {
  return {
    height: height,
    borderColor: '#ddd',
    flexDirection: 'row',
  };
};

const itemStyle = function (height) {
  return {
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    height: height,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  };
};

const swipeableStyle = function (height) {
  return {
    padding: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: 90,
  };
};

const styles = StyleSheet.create({
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
    position: 'absolute',
    bottom: '10%',
  },
  bookImage: {
    height: 150,
    width: 120,
  },
});
export default BookList;
