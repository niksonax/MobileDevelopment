/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';

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

class BookDetail extends React.Component {
  render() {
    let img_path;
    try {
      img_path =
        img_path_section[this.props.route.params.ListViewClickItemHolder.image];
    } catch (e) {
      img_path = require('../img/Image_Default.png');
    }

    return (
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: 250, width: 220}}
            source={{
              uri: this.props.route.params.ListViewClickItemHolder._W.image,
            }}
          />
        </View>
        <View style={{padding: 20}}>
          <Text style={styles.textTitle}>
            Title:{' '}
            <Text style={styles.textContent}>
              {this.props.route.params.ListViewClickItemHolder._W.title}
            </Text>
          </Text>
          <Text style={styles.textTitle}>
            Subtitle:{' '}
            <Text style={styles.textContent}>
              {this.props.route.params.ListViewClickItemHolder._W.subtitle}
            </Text>
          </Text>
          <Text style={styles.textTitle}>
            Description:{' '}
            <Text style={styles.textContent}>
              {this.props.route.params.ListViewClickItemHolder._W.description}
            </Text>
          </Text>
          <Text />
          <Text style={styles.textTitle}>
            Authors:{' '}
            <Text style={styles.textContent}>
              {this.props.route.params.ListViewClickItemHolder._W.authors}
            </Text>
          </Text>
          <Text style={styles.textTitle}>
            Publisher:{' '}
            <Text style={styles.textContent}>
              {this.props.route.params.ListViewClickItemHolder._W.publisher}
            </Text>
          </Text>
          <Text />
          <Text style={styles.textTitle}>
            Pages:{' '}
            <Text style={styles.textContent}>
              {this.props.route.params.ListViewClickItemHolder._W.pages}
            </Text>
          </Text>
          <Text style={styles.textTitle}>
            Year:{' '}
            <Text style={styles.textContent}>
              {this.props.route.params.ListViewClickItemHolder._W.year}
            </Text>
          </Text>
          <Text style={styles.textTitle}>
            Rating:{' '}
            <Text style={styles.textContent}>
              {this.props.route.params.ListViewClickItemHolder._W.rating}/5
            </Text>
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 17,
    color: 'gray',
  },
  textContent: {
    fontSize: 17,
    color: 'black',
  },
});

export default BookDetail;
