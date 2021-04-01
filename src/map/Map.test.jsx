import {render} from '@testing-library/react';

import {Map} from './Map';

describe('Map', () => {
  describe('should show no data', () => {
    it('default text', () => {
      const {getByText} = render(<Map waypoints={null} />);


      expect(getByText('No data')).toBeInTheDocument();
    });
    it('custom text', () => {});
    it('custom component', () => {});
  });

  describe('should show loading', () => {
    it('default text', () => {});
    it('custom text', () => {});
    it('custom component', () => {});
  });

  it('should add custom className', () => {});

  it('should load layer when receive layerUrl', () => {});

  describe('should load', () => {
    it('1 waypoint', () => {});
    it('2 waypoints', () => {});
    it('3 waypoints', () => {});
    it('waypoint with icon', () => {});
    it('waypoint with text', () => {});
    it('waypoint with html', () => {});
  });

  it('should show summaryTemplate', () => {});
  it('should fit to routes', () => {});
  it('should change line styles', () => {});
});