let currentIndex = 0;  

function moveSlide(direction) {  
    const slides = document.querySelector('.slides');  
    const totalSlides = slides.children.length;  

    currentIndex += direction;  

    if (currentIndex < 0) {  
        currentIndex = totalSlides - 1;  
    }  
    if (currentIndex >= totalSlides) {  
        currentIndex = 0;  
    }  

    const offset = -currentIndex * (300 + 20); // 300 width + 20 margin  
    slides.style.transform = `translateX(${offset}px)`;  
}