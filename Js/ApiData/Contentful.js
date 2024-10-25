////////////////////////////////////////////////////////////////////////////////////
// Configuration
////////////////////////////////////////////////////////////////////////////////////

const CONFIG = {
    space: 'innfptc1im3d',
    environment: 'master',
    accessToken: 'jKr7DvHJ3Pwl4CtmwLpipyDuvJiP7DVgc0H1MEWr3tY'
}

const client = contentful.createClient({
    space: CONFIG.space,
    environment: CONFIG.environment,
    accessToken: CONFIG.accessToken
})

////////////////////////////////////////////////////////////////////////////////////
// Contentful GET methods
////////////////////////////////////////////////////////////////////////////////////

let lenguageData = GetUserLanguage();

async function GetContentfulEntry(contentType, filters = []) {
    try {

        const query = {
            content_type: `${contentType}`,
            locale: lenguageData
        };
        
        if (filters.length > 0) {
            const [filterType, filterValue] = filters;

            if (filterType && filterValue) {
                query[`fields.${filterType}`] = filterValue;
            }
        }

        const response = await client.getEntries(query);

        return response.items;
        
    } catch (err) {
        console.error(err);
    }
}

export async function GetNavigationBarInformation() {
    const response = await GetContentfulEntry('navigationBar');
    
    return {
        professionalTitle: response[0].fields.professionTitle,
        location: {
            country: response[0].fields.location[0],
            province: response[0].fields.location[1],
            city: response[0].fields.location[2]
        },
        professionTitleList: response[0].fields.professionTitleList,
        navigationButtonBarList: {
            btnAbout: response[0].fields.navigationButtonBarList[0],
            btnStudies: response[0].fields.navigationButtonBarList[1],
            btnProjects: response[0].fields.navigationButtonBarList[2],
            btnInfo: response[0].fields.navigationButtonBarList[3],
            btnSpanish: response[0].fields.navigationButtonBarList[4],
            btnEnglish: response[0].fields.navigationButtonBarList[5]
        }
    };
}

export async function GetAboutInformation() {
    const response = await GetContentfulEntry('about');

    const aboutData = {
        aboutParagraphTitle: response[0].fields.title,
        aboutParagraph: response[0].fields.aboutMeText,
        aboutImage: response[0].fields.myImage.fields.file.url,
        aboutImageDescription: response[0].fields.myImage.fields.description
    }

    return aboutData;
}

export async function GetKnowledgeInformation() {
    const response = await GetContentfulEntry('studies');

    const knowledgeData = {
        studiesSectionTitle: response[0].fields.studiesTitle,
        studiesSectionDedicationPhrase: response[0].fields.dedicationPhrase,
    }

    return knowledgeData;
}

export async function GetProyectsInformation() {
    const response = await GetContentfulEntry('projects');

    return response.map(project => { return MapProjectToObject(project) });
}

export async function GetMainProyectsInformation() {
    const response = await GetContentfulEntry('projects', GetEntryFilter('project'));

    return response.map(project => { return MapProjectToObject(project) });
}

export async function GetInfoInformation() {
    const response = await GetContentfulEntry('info');
    const [opening, closing] = response[0].fields.phrase.split('-');

    return {
        openingPhrase: opening.trim(),
        closingPhrase: closing.trim()
    }
}

export async function GetCurriculum() {
    const response = await GetContentfulEntry('curriculum');
    return response[0].fields.curriculum.fields.file.url;
}

// <-- Svg Get Methods -->

export async function  GetSocialIcons() {
    const response = await GetContentfulEntry('svgList', GetEntryFilter('social'));
    return response[0].fields.svg.socialIconsSvg;
}

export async function  GetButtonsIcons() {
    const response = await GetContentfulEntry('svgList', GetEntryFilter('button'));
    return response[0].fields.svg.buttonsSvg;
}

export async function  GetDecorationIcons() {
    const response = await GetContentfulEntry('svgList', GetEntryFilter('decoration'));
    return response[0].fields.svg.decorationImageSvg;
}

export async function GetSkillsIcons() {
    const response = await GetContentfulEntry('svgList', GetEntryFilter('skill'));
    return response[0].fields.svg.skillsSvg;
}

export async function GetStudiesIcons() {
    const response = await GetContentfulEntry('svgList', GetEntryFilter('studies'));
    return response[0].fields.svg.studiesSvg
}

////////////////////////////////////////////////////////////////////////////////////
// Contentful logic
////////////////////////////////////////////////////////////////////////////////////

function GetEntryFilter(filter) {

    let filterLowerCase = filter.toLowerCase();

    switch(filterLowerCase) {
        case 'decoration': 
            return ['svgListTitle', 'pageDecorationSvg'];
        case 'button':
            return ['svgListTitle', 'decorationButtonsSvg'];
        case 'social':
            return ['svgListTitle', 'socialIconsSvg'];
        case 'skill':
            return ['svgListTitle', 'skillsSvg'];
        case 'studies':
            return ['svgListTitle', 'studiesSvg']
        case 'project':
            return ['isMain', true];
        default:
            return [];
    }
}

function GetUserLanguage() {

    let userLanguage;
    let language;

    if (localStorage.getItem("language")) {
        language = localStorage.getItem("language");
    } else {
        language = navigator.language || navigator.userLanguage;
    }

    userLanguage = language.split('-')[0].trim();
    localStorage.setItem("language", userLanguage);

    return userLanguage === 'es' ? 'es-AR' : 'en-GB';
}

function MapProjectToObject(project) {
    return {
        projectTitle: project.fields.projectTitle,
        projectDate: project.fields.creationDate,
        projectImage: project.fields.projectImage.fields.file.url,
        projectGitHubUrl: project.fields.gitHubRepository,
        projectPageUrl: "projectPageUrl" in project.fields ? project.fields.projectPageUrl : '',
        isMainProject: project.fields.isMain
    };
}