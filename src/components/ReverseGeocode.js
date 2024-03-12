import { useMap } from "react-leaflet"
import { useContext } from "react";
import { AppContext } from "../App";
import { getReverseGeocode } from "../api/geocode";

// ReverseGeocode.js: provides geocoding functionality
// Must be nested within the map component as it requires access to map extent
const ReverseGeocode = () => {
    const map = useMap();
    const {appState,setAppState} = useContext(AppContext)

    // Perform a referse geocode on click
    map.on('click',async (e)=> {
        // Perform REST API call
        const candidate = await getReverseGeocode([e.latlng.lng,e.latlng.lat]);

        document.getElementById('navigationInput').value = candidate.address.Address;
        // Pass result to global app state
        setAppState({...appState, searchQuery:null,geocodeResult:{
            location:candidate.location,
            address:candidate.address.Address
        }})
    })

    // Interfaces with the input in NavGeocodeSuggest.js, but must be nested within the MapContainer so it lives here
    const navInput = document.getElementById('navigationInput');
    if (!navInput) return;
    navInput.addEventListener('calciteInputTextInput',e=>{
        setAppState({...appState,searchQuery:e.target.value,mapCenter:map.getCenter()})
    })    
    return <></>;
}
export default ReverseGeocode;