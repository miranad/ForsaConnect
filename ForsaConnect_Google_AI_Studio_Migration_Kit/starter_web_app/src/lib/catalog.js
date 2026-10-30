export const SCOPES = ['الكل','داخل المغرب','خارج المغرب','عن بعد'];
export const FIELDS = ['id','title_ar','category','scope','location','organization','description_ar','eligibility_ar','event_date','application_deadline','cost_ar','application_method_ar','verification_status','source_url','notes_ar','verified_on'];
export function validateOpportunities(items) {
  const seen = new Set(); const errors = [];
  for (const [index,item] of items.entries()) {
    for (const k of FIELDS) if (typeof item[k] !== 'string') errors.push(`Record ${index + 1} missing string field ${k}`);
    if (seen.has(item.id)) errors.push(`Duplicate ID: ${item.id}`); seen.add(item.id);
    try {const u = new URL(item.source_url);if(u.protocol!=='https:')errors.push(`Not HTTPS: ${item.id}`)} catch {errors.push(`Invalid URL: ${item.id}`)}
  } return errors;
}
export function filterOpportunities(items,{scope='الكل',category='الكل',query=''}={}) {
  const q=query.trim().toLocaleLowerCase('ar');
  return items.filter(item => (scope==='الكل'||item.scope===scope) && (category==='الكل'||item.category===category) && (!q || [item.title_ar,item.organization,item.location,item.description_ar,item.eligibility_ar].some(v=>String(v||'').toLocaleLowerCase('ar').includes(q))));
}
export function asOfficialUrl(url) {
  try {const u=new URL(url); return u.protocol==='https:'?u.href:null;} catch {return null;}
}
