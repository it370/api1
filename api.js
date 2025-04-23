// Function to handle API requests
function handleApiRequest() {
    // Get the hash (everything after # in URL)
    let hash = window.location.hash;
    
    // If there's no hash, just show the welcome page
    if (!hash || hash === '#') {
        return;
    }
    
    // Remove the # prefix
    hash = hash.substring(1);
    
    // Split into path and query
    const queryIndex = hash.indexOf('?');
    let path = hash;
    let queryString = '';
    
    if (queryIndex !== -1) {
        path = hash.substring(0, queryIndex);
        queryString = hash.substring(queryIndex);
    }
    
    // Get the filename from path
    const pathParts = path.split('/').filter(part => part !== '');
    
    if (pathParts.length === 0) {
        return;
    }
    
    const filename = pathParts[pathParts.length - 1];
    console.log('Requesting file:', filename);
    
    // Parse query parameters
    const searchParams = new URLSearchParams(queryString);
    
    // Fetch the JSON data
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
            
            // Display the JSON response
            const responseElement = document.getElementById('response');
            responseElement.innerHTML = `
                <h2>Response for ${path}${queryString}</h2>
                <pre>${JSON.stringify(filteredData, null, 2)}</pre>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const responseElement = document.getElementById('response');
            responseElement.innerHTML = `
                <h2>Error</h2>
                <pre>${JSON.stringify({ 
                    error: 'File not found or invalid JSON',
                    path: path,
                    filename: filename,
                    requestedFile: `data/${filename}.json` 
                }, null, 2)}</pre>
            `;
        });
}

// Listen for hash changes
window.addEventListener('hashchange', handleApiRequest);

// Handle initial load
document.addEventListener('DOMContentLoaded', handleApiRequest); 