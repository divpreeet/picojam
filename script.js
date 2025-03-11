document.addEventListener('DOMContentLoaded', () => {
    // Add pixel trail effect with throttling
    const container = document.querySelector('.container');
    let lastTime = 0;
    const throttleDelay = 50; // Limit pixel creation to every 50ms
    
    container.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastTime < throttleDelay) return;
        lastTime = currentTime;

        const pixel = document.createElement('div');
        pixel.className = 'pixel-trail';
        pixel.style.left = (e.pageX - 2) + 'px';
        pixel.style.top = (e.pageY - 2) + 'px';
        
        // Use more muted colors
        const hue = Math.random() * 360;
        const saturation = 60 + Math.random() * 20;
        const lightness = 50 + Math.random() * 15;
        pixel.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        pixel.style.opacity = '0.5';
        pixel.style.width = '4px';
        pixel.style.height = '4px';
        pixel.style.filter = 'blur(1.5px)';
        document.body.appendChild(pixel);

        // Remove pixel after animation
        pixel.addEventListener('animationend', () => pixel.remove());
    });

    // Add hover effect to steps with sound
    const steps = document.querySelectorAll('.step');
    const hoverSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    
    steps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-5px) scale(1.02)';
            hoverSound.currentTime = 0;
            hoverSound.play().catch(() => {});
        });
        step.addEventListener('mouseleave', () => {
            step.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add smooth scroll behavior for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});