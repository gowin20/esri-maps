// This file is used to populate the category buttons in components/SearchControl.js - to change button functionality, modify these here.
const placeTypes = [
{
    name: "Default",
    isButton: false,
    categoryIds: "",
    icon: "https://static.arcgis.com/icons/places/Default_15.svg",
},
{
    name: "Restaurants",
    categoryIds: ["13065"],
    isButton: true,
    icon: "https://static.arcgis.com/icons/places/Restaurant_15.svg",
},
{
    name: "Hotels",
    categoryIds: ["19014", "18061", "19018"],
    isButton: true,
    icon: "https://static.arcgis.com/icons/places/Lodging_15.svg",
},
{
    name: "Grocery",
    categoryIds: ["17069", "17070", "17071", "17072", "17073", "17077"],
    isButton: true,
    icon: "https://static.arcgis.com/icons/places/Grocery_Store_15.svg",
},
{
    name: "Coffee",
    categoryIds: ["13035", "17063"],
    isButton: true,
    icon: "https://static.arcgis.com/icons/places/Coffee_or_Tea_15.svg",
},
{
    name: "ATM",
    categoryIds: ["11044"],
    isButton: true,
    icon: "https://static.arcgis.com/icons/places/Bank_15.svg",
},
{
    name: "Parks",
    categoryIds: ["16032", "16035", "16037", "16039"],
    isButton: true,
    icon: "https://static.arcgis.com/icons/places/Park_15.svg",
},
{
    name: "Fuel",
    categoryIds: ["19007", "19006"],
    isButton: true,
    icon: "https://static.arcgis.com/icons/places/Gas_Station_15.svg",
},
]
export default placeTypes;

export function getPlaceType(name) {
    return placeTypes.find(placeType => placeType.name === name)
}