import { 
    createElementObject, 
    createElementHook,
    createPathHook
} from '@react-leaflet/core'
import { featureGroup, geoJSON } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

// RouteLayer.js: Display a polyline on the leaflet map representing a route from the routing service

const populateRouteLayer = (routeLayer,route) => {
    // This method populates a Leaflet LayerGroup with a route GeoJSON object
    geoJSON(route).addTo(routeLayer);
    return routeLayer;
}

// Initialize route layer within a featureGroup
const initRouteLayer = (props,context) => {
    const routeLayer = featureGroup();
    populateRouteLayer(routeLayer,props.route);
    return createElementObject(routeLayer, context);
}

// Update route layer if parameters change
const updateRouteLayer = (instance,props,prevProps) => {
    if (props.route !== prevProps.route) {
        instance.clearLayers();
        populateRouteLayer(instance,props.route);
    }

}

const useRouteLayerElement = createElementHook(initRouteLayer,updateRouteLayer);
const useRouteLayer = createPathHook(useRouteLayerElement);

const RouteLayer = (props) => {
    // Custom hook creates the route layer
    const lyr = useRouteLayer(props);
    const map = useMap();
    useEffect(()=>{
        map.fitBounds(lyr.current.instance.getBounds().pad(0.25)); // using a featureGroup() instead of a layerGroup to access this getBounds() function
    },[map,lyr])

    return null
}

export default RouteLayer;