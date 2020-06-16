import React, {Suspense, useEffect, useState} from 'react';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
import {ProgressSpinner} from 'primereact/progressspinner';
import {SelectButton} from 'primereact/selectbutton';
import {useTranslation} from 'react-i18next';
import 'react-icons-weather/lib/css/weather-icons.css';
import * as h from "./service/IndexHelper";
import logo from './logo.svg';
import './main.css';
import axios from "axios/index";

function Page() {
    const {t, i18n} = useTranslation();
    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
        localStorage.setItem('SelectedLanguage', lng);
    };

    const langSelectItems = [
        {label: 'English', value: 'en'},
        {label: 'Eesti', value: 'et'}
    ];

    const urlStations = 'http://localhost:8090/api/stations'
    const urlForecasts = 'http://localhost:8090/api/forecasts'

    useEffect(() => {
        const savedLanguage = localStorage.getItem('SelectedLanguage') || 'en';
        changeLanguage(savedLanguage);
        getStations();
        getForecasts();
        const interval = setInterval(() => {
            getStations();
            getForecasts();
        }, 60000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let [isLoadingStations, setIsLoadingStations] = useState(true);
    let [isLoadingForecasts, setIsLoadingForecasts] = useState(true);
    let [stations, setStations] = useState([]);
    let [stats, setStatistics] = useState([]);
    let [timestamp, setTimestamp] = useState('');

    let [forecasts, setForecasts] = useState([]);

    const getStations = () => {
        axios.get(urlStations)
            .then(res => res.data[res.data.length - 1])
            .then(data => {
                    setIsLoadingStations(false);
                    setStations(h.getStations(data));
                    setStatistics(h.getStatistics(data));
                    setTimestamp(h.convertTimestampToDate(h.getTimestamp(data)));
                    //console.log("Stations data is: ", data);
                }
            )
            .catch((err) => {
                console.log("Could not fetch stations data ", err);
            }, [])
    };

    const getForecasts = () => {
        axios.get(urlForecasts)
            .then(res => res.data[res.data.length - 1])
            .then(data => {
                    setIsLoadingForecasts(false);
                    setForecasts(h.getForecasts(data));
                    //console.log("Forecasts data is: ", data);
                }
            )
            .catch((err) => {
                console.log("Could not fetch forecasts data", err);
            }, [])
    };

    let headerGroup =
        <ColumnGroup>
            <Row>
                <Column header="" colSpan={1}/>
                <Column header={t('header.geo')} colSpan={2}/>
                <Column header={t('header.info')} colSpan={5}/>
                <Column header={t('header.air')} colSpan={3}/>
                <Column header={t('header.water')} colSpan={3}/>
                <Column header={t('header.wind')} colSpan={5}/>
            </Row>
            <Row>
                <Column key={'name'} field={'name'} header={t('station.full.name')} sortable filter
                        filterPlaceholder={t('generic.search')}/>
                <Column key={'latitude'} field={'latitude'} header={t('station.full.latitude')} sortable/>
                <Column key={'longitude'} field={'longitude'} header={t('station.full.longitude')} sortable/>
                <Column key={'phenomenon'} field={'phenomenon'} header={t('station.full.phenomenon')} sortable/>
                <Column key={'visibility'} field={'visibility'} header={t('station.full.visibility')} sortable/>
                <Column key={'precipitations'} field={'precipitations'} header={t('station.full.precipitations')}
                        sortable/>
                <Column key={'uvIndex'} field={'uvIndex'} header={t('station.full.uvIndex')} sortable/>
                <Column key={'wmoCode'} field={'wmoCode'} header={t('station.full.wmoCode')} sortable/>
                <Column key={'airPressure'} field={'airPressure'} header={t('station.full.airPressure')}
                        sortable/>
                <Column key={'relativeHumidity'} field={'relativeHumidity'} header={t('station.full.relativeHumidity')}
                        sortable/>
                <Column field={'airTemperature'} header={t('station.full.airTemperature')} sortable/>
                <Column key={'waterLevel'} field={'waterLevel'} header={t('station.full.waterLevel')} sortable/>
                <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} header={t('station.full.waterLevelEh2000')}
                        sortable/>
                <Column key={'waterTemperature'} field={'waterTemperature'} header={t('station.full.waterTemperature')}
                        sortable/>
                <Column key={'windDirection'} field={'windDirection'} header={t('station.full.windDirection')}
                        sortable/>
                <Column key={'windSpeed'} field={'windSpeed'} header={t('station.full.windSpeed')} sortable/>
                <Column key={'windSpeedMax'} field={'windSpeedMax'} header={t('station.full.windSpeedMax')}
                        sortable/>
                <Column key={'windChillC'} field={'windChillC'} header={t('station.full.windChillC')} sortable/>
                <Column key={'windChillMaxC'} field={'windChillMaxC'} header={t('station.full.windChillMaxC')}
                        sortable/>
            </Row>
        </ColumnGroup>;

    function combineBold(value, unit, valueWidth) {
        if (value) {
            return <span className='prewrap'><span
                className='bold'>{String(value).padStart(valueWidth, ' ')}</span>{unit}</span>
        }
        return <span/>;
    }

    function combine(value, unit, valueWidth) {
        if (value) {
            return <span className='prewrap'>{String(value).padStart(valueWidth, ' ')}{unit}</span>
        }
        return <span/>;
    }

    function getGoogleMapsUrl(latitude, longitude) {
        return 'http://www.google.com/maps/place/' + latitude + ',' + longitude;
    }

    const bodyName = (rowData) => {
        if (rowData.name) {
            return <div style={{textAlign: 'left', width: '100%'}}>{rowData.name}</div>
        }
        return <div/>;
    }

    const bodyLatitude = (rowData) => {
        if (rowData.latitude && rowData.longitude) {
            return <span><a
                href={getGoogleMapsUrl(rowData.latitude, rowData.longitude)}
                rel="noopener noreferrer"
                target="_blank">{rowData.latitude}{'°'}</a></span>
        } else if (rowData.latitude) {
            return <span>{rowData.latitude}{'°'}</span>
        }
        return <span/>;
    }
    const bodyLongitude = (rowData) => {
        if (rowData.latitude && rowData.longitude) {
            return <span><a
                href={getGoogleMapsUrl(rowData.latitude, rowData.longitude)}
                rel="noopener noreferrer"
                target="_blank">{rowData.longitude}{'°'}</a></span>
        } else if (rowData.longitude) {
            return <span>{rowData.longitude}{'°'}</span>
        }
        return <span/>;
    }
    const bodyPhenomenon = (rowData) => {
        const arrayValue = h.getWeatherIconArrayValue(rowData.phenomenon);
        let arrayValueTranslation = t(h.getWeatherIconTranslationValue(rowData.phenomenon));
        return <div className='nowrap'>
            <div className="icon-wrap float-left">
                <i className={"wi " + arrayValue}/>
            </div>
            <div className={"icon-wrap-text"}>{arrayValueTranslation}</div>
        </div>
    }
    const bodyVisibility = (rowData) => {
        return combine(rowData.visibility, 'km', 3);
    }
    const bodyPrecipitations = (rowData) => {
        return combine(rowData.precipitations, 'mm', 3);
    }
    const bodyAirPressure = (rowData) => {
        return combine(rowData.airPressure, 'hPa', 6);
    }

    const bodyRelativeHumidity = (rowData) => {
        return combine(rowData.relativeHumidity, '%', 3);
    }
    const bodyWaterLevel = (rowData) => {
        return combine(rowData.waterLevel, 'cm', 3);
    }
    const bodyWaterLevelEh2000 = (rowData) => {
        return combine(rowData.waterLevelEh2000, 'cm', 3);
    }
    const bodyWaterTemp = (rowData) => {
        return combine(rowData.waterTemperature, '°C', 4);
    }
    const bodyAirTemp = (rowData) => {
        return combineBold(rowData.airTemperature, '°C', 4);
    };
    const bodyWindDirection = (rowData) => {
        let degrees = rowData.windDirection;
        let word = '';
        if (degrees) {
            if ((degrees >= 337.5 && degrees <= 360) || (degrees >= 0 && degrees <= 22.5)) {
                word = t('direction.north');
            } else if (degrees > 22.5 && degrees < 67.5) {
                word = t('direction.northeast');
            } else if (degrees >= 65.5 && degrees <= 112.5) {
                word = t('direction.east');
            } else if (degrees > 112.5 && degrees < 157.5) {
                word = t('direction.southeast');
            } else if (degrees >= 157.5 && degrees <= 202.5) {
                word = t('direction.south');
            } else if (degrees > 202.5 && degrees < 247.5) {
                word = t('direction.southwest');
            } else if (degrees >= 247.5 && degrees <= 292.5) {
                word = t('direction.west');
            } else if (degrees > 292.5 && degrees < 337.5) {
                word = t('direction.northwest');
            }
        }
        if (degrees) {
            return <div style={{whiteSpace: 'pre', textAlign: 'left'}}>
                <div style={{
                    width: '30px',
                    display: 'inline-block',
                    textAlign: 'right'
                }}>{String(degrees).padStart(3, ' ')}{'°'}</div>
                <div style={{display: 'inline-block', textAlign: 'left', paddingLeft: '5px'}}> {word}</div>
            </div>
        }
        return <div/>;
    };
    const bodyWindSpeed = (rowData) => {
        return combineBold(rowData.windSpeed, 'm/s', 4);
    };
    const bodyWindSpeedMax = (rowData) => {
        return combine(rowData.windSpeedMax, 'm/s', 4);
    };
    const bodyWindChillCF = (rowData) => {
        if (rowData.windChillC) {
            return <span>{rowData.windChillC}{'°C'}</span>;
        }
        return <span/>;
    };
    const bodyWindChillMaxCF = (rowData) => {
        if (rowData.windChillMaxC) {
            return <span>{rowData.windChillMaxC}{'°C'}</span>;
        }
        return <span/>;
    };

    let visibility = stats['visibility'];
    let uvIndex = stats['uvIndex'];
    let airPressure = stats['airPressure'];
    let precipitations = stats['precipitations'];
    let humidity = stats['humidity'];
    let airTemp = stats['airTemperature'];
    let windSpeed = stats['windSpeed'];
    let windSpeedMax = stats['windSpeedMax'];
    let waterLevel = stats['waterLevel'];
    let waterLevelEH2000 = stats['waterLevelEH2000'];
    let waterTemp = stats['waterTemperature'];
    let windChillC = stats['windChillC'];
    let windChillMaxC = stats['windChillMaxC'];

    let footerGroup =
        <ColumnGroup>
            <Row>
                <Column footer={t('generic.statistics')} colSpan={1}/>
                <Column footer="" colSpan={3}/>
                <Column footer={t('station.full.visibility')} colSpan={1}/>
                <Column footer={t('station.full.precipitations')} colSpan={1}/>
                <Column footer={t('station.full.uvIndex')} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={t('station.full.airPressure')} colSpan={1}/>
                <Column footer={t('station.full.relativeHumidity')} colSpan={1}/>
                <Column footer={t('station.full.airTemperature')} colSpan={1}/>
                <Column footer={t('station.full.waterLevel')} colSpan={1}/>
                <Column footer={t('station.full.waterLevelEh2000')} colSpan={1}/>
                <Column footer={t('station.full.waterTemperature')} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={t('station.full.windSpeed')} colSpan={1}/>
                <Column footer={t('station.full.windSpeedMax')} colSpan={1}/>
                <Column footer={t('station.full.windChillC')} colSpan={1}/>
                <Column footer={t('station.full.windChillMaxC')} colSpan={1}/>
            </Row>
            <Row>
                <Column footer={t('generic.min')} colSpan={1}/>
                <Column footer="" colSpan={3}/>
                <Column footer={h.getMinExtra(visibility, 'km')} colSpan={1}/>
                <Column footer={h.getMinExtra(precipitations, 'mm')} colSpan={1}/>
                <Column footer={h.getMin(uvIndex)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getMinExtra(airPressure, 'hPa')} colSpan={1}/>
                <Column footer={h.getMinExtra(humidity, '%')} colSpan={1}/>
                <Column footer={h.getMinExtra(airTemp, '°C')} colSpan={1}/>
                <Column footer={h.getMinExtra(waterLevel, 'cm')} colSpan={1}/>
                <Column footer={h.getMinExtra(waterLevelEH2000, 'cm')} colSpan={1}/>
                <Column footer={h.getMinExtra(waterTemp, '°C')} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getMinExtra(windSpeed, 'm/s')} colSpan={1}/>
                <Column footer={h.getMinExtra(windSpeedMax, 'm/s')} colSpan={1}/>
                <Column footer={h.getMinExtra(windChillC, '°C')} colSpan={1}/>
                <Column footer={h.getMinExtra(windChillMaxC, '°C')} colSpan={1}/>
            </Row>
            <Row>
                <Column footer={t('generic.max')} colSpan={1}/>
                <Column footer="" colSpan={3}/>
                <Column footer={h.getMaxExtra(visibility, 'km')} colSpan={1}/>
                <Column footer={h.getMaxExtra(precipitations, 'mm')} colSpan={1}/>
                <Column footer={h.getMax(uvIndex)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getMaxExtra(airPressure, 'hPa')} colSpan={1}/>
                <Column footer={h.getMaxExtra(humidity, '%')} colSpan={1}/>
                <Column footer={h.getMaxExtra(airTemp, '°C')} colSpan={1}/>
                <Column footer={h.getMaxExtra(waterLevel, 'cm')} colSpan={1}/>
                <Column footer={h.getMaxExtra(waterLevelEH2000, 'cm')} colSpan={1}/>
                <Column footer={h.getMaxExtra(waterTemp, '°C')} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getMaxExtra(windSpeed, 'm/s')} colSpan={1}/>
                <Column footer={h.getMaxExtra(windSpeedMax, 'm/s')} colSpan={1}/>
                <Column footer={h.getMaxExtra(windChillC, '°C')} colSpan={1}/>
                <Column footer={h.getMaxExtra(windChillMaxC, '°C')} colSpan={1}/>
            </Row>
            <Row>
                <Column footer={t('generic.average')} colSpan={1}/>
                <Column footer="" colSpan={3}/>
                <Column footer={h.getAvgExtra(visibility, 'km')} colSpan={1}/>
                <Column footer={h.getAvgExtra(precipitations, 'mm')} colSpan={1}/>
                <Column footer={h.getAvg(uvIndex)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getAvgExtra(airPressure, 'hPa')} colSpan={1}/>
                <Column footer={h.getAvgExtra(humidity, '%')} colSpan={1}/>
                <Column footer={h.getAvgExtra(airTemp, '°C')} colSpan={1}/>
                <Column footer={h.getAvgExtra(waterLevel, 'cm')} colSpan={1}/>
                <Column footer={h.getAvgExtra(waterLevelEH2000, 'cm')} colSpan={1}/>
                <Column footer={h.getAvgExtra(waterTemp, '°C')} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getAvgExtra(windSpeed, 'm/s')} colSpan={1}/>
                <Column footer={h.getAvgExtra(windSpeedMax, 'm/s')} colSpan={1}/>
                <Column footer={h.getAvgExtra(windChillC, '°C')} colSpan={1}/>
                <Column footer={h.getAvgExtra(windChillMaxC, '°C')} colSpan={1}/>
            </Row>
            <Row>
                <Column footer={t('generic.count')} colSpan={1}/>
                <Column footer="" colSpan={3}/>
                <Column footer={h.getCount(visibility)} colSpan={1}/>
                <Column footer={h.getCount(precipitations)} colSpan={1}/>
                <Column footer={h.getCount(uvIndex)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getCount(airPressure)} colSpan={1}/>
                <Column footer={h.getCount(humidity)} colSpan={1}/>
                <Column footer={h.getCount(airTemp)} colSpan={1}/>
                <Column footer={h.getCount(waterLevel)} colSpan={1}/>
                <Column footer={h.getCount(waterLevelEH2000)} colSpan={1}/>
                <Column footer={h.getCount(waterTemp)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getCount(windSpeed)} colSpan={1}/>
                <Column footer={h.getCount(windSpeedMax)} colSpan={1}/>
                <Column footer={h.getCount(windChillC)} colSpan={1}/>
                <Column footer={h.getCount(windChillMaxC)} colSpan={1}/>
            </Row>
        </ColumnGroup>;

    let tableStations =
        <DataTable
            headerColumnGroup={headerGroup}
            footerColumnGroup={footerGroup}
            value={stations} resizableColumns={true}
            scrollable={true} scrollHeight="350px" emptyMessage={t('generic.emptyMessage')}>
            <Column key={'name'} field={'name'} body={bodyName}
                    headerStyle={{width: '11em'}}/>
            <Column key={'latitude'} field={'latitude'} body={bodyLatitude}
                    headerStyle={{width: '11em'}}/>
            <Column key={'longitude'} field={'longitude'} body={bodyLongitude}
                    headerStyle={{width: '11em'}}/>
            <Column key={'phenomenon'} field={'phenomenon'} body={bodyPhenomenon}
                    headerStyle={{width: '15em'}}/>
            <Column key={'visibility'} field={'visibility'} body={bodyVisibility}
                    headerStyle={{width: '7em'}}/>
            <Column key={'precipitations'} field={'precipitations'} body={bodyPrecipitations}
                    headerStyle={{width: '9em'}}/>
            <Column key={'uvIndex'} field={'uvIndex'}
                    headerStyle={{width: '3em'}}/>
            <Column key={'wmoCode'} field={'wmoCode'}
                    headerStyle={{width: '5em'}}/>
            <Column key={'airPressure'} field={'airPressure'} body={bodyAirPressure}
                    headerStyle={{width: '7em'}}/>
            <Column key={'relativeHumidity'} field={'relativeHumidity'} body={bodyRelativeHumidity}
                    headerStyle={{width: '7em'}}/>
            <Column key={'airTemperature'} field={'airTemperature'} body={bodyAirTemp}
                    headerStyle={{width: '8em'}}/>
            <Column key={'waterLevel'} field={'waterLevel'} body={bodyWaterLevel}
                    headerStyle={{width: '6em'}}/>
            <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} body={bodyWaterLevelEh2000}
                    headerStyle={{width: '6em'}}/>
            <Column key={'waterTemperature'} field={'waterTemperature'} body={bodyWaterTemp}
                    headerStyle={{width: '8em'}}/>
            <Column key={'windDirection'} field={'windDirection'} body={bodyWindDirection}
                    headerStyle={{width: '8em'}}/>
            <Column key={'windSpeed'} field={'windSpeed'} body={bodyWindSpeed}
                    headerStyle={{width: '7em'}}/>
            <Column key={'windSpeedMax'} field={'windSpeedMax'} body={bodyWindSpeedMax}
                    headerStyle={{width: '7em'}}/>
            <Column key={'windChillC'} field={'windChillC'} body={bodyWindChillCF}
                    headerStyle={{width: '7em'}}/>
            <Column key={'windChillMaxC'} field={'windChillMaxC'} body={bodyWindChillMaxCF}
                    headerStyle={{width: '7em'}}/>
        </DataTable>;

    let tableForecasts =
        <div>
            {forecasts.map((forecast, i) => {
                return (
                    <div key={i} style={{textAlign: 'left', width: '100%', paddingLeft: '30px'}}>
                        <div>
                            <u><h3>Date: {forecast.date}</h3></u>
                        </div>
                        <div>
                            <h3>Night:</h3>
                            <div hidden={!forecast.night.phenomenon}>
                                <b>Phenomenon:</b> {forecast.night.phenomenon}
                            </div>
                            <div hidden={!forecast.night.tempMin}>
                                <b>Air temp min:</b> {forecast.night.tempMin}°C
                            </div>
                            <div hidden={!forecast.night.tempMax}>
                                <b>Air temp max:</b> {forecast.night.tempMax}°C
                            </div>
                            <div hidden={!forecast.night.text}>
                                <b>Text:</b> {forecast.night.text}
                            </div>
                            <div hidden={!forecast.night.sea}>
                                <b>Sea:</b> {forecast.night.sea}
                            </div>
                            <div hidden={!forecast.night.peipsi}>
                                <b>Lake Peipsi:</b> {forecast.night.peipsi}
                            </div>
                            <div hidden={!(forecast.night.places && forecast.night.places.length > 0)}>
                                <div><h5>Places: </h5></div>
                                {
                                    (forecast.night.places && forecast.night.places.length > 0) ?
                                        (
                                            forecast.night.places.map((place) => {
                                                return (
                                                    <div style={{marginBottom: '5px', fontSize: '0.8em'}}>
                                                        <div>Name: <b>{place.name}</b></div>
                                                        <div
                                                            hidden={!place.phenomenon}>Phenomenon: {place.phenomenon}</div>
                                                        <div hidden={!place.tempMin}>Temp min: {place.tempMin}°C</div>
                                                        <div hidden={!place.tempMax}>Temp max: {place.tempMax}°C</div>
                                                    </div>
                                                );
                                            })
                                        ) : (<div></div>)
                                }
                            </div>
                            <div hidden={!(forecast.night.winds && forecast.night.winds.length > 0)}>
                                <div><h5>Winds:</h5></div>
                                {
                                    (forecast.night.winds && forecast.night.winds.length > 0) ?
                                        (
                                            forecast.night.winds.map((place) => {
                                                return (
                                                    <div hidden={!place.name}
                                                         style={{marginBottom: '5px', fontSize: '0.8em'}}>
                                                        <div>Name: <b>{place.name}</b></div>
                                                        <div
                                                            hidden={!place.direction}>Direction: {place.direction}</div>
                                                        <div hidden={!place.speedMin}>Speed min: {place.speedMin}m/s
                                                        </div>
                                                        <div hidden={!place.speedMax}>Speed max: {place.speedMax}m/s
                                                        </div>
                                                        <div hidden={!place.gust}>Gust: {place.gust}m/s</div>
                                                    </div>
                                                );
                                            })
                                        ) : (<div/>)
                                }
                            </div>
                        </div>
                        <div>
                            <h3>Day:</h3>
                            <div hidden={!forecast.day.phenomenon}>
                                <b>Phenomenon:</b> {forecast.day.phenomenon}
                            </div>
                            <div hidden={!forecast.day.tempMin}>
                                <b>Air temp min:</b> {forecast.day.tempMin}°C
                            </div>
                            <div hidden={!forecast.day.tempMax}>
                                <b>Air temp max:</b> {forecast.day.tempMax}°C
                            </div>
                            <div hidden={!forecast.day.text}>
                                <b>Text:</b> {forecast.day.text}
                            </div>
                            <div hidden={!forecast.day.sea}>
                                <b>Sea:</b> {forecast.day.sea}
                            </div>
                            <div hidden={!forecast.day.peipsi}>
                                <b>Lake Peipsi:</b> {forecast.day.peipsi}
                            </div>
                            <div hidden={!(forecast.day.places && forecast.day.places.length > 0)}>
                                <div><h5>Places: </h5></div>
                                {
                                    (forecast.day.places && forecast.day.places.length > 0) ?
                                        (
                                            forecast.day.places.map((place) => {
                                                return (
                                                    <div style={{marginBottom: '5px', fontSize: '0.8em'}}>
                                                        <div>Name: <b>{place.name}</b></div>
                                                        <div
                                                            hidden={!place.phenomenon}>Phenomenon: {place.phenomenon}</div>
                                                        <div hidden={!place.tempMin}>Temp min: {place.tempMin}°C</div>
                                                        <div hidden={!place.tempMax}>Temp max: {place.tempMax}°C</div>
                                                    </div>
                                                );
                                            })
                                        ) : (<div></div>)
                                }
                            </div>
                            <div hidden={!(forecast.day.winds && forecast.day.winds.length > 0)}>
                                <div><h5>Winds:</h5></div>
                                {
                                    (forecast.day.winds && forecast.day.winds.length > 0) ?
                                        (
                                            forecast.day.winds.map((place) => {
                                                return (
                                                    <div hidden={!place.name}
                                                         style={{marginBottom: '5px', fontSize: '0.8em'}}>
                                                        <div>Name: <b>{place.name}</b></div>
                                                        <div
                                                            hidden={!place.direction}>Direction: {place.direction}</div>
                                                        <div hidden={!place.speedMin}>Speed min: {place.speedMin}m/s
                                                        </div>
                                                        <div hidden={!place.speedMax}>Speed max: {place.speedMax}m/s
                                                        </div>
                                                        <div hidden={!place.gust}>Gust: {place.gust}m/s</div>
                                                    </div>
                                                );
                                            })
                                        ) : (<div/>)
                                }
                            </div>
                        </div>
                        <br/>
                    </div>
                )
            })}
        </div>;

    return <div className="App">
        <SelectButton value={i18n.language} options={langSelectItems} onChange={(e) => changeLanguage(e.value)}
                      className='select-language-button'/>
        <div id="floating-box-main" className="floating-box">
            <div className={"title-and-main"}>
                <header>
                    <div className="unselectable title-big">
                        <span>{t('title.main')}</span>
                    </div>
                </header>
                <div hidden={!isLoadingStations}>
                    <ProgressSpinner/>
                </div>
                <div hidden={isLoadingStations}>
                    <div> {t('title.subtitle')} <b>{timestamp}</b></div>
                    {tableStations}
                </div>
                <div hidden={!isLoadingForecasts}>
                    <br/>
                    <h3>{t('title.forecasts')}</h3>
                    <ProgressSpinner/>
                </div>
                <div hidden={isLoadingForecasts}>
                    <br/>
                    <h3>{t('title.forecasts')}</h3>
                    {tableForecasts}
                </div>
            </div>
        </div>
    </div>
}

const Loader = () => (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo"/>
        <div>loading...</div>
    </div>
);

export default function App() {
    return (
        <Suspense fallback={<Loader/>}>
            <Page/>
        </Suspense>
    );
}
