(function() {
    'use strict';


    /* 2013 jose.pedro.dias@gmail.com */



    /**
     * @function {ObjectEl} ? creates a flash object
     * @param  {Object}      o             options
     * @param  {String}      o.swf         flash resource uri
     * @param  {DOMElement}  o.container   where to put the flash object (either parent or replacement, depending of inseadOf option)
     * @param  {String}     [o.id]         id and name for the object element
     * @param  {Number[2]}  [o.dims]       width and height, in pixels
     * @param  {Object}     [o.params]     flash params. supports allowfullscreen, allowscriptaccess, bgcolor, quality, wmode
     * @param  {Object}     [o.flashvars]  flash variables. will be passed via param flashvars transformed as query string
     * @param  {Boolean}    [o.insteadOf]  if trueish, changes behavior from append to container to replace container
     */
    var embedSWF = function(o) {
        // options parsing
        if (!o.swf) {
            throw new Error('swf option is missing!');
        }

        if (!o.container) {
            throw new Error('container option is missing!');
        }

        if (!o.id) {
            o.id = 'rnd' + ~~(Math.random() * 100000);
        }
        var idName = [' id="', o.id, '" name="', o.id, '"'].join('');

        if (!o.dims) {
            o.dims = [1, 1]; // weirdly firefox requires dimensions
        }
        var dims = [' width="', o.dims[0], '" height="', o.dims[1], '"'].join('');

        if (!o.params) {
            o.params = {};
        }

        if (!o.flashvars) {
            flashvars = {};
        }
        var fvTemp = [];
        for (var k in o.flashvars) {
            fvTemp.push( [k, '=', encodeURIComponent(o.flashvars[k])].join('') );
        }
        var flashvars = fvTemp.join('&');


        // create markup string
        var h = [
            false ? '' : (
            //TODO((SAPO.Browser.IE && (parseInt(SAPO.Browser.version, 10) < 11 && !window.WebGLRenderingContext) ) ? // because IE11 when in compat mode 10 works as IE11!!!
             //['<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"', dims, idName, '">\n'].join('') :
             ['<object type="application/x-shockwave-flash" data="', o.swf, '"', dims, idName, '>\n'].join('') ),
                '<param name="movie" value="', o.swf, '">\n',
                (o.params.allowfullscreen   ? '<param name="allowfullscreen"   value="true">\n'                      : ''),
                (o.params.allowscriptaccess ? '<param name="allowscriptaccess" value="' + o.params.allowscriptaccess + '">\n' : ''),
                (o.params.bgcolor           ? '<param name="bgcolor"           value="' + o.params.bgcolor           + '">\n' : ''),
                (o.params.quality           ? '<param name="quality"           value="' + o.params.quality           + '">\n' : ''),
                (o.params.wmode             ? '<param name="wmode"             value="' + o.params.wmode             + '">\n' : ''),
                '<param name="flashvars" value="', flashvars, '">\n',
            '</object>'
        ];

        h = h.join('');
        //o.container.insertAdjacentHTML(o.insteadOf ? 'beforebegin' : 'beforeend', h); TODO
        o.container.innerHTML += h;

        // fetch created object element
        //var el = document.getElementById(o.id);
        var el = o.container.lastChild;

        //console.log(el);

        /*if (o.insteadOf) { TODO
            o.container.parentNode.removeChild( o.container );
            delete o.container;
        }*/

        // returns created object element
        return el;
    };

    var isSWFSupported = function() {
        /*global ActiveXObject:false */
        // http://www.jquery4u.com/snippets/jquery-check-flash-enabled/
        // https://code.google.com/p/swfobject/source/browse/trunk/swfobject/src/swfobject.js line 48
        var hf = false;
        var flashVersion;
        try { // IE
            var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (fo) { hf = true; }
            try {
                flashVersion = parseInt( new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').split(' ')[1], 10);
            } catch (e) {}
        }
        catch (ex) {
            try {
                var plug = navigator.mimeTypes['application/x-shockwave-flash'];
                if (plug && plug.enabledPlugin) {
                    hf = true;
                }
                try {
                    flashVersion = parseInt( navigator.plugins["Shockwave Flash"].description.split(' ')[2] , 10);
                } catch (e) {}
            }
            catch (ex2) {}
        }

        return hf && (flashVersion >= 10);
    };



    window.SWF = {
        embed:       embedSWF,
        isSupported: isSWFSupported
    };

})();
