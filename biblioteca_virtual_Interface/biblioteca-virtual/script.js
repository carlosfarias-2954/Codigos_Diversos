const B=[
{id:'sust',t:'Sustentabilidade: gestão estratégica na prática',a:'Sonia Lopes e outro(s)',c:'#1f6f5c',f:'#fff',fm:['EPUB'],r:4,n:88,s:'acervo'},
{id:'his',t:'Histologia',a:'Gentileza Santos Martins Neiva',c:'#0c5a6a',f:'#f0b429',fm:['EPUB','PDF'],r:4,n:131,s:'sug'},
{id:'adm',t:'Fundamentos de administração',a:'Filipe Sobral e outro(s)',c:'#8d2a2d',f:'#ff9a9a',fm:['EPUB','PDF'],r:4,n:52,s:'sug'},
{id:'cont',t:'Análise das demonstrações contábeis',a:'Samir Bazzi',c:'#bfd92c',f:'#173a63',fm:['PDF'],r:4,n:50,s:'sug'},
{id:'qui',t:'Química: a ciência central',a:'Theodore L. Brown e outro(s)',c:'#2a1706',f:'#f5b92e',fm:['EPUB'],r:4,n:119,s:'sug'},
{id:'lid',t:'Reinventando a liderança',a:'Renata Di Nizo',c:'#243457',f:'#fff',fm:['EPUB'],r:4,n:159,s:'sug'},
{id:'ens',t:'Ensino jurídico: do império à contemporaneidade',a:'Cleyson de Moraes Mello',c:'#c9a45c',f:'#5a3a10',fm:['NOVO','PDF'],r:0,n:0,s:'new'},
{id:'10a',t:'10 anos de vigência do estatuto da pessoa com deficiência',a:'Heloisa Helena Barboza e outro(s)',c:'#2e3a2e',f:'#e8e3d0',fm:['NOVO','PDF'],r:0,n:0,s:'new'},
{id:'eca',t:'Eca digital: estatuto digital da criança e do adolescente',a:'Marcia Ignácio',c:'#0b3a5c',f:'#fff',fm:['NOVO','PDF'],r:0,n:0,s:'new'},
{id:'sen',t:'Técnica de sentença penal descomplicada para concursos',a:'Daniel Konder de Almeida',c:'#eef3fb',f:'#14407a',fm:['NOVO','PDF'],r:0,n:0,s:'new'},
{id:'jus',t:'Justiça, cidades e infâncias: limites e desafios',a:'Daniel Konder de Almeida',c:'#8fb8a0',f:'#1d3b2e',fm:['NOVO','PDF'],r:0,n:0,s:'new'},
{id:'ana',t:'Ana Karenina',a:'Liev Tolstói e outro(s)',c:'#5a2a22',f:'#f1d9c8',fm:['EPUB'],r:4,n:37,s:'trend'},
{id:'gra',t:'Nova gramática do português contemporâneo',a:'Celso Cunha e outro(s)',c:'#e8a93a',f:'#173a63',fm:['EPUB','PDF'],r:4,n:62,s:'trend'},
{id:'fio',t:'Fiódor Dostoiévski: obra completa',a:'Fiódor Dostoiévski',c:'#7a7673',f:'#eee',fm:['EPUB'],r:4,n:20,s:'trend'},
{id:'hist',t:'Livros históricos',a:'Flavio Dalla Vecchia',c:'#8a62b0',f:'#fff',fm:['EPUB'],r:0,n:0,s:'trend'},
{id:'leg',t:'Legal design: visual law, design thinking',a:'Alexandre Zavaglia Coelho e outro(s)',c:'#0a2a86',f:'#ffd24d',fm:['EPUB'],r:4,n:7,s:'trend'}];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let L=ld('bv_list',[]),R=ld('bv_read',[]),D=ld('bv_done',[]),zoom=1,likes=false;
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),2200)};
const stars=b=>'<span class="st">'+'★'.repeat(b.r)+'<span class="o">'+'★'.repeat(5-b.r)+'</span><em>('+b.n+')</em></span>';
function card(b,cd){const sh=b.t.split(/[:\-–]/)[0];
return `<article class="book${cd?' cd':''}">${cd?`<button class="bk${L.includes(b.id)?' on':''}" data-bk="${b.id}" aria-label="Salvar na lista"><svg viewBox="0 0 24 24"><path d="M12 20s-8-5-8-10a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 10c0 5-8 10-8 10z"/></svg></button>`:''}
<div class="cvw"><button data-open="${b.id}" aria-label="Abrir ${b.t}"><div class="cover" style="background:${b.c};color:${b.f}">${sh}<img src="capas/${b.id}.jpg" alt="" onerror="this.remove()"></div></button><div class="tags">${b.fm.map(x=>`<span class="tg ${x}">${x}</span>`).join('')}</div></div>
${stars(b)}<h3>${b.t.length>50?b.t.slice(0,48)+'…':b.t}</h3><p>${b.a}</p></article>`}
const G={sust:'Economia de negócios',his:'Medicina e saúde',adm:'Economia de negócios',cont:'Economia de negócios',qui:'Ciência',lid:'Economia de negócios',ens:'Direito','10a':'Direito',eca:'Direito',sen:'Direito',jus:'Direito',ana:'Ficção',gra:'Artes e disciplinas da linguagem',fio:'Ficção',hist:'História',leg:'Design'};
const by=s=>{const p=ld('bv_pref',[])||[];return B.filter(b=>b.s===s).sort((a,b)=>p.includes(G[b.id])-p.includes(G[a.id]))};
function arrows(sec){const tr=sec.querySelector('.track'),bs=sec.querySelectorAll('.arrows button'),u=()=>{bs[0].disabled=tr.scrollLeft<5;bs[1].disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-5};
bs.forEach(x=>x.onclick=()=>tr.scrollBy({left:x.dataset.d*tr.clientWidth*.9}));tr.onscroll=u;u()}
function render(){
 $('#sug').innerHTML=`<section class="sec" id="s-sug" style="margin-top:44px"><div class="shead"><h2 style="margin:0">Sugestões de leitura</h2><div class="arrows"><button data-d="-1" aria-label="Anterior">‹</button><button data-d="1" aria-label="Próximo">›</button></div></div><div class="track">${by('sug').map(b=>card(b,0)).join('')}</div></section>`;
 $('#s-new .track').innerHTML=by('new').map(b=>card(b,1)).join('');
 $('#s-trend .track').innerHTML=by('trend').map(b=>card(b,1)).join('');
 const ml=L.map(i=>B.find(b=>b.id===i));
 $('#mylist').innerHTML=ml.length?`<div class="track">${ml.map(b=>card(b,1)).join('')}</div>`:'<p class="empty">Sua lista está vazia. Use o ícone ♡ em um livro para salvá-lo aqui.</p>';
 ['#s-sug','#s-new','#s-trend'].forEach(s=>arrows($(s)));
}
const NAV=[['nav1',[['home','Início','M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10'],['acervo','Acervo','M4 4v16M9 4v16M14 6l5 14']]],
['nav2',[['listas','Minhas Listas','M12 20s-8-5-8-10a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 10c0 5-8 10-8 10z'],['lendo','Continuar Lendo','M5 20h14M7 20v-8h10v8M12 8V5'],['sugest','Sugestões de Leitura','M12 6a4 4 0 100 8 4 4 0 000-8zM10 17h4M10 20h4'],['lidos','Livros Lidos','M4 12a8 8 0 108-8M4 4v5h5M12 8v5l3 2']]]];
NAV.forEach(([id,it])=>$('#'+id).innerHTML=it.map(([k,l,p])=>`<button class="nv${k==='home'?' on':''}" data-v="${k}"><svg viewBox="0 0 24 24"><path d="${p}"/></svg>${l}</button>`).join(''));
const TT={expert:'Expert Reader',acervo:'Acervo',anot:'Minhas Anotações',listas:'Minhas Listas',lendo:'Continuar Lendo',cartoes:'Cartões de Estudo',lidos:'Livros Lidos',ativ:'Atividades por Livro',audio:'Audiolivro'};
function view(k,list){$$('.nv').forEach(n=>n.classList.toggle('on',n.dataset.v===k));
 const home=k==='home'||k==='sugest';$('#sug').hidden=!home;$('#notice').hidden=!home||!!ld('bv_pref',null);$('#home').hidden=!home;$('#alt').hidden=home;
 if(home){window.scrollTo({top:0,behavior:'smooth'});return}
 $('#altT').textContent=list?'Resultados da busca':TT[k];
 let items=list||(k==='acervo'?B:k==='listas'?L.map(i=>B.find(b=>b.id===i)):k==='lendo'?R.slice().reverse().map(i=>B.find(b=>b.id===i)):k==='lidos'?D.map(i=>B.find(b=>b.id===i)):null);
 $('#altB').innerHTML=items?(items.length?`<div class="grid">${items.map(b=>card(b,1)).join('')}</div>`:'<p class="empty">Nenhum livro por aqui ainda.</p>'):'<p class="empty">Este recurso ainda não tem conteúdo. Abra um livro para começar.</p>';
}
function openBook(id){const b=B.find(x=>x.id===id),s=L.includes(id);
 $('#dlgB').innerHTML=`<div class="det"><div class="cvw"><div class="cover" style="background:${b.c};color:${b.f}">${b.t.split(/[:\-–]/)[0]}<img src="capas/${b.id}.jpg" alt="" onerror="this.remove()"></div></div><div><h3>${b.t}</h3><p>${b.a}</p>${b.n?stars({...b,}).replace('class="st"','class="st" style="color:var(--star)"'):'<p>Sem avaliações ainda.</p>'}<p>Formatos: ${b.fm.join(', ')}</p></div></div>
 <div class="mrow"><button class="btn g" data-a="list">${s?'Remover da lista':'Adicionar à lista'}</button><button class="btn g" data-a="done">${D.includes(id)?'Desmarcar como lido':'Marcar como lido'}</button><button class="btn" data-a="read">Ler agora</button></div>`;
 $('#dlgB').dataset.id=id;$('#dlg').showModal()}
function modal(h){$('#dlgB').innerHTML=h;$('#dlg').showModal()}
function toggle(arr,id,key){const i=arr.indexOf(id);i>-1?arr.splice(i,1):arr.push(id);sv(key,arr);return i<0}
document.addEventListener('click',e=>{const t=e.target.closest('button');
 if(e.target===$('#dlg'))$('#dlg').close();
 if(!t){$$('.menu').forEach(m=>m.remove());return}
 if(!t.closest('.menu')&&!t.dataset.menu)$$('.menu').forEach(m=>m.remove());
 if(t.dataset.v){$('#q').value='';view(t.dataset.v)}
 else if(t.dataset.open)openBook(t.dataset.open);
 else if(t.dataset.bk){const on=toggle(L,t.dataset.bk,'bv_list');toast(on?'Adicionado à Minha Lista':'Removido da Minha Lista');const k=window.scrollY;render();if(!$('#alt').hidden)view($('.nv.on').dataset.v);window.scrollTo(0,k)}
 else if(t.dataset.a){const id=$('#dlgB').dataset.id,a=t.dataset.a;
  if(a==='list'){toast(toggle(L,id,'bv_list')?'Adicionado à Minha Lista':'Removido da Minha Lista')}
  if(a==='done'){toast(toggle(D,id,'bv_done')?'Marcado como lido':'Desmarcado')}
  if(a==='read'){if(PDF[id]){R=R.filter(x=>x!==id);R.push(id);sv('bv_read',R);setTimeout(()=>{$('#q').value='';view('lendo');openReader(id)},0)}else toast('Este livro ainda não tem arquivo para leitura')}
  $('#dlg').close();const k=window.scrollY;render();if(!$('#alt').hidden)view($('.nv.on').dataset.v);window.scrollTo(0,k)}
 else if(t.dataset.chip){const c=t.dataset.chip;P.has(c)?P.delete(c):P.add(c);t.classList.toggle('on')}
 else if(t.dataset.pv!==undefined){+$('#dlg').dataset.step===2?prefs(1):$('#dlg').close()}
 else if(t.dataset.pn!==undefined){if(+$('#dlg').dataset.step===1)prefs(2);else{sv('bv_pref',P.size?[...P]:null);$('#notice').hidden=P.size>0;$('#dlg').close();render();toast(P.size?'Preferências salvas — sugestões atualizadas':'Preferências removidas')}}
 else if(t.dataset.close!==undefined)$('#dlg').close();
});
$('#q').addEventListener('input',e=>{const v=e.target.value.trim().toLowerCase();if(!v){view('home');return}
 view('acervo',B.filter(b=>(b.t+' '+b.a).toLowerCase().includes(v)));$$('.nv').forEach(n=>n.classList.remove('on'))});
const PRO=['Arquitetura','Arte','Artes e disciplinas da linguagem','Artes performáticas','Ciência','Ciência política','Ciências sociais','Design','Direito','Economia de negócios','Educação','Ensino superior, testes e seleção','Filosofia','História','Matemática','Medicina e saúde','Psicologia','Tecnologia e computador','Tecnologia e engenharias'],
LIT=['Biografia e autobiografia','Coleções literárias','Crítica literária','Drama','Ficção','Ficção infanto-juvenil','Pesquisas científicas','Documentação','Poesia','Religião'];
let P=new Set();
function prefs(step=1){if(step===1)P=new Set(ld('bv_pref',[])||[]);
 modal(`<button class="x" data-close aria-label="Fechar">×</button><h3>Suas preferências Estilo ${step===1?'Profissional':'Literário'}</h3><div class="chips">${(step===1?PRO:LIT).map(x=>`<button class="chip${P.has(x)?' on':''}" data-chip="${x}">${x}</button>`).join('')}</div><div class="mrow sp"><button class="btn g" data-pv>Voltar</button><button class="btn" data-pn>${step===1?'Próximo':'Salvar Preferências'}</button></div>`);
 $('#dlg').dataset.step=step}
$('#pref').onclick=()=>prefs(1);
$('#sh').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);toast('Link copiado')}catch(e){toast('Não foi possível copiar o link')}};
$('#lk').onclick=()=>{likes=!likes;$('#lk').firstChild.textContent=likes?'♥ ':'♡ ';$('#lkn').textContent=likes?2647:2646};
$('#go').onclick=()=>openBook('sust');
render();if(ld('bv_pref',null))$('#notice').hidden=true;

const root=document.documentElement;
function setTheme(t,save){root.dataset.theme=t;if(save)sv('bv_theme',t);const d=t==='dark';
 $('#ti').textContent=d?'☀':'☾';$('#tl').textContent=d?'Modo claro':'Modo escuro';$('#theme').setAttribute('aria-pressed',d)}
setTheme(ld('bv_theme',null)||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'),false);
$('#theme').onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark',true);

const PDF={ana:'livros/ana.pdf'};
function openReader(id){const b=B.find(x=>x.id===id);$('#rdT').textContent=b.t;$('#rdF').src=PDF[id];$('#rdN').href=PDF[id];$('#rd').showModal()}
$('#rdX').onclick=()=>$('#rd').close();
$('#rd').addEventListener('close',()=>{$('#rdF').src='about:blank';toast('Livro salvo em Continuar Lendo')});
$('#rd').addEventListener('click',e=>{if(e.target===$('#rd'))$('#rd').close()});
