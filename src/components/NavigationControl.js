import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import "@esri/calcite-components/dist/components/calcite-flow-item";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-icon";
import { CalciteFlowItem, CalciteInputText, CalciteButton, CalciteBlock, CalciteIcon } from '@esri/calcite-components-react';
import { fetchRoute } from "../api/routing";
import { getManeuverIcon } from "../data/maneuverTypes";

// NavigationControl: Widget in sidebar that uses the geocoding and routing services to display a route from a location to a point of interest
const NavigationControl = (props) => {

    const {appState, setAppState} = useContext(AppContext);
    const [directions, setDirections] = useState(null);

    const resetPanel = () => {
        setAppState({state:'default'})
    }
    const back = (e) => {
        e.preventDefault();
        setAppState({...appState, destination:null, route:null, geocodeResult:null, navigationOpen:null})
    }

    // Perform a routing request to the ArcGIS routing service
    const queryRoute = async () => {
        if (!props.start || !props.destination) return;

        // REST API call
        const result = await fetchRoute([props.start.location.x,props.start.location.y],[props.destination.location.x,props.destination.location.y]);

        // Pass result to global app state to display on map
        setAppState({...appState,route: result})

        const totalTimeMinutes = Math.round(result.directions[0].summary.totalDriveTime);
        const totalDistanceMiles = result.directions[0].summary.totalLength.toFixed(1);
        
        const summary = <CalciteBlock heading={totalTimeMinutes+' min'} description={totalDistanceMiles + ' miles'} />

        // Create list of step-by-step directions
        const directions = result.directions[0].features.map((f) => <CalciteBlock description={f.attributes.text} key={f.attributes.time}><CalciteIcon slot='icon' scale='m' icon={getManeuverIcon(f.attributes.maneuverType)}></CalciteIcon></CalciteBlock>).reduce((prev,curr)=>[prev,'',curr]);

        const directionsHTML = <>
        {summary}
        {directions}
        </>
        setDirections(directionsHTML);
    }


    // Trigger reverse geocoding component; can't use appstate.directions as this NavigationControl must render first
    useEffect(()=>{
        if (!appState.navigationOpen) setAppState({...appState,navigationOpen:true});
    })
    

    return (
        <CalciteFlowItem closable={true} heading='Route' onCalciteFlowItemClose={resetPanel} onCalciteFlowItemBack={back}>
            <CalciteInputText id="navigationInput"/> {/* event listener for this found in ReverseGeocode.js, to track map center */}
            <CalciteInputText value={props.destination.name} disabled/>
            <CalciteButton onClick={queryRoute}>Get directions</CalciteButton>
            {directions}
        </CalciteFlowItem>
    )
}

export default NavigationControl;