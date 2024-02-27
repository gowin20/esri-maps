import {
    createElementHook, createPathHook, createElementObject
} from '@react-leaflet/core';
import { circleMarker } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const createMarker = (props,context) => {

    const location = [props.geocode.location.y,props.geocode.location.x];
    const label = props.geocode.address;

    const placeMarker = circleMarker(location, {
        radius:7,
        color:"#000000",
        weight:4,
        fill:true,
        fillColor:'#ffffff',
        opacity:1.0,
        fillOpacity:1.0
    })
    .bindPopup(`<b>${label}</b>`);
    return createElementObject(placeMarker, context);

}

const updateMarker = (instance, props, prevProps) => {
    return null;
    // there should not be any use case for this update function
}


const useGeocodeMarkerElement = createElementHook(createMarker,updateMarker);
const useGeocodeMarker = createPathHook(useGeocodeMarkerElement);

const GeocodeMarker = (props) => {
    const marker = useGeocodeMarker(props);

    /*
    const map = useMap();
    useEffect(()=>{
        map.flyTo(marker.current.instance.getLatLng());
        marker.current.instance.openPopup();
    },[map,marker])
    */
}

export default GeocodeMarker;