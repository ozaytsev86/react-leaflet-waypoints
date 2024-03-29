import {ReactLeafletWaypoints} from './Map';
import {screen, render, waitFor} from '@testing-library/react';
import sinon from 'sinon';

describe('ReactLeafletWaypoints', () => {
  const MockedComponent = () => <div data-testid="mocked-component">MockedComponent</div>;
  const renderMapComponent = (customProps) => render(<ReactLeafletWaypoints testId="test" {...customProps} />);

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
      expect(screen.getByTestId('test-waypoint-0')).toHaveClass('rlw-pin');
    });
    it('2 waypoints', async () => {
      renderMapComponent({waypoints: [{lat: 1, lng: 1}, {lat: 1.1, lng: 1.1}]});
      expect(await screen.findByTestId('test-waypoint-0')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-1')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-0')).toHaveClass('rlw-pin');
      expect(screen.getByTestId('test-waypoint-1')).toHaveClass('rlw-pin');
    });
    it('3 waypoints', async () => {
      renderMapComponent({waypoints: [{lat: 1, lng: 1}, {lat: 1.1, lng: 1.1}, {lat: 1.2, lng: 1.2}]});
      expect(await screen.findByTestId('test-waypoint-0')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-1')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-2')).toBeInTheDocument();
      expect(screen.getByTestId('test-waypoint-0')).toHaveClass('rlw-pin');
      expect(screen.getByTestId('test-waypoint-1')).toHaveClass('rlw-pin');
      expect(screen.getByTestId('test-waypoint-2')).toHaveClass('rlw-pin');
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
      expect(screen.getByTestId('test-waypoint-0-text')).toHaveClass('rlw-pin-text');
      // TODO: check why it is rendered without text in the test
    });
    it('waypoint with html', async () => {
      renderMapComponent({waypoints: [{lat: 1, lng: 1, glyph: {html: '<span>mockHtml</span>'}}]});

      const waypoint = await screen.findByTestId('test-waypoint-0-html');

      expect(waypoint.innerHTML).toContain('<span>mockHtml</span>');
      expect(waypoint).toHaveClass('rlw-pin-html');
    });
  });

  xit('should call onSummaryCalculated with {totalDistance: 0, totalTime: 0}', async () => {
    const onSummaryCalculatedMock = sinon.spy();
    renderMapComponent({waypoints: [{lat: 1, lng: 1}, {lat: 1.1, lng: 1.1}], onSummaryCalculated: onSummaryCalculatedMock});

    expect(await screen.findByTestId('test-waypoint-0')).toBeInTheDocument();

    await waitFor(() => sinon.assert.calledOnce(onSummaryCalculatedMock, {totalDistance: 0, totalTime: 0}));
  })

  xit('should show summaryTemplate', async () => {});
  xit('should fit to routes', () => {});
  xit('should change line styles', () => {});
});