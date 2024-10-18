
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

async function GetContentfulEntry(contentType) {
    try {

        const response = await client.getEntries({
            content_type: `${contentType}`
        });

        return response.items;
        
    } catch (err) {
        console.error(err);
    }
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