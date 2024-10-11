// script.js
const container = document.querySelector('.circle-container');
const avatars = document.querySelectorAll('.avatar');

if (avatars.length > 0) {
    const radius = 140; // Radius of the container circle
    const centerX = container.offsetWidth / 2; // Center of the container
    const centerY = container.offsetHeight / 2; // Center of the container

    avatars.forEach((avatar, index) => {
        const angle = (index / avatars.length) * (2 * Math.PI); // Calculate the angle for each avatar
        const x = radius * Math.cos(angle); // X position
        const y = radius * Math.sin(angle); // Y position
        
        // Position the avatar
        avatar.style.position = 'absolute'; // Ensure avatars have absolute positioning
        avatar.style.left = `${centerX + x - (avatar.offsetWidth / 2)}px`; // Center the avatar horizontally
        avatar.style.top = `${centerY + y - (avatar.offsetHeight / 2)}px`; // Center the avatar vertically
    });
}
