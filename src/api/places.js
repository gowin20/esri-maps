import { findPlacesWithinExtent,getPlaceDetails } from '@esri/arcgis-rest-places';
import { authentication } from "../App.js";

export const fetchPlaces = async (query,map) => {

    if (!query) return;

    console.log("getPlacesExtent:" + query)

    const bounds = map.getBounds()
    const topRight = bounds.getNorthEast()
    const bottomLeft = bounds.getSouthWest()
    const params = {
        xmin: bottomLeft.lng,
        ymin: bottomLeft.lat,
        xmax: topRight.lng,
        ymax: topRight.lat,
        categoryIds: query.placeType?.categoryIds,
        searchText: query.searchText,
        pageSize:20,
        authentication,
    }

    if (typeof query === 'string') params.searchText = query;
    else params.categoryIds = query;

    try {
        let response = await findPlacesWithinExtent(params)
        if (response.results.length > 0) {
            let results = response.results;
            while (response.nextPage) {
                response = await response.nextPage();
                results = results.concat(response.results)
            }
            console.log('Place results:',results)
            return results;

        }
    } catch (err) {
        console.error(err)
    }   
}

export const fetchPlaceDetails = async (placeId) => {
    console.log('placeDetails:',placeId)
    const params = {
        placeId: placeId,
        requestedFields: ["all"],
        authentication,
    }
    try {
        const result = await getPlaceDetails(params)
        
        return result.placeDetails;
    } catch (err) {
        console.log(err)
    }
}