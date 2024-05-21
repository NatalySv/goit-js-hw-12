import{a as d,i as f,S as g}from"./assets/vendor-5b071f6a.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const h="/goit-js-hw-12/assets/icon-error-433b5e5d.svg";async function y(){const a="43688767-8e78f2c96043da1155d4d6687",s=new URLSearchParams({key:a,q:c,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:S,page:u}),{data:r}=await d(`https://pixabay.com/api/?${s}`);return r}function b(a){return a.map(({id:s,tags:r,largeImageURL:n,webformatURL:e,comments:t,likes:o,downloads:m,views:p})=>`<li class="gallery-item" id="${s}">
            <a class="gallery-link" href="${n}">
                <img
                    class="gallery-image"
                    src="${e}"
                    alt="${r}"
                    />               
            </a>
            <ul class="gallery-stat-list">
                    <li class="stat-item"><h2 class="title">Likes</h2><p class="stat-data">${o}</p></li>
                    <li class="stat-item"><h2 class="title">Views</h2><p class="stat-data">${p}</p></li>
                    <li class="stat-item"><h2 class="title">Comments</h2><p class="stat-data">${t}</p></li>
                    <li class="stat-item"><h2 class="title">Downloads</h2><p class="stat-data">${m}</p></li>
            </ul>
            
        </li>`).join("")}const i={form:document.querySelector(".task-form"),input:document.querySelector(".form-input"),list:document.querySelector(".gallery"),loadBtn:document.querySelector(".load-btn")};let c=null;const S=15;let u=1;const L="Please enter your search query, the field cannot be blank!",q="Sorry, there are no images matching your search query. Please try again!";i.form.addEventListener("submit",w);async function w(a){a.preventDefault(),u=1;const s=i.input.value;if(!s){i.list.innerHTML="",l(L);return}c=s,i.list.innerHTML='<span class="loader"></span>',await y().then(r=>{if(!r.hits.length){i.list.innerHTML="",l(q);return}i.list.innerHTML=b(r.hits),P.refresh()}).catch(r=>console.log("catch",r)),i.form.reset()}function l(a){return f.error({...$,message:a,backgroundColor:"rgb(239, 64, 64)",iconUrl:h})}const $={id:"myIziToast",title:"Warning",titleColor:"rgb(255, 255, 255)",titleSize:"16",messageColor:"rgb(255, 255, 255)",messageSize:"16",position:"topRight"},P=new g(".gallery-item a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
