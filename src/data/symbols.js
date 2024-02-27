const symbols = [
    {
      name: "Arts and Entertainment",
      parentCategory: 10000,
      defaultFillColor: "#D36690",
      get defaultIconMarker() {
        return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
      },
      childSymbols: [
        {
          name: "Art Gallery",
          categories: [10004],
          range: [],
          fillColor: "#D36690",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Gallery_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Movie Theater",
          categories: [10024],
          range: [10025, 10026],
          fillColor: "#D36690",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Movie_Theater_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Museum",
          categories: [10027],
          range: [10028, 10031],
          fillColor: "#D36690",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Museum_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Performing Arts",
          categories: [10035],
          range: [10028, 10031],
          fillColor: "#D36690",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Performing_Arts_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Zoo",
          categories: [10056],
          range: [],
          fillColor: "#D36690",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Zoo_21.svg" width="21px" height="21px">`
          },
        },
      ],
    },
    {
      name: "Business and Professional Services",
      parentCategory: 11000,
      defaultFillColor: "#996633",
      get defaultIconMarker() {
        return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
      },
      childSymbols: [
        {
          name: "Automotive",
          categories: [11009],
          range: [11010, 11018],
          fillColor: "#996633",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Financial",
          categories: [11042],
          range: [11043, 11055],
          fillColor: "#996633",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Bank_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "ATM",
          categories: [11044],
          range: [],
          fillColor: "#996633",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Bank_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Home Improvement Service",
          categories: [11076],
          range: [11092, 11102],
          fillColor: "#996633",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Pet Service",
          categories: [11133],
          range: [11134, 11135],
          fillColor: "#996633",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
          },
        },
      ],
    },
    {
      name: "Community and Government",
      parentCategory: 12000,
      defaultFillColor: "#09BAB6",
      get defaultIconMarker() {
        return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
      },
      childSymbols: [
        {
          name: "Cemetery",
          categories: [12003],
          range: [],
          fillColor: "#09BAB6",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Cemetery_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "College and University",
          categories: [12009],
          range: [12010, 12048],
          fillColor: "#09BAB6",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/College_or_University_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "School",
          categories: [12054],
          range: [12056, 12063],
          fillColor: "#09BAB6",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/School_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Government Building",
          categories: [12064, 12065, 12066, 12068, 12069],
          range: [],
          fillColor: "#09BAB6",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Courthouse",
          categories: [12067],
          range: [],
          fillColor: "#09BAB6",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Courthouse_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Law Enforcement",
          categories: [12070],
          range: [12071, 12074],
          fillColor: "#09BAB6",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Police_Station_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Post office",
          categories: [12075],
          range: [],
          fillColor: "#09BAB6",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Post_Office_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Library",
          categories: [12080],
          range: [],
          fillColor: "#09BAB6",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Library_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Spiritual Center",
          categories: [12098],
          range: [12101, 12111],
          fillColor: "#09BAB6",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Place_of_Worship_21.svg" width="21px" height="21px">`
          },
        },
      ],
    },
    {
      name: "Dining and Drinking",
      parentCategory: 13000,
      defaultFillColor: "#f29900",
      get defaultIconMarker() {
        return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
      },
      childSymbols: [
        {
          name: "Bar",
          categories: [13003, 13029, 13050],
          range: [],
          fillColor: "#f29900",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Bar_or_Pub_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Coffee",
          categories: [13032, 13063, 13035, 13037],
          range: [13033, 13037],
          fillColor: "#f29900",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Coffee_or_Tea_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Restaurant",
          categories: [13065],
          range: [13026, 13388],
          fillColor: "#f29900",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Restaurant_21.svg" width="21px" height="21px">`
          },
        },
      ],
    },
    {
      name: "Event",
      parentCategory: 14000,
      defaultFillColor: "#D36690",
      get defaultIconMarker() {
        return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
      },
      childSymbols: [
        {
          name: "All Events",
          categories: [14000],
          range: [14001, 14015],
          fillColor: "#D36690",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
          },
        },
      ],
    },
    {
      name: "Health and Medicine",
      parentCategory: 15000,
      defaultFillColor: "#E9444F",
      get defaultIconMarker() {
        return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
      },
      childSymbols: [
        {
          name: "Physician",
          categories: [
            15006,
            15007,
            15021,
            15023,
            15024,
            15025,
            15026,
            15027,
          ],
          range: [15028, 15050],
          fillColor: "#E9444F",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Doctor_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Medical Facility",
          categories: [15000],
          range: [15028, 15050],
          fillColor: "#E9444F",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Veterinarian",
          categories: [15054],
          range: [],
          fillColor: "#E9444F",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Veterinarian_21.svg" width="21px" height="21px">`
          },
        },
      ],
    },
    {
      name: "Landmarks and Outdoors",
      parentCategory: 16000,
      defaultFillColor: "#24AA4A",
      get defaultIconMarker() {
        return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
      },
      childSymbols: [
        {
          name: "Beach",
          categories: [16003],
          range: [],
          fillColor: "#24AA4A",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Beach_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Campground",
          categories: [16008],
          range: [],
          fillColor: "#24AA4A",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Campground_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Garden",
          categories: [16017],
          range: [],
          fillColor: "#24AA4A",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Garden_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Marina",
          categories: [16018],
          range: [],
          fillColor: "#24AA4A",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Marina_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Monument",
          categories: [16026],
          range: [],
          fillColor: "#24AA4A",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Historical_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Dog Park",
          categories: [16033],
          range: [],
          fillColor: "#24AA4A",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Dog_Park_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Picnic",
          categories: [16036],
          range: [],
          fillColor: "#24AA4A",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Rest_Area_21.svg" width="21px" height="21px">`
          },
        },

        {
          name: "Playground",
          categories: [16037],
          range: [],
          fillColor: "#24AA4A",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Playground_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "National Park",
          categories: [16034, 16038],
          range: [],
          fillColor: "#24AA4A",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/National_Park_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Park",
          categories: [16032, 16035, 16037, 16039],
          range: [],
          fillColor: "#24AA4A",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Park_21.svg" width="21px" height="21px">`
          },
        },
      ],
    },
    {
      name: "Retail",
      parentCategory: 17000,
      defaultFillColor: "#63598E",
      get defaultIconMarker() {
        return `<img src="https://static.arcgis.com/icons/places/Shop_21.svg" width="21px" height="21px">`
      },
      childSymbols: [
        {
          name: "Automotive",
          categories: [17005],
          range: [17006, 17013],
          fillColor: "#63598E",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Shop_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Market",
          categories: [17065, 17066, 17067, 17068],
          range: [],
          fillColor: "#63598E",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Market_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Grocery",
          categories: [17069, 17070, 17071, 17072, 17073, 17077],
          range: [],
          fillColor: "#63598E",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Grocery_Store_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Shopping",
          categories: [17000],
          range: [17001, 17139],
          fillColor: "#63598E",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Shop_21.svg" width="21px" height="21px">`
          },
        },
      ],
    },
    {
      name: "Sports and Recreation",
      parentCategory: 18000,
      defaultFillColor: "#009AF2",
      get defaultIconMarker() {
        return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
      },
      childSymbols: [
        {
          name: "Baseball",
          categories: [18002],
          range: [18003, 18005],
          fillColor: "#009AF2",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Baseball_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Basketball",
          categories: [18006],
          range: [18007, 18008],
          fillColor: "#009AF2",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Basketball_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Football",
          categories: [18013],
          range: [18014, 18015],
          fillColor: "#009AF2",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Football_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Golf",
          categories: [18016],
          range: [18017, 18019],
          fillColor: "#009AF2",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Golf_Course_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Racquet Sports",
          categories: [18040],
          range: [18041, 18047],
          fillColor: "#009AF2",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Ski resort",
          categories: [18061],
          range: [],
          fillColor: "#009AF2",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Ski_Resort_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Soccer",
          categories: [18062],
          range: [18063, 18064],
          fillColor: "#009AF2",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Soccer_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Swimming",
          categories: [18073],
          range: [18073, 18076],
          fillColor: "#009AF2",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Swimming_Pool_21.svg" width="21px" height="21px">`
          },
        },
      ],
    },
    {
      name: "Travel and Transportation",
      parentCategory: 19000,
      defaultFillColor: "#3C92CF",
      get defaultIconMarker() {
        return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
      },
      childSymbols: [
        {
          name: "Airport",
          categories: [19031],
          range: [19032, 19041],
          fillColor: "#3C92CF",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Airport_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Electric Fuel Station",
          categories: [19006],
          range: [],
          fillColor: "#3C92CF",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/EV_Charging_Station_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Fuel Station",
          categories: [19007],
          range: [],
          fillColor: "#3C92CF",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Gas_Station_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Lodging",
          categories: [19009],
          range: [19010, 19019],
          fillColor: "#3C92CF",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Lodging_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Parking",
          categories: [19020],
          range: [],
          fillColor: "#3C92CF",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Parking_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Rail Station",
          categories: [19047],
          range: [],
          fillColor: "#3C92CF",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Rail_Station_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Car rental",
          categories: [19048],
          range: [],
          fillColor: "#3C92CF",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Rental_Cars_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Transportation Service",
          categories: [19051],
          range: [19052, 19054],
          fillColor: "#3C92CF",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
          },
        },
        {
          name: "Travel Agency",
          categories: [19055],
          range: [],
          fillColor: "#3C92CF",
          get iconMarker() {
            return `<img src="https://static.arcgis.com/icons/places/Default_21.svg" width="21px" height="21px">`
          },
        },
      ],
    },
];
export default symbols;

export function getSymbolLookUp(categories) {
  let marker
  const categoryId = categories[0].categoryId // Classify based on first category only
  const categoryIdNum = Number(categoryId)
  const categoryIdPrefix = categoryId.substr(0, 2)
  const parentCategory = Number(categoryIdPrefix) * 1000
  const parentSymbol = symbols.find(
      symbol => symbol.parentCategory === parentCategory
  )
  parentSymbol.childSymbols.every(childSymbol => {
      if (childSymbol.categories.includes(categoryIdNum)) {
          // Exact match
          marker = childSymbol.iconMarker
          return false
      } else if (
          // Range match
          childSymbol.range.length &&
          categoryIdNum >= childSymbol.range[0] &&
          categoryIdNum <= childSymbol.range[1]
      ) {
          marker = childSymbol.iconMarker
          return false
      }
      return true
  })
  if (!marker) {
      // No match
      marker = parentSymbol.defaultIconMarker
  }
  return marker
}