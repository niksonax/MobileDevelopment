import React from 'react';
import {View, Image, ScrollView, StyleSheet} from 'react-native';
import images from './Images';
import {Col, Row, Grid} from 'react-native-easy-grid';
import BaseManager from './database';

const manager = new BaseManager();

class ImagesCollection extends React.Component {
  constructor(props) {
    super(props);
    this.getPhoto();
    this.state = {dataSource: images};
  }

  componentWillMount = () => {
    this.getPhoto();
    this.setState({dataSource: images});
  };

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      this.setState({dataSource: this.state.dataSource});
    });
  }

  componentWillUnmount() {
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  getPhoto() {
    this.timeoutPromise(
      1000,
      fetch(
        `https://pixabay.com/api/?key=19193969-87191e5db266905fe8936d565&q=red+cars&image_type=photo&per_page=21`,
      )
        .then((respsonse) => respsonse.json())
        .then((data) => {
          for (let i = 0; i < data.hits.length; i += 1) {
            if (!images.includes(data.hits[i].largeImageURL)) {
              images.push(data.hits[i].largeImageURL);
              manager.addGallery(data.hits[i].largeImageURL);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.setState({loading: false});
        }),
    ).catch((error) => {
      manager
        .selectGallery(req)
        .then((temp) => (images = data.hits[i].largeImageURL));
    });
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

  render() {
    const cur_images = [];
    for (let i = 0; i < images.length; i += 7) {
      cur_images.push(images.slice(i, i + 7));
    }
    const column_height = 100;
    return (
      <>
        <ScrollView style={{flex: 1}}>
          <Grid>
            {cur_images.map(function (image, index) {
              return (
                <Row style={{height: column_height * 3}}>
                  <Col>
                    {image[0] ? (
                      <Row style={gridLeft(column_height)} size={1}>
                        <Image source={{uri: image[0]}} style={styles.img} />
                      </Row>
                    ) : (
                      <Row style={gridLeft(column_height, null)} size={1} />
                    )}
                    {image[3] ? (
                      <Row style={gridLeft(column_height)} size={1}>
                        <Image source={{uri: image[3]}} style={styles.img} />
                      </Row>
                    ) : (
                      <Row style={gridLeft(column_height, null)} size={1} />
                    )}
                    {image[5] ? (
                      <Row style={gridLeft(column_height)} size={1}>
                        <Image source={{uri: image[5]}} style={styles.img} />
                      </Row>
                    ) : (
                      <Row style={gridLeft(column_height, null)} size={1} />
                    )}
                  </Col>
                  {image[1] ? (
                    <Col style={gridCenter(column_height * 3)} size={2}>
                      <Image source={{uri: image[1]}} style={styles.img} />
                    </Col>
                  ) : (
                    <Col style={gridCenter(column_height * 2, null)} size={2} />
                  )}
                  <Col>
                    {image[2] ? (
                      <Row style={gridRight(column_height)} size={1}>
                        <Image source={{uri: image[2]}} style={styles.img} />
                      </Row>
                    ) : (
                      <Row style={gridRight(column_height, null)} size={1} />
                    )}
                    {image[4] ? (
                      <Row style={gridRight(column_height)} size={1}>
                        <Image source={{uri: image[4]}} style={styles.img} />
                      </Row>
                    ) : (
                      <Row style={gridRight(column_height, null)} size={1} />
                    )}
                    {image[6] ? (
                      <Row style={gridRight(column_height)} size={1}>
                        <Image source={{uri: image[6]}} style={styles.img} />
                      </Row>
                    ) : (
                      <Row style={gridRight(column_height, null)} size={1} />
                    )}
                  </Col>
                </Row>
              );
            })}
          </Grid>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 50,
    height: 50,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

const gridLeft = function (height, color = 'gray') {
  const style = {
    marginBottom: 2,
    marginRight: 2,
    paddingBottom: height * 0.13,
    paddingTop: height * 0.13,
  };
  if (color) {
    style.backgroundColor = color;
  }
  return style;
};

const gridCenter = function (height, color = 'gray') {
  const style = {
    marginBottom: 2,
    paddingBottom: height * 0.13,
    paddingTop: height * 0.13,
  };
  if (color) {
    style.backgroundColor = color;
  }
  return style;
};

const gridRight = function (height, color = 'gray') {
  const style = {
    marginBottom: 2,
    marginLeft: 2,
    paddingBottom: height * 0.13,
    paddingTop: height * 0.13,
  };
  if (color) {
    style.backgroundColor = color;
  }
  return style;
};

export default ImagesCollection;
