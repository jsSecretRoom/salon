window.addEventListener('DOMContentLoaded', function() {
    
    const sliderContainers = document.querySelectorAll('.wraper-conteiner');

    for(let i = 0; i < sliderContainers.length; i++) {
        const container = sliderContainers[i];
        const carouselContainer = container.querySelector('.carousel');
        const firstImg = carouselContainer.querySelectorAll("img")[0];
        const arrowButtons = container.querySelectorAll(".arrow");
        let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
        
        const showHideIcons = () => {
            // showing and hiding prev/next icon according to carousel scroll left value
            let scrollWidth = carouselContainer.scrollWidth - carouselContainer.clientWidth; // getting max scrollable width
            arrowButtons[0].style.display = carouselContainer.scrollLeft == 0 ? "none" : "block";
            arrowButtons[1].style.display = carouselContainer.scrollLeft == scrollWidth ? "none" : "block";
        }

        arrowButtons.forEach(icon => {
            icon.addEventListener("click", () => {
                let firstImgWidth = firstImg.clientWidth; // getting first img width & adding 0 margin value
                let maxScrollWidth = carouselContainer.scrollWidth - carouselContainer.clientWidth; // getting max scrollable width
                let currentScrollLeft = carouselContainer.scrollLeft;
        
                if (icon.id == "left") { // if clicked icon is left
                    if (currentScrollLeft <= 0) { // if already at the beginning
                        carouselContainer.scrollLeft = maxScrollWidth; // scroll to the end
                    } else {
                        carouselContainer.scrollLeft -= firstImgWidth; // scroll left
                    }
                } else { // if clicked icon is right
                    if (currentScrollLeft >= maxScrollWidth) { // if already at the end
                        carouselContainer.scrollLeft = 0; // scroll to the beginning
                    } else {
                        carouselContainer.scrollLeft += firstImgWidth; // scroll right
                    }
                }
                
                setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
            });
        });

        const autoSlide = () => {
            // if there is no image left to scroll then return from here
            if(carouselContainer.scrollLeft === 0) return;
            positionDiff = -Math.abs(positionDiff); // making positionDiff value to positive
            let firstImgWidth = firstImg.clientWidth + 14;
            // getting difference value that needs to add or reduce from carousel left to take middle img center
            let valDifference = firstImgWidth - positionDiff;
            if(carouselContainer.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
            return carouselContainer.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
            }
            // if user is scrolling to the left
            carouselContainer.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }

        const dragStart = (e) => {
            // updatating global variables value on mouse down event
            isDragStart = true;
            prevPageX = e.pageX || e.touches[0].pageX;
            prevScrollLeft = carouselContainer.scrollLeft;
        }
        const dragging = (e) => {
            // scrolling images/carousel to left according to mouse pointer
            if(!isDragStart) return;
            isDragging = true;
            carouselContainer.classList.add("dragging");
            positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
            if (Math.abs(positionDiff) > 10) {
                e.preventDefault();
            }
            
            carouselContainer.scrollLeft = prevScrollLeft - positionDiff;
            showHideIcons();
        }
        
        const dragStop = () => {
            isDragStart = false;
            carouselContainer.classList.remove("dragging");
            if(!isDragging) return;
            isDragging = false;
            autoSlide();

            
        }
        
        carouselContainer.addEventListener("mousedown", dragStart);
        carouselContainer.addEventListener("touchstart", dragStart);
        
        
        // add event listener only when dragging is started
        document.addEventListener("mousemove", dragging);
        carouselContainer.addEventListener("touchmove", dragging);
        
        document.addEventListener("mouseup", dragStop);
        carouselContainer.addEventListener("touchend", dragStop);
    }
});

