(function (w, d) {
  'use strict';
  let _v = '0.9',
    _id = -1;

  function AudioEditor() {
    // building thisAE object (thisAE is q in original code)
    let thisAE = this; // keeping track of current AudioEditor (AudioEditor {})
    thisAE.htmlEl = null; // reference of main html element
    thisAE.id = ++_id; // auto incremental id
    thisAE._deps = {}; // dependencies
    console.log('initializing thisAE object', thisAE);

    // understanding window object
    console.log('*************************************************');
    w.AudioList[thisAE.id] = thisAE;
    console.log('window w', w);
    console.log('w.AudioList[thisAE.id]', w.AudioList[thisAE.id]);

    // setting up events
    let events = {};

    // attaching a fireEvent method to thisAE
    thisAE.fireEvent = function (eventName, value, valueBis) {
      // eventName is an array of functions
      let eventArr = events[eventName];
      if (!eventArr) return false;
      // trigger the functions listed within the eventName array
      let maxIndex = eventArr.length;
      while (maxIndex-- > 0) {
        eventArr[maxIndex] && eventArr[maxIndex](value, valueBis);
      }
    };
    // attaching a listenFor method to thisAE
    thisAE.listenFor = function (eventName, callback) {
      // if that eventName is undefined or empty, then initialize it with callback event
      if (!events[eventName]) {
        events[eventName] = [callback];
      } else {
        // otherwise add callback event to the beginning of the array of functions for that eventName
        events[eventName].unshift(callback);
      }
    };
    // attaching a stopListeningFor method to thisAE
    thisAE.stopListeningFor = function (eventName, callback) {
      // eventName is an array of functions
      let eventArr = events[eventName];
      if (!eventArr) return false;
      // find and kill the callback event from the array of events
      let maxIndex = eventArr.length;
      while (maxIndex-- > 0) {
        if (eventArr[maxIndex] && eventArr[maxIndex] === callback) {
          eventArr[maxIndex] = null;
          break;
        }
      }
    };
    // attaching a stopListeningForName method to thisAE
    thisAE.stopListeningForName = function (eventName, callback) {
      // eventName is an array of functions
      let eventArr = events[eventName];
      if (!eventArr) return false;
      events[eventName] = null;
    };
    // attaching an init method to thisAE
    thisAE.init = function (htmlEl_id) {
      // attach the html element reference to thisAE
      const htmlEl = d.getElementById(htmlEl_id);
      if (!htmlEl) {
        console.log('Invalid HTML element');
        return;
      }
      thisAE.htmlEl = htmlEl;

      // init libraries
      thisAE.ui = new thisAE._deps.ui(thisAE);
    };
  }

  // initialize an AudioList array
  !w.AudioList && (w.AudioList = []);
  // ideally we do not want a global singleton referencing our audio tool, but this is a limited demo
  w.AudioEditor = new AudioEditor();
  AudioList.push(w.AudioEditor); // duplicating the current AudioEditor & keeping track in the AudioList array of our AudioEditor instance
})(window, document);
