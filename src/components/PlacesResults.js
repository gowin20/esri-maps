import "@esri/calcite-components/dist/components/calcite-flow-item";
import "@esri/calcite-components/dist/components/calcite-block";
import { CalciteFlowItem, CalciteBlock } from '@esri/calcite-components-react';
import { useContext } from "react";
import { AppContext } from "../App";

// PlaceResults.js: Displays results from the places service in a list within the calcite-flow sidebar
const PlacesResults = ({query}) => {
    const {appState, setAppState} = useContext(AppContext);
    
    if (!appState.placeResults) return;
    const results = [];
    for (const result of appState.placeResults) {
        results.push(<CalciteBlock heading={result.name} description={result.categories[0].label} id={result.placeId} key={result.placeId} onClick={()=>setAppState({...appState, focus:result})} />)
    }

    const resetPanel = () => {
        setAppState({state:'default'})
    }

    return (
        <CalciteFlowItem closable={true} heading='Results' onCalciteFlowItemClose={resetPanel}>
            {results}
        </CalciteFlowItem>
    )
}

export default PlacesResults;