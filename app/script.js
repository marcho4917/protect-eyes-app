import React from 'react';
import { render } from 'react-dom';


  const WORK = 'work';
  const REST = 'rest';
  const OFF = 'off';

class App extends React.Component {

  state = {
    status: OFF,
    time: 1200,
    timer: null, 
  }

  formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(Math.floor(time % 60)).padStart(2, '0');
    return minutes + ':' + seconds;
  }

  step = () => {
    this.setState({
      time: this.state.time - 1,
    })

    if( this.state.time === 0) {
      if(this.state.status === WORK) {
        this.setState({
          status: REST,
          time: 20,
        });
      } else if(this.state.status === REST) {
        this.setState({
          status: WORK,
          time: 1200,
        });
      }
    }
  };

  startTimer = () => {
  
    this.setState({
      status: WORK,
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      time: 0,
      status: OFF,
    });
  };

  closeApp = () => {
    window.close();
  };

  isOff = () => {
    return this.state.status === OFF;
  };

  isNotOff = () => {
    return this.state.status !== OFF;
  };

  isWork = () => {
    return this.state.status === WORK;
  };

  isRest = () => {
    return this.state.status === REST;
  };

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.isOff() && <div><p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p></div>}
        {this.isWork() && <img src="./images/work.png" />}
        {this.isRest() && <img src="./images/rest.png" />}
        {this.isNotOff() && <div className="timer">{this.formatTime(this.state.time)}</div>}
        {this.isOff() && <button onClick={this.startTimer} className="btn" >Start</button>}
        {this.isNotOff() && <button onClick={this.stopTimer} className="btn" >Stop</button>}
        <button onClick={this.closeApp} className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));