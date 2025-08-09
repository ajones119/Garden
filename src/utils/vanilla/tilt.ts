const boundSet = new WeakSet();

export const initTilt = (props?: {
    selector?: string,
    sensitivity?: number,
    scale?: number
}): void => {
    const {
        selector = '.tilt-wrapper',
        sensitivity = 15,
        scale = 1.05
    } = props || {};
    const containers = document.querySelectorAll<HTMLElement>(selector);

    containers.forEach((container) => {
        if (boundSet.has(container)) return; // Avoid rebinding
        
        const elementSensitivity = parseInt(container.getAttribute('data-sensitivity') || sensitivity.toString());
        const elementScale = container.getAttribute('data-scale') || scale;

        boundSet.add(container);

        const inner = container.firstElementChild as HTMLElement;
        if (!inner) return;


        const handleMouseMove = (e: Event): void => {
            const mouseEvent = e as MouseEvent;
            const rect = container.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = -(y - centerY) / elementSensitivity;
            const rotateY = (x - centerX) / elementSensitivity;

            if (x%2 === 0 || y%2 === 0) {
                return
            }

            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${elementScale})`;
        };

        const handleMouseLeave = (): void => {
            window.requestAnimationFrame(() => {inner.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;})
            
        };

        let ticking = false;

        container.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
            // your tilt calculation here, with e.clientX/Y saved outside if needed
            handleMouseMove(e);
            ticking = false;
            });
            ticking = true;
        }
        });

        container.addEventListener('mouseleave', handleMouseLeave);
    });
};
