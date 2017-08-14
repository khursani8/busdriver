//import liraries
import React from 'react';
import { View, Text, StyleSheet,Button,TextInput } from 'react-native';
import ModalPicker from 'react-native-modal-picker'

class Start extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      near: '',
      bus:[]
    };
  }

  static navigationOptions = {
    title: 'Start'
  };

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 1}}>
        <Text>Select Route</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, width:240}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
        <Text>Select Bus No</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, width:240}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
        <Text>Select Stop</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, width:240}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
      </View>
    )
  }

  _handlePress = () => {
    this.props.navigation.navigate('Search');
  }

  onPressLearnMore = ()=>{

  }

  _getCoordinate = () => {
    index = 0
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        fetch(`http://54.255.201.153:8000/updateUserLocationAndgetNearestStation/?latitude=${this.state.latitude}&longitude=${this.state.longitude}`)
          .then((data)=>data.json())
          .then((dataJson)=>{
            bus = dataJson.res[7].map((el)=>{
              return {key:index++,label:el.bus_no}
            })
            console.log(bus);
            this.setState({near:dataJson.res[3][0].location_name,bus:bus})
          })

        // fetch('http://54.255.192.154:8000/listBus')  //listBus
        //   .then((data)=>data.json())
        //   .then((dataJson)=>{
        //     this.setState({data:dataJson.map((el)=>({key:index++,label:el.label}))})
        //   })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

  }
}

//make this component available to the app
export default Start;
