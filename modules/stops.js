var busIcon = L.icon({
    iconUrl:
        "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_charte-graphique-tan/files/c05eb5e694f6d19992e1d181656c7c1a",
    iconSize: [5, 5],
    iconAnchor: [5, 5],
    popupAnchor: [-2.5, -4],
});

finalCoordinates.forEach(element => {
    L.marker([element[0], element[1]], {
        icon: busIcon
    }).addTo(macarte)
}); 

macarte.eachLayer(function (marker) {
    marker.on({
        mouseover: function () {
            //console.log(marker)
            if (stop.wheelchair_boarding != null) {
                var imgMobiliteHtml =
                    '<img src="https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_charte-graphique-tan/files/548aa8788b557dd9827c3f86f9407ba5" alt="Arrêt accsessible au personnes en fauteuil roulant." width="20" height="20"/>';
            } else {
                var imgMobiliteHtml = "";
            }
            //console.log("over marker");
            this.bindPopup(
                "<p>" +
                    stop.stop_name +
                    imgMobiliteHtml +
                    '<br /></p><img src="https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_charte-graphique-tan/files/c05eb5e694f6d19992e1d181656c7c1a" alt="Ligne de bus." width="30" height="30" />',
                { closeButton: false }
            );
            this.openPopup(L.latLng(this.lat, this.lon));
        },
    });
    marker.on({
        mouseout: function () {
            //console.log("out marker");
            this.closePopup();
        },
    });
});