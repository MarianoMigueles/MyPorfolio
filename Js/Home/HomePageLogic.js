import { changePageColorMode, initPageTheme } from '../CommonUtilities.js';

initHomePageLogic()

function initHomePageLogic() {
    initPageTheme()
    initHorizontalyNavigationPage()
    initColorModeButton()
    initMenuButton()
}

function initHorizontalyNavigationPage() {
    smoothScrollMenu()

    window.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
          e.preventDefault();
      
          backgroundScroll(e.deltaY)
        }
    }, { passive: false });
}

function initColorModeButton() {
    const colorModeSelected = document.querySelector('span.type');
    const colorModeButton = document.getElementById('color-mode-button');
    
    colorModeButton.addEventListener('click', changePageColorMode);

    colorModeSelected.innerText = colorModeSelected.innerText === 'Dark'? 'Light' : 'Dark';
}

function initMenuButton() {
    const MENU_BUTTON = document.querySelector('#menu-button');
    MENU_BUTTON.addEventListener('click', toggleMenu)
}

////////////////////////////////////////////////////////////////////////////////////
// Scroll funtions
////////////////////////////////////////////////////////////////////////////////////

const main = document.querySelector('main');
const LATERL_BAR_CONTAINER = document.querySelector('.lateral-bar-container');

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

function smoothScrollMenu() {
  const btns = document.querySelectorAll('button');
  const noScrollableButtons = ["menu-button", "color-mode-button", "language-button-spanish", "language-button-english"]; 
  
  btns.forEach(btn => {
      if(noScrollableButtons.includes(btn.id)) return;

      const targetId = btn.getAttribute('data-section'); 
      const targetElement = document.querySelector(`#${targetId}`); 
      const targetPosition = targetElement.getBoundingClientRect().left - 100;

      btn.addEventListener('click', (e)=> {
          e.preventDefault()

          if(LATERL_BAR_CONTAINER.classList.contains('open')) toggleMenu(); 
          
          main.scrollTo({
              left: targetPosition,
              behavior: 'smooth'
          }); 
      });
  });
}

////////////////////////////////////////////////////////////////////////////////////
// Menu button funtion
////////////////////////////////////////////////////////////////////////////////////

function toggleMenu() {
  if (LATERL_BAR_CONTAINER.classList.contains('open')) {
    LATERL_BAR_CONTAINER.classList.remove('open');
    LATERL_BAR_CONTAINER.classList.add('closed');
  } else {
    LATERL_BAR_CONTAINER.classList.remove('closed');
    LATERL_BAR_CONTAINER.classList.add('open');
  }
}

////////////////////////////////////////////////////////////////////////////////////
// Background animation
////////////////////////////////////////////////////////////////////////////////////

function scrollBackgroundAnimation(newWidth) {
    main.style.setProperty('--js-scroll-background-width', newWidth + 'px');
  }
  