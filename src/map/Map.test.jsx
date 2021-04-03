import {render} from '../../tests/testing-library.helpers.js';
import {Map} from './Map';
import {screen} from '@testing-library/react';

describe('Map', () => {
  const MockedComponent = () => <div data-testid="mocked-component">MockedComponent</div>;
  const renderMapComponent = (customProps) => render(<Map testId="test" {...customProps} />);

  describe('should show no data', () => {
    it('default text', () => {
      renderMapComponent();
      expect(screen.getByTestId('test-no-data')).toHaveTextContent('No data');
    });
    it('custom text', () => {
      renderMapComponent({noDataComponent: 'MockedText'});
      expect(screen.getByTestId('test-no-data')).toHaveTextContent('MockedText');
    });
    it('custom component', () => {
      renderMapComponent({noDataComponent: <MockedComponent />});
      expect(screen.getByTestId('mocked-component')).toBeInTheDocument();
    });
  });

  describe('should show loading', () => {
    it('default text', () => {
      renderMapComponent({loading: true});
      expect(screen.getByTestId('test-loading')).toHaveTextContent('Loading...');
    });
    it('custom text', () => {
      renderMapComponent({loading: true, loadingComponent: 'MockedLoading'});
      expect(screen.getByTestId('test-loading')).toHaveTextContent('MockedLoading');
    });
    it('custom component', () => {
      renderMapComponent({loading: true, loadingComponent: <MockedComponent />});
      expect(screen.getByTestId('mocked-component')).toBeInTheDocument();
    });
  });

  it('should add custom className', () => {
    renderMapComponent({className: 'mocked-class'});
    expect(screen.getByTestId('test-map')).toHaveClass('mocked-class');
  });

  it('should load layer when receive layerUrl', () => {});

  describe('should load', () => {
    it('1 waypoint', async () => {
      // renderMapComponent({waypoints: [{lat: 1, lng: 1}]});
      // await waitFor(() => expect(screen.getByTestId('test-waypoint-1')).toBeInTheDocument());
    });
    it('2 waypoints', async () => {
      // renderMapComponent({waypoints: [{lat: 1, lng: 1}, {lat: 1.1, lng: 1.1}]});
      // expect(await screen.findByTestId('test-waypoint-1')).toBeInTheDocument();
      // expect(await screen.findByTestId('test-waypoint-2')).toBeInTheDocument();
    });
    it('3 waypoints', () => {});
    it('waypoint with icon', () => {});
    it('waypoint with text', () => {});
    it('waypoint with html', () => {});
  });

  it('should show summaryTemplate', () => {});
  it('should fit to routes', () => {});
  it('should change line styles', () => {});
});