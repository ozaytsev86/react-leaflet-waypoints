import './Leaflet.css';
import './Map.css';

import PropTypes from 'prop-types';
import {MapContainer, TileLayer} from 'react-leaflet';

import {Waypoints} from './Waypoints';

const propTypes = {
  /** Id for test purposes*/
  testId: PropTypes.string,
  /** Custom map wrapper classes */
  className: PropTypes.string,
  /** Show loading status of the map */
  loading: PropTypes.bool,
  /** Text or component shown when the map is loading */
  loadingComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Text or component shown when no data was provided */
  noDataComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Map OSRM layer url */
  layerUrl: PropTypes.string,
  /** Coordinates to show points on the map */
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
};

const defaultProps = {
  testId: 'component',
  layerUrl: '',
  className: '',
  loading: false,
  loadingComponent: 'Loading...',
  noDataComponent: 'No data',
  fitRoutes: true,
  summaryTemplate: '',
};

const Map = ({
              testId,
              loading,
              loadingComponent,
              className,
              waypoints,
              noDataComponent,
              layerUrl,
              summaryTemplate,
              ...rest
            }) => {
  if(loading) {
    return (
      typeof loadingComponent === 'string'
        ? <p data-testid={`${testId}-loading`} className="c-map-feedback-wrapper">{loadingComponent}</p>
        : loadingComponent
    );
  }

  return (
    <div className={`c-map ${summaryTemplate === '' ? 'c-map-summary--hidden' : ''} ${className}`} data-testid={`${testId}-map`}>
      {waypoints ? (
        <MapContainer
          style={{height: '100%', width: '100%'}}
          zoom={6}
          center={[waypoints[0].lat, waypoints[0].lng]}
        >
          <TileLayer url={layerUrl} />
          <Waypoints testId={testId} waypoints={waypoints} summaryTemplate={summaryTemplate} {...rest}/>
        </MapContainer>
      ) : (
        typeof noDataComponent === 'string'
          ? <p data-testid={`${testId}-no-data`} className="c-map-feedback-wrapper">{noDataComponent}</p>
          : noDataComponent
      )}
    </div>
  );
};

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export {Map};