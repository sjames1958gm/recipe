import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';
import {searchChanged, startSearch, getRandomRecipe} from './actions'

class FrontPage extends Component {
  componentDidMount() {
    this.props.getRandomRecipe();
  }
  renderMessages() {
    if (this.props.loading) {
      return <Text> Loading... </Text>
    }
  }
  renderRandomRecipe() {
    const recipes = this.props.recipes;
    if (recipes.length > 0) {
      const index = Math.floor(Math.random() * recipes.length);
      return this.renderRecipe(index);
    }
  }
  renderRecipe(index) {
    const recipe = this.props.recipes[index].recipe;
    return (
      <View>
        <Image
          source={{uri: recipe.image}}
          style={styles.image}
        />
      </View>
    )
  }
  renderRecipes() {
    if (this.props.recipes.length > 0) {
      return this.renderRecipe(0);
    }
  }
  render() {
    return (
      <View style={styles.container} onLayout={(event) => console.log(event.nativeEvent.layout)}>
        <Text style={styles.welcome}>
          Recipe Application
        </Text>
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="#f2f2f2"
          onChangeText={(text) => this.props.searchChanged(text)}
          value={this.props.search}
          returnKeyType="search" placeholder="search"
          onSubmitEditing={() => this.props.startSearch(this.props.search)}
        />
        {this.renderMessages()}
        {this.props.showRandom ? this.renderRandomRecipe() : this.renderRecipes()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.search.text,
  loading: state.search.loading,
  recipes: state.recipes,
  showRandom: state.applicationState.showRandom
})

export default connect(mapStateToProps, {
  searchChanged,
  startSearch,
  getRandomRecipe
})(FrontPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2b3643'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: "#f2f2f2",
    margin: 10,
  },
  searchInput: {
    color: "#f2f2f2",
    width: "100%", 
    height: 40, 
    margin: 2,
    borderColor: 'black', 
    borderWidth: 1
  },
  image: {
    width: 300,
    height: 300
  }
});
