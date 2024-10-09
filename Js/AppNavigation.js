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

function initSmoothScrollMenu() {
    const links = document.querySelectorAll('a[href^="#"]'); 
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href'); 
            const targetElement = document.querySelector(targetId); 
            const targetPosition = targetElement.offsetLeft;
            console.log(targetPosition)
    
            window.scrollTo({
                left: targetPosition,
                behavior: 'smooth'
            }); 
        });
    });
}


