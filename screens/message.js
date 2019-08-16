import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
const GLOBAL = require('../globals');

import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import {List, ListItem} from 'react-native-elements';
import {thisTypeAnnotation} from '@babel/types';

export default class MessageScreen extends React.Component {
  constructor(props) {
    super(props);

    msgData = this.props.navigation.getParam('msgData', null);
    this.state.msg = msgData;
  }

  state = {
    msg: {},
  };

  componentDidMount() {
    console.log(this.state.msg);
  }

  _archive() {
    fetch(`${GLOBAL.API_ADDRESS_PORT}email/archive/`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
        body: `message_id=${this.state.msg.id}`, // <-- Post parameters
      })
        .then(response => response.text())
        .then(responseText => {
          this.props.navigation.goBack();
        })
        .catch(error => {
          console.error(error);
        });
  }

  _delete() {
    fetch(`${GLOBAL.API_ADDRESS_PORT}email/delete/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      }),
      body: `message_id=${this.state.msg.id}`, // <-- Post parameters
    })
      .then(response => response.text())
      .then(responseText => {
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 10}}>
          <Text style={{fontWeight: 'bold'}}>
            From: {this.state.msg.first_name} {this.state.msg.last_name} -{' '}
            {this.state.msg.address}
          </Text>
          <Text style={{fontSize: 16, marginTop: 5}}>
            {this.state.msg.message}{' '}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            minHeight: height * 0.05,
            borderTopColor: 'black',
            borderTopWidth: 1,
          }}>
          <View style={{flex: 1}}>
            <Text onPress={() => this._archive()} style={styles.button }>Archive</Text>
          </View>
          <View style={{flex: 1}}>
            <Text onPress={() => this._delete()} style={styles.button}>Delete</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    fontSize: 20,
    alignContent: 'center',
    fontWeight: 'bold',
  },
});
