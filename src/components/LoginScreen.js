import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableHighlight,
  View,
  ScrollView,
  TextInput
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
  }

  handleLogin() {
    let userName = this.state.userName;
    this.props.loginFeedback(userName);
  }

  render() {
      return (
        <View style={styles.userProfileContainer}>
          <Image
            style={{width: 200, height: 450 }}
            source={require('../images/character_login.png')}
          />
          <View style={{width:250, marginTop: -150}}>
            <TextInput
              style={styles.userInput}
              onChangeText={(userInput) => this.setState({userName: userInput})}
              placeholder="Choose player name!"
              value={this.state.userName}
            />
            <TouchableHighlight onPress={this.handleLogin.bind(this)} underlayColor='transparent'
             style={styles.userButton}>
              <Text style={styles.buttonText}>Play!</Text>
            </TouchableHighlight>
          </View>
          <KeyboardSpacer/>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  userProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  userInput: {
    height: 40,
    width: 250,
    padding: 10,
    backgroundColor: '#fff',
    color: '#111',
    marginBottom: 5
  },
  userButton: {
    width: 250,
    height: 40,
    backgroundColor: '#2f5a2c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#fff",
    fontWeight: "bold",
    letterSpacing:1
  }
});
