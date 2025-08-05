const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./BaQOeWJ9.js","./C8B0pVqp.js","./entry.DdNnWKwf.css","./DT4rYR05.js","./D9PDig5o.js"])))=>i.map(i=>d[i]);
import{s as ee,j as me,a$ as be,r as T,q as _e,cq as ye}from"./C8B0pVqp.js";import{d as Ee,N as ve}from"./DT4rYR05.js";import{e as Ie}from"./D9PDig5o.js";const De=()=>{};var z={};/**
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
 */const te=function(t){const e=[];let n=0;for(let a=0;a<t.length;a++){let r=t.charCodeAt(a);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&a+1<t.length&&(t.charCodeAt(a+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++a)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Se=function(t){const e=[];let n=0,a=0;for(;n<t.length;){const r=t[n++];if(r<128)e[a++]=String.fromCharCode(r);else if(r>191&&r<224){const s=t[n++];e[a++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){const s=t[n++],i=t[n++],o=t[n++],c=((r&7)<<18|(s&63)<<12|(i&63)<<6|o&63)-65536;e[a++]=String.fromCharCode(55296+(c>>10)),e[a++]=String.fromCharCode(56320+(c&1023))}else{const s=t[n++],i=t[n++];e[a++]=String.fromCharCode((r&15)<<12|(s&63)<<6|i&63)}}return e.join("")},ne={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,a=[];for(let r=0;r<t.length;r+=3){const s=t[r],i=r+1<t.length,o=i?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,u=s>>2,h=(s&3)<<4|o>>4;let f=(o&15)<<2|l>>6,y=l&63;c||(y=64,i||(f=64)),a.push(n[u],n[h],n[f],n[y])}return a.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(te(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Se(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,a=[];for(let r=0;r<t.length;){const s=n[t.charAt(r++)],o=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const h=r<t.length?n[t.charAt(r)]:64;if(++r,s==null||o==null||l==null||h==null)throw new we;const f=s<<2|o>>4;if(a.push(f),l!==64){const y=o<<4&240|l>>2;if(a.push(y),h!==64){const v=l<<6&192|h;a.push(v)}}}return a},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class we extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ce=function(t){const e=te(t);return ne.encodeByteArray(e,!0)},re=function(t){return Ce(t).replace(/\./g,"")},Ae=function(t){try{return ne.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Be(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Te=()=>Be().__FIREBASE_DEFAULTS__,Oe=()=>{if(typeof process>"u"||typeof z>"u")return;const t=z.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Me=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ae(t[1]);return e&&JSON.parse(e)},$e=()=>{try{return De()||Te()||Oe()||Me()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},ae=()=>{var t;return(t=$e())===null||t===void 0?void 0:t.config};/**
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
 */class Ne{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,a)=>{n?this.reject(n):this.resolve(a),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,a))}}}function Re(){try{return typeof indexedDB=="object"}catch{return!1}}function Pe(){return new Promise((t,e)=>{try{let n=!0;const a="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(a);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(a),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var s;e(((s=r.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}function nn(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Le="FirebaseError";class D extends Error{constructor(e,n,a){super(n),this.code=e,this.customData=a,this.name=Le,Object.setPrototypeOf(this,D.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,se.prototype.create)}}class se{constructor(e,n,a){this.service=e,this.serviceName=n,this.errors=a}create(e,...n){const a=n[0]||{},r=`${this.service}/${e}`,s=this.errors[e],i=s?He(s,a):"Error",o=`${this.serviceName}: ${i} (${r}).`;return new D(r,o,a)}}function He(t,e){return t.replace(ke,(n,a)=>{const r=e[a];return r!=null?String(r):`<${a}?>`})}const ke=/\{\$([^}]+)}/g;function P(t,e){if(t===e)return!0;const n=Object.keys(t),a=Object.keys(e);for(const r of n){if(!a.includes(r))return!1;const s=t[r],i=e[r];if(W(s)&&W(i)){if(!P(s,i))return!1}else if(s!==i)return!1}for(const r of a)if(!n.includes(r))return!1;return!0}function W(t){return t!==null&&typeof t=="object"}/**
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
 */function rn(t){return t&&t._delegate?t._delegate:t}class A{constructor(e,n,a){this.name=e,this.instanceFactory=n,this.type=a,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const _="[DEFAULT]";/**
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
 */class Fe{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const a=new Ne;if(this.instancesDeferred.set(n,a),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&a.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const a=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(a)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:a})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(je(e))try{this.getOrInitializeService({instanceIdentifier:_})}catch{}for(const[n,a]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:r});a.resolve(s)}catch{}}}}clearInstance(e=_){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=_){return this.instances.has(e)}getOptions(e=_){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,a=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(a))throw Error(`${this.name}(${a}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:a,options:n});for(const[s,i]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(s);a===o&&i.resolve(r)}return r}onInit(e,n){var a;const r=this.normalizeInstanceIdentifier(n),s=(a=this.onInitCallbacks.get(r))!==null&&a!==void 0?a:new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const a=this.onInitCallbacks.get(n);if(a)for(const r of a)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let a=this.instances.get(e);if(!a&&this.component&&(a=this.component.instanceFactory(this.container,{instanceIdentifier:xe(e),options:n}),this.instances.set(e,a),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(a,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,a)}catch{}return a||null}normalizeInstanceIdentifier(e=_){return this.component?this.component.multipleInstances?e:_:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function xe(t){return t===_?void 0:t}function je(t){return t.instantiationMode==="EAGER"}/**
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
 */class Ue{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Fe(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var d;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(d||(d={}));const Ve={debug:d.DEBUG,verbose:d.VERBOSE,info:d.INFO,warn:d.WARN,error:d.ERROR,silent:d.SILENT},ze=d.INFO,We={[d.DEBUG]:"log",[d.VERBOSE]:"log",[d.INFO]:"info",[d.WARN]:"warn",[d.ERROR]:"error"},Ge=(t,e,...n)=>{if(e<t.logLevel)return;const a=new Date().toISOString(),r=We[e];if(r)console[r](`[${a}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ke{constructor(e){this.name=e,this._logLevel=ze,this._logHandler=Ge,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in d))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ve[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,d.DEBUG,...e),this._logHandler(this,d.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,d.VERBOSE,...e),this._logHandler(this,d.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,d.INFO,...e),this._logHandler(this,d.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,d.WARN,...e),this._logHandler(this,d.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,d.ERROR,...e),this._logHandler(this,d.ERROR,...e)}}const Je=(t,e)=>e.some(n=>t instanceof n);let G,K;function Ye(){return G||(G=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function qe(){return K||(K=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ie=new WeakMap,L=new WeakMap,oe=new WeakMap,O=new WeakMap,U=new WeakMap;function Xe(t){const e=new Promise((n,a)=>{const r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",i)},s=()=>{n(p(t.result)),r()},i=()=>{a(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",i)});return e.then(n=>{n instanceof IDBCursor&&ie.set(n,t)}).catch(()=>{}),U.set(e,t),e}function Ze(t){if(L.has(t))return;const e=new Promise((n,a)=>{const r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",i),t.removeEventListener("abort",i)},s=()=>{n(),r()},i=()=>{a(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",i),t.addEventListener("abort",i)});L.set(t,e)}let H={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return L.get(t);if(e==="objectStoreNames")return t.objectStoreNames||oe.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return p(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Qe(t){H=t(H)}function et(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const a=t.call(M(this),e,...n);return oe.set(a,e.sort?e.sort():[e]),p(a)}:qe().includes(t)?function(...e){return t.apply(M(this),e),p(ie.get(this))}:function(...e){return p(t.apply(M(this),e))}}function tt(t){return typeof t=="function"?et(t):(t instanceof IDBTransaction&&Ze(t),Je(t,Ye())?new Proxy(t,H):t)}function p(t){if(t instanceof IDBRequest)return Xe(t);if(O.has(t))return O.get(t);const e=tt(t);return e!==t&&(O.set(t,e),U.set(e,t)),e}const M=t=>U.get(t);function nt(t,e,{blocked:n,upgrade:a,blocking:r,terminated:s}={}){const i=indexedDB.open(t,e),o=p(i);return a&&i.addEventListener("upgradeneeded",c=>{a(p(i.result),c.oldVersion,c.newVersion,p(i.transaction),c)}),n&&i.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),o.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),o}function an(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",a=>e(a.oldVersion,a)),p(n).then(()=>{})}const rt=["get","getKey","getAll","getAllKeys","count"],at=["put","add","delete","clear"],$=new Map;function J(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if($.get(e))return $.get(e);const n=e.replace(/FromIndex$/,""),a=e!==n,r=at.includes(n);if(!(n in(a?IDBIndex:IDBObjectStore).prototype)||!(r||rt.includes(n)))return;const s=async function(i,...o){const c=this.transaction(i,r?"readwrite":"readonly");let l=c.store;return a&&(l=l.index(o.shift())),(await Promise.all([l[n](...o),r&&c.done]))[0]};return $.set(e,s),s}Qe(t=>({...t,get:(e,n,a)=>J(e,n)||t.get(e,n,a),has:(e,n)=>!!J(e,n)||t.has(e,n)}));/**
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
 */class st{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(it(n)){const a=n.getImmediate();return`${a.library}/${a.version}`}else return null}).filter(n=>n).join(" ")}}function it(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const k="@firebase/app",Y="0.12.1";/**
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
 */const g=new Ke("@firebase/app"),ot="@firebase/app-compat",ct="@firebase/analytics-compat",lt="@firebase/analytics",dt="@firebase/app-check-compat",ht="@firebase/app-check",ut="@firebase/auth",ft="@firebase/auth-compat",pt="@firebase/database",gt="@firebase/data-connect",mt="@firebase/database-compat",bt="@firebase/functions",_t="@firebase/functions-compat",yt="@firebase/installations",Et="@firebase/installations-compat",vt="@firebase/messaging",It="@firebase/messaging-compat",Dt="@firebase/performance",St="@firebase/performance-compat",wt="@firebase/remote-config",Ct="@firebase/remote-config-compat",At="@firebase/storage",Bt="@firebase/storage-compat",Tt="@firebase/firestore",Ot="@firebase/vertexai",Mt="@firebase/firestore-compat",$t="firebase";/**
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
 */const F="[DEFAULT]",Nt={[k]:"fire-core",[ot]:"fire-core-compat",[lt]:"fire-analytics",[ct]:"fire-analytics-compat",[ht]:"fire-app-check",[dt]:"fire-app-check-compat",[ut]:"fire-auth",[ft]:"fire-auth-compat",[pt]:"fire-rtdb",[gt]:"fire-data-connect",[mt]:"fire-rtdb-compat",[bt]:"fire-fn",[_t]:"fire-fn-compat",[yt]:"fire-iid",[Et]:"fire-iid-compat",[vt]:"fire-fcm",[It]:"fire-fcm-compat",[Dt]:"fire-perf",[St]:"fire-perf-compat",[wt]:"fire-rc",[Ct]:"fire-rc-compat",[At]:"fire-gcs",[Bt]:"fire-gcs-compat",[Tt]:"fire-fst",[Mt]:"fire-fst-compat",[Ot]:"fire-vertex","fire-js":"fire-js",[$t]:"fire-js-all"};/**
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
 */const B=new Map,Rt=new Map,x=new Map;function q(t,e){try{t.container.addComponent(e)}catch(n){g.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function j(t){const e=t.name;if(x.has(e))return g.debug(`There were multiple attempts to register component ${e}.`),!1;x.set(e,t);for(const n of B.values())q(n,t);for(const n of Rt.values())q(n,t);return!0}function sn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const Pt={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},m=new se("app","Firebase",Pt);/**
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
 */class Lt{constructor(e,n,a){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=a,this.container.addComponent(new A("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw m.create("app-deleted",{appName:this._name})}}function ce(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const a=Object.assign({name:F,automaticDataCollectionEnabled:!1},e),r=a.name;if(typeof r!="string"||!r)throw m.create("bad-app-name",{appName:String(r)});if(n||(n=ae()),!n)throw m.create("no-options");const s=B.get(r);if(s){if(P(n,s.options)&&P(a,s.config))return s;throw m.create("duplicate-app",{appName:r})}const i=new Ue(r);for(const c of x.values())i.addComponent(c);const o=new Lt(n,a,i);return B.set(r,o),o}function on(t=F){const e=B.get(t);if(!e&&t===F&&ae())return ce();if(!e)throw m.create("no-app",{appName:t});return e}function C(t,e,n){var a;let r=(a=Nt[t])!==null&&a!==void 0?a:t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),g.warn(o.join(" "));return}j(new A(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Ht="firebase-heartbeat-database",kt=1,I="firebase-heartbeat-store";let N=null;function le(){return N||(N=nt(Ht,kt,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(I)}catch(n){console.warn(n)}}}}).catch(t=>{throw m.create("idb-open",{originalErrorMessage:t.message})})),N}async function Ft(t){try{const n=(await le()).transaction(I),a=await n.objectStore(I).get(de(t));return await n.done,a}catch(e){if(e instanceof D)g.warn(e.message);else{const n=m.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});g.warn(n.message)}}}async function X(t,e){try{const a=(await le()).transaction(I,"readwrite");await a.objectStore(I).put(e,de(t)),await a.done}catch(n){if(n instanceof D)g.warn(n.message);else{const a=m.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});g.warn(a.message)}}}function de(t){return`${t.name}!${t.options.appId}`}/**
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
 */const xt=1024,jt=30;class Ut{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new zt(n),this._heartbeatsCachePromise=this._storage.read().then(a=>(this._heartbeatsCache=a,a))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Z();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:r}),this._heartbeatsCache.heartbeats.length>jt){const i=Wt(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(a){g.warn(a)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Z(),{heartbeatsToSend:a,unsentEntries:r}=Vt(this._heartbeatsCache.heartbeats),s=re(JSON.stringify({version:2,heartbeats:a}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return g.warn(n),""}}}function Z(){return new Date().toISOString().substring(0,10)}function Vt(t,e=xt){const n=[];let a=t.slice();for(const r of t){const s=n.find(i=>i.agent===r.agent);if(s){if(s.dates.push(r.date),Q(n)>e){s.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Q(n)>e){n.pop();break}a=a.slice(1)}return{heartbeatsToSend:n,unsentEntries:a}}class zt{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Re()?Pe().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Ft(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return X(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return X(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Q(t){return re(JSON.stringify({version:2,heartbeats:t})).length}function Wt(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let a=1;a<t.length;a++)t[a].date<n&&(n=t[a].date,e=a);return e}/**
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
 */function Gt(t){j(new A("platform-logger",e=>new st(e),"PRIVATE")),j(new A("heartbeat",e=>new Ut(e),"PRIVATE")),C(k,Y,t),C(k,Y,"esm2017"),C("fire-js","")}Gt("");var Kt="firebase",Jt="11.7.1";/**
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
 */C(Kt,Jt,"app");const b=ee(),Yt={apiKey:b.public.firebase.apiKey,authDomain:b.public.firebase.authDomain,projectId:b.public.firebase.projectId,storageBucket:b.public.firebase.storageBucket,messagingSenderId:b.public.firebase.messagingSenderId,appId:b.public.firebase.appId,measurementId:b.public.firebase.measurementId},qt=ce(Yt),Xt=me(()=>({theme:Ee,themeOverrides:{...ve.darkTheme}})),R=Ie(["notification"],{configProviderProps:Xt}),cn=be("auth",()=>{const t=ee(),e=T(null);let n=T(JSON.parse(localStorage.getItem("authUser")||"{}"));const a=T(localStorage.getItem("Bearer")||"");async function r(){const l=localStorage.getItem("Bearer")||"";let u={Accept:"application/json","Content-Type":"application/json"};l&&(u.Authorization=l);const h=await $fetch(t.public.apiURL+"auth/user",{method:"GET",credentials:"include",headers:u}).catch(f=>{R.notification.error({title:"Cannot login.",description:f.response.status+" "+f.response._data.message,duration:3e3,keepAliveOnHover:!0})});h&&(e.value=h,n.value=h,localStorage.setItem("authUser",JSON.stringify(h)))}async function s(l){try{const u=i();let h=null;try{const v=t.public.firebase.vapidKey,{getMessaging:he,getToken:ue,onMessage:fe}=await ye(async()=>{const{getMessaging:E,getToken:S,onMessage:w}=await import("./BaQOeWJ9.js");return{getMessaging:E,getToken:S,onMessage:w}},__vite__mapDeps([0,1,2,3,4]),import.meta.url),V=he(qt);await Notification.requestPermission()==="granted"&&(h=await ue(V,{vapidKey:v}),h&&localStorage.setItem("notificationToken",h)),fe(V,E=>{var S,w;if(console.log("Message received in foreground:",E),(S=E.notification)!=null&&S.title&&((w=E.notification)!=null&&w.body)){const{title:pe,body:ge}=E.notification;new Notification(pe,{body:ge,icon:"/logo-vertical.png"})}})}catch(v){console.error("FCM error:",v)}localStorage.setItem("deviceId",u);const y={Accept:"application/json","Content-Type":"application/json",Authorization:localStorage.getItem("Bearer")||""};await $fetch(`${t.public.apiURL}users/id/${l}/devices`,{method:"POST",body:{device_id:u,device_type:"web",device_name:navigator.userAgent,notification_token:h},headers:y})}catch(u){console.error("Error registering device:",u)}}function i(){return"web_"+crypto.randomUUID()}async function o(l){await $fetch(t.public.rootURL+"sanctum/csrf-cookie",{method:"GET",credentials:"include"});const u=await $fetch(t.public.apiURL+"login",{method:"POST",body:l,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"}}).catch(h=>{R.notification.error({title:"Cannot login.",description:h.response.status+" "+h.response._data.message,duration:3e3,keepAliveOnHover:!0})});return u&&(a.value="Bearer "+u.token,localStorage.setItem("Bearer",a.value),await s(u.user.id),await r()),u}async function c(){const l=localStorage.getItem("Bearer")||"",u=localStorage.getItem("deviceId")||"";let h={Accept:"application/json","Content-Type":"application/json"};l&&(h.Authorization=l),await $fetch(t.public.apiURL+"auth/logout",{method:"POST",credentials:"include",body:{device_id:u},headers:h}).catch(f=>{R.notification.error({title:"Cannot login.",description:f.response.status+" "+f.response._data.message,duration:3e3,keepAliveOnHover:!0})}),e.value=null,localStorage.removeItem("Bearer"),_e("/")}return{user:e,login:o,fetchUser:r,logout:c,authUser:n}});export{A as C,se as E,D as F,j as _,sn as a,on as b,nn as c,an as d,rn as g,Re as i,nt as o,C as r,cn as u,Pe as v};
