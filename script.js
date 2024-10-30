function toggleFlip(event) {
if (!event.target.classList.contains('add-to-cart') && event.target.tagName !== 'IMG') {
        event.currentTarget.classList.toggle('flipped');
    } 
}


