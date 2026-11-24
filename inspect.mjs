import {readFileSync} from 'node:fs';
import * as input from './inputs/event-pages.mjs';

const source=JSON.parse(readFileSync(new URL('./inputs/event-pages.json',import.meta.url),'utf8'));
console.log(JSON.stringify({名称:'腕表和手机的规范事件',首项:source['hours'],字段:Object.keys(source),取数函数:Object.keys(input)},null,2));
