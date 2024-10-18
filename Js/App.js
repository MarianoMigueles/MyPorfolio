import { initNavigatorUI} from './AppNavigationAndUi.js';
import { GetNavigationBarInformation, GetAboutInformation, GetKnowledgeInformation, GetMainProyectsInformation, GetInfoInformation, GetCurriculum } from './Contenful.js';

/* Initilizes page navigation and UI switching functions */
initNavigatorUI();

////////////////////////////////////////////////////////////////////////////////////
// Page content
////////////////////////////////////////////////////////////////////////////////////

/* -Initalizing page content- */
initNavigarionBarContent()
initAboutSectionContent()
initKnowledgeSectionContent()
initProjectsSectionContent()
initInfoSectionContent()
initCurriculumLinks()
/* -------------------------- */

async function initNavigarionBarContent() {
  const navigationBarData = await GetNavigationBarInformation();
  
  const [
    countryContainer,
    provinceContainer,
    cityContainer,
    professionalTitlePart1,
    professionalTitlePart2,
    professionTitlesList,
    btnAbout,
    btnKnowledge,
    btnProjects,
    btnInfo,
    btnSpanish,
    btnEnglish
  ] = querySelectorMany(
    '#country',
    '#province',
    '#city',
    '#profession-part1',
    '#profession-part2',
    '#profession-titles-list',
    '#btn-about-section',
    '#btn-knowledge-section',
    '#btn-projects-section',
    '#btn-info-section',
    '#language-button-spanish',
    '#language-button-english'
  );
  
  countryContainer.innerHTML = navigationBarData.location.country;
  provinceContainer.innerHTML = navigationBarData.location.province;
  cityContainer.innerHTML = navigationBarData.location.city;

  const[part1, part2] = navigationBarData.professionalTitle.split(' ');
  professionalTitlePart1.innerHTML = part1;
  professionalTitlePart2.innerHTML = part2;

  professionTitlesList.innerHTML = navigationBarData.professionTitleList.join(' - ');

  const navbuttonsData = [
    { button: btnAbout, text: navigationBarData.navigationButtonBarList.btnAbout },
    { button: btnKnowledge, text: navigationBarData.navigationButtonBarList.btnStudies },
    { button: btnProjects, text: navigationBarData.navigationButtonBarList.btnProjects },
    { button: btnInfo, text: navigationBarData.navigationButtonBarList.btnInfo },
  ];

  navbuttonsData.forEach(({ button, text }) => {
    button.innerHTML = '';
    const span = document.createElement('span');
    span.classList.add('button-content');
    span.innerHTML = text;
    button.appendChild(span);
  });

  btnSpanish.innerHTML = navigationBarData.navigationButtonBarList.btnSpanish;
  btnEnglish.innerHTML = navigationBarData.navigationButtonBarList.btnEnglish;
}

async function initAboutSectionContent() {
  const aboutData = await GetAboutInformation();

  const [aboutParagraph, aboutImage] = querySelectorMany('#about-paragraph', '#about-image');

  aboutParagraph.innerHTML = `
    <span>${aboutData.aboutParagraphTitle}</span>
    ${aboutData.aboutParagraph}
  `;

  aboutImage.src = aboutData.aboutImage;
  aboutImage.alt = aboutData.aboutImageDescription;
}

async function initKnowledgeSectionContent() {
  const knowledgeData = await GetKnowledgeInformation();

  const [dedication, KnowledgesSectionTitle] = querySelectorMany('#dedication-translated', '#Knowledges-section-title');

  dedication.innerHTML = knowledgeData.studiesSectionDedicationPhrase;
  KnowledgesSectionTitle.innerHTML = knowledgeData.studiesSectionTitle;
  skillsOrganizer(knowledgeData.studiesSectionSkills);
}

async function initProjectsSectionContent() {
  const projectsListData = await GetMainProyectsInformation();
  
  const projectsContainer = document.getElementById('projects');

  projectsListData.forEach(project => {
    const projectItem = `
      <div class="project-item global-container-decoration">
        <div class="text-container">
          <h3 class="permanent-marker">${project.projectTitle}</h3>
          <span class="oswald">${project.projectDate}</span>
        </div>
        <div class="project-image-container global-container-decoration">
          <img src="${project.projectImage}" alt="${project.projectTitle} project image" />
        </div>
      </div>
    `;
    
    projectsContainer.innerHTML += projectItem;
  });
}

async function initInfoSectionContent() {
  const infoData = await GetInfoInformation();

  const [phrasePart1, phrasePart2] = querySelectorMany('#phrase-part-1', '#phrase-part-2');

  phrasePart1.innerHTML = infoData.openingPhrase;
  phrasePart2.innerHTML = infoData.closingPhrase;
}

async function initCurriculumLinks() {
  const curriculumData = await GetCurriculum();
  
  const cvLinks = document.querySelectorAll('.cv');

  cvLinks.forEach(cv => {
    cv.href = curriculumData;
  });
}

////////////////////////////////////////////////////////////////////////////////////
// Page Logic
////////////////////////////////////////////////////////////////////////////////////

function querySelectorMany(...selectors) {
  return selectors.map(selector => document.querySelector(selector));
}

function skillsOrganizer(skillsList) {
    const skillsContainer = document.getElementById('skill-section');
    let itemsPerContainer = 4;

    for(let i = 0; i < skillsList.length; i += itemsPerContainer) {
      const chunk = skillsList.slice(i, i + itemsPerContainer);

      const skillContainer = createSkillContainer();

      chunk.forEach(skill => {
          const item = `              
            <li>
              <img
                class="icon"
                src="${skill.skillIcon}"
                alt="${skill.skillName} logo"
              />
            </li>
          `;

          skillContainer.innerHTML += item;
      });

      skillsContainer.appendChild(skillContainer);
    }

    function createSkillContainer() {
        const skillContainer = document.createElement('ul');
        skillContainer.classList.add('skill-list-container');
        skillContainer.classList.add('global-container-decoration');
        return skillContainer;
    }

}


////////////////////////////////////////////////////////////////////////////////////
// Background animation
////////////////////////////////////////////////////////////////////////////////////

function scrollBackgroundAnimation(newWidth) {
  main.style.setProperty('--js-scroll-background-width', newWidth + 'px');
}




