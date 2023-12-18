import { fetchCircuits, fetchStops } from './modules/appelModule.mjs';
import { cleanCircuits, cleanStops } from './modules/cleanStop.js';
// Appel a la base
// fetch('https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_tan-arrets/records?limit=100&route_type=Bus')
//     .then((response) => response.json())
//     .then((json) => console.log(json.results));


// fetch('https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_tan-circuits/records?limit=20')
//     .then((response) => response.json())
//     .then((json) => data = (json.results[0].shape.geometry.coordinates[0][0]));
var macarte = null;
var lat = 47.218298993629915;
var lon = -1.5517514314893301;
initMap()


let data = fetchCircuits();
let data2 = fetchStops();
cleanStops(L, macarte); 
cleanCircuits();
let dataResult = data.then(
    results => {
        console.log(results)
        // Retourne un tableau avec pour chaque index une ligne de transport
        var dataLigne = results.map(element => {
            return (element)
        })
        var newArray;
        dataLigne.forEach(element => {
            // console.log(element);
            const tabToConvert = element.shape.geometry.coordinates;
            // console.log(tabToConvert)
            const tabConverted = flatAndSort(tabToConvert);
            [...newArray] = tabConverted;


        });
        // console.log(newArray)
        //const newArray = flatAndSort(dataLigne[0].shape.geometry.coordinates)
        //console.log(dataLigne[0])

        // dataLigne.forEach((element, index) => {
        //     const arretArray = (element.shape.geometry.coordinates.flat());
        //     const arretArrayClean = [...new Set(arretArray.map(JSON.stringify))].map(JSON.parse);
        //     console.log(arretArrayClean)
        //     // 
        //     const sortedCoordinates = arretArrayClean.sort((a, b) => {
        //         // First, compare by longitude
        //         if (a[0] !== b[0]) {
        //             return a[0] - b[0];
        //         }
        //         // If longitude is the same, compare by latitude
        //         return a[1] - b[1];
        //     });
        //     const newArray = sortedCoordinates.filter((element, index) => index % 2 === 0);
        //     console.log(newArray)
        //console.log(newArray)

        newArray.forEach((element) => L.marker([element[1], element[0]]).addTo(macarte));
    });

function flatAndSort(baseArray) {
    //console.log("hello")
    var finalArray;

    // Probablement pas du tout efficace comme methode, ça a l'air de faire pleins d'itérations inutiles
    baseArray.forEach((element, index) => {
        const arretArray = (baseArray.flat());
        const arretArrayClean = [...new Set(arretArray.map(JSON.stringify))].map(JSON.parse);
        //console.log(arretArrayClean)
        // 
        const sortedCoordinates = arretArrayClean.sort((a, b) => {
            // First, compare by longitude
            if (a[0] !== b[0]) {
                return a[0] - b[0];
            }
            // If longitude is the same, compare by latitude
            return a[1] - b[1];
        });
        finalArray = sortedCoordinates.filter((element, index) => index % 2 === 0);
        //console.log(finalArray) // Pk c'est console log 36 fois ?
        // return finalArray;
        // newArray.forEach((element) => L.marker([element[1], element[0]]).addTo(macarte));
    })
    //console.log(baseArray, finalArray)
    return finalArray;
};

// Init la map
function initMap() {
    //console.log(lat, lon)
    macarte = L.map('map').setView([lat, lon], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
    //console.log(macarte)
    //var marker = L.marker([lat, lon]).addTo(macarte);
};

// Load la page
// window.onload = function () {
//     initMap();
// }