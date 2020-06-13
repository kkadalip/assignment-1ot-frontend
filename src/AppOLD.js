import React, {useState, Component, Suspense} from 'react';
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

const debug = false;

// class MyComponent extends Component {
//     constructor(props) {
//         super(props);
//
//         const lng = localStorage.getItem('SelectedLanguage') || 'en';
//         i18n.changeLanguage(lng);
//
//         if (debug) {
//             console.log("i18n language is " + i18n.language)
//         }

//         //useTranslation.setI18n(i18n);
//     }
//
//     componentDidMount() {
//         DataService.getData().then(data => this.setState({
//             loading: false,
//             stations: h.getStations(data),
//             statistics: h.getStatistics(data),
//             visibility: h.getStatisticsVisibility(data),
//             timestamp: h.getTimestamp(data)
//         })).then(data => h.getStatisticsAirPressure(data));
//     }
//
// }

function Page() {
    const loading = useState(true);
    const stations = useState([]);
    const statistics = useState(
        {
            visibility: {},
            uvIndex: {},
            airPressure: {},
            humidity: {},
            airTemperature: {},
            windDirection: {},
            windSpeed: {},
            waterLevel: {},
            waterLevelEH2000: {},
            waterTemperature: {},
            windSpeedMax: {},
            windChillC: {},
            windChillMaxC: {},
            windChillF: {},
            windChillMaxF: {}
        }
    );
    const visibility = useState([]);
    const airPressure = useState([]);
    const tabs = useState(h.getTabs());
    const timestamp = useState("");

    const {t, i18n} = useTranslation();
    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };
    // const {t, i18n} = this.props;
    // const changeLanguage = (lng) => {
    //     i18n.changeLanguage(lng);
    //     this.setState({tabs: h.getTabs()});
    //     localStorage.setItem('SelectedLanguage', lng);
    // };
    const langSelectItems = [
        {label: 'English', value: 'en'},
        {label: 'Eesti', value: 'et'}
    ];

    //if (debug) console.log("State is: " + JSON.stringify(this.state));
    const isLoading = this.state.loading;
    let headerRow = <Row>
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
        <Column key={'airTemperature'} field={'airTemperature'} header={'Temperature (°C)'} sortable="true"/>
        <Column key={'waterLevel'} field={'waterLevel'} header={'Level (cm)'} sortable="true"/>
        <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'} header={'Level EH2000 (cm)'} sortable="true"/>
        <Column key={'waterTemperature'} field={'waterTemperature'} header={'Temp (°C)'} sortable="true"/>
        <Column key={'windDirection'} field={'windDirection'} header={'Direction'} sortable="true"/>
        <Column key={'windSpeed'} field={'windSpeed'} header={'Speed (m/s)'} sortable="true"/>
        <Column key={'windSpeedMax'} field={'windSpeedMax'} header={'Speed max'} sortable="true"/>
        <Column key={'windChillC'} field={'windChillC'} header={'Chill (C)'} sortable="true"/>
        <Column key={'windChillF'} field={'windChillF'} header={'Chill (F)'} sortable="true"/>
        <Column key={'windChillMaxC'} field={'windChillMaxC'} header={'Chill Max (C)'} sortable="true"/>
        <Column key={'windChillMaxF'} field={'windChillMaxF'} header={'Chill Max (F)'} sortable="true"/>
    </Row>;

    let headerGroup =
        <ColumnGroup>
            <Row>
                <Column header="" colSpan={1}/>
                <Column header="Geo" colSpan={2}/>
                <Column header="Info" colSpan={5}/>
                <Column header="Air" colSpan={3}/>
                <Column header="Water" colSpan={3}/>
                <Column header="Wind" colSpan={7}/>
            </Row>
            {headerRow}
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

    let dataTablePrimeReact =
        <DataTable value={this.state.stations} resizableColumns={true} headerColumnGroup={headerGroup}
                   footerColumnGroup={footerGroup}
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
            <Column key={'airTemperature'} field={'airTemperature'} style={{fontWeight: "bold"}}/>
            <Column key={'waterLevel'} field={'waterLevel'}/>
            <Column key={'waterLevelEh2000'} field={'waterLevelEh2000'}/>
            <Column key={'waterTemperature'} field={'waterTemperature'}/>
            <Column key={'windDirection'} field={'windDirection'}/>
            <Column key={'windSpeed'} field={'windSpeed'} style={{fontWeight: "bold"}}/>
            <Column key={'windSpeedMax'} field={'windSpeedMax'}/>
            <Column key={'windChillC'} field={'windChillC'} style={{fontWeight: "bold"}}/>
            <Column key={'windChillF'} field={'windChillF'}/>
            <Column key={'windChillMaxC'} field={'windChillMaxC'}/>
            <Column key={'windChillMaxF'} field={'windChillMaxF'}/>
        </DataTable>;
    let stats = this.state.statistics;
    let visibility = stats['visibility'];
    let uvIndex = stats['uvIndex'];
    let airPressure = stats['airPressure'];
    let humidity = stats['humidity'];
    let airTemp = stats['airTemperature'];
    let windDir = stats['windDirection'];
    let windSpeed = stats['windSpeed'];
    let windSpeedMax = stats['windSpeedMax'];
    let waterLevel = stats['waterLevel'];
    let waterLevelEH2000 = stats['waterLevelEH2000'];
    let waterTemp = stats['waterTemperature'];
    let windChillC = stats['windChillC'];
    let windChillF = stats['windChillF'];
    let windChillMaxC = stats['windChillMaxC'];
    let windChillMaxF = stats['windChillMaxF'];

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
            <tr>
                <td><b>{t('generic.min')}</b></td>
                <td>{h.getMin(visibility)}</td>
                <td>{h.getMin(uvIndex)}</td>
                <td>{h.getMin(airPressure)}</td>
                <td>{h.getMin(humidity)}</td>
                <td>{h.getMin(airTemp)}</td>
                <td>{h.getMin(windDir)}</td>
                <td>{h.getMin(windSpeed)}</td>
                <td>{h.getMin(windSpeedMax)}</td>
                <td>{h.getMin(waterLevel)}</td>
                <td>{h.getMin(waterLevelEH2000)}</td>
                <td>{h.getMin(waterTemp)}</td>
                <td>{h.getMin(windChillC)}</td>
                <td>{h.getMin(windChillF)}</td>
                <td>{h.getMin(windChillMaxC)}</td>
                <td>{h.getMin(windChillMaxF)}</td>
            </tr>
            <tr>
                <td><b>{t('generic.max')}</b></td>
                <td>{h.getMax(visibility)}</td>
                <td>{h.getMax(uvIndex)}</td>
                <td>{h.getMax(airPressure)}</td>
                <td>{h.getMax(humidity)}</td>
                <td>{h.getMax(airTemp)}</td>
                <td>{h.getMax(windDir)}</td>
                <td>{h.getMax(windSpeed)}</td>
                <td>{h.getMax(windSpeedMax)}</td>
                <td>{h.getMax(waterLevel)}</td>
                <td>{h.getMax(waterLevelEH2000)}</td>
                <td>{h.getMax(waterTemp)}</td>
                <td>{h.getMax(windChillC)}</td>
                <td>{h.getMax(windChillF)}</td>
                <td>{h.getMax(windChillMaxC)}</td>
                <td>{h.getMax(windChillMaxF)}</td>
            </tr>
            <tr>
                <td><b>{t('generic.average')}</b></td>
                <td>{h.getAvg(visibility)}</td>
                <td>{h.getAvg(uvIndex)}</td>
                <td>{h.getAvg(airPressure)}</td>
                <td>{h.getAvg(humidity)}</td>
                <td>{h.getAvg(airTemp)}</td>
                <td>{h.getAvg(windDir)}</td>
                <td>{h.getAvg(windSpeed)}</td>
                <td>{h.getAvg(windSpeedMax)}</td>
                <td>{h.getAvg(waterLevel)}</td>
                <td>{h.getAvg(waterLevelEH2000)}</td>
                <td>{h.getAvg(waterTemp)}</td>
                <td>{h.getAvg(windChillC)}</td>
                <td>{h.getAvg(windChillF)}</td>
                <td>{h.getAvg(windChillMaxC)}</td>
                <td>{h.getAvg(windChillMaxF)}</td>
            </tr>
            <tr>
                <td><b>{t('generic.count')}</b></td>
                <td>{h.getCount(visibility)}</td>
                <td>{h.getCount(uvIndex)}</td>
                <td>{h.getCount(airPressure)}</td>
                <td>{h.getCount(humidity)}</td>
                <td>{h.getCount(airTemp)}</td>
                <td>{h.getCount(windDir)}</td>
                <td>{h.getCount(windSpeed)}</td>
                <td>{h.getCount(windSpeedMax)}</td>
                <td>{h.getCount(waterLevel)}</td>
                <td>{h.getCount(waterLevelEH2000)}</td>
                <td>{h.getCount(waterTemp)}</td>
                <td>{h.getCount(windChillC)}</td>
                <td>{h.getCount(windChillF)}</td>
                <td>{h.getCount(windChillMaxC)}</td>
                <td>{h.getCount(windChillMaxF)}</td>
            </tr>
            </tbody>
        </Table>;

    let dataTableReactStrap =
        <Table hover bordered={false} size={"sm"} striped={true} responsive={true} style={{textAlign: "left"}}>
            <thead style={{fontWeight: "bolder"}}>
            <tr>
                <td>{t('station.full.name')}<br/>{t('station.full.wmoCode')}</td>
                <td>{t('station.full.longitude')}<br/>{t('station.full.latitude')}</td>
                <td>{t('station.full.phenomenon')}</td>
                <td/>
                <td>{t('generic.weather')}</td>
                <td>{t('generic.air')}</td>
                <td>{t('generic.water')}</td>
                <td>{t('generic.wind')}</td>
                <td>{t('generic.windChill')}&nbsp;(Max)</td>
            </tr>

            </thead>
            <tbody>
            {this.state.stations.map(function (item, key) {
                return (
                    <tr key={key}>
                        <td><b>{item.name}</b><br/>{item.wmoCode}</td>
                        <td>{item.longitude}<br/>{item.latitude}</td>
                        <td>
                            <div style={{display: "inline-block"}}>
                                {h.getWeatherEnToEtArrayValue(item.phenomenon, i18n.language)}
                            </div>
                        </td>
                        <td>
                            <div className="icon-wrap" style={{float: "left"}}>
                                <i className={"wi " + h.getWeatherIconArrayValue(item.phenomenon)}/>
                            </div>
                        </td>
                        <td>
                            {h.formatData(t('station.min.visibility'), item.visibility, "km")}
                            {h.formatData(t('station.min.precipitations'), item.precipitations, "mm")}
                            {h.formatData(t('station.min.uvIndex'), item.uvIndex, "")}
                        </td>
                        <td>
                            {h.formatData(t('generic.pressure'), item.airPressure, "hPa")}
                            {h.formatData(t('generic.humidity'), item.relativeHumidity, "%")}
                            {h.formatData(t('generic.temp'), item.airTemperature, "°C")}
                        </td>
                        <td>
                            {h.formatData(t('station.min.waterLevel'), item.waterLevel, "mm")}
                            {h.formatData(t('station.min.waterLevelEh2000'), item.waterLevelEh2000, "mm")}
                            {h.formatData(t('generic.temp'), item.waterTemperature, "°C")}
                        </td>
                        <td>
                            {h.formatData(t('station.min.windDirection'), item.windDirection, "°")}
                            {h.formatData(t('station.min.windSpeed'), item.windSpeed, "m/s")}
                            {h.formatData(t('station.min.windSpeed') + " (MAX)", item.windSpeedMax, "m/s")}
                        </td>
                        <td>
                            {h.getWindChillDisplay(item.windChillC, item.windChillMaxC, "°C")}<br/>
                            {h.getWindChillDisplay(item.windChillF, item.windChillMaxF, "F")}
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>;

    return (
        <div className="App">
            <SelectButton value={i18n.language} options={langSelectItems} onChange={(e) => changeLanguage(e.value)}
                          style={{float: "right"}}/>
            <div id="floating-box-main" className="floating-box">
                <TabMenu id={"navigation-tabs"} model={this.state.tabs} activeItem={this.state.activeItem}
                         onTabChange={(e) => this.setState({activeItem: e.value})}/>
                <div className={"title-and-main"}>
                    <header>
                        <p className="unselectable title-big">{t('title.main')}</p>
                    </header>
                    <div hidden={!isLoading}>
                        <ProgressSpinner/>
                    </div>
                    <div hidden={isLoading}>
                        <br/>
                        <h2>{t('generic.dataset')} <b>{h.convertTimestampToDate(this.state.timestamp)}</b>:</h2>
                        {dataTablePrimeReact}
                        <br/>
                        <h2>{t('generic.averages')}:</h2>
                        {dataTableAveragesReactStrap}
                        <br/>
                        <h2>{t('generic.datasetOverview')}:</h2>
                        {dataTableReactStrap}
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

export default function App() {
    return (
        <Suspense fallback={<Loader/>}>
            <Page/>
        </Suspense>
    );
}