import{ac as a,Y as i,a0 as d,$ as l,aq as y,ar as D,a1 as v,d as b,a2 as B,aO as E,Q as O,ag as I,j as L,a3 as M,h as s,ap as H,as as T,aB as V}from"./ClsKkY77.js";import{q}from"./JCo7lX2X.js";const K=a([i("list",`
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
 `,[d("show-divider",[i("list-item",[a("&:not(:last-child)",[l("divider",`
 background-color: var(--n-merged-border-color);
 `)])])]),d("clickable",[i("list-item",`
 cursor: pointer;
 `)]),d("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `),d("hoverable",[i("list-item",`
 border-radius: var(--n-border-radius);
 `,[a("&:hover",`
 background-color: var(--n-merged-color-hover);
 `,[l("divider",`
 background-color: transparent;
 `)])])]),d("bordered, hoverable",[i("list-item",`
 padding: 12px 20px;
 `),l("header, footer",`
 padding: 12px 20px;
 `)]),l("header, footer",`
 padding: 12px 0;
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[a("&:not(:last-child)",`
 border-bottom: 1px solid var(--n-merged-border-color);
 `)]),i("list-item",`
 position: relative;
 padding: 12px 0; 
 box-sizing: border-box;
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[l("prefix",`
 margin-right: 20px;
 flex: 0;
 `),l("suffix",`
 margin-left: 20px;
 flex: 0;
 `),l("main",`
 flex: 1;
 `),l("divider",`
 height: 1px;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 background-color: transparent;
 transition: background-color .3s var(--n-bezier);
 pointer-events: none;
 `)])]),y(i("list",`
 --n-merged-color-hover: var(--n-color-hover-modal);
 --n-merged-color: var(--n-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),D(i("list",`
 --n-merged-color-hover: var(--n-color-hover-popover);
 --n-merged-color: var(--n-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),S=Object.assign(Object.assign({},v.props),{size:{type:String,default:"medium"},bordered:Boolean,clickable:Boolean,hoverable:Boolean,showDivider:{type:Boolean,default:!0}}),m=H("n-list"),A=b({name:"List",props:S,slots:Object,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:r,mergedRtlRef:t}=B(e),p=E("List",t,o),u=v("List","-list",K,q,e,o);O(m,{showDividerRef:I(e,"showDivider"),mergedClsPrefixRef:o});const c=L(()=>{const{common:{cubicBezierEaseInOut:h},self:{fontSize:f,textColor:g,color:x,colorModal:_,colorPopover:C,borderColor:z,borderColorModal:$,borderColorPopover:R,borderRadius:k,colorHover:w,colorHoverModal:P,colorHoverPopover:j}}=u.value;return{"--n-font-size":f,"--n-bezier":h,"--n-text-color":g,"--n-color":x,"--n-border-radius":k,"--n-border-color":z,"--n-border-color-modal":$,"--n-border-color-popover":R,"--n-color-modal":_,"--n-color-popover":C,"--n-color-hover":w,"--n-color-hover-modal":P,"--n-color-hover-popover":j}}),n=r?M("list",void 0,c,e):void 0;return{mergedClsPrefix:o,rtlEnabled:p,cssVars:r?void 0:c,themeClass:n==null?void 0:n.themeClass,onRender:n==null?void 0:n.onRender}},render(){var e;const{$slots:o,mergedClsPrefix:r,onRender:t}=this;return t==null||t(),s("ul",{class:[`${r}-list`,this.rtlEnabled&&`${r}-list--rtl`,this.bordered&&`${r}-list--bordered`,this.showDivider&&`${r}-list--show-divider`,this.hoverable&&`${r}-list--hoverable`,this.clickable&&`${r}-list--clickable`,this.themeClass],style:this.cssVars},o.header?s("div",{class:`${r}-list__header`},o.header()):null,(e=o.default)===null||e===void 0?void 0:e.call(o),o.footer?s("div",{class:`${r}-list__footer`},o.footer()):null)}}),F=b({name:"ListItem",slots:Object,setup(){const e=T(m,null);return e||V("list-item","`n-list-item` must be placed in `n-list`."),{showDivider:e.showDividerRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){const{$slots:e,mergedClsPrefix:o}=this;return s("li",{class:`${o}-list-item`},e.prefix?s("div",{class:`${o}-list-item__prefix`},e.prefix()):null,e.default?s("div",{class:`${o}-list-item__main`},e):null,e.suffix?s("div",{class:`${o}-list-item__suffix`},e.suffix()):null,this.showDivider&&s("div",{class:`${o}-list-item__divider`}))}});export{F as _,A as a};
