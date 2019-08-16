import React, {Fragment} from 'react';
import {View, Text, FlatList} from 'react-native';
const GLOBAL = require('../globals');

import {List, ListItem} from 'react-native-elements';

export default class InboxScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      messages: [],
    };
  }

  componentDidMount() {
    this._fetchInbox(this.props.navigation.getParam('userData', null));
  }

  _fetchInbox(userData) {

    console.log(
      `_fetchInbox(): ${GLOBAL.API_ADDRESS_PORT}email/${userData[0].user_id}`,
    );
    fetch(`${GLOBAL.API_ADDRESS_PORT}email/${userData[0].user_id}`)
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

  _fetchUserInfo(id){
    console.log(
        `_fetchUserInfo(): ${GLOBAL.API_ADDRESS_PORT}email/user/${id}`,
      );
    fetch(`${GLOBAL.API_ADDRESS_PORT}email/user/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.length) {
            return `${data[0].first_name} ${data[0].last_name}`
        } else {
          alert('No Such User');
        }
      });
  }

  render() {
    return (
      <View>
         {
        this.state.messages.map((l, i) => (
            <ListItem
                key={l.id} //string?
                title={`${l.first_name}`}
                subtitle={l.message}
            />
        ))
        }
      </View>
    );
  }
}
