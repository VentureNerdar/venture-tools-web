import{br as s,i as l}from"./DjT8zhlV.js";const m=s("setting",()=>{const t=JSON.parse(localStorage.getItem("statuses")||"{}"),a=l(()=>t.filter(e=>e.type==="contact")),o=l(()=>t.filter(e=>e.type==="group")),r=l(()=>t.filter(e=>e.type==="faith_status")),n=l(()=>({contact:a.value.map(e=>({label:e.name,value:e.id})),group:o.value.map(e=>({label:e.name,value:e.id})),faith:r.value.map(e=>({label:e.name,value:e.id})),ageGroups:[{value:"Under 18 years old",label:"Under 18 years old"},{value:"18-25 years old",label:"18-25 years old"},{value:"26-40 years old",label:"26-40 years old"},{value:"Over 40 years old",label:"Over 40 years old"}],genders:[{label:"Male",value:"male"},{label:"Female",value:"female"}]}));return{statuses:t,contactStatuses:a,groupStatuses:o,faithStatuses:r,options:n}}),c=s("peopleGroup",()=>{const t=JSON.parse(localStorage.getItem("peopleGroups")||"{}"),a=l(()=>t.map(o=>({label:o.name,value:o.id})));return{peopleGroups:t,options:a}}),i=s("communicationPlatform",()=>({communicationPlatforms:JSON.parse(localStorage.getItem("communicationPlatforms")||"{}")})),p=s("communities",()=>{const t=JSON.parse(localStorage.getItem("communities")||"{}"),a=JSON.parse(localStorage.getItem("communityChecklists")||"{}");return{communities:t,communityChecklists:a}});export{c as a,i as b,p as c,m as u};
