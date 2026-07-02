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
      {/* Sender */}
      <div className="mb-6">
        <div className="text-[12pt] font-bold text-slate-800">{fullName}</div>
        <div className="text-[9pt] text-slate-500 space-y-0.5">
          <div>{email} | {phone}</div>
          <div>{location}</div>
          {linkedIn && <div>{linkedIn}</div>}
        </div>
      </div>

      <div className="text-[9pt] text-slate-500 mb-5">{today}</div>

      {/* Recipient block */}
      <div className="mb-5 text-[10pt] text-slate-700 space-y-0.5">
        {coverLetter.recipientName && <div>{coverLetter.recipientName}</div>}
        {coverLetter.companyName && <div>{coverLetter.companyName}</div>}
        {coverLetter.companyAddress && <div className="text-[9pt] text-slate-500">{coverLetter.companyAddress}</div>}
      </div>

      {/* Subject line */}
      <div className="mb-4 text-[10pt] font-semibold text-slate-800">
        {coverLetter.subject || (coverLetter.jobTitle ? 'Re: Application for ' + coverLetter.jobTitle + ' Position' : 'Re: Application')}
      </div>
      {coverLetter.jobTitle && (
        <div className="mb-4 text-[10pt] text-slate-700">
          <span className="font-medium">Position Applied:</span> {coverLetter.jobTitle}
        </div>
      )}

      {/* Greeting */}
      <div className="mb-4 text-[10pt]">
        {coverLetter.greeting || (coverLetter.recipientName ? 'Dear ' + coverLetter.recipientName + ',' : 'Dear Hiring Manager,')}
      </div>

      {/* Body */}
      <div className="text-[10pt] text-slate-600 leading-relaxed space-y-4">
        {coverLetter.opening ? (
          <p>{coverLetter.opening}</p>
        ) : (
          <p className="text-slate-300 italic">I am writing to express my strong interest in the {coverLetter.jobTitle || '[Position]'} position at {coverLetter.companyName || '[Company]'}.</p>
        )}

        {coverLetter.body ? (
          <p>{coverLetter.body}</p>
        ) : (
          <p className="text-slate-300 italic">Throughout my career, I have developed expertise in my field. My experience has equipped me to contribute effectively to your organization.</p>
        )}

        {coverLetter.closing ? (
          <p>{coverLetter.closing}</p>
        ) : (
          <p className="text-slate-300 italic">I welcome the opportunity to discuss my qualifications further. Thank you for your consideration.</p>
        )}
      </div>

      {/* Signature */}
      <div className="mt-8">
        <p className="text-[10pt]">Sincerely,</p>
        <p className="text-[11pt] font-semibold text-slate-800 mt-5">{fullName}</p>
        <div className="text-[8.5pt] text-slate-400 mt-1">{email} | {phone}</div>
      </div>
    </div>
  );
}

