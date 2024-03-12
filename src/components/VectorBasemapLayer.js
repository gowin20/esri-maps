import { 
    createElementObject, 
    createPathComponent
} from '@react-leaflet/core'
import { vectorBasemapLayer } from 'esri-leaflet-vector';
import { apiKey } from '../App';

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

// createPathComponent factory function from react-leaflet does a lot of heavy lifting for us here
const VectorBasemapLayer = createPathComponent(createVectorBasemap,updateVectorBasemap);
export default VectorBasemapLayer;