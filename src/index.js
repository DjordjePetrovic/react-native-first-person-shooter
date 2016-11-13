import React, { Component } from 'react';
import LoginScreen from './components/LoginScreen';
import ShootScene from './components/ShootScene';

export default class FirstPersonShooter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasPlayer: false,
      playerName: ''
    };
  }

  render() {
    const { hasPlayer, playerName } = this.state;
    return (
      hasPlayer ? <ShootScene playerName={playerName}/>
      : <LoginScreen loginFeedback={(userName) => {
        this.setState({ hasPlayer: true, playerName:userName }) }}/>
    );
  }
}
