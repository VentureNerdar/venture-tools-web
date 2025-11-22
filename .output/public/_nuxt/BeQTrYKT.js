import{x as io,h as ho,br as go,cu as bo,bC as Co,bF as r,J as uo,M as v,L as x,K as S,ad as B,m as vo,N as A,r as fo,O as po,y as mo,ah as ko,a1 as xo,D as K,P as yo,aC as L,q as y,ao as Po,ay as Io,al as zo,aD as h,bm as So,aE as V}from"./BxpEjOof.js";import{ac as Bo}from"./Cm9BH2tJ.js";let $=[];const q=new WeakMap;function $o(){$.forEach(o=>o(...q.get(o))),$=[]}function Wo(o,...a){q.set(o,a),!$.includes(o)&&$.push(o)===1&&requestAnimationFrame($o)}let P,I;const Ho=()=>{var o,a;P=go?(a=(o=document)===null||o===void 0?void 0:o.fonts)===null||a===void 0?void 0:a.ready:void 0,I=!1,P!==void 0?P.then(()=>{I=!0}):I=!0};Ho();function jo(o){if(I)return;let a=!1;io(()=>{I||P==null||P.then(()=>{a||o()})}),ho(()=>{a=!0})}const{c:No}=bo(),Do="vueuc-style";function Ro(o){const{textColor2:a,primaryColorHover:l,primaryColorPressed:f,primaryColor:n,infoColor:d,successColor:t,warningColor:s,errorColor:i,baseColor:p,borderColor:m,opacityDisabled:g,tagColor:C,closeIconColor:e,closeIconColorHover:c,closeIconColorPressed:u,borderRadiusSmall:b,fontSizeMini:k,fontSizeTiny:H,fontSizeSmall:R,fontSizeMedium:M,heightMini:_,heightTiny:E,heightSmall:T,heightMedium:O,closeColorHover:w,closeColorPressed:F,buttonColor2Hover:W,buttonColor2Pressed:j,fontWeightStrong:N}=o;return Object.assign(Object.assign({},Bo),{closeBorderRadius:b,heightTiny:_,heightSmall:E,heightMedium:T,heightLarge:O,borderRadius:b,opacityDisabled:g,fontSizeTiny:k,fontSizeSmall:H,fontSizeMedium:R,fontSizeLarge:M,fontWeightStrong:N,textColorCheckable:a,textColorHoverCheckable:a,textColorPressedCheckable:a,textColorChecked:p,colorCheckable:"#0000",colorHoverCheckable:W,colorPressedCheckable:j,colorChecked:n,colorCheckedHover:l,colorCheckedPressed:f,border:`1px solid ${m}`,textColor:a,color:C,colorBordered:"rgb(250, 250, 252)",closeIconColor:e,closeIconColorHover:c,closeIconColorPressed:u,closeColorHover:w,closeColorPressed:F,borderPrimary:`1px solid ${r(n,{alpha:.3})}`,textColorPrimary:n,colorPrimary:r(n,{alpha:.12}),colorBorderedPrimary:r(n,{alpha:.1}),closeIconColorPrimary:n,closeIconColorHoverPrimary:n,closeIconColorPressedPrimary:n,closeColorHoverPrimary:r(n,{alpha:.12}),closeColorPressedPrimary:r(n,{alpha:.18}),borderInfo:`1px solid ${r(d,{alpha:.3})}`,textColorInfo:d,colorInfo:r(d,{alpha:.12}),colorBorderedInfo:r(d,{alpha:.1}),closeIconColorInfo:d,closeIconColorHoverInfo:d,closeIconColorPressedInfo:d,closeColorHoverInfo:r(d,{alpha:.12}),closeColorPressedInfo:r(d,{alpha:.18}),borderSuccess:`1px solid ${r(t,{alpha:.3})}`,textColorSuccess:t,colorSuccess:r(t,{alpha:.12}),colorBorderedSuccess:r(t,{alpha:.1}),closeIconColorSuccess:t,closeIconColorHoverSuccess:t,closeIconColorPressedSuccess:t,closeColorHoverSuccess:r(t,{alpha:.12}),closeColorPressedSuccess:r(t,{alpha:.18}),borderWarning:`1px solid ${r(s,{alpha:.35})}`,textColorWarning:s,colorWarning:r(s,{alpha:.15}),colorBorderedWarning:r(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:r(s,{alpha:.12}),closeColorPressedWarning:r(s,{alpha:.18}),borderError:`1px solid ${r(i,{alpha:.23})}`,textColorError:i,colorError:r(i,{alpha:.1}),colorBorderedError:r(i,{alpha:.08}),closeIconColorError:i,closeIconColorHoverError:i,closeIconColorPressedError:i,closeColorHoverError:r(i,{alpha:.12}),closeColorPressedError:r(i,{alpha:.18})})}const Mo={name:"Tag",common:Co,self:Ro},_o={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},Eo=uo("tag",`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[v("strong",`
 font-weight: var(--n-font-weight-strong);
 `),x("border",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),x("icon",`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),x("avatar",`
 display: flex;
 margin: 0 6px 0 0;
 `),x("close",`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),v("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[x("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),x("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),v("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),v("icon, avatar",[v("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),v("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),v("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[S("disabled",[B("&:hover","background-color: var(--n-color-hover-checkable);",[S("checked","color: var(--n-text-color-hover-checkable);")]),B("&:active","background-color: var(--n-color-pressed-checkable);",[S("checked","color: var(--n-text-color-pressed-checkable);")])]),v("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[S("disabled",[B("&:hover","background-color: var(--n-color-checked-hover);"),B("&:active","background-color: var(--n-color-checked-pressed);")])])])]),To=Object.assign(Object.assign(Object.assign({},A.props),_o),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),Oo=Io("n-tag"),Uo=vo({name:"Tag",props:To,slots:Object,setup(o){const a=fo(null),{mergedBorderedRef:l,mergedClsPrefixRef:f,inlineThemeDisabled:n,mergedRtlRef:d}=po(o),t=A("Tag","-tag",Eo,Mo,o,f);mo(Oo,{roundRef:ko(o,"round")});function s(){if(!o.disabled&&o.checkable){const{checked:e,onCheckedChange:c,onUpdateChecked:u,"onUpdate:checked":b}=o;u&&u(!e),b&&b(!e),c&&c(!e)}}function i(e){if(o.triggerClickOnClose||e.stopPropagation(),!o.disabled){const{onClose:c}=o;c&&zo(c,e)}}const p={setTextContent(e){const{value:c}=a;c&&(c.textContent=e)}},m=xo("Tag",d,f),g=K(()=>{const{type:e,size:c,color:{color:u,textColor:b}={}}=o,{common:{cubicBezierEaseInOut:k},self:{padding:H,closeMargin:R,borderRadius:M,opacityDisabled:_,textColorCheckable:E,textColorHoverCheckable:T,textColorPressedCheckable:O,textColorChecked:w,colorCheckable:F,colorHoverCheckable:W,colorPressedCheckable:j,colorChecked:N,colorCheckedHover:J,colorCheckedPressed:G,closeBorderRadius:Q,fontWeightStrong:X,[h("colorBordered",e)]:Y,[h("closeSize",c)]:Z,[h("closeIconSize",c)]:oo,[h("fontSize",c)]:eo,[h("height",c)]:D,[h("color",e)]:ro,[h("textColor",e)]:lo,[h("border",e)]:ao,[h("closeIconColor",e)]:U,[h("closeIconColorHover",e)]:co,[h("closeIconColorPressed",e)]:no,[h("closeColorHover",e)]:so,[h("closeColorPressed",e)]:to}}=t.value,z=So(R);return{"--n-font-weight-strong":X,"--n-avatar-size-override":`calc(${D} - 8px)`,"--n-bezier":k,"--n-border-radius":M,"--n-border":ao,"--n-close-icon-size":oo,"--n-close-color-pressed":to,"--n-close-color-hover":so,"--n-close-border-radius":Q,"--n-close-icon-color":U,"--n-close-icon-color-hover":co,"--n-close-icon-color-pressed":no,"--n-close-icon-color-disabled":U,"--n-close-margin-top":z.top,"--n-close-margin-right":z.right,"--n-close-margin-bottom":z.bottom,"--n-close-margin-left":z.left,"--n-close-size":Z,"--n-color":u||(l.value?Y:ro),"--n-color-checkable":F,"--n-color-checked":N,"--n-color-checked-hover":J,"--n-color-checked-pressed":G,"--n-color-hover-checkable":W,"--n-color-pressed-checkable":j,"--n-font-size":eo,"--n-height":D,"--n-opacity-disabled":_,"--n-padding":H,"--n-text-color":b||lo,"--n-text-color-checkable":E,"--n-text-color-checked":w,"--n-text-color-hover-checkable":T,"--n-text-color-pressed-checkable":O}}),C=n?yo("tag",K(()=>{let e="";const{type:c,size:u,color:{color:b,textColor:k}={}}=o;return e+=c[0],e+=u[0],b&&(e+=`a${V(b)}`),k&&(e+=`b${V(k)}`),l.value&&(e+="c"),e}),g,o):void 0;return Object.assign(Object.assign({},p),{rtlEnabled:m,mergedClsPrefix:f,contentRef:a,mergedBordered:l,handleClick:s,handleCloseClick:i,cssVars:n?void 0:g,themeClass:C==null?void 0:C.themeClass,onRender:C==null?void 0:C.onRender})},render(){var o,a;const{mergedClsPrefix:l,rtlEnabled:f,closable:n,color:{borderColor:d}={},round:t,onRender:s,$slots:i}=this;s==null||s();const p=L(i.avatar,g=>g&&y("div",{class:`${l}-tag__avatar`},g)),m=L(i.icon,g=>g&&y("div",{class:`${l}-tag__icon`},g));return y("div",{class:[`${l}-tag`,this.themeClass,{[`${l}-tag--rtl`]:f,[`${l}-tag--strong`]:this.strong,[`${l}-tag--disabled`]:this.disabled,[`${l}-tag--checkable`]:this.checkable,[`${l}-tag--checked`]:this.checkable&&this.checked,[`${l}-tag--round`]:t,[`${l}-tag--avatar`]:p,[`${l}-tag--icon`]:m,[`${l}-tag--closable`]:n}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},m||p,y("span",{class:`${l}-tag__content`,ref:"contentRef"},(a=(o=this.$slots).default)===null||a===void 0?void 0:a.call(o)),!this.checkable&&n?y(Po,{clsPrefix:l,class:`${l}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:t,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?y("div",{class:`${l}-tag__border`,style:{borderColor:d}}):null)}});export{Uo as _,No as a,Wo as b,Do as c,Mo as d,jo as o,Oo as t};
