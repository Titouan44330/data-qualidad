export async function fetchCircuits() {
    try {
        const response = await fetch('https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_tan-circuits/records?limit=10');
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

export async function fetchStops() {
    try {
        const response = await fetch('https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_tan-arrets/records?limit=100');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const data = json.results
        return data;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error; // You can rethrow the error if needed
    }
}