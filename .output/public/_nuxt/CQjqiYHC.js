import{aT as so,bi as e,V as to,Y as u,X as x,W as P,ae as z,d as io,Z as K,r as ho,$ as go,ah as bo,ai as Co,b1 as vo,j as U,a0 as uo,al as V,h as y,ac as po,a6 as fo,an as ko,aj as h,ak as mo,aM as D}from"./B7JTAmbj.js";import{I as xo}from"./BIgXSGoV.js";let S=[];const L=new WeakMap;function yo(){S.forEach(r=>r(...L.get(r))),S=[]}function Ro(r,...i){L.set(r,i),!S.includes(r)&&S.push(r)===1&&requestAnimationFrame(yo)}function Io(r){const{textColor2:i,primaryColorHover:l,primaryColorPressed:p,primaryColor:c,infoColor:d,successColor:s,warningColor:n,errorColor:t,baseColor:f,borderColor:k,opacityDisabled:g,tagColor:C,closeIconColor:o,closeIconColorHover:a,closeIconColorPressed:v,borderRadiusSmall:b,fontSizeMini:m,fontSizeTiny:B,fontSizeSmall:$,fontSizeMedium:H,heightMini:M,heightTiny:R,heightSmall:_,heightMedium:T,closeColorHover:E,closeColorPressed:O,buttonColor2Hover:W,buttonColor2Pressed:j,fontWeightStrong:w}=r;return Object.assign(Object.assign({},xo),{closeBorderRadius:b,heightTiny:M,heightSmall:R,heightMedium:_,heightLarge:T,borderRadius:b,opacityDisabled:g,fontSizeTiny:m,fontSizeSmall:B,fontSizeMedium:$,fontSizeLarge:H,fontWeightStrong:w,textColorCheckable:i,textColorHoverCheckable:i,textColorPressedCheckable:i,textColorChecked:f,colorCheckable:"#0000",colorHoverCheckable:W,colorPressedCheckable:j,colorChecked:c,colorCheckedHover:l,colorCheckedPressed:p,border:`1px solid ${k}`,textColor:i,color:C,colorBordered:"rgb(250, 250, 252)",closeIconColor:o,closeIconColorHover:a,closeIconColorPressed:v,closeColorHover:E,closeColorPressed:O,borderPrimary:`1px solid ${e(c,{alpha:.3})}`,textColorPrimary:c,colorPrimary:e(c,{alpha:.12}),colorBorderedPrimary:e(c,{alpha:.1}),closeIconColorPrimary:c,closeIconColorHoverPrimary:c,closeIconColorPressedPrimary:c,closeColorHoverPrimary:e(c,{alpha:.12}),closeColorPressedPrimary:e(c,{alpha:.18}),borderInfo:`1px solid ${e(d,{alpha:.3})}`,textColorInfo:d,colorInfo:e(d,{alpha:.12}),colorBorderedInfo:e(d,{alpha:.1}),closeIconColorInfo:d,closeIconColorHoverInfo:d,closeIconColorPressedInfo:d,closeColorHoverInfo:e(d,{alpha:.12}),closeColorPressedInfo:e(d,{alpha:.18}),borderSuccess:`1px solid ${e(s,{alpha:.3})}`,textColorSuccess:s,colorSuccess:e(s,{alpha:.12}),colorBorderedSuccess:e(s,{alpha:.1}),closeIconColorSuccess:s,closeIconColorHoverSuccess:s,closeIconColorPressedSuccess:s,closeColorHoverSuccess:e(s,{alpha:.12}),closeColorPressedSuccess:e(s,{alpha:.18}),borderWarning:`1px solid ${e(n,{alpha:.35})}`,textColorWarning:n,colorWarning:e(n,{alpha:.15}),colorBorderedWarning:e(n,{alpha:.12}),closeIconColorWarning:n,closeIconColorHoverWarning:n,closeIconColorPressedWarning:n,closeColorHoverWarning:e(n,{alpha:.12}),closeColorPressedWarning:e(n,{alpha:.18}),borderError:`1px solid ${e(t,{alpha:.23})}`,textColorError:t,colorError:e(t,{alpha:.1}),colorBorderedError:e(t,{alpha:.08}),closeIconColorError:t,closeIconColorHoverError:t,closeIconColorPressedError:t,closeColorHoverError:e(t,{alpha:.12}),closeColorPressedError:e(t,{alpha:.18})})}const Po={name:"Tag",common:so,self:Io},zo={color:Object,type:{type:String,default:"default"},round:Boolean,size:{type:String,default:"medium"},closable:Boolean,disabled:{type:Boolean,default:void 0}},So=to("tag",`
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
`,[u("strong",`
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
 `),u("round",`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[x("icon",`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),x("avatar",`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),u("closable",`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),u("icon, avatar",[u("round",`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),u("disabled",`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),u("checkable",`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[P("disabled",[z("&:hover","background-color: var(--n-color-hover-checkable);",[P("checked","color: var(--n-text-color-hover-checkable);")]),z("&:active","background-color: var(--n-color-pressed-checkable);",[P("checked","color: var(--n-text-color-pressed-checkable);")])]),u("checked",`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[P("disabled",[z("&:hover","background-color: var(--n-color-checked-hover);"),z("&:active","background-color: var(--n-color-checked-pressed);")])])])]),Bo=Object.assign(Object.assign(Object.assign({},K.props),zo),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),$o=fo("n-tag"),_o=io({name:"Tag",props:Bo,slots:Object,setup(r){const i=ho(null),{mergedBorderedRef:l,mergedClsPrefixRef:p,inlineThemeDisabled:c,mergedRtlRef:d}=go(r),s=K("Tag","-tag",So,Po,r,p);bo($o,{roundRef:Co(r,"round")});function n(){if(!r.disabled&&r.checkable){const{checked:o,onCheckedChange:a,onUpdateChecked:v,"onUpdate:checked":b}=r;v&&v(!o),b&&b(!o),a&&a(!o)}}function t(o){if(r.triggerClickOnClose||o.stopPropagation(),!r.disabled){const{onClose:a}=r;a&&ko(a,o)}}const f={setTextContent(o){const{value:a}=i;a&&(a.textContent=o)}},k=vo("Tag",d,p),g=U(()=>{const{type:o,size:a,color:{color:v,textColor:b}={}}=r,{common:{cubicBezierEaseInOut:m},self:{padding:B,closeMargin:$,borderRadius:H,opacityDisabled:M,textColorCheckable:R,textColorHoverCheckable:_,textColorPressedCheckable:T,textColorChecked:E,colorCheckable:O,colorHoverCheckable:W,colorPressedCheckable:j,colorChecked:w,colorCheckedHover:A,colorCheckedPressed:q,closeBorderRadius:X,fontWeightStrong:Y,[h("colorBordered",o)]:Z,[h("closeSize",a)]:G,[h("closeIconSize",a)]:J,[h("fontSize",a)]:Q,[h("height",a)]:F,[h("color",o)]:oo,[h("textColor",o)]:eo,[h("border",o)]:ro,[h("closeIconColor",o)]:N,[h("closeIconColorHover",o)]:lo,[h("closeIconColorPressed",o)]:ao,[h("closeColorHover",o)]:co,[h("closeColorPressed",o)]:no}}=s.value,I=mo($);return{"--n-font-weight-strong":Y,"--n-avatar-size-override":`calc(${F} - 8px)`,"--n-bezier":m,"--n-border-radius":H,"--n-border":ro,"--n-close-icon-size":J,"--n-close-color-pressed":no,"--n-close-color-hover":co,"--n-close-border-radius":X,"--n-close-icon-color":N,"--n-close-icon-color-hover":lo,"--n-close-icon-color-pressed":ao,"--n-close-icon-color-disabled":N,"--n-close-margin-top":I.top,"--n-close-margin-right":I.right,"--n-close-margin-bottom":I.bottom,"--n-close-margin-left":I.left,"--n-close-size":G,"--n-color":v||(l.value?Z:oo),"--n-color-checkable":O,"--n-color-checked":w,"--n-color-checked-hover":A,"--n-color-checked-pressed":q,"--n-color-hover-checkable":W,"--n-color-pressed-checkable":j,"--n-font-size":Q,"--n-height":F,"--n-opacity-disabled":M,"--n-padding":B,"--n-text-color":b||eo,"--n-text-color-checkable":R,"--n-text-color-checked":E,"--n-text-color-hover-checkable":_,"--n-text-color-pressed-checkable":T}}),C=c?uo("tag",U(()=>{let o="";const{type:a,size:v,color:{color:b,textColor:m}={}}=r;return o+=a[0],o+=v[0],b&&(o+=`a${D(b)}`),m&&(o+=`b${D(m)}`),l.value&&(o+="c"),o}),g,r):void 0;return Object.assign(Object.assign({},f),{rtlEnabled:k,mergedClsPrefix:p,contentRef:i,mergedBordered:l,handleClick:n,handleCloseClick:t,cssVars:c?void 0:g,themeClass:C==null?void 0:C.themeClass,onRender:C==null?void 0:C.onRender})},render(){var r,i;const{mergedClsPrefix:l,rtlEnabled:p,closable:c,color:{borderColor:d}={},round:s,onRender:n,$slots:t}=this;n==null||n();const f=V(t.avatar,g=>g&&y("div",{class:`${l}-tag__avatar`},g)),k=V(t.icon,g=>g&&y("div",{class:`${l}-tag__icon`},g));return y("div",{class:[`${l}-tag`,this.themeClass,{[`${l}-tag--rtl`]:p,[`${l}-tag--strong`]:this.strong,[`${l}-tag--disabled`]:this.disabled,[`${l}-tag--checkable`]:this.checkable,[`${l}-tag--checked`]:this.checkable&&this.checked,[`${l}-tag--round`]:s,[`${l}-tag--avatar`]:f,[`${l}-tag--icon`]:k,[`${l}-tag--closable`]:c}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},k||f,y("span",{class:`${l}-tag__content`,ref:"contentRef"},(i=(r=this.$slots).default)===null||i===void 0?void 0:i.call(r)),!this.checkable&&c?y(po,{clsPrefix:l,class:`${l}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:s,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?y("div",{class:`${l}-tag__border`,style:{borderColor:d}}):null)}});export{_o as _,Ro as b,$o as t};
