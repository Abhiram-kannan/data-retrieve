import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase, ref, push, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const appsettings = {
    databaseURL: "https://sample-7ef53-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appsettings)
const database = getDatabase(app)

// Function to get location data from Firebase based on bus name
function getLocationByBusName(busName) {
    const busesRef = ref(database, "LIST OF BUSES");
    
    // Query Firebase to find the bus node with the specified name
    const query = orderByChild(busesRef, 'bus_name').equalTo(busName);

    get(query).then((snapshot) => {
        if (snapshot.exists()) {
            const busData = snapshot.val();
            const latitude = busData.latitude;
            const longitude = busData.longitude;

        } else {
            console.error("Bus not found in the database.");
        }
    }).catch((error) => {
        console.error("Error fetching bus location:", error);
    });
}
document.getElementById("location").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
// Call getLocationByBusName with the desired bus name
getLocationByBusName("bus");