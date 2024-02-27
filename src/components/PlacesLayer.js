import { 
    createElementObject, 
    createElementHook,
    createPathHook
} from '@react-leaflet/core'
import { useMap } from "react-leaflet";
import { getSymbolLookUp } from '../data/symbols.js';
import { layerGroup, marker, divIcon } from 'leaflet';
import { useEffect,useContext } from 'react';
import { AppContext } from "../App.js";

// TODO on places layer click set appState.focus    // .on("click", clickZoom)


// Place results code

function getIconMarkerLookUp(categories) {
    const iconMarker = getSymbolLookUp(categories)
    return divIcon({
      html: iconMarker,
      className: "marker-icon",
      iconAnchor: [10, 13],
      popupAnchor: [0, -12],
    })
}

const populatePlacesLayer = (placesLayer,places) => {
    // This method populates a Leaflet LayerGroup with place results
    for (const placeResult of places) {
        const icon = getIconMarkerLookUp(placeResult.categories) // Find best icon for each place

        const thisMarker = marker(
        [placeResult.location.y, placeResult.location.x],
        { autoPan: true, icon: icon }
        )

        thisMarker.id = placeResult.placeId // set place id
        placesLayer.addLayer(thisMarker);   
    }
    return placesLayer;
}

const initPlacesLayer = (props,context) => {
    // Create and populate a LayerGroup to display places
    const placesLayer = layerGroup();
    populatePlacesLayer(placesLayer,props.places);
    return createElementObject(placesLayer, context);
}

const updatePlacesLayer = (instance,props,prevProps) => {
    // Repopulate places layer when params change
    if (props.places !== prevProps.places) {
        instance.clearLayers();
        populatePlacesLayer(instance,props.places);
    }

}

const usePlacesLayerElement = createElementHook(initPlacesLayer,updatePlacesLayer);
const usePlacesLayer = createPathHook(usePlacesLayerElement);

const PlacesLayer = (props) => {
    // Hook to create the places layer
    usePlacesLayer(props);

    // using an effect to read/set app state. Can't use a component factory like `createLeafComponent` because of this.
    const {appState, setAppState} = useContext(AppContext);
    const map = useMap();
    useEffect(()=>{
        map.eachLayer((lyr)=>{
            if (lyr.id) {
                lyr.on('click',(e)=>{
                    // TODO find result object in props.places and set focus to *that*
                    const placeFocus = props.places.find(place => place.placeId === lyr.id);
                    setAppState({...appState,focus:placeFocus});
                })
            }
        })
    },[map,appState,setAppState,props.places])
    return null
}

export default PlacesLayer;