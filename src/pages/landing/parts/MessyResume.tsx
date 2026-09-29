import { sampleResumeData as d } from '../../../lib/sampleData';
import { parseDescription } from '../../../lib/parseDescription';

/** Deliberately poorly structured resume built from the same sample data.
 * Plain HTML/CSS only. Shows commonly cited ATS pitfalls: tables for layout,
 * a graphic in place of text, decorative bullets, mixed date formats,
 * non-standard headings and run-together paragraphs. Illustrative only. */
const bulletsOf = (text: string): string[] =>
  parseDescription(text).flatMap((b) => (b.type === 'bullets' ? b.items ?? [] : b.text ? [b.text] : []));

export function MessyResume() {
  const [job1, job2] = d.experience;
  const edu = d.education[0];
  const proj = d.projects[0];
  const cert = d.certifications[0];
  const award = d.awards[0];
  const p = d.personal;
  const marks = ['➢', '»', '✦', '❖'];
  const skillRows: string[][] = [];
  for (let i = 0; i < d.skills.length; i += 2) skillRows.push(d.skills.slice(i, i + 2));

  return (
    <div className="lp-messy">
      <div className="lp-messy-top">
        <div className="lp-messy-logo" />
        <div className="lp-messy-name">
          {p.name.toUpperCase()}
          <span>{p.title}</span>
        </div>
      </div>

      <table className="lp-messy-box">
        <tbody>
          <tr>
            <td>Email: {p.email}</td>
            <td>Mob: {p.phone}</td>
          </tr>
          <tr>
            <td>Address: {p.location}</td>
            <td>{p.linkedin}</td>
          </tr>
          <tr>
            <td colSpan={2}>Portfolio: {p.portfolio}</td>
          </tr>
        </tbody>
      </table>

      <div className="lp-messy-h lp-messy-h--u">PROFESSIONAL SUMMARY</div>
      <p className="lp-messy-p">{d.summary}</p>

      <div className="lp-messy-h lp-messy-h--i">Work history</div>
      <p className="lp-messy-p">
        <b>{job1.company}</b> — {job1.title}, {job1.location} <i>(06/2022 - now)</i>
      </p>
      <p className="lp-messy-p lp-messy-wall">{bulletsOf(job1.description).join('. ')}.</p>
      <p className="lp-messy-p">
        <b>{job2.company}</b> — {job2.title}, {job2.location} <i>(July 2020 to May 2022)</i>
      </p>
      {bulletsOf(job2.description).map((t, i) => (
        <p className="lp-messy-b" key={i}>
          {marks[i % marks.length]} {t}
        </p>
      ))}

      <div className="lp-messy-h">EDUCATION :</div>
      <p className="lp-messy-p">
        {edu.degree}, {edu.institution}, {edu.location} <i>2016-2020</i> ({edu.description})
      </p>

      <div className="lp-messy-h lp-messy-h--u">Key Skills &amp; Competencies</div>
      <table className="lp-messy-skills">
        <tbody>
          {skillRows.map((row, i) => (
            <tr key={i}>
              {row.map((s) => (
                <td key={s}>✦ {s}</td>
              ))}
              {row.length < 2 && <td />}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="lp-messy-h lp-messy-h--i">Projects</div>
      <p className="lp-messy-p">
        <b>{proj.name}</b> ({proj.tech}) {proj.url}
      </p>
      <p className="lp-messy-p lp-messy-wall">{bulletsOf(proj.description).join('. ')}.</p>

      <div className="lp-messy-h">CERTIFICATIONS &amp; AWARDS</div>
      <p className="lp-messy-b">
        ➢ {cert.name}, {cert.org} — Dec {cert.year}
      </p>
      <p className="lp-messy-b">
        ➢ {award.title}, {award.issuer} ({award.year})
      </p>
      <p className="lp-messy-p">
        Languages: {d.languages.map((l) => `${l.lang} (${l.level})`).join(' / ')}
      </p>
    </div>
  );
}
