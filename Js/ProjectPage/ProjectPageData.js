import { initSocialIcons } from '../CommonUtilities.js'
import { GetButtonsIcons, GetProyectsInformation } from '../ApiData/Contentful.js'

initProjectPageData() 

async function initProjectPageData() {
    await initProjectData()
    initSocialIcons(true)
}

async function initProjectData() {
    const projectData = await GetProyectsInformation();
    const btnData = await GetButtonsIcons();
    const projectContainer = document.getElementById('projects');

    console.log(btnData);

    projectData.forEach(prj => { createProject(prj) });
     
    function createProject(prj) {
        projectContainer.innerHTML += `
            <div class="project-item global-container-decoration">
                <h2 class="">${prj.projectTitle}</h2>
                <img src="${prj.projectImage}" alt="${prj.projectTitle}">
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
                    <span class=" permanent-marker">${prj.projectDate}</span>
                </div>
            </div>
        `;
    }
    
}

