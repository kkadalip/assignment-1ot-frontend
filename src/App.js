import React, {useState, useEffect, Suspense} from 'react'; // Component
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {ColumnGroup} from 'primereact/columngroup';
import {Row} from 'primereact/row';
import {DataService} from './service/DataService';
import {ProgressSpinner} from 'primereact/progressspinner';
import {SelectButton} from 'primereact/selectbutton';
import {TabMenu} from 'primereact/tabmenu';
import {useTranslation} from 'react-i18next';
import i18n from './translations/i18n';
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
                <Column header="Geo" colSpan={2}/>
                <Column header="Info" colSpan={5}/>
                <Column header="Air" colSpan={3}/>
                <Column header="Water" colSpan={3}/>
                <Column header="Wind" colSpan={6}/>
            </Row>
            <Row>
                <Column key={'name'} field={'name'} header={'Name'} sortable="true"/>
                <Column key={'longitude'} field={'longitude'} header={'Longitute'} sortable="true"/>
                <Column key={'latitude'} field={'latitude'} header={'Latitude'} sortable="true"/>
                <Column key={'phenomenon'} field={'phenomenon'} header={'Phenomenon'} sortable="true"/>
                <Column key={'visibility'} field={'visibility'} header={'Visibility (km)'} sortable="true"/>
                <Column key={'precipitations'} field={'precipitations'} header={'Precipitations'} sortable="true"/>
                <Column key={'uvIndex'} field={'uvIndex'} header={'UV index'} sortable="true"/>
                <Column key={'wmoCode'} field={'wmoCode'} header={'WMO code'} sortable="true"/>
                <Column key={'airPressure'} field={'airPressure'} header={'Pressure (hPa)'} sortable="true"/>
                <Column key={'relativeHumidity'} field={'relativeHumidity'} header={'Relative humidity (%)'}
                        sortable="true"/>
                <Column field={'airTemperature'} header={'Temperature'} sortable="true"/>
                <Column key={'waterLevel'} field={'waterLevel'} header={'Level (cm)'} sortable="true"/>
                <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} header={'Level EH2000 (cm)'}
                        sortable="true"/>
                <Column key={'waterTemperature'} field={'waterTemperature'} header={'Temp (°C)'} sortable="true"/>
                <Column key={'windDirection'} field={'windDirection'} header={'Direction'} sortable="true"/>
                <Column key={'windSpeed'} field={'windSpeed'} header={'Speed'} sortable="true"/>
                <Column key={'windSpeedMax'} field={'windSpeedMax'} header={'Speed max'} sortable="true"/>
                <Column key={'windChillC'} field={'windChillC'} header={'Chill'} sortable="true"/>
                <Column key={'windChillMaxC'} field={'windChillMaxC'} header={'Chill Max'} sortable="true"/>
                <Column key={'windChillMaxF'} field={'windChillMaxF'} header={'Chill Max'} sortable="true"/>
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

    const bodyAirTemp = (rowData) => {
        return combine(rowData.airTemperature, '°C');
    };
    const bodyWindSpeed = (rowData) => {
        return combine(rowData.windSpeed, 'm/s');
    };

    const bodyWindChillCF = (rowData) => {
        if (rowData.windChillC) {
            return <span>{rowData.windChillC}{'°C'} ({rowData.windChillF}{'F'})</span>
        }
        return <span/>;
    };
    const bodyWindChillMaxC = (rowData) => {
        return combine(rowData.windChillMaxC, '°C');
    };
    const bodyWindChillMaxF = (rowData) => {
        return combine(rowData.windChillMaxF, 'F');
    };

    let dataTablePrimeReact =
        <DataTable
            headerColumnGroup={headerGroup}
            footerColumnGroup={footerGroup}
            value={stations} resizableColumns={true}
            scrollable={true} scrollHeight="400px" emptyMessage={"No data found, try again later."}>
            <Column key={'name'} field={'name'}/>
            <Column key={'longitude'} field={'longitude'}/>
            <Column key={'latitude'} field={'latitude'}/>
            <Column key={'phenomenon'} field={'phenomenon'}/>
            <Column key={'visibility'} field={'visibility'}/>
            <Column key={'precipitations'} field={'precipitations'}/>
            <Column key={'uvIndex'} field={'uvIndex'}/>
            <Column key={'wmoCode'} field={'wmoCode'}/>
            <Column key={'airPressure'} field={'airPressure'}/>
            <Column key={'relativeHumidity'} field={'relativeHumidity'}/>
            <Column key={'airTemperature'} field={'airTemperature'} body={bodyAirTemp} style={{fontWeight: "bold"}}/>
            <Column key={'waterLevel'} field={'waterLevel'}/>
            <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'}/>
            <Column key={'waterTemperature'} field={'waterTemperature'}/>
            <Column key={'windDirection'} field={'windDirection'}/>
            <Column key={'windSpeed'} field={'windSpeed'} body={bodyWindSpeed} style={{fontWeight: "bold"}}/>
            <Column key={'windSpeedMax'} field={'windSpeedMax'}/>
            <Column key={'windChillC'} field={'windChillC'} body={bodyWindChillCF} style={{fontWeight: "bold"}}/>
            <Column key={'windChillMaxC'} field={'windChillMaxC'} body={bodyWindChillMaxC}/>
            <Column key={'windChillMaxF'} field={'windChillMaxF'} body={bodyWindChillMaxF}/>
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
