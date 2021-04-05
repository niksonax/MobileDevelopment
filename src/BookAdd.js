import React from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import newBooks, { Book } from "./BooksParse";

class BookDetail extends React.Component {
  state = {
    title: "",
    subtitle: "",
    price: "",
  };
  handleTitle = (text) => {
    this.setState({ title: text });
  };
  handleSubtitle = (text) => {
    this.setState({ subtitle: text });
  };
  handlePrice = (text) => {
    this.setState({ price: text });
  };

  adding = (title, subtitle, price) => {
    if (price >= 0 && title.replace(/\s/g, "") !== "" && subtitle.replace(/\s/g, "")!== "" && price.replace(/\s/g, "")!== "") {
      const AddedBook = new Book(title, subtitle, undefined, price, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
      const BreakException = {};

      try {
        newBooks.forEach(function(item) {
          if(item.title === title || item.subtitle === subtitle){
            throw BreakException
          }
        });
        newBooks.push(AddedBook)
      } catch (e) {
        if (e !== BreakException) throw e;
      }
      this.props.navigation.navigate("BooksList", {AddedBook: true});
    } else {
      alert("Input error");
    }


  };

  render() {
    return (
      <View style={{ padding: 20 }}>
        <Text style={styles.textTitle}>Title: </Text>
        <TextInput
          style={styles.input}
          value={this.state.title}
          onChangeText={this.handleTitle} />

        <Text style={styles.textTitle}>Subtitle: </Text>
        <TextInput
          style={styles.input}
          value={this.state.subtitle}
          onChangeText={this.handleSubtitle} />
        <Text style={styles.textTitle}>Price: </Text>
        <TextInput
          style={styles.input}
          value={this.state.price.toString()}
          onChangeText={this.handlePrice} />
        <View style={{ margin: 20 }}>
          <TouchableOpacity onPress={() => this.adding(this.state.title, this.state.subtitle, this.state.price)}
                            style={styles.button}>
            <Text style={{ fontSize: 20, color: "#2196F3" }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    marginTop: 10,
    fontSize: 20,
    color: "black",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
  },
});


export default BookDetail;
