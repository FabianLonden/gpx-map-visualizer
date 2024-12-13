document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const fileInput = document.getElementById("gpxFile");
    const file = fileInput.files[0];  // Get the first file

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
        
        // Create the map
        const map = L.map('map').setView([51.505, -0.09], 13);  // Default to some coordinates, will be updated later
        
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
            map.fitBounds(e.target.getBounds());  // Zoom and center map to fit the GPX track
        }).addTo(map);
    };

    // Read the file content as text
    reader.readAsText(file);  // Read the file as text (GPX file)
});
