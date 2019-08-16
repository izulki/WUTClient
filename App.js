import React, {Fragment} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

/*** Screens ***/
import Login from './screens/login.js'
import InboxScreen from './screens/inbox.js'
import { createStackNavigator, createAppContainer } from "react-navigation";
const GLOBAL = require('./globals.js');

class HomeScreen extends React.Component {

  state = {
    address: 'null',
  };

  _login() {
    console.log(`${GLOBAL.API_ADDRESS_PORT}email/auth/${this.state.address}`);
    fetch(`${GLOBAL.API_ADDRESS_PORT}email/auth/${this.state.address}`)
      .then(response => response.json())
      .then(data => {
        if (data.length) {
            this.props.navigation.navigate('Inbox', {userData: data})
        } else {
          alert('Account does not exist.');
        }
      });
  }

  render() {
    return (
      <View style={styles.loginWrapper}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.WUTTitle}>WeUsThem</Text>
          <Text style={styles.WUTSubtitle}>Email Client</Text>
          <TextInput
            placeholder = {"Enter Email Address"}
            textAlign = {"center"}
            onChangeText={text => {
              this.setState({address: text});
            }}
          />
          <Button title={'Login'} onPress={() => this._login()} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    alignContent: 'center',
    marginHorizontal: "10%",
    marginBottom: "40%"
  },
  WUTTitle: {
    fontSize: 30,
    textAlign: 'center',
  },
  WUTSubtitle: {
    textAlign: 'center',
  },
});


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Inbox: InboxScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);