export function initNavigatorUI() {
    initSmoothScrollMenu()

    window.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
          e.preventDefault();
      
          backgroundScroll(e.deltaY)
        }
    }, { passive: false });
}

const main = document.querySelector('main');

////////////////////////////////////////////////////////////////////////////////////
// Scroll funtion
////////////////////////////////////////////////////////////////////////////////////

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

function querySelectorMany(...selectors) {
    return selectors.map(selector => document.querySelector(selector));
}

const [
    aboutSection,
     KnowledgeSection,
      ProjectsSection,
       InfoSection
    ] = querySelectorMany('.about', '.knowledge', '.projects', '.info');

const noScrollableButtons = ["menu-button", "color-mode-button", "language-button-spanish", "language-button-english"];

function initSmoothScrollMenu() {
    const btns = document.querySelectorAll('button'); 
    
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

const MENU_BUTTON = document.querySelector('#menu-button');
const LATERL_BAR_CONTAINER = document.querySelector('.lateral-bar-container');

function toggleMenu() {
  if (LATERL_BAR_CONTAINER.classList.contains('open')) {
    LATERL_BAR_CONTAINER.classList.remove('open');
    LATERL_BAR_CONTAINER.classList.add('closed');
  } else {
    LATERL_BAR_CONTAINER.classList.remove('closed');
    LATERL_BAR_CONTAINER.classList.add('open');
  }
}

MENU_BUTTON.addEventListener('click', toggleMenu)

////////////////////////////////////////////////////////////////////////////////////
// Color mode button funtion
////////////////////////////////////////////////////////////////////////////////////

const colorModeSelected = document.querySelector('span.type');
const colorModeButton = document.getElementById('color-mode-button');

function changePageColorMode() {
  if(document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    colorModeSelected.innerText = 'Light';
  } else {
    document.documentElement.classList.add('dark');
    colorModeSelected.innerText = 'Dark';
  }
}

colorModeButton.addEventListener('click', changePageColorMode);