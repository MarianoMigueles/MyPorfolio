
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

const userLanguage = navigator.language || navigator.userLanguage;
const primaryLenguage = userLanguage.split('-')[0].trim();
console.log(primaryLenguage);

async function GetContentfulEntry(contentType) {
    try {

        const response = await client.getEntries({
            content_type: `${contentType}`,
            locale: 'es-AR'
        });

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
        studiesSectionSkills: response[0].fields.skillsSvg.map(skill => {
            return {
                skillName: skill.fields.title,
                skillIcon: skill.fields.file.url
            }
        })
    }

    return knowledgeData;
}

export async function GetProyectsInformation() {
    const response = await GetContentfulEntry('projects');

    return response.map(project => ({
        projectTitle: project.fields.projectTitle,
        projectDate: project.fields.creationDate,
        projectImage: project.fields.projectImage.fields.file.url,
        projectGitHubUrl: project.fields.gitHubRepository,
        projectPageUrl: project.fields.projectPageUrl,
        isMainProject: project.fields.isMain
    }));
}

export async function GetMainProyectsInformation() {
    const projects = await GetProyectsInformation();
    return projects.filter(project => project.isMainProject);
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

////////////////////////////////////////////////////////////////////////////////////
// Contentful logic
////////////////////////////////////////////////////////////////////////////////////

function GetUserLanguage() {
    const userLanguage = navigator.language || navigator.userLanguage;
    return userLanguage.split('-')[0].trim();
}