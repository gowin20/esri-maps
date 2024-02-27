import { 
    createElementObject, 
    createElementHook,
    createPathHook
} from '@react-leaflet/core'
import { featureGroup, geoJSON } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const populateRouteLayer = (routeLayer,route) => {
    // This method populates a Leaflet LayerGroup with a route GeoJSON object
    geoJSON(route).addTo(routeLayer);
    return routeLayer;
}

const initPlacesLayer = (props,context) => {
    // Create and populate a LayerGroup to display places
    const routeLayer = featureGroup();
    populateRouteLayer(routeLayer,props.route);
    return createElementObject(routeLayer, context);
}

const updatePlacesLayer = (instance,props,prevProps) => {
    // Repopulate places layer when params change
    if (props.route !== prevProps.route) {
        instance.clearLayers();
        populateRouteLayer(instance,props.route);
    }

}

const useRouteLayerElement = createElementHook(initPlacesLayer,updatePlacesLayer);
const useRouteLayer = createPathHook(useRouteLayerElement);

const RouteLayer = (props) => {
    // Hook to create the route layer
    const lyr = useRouteLayer(props);
    const map = useMap();
    useEffect(()=>{

        map.fitBounds(lyr.current.instance.getBounds().pad(0.25)); // using a featureGroup() instead of a layerGroup to access this getBounds() function
    },[map,lyr])

    return null
}

export default RouteLayer;