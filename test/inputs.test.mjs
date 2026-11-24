import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const d = JSON.parse(readFileSync(new URL('../inputs/session.json', import.meta.url), 'utf8'));

test("权威词包形状和打分页可对应", () => {
  assert.ok(d.vocab.every(([id,s])=>d.shards.some(x=>x.id===s && x.logits.some(r=>r[0]===id))));
});

test("回放序列在概率半开区间", () => {
  assert.ok(d.replay.every(x=>0<=x&&x<1));
});

test("复制别名可能压过权威符号", () => {
  assert.ok(d.vocab.filter(x=>x[2]==='继续').length===2 && d.shards[1].logits[0][1]>d.shards[0].logits[0][1]);
});
