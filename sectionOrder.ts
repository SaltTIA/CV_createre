import { CVData, SectionKey } from '../types/cv';
import type { ReactNode } from 'react';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export function fmt(d: string): string {
  if (!d) return '';
  const [y, m] = d.split('-');
  return months[parseInt(m)-1] + ' ' + y;
}

interface SectionRenderer {
  key: SectionKey;
  render: () => ReactNode;
}

export function getOrderedSections(
  cv: CVData,
  sectionOrder: SectionKey[],
  accentColor: string,
  renderers: Partial<Record<SectionKey, () => ReactNode>>,
): SectionRenderer[] {
  const result: SectionRenderer[] = [];
  for (const key of sectionOrder) {
    const fn = renderers[key];
    if (fn) result.push({ key, render: fn });
  }
  return result;
}
