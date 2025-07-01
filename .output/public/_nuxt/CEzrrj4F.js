import{bM as t,q as a}from"./BlwiRDIC.js";const s=t((e,o)=>{if((localStorage.getItem("Bearer")||"")&&e.path!=="/home")return a("/dashboard",{replace:!0})});export{s as default};
