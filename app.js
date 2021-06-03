(function (w, d) {
  'use strict';
  let _v = '0.9',
    _id = -1;

  function AudioEditor() {
    // building thisAE object (thisAE is q in original code)
    let thisAE = this; // keeping track of current AudioEditor (AudioEditor {})
    thisAE.el = null; // reference of main html element
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
  }

  !w.AudioList && (w.AudioList = []);
  w.AudioEditor = new AudioEditor();
  AudioList.push(w.AudioEditor); // duplicating the current AudioEditor
})(window, document);
