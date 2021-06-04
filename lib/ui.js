(function (w, d, AE) {
  console.log('inside ui function');
  ('use strict');

  // MAIN UI CLASS
  const AEUI = function (ae) {
    let thisAEUI = this; // keeping track of current AudioEditor UI
    console.log('thisAEUI in ui.js', thisAEUI);
    console.log('this in ui.js', this);
    this.htmlEl = ae.htmlEl; // hold reference to the current AudioEditor's htmlEl

    // if mobile, add proper class
    this.htmlEl.className += ' ae_app' + (ae.isMobile ? ' ae_mobile' : '');

    // hold references to the current AudioEditor's event functions
    this.fireEvent = ae.fireEvent;
    this.listenFor = ae.listenFor;

    // keep track of the active UI element
    this.InteractionHandler = {
      on: false,
      by: null,
      arr: [],
    };
  };

  // attach ui library to the AudioEditor's _deps object
  AE._deps.ui = AEUI;
})(window, document, AudioEditor);
