import test from 'node:test'; import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {validateOpportunities,filterOpportunities} from '../src/lib/catalog.js';
const items=JSON.parse(readFileSync(new URL('../src/data/opportunities.json',import.meta.url),'utf8'));
test('25 valid unique official-source records',()=>{assert.equal(items.length,25);assert.deepEqual(validateOpportunities(items),[])});
test('scope counts',()=>{for(const [scope,count] of [['داخل المغرب',17],['خارج المغرب',3],['عن بعد',5]])assert.equal(filterOpportunities(items,{scope}).length,count)});
test('query and category filters combined',()=>{assert.ok(filterOpportunities(items,{category:'ورشة',scope:'داخل المغرب',query:'الدار البيضاء'}).length>0);assert.equal(filterOpportunities(items,{scope:'خارج المغرب',query:'بيضاوية'}).length,0)});
