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
import {TabMenu} from 'primereact/tabmenu';
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
                    console.log("YAY DATA IS ", data);
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
                <Column key={'name'} field={'name'} header={t('station.full.name')} sortable="true"/>
                <Column key={'latitude'} field={'latitude'} header={t('station.full.latitude')} sortable="true"/>
                <Column key={'longitude'} field={'longitude'} header={t('station.full.longitude')} sortable="true"/>
                <Column key={'phenomenon'} field={'phenomenon'} header={t('station.full.phenomenon')} sortable="true"/>
                <Column key={'visibility'} field={'visibility'} header={t('station.full.visibility')} sortable="true"/>
                <Column key={'precipitations'} field={'precipitations'} header={t('station.full.precipitations')}
                        sortable="true"/>
                <Column key={'uvIndex'} field={'uvIndex'} header={t('station.full.uvIndex')} sortable="true"/>
                <Column key={'wmoCode'} field={'wmoCode'} header={t('station.full.wmoCode')} sortable="true"/>
                <Column key={'airPressure'} field={'airPressure'} header={t('station.full.airPressure')}
                        sortable="true"/>
                <Column key={'relativeHumidity'} field={'relativeHumidity'} header={t('station.full.relativeHumidity')}
                        sortable="true"/>
                <Column field={'airTemperature'} header={t('station.full.airTemperature')} sortable="true"/>
                <Column key={'waterLevel'} field={'waterLevel'} header={t('station.full.waterLevel')} sortable="true"/>
                <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} header={t('station.full.waterLevelEh2000')}
                        sortable="true"/>
                <Column key={'waterTemperature'} field={'waterTemperature'} header={t('station.full.waterTemperature')}
                        sortable="true"/>
                <Column key={'windDirection'} field={'windDirection'} header={t('station.full.windDirection')}
                        sortable="true"/>
                <Column key={'windSpeed'} field={'windSpeed'} header={t('station.full.windSpeed')} sortable="true"/>
                <Column key={'windSpeedMax'} field={'windSpeedMax'} header={t('station.full.windSpeedMax')}
                        sortable="true"/>
                <Column key={'windChillC'} field={'windChillC'} header={t('station.full.windChillC')} sortable="true"/>
                <Column key={'windChillMaxC'} field={'windChillMaxC'} header={t('station.full.windChillMaxC')}
                        sortable="true"/>
            </Row>
        </ColumnGroup>;

    let footerGroup =
        <ColumnGroup>
            <Row>
                <Column footer="Averages:" colSpan={1}/>
                <Column footer="" colSpan={2}/>
                <Column footer="" colSpan={2}/>
                <Column footer="" colSpan={16}/>
            </Row>
        </ColumnGroup>;

    function combine(value, unit) {
        if (value) {
            return <span>{value}{unit}</span>
        }
        return <span/>;
    }

    function getGoogleMapsUrl(latitude, longitude) {
        return 'http://www.google.com/maps/place/' + latitude + ',' + longitude;
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
    const bodyVisibility = (rowData) => {
        return combine(rowData.visibility, 'km');
    }
    const bodyPrecipitations = (rowData) => {
        return combine(rowData.precipitations, 'mm');
    }
    const bodyAirPressure = (rowData) => {
        return combine(rowData.airPressure, 'hPa');
    }
    const bodyRelativeHumidity = (rowData) => {
        return combine(rowData.relativeHumidity, '%');
    }
    const bodyWaterLevel = (rowData) => {
        return combine(rowData.waterLevel, 'cm');
    }
    const bodyWaterLevelEh2000 = (rowData) => {
        return combine(rowData.waterLevelEh2000, 'cm');
    }
    const bodyWaterTemp = (rowData) => {
        return combine(rowData.waterTemperature, '°C');
    }
    const bodyAirTemp = (rowData) => {
        return combine(rowData.airTemperature, '°C');
    };
    const bodyWindDirection = (rowData) => {
        const degrees = rowData.windDirection;
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
            if (word) {
                word = '(' + word + ')';
            }
        }
        if (degrees) {
            return <span>{degrees}{'°'} {word}</span>
        }
        return <span/>;
    };
    const bodyWindSpeed = (rowData) => {
        return combine(rowData.windSpeed, 'm/s');
    };
    const bodyWindSpeedMax = (rowData) => {
        return combine(rowData.windSpeedMax, 'm/s');
    };
    const bodyWindChillCF = (rowData) => {
        if (rowData.windChillC) {
            const elChillC = <span style={{fontWeight: 'bold'}}>{rowData.windChillC}{'°C'}</span>;
            if (rowData.windChillF) {
                return <span style={{whiteSpace: 'nowrap'}}>
                    {elChillC}
                    <span> ({rowData.windChillF}{'F'})</span>
                </span>
            }
            return elChillC;
        }
        return <span/>;
    };
    const bodyWindChillMaxCF = (rowData) => {
        if (rowData.windChillMaxC) {
            const elChillCMax = <span style={{fontWeight: 'bold'}}>{rowData.windChillMaxC}{'°C'}</span>;
            if (rowData.windChillMaxF) {
                return <span style={{whiteSpace: 'nowrap'}}>
                    {elChillCMax}
                    <span> ({rowData.windChillMaxF}{'F'})</span>
                </span>

            }
            return elChillCMax;
        }
        return <span/>;
    };

    let dataTablePrimeReact =
        <DataTable
            headerColumnGroup={headerGroup}
            footerColumnGroup={footerGroup}
            value={stations} resizableColumns={true}
            scrollable={true} scrollHeight="600px" emptyMessage={"No data found, try again later."}>
            <Column key={'name'} field={'name'}/>
            <Column key={'latitude'} field={'latitude'} body={bodyLatitude}/>
            <Column key={'longitude'} field={'longitude'} body={bodyLongitude}/>
            <Column key={'phenomenon'} field={'phenomenon'}/>
            <Column key={'visibility'} field={'visibility'} body={bodyVisibility}/>
            <Column key={'precipitations'} field={'precipitations'} body={bodyPrecipitations}/>
            <Column key={'uvIndex'} field={'uvIndex'}/>
            <Column key={'wmoCode'} field={'wmoCode'}/>
            <Column key={'airPressure'} field={'airPressure'} body={bodyAirPressure}/>
            <Column key={'relativeHumidity'} field={'relativeHumidity'} body={bodyRelativeHumidity}/>
            <Column key={'airTemperature'} field={'airTemperature'} body={bodyAirTemp} style={{fontWeight: "bold"}}/>
            <Column key={'waterLevel'} field={'waterLevel'} body={bodyWaterLevel}/>
            <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} body={bodyWaterLevelEh2000}/>
            <Column key={'waterTemperature'} field={'waterTemperature'} body={bodyWaterTemp}/>
            <Column key={'windDirection'} field={'windDirection'} body={bodyWindDirection}/>
            <Column key={'windSpeed'} field={'windSpeed'} body={bodyWindSpeed} style={{fontWeight: "bold"}}/>
            <Column key={'windSpeedMax'} field={'windSpeedMax'} body={bodyWindSpeedMax}/>
            <Column key={'windChillC'} field={'windChillC'} body={bodyWindChillCF}/>
            <Column key={'windChillMaxC'} field={'windChillMaxC'} body={bodyWindChillMaxCF}/>
        </DataTable>;

    // let visibility = stats['visibility'];
    // let uvIndex = stats['uvIndex'];
    // let airPressure = stats['airPressure'];
    // let humidity = stats['humidity'];
    // let airTemp = stats['airTemperature'];
    // let windDir = stats['windDirection'];
    // let windSpeed = stats['windSpeed'];
    // let windSpeedMax = stats['windSpeedMax'];
    // let waterLevel = stats['waterLevel'];
    // let waterLevelEH2000 = stats['waterLevelEH2000'];
    // let waterTemp = stats['waterTemperature'];
    // let windChillC = stats['windChillC'];
    // let windChillF = stats['windChillF'];
    // let windChillMaxC = stats['windChillMaxC'];
    // let windChillMaxF = stats['windChillMaxF'];

    let dataTableAveragesReactStrap =
        <Table size={"sm"} striped={true} responsive={true} style={{textAlign: "left"}}>
            <thead>
            <tr>
                <td><b>{t('generic.unit')}</b></td>
                <td>{t('station.full.visibility')}</td>
                <td>{t('station.full.uvIndex')}</td>
                <td>{t('station.full.airPressure')}</td>
                <td>{t('station.full.relativeHumidity')}</td>
                <td>{t('station.full.airTemperature')}</td>
                <td>{t('station.full.windDirection')}</td>
                <td>{t('station.full.windSpeed')}</td>
                <td>{t('station.full.windSpeedMax')}</td>
                <td>{t('station.full.waterLevel')}</td>
                <td>{t('station.full.waterLevelEh2000')}</td>
                <td>{t('station.full.waterTemperature')}</td>
                <td>{t('station.full.windChillC')}</td>
                <td>{t('station.full.windChillF')}</td>
                <td>{t('station.full.windChillMaxC')}</td>
                <td>{t('station.full.windChillMaxF')}</td>
            </tr>
            </thead>
            <tbody>
            {/*<tr>*/}
            {/*    <td><b>{t('generic.min')}</b></td>*/}
            {/*    <td>{h.getMin(visibility)}</td>*/}
            {/*    <td>{h.getMin(uvIndex)}</td>*/}
            {/*    <td>{h.getMin(airPressure)}</td>*/}
            {/*    <td>{h.getMin(humidity)}</td>*/}
            {/*    <td>{h.getMin(airTemp)}</td>*/}
            {/*    <td>{h.getMin(windDir)}</td>*/}
            {/*    <td>{h.getMin(windSpeed)}</td>*/}
            {/*    <td>{h.getMin(windSpeedMax)}</td>*/}
            {/*    <td>{h.getMin(waterLevel)}</td>*/}
            {/*    <td>{h.getMin(waterLevelEH2000)}</td>*/}
            {/*    <td>{h.getMin(waterTemp)}</td>*/}
            {/*    <td>{h.getMin(windChillC)}</td>*/}
            {/*    <td>{h.getMin(windChillF)}</td>*/}
            {/*    <td>{h.getMin(windChillMaxC)}</td>*/}
            {/*    <td>{h.getMin(windChillMaxF)}</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*    <td><b>{t('generic.max')}</b></td>*/}
            {/*    <td>{h.getMax(visibility)}</td>*/}
            {/*    <td>{h.getMax(uvIndex)}</td>*/}
            {/*    <td>{h.getMax(airPressure)}</td>*/}
            {/*    <td>{h.getMax(humidity)}</td>*/}
            {/*    <td>{h.getMax(airTemp)}</td>*/}
            {/*    <td>{h.getMax(windDir)}</td>*/}
            {/*    <td>{h.getMax(windSpeed)}</td>*/}
            {/*    <td>{h.getMax(windSpeedMax)}</td>*/}
            {/*    <td>{h.getMax(waterLevel)}</td>*/}
            {/*    <td>{h.getMax(waterLevelEH2000)}</td>*/}
            {/*    <td>{h.getMax(waterTemp)}</td>*/}
            {/*    <td>{h.getMax(windChillC)}</td>*/}
            {/*    <td>{h.getMax(windChillF)}</td>*/}
            {/*    <td>{h.getMax(windChillMaxC)}</td>*/}
            {/*    <td>{h.getMax(windChillMaxF)}</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*    <td><b>{t('generic.average')}</b></td>*/}
            {/*    <td>{h.getAvg(visibility)}</td>*/}
            {/*    <td>{h.getAvg(uvIndex)}</td>*/}
            {/*    <td>{h.getAvg(airPressure)}</td>*/}
            {/*    <td>{h.getAvg(humidity)}</td>*/}
            {/*    <td>{h.getAvg(airTemp)}</td>*/}
            {/*    <td>{h.getAvg(windDir)}</td>*/}
            {/*    <td>{h.getAvg(windSpeed)}</td>*/}
            {/*    <td>{h.getAvg(windSpeedMax)}</td>*/}
            {/*    <td>{h.getAvg(waterLevel)}</td>*/}
            {/*    <td>{h.getAvg(waterLevelEH2000)}</td>*/}
            {/*    <td>{h.getAvg(waterTemp)}</td>*/}
            {/*    <td>{h.getAvg(windChillC)}</td>*/}
            {/*    <td>{h.getAvg(windChillF)}</td>*/}
            {/*    <td>{h.getAvg(windChillMaxC)}</td>*/}
            {/*    <td>{h.getAvg(windChillMaxF)}</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*    <td><b>{t('generic.count')}</b></td>*/}
            {/*    <td>{h.getCount(visibility)}</td>*/}
            {/*    <td>{h.getCount(uvIndex)}</td>*/}
            {/*    <td>{h.getCount(airPressure)}</td>*/}
            {/*    <td>{h.getCount(humidity)}</td>*/}
            {/*    <td>{h.getCount(airTemp)}</td>*/}
            {/*    <td>{h.getCount(windDir)}</td>*/}
            {/*    <td>{h.getCount(windSpeed)}</td>*/}
            {/*    <td>{h.getCount(windSpeedMax)}</td>*/}
            {/*    <td>{h.getCount(waterLevel)}</td>*/}
            {/*    <td>{h.getCount(waterLevelEH2000)}</td>*/}
            {/*    <td>{h.getCount(waterTemp)}</td>*/}
            {/*    <td>{h.getCount(windChillC)}</td>*/}
            {/*    <td>{h.getCount(windChillF)}</td>*/}
            {/*    <td>{h.getCount(windChillMaxC)}</td>*/}
            {/*    <td>{h.getCount(windChillMaxF)}</td>*/}
            {/*</tr>*/}
            </tbody>
        </Table>;

    let thisStateTabs = []; // this.state.tabs;
    let [activeItem, setActiveItem] = []; // this.state.activeItem
    // let thisStateTimestamp = ''; // this.state.timestamp


    return (
        <div className="App">
            <SelectButton value={i18n.language} options={langSelectItems} onChange={(e) => changeLanguage(e.value)}
                          style={{float: "right"}}/>
            <div id="floating-box-main" className="floating-box">
                <TabMenu id={"navigation-tabs"} model={thisStateTabs} activeItem={activeItem}
                         onTabChange={(e) => setActiveItem(e.value)}/>
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
                        <br/>
                        <h2>{t('generic.averages')}:</h2>
                        {dataTableAveragesReactStrap}
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Loader = () => (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo"/>
        <div>loading...</div>
    </div>
);
// export default App;
export default function App() {
    return (
        <Suspense fallback={<Loader/>}>
            <Page/>
        </Suspense>
    );
}
