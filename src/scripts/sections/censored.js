export function initCensoredSection() {
    const container = document.getElementById('activism');

    Draggable.create('.censor-bar', {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: container,
        inertia: true,
        onDragStart: function () {
            gsap.to(this.target, {
                scale: 1.1,
                rotation: Math.random() * 10 - 5,
                duration: 0.2
            });
        },
        onDragEnd: function () {
            gsap.to(this.target, {
                scale: 1,
                duration: 0.2
            });
        }
    });
}
