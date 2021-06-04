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

    // initialize the InteractionHandler object to keep track of the active UI element
    this.InteractionHandler = {
      on: false,
      by: null,
      arr: [],

      // attach check method
      check: function (_name) {
        // if on is true and by is not that _name, return false
        if (this.on && this.by !== _name) {
          return false;
        }
        //otherwise return true
        return true;
      },

      // attach checkAndSet method
      checkAndSet: function (_name) {
        if (!this.check(_name)) return false;
        this.on = true;
        this.by = _name;
        return true;
      },

      // attach forceSet method
      forceSet: function (_name) {
        // save current setting into array arr
        if (this.on) {
          this.arr.push({
            on: this.on,
            by: this.by,
          });
        }
        // before setting with passed _name
        this.on = true;
        this.by = _name;
      },

      // attach forceUnset method
      forceUnset: function (_name) {
        if (this.check(_name)) {
          // get previousSetting from array arr, if any
          const previousSetting = this.arr.pop();
          if (previousSetting) {
            this.on = previousSetting.on;
            this.by = previousSetting.by;
          } else {
            this.on = false;
            this.by = null;
          }
        }
      },
    };

    // set different css if on mobile
    if (ae.isMobile) {
      d.body.className = 'ae_stndln';
      const fxd = d.createElement('div');
      fxd.className = 'ae_fxd';
      fxd.appendChild(this.htmlEl);
      d.body.appendChild(fxd);
      _makeMobileScroll(this);
    }
  };

  // Helper function _makeMobileScroll
  function _makeMobileScroll(UI) {
    // helper function getFactor
    const getFactor = function () {
      const screenHeight = window.screen.height;
      const screenWidth = window.screen.width;
      const innerHeight = window.innerHeight;
      const innerWidth = window.innerWidth;
      let barsVisible = false;
      let ratio = 0;

      if (window.orientation === 0) {
        ratio = innerHeight / screenHeight;
      } else if (window.orientation === 90 || window.orientation === -90) {
        ratio = innerHeight / screenWidth;
      }

      if (ratio < 0.8) barsVisible = true;

      return barsVisible;
    };

    // scrolling logic
    let ex = -1;
    let ey = -1;
    let allow = false;

    d.body.addEventListener('touchstart', function (e) {
      ex = e.touches[0].pageX;
      ey = e.touches[0].pageY;
      allow = false;
    });

    d.body.addEventListener('touchend', function (e) {
      ex = -1;
      ey = -1;
      allow = false;
    });

    d.body.addEventListener(
      'touchmove',
      function (e) {
        if (e.target.tagName === 'INPUT') return;
        if (allow) return;

        let newX = e.touches[0].pageX;
        let newY = e.touches[0].pageY;
        let directionX = ex - newX;
        let directionY = ey - newY;

        if (
          directionY === 0 ||
          (Math.abs(directionY) < 3 && Math.abs(directionX) > 3) ||
          (Math.abs(directionY) < 6 && Math.abs(directionX) > 10)
        ) {
          ex = newX;
          ey = newY;
          allow = true;
          return;
        }

        ex = newX;
        ey = newY;
        let xx = document.getElementsByClassName('ae_modal_back');
        if (xx[0]) {
          xx = xx[0];
          if (xx.scrollHeight > window.innerHeight) {
            const scrolled = xx.scrollTop;

            if (directionY > 0) {
              const modalHeight =
                document.getElementsByClassName('ae_modal')[0].clientHeight;
              if (modalHeight - scrolled < window.innerHeight - 80) {
                e.preventDefault();
              }
            } else {
              if (scrolled <= 0) {
                e.preventDefault();
              }
            }

            allow = true;
            return;
          } else {
            e.preventDefault();
            allow = true;
            return;
          }
        }

        if (!getFactor()) {
          e.preventDefault();
          allow = true;
        }
      },
      { passive: false }
    );
  }

  // attach ui library to the AudioEditor's _deps object
  AE._deps.ui = AEUI;
})(window, document, AudioEditor);
