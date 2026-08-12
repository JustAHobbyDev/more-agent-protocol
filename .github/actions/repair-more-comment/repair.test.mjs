import test from 'node:test';
import assert from 'node:assert/strict';
import { repairMoreComment } from './repair.mjs';

test('repairs malformed reviewer handoff', () => {
  const body = String.raw`[REVIEWER → MANAGER]\n\nDisposition:\nAPPROVE\n\nWork item:\nIssue #86`;
  const result = repairMoreComment(body);

  assert.equal(result.changed, true);
  assert.equal(
    result.body,
    '[REVIEWER → MANAGER]\n\nDisposition:\nAPPROVE\n\nWork item:\nIssue #86',
  );
});

test('leaves normal multiline MORE comment unchanged', () => {
  const body = '[REVIEWER → MANAGER]\n\nDisposition:\nAPPROVE';
  assert.equal(repairMoreComment(body).changed, false);
});

test('leaves non-MORE text with escaped newlines unchanged', () => {
  const body = String.raw`example\n\nStatus:\nok\nmore`;
  assert.equal(repairMoreComment(body).changed, false);
});

test('leaves code-like escaped newlines unchanged outside MORE signature', () => {
  const body = String.raw`const x = "a\nb\nc";`;
  assert.equal(repairMoreComment(body).changed, false);
});

test('fails closed on too few escaped newlines', () => {
  const body = String.raw`[MANAGER → EXECUTOR]\nStatus:\nACTIVE`;
  assert.equal(repairMoreComment(body).changed, false);
});

test('fails closed without a recognizable structural blank line', () => {
  const body = String.raw`[MANAGER → EXECUTOR]\nhello\nworld\nagain`;
  assert.equal(repairMoreComment(body).changed, false);
});

test('fails closed on unknown role header', () => {
  const body = String.raw`[BOT → MANAGER]\n\nStatus:\nACTIVE\nWork item: 1`;
  assert.equal(repairMoreComment(body).changed, false);
});

test('repairs escaped CRLF', () => {
  const body = String.raw`[EXECUTOR → MANAGER]\r\n\r\nStatus:\r\nCOMPLETE\r\n\r\nResult:\r\nDone`;
  const result = repairMoreComment(body);

  assert.equal(result.changed, true);
  assert.equal(result.body, '[EXECUTOR → MANAGER]\n\nStatus:\nCOMPLETE\n\nResult:\nDone');
});

test('preserves double-escaped literal backslash-n sequences', () => {
  const body = String.raw`[REVIEWER → MANAGER]\n\nDisposition:\nREQUEST CHANGES\n\nResult:\nKeep literal \\n in code`;
  const result = repairMoreComment(body);

  assert.equal(result.changed, true);
  assert.match(result.body, /literal \\\\n in code/);
});

test('repaired body keeps the same addressed header', () => {
  const body = String.raw`[ROOT MANAGER → MANAGER]\n\nStatus:\nCOMPLETE\n\nReturn:\nIssue #30`;
  const result = repairMoreComment(body);

  assert.equal(result.changed, true);
  assert.ok(result.body.startsWith('[ROOT MANAGER → MANAGER]'));
});
