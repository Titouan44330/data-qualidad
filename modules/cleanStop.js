import { fetchStops, fetchCircuits } from "./appelModule.mjs";

export async function cleanStops() {
    let stopsUnclean = await fetchStops();

    const cleanedData = stopsUnclean.map(item => ({
        stop_id: item.stop_id,
        stop_name: item.stop_name,
        stop_coordinates: item.stop_coordinates
    }));

}

// Voir sur chat gpt si tout s'éxecute bien dans le bon ordre

export async function cleanCircuits() {
    let stopsUnclean = await fetchCircuits();
    console.log('les lignes non clean :', stopsUnclean)
    const cleanedData = stopsUnclean.map(item => ({
        route_id: item.route_id,
        route_short_name: item.route_short_name,
        route_long_name: item.route_long_name,
        route_type: item.route_type,
        route_color: item.route_color,
        allStops: item.shape
    }));
    console.log('les lignes clean :', cleanedData)
    cleanedData.forEach((element, index) => {
        console.log(index)
        // console.log(element);
        const tabToConvert = element.allStops.geometry.coordinates;
        // console.log(tabToConvert)
        const tabConverted = flatAndSort(tabToConvert);
        cleanedData[index].allStops = tabConverted;
    });

    console.log('liste des lignes :', cleanedData);
}

function flatAndSort(baseArray) {
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
    return finalArray;
};