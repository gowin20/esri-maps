// This file is used to fetch calcite-ui-icons for the routing widget in components/NavigationControl.js
// Unfortunately the routing service does not currently return a mapping between esriDMTManeuvers and their corresponding icons
const maneuverTypes = {
    esriDMTUnknown:{
        icon:'question-mark'
    },
    esriDMTStop:{
        icon:'stop'
    },
    esriDMTStraight:{
        icon:'straight'
    },
    esriDMTBearLeft:{
        icon:'bear-left'
    },
    esriDMTBearRight:{
        icon:'bear-right'
    },
    esriDMTTurnLeft:{
        icon:'left'
    },
    esriDMTTurnRight:{
        icon:'right'
    },
    esriDMTSharpLeft:{
        icon:'sharp-left'
    },
    esriDMTSharpRight:{
        icon:'sharp-right'
    },
    esriDMTUTurn:{
        icon:'u-turn'
    },
    esriDMTFerry:{
        icon:'embark'
    },
    esriDMTRoundabout:{
        icon:'round-about'
    },
    esriDMTHighwayMerge:{
        icon:'merge-on-highway'
    },
    esriDMTHighwayExit:{
        icon:'exit-highway-right'
    },
    esriDMTHighwayChange:{
        icon:'highway-change'
    },
    esriDMTHighwayChangeRight:{
        icon:'highway-change-right'
    },
    esriDMTRampRight:{
        icon:'ramp-right'
    },
    esriDMTRampLeft:{
        icon:'ramp-left'
    },
    esriDMTForkCenter:{
        icon:'fork-middle'
    },
    esriDMTForkLeft:{
        icon:'fork-left'
    },
    esriDMTForkRight:{
        icon:'fork-right'
    },
    esriDMTDepart:{
        icon:'pin-tear'
    },
    esriDMTTripItem:{
        icon:'question-mark'
    },
    esriDMTEndOfFerry:{
        icon:'disembark'
    },
    esriDMTTurnRightRight:{
        icon:'right-right'
    },
    esriDMTTurnLeftRight:{
        icon:'left-right'
    },
    esriDMTTurnRightLeft:{
        icon:'right-left'
    },
    esriDMTTurnLeftLeft:{
        icon:'left-left'
    }
}

export const getManeuverIcon = (maneuverType) => {
    if (maneuverType in maneuverTypes) return maneuverTypes[maneuverType].icon;
    else return 'straight';
}

export default maneuverTypes;