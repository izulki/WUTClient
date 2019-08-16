import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
const GLOBAL = require('../globals');

export default class Login extends React.Component {
  state = {
    address: "null",
  };

  _login() {
    console.log(`${GLOBAL.API_ADDRESS_PORT}email/auth/${this.state.address}`);
    fetch(`${GLOBAL.API_ADDRESS_PORT}email/auth/${this.state.address}`)
      .then(response => response.json())
      .then(data => {
        if (data.length) {
            alert("Success");
        } else {
            alert("Account does not exist.");
        }
      });
  }

  render() {
    return (
      <View>
        <Text>WeUsThem</Text>
        <Text>Email Client</Text>
        <TextInput title="Enter Email Address" onChangeText={(text) => {this.setState({address: text})}} />
        <Button title={'Login'} onPress={() => this._login()} />
      </View>
    );
  }
}
