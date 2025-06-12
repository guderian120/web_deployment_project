function displayResults(data) {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = `
            <div class="alert alert-success">
                <strong>Success!</strong><br>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    }


document.getElementById('fetchBtn').addEventListener('click', async () => {
    const apiUrl = document.getElementById('apiUrl').value.trim();
    
    try {
        // Show loading state
        document.querySelector('.loader').style.display = 'inline-block';
        
        const response = await fetch(apiUrl, {
            mode: 'cors',  // Explicitly enable CORS
            headers: {
                'Content-Type': 'application/json',
                // Add if your API requires auth:
                // 'Authorization': 'Bearer YOUR_TOKEN'
            }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        displayResults(data);
        
    } catch (error) {
        console.error('Full error:', error);  // Log complete error
        document.getElementById('results').innerHTML = `
            <div class="alert alert-danger">
                <strong>Error Details:</strong><br>
                ${error.message}<br>
                ${error.stack || ''}
            </div>
        `;
    } finally {
        document.querySelector('.loader').style.display = 'none';
    }
});
