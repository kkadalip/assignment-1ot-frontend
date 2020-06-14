import React from 'react';
import i18n from "../translations/i18n";

export function getTabs() {
    return [
        {label: i18n.t('tabs.home'), icon: 'pi pi-fw pi-home'},
        {label: i18n.t('tabs.maps'), icon: 'pi pi-fw pi-globe', disabled: "true"},
        {label: i18n.t('tabs.statistics'), icon: 'pi pi-fw pi-pencil', disabled: "true"},
        {label: i18n.t('tabs.info'), icon: 'pi pi-fw pi-info', disabled: "true"},
        {label: i18n.t('tabs.settings'), icon: 'pi pi-fw pi-cog', disabled: "true"}];
}

export function getStations(value) {
    if (value === undefined) {
        return [];
    }
    return value.stations;
}

export function getStatistics(value) {
    if (value === undefined) {
        return [];
    }
    return value['statistics'];
}

export function getTimestamp(value) {
    if (value === undefined) {
        return [];
    }
    return value['timestamp'];
}

export function getStatisticsVisibility(value) {
    if (value === undefined) {
        return [];
    }
    return value['statistics']['visibility'];
}

export function getStatisticsAirPressure(value) {
    if (value === undefined) {
        return [];
    }
    console.log("getStatisticsAirPressure result " + JSON.stringify(value['statistics']['airPressure']));
}


export function getWeatherIconArrayValue(value) {
    if (value !== undefined && weatherIconArray[value] !== undefined) {
        return weatherIconArray[value].day;
    }
}

export function getWeatherEnToEtArrayValue(value, currentLanguage) {
    if(currentLanguage !== 'et'){
        return value;
    }
    if (value !== undefined && weatherEnToEtArray[value] !== undefined) {
        return weatherEnToEtArray[value];
    }
    return value;
}

export const weatherIconArray = {
    "Clear": {day: "wi-day-sunny", neutral: "wi-na", night: "wi-na"},
    "Few clouds": {day: "wi-day-cloudy", neutral: "wi-na", night: "wi-na"},
    "Variable clouds": {day: "wi-cloud-refresh", neutral: "wi-cloud-refresh", night: "wi-cloud-refresh"},
    "Cloudy with clear spells": {day: "wi-day-cloudy-high", neutral: "wi-day-cloudy-high", night: "wi-night-alt-cloudy-high"},
    "Overcast": {day: "wi-day-sunny-overcast", neutral: "wi-cloudy", night: "wi-night-alt-cloudy"},
    "Light snow shower": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
    "Moderate snow shower": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
    "Heavy snow shower": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
    "Light shower": {day: "wi-day-sprinkle", neutral: "wi-raindrop", night: "wi-night-alt-sprinkle"},
    "Moderate shower": {day: "wi-day-showers", neutral: "wi-raindrops", night: "wi-night-alt-showers"},
    "Heavy shower": {day: "wi-day-rain", neutral: "wi-rain", night: "wi-night-alt-rain"},
    "Light rain": {day: "wi-day-sprinkle", neutral: "wi-raindrop", night: "wi-night-alt-sprinkle"},
    "Moderate rain": {day: "wi-day-showers", neutral: "wi-raindrops", night: "wi-night-alt-showers"},
    "Heavy rain": {day: "wi-rain", neutral: "wi-rain", night: "wi-rain"},
    "Glaze": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
    "Light sleet": {day: "wi-day-sleet", neutral: "wi-sleet", night: "wi-night-alt-sleet"},
    "Moderate sleet": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
    "Light snowfall": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
    "Moderate snowfall": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
    "Heavy snowfall": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
    "Blowing snow": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
    "Drifting snow": {day: "wi-na", neutral: "wi-na", night: "wi-na"},
    "Hail": {day: "wi-day-hail", neutral: "wi-hail", night: "wi-night-alt-hail"},
    "Mist": {day: "wi-day-fog", neutral: "wi-fog", night: "wi-night-fog"},
    "Fog": {day: "wi-day-fog", neutral: "wi-fog", night: "wi-night-fog"},
    "Thunder": {day: "wi-day-lightning", neutral: "wi-lightning", night: "wi-night-alt-lightning"},
    "Thunderstorm": {day: "wi-day-thunderstorm", neutral: "wi-thunderstorm", night: "wi-night-alt-thunderstorm"}
};

export const weatherEnToEtArray = {
    "Clear": "Selge",
    "Few clouds": "Vähene pilvisus",
    "Variable clouds": "Poolpilves",
    "Cloudy with clear spells": "Peamiselt pilves",
    "Overcast": "Pilves",
    "Light snow shower": "Nõrk hooglumi",
    "Moderate snow shower": "Mõõdukas hooglumi",
    "Heavy snow shower": "Tugev hooglumi",
    "Light shower": "Nõrk hoovihm",
    "Moderate shower": "Mõõdukas hoovihm",
    "Heavy shower": "Tugev hoovihm",
    "Light rain": "Nõrk vihm",
    "Moderate rain": "Mõõdukas vihm",
    "Heavy rain": "Tugev vihm",
    "Glaze": "Jäide",
    "Light sleet": "Nõrk lörtsisadu",
    "Moderate sleet": "Mõõdukas lörtsisadu",
    "Light snowfall": "Nõrk lumesadu",
    "Moderate snowfall": "Mõõdukas lumesadu",
    "Heavy snowfall": "Tugev lumesadu",
    "Blowing snow": "Üldtuisk",
    "Drifting snow": "Pinnatuisk",
    "Hail": "Rahe",
    "Mist": "Uduvine",
    "Fog": "Udu",
    "Thunder": "Äike",
    "Thunderstorm": "Äikesevihm"
};


export function getMin(obj) {
    if (obj !== undefined) {
        return obj.min;
    }
}

export function getMinExtra(obj, extraText) {
    if (obj !== undefined) {
        return obj.min + extraText;
    }
}

export function getMax(obj) {
    if (obj !== undefined) {
        return obj.max;
    }
}

export function getMaxExtra(obj, extraText) {
    if (obj !== undefined) {
        return obj.max + extraText;
    }
}

export function getAvg(obj) {
    if (obj !== undefined) {
        return obj.average;
    }
}

export function getAvgExtra(obj, extraText) {
    if (obj !== undefined) {
        return obj.average + extraText;
    }
}


export function getCount(obj) {
    if (obj !== undefined) {
        return obj.count;
    }
}

export function getWindChillDisplay(windChill, windChillMax, unit) {
    return format(windChill, windChill + unit + " (" + windChillMax + unit + ")");
}

export function formatData(title, val, unit) {
    return format(val, <span><span>{title}:&nbsp;<b>{val}</b>{unit}</span><br/></span>);
}

export function format(val, res) {
    if (val === undefined || val === null) {
        return "";
    }
    return res;
}

export function convertTimestampToDate(unix_timestamp) {
    const date = new Date(unix_timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2); // <- Will display time in 10:30:23 format
}