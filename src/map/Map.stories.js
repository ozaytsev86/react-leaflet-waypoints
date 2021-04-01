import {Map} from './Map';
import {newStory} from '../../.storybook/utils';
import './MapStories.css';

export default {
  title: 'Components/Map',
  component: Map,
};

export const Custom = newStory({
  Component: Map,
  args: {
    layerUrl: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    waypoints: [
      {
        lat: '41.7576862',
        lng: '1.5082874',
        glyph: {
          icon: 'custom-icon custom-icon-home'
        }
      }, {
        lat: '42.7576862',
        lng: '1.5082874',
        glyph: {
          html: '<span style="background-color: #f15b6c; padding: 4px; color: #fefdef; white-space: nowrap; border-radius: 8px 0; border: 2px solid #605f64">First Stop</span>',
        }
      }, {
        lat: '43.7576862',
        lng: '1',
        glyph: {
          html: '<span style="background-color: #f15b6c; padding: 4px; color: #fefdef; white-space: nowrap; border-radius: 8px 0; border: 2px solid #605f64">Second Stop</span>',
        }
      }, {
        lat: '44.7576862',
        lng: '1',
        glyph: {
          icon: 'custom-icon custom-icon-marker'
        }
      }
    ],
    lineOptions: {
      styles: [
        {color: '#605f64', opacity: 0.15, weight: 7},
        {color: '#fff', opacity: 0.8, weight: 5},
        {color: '#605f64', opacity: 1, weight: 2},
      ]
    },
    summaryTemplate: `
      <div>
        <p style="margin: 0">
          <span style="font-weight: bold">Distance: </span>
          <span>{distance}</span>
        </p>
        <p style="margin: 0">
          <span style="font-weight: bold">Time: </span>
          <span>{time}</span>
        </p>
      </div>
    `,
  }
});
export const Minimal = () => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <Map
    layerUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    waypoints={[{lat: '40.4381311', lng: '-3.8196196'}, {lat: '42.7576862', lng: '1.5082874'}]}
  />
);
export const WithoutFitRoutes = () => (
  <Map
    fitRoutes={false}
    layerUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    waypoints={[{lat: '40.4381311', lng: '-3.8196196', glyph: {icon: 'custom-icon custom-icon-home'}}, {lat: '42.7576862', lng: '1.5082874', glyph: {icon: 'custom-icon custom-icon-marker'}}]}
  />
);
export const WithIcon = () => (
  <Map
    layerUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    waypoints={[{lat: '40.4381311', lng: '-3.8196196', glyph: {icon: 'custom-icon custom-icon-home'}}, {lat: '42.7576862', lng: '1.5082874', glyph: {icon: 'custom-icon custom-icon-marker'}}]}
  />
);
export const WithText = () => (
  <Map
    layerUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    waypoints={[{lat: '40.4381311', lng: '-3.8196196', glyph: {text: 'Me'}}, {lat: '42.7576862', lng: '1.5082874', glyph: {text: 'Bob'}}]}
  />
);
export const WithHtml = () => (
  <Map
    layerUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    waypoints={[
      {lat: '40.4381311', lng: '-3.8196196', glyph: {html: '<span style="background-color: deeppink; padding: 5px; color: white;">Me</span>'}},
      {lat: '42.7576862', lng: '1.5082874', glyph: {html: '<span style="background-color: darkorange; padding: 5px; color: white;">Bob</span>'}}
    ]}
  />
);
export const WithLineOptions = () => (
  <Map
    layerUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    waypoints={[
      {lat: '40.4381311', lng: '-3.8196196', glyph: {html: '<span style="background-color: deeppink; padding: 5px; color: white;">Me</span>'}},
      {lat: '42.7576862', lng: '1.5082874', glyph: {html: '<span style="background-color: darkorange; padding: 5px; color: white;">Bob</span>'}}
    ]}
    lineOptions={{
      styles: [
        {color: 'deeppink', opacity: 1, weight: 2},
      ],
    }}
  />
);
export const WithClassName = () => (
  <Map
    className="custom-map"
    layerUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    waypoints={[{lat: '40.4381311', lng: '-3.8196196'}, {lat: '42.7576862', lng: '1.5082874'}]}
  />
);
export const WithCustomPinClass = () => (
  <Map
    layerUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    waypoints={[{lat: '40.4381311', lng: '-3.8196196', glyph: {text: 'Me', className: 'custom-pin'}}, {lat: '42.7576862', lng: '1.5082874', glyph: {text: 'Bob', className: 'custom-pin'}}]}
  />
);
const summaryTemplate = `
  <div>
    <h3 style="margin: 0; color: #f15b6c">My Trip</h3>
    <p style="margin: 0">
      <span style="font-weight: bold">Distance: </span>
      <span>{distance}</span>
    </p>
    <p style="margin: 0">
      <span style="font-weight: bold">Time: </span>
      <span>{time}</span>
    </p>
  </div>
`;
export const WithSummaryTemplate = () => (
  <Map
    layerUrl="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    waypoints={[{lat: '40.4381311', lng: '-3.8196196', glyph: {text: 'Me', className: 'custom-pin'}}, {lat: '42.7576862', lng: '1.5082874', glyph: {text: 'Bob', className: 'custom-pin'}}]}
    summaryTemplate={summaryTemplate}
  />
);

export const DefaultLoading = () => <Map loading waypoints={[{lat: '40.4381311', lng: '-3.8196196'}]}/>;
export const WithLoadingText = () => (
  <Map
    loading
    waypoints={[{lat: '40.4381311', lng: '-3.8196196'}]}
    loadingComponent="The map is loading..."
  />
);
export const WithLoadingComponent = () => (
  <Map
    loading
    waypoints={[{lat: '40.4381311', lng: '-3.8196196'}]}
    loadingComponent={<div className="custom-loader" />}
  />
);
export const DefaultNoData = () => <Map waypoints={null} />;
export const WithNoDataText = () => <Map waypoints={null} noDataComponent="No waypoints received"/>;
export const WithNoDataComponent = () => (
  <Map
    waypoints={null}
    noDataComponent={<p className="custom-no-data">Oops! No waypoints received</p>}
  />
);
