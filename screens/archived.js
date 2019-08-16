import React, {Fragment} from 'react';
import {View, Text, FlatList} from 'react-native';
const GLOBAL = require('../globals');

import {List, ListItem} from 'react-native-elements';

import NavBar from './navbar';

export default class ArchiveScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      messages: [],
      refresh: false,
    };
  }

  componentDidMount() {
    console.log("From archives:", this.props.navigation.getParam('userData', null))
    this._fetchInbox(this.props.navigation.getParam('userData', null));
  }

  _fetchInbox(userData) {
    console.log(
      `_fetchInbox(): ${GLOBAL.API_ADDRESS_PORT}email/${userData[0].user_id}/archived`,
    );
    fetch(`${GLOBAL.API_ADDRESS_PORT}email/${userData[0].user_id}/archived`)
      .then(response => response.json())
      .then(data => {
        if (data.length) {
          this.setState({messages: data, loading: false});
        } else {
          alert('No messages.');
          this.setState({loading: false});
        }
      });
  }

  refresh() {
    this.setState(
        {
          refresh: !this.state.refresh,
        });
  }

  _fetchUserInfo(id) {
    console.log(`_fetchUserInfo(): ${GLOBAL.API_ADDRESS_PORT}email/user/${id}`);
    fetch(`${GLOBAL.API_ADDRESS_PORT}email/user/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.length) {
          return `${data[0].first_name} ${data[0].last_name}`;
        } else {
          alert('No Such User');
        }
      });
  }

  _goToMessage(data) {
    this.props.navigation.navigate('Message', {msgData: data})
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 10}}>
          {this.state.messages.map((l, i) => (
            <ListItem
              key={l.id} //string?
              title={`${l.first_name} ${l.last_name}`}
              subtitle={l.message}
              onPress={() => this._goToMessage(l)}
            />
          ))}
        </View>
        <View style={{flex:1}}>
          <NavBar />
        </View>
      </View>
    );
  }
}
