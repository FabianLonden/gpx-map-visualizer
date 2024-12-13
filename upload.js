document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    const fileInput = document.getElementById("gpxFile");
    const file = fileInput.files[0];  // Get the first selected file

    // Check if a file is selected
    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    // Check if the selected file is a GPX file
    const fileType = file.type;
    if (fileType !== "application/gpx+xml" && !file.name.endsWith(".gpx")) {
        alert("Please upload a valid GPX file.");
        return;
    }

    // Show the file name in the fileInfo div
    document.getElementById("fileInfo").textContent = `Selected file: ${file.name}`;

    // Create a FileReader to read the file content
    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result;

        // Log the GPX file content to the console to verify it's being read correctly
        console.log(fileContent); // Check if this logs the GPX XML data

        // Create the map
        const map = L.map('map').setView([51.505, -0.09], 13);  // Default view in case GPX file is empty or fails

        // Add a tile layer (using OpenStreetMap here)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Parse the GPX file and add it to the map using Leaflet-GPX plugin
        const gpx = new L.GPX(e.target.result, {
            async: true,  // Load the GPX file asynchronously
            marker_options: {
                startIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
                endIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
                shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png'
            }
        }).on('loaded', function(e) {
            // Zoom and center map to fit the bounds of the GPX track
            map.fitBounds(e.target.getBounds());
            console.log('GPX track loaded', e.target.getBounds());  // Log the loaded track bounds
        }).addTo(map);
    };

    // Read the file content as text
    reader.readAsText(file);  // Read the file as text (GPX file)
});
