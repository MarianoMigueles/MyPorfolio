import { initNavigatorUI} from './AppNavigationAndUi.js';
import {
   GetNavigationBarInformation, GetAboutInformation, GetKnowledgeInformation,
   GetMainProyectsInformation, GetInfoInformation, GetCurriculum,
   GetSocialIcons, GetButtonsIcons, GetDecorationIcons, GetSkillsIcons
   } from './Contenful.js';

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

  initLocationInformation()
  initDectorationImage()
  initProfessionTitle()
  initNavBarButtons()
  initSocialIcons()

  function initLocationInformation() {
    const [
      countryContainer,
      provinceContainer,
      cityContainer
    ] = querySelectorMany('#country', '#province','#city',)


    countryContainer.innerHTML = navigationBarData.location.country;
    provinceContainer.innerHTML = navigationBarData.location.province;
    cityContainer.innerHTML = navigationBarData.location.city;
  }
  
  function initProfessionTitle() {
    const [
      professionalTitlePart1,
       professionalTitlePart2, 
       professionTitlesList
      ] = querySelectorMany('#profession-part1', '#profession-part2', '#profession-titles-list') 
    
    const title = navigationBarData.professionalTitle;
    const firstSpace = title.indexOf(' ');
    
    const part1 = title.substring(0, firstSpace);
    const part2 = title.substring(firstSpace + 1);
  
    professionalTitlePart1.innerHTML = part1;
    professionalTitlePart2.innerHTML = part2;
  
    professionTitlesList.innerHTML = navigationBarData.professionTitleList.join(' - ');
  }

  function initNavBarButtons() {
    const [
      btnAbout,
      btnKnowledge,
      btnProjects,
      btnInfo,
      btnSpanish,
      btnEnglish,
      btnColorMode
    ] = querySelectorMany(
      '#btn-about-section',
      '#btn-knowledge-section',
      '#btn-projects-section',
      '#btn-info-section',
      '#language-button-spanish',
      '#language-button-english',
      '#color-mode-button'
    );

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

  async function initDectorationImage() {
    const lateralBarFaceImage = document.getElementById('lateral-bar-face-image');
    const imagesData = await GetDecorationIcons();

    const image = imagesData.myFace.svg;
    const imageInfo = imagesData.myFace.iconTitle;

    lateralBarFaceImage.title = imageInfo;
    lateralBarFaceImage.innerHTML = image;
  }

  async function initSocialIcons() {
    const socialIconsData = await GetSocialIcons();

    const [
      gitHub, 
      linkedin, 
      mail, 
      cv
    ] = querySelectorMany('.github', '.linkedin', '.mail', '.cv', true)

    const initSocialButtonIcon = (...btnsGroup) => {
      btnsGroup.forEach(btns => {
        btns.forEach(btn => {

          const iconKey = btn.title.toLowerCase();
  
          if (socialIconsData[iconKey]) {
            const iconData = socialIconsData[iconKey]
            btn.title = iconData.iconTitle;
            btn.innerHTML = iconData.svg;
          }
        });
      });
    }

    initSocialButtonIcon(gitHub, linkedin, mail, cv);
  }
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

  const skillsData = await GetSkillsIcons();
  console.log(skillsData);
  skillsOrganizer(skillsData);
}

async function initProjectsSectionContent() {
  const projectsListData = await GetMainProyectsInformation();
  
  const projectsContainer = document.getElementById('projects');

  projectsListData.forEach(project => {
    const projectItem = `
      <div class="project-item global-container-decoration">
        <div class="text-container">
          <h3 title="${project.projectTitle}" class="permanent-marker">${project.projectTitle}</h3>
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
  const multi = typeof selectors[selectors.length - 1] === 'boolean' ? selectors.pop() : false;
  return selectors.map(selector => {
    return multi ? Array.from(document.querySelectorAll(selector)) : document.querySelector(selector);
  });
}

function skillsOrganizer(skillsList) {
    const skillsContainer = document.getElementById('skill-section');
    let itemsPerContainer = 4;

    for(let i = 0; i < skillsList.length; i += itemsPerContainer) {
      const chunk = skillsList.slice(i, i + itemsPerContainer);
      
      const skillContainer = createSkillContainer();

      chunk.forEach(skill => {
          const item = `              
            <li title="${skill.skillTitle}" class="skill-item">
              ${skill.svg}
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




