import {
    createElementHook, createPathHook, createElementObject
} from '@react-leaflet/core';
import { circleMarker, layerGroup } from 'leaflet';

// Returns a leaflet circleMarker at the geocoded location
const createCircleMarker = (props) => {

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

// Initialize GeocodeMarker layer
const initMarker = (props,context) => {
    const group = layerGroup({
        pane:'tooltipPane'
    })
    const marker = createCircleMarker(props);
    marker.addTo(group);
    return createElementObject(group, context);
}

// Update GeocodeMarker layer
const updateMarker = (instance, props, prevProps) => {
    if (props.geocode.location !== prevProps.geocode.location) {
        instance.clearLayers();
        createCircleMarker(props).addTo(instance);
    }
    return null;
}


const useGeocodeMarkerElement = createElementHook(initMarker,updateMarker);
const useGeocodeMarker = createPathHook(useGeocodeMarkerElement);

// GeocodeMarker.js: Displays a circle marker at the location of a geocoded result
const GeocodeMarker = (props) => {
    useGeocodeMarker(props);

    /*
    Zoom to an extent that includes this marker as well as the PlaceMarker
    const map = useMap();
    useEffect(()=>{
        map.flyTo(marker.current.instance.getLatLng());
        marker.current.instance.openPopup();
    },[map,marker])
    */
   return null
}

export default GeocodeMarker;