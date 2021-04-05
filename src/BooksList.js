import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {ListView} from 'realm/react-native';

import newBooks from './BooksParse';
import {SearchBar} from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';

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
    this.state = {dataSource: ds.cloneWithRows(newBooks)};
  }

  row: Array<any> = [];

  componentWillMount = () => {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(newBooks)});
  };

  deleteBook = (title, index) => {
    newBooks.forEach(function (item, index) {
      if (item.title === title) {
        delete newBooks[index];
      }
    });
    this.row[index].close();
    this.componentWillMount();
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
          onPress={this.OpenSecondActivity.bind(this, rowData)}
          underlayColor="#fff7"
          style={containerStyle(height)}>
          <View style={itemStyle(height)}>
            <Image style={styles.bookImage} source={img_path} />
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
        const newData = newBooks.filter(function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newData),
        });
      } else {
        this.componentWillMount();
      }
    } catch (e) {
      this.componentWillMount();
    }
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newBooks),
      });
    });
  }

  componentWillUnmount() {
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

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
        <ListView
          removeClippedSubviews={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID, higlightRow) =>
            this._renderRow(rowData, rowID)
          }
        />
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
