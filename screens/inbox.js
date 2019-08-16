import React, {Fragment} from 'react';
import {View, Text} from 'react-native'

class InboxScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: this.props.navigation.getParam("userData", null),
        }

    }

    state = {
        userData: null,
    }
    componentDidMount() {
        console.log(this.state.userData)
    }

    render() {
        return (
          <View>
              <Text>{this.state.userData[0].user_id}</Text>
          </View>
        );
      }
  }

export default InboxScreen;