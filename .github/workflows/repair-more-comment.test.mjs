import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync(
  new URL('./repair-more-comment.yml', import.meta.url),
  'utf8',
);

test('reusable workflow executes its co-located implementation at the same commit', () => {
  assert.match(workflow, /repository: \$\{\{ job\.workflow_repository \}\}/);
  assert.match(workflow, /ref: \$\{\{ job\.workflow_sha \}\}/);
  assert.match(
    workflow,
    /uses: \.\/\.more-agent-protocol\/\.github\/actions\/repair-more-comment/,
  );
  assert.doesNotMatch(
    workflow,
    /uses:\s+\S*repair-more-comment@/,
  );
});

test('workflow source checkout is immutable and does not persist credentials', () => {
  assert.match(workflow, /uses: actions\/checkout@[0-9a-f]{40}/);
  assert.match(workflow, /persist-credentials: false/);
});
