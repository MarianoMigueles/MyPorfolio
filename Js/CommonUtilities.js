import { GetSocialIcons, GetCurriculum } from './ApiData/Contentful.js';

//<--- Global fuctions --->

export function querySelectorMany(...selectors) {
  const multi = typeof selectors[selectors.length - 1] === 'boolean' ? selectors.pop() : false;
  return selectors.map(selector => {
    return multi ? Array.from(document.querySelectorAll(selector)) : document.querySelector(selector);
  });
}

export function translatedText(elementToTranslate = null, textSpanish, textEnglish) {
  const txt = localStorage.getItem('language') == 'es' ? textSpanish : textEnglish;

  if(elementToTranslate === null) {
    return txt;
  }

  const element = document.querySelector(elementToTranslate);
  element.innerHTML = txt;
}

////////////////////////////////////////////////////////////////////////////////////
// Page theme funtions
////////////////////////////////////////////////////////////////////////////////////

export function initPageTheme() {
  let savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    applyPageTheme(savedTheme);
  } else {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkMode ? applyPageTheme('dark') : applyPageTheme('light');
  }
}

export function changePageColorMode() {
  let newColorMode = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  applyPageTheme(newColorMode);
  localStorage.setItem('theme', newColorMode);
}

function applyPageTheme(theme) {
  if(theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

////////////////////////////////////////////////////////////////////////////////////
// Lenguage page funtions
////////////////////////////////////////////////////////////////////////////////////

export function changePageLenguage(lenguague) {
  if(localStorage.getItem('language') === lenguague) {
    return;
  }
  localStorage.setItem('language', lenguague);
  location.reload();
}


////////////////////////////////////////////////////////////////////////////////////
// social links page funtions
////////////////////////////////////////////////////////////////////////////////////

export async function initSocialIcons(areMany = false) {
  const socialIconsData = await GetSocialIcons();

  const [
    gitHub, 
    linkedin, 
    mail, 
    cv
  ] = querySelectorMany(...['.github', '.linkedin', '.mail', '.cv', areMany && true])

  const initSocialButtonIcon = (...btnsGroup) => {
    btnsGroup.forEach(btns => {
      if(areMany) {
        btns.forEach(btn => {
          generateButton(btn)
        });
      } else {
        generateButton(btns)
      }  
    });
  }

  const generateButton = (btn) => {
    const iconKey = btn.title.toLowerCase();

    if (socialIconsData[iconKey]) {
      const iconData = socialIconsData[iconKey]
      btn.title = iconData.iconTitle;
      btn.innerHTML = iconData.svg;
    }
  }

  initSocialButtonIcon(gitHub, linkedin, mail, cv);
}

export async function initCurriculumLinks() {
  const curriculumData = await GetCurriculum();
  
  const cvLinks = document.querySelectorAll('.cv');

  cvLinks.forEach(cv => {
    cv.href = curriculumData;
  });
}
