import { CoverLetter } from '../../types/cv';

interface Props {
  coverLetter: CoverLetter;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  accentColor: string;
  fontFamily: string;
}

export function CoverLetterPreview({ coverLetter, fullName, email, phone, location, linkedIn, accentColor, fontFamily }: Props) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="h-full min-h-[297mm] p-10 text-[10pt] text-slate-700" style={{ fontFamily }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[14pt] font-bold text-slate-800">{fullName}</h1>
        <div className="text-[8.5pt] text-slate-500 mt-1 space-x-3">
          <span>{email}</span>
          <span>{phone}</span>
          <span>{location}</span>
          {linkedIn && <span>{linkedIn}</span>}
        </div>
      </div>

      <div className="text-[8.5pt] text-slate-500 mb-6">{today}</div>

      {/* Recipient */}
      {coverLetter.companyName && (
        <div className="mb-6">
          <div className="text-[9pt] text-slate-700">Hiring Manager</div>
          <div className="text-[9pt] text-slate-700">{coverLetter.companyName}</div>
        </div>
      )}

      {/* Subject */}
      {coverLetter.jobTitle && (
        <div className="mb-6 text-[9pt] font-semibold text-slate-800">
          Re: Application for {coverLetter.jobTitle}
        </div>
      )}

      <div className="text-[9.5pt] text-slate-600 leading-relaxed space-y-4">
        {/* Greeting */}
        <p>Dear Hiring Manager,</p>

        {/* Opening */}
        {coverLetter.opening ? (
          <p>{coverLetter.opening}</p>
        ) : (
          <p className="text-slate-400 italic">
            I am writing to express my strong interest in the
            {coverLetter.jobTitle ? ' ' + coverLetter.jobTitle : ''} position
            {coverLetter.companyName ? ' at ' + coverLetter.companyName : ''}.
            With my background and skills, I believe I would be a valuable addition to your team.
          </p>
        )}

        {/* Body */}
        {coverLetter.body ? (
          <p>{coverLetter.body}</p>
        ) : (
          <p className="text-slate-400 italic">
            Throughout my career, I have developed a strong foundation in my field.
            My experience has equipped me with the skills necessary to contribute
            effectively to your organization and help drive meaningful results.
          </p>
        )}

        {/* Closing */}
        {coverLetter.closing ? (
          <p>{coverLetter.closing}</p>
        ) : (
          <p className="text-slate-400 italic">
            I would welcome the opportunity to discuss how my background and skills
            would benefit {coverLetter.companyName || 'your organization'}.
            Thank you for your time and consideration.
          </p>
        )}

        {/* Signature */}
        <div className="pt-4">
          <p>Sincerely,</p>
          <p className="font-semibold text-slate-800 mt-4">{fullName}</p>
        </div>
      </div>
    </div>
  );
}
