import { useContext, useState } from "react";
import { AppContext } from "../App";
import "@esri/calcite-components/dist/components/calcite-flow-item";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-input-text";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-icon";
import { CalciteFlowItem, CalciteInputText, CalciteButton, CalciteBlock, CalciteIcon } from '@esri/calcite-components-react';
import { fetchRoute } from "../api/routing";
import { getManeuverIcon } from "../data/maneuverTypes";

const NavigationControl = (props) => {

    const {appState, setAppState} = useContext(AppContext);
    const [directions, setDirections] = useState(null);


    const resetPanel = () => {
        setAppState({state:'default'})
    }
    const back = (e) => {
        e.preventDefault();
        setAppState({...appState, destination:null, route:null, geocodeResult:null})
    }

    const queryRoute = async () => {
        if (!props.start || !props.destination) return;
        
        const result = await fetchRoute([props.start.location.x,props.start.location.y],props.destination);

        setAppState({...appState,route: result})


        const totalTimeMinutes = Math.round(result.directions[0].summary.totalDriveTime);
        const totalDistanceMiles = result.directions[0].summary.totalLength.toFixed(1);
        
        const summary = <CalciteBlock heading={totalTimeMinutes+' min'} description={totalDistanceMiles + ' miles'} />

        const directions = result.directions[0].features.map((f) => <CalciteBlock description={f.attributes.text} key={f.attributes.time}><CalciteIcon slot='icon' scale='m' icon={getManeuverIcon(f.attributes.maneuverType)}></CalciteIcon></CalciteBlock>).reduce((prev,curr)=>[prev,'',curr]);


        const directionsHTML = <>
        {summary}
        {directions}
        </>
        setDirections(directionsHTML);
    }


// 34.055881, -117.157194


    return (
        <CalciteFlowItem closable={true} heading='Route' onCalciteFlowItemClose={resetPanel} onCalciteFlowItemBack={back}>
            <CalciteInputText onKeyUp={e=>setAppState({...appState,searchQuery:e.target.value})} id="navigationInput"/>
            <CalciteInputText value={props.destination} disabled/>
            <CalciteButton onClick={queryRoute}>Solve route</CalciteButton>
            {directions}
        </CalciteFlowItem>
    )
}

export default NavigationControl;