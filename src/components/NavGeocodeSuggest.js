import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-block";
import { CalciteBlock, CalcitePanel } from '@esri/calcite-components-react';
import { findSuggestions,getAddressCandidate } from "../api/geocode";
import { useContext, useEffect,useState } from "react";
import { AppContext } from "../App";

// GeocodeSuggestions: Popup window that performs autosuggest geocode operations based on user input
const GeocodeSuggestions = (props) => {
    const {appState, setAppState} = useContext(AppContext)
    const [suggestions,setSuggestions] = useState(null);

    useEffect(()=>{
        const getCandidates = async () => {
            // Perform REST API call
            const newSuggestions = await findSuggestions(props.query,props.mapCenter);
            setSuggestions(newSuggestions);
        }
        getCandidates();
    },[props.query,props.mapCenter])

    if (!suggestions || !props.query) return;

    // Triggers a forward geocode when an autosuggestion is clicked
    const getAddress = async (text,key) => {
        // Perform REST API call
        const candidate = await getAddressCandidate(text,key);
        document.getElementById('navigationInput').value = candidate.address;
        // Pass results to global app state
        setAppState({...appState, searchQuery:null,geocodeResult:{
            location:candidate.location,
            address:candidate.address
        }})   
    }

    const results = [];
    for (const suggestion of suggestions) {
        const result = <CalciteBlock heading={suggestion.text} key={suggestion.magicKey} onClick={e=>getAddress(suggestion.text,suggestion.magicKey)}/>
        results.push(result)
    }

    return (
        <CalcitePanel className="geocodeSuggestions">
            {results}
        </CalcitePanel>
    )
}

export default GeocodeSuggestions;