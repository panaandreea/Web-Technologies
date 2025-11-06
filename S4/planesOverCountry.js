import fetch from "node-fetch";

async function getObjectFromUrl(url) {
    const response = await fetch(url);
    const text = await response.text();
    return JSON.parse(text);
}

async function getCountryBounds(country) {
    const object = await getObjectFromUrl(`https://nominatim.openstreetmap.org/search?country=${country}&format=json`);
    return {
        minLatitude: object[0].boundingbox[0],
        maxLatitude: object[0].boundingbox[1],
        minLongitude: object[0].boundingbox[2],
        maxLongitude: object[0].boundingbox[3]
    };
}

async function getPlanesOverCountry(country) {
    const bounds = await getCountryBounds(country);

    const url = `https://opensky-network.org/api/states/all?lamin=${bounds.minLatitude}&lomin=${bounds.minLongitude}&lamax=${bounds.maxLatitude}&lomax=${bounds.maxLongitude}`;

    const data = await getObjectFromUrl(url);

    console.log(`Avioane deasupra ${country}:`);
    if (data.states) {
        console.log(`Număr total: ${data.states.length}`);
        console.log("Exemple:", data.states.slice(0, 5)); // primele 5 avioane
    } else {
        console.log("Nu s-au găsit avioane sau cererea a fost blocată.");
    }
}

getPlanesOverCountry("Romania");
