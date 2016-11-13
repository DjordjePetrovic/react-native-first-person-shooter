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
import Camera from 'react-native-camera';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import weapons from '../warehouse/weapons';
import _ from 'lodash';
var Sound = require('react-native-sound');

// Sounds
let gunSound    = new Sound('Gun_single.mp3', Sound.MAIN_BUNDLE),
    reloadSound = new Sound('Reload.mp3', Sound.MAIN_BUNDLE);

// default weapon
let defaultWeapon = weapons[0];

export default class ShootScene extends Component {

  constructor(props) {
    super(props);
    this.changeAmmo = this.changeAmmo.bind(this);
    this.state = {
      activeWeapon: defaultWeapon,
      weaponView: defaultWeapon.holdGraph,
      bullets: defaultWeapon.bullets
    };
  }

  triggerBullet() {
    if(this.state.bullets != 0) {
      gunSound.play();
      this.setState({
        weaponView: this.state.activeWeapon.activeGraph,
        bullets: this.state.bullets - 1
      });
    } else {
      reloadSound.play();
      this.setState({
        bullets: this.state.activeWeapon.bullets
      });
    }

  }

  releaseBullet(){
    gunSound.stop();
    this.setState({
      weaponView: this.state.activeWeapon.holdGraph
    })
  }

  changeAmmo(index) {
    let newWeapon = weapons[index];
    this.setState({
      activeWeapon: newWeapon,
      weaponView: newWeapon.holdGraph,
      bullets: newWeapon.bullets
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <ScrollView horizontal={true} pagingEnabled={true} style={styles.weaponScrollView}>
          {weapons.map((weapon, index) => {
            return (
              <TouchableHighlight onPress={() => this.changeAmmo(index)} key={index}>
                <Image source={weapon.icon} style={styles.weaponIcon} />
              </TouchableHighlight>
            );
          })}
        </ScrollView>
        <View style={styles.targetc}>
           <Image
            style={styles.target}
            source={require('../images/targetIcon.png')}
           />
         </View>
         <TouchableHighlight
            onPressIn={this.triggerBullet.bind(this)}
            onPressOut={this.releaseBullet.bind(this)}
            underlayColor='transparent'
          style={{position: 'absolute', bottom: 30, right: -50}}>
           <Image
            style={{width: 300, height: 300}}
            source={this.state.weaponView}
           />
         </TouchableHighlight>
         <View style={styles.footer}>
          <Image
            style={{width: 60, position: 'absolute', height: 80, marginTop: -80}}
            source={require('../images/char.png')}
          />
          <Text style={styles.playerName}>
            {this.props.playerName}
          </Text>
          {_.times(this.state.bullets, index =>
              <Image source={require('../images/bullet.png')} key={index} style={styles.bulletIcon} />
          )}
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  gun: {
   flex: 1,
   justifyContent: 'center',
   height: Dimensions.get('window').height,
   width: Dimensions.get('window').width
 },
 targetc: {
   position: 'absolute',
   left: 0,
   right: 0,
   top: 0,
   bottom: 0,
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   height: Dimensions.get('window').height,
   width: Dimensions.get('window').width
 },
 target:  {
   width: 100,
   height: 100,
   justifyContent: 'center'
 },
 weaponScrollView: {
    flex: 1,
    position: 'absolute',
    zIndex: 99,
    backgroundColor:'rgba(52,52,52,0.4)',
    padding:3,
    top: 30,
    left: 0
    },
  weaponIcon: {
    width:60,
    height:60,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  bulletIcon: {
    width: 14,
    height: 14,
    alignSelf: 'center'
  },
  footer: {
    height: 30,
    width: Dimensions.get('window').width,
    backgroundColor: '#2f5a2c',
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex:1
  },
  playerName: {
    fontWeight: 'bold',
    padding: 5
  }
});
