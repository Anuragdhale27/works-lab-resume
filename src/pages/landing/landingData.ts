import type { ResumeData } from '../../types/resume';
import { sampleResumeData } from '../../lib/sampleData';
import sampleAvatar from '../../assets/sample-avatar.png';

/** Sample resume used by every landing demo. Trimmed (no awards or custom
 * sections) so the Modern template ends inside one A4 frame. Built from the
 * same sample data as the builder's "Load example". */
export const landingResumeData: ResumeData = {
  ...sampleResumeData,
  personal: { ...sampleResumeData.personal, photo: sampleAvatar },
  awards: [],
  customSections: [],
};
