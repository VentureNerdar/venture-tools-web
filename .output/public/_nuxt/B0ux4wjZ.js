import{ad as f,J as c,af as C,M as v,N as h,m as x,O as R,D as m,ba as k,aD as $,P as O,r as g,e as w,q as a,b7 as N,aa as T,a$ as _}from"./YtHq8OO6.js";import{x as I}from"./CZO7QJqz.js";import{d as B}from"./DZz3KrMK.js";const P=f([f("@keyframes spin-rotate",`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),c("spin-container",`
 position: relative;
 `,[c("spin-body",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[C()])]),c("spin-body",`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),c("spin",`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[v("rotate",`
 animation: spin-rotate 2s linear infinite;
 `)]),c("spin-description",`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),c("spin-content",`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[v("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),j={small:20,medium:18,large:16},V=Object.assign(Object.assign({},h.props),{contentClass:String,contentStyle:[Object,String],description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),E=x({name:"Spin",props:V,slots:Object,setup(e){const{mergedClsPrefixRef:i,inlineThemeDisabled:s}=R(e),t=h("Spin","-spin",P,I,e,i),d=m(()=>{const{size:n}=e,{common:{cubicBezierEaseInOut:r},self:p}=t.value,{opacitySpinning:y,color:b,textColor:S}=p,z=typeof n=="number"?k(n):p[$("size",n)];return{"--n-bezier":r,"--n-opacity-spinning":y,"--n-size":z,"--n-color":b,"--n-text-color":S}}),o=s?O("spin",m(()=>{const{size:n}=e;return typeof n=="number"?String(n):n[0]}),d,e):void 0,u=B(e,["spinning","show"]),l=g(!1);return w(n=>{let r;if(u.value){const{delay:p}=e;if(p){r=window.setTimeout(()=>{l.value=!0},p),n(()=>{clearTimeout(r)});return}}l.value=u.value}),{mergedClsPrefix:i,active:l,mergedStrokeWidth:m(()=>{const{strokeWidth:n}=e;if(n!==void 0)return n;const{size:r}=e;return j[typeof r=="number"?"medium":r]}),cssVars:s?void 0:d,themeClass:o==null?void 0:o.themeClass,onRender:o==null?void 0:o.onRender}},render(){var e,i;const{$slots:s,mergedClsPrefix:t,description:d}=this,o=s.icon&&this.rotate,u=(d||s.description)&&a("div",{class:`${t}-spin-description`},d||((e=s.description)===null||e===void 0?void 0:e.call(s))),l=s.icon?a("div",{class:[`${t}-spin-body`,this.themeClass]},a("div",{class:[`${t}-spin`,o&&`${t}-spin--rotate`],style:s.default?"":this.cssVars},s.icon()),u):a("div",{class:[`${t}-spin-body`,this.themeClass]},a(N,{clsPrefix:t,style:s.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${t}-spin`}),u);return(i=this.onRender)===null||i===void 0||i.call(this),s.default?a("div",{class:[`${t}-spin-container`,this.themeClass],style:this.cssVars},a("div",{class:[`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass],style:this.contentStyle},s),a(T,{name:"fade-in-transition"},{default:()=>this.active?l:null})):l}}),U=_("user",()=>{const e=JSON.parse(localStorage.getItem("users")||"{}"),i=g(JSON.parse(localStorage.getItem("userRoles")||"{}"));return{users:e,userRoles:i,setUserRoles:t=>{i.value=t,localStorage.setItem("userRoles",JSON.stringify(t))}}});export{E as _,U as u};
