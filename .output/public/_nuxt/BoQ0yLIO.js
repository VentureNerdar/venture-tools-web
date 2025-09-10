import{bJ as B,bI as I,bM as R,bN as C,Y as m,a0 as j,d as z,a1 as g,r as S,a2 as O,Q as _,cz as E,j as y,a3 as L,h as f,aS as P,ag as $}from"./DOkca_St.js";function w(b){const{baseColor:e,textColor2:r,bodyColor:a,cardColor:i,dividerColor:t,actionColor:d,scrollbarColor:h,scrollbarColorHover:u,invertedColor:s}=b;return{textColor:r,textColorInverted:"#FFF",color:a,colorEmbedded:d,headerColor:i,headerColorInverted:s,footerColor:d,footerColorInverted:s,headerBorderColor:t,headerBorderColorInverted:s,footerBorderColor:t,footerBorderColorInverted:s,siderBorderColor:t,siderBorderColorInverted:s,siderColor:i,siderColorInverted:s,siderToggleButtonBorder:`1px solid ${t}`,siderToggleButtonColor:e,siderToggleButtonIconColor:r,siderToggleButtonIconColorInverted:r,siderToggleBarColor:C(a,h),siderToggleBarColorHover:C(a,u),__invertScrollbar:"true"}}const F=B({name:"Layout",common:I,peers:{Scrollbar:R},self:w}),H={type:String,default:"static"},M=m("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[m("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),j("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),N={embedded:Boolean,position:H,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},V=$("n-layout");function k(b){return z({name:"Layout",props:Object.assign(Object.assign({},g.props),N),setup(e){const r=S(null),a=S(null),{mergedClsPrefixRef:i,inlineThemeDisabled:t}=O(e),d=g("Layout","-layout",M,F,e,i);function h(o,l){if(e.nativeScrollbar){const{value:n}=r;n&&(l===void 0?n.scrollTo(o):n.scrollTo(o,l))}else{const{value:n}=a;n&&n.scrollTo(o,l)}}_(V,e);let u=0,s=0;const x=o=>{var l;const n=o.target;u=n.scrollLeft,s=n.scrollTop,(l=e.onScroll)===null||l===void 0||l.call(e,o)};E(()=>{if(e.nativeScrollbar){const o=r.value;o&&(o.scrollTop=s,o.scrollLeft=u)}});const p={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},T={scrollTo:h},v=y(()=>{const{common:{cubicBezierEaseInOut:o},self:l}=d.value;return{"--n-bezier":o,"--n-color":e.embedded?l.colorEmbedded:l.color,"--n-text-color":l.textColor}}),c=t?L("layout",y(()=>e.embedded?"e":""),v,e):void 0;return Object.assign({mergedClsPrefix:i,scrollableElRef:r,scrollbarInstRef:a,hasSiderStyle:p,mergedTheme:d,handleNativeElScroll:x,cssVars:t?void 0:v,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender},T)},render(){var e;const{mergedClsPrefix:r,hasSider:a}=this;(e=this.onRender)===null||e===void 0||e.call(this);const i=a?this.hasSiderStyle:void 0,t=[this.themeClass,b,`${r}-layout`,`${r}-layout--${this.position}-positioned`];return f("div",{class:t,style:this.cssVars},this.nativeScrollbar?f("div",{ref:"scrollableElRef",class:[`${r}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,i],onScroll:this.handleNativeElScroll},this.$slots):f(P,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,i]}),this.$slots))}})}const K=k(!1);export{K as _,F as l};
