import { 
    createElementObject, 
    createPathComponent
} from '@react-leaflet/core'
import { vectorBasemapLayer } from 'esri-leaflet-vector';
import { layerGroup } from 'leaflet';
import { apiKey } from '../App';

// VectorBasemapLayer class with react-leaflet

const createVectorBasemap = (props,context) => {
    const basemapGroup = layerGroup();
    const basemap = new vectorBasemapLayer(props.styleName,{
        token:apiKey,
        places:props.places || 'attributed'
    })
    basemapGroup.addLayer(basemap);
    return createElementObject(basemap, context)
}
const updateVectorBasemap = (instance,props,prevProps) => {

    if (props.places !== prevProps.places) {

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
const VectorBasemapLayer = createPathComponent(createVectorBasemap,updateVectorBasemap);
export default VectorBasemapLayer;
