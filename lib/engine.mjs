export function normalize(text){return String(text||'').normalize('NFKC').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[إأآ]/g,'ا').replace(/ى/g,'ي').replace(/ـ/g,'').toLowerCase().trim();}
export function matches(text,keywords){const keys=String(keywords||'').split(/[,،]/).map(normalize).filter(Boolean);return keys.length===0||keys.some(k=>normalize(text).includes(k));}
export function validateAutomation(data){if(!String(data.name||'').trim())return 'اسم الأتمتة مطلوب';if(!String(data.reply||'').trim())return 'الرسالة الخاصة مطلوبة';if(String(data.reply).length>1000)return 'الرسالة طويلة جدًا';if(data.endsAt&&!Number.isFinite(Date.parse(data.endsAt)))return 'تاريخ غير صالح';return null;}
export function selectVariant(id,a,b){if(!b)return {variant:'A',text:a};let h=0;for(const c of id)h=(h*31+c.charCodeAt(0))>>>0;return h%2?{variant:'B',text:b}:{variant:'A',text:a};}
export function canReply(lastInbound,now=Date.now()){const t=Date.parse(lastInbound);return Number.isFinite(t)&&now-t>=0&&now-t<24*60*60*1000;}
export function csvCell(value){let s=String(value??'');if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export function commissionAmount(amount,rate=.25){if(!Number.isFinite(amount)||amount<0)throw new Error('Invalid amount');return Math.round(amount*rate*100)/100;}
export function validPublicUrl(input){try{const u=new URL(input);return u.protocol==='https:'&&!u.username&&!u.password&&!['localhost','127.0.0.1','[::1]'].includes(u.hostname);}catch{return false;}}
