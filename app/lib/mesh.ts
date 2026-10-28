// @ts-nocheck
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, Flip, CustomEase);

var m = Lenis;
var ou = gsap;
var $ = ScrollTrigger;
var jl = Flip;
var au = CustomEase;
var su=new class{lenis=null;init(){return this.lenis?this.lenis:(this.lenis=new m({autoRaf:!1,smoothWheel:!0}),this.lenis.on(`scroll`,$.update),ou.ticker.add(e=>{this.lenis?.raf(e*1e3)}),ou.ticker.lagSmoothing(0),this.lenis)}resize(){this.lenis?.resize()}adoptNativeScroll(){if(this.lenis?.scrollTo(window.scrollY,{immediate:!0,force:!0}),this.lenis?.resize(),this.lenis){let e=document.documentElement.classList;e.add(`lenis`),e.toggle(`lenis-stopped`,!!this.lenis.isStopped)}}scrollTo(e,t){this.lenis?.scrollTo(e,t)}holders=new Set;stop(){let e=Symbol();return this.holders.add(e),this.lenis?.stop(),e}start(e){e?this.holders.delete(e):this.holders.clear(),this.holders.size===0&&this.lenis?.start()}},cu=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M4 14.9999L10.5858 8.41416C11.3668 7.63311 12.6331 7.63311 13.4142 8.41415L20 14.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
`,lu=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M20 9L13.4142 15.5858C12.6332 16.3668 11.3669 16.3668 10.5858 15.5858L4 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
`,uu=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M9 4L15.5858 10.5858C16.3668 11.3668 16.3668 12.6331 15.5858 13.4142L9 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
`,du=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
`,fu=(e,t,n,r)=>({key:e,label:t,min:0,max:1,step:1,value:+!!n,hint:r,kind:`toggle`}),pu=`tune-panel-style`,mu=`
.tune{position:fixed;inset-block-end:16px;inset-inline-end:16px;z-index:3000;width:296px;max-height:min(84vh,920px);display:flex;flex-direction:column;background:var(--popover);border-radius:16px;box-shadow:0 0 0 1px var(--line),var(--shadow-modal);color:var(--ink);font:var(--fw-regular,400) 12px/1.3 var(--font-sans,system-ui);-webkit-font-smoothing:antialiased;user-select:none;-webkit-user-select:none;--ease-out:cubic-bezier(.23,1,.32,1)}
.tune__head{display:flex;align-items:center;gap:6px;padding:10px 10px 10px 14px;border-bottom:1px solid var(--line);cursor:grab;touch-action:none}
.tune__head:active{cursor:grabbing}
.tune__title{flex:1;min-width:0;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tune__moved{font:var(--fw-mono-regular,400) 11px/1 var(--font-mono,ui-monospace);font-variant-numeric:tabular-nums;color:var(--ink-muted);white-space:nowrap}
.tune__moved:empty{display:none}
.tune__btn{border:0;background:var(--fill);color:var(--ink);border-radius:6px;padding:0 9px;height:26px;font:inherit;font-size:11px;line-height:1;cursor:pointer;white-space:nowrap;transition:transform 160ms var(--ease-out),background-color 160ms ease}
@media (hover:hover) and (pointer:fine){.tune__btn:hover{background:var(--fill-strong)}.tune__ghead:hover{background:var(--fill)}.tune__foldbtn:hover{background:var(--fill-strong);color:var(--ink)}}
.tune__btn:active{transform:scale(.96)}
.tune__btn:focus-visible{outline:none;box-shadow:0 0 0 2px var(--fill-strong)}
.tune__tools{display:flex;align-items:center;gap:10px;padding:8px 10px;border-bottom:1px solid var(--line)}
.tune__find{flex:1;min-width:0;height:30px;border:1px solid transparent;background:var(--fill);color:var(--ink);border-radius:6px;padding:0 10px;font:inherit;outline:none;transition:border-color 160ms ease}
.tune__find::placeholder{color:var(--ink-muted)}
.tune__find:focus{border-color:var(--fill-strong)}
.tune__find::-webkit-search-cancel-button{-webkit-appearance:none}
.tune__fold{display:flex;flex:none;height:30px;border-radius:6px;background:var(--fill);overflow:hidden}
.tune__foldbtn{display:flex;flex-direction:column;align-items:center;justify-content:center;width:30px;height:30px;padding:0;border:0;background:none;color:var(--ink-muted);cursor:pointer;transition:background-color 160ms ease,color 160ms ease,transform 160ms var(--ease-out)}
.tune__foldbtn:active{transform:scale(.96)}
.tune__foldbtn+.tune__foldbtn{box-shadow:-1px 0 0 var(--line)}
.tune__foldbtn:focus-visible{outline:none;box-shadow:inset 0 0 0 1.5px var(--fill-strong)}
.tune__foldbtn svg{width:12px;height:12px;display:block}
.tune__foldbtn[aria-pressed="true"]{background:var(--fill-strong);color:var(--ink)}
.tune__glyph{position:relative;width:12px;height:19px}
.tune__glyph>span{position:absolute;inset:0;display:flex;flex-direction:column;transition:opacity 300ms cubic-bezier(.2,0,0,1),transform 300ms cubic-bezier(.2,0,0,1),filter 300ms cubic-bezier(.2,0,0,1)}
.tune__glyph>span svg+svg{margin-top:-5px}
.tune__glyph>span[hidden]{display:flex;opacity:0;transform:scale(.25);filter:blur(4px)}
.tune__foldbtn .tune__target{width:14px;height:14px}
.tune__body{overflow:auto;overscroll-behavior:contain;scrollbar-width:thin;padding-block-end:6px}
.tune__group+.tune__group{border-top:1px solid var(--line)}
.tune__ghead{display:flex;align-items:center;gap:8px;width:100%;padding:11px 14px;background:none;border:0;color:var(--ink);font:inherit;text-transform:uppercase;text-align:left;cursor:pointer}
.tune__ghead svg{flex:none;width:12px;height:12px;color:var(--ink-muted);transform:rotate(90deg);transition:transform 150ms var(--ease-out)}
.tune__group[data-closed] .tune__ghead svg{transform:none}
.tune__gmoved{margin-inline-start:auto;font:var(--fw-mono-regular,400) 11px/1 var(--font-mono,ui-monospace);font-variant-numeric:tabular-nums;color:var(--ink-muted);text-transform:none}
.tune__rows{display:flex;flex-direction:column;gap:4px;padding:4px 10px 12px}
.tune__group[data-closed] .tune__rows{display:none}
.tune__group[data-empty]{display:none}
.tune__row{position:relative;display:flex;align-items:center;height:30px;border-radius:6px;background:var(--fill);overflow:hidden;cursor:ew-resize;touch-action:none;outline:none}
.tune__row[data-hidden]{display:none}
.tune__row:focus-visible{box-shadow:inset 0 0 0 1.5px var(--fill-strong)}
.tune__fill{position:absolute;inset:0;background:var(--fill-strong);border-radius:6px;transform:translateX(calc(var(--p) - 100%))}
.tune__row[data-anim] .tune__fill{transition:transform 160ms var(--ease-out)}
.tune__fill::after{content:"";position:absolute;top:8px;bottom:8px;right:5px;width:1.5px;border-radius:1px;background:var(--ink);opacity:.5}
.tune__fill[data-nocaret]::after{visibility:hidden}
.tune__row[data-held] .tune__fill::after{opacity:1}
.tune__ticks{position:absolute;inset:0 12px;pointer-events:none}
.tune__tick{position:absolute;top:50%;width:2px;height:2px;margin:-1px 0 0 -1px;border-radius:50%;background:var(--ink);opacity:.35}
.tune__label{position:relative;flex:1;min-width:0;display:flex;align-items:center;gap:6px;padding-inline-start:12px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none}
.tune__label::before{content:"";flex:none;width:4px;height:4px;border-radius:50%;background:var(--ink);visibility:hidden}
.tune__row[data-changed] .tune__label::before{visibility:visible}
.tune__val{position:relative;flex:none;align-self:stretch;display:flex;align-items:center;padding-inline:8px 12px;font:var(--fw-mono-regular,400) 11px/1 var(--font-mono,ui-monospace);font-variant-numeric:tabular-nums;color:var(--ink-muted);cursor:text}
.tune__row[data-changed] .tune__val{color:var(--ink)}
.tune__val input{width:64px;font:inherit;color:var(--ink);background:var(--popover);border:1px solid var(--fill-strong);border-radius:4px;padding:3px 5px;text-align:right;outline:none;-moz-appearance:textfield}
.tune__val input::-webkit-outer-spin-button,.tune__val input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.tune__unit{margin-inline-start:3px;color:var(--ink-muted)}
.tune__row[data-toggle]{cursor:pointer}
.tune__switch{position:relative;flex:none;width:26px;height:16px;margin-inline-end:8px;border-radius:4px;background:var(--fill-strong);transition:background-color 160ms ease}
.tune__switch::after{content:"";position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:2px;background:var(--popover);box-shadow:0 1px 2px rgba(0,0,0,.2);transition:transform 160ms var(--ease-out)}
.tune__row[data-on] .tune__switch{background:var(--ink)}
.tune__row[data-on] .tune__switch::after{transform:translateX(10px)}
@media (prefers-reduced-motion:reduce){.tune__row[data-anim] .tune__fill,.tune__ghead svg,.tune__foldbtn,.tune__btn,.tune__glyph>span{transition:none}}
`;function hu(){if(document.getElementById(pu))return;let e=document.createElement(`style`);e.id=pu,e.textContent=mu,document.head.appendChild(e)}var gu=e=>e.length>0&&`rows`in e[0],_u=e=>Math.max(0,Math.min(6,Math.ceil(-Math.log10(e)-1e-9))),vu=(e,t,n)=>Math.min(n,Math.max(t,e)),yu=16,bu={get(e,t){try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}},set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}};function xu(e,t,n,r={}){if(new URLSearchParams(location.search).get(`tune`)!==e)return null;hu();let i=gu(t)?t:[{group:``,rows:t}],a=i.flatMap(e=>e.rows),o={},s={};for(let e of a)o[e.key]=e.value,s[e.key]=e.value;let c=()=>a.filter(e=>o[e.key]!==s[e.key]).map(e=>e.key),l=document.createElement(`div`);l.className=`tune`,l.setAttribute(`data-lenis-prevent`,``);let u=document.createElement(`div`);u.className=`tune__head`;let d=document.createElement(`span`);d.className=`tune__title`,d.textContent=`tune :: ${e}`;let f=document.createElement(`span`);f.className=`tune__moved`;let p=(e,t,n)=>{let r=document.createElement(`button`);return r.className=`tune__btn`,r.type=`button`,r.textContent=e,r.title=t,r.onclick=e=>{e.stopPropagation(),n()},r},m=(e,t)=>{let n=e.textContent;e.textContent=t,setTimeout(()=>e.textContent=n,900)},h=p(`copy`,`copy the dials that moved (the bake diff); all of them if none did`,()=>{let e=c(),t={};for(let n of e.length?e:Object.keys(o))t[n]=o[n];navigator.clipboard?.writeText(JSON.stringify(t,null,2)),m(h,e.length?`copied ${e.length}`:`copied all`)}),g=p(`all`,`copy the whole board`,()=>{navigator.clipboard?.writeText(JSON.stringify(o,null,2)),m(g,`copied`)}),_=p(`reset`,`every dial back to its baked value`,()=>{for(let e of a)B(e,s[e.key],!0);n(o)});u.append(d,h,g,_);let v=document.createElement(`div`);v.className=`tune__tools`;let y=document.createElement(`input`);y.className=`tune__find`,y.type=`search`,y.placeholder=`find a dial`,y.setAttribute(`aria-label`,`find a dial`);let b=document.createElement(`div`);b.className=`tune__fold`;let x=(e,t)=>{let n=document.createElement(`button`);return n.className=`tune__foldbtn`,n.type=`button`,n.title=e,n.setAttribute(`aria-label`,e),n.onclick=t,n},S=()=>L.filter(e=>e.name),C=()=>S().every(e=>!e.el.hasAttribute(`data-closed`)),w=document.createElement(`span`);w.className=`tune__glyph`;let T=document.createElement(`span`);T.innerHTML=cu+lu;let E=document.createElement(`span`);E.innerHTML=lu+cu,w.append(T,E);let D=x(`open every group`,()=>k(C()));D.append(w);let O=()=>{let e=C();T.hidden=e,E.hidden=!e,D.title=e?`shut every group`:`open every group`,D.setAttribute(`aria-label`,D.title)},k=e=>{for(let t of S())t.el.toggleAttribute(`data-closed`,e),e?F.add(t.name):F.delete(t.name);bu.set(P,[...F]),O()},A=`tune:${e}:focus`,j=bu.get(A,!1),M=x(`focus: one group open at a time`,()=>{if(j=!j,bu.set(A,j),M.setAttribute(`aria-pressed`,String(j)),j){let e=S().find(e=>!e.el.hasAttribute(`data-closed`));for(let t of S())t!==e&&(t.el.setAttribute(`data-closed`,``),F.add(t.name));bu.set(P,[...F]),O()}});M.innerHTML=du,M.querySelector(`svg`).classList.add(`tune__target`),M.setAttribute(`aria-pressed`,String(j)),b.append(D,M),v.append(y,f,b);let N=document.createElement(`div`);N.className=`tune__body`;let P=`tune:${e}:closed`,F=new Set(bu.get(P,[])),I=new Map,L=[],ee=(e,t)=>t.toFixed(_u(e.step)),R=e=>{let t=I.get(e.key),n=o[e.key];if(e.kind===`toggle`){t.row.toggleAttribute(`data-on`,!!n),t.row.setAttribute(`aria-checked`,String(!!n)),t.row.toggleAttribute(`data-changed`,n!==s[e.key]);return}let r=(vu(n,e.min,e.max)-e.min)/(e.max-e.min)*100;t.fill.style.setProperty(`--p`,`${r.toFixed(3)}%`);let i=r/100*t.row.clientWidth-5;t.fill.toggleAttribute(`data-nocaret`,i>16&&i<22+t.text.offsetWidth+6),t.num.textContent=ee(e,n),t.row.setAttribute(`aria-valuenow`,String(n)),t.row.setAttribute(`aria-valuetext`,`${ee(e,n)}${e.unit??``}`),t.row.toggleAttribute(`data-changed`,n!==s[e.key])},z=()=>{let e=c().length;f.textContent=e?`${e} moved`:``;for(let e of L){if(!e.movedEl)continue;let t=e.rows.filter(e=>o[e.key]!==s[e.key]).length;e.movedEl.textContent=t?String(t):``}},B=(e,t,n=!1)=>{o[e.key]=t,I.get(e.key).row.toggleAttribute(`data-anim`,n),R(e),z()},te=(e,t)=>Number((Math.round((t-e.min)/e.step)*e.step+e.min).toFixed(_u(e.step)));for(let e of i){let t=document.createElement(`section`);t.className=`tune__group`;let r=null;if(e.group){let n=document.createElement(`button`);n.className=`tune__ghead`,n.type=`button`,n.innerHTML=uu,n.append(e.group),r=document.createElement(`span`),r.className=`tune__gmoved`,n.append(r),F.has(e.group)&&t.setAttribute(`data-closed`,``),n.onclick=()=>{let n=!t.hasAttribute(`data-closed`);if(t.toggleAttribute(`data-closed`,n),n?F.add(e.group):F.delete(e.group),!n&&j)for(let e of S())e.el!==t&&(e.el.setAttribute(`data-closed`,``),F.add(e.name));bu.set(P,[...F]),O()},t.append(n)}let i=document.createElement(`div`);i.className=`tune__rows`;for(let t of e.rows){if(t.kind===`toggle`){let e=document.createElement(`div`);e.className=`tune__row`,e.tabIndex=0,e.setAttribute(`role`,`switch`),e.setAttribute(`aria-label`,t.label),e.setAttribute(`data-toggle`,``),e.title=`${t.key}${t.hint?` — ${t.hint}`:``}`;let r=document.createElement(`span`);r.className=`tune__label`;let a=document.createElement(`span`);a.textContent=t.label,r.append(a);let s=document.createElement(`span`);s.className=`tune__switch`,e.append(r,s);let c=()=>{B(t,+!o[t.key]),n(o)};e.onclick=c,e.onkeydown=e=>{(e.key===` `||e.key===`Enter`)&&(e.preventDefault(),c())},i.append(e),I.set(t.key,{row:e,fill:s,num:s,text:a}),R(t);continue}let e=document.createElement(`div`);e.className=`tune__row`,e.tabIndex=0,e.setAttribute(`role`,`slider`),e.setAttribute(`aria-label`,t.label),e.setAttribute(`aria-valuemin`,String(t.min)),e.setAttribute(`aria-valuemax`,String(t.max)),e.title=`${t.key}${t.hint?` — ${t.hint}`:``} · baked ${ee(t,s[t.key])} · drag to scrub (Alt = fine) · Alt-click or double-click resets`;let r=document.createElement(`div`);r.className=`tune__fill`;let a=null,c=Math.round((t.max-t.min)/t.step);if(c<=yu){let t=document.createElement(`div`);t.className=`tune__ticks`;for(let e=1;e<c;e++){let n=document.createElement(`i`);n.className=`tune__tick`,n.style.left=`${(e/c*100).toFixed(3)}%`,t.append(n)}e.append(t),a=t}e.append(r);let l=document.createElement(`span`);l.className=`tune__label`;let u=document.createElement(`span`);u.textContent=t.label,l.append(u);let d=document.createElement(`span`);d.className=`tune__val`;let f=document.createElement(`span`);if(d.append(f),t.unit){let e=document.createElement(`span`);e.className=`tune__unit`,e.textContent=t.unit,d.append(e)}e.append(l,d),I.set(t.key,{row:e,fill:r,num:f,text:u});let p=null;e.onpointerdown=n=>{p||n.button!==0||n.target.closest(`.tune__val`)||(n.preventDefault(),p={id:n.pointerId,x0:n.clientX,v0:o[t.key],moved:!1},e.setAttribute(`data-held`,``),e.setPointerCapture(n.pointerId),e.focus({preventScroll:!0}))},e.onpointermove=r=>{if(!p||r.pointerId!==p.id)return;let i=r.clientX-p.x0;if(!p.moved&&Math.abs(i)<2)return;p.moved=!0;let a=(r.altKey?.1:1)*(t.max-t.min)/e.clientWidth,s=te(t,vu(p.v0+i*a,t.min,t.max));s!==o[t.key]&&(B(t,s),n(o))},e.onpointerup=e.onpointercancel=r=>{!p||r.pointerId!==p.id||(!p.moved&&r.altKey&&r.type===`pointerup`&&(B(t,s[t.key],!0),n(o)),p=null,e.removeAttribute(`data-held`))},e.ondblclick=e=>{e.target.closest(`.tune__val`)||(B(t,s[t.key],!0),n(o))},e.onkeydown=e=>{let r=e.key===`ArrowRight`||e.key===`ArrowUp`?1:e.key===`ArrowLeft`||e.key===`ArrowDown`?-1:0,i=null;r?i=o[t.key]+r*t.step*(e.shiftKey?10:1):e.key===`Home`?i=t.min:e.key===`End`&&(i=t.max),i!==null&&(e.preventDefault(),B(t,te(t,vu(i,t.min,t.max))),n(o))},d.onpointerdown=e=>e.stopPropagation(),d.onclick=()=>{if(d.querySelector(`input`))return;let e=document.createElement(`input`);e.type=`number`,e.step=String(t.step),e.value=ee(t,o[t.key]),f.replaceWith(e),e.focus(),e.select();let r=r=>{if(!e.isConnected)return;let i=Number(e.value);e.replaceWith(f),r&&Number.isFinite(i)&&(B(t,i,!0),n(o))};e.onkeydown=e=>{e.key===`Enter`?(e.preventDefault(),r(!0)):e.key===`Escape`&&(e.preventDefault(),r(!1)),e.stopPropagation()},e.onblur=()=>r(!0)},i.append(e),R(t),requestAnimationFrame(()=>{a&&(a.style.clipPath=`inset(0 ${d.offsetWidth+2}px 0 ${22+u.offsetWidth+2}px)`),R(t)})}t.append(i),N.append(t),L.push({el:t,movedEl:r,rows:e.rows,name:e.group})}z(),O(),y.oninput=()=>{let e=y.value.trim().toLowerCase();for(let t of L){let n=0;for(let r of t.rows){let t=!e||r.label.toLowerCase().includes(e)||r.key.toLowerCase().includes(e);I.get(r.key).row.toggleAttribute(`data-hidden`,!t),t&&n++}t.el.toggleAttribute(`data-empty`,n===0),t.el.toggleAttribute(`data-closed`,!e&&F.has(t.name))}},y.onkeydown=e=>{e.key===`Escape`&&(y.value=``,y.oninput(e),y.blur()),e.stopPropagation()};let V=`tune:${e}:pos`,ne=bu.get(V,null),re=(e,t)=>{e=vu(e,0,innerWidth-l.offsetWidth),t=vu(t,0,innerHeight-l.offsetHeight),l.style.insetInlineEnd=`auto`,l.style.insetBlockEnd=`auto`,l.style.left=`${e}px`,l.style.top=`${t}px`};u.onpointerdown=e=>{if(e.target.closest(`button`))return;e.preventDefault();let t=l.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top;u.setPointerCapture(e.pointerId);let i=e=>re(e.clientX-n,e.clientY-r),a=()=>{u.removeEventListener(`pointermove`,i),u.removeEventListener(`pointerup`,a);let e=l.getBoundingClientRect();bu.set(V,{x:e.left,y:e.top})};u.addEventListener(`pointermove`,i),u.addEventListener(`pointerup`,a)},l.append(u,v,N),r.side===`start`&&(l.style.insetInlineEnd=`auto`,l.style.insetInlineStart=`16px`),l.addEventListener(`keydown`,e=>e.stopPropagation()),document.body.append(l),ne&&re(ne.x,ne.y);let H=()=>{l.isConnected||document.body.append(l)};return r.persist&&document.addEventListener(`astro:page-load`,H),()=>{document.removeEventListener(`astro:page-load`,H),l.remove()}}var Su=1.5,Cu=.06,wu=400,Tu=8,Eu=.94,Du=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Ou=`#version 300 es
precision highp float;
uniform sampler2D uPrev;
uniform vec2 uTexel;   // 1 / trail resolution
uniform vec2 uSplat;   // splat center, 0..1 (y up)
uniform vec2 uDir;     // normalized motion direction (0,0 when idle)
uniform vec2 uShift;   // scroll advection — the trail rides the SHEET
uniform float uForce;  // velocity-scaled energy in
uniform float uRadius; // splat radius in uv
uniform float uAspect; // viewport aspect (w/h)
out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy * uTexel;
  vec2 puv = uv - uShift; // where this sheet point sat last frame
  float c = texture(uPrev, puv).r;
  // 4-neighbour diffusion — the bleed.
  float n = texture(uPrev, puv + vec2(uTexel.x, 0.0)).r
          + texture(uPrev, puv - vec2(uTexel.x, 0.0)).r
          + texture(uPrev, puv + vec2(0.0, uTexel.y)).r
          + texture(uPrev, puv - vec2(0.0, uTexel.y)).r;
  float v = mix(c, n * 0.25, 0.6) * ${Eu};
  // Anisotropic splat — stretched along the stroke, and a faster stroke
  // breathes wider. Reads as a drawn mark, not a stamped blob.
  vec2 d = (uv - uSplat) * vec2(uAspect, 1.0);
  d -= uDir * dot(d, uDir) * 0.65;
  float r = uRadius * (1.0 + uForce * 1.5);
  v += uForce * exp(-dot(d, d) / (r * r));
  outColor = vec4(min(v, 1.0), 0.0, 0.0, 1.0);
}`,ku=`#version 300 es
precision highp float;

uniform vec2 uRes;      // drawing-buffer px
uniform float uScroll;  // scrollY * dpr * PARALLAX (px of sheet drift)
uniform vec3 uPaper;    // theme paper
uniform vec3 uInk;      // theme ink (light in dark mode — features auto-flip)
uniform vec3 uHi;       // "away from ink" — crease highlights / sheen
uniform float uStrength;
uniform sampler2D uTrail;
uniform vec2 uTrailTexel;
uniform vec2 uMouse;    // lerped pointer, 0..1 (y up)
// Tunables (see PARAMS / the ?tune=paper panel):
uniform vec4 uA; // tooth, felt, crumple, streak1
uniform vec4 uB; // streak2, stain, creaseMul, edgeMul
uniform vec4 uC; // warp, emboss, sheen, drift
uniform vec4 uD; // halftone, pitch(px), fleck, trail→tone
uniform vec4 uE; // wakeDots, wakeScale, pulseAmp, pulseTime(8Hz-quantized)
uniform float uAlive; // 1 only while the trail loop runs — idle renders skip
                      // ALL wake work (the buffer is hard-cleared anyway)
uniform float uDim;   // stage dim 0..1 — the ground's house lights, driven by
                      // veil.ts while a page recedes over it during navs
// Click pulses — up to four concurrent expanding rings (x, y in vp space
// y-up, current radius in vp-height units, strength 0..1). Radius/decay are
// integrated CPU-side (lib code owns time); the shader only draws the front.
uniform vec4 uR0;
uniform vec4 uR1;
uniform vec4 uR2;
uniform vec4 uR3;
uniform vec4 uR4;
uniform vec4 uR5;

out vec4 outColor;

// A pulse ring's energy at p — a gaussian band on the expanding front, plus
// a comet TAIL fading out close behind it. The tail must MOVE with the front:
// a constant interior wash lit the same low-threshold cells for the ring's
// whole life — random dots appearing off the wave and freezing (Carter's
// live catch). Band-limited, every lit cell winks off as the tail passes.
float ringE(vec4 rr, vec2 p, float asp) {
  if (rr.w < 0.001) return 0.0;
  vec2 dd = (p - rr.xy) * vec2(asp, 1.0);
  float r = length(dd);
  float e = (r - rr.z) / 0.05;
  float front = exp(-e * e);
  float behind = rr.z - r; // how far behind the front this point is
  float tail = smoothstep(0.28, 0.0, behind) * step(0.0, behind) * 0.14;
  return (front + tail) * rr.w;
}

// ── noise ────────────────────────────────────────────────────────────────────
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1, 0)), u.x),
    mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = r * p * 2.03;
    a *= 0.5;
  }
  return v; // ~0..1, centered 0.5
}
// Cheaper tiers — most layers can't visually resolve 4 octaves; don't pay
// for what can't be seen (perf: the ground re-renders on every scroll frame).
float fbm2(vec2 p) {
  return vnoise(p) * 0.5 + vnoise(mat2(0.8, 0.6, -0.6, 0.8) * p * 2.03) * 0.25 + 0.125;
}
float fbm3(vec2 p) {
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  float v = vnoise(p) * 0.5;
  p = r * p * 2.03;
  v += vnoise(p) * 0.25;
  p = r * p * 2.03;
  return v + vnoise(p) * 0.125 + 0.0625;
}

// One crease: sharp dark core, soft shadow on one side, thin catch-light on
// the other. t = signed distance in px.
float creaseInk(float t) {
  return exp(-abs(t) / 1.4) * 0.085 + exp(-max(t, 0.0) / 26.0) * 0.03;
}
float creaseHi(float t) {
  return exp(-max(-t, 0.0) / 7.0) * 0.05;
}

void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 vp = px / uRes;
  float asp = uRes.x / uRes.y;

  // The pointer trail as HEIGHT — sampled first so the whole sheet warps.
  // Uniform-gated: scroll/resize/retint renders (the common path) carry a
  // cleared trail buffer — skip the taps instead of reading zeros.
  float T = 0.0;
  vec2 tg = vec2(0.0);
  if (uAlive > 0.5) {
    T = texture(uTrail, vp).r;
    tg = vec2(
      texture(uTrail, vp + vec2(uTrailTexel.x, 0.0)).r - T,
      texture(uTrail, vp + vec2(0.0, uTrailTexel.y)).r - T
    );
  }

  // Sheet space: aspect-true, drifted by scroll parallax + cursor drift +
  // trail refraction (the grain smears through the bump).
  vec2 sp = vec2(vp.x * asp, vp.y + uScroll / uRes.y);
  sp += (uMouse - 0.5) * vec2(asp, 1.0) * uC.w;
  sp += tg * uC.x;
  // Shake (watson lineage): enveloped noise pulses flutter the whole sheet
  // field while the wake is alive — the paper twitches under your hand.
  // Time is 8Hz-quantized (the house stop-motion cadence), amplitude at the
  // edge of perception. Uniform-gated: idle renders skip both noise taps.
  if (uE.z > 0.0001) {
    sp += (vec2(vnoise(sp * 2.3 + uE.w), vnoise(sp * 2.3 + uE.w + 7.0)) - 0.5) * uE.z;
  }

  float d = 0.0;     // fine/continuous ink-mix: grain, lines, specks
  float tonal = 0.0; // mid-frequency tone — DELIVERED via the print pass below
  float hi = 0.0;

  // Fiber tooth — the paper's grain at near-pixel scale (2 octaves: the rest
  // are sub-pixel at this frequency).
  d += (fbm2(sp * 900.0) - 0.5) * uA.x;
  // Scanner noise — per-pixel, viewport-locked.
  d += (hash(px * 1.013) - 0.5) * 0.022;
  // Fine felt — pressed-fiber mottle, high enough frequency to read as
  // surface, not blobs.
  d += (fbm3(sp * 46.0) - 0.5) * uA.y;

  // Sheet body — a softly crumpled height field under a raking light. Shading
  // by the field's SLOPE (not its value) gives broad warped-sheet facets with
  // no closed contours. Slope via hardware derivatives: one fbm eval instead
  // of three — quad-quantized, invisible at these amplitudes.
  float H = fbm3(sp * 4.6);
  vec2 g = vec2(dFdx(H), dFdy(H)) * uRes.y;
  vec2 L = normalize(vec2(0.6, 0.8));
  tonal += dot(L, g) * uA.z;

  // The trail bump under the same raking light — an embossed, moving wake —
  // and the wake's own body tone (uD.w). Both land in the PRINTED band.
  tonal += dot(L, tg) * uC.y;
  tonal += T * uD.w * 0.14;
  hi += T * uC.z; // lifted paper catches a faint sheen
  // Crunchy dither inside the wake — crumpled print, not gloss.
  d += (hash(px * 2.31) - 0.5) * T * uD.w * 0.25;

  // Wake dots — the dot-matrix plume: a coarser grid where trail energy
  // switches whole cells ON against per-cell dither thresholds. Dots pop in
  // discretely and wink off as the wake decays — printed ink, not glow. They
  // mix toward ink, so they're pencil dots on light stock, bright dots on
  // dark.
  // Same 45° lattice as the print pass so plume dots land ON the paper's own
  // screen — the wake is the print filling in, not a second grid.
  if (uAlive > 0.5) {
    float wpitch = uD.y * uE.y;
    mat2 R45 = mat2(0.7071, 0.7071, -0.7071, 0.7071);
    vec2 wp = (R45 * (sp * uRes.y)) / wpitch;
    vec2 cid = floor(wp);
    vec2 cc = fract(wp) - 0.5;
    // v * R45 = R45ᵀ v = the inverse rotation (orthonormal) — back to sheet px.
    vec2 dl = (((cid + 0.5) * wpitch) * R45) / uRes.y - sp;
    dl.x /= asp;
    vec2 cvp = clamp(vp + dl, 0.0, 1.0);
    float Tc = texture(uTrail, cvp).r;
    // Click pulses land in the SAME cell-energy channel as the wake: the
    // expanding front switches whole print cells on against the same per-cell
    // thresholds — the pulse is the print filling in along a wavefront, not a
    // second effect grammar.
    Tc += ringE(uR0, cvp, asp) + ringE(uR1, cvp, asp) + ringE(uR2, cvp, asp)
        + ringE(uR3, cvp, asp) + ringE(uR4, cvp, asp) + ringE(uR5, cvp, asp);
    float on = step(hash(cid + 0.7) * 0.85 + 0.06, Tc);
    d += on * smoothstep(0.36, 0.27, length(cc)) * uE.x;
  }

  // Flecks — the stock's inclusions: rare dark specks and rarer WHITE fiber
  // flecks (the bright hairs in scanned gray stock).
  vec2 fpx = floor(sp * uRes.y * 0.5);
  float f1 = hash(fpx + 3.7);
  float f2 = hash(fpx + 9.1);
  d += step(0.9985, f1) * uD.z * 0.5;
  hi += step(0.9993, f2) * uD.z;

  // Flat-fold pressure streaks — single-octave ridged noise stretched hard
  // along one axis becomes long directional marks (never a cell web). Two
  // slightly rotated passes, sparse threshold.
  float r1 = 1.0 - abs(2.0 * vnoise(vec2(sp.x * 1.3, sp.y * 15.0)) - 1.0);
  mat2 R = mat2(0.966, 0.259, -0.259, 0.966);
  vec2 rp = R * sp;
  float r2 = 1.0 - abs(2.0 * vnoise(vec2(rp.x * 17.0, rp.y * 1.5)) - 1.0);
  d += smoothstep(0.963, 1.0, r1) * uA.w;
  d += smoothstep(0.963, 1.0, r2) * uB.x;

  // Smudge — a whisper. The blotchy "water spot" look reads as cells, so this
  // stays at the very edge of perception: rare, soft-cored, no ring edge.
  float s = fbm3(sp * 1.1 + 17.0);
  float stain = pow(smoothstep(0.62, 1.0, s), 2.0);
  tonal += stain * uB.y;

  // Letter fold — two horizontal creases at the thirds (the folded-sheet
  // reference) + a weaker vertical seam, gently wavy, part of the sheet (they
  // drift with the parallax).
  float fy = sp.y - (0.34 + 0.012 * sin(sp.x * 2.1) + 0.014 * (vnoise(vec2(sp.x * 3.0, 7.3)) - 0.5));
  float fy2 = sp.y - (0.71 + 0.010 * sin(sp.x * 1.7 + 2.0) + 0.014 * (vnoise(vec2(sp.x * 2.8, 12.9)) - 0.5));
  float fx = sp.x - (0.56 * asp + 0.010 * sin(sp.y * 2.7) + 0.012 * (vnoise(vec2(sp.y * 3.2, 3.1)) - 0.5));
  d += creaseInk(fy * uRes.y) * uB.z;
  hi += creaseHi(fy * uRes.y) * uB.z;
  d += creaseInk(fy2 * uRes.y) * 0.85 * uB.z;
  hi += creaseHi(fy2 * uRes.y) * 0.85 * uB.z;
  d += creaseInk(fx * uRes.y) * 0.6 * uB.z;
  hi += creaseHi(fx * uRes.y) * 0.6 * uB.z;

  // Scanner edge — shadowed rim (a line, stays continuous) + soft corner
  // vignette (tone, gets printed).
  vec2 rim = min(vp, 1.0 - vp) * uRes;
  d += exp(-min(min(rim.x, rim.y), 90.0) / 30.0) * 0.05 * uB.w;
  tonal += smoothstep(0.55, 0.95, distance(vp, vec2(0.5, 0.5))) * 0.04 * uB.w;

  // THE PRINT PASS — "filling in the blanks": the whole tonal band (crumple,
  // stains, wake, vignette) is delivered as 45°-screen dot coverage instead
  // of smooth shade — a printed reproduction of the scan. The screen is on
  // the sheet (drifts with parallax); dot size renders the local tone; the
  // average stays ≈ the smooth version so nothing darkens, it just prints.
  // uD.x blends smooth ↔ fully printed. Grain and crease lines never print.
  float tone = clamp(0.5 + tonal * 9.0, 0.0, 1.0);
  vec2 hp = mat2(0.7071, 0.7071, -0.7071, 0.7071) * (sp * uRes.y) / uD.y;
  float cellD = length(fract(hp) - 0.5);
  float dotR = mix(0.08, 0.66, tone);
  float ht = smoothstep(dotR + 0.16, dotR - 0.16, cellD);
  // A faint baseline screen lives everywhere; it swells to full print where
  // tone exists — visible dither without the full-page mottle.
  float amp = (0.18 + 0.82 * smoothstep(0.0, 0.14, abs(tone - 0.5))) * uD.x;
  d += mix(tonal, (ht - 0.5) * 0.16, amp);

  float inkAmt = clamp(max(d, 0.0) * uStrength, 0.0, 0.35);
  float hiAmt = clamp((max(-d, 0.0) + hi) * uStrength, 0.0, 0.3);
  vec3 col = mix(uPaper, uInk, inkAmt);
  col = mix(col, uHi, hiAmt);
  // Stage dim — a multiply, not a mix toward a color: the paper's grain and
  // creases stay alive in the dark (the light goes down, the material stays),
  // and it darkens correctly in BOTH themes (mixing toward ink would
  // BRIGHTEN dark mode's ground — ink is light there).
  col *= 1.0 - uDim;
  // Dither — kill banding in the slow washes.
  col += (hash(px * 1.7) - 0.5) / 255.0;

  outColor = vec4(col, 1.0);
}`,Au=e=>{let t=e.trim(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)?.[1];if(n){let e=n.length===3?[...n].map(e=>e+e).join(``):n;return[0,2,4].map(t=>parseInt(e.slice(t,t+2),16)/255)}let r=t.match(/^rgba?\(([\d.\s,]+)/)?.[1];if(r){let[e,t,n]=r.split(`,`).map(e=>parseFloat(e)/255);return[e,t,n]}return null},ju=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n],Mu=(e,t)=>e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2],Nu={tooth:.055,felt:.035,crumple:.0038,streak1:.018,streak2:.014,stain:.022,crease:.58,edge:1,warp:.16,emboss:.9,sheen:.03,drift:0,darkMul:.68,darkLines:.8,darkTooth:1.6,darkFelt:.45,darkCrumple:.6,darkHalf:.45,parallax:Cu,halftone:.6,pitch:6,fleck:.14,halfTrail:.35,wakeDots:.4,wakeScale:1,pulse:.5},Pu=[[`tooth`,0,.12,.001],[`felt`,0,.1,.001],[`crumple`,0,.015,2e-4],[`streak1`,0,.06,.001],[`streak2`,0,.06,.001],[`stain`,0,.08,.001],[`crease`,0,2,.05],[`edge`,0,2,.05],[`warp`,0,1,.01],[`emboss`,0,6,.1],[`sheen`,0,.15,.005],[`drift`,0,.015,5e-4],[`darkMul`,0,1.5,.02],[`darkLines`,0,1.5,.05],[`darkTooth`,0,3,.05],[`darkFelt`,0,1.5,.05],[`darkCrumple`,0,1.5,.05],[`darkHalf`,0,1.5,.05],[`parallax`,0,.2,.005],[`halftone`,0,1,.02],[`pitch`,3,14,.5],[`fleck`,0,.5,.01],[`halfTrail`,0,1.5,.05],[`wakeDots`,0,1,.02],[`wakeScale`,.5,4,.1],[`pulse`,0,2,.05]],Fu=new class e{canvas=null;gl=null;main=null;sim=null;uM={};uS={};raf=0;looping=!1;rings=[];static RING_LIFE=1900;static RING_GAP=150;static RING_DIE=220;ringSpawned=0;reduce=!1;glLive=!1;readyResolve=null;ready=new Promise(e=>this.readyResolve=e);trailTex=[null,null];trailFbo=[null,null];trailW=0;trailH=0;ping=0;quiet=0;simScroll=0;target={x:.5,y:.5};mouse={x:.5,y:.5};lastEvt={x:.5,y:.5,t:0};force=0;dir={x:0,y:0};paper=[.91,.91,.906];ink=[.12,.12,.12];fade=null;dimAmt=0;dimAnim=null;pulseAmp=0;pulseT0=0;pulseNext=0;init(){if(this.canvas=document.querySelector(`[data-paper]`),!this.canvas)return void this.readyResolve?.();let t=this.canvas.getContext(`webgl2`,{alpha:!1,antialias:!1,depth:!1,stencil:!1,powerPreference:`low-power`});if(!t||(this.gl=t,!this.compile()))return void this.readyResolve?.();let n=()=>{this.glLive&&document.documentElement.setAttribute(`data-paper-gl`,``)};this.glLive=!0,n(),document.addEventListener(`astro:after-swap`,n);let r=matchMedia(`(prefers-reduced-motion: reduce)`);this.reduce=r.matches,r.addEventListener?.(`change`,e=>{this.reduce=e.matches,this.request()});let i=0;window.addEventListener(`resize`,()=>{clearTimeout(i),i=window.setTimeout(()=>this.resize(),40)},{passive:!0}),su.lenis?su.lenis.on(`scroll`,()=>this.request()):window.addEventListener(`scroll`,()=>this.request(),{passive:!0}),document.addEventListener(`astro:page-load`,()=>this.request()),window.addEventListener(`pointermove`,e=>{if(this.reduce)return;let t=performance.now(),n=e.clientX/innerWidth,r=1-e.clientY/innerHeight;if(e.target?.closest?.(`[data-no-wake]`)){this.lastEvt={x:n,y:r,t},this.target={x:n,y:r},this.looping||(this.mouse={x:n,y:r});return}let i=Math.max(t-this.lastEvt.t,1),a=(n-this.lastEvt.x)*innerWidth,o=(r-this.lastEvt.y)*innerHeight,s=Math.hypot(a,o),c=s/i;if(s>.5){let e=1/s;this.dir.x+=(a*e-this.dir.x)*.2,this.dir.y+=(o*e-this.dir.y)*.2}this.lastEvt={x:n,y:r,t},this.target={x:n,y:r},this.force=Math.min(this.force+c*.05,.35),this.loop()},{passive:!0}),window.addEventListener(`pointerdown`,t=>{if(this.reduce||t.button!==0||!this.glLive||t.target?.closest(`a, button, input, select, textarea, label, summary, [role="button"], [data-artifact], [data-radio], [data-tilt], [data-marks-surface], [data-lab], [data-no-pulse]`))return;let n=t.clientX/innerWidth,r=1-t.clientY/innerHeight,i=innerWidth/innerHeight,a=Math.hypot(Math.max(n,1-n)*i,Math.max(r,1-r))+.08,o=performance.now();if(!(o-this.ringSpawned<e.RING_GAP)){if(this.ringSpawned=o,this.rings.push({x:n,y:r,t0:o,rMax:a}),this.rings.length>6){let e=this.rings.find(e=>e.die===void 0);e&&(e.die=o)}this.rings.length>8&&this.rings.shift(),this.loop()}},{passive:!0,capture:!0});let a=document.documentElement.getAttribute(`data-theme`);new MutationObserver(()=>{let e=document.documentElement.getAttribute(`data-theme`);e!==null&&e!==a&&(a=e,this.retint(!0))}).observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`]}),matchMedia(`(prefers-color-scheme: dark)`).addEventListener?.(`change`,()=>this.retint(!0)),this.canvas.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.glLive=!1,document.documentElement.removeAttribute(`data-paper-gl`)}),this.canvas.addEventListener(`webglcontextrestored`,()=>{this.compile()&&(this.glLive=!0,n(),this.makeTrail(),this.simScroll=scrollY,this.request())}),this.retint(!1),this.resize(),this.readyResolve?.(),this.tunePanel()}tunePanel(){let e=(e,t,n,r)=>{let i=Pu.find(t=>t[0]===e);return{key:e,label:t,min:i[1],max:i[2],step:i[3],value:Nu[e],hint:n,unit:r}};xu(`paper`,[{group:`the stock`,rows:[e(`tooth`,`tooth`,`fiber grain`),e(`felt`,`felt`,`pressed-felt mottle`),e(`crumple`,`crumple`,`the crumpled height field under raking light`),e(`emboss`,`emboss`,`raking-light strength on the height field`),e(`sheen`,`sheen`),e(`edge`,`edge shadow`,`the scanner edge`)]},{group:`the marks`,rows:[e(`streak1`,`streak 1`,`flat-fold pressure streaks`),e(`streak2`,`streak 2`),e(`stain`,`stain`),e(`crease`,`crease`,`the fold cross`),e(`warp`,`warp`)]},{group:`the dark stock`,rows:[e(`darkMul`,`dark mix`),e(`darkLines`,`dark lines`,`damp on streaks + creases in dark`),e(`darkTooth`,`dark tooth`,`dark stock shows MORE grain bite…`),e(`darkFelt`,`dark felt`,`…and less soft mottle`),e(`darkCrumple`,`dark crumple`,`…calmer crumple facets`),e(`darkHalf`,`dark print`,`…and a quieter print screen (light ink pops loud on black)`)]},{group:`the print pass`,rows:[e(`halftone`,`halftone`,`0 = smooth scan, 1 = fully printed`),e(`pitch`,`pitch`,`the print screen's dot pitch`,`px`),e(`fleck`,`fleck`)]},{group:`the wake`,rows:[e(`wakeDots`,`dot plume`,`the dot-matrix plume — the wake's main voice`),e(`wakeScale`,`plume pitch`,`× the print pitch — 1 = ON the print screen`,`×`),e(`halfTrail`,`tone swell`,`pointer wake → print-tone swell (secondary now)`),e(`pulse`,`shake pulse`,`sheet flutter while alive (watson lineage)`),e(`drift`,`sheet drift`,`whole-sheet cursor drift — off; the wake carries the response`),e(`parallax`,`scroll parallax`,`the sheet moves at this fraction of the scroll`)]}],e=>{for(let t of Object.keys(e))Nu[t]=e[t];this.request()})}compile(){let e=this.gl,t=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.warn(`[paper]`,e.getShaderInfoLog(r)),null)},n=n=>{let r=t(e.VERTEX_SHADER,Du),i=t(e.FRAGMENT_SHADER,n);if(!r||!i)return null;let a=e.createProgram();return e.attachShader(a,r),e.attachShader(a,i),e.linkProgram(a),e.getProgramParameter(a,e.LINK_STATUS)?a:(console.warn(`[paper]`,e.getProgramInfoLog(a)),null)};if(this.main=n(ku),this.sim=n(Ou),!this.main||!this.sim)return!1;for(let t of[`uRes`,`uScroll`,`uPaper`,`uInk`,`uHi`,`uStrength`,`uTrail`,`uTrailTexel`,`uMouse`,`uA`,`uB`,`uC`,`uD`,`uE`,`uAlive`,`uDim`,`uR0`,`uR1`,`uR2`,`uR3`,`uR4`,`uR5`])this.uM[t]=e.getUniformLocation(this.main,t);for(let t of[`uPrev`,`uTexel`,`uSplat`,`uDir`,`uForce`,`uRadius`,`uAspect`])this.uS[t]=e.getUniformLocation(this.sim,t);return!0}makeTrail(){let e=this.gl;this.trailW=Math.max(Math.ceil(innerWidth/Tu),8),this.trailH=Math.max(Math.ceil(innerHeight/Tu),8);for(let t=0;t<2;t++){this.trailTex[t]&&e.deleteTexture(this.trailTex[t]),this.trailFbo[t]&&e.deleteFramebuffer(this.trailFbo[t]);let n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,this.trailW,this.trailH,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),this.trailTex[t]=n,this.trailFbo[t]=r}e.bindFramebuffer(e.FRAMEBUFFER,null)}settle(){if(this.reduce||!this.gl)return;let e=performance.now();this.pulseT0=e,this.pulseNext=e+4e3,this.force=Math.max(this.force,.02),this.loop()}get dim(){return this.dimAmt}setDim(e){this.dimAnim=null,this.dimAmt=e,this.request()}dimTo(e,t){let n=Symbol();if(this.dimAnim=n,t<=0||this.reduce){this.dimAmt=e,this.dimAnim=null,this.request();return}let r=this.dimAmt,i=performance.now(),a=()=>{if(this.dimAnim!==n)return;let o=Math.min((performance.now()-i)/t,1),s=1-(1-o)**2;this.dimAmt=r+(e-r)*s,this.render(),o<1?requestAnimationFrame(a):this.dimAnim=null};requestAnimationFrame(a)}themeColors(){let e=getComputedStyle(document.documentElement);return{paper:Au(e.getPropertyValue(`--paper`))??this.paper,ink:Au(e.getPropertyValue(`--ink`))??this.ink}}retint(e){let t=this.themeColors();if(!e){this.paper=t.paper,this.ink=t.ink,this.request();return}if(!this.fade&&Mu(this.paper,t.paper)&&Mu(this.ink,t.ink)){this.request();return}let n={from:{paper:this.paper,ink:this.ink},t0:performance.now()};this.fade=n;let r=()=>{if(this.fade!==n)return;let e=Math.min((performance.now()-n.t0)/wu,1),i=1-(1-e)**3;this.paper=ju(n.from.paper,t.paper,i),this.ink=ju(n.from.ink,t.ink,i),this.render(),e<1?requestAnimationFrame(r):this.fade=null};requestAnimationFrame(r)}resize(){let{canvas:e,gl:t}=this;if(!e||!t)return;let n=innerWidth>1920?1.25:Su,r=Math.min(devicePixelRatio||1,n),i=Math.round(innerWidth*r),a=Math.round(innerHeight*r);(i!==e.width||a!==e.height)&&(e.width=i,e.height=a,this.makeTrail(),this.simScroll=scrollY,this.request())}request(){this.looping||this.raf||(this.raf=requestAnimationFrame(()=>{this.raf=0,this.render()}))}loop(){if(this.looping||this.reduce)return;this.looping=!0,this.simScroll=scrollY;let t=performance.now(),n=()=>{let r=performance.now(),i=Math.min(r-t,50)/(1e3/60);t=r;let a=1-.86**i;this.mouse.x+=(this.target.x-this.mouse.x)*a,this.mouse.y+=(this.target.y-this.mouse.y)*a,r>=this.pulseNext&&(this.pulseT0=r,this.pulseNext=r+1100+900+Math.random()*1300);let o=Math.min((r-this.pulseT0)/1100,1);this.pulseAmp=o<.3?o/.3:o>.7?Math.max((1-o)/.3,0):1,this.stepTrail(),this.render(),this.force*=.82**i,this.rings.length&&(this.rings=this.rings.filter(t=>r-t.t0<e.RING_LIFE&&(t.die===void 0||r-t.die<e.RING_DIE))),this.quiet=this.force>.004||this.rings.length?0:this.quiet+i,this.quiet<55?requestAnimationFrame(n):(this.looping=!1,this.pulseAmp=0,this.clearTrail(),this.render())};requestAnimationFrame(n)}clearTrail(){let e=this.gl;e.clearColor(0,0,0,1);for(let t of this.trailFbo)e.bindFramebuffer(e.FRAMEBUFFER,t),e.clear(e.COLOR_BUFFER_BIT);e.bindFramebuffer(e.FRAMEBUFFER,null)}stepTrail(){let e=this.gl,t=this.ping,n=1-this.ping;e.useProgram(this.sim),e.bindFramebuffer(e.FRAMEBUFFER,this.trailFbo[n]),e.viewport(0,0,this.trailW,this.trailH),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.trailTex[t]),e.uniform1i(this.uS.uPrev,0),e.uniform2f(this.uS.uTexel,1/this.trailW,1/this.trailH),e.uniform2f(this.uS.uSplat,this.mouse.x,this.mouse.y);let r=Math.hypot(this.dir.x,this.dir.y)||1;e.uniform2f(this.uS.uDir,this.dir.x/r,this.dir.y/r);let i=(scrollY-this.simScroll)*Nu.parallax/innerHeight;this.simScroll=scrollY,e.uniform2f(this.uS.uShift,0,i),e.uniform1f(this.uS.uForce,this.force*.1),e.uniform1f(this.uS.uRadius,.085),e.uniform1f(this.uS.uAspect,innerWidth/innerHeight),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),this.ping=n}render(){let{gl:t,canvas:n}=this;if(!t||!n||!this.main)return;let r=n.width/innerWidth||1,i=Nu,a=this.reduce?0:-scrollY*r*i.parallax,o=document.documentElement.dataset.theme===`dark`;t.useProgram(this.main),t.viewport(0,0,n.width,n.height),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.trailTex[this.ping]),t.uniform1i(this.uM.uTrail,0),t.uniform2f(this.uM.uTrailTexel,1/this.trailW,1/this.trailH),t.uniform2f(this.uM.uMouse,this.mouse.x,this.mouse.y),t.uniform2f(this.uM.uRes,n.width,n.height),t.uniform1f(this.uM.uScroll,a),t.uniform3fv(this.uM.uPaper,this.paper),t.uniform3fv(this.uM.uInk,this.ink);let s=ju(this.paper,this.ink,-.5).map(e=>Math.min(Math.max(e,0),1));t.uniform3fv(this.uM.uHi,s),t.uniform1f(this.uM.uStrength,o?i.darkMul:1);let c=o?i.darkLines:1,l=o?i.tooth*i.darkTooth:i.tooth,u=o?i.felt*i.darkFelt:i.felt,d=o?i.crumple*i.darkCrumple:i.crumple;t.uniform4f(this.uM.uA,l,u,d,i.streak1*c),t.uniform4f(this.uM.uB,i.streak2*c,i.stain,i.crease*c,i.edge),t.uniform4f(this.uM.uC,i.warp,i.emboss,i.sheen,i.drift),t.uniform4f(this.uM.uD,o?i.halftone*i.darkHalf:i.halftone,i.pitch,i.fleck,i.halfTrail),t.uniform4f(this.uM.uE,i.wakeDots,i.wakeScale,this.pulseAmp*i.pulse*.006,Math.floor(performance.now()/125)/8),t.uniform1f(this.uM.uAlive,+!!this.looping),t.uniform1f(this.uM.uDim,this.dimAmt);{let n=performance.now();for(let r=0;r<6;r++){let i=this.rings[r],a=this.uM[`uR`+r];if(!i){t.uniform4f(a,0,0,0,0);continue}let o=Math.min((n-i.t0)/e.RING_LIFE,1),s=(1-(1-o)**2)*i.rMax,c=o<.7?1:1-((o-.7)/.3)**2,l=i.die===void 0?1:Math.max(1-(n-i.die)/e.RING_DIE,0);t.uniform4f(a,i.x,i.y,s,.85*c*l)}}t.drawArrays(t.TRIANGLES,0,3)}},Iu=1,Lu=.2,Ru=.09,zu=1.2,Bu=.045,Vu=3.5,Hu=.07,Uu=1,Wu=8,Gu={sheetStep:.145,sheetStepDark:0,shadow:.065,lightTear:.05,deckle:.045},Ku=[[`sheetStep`,0,.5,.005],[`sheetStepDark`,0,.3,.005],[`shadow`,0,.35,.005],[`lightTear`,0,1,.01],[`deckle`,0,.3,.005]],qu=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Ju=`#version 300 es
precision highp float;

uniform vec2 uRes;    // drawing-buffer px
uniform float uTop;   // clip top inset, device px
uniform float uBot;   // clip bottom inset, device px
uniform vec3 uPaper;
uniform vec3 uInk;
uniform vec3 uHi;
uniform float uStrength;
uniform float uTime; // seconds — only advances while the sweep renders
// Direction-A object-ness dials (see TUNE / ?tune=veil):
// x sheetStep (ink mix of the sheet vs page), y shadow (cast strength),
// z lightTear (light-mode pulp brightness factor), w deckle (rim shadow).
uniform vec4 uTune;
uniform float uPitch; // print-screen pitch, device px — matched to the ground
// Loader-becomes-page fusion (boot exit only): 0 = the sheet is its own
// object, 1 = the sheet IS the ground. Every object cue — tone step, cast
// shadow, deckle rim, pulp strip — dissolves with it, so the tear starts as
// a real torn edge and becomes nothing as it rises: the page was printed on
// the loader's sheet. Nav sweeps run at 0 and keep the full torn character.
uniform float uFuse;
uniform sampler2D uFiber;

out vec4 outColor;

#define PI 3.1415926538

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1, 0)), u.x),
    mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  float v = (vnoise(p) - 0.5) * 0.5;
  p = r * p * 2.03;
  v += (vnoise(p) - 0.5) * 0.25;
  p = r * p * 2.03;
  return v + (vnoise(p) - 0.5) * 0.125; // signed, ~±0.35
}

// Recession of a torn limit behind its clip line (device px, ≥ 0).
// seed decorrelates the two limits (the strip pinches and swells).
// t drifts the noise domains so the tear LIVES mid-flight — the rip crawls,
// the waves roll — instead of a frozen cutout sliding with the clip. All of
// it still rides inside env, so both rest states stay dead flat.
float limitRecession(float aU, float env, float travel, float seed, float vh, float t) {
  // Broad rolling waves + medium rip roughness — the reference's edge path is
  // smooth undulation; the fine raggedness belongs to the STRIP's silhouette
  // (its texture), never spikes in the path.
  float bump = ${Lu} * sin(travel * PI);
  float rip = fbm(vec2(aU * ${Vu} + t * 0.12, seed + t * 0.3)) * ${Bu} * 2.0;
  float wave = (vnoise(vec2(aU * ${zu} - t * 0.22, seed + 7.0 + t * 0.45)) - 0.5) * ${Ru} * 2.0;
  return max((bump + rip + wave) * env, 0.0) * vh;
}

void main() {
  vec2 px = gl_FragCoord.xy;
  float y = uRes.y - px.y; // top-down, matches the clip insets
  float vh = uRes.y;
  float aU = px.x / vh;

  // Per-edge progress + envelope: all deformation lives inside env.
  float pT = clamp(1.0 - uTop / vh, 0.0, 1.0);
  float pB = clamp(uBot / vh, 0.0, 1.0);
  float envT = sin(pT * PI);
  // Exit envelope holds a wider plateau (pow < 1) — the tear arrives sooner
  // and lingers longer through the reveal instead of only peaking mid-flight.
  float envB = pow(sin(pB * PI), 0.6);
  float stripT = ${Hu} * envT * vh;
  // Exit strip runs a touch thicker — it trails the departing sheet while the
  // eye is on the new page — but stays low-profile (was 1.7: too tall a tear).
  float stripB = ${Hu} * 1.3 * envB * vh;

  // TOP edge (leads covers): sheet limit + decorrelated strip limit.
  float recSheetT = limitRecession(aU, envT, uTop / vh, 3.7, vh, uTime) + stripT;
  float recStripT = min(limitRecession(aU + ${Uu.toFixed(1)}, envT, uTop / vh, 11.3, vh, uTime), recSheetT - 1.0);
  // BOTTOM edge (trails reveals): mirrored.
  float botLine = vh - uBot;
  // Exit deformation sits just above the entry's — see stripB.
  float recSheetB = limitRecession(aU, envB, 1.0 - uBot / vh, 23.1, vh, uTime) * 1.1 + stripB;
  float recStripB = min(limitRecession(aU + ${Uu.toFixed(1)}, envB, 1.0 - uBot / vh, 31.9, vh, uTime) * 1.1, recSheetB - 1.0);

  // Signed distance INTO the solid sheet / into the strip, per edge; the
  // pixel's class is the most restrictive of the two edges.
  float sT = (y - uTop) - recSheetT;
  float tT = (y - uTop) - recStripT;
  float sB = (botLine - y) - recSheetB;
  float tB = (botLine - y) - recStripB;
  float inSheet = min(sT, sB);
  float inStrip = min(tT, tB);

  if (inStrip < 0.0) {
    // Beyond the tear: the floating sheet drops a soft shadow on the page —
    // the depth cue that makes the same-stock curtain read as its OWN object.
    // Fused sheets cast nothing (ground can't shadow itself).
    float sh = exp(-(-inStrip) / (vh * 0.016)) * uTune.y * (1.0 - uFuse);
    outColor = vec4(0.0, 0.0, 0.0, sh);
    return;
  }

  if (inSheet < 0.0) {
    // The fiber strip — torn pulp between the two limits. The texture supplies
    // LUMINANCE only; the color is built from the live theme so the strip
    // stays in our neutral family: anchored to the page's paper, lifted toward
    // the lighter end of the mono scale (white in light mode, light ink in
    // dark — black stock tears pale).
    // The pulp shimmers: a slow crawl through the fiber texture while the
    // tear travels — loose strands catching the light, not a printed strip.
    float lum = dot(texture(uFiber, vec2(aU * 1.4 + uTime * 0.02, y / vh * 1.4 - uTime * 0.013)).rgb, vec3(0.3333));
    // Floor + texture modulation: the strip is ALWAYS distinctly pulp (never
    // sinks to sheet tone where the texture runs dark), texture adds life.
    float t = 0.45 + clamp((lum - 0.6) * 1.4, 0.0, 1.0) * 0.45;
    // Light stock tears subtle (paper is already light — a whisper of lift);
    // dark stock tears LOUD (pale pulp on black, the reference contrast).
    float isLight = step(dot(uInk, vec3(0.3333)), dot(uPaper, vec3(0.3333)));
    vec3 bright = mix(uInk, uHi, isLight);
    vec3 fib = mix(uPaper, bright, mix(t, t * uTune.z, isLight));
    // breathe a shadowed lower lip where the strip meets the solid sheet
    float lip = smoothstep(-3.0, 0.0, inSheet);
    fib *= mix(1.0, 0.88, lip);
    // Fusion: the pulp dissolves into the stock — the sheet tone also
    // converges on uPaper, so at uFuse 1 the tear line simply isn't there.
    fib = mix(fib, uPaper, uFuse);
    outColor = vec4(fib, 1.0);
    return;
  }

  // ── the solid sheet: house stock (compact cut of the ground language) ──
  // Texture FIXED in viewport space — the curtain unrolls in place (only the
  // torn boundary travels, the cloth never slides; the reference does the
  // same). A shifting texture reads as a mask wiping, not a curtain.
  vec2 sp = vec2(aU, y / vh);
  float d = 0.0;
  d += (vnoise(sp * 900.0) - 0.5) * 0.032;
  d += (hash(px * 1.013) - 0.5) * 0.014;
  d += (vnoise(sp * 46.0) - 0.5) * 0.021;
  float H = fbm(sp * 4.6);
  vec2 g = vec2(dFdx(H), dFdy(H)) * vh;
  float tonal = dot(normalize(vec2(0.6, 0.8)), g) * 0.0018; // crumple — quiet

  // The ground's halftone smidge, lifted onto the sheet: the crumple tone
  // delivered as the same 45° dot screen, so the curtain speaks the site's
  // print language while it covers.
  float tone = clamp(0.5 + tonal * 9.0, 0.0, 1.0);
  vec2 hp = mat2(0.7071, 0.7071, -0.7071, 0.7071) * px / uPitch;
  float cellD = length(fract(hp) - 0.5);
  float dotR = mix(0.08, 0.66, tone);
  float ht = smoothstep(dotR + 0.16, dotR - 0.16, cellD);
  float ampH = (0.24 + 0.76 * smoothstep(0.0, 0.14, abs(tone - 0.5))) * 0.62;
  d += mix(tonal, (ht - 0.5) * 0.16, ampH); // the print does the talking

  // The sheet sits a step toward ink from the page — the curtain must read as
  // its OWN object even over same-tone paper (the reference's contrast move,
  // scaled for a monochrome system; Direction A pushes this dial). The
  // fusion walks this step back to zero: same stock, then SAME PAPER.
  vec3 sheet = mix(uPaper, uInk, uTune.x * (1.0 - uFuse));
  vec3 col = mix(sheet, uInk, clamp(max(d, 0.0) * uStrength, 0.0, 0.3));
  col = mix(col, uHi, clamp(max(-d, 0.0) * uStrength, 0.0, 0.25));
  // Deckle rim — a hair of shadow right where sheet meets strip.
  col = mix(col, uInk, (1.0 - smoothstep(0.0, 2.5, inSheet)) * uTune.w * (1.0 - uFuse));
  col += (hash(px * 1.7) - 0.5) / 255.0;
  outColor = vec4(col, 1.0);
}`;function Yu(e=512){let t=document.createElement(`canvas`);t.width=t.height=e;let n=t.getContext(`2d`);n.fillStyle=`#f4f1ea`,n.fillRect(0,0,e,e);for(let t=0;t<260;t++){let t=225+(Math.random()*26-13)|0;n.fillStyle=`rgba(${t},${t-4},${t-12},0.10)`,n.beginPath(),n.ellipse(Math.random()*e,Math.random()*e,8+Math.random()*42,4+Math.random()*14,(Math.random()-.5)*.5,0,Math.PI*2),n.fill()}for(let t=0;t<3200;t++){let t=Math.random()*e,r=Math.random()*e,i=4+Math.random()*34,a=196+Math.random()*56|0;n.strokeStyle=`rgba(${a},${a-5},${a-14},${.1+Math.random()*.22})`,n.lineWidth=Math.random()<.85?1:2,n.beginPath(),n.moveTo(t,r),n.lineTo(t+i,r+(Math.random()-.5)*4),n.stroke()}for(let t=0;t<380;t++){let t=120+Math.random()*60|0;n.fillStyle=`rgba(${t},${t-8},${t-18},${.12+Math.random()*.2})`,n.fillRect(Math.random()*e,Math.random()*e,1+Math.random()*2,1)}return t}var Xu=new class{panel=null;canvas=null;gl=null;u={};raf=0;synced=!1;t0=performance.now();paper=[.91,.91,.906];ink=[.12,.12,.12];fuse=0;reduced=!1;setFuse(e){this.fuse=Math.min(Math.max(e,0),1)}init(){if(this.panel=document.querySelector(`[data-veil-panel]`),this.canvas=this.panel?.querySelector(`[data-veil-paper]`)??null,!this.panel||!this.canvas)return;let e=this.canvas.getContext(`webgl2`,{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0});if(!e||(this.gl=e,!this.compile()))return;this.uploadFiber();let t=matchMedia(`(prefers-reduced-motion: reduce)`);this.reduced=t.matches,t.addEventListener?.(`change`,e=>{this.reduced=e.matches,this.request()}),this.readTheme(),this.resize(),this.panel.classList.add(`veil--gl`),new MutationObserver(()=>this.request()).observe(this.panel,{attributes:!0,attributeFilter:[`style`]}),window.addEventListener(`resize`,()=>{this.resize(),this.request()},{passive:!0});let n=document.documentElement.getAttribute(`data-theme`);new MutationObserver(()=>{let e=document.documentElement.getAttribute(`data-theme`);e!==null&&e!==n&&(n=e,this.readTheme(),this.request())}).observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`]}),this.canvas.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.panel?.classList.remove(`veil--gl`)}),this.canvas.addEventListener(`webglcontextrestored`,()=>{this.compile()&&(this.uploadFiber(),this.resize(),this.panel?.classList.add(`veil--gl`),this.render())}),this.render(),this.tunePanel()}tunePanel(){let e=this.panel,t=0,n=!1,r=r=>{if(r!==n){if(n=r,r){e.style.visibility=`visible`,e.style.clipPath=`inset(15% 0% 15% 0%)`;let r=()=>{n&&(this.request(),t=requestAnimationFrame(r))};t=requestAnimationFrame(r)}else cancelAnimationFrame(t),e.style.visibility=`hidden`,e.style.clipPath=`inset(100% 0% 0% 0%)`}},i=(e,t,n)=>{let r=Ku.find(t=>t[0]===e);return{key:e,label:t,min:r[1],max:r[2],step:r[3],value:Gu[e],hint:n}};xu(`veil`,[{group:`the stage`,rows:[fu(`hold`,`hold mid-flight`,!1,`pin the curtain with both tears on screen`)]},{group:`the sheet`,rows:[i(`sheetStep`,`sheet step`,`ink mix of the sheet vs the page — the stock does all the separating`),i(`sheetStepDark`,`sheet step, dark`,`toward white in dark; Carter zeroed it — black stock tears white`)]},{group:`the tear`,rows:[i(`shadow`,`cast shadow`,`the tear's shadow — at the edge of perception`),i(`lightTear`,`light pulp`,`light-mode pulp brightness`),i(`deckle`,`deckle`,`rim shadow where the sheet meets the strip`)]}],e=>{r(!!e.hold);for(let t of Object.keys(e))t!==`hold`&&(Gu[t]=e[t]);this.request()},{side:`start`,persist:!0})}compile(){let e=this.gl,t=(t,n)=>{let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.warn(`[veil-paper]`,e.getShaderInfoLog(r)),null)},n=t(e.VERTEX_SHADER,qu),r=t(e.FRAGMENT_SHADER,Ju);if(!n||!r)return!1;let i=e.createProgram();if(e.attachShader(i,n),e.attachShader(i,r),e.linkProgram(i),!e.getProgramParameter(i,e.LINK_STATUS))return console.warn(`[veil-paper]`,e.getProgramInfoLog(i)),!1;e.useProgram(i);for(let t of[`uRes`,`uTop`,`uBot`,`uPaper`,`uInk`,`uHi`,`uStrength`,`uTime`,`uTune`,`uPitch`,`uFuse`,`uFiber`])this.u[t]=e.getUniformLocation(i,t);return!0}uploadFiber(){let e=this.gl,t=e.createTexture();e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,Yu()),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT)}readTheme(){let e=getComputedStyle(document.documentElement);this.paper=Au(e.getPropertyValue(`--paper`))??this.paper,this.ink=Au(e.getPropertyValue(`--ink`))??this.ink}resize(){let{canvas:e,gl:t}=this;if(!e||!t)return;let n=Math.min(devicePixelRatio||1,Iu),r=Math.round(innerWidth*n),i=Math.round(innerHeight*n);(r!==e.width||i!==e.height)&&(e.width=r,e.height=i,t.viewport(0,0,r,i),this.render())}sync(){this.gl&&(this.synced=!0,this.render())}request(){if(this.synced){this.synced=!1;return}this.raf||=requestAnimationFrame(()=>{this.raf=0,this.render()})}render(){let{gl:e,canvas:t,panel:n}=this;if(!e||!t||!n||n.style.visibility===`hidden`)return;let r=(n.style.clipPath||``).match(/([\d.]+)%/g)?.map(parseFloat)??[],i=r[0]??0,a=r.length>=3?r[2]:r[0]??0,o=document.documentElement.dataset.theme===`dark`,s=this.paper.map((e,t)=>Math.min(Math.max(e+(e-this.ink[t])*.5,0),1));e.uniform2f(this.u.uRes,t.width,t.height),e.uniform1f(this.u.uTop,i/100*t.height),e.uniform1f(this.u.uBot,a/100*t.height),e.uniform3fv(this.u.uPaper,this.paper),e.uniform3fv(this.u.uInk,this.ink),e.uniform3fv(this.u.uHi,s),e.uniform1f(this.u.uStrength,o?.68:1);let c=this.reduced?0:(performance.now()-this.t0)/1e3;e.uniform1f(this.u.uTime,Math.floor(c*Wu)/Wu),e.uniform4f(this.u.uTune,o?Gu.sheetStepDark:Gu.sheetStep,Gu.shadow,Gu.lightTear,Gu.deckle);let l=devicePixelRatio||1;e.uniform1f(this.u.uPitch,6/Math.min(l,1.5)*Math.min(l,Iu)),e.uniform1f(this.u.uFuse,this.fuse),e.uniform1i(this.u.uFiber,0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLES,0,3)}},Zu=`inset(0% 0% 0% 0%)`,Qu=`inset(100% 0% 0% 0%)`,$u=`inset(0% 0% 100% 0%)`,ed=/^\/lab\/?$/,td=/^\/lab\/[^/]+\/?$/,nd=e=>ed.test(e)||td.test(e),rd=1.3,id=4e3,ad=1.1,od=1.3,sd=1.3,cd={climb:{cells:[0,5,9,17,27,39,52,64,78,89,100],rests:[0,2,4,6,8,10]},eager:{cells:[0,11,21,35,48,60,71,80,88,94,100],rests:[0,2,4,6,8,10]},stall:{cells:[0,7,12,15,28,36,43,56,68,72,86,100],rests:[0,2,3,6,8,9,11]},brisk:{cells:[0,12,23,41,57,73,86,94,100],rests:[0,2,4,6,8]}},ld=`climb`,ud=()=>{let e=new URLSearchParams(location.search).get(`loader`);return e&&cd[e]||cd[ld]},dd=.16,fd=.11,pd=.1,md=.85,hd=.22,gd=.62,_d=0,vd=.45,yd=500,bd=3e3,xd=.45,Sd=2e4,Cd=`M0,0 C0.4,0 0.2,1 1,1`,wd=new class{el=null;bootEl=null;countEl=null;odoStrip=null;odoCells=cd[ld].cells;odoRests=cd[ld].rests;wordEl=null;state=`idle`;disabled=!1;reduced=!1;lock=null;watchdog=0;tl=null;revealWipeDur=0;coverPromise=null;navSeq=0;swapSeen=!1;sweep=`expo.inOut`;recedeEase=`power2.inOut`;hopEase=`power1.inOut`;travelEl=null;dimEl=null;labNav=null;uaSwipe=!1;trigger={type:`none`,source:null};carve=`none`;route={from:``,to:``};t={prep:0,covered:0,swap:0,reveal:0,idle:0};dbg=null;inFlight=!1;pendingTo=null;coverAt=0;holds=[];holdOn=!1;holdTimer=0;holdRolled=0;holdSet=null;get active(){return!this.disabled&&this.state!==`idle`}get phase(){return this.state}setState(e){if(this.state!==e){this.state=e,ou.ticker.lagSmoothing(e===`idle`?0:200,33);try{performance.mark(`veil:${e}`),e===`covering`&&(this.t={prep:performance.now(),covered:0,swap:0,reveal:0,idle:0}),e===`covered`&&(this.t.covered=performance.now()),e===`revealing`&&(this.t.reveal=performance.now()),e===`idle`&&(this.t.idle=performance.now(),this.t.prep&&performance.measure(`veil:nav`,{start:this.t.prep,end:this.t.idle}))}catch{}this.note()}}note(){if(!this.dbg)return;let e=(e,t)=>e&&t&&t>=e?`${Math.round(t-e)}ms`:`—`,t=this.trigger.source,n=t?`<${t.tagName.toLowerCase()}${t.id?`#`+t.id:``}>`:`—`;this.dbg.textContent=[`veil  ${this.state}${this.inFlight?` · in flight`:``}${this.holdOn?` · holding`:``}`,`nav   ${this.trigger.type} via ${n}`,`route ${this.route.from||`—`} → ${this.route.to||`—`}  [${this.carve}]`,`lock  ${this.lock?`scroll`:`—`}  holds ${this.holds.length}`,`cover ${e(this.t.prep,this.t.covered)}  fetch ${e(this.t.prep,this.t.swap)}  dwell ${e(this.t.covered,this.t.reveal)}  reveal ${e(this.t.reveal,this.t.idle)}`].join(`
`)}flightRoute=null;hold(e,t=bd){if(this.disabled)return;let n=new Promise(e=>setTimeout(e,t));this.holds.push(Promise.race([e.catch(()=>{}),n]))}clearNavStamp(){document.querySelectorAll(`.is-navving-from`).forEach(e=>e.classList.remove(`is-navving-from`))}init(){if(this.el=document.querySelector(`[data-veil-panel]`),!this.el)return;if(this.bootEl=this.el.querySelector(`[data-veil-boot]`),this.countEl=this.el.querySelector(`[data-veil-count]`),this.wordEl=this.el.querySelector(`[data-veil-word]`),this.travelEl=this.el.querySelector(`[data-veil-travel]`),this.dimEl=document.querySelector(`[data-veil-dim]`),new URLSearchParams(location.search).get(`debug`)===`veil`&&!this.dbg){let e=document.createElement(`pre`);e.setAttribute(`data-veil-debug`,``),e.style.cssText=`position:fixed;inset-inline-start:8px;inset-block-end:8px;z-index:3000;margin:0;padding:6px 8px;font:500 10px/1.5 ui-monospace,monospace;color:var(--ink);background:var(--popover);border:1px solid var(--line);border-radius:6px;pointer-events:none;white-space:pre`,document.documentElement.append(e),this.dbg=e,window.__veil=this}{let e=matchMedia(`(prefers-reduced-motion: reduce)`);this.reduced=e.matches,e.addEventListener?.(`change`,e=>this.reduced=e.matches)}this.sweep=`expo.inOut`,this.recedeEase=au.create(`recedeBack`,`.58,0,.38,1`),this.hopEase=au.create(`hopRoll`,Cd);let e=document.documentElement,t=e.getAttribute(`data-veil`);if(this.el.classList.add(`is-js`),this.disabled=e.hasAttribute(`data-bare`)||t===`off`,this.disabled){e.removeAttribute(`data-veil`),this.setIdle();return}if(performance.now()>id){e.removeAttribute(`data-veil`),this.bootEl&&(this.bootEl.style.display=`none`),ou.set(this.el,{visibility:`hidden`,opacity:1,clipPath:Qu,pointerEvents:`none`}),this.bindNav(),this.setIdle();return}ou.set(this.el,{visibility:`visible`,opacity:1,clipPath:Zu,pointerEvents:`auto`}),t!==`boot`&&this.bootEl&&(this.bootEl.style.display=`none`),t===`boot`&&this.buildOdometer(),e.removeAttribute(`data-veil`),this.setState(`covered`),this.setInert(!0),this.bindNav(),queueMicrotask(()=>{this.state!==`idle`&&!this.lock&&(this.lock=su.stop())}),this.armWatchdog(6e3),t===`boot`?this.playBoot():this.playFast()}buildOdometer(){let e=this.countEl;if(!e||this.odoStrip)return;let t=ud();this.odoCells=t.cells,this.odoRests=t.rests,e.textContent=``;let n=document.createElement(`span`);n.className=`veil__digit`;let r=document.createElement(`span`);r.className=`veil__digit-strip`;for(let e of this.odoCells){let t=document.createElement(`span`);t.className=`veil__digit-cell`,t.textContent=String(e),r.append(t)}n.append(r),e.append(n),this.odoStrip=r,this.rollTo(0)}rollTo(e){if(!this.odoStrip)return;let t=Math.min(this.odoCells.length-1,Math.max(0,e));this.odoStrip.style.transform=`translateY(${-t}em)`}async playBoot(){if(this.setState(`boot`),this.reduced){if(this.buildOdometer(),this.rollTo(this.odoCells.length-1),await this.fontsSettled(),this.state!==`boot`)return;this.reveal({exitBoot:!0,mode:`boot`});return}let e=!1,t=(e,t)=>Promise.race([e.catch(()=>{}),new Promise(e=>setTimeout(e,t))]),n=document.readyState===`complete`?Promise.resolve():new Promise(e=>window.addEventListener(`load`,e,{once:!0})),r=0,i=[],a=(e,n)=>i.push(t(e,n).then(()=>r++));a(document.fonts?.ready??Promise.resolve(),2500),a(Fu.ready,2500),a(n,4e3),document.querySelectorAll(`main img`).forEach(e=>{e.getBoundingClientRect().top<innerHeight*1.5&&a(e.decode?.()??Promise.resolve(),3e3)});let o=Promise.all(i).then(()=>{e=!0}),s=this.odoCells,c=this.climbSetter(),l=c.set;if(l(0),this.travelEl&&(this.tl=ou.to(this.travelEl,{y:0,duration:.5,ease:`expo.out`}),await new Promise(e=>setTimeout(e,260)),this.state!==`boot`)||(await this.tween(e=>this.hopTimeline(l,e)),this.state!==`boot`))return;for(;!e;)if(await new Promise(e=>setTimeout(e,200)),this.state!==`boot`)return;if(await o,this.state!==`boot`)return;let u=this.holds.splice(0);for(;u.length;){if(await Promise.all(u),this.state!==`boot`)return;u=this.holds.splice(0)}let d=s.length-1;if(c.rolled<d){let e={i:c.rolled};if(await this.tween(t=>ou.timeline({onComplete:t}).to(e,{i:d,duration:gd,ease:`power2.out`,onUpdate:()=>l(e.i)})),this.state!==`boot`)return}await new Promise(e=>setTimeout(e,180)),this.state===`boot`&&this.reveal({exitBoot:!0,mode:`boot`})}climbSetter(){let e=this.travelEl?.offsetHeight||innerHeight*.12,t=Math.max(0,innerHeight-e-48),n=this.odoCells,r={rolled:0,set:e=>{}};return r.set=e=>{let i=Math.min(n.length-1,Math.max(r.rolled,e));r.rolled=i,this.rollTo(i);let a=Math.floor(i),o=Math.min(n.length-1,a+1),s=n[a]+(n[o]-n[a])*(i-a);this.travelEl&&t>0&&ou.set(this.travelEl,{y:-t*(s/100)})},r}hopTimeline(e,t){let n=this.odoRests,r={i:0},i=ou.timeline({onComplete:t}),a=n.length-2;for(let t=1;t<=a;t++){let o=n[t-1],s=n[t],c=md+.5499999999999999*(a>1?(t-1)/(a-1):1);i.to(r,{i:s,duration:(dd+(s-o)*fd)*c,ease:this.hopEase,onUpdate:()=>e(r.i)}).to(r,{i:s,duration:t===a?hd:pd*c})}return i}startHold(){if(this.holdOn||this.reduced||this.state!==`covered`||!this.bootEl||!this.travelEl)return;this.holdOn=!0,this.note(),this.buildOdometer(),this.wordEl&&(this.wordEl.style.display=`none`),this.bootEl.style.display=``;let e=this.climbSetter();this.holdSet=e.set,this.holdRolled=0,this.rollTo(0),ou.set(this.travelEl,{y:this.travelEl.offsetHeight+48}),this.killTl();let t=ou.timeline();this.tl=t,t.to(this.travelEl,{y:0,duration:.5,ease:`expo.out`},0),t.add(this.hopTimeline(t=>{e.set(t),this.holdRolled=e.rolled},()=>{}),.26)}closeHold(){return new Promise(e=>{if(!this.holdOn)return e();this.killTl();let t=this.holdSet,n=this.odoCells.length-1,r={i:this.holdRolled},i=ou.timeline({onComplete:()=>window.setTimeout(e,120)});this.tl=i,t&&r.i<n?i.to(r,{i:n,duration:xd,ease:`power2.out`,onUpdate:()=>t(r.i)}):i.call(()=>{},[],.01)})}async playFast(){if(await new Promise(e=>setTimeout(e,120)),this.state!==`covered`)return;let e=this.holds.splice(0);for(;e.length;){if(await Promise.all(e),this.state!==`covered`)return;e=this.holds.splice(0)}this.reveal({mode:`fast`})}bindNav(){let e=window;e.__veilBound||(e.__veilBound=!0,window.addEventListener(`popstate`,e=>{this.uaSwipe=!!e.hasUAVisualTransition},{capture:!0}),window.addEventListener(`pagehide`,()=>{this.state!==`idle`&&this.forceClear()}),window.addEventListener(`pageshow`,e=>{e.persisted&&this.state!==`idle`&&this.forceClear()}),document.addEventListener(`click`,e=>{if(this.disabled||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;let t=e.target?.closest?.(`a[href], area[href]`);if(!t||!t.href)return;let n=t instanceof HTMLElement?t.target:``;if(n&&n!==`_self`||t.hasAttribute(`download`))return;if(this.state!==`idle`){e.preventDefault();return}let r=new URL(t.href,location.href);if(r.origin!==location.origin)return;let i=r.pathname===location.pathname&&r.search===location.search;if(i&&(!r.hash||r.hash===location.hash)){e.preventDefault();return}i||t.classList.add(`is-navving-from`)},{capture:!0}),window.navigation?.addEventListener(`navigate`,e=>{this.disabled||e.navigationType===`traverse`&&e.cancelable&&this.state!==`idle`&&e.preventDefault()}),document.addEventListener(`astro:before-preparation`,e=>{if(this.disabled)return;let t=e,n=t.from?.pathname??``,r=t.to?.pathname??``;this.trigger={type:t.navigationType??`none`,source:t.sourceElement??null},this.route={from:n,to:r},this.carve=`veil`,this.note();let i=this.uaSwipe;if(this.uaSwipe=!1,t.navigationType===`traverse`&&i){this.labNav=null,this.carve=`ua-swipe`,this.note();return}if(t.info?.veil===`flight`){this.labNav=null,this.clearNavStamp(),this.carve=`flight`,this.note();return}if(this.flightRoute?.(n,r)){this.labNav=null,this.clearNavStamp(),this.carve=`flight-route`,this.note();return}if(nd(n)&&nd(r)&&`startViewTransition`in document){this.carve=`lab`,this.note(),this.labNav=ed.test(n)&&td.test(r)?`enter`:td.test(n)&&ed.test(r)?`return`:`lateral`;return}this.labNav=null,document.querySelector(`[data-header]`)?.classList.add(`is-veil-nav`);let a=t.loader,o=this.cover(),s=++this.navSeq;this.swapSeen=!1,this.inFlight=!0,this.pendingTo=t.to?.href??null,o.then(()=>{clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.navSeq===s&&this.state===`covered`&&!this.swapSeen&&this.startHold()},yd)}),t.loader=async()=>{try{await Promise.all([a.call(t),o]),window.setTimeout(()=>{this.navSeq===s&&!this.swapSeen&&(this.state===`covered`||this.state===`covering`)&&this.forceClear()},600)}catch(e){throw e?.name!==`AbortError`&&this.forceClear(),e}finally{this.navSeq===s&&(this.inFlight=!1)}}}),document.addEventListener(`astro:before-swap`,()=>{this.swapSeen=!0,this.t.swap=performance.now();try{performance.mark(`veil:swap`)}catch{}}),document.addEventListener(`astro:after-swap`,()=>{let e=document.documentElement;this.labNav===`enter`||this.labNav===`return`?e.setAttribute(`data-lab-nav`,this.labNav):e.removeAttribute(`data-lab-nav`),(this.state===`covering`||this.state===`covered`)&&this.setInert(!0)}),document.addEventListener(`astro:page-load`,()=>{if(document.documentElement.removeAttribute(`data-lab-nav`),this.labNav=null,this.disabled)return;this.carve!==`veil`&&this.carve!==`none`&&this.focusHeading();let e=async()=>{if(this.state!==`covered`)return;let e=this.navSeq,t=this.holds.splice(0);if(t.length){for(clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.navSeq===e&&this.state===`covered`&&this.startHold()},yd);t.length;){if(await Promise.all(t),this.navSeq!==e||this.state!==`covered`)return;t=this.holds.splice(0)}clearTimeout(this.holdTimer)}if(this.reduced){this.reveal({mode:`nav`});return}if(this.holdOn){if(await this.closeHold(),this.navSeq!==e||this.state!==`covered`)return;this.reveal({mode:`nav`,exitCounter:!0});return}let n=this.firstDwell()?_d:0;if(!n){this.reveal({mode:`nav`});return}window.setTimeout(()=>{this.navSeq===e&&this.state===`covered`&&this.reveal({mode:`nav`})},n)};this.state===`covering`?this.coverPromise?.then(e):this.state===`covered`&&e(),this.state!==`idle`&&this.armWatchdog(6e3)}),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.tl&&this.tl.progress()<1&&this.tl.progress(1)}))}cover(){let e=this.el;if(this.state===`covering`&&this.coverPromise)return this.coverPromise;if(this.state===`covered`||this.state===`boot`)return this.killTl(),this.state===`boot`&&(this.bootEl&&(this.bootEl.style.display=`none`),Xu.setFuse(0)),ou.set(e,{visibility:`visible`,opacity:1,clipPath:Zu}),this.setState(`covered`),Promise.resolve();let t=this.state===`revealing`&&this.revealWipeDur>0?Math.min(1,(this.tl?.time()??0)/this.revealWipeDur):1;return this.setState(`covering`),this.killTl(),this.coverAt=performance.now(),this.armWatchdog(5e3),this.setInert(!0),ou.set(e,{visibility:`visible`,opacity:1,pointerEvents:`auto`}),this.coverPromise=new Promise(n=>{let r=()=>{this.setState(`covered`),n()};if(this.reduced)ou.set(e,{clipPath:Zu}),this.tl=ou.timeline({onComplete:r,onInterrupt:r}).fromTo(e,{opacity:0},{opacity:1,duration:.2,ease:`power1.out`});else{t>=.5&&ou.set(e,{clipPath:Qu});let n=ou.timeline({onComplete:r,onInterrupt:r});this.tl=n,this.recede(n),n.to(e,{clipPath:Zu,duration:rd,ease:this.sweep,onUpdate:()=>Xu.sync()},0)}}),this.coverPromise}recede(e){if(this.reduced||td.test(location.pathname))return;let t=document.querySelector(`main`);if(t){let n=()=>ou.set(t,{transformOrigin:`50% ${scrollY+innerHeight/2}px`});n(),window.addEventListener(`resize`,n,{passive:!0}),e.to(t,{scale:.96,y:10,duration:rd,ease:this.recedeEase,onComplete:()=>window.removeEventListener(`resize`,n),onInterrupt:()=>window.removeEventListener(`resize`,n)},0);let r=document.createElement(`div`);r.setAttribute(`data-recede-scrim`,``),r.setAttribute(`aria-hidden`,`true`),r.style.cssText=`position:fixed;inset:0;z-index:500;background:#000;opacity:0;pointer-events:none;will-change:opacity`,document.body.append(r),e.to(r,{opacity:.55,duration:rd*.7,ease:this.recedeEase},0)}if(document.documentElement.hasAttribute(`data-paper-gl`)){let t={v:Fu.dim};e.to(t,{v:vd,duration:rd*.7,ease:`power2.out`,onUpdate:()=>Fu.setDim(t.v)},0)}else this.dimEl&&e.to(this.dimEl,{opacity:vd,duration:rd*.7,ease:`power2.out`},0)}undim(e){if(document.documentElement.hasAttribute(`data-paper-gl`)){let t={v:Fu.dim};t.v>0&&e.to(t,{v:0,duration:.25,ease:`power2.out`,onUpdate:()=>Fu.setDim(t.v)},0)}this.dimEl&&e.to(this.dimEl,{opacity:0,duration:.25,overwrite:`auto`},0)}reveal(e){let t=this.el;if(this.setState(`revealing`),this.releaseLock(),this.clearWatchdog(),this.killTl(),this.coverPromise=null,this.holds.length=0,clearTimeout(this.holdTimer),this.holdOn=!1,ou.set(t,{pointerEvents:`none`}),this.setInert(!1),e.mode===`nav`&&this.focusHeading(),this.reduced){document.dispatchEvent(new CustomEvent(`veil:reveal`,{detail:{mode:e.mode,wipeDur:0}}));let n=ou.timeline({onComplete:()=>this.setIdle()});this.undim(n),n.to(t,{opacity:0,duration:.2,ease:`power1.out`},0),this.entrance(n,0,!0),this.tl=n;return}let n=e.exitBoot?sd:e.mode===`fast`?od:ad;this.revealWipeDur=n;let r=ou.timeline();if(this.tl=r,this.undim(r),r.call(()=>this.setIdle(),[],n),document.dispatchEvent(new CustomEvent(`veil:reveal`,{detail:{mode:e.mode,wipeDur:n,tl:r}})),(e.exitBoot||e.exitCounter)&&this.travelEl&&r.to(this.travelEl,{y:-(innerHeight+this.travelEl.offsetHeight+48),duration:.8,ease:this.sweep},0),e.exitBoot&&this.bootEl){this.wordEl&&r.to(this.wordEl,{yPercent:-120,opacity:0,duration:.8,ease:this.sweep},0);let e={v:0};r.to(e,{v:1,duration:n,ease:`power1.in`,onUpdate:()=>Xu.setFuse(e.v)},0),r.call(()=>{Xu.setFuse(0),Fu.settle()},[],n+.01)}r.to(t,{clipPath:$u,duration:n,ease:this.sweep,onUpdate:()=>Xu.sync()},0),this.entrance(r,n*.4,!1)}focusHeading(){let e=[`main [data-focus-target]`,`main h1`,`main h2`,`main`].map(e=>document.querySelector(e)).find(Boolean);if(e){e.hasAttribute(`tabindex`)||e.setAttribute(`tabindex`,`-1`);try{e.focus({preventScroll:!0})}catch{}}}entrance(e,t,n){let r=document.querySelector(`main`);if(!r)return;let i=r.querySelectorAll(`[data-reveal]`);if(i.length!==0){if(n){e.fromTo([...i],{opacity:0},{opacity:1,duration:.5,ease:`power1.out`,clearProps:`opacity`},t);return}e.fromTo([...i],{opacity:0,y:24},{opacity:1,y:0,duration:.85,ease:`power3.out`,stagger:.06,clearProps:`transform,opacity`},t)}}armWatchdog(e){this.clearWatchdog(),this.watchdog=window.setTimeout(()=>this.onWatchdog(),e)}onWatchdog(){if(this.state!==`idle`){if(this.inFlight){if(this.pendingTo&&performance.now()-this.coverAt>Sd){location.assign(this.pendingTo);return}this.armWatchdog(1e3);return}this.forceClear()}}clearWatchdog(){this.watchdog&&=(clearTimeout(this.watchdog),0)}forceClear(){this.state===`revealing`&&this.tl?.progress(1),this.killTl(),this.coverPromise=null,document.dispatchEvent(new CustomEvent(`veil:reveal`,{detail:{mode:`nav`,wipeDur:0}}));let e=document.querySelector(`main`);if(e){let t=e.querySelectorAll(`[data-reveal]`);ou.killTweensOf(e),ou.set(t.length?[e,...t]:e,{clearProps:`transform,opacity,transformOrigin`})}document.querySelectorAll(`[data-recede-scrim]`).forEach(e=>e.remove()),this.setIdle()}setInert(e){document.querySelector(`main`)?.toggleAttribute(`inert`,e),document.querySelector(`[data-header]`)?.toggleAttribute(`inert`,e)}setIdle(){this.setState(`idle`),this.clearWatchdog(),clearTimeout(this.holdTimer),this.holdOn=!1,this.holdSet=null,this.releaseLock(),this.setInert(!1),document.querySelector(`[data-header]`)?.classList.remove(`is-veil-nav`),this.clearNavStamp(),this.el&&(ou.set(this.el,{visibility:`hidden`,opacity:1,clipPath:Qu,pointerEvents:`none`}),Fu.dimTo(0,0),Xu.setFuse(0),this.dimEl&&ou.set(this.dimEl,{opacity:0,overwrite:`auto`}),this.bootEl&&(this.bootEl.style.display=`none`))}releaseLock(){this.lock&&=(su.start(this.lock),null)}firstDwell(){try{return!sessionStorage.getItem(`veil:dwelt`)&&(sessionStorage.setItem(`veil:dwelt`,`1`),!0)}catch{return!1}}killTl(){this.tl?.kill(),this.tl=null}tween(e){return new Promise(t=>{this.tl=e(t)})}fontsSettled(){let e=new Promise(e=>setTimeout(e,2e3));try{return Promise.race([document.fonts.ready,e])}catch{return e}}},Td=[];function Ed(e){Td.push(e)}function Dd(){let e=Td;Td=[],e.forEach(e=>{try{e()}catch(e){console.error(`[destroy]`,e)}})}var Od=()=>getComputedStyle(document.documentElement).getPropertyValue(`--ink`).trim()||`#f2f1ee`;function kd(e,t,n={}){let r=Math.max(2,Math.round(e)),i=Math.max(2,Math.round(t)),a=document.createElement(`canvas`);a.width=r,a.height=i;let o=a.getContext(`2d`),s=n.ink??Od(),c=n.ground===void 0?null:n.ground;c&&(o.fillStyle=c,o.fillRect(0,0,r,i));let l=Math.min(r,i),u=n.step??l/9,d=Math.max(1,Math.round(r/u)),f=Math.max(1,Math.round(i/u)),p=r/d,m=i/f,h=n.weight??Math.max(1,Math.round(l/480));o.strokeStyle=s,o.globalAlpha=n.alpha??.72,o.lineWidth=h,o.lineCap=`butt`;let g=(e,t)=>Math.min(t-h/2,Math.max(h/2,Math.round(e-h/2)+h/2)),_=Math.min(n.radius??0,l/2);_>0&&(o.save(),o.beginPath(),o.roundRect(0,0,r,i,_),o.clip()),o.beginPath();for(let e=0;e<=d;e++){let t=g(e*p,r);o.moveTo(t,0),o.lineTo(t,i)}for(let e=0;e<=f;e++){let t=g(e*m,i);o.moveTo(0,t),o.lineTo(r,t)}return o.stroke(),_>0&&(o.restore(),o.beginPath(),o.roundRect(h/2,h/2,r-h,i-h,Math.max(0,_-h/2)),o.stroke()),o.globalAlpha=1,a}var Ad=new Map,jd=new Set;function Md(e,t,n,r=Od(),i=0){let a=`${Math.round(e)}x${Math.round(t)}:${n}:${r}:${Math.round(i)}`,o=Ad.get(a);return o||(o=kd(e,t,{seed:n,ink:r,radius:i}).toDataURL(`image/png`),Ad.set(a,o),jd.add(o)),o}var Nd=`mesh`,Pd=()=>{try{let e=new URLSearchParams(location.search);if(!e.has(Nd))return!1;let t=e.get(Nd);return t!==`0`&&t!==`off`&&t!==`false`}catch{return!1}},Fd=new Set,Id=!1,Ld=()=>{if(Id)return;Id=!0;let e=document.documentElement.getAttribute(`data-theme`);new MutationObserver(()=>{let t=document.documentElement.getAttribute(`data-theme`);if(t===e)return;e=t;let n=Od();Fd.forEach(e=>e(n))}).observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`]})},Rd=0,zd=new WeakMap,Bd=e=>{let t=zd.get(e);return t===void 0&&(t=7+ ++Rd*13,zd.set(e,t)),t},Vd=new class{get on(){return Pd()}onInk(e){return Ld(),Fd.add(e),()=>Fd.delete(e)}init(){let e=()=>{document.documentElement.toggleAttribute(`data-mesh`,this.on),this.on&&(document.querySelectorAll(`main img`).forEach(e=>this.img(e)),document.querySelectorAll(`main video`).forEach(e=>this.video(e)))};new MutationObserver(e=>{if(this.on)for(let t of e)if(t.type===`attributes`){let e=t.target;e instanceof HTMLImageElement?this.img(e):e instanceof HTMLVideoElement&&this.video(e)}else t.addedNodes.forEach(e=>{e instanceof Element&&(e instanceof HTMLImageElement?this.img(e):e instanceof HTMLVideoElement?this.video(e):(e.querySelectorAll(`img`).forEach(e=>this.img(e)),e.querySelectorAll(`video`).forEach(e=>this.video(e))))})}).observe(document.body,{subtree:!0,childList:!0,attributes:!0,attributeFilter:[`src`,`srcset`]}),document.addEventListener(`astro:page-load`,e),this.onInk(()=>{this.on&&document.querySelectorAll(`main img[data-mesh]`).forEach(e=>{e.removeAttribute(`data-mesh`),this.img(e)})}),e()}img(e){if(!e.closest(`main`)||jd.has(e.currentSrc)||jd.has(e.src))return;let t=e.getBoundingClientRect(),n=t.width||e.width||e.naturalWidth||640,r=t.height||e.height||e.naturalHeight||n*.75,i=parseFloat(getComputedStyle(e).borderTopLeftRadius)||0,a=Md(Math.min(1600,n*2),Math.min(1600,r*2),Bd(e),Od(),i*2);e.removeAttribute(`srcset`),e.removeAttribute(`sizes`),e.setAttribute(`data-mesh`,``),e.src=a}video(e){if(!e.closest(`main`)||e.hasAttribute(`data-mesh`))return;e.setAttribute(`data-mesh`,``),e.pause(),e.removeAttribute(`src`),e.querySelectorAll(`source`).forEach(e=>e.remove());let t=e.getBoundingClientRect(),n=t.width||e.width||640,r=t.height||e.height||n*.5625,i=parseFloat(getComputedStyle(e).borderTopLeftRadius)||0;e.poster=Md(Math.min(1600,n*2),Math.min(1600,r*2),Bd(e),Od(),i*2);try{e.load()}catch{}}};export{Dd as a,Fu as c,su as d,ou as f,$ as h,Ed as i,Au as l,jl as m,Od as n,wd as o,au as p,kd as r,Xu as s,Vd as t,xu as u};
