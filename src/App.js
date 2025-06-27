import './App.css';
import 'leaflet/dist/leaflet.css';
import "@esri/calcite-components/dist/calcite/calcite.css";

import PlacesLayer from './components/PlacesLayer.js';
import VectorBasemapLayer from './components/VectorBasemapLayer.js';
import SearchControl from './components/SearchControl';
import PlaceDetails from './components/PlaceDetails';
import PlacesResults from './components/PlacesResults.js';
import GeocodeSuggestions from './components/NavGeocodeSuggest.js';

import { createContext, useState } from 'react';
import { MapContainer, ZoomControl, LayersControl } from 'react-leaflet';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { CalciteFlow } from '@esri/calcite-components-react';
import "@esri/calcite-components/dist/components/calcite-flow";
import NavigationControl from './components/NavigationControl.js';
import RouteLayer from './components/RouteLayer.js';
import PlaceMarker from './components/PlaceMarker.js';
import GeocodeMarker from './components/GeocodeMarker.js';
import ReverseGeocode from './components/ReverseGeocode.js';


export const apiKey = process.env.REACT_APP_ARCGIS_API_KEY;
export const authentication = ApiKeyManager.fromKey(apiKey);

// Global app state used to track open menus and pass data between components
export const AppContext = createContext({
  appState: {},
  setAppState: () => {}
})

function App() {

  const [appState,setAppState] = useState({
    state:'default'
  })
  const appContext = {appState,setAppState}

  // Control basemap places in the VectorBasemapLayer
  const [places, setPlaces] = useState('attributed');
  if (appState.state === 'default' && places === 'none') setPlaces('attributed');
  else if (appState.state !== 'default' && places === 'attributed') setPlaces('none');

  return (
    <AppContext.Provider value={appContext}>
      <div className="app-container">

        {/* This calcite-flow serves as the sidebar containing place results and navigation controls */}
        <CalciteFlow id="flowPanel">
            {appState.state === 'placeResults' && (
            <PlacesResults />
            )}
            {appState.focus && (
            <PlaceDetails id={appState.focus.placeId} />
            )}
            {/* Navigation component */}
            {appState.destination && (
              <NavigationControl start={appState.geocodeResult} destination={appState.destination} />
            )}
        </CalciteFlow>

        {/* Geocode autosuggest popup, used in navigation */}
        {appState.searchQuery && (
          <GeocodeSuggestions query={appState.searchQuery} mapCenter={appState.mapCenter}/>
        )}

        {/* Leaflet map */}
        <MapContainer center={[51.4974, -0.1356]} zoom={15} zoomControl={false}>
              {/* Extent and basemap controls */}
              <ZoomControl position='bottomright' />
              <LayersControl position="bottomright">
                  <LayersControl.BaseLayer checked name="Default">
                      <VectorBasemapLayer styleName='arcgis/navigation' places={places}/> {/* Places is only supported by arcgis/navigation */}
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Satellite">
                      <VectorBasemapLayer styleName='arcgis/imagery'/>
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Terrain">
                      <VectorBasemapLayer styleName='arcgis/terrain'/>
                  </LayersControl.BaseLayer>
              </LayersControl>

              {/* Place finding controls at top of map */}
              <SearchControl />

              {/* Geocoding functionality */}
              {appState.navigationOpen && (
                <ReverseGeocode />
              )}
              {appState.geocodeResult && (
                <GeocodeMarker geocode={appState.geocodeResult}/>
              )}
              
              {/* Places map layers */}
              {appState.placeResults && !appState.destination && (
                <PlacesLayer places={appState.placeResults} focus={appState.focus}/>
              )}
              {appState.focus && (
                <PlaceMarker focus={appState.focus}/>
              )}

              {/* Route map layer */}
              {appState.route && (
                <RouteLayer route={appState.route.routes.geoJson}/>
              )}

          </MapContainer>
      </div>
    </AppContext.Provider>
  );
}

export default App;