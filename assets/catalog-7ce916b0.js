import{g as ut,r as lt,a as ft}from"./modal-footer-68670597.js";var U={},ct={get exports(){return U},set exports(C){U=C}};(function(C,L){(function(m,e){C.exports=e()})(window,function(){return function(u){var m={};function e(r){if(m[r])return m[r].exports;var i=m[r]={i:r,l:!1,exports:{}};return u[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=u,e.c=m,e.d=function(r,i,c){e.o(r,i)||Object.defineProperty(r,i,{enumerable:!0,get:c})},e.r=function(r){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},e.t=function(r,i){if(i&1&&(r=e(r)),i&8||i&4&&typeof r=="object"&&r&&r.__esModule)return r;var c=Object.create(null);if(e.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:r}),i&2&&typeof r!="string")for(var p in r)e.d(c,p,function(a){return r[a]}.bind(null,p));return c},e.n=function(r){var i=r&&r.__esModule?function(){return r.default}:function(){return r};return e.d(i,"a",i),i},e.o=function(r,i){return Object.prototype.hasOwnProperty.call(r,i)},e.p="dist",e(e.s=10)}([function(u,m,e){function r(i,c){var p=Object.prototype.hasOwnProperty,a,l,h,_;for(h=1,_=arguments.length;h<_;h+=1){a=arguments[h];for(l in a)p.call(a,l)&&(i[l]=a[l])}return i}u.exports=r},function(u,m,e){function r(i){return i===void 0}u.exports=r},function(u,m,e){function r(i){return i instanceof Array}u.exports=r},function(u,m,e){var r=e(2),i=e(17),c=e(6);function p(a,l,h){r(a)?i(a,l,h):c(a,l,h)}u.exports=p},function(u,m,e){function r(i){return typeof i=="string"||i instanceof String}u.exports=r},function(u,m,e){function r(i){return i instanceof Function}u.exports=r},function(u,m,e){function r(i,c,p){var a;p=p||null;for(a in i)if(i.hasOwnProperty(a)&&c.call(p,i[a],a,i)===!1)break}u.exports=r},function(u,m,e){var r=e(18),i=e(0);function c(p,a){var l;return a||(a=p,p=null),l=a.init||function(){},p&&r(l,p),a.hasOwnProperty("static")&&(i(l,a.static),delete a.static),i(l.prototype,a),l}u.exports=c},function(u,m,e){var r=e(2);function i(c,p,a){var l,h;if(a=a||0,!r(p))return-1;if(Array.prototype.indexOf)return Array.prototype.indexOf.call(p,c,a);for(h=p.length,l=a;a>=0&&l<h;l+=1)if(p[l]===c)return l;return-1}u.exports=i},function(u,m,e){var r=e(29),i=e(30),c=e(5),p={capitalizeFirstLetter:function(a){return a.substring(0,1).toUpperCase()+a.substring(1,a.length)},isContained:function(a,l){return l?a===l?!0:l.contains(a):!1},createElementByTemplate:function(a,l){var h=document.createElement("div"),_=c(a)?a(l):r(a,l);return h.innerHTML=_,h.firstChild},bind:function(a,l){var h=Array.prototype.slice,_;return a.bind?a.bind.apply(a,h.call(arguments,1)):(_=h.call(arguments,2),function(){return a.apply(l,_.length?_.concat(h.call(arguments)):arguments)})},sendHostName:function(){i("pagination","UA-129987462-1")}};u.exports=p},function(u,m,e){e(11),u.exports=e(12)},function(u,m,e){},function(u,m,e){var r=e(13),i=e(7),c=e(0),p=e(1),a=e(20),l=e(9),h={totalItems:10,itemsPerPage:10,visiblePages:10,page:1,centerAlign:!1,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",usageStatistics:!0},_=i({init:function(s,t){this._options=c({},h,t),this._currentPage=0,this._view=new a(s,this._options,l.bind(this._onClickHandler,this)),this._paginate(),this._options.usageStatistics&&l.sendHostName()},_setCurrentPage:function(s){this._currentPage=s||this._options.page},_getLastPage:function(){var s=Math.ceil(this._options.totalItems/this._options.itemsPerPage);return s||1},_getPageIndex:function(s){var t,n;return this._options.centerAlign?(t=Math.floor(this._options.visiblePages/2),n=s-t,n=Math.max(n,1),n=Math.min(n,this._getLastPage()-this._options.visiblePages+1),n):Math.ceil(s/this._options.visiblePages)},_getRelativePage:function(s){var t=s==="prev",n=this.getCurrentPage();return t?n-1:n+1},_getMorePageIndex:function(s){var t=this._getPageIndex(this.getCurrentPage()),n=this._options.visiblePages,o=s==="prev",v;return this._options.centerAlign?v=o?t-1:t+n:v=o?(t-1)*n:t*n+1,v},_convertToValidPage:function(s){var t=this._getLastPage();return s=Math.max(s,1),s=Math.min(s,t),s},_paginate:function(s){var t=this._makeViewData(s||this._options.page);this._setCurrentPage(s),this._view.update(t)},_makeViewData:function(s){var t={},n=this._getLastPage(),o=this._getPageIndex(s),v=this._getPageIndex(n),E=this._getEdge(s);return t.leftPageNumber=E.left,t.rightPageNumber=E.right,t.prevMore=o>1,t.nextMore=o<v,t.page=s,t.currentPageIndex=s,t.lastPage=n,t.lastPageListIndex=n,t},_getEdge:function(s){var t,n,o,v=this._getLastPage(),E=this._options.visiblePages,T=this._getPageIndex(s);return this._options.centerAlign?(o=Math.floor(E/2),t=Math.max(s-o,1),n=t+E-1,n>v&&(t=Math.max(v-E+1,1),n=v)):(t=(T-1)*E+1,n=T*E,n=Math.min(n,v)),{left:t,right:n}},_onClickHandler:function(s,t){switch(s){case"first":t=1;break;case"prev":t=this._getRelativePage("prev");break;case"next":t=this._getRelativePage("next");break;case"prevMore":t=this._getMorePageIndex("prev");break;case"nextMore":t=this._getMorePageIndex("next");break;case"last":t=this._getLastPage();break;default:if(!t)return}this.movePageTo(t)},reset:function(s){p(s)&&(s=this._options.totalItems),this._options.totalItems=s,this._paginate(1)},movePageTo:function(s){s=this._convertToValidPage(s),this.invoke("beforeMove",{page:s})&&(this._paginate(s),this.fire("afterMove",{page:s}))},setTotalItems:function(s){this._options.totalItems=s},setItemsPerPage:function(s){this._options.itemsPerPage=s},getCurrentPage:function(){return this._currentPage||this._options.page}});r.mixin(_),u.exports=_},function(u,m,e){var r=e(0),i=e(14),c=e(4),p=e(16),a=e(2),l=e(5),h=e(3),_=/\s+/g;function s(){this.events=null,this.contexts=null}s.mixin=function(t){r(t.prototype,s.prototype)},s.prototype._getHandlerItem=function(t,n){var o={handler:t};return n&&(o.context=n),o},s.prototype._safeEvent=function(t){var n=this.events,o;return n||(n=this.events={}),t&&(o=n[t],o||(o=[],n[t]=o),n=o),n},s.prototype._safeContext=function(){var t=this.contexts;return t||(t=this.contexts=[]),t},s.prototype._indexOfContext=function(t){for(var n=this._safeContext(),o=0;n[o];){if(t===n[o][0])return o;o+=1}return-1},s.prototype._memorizeContext=function(t){var n,o;i(t)&&(n=this._safeContext(),o=this._indexOfContext(t),o>-1?n[o][1]+=1:n.push([t,1]))},s.prototype._forgetContext=function(t){var n,o;i(t)&&(n=this._safeContext(),o=this._indexOfContext(t),o>-1&&(n[o][1]-=1,n[o][1]<=0&&n.splice(o,1)))},s.prototype._bindEvent=function(t,n,o){var v=this._safeEvent(t);this._memorizeContext(o),v.push(this._getHandlerItem(n,o))},s.prototype.on=function(t,n,o){var v=this;c(t)?(t=t.split(_),h(t,function(E){v._bindEvent(E,n,o)})):p(t)&&(o=n,h(t,function(E,T){v.on(T,E,o)}))},s.prototype.once=function(t,n,o){var v=this;if(p(t)){o=n,h(t,function(T,f){v.once(f,T,o)});return}function E(){n.apply(o,arguments),v.off(t,E,o)}this.on(t,E,o)},s.prototype._spliceMatches=function(t,n){var o=0,v;if(a(t))for(v=t.length;o<v;o+=1)n(t[o])===!0&&(t.splice(o,1),v-=1,o-=1)},s.prototype._matchHandler=function(t){var n=this;return function(o){var v=t===o.handler;return v&&n._forgetContext(o.context),v}},s.prototype._matchContext=function(t){var n=this;return function(o){var v=t===o.context;return v&&n._forgetContext(o.context),v}},s.prototype._matchHandlerAndContext=function(t,n){var o=this;return function(v){var E=t===v.handler,T=n===v.context,f=E&&T;return f&&o._forgetContext(v.context),f}},s.prototype._offByEventName=function(t,n){var o=this,v=l(n),E=o._matchHandler(n);t=t.split(_),h(t,function(T){var f=o._safeEvent(T);v?o._spliceMatches(f,E):(h(f,function(d){o._forgetContext(d.context)}),o.events[T]=[])})},s.prototype._offByHandler=function(t){var n=this,o=this._matchHandler(t);h(this._safeEvent(),function(v){n._spliceMatches(v,o)})},s.prototype._offByObject=function(t,n){var o=this,v;this._indexOfContext(t)<0?h(t,function(E,T){o.off(T,E)}):c(n)?(v=this._matchContext(t),o._spliceMatches(this._safeEvent(n),v)):l(n)?(v=this._matchHandlerAndContext(n,t),h(this._safeEvent(),function(E){o._spliceMatches(E,v)})):(v=this._matchContext(t),h(this._safeEvent(),function(E){o._spliceMatches(E,v)}))},s.prototype.off=function(t,n){c(t)?this._offByEventName(t,n):arguments.length?l(t)?this._offByHandler(t):p(t)&&this._offByObject(t,n):(this.events={},this.contexts=[])},s.prototype.fire=function(t){this.invoke.apply(this,arguments)},s.prototype.invoke=function(t){var n,o,v,E;if(!this.hasListener(t))return!0;for(n=this._safeEvent(t),o=Array.prototype.slice.call(arguments,1),v=0;n[v];){if(E=n[v],E.handler.apply(E.context,o)===!1)return!1;v+=1}return!0},s.prototype.hasListener=function(t){return this.getListenerLength(t)>0},s.prototype.getListenerLength=function(t){var n=this._safeEvent(t);return n.length},u.exports=s},function(u,m,e){var r=e(1),i=e(15);function c(p){return!r(p)&&!i(p)}u.exports=c},function(u,m,e){function r(i){return i===null}u.exports=r},function(u,m,e){function r(i){return i===Object(i)}u.exports=r},function(u,m,e){function r(i,c,p){var a=0,l=i.length;for(p=p||null;a<l&&c.call(p,i[a],a,i)!==!1;a+=1);}u.exports=r},function(u,m,e){var r=e(19);function i(c,p){var a=r(p.prototype);a.constructor=c,c.prototype=a}u.exports=i},function(u,m,e){function r(i){function c(){}return c.prototype=i,new c}u.exports=r},function(u,m,e){var r=e(3),i=e(7),c=e(21),p=e(22),a=e(24),l=e(25),h=e(0),_=e(4),s=e(28),t=e(9),n={page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'},o=["first","prev","next","last"],v=["prev","next"],E="The container element is invalid.",T=i({init:function(f,d,I){this._containerElement=null,this._firstItemClassName=d.firstItemClassName,this._lastItemClassName=d.lastItemClassName,this._template=h({},n,d.template),this._buttons={},this._enabledPageElements=[],this._setRootElement(f),this._setMoveButtons(),this._setDisabledMoveButtons(),this._setMoreButtons(),this._attachClickEvent(I)},_setRootElement:function(f){if(_(f)?f=document.getElementById(f)||document.querySelector(f):f.jquery&&(f=f[0]),!s(f))throw new Error(E);this._containerElement=f},_setMoveButtons:function(){r(o,function(f){this._buttons[f]=t.createElementByTemplate(this._template.moveButton,{type:f})},this)},_setDisabledMoveButtons:function(){r(o,function(f){var d="disabled"+t.capitalizeFirstLetter(f);this._buttons[d]=t.createElementByTemplate(this._template.disabledMoveButton,{type:f})},this)},_setMoreButtons:function(){r(v,function(f){var d=f+"More";this._buttons[d]=t.createElementByTemplate(this._template.moreButton,{type:f})},this)},_getContainerElement:function(){return this._containerElement},_appendFirstButton:function(f){var d;f.page>1?d=this._buttons.first:d=this._buttons.disabledFirst,this._getContainerElement().appendChild(d)},_appendPrevButton:function(f){var d;f.currentPageIndex>1?d=this._buttons.prev:d=this._buttons.disabledPrev,this._getContainerElement().appendChild(d)},_appendNextButton:function(f){var d;f.currentPageIndex<f.lastPageListIndex?d=this._buttons.next:d=this._buttons.disabledNext,this._getContainerElement().appendChild(d)},_appendLastButton:function(f){var d;f.page<f.lastPage?d=this._buttons.last:d=this._buttons.disabledLast,this._getContainerElement().appendChild(d)},_appendPrevMoreButton:function(f){var d;f.prevMore&&(d=this._buttons.prevMore,l(d,this._firstItemClassName),this._getContainerElement().appendChild(d))},_appendNextMoreButton:function(f){var d;f.nextMore&&(d=this._buttons.nextMore,l(d,this._lastItemClassName),this._getContainerElement().appendChild(d))},_appendPages:function(f){var d=f.leftPageNumber,I=f.rightPageNumber,O,A;for(A=d;A<=I;A+=1)A===f.page?O=t.createElementByTemplate(this._template.currentPage,{page:A}):(O=t.createElementByTemplate(this._template.page,{page:A}),this._enabledPageElements.push(O)),A===d&&!f.prevMore&&l(O,this._firstItemClassName),A===I&&!f.nextMore&&l(O,this._lastItemClassName),this._getContainerElement().appendChild(O)},_attachClickEvent:function(f){var d=this._getContainerElement();p(d,"click",function(I){var O=c(I),A,R;a(I),R=this._getButtonType(O),R||(A=this._getPageNumber(O)),f(R,A)},this)},_getButtonType:function(f){var d,I=this._buttons;return r(I,function(O,A){return t.isContained(f,O)?(d=A,!1):!0},this),d},_getPageNumber:function(f){var d=this._findPageElement(f),I;return d&&(I=parseInt(d.innerText,10)),I},_findPageElement:function(f){for(var d=0,I=this._enabledPageElements.length,O;d<I;d+=1)if(O=this._enabledPageElements[d],t.isContained(f,O))return O;return null},_empty:function(){this._enabledPageElements=[],r(this._buttons,function(f,d){this._buttons[d]=f.cloneNode(!0)},this),this._getContainerElement().innerHTML=""},update:function(f){this._empty(),this._appendFirstButton(f),this._appendPrevButton(f),this._appendPrevMoreButton(f),this._appendPages(f),this._appendNextMoreButton(f),this._appendNextButton(f),this._appendLastButton(f)}});u.exports=T},function(u,m,e){function r(i){return i.target||i.srcElement}u.exports=r},function(u,m,e){var r=e(4),i=e(3),c=e(23);function p(h,_,s,t){if(r(_)){i(_.split(/\s+/g),function(n){a(h,n,s,t)});return}i(_,function(n,o){a(h,o,n,s)})}function a(h,_,s,t){function n(o){s.call(t||h,o||window.event)}"addEventListener"in h?h.addEventListener(_,n):"attachEvent"in h&&h.attachEvent("on"+_,n),l(h,_,s,n)}function l(h,_,s,t){var n=c(h,_),o=!1;i(n,function(v){return v.handler===s?(o=!0,!1):!0}),o||n.push({handler:s,wrappedHandler:t})}u.exports=p},function(u,m,e){var r="_feEventKey";function i(c,p){var a=c[r],l;return a||(a=c[r]={}),l=a[p],l||(l=a[p]=[]),l}u.exports=i},function(u,m,e){function r(i){if(i.preventDefault){i.preventDefault();return}i.returnValue=!1}u.exports=r},function(u,m,e){var r=e(3),i=e(8),c=e(26),p=e(27);function a(l){var h=Array.prototype.slice.call(arguments,1),_=l.classList,s=[],t;if(_){r(h,function(n){l.classList.add(n)});return}t=c(l),t&&(h=[].concat(t.split(/\s+/),h)),r(h,function(n){i(n,s)<0&&s.push(n)}),p(l,s)}u.exports=a},function(u,m,e){var r=e(1);function i(c){return!c||!c.className?"":r(c.className.baseVal)?c.className:c.className.baseVal}u.exports=i},function(u,m,e){var r=e(2),i=e(1);function c(p,a){if(a=r(a)?a.join(" "):a,a=a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),i(p.className.baseVal)){p.className=a;return}p.className.baseVal=a}u.exports=c},function(u,m,e){function r(i){return typeof HTMLElement=="object"?i&&(i instanceof HTMLElement||!!i.nodeType):!!(i&&i.nodeType)}u.exports=r},function(u,m,e){var r=e(8),i=e(3),c=e(2),p=e(4),a=e(0),l=/{{\s?|\s?}}/g,h=/^[a-zA-Z0-9_@]+\[[a-zA-Z0-9_@"']+\]$/,_=/\[\s?|\s?\]/,s=/^[a-zA-Z_]+\.[a-zA-Z_]+$/,t=/\./,n=/^["']\w+["']$/,o=/"|'/g,v=/^-?\d+\.?\d*$/,E=2,T={if:A,each:R,with:it},f="a".split(/a/).length===3,d=function(){return f?function(g,y){return g.split(y)}:function(g,y){var x=[],P=0,b,M;for(y.global||(y=new RegExp(y,"g")),b=y.exec(g);b!==null;)M=b.index,x.push(g.slice(P,M)),P=M+b[0].length,b=y.exec(g);return x.push(g.slice(P)),x}}();function I(g,y){var x,P=y[g];return g==="true"?P=!0:g==="false"?P=!1:n.test(g)?P=g.replace(o,""):h.test(g)?(x=g.split(_),P=I(x[0],y)[I(x[1],y)]):s.test(g)?(x=g.split(t),P=I(x[0],y)[x[1]]):v.test(g)&&(P=parseFloat(g)),P}function O(g,y){var x=[g],P=[],b=0,M=0;return i(y,function(B,S){B.indexOf("if")===0?b+=1:B==="/if"?b-=1:!b&&(B.indexOf("elseif")===0||B==="else")&&(x.push(B==="else"?["true"]:B.split(" ").slice(1)),P.push(y.slice(M,S)),M=S+1)}),P.push(y.slice(M)),{exps:x,sourcesInsideIf:P}}function A(g,y,x){var P=O(g,y),b=!1,M="";return i(P.exps,function(B,S){return b=$(B,x),b&&(M=F(P.sourcesInsideIf[S],x)),!b}),M}function R(g,y,x){var P=$(g,x),b=c(P)?"@index":"@key",M={},B="";return i(P,function(S,H){M[b]=H,M["@this"]=S,a(x,M),B+=F(y.slice(),x)}),B}function it(g,y,x){var P=r("as",g),b=g[P+1],M=$(g.slice(0,P),x),B={};return B[b]=M,F(y,a(x,B))||""}function rt(g,y,x){var P=g.splice(y+1,x-y);return P.pop(),P}function st(g,y,x){for(var P=T[g],b=1,M=0,B,S=M+E,H=y[S];b&&p(H);)H.indexOf(g)===0?b+=1:H.indexOf("/"+g)===0&&(b-=1,B=S),S+=E,H=y[S];if(b)throw Error(g+" needs {{/"+g+"}} expression.");return y[M]=P(y[M].split(" ").slice(1),rt(y,M,B),x),y}function $(g,y){var x=I(g[0],y);return x instanceof Function?at(x,g.slice(1),y):x}function at(g,y,x){var P=[];return i(y,function(b){P.push(I(b,x))}),g.apply(null,P)}function F(g,y){for(var x=1,P=g[x],b,M,B;p(P);)b=P.split(" "),M=b[0],T[M]?(B=st(M,g.splice(x,g.length-x),y),g=g.concat(B)):g[x]=$(b,y),x+=E,P=g[x];return g.join("")}function ot(g,y){return F(d(g,l),y)}u.exports=ot},function(u,m,e){var r=e(1),i=e(31),c=7*24*60*60*1e3;function p(l){var h=new Date().getTime();return h-l>c}function a(l,h){var _="https://www.google-analytics.com/collect",s=location.hostname,t="event",n="use",o="TOAST UI "+l+" for "+s+": Statistics",v=window.localStorage.getItem(o);!r(window.tui)&&window.tui.usageStatistics===!1||v&&!p(v)||(window.localStorage.setItem(o,new Date().getTime()),setTimeout(function(){(document.readyState==="interactive"||document.readyState==="complete")&&i(_,{v:1,t,tid:h,cid:s,dp:s,dh:l,el:l,ec:n})},1e3))}u.exports=a},function(u,m,e){var r=e(6);function i(c,p){var a=document.createElement("img"),l="";return r(p,function(h,_){l+="&"+_+"="+h}),l=l.substring(1),a.src=c+"?"+l,a.style.display="none",document.body.appendChild(a),document.body.removeChild(a),a}u.exports=i}])})})(ct);const Y=ut(U),{API_KEY:k,BASIC_URL:V,search_films:pt,trending_week:Q,new_films:vt}=lt,J=document.querySelector(".search-form"),w=document.querySelector(".gallery"),j=document.querySelector(".tui-pagination");let G,K,N={primary_release_year:"",year:"",query:"",page:1},Z;J.addEventListener("submit",dt);async function ht(){let C=`${V}${Q}?api_key2=${k}`;return N.query&&(C=`${V}${pt}?api_key=${k}&query=${N.query}&page=${N.page}`),await(await fetch(C)).json()}async function X(C){let L="";for(const u of C){const{title:m,id:e,poster_path:r,release_date:i,overview:c,vote_average:p}=u,a=await ft(e);L+=`<li class="movie-card open-modal" data-movie-id="${e}">
         <div class="gradient"></div>
         <img class="movie-img" src="https://image.tmdb.org/t/p/original/${r}" alt="${c}" loading="lazy" />
         <div class="info">
        <div class="name-and-discr">
         <p class="movie-title">
         ${m}
         </p>
         <p class="movie-description">
         ${a} | ${i.slice(0,4)}
         </p></div>
         <div class="rating-body stars">
      <div class="rating-active" style="width:${p*10}%"></div>
    </div>
  </div>
         </li>`}return w.innerHTML=L}function dt(C){C.preventDefault();const L=J.elements.searchQuery.value;if(K=L,C.target.reset(),w.innerHTML="",L.trim()===""){const u=`<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     We don’t have any results matching your search.</p>`;w.innerHTML=u,j.classList.add("visually-hidden");return}j.classList.remove("visually-hidden"),N.query=K,N.page=1,xt()}async function q(){try{const C={...nt,totalItems:G};new Y(et,C).on("afterMove",u=>{const m=u.page;N.page=m,tt(m),z(m)}),z(W)}catch(C){console.log(C)}}function z(C){document.querySelectorAll(".tui-page-btn").forEach(u=>{u.textContent==C?u.classList.add("tui-is-selected"):u.classList.remove("tui-is-selected")})}let W=1,D=[];async function tt(C){try{N.page=C;const u=await(await fetch(`${V}${vt}?api_key=${k}&query=${N.query}&include_adult=false&primary_release_year=${N.primary_release_year}&page=${C}&region=&year=${N.year}`)).json();D=u.results;const m=X(D);G=u.total_results,z(W)}catch(L){console.log(L)}}const et=document.getElementById("pagination"),gt=G,mt=20,yt=4,nt={totalItems:gt,itemsPerPage:mt,visiblePages:yt,centerAlign:!0,template:{page:'<a href="#" class="tui-page-btn">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}}"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip"><span class="tui-ico-ellip">...</span></a>'}};new Y(et,nt);async function xt(){try{const C=await ht();if(Z=C.total_results||0,Z===0){const u=`<p class="oops-text">OOPS...<br>
        We are very sorry!<br>
        We don’t have any results matching your search.</p>`;w.innerHTML=u,j.classList.add("visually-hidden");return}const L=X(C.results);N.query||tt(W),q()}catch(C){console.log(C)}}window.addEventListener("DOMContentLoaded",()=>{Pt()});async function Pt(){try{const L=await(await fetch(`${V}${Q}?api_key=${k}`)).json();D=L.results;const u=X(D);G=L.total_results,q()}catch{const L=`<p class="oops-text">OOPS...<br>
     We are very sorry!<br>
     Something went wrong!</p>`;w.innerHTML=L,j.classList.add("visually-hidden");return}}
