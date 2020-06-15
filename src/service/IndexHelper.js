import i18n from "../translations/i18n";

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

export function getWeatherIconArrayValue(value) {
    if (value !== undefined && weatherIconArray[value] !== undefined) {
        return weatherIconArray[value].day;
    }
}

export function getWeatherIconTranslationValue(value) {
    if (value !== undefined && weatherIconArray[value] !== undefined) {
        const key = weatherIconArray[value].t;
        if (key) {
            return i18n.t(key);
        } else {
            return '';
        }
    }
}

export const weatherIconArray = {
    "Clear":
        {
            t: "weather.clear",
            day: "wi-day-sunny",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Few clouds":
        {
            t: "weather.fewClouds",
            day: "wi-day-cloudy",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Variable clouds":
        {
            t: "weather.variableClouds",
            day: "wi-cloud-refresh",
            neutral: "wi-cloud-refresh",
            night: "wi-cloud-refresh"
        },
    "Cloudy with clear spells":
        {
            t: "weather.cloudyWithClearSpells",
            day: "wi-day-cloudy-high",
            neutral: "wi-day-cloudy-high",
            night: "wi-night-alt-cloudy-high"
        },
    "Overcast":
        {
            t: "weather.overcast",
            day: "wi-day-sunny-overcast",
            neutral: "wi-cloudy",
            night: "wi-night-alt-cloudy"
        },
    "Light snow shower":
        {
            t: "weather.lightSnowShower",
            day: "wi-na",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Moderate snow shower":
        {
            t: "weather.moderateSnowShower",
            day: "wi-na",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Heavy snow shower":
        {
            t: "weather.heavySnowShower",
            day: "wi-na",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Light shower":
        {
            t: "weather.lightShower",
            day: "wi-day-sprinkle",
            neutral: "wi-raindrop",
            night: "wi-night-alt-sprinkle"
        },
    "Moderate shower":
        {
            t: "weather.moderateShower",
            day: "wi-day-showers",
            neutral: "wi-raindrops",
            night: "wi-night-alt-showers"
        },
    "Heavy shower":
        {
            t: "weather.heavyShower",
            day: "wi-day-rain",
            neutral: "wi-rain",
            night: "wi-night-alt-rain"
        },
    "Light rain":
        {
            t: "weather.lightRain",
            day: "wi-day-sprinkle",
            neutral: "wi-raindrop",
            night: "wi-night-alt-sprinkle"
        },
    "Moderate rain":
        {
            t: "weather.moderateRain",
            day: "wi-day-showers",
            neutral: "wi-raindrops",
            night: "wi-night-alt-showers"
        },
    "Heavy rain":
        {
            t: "weather.heavyRain",
            day: "wi-rain",
            neutral: "wi-rain",
            night: "wi-rain"
        },
    "Glaze":
        {
            t: "weather.glaze",
            day: "wi-na",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Light sleet":
        {
            t: "weather.lightSleet",
            day: "wi-day-sleet",
            neutral: "wi-sleet",
            night: "wi-night-alt-sleet"
        },
    "Moderate sleet":
        {
            t: "weather.moderateSleet",
            day: "wi-na",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Light snowfall":
        {
            t: "weather.lightSnowfall",
            day: "wi-na",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Moderate snowfall":
        {
            t: "weather.moderateSnowfall",
            day: "wi-na",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Heavy snowfall":
        {
            t: "weather.heavySnowfall",
            day: "wi-na",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Blowing snow":
        {
            t: "weather.blowingSnow",
            day: "wi-na",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Drifting snow":
        {
            t: "weather.driftingSnow",
            day: "wi-na",
            neutral: "wi-na",
            night: "wi-na"
        },
    "Hail":
        {
            t: "weather.hail",
            day: "wi-day-hail",
            neutral: "wi-hail",
            night: "wi-night-alt-hail"
        },
    "Mist":
        {
            t: "weather.mist",
            day: "wi-day-fog",
            neutral: "wi-fog",
            night: "wi-night-fog"
        },
    "Fog":
        {
            t: "weather.fog",
            day: "wi-day-fog",
            neutral: "wi-fog",
            night: "wi-night-fog"
        },
    "Thunder":
        {
            t: "weather.thunder",
            day: "wi-day-lightning",
            neutral: "wi-lightning",
            night: "wi-night-alt-lightning"
        },
    "Thunderstorm":
        {
            t: "weather.thunderstorm",
            day: "wi-day-thunderstorm",
            neutral: "wi-thunderstorm",
            night: "wi-night-alt-thunderstorm"
        }
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
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}