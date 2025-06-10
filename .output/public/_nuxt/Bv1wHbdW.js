import{ae as f,V as c,aV as C,Y as v,Z as h,d as x,$ as R,j as m,bj as k,aj as $,a0 as w,r as g,E as O,h as a,bl as T,aF as j,be as N}from"./B7JTAmbj.js";import{B as _}from"./BIgXSGoV.js";import{b as B}from"./Df9D1ddC.js";const I=f([f("@keyframes spin-rotate",`
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
 `)])]),V={small:20,medium:18,large:16},P=Object.assign(Object.assign({},h.props),{contentClass:String,contentStyle:[Object,String],description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),U=x({name:"Spin",props:P,slots:Object,setup(e){const{mergedClsPrefixRef:i,inlineThemeDisabled:s}=R(e),t=h("Spin","-spin",I,_,e,i),d=m(()=>{const{size:n}=e,{common:{cubicBezierEaseInOut:r},self:p}=t.value,{opacitySpinning:y,color:b,textColor:S}=p,z=typeof n=="number"?k(n):p[$("size",n)];return{"--n-bezier":r,"--n-opacity-spinning":y,"--n-size":z,"--n-color":b,"--n-text-color":S}}),o=s?w("spin",m(()=>{const{size:n}=e;return typeof n=="number"?String(n):n[0]}),d,e):void 0,u=B(e,["spinning","show"]),l=g(!1);return O(n=>{let r;if(u.value){const{delay:p}=e;if(p){r=window.setTimeout(()=>{l.value=!0},p),n(()=>{clearTimeout(r)});return}}l.value=u.value}),{mergedClsPrefix:i,active:l,mergedStrokeWidth:m(()=>{const{strokeWidth:n}=e;if(n!==void 0)return n;const{size:r}=e;return V[typeof r=="number"?"medium":r]}),cssVars:s?void 0:d,themeClass:o==null?void 0:o.themeClass,onRender:o==null?void 0:o.onRender}},render(){var e,i;const{$slots:s,mergedClsPrefix:t,description:d}=this,o=s.icon&&this.rotate,u=(d||s.description)&&a("div",{class:`${t}-spin-description`},d||((e=s.description)===null||e===void 0?void 0:e.call(s))),l=s.icon?a("div",{class:[`${t}-spin-body`,this.themeClass]},a("div",{class:[`${t}-spin`,o&&`${t}-spin--rotate`],style:s.default?"":this.cssVars},s.icon()),u):a("div",{class:[`${t}-spin-body`,this.themeClass]},a(T,{clsPrefix:t,style:s.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${t}-spin`}),u);return(i=this.onRender)===null||i===void 0||i.call(this),s.default?a("div",{class:[`${t}-spin-container`,this.themeClass],style:this.cssVars},a("div",{class:[`${t}-spin-content`,this.active&&`${t}-spin-content--spinning`,this.contentClass],style:this.contentStyle},s),a(j,{name:"fade-in-transition"},{default:()=>this.active?l:null})):l}}),D=N("user",()=>{const e=JSON.parse(localStorage.getItem("users")||"{}"),i=g(JSON.parse(localStorage.getItem("userRoles")||"{}"));return{users:e,userRoles:i,setUserRoles:t=>{i.value=t,localStorage.setItem("userRoles",JSON.stringify(t))}}});export{U as _,D as u};
