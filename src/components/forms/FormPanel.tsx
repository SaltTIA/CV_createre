import { SectionKey } from '../../types/cv';
import { PersonalForm } from './PersonalForm';
import { SummaryForm } from './SummaryForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { LanguagesForm } from './LanguagesForm';
import { CertificationsForm } from './CertificationsForm';
import { ProjectsForm } from './ProjectsForm';
import { CustomSectionsForm } from './CustomSectionsForm';
import { CoverLetterForm } from '../cover-letter/CoverLetterForm';

export function FormPanel({ section }: { section: SectionKey }) {
  switch (section) {
    case 'personal': return <PersonalForm />;
    case 'summary': return <SummaryForm />;
    case 'experiences': return <ExperienceForm />;
    case 'education': return <EducationForm />;
    case 'skills': return <SkillsForm />;
    case 'languages': return <LanguagesForm />;
    case 'certifications': return <CertificationsForm />;
    case 'projects': return <ProjectsForm />;
    case 'custom': return <CustomSectionsForm />;
    case 'cover-letter': return <CoverLetterForm />;
    default: return <PersonalForm />;
  }
}
