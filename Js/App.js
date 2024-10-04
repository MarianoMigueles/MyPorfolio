window.addEventListener('wheel', function(e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
  
      backgroundScroll(e.deltaY)
    }
}, { passive: false });

let initialX  = null;

window.addEventListener('touchstart', function(e) {
  initialX = e.touches[0].clientX;
}, { passive: false });

window.addEventListener('touchmove', function(e) {
  if (initialX === null) return;

  const currentX = e.touches[0].clientX;
  const deltaX = initialX - currentX; 

  backgroundScroll(deltaX); 

  initialX = currentX;
}, { passive: false });

window.addEventListener('touchend', function(e) {
    initialY = null;
}, { passive: true });

function backgroundScroll(deltaY) {
  const container = document.querySelector('main');

      scrollBackgroundAnimation(deltaY);   

      let currentScroll = container.scrollLeft;
      let targetScroll = currentScroll + deltaY;
  
      const smoothScroll = () => {
        currentScroll += (targetScroll - currentScroll) * 0.2;
        container.scrollLeft = currentScroll;
  
        if (Math.abs(targetScroll - currentScroll) > 1) {
          requestAnimationFrame(smoothScroll);
        }
      };
  
      smoothScroll();
}

let backgroundSize = 100;
let sumValue = 150;
let subtractionValue = 100;

if(window.innerWidth < 600) {
    sumValue = 20;
    subtractionValue = 20;
}

function scrollBackgroundAnimation(deltaY) {
    if(deltaY > 0) {
      backgroundSize += sumValue;
    } else {
      backgroundSize -= subtractionValue;
    }

    console.log(backgroundSize);

    if(backgroundSize > 2000) {
      backgroundSize = 2000;
    }

    if(backgroundSize < 100) {
      backgroundSize = 100;
    }

    document.documentElement.style.setProperty('--js-Scroll-Background-Animation', backgroundSize + 'px');
}
  