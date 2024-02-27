import {
    createElementHook, createPathHook, createElementObject
} from '@react-leaflet/core';
import { marker,icon } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const markerImage = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
const shadowImage = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png";
const createMarker = (props,context) => {

    const name = props.focus.name;
    const location = [props.focus.location.y,props.focus.location.x];
    const label = props.focus.categories[0].label;

    const markerIcon = icon({
        iconUrl:markerImage,
        shadowUrl: shadowImage,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
    const placeMarker = marker(location, {icon:markerIcon})
    .bindPopup(
        "<b>" +
        name +
            "</b></br>" +
            label
        )
    return createElementObject(placeMarker, context);

}

const updateMarker = (instance, props, prevProps) => {
    return null;
    // there should not be any use case for this update function
}


const usePlaceMarkerElement = createElementHook(createMarker,updateMarker);
const usePlaceMarker = createPathHook(usePlaceMarkerElement);

const PlaceMarker = (props) => {
    const marker = usePlaceMarker(props);

    const map = useMap();
    useEffect(()=>{
        map.flyTo(marker.current.instance.getLatLng());
        marker.current.instance.openPopup();
    },[map,marker])
}

export default PlaceMarker;