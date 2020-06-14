import React, {Suspense, useEffect, useState} from 'react'; // Component // useState
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
// import {DataService} from './service/DataService';
import {ProgressSpinner} from 'primereact/progressspinner';
import {SelectButton} from 'primereact/selectbutton';
// import {TabMenu} from 'primereact/tabmenu';
import {useTranslation} from 'react-i18next';
// import i18n from './translations/i18n';
import {Table} from 'reactstrap';
import 'react-icons-weather/lib/css/weather-icons.css';
import * as h from "./service/IndexHelper";
import logo from './logo.svg';
import './main.css';
import axios from "axios/index";

/*
DataService.getData().then(data => this.setState({
            loading: false,
            stations: h.getStations(data),
            statistics: h.getStatistics(data),
            visibility: h.getStatisticsVisibility(data),
            timestamp: h.getTimestamp(data)
        })).then(data => h.getStatisticsAirPressure(data));
 */

// const App = () => {
function Page() {
    //const {t, i18n} = this.props;
    const {t, i18n} = useTranslation();
    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
        //this.setState({tabs: h.getTabs()});
        //localStorage.setItem('SelectedLanguage', lng);
    };
    const langSelectItems = [
        {label: 'English', value: 'en'},
        {label: 'Eesti', value: 'et'}
    ];

    const stationsUrl = 'http://localhost:8090/stations'

    useEffect(() => {
        getWeatherStations();
    }, []);

    let [isLoading, setIsLoading] = useState(true);
    let [stations, setStations] = useState([]); // NOT NEEDED?
    let [stats, setStatistics] = useState([]);
    let [statsVisibility, setStatisticsVisibility] = useState([]);
    let [timestamp, setTimestamp] = useState('');

    const getWeatherStations = () => {
        const result = axios.get(stationsUrl)
            .then(res => res.data[res.data.length - 1])
            .then(data => {
                    setIsLoading(false);
                    setStations(h.getStations(data));
                    setStatistics(h.getStatistics(data));
                    setStatisticsVisibility(h.getStatisticsVisibility(data));
                    //(h.getTimestamp(data));
                    setTimestamp(h.convertTimestampToDate(h.getTimestamp(data)));
                    // .then(data => h.getStatisticsAirPressure(data));
                    //console.log("Data is: ", data);
                }
            )
            .catch((err) => {
                console.log("Could not fetch data", err);
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
                        filterPlaceholder="Search by name"/>
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
            return <span style={{whiteSpace: 'pre'}}><span
                className='bold'>{String(value).padStart(valueWidth, ' ')}</span>{unit}</span>
        }
        return <span/>;
    }

    function combine(value, unit, valueWidth) {
        if (value) {
            return <span style={{whiteSpace: 'pre'}}>{String(value).padStart(valueWidth, ' ')}{unit}</span>
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
                href={getGoogleMapsUrl(rowData.latitude, rowData.longitude)}>{rowData.latitude}{'°'}</a></span>
        } else if (rowData.latitude) {
            return <span>{rowData.latitude}{'°'}</span>
        }
        return <span/>;
    }
    const bodyLongitude = (rowData) => {
        if (rowData.latitude && rowData.longitude) {
            return <span><a
                href={getGoogleMapsUrl(rowData.latitude, rowData.longitude)}>{rowData.longitude}{'°'}</a></span>
        } else if (rowData.longitude) {
            return <span>{rowData.longitude}{'°'}</span>
        }
        return <span/>;
    }
    const bodyPhenomenon = (rowData) => {
        return <div>
            <div className="icon-wrap" style={{float: "left"}}>
                <i className={"wi " + h.getWeatherIconArrayValue(rowData.phenomenon)}/>
            </div>
            <span className={"icon-wrap-text"}>{rowData.phenomenon}</span>
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
    let precipitations = stats['precipitations']; //???
    let humidity = stats['humidity'];
    let airTemp = stats['airTemperature'];
    // let windDir = stats['windDirection'];
    let windSpeed = stats['windSpeed'];
    let windSpeedMax = stats['windSpeedMax'];
    let waterLevel = stats['waterLevel'];
    let waterLevelEH2000 = stats['waterLevelEH2000'];
    let waterTemp = stats['waterTemperature'];
    let windChillC = stats['windChillC'];
    // let windChillF = stats['windChillF'];
    let windChillMaxC = stats['windChillMaxC'];
    // let windChillMaxF = stats['windChillMaxF'];

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
                <Column footer={h.getMin(visibility)} colSpan={1}/>
                <Column footer={h.getMin(precipitations)} colSpan={1}/>
                <Column footer={h.getMin(uvIndex)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getMin(airPressure)} colSpan={1}/>
                <Column footer={h.getMin(humidity)} colSpan={1}/>
                <Column footer={h.getMin(airTemp)} colSpan={1}/>
                <Column footer={h.getMin(waterLevel)} colSpan={1}/>
                <Column footer={h.getMin(waterLevelEH2000)} colSpan={1}/>
                <Column footer={h.getMin(waterTemp)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getMin(windSpeed)} colSpan={1}/>
                <Column footer={h.getMin(windSpeedMax)} colSpan={1}/>
                <Column footer={h.getMin(windChillC)} colSpan={1}/>
                <Column footer={h.getMin(windChillMaxC)} colSpan={1}/>
            </Row>
            <Row>
                <Column footer={t('generic.max')} colSpan={1}/>
                <Column footer="" colSpan={3}/>
                <Column footer={h.getMax(visibility)} colSpan={1}/>
                <Column footer={h.getMax(precipitations)} colSpan={1}/>
                <Column footer={h.getMax(uvIndex)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getMax(airPressure)} colSpan={1}/>
                <Column footer={h.getMax(humidity)} colSpan={1}/>
                <Column footer={h.getMax(airTemp)} colSpan={1}/>
                <Column footer={h.getMax(waterLevel)} colSpan={1}/>
                <Column footer={h.getMax(waterLevelEH2000)} colSpan={1}/>
                <Column footer={h.getMax(waterTemp)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getMax(windSpeed)} colSpan={1}/>
                <Column footer={h.getMax(windSpeedMax)} colSpan={1}/>
                <Column footer={h.getMax(windChillC)} colSpan={1}/>
                <Column footer={h.getMax(windChillMaxC)} colSpan={1}/>
            </Row>
            <Row>
                <Column footer={t('generic.average')} colSpan={1}/>
                <Column footer="" colSpan={3}/>
                <Column footer={h.getAvg(visibility)} colSpan={1}/>
                <Column footer={h.getAvg(precipitations)} colSpan={1}/>
                <Column footer={h.getAvg(uvIndex)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getAvg(airPressure)} colSpan={1}/>
                <Column footer={h.getAvg(humidity)} colSpan={1}/>
                <Column footer={h.getAvg(airTemp)} colSpan={1}/>
                <Column footer={h.getAvg(waterLevel)} colSpan={1}/>
                <Column footer={h.getAvg(waterLevelEH2000)} colSpan={1}/>
                <Column footer={h.getAvg(waterTemp)} colSpan={1}/>
                <Column footer="" colSpan={1}/>
                <Column footer={h.getAvg(windSpeed)} colSpan={1}/>
                <Column footer={h.getAvg(windSpeedMax)} colSpan={1}/>
                <Column footer={h.getAvg(windChillC)} colSpan={1}/>
                <Column footer={h.getAvg(windChillMaxC)} colSpan={1}/>
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

    let dataTablePrimeReact =
        <DataTable
            headerColumnGroup={headerGroup}
            footerColumnGroup={footerGroup}
            value={stations} resizableColumns={true}
            scrollable={true} scrollHeight="600px" emptyMessage={t('generic.emptyMessage')}>
            <Column key={'name'} field={'name'} body={bodyName}/>
            <Column key={'latitude'} field={'latitude'} body={bodyLatitude}/>
            <Column key={'longitude'} field={'longitude'} body={bodyLongitude}/>
            <Column key={'phenomenon'} field={'phenomenon'} body={bodyPhenomenon}/>
            <Column key={'visibility'} field={'visibility'} body={bodyVisibility}/>
            <Column key={'precipitations'} field={'precipitations'} body={bodyPrecipitations}/>
            <Column key={'uvIndex'} field={'uvIndex'}/>
            <Column key={'wmoCode'} field={'wmoCode'}/>
            <Column key={'airPressure'} field={'airPressure'} body={bodyAirPressure}/>
            <Column key={'relativeHumidity'} field={'relativeHumidity'} body={bodyRelativeHumidity}/>
            <Column key={'airTemperature'} field={'airTemperature'} body={bodyAirTemp}/>
            <Column key={'waterLevel'} field={'waterLevel'} body={bodyWaterLevel}/>
            <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} body={bodyWaterLevelEh2000}/>
            <Column key={'waterTemperature'} field={'waterTemperature'} body={bodyWaterTemp}/>
            <Column key={'windDirection'} field={'windDirection'} body={bodyWindDirection}/>
            <Column key={'windSpeed'} field={'windSpeed'} body={bodyWindSpeed}/>
            <Column key={'windSpeedMax'} field={'windSpeedMax'} body={bodyWindSpeedMax}/>
            <Column key={'windChillC'} field={'windChillC'} body={bodyWindChillCF}/>
            <Column key={'windChillMaxC'} field={'windChillMaxC'} body={bodyWindChillMaxCF}/>
        </DataTable>;


    return <div className="App">
        <SelectButton value={i18n.language} options={langSelectItems} onChange={(e) => changeLanguage(e.value)}
                      className='select-language-button'/>
        <div id="floating-box-main" className="floating-box">
            <div className={"title-and-main"}>
                <header>
                    <p className="unselectable title-big">{t('title.main')}</p>
                </header>
                <div hidden={!isLoading}>
                    <ProgressSpinner/>
                </div>
                <div hidden={isLoading}>
                    <br/>
                    <h2>{t('generic.dataset')} <b>{timestamp}</b>:</h2>
                    {dataTablePrimeReact}
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
