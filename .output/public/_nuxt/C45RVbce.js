const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DjNMJfJu.js","./BxpEjOof.js","./entry.DdNnWKwf.css","./Cm9BH2tJ.js"])))=>i.map(i=>d[i]);
import{D as oe,$ as O,cv as Se,an as N,cw as we,cx as Ae,m as Ce,cy as Be,q as $,u as J,ax as Te,cz as Oe,aK as Ne,cA as Me,cB as $e,cC as Pe,V as ie,b1 as Re,r as A,bA as Le,cD as ke}from"./BxpEjOof.js";import{ad as He,_ as xe,a7 as je,a as Fe,d as Ue,N as Ve}from"./Cm9BH2tJ.js";function Mn(t,e){return oe(()=>{for(const n of e)if(t[n]!==void 0)return t[n];return t[e[e.length-1]]})}const ze=/^(\d|\.)+$/,Y=/(\d|\.)+/;function $n(t,{c:e=1,offset:n=0,attachPx:a=!0}={}){if(typeof t=="number"){const r=(t+n)*e;return r===0?"0":`${r}px`}else if(typeof t=="string")if(ze.test(t)){const r=(Number(t)+n)*e;return a?r===0?"0":`${r}px`:`${r}`}else{const r=Y.exec(t);return r?t.replace(Y,String((Number(r[0])+n)*e)):t}return t}function We(){const t=O(Se,null);return t===null&&N("use-dialog","No outer <n-dialog-provider /> founded."),t}function Ge(){const t=O(we,null);return t===null&&N("use-loading-bar","No outer <n-loading-bar-provider /> founded."),t}function Ke(){const t=O(Ae,null);return t===null&&N("use-message","No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A."),t}function Je(){const t=O(He,null);return t===null&&N("use-notification","No outer `n-notification-provider` found."),t}const Ye=Ce({name:"InjectionExtractor",props:{onSetup:Function},setup(t,{slots:e}){var n;return(n=t.onSetup)===null||n===void 0||n.call(t),()=>{var a;return(a=e.default)===null||a===void 0?void 0:a.call(e)}}}),qe={message:Ke,notification:Je,loadingBar:Ge,dialog:We,modal:Oe};function Xe({providersAndProps:t,configProviderProps:e}){let n=Be(r);const a={app:n};function r(){return $(xe,J(e),{default:()=>t.map(({type:i,Provider:c,props:l})=>$(c,J(l),{default:()=>$(Ye,{onSetup:()=>a[i]=qe[i]()})}))})}let s;return Te&&(s=document.createElement("div"),document.body.appendChild(s),n.mount(s)),Object.assign({unmount:()=>{var i;if(n===null||s===null){Ne("discrete","unmount call no need because discrete app has been unmounted");return}n.unmount(),(i=s.parentNode)===null||i===void 0||i.removeChild(s),s=null,n=null}},a)}function Qe(t,{configProviderProps:e,messageProviderProps:n,dialogProviderProps:a,notificationProviderProps:r,loadingBarProviderProps:s,modalProviderProps:o}={}){const i=[];return t.forEach(l=>{switch(l){case"message":i.push({type:l,Provider:Pe,props:n});break;case"notification":i.push({type:l,Provider:Fe,props:r});break;case"dialog":i.push({type:l,Provider:je,props:a});break;case"loadingBar":i.push({type:l,Provider:$e,props:s});break;case"modal":i.push({type:l,Provider:Me,props:o})}}),Xe({providersAndProps:i,configProviderProps:e})}const Ze=()=>{};var q={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce=function(t){const e=[];let n=0;for(let a=0;a<t.length;a++){let r=t.charCodeAt(a);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&a+1<t.length&&(t.charCodeAt(a+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++a)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},et=function(t){const e=[];let n=0,a=0;for(;n<t.length;){const r=t[n++];if(r<128)e[a++]=String.fromCharCode(r);else if(r>191&&r<224){const s=t[n++];e[a++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){const s=t[n++],o=t[n++],i=t[n++],c=((r&7)<<18|(s&63)<<12|(o&63)<<6|i&63)-65536;e[a++]=String.fromCharCode(55296+(c>>10)),e[a++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],o=t[n++];e[a++]=String.fromCharCode((r&15)<<12|(s&63)<<6|o&63)}}return e.join("")},le={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,a=[];for(let r=0;r<t.length;r+=3){const s=t[r],o=r+1<t.length,i=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,D=s>>2,f=(s&3)<<4|i>>4;let h=(i&15)<<2|l>>6,u=l&63;c||(u=64,o||(h=64)),a.push(n[D],n[f],n[h],n[u])}return a.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ce(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):et(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,a=[];for(let r=0;r<t.length;){const s=n[t.charAt(r++)],i=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const f=r<t.length?n[t.charAt(r)]:64;if(++r,s==null||i==null||l==null||f==null)throw new tt;const h=s<<2|i>>4;if(a.push(h),l!==64){const u=i<<4&240|l>>2;if(a.push(u),f!==64){const g=l<<6&192|f;a.push(g)}}}return a},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class tt extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const nt=function(t){const e=ce(t);return le.encodeByteArray(e,!0)},de=function(t){return nt(t).replace(/\./g,"")},rt=function(t){try{return le.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st=()=>at().__FIREBASE_DEFAULTS__,ot=()=>{if(typeof process>"u"||typeof q>"u")return;const t=q.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},it=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&rt(t[1]);return e&&JSON.parse(e)},ct=()=>{try{return Ze()||st()||ot()||it()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},ue=()=>{var t;return(t=ct())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,a)=>{n?this.reject(n):this.resolve(a),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,a))}}}function dt(){try{return typeof indexedDB=="object"}catch{return!1}}function ut(){return new Promise((t,e)=>{try{let n=!0;const a="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(a);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(a),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var s;e(((s=r.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}function Pn(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht="FirebaseError";class I extends Error{constructor(e,n,a){super(n),this.code=e,this.customData=a,this.name=ht,Object.setPrototypeOf(this,I.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,he.prototype.create)}}class he{constructor(e,n,a){this.service=e,this.serviceName=n,this.errors=a}create(e,...n){const a=n[0]||{},r=`${this.service}/${e}`,s=this.errors[e],o=s?ft(s,a):"Error",i=`${this.serviceName}: ${o} (${r}).`;return new I(r,i,a)}}function ft(t,e){return t.replace(pt,(n,a)=>{const r=e[a];return r!=null?String(r):`<${a}?>`})}const pt=/\{\$([^}]+)}/g;function x(t,e){if(t===e)return!0;const n=Object.keys(t),a=Object.keys(e);for(const r of n){if(!a.includes(r))return!1;const s=t[r],o=e[r];if(X(s)&&X(o)){if(!x(s,o))return!1}else if(s!==o)return!1}for(const r of a)if(!n.includes(r))return!1;return!0}function X(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(t){return t&&t._delegate?t._delegate:t}class B{constructor(e,n,a){this.name=e,this.instanceFactory=n,this.type=a,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const a=new lt;if(this.instancesDeferred.set(n,a),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&a.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const a=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(a)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:a})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bt(e))try{this.getOrInitializeService({instanceIdentifier:v})}catch{}for(const[n,a]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:r});a.resolve(s)}catch{}}}}clearInstance(e=v){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=v){return this.instances.has(e)}getOptions(e=v){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,a=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(a))throw Error(`${this.name}(${a}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:a,options:n});for(const[s,o]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(s);a===i&&o.resolve(r)}return r}onInit(e,n){var a;const r=this.normalizeInstanceIdentifier(n),s=(a=this.onInitCallbacks.get(r))!==null&&a!==void 0?a:new Set;s.add(e),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&e(o,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const a=this.onInitCallbacks.get(n);if(a)for(const r of a)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let a=this.instances.get(e);if(!a&&this.component&&(a=this.component.instanceFactory(this.container,{instanceIdentifier:gt(e),options:n}),this.instances.set(e,a),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(a,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,a)}catch{}return a||null}normalizeInstanceIdentifier(e=v){return this.component?this.component.multipleInstances?e:v:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function gt(t){return t===v?void 0:t}function bt(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new mt(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var d;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(d||(d={}));const vt={debug:d.DEBUG,verbose:d.VERBOSE,info:d.INFO,warn:d.WARN,error:d.ERROR,silent:d.SILENT},Et=d.INFO,yt={[d.DEBUG]:"log",[d.VERBOSE]:"log",[d.INFO]:"info",[d.WARN]:"warn",[d.ERROR]:"error"},It=(t,e,...n)=>{if(e<t.logLevel)return;const a=new Date().toISOString(),r=yt[e];if(r)console[r](`[${a}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Dt{constructor(e){this.name=e,this._logLevel=Et,this._logHandler=It,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in d))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,d.DEBUG,...e),this._logHandler(this,d.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,d.VERBOSE,...e),this._logHandler(this,d.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,d.INFO,...e),this._logHandler(this,d.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,d.WARN,...e),this._logHandler(this,d.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,d.ERROR,...e),this._logHandler(this,d.ERROR,...e)}}const St=(t,e)=>e.some(n=>t instanceof n);let Q,Z;function wt(){return Q||(Q=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function At(){return Z||(Z=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const fe=new WeakMap,j=new WeakMap,pe=new WeakMap,P=new WeakMap,G=new WeakMap;function Ct(t){const e=new Promise((n,a)=>{const r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(p(t.result)),r()},o=()=>{a(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&fe.set(n,t)}).catch(()=>{}),G.set(e,t),e}function Bt(t){if(j.has(t))return;const e=new Promise((n,a)=>{const r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),r()},o=()=>{a(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});j.set(t,e)}let F={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return j.get(t);if(e==="objectStoreNames")return t.objectStoreNames||pe.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return p(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Tt(t){F=t(F)}function Ot(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const a=t.call(R(this),e,...n);return pe.set(a,e.sort?e.sort():[e]),p(a)}:At().includes(t)?function(...e){return t.apply(R(this),e),p(fe.get(this))}:function(...e){return p(t.apply(R(this),e))}}function Nt(t){return typeof t=="function"?Ot(t):(t instanceof IDBTransaction&&Bt(t),St(t,wt())?new Proxy(t,F):t)}function p(t){if(t instanceof IDBRequest)return Ct(t);if(P.has(t))return P.get(t);const e=Nt(t);return e!==t&&(P.set(t,e),G.set(e,t)),e}const R=t=>G.get(t);function Mt(t,e,{blocked:n,upgrade:a,blocking:r,terminated:s}={}){const o=indexedDB.open(t,e),i=p(o);return a&&o.addEventListener("upgradeneeded",c=>{a(p(o.result),c.oldVersion,c.newVersion,p(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),i.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),i}function Ln(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",a=>e(a.oldVersion,a)),p(n).then(()=>{})}const $t=["get","getKey","getAll","getAllKeys","count"],Pt=["put","add","delete","clear"],L=new Map;function ee(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(L.get(e))return L.get(e);const n=e.replace(/FromIndex$/,""),a=e!==n,r=Pt.includes(n);if(!(n in(a?IDBIndex:IDBObjectStore).prototype)||!(r||$t.includes(n)))return;const s=async function(o,...i){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return a&&(l=l.index(i.shift())),(await Promise.all([l[n](...i),r&&c.done]))[0]};return L.set(e,s),s}Tt(t=>({...t,get:(e,n,a)=>ee(e,n)||t.get(e,n,a),has:(e,n)=>!!ee(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Lt(n)){const a=n.getImmediate();return`${a.library}/${a.version}`}else return null}).filter(n=>n).join(" ")}}function Lt(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const U="@firebase/app",te="0.12.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m=new Dt("@firebase/app"),kt="@firebase/app-compat",Ht="@firebase/analytics-compat",xt="@firebase/analytics",jt="@firebase/app-check-compat",Ft="@firebase/app-check",Ut="@firebase/auth",Vt="@firebase/auth-compat",zt="@firebase/database",Wt="@firebase/data-connect",Gt="@firebase/database-compat",Kt="@firebase/functions",Jt="@firebase/functions-compat",Yt="@firebase/installations",qt="@firebase/installations-compat",Xt="@firebase/messaging",Qt="@firebase/messaging-compat",Zt="@firebase/performance",en="@firebase/performance-compat",tn="@firebase/remote-config",nn="@firebase/remote-config-compat",rn="@firebase/storage",an="@firebase/storage-compat",sn="@firebase/firestore",on="@firebase/vertexai",cn="@firebase/firestore-compat",ln="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V="[DEFAULT]",dn={[U]:"fire-core",[kt]:"fire-core-compat",[xt]:"fire-analytics",[Ht]:"fire-analytics-compat",[Ft]:"fire-app-check",[jt]:"fire-app-check-compat",[Ut]:"fire-auth",[Vt]:"fire-auth-compat",[zt]:"fire-rtdb",[Wt]:"fire-data-connect",[Gt]:"fire-rtdb-compat",[Kt]:"fire-fn",[Jt]:"fire-fn-compat",[Yt]:"fire-iid",[qt]:"fire-iid-compat",[Xt]:"fire-fcm",[Qt]:"fire-fcm-compat",[Zt]:"fire-perf",[en]:"fire-perf-compat",[tn]:"fire-rc",[nn]:"fire-rc-compat",[rn]:"fire-gcs",[an]:"fire-gcs-compat",[sn]:"fire-fst",[cn]:"fire-fst-compat",[on]:"fire-vertex","fire-js":"fire-js",[ln]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T=new Map,un=new Map,z=new Map;function ne(t,e){try{t.container.addComponent(e)}catch(n){m.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function W(t){const e=t.name;if(z.has(e))return m.debug(`There were multiple attempts to register component ${e}.`),!1;z.set(e,t);for(const n of T.values())ne(n,t);for(const n of un.values())ne(n,t);return!0}function kn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},b=new he("app","Firebase",hn);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e,n,a){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=a,this.container.addComponent(new B("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw b.create("app-deleted",{appName:this._name})}}function me(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const a=Object.assign({name:V,automaticDataCollectionEnabled:!1},e),r=a.name;if(typeof r!="string"||!r)throw b.create("bad-app-name",{appName:String(r)});if(n||(n=ue()),!n)throw b.create("no-options");const s=T.get(r);if(s){if(x(n,s.options)&&x(a,s.config))return s;throw b.create("duplicate-app",{appName:r})}const o=new _t(r);for(const c of z.values())o.addComponent(c);const i=new fn(n,a,o);return T.set(r,i),i}function Hn(t=V){const e=T.get(t);if(!e&&t===V&&ue())return me();if(!e)throw b.create("no-app",{appName:t});return e}function C(t,e,n){var a;let r=(a=dn[t])!==null&&a!==void 0?a:t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const i=[`Unable to register library "${r}" with version "${e}":`];s&&i.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&i.push("and"),o&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),m.warn(i.join(" "));return}W(new B(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn="firebase-heartbeat-database",mn=1,y="firebase-heartbeat-store";let k=null;function ge(){return k||(k=Mt(pn,mn,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(y)}catch(n){console.warn(n)}}}}).catch(t=>{throw b.create("idb-open",{originalErrorMessage:t.message})})),k}async function gn(t){try{const n=(await ge()).transaction(y),a=await n.objectStore(y).get(be(t));return await n.done,a}catch(e){if(e instanceof I)m.warn(e.message);else{const n=b.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});m.warn(n.message)}}}async function re(t,e){try{const a=(await ge()).transaction(y,"readwrite");await a.objectStore(y).put(e,be(t)),await a.done}catch(n){if(n instanceof I)m.warn(n.message);else{const a=b.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});m.warn(a.message)}}}function be(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn=1024,_n=30;class vn{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new yn(n),this._heartbeatsCachePromise=this._storage.read().then(a=>(this._heartbeatsCache=a,a))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ae();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:r}),this._heartbeatsCache.heartbeats.length>_n){const o=In(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(a){m.warn(a)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ae(),{heartbeatsToSend:a,unsentEntries:r}=En(this._heartbeatsCache.heartbeats),s=de(JSON.stringify({version:2,heartbeats:a}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return m.warn(n),""}}}function ae(){return new Date().toISOString().substring(0,10)}function En(t,e=bn){const n=[];let a=t.slice();for(const r of t){const s=n.find(o=>o.agent===r.agent);if(s){if(s.dates.push(r.date),se(n)>e){s.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),se(n)>e){n.pop();break}a=a.slice(1)}return{heartbeatsToSend:n,unsentEntries:a}}class yn{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return dt()?ut().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await gn(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return re(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return re(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function se(t){return de(JSON.stringify({version:2,heartbeats:t})).length}function In(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let a=1;a<t.length;a++)t[a].date<n&&(n=t[a].date,e=a);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dn(t){W(new B("platform-logger",e=>new Rt(e),"PRIVATE")),W(new B("heartbeat",e=>new vn(e),"PRIVATE")),C(U,te,t),C(U,te,"esm2017"),C("fire-js","")}Dn("");var Sn="firebase",wn="11.7.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */C(Sn,wn,"app");const _=ie(),An={apiKey:_.public.firebase.apiKey,authDomain:_.public.firebase.authDomain,projectId:_.public.firebase.projectId,storageBucket:_.public.firebase.storageBucket,messagingSenderId:_.public.firebase.messagingSenderId,appId:_.public.firebase.appId,measurementId:_.public.firebase.measurementId},Cn=me(An),Bn=oe(()=>({theme:Ue,themeOverrides:{...Ve.darkTheme}})),H=Qe(["notification"],{configProviderProps:Bn}),xn=Re("auth",()=>{const t=ie(),e=A(null);let n=A(JSON.parse(localStorage.getItem("authUser")||"{}"));const a=A(localStorage.getItem("Bearer")||""),r=A(JSON.parse(localStorage.getItem("loginTime")||"0"));async function s(){const f=localStorage.getItem("Bearer")||"";let h={Accept:"application/json","Content-Type":"application/json"};f&&(h.Authorization=f);const u=await $fetch(t.public.apiURL+"auth/user",{method:"GET",credentials:"include",headers:h}).catch(g=>{H.notification.error({title:"Cannot login.",description:g.response.status+" "+g.response._data.message,duration:3e3,keepAliveOnHover:!0})});u&&(e.value=u,n.value=u,localStorage.setItem("authUser",JSON.stringify(u)))}async function o(f){try{const h=i();let u=null;try{const M=t.public.firebase.vapidKey,{getMessaging:ve,getToken:Ee,onMessage:ye}=await ke(async()=>{const{getMessaging:E,getToken:S,onMessage:w}=await import("./DjNMJfJu.js");return{getMessaging:E,getToken:S,onMessage:w}},__vite__mapDeps([0,1,2,3]),import.meta.url),K=ve(Cn);await Notification.requestPermission()==="granted"&&(u=await Ee(K,{vapidKey:M}),u&&localStorage.setItem("notificationToken",u)),ye(K,E=>{var S,w;if(console.log("Message received in foreground:",E),(S=E.notification)!=null&&S.title&&((w=E.notification)!=null&&w.body)){const{title:Ie,body:De}=E.notification;new Notification(Ie,{body:De,icon:"/logo-vertical.png"})}})}catch(M){console.error("FCM error:",M)}localStorage.setItem("deviceId",h);const _e={Accept:"application/json","Content-Type":"application/json",Authorization:localStorage.getItem("Bearer")||""};await $fetch(`${t.public.apiURL}users/id/${f}/devices`,{method:"POST",body:{device_id:h,device_type:"web",device_name:navigator.userAgent,notification_token:u},headers:_e})}catch(h){console.error("Error registering device:",h)}}function i(){return"web_"+crypto.randomUUID()}async function c(f){await $fetch(t.public.rootURL+"sanctum/csrf-cookie",{method:"GET",credentials:"include"});const h=await $fetch(t.public.apiURL+"login",{method:"POST",body:f,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"}}).catch(u=>{H.notification.error({title:"Cannot login.",description:u.response.status+" "+u.response._data.message,duration:3e3,keepAliveOnHover:!0})});if(h){a.value="Bearer "+h.token,localStorage.setItem("Bearer",a.value);const u=Date.now();r.value=u,localStorage.setItem("loginTime",String(u)),await o(h.user.id),await s()}return h}async function l(){const f=localStorage.getItem("Bearer")||"",h=localStorage.getItem("deviceId")||"";let u={Accept:"application/json","Content-Type":"application/json"};f&&(u.Authorization=f),await $fetch(t.public.apiURL+"auth/logout",{method:"POST",credentials:"include",body:{device_id:h},headers:u}).catch(g=>{H.notification.error({title:"Cannot login.",description:g.response.status+" "+g.response._data.message,duration:3e3,keepAliveOnHover:!0})}),e.value=null,localStorage.removeItem("Bearer"),localStorage.removeItem("loginTime"),Le("/")}function D(){return r.value?(Date.now()-r.value)/(1e3*60*60)>=24:!0}return{user:e,login:c,fetchUser:s,logout:l,authUser:n,loginTime:r,isLoginExpired:D}});export{B as C,he as E,I as F,W as _,Ge as a,xn as b,Je as c,We as d,Mn as e,$n as f,Qe as g,kn as h,Rn as i,Hn as j,dt as k,Pn as l,Ln as m,Mt as o,C as r,Ke as u,ut as v};
