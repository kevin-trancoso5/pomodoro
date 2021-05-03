import { StatusBar } from "expo-status-bar";
import React from "react";
import { render } from "react-dom";
import { Button, StyleSheet, Text, View } from "react-native";

export class Count extends React.Component {
  render() {
    return (
      <Text style={this.props.style}>
        {this.props.minutes < 10 ? `0${this.props.minutes}` : this.props.minutes}:{this.props.seconds < 10 ? `0${this.props.seconds}` : this.props.seconds}
      </Text>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.workTime= 45;
    this.pauseTime= 5;
    this.state = {
      working: true,
      pause: true,
      minutes: this.workTime,
      seconds: 0,
    };
  }




  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { pause, seconds, minutes } = this.state;
      if (!pause) {
        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1,
          }));
        }
        if (seconds === 0) {
          if (minutes === 0) {
            this.changeInterval();
          } else {
            this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59,
            }));
          }
        }
      }
    }, 1000);
  }

  changeInterval() {
    this.setState((prevState) => ({
      working: !prevState.working,
      minutes: !prevState.working?this.workTime:this.pauseTime,
      seconds: 0
    }))
  }

  togglePause = () => this.setState(prevState => (
    {
      pause: !prevState.pause
    }
  ))

  reset = () => this.setState(
  {
    working: true,
    pause: true,
    minutes: this.workTime,
    seconds: 0,
  })




  render() {
    if(this.state.working){
      this.texte = "Travail"
    }
    else {
      this.texte = "Pause"
    }

    if(this.state.minutes == 0 && this.state.seconds <= 20){
      this.countStyle = styles.countLow
    }
    else{
      this.countStyle = styles.countDefault
    }
    
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.texte}</Text>
        <Count style= {this.countStyle} minutes={this.state.minutes} seconds={this.state.seconds}></Count>
        
        <View style={styles.row}>
          <Button style={styles.button} onPress={this.togglePause} title={this.state.pause==true? "Démarrer":"Stop"}></Button>
          <Button style={styles.button} onPress={this.reset} title="Reset"></Button></View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignContent: "center",
  },
  button: {
    padding: 20,
    margin: 20,
  },
  countDefault: {
    color: "#000",
    fontSize: 75,
    fontWeight: "bold"
  },
  countLow: {
    color: "#F00",
    fontSize: 75,
    fontWeight: "bold"
  },
  text: {
    color: "#000",
    fontSize: 50,
  }
});
