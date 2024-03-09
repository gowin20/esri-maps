import './App.css';
import 'leaflet/dist/leaflet.css';
import "@esri/calcite-components/dist/calcite/calcite.css";

import PlacesLayer from './components/PlacesLayer.js';
import VectorBasemapLayer from './components/VectorBasemapLayer.js';
import SearchControl from './components/SearchControl';
import PlaceDetails from './components/PlaceDetails';
import PlaceResults from './components/PlacesList';
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

export const apiKey = "AAPKc32a7748a314440a989ecb66b656f4cbJ12w-EP1NK3E3rjhrCSZnKO9pVDwNM9sxL65XsPW84t9gGtr_Ipdhtcek8nPJPWe";
export const authentication = ApiKeyManager.fromKey(apiKey);


// state: | placeResults | geocodeResults | routeResults
export const AppContext = createContext({
  appState: {},
  setAppState: () => {}
})

function App() {
  const [appState,setAppState] = useState({
    state:'default'
  })
  const appContext = {appState,setAppState}

  // basemap places control
  const [places, setPlaces] = useState('attributed');
  if (appState.state === 'default' && places === 'none') setPlaces('attributed');
  else if (appState.state !== 'default' && places === 'attributed') setPlaces('none');

  return (
    <AppContext.Provider value={appContext}>
      <div className="app-container">
        <MapContainer center={[33.8219, -116.5468]} zoom={16} zoomControl={false}>
              {/* Map and basemap controls */}
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

              {/* Places controls */}
              <SearchControl />

              {/* Places results and routing control */}
              <CalciteFlow id="flowPanel">
                  {appState.state === 'placeResults' && (
                  <PlaceResults />
                  )}
                  {appState.focus && (
                  <PlaceDetails id={appState.focus.placeId} />
                  )}
                  {/* Navigation component */}
                  {appState.destination && (
                    <NavigationControl start={appState.geocodeResult} destination={appState.destination} />
                  )}
              </CalciteFlow>

              {/* Geocoding control and layer 
              TODO add reverse geocode functionality on map click when 
              */}
              {appState.searchQuery && (
                <GeocodeSuggestions query={appState.searchQuery}/>
              )}
              {appState.geocodeResult && (
                <GeocodeMarker geocode={appState.geocodeResult}/>
              )}
              
              {/* Places map layers */}
              {appState.placeResults && !appState.destination && (
                <PlacesLayer places={appState.placeResults}/>
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