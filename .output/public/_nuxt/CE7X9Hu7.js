import{m as c,q as i,ad as a,J as l,M as d,L as s,az as j,aA as D,N as b,O as M,a1 as B,y as E,ah as I,D as L,P as O,ay as H,$ as A,an as V}from"./C3GBaIMR.js";import{w as T}from"./uvMM--wM.js";const N=c({name:"Add",render(){return i("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),K=a([l("list",`
 --n-merged-border-color: var(--n-border-color);
 --n-merged-color: var(--n-color);
 --n-merged-color-hover: var(--n-color-hover);
 margin: 0;
 font-size: var(--n-font-size);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 padding: 0;
 list-style-type: none;
 color: var(--n-text-color);
 background-color: var(--n-merged-color);
 `,[d("show-divider",[l("list-item",[a("&:not(:last-child)",[s("divider",`
 background-color: var(--n-merged-border-color);
 `)])])]),d("clickable",[l("list-item",`
 cursor: pointer;
 `)]),d("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `),d("hoverable",[l("list-item",`
 border-radius: var(--n-border-radius);
 `,[a("&:hover",`
 background-color: var(--n-merged-color-hover);
 `,[s("divider",`
 background-color: transparent;
 `)])])]),d("bordered, hoverable",[l("list-item",`
 padding: 12px 20px;
 `),s("header, footer",`
 padding: 12px 20px;
 `)]),s("header, footer",`
 padding: 12px 0;
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[a("&:not(:last-child)",`
 border-bottom: 1px solid var(--n-merged-border-color);
 `)]),l("list-item",`
 position: relative;
 padding: 12px 0; 
 box-sizing: border-box;
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[s("prefix",`
 margin-right: 20px;
 flex: 0;
 `),s("suffix",`
 margin-left: 20px;
 flex: 0;
 `),s("main",`
 flex: 1;
 `),s("divider",`
 height: 1px;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 background-color: transparent;
 transition: background-color .3s var(--n-bezier);
 pointer-events: none;
 `)])]),j(l("list",`
 --n-merged-color-hover: var(--n-color-hover-modal);
 --n-merged-color: var(--n-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),D(l("list",`
 --n-merged-color-hover: var(--n-color-hover-popover);
 --n-merged-color: var(--n-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),S=Object.assign(Object.assign({},b.props),{size:{type:String,default:"medium"},bordered:Boolean,clickable:Boolean,hoverable:Boolean,showDivider:{type:Boolean,default:!0}}),m=H("n-list"),F=c({name:"List",props:S,slots:Object,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:r,mergedRtlRef:t}=M(e),h=B("List",t,o),u=b("List","-list",K,T,e,o);E(m,{showDividerRef:I(e,"showDivider"),mergedClsPrefixRef:o});const v=L(()=>{const{common:{cubicBezierEaseInOut:p},self:{fontSize:f,textColor:g,color:x,colorModal:_,colorPopover:w,borderColor:C,borderColorModal:z,borderColorPopover:k,borderRadius:$,colorHover:R,colorHoverModal:P,colorHoverPopover:y}}=u.value;return{"--n-font-size":f,"--n-bezier":p,"--n-text-color":g,"--n-color":x,"--n-border-radius":$,"--n-border-color":C,"--n-border-color-modal":z,"--n-border-color-popover":k,"--n-color-modal":_,"--n-color-popover":w,"--n-color-hover":R,"--n-color-hover-modal":P,"--n-color-hover-popover":y}}),n=r?O("list",void 0,v,e):void 0;return{mergedClsPrefix:o,rtlEnabled:h,cssVars:r?void 0:v,themeClass:n==null?void 0:n.themeClass,onRender:n==null?void 0:n.onRender}},render(){var e;const{$slots:o,mergedClsPrefix:r,onRender:t}=this;return t==null||t(),i("ul",{class:[`${r}-list`,this.rtlEnabled&&`${r}-list--rtl`,this.bordered&&`${r}-list--bordered`,this.showDivider&&`${r}-list--show-divider`,this.hoverable&&`${r}-list--hoverable`,this.clickable&&`${r}-list--clickable`,this.themeClass],style:this.cssVars},o.header?i("div",{class:`${r}-list__header`},o.header()):null,(e=o.default)===null||e===void 0?void 0:e.call(o),o.footer?i("div",{class:`${r}-list__footer`},o.footer()):null)}}),G=c({name:"ListItem",slots:Object,setup(){const e=A(m,null);return e||V("list-item","`n-list-item` must be placed in `n-list`."),{showDivider:e.showDividerRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){const{$slots:e,mergedClsPrefix:o}=this;return i("li",{class:`${o}-list-item`},e.prefix?i("div",{class:`${o}-list-item__prefix`},e.prefix()):null,e.default?i("div",{class:`${o}-list-item__main`},e):null,e.suffix?i("div",{class:`${o}-list-item__suffix`},e.suffix()):null,this.showDivider&&i("div",{class:`${o}-list-item__divider`}))}});export{N as A,G as _,F as a};
