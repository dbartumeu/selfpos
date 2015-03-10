(function () {

    // Define our constructor
    this.selfPos = function () {

        // Define option defaults
        var defaults = {
            selfposSelector: '.selfpos',
            selfposRelativeTo: 'parent' //Mixed support parent | document | window | selector
        }

        this.options = defaults;

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        var self = this;

        window.onresize = function (event) {
            self.init();
        }
    }

    // Public Methods

    selfPos.prototype.init = function () {
        var nodes = document.querySelectorAll(this.options.selfposSelector);

        for (var i = 0, node; node = nodes[i]; i++) {
            // Element parent
            this.element = node;

            this.parent = getRelativity(this, this.options.selfposRelativeTo);

            // Default position variables
            this.selfposHoffset =
                node.getAttribute('data-h-offset') ? node.getAttribute('data-h-offset') : 'auto';
            this.selfposVoffset =
                node.getAttribute('data-v-offset') ? node.getAttribute('data-v-offset') : 'auto';
            this.selfposWidth = node.getAttribute('data-width') ? node.getAttribute('data-width') : 'auto';
            this.selfposHeight = node.getAttribute('data-height') ? node.getAttribute('data-height') : '100%';

            //Suported left | center | right
            this.selfposAlign =
                node.getAttribute('data-align') ? node.getAttribute('data-align') : 'left';

            //Suported top | middle | bottom
            this.selfposValign =
                node.getAttribute('data-valign') ? node.getAttribute('data-valign') : 'top';

            //Reset element style
            resetStyle(this.element);

            placeElement(this);
        }
    }

    // Private Methods

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function getRelativity(self, str) {
        var el;
        switch (str) {
            case 'parent':
                el = self.element.parentNode;
                break;
            case 'document':
                el = document;
                break;
            case 'window':
                el = window;
                break;
            default :
                el = document.querySelector(str).parentNode;
                break;
        }

        return el;
    }

    function getStyle(el, styleProp) {
        var x = el;
        if (x.currentStyle)
            var y = x.currentStyle[styleProp];
        else if (window.getComputedStyle)
            var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
        return y;
    }

    function resetStyle(elem) {
        elem.style.border = 'none';
        elem.style.margin = 0;
        elem.style.padding = 0;
        elem.style.position = 'absolute';
    }

    function placeElement(self) {
        var rect = {}, parent = {};

        if (self.options.selfposRelativeTo !== 'window' && self.options.selfposRelativeTo !== 'document') {
            rect = self.parent.getBoundingClientRect();
            console.log(getStyle(self.parent, 'position'))
            parent = {
                left: getStyle(self.parent, 'position') !== 'static' ? 0 : rect.left,
                top: getStyle(self.parent, 'position') !== 'static' ? 0 : rect.top,
                width: self.parent.clientWidth,
                height: self.parent.clientHeight
            };
        } else {
            parent = {
                left: 0,
                top: 0,
                width: self.parent.innerWidth,
                height: self.parent.innerHeight
            };
        }


        var elem = self.element;

        elem.style.width = self.selfposWidth;
        elem.style.height = self.selfposHeight;

        switch (self.selfposAlign) {
            case 'left':
                var elLeft = self.selfposHoffset === 'auto' ?
                    parent.left :
                    self.selfposHoffset / 100 * parent.width + parent.left;
                elem.style.left = elLeft + 'px';
                break;
            case 'center':
                var elLeft =
                        self.selfposHoffset === 'auto' ?
                    parent.width / 2 - elem.offsetWidth / 2 + parent.left :
                    self.selfposHoffset / 100 * parent.width - elem.offsetWidth / 2 + parent.left;
                elem.style.left = elLeft + 'px';
                break;
            case 'right':
                var elLeft =
                        self.selfposHoffset === 'auto' ?
                    parent.width - elem.offsetWidth + parent.left :
                    parent.width - self.selfposHoffset / 100 * parent.width - elem.offsetWidth + parent.left;
                document.querySelector(self.options.selfposSelector).style.left = elLeft + 'px';
                break;
        }

        switch (self.selfposValign) {
            case 'top':
                var elTop = self.selfposVoffset === 'auto' ?
                    parent.top :
                    self.selfposVoffset / 100 * parent.height + parent.top;
                elem.style.top = elTop + 'px';
                break;
            case 'middle':
                var elTop = self.selfposVoffset === 'auto' ?
                    parent.height / 2 - elem.offsetHeight / 2 + parent.top :
                    self.selfposVoffset / 100 * parent.height - elem.offsetHeight / 2 + parent.top;
                elem.style.top = elTop + 'px';
                break;
            case 'bottom':
                var elTop = self.selfposVoffset === 'auto' ?
                    parent.height - elem.offsetHeight + parent.top :
                    parent.height - self.selfposVoffset / 100 * parent.height - elem.offsetHeight + parent.top;
                elem.style.top = elTop + 'px';
                break;
        }
    }

}());
