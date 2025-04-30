import{a4 as f,S as c,bd as z,V as v,W as h,d as C,X as x,i as m,a_ as k,ai as R,Y as $,r as w,D as T,h as a,aR as _,aU as O,bs as N}from"./XhYJCJRV.js";import{A as B}from"./_qxj-Ane.js";import{b as I}from"./Caw8jftY.js";const V=f([f("@keyframes spin-rotate",`
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
 `,[z()])]),c("spin-body",`
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
 `)])]),W={small:20,medium:18,large:16},j=Object.assign(Object.assign({},h.props),{contentClass:String,contentStyle:[Object,String],description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),H=C({name:"Spin",props:j,slots:Object,setup(e){const{mergedClsPrefixRef:i,inlineThemeDisabled:t}=x(e),s=h("Spin","-spin",V,B,e,i),d=m(()=>{const{size:n}=e,{common:{cubicBezierEaseInOut:r},self:u}=s.value,{opacitySpinning:g,color:y,textColor:b}=u,S=typeof n=="number"?k(n):u[R("size",n)];return{"--n-bezier":r,"--n-opacity-spinning":g,"--n-size":S,"--n-color":y,"--n-text-color":b}}),o=t?$("spin",m(()=>{const{size:n}=e;return typeof n=="number"?String(n):n[0]}),d,e):void 0,p=I(e,["spinning","show"]),l=w(!1);return T(n=>{let r;if(p.value){const{delay:u}=e;if(u){r=window.setTimeout(()=>{l.value=!0},u),n(()=>{clearTimeout(r)});return}}l.value=p.value}),{mergedClsPrefix:i,active:l,mergedStrokeWidth:m(()=>{const{strokeWidth:n}=e;if(n!==void 0)return n;const{size:r}=e;return W[typeof r=="number"?"medium":r]}),cssVars:t?void 0:d,themeClass:o==null?void 0:o.themeClass,onRender:o==null?void 0:o.onRender}},render(){var e,i;const{$slots:t,mergedClsPrefix:s,description:d}=this,o=t.icon&&this.rotate,p=(d||t.description)&&a("div",{class:`${s}-spin-description`},d||((e=t.description)===null||e===void 0?void 0:e.call(t))),l=t.icon?a("div",{class:[`${s}-spin-body`,this.themeClass]},a("div",{class:[`${s}-spin`,o&&`${s}-spin--rotate`],style:t.default?"":this.cssVars},t.icon()),p):a("div",{class:[`${s}-spin-body`,this.themeClass]},a(_,{clsPrefix:s,style:t.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${s}-spin`}),p);return(i=this.onRender)===null||i===void 0||i.call(this),t.default?a("div",{class:[`${s}-spin-container`,this.themeClass],style:this.cssVars},a("div",{class:[`${s}-spin-content`,this.active&&`${s}-spin-content--spinning`,this.contentClass],style:this.contentStyle},t),a(O,{name:"fade-in-transition"},{default:()=>this.active?l:null})):l}}),J=N("user",()=>{const e=JSON.parse(localStorage.getItem("users")||"{}"),i=JSON.parse(localStorage.getItem("userRoles")||"{}");return{users:e,userRoles:i}});export{H as _,J as u};
