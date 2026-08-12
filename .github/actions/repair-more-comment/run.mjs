import fs from 'node:fs/promises';
import { repairMoreComment } from './repair.mjs';

async function main() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  const repository = process.env.GITHUB_REPOSITORY;

  if (!eventPath || !repository) {
    throw new Error('GITHUB_EVENT_PATH and GITHUB_REPOSITORY are required.');
  }

  const event = JSON.parse(await fs.readFile(eventPath, 'utf8'));

  if (event.action && event.action !== 'created') {
    console.log(`No repair: event action is ${event.action}, not created.`);
    return;
  }

  const comment = event.comment;
  if (!comment?.id || typeof comment.body !== 'string') {
    console.log('No repair: event does not contain an issue comment.');
    return;
  }

  const result = repairMoreComment(comment.body);
  if (!result.changed) {
    console.log(`No repair: ${result.reason}.`);
    return;
  }

  const token = process.env.INPUT_GITHUB_TOKEN;
  if (!token) {
    throw new Error('github-token input is required to update the comment.');
  }

  const [owner, repo] = repository.split('/');
  if (!owner || !repo) {
    throw new Error(`Invalid GITHUB_REPOSITORY value: ${repository}`);
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/comments/${comment.id}`,
    {
      method: 'PATCH',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'more-comment-repair-action',
      },
      body: JSON.stringify({ body: result.body }),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub comment update failed (${response.status}): ${detail}`);
  }

  console.log(
    `Repaired malformed MORE publication: comment=${comment.id} escaped_newlines=${result.escapedNewlines}`,
  );
}

await main();
