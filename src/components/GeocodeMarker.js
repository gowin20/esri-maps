import {
    createElementHook, createPathHook, createElementObject
} from '@react-leaflet/core';
import { circleMarker, layerGroup } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const createMarker = (props) => {

    const location = [props.geocode.location.y,props.geocode.location.x];
    const label = props.geocode.address;

    const geocodeMarker = circleMarker(location, {
        radius:7,
        color:"#000000",
        weight:4,
        fill:true,
        fillColor:'#ffffff',
        opacity:1.0,
        fillOpacity:1.0
    })
    .bindPopup(`<b>${label}</b>`);
    return geocodeMarker;
}

const initMarker = (props,context) => {
    const group = layerGroup({
        pane:'tooltipPane'
    })
    const marker = createMarker(props);
    marker.addTo(group);
    return createElementObject(group, context);
}

const updateMarker = (instance, props, prevProps) => {
    if (props.geocode.location !== prevProps.geocode.location) {
        instance.clearLayers();
        createMarker(props).addTo(instance);
    }
    return null;
}


const useGeocodeMarkerElement = createElementHook(initMarker,updateMarker);
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