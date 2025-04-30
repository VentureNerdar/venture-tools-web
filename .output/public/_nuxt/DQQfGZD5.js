import{b9 as B,ba as I,cm as R,bv as C,S as m,V as O,d as _,W as g,r as S,X as j,ag as z,cn as E,i as y,Y as L,h as f,aS as P,a6 as $}from"./XhYJCJRV.js";function w(h){const{baseColor:e,textColor2:r,bodyColor:a,cardColor:i,dividerColor:t,actionColor:d,scrollbarColor:b,scrollbarColorHover:u,invertedColor:s}=h;return{textColor:r,textColorInverted:"#FFF",color:a,colorEmbedded:d,headerColor:i,headerColorInverted:s,footerColor:d,footerColorInverted:s,headerBorderColor:t,headerBorderColorInverted:s,footerBorderColor:t,footerBorderColorInverted:s,siderBorderColor:t,siderBorderColorInverted:s,siderColor:i,siderColorInverted:s,siderToggleButtonBorder:`1px solid ${t}`,siderToggleButtonColor:e,siderToggleButtonIconColor:r,siderToggleButtonIconColorInverted:r,siderToggleBarColor:C(a,b),siderToggleBarColorHover:C(a,u),__invertScrollbar:"true"}}const F=B({name:"Layout",common:I,peers:{Scrollbar:R},self:w}),V={type:String,default:"static"},H=m("layout",`
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
 `),O("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),k={embedded:Boolean,position:V,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},D=$("n-layout");function K(h){return _({name:"Layout",props:Object.assign(Object.assign({},g.props),k),setup(e){const r=S(null),a=S(null),{mergedClsPrefixRef:i,inlineThemeDisabled:t}=j(e),d=g("Layout","-layout",H,F,e,i);function b(o,l){if(e.nativeScrollbar){const{value:n}=r;n&&(l===void 0?n.scrollTo(o):n.scrollTo(o,l))}else{const{value:n}=a;n&&n.scrollTo(o,l)}}z(D,e);let u=0,s=0;const x=o=>{var l;const n=o.target;u=n.scrollLeft,s=n.scrollTop,(l=e.onScroll)===null||l===void 0||l.call(e,o)};E(()=>{if(e.nativeScrollbar){const o=r.value;o&&(o.scrollTop=s,o.scrollLeft=u)}});const p={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},T={scrollTo:b},v=y(()=>{const{common:{cubicBezierEaseInOut:o},self:l}=d.value;return{"--n-bezier":o,"--n-color":e.embedded?l.colorEmbedded:l.color,"--n-text-color":l.textColor}}),c=t?L("layout",y(()=>e.embedded?"e":""),v,e):void 0;return Object.assign({mergedClsPrefix:i,scrollableElRef:r,scrollbarInstRef:a,hasSiderStyle:p,mergedTheme:d,handleNativeElScroll:x,cssVars:t?void 0:v,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender},T)},render(){var e;const{mergedClsPrefix:r,hasSider:a}=this;(e=this.onRender)===null||e===void 0||e.call(this);const i=a?this.hasSiderStyle:void 0,t=[this.themeClass,h,`${r}-layout`,`${r}-layout--${this.position}-positioned`];return f("div",{class:t,style:this.cssVars},this.nativeScrollbar?f("div",{ref:"scrollableElRef",class:[`${r}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,i],onScroll:this.handleNativeElScroll},this.$slots):f(P,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,i]}),this.$slots))}})}const N=K(!1);export{N as _};
