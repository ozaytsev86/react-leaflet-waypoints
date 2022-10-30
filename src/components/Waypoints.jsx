import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import {useLeafletContext} from '@react-leaflet/core';
import 'leaflet-routing-machine';

const propTypes = {
  /** Id for test purposes*/
  testId: PropTypes.string,
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
  }),
  onSummaryCalculated: PropTypes.func,
};

const defaultProps = {
  testId: 'component',
  fitRoutes: true,
  summaryTemplate: '',
  waypoints: null,
  lineOptions: {
    styles: [
      {color: '#65803c', opacity: 0.15, weight: 7},
      {color: '#fff', opacity: 0.8, weight: 5},
      {color: '#8ebf42', opacity: 1, weight: 2},
    ],
  },
  onSummaryCalculated: null,
};

export const Waypoints = React.memo(({
  testId,
  waypoints,
  summaryTemplate,
  lineOptions,
  fitRoutes,
  onSummaryCalculated,
}) => {
  const context = useLeafletContext();

  L.Icon.Glyph = L.Icon.extend({
    createIcon: function () {
      const wrapper = L.DomUtil.create('div', `rlw-pin ${this.options.glyph?.className || ''}`);
      wrapper.setAttribute('data-testid', `${testId}-waypoint-${this.options.index}`);

      if (this.options.glyph) {
        const glyph = this.options.glyph;

        if (glyph.icon) {
          L.DomUtil.create('span', `rlw-pin-glyph ${glyph.icon}`, wrapper);
        } else if (glyph.text) {
          const content = L.DomUtil.create('span', 'rlw-pin-glyph rlw-pin-text', wrapper);
          content.setAttribute('data-testid', `${testId}-waypoint-${this.options.index}-text`);

          content.innerText = glyph.text;
          wrapper.appendChild(content);
        } else if (glyph.html) {
          const htmlWrapper = L.DomUtil.create('div', 'rlw-pin-html');
          htmlWrapper.setAttribute('data-testid', `${testId}-waypoint-${this.options.index}-html`);

          const content = new DOMParser().parseFromString(glyph.html, 'text/html').body.firstChild;
          htmlWrapper.appendChild(content);
          wrapper.appendChild(htmlWrapper);
        } else {
          L.DomUtil.create('span', 'rlw-pin-empty', wrapper);
        }
      }

      return wrapper;
    }
  });

  L.icon.glyph = function (options) {
    return new L.Icon.Glyph(options);
  };

  const control = React.useRef(L.Routing.control({
    showAlternatives: false,
    summaryTemplate,
    show: false,
    fitSelectedRoutes: fitRoutes,
    lineOptions,
    addWaypoints: false,
    plan: L.Routing.plan(waypoints, {
      createMarker: function (i, wp) {
        return L.marker(wp.latLng, {
          icon: L.icon.glyph({glyph: waypoints[i].glyph, index: i})
        });
      },
    }),
  }));

  React.useEffect(() => {
    const container = context.layerContainer || context.map;

    if(onSummaryCalculated) {
      control.current.on('routesfound', (e) => {
        const {routes} = e;
        const {summary} = routes[0];
        onSummaryCalculated(summary);
      });
    }

    container.addControl(control.current);

    return () => {
      container.removeControl(control.current);
    };
  }, []);

  return null;
});

Waypoints.propTypes = propTypes;
Waypoints.defaultProps = defaultProps;
