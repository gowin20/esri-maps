import "@esri/calcite-components/dist/components/calcite-flow-item";
import "@esri/calcite-components/dist/components/calcite-block";
import { CalciteFlowItem, CalciteBlock } from '@esri/calcite-components-react';
import { useContext } from "react";
import { AppContext } from "../App";


// add a focus param to global context
const PlaceResults = ({query}) => {
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

export default PlaceResults;