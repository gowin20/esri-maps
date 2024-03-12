import { useMap } from "react-leaflet"
import { useContext, useEffect } from "react";
import { AppContext, MapContext } from "../App";
import { getReverseGeocode } from "../api/geocode";


const ReverseGeocode = () => {
    const map = useMap();
    const {appState,setAppState} = useContext(AppContext)

    map.on('click',async (e)=> {
        const candidate = await getReverseGeocode([e.latlng.lng,e.latlng.lat]);

        document.getElementById('navigationInput').value = candidate.address.Address;
        setAppState({...appState, searchQuery:null,geocodeResult:{
            location:candidate.location,
            address:candidate.address.Address
        }})
    })

    const navInput = document.getElementById('navigationInput');
    if (!navInput) return;
    console.log('adding event listener',navInput);
    navInput.addEventListener('calciteInputTextInput',e=>{
        setAppState({...appState,searchQuery:e.target.value,mapCenter:map.getCenter()})
    })    
    return <></>;
}
export default ReverseGeocode;