import{a as d,i as n,S as h}from"./assets/vendor-5b071f6a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const c="/goit-js-hw-12/assets/icon-error-433b5e5d.svg";async function g(){const i="43688767-8e78f2c96043da1155d4d6687",r=new URLSearchParams({key:i,q:m,image_type:"photo",orientation:"horizontal",safesearch:!0}),{data:s}=await d(`https://pixabay.com/api/?${r}`);return s}function y(i){return i.map(({id:r,tags:s,largeImageURL:l,webformatURL:e,comments:t,likes:o,downloads:p,views:f})=>`<li class="gallery-item" id="${r}">
            <a class="gallery-link" href="${l}">
                <img
                    class="gallery-image"
                    src="${e}"
                    alt="${s}"
                    />               
            </a>
            <ul class="gallery-stat-list">
                    <li class="stat-item"><h2 class="title">Likes</h2><p class="stat-data">${o}</p></li>
                    <li class="stat-item"><h2 class="title">Views</h2><p class="stat-data">${f}</p></li>
                    <li class="stat-item"><h2 class="title">Comments</h2><p class="stat-data">${t}</p></li>
                    <li class="stat-item"><h2 class="title">Downloads</h2><p class="stat-data">${p}</p></li>
            </ul>
            
        </li>`).join("")}const a={form:document.querySelector(".task-form"),input:document.querySelector(".form-input"),list:document.querySelector(".gallery")};let m=null;a.form.addEventListener("submit",b);async function b(i){i.preventDefault();const r=a.input.value;if(!r){a.list.innerHTML="",n.error({...u,message:"Please enter your search query, the field cannot be blank!",backgroundColor:"rgb(239, 64, 64)",iconUrl:c});return}m=r,a.list.innerHTML='<span class="loader"></span>',await g().then(s=>{if(!s.hits.length){a.list.innerHTML="",n.error({...u,message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"rgb(239, 64, 64)",iconUrl:c});return}a.list.innerHTML=y(s.hits),L.refresh()}).catch(s=>console.log("catch",s)),a.form.reset()}const u={id:"myIziToast",title:"Error",titleColor:"rgb(255, 255, 255)",titleSize:"16",messageColor:"rgb(255, 255, 255)",messageSize:"16",position:"topRight"},L=new h(".gallery-item a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
