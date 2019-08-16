import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
const GLOBAL = require('../globals');

import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

import {withNavigation} from 'react-navigation'

import {List, ListItem} from 'react-native-elements'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
   console.log("from navbar", this.props.userData)
  }

  _goToArchive(data) {
    this.props.navigation.navigate('Archive', {userData: data})
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: "row", minHeight: height*0.05, position: 'absolute', justifyContent: 'flex-end', borderTopColor: 'black', borderTopWidth: 1}}>
        <View style={{flex: 1}}><Text onPress={() => this._goToArchive(this.props.userData)} style={styles.button}>Archive</Text></View> 
        <View style={{flex: 1}}><Text style={styles.button}>Send</Text></View>
        <View style={{flex: 1}}><Text style={styles.button}>Spam</Text></View>
      </View>
    );
  }
}


const styles = StyleSheet.create( {
    button: {
        textAlign: 'center',
        fontSize: 20,
        alignContent: 'center',
        fontWeight: 'bold'
    }


})

export default withNavigation(NavBar);