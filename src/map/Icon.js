import L from 'leaflet';

L.Icon.Glyph = L.Icon.extend({
  options: {
    iconSize: [20, 26],
    iconAnchor: [10, 26],
    popupAnchor: [1, -34],
    shadowSize: [26, 26],
    // iconUrl: 'glyph-marker-icon.png',
    // iconSize: [35, 45],
    // iconAnchor:   [17, 42],
    // popupAnchor: [1, -32],
    // shadowAnchor: [10, 12],
    // shadowSize: [36, 16],
    className: '',
    prefix: '',
    glyph: 'home',
    glyphColor: 'white',
    glyphSize: '11px',
    // in CSS units
    glyphAnchor: [0, -7], // In pixels, counting from the center of the image.
  },

  createIcon: function () {
    var div = document.createElement('div'),
      options = this.options;

    if (options.glyph) {
      div.appendChild(this._createGlyph());
    }

    this._setIconStyles(div, options.className);
    return div;
  },

  _createGlyph: function () {
    var glyphClass,
      textContent,
      options = this.options;

    if (!options.prefix) {
      glyphClass = '';
      textContent = options.glyph;
    } else if (options.glyph.slice(0, options.prefix.length + 1) === options.prefix + '-') {
      glyphClass = options.glyph;
    } else {
      glyphClass = options.prefix + '-' + options.glyph;
    }

    var span = L.DomUtil.create('span', options.prefix + ' ' + glyphClass);
    span.className = 'c-map-pin-text';

    if (textContent) {
      span.innerHTML = textContent;
    }

    return span;
  },

  _setIconStyles: function (div, name) {
    if (name === 'shadow') {
      return L.Icon.prototype._setIconStyles.call(this, div, name);
    }

    var options = this.options,
      size = L.point(options['iconSize']),
      anchor = L.point(options.iconAnchor);

    if (!anchor && size) {
      anchor = size.divideBy(2, true);
    }

    div.className = 'leaflet-marker-icon leaflet-glyph-icon ' + name;
    var src = this._getIconUrl('icon');
    if (src) {
      div.style.backgroundImage = 'url("' + src + '")';
    }

    if (options.bgPos) {
      div.style.backgroundPosition = -options.bgPos.x + 'px ' + -options.bgPos.y + 'px';
    }
    if (options.bgSize) {
      div.style.backgroundSize = options.bgSize.x + 'px ' + options.bgSize.y + 'px';
    }

    if (anchor) {
      div.style.marginLeft = -anchor.x + 'px';
      div.style.marginTop = -anchor.y + 'px';
    }

    if (size) {
      div.style.width = size.x + 'px';
      div.style.height = size.y + 'px';
    }
  },
});

L.icon.glyph = function (options) {
  return new L.Icon.Glyph(options);
};
