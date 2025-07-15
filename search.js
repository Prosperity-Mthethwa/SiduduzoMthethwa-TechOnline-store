// JavaScript for search functionality

// Get references to the search input and button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const messageBox = document.getElementById('messageBox');

/**
 * Displays a temporary message in a custom message box.
 * @param {string} message - The message to display.
 * @param {string} type - The type of message (e.g., 'success', 'error').
 */
function showMessage(message, type = 'success') {
    messageBox.textContent = message;
    messageBox.style.display = 'block';

    // Set background color based on message type
    if (type === 'success') {
        messageBox.style.backgroundColor = '#4CAF50'; // Green
    } else if (type === 'error') {
        messageBox.style.backgroundColor = '#f44336'; // Red
    } else {
        messageBox.style.backgroundColor = '#2196F3'; // Blue (info)
    }

    // Remove previous animation and re-add to restart it
    messageBox.style.animation = 'none';
    void messageBox.offsetWidth; // Trigger reflow
    messageBox.style.animation = 'fadeInOut 3s forwards';

    // Hide the message box after the animation completes
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000); // Matches animation duration
}


// Add event listener to the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim(); // Get the value and remove leading/trailing whitespace

    if (query) {
        // In a real application, you would send this query to a backend search API.
        // For this example, we'll just log it and show a message.
        console.log('Search query:', query);
        showMessage(`Searching for: "${query}"`, 'success');
        searchInput.value = ''; // Clear the input field after search
    } else {
        console.log('Search input is empty.');
        showMessage('Please enter a search term.', 'error');
    }
});

// Optional: Allow searching by pressing Enter key in the input field
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click(); // Simulate a click on the search button
    }
});

// Ensure the body has enough margin-top to prevent content from being hidden
// by the fixed header. This should be done after the header is rendered.
document.addEventListener('DOMContentLoaded', () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    document.body.style.marginTop = `${headerHeight}px`;
});