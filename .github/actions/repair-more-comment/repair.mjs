const HANDOFF_RE = /^\[(?:ROOT )?(OWNER|MANAGER|EXECUTOR|REVIEWER)\s*(?:→|->)\s*(OWNER|MANAGER|EXECUTOR|REVIEWER)\]/;

const STRUCTURAL_LABELS = [
  'Status',
  'Disposition',
  'Work item',
  'Objective',
  'Result',
  'Decision',
  'Authority',
  'Return',
  'Verification',
  'Subject',
  'Exact approved subject',
  'Exact reviewed subject',
];

function countMatches(value, re) {
  return Array.from(value.matchAll(re)).length;
}

export function repairMoreComment(body) {
  if (typeof body !== 'string' || !HANDOFF_RE.test(body)) {
    return { changed: false, reason: 'not-more-handoff' };
  }

  const realNewlines = countMatches(body, /\n/g);
  const escapedProbe = body.replace(/(?<!\\)\\r\\n/g, '\\n');
  const escapedNewlines = countMatches(escapedProbe, /(?<!\\)\\n/g);

  if (escapedNewlines < 3) {
    return { changed: false, reason: 'too-few-escaped-newlines', escapedNewlines, realNewlines };
  }

  if (realNewlines > 1) {
    return { changed: false, reason: 'already-multiline', escapedNewlines, realNewlines };
  }

  const labelAlternation = STRUCTURAL_LABELS
    .map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const structuralBreak = new RegExp(
    `(?<!\\\\)\\\\n(?<!\\\\)\\\\n(?:${labelAlternation}):`,
  );

  if (!structuralBreak.test(escapedProbe)) {
    return { changed: false, reason: 'no-structural-break', escapedNewlines, realNewlines };
  }

  const repaired = body
    .replace(/(?<!\\)\\r\\n/g, '\n')
    .replace(/(?<!\\)\\n/g, '\n');

  if (repaired === body || !HANDOFF_RE.test(repaired)) {
    return { changed: false, reason: 'repair-not-safe', escapedNewlines, realNewlines };
  }

  return { changed: true, body: repaired, escapedNewlines, realNewlines };
}
