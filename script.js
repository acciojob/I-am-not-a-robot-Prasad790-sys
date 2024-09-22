//your code here
document.addEventListener('DOMContentLoaded', () => {
    const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
    const imageContainer = document.getElementById('image-container');
    const resetButton = document.getElementById('reset');
    const verifyButton = document.getElementById('verify');
    const para = document.getElementById('para');
    let selectedImages = [];
    let identicalImageClass;

    function generateImages() {
        imageContainer.innerHTML = ''; // Clear previous images
        const randomIndex = Math.floor(Math.random() * images.length);
        identicalImageClass = images[randomIndex]; // Random class to repeat

        const selectedImagesList = [...images]; // Copy original images array
        selectedImagesList.splice(randomIndex, 1); // Remove one for duplication
        selectedImagesList.push(identicalImageClass); // Add duplicate

        // Shuffle images
        const shuffledImages = selectedImagesList.sort(() => Math.random() - 0.5);
        
        // Create image elements
        shuffledImages.forEach((imgClass) => {
            const img = document.createElement('img');
            img.className = imgClass;
            img.addEventListener('click', () => handleImageClick(img, imgClass));
            imageContainer.appendChild(img);
        });
    }

    function handleImageClick(img, imgClass) {
        if (!selectedImages.includes(imgClass)) {
            selectedImages.push(imgClass);
            img.classList.add('selected');
            resetButton.style.display = 'inline'; // Show reset button
            
            if (selectedImages.length === 2) {
                verifyButton.style.display = 'inline'; // Show verify button
            }
        }

        if (selectedImages.length > 2) {
            // Ignore clicks beyond 2
            return;
        }
    }

    resetButton.addEventListener('click', () => {
        selectedImages = [];
        imageContainer.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
        resetButton.style.display = 'none';
        verifyButton.style.display = 'none';
        para.textContent = '';
        generateImages();
    });

    verifyButton.addEventListener('click', () => {
        const [first, second] = selectedImages;
        if (first === second) {
            para.textContent = 'You are a human. Congratulations!';
        } else {
            para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }
        verifyButton.style.display = 'none'; // Hide verify button
    });

    // Initialize images on load
    generateImages();
});