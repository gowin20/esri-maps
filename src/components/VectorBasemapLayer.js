import { 
    createElementObject, 
    createElementHook,
    createPathHook
} from '@react-leaflet/core';
import { vectorBasemapLayer } from 'esri-leaflet-vector';
import { apiKey } from '../App';
import { AppContext } from "../App.js";
import { useMap } from "react-leaflet";
import { useEffect,useContext } from 'react';

// VectorBasemapLayer component: Renders a vector basemap layer using Esri Leaflet Vector
// Data source: ArcGIS basemap styles service

// Initialization function used to create layer
const createVectorBasemap = (props,context) => {
    const basemap = new vectorBasemapLayer(props.styleName,{
        token:apiKey, // ArcGIS API key
        places:props.places || 'attributed'
    })
    return createElementObject(basemap, context)
}

// Update function triggered when component props change
const updateVectorBasemap = (instance,props,prevProps) => {

    if (props.places !== prevProps.places) {
        // Filter basemap places using underlying MapLibre map
        const mlMap = instance._maplibreGL._glMap;
        const style = mlMap.getStyle();
        const places = style.layers.filter((lyr) => lyr.source === "esri-places")
        if (props.places === 'none') {
            places.forEach((lyr) => {
                mlMap.setLayoutProperty(lyr.id, "visibility", "none")
            })
        }
        else if (props.places === 'attributed') {
            places.forEach((lyr) => {
                mlMap.setLayoutProperty(lyr.id, "visibility", "visible")
            })
        }
    }
}

const useBasemapElement = createElementHook(createVectorBasemap,updateVectorBasemap);
const useBasemapLayer = createPathHook(useBasemapElement);

const VectorBasemapLayer = (props) => {
    const basemap = useBasemapLayer(props);
    const {appState, setAppState} = useContext(AppContext);

    useEffect(()=>{

            basemap.current.context.map.on('click',(e)=>{

                if (basemap.current.instance._ready && basemap.current.instance._maplibreGL._glMap) {            
                    const maplibreMap = basemap.current.instance._maplibreGL._glMap;
                    const features = maplibreMap.queryRenderedFeatures(maplibreMap.project(e.latlng));
                    
                    if (features.length && features[0].properties.esri_place_id) {
                        const focus = {
                            location:{
                                x:e.latlng.lng,
                                y:e.latlng.lat
                            },
                            categories:[{label:'Map click'}],
                            placeId:features[0].properties.esri_place_id
                        }
                        setAppState({...appState,focus:focus})
                    }
                }

            })
    },[basemap])

    return null;
}

export default VectorBasemapLayer;