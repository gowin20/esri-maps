import { 
    createElementObject, 
    createElementHook,
    createPathHook
} from '@react-leaflet/core'
import { useMap } from "react-leaflet";
import { layerGroup, marker, divIcon } from 'leaflet';
import { useEffect,useContext } from 'react';
import { AppContext } from "../App.js";

// PlacesLayer: Renders a list of place results on the map

const createPlaceMarker = (placeResult) => {
    const icon = divIcon({
        html: `<img src="${placeResult.icon.url}" width="21px" height="21px">`,
        className: "marker-icon",
        iconAnchor: [10, 13],
        popupAnchor: [0, -12],
      })
    const thisMarker = marker(
        [placeResult.location.y, placeResult.location.x],
        { autoPan: true, icon: icon }
    )
    thisMarker.placeId = placeResult.placeId;
    return thisMarker;
}

// This method populates a Leaflet LayerGroup with place results
const populatePlacesLayer = (placesLayer,places) => {
    for (const placeResult of places) {
        const thisMarker = createPlaceMarker(placeResult);
        placesLayer.addLayer(thisMarker);   
    }
    return placesLayer;
}

// This method runs when the component is initialized
const initPlacesLayer = (props,context) => {
    // Create and populate a LayerGroup to display places
    const placesLayer = layerGroup();
    populatePlacesLayer(placesLayer,props.places);
    return createElementObject(placesLayer, context);
}

// This method runs whenever the component props change
const updatePlacesLayer = (instance,props,prevProps) => {
    // Repopulate places layer when params change
    if (props.places !== prevProps.places) {
        instance.clearLayers();
        populatePlacesLayer(instance,props.places);
    }
    // Hide the category icon for the currently focused place
    if (props.focus !== prevProps.focus) {
        populatePlacesLayer(instance,props.places);

        if (props.focus) {
            instance.eachLayer((lyr)=>{
                if (lyr.placeId === props.focus.placeId) {
                    instance.removeLayer(lyr);
                }
            })
        }
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
            if (lyr.placeId) {
                lyr.on('click',(e)=>{
                    // TODO find result object in props.places and set focus to *that*
                    console.log('click!')
                    const placeFocus = props.places.find(place => place.placeId === lyr.placeId);
                    setAppState({...appState,focus:placeFocus});
                })
            }
        })
    },[map,appState,setAppState,props.places])
    return null
}

export default PlacesLayer;