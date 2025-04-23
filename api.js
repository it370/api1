document.addEventListener('DOMContentLoaded', () => {
    // Get the pathname from the URL
    const path = window.location.pathname;
    // Get query parameters
    const searchParams = new URLSearchParams(window.location.search);
    
    // Parse the path to extract the filename
    // Expected format: /reponame/filename
    const pathParts = path.split('/').filter(part => part !== '');
    
    // Function to return JSON response
    const sendJsonResponse = (data) => {
        // Clear document content
        document.querySelector('body').innerHTML = '';
        document.querySelector('html').innerHTML = '';
        
        // Set proper content type for JSON
        document.open('text/plain');
        document.write(JSON.stringify(data));
        document.close();
    };
    
    // If we have at least two parts in the path (reponame and filename)
    if (pathParts.length >= 2) {
        const filename = pathParts[pathParts.length - 1];
        
        // Fetch the JSON data from the data directory
        fetch(`data/${filename}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Apply filters if query parameters exist
                let filteredData = data;
                
                // Process all query parameters as filters
                searchParams.forEach((value, key) => {
                    if (Array.isArray(filteredData)) {
                        filteredData = filteredData.filter(item => {
                            // Convert both to strings for comparison
                            return String(item[key]) === String(value);
                        });
                    }
                });
                
                // Return the JSON response
                sendJsonResponse(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                sendJsonResponse({ error: 'File not found or invalid JSON' });
            });
    } else {
        // Invalid path format
        sendJsonResponse({ error: 'Invalid path format. Use /<reponame>/<filename>' });
    }
}); 