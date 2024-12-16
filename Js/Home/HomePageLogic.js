import { changePageColorMode, initPageTheme, changePageLenguage, translatedText } from '../CommonUtilities.js';

document.addEventListener('DOMContentLoaded', initHomePageLogic)

function initHomePageLogic() {
    initPageTheme()
    initHorizontalyNavigationPage()
    initColorModeButton()
    initMenuButton()
    initLanguageButtons()
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
    const colorModeButton = document.getElementById('color-mode-button');

    colorModeButton.addEventListener('click', ()=> {
      changePageColorMode();
      changeColorModeSelectedText();
    })
    changeColorModeSelectedText()

    function changeColorModeSelectedText() {
      if (document.documentElement.classList.contains('dark')) {
        translatedText('.mode-selected-container>.line1', 'Modo', 'Light' );
        translatedText('.mode-selected-container>.line2', 'Oscuro', 'Mode');
      } else {
        translatedText('.mode-selected-container>.line1', 'Modo', 'Dark' );
        translatedText('.mode-selected-container>.line2', 'Claro', 'Mode');
      }
    }
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
  const btns = document.querySelectorAll('button.can-scroll');
  
  btns.forEach(btn => {
      const targetId = btn.getAttribute('data-section'); 
      const targetElement = document.querySelector(`#${targetId}`); 
      const targetPosition = targetElement.getBoundingClientRect().left;

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
// Laguage button funtion
////////////////////////////////////////////////////////////////////////////////////

function initLanguageButtons() {
  const languageButtons = document.querySelectorAll('button[data-language]');

  languageButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      changePageLenguage(e.target.getAttribute('data-language'));p
    });
  });
}