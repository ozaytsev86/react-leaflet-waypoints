# react-leaflet-waypoints
React component to show waypoints on Leaflet's map.

![Screenshot](https://github.com/ozaytsev86/react-leaflet-waypoints/blob/main/rlw-screenshot.png?raw=true)

# Installation
Install `react-leaflet-waypoints` with [npm](https://www.npmjs.com/):

`npm install react-leaflet-waypoints`  
or  
`yarn add react-leaflet-waypoints`

# Usage

```javascript
import {ReactLeafletMap} from 'react-leaflet-waypoints';

export const MyComponent = () => {
  return (
    <ReactLeafletMap
      layerUrl="https://layer-url/image.png"
      waypoints={[{lat: '40.4381311', lng: '-3.8196196'}, {lat: '42.7576862', lng: '1.5082874'}]}
    />
  );
}
```


# Demo
At the moment there is no live demo, but you can easily check the Storybook in your local.

Clone the repository and move into:
```
git clone git@github.com:ozaytsev86/react-leaflet-waypoints.git
cd react-leaflet-waypoints
```

Install dependencies:
```
yarn / npm install
```

Run Storybook
```
yarn sb / npm run sb
```

# Roadmap
WIP

# Issues
If you found an issue, or you have a suggestion please create a ticket [here](https://github.com/ozaytsev86/react-leaflet-waypoints/issues)

# Contributions
Create or take an already created issue  
Clone the repository  
Create a branch with the issue name  
Once you finish create a pull request  

# License
[MIT](https://opensource.org/licenses/MIT)