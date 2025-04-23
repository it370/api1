document.addEventListener('DOMContentLoaded', () => {
    // Get the pathname from the URL
    const path = window.location.pathname;
    // Get query parameters
    const searchParams = new URLSearchParams(window.location.search);
    
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

    // Extract the filename from the URL path
    const pathParts = path.split('/').filter(part => part !== '');
    
    // Get the last part of the path as the filename
    // This handles both /reponame/filename and /filename patterns
    if (pathParts.length > 0) {
        const filename = pathParts[pathParts.length - 1];
        
        // For the root path (just index.html), show a welcome message
        if (filename === 'index.html' || filename === '') {
            document.querySelector('#response').textContent = 'REST API is running. Access data using /<filename>';
            return;
        }
        
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
        // No filename in the path
        document.querySelector('#response').textContent = 'REST API is running. Access data using /<filename>';
    }
}); 