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
    <div className="h-full min-h-[297mm] p-12 text-[10.5pt] text-slate-700" style={{ fontFamily }}>
      {/* Sender info block */}
      <div className="mb-6">
        <div className="text-[12pt] font-bold text-slate-800 mb-1">{fullName}</div>
        <div className="text-[9pt] text-slate-500 space-y-0.5">
          <div>{email}</div>
          <div>{phone}</div>
          <div>{location}</div>
          {linkedIn && <div>{linkedIn}</div>}
        </div>
      </div>

      <div className="text-[9pt] text-slate-500 mb-5">{today}</div>

      {/* Recipient */}
      <div className="mb-5 text-[9.5pt] text-slate-700 space-y-0.5">
        {coverLetter.recipientName && <div>{coverLetter.recipientName}</div>}
        {coverLetter.jobTitle && <div>{coverLetter.jobTitle}</div>}
        {coverLetter.companyName && <div>{coverLetter.companyName}</div>}
        {coverLetter.companyAddress && <div className="text-slate-500">{coverLetter.companyAddress}</div>}
      </div>

      {/* Subject */}
      <div className="mb-5 text-[10pt] font-semibold text-slate-800">
        {coverLetter.subject || (coverLetter.jobTitle ? 'Re: Application for ' + coverLetter.jobTitle : '')}
      </div>

      {/* Greeting */}
      <div className="mb-4 text-[10pt] text-slate-700">
        {coverLetter.greeting || (coverLetter.recipientName ? 'Dear ' + coverLetter.recipientName + ',' : 'Dear Hiring Manager,')}
      </div>

      {/* Body */}
      <div className="text-[10pt] text-slate-600 leading-relaxed space-y-4">
        {coverLetter.opening ? (
          <p>{coverLetter.opening}</p>
        ) : (
          <p className="text-slate-300 italic">I am writing to express my strong interest in the {coverLetter.jobTitle || '[Position]'} position at {coverLetter.companyName || '[Company]'}. With my background and skills, I believe I would be a valuable addition to your team.</p>
        )}

        {coverLetter.body ? (
          <p>{coverLetter.body}</p>
        ) : (
          <p className="text-slate-300 italic">Throughout my career, I have developed a strong foundation in my field. My experience has equipped me with the skills necessary to contribute effectively to your organization and help drive meaningful results. I am particularly drawn to this opportunity because of my passion for innovation and commitment to excellence.</p>
        )}

        {coverLetter.closing ? (
          <p>{coverLetter.closing}</p>
        ) : (
          <p className="text-slate-300 italic">I would welcome the opportunity to discuss how my background and skills would benefit {coverLetter.companyName || 'your organization'}. Thank you for your time and consideration. I look forward to hearing from you.</p>
        )}
      </div>

      {/* Signature */}
      <div className="mt-8 pt-4">
        <p className="text-[10pt] text-slate-700">Sincerely,</p>
        <p className="text-[11pt] font-semibold text-slate-800 mt-6">{fullName}</p>
        <div className="text-[8.5pt] text-slate-400 mt-0.5">
          {email} | {phone}
        </div>
      </div>
    </div>
  );
}
