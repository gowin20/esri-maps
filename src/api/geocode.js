import {suggest, geocode} from '@esri/arcgis-rest-geocoding';
import { authentication } from "../App";

export const findSuggestions = async (query,center) => {
    if (!query || !center) return;

    let response = await suggest(query,{
        authentication,
        params:{
            location: center.lng+','+center.lat
        }
    })
    return response.suggestions;
}

export const getAddressCandidate = async (text,key) => {
    if (!text && !key) return;
    console.log('Geocode request:',text);
    let response = await geocode({
        singleLine:text,
        magicKey:key,
        authentication
    })

    if (response.candidates.length > 0) return response.candidates[0];
    else return null;
}