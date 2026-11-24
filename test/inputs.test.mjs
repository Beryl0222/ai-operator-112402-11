import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import { eventPage, hazardCoefficients, fillPage } from '../inputs/event-pages.mjs';

const data=JSON.parse(readFileSync(new URL('../inputs/event-pages.json',import.meta.url),'utf8'));
test('腕表和手机的规范事件的格式与关联', () => {
  assert.equal(data.hours*60,data.bins);
  assert.ok(data.decay.every(v=>v>0));
  assert.equal(data.duplicates[0][0],data.duplicates[1][0]);
  assert.notEqual(data.duplicates[0][1],data.duplicates[1][1]);
  const page = eventPage(40);
  assert.ok(page.events.every(e=>e[3][0]<=e[2]&&e[3][1]>=e[2]));
  assert.ok(data.masks.some(m=>m[0]<data.corrected[2]&&m[1]>data.corrected[2]));
  assert.ok(data.reReads<data.bins/data.pageBins);
  assert.deepEqual(data.coupling.map(a=>a[0]),[data.duplicates[0][0],data.corrected[0]]);
  assert.ok(data.linked[3][0]-data.corrected[3][1]<=data.coupling[1][3]);

  assert.ok(data.alertThresholds.some(r=>r.t > data.corrected[3][0] && r.t < data.corrected[3][1]));
  assert.equal(fillPage().length,2);
  assert.ok(fillPage().every(e=>e[1]==='H'&&e[2]>=data.fillInterval[0]&&e[2]<data.fillInterval[1]));
});
