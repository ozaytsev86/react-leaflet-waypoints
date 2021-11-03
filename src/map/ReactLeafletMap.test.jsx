import {ReactLeafletMap} from './ReactLeafletMap';
import {screen, waitFor, render, within} from '@testing-library/react';


describe('Map', () => {
  const MockedComponent = () => <div data-testid="mocked-component">MockedComponent</div>;
  const renderMapComponent = (customProps) => render(<ReactLeafletMap testId="test" {...customProps} />);

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

  xit('should load layer when receive layerUrl', () => {});

  describe('should load', () => {
    it('1 waypoint', async () => {
      renderMapComponent({waypoints: [{lat: 1, lng: 1}]});
      expect(await screen.findByTestId('test-waypoint-0')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-0')).toHaveClass('c-map-pin');
    });
    it('2 waypoints', async () => {
      renderMapComponent({waypoints: [{lat: 1, lng: 1}, {lat: 1.1, lng: 1.1}]});
      expect(await screen.findByTestId('test-waypoint-0')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-1')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-0')).toHaveClass('c-map-pin');
      expect(screen.getByTestId('test-waypoint-1')).toHaveClass('c-map-pin');
    });
    it('3 waypoints', async () => {
      renderMapComponent({waypoints: [{lat: 1, lng: 1}, {lat: 1.1, lng: 1.1}, {lat: 1.2, lng: 1.2}]});
      expect(await screen.findByTestId('test-waypoint-0')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-1')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-2')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-0')).toHaveClass('c-map-pin');
      expect(screen.getByTestId('test-waypoint-1')).toHaveClass('c-map-pin');
      expect(screen.getByTestId('test-waypoint-2')).toHaveClass('c-map-pin');
    });

    it('waypoint with icon', async () => {
      renderMapComponent({waypoints: [{lat: 1, lng: 1, glyph: {icon: 'custom-icon custom-icon-home'}}]});

      const waypoint = await screen.findByTestId('test-waypoint-0');

      expect(waypoint.innerHTML).toContain('custom-icon');
      expect(waypoint.innerHTML).toContain('custom-icon-home');
    });
    it('waypoint with text', async () => {
      renderMapComponent({waypoints: [{lat: 1, lng: 1, glyph: {text: 'mockText'}}]});

      expect(await screen.findByTestId('test-waypoint-0-text')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-0-text')).toHaveClass('c-map-pin-text');
      // TODO: check why it is rendered without text in the test
    });
    it('waypoint with html', async () => {
      renderMapComponent({waypoints: [{lat: 1, lng: 1, glyph: {html: '<span>mockHtml</span>'}}]});

      const waypoint = await screen.findByTestId('test-waypoint-0-html');

      expect(waypoint.innerHTML).toContain('<span>mockHtml</span>');
      expect(waypoint).toHaveClass('c-map-pin-html');
    });
  });

  xit('should show summaryTemplate', async () => {});
  xit('should fit to routes', () => {});
  xit('should change line styles', () => {});
});