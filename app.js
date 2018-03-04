const {MicropedeClient} = require('@micropede/client/src/client.js');

const five = require("johnny-five");
const _ = require('lodash');

const board = new five.Board();

const OUTPUT = 1;

const PINS = [2,4,7,8];


const APPNAME = 'microdrop';
const PORT = 1884;

class FerroBotDriver extends MicropedeClient {
  constructor(appName=APPNAME, ...args){
    super(appName, undefined, PORT, ...args);
  }
  listen() {
    this.onStateMsg('electrodes-model', 'active-electrodes', (payload, params) => {
      this.turnOn(payload[0]);
      console.log({payload, params});
    });
  }
  turnOn(electrodeId) {
    console.log("turning on: ", electrodeId);
    switch (electrodeId) {
      case 'electrode000':
        board.digitalWrite(PINS[0], 1);
        board.digitalWrite(PINS[1], 0);
        board.digitalWrite(PINS[2], 0);
        board.digitalWrite(PINS[3], 1);
        break;
      case 'electrode001':
        board.digitalWrite(PINS[0], 0);
        board.digitalWrite(PINS[1], 1);
        board.digitalWrite(PINS[2], 0);
        board.digitalWrite(PINS[3], 1);
        break;
      case 'electrode002':
        board.digitalWrite(PINS[0], 1);
        board.digitalWrite(PINS[1], 0);
        board.digitalWrite(PINS[2], 1);
        board.digitalWrite(PINS[3], 0);
        break;
      case 'electrode003':
        board.digitalWrite(PINS[0], 0);
        board.digitalWrite(PINS[1], 1);
        board.digitalWrite(PINS[2], 1);
        board.digitalWrite(PINS[3], 0);
        break;
      default:
        board.digitalWrite(PINS[0], 0);
        board.digitalWrite(PINS[1], 0);
        board.digitalWrite(PINS[2], 0);
        board.digitalWrite(PINS[3], 10);
    }
  }

}

board.on("ready", function () {
  new FerroBotDriver();
});
