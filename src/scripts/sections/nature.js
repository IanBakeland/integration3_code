export function initNatureSection() {
    const sweater = document.getElementById('nature-sweater');

    if (!sweater) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    function startDrag(event) {
        event.preventDefault();
        isDragging = true;

        if (event.type === 'mousedown') {
            startX = event.clientX - currentX;
            startY = event.clientY - currentY;
        } else {
            startX = event.touches[0].clientX - currentX;
            startY = event.touches[0].clientY - currentY;
        }

        sweater.style.cursor = 'grabbing';
        gsap.to(sweater, { scale: 1.05, rotation: -2, duration: 0.2 });
    }

    function drag(event) {
        if (!isDragging) return;

        let clientX, clientY;
        if (event.type === 'mousemove') {
            clientX = event.clientX;
            clientY = event.clientY;
        } else {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        }

        currentX = clientX - startX;
        currentY = clientY - startY;

        gsap.set(sweater, { x: currentX, y: currentY });
    }

    function stopDrag() {
        if (!isDragging) return;
        isDragging = false;
        sweater.style.cursor = 'grab';
        gsap.to(sweater, { scale: 1, rotation: -5, duration: 0.3 });
    }

    // Event listeners
    sweater.addEventListener('mousedown', startDrag);
    sweater.addEventListener('touchstart', startDrag, { passive: false });

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}
