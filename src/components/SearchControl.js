import placeTypes, {getPlaceType} from '../data/placeTypes.js';
import { fetchPlaces,fetchPlacesRaw } from '../api/places.js';
import { AppContext } from "../App.js";

import { useMap } from "react-leaflet";
import { useState,useContext } from 'react';
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-chip-group";
import "@esri/calcite-components/dist/components/calcite-chip";
import "@esri/calcite-components/dist/components/calcite-avatar";
import { CalciteInput, CalciteButton, CalciteChipGroup, CalciteChip, CalciteAvatar } from '@esri/calcite-components-react';
import GeocodeSuggestions from './NavGeocodeSuggest.js';

// TODO
// autosuggest results in dropdown modal with high z-index
// make geocoding requests as well instead of just fetching places
// add navigation button to search bar


// figure out how to delete the search bar content

const SearchControl = () => {
    const [query,setQuery] = useState(null);
    const {appState, setAppState} = useContext(AppContext);
    const map = useMap();

    console.log(map.getZoom());
    const queryPlaces = async (categoryIds) => {
        let results;
        if (categoryIds) results = await fetchPlacesRaw(categoryIds,map);
        else results = await fetchPlacesRaw(query,map);
        if (results) setAppState({...appState, state: 'placeResults', placeResults:results})
    }

    const categoryChipClicked = (e) => {
        const placeType = getPlaceType(e.target.value)
        queryPlaces(placeType.categoryIds);
    }

    const categoryChips = [];
    placeTypes.forEach(category=>{
        if (!category.isButton) return;
        const chip = <CalciteChip className='categoryButton' scale='s' kind='neutral' appearance='solid' value={category.name} key={category.name} onCalciteChipSelect={categoryChipClicked}>
            <CalciteAvatar slot='image' scale='s' thumbnail={category.icon}/>
            {category.name}
        </CalciteChip>;
        categoryChips.push(chip);
    })
    //console.log('control: ',query)

    return (
    <div id="control">
        <CalciteInput
            type="text"
            id="searchInput"
            placeholder="Search Esri Maps"
            onKeyUp={(e) => {
                if (e.key === "Enter") queryPlaces();
                setQuery(e.target.value);
                if (appState.state === 'default') setAppState({state:'typing'});
            }}
        >
            <CalciteButton
            kind="brand"
            icon-start="search"
            id="searchButton"
            type="submit"
            slot="action"
            onClick={()=>queryPlaces()}
            ></CalciteButton>
        </CalciteInput>
        <CalciteChipGroup
            id="categoryButtons"
            label="category-group-label"
            selection-mode="none"
            slot="content-center"
            scale="s"
        >
            {categoryChips}
        </CalciteChipGroup>
        </div>
    )
}

export default SearchControl;