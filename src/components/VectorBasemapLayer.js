import { 
    createElementObject, 
    createPathComponent
} from '@react-leaflet/core'
import { vectorBasemapLayer } from 'esri-leaflet-vector';
import { layerGroup } from 'leaflet';
import { apiKey } from '../App';

// VectorBasemapLayer class with react-leaflet


// genius idea: use a LayerGroup wrapper to gain access to LayerGroup.removeLayers() and easily update the basemap!

const createVectorBasemap = (props,context) => {
    const basemapGroup = layerGroup();
    const basemap = new vectorBasemapLayer(props.styleName,{
        token:apiKey,
        places:props.places || 'all'
    })
    basemapGroup.addLayer(basemap);
    return createElementObject(basemapGroup, context)
}
const updateVectorBasemap = (instance,props,prevProps) => {

    if (props.places !== prevProps.places) {
        // I don't think this code actually works... we don't have access to the leaflet context here so we can't add the new layer
          // TODO figure out how to erase basemap places using this lifecycle updater

        instance.clearLayers();

        const basemap = new vectorBasemapLayer(props.styleName,{
            token:apiKey,
            places:props.places || 'all'
        })
        instance.addLayer(basemap)
        //instance._maplibreGL.options.style.replace(`&places=${prevProps.places}`,`&places=${props.places}`)
    }
}
const VectorBasemapLayer = createPathComponent(createVectorBasemap,updateVectorBasemap);
export default VectorBasemapLayer;
