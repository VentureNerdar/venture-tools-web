import{R as r,u as N}from"./DavTe13q.js";import{u as R}from"./B7TUqnbC.js";import{u as f,a as _,_ as P}from"./CbrxEeZO.js";import{u as y,a as E,b as G,c as A}from"./DcmwGaMh.js";import{d as w,t as i,v as c,x as o,u as M,J as U,bt as I,L as l,z as p,M as k,Q as b,ar as B,y as h,A as C,B as V,_ as z}from"./DjT8zhlV.js";import{_ as q}from"./XRGwxX6m.js";import{N as D}from"./By_AYA8C.js";import"./IoIuy_vt.js";import"./BLsdgGu3.js";import"./jGolgmb8.js";import"./B-p6aW7q.js";const F={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},W=w({name:"CheckRound",render:function(S,d){return i(),c("svg",F,d[0]||(d[0]=[o("path",{d:"M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z",fill:"currentColor"},null,-1)]))}}),$={class:"wrap"},H={style:{"text-align":"center"}},J={class:"load-list"},K={key:0},Q=w({__name:"splash",setup(x){const S=s=>new Promise(t=>setTimeout(t,s)),d=M(),e=U({completedModules:[],currentTaskText:"",defaultStoreOptions:{isPersist:!0},stores:{user:f(),languages:_(),settings:y()},logoLoaded:!1}),a={all:!0},L=[["User Roles",r.USERS_ROLES,"userRoles",{...e.defaultStoreOptions,key:"userRoles",storeState:f().userRoles},{...a,whereNotIn:{key:"id",value:[1,2]}}],["Languages",r.LANGUAGES,"languages",{...e.defaultStoreOptions,key:"languages",storeState:_().languages},a],["Language Words",r.LANGUAGE_WORDS,"languageWords",{...e.defaultStoreOptions,key:"words",storeState:_().words},a],["Statuses",r.SETTINGS_STATUSES,"statuses",{...e.defaultStoreOptions,key:"statuses",storeState:y().statuses},a],["People Groups",r.PEOPLE_GROUPS,"peopleGroups",{...e.defaultStoreOptions,key:"peopleGroups",storeState:E().peopleGroups},a],["Communication Platforms",r.COMMUNICATION_PLATFORMS,"communicationPlatforms",{...e.defaultStoreOptions,key:"communicationPlatforms",storeState:G().communicationPlatforms},a],["Community Checklists",r.COMMUNITY_CHECKLISTS,"communityChecklists",{...e.defaultStoreOptions,key:"communityChecklists",storeState:A().communityChecklists},a]],O=async()=>{for(const[s,t,n,u,m]of L)e.currentTaskText=`Fetching ${s}...`,await v(s,t,m,{...e.defaultStoreOptions,key:n,store:u}),await S(500),e.logoLoaded||(e.logoLoaded=!0);T()},T=()=>{const s=R().authUser.user_role_id;let t="/dashboard";s===4&&(t="/prayers"),d.push(t)},v=async(s,t,n,u)=>{await N(t).browse(n,u),e.completedModules.push(s),s==="Community Checklists"&&(e.currentTaskText="Redirecting . . . ")};return O(),(s,t)=>{const n=P,u=q,m=D;return i(),c(k,null,[o("div",$,[o("div",H,[o("div",{class:I(`brand-logo ${l(e).logoLoaded?"loaded":""}`)}," VENTURE TOOLS ",2),t[0]||(t[0]=o("div",{class:"loading-text"},"L O A D I N G",-1)),p(n,{size:"small"})])]),o("div",J,[l(e).completedModules.length>0?(i(),c("div",K,[(i(!0),c(k,null,b(l(e).completedModules,g=>(i(),c("div",{key:g},[p(m,null,{default:C(()=>[p(u,{type:"success"},{default:C(()=>[p(l(W))]),_:1})]),_:1}),V(" "+h(g),1)]))),128))])):B("",!0),o("div",null,h(l(e).currentTaskText),1),t[1]||(t[1]=o("div",{style:{clear:"both"}},null,-1))])],64)}}}),ue=z(Q,[["__scopeId","data-v-89cd3061"]]);export{ue as default};
