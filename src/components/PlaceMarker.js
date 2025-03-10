import {
    createElementHook, createPathHook, createElementObject
} from '@react-leaflet/core';
import { marker,icon,layerGroup } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

// PlaceMarker.js: Displays a leaflet marker on the map at the location of the active point of interest


// Returns a marker at the current focused place
const createFocusMarker = (focus) => {

    const markerImage = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png"
    const shadowImage = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png";

    const name = focus.name;
    const location = [focus.location.y,focus.location.x];
    const label = focus.categories[0].label;

    const markerIcon = icon({
        iconUrl:markerImage,
        shadowUrl: shadowImage,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
    const focusMarker = marker(location, {icon:markerIcon})
    .bindPopup(
        "<b>" +
        name +
            "</b></br>" +
            label
        )

    return focusMarker;
}

// Initalize marker on component creation
const initMarker = (props,context) => {
    const focusGroup = layerGroup();
    focusGroup.addLayer(createFocusMarker(props.focus));
    return createElementObject(focusGroup, context);
}

// Update marker if new POI is clicked
const updateMarker = (instance, props, prevProps) => {
    if (props.focus !== prevProps.focus) {
        instance.clearLayers();
        instance.addLayer(createFocusMarker(props.focus))
    }
    return null;
}


const usePlaceMarkerElement = createElementHook(initMarker,updateMarker);
const usePlaceMarker = createPathHook(usePlaceMarkerElement);

// Main component
const PlaceMarker = (props) => {
    // Custom hook uses react-leaflet to initialize component
    const marker = usePlaceMarker(props);
    
    const map = useMap();

    useEffect(()=>{
        map.flyTo(marker.current.instance.getLayers()[0].getLatLng());
        marker.current.instance.openPopup();
    },[map,marker,props.focus])
}

export default PlaceMarker;