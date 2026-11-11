'use strict';
window.KBUpdates = {
  validate(data, existingArticles, existingEditions) {
    const fail = () => { throw new Error('Invalid public update data'); };
    const str = x => typeof x === 'string' && x.length > 0;
    const list = x => Array.isArray(x) && x.every(str);
    const id = x => str(x) && /^[a-z0-9-]+$/.test(x);
    if (!data || data.version !== 1 || !/^\d{4}-\d{2}-\d{2}$/.test(data.updatedAt) || !['articles','weekly','monthly'].every(k=>Array.isArray(data[k]))) fail();
    const ids = new Set(existingArticles.map(a=>a.id));
    for (const a of data.articles) {
      if (!id(a.id) || ids.has(a.id)) fail();
      ids.add(a.id);
      if (!['title','deck','topic','kind','age','access','issue','published','reviewed','edition','color','sourceTitle','sourceLabel','author','publication','limit'].every(k=>str(a[k]))) fail();
      if (!['audience','tags','summary','overview','interpretation','practice'].every(k=>list(a[k]))) fail();
      if (!a.summary.length || !a.overview.length || !a.interpretation.length || !Number.isFinite(a.minutes) || a.minutes < 1) fail();
      if (!a.applications || !str(a.applications['유치원']) || !str(a.applications['어린이집'])) fail();
      const url = new URL(a.url);
      if (url.protocol !== 'https:' || !(url.hostname === 'naeyc.org' || url.hostname.endsWith('.naeyc.org'))) fail();
    }
    for (const [key, base] of [['weekly',existingEditions],['monthly',[]]]) {
      const seen = new Set(base.map(e=>e.id));
      for (const e of data[key]) {
        if (!id(e.id) || seen.has(e.id)) fail();
        seen.add(e.id);
        if (!['label','period','date','title','description'].every(k=>str(e[k])) || !list(e.ids) || !e.ids.every(x=>ids.has(x))) fail();
        if (e.periodStart && !/^\d{4}-\d{2}-\d{2}$/.test(e.periodStart)) fail();
        if (e.pending && (!Array.isArray(e.pending) || !e.pending.every(p=>['title','published','note','url'].every(k=>str(p[k])) && /^https:\/\/(www\.)?naeyc\.org\//.test(p.url)))) fail();
        if (key === 'monthly' && (!list(e.summary) || !e.summary.length)) fail();
      }
    }
    const weeks=new Set([...existingEditions,...data.weekly].map(e=>e.id));
    for(const m of data.monthly){
      if(m.weekIds && (!list(m.weekIds)||!m.weekIds.every(id=>weeks.has(id)))) fail();
      if(m.highlights && (!Array.isArray(m.highlights)||!m.highlights.every(h=>str(h.title)&&list(h.body)&&list(h.weekIds)&&h.weekIds.every(id=>weeks.has(id))))) fail();
      if(m.coverage!==undefined && !str(m.coverage)) fail();
    }
    return data;
  },
  async load() {
    const response = await fetch('updates.json', {cache:'no-store'});
    if (!response.ok) throw new Error('Public updates unavailable');
    const data = this.validate(await response.json(), window.INSIGHTS, window.EDITIONS);
    window.INSIGHTS.unshift(...data.articles);
    window.EDITIONS.unshift(...data.weekly);
    const key=e=>e.periodStart||(e.date||e.reviewed||'').replaceAll('.','-');
    window.EDITIONS.sort((a,b)=>key(b).localeCompare(key(a)));
    window.INSIGHTS.sort((a,b)=>key(b).localeCompare(key(a)));
    window.MONTHLY = data.monthly.sort((a,b)=>b.id.localeCompare(a.id));
    window.UPDATED_AT = data.updatedAt;
  }
};
