document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем все карусели на странице
    document.querySelectorAll('.carousel').forEach(initCarousel);
    
    function initCarousel(carousel) {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.carousel-indicators button');
        const prevBtn = carousel.querySelector('.carousel-control-prev');
        const nextBtn = carousel.querySelector('.carousel-control-next');
        
        // Добавляем стили для центрирования изображений
        const style = document.createElement('style');
        style.textContent = `
            .carousel-item {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
            }
            .carousel-item img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                margin: auto;
            }
            .carousel-inner {
                display: flex;
                align-items: center;
            }
        `;
        document.head.appendChild(style);
        
        let currentIndex = 0;
        const totalItems = items.length;
        let interval;
        
        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
                indicator.ariaCurrent = i === currentIndex ? 'true' : null;
            });
            
            items.forEach((item, i) => {
                item.classList.toggle('active', i === currentIndex);
            });
        }
        
        function goTo(index) {
            currentIndex = (index + totalItems) % totalItems;
            updateCarousel();
        }
        
        function next() { goTo(currentIndex + 1); }
        function prev() { goTo(currentIndex - 1); }
        
        // Навигация
        nextBtn.addEventListener('click', next);
        prevBtn.addEventListener('click', prev);
        
        // Индикаторы
        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => goTo(i));
        });
        
        // Автопрокрутка
        function startAutoPlay() {
            interval = setInterval(next, 7000);
        }
        
        function stopAutoPlay() {
            clearInterval(interval);
        }
        
        startAutoPlay();
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // Инициализация
        updateCarousel();
        
        // Центрируем изображения при загрузке и изменении размера окна
        window.addEventListener('resize', centerImages);
        centerImages();
        
        function centerImages() {
            items.forEach(item => {
                const img = item.querySelector('img');
                if (img) {
                    const containerHeight = carousel.offsetHeight;
                    const imgHeight = img.naturalHeight;
                    if (imgHeight < containerHeight) {
                        img.style.marginTop = `${(containerHeight - imgHeight) / 2}px`;
                        img.style.marginBottom = `${(containerHeight - imgHeight) / 2}px`;
                    } else {
                        img.style.marginTop = '0';
                        img.style.marginBottom = '0';
                    }
                }
            });
        }
    }
});