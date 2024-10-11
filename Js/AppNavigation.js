export function initNavigator() {
    initSmoothScrollMenu()
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

const main = document.querySelector('main');
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
            main.scrollTo({
                left: targetPosition,
                behavior: 'smooth'
            }); 
        });
    });
}


