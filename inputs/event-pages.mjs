import {readFileSync} from 'node:fs';
const data = JSON.parse(readFileSync(new URL('./event-pages.json', import.meta.url), 'utf8'));
export function eventPage(page) {
  const lo=page*data.pageBins, hi=Math.min(lo+data.pageBins,data.bins);
  const events=[];
  for(let i=lo;i<hi;i++) {
    if (i%3===1) events.push([`event-${i}`,'P',i,[i,i],(Math.imul(i,19)>>>1)%data.types]);
  }
  for(const x of data.duplicates) if(x[2]>=lo&&x[2]<hi) events.push([...x,0]);
  return {events,masks:data.masks.filter(([a,b])=>a<hi&&b>lo)};
}
export function hazardCoefficients(target, source) {
  return Float64Array.from({length:data.decay.length},(_,k)=>(1+(target*13+source*187+k)%11)/128);
}

export function fillPage() { return [data.corrected, data.linked]; }
