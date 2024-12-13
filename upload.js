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

    // Show the file name in the fileInfo div (optional)
    document.getElementById("fileInfo").textContent = `Selected file: ${file.name}`;

    // Here, you can either process the file or upload it to a server
    // For demonstration purposes, we'll read the file content and log it to the console.
    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result;
        console.log("File Content: ", fileContent); // Here, you can parse or display the GPX content
    };

    reader.readAsText(file); // Read the file as text
});
