document.addEventListener('DOMContentLoaded', () => {
    // Select all anchor links that start with '#' (internal links)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href'); // Get the href (e.g., "#section1")
            const targetElement = document.querySelector(targetId); // Get the actual element

            if (targetElement) {
                // Use scrollIntoView with smooth behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});