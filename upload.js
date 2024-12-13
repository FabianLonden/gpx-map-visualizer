document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission and page reload

    const fileInput = document.getElementById("gpxFile");
    const file = fileInput.files[0];  // Get the first selected file

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const fileType = file.type;
    if (fileType !== "application/gpx+xml" && !file.name.endsWith(".gpx")) {
        alert("Please upload a valid GPX file.");
        return;
    }

    document.getElementById("fileInfo").textContent = `Selected file: ${file.name}`;

    // Create a FileReader to read the file
    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result;

        // Log the GPX file content to the console for debugging
        console.log(fileContent);

        // Initialize the map
        const map = L.map('map').setView([51.505, -0.09], 13);  // Set the map's default view

        // Add a tile layer to the map (OpenStreetMap tiles)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add the GPX file to the map using the Leaflet-GPX plugin
        const gpx = new L.GPX(e.target.result, {
            async: true,  // Load GPX file asynchronously
            marker_options: {
                startIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
                endIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
                shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png'
            }
        }).on('loaded', function(e) {
            // Once the GPX track is loaded, zoom and fit the map to the track
            map.fitBounds(e.target.getBounds());
            console.log("Track loaded and bounds adjusted.");
        }).addTo(map);
    };

    // Read the file as text (GPX file is XML)
    reader.readAsText(file);
});
