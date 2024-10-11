import { initNavigator } from './AppNavigation.js';

initNavigator();

////////////////////////////////////////////////////////////////////////////////////
// Scroll funtion
////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('wheel', function(e) {
  checkSections();

    if (e.deltaY !== 0) {
      e.preventDefault();
  
      backgroundScroll(e.deltaY)
    }
}, { passive: false });

const main = document.querySelector('main');

function backgroundScroll(deltaY) {

      let currentScroll = main.scrollLeft;
      let targetScroll = currentScroll + deltaY;
  
      const smoothScroll = () => {
        currentScroll += (targetScroll - currentScroll) * 0.2;
        main.scrollLeft = currentScroll;
  
        if (Math.abs(targetScroll - currentScroll) > 1) {
          requestAnimationFrame(smoothScroll);
        }
      };
  
      smoothScroll();
}

const sections = document.querySelectorAll('section');

function checkSections() {
  const triggerPoint = window.innerWidth / 2;

  sections.forEach(section => {
    const sectionRect = section.getBoundingClientRect();
    const sectionWidth = sectionRect.width;
    const sectionLeft = sectionRect.left;
    const sectionRight = sectionRect.right;
    

    if (sectionLeft + (sectionWidth * 0.25) < triggerPoint && sectionLeft + sectionWidth > 0) {
      section.classList.add('on-focus');
    } else {
      section.classList.remove('on-focus');
    }

  })
}

////////////////////////////////////////////////////////////////////////////////////
// Background animation
////////////////////////////////////////////////////////////////////////////////////

function scrollBackgroundAnimation(sectionRight) {
  const newWidth = sectionRight + 'px';
  console.log(sectionRight)
  main.style.setProperty('--js-scroll-background-width', newWidth);
}

////////////////////////////////////////////////////////////////////////////////////
// Menu button funtion
////////////////////////////////////////////////////////////////////////////////////

const MENU_BUTTON = document.querySelector('#menu-button');
const LATERL_BAR_CONTAINER = document.querySelector('.lateral-bar-container');

MENU_BUTTON.addEventListener('click', (e) => {
  if (LATERL_BAR_CONTAINER.classList.contains('open')) {
    LATERL_BAR_CONTAINER.classList.remove('open');
    LATERL_BAR_CONTAINER.classList.add('closed');
  } else {
    LATERL_BAR_CONTAINER.classList.remove('closed');
    LATERL_BAR_CONTAINER.classList.add('open');
  }
})
