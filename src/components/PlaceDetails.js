import "@esri/calcite-components/dist/components/calcite-flow-item";
import "@esri/calcite-components/dist/components/calcite-block";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-button";
import { CalciteFlowItem, CalciteBlock, CalciteIcon, CalciteButton } from '@esri/calcite-components-react';
import { AppContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { fetchPlaceDetails } from "../api/places";

// PlaceDetails.js: Displays details about a point of interest in the calcite-flow sidebar
const PlaceDetails = (props) => {
    const {appState, setAppState} = useContext(AppContext);
    const [placeDetails, setPlaceDetails] = useState(null);
    const back = (e) => {
        e.preventDefault();
        setAppState({...appState, focus:null})
    }
    const resetPanel = () => {
        setAppState({state:'default'})
    }
    const openNavigation = (e) => {
        setAppState({...appState, destination:{name:placeDetails.name,location:placeDetails.location}})
    }

    // Format a value with an icon and calcite block
    const PlaceInfo = ({heading, icon, value}) => {
        if (value != null) {
            return (
                <CalciteBlock heading={heading} description={value}><CalciteIcon slot="icon" scale="m" icon={icon}/></CalciteBlock>
            )
        }
    }

    // Helper function for "Categories" field
    const formatCategoryNames = (categories) => {
        let categoryLabel = ""
        categories.forEach((category, i) => {
        categoryLabel += `${category.label} (${category.categoryId})`
        categoryLabel += i < categories.length - 1 ? ", " : ""
        })
        return categoryLabel
    }

    // Fetch place details from the places service on render
    useEffect(()=>{
        const queryPlaceDetails = async () => {
            // Perform REST API call
            const details = await fetchPlaceDetails(props.id);
            setPlaceDetails(details);
        }
        if (!placeDetails || placeDetails.placeId !== appState.focus.placeId) queryPlaceDetails();
    })

    return placeDetails && (
        <CalciteFlowItem closable={true} onCalciteFlowItemBack={back} onCalciteFlowItemClose={resetPanel} id={placeDetails.placeId} heading={placeDetails.name}>
            <CalciteButton icon-start="right" label="Navigate to location"slot="header-actions-end" onClick={openNavigation}></CalciteButton>
            <PlaceInfo heading="Description" icon="information" value={placeDetails?.description} />
            <PlaceInfo heading="Categories" icon="layer" value={formatCategoryNames(placeDetails.categories)}/>
            <PlaceInfo heading="Address" icon="map-pin" value={placeDetails?.address?.streetAddress} />
            <PlaceInfo heading="Phone" icon="mobile" value={placeDetails?.contactInfo?.telephone} />
            <PlaceInfo heading="Hours" icon="clock" value={placeDetails?.hours?.openingText} />
            <PlaceInfo heading="Rating" icon="star" value={placeDetails?.rating?.user} />
            <PlaceInfo heading="Email" icon="email-address" value={placeDetails?.contactInfo?.email} />
            <PlaceInfo heading="Website" icon="information" value={placeDetails?.contactInfo?.website?.split("://")[1].split("/")[0]} />
            <PlaceInfo heading="Facebook" icon="speech-bubble-social" value={placeDetails?.socialMedia?.facebookId ? `www.facebook.com/${placeDetails.socialMedia.facebookId}` : null} />
            <PlaceInfo heading="Twitter" icon="speech-bubbles" value={placeDetails?.socialMedia?.twitter ? `www.twitter.com/${placeDetails.socialMedia.twitter}` : null} />
            <PlaceInfo heading="Instagram" icon="camera" value={placeDetails?.socialMedia?.instagram ? `www.instagram.com/${placeDetails.socialMedia.instagram}` : null} />
        </CalciteFlowItem>
    )
}

export default PlaceDetails;