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

document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-arrow.left');
    const nextButton = document.querySelector('.carousel-arrow.right');
    const dotIndicators = document.querySelectorAll('.dot-indicator');
    let currentIndex = 0;
    let autoSlideInterval;

    /**
     * Displays the specified slide and updates active states.
     * Pauses/plays video based on active slide.
     * @param {number} index - The index of the slide to display.
     */
    function showSlide(index) {
        // Ensure index wraps around
        if (index >= carouselItems.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = carouselItems.length - 1;
        } else {
            currentIndex = index;
        }

        // Hide all items and remove active class
        carouselItems.forEach(item => {
            item.classList.remove('active');
            const video = item.querySelector('video');
            if (video) {
                video.pause(); // Pause any playing video
            }
        });

        // Show the current item and add active class
        carouselItems[currentIndex].classList.add('active');
        const currentVideo = carouselItems[currentIndex].querySelector('video');
        if (currentVideo) {
            currentVideo.play(); // Play video if it's the active slide
        }

        // Update dot indicators
        dotIndicators.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * Moves to the next slide.
     */
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    /**
     * Moves to the previous slide.
     */
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    /**
     * Starts the automatic sliding.
     */
    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    /**
     * Stops the automatic sliding.
     */
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event Listeners for Navigation Buttons
    prevButton.addEventListener('click', () => {
        stopAutoSlide(); // Stop auto-slide on manual navigation
        prevSlide();
        startAutoSlide(); // Restart auto-slide after manual navigation
    });

    nextButton.addEventListener('click', () => {
        stopAutoSlide(); // Stop auto-slide on manual navigation
        nextSlide();
        startAutoSlide(); // Restart auto-slide after manual navigation
    });

    // Event Listeners for Dot Indicators
    dotIndicators.forEach(dot => {
        dot.addEventListener('click', (event) => {
            stopAutoSlide(); // Stop auto-slide on manual navigation
            const slideIndex = parseInt(event.target.dataset.slideTo);
            showSlide(slideIndex);
            startAutoSlide(); // Restart auto-slide after manual navigation
        });
    });

    // Initial display and start auto-slide
    showSlide(currentIndex);
    startAutoSlide();

    // Pause auto-slide when mouse is over the carousel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
});
