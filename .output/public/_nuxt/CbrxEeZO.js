import{a3 as f,R as c,bc as C,U as g,V as h,d as x,W as k,i as m,aZ as w,ah as R,X as O,r as T,D as $,h as a,aQ as N,aT as I,br as v}from"./DjT8zhlV.js";import{E as _}from"./IoIuy_vt.js";import{b as B}from"./jGolgmb8.js";const V=f([f("@keyframes spin-rotate",`
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
 `,[g("rotate",`
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
 `,[g("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),W={small:20,medium:18,large:16},j=Object.assign(Object.assign({},h.props),{contentClass:String,contentStyle:[Object,String],description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),D=x({name:"Spin",props:j,slots:Object,setup(e){const{mergedClsPrefixRef:i,inlineThemeDisabled:t}=k(e),s=h("Spin","-spin",V,_,e,i),d=m(()=>{const{size:n}=e,{common:{cubicBezierEaseInOut:r},self:p}=s.value,{opacitySpinning:y,color:b,textColor:S}=p,z=typeof n=="number"?w(n):p[R("size",n)];return{"--n-bezier":r,"--n-opacity-spinning":y,"--n-size":z,"--n-color":b,"--n-text-color":S}}),o=t?O("spin",m(()=>{const{size:n}=e;return typeof n=="number"?String(n):n[0]}),d,e):void 0,u=B(e,["spinning","show"]),l=T(!1);return $(n=>{let r;if(u.value){const{delay:p}=e;if(p){r=window.setTimeout(()=>{l.value=!0},p),n(()=>{clearTimeout(r)});return}}l.value=u.value}),{mergedClsPrefix:i,active:l,mergedStrokeWidth:m(()=>{const{strokeWidth:n}=e;if(n!==void 0)return n;const{size:r}=e;return W[typeof r=="number"?"medium":r]}),cssVars:t?void 0:d,themeClass:o==null?void 0:o.themeClass,onRender:o==null?void 0:o.onRender}},render(){var e,i;const{$slots:t,mergedClsPrefix:s,description:d}=this,o=t.icon&&this.rotate,u=(d||t.description)&&a("div",{class:`${s}-spin-description`},d||((e=t.description)===null||e===void 0?void 0:e.call(t))),l=t.icon?a("div",{class:[`${s}-spin-body`,this.themeClass]},a("div",{class:[`${s}-spin`,o&&`${s}-spin--rotate`],style:t.default?"":this.cssVars},t.icon()),u):a("div",{class:[`${s}-spin-body`,this.themeClass]},a(N,{clsPrefix:s,style:t.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${s}-spin`}),u);return(i=this.onRender)===null||i===void 0||i.call(this),t.default?a("div",{class:[`${s}-spin-container`,this.themeClass],style:this.cssVars},a("div",{class:[`${s}-spin-content`,this.active&&`${s}-spin-content--spinning`,this.contentClass],style:this.contentStyle},t),a(I,{name:"fade-in-transition"},{default:()=>this.active?l:null})):l}}),L=v("user",()=>{const e=JSON.parse(localStorage.getItem("users")||"{}"),i=JSON.parse(localStorage.getItem("userRoles")||"{}");return{users:e,userRoles:i}}),H=v("languages",()=>{const e=JSON.parse(localStorage.getItem("languages")||"[]"),i=JSON.parse(localStorage.getItem("words")||"[]");return{languages:e,words:i}});export{D as _,H as a,L as u};
