/*
 FlexSearch v0.6.0
 Copyright 2019 Nextapps GmbH
 Author: Thomas Wilkerling
 Released under the Apache 2.0 Licence
 https://github.com/nextapps-de/flexsearch
*/
'use strict';(function(e,z,t){let k;(k=t.define)&&k.amd?k([],function(){return z}):(k=t.modules)?k[e.toLowerCase()]=z:"object"===typeof exports?module.exports=z:t[e]=z})("FlexSearch",function(){function e(a,c){const b=c?c.id:a&&a.id;this.id=b||0===b?b:L++;this.init(a,c);t(this,"index",function(){return Object.keys(this.b)});t(this,"length",function(){return this.index.length})}function z(a,c){const b=a.length,f=A(c),d=[];for(let l=0,g=0;l<b;l++){const b=a[l];if(f&&c(b)||!f&&!c[b])d[g++]=b}return d}
function t(a,c,b){Object.defineProperty(a,c,{get:b})}function k(a,c){for(let b=0;b<c.length;b+=2)a=a.replace(c[b],c[b+1]);return a}function B(a,c,b,f,d,l,g,h){if(c[b])return c[b];d=d?(h-(g||h/1.5))*l+(g||h/1.5)*d:l;c[b]=d;d>=g&&(a=a[h-(d+.5>>0)],a=a[b]||(a[b]=[]),a[a.length]=f);return d}function E(a,c){if(a){const b=Object.keys(a);for(let f=0,d=b.length;f<d;f++){const d=b[f],g=a[d];if(g)for(let b=0,f=g.length;b<f;b++)if(g[b]===c){1===f?delete a[d]:g.splice(b,1);break}else"object"===typeof g[b]&&E(g[b],
c)}}}function M(a,c){a=a.length-c.length;return 0>a?1:a?-1:0}function F(a,c,b){return a?{page:a,next:c?""+c:null,result:b}:b}function C(a){return"string"===typeof a}function A(a){return"function"===typeof a}function D(a){return"undefined"===typeof a}function H(a){const c=Array(a);for(let b=0;b<a;b++)c[b]=y();return c}function y(){return Object.create(null)}const v={encode:"icase",c:"forward",cache:!1,async:!1,m:!1,i:!1,l:!1,a:9,threshold:0,depth:0},G=[];let L=0;const I=/\W+/,J={},K={};e.create=function(a){return new e(a)};
e.registerMatcher=function(a){for(const c in a)a.hasOwnProperty(c)&&G.push(new RegExp(c,"g"),a[c]);return this};e.registerEncoder=function(a,c){w[a]=c.bind(w);return this};e.registerLanguage=function(a,c){J[a]=c.filter;K[a]=c.stemmer;return this};e.encode=function(a,c){return w[a](c)};e.prototype.init=function(a,c){this.j=[];if(c){var b=c.preset;a=c}else a||(a=v),b=a.preset;c={};this.c=a.tokenize||c.c||this.c||v.c;this.i=a.rtl||this.i||v.i;this.threshold=D(b=a.threshold)?c.threshold||this.threshold||
v.threshold:b;this.a=D(b=a.resolution)?b=c.a||this.a||v.a:b;b<=this.threshold&&(this.a=this.threshold+1);this.depth="strict"!==this.c||D(b=a.depth)?c.depth||this.depth||v.depth:b;this.g=(b=D(b=a.encode)?c.encode||v.encode:b)&&w[b]&&w[b].bind(w)||(A(b)?b:this.g||!1);(b=a.matcher)&&this.addMatcher(b);if(b=a.filter){C(b)&&(b=J[b]);if(b.constructor===Array){c=this.g;var f=y();for(let a=0;a<b.length;a++){const d=c?c(b[a]):b[a];f[d]=1}b=f}this.filter=b}if(b=a.stemmer){var d;a=C(b)?K[b]:b;b=this.g;c=[];
for(d in a)a.hasOwnProperty(d)&&(f=b?b(d):d,c.push(new RegExp(f+"($|\\W)","g"),b?b(a[d]):a[d]));this.stemmer=d=c}this.h=H(this.a-(this.threshold||0));this.f=y();this.b=y();return this};e.prototype.encode=function(a){a&&G.length&&(a=k(a,G));a&&this.j.length&&(a=k(a,this.j));a&&this.g&&(a=this.g(a));a&&this.stemmer&&(a=k(a,this.stemmer));return a};e.prototype.addMatcher=function(a){const c=this.j;for(const b in a)a.hasOwnProperty(b)&&c.push(new RegExp(b,"g"),a[b]);return this};e.prototype.add=function(a,
c,b,f,d){if(c&&C(c)&&(a||0===a)){const e="@"+a;if(this.b[e]&&!f)return this.update(a,c);if(!d&&b)return this.add(a,c,null,f,!0),b(),this;c=this.encode(c);if(!c.length)return this;b=this.c;c=A(b)?b(c):c.split(I);this.filter&&(c=z(c,this.filter));f=y();f._ctx=y();d=c.length;const q=this.threshold,k=this.depth,p=this.a,r=this.h,u=this.i;for(let e=0;e<d;e++){var l=c[e];if(l){var g=l.length,h=(u?e+1:d-e)/d,n="";switch(b){case "reverse":case "both":for(var m=g;--m;)n=l[m]+n,B(r,f,n,a,u?1:(g-m)/g,h,q,p-
1);n="";case "forward":for(m=0;m<g;m++)n+=l[m],B(r,f,n,a,u?(m+1)/g:1,h,q,p-1);break;case "full":for(m=0;m<g;m++){const b=(u?m+1:g-m)/g;for(let c=g;c>m;c--)n=l.substring(m,c),B(r,f,n,a,b,h,q,p-1)}break;default:if(g=B(r,f,l,a,1,h,q,p-1),k&&1<d&&g>=q)for(g=f._ctx[l]||(f._ctx[l]=y()),l=this.f[l]||(this.f[l]=H(p-(q||0))),h=e-k,n=e+k+1,0>h&&(h=0),n>d&&(n=d);h<n;h++)h!==e&&B(l,g,c[h],a,0,p-(h<e?e-h:h-e),q,p-1)}}}this.b[e]=1}return this};e.prototype.update=function(a,c,b){this.b["@"+a]&&C(c)&&(this.remove(a),
this.add(a,c,b,!0));return this};e.prototype.remove=function(a,c,b){const f="@"+a;if(this.b[f]){if(!b&&c)return this.remove(a,null,!0),c(),this;for(c=0;c<this.a-(this.threshold||0);c++)E(this.h[c],a);this.depth&&E(this.f,a);delete this.b[f]}return this};e.prototype.search=function(a,c,b,f){var d=[],e=a;if("object"===typeof a){var g=!1;c=a.limit;var h=a.threshold;a=a.query}h||(h=this.threshold||0);A(c)?(b=c,c=1E3):c||0===c||(c=1E3);if(!f&&b)return b(this.search(e,c,null,!0)),this;if(!a||!C(a))return d;
e=this.encode(a);if(!e.length)return d;a=this.c;a=A(a)?a(e):e.split(I);this.filter&&(a=z(a,this.filter));b=a.length;f=!0;e=[];var n=y();if(1<b)if(this.depth){var m=!0;var k=a[0];n[k]=1}else a.sort(M);var q;if(!m||(q=this.f)[k]){var v=this.a;for(var p=m?1:0;p<b;p++){var r=a[p];if(r){if(!n[r]){var u=[],t=!1,w=0;if(k=m?q[k]:this.h){let a;for(let b=0;b<v-h;b++)if(a=k[b][r])u[w++]=a,t=!0}if(t)e[e.length]=1<w?u.concat.apply([],u):u[0];else{f=!1;break}n[r]=1}k=r}}}else f=!1;if(f)a:{let l;d=[];m=e.length;
!0===g?(g="0",h=""):h=g&&g.split(":");if(1<m){q=y();a=-1;r=!0;n=0;for(h&&(2===h.length?h=!1:h=parseInt(h[0],10));++a<m;){v=a===m-1;k=e[a];f=k.length;if(!f){d=F(g,l,k);break a}if(r)if(x){p=x.length;for(b=0;b<p;)q["@"+x[b++]]=1;var x=null;r=!1}else{x=k;continue}u=!1;for(b=0;b<f;)if(p=k[b++],t="@"+p,(w=q[t])&&w===a){if(v){if(!h||--h<n)if(d[n++]=p,c&&n===c){d=F(g,n,d);break a}}else q[t]=a+1;u=!0}if(!u)break}x&&(d=x)}else m&&(d=e[0]);c&&(x=g?parseInt(g,10):0,l=x+c,l<d.length?d=d.slice(x,l):x&&(d=d.slice(x)));
d=F(g,l,d)}return d};e.prototype.clear=function(){return this.destroy().init()};e.prototype.destroy=function(){this.h=this.f=this.b=null;return this};const w={icase:function(a){return a.toLowerCase()}};return e}(!1),this);
