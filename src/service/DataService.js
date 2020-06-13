import axios from "axios/index";
//
// const debug = false;
//
// export class DataService {
//     static getData() {
//         return axios.get('http://localhost:8090/stations')
//             .then(res => res.data[res.data.length - 1]).catch((err) => {
//                 if (debug) {
//                     console.error(err)
//                 }
//                 console.log("Could not fetch data");
//             })
//     };
// }