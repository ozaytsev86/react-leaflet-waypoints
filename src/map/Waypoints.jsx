import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import {useLeafletContext} from '@react-leaflet/core';
import 'leaflet-routing-machine';

L.Icon.Glyph = L.Icon.extend({
  createIcon: function () {
    const wrapper = L.DomUtil.create('div', `c-map-pin ${this.options.glyph?.className}`);

    if (this.options.glyph) {
      const glyph = this.options.glyph;

      if (glyph.icon) {
        L.DomUtil.create('span', `c-map-pin-glyph ${glyph.icon}`, wrapper);
      } else if (glyph.text) {
        const content = L.DomUtil.create('span', 'c-map-pin-glyph c-map-pin-text', wrapper);
        content.innerText = glyph.text;
        wrapper.appendChild(content);
      } else if (glyph.html) {
        const htmlWrapper = L.DomUtil.create('div', 'c-map-pin-html');
        const content = new DOMParser().parseFromString(glyph.html, 'text/html').body.firstChild;
        htmlWrapper.appendChild(content);
        wrapper.appendChild(htmlWrapper);
      } else {
        L.DomUtil.create('span', 'c-map-pin-empty', wrapper);
      }
    }

    return wrapper;
  }
});

L.icon.glyph = function (options) {
  return new L.Icon.Glyph(options);
};

const propTypes = {
  /** Coordinates to show markers on the map */
  waypoints: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      glyph: PropTypes.shape({
        icon: PropTypes.string,
        text: PropTypes.string,
        html: PropTypes.string,
      })
    })
  ),
  /**
   How the map’s view is fitted to a selected route result: `smart` will fit only if no waypoint is within the current view, or if the result covers a very small part of the view; other `true` value will always fit the map, `false` will never fit the map
   */
  fitRoutes: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   String template to use for summarizing a route; the template is passed properties name, distance and time, where the latter two has already been processed through distanceTemplate and timeTemplate respectively
   */
  summaryTemplate: PropTypes.string,
  /** Styles used for the line or lines drawn on the map */
  lineOptions: PropTypes.shape({
    styles: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      opacity: PropTypes.number,
      weight: PropTypes.number,
    }))
  })
};

const defaultProps = {
  fitRoutes: true,
  summaryTemplate: '',
  lineOptions: {
    styles: [
      {color: '#65803c', opacity: 0.15, weight: 7},
      {color: '#fff', opacity: 0.8, weight: 5},
      {color: '#8ebf42', opacity: 1, weight: 2},
    ],
  },
};

export const Waypoints = ({
                            waypoints,
                            summaryTemplate,
                            lineOptions,
                            fitRoutes,
}) => {
  const context = useLeafletContext();

  const control = L.Routing.control({
    showAlternatives: false,
    summaryTemplate,
    show: false,
    fitSelectedRoutes: fitRoutes,
    lineOptions,
    addWaypoints: false,
    plan: L.Routing.plan(waypoints, {
      createMarker: function (i, wp) {
        return L.marker(wp.latLng, {
          icon: L.icon.glyph({glyph: waypoints[i].glyph})
        });
      },
    }),
  });

  React.useEffect(() => {
    const container = context.layerContainer || context.map;

    container.addControl(control);

    return () => {
      container.removeControl(control);
    };
  });

  return null;
};

Waypoints.propTypes = propTypes;
Waypoints.defaultProps = defaultProps;
