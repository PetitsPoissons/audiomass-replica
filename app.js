(function (w, d) {
  'use strict';
  var _v = '0.9',
    _id = -1;

  function PKAE() {
    // building q object
    var q = this; // keeping track of current PKAE (PKAE {})
    q.el = null; // reference of main html element
    q.id = ++_id; // auto incremental id
    q._deps = {}; // dependencies
    console.log('initializing q object', q);

    // understanding window object
    console.log('*************************************************');
    w.PKAudioList[q.id] = q;
    console.log('window w', w);
    console.log('w.PKAudioList[q.id]', w.PKAudioList[q.id]);
  }
  !w.PKAudioList && (w.PKAudioList = []);
  w.PKAudioEditor = new PKAE();
  PKAudioList.push(w.PKAudioEditor);
})(window, document);
