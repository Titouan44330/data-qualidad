
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

async function fetchData() {
    try {
        const response = await fetch('https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_tan-circuits/records?limit=20');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await response.json();
        //console.log(json)
        const data = json.results
        //.forEach((element, index) => {
        //     return (element.shape.geometry.coordinates[index])
        // });
        //json.results[0].shape.geometry.coordinates[0];
        //console.log(data)
        return data;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error; // You can rethrow the error if needed
    }
}
let data = fetchData();
//console.log(macarte)
dataResult = data.then(
    results => {
        //console.log(results)
        // Retourne un tableau avec pour chaque index une ligne de transport
        var dataLigne = results.map(element => {
            console.log(element)
            return (element)
        })
        console.log(dataLigne)
        dataLigne.forEach((element, index) => {
            (element.shape.geometry.coordinates[0].forEach((element) => L.marker([element[1], element[0]]).addTo(macarte)))
            //L.marker([element.shape.geometry.coordinates[1], element[index][0]]).addTo(macarte);
        });

    })



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
}

// Load la page
// window.onload = function () {
//     initMap();
// };