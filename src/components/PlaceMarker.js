import {
    createElementHook, createPathHook, createElementObject
} from '@react-leaflet/core';
import { marker,icon,layerGroup } from 'leaflet';
import { useEffect,useContext } from 'react';
import { useMap } from 'react-leaflet';
import { AppContext } from "../App";

const markerImage = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
const shadowImage = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png";
const createFocusMarker = (focus) => {

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

const initMarker = (props,context) => {
    const focusGroup = layerGroup();
    focusGroup.addLayer(createFocusMarker(props.focus));
    return createElementObject(focusGroup, context);
}

const updateMarker = (instance, props, prevProps) => {
    if (props.focus !== prevProps.focus) {
        instance.clearLayers();
        instance.addLayer(createFocusMarker(props.focus))
    }
    return null;
    // there should not be any use case for this update function
}


const usePlaceMarkerElement = createElementHook(initMarker,updateMarker);
const usePlaceMarker = createPathHook(usePlaceMarkerElement);

const PlaceMarker = (props) => {
    const marker = usePlaceMarker(props);
    const map = useMap();

    useEffect(()=>{
        map.flyTo(marker.current.instance.getLayers()[0].getLatLng());
        marker.current.instance.openPopup();


    },[map,marker,props.focus])
}

export default PlaceMarker;