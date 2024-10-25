import { initSocialIcons, initReturnButtons } from '../CommonUtilities.js'
import { GetButtonsIcons, GetProyectsInformation } from '../ApiData/Contentful.js'

document.addEventListener('DOMContentLoaded', initProjectPageData)

async function initProjectPageData() {
    await initProjectData()
    initSocialIcons(true)
    initReturnButtons()
}

async function initProjectData() {
    const projectData = await GetProyectsInformation();
    const btnData = await GetButtonsIcons();
    const projectContainer = document.getElementById('projects');
    const projectSectionTitle = document.querySelector('h1>span');
    projectSectionTitle.innerHTML = localStorage.getItem('language') === 'es' ? 'Proyectos' : 'Projects';

    projectData.forEach(prj => { createProject(prj) });
     
    function createProject(prj) {
        projectContainer.innerHTML += `
            <div class="project-item global-container-decoration">
                <div class="top-container">
                    <h2 title="${prj.projectTitle}">${prj.projectTitle}</h2>
                </div>
                <img src="${prj.projectImage}" alt="${prj.projectTitle}"/>
                <div class="bottom-container">
                    <div class="project-play-button global-container-decoration">
                        <a title="Github" href="${prj.projectGitHubUrl}" target="_blank" class="github"></a>
                        ${ 
                            prj.projectPageUrl !== "" ? `
                                <a title="Project Page" href="${prj.projectPageUrl}" target="_blank" class="project-page">
                                    ${ btnData.playButton.svg }
                                </a>
                            ` : ''
                        }
                    </div>
                    <span title="${prj.projectDate}">${prj.projectDate}</span>
                </div>
            </div>
        `;
    }
    
}

