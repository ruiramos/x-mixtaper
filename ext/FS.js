(function() {
    'use strict';


    /* 2013 jose.pedro.dias@gmail.com */



    var FS = {

        /**
         * @property {Boolean} ?
         */
        isSupported: !!( document.fullscreenEnabled       ||
                         document.webkitFullscreenEnabled ||
                         document.msFullscreenEnabled     ||
                         document.mozFullScreenEnabled ),

        /**
         * @function ? requests the element to go to full screen
         * @param  {DOMElement} el
         */
        request: function(el) {
            if (el.requestFullscreen) {       return el.requestFullscreen();       }
            if (el.webkitRequestFullScreen) { return el.webkitRequestFullScreen(); }
            if (el.msRequestFullscreen) {     return el.msRequestFullscreen();     }
            if (el.mozRequestFullScreen) {    return el.mozRequestFullScreen();    }
        },

        /**
         * @function ? requests the element to go stop being in full screen
         */
        exit: function() {
            if (document.exitFullscreen) {       return document.exitFullscreen();       }
            if (document.webkitExitFullscreen) { return document.webkitExitFullscreen(); }
            if (document.msExitFullscreen) {     return document.msExitFullscreen();     }
            if (document.mozCancelFullScreen) {  return document.mozCancelFullScreen();  }
        },

        /**
         * @function {Boolean} ? returns true iif element is in full screen
         */
        inFullscreen: function() {
            return !!this.currentElement();
        },

        /**
         * @function {DOMElement} ? returns the element in full screen
         */
        currentElement: function() {
            if (document.fullscreenEnabled) {       return document.fullscreenElement;       }
            if (document.webkitFullscreenEnabled) { return document.webkitFullscreenElement; }
            if (document.msFullscreenEnabled) {     return document.msFullscreenElement;     }
            if (document.mozFullScreenEnabled) {    return document.mozFullScreenElement;    }
        },

        /**
         * @function ? subscribe full screen changes
         * @param {Function(Boolean, DOMElement)}  cb  the callback with receive 2 parameters:
         *   whether in fullscreen or not;
         *   element being changed
         */
        change: function(cb) {
            var that = this;
            var innerCb = function() {
                setTimeout(
                    function() {
                        cb( that.inFullscreen() , that.currentElement() );
                    },
                    0
                );
            };

            document.addEventListener('fullscreenchange',       innerCb);
            document.addEventListener('webkitfullscreenchange', innerCb);
            document.addEventListener('mozfullscreenchange',    innerCb);
            document.addEventListener('MSFullscreenChange',     innerCb);
        },

        /**
         * @function ? toggles fullscreen mode
         * @param {DOMElement} el
         */
        toggle: function(el) {
            if (this.inFullscreen()) {
                this.exit();
            }
            else {
                this.request(el);
            }
        }

    };



    window.FS = FS;

})();
