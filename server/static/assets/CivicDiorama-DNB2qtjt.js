const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/webgl-device-eVK2MGsb.js","assets/jsx-runtime-B-hcVAMW.js","assets/array-utils-flat-kP123l4H.js","assets/get-attribute-from-layouts-D6gYEnZ5.js","assets/webgl-Cdg9BZKX.js","assets/gpu-data-evaluator-zPbh17W2.js","assets/buffer-transform-Cn8FxrWo.js","assets/webgpu-liUQlMhj.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,r,t as i}from"./jsx-runtime-B-hcVAMW.js";import{d as a,i as o,o as s,s as c,t as l}from"./cityCamera-DZ_reLdS.js";import{gt as u}from"./index-BVz2zxzb.js";import{a as d,b as f,g as p,i as m,n as h,t as g,v as _}from"./gpu-data-evaluator-zPbh17W2.js";import{S as v,_ as y,b,h as x,p as S,x as C}from"./array-utils-flat-kP123l4H.js";import{a as w,c as T,i as E,o as D,r as O,s as k,t as A}from"./webgl-device-eVK2MGsb.js";import{l as j}from"./get-attribute-from-layouts-D6gYEnZ5.js";import{n as M,r as N,t as ee}from"./buffer-transform-Cn8FxrWo.js";import{n as te}from"./webgpu-liUQlMhj.js";var ne=`set luma.log.level=1 (or higher) to trace rendering`,re="No matching device found. Ensure `@luma.gl/webgl` and/or `@luma.gl/webgpu` modules are imported.",ie=new class e{static defaultProps={...T,type:`best-available`,adapters:void 0,waitForPageLoad:!0};stats=D;log=b;VERSION=`9.4.2`;spector;preregisteredAdapters=new Map;constructor(){if(globalThis.luma){if(globalThis.luma.VERSION!==this.VERSION)throw b.error(`Found luma.gl ${globalThis.luma.VERSION} while initialzing ${this.VERSION}`)(),b.error(`'yarn why @luma.gl/core' can help identify the source of the conflict`)(),Error(`luma.gl - multiple versions detected: see console log`);b.error(`This version of luma.gl has already been initialized`)()}b.log(1,`${this.VERSION} - ${ne}`)(),globalThis.luma=this}async createDevice(t={}){let n={...e.defaultProps,...t},r=this.selectAdapter(n.type,n.adapters);if(!r)throw Error(re);return n.waitForPageLoad&&await r.pageLoaded,await r.create(n)}async attachDevice(e,t){let n=this._getTypeFromHandle(e,t.adapters),r=n&&this.selectAdapter(n,t.adapters);if(!r)throw Error(re);return await r?.attach?.(e,t)}registerAdapters(e){for(let t of e)this.preregisteredAdapters.set(t.type,t)}getSupportedAdapters(e=[]){let t=this._getAdapterMap(e);return Array.from(t).map(([,e])=>e).filter(e=>e.isSupported?.()).map(e=>e.type)}getBestAvailableAdapterType(e=[]){let t=[`webgpu`,`webgl`,`null`],n=this._getAdapterMap(e);for(let e of t)if(n.get(e)?.isSupported?.())return e;return null}selectAdapter(e,t=[]){let n=e;e===`best-available`&&(n=this.getBestAvailableAdapterType(t));let r=this._getAdapterMap(t);return n&&r.get(n)||null}enforceWebGL2(e=!0,t=[]){let n=this._getAdapterMap(t).get(`webgl`);n||b.warn(`enforceWebGL2: webgl adapter not found`)(),n?.enforceWebGL2?.(e)}setDefaultDeviceProps(t){Object.assign(e.defaultProps,t)}_getAdapterMap(e=[]){let t=new Map(this.preregisteredAdapters);for(let n of e)t.set(n.type,n);return t}_getTypeFromHandle(e,t=[]){return e instanceof WebGL2RenderingContext?`webgl`:typeof GPUDevice<`u`&&e instanceof GPUDevice||e?.queue?`webgpu`:e===null?`null`:(e instanceof WebGLRenderingContext?b.warn(`WebGL1 is not supported`,e)():b.warn(`Unknown handle type`,e)(),null)}},P=class{get pageLoaded(){return ce()}},ae=v()&&typeof document<`u`,oe=()=>ae&&document.readyState===`complete`,se=null;function ce(){return se||=oe()||typeof window>`u`?Promise.resolve():new Promise(e=>window.addEventListener(`load`,()=>e())),se}1/Math.PI*180,1/180*Math.PI,globalThis.mathgl=globalThis.mathgl||{config:{EPSILON:1e-12,debug:!1,precision:4,printTypes:!1,printDegrees:!1,printRowMajor:!0,_cartographicRadians:!1}};var F=globalThis.mathgl.config;function le(e,{precision:t=F.precision}={}){return e=pe(e),`${parseFloat(e.toPrecision(t))}`}function ue(e){return Array.isArray(e)||ArrayBuffer.isView(e)&&!(e instanceof DataView)}function I(e,t,n){return he(e,e=>Math.max(t,Math.min(n,e)))}function de(e,t,n){return ue(e)?e.map((e,r)=>de(e,t[r],n)):n*t+(1-n)*e}function fe(e,t,n){let r=F.EPSILON;n&&(F.EPSILON=n);try{if(e===t)return!0;if(ue(e)&&ue(t)){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(!fe(e[n],t[n]))return!1;return!0}return e&&e.equals?e.equals(t):t&&t.equals?t.equals(e):typeof e==`number`&&typeof t==`number`&&Math.abs(e-t)<=F.EPSILON*Math.max(1,Math.abs(e),Math.abs(t))}finally{F.EPSILON=r}}function pe(e){return Math.round(e/F.EPSILON)*F.EPSILON}function me(e){return e.clone?e.clone():Array(e.length)}function he(e,t,n){if(ue(e)){let r=e;n||=me(r);for(let i=0;i<n.length&&i<r.length;++i){let r=typeof e==`number`?e:e[i];n[i]=t(r,i,n)}return n}return t(e)}var ge=class extends Array{clone(){return new this.constructor().copy(this)}fromArray(e,t=0){for(let n=0;n<this.ELEMENTS;++n)this[n]=e[n+t];return this.check()}toArray(e=[],t=0){for(let n=0;n<this.ELEMENTS;++n)e[t+n]=this[n];return e}toObject(e){return e}from(e){return Array.isArray(e)?this.copy(e):this.fromObject(e)}to(e){return e===this?this:ue(e)?this.toArray(e):this.toObject(e)}toTarget(e){return e?this.to(e):this}toFloat32Array(){return new Float32Array(this)}toString(){return this.formatString(F)}formatString(e){let t=``;for(let n=0;n<this.ELEMENTS;++n)t+=(n>0?`, `:``)+le(this[n],e);return`${e.printTypes?this.constructor.name:``}[${t}]`}equals(e){if(!e||this.length!==e.length)return!1;for(let t=0;t<this.ELEMENTS;++t)if(!fe(this[t],e[t]))return!1;return!0}exactEquals(e){if(!e||this.length!==e.length)return!1;for(let t=0;t<this.ELEMENTS;++t)if(this[t]!==e[t])return!1;return!0}negate(){for(let e=0;e<this.ELEMENTS;++e)this[e]=-this[e];return this.check()}lerp(e,t,n){if(n===void 0)return this.lerp(this,e,t);for(let r=0;r<this.ELEMENTS;++r){let i=e[r],a=typeof t==`number`?t:t[r];this[r]=i+n*(a-i)}return this.check()}min(e){for(let t=0;t<this.ELEMENTS;++t)this[t]=Math.min(e[t],this[t]);return this.check()}max(e){for(let t=0;t<this.ELEMENTS;++t)this[t]=Math.max(e[t],this[t]);return this.check()}clamp(e,t){for(let n=0;n<this.ELEMENTS;++n)this[n]=Math.min(Math.max(this[n],e[n]),t[n]);return this.check()}add(...e){for(let t of e)for(let e=0;e<this.ELEMENTS;++e)this[e]+=t[e];return this.check()}subtract(...e){for(let t of e)for(let e=0;e<this.ELEMENTS;++e)this[e]-=t[e];return this.check()}scale(e){if(typeof e==`number`)for(let t=0;t<this.ELEMENTS;++t)this[t]*=e;else for(let t=0;t<this.ELEMENTS&&t<e.length;++t)this[t]*=e[t];return this.check()}multiplyByScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]*=e;return this.check()}check(){if(F.debug&&!this.validate())throw Error(`math.gl: ${this.constructor.name} some fields set to invalid numbers'`);return this}validate(){let e=this.length===this.ELEMENTS;for(let t=0;t<this.ELEMENTS;++t)e&&=Number.isFinite(this[t]);return e}sub(e){return this.subtract(e)}setScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]=e;return this.check()}addScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]+=e;return this.check()}subScalar(e){return this.addScalar(-e)}multiplyScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]*=e;return this.check()}divideScalar(e){return this.multiplyByScalar(1/e)}clampScalar(e,t){for(let n=0;n<this.ELEMENTS;++n)this[n]=Math.min(Math.max(this[n],e),t);return this.check()}get elements(){return this}};function _e(e,t){if(e.length!==t)return!1;for(let t=0;t<e.length;++t)if(!Number.isFinite(e[t]))return!1;return!0}function L(e){if(!Number.isFinite(e))throw Error(`Invalid number ${JSON.stringify(e)}`);return e}function ve(e,t,n=``){if(F.debug&&!_e(e,t))throw Error(`math.gl: ${n} some fields set to invalid numbers'`);return e}function ye(e,t){if(!e)throw Error(`math.gl assertion ${t}`)}var be=class extends ge{get x(){return this[0]}set x(e){this[0]=L(e)}get y(){return this[1]}set y(e){this[1]=L(e)}len(){return Math.sqrt(this.lengthSquared())}magnitude(){return this.len()}lengthSquared(){let e=0;for(let t=0;t<this.ELEMENTS;++t)e+=this[t]*this[t];return e}magnitudeSquared(){return this.lengthSquared()}distance(e){return Math.sqrt(this.distanceSquared(e))}distanceSquared(e){let t=0;for(let n=0;n<this.ELEMENTS;++n){let r=this[n]-e[n];t+=r*r}return L(t)}dot(e){let t=0;for(let n=0;n<this.ELEMENTS;++n)t+=this[n]*e[n];return L(t)}normalize(){let e=this.magnitude();if(e!==0)for(let t=0;t<this.ELEMENTS;++t)this[t]/=e;return this.check()}multiply(...e){for(let t of e)for(let e=0;e<this.ELEMENTS;++e)this[e]*=t[e];return this.check()}divide(...e){for(let t of e)for(let e=0;e<this.ELEMENTS;++e)this[e]/=t[e];return this.check()}lengthSq(){return this.lengthSquared()}distanceTo(e){return this.distance(e)}distanceToSquared(e){return this.distanceSquared(e)}getComponent(e){return ye(e>=0&&e<this.ELEMENTS,`index is out of range`),L(this[e])}setComponent(e,t){return ye(e>=0&&e<this.ELEMENTS,`index is out of range`),this[e]=t,this.check()}addVectors(e,t){return this.copy(e).add(t)}subVectors(e,t){return this.copy(e).subtract(t)}multiplyVectors(e,t){return this.copy(e).multiply(t)}addScaledVector(e,t){return this.add(new this.constructor(e).multiplyScalar(t))}},xe=typeof Float32Array<`u`?Float32Array:Array;Math.PI/180;function Se(){let e=new xe(2);return xe!=Float32Array&&(e[0]=0,e[1]=0),e}function Ce(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e}function we(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e}function Te(e,t){return e[0]=-t[0],e[1]=-t[1],e}function Ee(e,t,n,r){let i=t[0],a=t[1];return e[0]=i+r*(n[0]-i),e[1]=a+r*(n[1]-a),e}function De(e,t,n){let r=t[0],i=t[1];return e[0]=n[0]*r+n[4]*i+n[12],e[1]=n[1]*r+n[5]*i+n[13],e}var Oe=we;(function(){let e=Se();return function(t,n,r,i,a,o){let s,c;for(n||=2,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],a(e,e,o),t[s]=e[0],t[s+1]=e[1];return t}})();function ke(e,t,n){let r=t[0],i=t[1],a=n[3]*r+n[7]*i||1;return e[0]=(n[0]*r+n[4]*i)/a,e[1]=(n[1]*r+n[5]*i)/a,e}function Ae(e,t,n){let r=t[0],i=t[1],a=t[2],o=n[3]*r+n[7]*i+n[11]*a||1;return e[0]=(n[0]*r+n[4]*i+n[8]*a)/o,e[1]=(n[1]*r+n[5]*i+n[9]*a)/o,e[2]=(n[2]*r+n[6]*i+n[10]*a)/o,e}function je(e,t,n){let r=t[0],i=t[1];return e[0]=n[0]*r+n[2]*i,e[1]=n[1]*r+n[3]*i,e[2]=t[2],e}function Me(){let e=new xe(3);return xe!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function Ne(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e}function Pe(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e}function Fe(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function Ie(e,t,n){let r=t[0],i=t[1],a=t[2],o=n[0],s=n[1],c=n[2];return e[0]=i*c-a*s,e[1]=a*o-r*c,e[2]=r*s-i*o,e}function Le(e,t,n){let r=t[0],i=t[1],a=t[2],o=n[3]*r+n[7]*i+n[11]*a+n[15];return o||=1,e[0]=(n[0]*r+n[4]*i+n[8]*a+n[12])/o,e[1]=(n[1]*r+n[5]*i+n[9]*a+n[13])/o,e[2]=(n[2]*r+n[6]*i+n[10]*a+n[14])/o,e}function Re(e,t,n){let r=t[0],i=t[1],a=t[2];return e[0]=r*n[0]+i*n[3]+a*n[6],e[1]=r*n[1]+i*n[4]+a*n[7],e[2]=r*n[2]+i*n[5]+a*n[8],e}function ze(e,t,n){let r=n[0],i=n[1],a=n[2],o=n[3],s=t[0],c=t[1],l=t[2],u=i*l-a*c,d=a*s-r*l,f=r*c-i*s,p=i*f-a*d,m=a*u-r*f,h=r*d-i*u,g=o*2;return u*=g,d*=g,f*=g,p*=2,m*=2,h*=2,e[0]=s+u+p,e[1]=c+d+m,e[2]=l+f+h,e}function Be(e,t,n,r){let i=[],a=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],a[0]=i[0],a[1]=i[1]*Math.cos(r)-i[2]*Math.sin(r),a[2]=i[1]*Math.sin(r)+i[2]*Math.cos(r),e[0]=a[0]+n[0],e[1]=a[1]+n[1],e[2]=a[2]+n[2],e}function Ve(e,t,n,r){let i=[],a=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],a[0]=i[2]*Math.sin(r)+i[0]*Math.cos(r),a[1]=i[1],a[2]=i[2]*Math.cos(r)-i[0]*Math.sin(r),e[0]=a[0]+n[0],e[1]=a[1]+n[1],e[2]=a[2]+n[2],e}function He(e,t,n,r){let i=[],a=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],a[0]=i[0]*Math.cos(r)-i[1]*Math.sin(r),a[1]=i[0]*Math.sin(r)+i[1]*Math.cos(r),a[2]=i[2],e[0]=a[0]+n[0],e[1]=a[1]+n[1],e[2]=a[2]+n[2],e}function Ue(e,t){let n=e[0],r=e[1],i=e[2],a=t[0],o=t[1],s=t[2],c=Math.sqrt((n*n+r*r+i*i)*(a*a+o*o+s*s)),l=c&&Fe(e,t)/c;return Math.acos(Math.min(Math.max(l,-1),1))}var We=Ne;(function(){let e=Me();return function(t,n,r,i,a,o){let s,c;for(n||=3,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2];return t}})();var Ge=[0,0,0],Ke,qe=class e extends be{static get ZERO(){return Ke||(Ke=new e(0,0,0),Object.freeze(Ke)),Ke}constructor(e=0,t=0,n=0){super(-0,-0,-0),arguments.length===1&&ue(e)?this.copy(e):(F.debug&&(L(e),L(t),L(n)),this[0]=e,this[1]=t,this[2]=n)}set(e,t,n){return this[0]=e,this[1]=t,this[2]=n,this.check()}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this.check()}fromObject(e){return F.debug&&(L(e.x),L(e.y),L(e.z)),this[0]=e.x,this[1]=e.y,this[2]=e.z,this.check()}toObject(e){return e.x=this[0],e.y=this[1],e.z=this[2],e}get ELEMENTS(){return 3}get z(){return this[2]}set z(e){this[2]=L(e)}angle(e){return Ue(this,e)}cross(e){return Ie(this,this,e),this.check()}rotateX({radians:e,origin:t=Ge}){return Be(this,this,t,e),this.check()}rotateY({radians:e,origin:t=Ge}){return Ve(this,this,t,e),this.check()}rotateZ({radians:e,origin:t=Ge}){return He(this,this,t,e),this.check()}transform(e){return this.transformAsPoint(e)}transformAsPoint(e){return Le(this,this,e),this.check()}transformAsVector(e){return Ae(this,this,e),this.check()}transformByMatrix3(e){return Re(this,this,e),this.check()}transformByMatrix2(e){return je(this,this,e),this.check()}transformByQuaternion(e){return ze(this,this,e),this.check()}},Je=class extends ge{toString(){let e=`[`;if(F.printRowMajor){e+=`row-major:`;for(let t=0;t<this.RANK;++t)for(let n=0;n<this.RANK;++n)e+=` ${this[n*this.RANK+t]}`}else{e+=`column-major:`;for(let t=0;t<this.ELEMENTS;++t)e+=` ${this[t]}`}return e+=`]`,e}getElementIndex(e,t){return t*this.RANK+e}getElement(e,t){return this[t*this.RANK+e]}setElement(e,t,n){return this[t*this.RANK+e]=L(n),this}getColumn(e,t=Array(this.RANK).fill(-0)){let n=e*this.RANK;for(let e=0;e<this.RANK;++e)t[e]=this[n+e];return t}setColumn(e,t){let n=e*this.RANK;for(let e=0;e<this.RANK;++e)this[n+e]=t[e];return this}};function Ye(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Xe(e,t){if(e===t){let n=t[1],r=t[2],i=t[3],a=t[6],o=t[7],s=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=n,e[6]=t[9],e[7]=t[13],e[8]=r,e[9]=a,e[11]=t[14],e[12]=i,e[13]=o,e[14]=s}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e}function Ze(e,t){let n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=n*s-r*o,y=n*c-i*o,b=n*l-a*o,x=r*c-i*s,S=r*l-a*s,C=i*l-a*c,w=u*h-d*m,T=u*g-f*m,E=u*_-p*m,D=d*g-f*h,O=d*_-p*h,k=f*_-p*g,A=v*k-y*O+b*D+x*E-S*T+C*w;return A?(A=1/A,e[0]=(s*k-c*O+l*D)*A,e[1]=(i*O-r*k-a*D)*A,e[2]=(h*C-g*S+_*x)*A,e[3]=(f*S-d*C-p*x)*A,e[4]=(c*E-o*k-l*T)*A,e[5]=(n*k-i*E+a*T)*A,e[6]=(g*b-m*C-_*y)*A,e[7]=(u*C-f*b+p*y)*A,e[8]=(o*O-s*E+l*w)*A,e[9]=(r*E-n*O-a*w)*A,e[10]=(m*S-h*b+_*v)*A,e[11]=(d*b-u*S-p*v)*A,e[12]=(s*T-o*D-c*w)*A,e[13]=(n*D-r*T+i*w)*A,e[14]=(h*y-m*x-g*v)*A,e[15]=(u*x-d*y+f*v)*A,e):null}function Qe(e){let t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=n*s-r*o,b=l*m-u*p,x=l*h-d*p,S=u*h-d*m,C=t*S-n*x+r*b,w=a*S-o*x+s*b,T=l*y-u*v+d*_,E=p*y-m*v+h*_;return c*C-i*w+g*T-f*E}function $e(e,t,n){let r=t[0],i=t[1],a=t[2],o=t[3],s=t[4],c=t[5],l=t[6],u=t[7],d=t[8],f=t[9],p=t[10],m=t[11],h=t[12],g=t[13],_=t[14],v=t[15],y=n[0],b=n[1],x=n[2],S=n[3];return e[0]=y*r+b*s+x*d+S*h,e[1]=y*i+b*c+x*f+S*g,e[2]=y*a+b*l+x*p+S*_,e[3]=y*o+b*u+x*m+S*v,y=n[4],b=n[5],x=n[6],S=n[7],e[4]=y*r+b*s+x*d+S*h,e[5]=y*i+b*c+x*f+S*g,e[6]=y*a+b*l+x*p+S*_,e[7]=y*o+b*u+x*m+S*v,y=n[8],b=n[9],x=n[10],S=n[11],e[8]=y*r+b*s+x*d+S*h,e[9]=y*i+b*c+x*f+S*g,e[10]=y*a+b*l+x*p+S*_,e[11]=y*o+b*u+x*m+S*v,y=n[12],b=n[13],x=n[14],S=n[15],e[12]=y*r+b*s+x*d+S*h,e[13]=y*i+b*c+x*f+S*g,e[14]=y*a+b*l+x*p+S*_,e[15]=y*o+b*u+x*m+S*v,e}function et(e,t,n){let r=n[0],i=n[1],a=n[2],o,s,c,l,u,d,f,p,m,h,g,_;return t===e?(e[12]=t[0]*r+t[4]*i+t[8]*a+t[12],e[13]=t[1]*r+t[5]*i+t[9]*a+t[13],e[14]=t[2]*r+t[6]*i+t[10]*a+t[14],e[15]=t[3]*r+t[7]*i+t[11]*a+t[15]):(o=t[0],s=t[1],c=t[2],l=t[3],u=t[4],d=t[5],f=t[6],p=t[7],m=t[8],h=t[9],g=t[10],_=t[11],e[0]=o,e[1]=s,e[2]=c,e[3]=l,e[4]=u,e[5]=d,e[6]=f,e[7]=p,e[8]=m,e[9]=h,e[10]=g,e[11]=_,e[12]=o*r+u*i+m*a+t[12],e[13]=s*r+d*i+h*a+t[13],e[14]=c*r+f*i+g*a+t[14],e[15]=l*r+p*i+_*a+t[15]),e}function tt(e,t,n){let r=n[0],i=n[1],a=n[2];return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e[8]=t[8]*a,e[9]=t[9]*a,e[10]=t[10]*a,e[11]=t[11]*a,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function nt(e,t,n,r){let i=r[0],a=r[1],o=r[2],s=Math.sqrt(i*i+a*a+o*o),c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j;return s<1e-6?null:(s=1/s,i*=s,a*=s,o*=s,l=Math.sin(n),c=Math.cos(n),u=1-c,d=t[0],f=t[1],p=t[2],m=t[3],h=t[4],g=t[5],_=t[6],v=t[7],y=t[8],b=t[9],x=t[10],S=t[11],C=i*i*u+c,w=a*i*u+o*l,T=o*i*u-a*l,E=i*a*u-o*l,D=a*a*u+c,O=o*a*u+i*l,k=i*o*u+a*l,A=a*o*u-i*l,j=o*o*u+c,e[0]=d*C+h*w+y*T,e[1]=f*C+g*w+b*T,e[2]=p*C+_*w+x*T,e[3]=m*C+v*w+S*T,e[4]=d*E+h*D+y*O,e[5]=f*E+g*D+b*O,e[6]=p*E+_*D+x*O,e[7]=m*E+v*D+S*O,e[8]=d*k+h*A+y*j,e[9]=f*k+g*A+b*j,e[10]=p*k+_*A+x*j,e[11]=m*k+v*A+S*j,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e)}function rt(e,t,n){let r=Math.sin(n),i=Math.cos(n),a=t[4],o=t[5],s=t[6],c=t[7],l=t[8],u=t[9],d=t[10],f=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=a*i+l*r,e[5]=o*i+u*r,e[6]=s*i+d*r,e[7]=c*i+f*r,e[8]=l*i-a*r,e[9]=u*i-o*r,e[10]=d*i-s*r,e[11]=f*i-c*r,e}function it(e,t,n){let r=Math.sin(n),i=Math.cos(n),a=t[0],o=t[1],s=t[2],c=t[3],l=t[8],u=t[9],d=t[10],f=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*i-l*r,e[1]=o*i-u*r,e[2]=s*i-d*r,e[3]=c*i-f*r,e[8]=a*r+l*i,e[9]=o*r+u*i,e[10]=s*r+d*i,e[11]=c*r+f*i,e}function at(e,t,n){let r=Math.sin(n),i=Math.cos(n),a=t[0],o=t[1],s=t[2],c=t[3],l=t[4],u=t[5],d=t[6],f=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*i+l*r,e[1]=o*i+u*r,e[2]=s*i+d*r,e[3]=c*i+f*r,e[4]=l*i-a*r,e[5]=u*i-o*r,e[6]=d*i-s*r,e[7]=f*i-c*r,e}function ot(e,t){let n=t[0],r=t[1],i=t[2],a=t[3],o=n+n,s=r+r,c=i+i,l=n*o,u=r*o,d=r*s,f=i*o,p=i*s,m=i*c,h=a*o,g=a*s,_=a*c;return e[0]=1-d-m,e[1]=u+_,e[2]=f-g,e[3]=0,e[4]=u-_,e[5]=1-l-m,e[6]=p+h,e[7]=0,e[8]=f+g,e[9]=p-h,e[10]=1-l-d,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function st(e,t,n,r,i,a,o){let s=1/(n-t),c=1/(i-r),l=1/(a-o);return e[0]=a*2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a*2*c,e[6]=0,e[7]=0,e[8]=(n+t)*s,e[9]=(i+r)*c,e[10]=(o+a)*l,e[11]=-1,e[12]=0,e[13]=0,e[14]=o*a*2*l,e[15]=0,e}function ct(e,t,n,r,i){let a=1/Math.tan(t/2);if(e[0]=a/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,i!=null&&i!==1/0){let t=1/(r-i);e[10]=(i+r)*t,e[14]=2*i*r*t}else e[10]=-1,e[14]=-2*r;return e}var lt=ct;function ut(e,t,n,r,i,a,o){let s=1/(t-n),c=1/(r-i),l=1/(a-o);return e[0]=-2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*c,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*l,e[11]=0,e[12]=(t+n)*s,e[13]=(i+r)*c,e[14]=(o+a)*l,e[15]=1,e}var dt=ut;function ft(e,t,n,r){let i,a,o,s,c,l,u,d,f,p,m=t[0],h=t[1],g=t[2],_=r[0],v=r[1],y=r[2],b=n[0],x=n[1],S=n[2];return Math.abs(m-b)<1e-6&&Math.abs(h-x)<1e-6&&Math.abs(g-S)<1e-6?Ye(e):(d=m-b,f=h-x,p=g-S,i=1/Math.sqrt(d*d+f*f+p*p),d*=i,f*=i,p*=i,a=v*p-y*f,o=y*d-_*p,s=_*f-v*d,i=Math.sqrt(a*a+o*o+s*s),i?(i=1/i,a*=i,o*=i,s*=i):(a=0,o=0,s=0),c=f*s-p*o,l=p*a-d*s,u=d*o-f*a,i=Math.sqrt(c*c+l*l+u*u),i?(i=1/i,c*=i,l*=i,u*=i):(c=0,l=0,u=0),e[0]=a,e[1]=c,e[2]=d,e[3]=0,e[4]=o,e[5]=l,e[6]=f,e[7]=0,e[8]=s,e[9]=u,e[10]=p,e[11]=0,e[12]=-(a*m+o*h+s*g),e[13]=-(c*m+l*h+u*g),e[14]=-(d*m+f*h+p*g),e[15]=1,e)}function pt(){let e=new xe(4);return xe!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function mt(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e}function ht(e,t,n){let r=t[0],i=t[1],a=t[2],o=t[3];return e[0]=n[0]*r+n[4]*i+n[8]*a+n[12]*o,e[1]=n[1]*r+n[5]*i+n[9]*a+n[13]*o,e[2]=n[2]*r+n[6]*i+n[10]*a+n[14]*o,e[3]=n[3]*r+n[7]*i+n[11]*a+n[15]*o,e}(function(){let e=pt();return function(t,n,r,i,a,o){let s,c;for(n||=4,r||=0,c=i?Math.min(i*n+r,t.length):t.length,s=r;s<c;s+=n)e[0]=t[s],e[1]=t[s+1],e[2]=t[s+2],e[3]=t[s+3],a(e,e,o),t[s]=e[0],t[s+1]=e[1],t[s+2]=e[2],t[s+3]=e[3];return t}})();var gt;(function(e){e[e.COL0ROW0=0]=`COL0ROW0`,e[e.COL0ROW1=1]=`COL0ROW1`,e[e.COL0ROW2=2]=`COL0ROW2`,e[e.COL0ROW3=3]=`COL0ROW3`,e[e.COL1ROW0=4]=`COL1ROW0`,e[e.COL1ROW1=5]=`COL1ROW1`,e[e.COL1ROW2=6]=`COL1ROW2`,e[e.COL1ROW3=7]=`COL1ROW3`,e[e.COL2ROW0=8]=`COL2ROW0`,e[e.COL2ROW1=9]=`COL2ROW1`,e[e.COL2ROW2=10]=`COL2ROW2`,e[e.COL2ROW3=11]=`COL2ROW3`,e[e.COL3ROW0=12]=`COL3ROW0`,e[e.COL3ROW1=13]=`COL3ROW1`,e[e.COL3ROW2=14]=`COL3ROW2`,e[e.COL3ROW3=15]=`COL3ROW3`})(gt||={});var _t=45*Math.PI/180,vt=1,yt=.1,bt=500,xt=Object.freeze([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),St=class extends Je{static get IDENTITY(){return Et()}static get ZERO(){return Tt()}get ELEMENTS(){return 16}get RANK(){return 4}get INDICES(){return gt}constructor(e){super(-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0),arguments.length===1&&Array.isArray(e)?this.copy(e):this.identity()}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this[3]=e[3],this[4]=e[4],this[5]=e[5],this[6]=e[6],this[7]=e[7],this[8]=e[8],this[9]=e[9],this[10]=e[10],this[11]=e[11],this[12]=e[12],this[13]=e[13],this[14]=e[14],this[15]=e[15],this.check()}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){return this[0]=e,this[1]=t,this[2]=n,this[3]=r,this[4]=i,this[5]=a,this[6]=o,this[7]=s,this[8]=c,this[9]=l,this[10]=u,this[11]=d,this[12]=f,this[13]=p,this[14]=m,this[15]=h,this.check()}setRowMajor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){return this[0]=e,this[1]=i,this[2]=c,this[3]=f,this[4]=t,this[5]=a,this[6]=l,this[7]=p,this[8]=n,this[9]=o,this[10]=u,this[11]=m,this[12]=r,this[13]=s,this[14]=d,this[15]=h,this.check()}toRowMajor(e){return e[0]=this[0],e[1]=this[4],e[2]=this[8],e[3]=this[12],e[4]=this[1],e[5]=this[5],e[6]=this[9],e[7]=this[13],e[8]=this[2],e[9]=this[6],e[10]=this[10],e[11]=this[14],e[12]=this[3],e[13]=this[7],e[14]=this[11],e[15]=this[15],e}identity(){return this.copy(xt)}fromObject(e){return this.check()}fromQuaternion(e){return ot(this,e),this.check()}frustum(e){let{left:t,right:n,bottom:r,top:i,near:a=yt,far:o=bt}=e;return o===1/0?Ot(this,t,n,r,i,a):st(this,t,n,r,i,a,o),this.check()}lookAt(e){let{eye:t,center:n=[0,0,0],up:r=[0,1,0]}=e;return ft(this,t,n,r),this.check()}ortho(e){let{left:t,right:n,bottom:r,top:i,near:a=yt,far:o=bt}=e;return dt(this,t,n,r,i,a,o),this.check()}orthographic(e){let{fovy:t=_t,aspect:n=vt,focalDistance:r=1,near:i=yt,far:a=bt}=e;Dt(t);let o=t/2,s=r*Math.tan(o),c=s*n;return this.ortho({left:-c,right:c,bottom:-s,top:s,near:i,far:a})}perspective(e){let{fovy:t=45*Math.PI/180,aspect:n=1,near:r=.1,far:i=500}=e;return Dt(t),lt(this,t,n,r,i),this.check()}determinant(){return Qe(this)}getScale(e=[-0,-0,-0]){return e[0]=Math.sqrt(this[0]*this[0]+this[1]*this[1]+this[2]*this[2]),e[1]=Math.sqrt(this[4]*this[4]+this[5]*this[5]+this[6]*this[6]),e[2]=Math.sqrt(this[8]*this[8]+this[9]*this[9]+this[10]*this[10]),e}getTranslation(e=[-0,-0,-0]){return e[0]=this[12],e[1]=this[13],e[2]=this[14],e}getRotation(e,t){e||=[-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0],t||=[-0,-0,-0];let n=this.getScale(t),r=1/n[0],i=1/n[1],a=1/n[2];return e[0]=this[0]*r,e[1]=this[1]*i,e[2]=this[2]*a,e[3]=0,e[4]=this[4]*r,e[5]=this[5]*i,e[6]=this[6]*a,e[7]=0,e[8]=this[8]*r,e[9]=this[9]*i,e[10]=this[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}getRotationMatrix3(e,t){e||=[-0,-0,-0,-0,-0,-0,-0,-0,-0],t||=[-0,-0,-0];let n=this.getScale(t),r=1/n[0],i=1/n[1],a=1/n[2];return e[0]=this[0]*r,e[1]=this[1]*i,e[2]=this[2]*a,e[3]=this[4]*r,e[4]=this[5]*i,e[5]=this[6]*a,e[6]=this[8]*r,e[7]=this[9]*i,e[8]=this[10]*a,e}transpose(){return Xe(this,this),this.check()}invert(){return Ze(this,this),this.check()}multiplyLeft(e){return $e(this,e,this),this.check()}multiplyRight(e){return $e(this,this,e),this.check()}rotateX(e){return rt(this,this,e),this.check()}rotateY(e){return it(this,this,e),this.check()}rotateZ(e){return at(this,this,e),this.check()}rotateXYZ(e){return this.rotateX(e[0]).rotateY(e[1]).rotateZ(e[2])}rotateAxis(e,t){return nt(this,this,e,t),this.check()}scale(e){return tt(this,this,Array.isArray(e)?e:[e,e,e]),this.check()}translate(e){return et(this,this,e),this.check()}transform(e,t){return e.length===4?(t=ht(t||[-0,-0,-0,-0],e,this),ve(t,4),t):this.transformAsPoint(e,t)}transformAsPoint(e,t){let{length:n}=e,r;switch(n){case 2:r=De(t||[-0,-0],e,this);break;case 3:r=Le(t||[-0,-0,-0],e,this);break;default:throw Error(`Illegal vector`)}return ve(r,e.length),r}transformAsVector(e,t){let n;switch(e.length){case 2:n=ke(t||[-0,-0],e,this);break;case 3:n=Ae(t||[-0,-0,-0],e,this);break;default:throw Error(`Illegal vector`)}return ve(n,e.length),n}transformPoint(e,t){return this.transformAsPoint(e,t)}transformVector(e,t){return this.transformAsPoint(e,t)}transformDirection(e,t){return this.transformAsVector(e,t)}makeRotationX(e){return this.identity().rotateX(e)}makeTranslation(e,t,n){return this.identity().translate([e,t,n])}},Ct,wt;function Tt(){return Ct||(Ct=new St([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),Object.freeze(Ct)),Ct}function Et(){return wt||(wt=new St,Object.freeze(wt)),wt}function Dt(e){if(e>Math.PI*2)throw Error(`expected radians`)}function Ot(e,t,n,r,i,a){let o=2*a/(n-t),s=2*a/(i-r),c=(n+t)/(n-t),l=(i+r)/(i-r),u=-2*a;return e[0]=o,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=s,e[6]=0,e[7]=0,e[8]=c,e[9]=l,e[10]=-1,e[11]=-1,e[12]=0,e[13]=0,e[14]=u,e[15]=0,e}function kt(e,t=[],n=0){let r=Math.fround(e),i=e-r;return t[n]=r,t[n+1]=i,t}function At(e){return e-Math.fround(e)}function jt(e){let t=new Float32Array(32);for(let n=0;n<4;++n)for(let r=0;r<4;++r){let i=n*4+r;kt(e[r*4+n],t,i*2)}return t}function Mt(e,t=!0){return e??t}function Nt(e=[0,0,0],t=!0){return t?e.map(e=>e/255):[...e]}function Pt(e,t=!0){let n=Nt(e.slice(0,3),t),r=Number.isFinite(e[3]),i=r?e[3]:1;return[n[0],n[1],n[2],t&&r?i/255:i]}var Ft=`
layout(std140) uniform fp64arithmeticUniforms {
  uniform float ONE;
  uniform float SPLIT;
} fp64;

/*
About LUMA_FP64_CODE_ELIMINATION_WORKAROUND

The purpose of this workaround is to prevent shader compilers from
optimizing away necessary arithmetic operations by swapping their sequences
or transform the equation to some 'equivalent' form.

These helpers implement Dekker/Veltkamp-style error tracking. If the compiler
folds constants or reassociates the arithmetic, the high/low split can stop
tracking the rounding error correctly. That failure mode tends to look fine in
simple coordinate setup, but then breaks down inside iterative arithmetic such
as fp64 Mandelbrot loops.

The method is to multiply an artifical variable, ONE, which will be known to
the compiler to be 1 only at runtime. The whole expression is then represented
as a polynomial with respective to ONE. In the coefficients of all terms, only one a
and one b should appear

err = (a + b) * ONE^6 - a * ONE^5 - (a + b) * ONE^4 + a * ONE^3 - b - (a + b) * ONE^2 + a * ONE
*/

float prevent_fp64_optimization(float value) {
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  return value + fp64.ONE * 0.0;
#else
  return value;
#endif
}

// Divide float number to high and low floats to extend fraction bits
vec2 split(float a) {
  // Keep SPLIT as a runtime uniform so the compiler cannot fold the Dekker
  // split into a constant expression and reassociate the recovery steps.
  float split = prevent_fp64_optimization(fp64.SPLIT);
  float t = prevent_fp64_optimization(a * split);
  float temp = t - a;
  float a_hi = t - temp;
  float a_lo = a - a_hi;
  return vec2(a_hi, a_lo);
}

// Divide float number again when high float uses too many fraction bits
vec2 split2(vec2 a) {
  vec2 b = split(a.x);
  b.y += a.y;
  return b;
}

// Special sum operation when a > b
vec2 quickTwoSum(float a, float b) {
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float sum = (a + b) * fp64.ONE;
  float err = b - (sum - a) * fp64.ONE;
#else
  float sum = a + b;
  float err = b - (sum - a);
#endif
  return vec2(sum, err);
}

// General sum operation
vec2 twoSum(float a, float b) {
  float s = (a + b);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float v = (s * fp64.ONE - a) * fp64.ONE;
  float err = (a - (s - v) * fp64.ONE) * fp64.ONE * fp64.ONE * fp64.ONE + (b - v);
#else
  float v = s - a;
  float err = (a - (s - v)) + (b - v);
#endif
  return vec2(s, err);
}

vec2 twoSub(float a, float b) {
  float s = (a - b);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float v = (s * fp64.ONE - a) * fp64.ONE;
  float err = (a - (s - v) * fp64.ONE) * fp64.ONE * fp64.ONE * fp64.ONE - (b + v);
#else
  float v = s - a;
  float err = (a - (s - v)) - (b + v);
#endif
  return vec2(s, err);
}

vec2 twoSqr(float a) {
  float prod = a * a;
  vec2 a_fp64 = split(a);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float err = ((a_fp64.x * a_fp64.x - prod) * fp64.ONE + 2.0 * a_fp64.x *
    a_fp64.y * fp64.ONE * fp64.ONE) + a_fp64.y * a_fp64.y * fp64.ONE * fp64.ONE * fp64.ONE;
#else
  float err = ((a_fp64.x * a_fp64.x - prod) + 2.0 * a_fp64.x * a_fp64.y) + a_fp64.y * a_fp64.y;
#endif
  return vec2(prod, err);
}

vec2 twoProd(float a, float b) {
  float prod = a * b;
  vec2 a_fp64 = split(a);
  vec2 b_fp64 = split(b);
  // twoProd is especially sensitive because mul_fp64 and div_fp64 both depend
  // on the split terms and cross terms staying in the original evaluation
  // order. If the compiler folds or reassociates them, the low part tends to
  // collapse to zero or NaN on some drivers.
  float highProduct = prevent_fp64_optimization(a_fp64.x * b_fp64.x);
  float crossProduct1 = prevent_fp64_optimization(a_fp64.x * b_fp64.y);
  float crossProduct2 = prevent_fp64_optimization(a_fp64.y * b_fp64.x);
  float lowProduct = prevent_fp64_optimization(a_fp64.y * b_fp64.y);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float err1 = (highProduct - prod) * fp64.ONE;
  float err2 = crossProduct1 * fp64.ONE * fp64.ONE;
  float err3 = crossProduct2 * fp64.ONE * fp64.ONE * fp64.ONE;
  float err4 = lowProduct * fp64.ONE * fp64.ONE * fp64.ONE * fp64.ONE;
#else
  float err1 = highProduct - prod;
  float err2 = crossProduct1;
  float err3 = crossProduct2;
  float err4 = lowProduct;
#endif
  float err = ((err1 + err2) + err3) + err4;
  return vec2(prod, err);
}

vec2 sum_fp64(vec2 a, vec2 b) {
  vec2 s, t;
  s = twoSum(a.x, b.x);
  t = twoSum(a.y, b.y);
  s.y += t.x;
  s = quickTwoSum(s.x, s.y);
  s.y += t.y;
  s = quickTwoSum(s.x, s.y);
  return s;
}

vec2 sub_fp64(vec2 a, vec2 b) {
  vec2 s, t;
  s = twoSub(a.x, b.x);
  t = twoSub(a.y, b.y);
  s.y += t.x;
  s = quickTwoSum(s.x, s.y);
  s.y += t.y;
  s = quickTwoSum(s.x, s.y);
  return s;
}

vec2 mul_fp64(vec2 a, vec2 b) {
  vec2 prod = twoProd(a.x, b.x);
  // y component is for the error
  prod.y += a.x * b.y;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  prod.y += a.y * b.x;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  return prod;
}

vec2 div_fp64(vec2 a, vec2 b) {
  float xn = 1.0 / b.x;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  vec2 yn = mul_fp64(a, vec2(xn, 0));
#else
  vec2 yn = a * xn;
#endif
  float diff = (sub_fp64(a, mul_fp64(b, yn))).x;
  vec2 prod = twoProd(xn, diff);
  return sum_fp64(yn, prod);
}

vec2 sqrt_fp64(vec2 a) {
  if (a.x == 0.0 && a.y == 0.0) return vec2(0.0, 0.0);
  if (a.x < 0.0) return vec2(0.0 / 0.0, 0.0 / 0.0);

  float x = 1.0 / sqrt(a.x);
  float yn = a.x * x;
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  vec2 yn_sqr = twoSqr(yn) * fp64.ONE;
#else
  vec2 yn_sqr = twoSqr(yn);
#endif
  float diff = sub_fp64(a, yn_sqr).x;
  vec2 prod = twoProd(x * 0.5, diff);
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  return sum_fp64(split(yn), prod);
#else
  return sum_fp64(vec2(yn, 0.0), prod);
#endif
}
`,It={name:`fp64arithmetic`,source:`struct Fp64ArithmeticUniforms {
  ONE: f32,
  SPLIT: f32,
};

@group(0) @binding(auto) var<uniform> fp64arithmetic : Fp64ArithmeticUniforms;

#ifndef LUMA_FP64_F32_INPUT_ONLY
struct Fp64Bits {
  sign: u32,
  exponent: i32,
  significand: vec2u,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_nan(seed: f32) -> f32 {
  let nanBits = 0x7fc00000u | select(0u, 1u, seed < 0.0);
  return bitcast<f32>(nanBits);
}
#endif

fn fp64_u64_is_zero(value: vec2u) -> bool {
  return value.x == 0u && value.y == 0u;
}

fn fp64_u64_compare(a: vec2u, b: vec2u) -> i32 {
  if (a.x != b.x) {
    return select(-1, 1, a.x > b.x);
  }
  if (a.y != b.y) {
    return select(-1, 1, a.y > b.y);
  }
  return 0;
}

fn fp64_u64_add(a: vec2u, b: vec2u) -> vec2u {
  let low = a.y + b.y;
  let carry = select(0u, 1u, low < a.y);
  return vec2u(a.x + b.x + carry, low);
}

fn fp64_u64_sub(a: vec2u, b: vec2u) -> vec2u {
  let borrow = select(0u, 1u, a.y < b.y);
  return vec2u(a.x - b.x - borrow, a.y - b.y);
}

fn fp64_u64_shift_left(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }
  if (shift < 32u) {
    return vec2u((value.x << shift) | (value.y >> (32u - shift)), value.y << shift);
  }
  if (shift == 32u) {
    return vec2u(value.y, 0u);
  }
  if (shift < 64u) {
    return vec2u(value.y << (shift - 32u), 0u);
  }
  return vec2u(0u);
}

fn fp64_u64_shift_right(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }
  if (shift < 32u) {
    return vec2u(value.x >> shift, (value.y >> shift) | (value.x << (32u - shift)));
  }
  if (shift == 32u) {
    return vec2u(0u, value.x);
  }
  if (shift < 64u) {
    return vec2u(0u, value.x >> (shift - 32u));
  }
  return vec2u(0u);
}

fn fp64_u64_get_bit(value: vec2u, bitIndex: u32) -> bool {
  if (bitIndex >= 64u) {
    return false;
  }
  if (bitIndex >= 32u) {
    return ((value.x >> (bitIndex - 32u)) & 1u) != 0u;
  }
  return ((value.y >> bitIndex) & 1u) != 0u;
}

fn fp64_u64_has_bits_below(value: vec2u, bitCount: u32) -> bool {
  if (bitCount == 0u) {
    return false;
  }
  if (bitCount >= 64u) {
    return !fp64_u64_is_zero(value);
  }
  if (bitCount > 32u) {
    let highBitCount = bitCount - 32u;
    let highMask = (1u << highBitCount) - 1u;
    return value.y != 0u || (value.x & highMask) != 0u;
  }
  if (bitCount == 32u) {
    return value.y != 0u;
  }
  let lowMask = (1u << bitCount) - 1u;
  return (value.y & lowMask) != 0u;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_u64_shift_right_sticky(value: vec2u, shift: u32) -> vec2u {
  var shifted = fp64_u64_shift_right(value, shift);
  if (fp64_u64_has_bits_below(value, shift)) {
    shifted.y = shifted.y | 1u;
  }
  return shifted;
}
#endif

fn fp64_u64_count_leading_zeros(value: vec2u) -> u32 {
  if (value.x != 0u) {
    return countLeadingZeros(value.x);
  }
  return 32u + countLeadingZeros(value.y);
}

fn fp64_round_shift_right_to_u32(value: vec2u, shift: u32) -> u32 {
  if (shift == 0u) {
    return value.y;
  }

  let truncated = fp64_u64_shift_right(value, shift);
  var rounded = truncated.y;
  let guard = fp64_u64_get_bit(value, shift - 1u);
  let hasTrailingBits = fp64_u64_has_bits_below(value, shift - 1u);
  if (guard && (hasTrailingBits || (rounded & 1u) == 1u)) {
    rounded = rounded + 1u;
  }
  return rounded;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_round_shift_right(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }

  var rounded = fp64_u64_shift_right(value, shift);
  let guard = fp64_u64_get_bit(value, shift - 1u);
  let hasTrailingBits = fp64_u64_has_bits_below(value, shift - 1u);
  if (guard && (hasTrailingBits || (rounded.y & 1u) == 1u)) {
    rounded = fp64_u64_add(rounded, vec2u(0u, 1u));
  }
  return rounded;
}
#endif

fn fp64_make_f32_bits_from_u64(sign: u32, significand: vec2u, baseExponent: i32) -> u32 {
  if (fp64_u64_is_zero(significand)) {
    return sign << 31u;
  }

  let leadingZeros = fp64_u64_count_leading_zeros(significand);
  let mostSignificantBit = 63u - leadingZeros;
  var exponent = baseExponent + i32(mostSignificantBit);

  if (exponent > 127) {
    return (sign << 31u) | 0x7f800000u;
  }

  if (exponent >= -126) {
    let shift = i32(mostSignificantBit) - 23;
    var significand24: u32;
    if (shift > 0) {
      significand24 = fp64_round_shift_right_to_u32(significand, u32(shift));
    } else {
      significand24 = fp64_u64_shift_left(significand, u32(-shift)).y;
    }

    if (significand24 >= 0x1000000u) {
      significand24 = significand24 >> 1u;
      exponent = exponent + 1;
      if (exponent > 127) {
        return (sign << 31u) | 0x7f800000u;
      }
    }

    return (sign << 31u) | (u32(exponent + 127) << 23u) | (significand24 & 0x7fffffu);
  }

  let scaleExponent = baseExponent + 149;
  var mantissa: u32;
  if (scaleExponent >= 0) {
    mantissa = fp64_u64_shift_left(significand, u32(scaleExponent)).y;
  } else {
    mantissa = fp64_round_shift_right_to_u32(significand, u32(-scaleExponent));
  }

  if (mantissa >= 0x800000u) {
    return (sign << 31u) | 0x00800000u;
  }
  return (sign << 31u) | mantissa;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_decode_bits(bits: vec2u) -> Fp64Bits {
  let sign = bits.x >> 31u;
  let exponentBits = (bits.x >> 20u) & 0x7ffu;
  let fractionHigh = bits.x & 0xfffffu;
  let fractionLow = bits.y;
  let fraction = vec2u(fractionHigh, fractionLow);

  if (exponentBits == 0x7ffu) {
    let isInf = fp64_u64_is_zero(fraction);
    return Fp64Bits(sign, 0, vec2u(0u), false, isInf, !isInf);
  }

  if (exponentBits == 0u) {
    let isZero = fp64_u64_is_zero(fraction);
    return Fp64Bits(sign, -1022, fraction, isZero, false, false);
  }

  return Fp64Bits(sign, i32(exponentBits) - 1023, vec2u((1u << 20u) | fractionHigh, fractionLow), false, false, false);
}

fn fp64_finite_magnitude_compare(a: Fp64Bits, b: Fp64Bits) -> i32 {
  if (a.exponent != b.exponent) {
    return select(-1, 1, a.exponent > b.exponent);
  }
  return fp64_u64_compare(a.significand, b.significand);
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
struct Fp64RawF32Bits {
  sign: u32,
  baseExponent: i32,
  significand: u32,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};

// Decode an f32 as (-1)^sign * significand * 2^baseExponent. This shared
// integer representation lets normalization remain independent of the
// selected double-single arithmetic implementation.
fn fp64_decode_raw_f32_bits(bits: u32) -> Fp64RawF32Bits {
  let sign = bits >> 31u;
  let exponentBits = (bits >> 23u) & 0xffu;
  let fraction = bits & 0x7fffffu;

  if (exponentBits == 0xffu) {
    return Fp64RawF32Bits(sign, 0, 0u, false, fraction == 0u, fraction != 0u);
  }
  if (exponentBits == 0u) {
    return Fp64RawF32Bits(sign, -149, fraction, fraction == 0u, false, false);
  }
  return Fp64RawF32Bits(
    sign,
    i32(exponentBits) - 150,
    0x800000u | fraction,
    false,
    false,
    false
  );
}

fn fp64_raw_f32_magnitude_compare(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  return select(-1, 1, aMagnitude > bMagnitude);
}

fn fp64_make_raw_residual_f32_bits(
  exactSign: u32,
  exactMagnitude: vec2u,
  exactBaseExponent: i32,
  highBits: u32
) -> u32 {
  if (fp64_u64_is_zero(exactMagnitude)) {
    return 0u;
  }

  let high = fp64_decode_raw_f32_bits(highBits);
  if (high.isInf || high.isNan) {
    return 0u;
  }
  if (high.isZero) {
    return fp64_make_f32_bits_from_u64(exactSign, exactMagnitude, exactBaseExponent);
  }

  let commonBaseExponent = min(exactBaseExponent, high.baseExponent);
  let exactShift = exactBaseExponent - commonBaseExponent;
  let highShift = high.baseExponent - commonBaseExponent;
  if (exactShift >= 64 || highShift >= 64) {
    return 0u;
  }

  let exactAligned = fp64_u64_shift_left(exactMagnitude, u32(exactShift));
  let highAligned = fp64_u64_shift_left(vec2u(0u, high.significand), u32(highShift));
  let comparison = fp64_u64_compare(exactAligned, highAligned);
  if (comparison == 0) {
    return 0u;
  }

  var residualSign = exactSign;
  var residualMagnitude: vec2u;
  if (comparison > 0) {
    residualMagnitude = fp64_u64_sub(exactAligned, highAligned);
  } else {
    residualSign = exactSign ^ 1u;
    residualMagnitude = fp64_u64_sub(highAligned, exactAligned);
  }
  return fp64_make_f32_bits_from_u64(
    residualSign,
    residualMagnitude,
    commonBaseExponent
  );
}

fn fp64_split_raw_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  if (fp64_u64_is_zero(magnitude)) {
    return vec2u(0u);
  }
  let highBits = fp64_make_f32_bits_from_u64(sign, magnitude, baseExponent);
  let rawLowBits = fp64_make_raw_residual_f32_bits(sign, magnitude, baseExponent, highBits);
  let lowBits = select(rawLowBits, 0u, (rawLowBits & 0x7fffffffu) == 0u);
  if ((highBits & 0x7fffffffu) == 0u && (lowBits & 0x7fffffffu) == 0u) {
    return vec2u(0u);
  }
  return vec2u(highBits, lowBits);
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
// Round an arithmetic accumulator to binary64 before splitting it. The
// aligned add/subtract paths retain three guard bits plus a sticky bit, which
// is sufficient for round-to-nearest-even at the binary64 boundary.
fn fp64_split_binary64_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  if (fp64_u64_is_zero(magnitude)) {
    return vec2u(0u);
  }

  let mostSignificantBit = 63u - fp64_u64_count_leading_zeros(magnitude);
  let exponent = baseExponent + i32(mostSignificantBit);
  if (exponent > 1023) {
    return vec2u((sign << 31u) | 0x7f800000u, 0u);
  }

  var roundedMagnitude = magnitude;
  var roundedBaseExponent = baseExponent;
  if (exponent >= -1022) {
    if (mostSignificantBit > 52u) {
      let shift = mostSignificantBit - 52u;
      roundedMagnitude = fp64_round_shift_right(magnitude, shift);
      roundedBaseExponent = baseExponent + i32(shift);
    }
  } else {
    let shift = -1074 - baseExponent;
    if (shift > 0) {
      roundedMagnitude = fp64_round_shift_right(magnitude, u32(shift));
      roundedBaseExponent = -1074;
    }
  }

  if (fp64_u64_is_zero(roundedMagnitude)) {
    return vec2u(0u);
  }
  return fp64_split_raw_accumulator_bits(sign, roundedMagnitude, roundedBaseExponent);
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_add_raw_f32_bits(aBits: u32, bBits: u32) -> vec2u {
  let a = fp64_decode_raw_f32_bits(aBits);
  let b = fp64_decode_raw_f32_bits(bBits);

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf || b.isInf) {
    if (a.isInf && b.isInf && a.sign != b.sign) {
      return vec2u(0x7fc00000u, 0u);
    }
    return select(vec2u(bBits, 0u), vec2u(aBits, 0u), a.isInf);
  }
  if (a.isZero && b.isZero) {
    return vec2u(0u);
  }
  if (a.isZero) {
    return vec2u(bBits, 0u);
  }
  if (b.isZero) {
    return vec2u(aBits, 0u);
  }

  let exponentDifference = abs(a.baseExponent - b.baseExponent);
  if (exponentDifference > 25) {
    if (fp64_raw_f32_magnitude_compare(aBits, bBits) >= 0) {
      return vec2u(aBits, bBits);
    }
    return vec2u(bBits, aBits);
  }

  let commonBaseExponent = min(a.baseExponent, b.baseExponent);
  let aMagnitude = fp64_u64_shift_left(
    vec2u(0u, a.significand),
    u32(a.baseExponent - commonBaseExponent)
  );
  let bMagnitude = fp64_u64_shift_left(
    vec2u(0u, b.significand),
    u32(b.baseExponent - commonBaseExponent)
  );

  var resultSign = a.sign;
  var resultMagnitude: vec2u;
  if (a.sign == b.sign) {
    resultMagnitude = fp64_u64_add(aMagnitude, bMagnitude);
  } else {
    let comparison = fp64_u64_compare(aMagnitude, bMagnitude);
    if (comparison == 0) {
      return vec2u(0u);
    }
    if (comparison > 0) {
      resultMagnitude = fp64_u64_sub(aMagnitude, bMagnitude);
    } else {
      resultSign = b.sign;
      resultMagnitude = fp64_u64_sub(bMagnitude, aMagnitude);
    }
  }

  return fp64_split_raw_accumulator_bits(
    resultSign,
    resultMagnitude,
    commonBaseExponent
  );
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_add_aligned_magnitudes_to_fp64_bits(
  sign: u32,
  larger: Fp64Bits,
  smaller: Fp64Bits
) -> vec2u {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_add(largeSignificand, smallSignificand);
  return fp64_split_binary64_accumulator_bits(
    sign,
    resultSignificand,
    larger.exponent - 55
  );
}

fn fp64_sub_aligned_magnitudes_to_fp64_bits(
  sign: u32,
  larger: Fp64Bits,
  smaller: Fp64Bits
) -> vec2u {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_sub(largeSignificand, smallSignificand);
  return fp64_split_binary64_accumulator_bits(
    sign,
    resultSignificand,
    larger.exponent - 55
  );
}

fn fp64_add_aligned_magnitudes_to_f32_bits(sign: u32, larger: Fp64Bits, smaller: Fp64Bits) -> u32 {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_add(largeSignificand, smallSignificand);
  return fp64_make_f32_bits_from_u64(sign, resultSignificand, larger.exponent - 55);
}

fn fp64_sub_aligned_magnitudes_to_f32_bits(sign: u32, larger: Fp64Bits, smaller: Fp64Bits) -> u32 {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_sub(largeSignificand, smallSignificand);
  return fp64_make_f32_bits_from_u64(sign, resultSignificand, larger.exponent - 55);
}

// Subtract two raw binary64 values and round the exact result once to f32.
// The input words are canonical high/low words: .x contains sign/exponent/high
// fraction bits, and .y contains the low 32 fraction bits.
fn sub_fp64u32_to_f32_bits(aBits: vec2u, bBits: vec2u) -> u32 {
  let a = fp64_decode_bits(aBits);
  let b = fp64_decode_bits(bBits);
  let bSubtractionSign = b.sign ^ 1u;

  if (a.isNan || b.isNan) {
    return 0x7fc00000u;
  }
  if (a.isInf && b.isInf) {
    if (a.sign == bSubtractionSign) {
      return (a.sign << 31u) | 0x7f800000u;
    }
    return 0x7fc00000u;
  }
  if (a.isInf) {
    return (a.sign << 31u) | 0x7f800000u;
  }
  if (b.isInf) {
    return (bSubtractionSign << 31u) | 0x7f800000u;
  }
  if (a.isZero && b.isZero) {
    return select(0u, 0x80000000u, a.sign == 1u && b.sign == 0u);
  }

  let magnitudeComparison = fp64_finite_magnitude_compare(a, b);
  if (a.sign == bSubtractionSign) {
    if (magnitudeComparison >= 0) {
      return fp64_add_aligned_magnitudes_to_f32_bits(a.sign, a, b);
    }
    return fp64_add_aligned_magnitudes_to_f32_bits(a.sign, b, a);
  }

  if (magnitudeComparison == 0) {
    return 0u;
  }
  if (magnitudeComparison > 0) {
    return fp64_sub_aligned_magnitudes_to_f32_bits(a.sign, a, b);
  }
  return fp64_sub_aligned_magnitudes_to_f32_bits(bSubtractionSign, b, a);
}

fn sub_fp64u32_to_f32(aBits: vec2u, bBits: vec2u) -> f32 {
  return bitcast<f32>(sub_fp64u32_to_f32_bits(aBits, bBits));
}

// Subtract two raw binary64 values, round once to binary64, then split the
// result into normalized f32 limbs. Finite results must fit within the f32
// exponent range; larger magnitudes map to infinity and smaller magnitudes
// map to zero. The input words use canonical high/low word order.
fn sub_fp64u32_to_fp64_bits(aBits: vec2u, bBits: vec2u) -> vec2u {
  let a = fp64_decode_bits(aBits);
  let b = fp64_decode_bits(bBits);
  let bSubtractionSign = b.sign ^ 1u;

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf && b.isInf) {
    if (a.sign == bSubtractionSign) {
      return vec2u((a.sign << 31u) | 0x7f800000u, 0u);
    }
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf) {
    return vec2u((a.sign << 31u) | 0x7f800000u, 0u);
  }
  if (b.isInf) {
    return vec2u((bSubtractionSign << 31u) | 0x7f800000u, 0u);
  }
  if (a.isZero && b.isZero) {
    return vec2u(0u);
  }

  let magnitudeComparison = fp64_finite_magnitude_compare(a, b);
  if (a.sign == bSubtractionSign) {
    if (magnitudeComparison >= 0) {
      return fp64_add_aligned_magnitudes_to_fp64_bits(a.sign, a, b);
    }
    return fp64_add_aligned_magnitudes_to_fp64_bits(a.sign, b, a);
  }

  if (magnitudeComparison == 0) {
    return vec2u(0u);
  }
  if (magnitudeComparison > 0) {
    return fp64_sub_aligned_magnitudes_to_fp64_bits(a.sign, a, b);
  }
  return fp64_sub_aligned_magnitudes_to_fp64_bits(bSubtractionSign, b, a);
}

fn sub_fp64u32_to_fp64(aBits: vec2u, bBits: vec2u) -> vec2f {
  let resultBits = sub_fp64u32_to_fp64_bits(aBits, bBits);
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_runtime_zero() -> f32 {
  return fp64arithmetic.ONE * 0.0;
}

fn prevent_fp64_optimization(value: f32) -> f32 {
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  return value + fp64_runtime_zero();
#else
  return value;
#endif
}
#endif

#ifdef LUMA_FP64_INTEGER_ARITHMETIC
struct Fp64F32Bits {
  sign: u32,
  baseExponent: i32,
  significand: u32,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};

// Decode an f32 as (-1)^sign * significand * 2^baseExponent.
fn fp64_decode_f32_bits(bits: u32) -> Fp64F32Bits {
  let sign = bits >> 31u;
  let exponentBits = (bits >> 23u) & 0xffu;
  let fraction = bits & 0x7fffffu;

  if (exponentBits == 0xffu) {
    return Fp64F32Bits(sign, 0, 0u, false, fraction == 0u, fraction != 0u);
  }
  if (exponentBits == 0u) {
    return Fp64F32Bits(sign, -149, fraction, fraction == 0u, false, false);
  }
  return Fp64F32Bits(sign, i32(exponentBits) - 150, 0x800000u | fraction, false, false, false);
}

fn fp64_f32_magnitude_compare(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  return select(-1, 1, aMagnitude > bMagnitude);
}

fn fp64_make_residual_f32_bits(
  exactSign: u32,
  exactMagnitude: vec2u,
  exactBaseExponent: i32,
  highBits: u32
) -> u32 {
  if (fp64_u64_is_zero(exactMagnitude)) {
    return 0u;
  }

  let high = fp64_decode_f32_bits(highBits);
  if (high.isInf || high.isNan) {
    return exactSign << 31u;
  }
  if (high.isZero) {
    return fp64_make_f32_bits_from_u64(exactSign, exactMagnitude, exactBaseExponent);
  }

  let commonBaseExponent = min(exactBaseExponent, high.baseExponent);
  let exactShift = exactBaseExponent - commonBaseExponent;
  let highShift = high.baseExponent - commonBaseExponent;

  // A normal two-sum/two-product residual never needs a shift this large.
  // This guard gives deterministic underflow behavior outside that contract.
  if (exactShift >= 64 || highShift >= 64) {
    return exactSign << 31u;
  }

  let exactAligned = fp64_u64_shift_left(exactMagnitude, u32(exactShift));
  let highAligned = fp64_u64_shift_left(vec2u(0u, high.significand), u32(highShift));
  let comparison = fp64_u64_compare(exactAligned, highAligned);
  if (comparison == 0) {
    return 0u;
  }

  var residualSign = exactSign;
  var residualMagnitude: vec2u;
  if (comparison > 0) {
    residualMagnitude = fp64_u64_sub(exactAligned, highAligned);
  } else {
    residualSign = exactSign ^ 1u;
    residualMagnitude = fp64_u64_sub(highAligned, exactAligned);
  }
  return fp64_make_f32_bits_from_u64(
    residualSign,
    residualMagnitude,
    commonBaseExponent
  );
}

fn fp64_split_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  let highBits = fp64_make_f32_bits_from_u64(sign, magnitude, baseExponent);
  let lowBits = fp64_make_residual_f32_bits(sign, magnitude, baseExponent, highBits);
  return vec2u(highBits, lowBits);
}

fn fp64_two_sum_integer_bits(aBits: u32, bBits: u32) -> vec2u {
  let a = fp64_decode_f32_bits(aBits);
  let b = fp64_decode_f32_bits(bBits);

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf || b.isInf) {
    if (a.isInf && b.isInf && a.sign != b.sign) {
      return vec2u(0x7fc00000u, 0u);
    }
    return select(vec2u(bBits, 0u), vec2u(aBits, 0u), a.isInf);
  }
  if (a.isZero && b.isZero) {
    return vec2u((a.sign & b.sign) << 31u, 0u);
  }
  if (a.isZero) {
    return vec2u(bBits, 0u);
  }
  if (b.isZero) {
    return vec2u(aBits, 0u);
  }

  let exponentDifference = select(
    b.baseExponent - a.baseExponent,
    a.baseExponent - b.baseExponent,
    a.baseExponent >= b.baseExponent
  );

  // Beyond half an ulp, rounding cannot change the larger operand. Returning
  // the smaller operand intact also avoids an unbounded integer alignment.
  // At a power-of-two boundary the spacing below the larger operand is half
  // the spacing above it, so an opposite-sign gap-25 operand can still change
  // the rounded high limb. Gap 26 is the first universally safe early-out.
  if (exponentDifference > 25) {
    if (fp64_f32_magnitude_compare(aBits, bBits) >= 0) {
      return vec2u(aBits, bBits);
    }
    return vec2u(bBits, aBits);
  }

  let commonBaseExponent = min(a.baseExponent, b.baseExponent);
  let aMagnitude = fp64_u64_shift_left(
    vec2u(0u, a.significand),
    u32(a.baseExponent - commonBaseExponent)
  );
  let bMagnitude = fp64_u64_shift_left(
    vec2u(0u, b.significand),
    u32(b.baseExponent - commonBaseExponent)
  );

  var resultSign = a.sign;
  var resultMagnitude: vec2u;
  if (a.sign == b.sign) {
    resultMagnitude = fp64_u64_add(aMagnitude, bMagnitude);
  } else {
    let comparison = fp64_u64_compare(aMagnitude, bMagnitude);
    if (comparison == 0) {
      return vec2u(0u, 0u);
    }
    if (comparison > 0) {
      resultMagnitude = fp64_u64_sub(aMagnitude, bMagnitude);
    } else {
      resultSign = b.sign;
      resultMagnitude = fp64_u64_sub(bMagnitude, aMagnitude);
    }
  }

  return fp64_split_accumulator_bits(resultSign, resultMagnitude, commonBaseExponent);
}

fn fp64_two_sum_integer(a: f32, b: f32) -> vec2f {
  let resultBits = fp64_two_sum_integer_bits(bitcast<u32>(a), bitcast<u32>(b));
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

fn fp64_multiply_significands(a: u32, b: u32) -> vec2u {
  let aLow = a & 0xffffu;
  let aHigh = a >> 16u;
  let bLow = b & 0xffffu;
  let bHigh = b >> 16u;
  let lowProduct = aLow * bLow;
  let crossProduct = aLow * bHigh + aHigh * bLow;
  let highProduct = aHigh * bHigh;

  var result = vec2u(0u, lowProduct);
  result = fp64_u64_add(
    result,
    fp64_u64_shift_left(vec2u(0u, crossProduct), 16u)
  );
  result = fp64_u64_add(result, vec2u(highProduct, 0u));
  return result;
}

fn fp64_two_prod_integer_bits(aBits: u32, bBits: u32) -> vec2u {
  let a = fp64_decode_f32_bits(aBits);
  let b = fp64_decode_f32_bits(bBits);
  let resultSign = a.sign ^ b.sign;

  if (a.isNan || b.isNan || ((a.isZero || b.isZero) && (a.isInf || b.isInf))) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf || b.isInf) {
    return vec2u((resultSign << 31u) | 0x7f800000u, resultSign << 31u);
  }
  if (a.isZero || b.isZero) {
    return vec2u(resultSign << 31u, resultSign << 31u);
  }

  let magnitude = fp64_multiply_significands(a.significand, b.significand);
  return fp64_split_accumulator_bits(
    resultSign,
    magnitude,
    a.baseExponent + b.baseExponent
  );
}

fn fp64_two_prod_integer(a: f32, b: f32) -> vec2f {
  let resultBits = fp64_two_prod_integer_bits(bitcast<u32>(a), bitcast<u32>(b));
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

fn fp64_round_add_integer(a: f32, b: f32) -> f32 {
  return fp64_two_sum_integer(a, b).x;
}

fn fp64_round_mul_integer(a: f32, b: f32) -> f32 {
  return fp64_two_prod_integer(a, b).x;
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_f32_finite_exponent(value: Fp64F32Bits) -> i32 {
  let mostSignificantBit = 31u - countLeadingZeros(value.significand);
  return value.baseExponent + i32(mostSignificantBit);
}

fn fp64_scale_f32_integer(value: f32, exponent: i32) -> f32 {
  let decoded = fp64_decode_f32_bits(bitcast<u32>(value));
  if (decoded.isZero || decoded.isInf || decoded.isNan) {
    return value;
  }
  let resultBits = fp64_make_f32_bits_from_u64(
    decoded.sign,
    vec2u(0u, decoded.significand),
    decoded.baseExponent + exponent
  );
  return bitcast<f32>(resultBits);
}

// Divide normalized significands so the hardware operation cannot overflow,
// underflow, or flush a subnormal result. Reapply the exponent with integer
// packing, which also produces subnormal correction limbs without relying on
// floating-point arithmetic to preserve them.
fn fp64_divide_f32_integer(aValue: f32, bValue: f32) -> f32 {
  let a = fp64_decode_f32_bits(bitcast<u32>(aValue));
  let b = fp64_decode_f32_bits(bitcast<u32>(bValue));
  if (a.isZero || b.isZero || a.isInf || b.isInf || a.isNan || b.isNan) {
    return aValue / bValue;
  }

  let aMostSignificantBit = 31u - countLeadingZeros(a.significand);
  let bMostSignificantBit = 31u - countLeadingZeros(b.significand);
  let normalizedABits = fp64_make_f32_bits_from_u64(
    a.sign,
    vec2u(0u, a.significand),
    -i32(aMostSignificantBit)
  );
  let normalizedBBits = fp64_make_f32_bits_from_u64(
    b.sign,
    vec2u(0u, b.significand),
    -i32(bMostSignificantBit)
  );
  let normalizedQuotient = bitcast<f32>(normalizedABits) / bitcast<f32>(normalizedBBits);
  let quotient = fp64_decode_f32_bits(bitcast<u32>(normalizedQuotient));
  let exponentShift =
    a.baseExponent + i32(aMostSignificantBit) -
    b.baseExponent - i32(bMostSignificantBit);
  let quotientBits = fp64_make_f32_bits_from_u64(
    quotient.sign,
    vec2u(0u, quotient.significand),
    quotient.baseExponent + exponentShift
  );
  return bitcast<f32>(quotientBits);
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn split(a: f32) -> vec2f {
  let aBits = bitcast<u32>(a);
  let decoded = fp64_decode_f32_bits(aBits);
  if (decoded.isZero || decoded.isInf || decoded.isNan) {
    return vec2f(a, 0.0);
  }

  var roundedHigh = decoded.significand >> 12u;
  let remainder = decoded.significand & 0xfffu;
  if (remainder > 0x800u || (remainder == 0x800u && (roundedHigh & 1u) == 1u)) {
    roundedHigh = roundedHigh + 1u;
  }
  var highMagnitude = vec2u(0u, roundedHigh << 12u);
  var highBits = fp64_make_f32_bits_from_u64(
    decoded.sign,
    highMagnitude,
    decoded.baseExponent
  );
  // Rounding the high limb of a maximum-exponent value can overflow even
  // though the original value is finite. Truncate only in that boundary case
  // so split remains an exact finite decomposition.
  if (fp64_decode_f32_bits(highBits).isInf) {
    roundedHigh = decoded.significand >> 12u;
    highMagnitude = vec2u(0u, roundedHigh << 12u);
    highBits = fp64_make_f32_bits_from_u64(
      decoded.sign,
      highMagnitude,
      decoded.baseExponent
    );
  }
  let lowBits = fp64_make_residual_f32_bits(
    decoded.sign,
    vec2u(0u, decoded.significand),
    decoded.baseExponent,
    highBits
  );
  return vec2f(bitcast<f32>(highBits), bitcast<f32>(lowBits));
}

fn split2(a: vec2f) -> vec2f {
  var result = split(a.x);
  result.y = fp64_round_add_integer(result.y, a.y);
  return result;
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn quickTwoSum(a: f32, b: f32) -> vec2f {
  return fp64_two_sum_integer(a, b);
}
#endif

fn twoSum(a: f32, b: f32) -> vec2f {
  return fp64_two_sum_integer(a, b);
}

fn twoSub(a: f32, b: f32) -> vec2f {
  let bBits = bitcast<u32>(b) ^ 0x80000000u;
  let resultBits = fp64_two_sum_integer_bits(bitcast<u32>(a), bBits);
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn twoSqr(a: f32) -> vec2f {
  return fp64_two_prod_integer(a, a);
}

fn twoProd(a: f32, b: f32) -> vec2f {
  return fp64_two_prod_integer(a, b);
}
#endif

fn sum_fp64(a: vec2f, b: vec2f) -> vec2f {
  var sum = fp64_two_sum_integer(a.x, b.x);
  let lowSum = fp64_two_sum_integer(a.y, b.y);
  sum.y = fp64_round_add_integer(sum.y, lowSum.x);
  sum = fp64_two_sum_integer(sum.x, sum.y);
  sum.y = fp64_round_add_integer(sum.y, lowSum.y);
  return fp64_two_sum_integer(sum.x, sum.y);
}

fn sub_fp64(a: vec2f, b: vec2f) -> vec2f {
  let negatedB = vec2f(
    bitcast<f32>(bitcast<u32>(b.x) ^ 0x80000000u),
    bitcast<f32>(bitcast<u32>(b.y) ^ 0x80000000u)
  );
  return sum_fp64(a, negatedB);
}

fn mul_fp64(a: vec2f, b: vec2f) -> vec2f {
  var product = fp64_two_prod_integer(a.x, b.x);
  let crossProduct1 = fp64_round_mul_integer(a.x, b.y);
  product.y = fp64_round_add_integer(product.y, crossProduct1);
  product = fp64_two_sum_integer(product.x, product.y);
  let crossProduct2 = fp64_round_mul_integer(a.y, b.x);
  product.y = fp64_round_add_integer(product.y, crossProduct2);
  return fp64_two_sum_integer(product.x, product.y);
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_scale_fp64_integer(value: vec2f, exponent: i32) -> vec2f {
  let high = fp64_scale_f32_integer(value.x, exponent);
  let low = fp64_scale_f32_integer(value.y, exponent);
  return sum_fp64(vec2f(high, 0.0), vec2f(low, 0.0));
}

fn fp64_div_fp64_normalized(a: vec2f, b: vec2f) -> vec2f {
  let quotientHigh = fp64_divide_f32_integer(a.x, b.x);
  var quotient = vec2f(quotientHigh, 0.0);

  let remainder = sub_fp64(a, mul_fp64(b, quotient));
  let quotientLow = fp64_divide_f32_integer(remainder.x, b.x);
  quotient = sum_fp64(quotient, vec2f(quotientLow, 0.0));

  let secondRemainder = sub_fp64(a, mul_fp64(b, quotient));
  let correction = fp64_divide_f32_integer(secondRemainder.x, b.x);
  return sum_fp64(quotient, vec2f(correction, 0.0));
}

fn div_fp64(a: vec2f, b: vec2f) -> vec2f {
  let decodedA = fp64_decode_f32_bits(bitcast<u32>(a.x));
  let decodedB = fp64_decode_f32_bits(bitcast<u32>(b.x));
  if (
    decodedA.isZero || decodedB.isZero ||
    decodedA.isInf || decodedB.isInf ||
    decodedA.isNan || decodedB.isNan
  ) {
    return fp64_div_fp64_normalized(a, b);
  }

  let exponentA = fp64_f32_finite_exponent(decodedA);
  let exponentB = fp64_f32_finite_exponent(decodedB);
  // Correct the quotient near unity so b * q and the remainder stay clear of
  // both f32 underflow and overflow. The exponent difference is applied once.
  let normalizedA = fp64_scale_fp64_integer(a, -exponentA);
  let normalizedB = fp64_scale_fp64_integer(b, -exponentB);
  let normalizedQuotient = fp64_div_fp64_normalized(normalizedA, normalizedB);
  return fp64_scale_fp64_integer(normalizedQuotient, exponentA - exponentB);
}

fn fp64_sqrt_fp64_normalized(a: vec2f) -> vec2f {
  let estimate = sqrt(a.x);
  let difference = sub_fp64(a, fp64_two_prod_integer(estimate, estimate)).x;
  let denominator = fp64_round_add_integer(estimate, estimate);
  let correction = fp64_divide_f32_integer(difference, denominator);
  return sum_fp64(vec2f(estimate, 0.0), vec2f(correction, 0.0));
}

fn sqrt_fp64(a: vec2f) -> vec2f {
  let decoded = fp64_decode_f32_bits(bitcast<u32>(a.x));
  let decodedLow = fp64_decode_f32_bits(bitcast<u32>(a.y));
  if (decoded.isZero && decodedLow.isZero) {
    return vec2f(0.0, 0.0);
  }
  if (decoded.sign == 1u) {
    let nanValue = fp64_nan(a.x);
    return vec2f(nanValue, nanValue);
  }

  if (decoded.isInf || decoded.isNan) {
    return fp64_sqrt_fp64_normalized(a);
  }
  let exponent = fp64_f32_finite_exponent(decoded);
  // An even scale lets the final square-root rescale use an integer exponent.
  let evenExponent = exponent - (exponent & 1);
  let normalizedA = fp64_scale_fp64_integer(a, -evenExponent);
  let normalizedRoot = fp64_sqrt_fp64_normalized(normalizedA);
  return fp64_scale_fp64_integer(normalizedRoot, evenExponent / 2);
}
#endif

#else
fn split(a: f32) -> vec2f {
  let splitValue = prevent_fp64_optimization(fp64arithmetic.SPLIT + fp64_runtime_zero());
  let t = prevent_fp64_optimization(a * splitValue);
  let temp = prevent_fp64_optimization(t - a);
  let aHi = prevent_fp64_optimization(t - temp);
  let aLo = prevent_fp64_optimization(a - aHi);
  return vec2f(aHi, aLo);
}

fn split2(a: vec2f) -> vec2f {
  var b = split(a.x);
  b.y = b.y + a.y;
  return b;
}

fn quickTwoSum(a: f32, b: f32) -> vec2f {
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let sum = prevent_fp64_optimization((a + b) * fp64arithmetic.ONE);
  let err = prevent_fp64_optimization(b - (sum - a) * fp64arithmetic.ONE);
#else
  let sum = prevent_fp64_optimization(a + b);
  let err = prevent_fp64_optimization(b - (sum - a));
#endif
  return vec2f(sum, err);
}

fn twoSum(a: f32, b: f32) -> vec2f {
  let s = prevent_fp64_optimization(a + b);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let v = prevent_fp64_optimization((s * fp64arithmetic.ONE - a) * fp64arithmetic.ONE);
  let err =
    prevent_fp64_optimization((a - (s - v) * fp64arithmetic.ONE) *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE) +
    prevent_fp64_optimization(b - v);
#else
  let v = prevent_fp64_optimization(s - a);
  let err = prevent_fp64_optimization(a - (s - v)) + prevent_fp64_optimization(b - v);
#endif
  return vec2f(s, err);
}

fn twoSub(a: f32, b: f32) -> vec2f {
  let s = prevent_fp64_optimization(a - b);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let v = prevent_fp64_optimization((s * fp64arithmetic.ONE - a) * fp64arithmetic.ONE);
  let err =
    prevent_fp64_optimization((a - (s - v) * fp64arithmetic.ONE) *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE) -
    prevent_fp64_optimization(b + v);
#else
  let v = prevent_fp64_optimization(s - a);
  let err = prevent_fp64_optimization(a - (s - v)) - prevent_fp64_optimization(b + v);
#endif
  return vec2f(s, err);
}

fn twoSqr(a: f32) -> vec2f {
  let prod = prevent_fp64_optimization(a * a);
  let aFp64 = split(a);
  let highProduct = prevent_fp64_optimization(aFp64.x * aFp64.x);
  let crossProduct = prevent_fp64_optimization(2.0 * aFp64.x * aFp64.y);
  let lowProduct = prevent_fp64_optimization(aFp64.y * aFp64.y);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let err =
    (prevent_fp64_optimization(highProduct - prod) * fp64arithmetic.ONE +
      crossProduct * fp64arithmetic.ONE * fp64arithmetic.ONE) +
    lowProduct * fp64arithmetic.ONE * fp64arithmetic.ONE * fp64arithmetic.ONE;
#else
  let err = ((prevent_fp64_optimization(highProduct - prod) + crossProduct) + lowProduct);
#endif
  return vec2f(prod, err);
}

fn twoProd(a: f32, b: f32) -> vec2f {
  let prod = prevent_fp64_optimization(a * b);
  let aFp64 = split(a);
  let bFp64 = split(b);
  let highProduct = prevent_fp64_optimization(aFp64.x * bFp64.x);
  let crossProduct1 = prevent_fp64_optimization(aFp64.x * bFp64.y);
  let crossProduct2 = prevent_fp64_optimization(aFp64.y * bFp64.x);
  let lowProduct = prevent_fp64_optimization(aFp64.y * bFp64.y);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let err1 = (highProduct - prod) * fp64arithmetic.ONE;
  let err2 = crossProduct1 * fp64arithmetic.ONE * fp64arithmetic.ONE;
  let err3 = crossProduct2 * fp64arithmetic.ONE * fp64arithmetic.ONE * fp64arithmetic.ONE;
  let err4 =
    lowProduct *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE;
#else
  let err1 = highProduct - prod;
  let err2 = crossProduct1;
  let err3 = crossProduct2;
  let err4 = lowProduct;
#endif
  let err12InputA = prevent_fp64_optimization(err1);
  let err12InputB = prevent_fp64_optimization(err2);
  let err12 = prevent_fp64_optimization(err12InputA + err12InputB);
  let err123InputA = prevent_fp64_optimization(err12);
  let err123InputB = prevent_fp64_optimization(err3);
  let err123 = prevent_fp64_optimization(err123InputA + err123InputB);
  let err1234InputA = prevent_fp64_optimization(err123);
  let err1234InputB = prevent_fp64_optimization(err4);
  let err = prevent_fp64_optimization(err1234InputA + err1234InputB);
  return vec2f(prod, err);
}

fn sum_fp64(a: vec2f, b: vec2f) -> vec2f {
  var s = twoSum(a.x, b.x);
  let t = twoSum(a.y, b.y);
  s.y = prevent_fp64_optimization(s.y + t.x);
  s = quickTwoSum(s.x, s.y);
  s.y = prevent_fp64_optimization(s.y + t.y);
  s = quickTwoSum(s.x, s.y);
  return s;
}

fn sub_fp64(a: vec2f, b: vec2f) -> vec2f {
  var s = twoSub(a.x, b.x);
  let t = twoSub(a.y, b.y);
  s.y = prevent_fp64_optimization(s.y + t.x);
  s = quickTwoSum(s.x, s.y);
  s.y = prevent_fp64_optimization(s.y + t.y);
  s = quickTwoSum(s.x, s.y);
  return s;
}

fn mul_fp64(a: vec2f, b: vec2f) -> vec2f {
  var prod = twoProd(a.x, b.x);
  let crossProduct1 = prevent_fp64_optimization(a.x * b.y);
  prod.y = prevent_fp64_optimization(prod.y + crossProduct1);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  let crossProduct2 = prevent_fp64_optimization(a.y * b.x);
  prod.y = prevent_fp64_optimization(prod.y + crossProduct2);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  return prod;
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn div_fp64(a: vec2f, b: vec2f) -> vec2f {
  let xn = prevent_fp64_optimization(1.0 / b.x);
  let yn = mul_fp64(a, vec2f(xn, fp64_runtime_zero()));
  let diff = prevent_fp64_optimization(sub_fp64(a, mul_fp64(b, yn)).x);
  let prod = twoProd(xn, diff);
  return sum_fp64(yn, prod);
}

fn sqrt_fp64(a: vec2f) -> vec2f {
  if (a.x == 0.0 && a.y == 0.0) {
    return vec2f(0.0, 0.0);
  }
  if (a.x < 0.0) {
    let nanValue = fp64_nan(a.x);
    return vec2f(nanValue, nanValue);
  }

  let x = prevent_fp64_optimization(1.0 / sqrt(a.x));
  let yn = prevent_fp64_optimization(a.x * x);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let ynSqr = twoSqr(yn) * fp64arithmetic.ONE;
#else
  let ynSqr = twoSqr(yn);
#endif
  let diff = prevent_fp64_optimization(sub_fp64(a, ynSqr).x);
  let prod = twoProd(prevent_fp64_optimization(x * 0.5), diff);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  return sum_fp64(split(yn), prod);
#else
  return sum_fp64(vec2f(yn, 0.0), prod);
#endif
}
#endif
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_f32_bits_is_nan(bits: u32) -> bool {
  return (bits & 0x7fffffffu) > 0x7f800000u;
}

fn fp64_f32_bits_is_inf(bits: u32) -> bool {
  return (bits & 0x7fffffffu) == 0x7f800000u;
}

fn fp64_compare_f32_bits(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == 0u && bMagnitude == 0u) {
    return 0;
  }
  let aSign = aBits >> 31u;
  let bSign = bBits >> 31u;
  if (aSign != bSign) {
    return select(1, -1, aSign == 1u);
  }
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  let magnitudeComparison = select(-1, 1, aMagnitude > bMagnitude);
  return select(magnitudeComparison, -magnitudeComparison, aSign == 1u);
}

// Normalize an arbitrary pair of finite f32 limbs with integer accumulation.
// This is independent of LUMA_FP64_INTEGER_ARITHMETIC and canonicalizes every
// representation of zero to vec2f(+0.0, +0.0).
fn normalize_fp64(value: vec2f) -> vec2f {
  let resultBits = fp64_add_raw_f32_bits(bitcast<u32>(value.x), bitcast<u32>(value.y));
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

fn is_nan_fp64(value: vec2f) -> bool {
  let normalized = normalize_fp64(value);
  return fp64_f32_bits_is_nan(bitcast<u32>(normalized.x)) ||
    fp64_f32_bits_is_nan(bitcast<u32>(normalized.y));
}

fn is_finite_fp64(value: vec2f) -> bool {
  let normalized = normalize_fp64(value);
  let highBits = bitcast<u32>(normalized.x);
  let lowBits = bitcast<u32>(normalized.y);
  return !fp64_f32_bits_is_nan(highBits) && !fp64_f32_bits_is_nan(lowBits) &&
    !fp64_f32_bits_is_inf(highBits) && !fp64_f32_bits_is_inf(lowBits);
}

// Returns -1, 0, or 1. NaN is unordered and returns 0; call is_nan_fp64 or
// is_finite_fp64 first when 0 must mean a finite zero.
fn sign_fp64(value: vec2f) -> i32 {
  let normalized = normalize_fp64(value);
  let highBits = bitcast<u32>(normalized.x);
  let lowBits = bitcast<u32>(normalized.y);
  if (fp64_f32_bits_is_nan(highBits) || fp64_f32_bits_is_nan(lowBits)) {
    return 0;
  }
  if ((highBits & 0x7fffffffu) != 0u) {
    return select(1, -1, (highBits >> 31u) == 1u);
  }
  if ((lowBits & 0x7fffffffu) != 0u) {
    return select(1, -1, (lowBits >> 31u) == 1u);
  }
  return 0;
}

// Compares double-single values and returns -1, 0, or 1. NaN is unordered
// and returns 0; callers that require equality semantics must first check
// is_nan_fp64 or is_finite_fp64.
fn compare_fp64(a: vec2f, b: vec2f) -> i32 {
  let normalizedA = normalize_fp64(a);
  let normalizedB = normalize_fp64(b);
  let aHighBits = bitcast<u32>(normalizedA.x);
  let aLowBits = bitcast<u32>(normalizedA.y);
  let bHighBits = bitcast<u32>(normalizedB.x);
  let bLowBits = bitcast<u32>(normalizedB.y);
  if (fp64_f32_bits_is_nan(aHighBits) || fp64_f32_bits_is_nan(aLowBits) ||
      fp64_f32_bits_is_nan(bHighBits) || fp64_f32_bits_is_nan(bLowBits)) {
    return 0;
  }
  let highComparison = fp64_compare_f32_bits(aHighBits, bHighBits);
  if (highComparison != 0) {
    return highComparison;
  }
  return fp64_compare_f32_bits(aLowBits, bLowBits);
}
#endif
`,fs:Ft,vs:Ft,defaultUniforms:{ONE:1,SPLIT:4097},uniformTypes:{ONE:`f32`,SPLIT:`f32`},fp64ify:kt,fp64LowPart:At,fp64ifyMatrix4:jt},Lt={RGBA8UNORM:0,RGBA16FLOAT:1,RGBA32FLOAT:2},Rt={rgba8unorm:4,rgba16float:8,rgba32float:16};Lt.RGBA8UNORM,Lt.RGBA16FLOAT,Lt.RGBA32FLOAT,Lt.RGBA8UNORM,Lt.RGBA16FLOAT,Lt.RGBA32FLOAT;var zt={useByteColors:`f32`},Bt={useByteColors:!0};Lt.RGBA8UNORM,Rt.rgba8unorm/Uint32Array.BYTES_PER_ELEMENT,Ut(`colors`);var Vt=Ut(`floatColors`);Wt(`colors`);var Ht=Wt(`floatColors`);`${Lt.RGBA8UNORM}${Lt.RGBA16FLOAT}`;function Ut(e){return`\
layout(std140) uniform ${e}Uniforms {
  float useByteColors;
} ${e};

vec3 ${e}_normalize(vec3 inputColor) {
  return ${e}.useByteColors > 0.5 ? inputColor / 255.0 : inputColor;
}

vec4 ${e}_normalize(vec4 inputColor) {
  return ${e}.useByteColors > 0.5 ? inputColor / 255.0 : inputColor;
}

vec4 ${e}_premultiplyAlpha(vec4 inputColor) {
  return vec4(inputColor.rgb * inputColor.a, inputColor.a);
}

vec4 ${e}_unpremultiplyAlpha(vec4 inputColor) {
  return inputColor.a > 0.0 ? vec4(inputColor.rgb / inputColor.a, inputColor.a) : vec4(0.0);
}

vec4 ${e}_premultiply_alpha(vec4 inputColor) {
  return ${e}_premultiplyAlpha(inputColor);
}

vec4 ${e}_unpremultiply_alpha(vec4 inputColor) {
  return ${e}_unpremultiplyAlpha(inputColor);
}
`}function Wt(e){return`\
struct ${e}Uniforms {
  useByteColors: f32
};

@group(0) @binding(auto) var<uniform> ${e} : ${e}Uniforms;

fn ${e}_normalize(inputColor: vec3<f32>) -> vec3<f32> {
  return select(inputColor, inputColor / 255.0, ${e}.useByteColors > 0.5);
}

fn ${e}_normalize4(inputColor: vec4<f32>) -> vec4<f32> {
  return select(inputColor, inputColor / 255.0, ${e}.useByteColors > 0.5);
}

fn ${e}_premultiplyAlpha(inputColor: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(inputColor.rgb * inputColor.a, inputColor.a);
}

fn ${e}_unpremultiplyAlpha(inputColor: vec4<f32>) -> vec4<f32> {
  return select(
    vec4<f32>(0.0),
    vec4<f32>(inputColor.rgb / inputColor.a, inputColor.a),
    inputColor.a > 0.0
  );
}

fn ${e}_premultiply_alpha(inputColor: vec4<f32>) -> vec4<f32> {
  return ${e}_premultiplyAlpha(inputColor);
}

fn ${e}_unpremultiply_alpha(inputColor: vec4<f32>) -> vec4<f32> {
  return ${e}_unpremultiplyAlpha(inputColor);
}
`}var Gt={name:`floatColors`,props:{},uniforms:{},vs:Vt,fs:Vt,source:Ht,uniformTypes:zt,defaultUniforms:Bt},Kt={props:{},uniforms:{},name:`picking`,uniformTypes:{isActive:`f32`,isAttribute:`f32`,isHighlightActive:`f32`,useByteColors:`f32`,highlightedObjectColor:`vec3<f32>`,highlightColor:`vec4<f32>`},defaultUniforms:{isActive:!1,isAttribute:!1,isHighlightActive:!1,useByteColors:!0,highlightedObjectColor:[0,0,0],highlightColor:[0,1,1,1]},vs:`layout(std140) uniform pickingUniforms {
  float isActive;
  float isAttribute;
  float isHighlightActive;
  float useByteColors;
  vec3 highlightedObjectColor;
  vec4 highlightColor;
} picking;

out vec4 picking_vRGBcolor_Avalid;

// Normalize unsigned byte color to 0-1 range
vec3 picking_normalizeColor(vec3 color) {
  return picking.useByteColors > 0.5 ? color / 255.0 : color;
}

// Normalize unsigned byte color to 0-1 range
vec4 picking_normalizeColor(vec4 color) {
  return picking.useByteColors > 0.5 ? color / 255.0 : color;
}

bool picking_isColorZero(vec3 color) {
  return dot(color, vec3(1.0)) < 0.00001;
}

bool picking_isColorValid(vec3 color) {
  return dot(color, vec3(1.0)) > 0.00001;
}

// Check if this vertex is highlighted 
bool isVertexHighlighted(vec3 vertexColor) {
  vec3 highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
  return
    bool(picking.isHighlightActive) && picking_isColorZero(abs(vertexColor - highlightedObjectColor));
}

// Set the current picking color
void picking_setPickingColor(vec3 pickingColor) {
  pickingColor = picking_normalizeColor(pickingColor);

  if (bool(picking.isActive)) {
    // Use alpha as the validity flag. If pickingColor is [0, 0, 0] fragment is non-pickable
    picking_vRGBcolor_Avalid.a = float(picking_isColorValid(pickingColor));

    if (!bool(picking.isAttribute)) {
      // Stores the picking color so that the fragment shader can render it during picking
      picking_vRGBcolor_Avalid.rgb = pickingColor;
    }
  } else {
    // Do the comparison with selected item color in vertex shader as it should mean fewer compares
    picking_vRGBcolor_Avalid.a = float(isVertexHighlighted(pickingColor));
  }
}

void picking_setPickingAttribute(float value) {
  if (bool(picking.isAttribute)) {
    picking_vRGBcolor_Avalid.r = value;
  }
}

void picking_setPickingAttribute(vec2 value) {
  if (bool(picking.isAttribute)) {
    picking_vRGBcolor_Avalid.rg = value;
  }
}

void picking_setPickingAttribute(vec3 value) {
  if (bool(picking.isAttribute)) {
    picking_vRGBcolor_Avalid.rgb = value;
  }
}
`,fs:`layout(std140) uniform pickingUniforms {
  float isActive;
  float isAttribute;
  float isHighlightActive;
  float useByteColors;
  vec3 highlightedObjectColor;
  vec4 highlightColor;
} picking;

in vec4 picking_vRGBcolor_Avalid;

/*
 * Returns highlight color if this item is selected.
 */
vec4 picking_filterHighlightColor(vec4 color) {
  // If we are still picking, we don't highlight
  if (picking.isActive > 0.5) {
    return color;
  }

  bool selected = bool(picking_vRGBcolor_Avalid.a);

  if (selected) {
    // Blend in highlight color based on its alpha value
    float highLightAlpha = picking.highlightColor.a;
    float blendedAlpha = highLightAlpha + color.a * (1.0 - highLightAlpha);
    float highLightRatio = highLightAlpha / blendedAlpha;

    vec3 blendedRGB = mix(color.rgb, picking.highlightColor.rgb, highLightRatio);
    return vec4(blendedRGB, blendedAlpha);
  } else {
    return color;
  }
}

/*
 * Returns picking color if picking enabled else unmodified argument.
 */
vec4 picking_filterPickingColor(vec4 color) {
  if (bool(picking.isActive)) {
    if (picking_vRGBcolor_Avalid.a == 0.0) {
      discard;
    }
    return picking_vRGBcolor_Avalid;
  }
  return color;
}

/*
 * Returns picking color if picking is enabled if not
 * highlight color if this item is selected, otherwise unmodified argument.
 */
vec4 picking_filterColor(vec4 color) {
  vec4 highlightColor = picking_filterHighlightColor(color);
  return picking_filterPickingColor(highlightColor);
}
`,getUniforms:qt};function qt(e={},t){let n={},r=Mt(e.useByteColors,!0);return e.highlightedObjectColor===void 0||(e.highlightedObjectColor===null?n.isHighlightActive=!1:(n.isHighlightActive=!0,n.highlightedObjectColor=e.highlightedObjectColor.slice(0,3))),e.highlightColor&&(n.highlightColor=Pt(e.highlightColor,r)),e.isActive!==void 0&&(n.isActive=!!e.isActive,n.isAttribute=!!e.isAttribute),e.useByteColors!==void 0&&(n.useByteColors=!!e.useByteColors),n}var Jt=`precision highp int;

// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
struct AmbientLight {
  vec3 color;
};

struct PointLight {
  vec3 color;
  vec3 position;
  vec3 attenuation; // 2nd order x:Constant-y:Linear-z:Exponential
};

struct SpotLight {
  vec3 color;
  vec3 position;
  vec3 direction;
  vec3 attenuation;
  vec2 coneCos;
};

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

struct UniformLight {
  vec3 color;
  vec3 position;
  vec3 direction;
  vec3 attenuation;
  vec2 coneCos;
};

layout(std140) uniform lightingUniforms {
  int enabled;
  int directionalLightCount;
  int pointLightCount;
  int spotLightCount;
  vec3 ambientColor;
  UniformLight lights[5];
} lighting;

PointLight lighting_getPointLight(int index) {
  UniformLight light = lighting.lights[index];
  return PointLight(light.color, light.position, light.attenuation);
}

SpotLight lighting_getSpotLight(int index) {
  UniformLight light = lighting.lights[lighting.pointLightCount + index];
  return SpotLight(light.color, light.position, light.direction, light.attenuation, light.coneCos);
}

DirectionalLight lighting_getDirectionalLight(int index) {
  UniformLight light =
    lighting.lights[lighting.pointLightCount + lighting.spotLightCount + index];
  return DirectionalLight(light.color, light.direction);
}

float getPointLightAttenuation(PointLight pointLight, float distance) {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}

float getSpotLightAttenuation(SpotLight spotLight, vec3 positionWorldspace) {
  vec3 light_direction = normalize(positionWorldspace - spotLight.position);
  float coneFactor = smoothstep(
    spotLight.coneCos.y,
    spotLight.coneCos.x,
    dot(normalize(spotLight.direction), light_direction)
  );
  float distanceAttenuation = getPointLightAttenuation(
    PointLight(spotLight.color, spotLight.position, spotLight.attenuation),
    distance(spotLight.position, positionWorldspace)
  );
  return distanceAttenuation / max(coneFactor, 0.0001);
}

// #endif
`,Yt=`// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
const MAX_LIGHTS: i32 = 5;

struct AmbientLight {
  color: vec3<f32>,
};

struct PointLight {
  color: vec3<f32>,
  position: vec3<f32>,
  attenuation: vec3<f32>, // 2nd order x:Constant-y:Linear-z:Exponential
};

struct SpotLight {
  color: vec3<f32>,
  position: vec3<f32>,
  direction: vec3<f32>,
  attenuation: vec3<f32>,
  coneCos: vec2<f32>,
};

struct DirectionalLight {
  color: vec3<f32>,
  direction: vec3<f32>,
};

struct UniformLight {
  color: vec3<f32>,
  position: vec3<f32>,
  direction: vec3<f32>,
  attenuation: vec3<f32>,
  coneCos: vec2<f32>,
};

struct lightingUniforms {
  enabled: i32,
  directionalLightCount: i32,
  pointLightCount: i32,
  spotLightCount: i32,
  ambientColor: vec3<f32>,
  lights: array<UniformLight, 5>,
};

@group(2) @binding(auto) var<uniform> lighting : lightingUniforms;

fn lighting_getPointLight(index: i32) -> PointLight {
  let light = lighting.lights[index];
  return PointLight(light.color, light.position, light.attenuation);
}

fn lighting_getSpotLight(index: i32) -> SpotLight {
  let light = lighting.lights[lighting.pointLightCount + index];
  return SpotLight(light.color, light.position, light.direction, light.attenuation, light.coneCos);
}

fn lighting_getDirectionalLight(index: i32) -> DirectionalLight {
  let light = lighting.lights[lighting.pointLightCount + lighting.spotLightCount + index];
  return DirectionalLight(light.color, light.direction);
}

fn getPointLightAttenuation(pointLight: PointLight, distance: f32) -> f32 {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}

fn getSpotLightAttenuation(spotLight: SpotLight, positionWorldspace: vec3<f32>) -> f32 {
  let lightDirection = normalize(positionWorldspace - spotLight.position);
  let coneFactor = smoothstep(
    spotLight.coneCos.y,
    spotLight.coneCos.x,
    dot(normalize(spotLight.direction), lightDirection)
  );
  let distanceAttenuation = getPointLightAttenuation(
    PointLight(spotLight.color, spotLight.position, spotLight.attenuation),
    distance(spotLight.position, positionWorldspace)
  );
  return distanceAttenuation / max(coneFactor, 0.0001);
}
`,Xt=5,Zt={props:{},uniforms:{},name:`lighting`,defines:{},uniformTypes:{enabled:`i32`,directionalLightCount:`i32`,pointLightCount:`i32`,spotLightCount:`i32`,ambientColor:`vec3<f32>`,lights:[{color:`vec3<f32>`,position:`vec3<f32>`,direction:`vec3<f32>`,attenuation:`vec3<f32>`,coneCos:`vec2<f32>`},Xt]},defaultUniforms:nn(),bindingLayout:[{name:`lighting`,group:2}],firstBindingSlot:0,source:Yt,vs:Jt,fs:Jt,getUniforms:Qt};function Qt(e,t={}){if(e&&={...e},!e)return nn();e.lights&&(e={...e,...en(e.lights),lights:void 0});let{useByteColors:n,ambientLight:r,pointLights:i,spotLights:a,directionalLights:o}=e||{};if(!(r||i&&i.length>0||a&&a.length>0||o&&o.length>0))return{...nn(),enabled:0};let s={...nn(),...$t({useByteColors:n,ambientLight:r,pointLights:i,spotLights:a,directionalLights:o})};return e.enabled!==void 0&&(s.enabled=+!!e.enabled),s}function $t({useByteColors:e,ambientLight:t,pointLights:n=[],spotLights:r=[],directionalLights:i=[]}){let a=rn(),o=0,s=0,c=0,l=0;for(let t of n){if(o>=Xt)break;a[o]={...a[o],color:tn(t,e),position:t.position,attenuation:t.attenuation||[1,0,0]},o++,s++}for(let t of r){if(o>=Xt)break;a[o]={...a[o],color:tn(t,e),position:t.position,direction:t.direction,attenuation:t.attenuation||[1,0,0],coneCos:on(t)},o++,c++}for(let t of i){if(o>=Xt)break;a[o]={...a[o],color:tn(t,e),direction:t.direction},o++,l++}return n.length+r.length+i.length>Xt&&b.warn(`MAX_LIGHTS exceeded, truncating to ${Xt}`)(),{ambientColor:tn(t,e),directionalLightCount:l,pointLightCount:s,spotLightCount:c,lights:a}}function en(e){let t={pointLights:[],spotLights:[],directionalLights:[]};for(let n of e||[])switch(n.type){case`ambient`:t.ambientLight=n;break;case`directional`:t.directionalLights?.push(n);break;case`point`:t.pointLights?.push(n);break;case`spot`:t.spotLights?.push(n)}return t}function tn(e={},t){let{color:n=[0,0,0],intensity:r=1}=e;return Nt(n,Mt(t,!0)).map(e=>e*r)}function nn(){return{enabled:1,directionalLightCount:0,pointLightCount:0,spotLightCount:0,ambientColor:[.1,.1,.1],lights:rn()}}function rn(){return Array.from({length:Xt},()=>an())}function an(){return{color:[1,1,1],position:[1,1,2],direction:[1,1,1],attenuation:[1,0,0],coneCos:[1,0]}}function on(e){let t=e.innerConeAngle??0,n=e.outerConeAngle??Math.PI/4;return[Math.cos(t),Math.cos(n)]}var sn={props:{},name:`gouraudMaterial`,bindingLayout:[{name:`gouraudMaterial`,group:3}],vs:`layout(std140) uniform gouraudMaterialUniforms {
  uniform bool unlit;
  uniform float ambient;
  uniform float diffuse;
  uniform float shininess;
  uniform vec3  specularColor;
} material;

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 light_direction, vec3 view_direction, vec3 normal_worldspace, vec3 color) {
  vec3 halfway_direction = normalize(light_direction + view_direction);
  float lambertian = dot(light_direction, normal_worldspace);
  float specular = 0.0;
  if (lambertian > 0.0) {
    float specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
    specular = pow(specular_angle, material.shininess);
  }
  lambertian = max(lambertian, 0.0);
  return (lambertian * material.diffuse * surfaceColor + specular * floatColors_normalize(material.specularColor)) * color;
}

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 cameraPosition, vec3 position_worldspace, vec3 normal_worldspace) {
  vec3 lightColor = surfaceColor;

  if (material.unlit) {
    return surfaceColor;
  }

  if (lighting.enabled == 0) {
    return lightColor;
  }

  vec3 view_direction = normalize(cameraPosition - position_worldspace);
  lightColor = material.ambient * surfaceColor * lighting.ambientColor;

  for (int i = 0; i < lighting.pointLightCount; i++) {
    PointLight pointLight = lighting_getPointLight(i);
    vec3 light_position_worldspace = pointLight.position;
    vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
    float light_attenuation = getPointLightAttenuation(pointLight, distance(light_position_worldspace, position_worldspace));
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color / light_attenuation);
  }

  for (int i = 0; i < lighting.spotLightCount; i++) {
    SpotLight spotLight = lighting_getSpotLight(i);
    vec3 light_position_worldspace = spotLight.position;
    vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
    float light_attenuation = getSpotLightAttenuation(spotLight, position_worldspace);
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, spotLight.color / light_attenuation);
  }

  for (int i = 0; i < lighting.directionalLightCount; i++) {
    DirectionalLight directionalLight = lighting_getDirectionalLight(i);
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }
  
  return lightColor;
}
`,fs:`layout(std140) uniform gouraudMaterialUniforms {
  uniform bool unlit;
  uniform float ambient;
  uniform float diffuse;
  uniform float shininess;
  uniform vec3  specularColor;
} material;
`,source:`struct gouraudMaterialUniforms {
  unlit: u32,
  ambient: f32,
  diffuse: f32,
  shininess: f32,
  specularColor: vec3<f32>,
};

@group(3) @binding(auto) var<uniform> gouraudMaterial : gouraudMaterialUniforms;

fn lighting_getLightColor(surfaceColor: vec3<f32>, light_direction: vec3<f32>, view_direction: vec3<f32>, normal_worldspace: vec3<f32>, color: vec3<f32>) -> vec3<f32> {
  let halfway_direction: vec3<f32> = normalize(light_direction + view_direction);
  var lambertian: f32 = dot(light_direction, normal_worldspace);
  var specular: f32 = 0.0;
  if (lambertian > 0.0) {
    let specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
    specular = pow(specular_angle, gouraudMaterial.shininess);
  }
  lambertian = max(lambertian, 0.0);
  return (
    lambertian * gouraudMaterial.diffuse * surfaceColor +
    specular * floatColors_normalize(gouraudMaterial.specularColor)
  ) * color;
}

fn lighting_getLightColor2(surfaceColor: vec3<f32>, cameraPosition: vec3<f32>, position_worldspace: vec3<f32>, normal_worldspace: vec3<f32>) -> vec3<f32> {
  var lightColor: vec3<f32> = surfaceColor;

  if (gouraudMaterial.unlit != 0u) {
    return surfaceColor;
  }

  if (lighting.enabled == 0) {
    return lightColor;
  }

  let view_direction: vec3<f32> = normalize(cameraPosition - position_worldspace);
  lightColor = gouraudMaterial.ambient * surfaceColor * lighting.ambientColor;

  for (var i: i32 = 0; i < lighting.pointLightCount; i++) {
    let pointLight: PointLight = lighting_getPointLight(i);
    let light_position_worldspace: vec3<f32> = pointLight.position;
    let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
    let light_attenuation = getPointLightAttenuation(
      pointLight,
      distance(light_position_worldspace, position_worldspace)
    );
    lightColor += lighting_getLightColor(
      surfaceColor,
      light_direction,
      view_direction,
      normal_worldspace,
      pointLight.color / light_attenuation
    );
  }

  for (var i: i32 = 0; i < lighting.spotLightCount; i++) {
    let spotLight: SpotLight = lighting_getSpotLight(i);
    let light_position_worldspace: vec3<f32> = spotLight.position;
    let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
    let light_attenuation = getSpotLightAttenuation(spotLight, position_worldspace);
    lightColor += lighting_getLightColor(
      surfaceColor,
      light_direction,
      view_direction,
      normal_worldspace,
      spotLight.color / light_attenuation
    );
  }

  for (var i: i32 = 0; i < lighting.directionalLightCount; i++) {
    let directionalLight: DirectionalLight = lighting_getDirectionalLight(i);
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }  
  
  return lightColor;
}

fn lighting_getSpecularLightColor(cameraPosition: vec3<f32>, position_worldspace: vec3<f32>, normal_worldspace: vec3<f32>) -> vec3<f32>{
  var lightColor = vec3<f32>(0, 0, 0);
  let surfaceColor = vec3<f32>(0, 0, 0);

  if (lighting.enabled != 0) {
    let view_direction = normalize(cameraPosition - position_worldspace);

    for (var i: i32 = 0; i < lighting.pointLightCount; i++) {
      let pointLight: PointLight = lighting_getPointLight(i);
      let light_position_worldspace: vec3<f32> = pointLight.position;
      let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
      let light_attenuation = getPointLightAttenuation(
        pointLight,
        distance(light_position_worldspace, position_worldspace)
      );
      lightColor += lighting_getLightColor(
        surfaceColor,
        light_direction,
        view_direction,
        normal_worldspace,
        pointLight.color / light_attenuation
      );
    }

    for (var i: i32 = 0; i < lighting.spotLightCount; i++) {
      let spotLight: SpotLight = lighting_getSpotLight(i);
      let light_position_worldspace: vec3<f32> = spotLight.position;
      let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
      let light_attenuation = getSpotLightAttenuation(spotLight, position_worldspace);
      lightColor += lighting_getLightColor(
        surfaceColor,
        light_direction,
        view_direction,
        normal_worldspace,
        spotLight.color / light_attenuation
      );
    }

    for (var i: i32 = 0; i < lighting.directionalLightCount; i++) {
        let directionalLight: DirectionalLight = lighting_getDirectionalLight(i);
        lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
    }
  }
  return lightColor;
}
`,defines:{LIGHTING_VERTEX:!0},dependencies:[Zt,Gt],uniformTypes:{unlit:`i32`,ambient:`f32`,diffuse:`f32`,shininess:`f32`,specularColor:`vec3<f32>`},defaultUniforms:{unlit:!1,ambient:.35,diffuse:.6,shininess:32,specularColor:[38.25,38.25,38.25]},getUniforms(e){return{...sn.defaultUniforms,...e}}},cn=1,ln=1,un=class{time=0;channels=new Map;animations=new Map;playing=!1;lastEngineTime=-1;constructor(){}addChannel(e){let{delay:t=0,duration:n=1/0,rate:r=1,repeat:i=1}=e,a=cn++,o={time:0,delay:t,duration:n,rate:r,repeat:i};return this._setChannelTime(o,this.time),this.channels.set(a,o),a}removeChannel(e){this.channels.delete(e);for(let[t,n]of this.animations)n.channel===e&&this.detachAnimation(t)}isFinished(e){let t=this.channels.get(e);return t!==void 0&&this.time>=t.delay+t.duration*t.repeat}getTime(e){if(e===void 0)return this.time;let t=this.channels.get(e);return t===void 0?-1:t.time}setTime(e){this.time=Math.max(0,e);let t=this.channels.values();for(let e of t)this._setChannelTime(e,this.time);let n=this.animations.values();for(let e of n){let{animation:t,channel:n}=e;t.setTime(this.getTime(n))}}play(){this.playing=!0}pause(){this.playing=!1,this.lastEngineTime=-1}reset(){this.setTime(0)}attachAnimation(e,t){let n=ln++;return this.animations.set(n,{animation:e,channel:t}),e.setTime(this.getTime(t)),n}detachAnimation(e){this.animations.delete(e)}update(e){this.playing&&(this.lastEngineTime===-1&&(this.lastEngineTime=e),this.setTime(this.time+(e-this.lastEngineTime)),this.lastEngineTime=e)}_setChannelTime(e,t){let n=t-e.delay;n>=e.duration*e.repeat?e.time=e.duration*e.rate:(e.time=Math.max(0,n)%e.duration,e.time*=e.rate)}};function dn(e){let t=typeof window<`u`?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame:null;return t?t.call(window,e):setTimeout(()=>e(typeof performance<`u`?performance.now():Date.now()),1e3/60)}function fn(e){let t=typeof window<`u`?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame:null;if(t){t.call(window,e);return}clearTimeout(e)}var pn=0,mn=`Animation Loop`,hn={requestAnimationFrame:e=>dn(e),cancelAnimationFrame:e=>fn(e)},gn=class e{static defaultAnimationLoopProps={device:null,onAddHTML:()=>``,onInitialize:async()=>null,onRender:()=>{},onFinalize:()=>{},onError:e=>{console.error(e)},stats:void 0,autoResizeViewport:!1,animationFrameProvider:hn};device=null;canvas=null;props;animationProps=null;timeline=null;stats;sharedStats;cpuTime;gpuTime;frameRate;display;_needsRedraw=`initialized`;_initialized=!1;_running=!1;_animationFrameId=null;_nextFramePromise=null;_resolveNextFrame=null;_cpuStartTime=0;_error=null;_lastFrameTime=0;constructor(t){if(this.props={...e.defaultAnimationLoopProps,...t},t=this.props,!t.device)throw Error(`No device provided`);this.stats=t.stats||new k({id:`animation-loop-${pn++}`}),this.sharedStats=ie.stats.get(mn),this.frameRate=this.stats.get(`Frame Rate`),this.frameRate.setSampleSize(1),this.cpuTime=this.stats.get(`CPU Time`),this.gpuTime=this.stats.get(`GPU Time`),this.setProps({autoResizeViewport:t.autoResizeViewport,animationFrameProvider:t.animationFrameProvider}),this.start=this.start.bind(this),this.stop=this.stop.bind(this),this._onMousemove=this._onMousemove.bind(this),this._onMouseleave=this._onMouseleave.bind(this)}destroy(){this.stop(),this._setDisplay(null),this.device?._disableDebugGPUTime()}delete(){this.destroy()}reportError(t){this._error=t,this.props.onError(t),this.props.onError===e.defaultAnimationLoopProps.onError&&typeof window<`u`&&typeof ErrorEvent<`u`&&window.dispatchEvent(new ErrorEvent(`error`,{error:t,message:t.message}))}setNeedsRedraw(e){return this._needsRedraw=this._needsRedraw||e,this}needsRedraw(){let e=this._needsRedraw;return this._needsRedraw=!1,e}setProps(e){if(`autoResizeViewport`in e&&(this.props.autoResizeViewport=e.autoResizeViewport||!1),`animationFrameProvider`in e){let t=e.animationFrameProvider||hn;if(t!==this.props.animationFrameProvider){let e=this._animationFrameId!==null;e&&this._cancelAnimationFrame(),this.props.animationFrameProvider=t,e&&this._requestAnimationFrame()}}return this}async start(){if(this._running)return this;this._running=!0;try{if(!this._initialized){if(this._initialized=!0,await this._initDevice(),this._initialize(),!this._running)return null;await this.props.onInitialize(this._getAnimationProps())}return this._running?(this._cancelAnimationFrame(),this._requestAnimationFrame(),this):null}catch(e){let t=e instanceof Error?e:Error(`Unknown error`);throw this.props.onError(t),t}}stop(){if(this._running){let e=this.animationProps;this._cancelAnimationFrame(),this._nextFramePromise=null,this._resolveNextFrame=null,this._running=!1,this._lastFrameTime=0,e&&this.props.onFinalize(e)}return this}redraw(e,t=null){return this.device?.isLost||this._error?this:(this._beginFrameTimers(e),this._setupFrame(),this.animationProps&&(this.animationProps.animationFrame=t),this._updateAnimationProps(),this._renderFrame(this._getAnimationProps()),this._clearNeedsRedraw(),this._resolveNextFrame&&=(this._resolveNextFrame(this),this._nextFramePromise=null,null),this._endFrameTimers(),this)}attachTimeline(e){return this.timeline=e,this.timeline}detachTimeline(){this.timeline=null}waitForRender(){return this.setNeedsRedraw(`waitForRender`),this._nextFramePromise||=new Promise(e=>{this._resolveNextFrame=e}),this._nextFramePromise}async toDataURL(){if(this.setNeedsRedraw(`toDataURL`),await this.waitForRender(),this.canvas instanceof HTMLCanvasElement)return this.canvas.toDataURL();throw Error(`OffscreenCanvas`)}_initialize(){this._startEventHandling(),this._initializeAnimationProps(),this._updateAnimationProps(),this._resizeViewport(),this.device?._enableDebugGPUTime()}_setDisplay(e){this.display&&(this.display.destroy(),this.display.animationLoop=null),e&&(e.animationLoop=this),this.display=e}_requestAnimationFrame(){this._running&&(this._animationFrameId=this.props.animationFrameProvider.requestAnimationFrame(this._animationFrame.bind(this)))}_cancelAnimationFrame(){this._animationFrameId!==null&&(this.props.animationFrameProvider.cancelAnimationFrame(this._animationFrameId),this._animationFrameId=null)}_animationFrame(e,t){if(this._running)try{this.redraw(e,t??null),this._requestAnimationFrame()}catch(e){let t=e instanceof Error?e:Error(String(e));this.reportError(t),this.stop()}}_renderFrame(e){if(this.display){this.display._renderFrame(e);return}let t=this.props.onRender(this._getAnimationProps());this.device&&t!==!1&&this.device.submit()}_clearNeedsRedraw(){this._needsRedraw=!1}_setupFrame(){this._resizeViewport()}_initializeAnimationProps(){let e=this.device?.getDefaultCanvasContext();if(!this.device||!e)throw Error(`loop`);let t=e?.canvas,n=e.props.useDevicePixels;this.animationProps={animationLoop:this,device:this.device,canvasContext:e,canvas:t,useDevicePixels:n,timeline:this.timeline,needsRedraw:!1,width:1,height:1,aspect:1,time:0,startTime:Date.now(),engineTime:0,tick:0,tock:0,animationFrame:null,_mousePosition:null}}_getAnimationProps(){if(!this.animationProps)throw Error(`animationProps`);return this.animationProps}_updateAnimationProps(){if(!this.animationProps)return;let{width:e,height:t,aspect:n}=this._getSizeAndAspect();(e!==this.animationProps.width||t!==this.animationProps.height)&&this.setNeedsRedraw(`drawing buffer resized`),n!==this.animationProps.aspect&&this.setNeedsRedraw(`drawing buffer aspect changed`),this.animationProps.width=e,this.animationProps.height=t,this.animationProps.aspect=n,this.animationProps.needsRedraw=this._needsRedraw,this.animationProps.engineTime=Date.now()-this.animationProps.startTime,this.timeline&&this.timeline.update(this.animationProps.engineTime),this.animationProps.tick=Math.floor(this.animationProps.time/1e3*60),this.animationProps.tock++,this.animationProps.time=this.timeline?this.timeline.getTime():this.animationProps.engineTime}async _initDevice(){if(this.device=await this.props.device,!this.device)throw Error(`No device provided`);this.canvas=this.device.getDefaultCanvasContext().canvas||null}_createInfoDiv(){if(this.canvas&&this.props.onAddHTML){let e=document.createElement(`div`);document.body.appendChild(e),e.style.position=`relative`;let t=document.createElement(`div`);t.style.position=`absolute`,t.style.left=`10px`,t.style.bottom=`10px`,t.style.width=`300px`,t.style.background=`white`,this.canvas instanceof HTMLCanvasElement&&e.appendChild(this.canvas),e.appendChild(t);let n=this.props.onAddHTML(t);n&&(t.innerHTML=n)}}_getSizeAndAspect(){if(!this.device)return{width:1,height:1,aspect:1};let[e,t]=this.device.getDefaultCanvasContext().getDrawingBufferSize();return{width:e,height:t,aspect:e>0&&t>0?e/t:1}}_resizeViewport(){this.props.autoResizeViewport&&this.device.gl&&this.device.gl.viewport(0,0,this.device.gl.drawingBufferWidth,this.device.gl.drawingBufferHeight)}_beginFrameTimers(e){let t=e??(typeof performance<`u`?performance.now():Date.now());if(this._lastFrameTime){let e=t-this._lastFrameTime;e>0&&this.frameRate.addTime(e)}this._lastFrameTime=t,this.device?._isDebugGPUTimeEnabled()&&this._consumeEncodedGpuTime(),this.cpuTime.timeStart()}_endFrameTimers(){this.device?._isDebugGPUTimeEnabled()&&this._consumeEncodedGpuTime(),this.cpuTime.timeEnd(),this._updateSharedStats()}_consumeEncodedGpuTime(){if(!this.device)return;let e=this.device.commandEncoder._gpuTimeMs;e!==void 0&&(this.gpuTime.addTime(e),this.device.commandEncoder._gpuTimeMs=void 0)}_updateSharedStats(){if(this.stats!==this.sharedStats){for(let e of Object.keys(this.sharedStats.stats))this.stats.stats[e]||delete this.sharedStats.stats[e];this.stats.forEach(e=>{let t=this.sharedStats.get(e.name,e.type);t.sampleSize=e.sampleSize,t.time=e.time,t.count=e.count,t.samples=e.samples,t.lastTiming=e.lastTiming,t.lastSampleTime=e.lastSampleTime,t.lastSampleCount=e.lastSampleCount,t._count=e._count,t._time=e._time,t._samples=e._samples,t._startTime=e._startTime,t._timerPending=e._timerPending})}}_startEventHandling(){this.canvas&&(this.canvas.addEventListener(`mousemove`,this._onMousemove.bind(this)),this.canvas.addEventListener(`mouseleave`,this._onMouseleave.bind(this)))}_onMousemove(e){e instanceof MouseEvent&&(this._getAnimationProps()._mousePosition=[e.offsetX,e.offsetY])}_onMouseleave(e){this._getAnimationProps()._mousePosition=null}},_n={WEBGL_depth_texture:{UNSIGNED_INT_24_8_WEBGL:34042},OES_element_index_uint:{},OES_texture_float:{},OES_texture_half_float:{HALF_FLOAT_OES:5131},EXT_color_buffer_float:{},OES_standard_derivatives:{FRAGMENT_SHADER_DERIVATIVE_HINT_OES:35723},EXT_frag_depth:{},EXT_blend_minmax:{MIN_EXT:32775,MAX_EXT:32776},EXT_shader_texture_lod:{}},vn=e=>({drawBuffersWEBGL(t){return e.drawBuffers(t)},COLOR_ATTACHMENT0_WEBGL:36064,COLOR_ATTACHMENT1_WEBGL:36065,COLOR_ATTACHMENT2_WEBGL:36066,COLOR_ATTACHMENT3_WEBGL:36067}),yn=e=>({VERTEX_ARRAY_BINDING_OES:34229,createVertexArrayOES(){return e.createVertexArray()},deleteVertexArrayOES(t){return e.deleteVertexArray(t)},isVertexArrayOES(t){return e.isVertexArray(t)},bindVertexArrayOES(t){return e.bindVertexArray(t)}}),bn=e=>({VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE:35070,drawArraysInstancedANGLE(...t){return e.drawArraysInstanced(...t)},drawElementsInstancedANGLE(...t){return e.drawElementsInstanced(...t)},vertexAttribDivisorANGLE(...t){return e.vertexAttribDivisor(...t)}});function xn(e=!0){let t=HTMLCanvasElement.prototype;if(!e&&t.originalGetContext){t.getContext=t.originalGetContext,t.originalGetContext=void 0;return}t.originalGetContext=t.getContext,t.getContext=function(e,t){if(e===`webgl`||e===`experimental-webgl`){let e=this.originalGetContext(`webgl2`,t);return e instanceof HTMLElement&&Sn(e),e}return this.originalGetContext(e,t)}}function Sn(e){e.getExtension(`EXT_color_buffer_float`);let t={..._n,WEBGL_disjoint_timer_query:e.getExtension(`EXT_disjoint_timer_query_webgl2`),WEBGL_draw_buffers:vn(e),OES_vertex_array_object:yn(e),ANGLE_instanced_arrays:bn(e)},n=e.getExtension.bind(e);e.getExtension=function(e){return n(e)||(e in t?t[e]:null)};let r=e.getSupportedExtensions;e.getSupportedExtensions=function(){return(r.apply(e)||[])?.concat(Object.keys(t))}}var Cn=1,wn=class extends P{type=`webgl`;enforceWebGL2(e){xn(e)}isSupported(){return typeof WebGL2RenderingContext<`u`}isDeviceHandle(e){return typeof WebGL2RenderingContext<`u`&&e instanceof WebGL2RenderingContext||(typeof WebGLRenderingContext<`u`&&e instanceof WebGLRenderingContext&&b.warn(`WebGL1 is not supported`,e)(),!1)}async attach(e,t={}){let{WebGLDevice:n}=await u(async()=>{let{WebGLDevice:e}=await import(`./webgl-device-eVK2MGsb.js`).then(e=>e.n);return{WebGLDevice:e}},__vite__mapDeps([0,1,2,3]));if(e instanceof n)return e;let r=n.getDeviceFromContext(e);if(r)return r;if(!Tn(e))throw Error(`Invalid WebGL2RenderingContext`);t=Dn(t),await On(t);let i=t.createCanvasContext===!0?{}:t.createCanvasContext;return new n({...t,_handle:e,createCanvasContext:{canvas:e.canvas,autoResize:!1,...i}})}async create(e={}){let{WebGLDevice:t}=await u(async()=>{let{WebGLDevice:e}=await import(`./webgl-device-eVK2MGsb.js`).then(e=>e.n);return{WebGLDevice:e}},__vite__mapDeps([0,1,2,3]));e=Dn(e),await On(e);try{let n=new t(e);b.groupCollapsed(Cn,`WebGLDevice ${n.id} created`)();let r=`\
${n._reused?`Reusing`:`Created`} device with WebGL2 ${n.props.debug?`debug `:``}context: \
${n.info.vendor}, ${n.info.renderer} for canvas: ${n.canvasContext.id}`;return b.probe(Cn,r)(),b.table(Cn,n.info)(),n}finally{b.groupEnd(Cn)(),b.info(Cn,`%cWebGL call tracing: luma.log.set('debug-webgl') `,`color: white; background: blue; padding: 2px 6px; border-radius: 3px;`)()}}};function Tn(e){return typeof WebGL2RenderingContext<`u`&&e instanceof WebGL2RenderingContext||!!(e&&typeof e.createVertexArray==`function`)}var En=new wn;function Dn(e){return{...e,debug:e.debug??w.defaultProps.debug,debugWebGL:e.debugWebGL??w.defaultProps.debugWebGL,debugSpectorJS:e.debugSpectorJS??!!b.get(`debug-spectorjs`)}}async function On(e){let t=[];(e.debugWebGL||e.debug)&&t.push(E()),e.debugSpectorJS&&t.push(O(e));let n=await Promise.allSettled(t);for(let e of n)e.status===`rejected`&&b.error(`Failed to initialize debug libraries ${e.reason}`)()}function kn(e,t){if(!e)throw Error(t||`loader assertion failed.`)}var An={self:typeof self<`u`&&self,window:typeof window<`u`&&window,global:typeof global<`u`&&global,document:typeof document<`u`&&document};An.self||An.window||An.global,An.window||An.self||An.global,An.global||An.self||An.window,An.document;var jn=!!(typeof process!=`object`||String(process)!==`[object process]`||process.browser),Mn=typeof process<`u`&&process.version&&/v([0-9]*)/.exec(process.version);Mn&&parseFloat(Mn[1]);var Nn=`v4.4.4`;function Pn(){let e=new C({id:`loaders.gl`});return globalThis.loaders||={},globalThis.loaders.log=e,globalThis.loaders.version=Nn,globalThis.probe||={},globalThis.probe.loaders=e,e}var Fn=Pn(),In=e=>typeof e==`boolean`,Ln=e=>typeof e==`function`,Rn=e=>typeof e==`object`&&!!e,zn=e=>Rn(e)&&e.constructor==={}.constructor,Bn=e=>typeof SharedArrayBuffer<`u`&&e instanceof SharedArrayBuffer,Vn=e=>Rn(e)&&typeof e.byteLength==`number`&&typeof e.slice==`function`,Hn=e=>!!e&&Ln(e[Symbol.iterator]),Un=e=>!!e&&Ln(e[Symbol.asyncIterator]),Wn=e=>typeof Response<`u`&&e instanceof Response||Rn(e)&&Ln(e.arrayBuffer)&&Ln(e.text)&&Ln(e.json),Gn=e=>typeof Blob<`u`&&e instanceof Blob,Kn=e=>typeof ReadableStream<`u`&&e instanceof ReadableStream||Rn(e)&&Ln(e.tee)&&Ln(e.cancel)&&Ln(e.getReader),qn=e=>Rn(e)&&Ln(e.read)&&Ln(e.pipe)&&In(e.readable),Jn=e=>Kn(e)||qn(e);function Yn(e,t){return Xn(e||{},t)}function Xn(e,t,n=0){if(n>3)return t;let r={...e};for(let[e,i]of Object.entries(t))r[e]=i&&typeof i==`object`&&!Array.isArray(i)?Xn(r[e]||{},t[e],n+1):t[e];return r}var Zn=`latest`;function Qn(){return globalThis._loadersgl_?.version||(globalThis._loadersgl_=globalThis._loadersgl_||{},globalThis._loadersgl_.version=`4.4.4`),globalThis._loadersgl_.version}var $n=Qn();function er(e,t){if(!e)throw Error(t||`loaders.gl assertion failed.`)}var tr={self:typeof self<`u`&&self,window:typeof window<`u`&&window,global:typeof global<`u`&&global,document:typeof document<`u`&&document};tr.self||tr.window||tr.global,tr.window||tr.self||tr.global,tr.global||tr.self||tr.window,tr.document;var nr=typeof process!=`object`||String(process)!==`[object process]`||process.browser,rr=typeof window<`u`&&window.orientation!==void 0,ir=typeof process<`u`&&process.version&&/v([0-9]*)/.exec(process.version);ir&&parseFloat(ir[1]);var ar=class{name;workerThread;isRunning=!0;result;_resolve=()=>{};_reject=()=>{};constructor(e,t){this.name=e,this.workerThread=t,this.result=new Promise((e,t)=>{this._resolve=e,this._reject=t})}postMessage(e,t){this.workerThread.postMessage({source:`loaders.gl`,type:e,payload:t})}done(e){er(this.isRunning),this.isRunning=!1,this._resolve(e)}error(e){er(this.isRunning),this.isRunning=!1,this._reject(e)}},or=class{terminate(){}},sr=new Map;function cr(e){er(e.source&&!e.url||!e.source&&e.url);let t=sr.get(e.source||e.url);return t||(e.url&&(t=lr(e.url),sr.set(e.url,t)),e.source&&(t=ur(e.source),sr.set(e.source,t))),er(t),t}function lr(e){return e.startsWith(`http`)?ur(dr(e)):e}function ur(e){let t=new Blob([e],{type:`application/javascript`});return URL.createObjectURL(t)}function dr(e){return`\
try {
  importScripts('${e}');
} catch (error) {
  console.error(error);
  throw error;
}`}function fr(e,t=!0,n){let r=n||new Set;if(e){if(pr(e))r.add(e);else if(pr(e.buffer))r.add(e.buffer);else if(!ArrayBuffer.isView(e)&&t&&typeof e==`object`)for(let n in e)fr(e[n],t,r)}return n===void 0?Array.from(r):[]}function pr(e){return e?e instanceof ArrayBuffer||typeof MessagePort<`u`&&e instanceof MessagePort||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof OffscreenCanvas<`u`&&e instanceof OffscreenCanvas:!1}var mr=()=>{},hr=class{name;source;url;terminated=!1;worker;onMessage;onError;_loadableURL=``;static isSupported(){return typeof Worker<`u`&&nr||or!==void 0&&!nr}constructor(e){let{name:t,source:n,url:r}=e;er(n||r),this.name=t,this.source=n,this.url=r,this.onMessage=mr,this.onError=e=>console.log(e),this.worker=nr?this._createBrowserWorker():this._createNodeWorker()}destroy(){this.onMessage=mr,this.onError=mr,this.worker.terminate(),this.terminated=!0}get isRunning(){return!!this.onMessage}postMessage(e,t){t||=fr(e),this.worker.postMessage(e,t)}_getErrorFromErrorEvent(e){let t=`Failed to load `;return t+=`worker ${this.name} from ${this.url}. `,e.message&&(t+=`${e.message} in `),e.lineno&&(t+=`:${e.lineno}:${e.colno}`),Error(t)}_createBrowserWorker(){this._loadableURL=cr({source:this.source,url:this.url});let e=new Worker(this._loadableURL,{name:this.name});return e.onmessage=e=>{e.data?this.onMessage(e.data):this.onError(Error(`No data received`))},e.onerror=e=>{this.onError(this._getErrorFromErrorEvent(e)),this.terminated=!0},e.onmessageerror=e=>console.error(e),e}_createNodeWorker(){let e;if(this.url)e=new or(this.url.includes(`:/`)||this.url.startsWith(`/`)?this.url:`./${this.url}`,{eval:!1,type:this.url.endsWith(`.ts`)||this.url.endsWith(`.mjs`)?`module`:`commonjs`});else if(this.source)e=new or(this.source,{eval:!0});else throw Error(`no worker`);return e.on(`message`,e=>{this.onMessage(e)}),e.on(`error`,e=>{this.onError(e)}),e.on(`exit`,e=>{}),e}},gr=class{name=`unnamed`;source;url;maxConcurrency=1;maxMobileConcurrency=1;onDebug=()=>{};reuseWorkers=!0;props={};jobQueue=[];idleQueue=[];count=0;isDestroyed=!1;static isSupported(){return hr.isSupported()}constructor(e){this.source=e.source,this.url=e.url,this.setProps(e)}destroy(){this.idleQueue.forEach(e=>e.destroy()),this.isDestroyed=!0}setProps(e){this.props={...this.props,...e},e.name!==void 0&&(this.name=e.name),e.maxConcurrency!==void 0&&(this.maxConcurrency=e.maxConcurrency),e.maxMobileConcurrency!==void 0&&(this.maxMobileConcurrency=e.maxMobileConcurrency),e.reuseWorkers!==void 0&&(this.reuseWorkers=e.reuseWorkers),e.onDebug!==void 0&&(this.onDebug=e.onDebug)}async startJob(e,t=(e,t,n)=>e.done(n),n=(e,t)=>e.error(t)){let r=new Promise(r=>(this.jobQueue.push({name:e,onMessage:t,onError:n,onStart:r}),this));return this._startQueuedJob(),await r}async _startQueuedJob(){if(!this.jobQueue.length)return;let e=this._getAvailableWorker();if(!e)return;let t=this.jobQueue.shift();if(t){this.onDebug({message:`Starting job`,name:t.name,workerThread:e,backlog:this.jobQueue.length});let n=new ar(t.name,e);e.onMessage=e=>t.onMessage(n,e.type,e.payload),e.onError=e=>t.onError(n,e),t.onStart(n);try{await n.result}catch(e){console.error(`Worker exception: ${e}`)}finally{this.returnWorkerToQueue(e)}}}returnWorkerToQueue(e){!nr||this.isDestroyed||!this.reuseWorkers||this.count>this._getMaxConcurrency()?(e.destroy(),this.count--):this.idleQueue.push(e),this.isDestroyed||this._startQueuedJob()}_getAvailableWorker(){return this.idleQueue.length>0?this.idleQueue.shift()||null:this.count<this._getMaxConcurrency()?(this.count++,new hr({name:`${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`,source:this.source,url:this.url})):null}_getMaxConcurrency(){return rr?this.maxMobileConcurrency:this.maxConcurrency}},_r={maxConcurrency:3,maxMobileConcurrency:1,reuseWorkers:!0,onDebug:()=>{}},vr=class e{props;workerPools=new Map;static _workerFarm;static isSupported(){return hr.isSupported()}static getWorkerFarm(t={}){return e._workerFarm=e._workerFarm||new e({}),e._workerFarm.setProps(t),e._workerFarm}constructor(e){this.props={..._r},this.setProps(e),this.workerPools=new Map}destroy(){for(let e of this.workerPools.values())e.destroy();this.workerPools=new Map}setProps(e){this.props={...this.props,...e};for(let e of this.workerPools.values())e.setProps(this._getWorkerPoolProps())}getWorkerPool(e){let{name:t,source:n,url:r}=e,i=this.workerPools.get(t);return i||(i=new gr({name:t,source:n,url:r}),i.setProps(this._getWorkerPoolProps()),this.workerPools.set(t,i)),i}_getWorkerPoolProps(){return{maxConcurrency:this.props.maxConcurrency,maxMobileConcurrency:this.props.maxMobileConcurrency,reuseWorkers:this.props.reuseWorkers,onDebug:this.props.onDebug}}};function yr(e,t={}){let n=t[e.id]||{},r=nr?`${e.id}-worker.js`:`${e.id}-worker-node.js`,i=n.workerUrl;if(!i&&e.id===`compression`&&(i=t.workerUrl),(t._workerType||t?.core?._workerType)===`test`&&(i=nr?`modules/${e.module}/dist/${r}`:`modules/${e.module}/src/workers/${e.id}-worker-node.ts`),!i){let t=e.version;t===`latest`&&(t=Zn);let n=t?`@${t}`:``;i=`https://unpkg.com/@loaders.gl/${e.module}${n}/dist/${r}`}return er(i),i}function br(e,t=$n){er(e,`no worker provided`);let n=e.version;return!(!t||!n)}function xr(e,t){if(!vr.isSupported())return!1;let n=t?._nodeWorkers??t?.core?._nodeWorkers;if(!nr&&!n)return!1;let r=t?.worker??t?.core?.worker;return!!(e.worker&&r)}async function Sr(e,t,n,r,i){let a=e.id,o=yr(e,n),s=vr.getWorkerFarm(n?.core).getWorkerPool({name:a,url:o});n=JSON.parse(JSON.stringify(n)),r=JSON.parse(JSON.stringify(r||{}));let c=await s.startJob(`process-on-worker`,Cr.bind(null,i));return c.postMessage(`process`,{input:t,options:n,context:r}),await(await c.result).result}async function Cr(e,t,n,r){switch(n){case`done`:t.done(r);break;case`error`:t.error(Error(r.error));break;case`process`:let{id:i,input:a,options:o}=r;try{let n=await e(a,o);t.postMessage(`done`,{id:i,result:n})}catch(e){let n=e instanceof Error?e.message:`unknown error`;t.postMessage(`error`,{id:i,error:n})}break;default:console.warn(`parse-with-worker unknown message ${n}`)}}function wr(e,t,n){if(n||=e.byteLength,e.byteLength<n||t.byteLength<n)return!1;let r=new Uint8Array(e),i=new Uint8Array(t);for(let e=0;e<r.length;++e)if(r[e]!==i[e])return!1;return!0}function Tr(...e){return Er(e)}function Er(e){let t=e.map(e=>e instanceof ArrayBuffer?new Uint8Array(e):e),n=t.reduce((e,t)=>e+t.byteLength,0),r=new Uint8Array(n),i=0;for(let e of t)r.set(e,i),i+=e.byteLength;return r.buffer}async function Dr(e){let t=[];for await(let n of e)t.push(Or(n));return Tr(...t)}function Or(e){if(e instanceof ArrayBuffer)return e;if(ArrayBuffer.isView(e)){let{buffer:t,byteOffset:n,byteLength:r}=e;return kr(t,n,r)}return kr(e)}function kr(e,t=0,n=e.byteLength-t){let r=new Uint8Array(e,t,n),i=new Uint8Array(r.length);return i.set(r),i.buffer}var Ar=``,jr={};function Mr(e){for(let t in jr)if(e.startsWith(t)){let n=jr[t];e=e.replace(t,n)}return!e.startsWith(`http://`)&&!e.startsWith(`https://`)&&(e=`${Ar}${e}`),e}function Nr(e){return e}function Pr(e){return e&&typeof e==`object`&&e.isBuffer}function Fr(e){if(Pr(e))return Nr(e);if(e instanceof ArrayBuffer)return e;if(Bn(e))return Lr(e);if(ArrayBuffer.isView(e)){let t=e.buffer;return e.byteOffset===0&&e.byteLength===e.buffer.byteLength?t:t.slice(e.byteOffset,e.byteOffset+e.byteLength)}if(typeof e==`string`){let t=e;return new TextEncoder().encode(t).buffer}if(e&&typeof e==`object`&&e._toArrayBuffer)return e._toArrayBuffer();throw Error(`toArrayBuffer`)}function Ir(e){if(e instanceof ArrayBuffer)return e;if(Bn(e))return Lr(e);let{buffer:t,byteOffset:n,byteLength:r}=e;return t instanceof ArrayBuffer&&n===0&&r===t.byteLength?t:Lr(t,n,r)}function Lr(e,t=0,n=e.byteLength-t){let r=new Uint8Array(e,t,n),i=new Uint8Array(r.length);return i.set(r),i.buffer}function Rr(e){return ArrayBuffer.isView(e)?e:new Uint8Array(e)}function zr(e){let t=e?e.lastIndexOf(`/`):-1;return t>=0?e.substr(t+1):e}function Br(e){let t=e?e.lastIndexOf(`/`):-1;return t>=0?e.substr(0,t):``}var Vr=class extends Error{constructor(e,t){super(e),this.reason=t.reason,this.url=t.url,this.response=t.response}reason;url;response},Hr=/^data:([-\w.]+\/[-\w.+]+)(;|,)/,Ur=/^([-\w.]+\/[-\w.+]+)/;function Wr(e,t){return e.toLowerCase()===t.toLowerCase()}function Gr(e){let t=Ur.exec(e);return t?t[1]:e}function Kr(e){let t=Hr.exec(e);return t?t[1]:``}var qr=/\?.*/;function Jr(e){let t=e.match(qr);return t&&t[0]}function Yr(e){return e.replace(qr,``)}function Xr(e){if(e.length<50)return e;let t=e.slice(e.length-15);return`${e.substr(0,32)}...${t}`}function Zr(e){return Wn(e)?e.url:Gn(e)?(`name`in e?e.name:``)||``:typeof e==`string`?e:``}function Qr(e){if(Wn(e)){let t=e.headers.get(`content-type`)||``,n=Yr(e.url);return Gr(t)||Kr(n)}return Gn(e)?e.type||``:typeof e==`string`?Kr(e):``}function $r(e){return Wn(e)?e.headers[`content-length`]||-1:Gn(e)?e.size:typeof e==`string`?e.length:e instanceof ArrayBuffer||ArrayBuffer.isView(e)?e.byteLength:-1}async function ei(e){if(Wn(e))return e;let t={},n=$r(e);n>=0&&(t[`content-length`]=String(n));let r=Zr(e),i=Qr(e);i&&(t[`content-type`]=i);let a=await ri(e);a&&(t[`x-first-bytes`]=a),typeof e==`string`&&(e=new TextEncoder().encode(e));let o=new Response(e,{headers:t});return Object.defineProperty(o,"url",{value:r}),o}async function ti(e){if(!e.ok)throw await ni(e)}async function ni(e){let t=Xr(e.url),n=`Failed to fetch resource (${e.status}) ${e.statusText}: ${t}`;n=n.length>100?`${n.slice(0,100)}...`:n;let r={reason:e.statusText,url:e.url,response:e};try{let t=e.headers.get(`Content-Type`);r.reason=!e.bodyUsed&&t?.includes(`application/json`)?await e.json():await e.text()}catch{}return new Vr(n,r)}async function ri(e){if(typeof e==`string`)return`data:,${e.slice(0,5)}`;if(e instanceof Blob){let t=e.slice(0,5);return await new Promise(e=>{let n=new FileReader;n.onload=t=>e(t?.target?.result),n.readAsDataURL(t)})}return e instanceof ArrayBuffer?`data:base64,${ii(e.slice(0,5))}`:null}function ii(e){let t=``,n=new Uint8Array(e);for(let e=0;e<n.byteLength;e++)t+=String.fromCharCode(n[e]);return btoa(t)}function ai(e){return!oi(e)&&!si(e)}function oi(e){return e.startsWith(`http:`)||e.startsWith(`https:`)}function si(e){return e.startsWith(`data:`)}async function ci(e,t){if(typeof e==`string`){let n=Mr(e);return ai(n)&&globalThis.loaders?.fetchNode?globalThis.loaders?.fetchNode(n,t):await fetch(n,t)}return await ei(e)}var li=new C({id:`loaders.gl`}),ui=class{log(){return()=>{}}info(){return()=>{}}warn(){return()=>{}}error(){return()=>{}}},di={core:{baseUrl:void 0,fetch:null,mimeType:void 0,fallbackMimeType:void 0,ignoreRegisteredLoaders:void 0,nothrow:!1,log:new class{console;constructor(){this.console=console}log(...e){return this.console.log.bind(this.console,...e)}info(...e){return this.console.info.bind(this.console,...e)}warn(...e){return this.console.warn.bind(this.console,...e)}error(...e){return this.console.error.bind(this.console,...e)}},useLocalLibraries:!1,CDN:`https://unpkg.com/@loaders.gl`,worker:!0,maxConcurrency:3,maxMobileConcurrency:1,reuseWorkers:jn,_nodeWorkers:!1,_workerType:``,limit:0,_limitMB:0,batchSize:`auto`,batchDebounceMs:0,metadata:!1,transforms:[]}},fi={baseUri:`core.baseUrl`,fetch:`core.fetch`,mimeType:`core.mimeType`,fallbackMimeType:`core.fallbackMimeType`,ignoreRegisteredLoaders:`core.ignoreRegisteredLoaders`,nothrow:`core.nothrow`,log:`core.log`,useLocalLibraries:`core.useLocalLibraries`,CDN:`core.CDN`,worker:`core.worker`,maxConcurrency:`core.maxConcurrency`,maxMobileConcurrency:`core.maxMobileConcurrency`,reuseWorkers:`core.reuseWorkers`,_nodeWorkers:`core.nodeWorkers`,_workerType:`core._workerType`,_worker:`core._workerType`,limit:`core.limit`,_limitMB:`core._limitMB`,batchSize:`core.batchSize`,batchDebounceMs:`core.batchDebounceMs`,metadata:`core.metadata`,transforms:`core.transforms`,throws:`nothrow`,dataType:`(no longer used)`,uri:`core.baseUrl`,method:`core.fetch.method`,headers:`core.fetch.headers`,body:`core.fetch.body`,mode:`core.fetch.mode`,credentials:`core.fetch.credentials`,cache:`core.fetch.cache`,redirect:`core.fetch.redirect`,referrer:`core.fetch.referrer`,referrerPolicy:`core.fetch.referrerPolicy`,integrity:`core.fetch.integrity`,keepalive:`core.fetch.keepalive`,signal:`core.fetch.signal`},pi=[`baseUrl`,`fetch`,`mimeType`,`fallbackMimeType`,`ignoreRegisteredLoaders`,`nothrow`,`log`,`useLocalLibraries`,`CDN`,`worker`,`maxConcurrency`,`maxMobileConcurrency`,`reuseWorkers`,`_nodeWorkers`,`_workerType`,`limit`,`_limitMB`,`batchSize`,`batchDebounceMs`,`metadata`,`transforms`];function mi(){globalThis.loaders=globalThis.loaders||{};let{loaders:e}=globalThis;return e._state||={},e._state}function hi(){let e=mi();return e.globalOptions=e.globalOptions||{...di,core:{...di.core}},_i(e.globalOptions)}function gi(e,t,n,r){return n||=[],n=Array.isArray(n)?n:[n],vi(e,n),_i(xi(t,e,r))}function _i(e){let t=wi(e);Ti(t);for(let e of pi)t.core&&t.core[e]!==void 0&&delete t[e];return t.core&&t.core._workerType!==void 0&&delete t._worker,t}function vi(e,t){yi(e,null,di,fi,t);for(let n of t){let r=e&&e[n.id]||{},i=n.options&&n.options[n.id]||{},a=n.deprecatedOptions&&n.deprecatedOptions[n.id]||{};yi(r,n.id,i,a,t)}}function yi(e,t,n,r,i){let a=t||`Top level`,o=t?`${t}.`:``;for(let s in e){let c=!t&&Rn(e[s]),l=s===`baseUri`&&!t,u=s===`workerUrl`&&t;if(!(s in n)&&!l&&!u){if(s in r)li.level>0&&li.warn(`${a} loader option \'${o}${s}\' no longer supported, use \'${r[s]}\'`)();else if(!c&&li.level>0){let e=bi(s,i);li.warn(`${a} loader option \'${o}${s}\' not recognized. ${e}`)()}}}}function bi(e,t){let n=e.toLowerCase(),r=``;for(let i of t)for(let t in i.options){if(e===t)return`Did you mean \'${i.id}.${t}\'?`;let a=t.toLowerCase();(n.startsWith(a)||a.startsWith(n))&&(r||=`Did you mean \'${i.id}.${t}\'?`)}return r}function xi(e,t,n){let r=e.options||{},i={...r};return r.core&&(i.core={...r.core}),Ti(i),i.core?.log===null&&(i.core={...i.core,log:new ui}),Si(i,_i(hi())),Si(i,_i(t)),Ci(i,n),Ei(i),i}function Si(e,t){for(let n in t)if(n in t){let r=t[n];e[n]=zn(r)&&zn(e[n])?{...e[n],...t[n]}:t[n]}}function Ci(e,t){t&&e.core?.baseUrl===void 0&&(e.core||={},e.core.baseUrl=Br(Yr(t)))}function wi(e){let t={...e};return e.core&&(t.core={...e.core}),t}function Ti(e){e.baseUri!==void 0&&(e.core||={},e.core.baseUrl===void 0&&(e.core.baseUrl=e.baseUri));for(let t of pi)if(e[t]!==void 0){let n=e.core=e.core||{};n[t]===void 0&&(n[t]=e[t])}let t=e._worker;t!==void 0&&(e.core||={},e.core._workerType===void 0&&(e.core._workerType=t))}function Ei(e){let t=e.core;if(t)for(let n of pi)t[n]!==void 0&&(e[n]=t[n])}function Di(e){return e?(Array.isArray(e)&&(e=e[0]),Array.isArray(e?.extensions)):!1}function Oi(e){kn(e,`null loader`),kn(Di(e),`invalid loader`);let t;return Array.isArray(e)&&(t=e[1],e=e[0],e={...e,options:{...e.options,...t}}),(e?.parseTextSync||e?.parseText)&&(e.text=!0),e.text||(e.binary=!0),e}var ki=()=>{let e=mi();return e.loaderRegistry=e.loaderRegistry||[],e.loaderRegistry};function Ai(e){let t=ki();e=Array.isArray(e)?e:[e];for(let n of e){let e=Oi(n);t.find(t=>e===t)||t.unshift(e)}}function ji(){return ki()}var Mi=/\.([^.]+)$/;async function Ni(e,t=[],n,r){if(!Li(e))return null;let i=_i(n||{});if(i.core||={},e instanceof Response&&Pi(e)){let n=Fi(await e.clone().text(),t,{...i,core:{...i.core,nothrow:!0}},r);if(n)return n}let a=Fi(e,t,{...i,core:{...i.core,nothrow:!0}},r);if(a)return a;if(Gn(e)&&(e=await e.slice(0,10).arrayBuffer(),a=Fi(e,t,i,r)),!a&&e instanceof Response&&Pi(e)&&(a=Fi(await e.clone().text(),t,i,r)),!a&&!i.core.nothrow)throw Error(Ri(e));return a}function Pi(e){let t=Qr(e);return!!(t&&(t.startsWith(`text/`)||t===`application/json`||t.endsWith(`+json`)))}function Fi(e,t=[],n,r){if(!Li(e))return null;let i=_i(n||{});if(i.core||={},t&&!Array.isArray(t))return Oi(t);let a=[];t&&(a=a.concat(t)),i.core.ignoreRegisteredLoaders||a.push(...ji()),zi(a);let o=Ii(e,a,i,r);if(!o&&!i.core.nothrow)throw Error(Ri(e));return o}function Ii(e,t,n,r){let i=Zr(e),a=Qr(e),o=Yr(i)||r?.url,s=null,c=``;return n?.core?.mimeType&&(s=Hi(t,n?.core?.mimeType),c=`match forced by supplied MIME type ${n?.core?.mimeType}`),s||=Bi(t,o),c||=s?`matched url ${o}`:``,s||=Hi(t,a),c||=s?`matched MIME type ${a}`:``,s||=Ui(t,e),c||=s?`matched initial data ${qi(e)}`:``,n?.core?.fallbackMimeType&&(s||=Hi(t,n?.core?.fallbackMimeType),c||=s?`matched fallback MIME type ${a}`:``),c&&Fn.log(1,`selectLoader selected ${s?.name}: ${c}.`),s}function Li(e){return!(e instanceof Response&&e.status===204)}function Ri(e){let t=Zr(e),n=Qr(e),r=`No valid loader found (`;r+=t?`${zr(t)}, `:`no url provided, `,r+=`MIME type: ${n?`"${n}"`:`not provided`}, `;let i=e?qi(e):``;return r+=i?` first bytes: "${i}"`:`first bytes: not available`,r+=`)`,r}function zi(e){for(let t of e)Oi(t)}function Bi(e,t){let n=t&&Mi.exec(t),r=n&&n[1];return r?Vi(e,r):null}function Vi(e,t){t=t.toLowerCase();for(let n of e)for(let e of n.extensions)if(e.toLowerCase()===t)return n;return null}function Hi(e,t){for(let n of e)if(n.mimeTypes?.some(e=>Wr(t,e))||Wr(t,`application/x.${n.id}`))return n;return null}function Ui(e,t){if(!t)return null;for(let n of e)if(typeof t==`string`){if(Wi(t,n))return n}else if(ArrayBuffer.isView(t)){if(Gi(t.buffer,t.byteOffset,n))return n}else if(t instanceof ArrayBuffer&&Gi(t,0,n))return n;return null}function Wi(e,t){return t.testText?t.testText(e):(Array.isArray(t.tests)?t.tests:[t.tests]).some(t=>e.startsWith(t))}function Gi(e,t,n){return(Array.isArray(n.tests)?n.tests:[n.tests]).some(r=>Ki(e,t,n,r))}function Ki(e,t,n,r){if(Vn(r))return wr(r,e,r.byteLength);switch(typeof r){case`function`:return r(Ir(e));case`string`:return r===Ji(e,t,r.length);default:return!1}}function qi(e,t=5){return typeof e==`string`?e.slice(0,t):ArrayBuffer.isView(e)?Ji(e.buffer,e.byteOffset,t):e instanceof ArrayBuffer?Ji(e,0,t):``}function Ji(e,t,n){if(e.byteLength<t+n)return``;let r=new DataView(e),i=``;for(let e=0;e<n;e++)i+=String.fromCharCode(r.getUint8(t+e));return i}var Yi=262144;function*Xi(e,t){let n=t?.chunkSize||Yi,r=0,i=new TextEncoder;for(;r<e.length;){let t=Math.min(e.length-r,n),a=e.slice(r,r+t);r+=t,yield Ir(i.encode(a))}}var Zi=262144;function*Qi(e,t={}){let{chunkSize:n=Zi}=t,r=0;for(;r<e.byteLength;){let t=Math.min(e.byteLength-r,n),i=new ArrayBuffer(t),a=new Uint8Array(e,r,t);new Uint8Array(i).set(a),r+=t,yield i}}var $i=1048576;async function*ea(e,t){let n=t?.chunkSize||$i,r=0;for(;r<e.size;){let t=r+n,i=await e.slice(r,t).arrayBuffer();r=t,yield i}}function ta(e,t){return jn?na(e,t):ra(e,t)}async function*na(e,t){let n=e.getReader(),r;try{for(;;){let e=r||n.read();t?._streamReadAhead&&(r=n.read());let{done:i,value:a}=await e;if(i)return;yield Fr(a)}}catch{n.releaseLock()}}async function*ra(e,t){for await(let t of e)yield Fr(t)}function ia(e,t){if(typeof e==`string`)return Xi(e,t);if(e instanceof ArrayBuffer)return Qi(e,t);if(Gn(e))return ea(e,t);if(Jn(e))return ta(e,t);if(Wn(e)){let n=e.body;if(!n)throw Error(`Readable stream not available on Response`);return ta(n,t)}throw Error(`makeIterator`)}var aa=`Cannot convert supplied data type`;function oa(e,t,n){if(t.text&&typeof e==`string`)return e;if(Pr(e)&&(e=e.buffer),Vn(e)){let n=Rr(e);return t.text&&!t.binary?new TextDecoder(`utf8`).decode(n):Fr(n)}throw Error(aa)}async function sa(e,t,n){if(typeof e==`string`||Vn(e))return oa(e,t,n);if(Gn(e)&&(e=await ei(e)),Wn(e))return await ti(e),t.binary?await e.arrayBuffer():await e.text();if(Jn(e)&&(e=ia(e,n)),Hn(e)||Un(e))return Dr(e);throw Error(aa)}function ca(e,t){let n=hi(),r=e||n,i=r.fetch??r.core?.fetch;return typeof i==`function`?i:Rn(i)?e=>ci(e,i):t?.fetch?t?.fetch:ci}function la(e,t,n){if(n)return n;let r={fetch:ca(t,e),...e};if(r.url){let e=Yr(r.url);r.baseUrl=e,r.queryString=Jr(r.url),r.filename=zr(e),r.baseUrl=Br(e)}return Array.isArray(r.loaders)||(r.loaders=null),r}function ua(e,t){if(e&&!Array.isArray(e))return e;let n;if(e&&(n=Array.isArray(e)?e:[e]),t&&t.loaders){let e=Array.isArray(t.loaders)?t.loaders:[t.loaders];n=n?[...n,...e]:e}return n&&n.length?n:void 0}async function da(e,t,n,r){t&&!Array.isArray(t)&&!Di(t)&&(r=void 0,n=t,t=void 0),e=await e,n||={};let i=Zr(e),a=ua(t,r),o=await Ni(e,a,n);if(!o)return null;let s=gi(n,o,a,i);return r=la({url:i,_parse:da,loaders:a},s,r||null),await fa(o,e,s,r)}async function fa(e,t,n,r){if(br(e),n=Yn(e.options,n),Wn(t)){let{ok:e,redirected:n,status:i,statusText:a,type:o,url:s}=t;r.response={headers:Object.fromEntries(t.headers.entries()),ok:e,redirected:n,status:i,statusText:a,type:o,url:s}}t=await sa(t,e,n);let i=e;if(i.parseTextSync&&typeof t==`string`)return i.parseTextSync(t,n,r);if(xr(e,n))return await Sr(e,t,n,r,da);if(i.parseText&&typeof t==`string`)return await i.parseText(t,n,r);if(i.parse)return await i.parse(t,n,r);throw er(!i.parseSync),Error(`${e.id} loader - no parser found and worker is disabled`)}async function pa(e,t,n,r){let i,a;!Array.isArray(t)&&!Di(t)?(i=[],a=t,r=void 0):(i=t,a=n);let o=ca(a),s=e;return typeof e==`string`&&(s=await o(e)),Gn(e)&&(s=await o(e)),typeof e==`string`&&(_i(a||{}).core?.baseUrl||(a={...a,core:{...a?.core,baseUrl:e}})),await da(s,i,a)}var ma=`4.4.4`,ha=globalThis.loaders?.parseImageNode,ga=typeof Image<`u`,_a=typeof ImageBitmap<`u`,va=jn?!0:!!ha;function ya(e){switch(e){case`auto`:return _a||ga||va;case`imagebitmap`:return _a;case`image`:return ga;case`data`:return va;default:throw Error(`@loaders.gl/images: image ${e} not supported in this environment`)}}function ba(){if(_a)return`imagebitmap`;if(ga)return`image`;if(va)return`data`;throw Error(`Install '@loaders.gl/polyfills' to parse images under Node.js`)}function xa(e){let t=Ca(e);if(!t)throw Error(`Not an image`);return t}function Sa(e){switch(xa(e)){case`data`:return e;case`image`:case`imagebitmap`:let t=document.createElement(`canvas`),n=t.getContext(`2d`);if(!n)throw Error(`getImageData`);return t.width=e.width,t.height=e.height,n.drawImage(e,0,0),n.getImageData(0,0,e.width,e.height);default:throw Error(`getImageData`)}}function Ca(e){return typeof ImageBitmap<`u`&&e instanceof ImageBitmap?`imagebitmap`:typeof Image<`u`&&e instanceof Image?`image`:e&&typeof e==`object`&&e.data&&e.width&&e.height?`data`:null}var wa=/^data:image\/svg\+xml/,Ta=/\.svg((\?|#).*)?$/;function Ea(e){return e&&(wa.test(e)||Ta.test(e))}function Da(e,t){if(Ea(t)){let t=new TextDecoder().decode(e);try{typeof unescape==`function`&&typeof encodeURIComponent==`function`&&(t=unescape(encodeURIComponent(t)))}catch(e){throw Error(e.message)}return`data:image/svg+xml;base64,${btoa(t)}`}return Oa(e,t)}function Oa(e,t){if(Ea(t))throw Error(`SVG cannot be parsed directly to imagebitmap`);return new Blob([new Uint8Array(e)])}async function ka(e,t,n){let r=Da(e,n),i=self.URL||self.webkitURL,a=typeof r!=`string`&&i.createObjectURL(r);try{return await Aa(a||r,t)}finally{a&&i.revokeObjectURL(a)}}async function Aa(e,t){let n=new Image;return n.src=e,t.image&&t.image.decode&&n.decode?(await n.decode(),n):await new Promise((e,t)=>{try{n.onload=()=>e(n),n.onerror=e=>{let n=e instanceof Error?e.message:`error`;t(Error(n))}}catch(e){t(e)}})}var ja=!0;async function Ma(e,t,n){let r;r=Ea(n)?await ka(e,t,n):Oa(e,n);let i=t&&t.imagebitmap;return await Na(r,i)}async function Na(e,t=null){if((Pa(t)||!ja)&&(t=null),t)try{return await createImageBitmap(e,t)}catch(e){console.warn(e),ja=!1}return await createImageBitmap(e)}function Pa(e){if(!e)return!0;for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Fa(e){return!za(e,`ftyp`,4)||!(e[8]&96)?null:Ia(e)}function Ia(e){switch(La(e,8,12).replace(`\0`,` `).trim()){case`avif`:case`avis`:return{extension:`avif`,mimeType:`image/avif`};default:return null}}function La(e,t,n){return String.fromCharCode(...e.slice(t,n))}function Ra(e){return[...e].map(e=>e.charCodeAt(0))}function za(e,t,n=0){let r=Ra(t);for(let t=0;t<r.length;++t)if(r[t]!==e[t+n])return!1;return!0}var Ba=!1,Va=!0;function Ha(e){let t=Ya(e);return Wa(t)||qa(t)||Ga(t)||Ka(t)||Ua(t)}function Ua(e){let t=Fa(new Uint8Array(e instanceof DataView?e.buffer:e));return t?{mimeType:t.mimeType,width:0,height:0}:null}function Wa(e){let t=Ya(e);return t.byteLength>=24&&t.getUint32(0,Ba)===2303741511?{mimeType:`image/png`,width:t.getUint32(16,Ba),height:t.getUint32(20,Ba)}:null}function Ga(e){let t=Ya(e);return t.byteLength>=10&&t.getUint32(0,Ba)===1195984440?{mimeType:`image/gif`,width:t.getUint16(6,Va),height:t.getUint16(8,Va)}:null}function Ka(e){let t=Ya(e);return t.byteLength>=14&&t.getUint16(0,Ba)===16973&&t.getUint32(2,Va)===t.byteLength?{mimeType:`image/bmp`,width:t.getUint32(18,Va),height:t.getUint32(22,Va)}:null}function qa(e){let t=Ya(e);if(!(t.byteLength>=3&&t.getUint16(0,Ba)===65496&&t.getUint8(2)===255))return null;let{tableMarkers:n,sofMarkers:r}=Ja(),i=2;for(;i+9<t.byteLength;){let e=t.getUint16(i,Ba);if(r.has(e))return{mimeType:`image/jpeg`,height:t.getUint16(i+5,Ba),width:t.getUint16(i+7,Ba)};if(!n.has(e))return null;i+=2,i+=t.getUint16(i,Ba)}return null}function Ja(){let e=new Set([65499,65476,65484,65501,65534]);for(let t=65504;t<65520;++t)e.add(t);return{tableMarkers:e,sofMarkers:new Set([65472,65473,65474,65475,65477,65478,65479,65481,65482,65483,65485,65486,65487,65502])}}function Ya(e){if(e instanceof DataView)return e;if(ArrayBuffer.isView(e))return new DataView(e.buffer);if(e instanceof ArrayBuffer)return new DataView(e);throw Error(`toDataView`)}async function Xa(e,t){let{mimeType:n}=Ha(e)||{},r=globalThis.loaders?.parseImageNode;return kn(r),await r(e,n)}async function Za(e,t,n){t||={};let r=(t.image||{}).type||`auto`,{url:i}=n||{},a=Qa(r),o;switch(a){case`imagebitmap`:o=await Ma(e,t,i);break;case`image`:o=await ka(e,t,i);break;case`data`:o=await Xa(e,t);break;default:kn(!1)}return r===`data`&&(o=Sa(o)),o}function Qa(e){switch(e){case`auto`:case`data`:return ba();default:return ya(e),e}}var $a={dataType:null,batchType:null,id:`image`,module:`images`,name:`Images`,version:ma,mimeTypes:[`image/png`,`image/jpeg`,`image/gif`,`image/webp`,`image/avif`,`image/bmp`,`image/vnd.microsoft.icon`,`image/svg+xml`],extensions:[`png`,`jpg`,`jpeg`,`gif`,`webp`,`bmp`,`ico`,`svg`,`avif`],parse:Za,tests:[e=>!!Ha(new DataView(e))],options:{image:{type:`auto`,decode:!0}}},R=new C({id:`deck`}),eo={};function to(e){eo=e}function z(e,t,n,r){R.level>0&&eo[e]&&eo[e].call(null,t,n,r)}function no(e){let t=e[0],n=e[e.length-1];return t===`{`&&n===`}`||t===`[`&&n===`]`}var ro={dataType:null,batchType:null,id:`JSON`,name:`JSON`,module:``,version:``,options:{},extensions:[`json`,`geojson`],mimeTypes:[`application/json`,`application/geo+json`],testText:no,parseTextSync:JSON.parse};function io(){let e=`9.4.0`,t=globalThis.deck&&globalThis.deck.VERSION;if(t&&t!==e)throw Error(`deck.gl - multiple versions detected: ${t} vs ${e}`);return t||(R.log(1,`deck.gl ${e}`)(),globalThis.deck={...globalThis.deck,VERSION:e,version:e,log:R,_registerLoggers:to},Ai([ro,[$a,{imagebitmap:{premultiplyAlpha:`none`}}]])),e}var ao=io(),oo=`struct LayerUniforms {
  opacity: f32,
};

@group(0) @binding(auto)
var<uniform> layer: LayerUniforms;
`,so=`layout(std140) uniform layerUniforms {
  uniform float opacity;
} layer;
`,co={name:`layer`,source:oo,vs:so,fs:so,getUniforms:e=>({opacity:e.opacity**(1/2.2)}),uniformTypes:{opacity:`f32`}},lo={name:`color`,dependencies:[],source:`

@must_use
fn deckgl_premultiplied_alpha(fragColor: vec4<f32>) -> vec4<f32> {
    return vec4(fragColor.rgb * fragColor.a, fragColor.a); 
};
`,getUniforms:e=>({})},uo=`const SMOOTH_EDGE_RADIUS: f32 = 0.5;

struct VertexGeometry {
  position: vec4<f32>,
  worldPosition: vec3<f32>,
  worldPositionAlt: vec3<f32>,
  normal: vec3<f32>,
  uv: vec2<f32>,
  pickingColor: vec3<f32>,
};

var<private> geometry_: VertexGeometry = VertexGeometry(
  vec4<f32>(0.0, 0.0, 1.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0),
  vec2<f32>(0.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0)
);

struct FragmentGeometry {
  uv: vec2<f32>,
};

var<private> fragmentGeometry: FragmentGeometry;

fn smoothedge(edge: f32, x: f32) -> f32 {
  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);
}
`,fo=`#define SMOOTH_EDGE_RADIUS 0.5`,po={name:`geometry`,source:uo,vs:`\
${fo}

struct VertexGeometry {
  vec4 position;
  vec3 worldPosition;
  vec3 worldPositionAlt;
  vec3 normal;
  vec2 uv;
  vec3 pickingColor;
} geometry = VertexGeometry(
  vec4(0.0, 0.0, 1.0, 0.0),
  vec3(0.0),
  vec3(0.0),
  vec3(0.0),
  vec2(0.0),
  vec3(0.0)
);
`,fs:`\
${fo}

struct FragmentGeometry {
  vec2 uv;
};
FragmentGeometry geometry;

float smoothedge(float edge, float x) {
  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);
}
`},B;(function(e){e[e.Start=1]=`Start`,e[e.Move=2]=`Move`,e[e.End=4]=`End`,e[e.Cancel=8]=`Cancel`})(B||={});var V;(function(e){e[e.None=0]=`None`,e[e.Left=1]=`Left`,e[e.Right=2]=`Right`,e[e.Up=4]=`Up`,e[e.Down=8]=`Down`,e[e.Horizontal=3]=`Horizontal`,e[e.Vertical=12]=`Vertical`,e[e.All=15]=`All`})(V||={});var H;(function(e){e[e.Possible=1]=`Possible`,e[e.Began=2]=`Began`,e[e.Changed=4]=`Changed`,e[e.Ended=8]=`Ended`,e[e.Recognized=8]=`Recognized`,e[e.Cancelled=16]=`Cancelled`,e[e.Failed=32]=`Failed`})(H||={});var mo=`auto`,ho=`manipulation`,go=`none`,_o=`pan-x`,vo=`pan-y`;function yo(e){if(e.includes(`none`))return go;let t=e.includes(_o),n=e.includes(vo);return t&&n?go:t||n?t?_o:vo:e.includes(`manipulation`)?ho:mo}var bo=class{constructor(e,t){this.actions=``,this.manager=e,this.set(t)}set(e){e===`compute`&&(e=this.compute()),this.manager.element&&(this.manager.element.style.touchAction=e,this.actions=e)}update(){this.set(this.manager.options.touchAction)}compute(){let e=[];for(let t of this.manager.recognizers)t.options.enable&&(e=e.concat(t.getTouchAction()));return yo(e.join(` `))}};function xo(e){return e.trim().split(/\s+/g)}function So(e,t,n){if(e)for(let r of xo(t))e.addEventListener(r,n,!1)}function Co(e,t,n){if(e)for(let r of xo(t))e.removeEventListener(r,n,!1)}function wo(e){return(e.ownerDocument||e).defaultView}function To(e,t){let n=e;for(;n;){if(n===t)return!0;n=n.parentNode}return!1}function Eo(e){let t=e.length;if(t===1)return{x:Math.round(e[0].clientX),y:Math.round(e[0].clientY)};let n=0,r=0,i=0;for(;i<t;)n+=e[i].clientX,r+=e[i].clientY,i++;return{x:Math.round(n/t),y:Math.round(r/t)}}function Do(e){let t=[],n=0;for(;n<e.pointers.length;)t[n]={clientX:Math.round(e.pointers[n].clientX),clientY:Math.round(e.pointers[n].clientY)},n++;return{timeStamp:Date.now(),pointers:t,center:Eo(t),deltaX:e.deltaX,deltaY:e.deltaY}}function Oo(e,t){let n=t.x-e.x,r=t.y-e.y;return Math.sqrt(n*n+r*r)}function ko(e,t){let n=t.clientX-e.clientX,r=t.clientY-e.clientY;return Math.sqrt(n*n+r*r)}function Ao(e,t){let n=t.x-e.x,r=t.y-e.y;return Math.atan2(r,n)*180/Math.PI}function jo(e,t){let n=t.clientX-e.clientX,r=t.clientY-e.clientY;return Math.atan2(r,n)*180/Math.PI}function Mo(e,t){return e===t?V.None:Math.abs(e)>=Math.abs(t)?e<0?V.Left:V.Right:t<0?V.Up:V.Down}function No(e,t){let n=t.center,r=e.offsetDelta,i=e.prevDelta,a=e.prevInput;return(t.eventType===B.Start||a?.eventType===B.End)&&(i=e.prevDelta={x:a?.deltaX||0,y:a?.deltaY||0},r=e.offsetDelta={x:n.x,y:n.y}),{deltaX:i.x+(n.x-r.x),deltaY:i.y+(n.y-r.y)}}function Po(e,t,n){return{x:t/e||0,y:n/e||0}}function Fo(e,t){return ko(t[0],t[1])/ko(e[0],e[1])}function Io(e,t){return jo(t[1],t[0])-jo(e[1],e[0])}function Lo(e,t){let n=e.lastInterval||t,r=t.timeStamp-n.timeStamp,i,a,o,s;if(t.eventType!==B.Cancel&&(r>25||n.velocity===void 0)){let c=t.deltaX-n.deltaX,l=t.deltaY-n.deltaY,u=Po(r,c,l);a=u.x,o=u.y,i=Math.abs(u.x)>Math.abs(u.y)?u.x:u.y,s=Mo(c,l),e.lastInterval=t}else i=n.velocity,a=n.velocityX,o=n.velocityY,s=n.direction;t.velocity=i,t.velocityX=a,t.velocityY=o,t.direction=s}function Ro(e,t){return`pointerId`in e?e.pointerId:t}function zo(e,t){e.movementOrigin=new Map(t.map((e,t)=>[Ro(e,t),{clientX:e.clientX,clientY:e.clientY}])),e.firstMovementTime=void 0}function Bo(e,t){let n=t.pointers.map(Ro);if(e.movementOrigin?.size===n.length&&n.every(t=>e.movementOrigin.has(t))||zo(e,t.pointers),t.distancePerPointer=t.pointers.map((t,r)=>ko(e.movementOrigin.get(n[r]),t)),t.eventType&B.Move&&t.distancePerPointer.some(e=>e>0)&&(e.firstMovementTime??=t.timeStamp),t.movementDeltaTime=e.firstMovementTime===void 0?0:t.timeStamp-e.firstMovementTime,t.eventType&(B.End|B.Cancel)){let r=t.changedPointers.map(e=>Ro(e,t.pointers.indexOf(e)));zo(e,t.pointers.filter((e,t)=>!r.includes(n[t])))}}function Vo(e,t){let{session:n}=e,{pointers:r}=t,{length:i}=r;n.firstInput||=Do(t),i>1&&!n.firstMultiple?n.firstMultiple=Do(t):i===1&&(n.firstMultiple=!1);let{firstInput:a,firstMultiple:o}=n,s=o?o.center:a.center,c=t.center=Eo(r);t.timeStamp=Date.now(),t.deltaTime=t.timeStamp-a.timeStamp,Bo(n,t),t.angle=Ao(s,c),t.distance=Oo(s,c);let{deltaX:l,deltaY:u}=No(n,t);t.deltaX=l,t.deltaY=u,t.offsetDirection=Mo(t.deltaX,t.deltaY);let d=Po(t.deltaTime,t.deltaX,t.deltaY);t.overallVelocityX=d.x,t.overallVelocityY=d.y,t.overallVelocity=Math.abs(d.x)>Math.abs(d.y)?d.x:d.y,t.scale=o?Fo(o.pointers,r):1,t.rotation=o?Io(o.pointers,r):0,t.maxPointers=n.prevInput?t.pointers.length>n.prevInput.maxPointers?t.pointers.length:n.prevInput.maxPointers:t.pointers.length;let f=e.element;return To(t.srcEvent.target,f)&&(f=t.srcEvent.target),t.target=f,Lo(n,t),t}function Ho(e,t,n){let r=n.pointers.length,i=n.changedPointers.length,a=t&B.Start&&r-i===0,o=t&(B.End|B.Cancel)&&r-i===0;n.isFirst=!!a,n.isFinal=!!o,a&&(e.session={}),n.eventType=t;let s=Vo(e,n);e.emit(`hammer.input`,s),e.recognize(s),e.session.prevInput=s}var Uo=class{constructor(e){this.evEl=``,this.evWin=``,this.evTarget=``,this.domHandler=e=>{this.manager.options.enable&&this.handler(e)},this.manager=e,this.element=e.element,this.target=e.options.inputTarget||e.element}callback(e,t){Ho(this.manager,e,t)}init(){So(this.element,this.evEl,this.domHandler),So(this.target,this.evTarget,this.domHandler),So(wo(this.element),this.evWin,this.domHandler)}destroy(){Co(this.element,this.evEl,this.domHandler),Co(this.target,this.evTarget,this.domHandler),Co(wo(this.element),this.evWin,this.domHandler)}},Wo={pointerdown:B.Start,pointermove:B.Move,pointerup:B.End,pointercancel:B.Cancel,pointerout:B.Cancel},Go=`pointerdown`,Ko=`pointermove pointerup pointercancel`,qo=class extends Uo{constructor(e){super(e),this.evEl=Go,this.evWin=Ko,this.store=this.manager.session.pointerEvents=[],this.init()}handler(e){let{store:t}=this,n=!1,r=Wo[e.type],i=e.pointerType,a=i===`touch`,o=t.findIndex(t=>t.pointerId===e.pointerId);r&B.Start&&(e.buttons||a)?o<0&&(t.push(e),o=t.length-1):r&(B.End|B.Cancel)&&(n=!0),!(o<0)&&(t[o]=e,this.callback(r,{pointers:t,changedPointers:[e],eventType:r,pointerType:i,srcEvent:e}),n&&t.splice(o,1))}},Jo=[``,`webkit`,`Moz`,`MS`,`ms`,`o`];function Yo(e,t){let n=t[0].toUpperCase()+t.slice(1);for(let r of Jo){let i=r?r+n:t;if(i in e)return i}}var Xo=1,Zo=2,Qo={touchAction:`compute`,enable:!0,inputTarget:null,cssProps:{userSelect:`none`,userDrag:`none`,touchCallout:`none`,tapHighlightColor:`rgba(0,0,0,0)`}},$o=class{constructor(e,t){this.options={...Qo,...t,cssProps:{...Qo.cssProps,...t.cssProps},inputTarget:t.inputTarget||e},this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=e,this.input=new qo(this),this.touchAction=new bo(this,this.options.touchAction),this.toggleCssProps(!0)}set(e){return Object.assign(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this}stop(e){this.session.stopped=e?Zo:Xo}recognize(e){let{session:t}=this;if(t.stopped)return;this.session.prevented&&e.srcEvent.preventDefault();let n,{recognizers:r}=this,{curRecognizer:i}=t;(!i||i&&i.state&H.Recognized)&&(i=t.curRecognizer=null);let a=0;for(;a<r.length;)n=r[a],t.stopped!==Zo&&(!i||n===i||n.canRecognizeWith(i))?n.recognize(e):n.reset(),!i&&n.state&(H.Began|H.Changed|H.Ended)&&(i=t.curRecognizer=n),a++}get(e){let{recognizers:t}=this;for(let n=0;n<t.length;n++)if(t[n].options.event===e)return t[n];return null}add(e){if(Array.isArray(e)){for(let t of e)this.add(t);return this}let t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e}remove(e){if(Array.isArray(e)){for(let t of e)this.remove(t);return this}let t=typeof e==`string`?this.get(e):e;if(t){let{recognizers:e}=this,n=e.indexOf(t);n!==-1&&(e.splice(n,1),this.touchAction.update())}return this}on(e,t){if(!e||!t)return;let{handlers:n}=this;for(let r of xo(e))n[r]=n[r]||[],n[r].push(t)}off(e,t){if(!e)return;let{handlers:n}=this;for(let r of xo(e))t?n[r]&&n[r].splice(n[r].indexOf(t),1):delete n[r]}emit(e,t){let n=this.handlers[e]&&this.handlers[e].slice();if(!n||!n.length)return;let r=t;r.type=e,r.preventDefault=function(){t.srcEvent.preventDefault()};let i=0;for(;i<n.length;)n[i](r),i++}destroy(){this.toggleCssProps(!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}toggleCssProps(e){let{element:t}=this;if(t){for(let[n,r]of Object.entries(this.options.cssProps)){let i=Yo(t.style,n);e?(this.oldCssProps[i]=t.style[i],t.style[i]=r):t.style[i]=this.oldCssProps[i]||``}e||(this.oldCssProps={})}}},es=1;function ts(){return es++}function ns(e){return e&H.Cancelled?`cancel`:e&H.Ended?`end`:e&H.Changed?`move`:e&H.Began?`start`:``}var rs=class{constructor(e){this.options=e,this.id=ts(),this.state=H.Possible,this.simultaneous={},this.requireFail=[]}set(e){return Object.assign(this.options,e),this.manager.touchAction.update(),this}recognizeWith(e){if(Array.isArray(e)){for(let t of e)this.recognizeWith(t);return this}let t;if(typeof e==`string`){if(t=this.manager.get(e),!t)throw Error(`Cannot find recognizer ${e}`)}else t=e;let{simultaneous:n}=this;return n[t.id]||(n[t.id]=t,t.recognizeWith(this)),this}dropRecognizeWith(e){if(Array.isArray(e)){for(let t of e)this.dropRecognizeWith(t);return this}let t;return t=typeof e==`string`?this.manager.get(e):e,t&&delete this.simultaneous[t.id],this}requireFailure(e){if(Array.isArray(e)){for(let t of e)this.requireFailure(t);return this}let t;if(typeof e==`string`){if(t=this.manager.get(e),!t)throw Error(`Cannot find recognizer ${e}`)}else t=e;let{requireFail:n}=this;return n.indexOf(t)===-1&&(n.push(t),t.requireFailure(this)),this}dropRequireFailure(e){if(Array.isArray(e)){for(let t of e)this.dropRequireFailure(t);return this}let t;if(t=typeof e==`string`?this.manager.get(e):e,t){let e=this.requireFail.indexOf(t);e>-1&&this.requireFail.splice(e,1)}return this}hasRequireFailures(){return!!this.requireFail.find(e=>e.options.enable)}canRecognizeWith(e){return!!this.simultaneous[e.id]}emit(e){if(!e)return;let{state:t}=this;t<H.Ended&&this.manager.emit(this.options.event+ns(t),e),this.manager.emit(this.options.event,e),e.additionalEvent&&this.manager.emit(e.additionalEvent,e),t>=H.Ended&&this.manager.emit(this.options.event+ns(t),e)}tryEmit(e){this.canEmit()?this.emit(e):this.state=H.Failed}canEmit(){let e=0;for(;e<this.requireFail.length;){if(!(this.requireFail[e].state&(H.Failed|H.Possible)))return!1;e++}return!0}recognize(e){let t={...e};if(!this.options.enable){this.reset(),this.state=H.Failed;return}this.state&(H.Recognized|H.Cancelled|H.Failed)&&(this.state=H.Possible),this.state=this.process(t),this.state&(H.Began|H.Changed|H.Ended|H.Cancelled)&&this.tryEmit(t)}getEventNames(){return[this.options.event]}reset(){}};function is(e){return Math.abs(((e+180)%360+360)%360-180)}function as(e,t){return(t.distance===void 0||e.distance>=t.distance)&&(t.distancePerPointer===void 0||e.distancePerPointer.length>0&&e.distancePerPointer.every(e=>e>=t.distancePerPointer))&&(t.movementDeltaTime===void 0||e.movementDeltaTime>=t.movementDeltaTime)&&(t.rotation===void 0||is(e.rotation)>=t.rotation)&&(t.scale===void 0||Math.abs(e.scale-1)>=t.scale)}var os=class extends rs{attrTest(e){let t=this.options.pointers;return t===0||e.pointers.length===t}coherentTest(e){let t=this.options.coherent;return!t?.length||t.some(t=>as(e,t))}process(e){let{state:t}=this,{eventType:n}=e,r=t&(H.Began|H.Changed),i=this.attrTest(e);return r&&(n&B.Cancel||!i)?t|H.Cancelled:r||i?n&B.End?t|H.Ended:t&H.Began?t|H.Changed:H.Began:H.Failed}},ss=[``,`start`,`move`,`end`,`cancel`],cs=class extends rs{constructor(e={}){super({enable:!0,event:`doubleclickdrag`,pointers:1,interval:500,time:350,threshold:28,dragThreshold:1,pixelsPerScale:120,...e}),this._tapStart=null,this._lastTap=null,this._drag=null,this._emittedStart=!1}getTouchAction(){return[ho]}getEventNames(){return ss.map(e=>this.options.event+e)}process(e){let{options:t}=this;return e.pointers.length===t.pointers?e.eventType&B.Start?this._handleStart(e):e.eventType&B.Move?this._handleMove(e):e.eventType&B.Cancel?this._handleEnd(e,!0):e.eventType&B.End?this._handleEnd(e,!1):H.Failed:(this.reset(),H.Failed)}reset(){this._tapStart=null,this._lastTap=null,this._drag=null,this._emittedStart=!1}emit(e){if(e){if(this.state===H.Began){if(!this._drag?.active||this._emittedStart)return;this._emittedStart=!0,this.manager.emit(`${this.options.event}start`,e),this.manager.emit(this.options.event,e);return}if(this.state===H.Changed){if(!this._emittedStart)return;this.manager.emit(`${this.options.event}move`,e),this.manager.emit(this.options.event,e);return}if(this.state===H.Ended){if(!this._emittedStart)return;this.manager.emit(this.options.event,e),this.manager.emit(`${this.options.event}end`,e),this._emittedStart=!1;return}if(this.state===H.Cancelled){if(!this._emittedStart)return;this.manager.emit(this.options.event,e),this.manager.emit(`${this.options.event}cancel`,e),this._emittedStart=!1}}}_handleStart(e){let t=this._getPointerId(e);return this._lastTap&&this._isTapMatch(e,this._lastTap)?(this._tapStart=null,this._lastTap=null,this._drag={startCenter:e.center,pointerId:t,active:!1},this._emittedStart=!1,H.Began):(this._tapStart={center:e.center,timeStamp:e.timeStamp,pointerId:t},this._lastTap=null,this._drag=null,this._emittedStart=!1,H.Failed)}_handleMove(e){if(!this._drag||!this._isSamePointer(e,this._drag.pointerId))return H.Failed;let t=this._drag.startCenter.y-e.center.y;return!this._drag.active&&Math.abs(t)<this.options.dragThreshold?H.Began:(this._drag.active=!0,e.scale=2**(t/this.options.pixelsPerScale),this._emittedStart?H.Changed:H.Began)}_handleEnd(e,t){if(this._drag&&this._isSamePointer(e,this._drag.pointerId)){let{active:n,startCenter:r}=this._drag;return this._drag=null,this._tapStart=null,this._lastTap=null,n?(e.scale=2**((r.y-e.center.y)/this.options.pixelsPerScale),t?H.Cancelled:H.Ended):(this._emittedStart=!1,H.Failed)}return!this._tapStart||!this._isSamePointer(e,this._tapStart.pointerId)?(t&&this.reset(),H.Failed):(this._lastTap=this._isValidTap(e)?{center:e.center,timeStamp:e.timeStamp,pointerId:this._tapStart.pointerId}:null,this._tapStart=null,H.Failed)}_isTapMatch(e,t){return e.timeStamp-t.timeStamp<=this.options.interval&&Oo(e.center,t.center)<=this.options.threshold}_isValidTap(e){return e.deltaTime<=this.options.time&&e.distance<=this.options.threshold}_getPointerId(e){return`pointerId`in e.srcEvent?e.srcEvent.pointerId:null}_isSamePointer(e,t){return t===null||this._getPointerId(e)===t}},ls=class extends rs{constructor(e={}){super({enable:!0,event:`tap`,pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10,...e}),this.pTime=null,this.pCenter=null,this._timer=null,this._input=null,this.count=0}getTouchAction(){return[ho]}process(e){let{options:t}=this,n=e.pointers.length===t.pointers,r=e.distance<t.threshold,i=e.deltaTime<t.time;if(this.reset(),e.eventType&B.Start&&this.count===0)return this.failTimeout();if(r&&i&&n){if(e.eventType!==B.End)return this.failTimeout();let n=!this.pTime||e.timeStamp-this.pTime<t.interval,r=!this.pCenter||Oo(this.pCenter,e.center)<t.posThreshold;if(this.pTime=e.timeStamp,this.pCenter=e.center,!r||!n?this.count=1:this.count+=1,this._input=e,this.count%t.taps===0)return this.hasRequireFailures()?(this._timer=setTimeout(()=>{this.state=H.Recognized,this.tryEmit(this._input)},t.interval),H.Began):H.Recognized}return H.Failed}failTimeout(){return this._timer=setTimeout(()=>{this.state=H.Failed},this.options.interval),H.Failed}reset(){clearTimeout(this._timer)}emit(e){this.state===H.Recognized&&(e.tapCount=this.count,this.manager.emit(this.options.event,e))}},us=class extends os{constructor(){super(...arguments),this.wheelSession=null,this.wheelSessionUnsubscribe=null,this.handleWheelSessionEvent=e=>{e.device===`trackpad`&&this.handleTrackpadEvent(e)}}set(e){let{wheelSession:t,...n}=e;return t&&t!==this.wheelSession&&(this.wheelSessionUnsubscribe?.(),this.wheelSessionUnsubscribe=null,this.wheelSession=t),super.set(n),this.updateWheelSessionSubscription(),this}getTrackpadInput(e,t={}){let{srcEvent:n}=e,r=t.deltaX??e.deltaX,i=t.deltaY??e.deltaY,a=Mo(r,i),o=Math.sqrt(e.deltaX*e.deltaX+e.deltaY*e.deltaY),s=n;return{pointers:[s,s],changedPointers:[s,s],pointerType:`trackpad`,srcEvent:s,eventType:e.eventType,timeStamp:e.timeStamp,deltaTime:e.deltaTime,center:e.center,deltaX:r,deltaY:i,angle:Math.atan2(i,r)*180/Math.PI,distance:Math.sqrt(r*r+i*i),distancePerPointer:[o,o],movementDeltaTime:e.deltaTime,scale:1,rotation:0,direction:a,offsetDirection:a,velocity:e.velocity,velocityX:e.velocityX,velocityY:e.velocityY,overallVelocity:e.overallVelocity,overallVelocityX:e.overallVelocityX,overallVelocityY:e.overallVelocityY,maxPointers:2,target:n.target||this.manager.element,additionalEvent:``,...t}}updateWheelSessionSubscription(){let e=!!(this.wheelSession&&this.options.enable&&this.options.trackpad&&this.options.pointers===2);e&&!this.wheelSessionUnsubscribe?this.wheelSessionUnsubscribe=this.wheelSession.on(this.handleWheelSessionEvent):!e&&this.wheelSessionUnsubscribe&&(this.wheelSessionUnsubscribe(),this.wheelSessionUnsubscribe=null)}},ds=[``,`start`,`move`,`end`,`cancel`,`up`,`down`,`left`,`right`],fs=class extends us{constructor(e={}){super({enable:!0,pointers:1,event:`pan`,threshold:10,direction:V.All,trackpad:!1,coherent:[],...e}),this.trackpadGesture=!1,this.pX=null,this.pY=null}getTouchAction(){let{options:{direction:e}}=this,t=[];return e&V.Horizontal&&t.push(vo),e&V.Vertical&&t.push(_o),t}getEventNames(){return ds.map(e=>this.options.event+e)}directionTest(e){let{options:t}=this,n=!0,{distance:r}=e,{direction:i}=e,a=e.deltaX,o=e.deltaY;return i&t.direction||(t.direction&V.Horizontal?(i=a===0?V.None:a<0?V.Left:V.Right,n=a!==this.pX,r=Math.abs(e.deltaX)):(i=o===0?V.None:o<0?V.Up:V.Down,n=o!==this.pY,r=Math.abs(e.deltaY))),e.direction=i,n&&r>t.threshold&&!!(i&t.direction)}attrTest(e){let t=!!(this.state&H.Began),n=!(this.options.coherent?.length&&e.eventType&(B.End|B.Cancel));return super.attrTest(e)&&(t||n&&this.coherentTest(e)&&this.directionTest(e))}emit(e){this.pX=e.deltaX,this.pY=e.deltaY;let t=V[e.direction].toLowerCase();t&&(e.additionalEvent=this.options.event+t),super.emit(e)}handleTrackpadEvent(e){e.isFirst&&(this.trackpadGesture=!e.srcEvent.ctrlKey,!this.trackpadGesture&&this.state&(H.Recognized|H.Cancelled|H.Failed)&&(this.state=H.Possible)),this.trackpadGesture&&(this.recognize(this.getTrackpadInput(e,{deltaX:-e.deltaX,deltaY:-e.deltaY,velocity:-e.velocity,velocityX:-e.velocityX,velocityY:-e.velocityY,overallVelocity:-e.overallVelocity,overallVelocityX:-e.overallVelocityX,overallVelocityY:-e.overallVelocityY})),e.isFinal&&(this.trackpadGesture=!1))}},ps=[``,`start`,`move`,`end`,`cancel`,`in`,`out`],ms=class extends us{constructor(e={}){super({enable:!0,event:`pinch`,threshold:0,pointers:2,trackpad:!1,coherent:[],...e}),this.trackpadGesture=!1}getTouchAction(){return[go]}getEventNames(){return ps.map(e=>this.options.event+e)}attrTest(e){let t=!!this.options.coherent?.length,n=!!(this.state&H.Began),r=!(t&&e.eventType&(B.End|B.Cancel));return super.attrTest(e)&&(n||r&&(t?this.coherentTest(e):Math.abs(e.scale-1)>this.options.threshold))}emit(e){if(e.scale!==1){let t=e.scale<1?`in`:`out`;e.additionalEvent=this.options.event+t}super.emit(e)}handleTrackpadEvent(e){e.isFirst&&(this.trackpadGesture=e.srcEvent.ctrlKey,!this.trackpadGesture&&this.state&(H.Recognized|H.Cancelled|H.Failed)&&(this.state=H.Possible)),this.trackpadGesture&&(this.recognize(this.getTrackpadInput(e,{deltaX:0,deltaY:0,velocity:0,velocityX:0,velocityY:0,overallVelocity:0,overallVelocityX:0,overallVelocityY:0,scale:Math.exp(-e.deltaY/100)})),e.isFinal&&(this.trackpadGesture=!1))}},hs=class{constructor(e,t,n){this.element=e,this.callback=t,this.options=n}listen(e,t){t?this.element.addEventListener(e,this.handleEvent,{passive:!1}):this.element.removeEventListener(e,this.handleEvent)}},gs=(typeof navigator<`u`&&navigator.userAgent?navigator.userAgent.toLowerCase():``).indexOf(`firefox`)!==-1,_s=40,vs=.25,ys=class extends hs{constructor(e,t,n){n.enable=n.enable??!1,super(e,t,n),this.handleEvent=e=>{if(!this.options.enable)return;let t=e.deltaY;globalThis.WheelEvent&&(gs&&e.deltaMode===globalThis.WheelEvent.DOM_DELTA_PIXEL&&(t/=globalThis.devicePixelRatio),e.deltaMode===globalThis.WheelEvent.DOM_DELTA_LINE&&(t*=_s)),e.shiftKey&&t&&(t*=vs),this.callback({type:`wheel`,center:{x:e.clientX,y:e.clientY},delta:-t,device:this.options.wheelSession?.device??`unknown`,srcEvent:e,pointerType:`mouse`,target:e.target})},n.enable&&(this.wheelSessionUnsubscribe=this.options.wheelSession?.on(()=>{}),this.listen(`wheel`,!0))}destroy(){this.listen(`wheel`,!1),this.wheelSessionUnsubscribe?.(),this.wheelSessionUnsubscribe=void 0}enableEventType(e,t){e===`wheel`&&this.options.enable!==t&&(this.options.enable=t,t&&!this.wheelSessionUnsubscribe&&(this.wheelSessionUnsubscribe=this.options.wheelSession?.on(()=>{})),this.listen(`wheel`,t),t||(this.wheelSessionUnsubscribe?.(),this.wheelSessionUnsubscribe=void 0))}},bs=4.000244140625,xs=40,Ss=0,Cs=1,ws=40,Ts=40,Es=120,Ds={classificationDelay:32,endDelay:80},Os=class{constructor(e,t={}){this.subscriptions=new Map,this.session=null,this.classificationTimer=null,this.endTimer=null,this.pressedControlKeys=new Set,this.listeningForControlKeys=!1,this.handleEvent=e=>{if(!this.hasSubscribers)return`unknown`;let t=As(e,this.pressedControlKeys.size>0),n=this.session;if(n&&t.timeStamp-n.lastTimeStamp>=this.options.endDelay){if(this.end(),!this.hasSubscribers)return`unknown`;n=null}n?(this.scheduleEnd(),this.addSample(n,t)):(n=this.startPendingSession(t),this.scheduleEnd());let{device:r}=n;return r===`unknown`&&(r=js(n.samples,!1),r!==`unknown`&&this.begin(n,r)),r},this.finishClassification=()=>{if(this.classificationTimer=null,!this.session||this.session.device!==`unknown`)return;let e=this.session,t=js(e.samples,!0);this.begin(e,t===`unknown`?`mouse`:t)},this.end=()=>{if(!this.session)return;if(this.session.device===`unknown`){let e=this.session,t=js(e.samples,!0);this.begin(e,t===`unknown`?`mouse`:t)}if(!this.session)return;let e=this.session;this.emit(B.End,e.lastEvent),this.reset()},this.handleKeyDown=e=>{e.key===`Control`&&this.pressedControlKeys.add(e.code||e.key)},this.handleKeyUp=e=>{e.key===`Control`&&(e.code?this.pressedControlKeys.delete(e.code):this.pressedControlKeys.clear())},this.handleWindowBlur=()=>{this.pressedControlKeys.clear()},this.element=e,this.options={...Ds,...t},this.element?.addEventListener(`wheel`,this.handleEvent,{passive:!0})}get hasSubscribers(){return this.subscriptions.size>0}get device(){return this.session?.device??`unknown`}on(e){let t={listener:e};return this.subscriptions.set(e,t),this.updateControlKeyEventListeners(),()=>{this.subscriptions.get(e)===t&&this.off(e)}}off(e){this.subscriptions.delete(e),this.updateControlKeyEventListeners(),this.hasSubscribers||this.reset()}cancel(){let e=this.session;e&&e.device!==`unknown`&&this.emit(B.Cancel,e.lastEvent),this.reset()}destroy(){this.cancel(),this.subscriptions.clear(),this.updateControlKeyEventListeners(),this.element?.removeEventListener(`wheel`,this.handleEvent)}startPendingSession(e){let t={samples:[e],device:`unknown`,firstTimeStamp:e.timeStamp,lastTimeStamp:e.timeStamp,totalDeltaX:e.deltaX,totalDeltaY:e.deltaY,velocityX:0,velocityY:0,lastEvent:e.event};return this.session=t,this.classificationTimer=globalThis.setTimeout(this.finishClassification,this.options.classificationDelay),t}addSample(e,t){if(e.samples.push(t),e.lastTimeStamp=t.timeStamp,e.lastEvent=t.event,e.totalDeltaX+=t.deltaX,e.totalDeltaY+=t.deltaY,e.device!==`unknown`){let n=e.samples[e.samples.length-2],r=t.timeStamp-n.timeStamp;e.velocityX=r>0?t.deltaX/r:0,e.velocityY=r>0?t.deltaY/r:0,this.emit(B.Move,t.event,{velocityX:e.velocityX,velocityY:e.velocityY})}}begin(e,t){e.device=t,this.clearClassificationTimer(),this.emit(B.Start,e.samples[0].event);let n=e.lastTimeStamp-e.firstTimeStamp;e.velocityX=n>0?e.totalDeltaX/n:0,e.velocityY=n>0?e.totalDeltaY/n:0,this.emit(B.Move,e.lastEvent,{velocityX:e.velocityX,velocityY:e.velocityY})}scheduleEnd(){this.clearEndTimer(),this.endTimer=globalThis.setTimeout(this.end,this.options.endDelay)}emit(e,t,n){let r=this.session;if(!r||r.device===`unknown`)return;let i=e===B.Start,a=e===B.End||e===B.Cancel,o=i?r.firstTimeStamp:r.lastTimeStamp,s=i?0:Math.max(0,o-r.firstTimeStamp),c=i?0:r.totalDeltaX,l=i?0:r.totalDeltaY,u=s>0?c/s:0,d=s>0?l/s:0,f=i?0:n?.velocityX??r.velocityX,p=i?0:n?.velocityY??r.velocityY,m={eventType:e,device:r.device,srcEvent:t,timeStamp:o,center:{x:t.clientX,y:t.clientY},deltaX:c,deltaY:l,deltaTime:s,velocity:Math.abs(f)>Math.abs(p)?f:p,velocityX:f,velocityY:p,overallVelocity:Math.abs(u)>Math.abs(d)?u:d,overallVelocityX:u,overallVelocityY:d,isFirst:i,isFinal:a};for(let{listener:e}of[...this.subscriptions.values()])e(m)}reset(){this.clearClassificationTimer(),this.clearEndTimer(),this.session=null}clearClassificationTimer(){this.classificationTimer!==null&&(globalThis.clearTimeout(this.classificationTimer),this.classificationTimer=null)}clearEndTimer(){this.endTimer!==null&&(globalThis.clearTimeout(this.endTimer),this.endTimer=null)}updateControlKeyEventListeners(){let e=this.hasSubscribers,t=ks();!t||e===this.listeningForControlKeys||(this.listeningForControlKeys=e,e?(t.addEventListener(`keydown`,this.handleKeyDown,!0),t.addEventListener(`keyup`,this.handleKeyUp,!0),t.addEventListener(`blur`,this.handleWindowBlur)):(t.removeEventListener(`keydown`,this.handleKeyDown,!0),t.removeEventListener(`keyup`,this.handleKeyUp,!0),t.removeEventListener(`blur`,this.handleWindowBlur),this.pressedControlKeys.clear()))}};function ks(){return typeof window<`u`?window:globalThis.document?.defaultView}function As(e,t){let n=e.deltaX,r=e.deltaY;return e.deltaMode===Cs&&(n*=xs,r*=xs),{event:e,timeStamp:e.timeStamp,deltaX:n,deltaY:r,isControlKeyDown:t}}function js(e,t){return e.some(({event:e,isControlKeyDown:t})=>e.ctrlKey&&!t)?`trackpad`:e.some(({event:e})=>e.deltaMode!==Ss)||e.some(Ms)||e.every(({event:e})=>{let t=e.wheelDelta;return t!==void 0&&Math.abs(t)%40==0})?`mouse`:e.some(({deltaX:e})=>e!==0)||e.length>1&&Ns(e)?`trackpad`:t?`mouse`:`unknown`}function Ms({event:e,deltaX:t,deltaY:n}){if(t!==0||n===0)return!1;let r=Math.abs(n/bs);if(Number.isInteger(r))return!0;let i=e.wheelDelta;return typeof i==`number`&&i!==0&&i%Es===0}function Ns(e){for(let t=0;t<e.length;t++){let n=e[t];if(Math.abs(n.deltaX)>Ts||Math.abs(n.deltaY)>Ts||t>0&&n.timeStamp-e[t-1].timeStamp>ws)return!1}return!0}var Ps=[`mousedown`,`mousemove`,`mouseup`,`mouseover`,`mouseout`,`mouseenter`,`mouseleave`],Fs=class extends hs{constructor(e,t,n){super(e,t,{enable:!0,...n}),this.handleEvent=e=>{this.handleOverEvent(e),this.handleOutEvent(e),this.handleEnterEvent(e),this.handleLeaveEvent(e),this.handleMoveEvent(e)},this.pressed=!1;let{enable:r=!1}=this.options;this.enableMoveEvent=r,this.enableLeaveEvent=r,this.enableEnterEvent=r,this.enableOutEvent=r,this.enableOverEvent=r,r&&Ps.forEach(e=>this.listen(e,!0))}destroy(){Ps.forEach(e=>this.listen(e,!1))}enableEventType(e,t){switch(e){case`pointermove`:this.enableMoveEvent!==t&&(this.enableMoveEvent=t,this.listen(`mousedown`,t),this.listen(`mousemove`,t),this.listen(`mouseup`,t));break;case`pointerover`:this.enableOverEvent!==t&&(this.enableOverEvent=t,this.listen(`mouseover`,t));break;case`pointerout`:this.enableOutEvent!==t&&(this.enableOutEvent=t,this.listen(`mouseout`,t));break;case`pointerenter`:this.enableEnterEvent!==t&&(this.enableEnterEvent=t,this.listen(`mouseenter`,t));break;case`pointerleave`:this.enableLeaveEvent!==t&&(this.enableLeaveEvent=t,this.listen(`mouseleave`,t))}}handleOverEvent(e){this.enableOverEvent&&e.type===`mouseover`&&this._emit(`pointerover`,e)}handleOutEvent(e){this.enableOutEvent&&e.type===`mouseout`&&this._emit(`pointerout`,e)}handleEnterEvent(e){this.enableEnterEvent&&e.type===`mouseenter`&&this._emit(`pointerenter`,e)}handleLeaveEvent(e){this.enableLeaveEvent&&e.type===`mouseleave`&&this._emit(`pointerleave`,e)}handleMoveEvent(e){if(this.enableMoveEvent)switch(e.type){case`mousedown`:e.button>=0&&(this.pressed=!0);break;case`mousemove`:e.buttons===0&&(this.pressed=!1),this.pressed||this._emit(`pointermove`,e);break;case`mouseup`:this.pressed=!1}}_emit(e,t){this.callback({type:e,center:{x:t.clientX,y:t.clientY},srcEvent:t,pointerType:`mouse`,target:t.target})}},Is=[`keydown`,`keyup`],Ls=class extends hs{constructor(e,t,n){super(e,t,{enable:!0,tabIndex:0,...n}),this.handleEvent=e=>{let t=e.target||e.srcElement;t.tagName===`INPUT`&&t.type===`text`||t.tagName===`TEXTAREA`||(this.enableDownEvent&&e.type===`keydown`&&this.callback({type:`keydown`,srcEvent:e,key:e.key,target:e.target}),this.enableUpEvent&&e.type===`keyup`&&this.callback({type:`keyup`,srcEvent:e,key:e.key,target:e.target}))};let{enable:r=!1}=this.options;this.enableDownEvent=r,this.enableUpEvent=r,e.tabIndex=this.options.tabIndex,e.style.outline=`none`,r&&Is.forEach(e=>this.listen(e,!0))}destroy(){Is.forEach(e=>this.listen(e,!1))}enableEventType(e,t){e===`keydown`&&this.enableDownEvent!==t&&(this.enableDownEvent=t,this.listen(e,t)),e===`keyup`&&this.enableUpEvent!==t&&(this.enableUpEvent=t,this.listen(e,t))}},Rs=class extends hs{constructor(e,t,n){n.enable=n.enable??!1,super(e,t,n),this.handleEvent=e=>{this.options.enable&&this.callback({type:`contextmenu`,center:{x:e.clientX,y:e.clientY},srcEvent:e,pointerType:`mouse`,target:e.target})},n.enable&&this.listen(`contextmenu`,!0)}destroy(){this.listen(`contextmenu`,!1)}enableEventType(e,t){e===`contextmenu`&&this.options.enable!==t&&(this.options.enable=t,this.listen(`contextmenu`,t))}},zs=1,Bs=2,Vs=4,Hs={pointerdown:zs,pointermove:Bs,pointerup:Vs,mousedown:zs,mousemove:Bs,mouseup:Vs},Us=0,Ws=1,Gs=2,Ks=1,qs=2,Js=4;function Ys(e){let t=Hs[e.srcEvent.type];if(!t)return null;let{buttons:n,button:r}=e.srcEvent,i=!1,a=!1,o=!1;return t===Bs?(i=!!(n&Ks),a=!!(n&Js),o=!!(n&qs)):(i=r===Us,a=r===Ws,o=r===Gs),{leftButton:i,middleButton:a,rightButton:o}}function Xs(e,t){let n=e.center;if(!n)return null;let r=t.getBoundingClientRect(),i=r.width/t.offsetWidth||1,a=r.height/t.offsetHeight||1;return{center:n,offsetCenter:{x:(n.x-r.left-t.clientLeft)/i,y:(n.y-r.top-t.clientTop)/a}}}var Zs={srcElement:`root`,priority:0},Qs=class{constructor(e,t){this.handleEvent=e=>{if(this.isEmpty())return;let t=this._normalizeEvent(e),n=e.srcEvent.target;for(;n&&n!==t.rootElement;){if(this._emit(t,n),t.handled)return;n=n.parentNode}this._emit(t,`root`)},this.eventManager=e,this.recognizerName=t,this.handlers=[],this.handlersByElement=new Map,this._active=!1}isEmpty(){return!this._active}add(e,t,n,r=!1,i=!1){let{handlers:a,handlersByElement:o}=this,s={...Zs,...n},c=o.get(s.srcElement);c||(c=[],o.set(s.srcElement,c));let l={type:e,handler:t,srcElement:s.srcElement,priority:s.priority};r&&(l.once=!0),i&&(l.passive=!0),a.push(l),this._active=this._active||!l.passive;let u=c.length-1;for(;u>=0&&!(c[u].priority>=l.priority);)u--;c.splice(u+1,0,l)}remove(e,t){let{handlers:n,handlersByElement:r}=this;for(let i=n.length-1;i>=0;i--){let a=n[i];if(a.type===e&&a.handler===t){n.splice(i,1);let e=r.get(a.srcElement);e.splice(e.indexOf(a),1),e.length===0&&r.delete(a.srcElement)}}this._active=n.some(e=>!e.passive)}_emit(e,t){let n=this.handlersByElement.get(t);if(n){let t=!1,r=()=>{e.handled=!0},i=()=>{e.handled=!0,t=!0},a=[];for(let o=0;o<n.length;o++){let{type:s,handler:c,once:l}=n[o];if(c({...e,type:s,stopPropagation:r,stopImmediatePropagation:i}),l&&a.push(n[o]),t)break}for(let e=0;e<a.length;e++){let{type:t,handler:n}=a[e];this.remove(t,n)}}}_normalizeEvent(e){let t=this.eventManager.getElement();return{...e,...Ys(e),...Xs(e,t),preventDefault:()=>{e.srcEvent.preventDefault()},stopImmediatePropagation:null,stopPropagation:null,handled:!1,rootElement:t}}};function $s(e){if(`recognizer`in e)return e;let t,n=Array.isArray(e)?[...e]:[e];return t=typeof n[0]==`function`?new(n.shift())(n.shift()||{}):n.shift(),{recognizer:t,recognizeWith:typeof n[0]==`string`?[n[0]]:n[0],requireFailure:typeof n[1]==`string`?[n[1]]:n[1]}}var ec=class{constructor(e=null,t={}){if(this._onBasicInput=e=>{this.manager.emit(e.srcEvent.type,e)},this._onOtherEvent=e=>{this.manager.emit(e.type,e)},this.options={recognizers:[],events:{},touchAction:`compute`,tabIndex:0,cssProps:{},...t},this.events=new Map,this.element=e,this.wheelSession=new Os(e),e){this.manager=new $o(e,this.options);for(let e of this.options.recognizers){let{recognizer:t,recognizeWith:n,requireFailure:r}=$s(e);this.manager.add(t),n&&t.recognizeWith(n),r&&t.requireFailure(r)}this.manager.on(`hammer.input`,this._onBasicInput),this.wheelInput=new ys(e,this._onOtherEvent,{enable:!1,wheelSession:this.wheelSession}),this.moveInput=new Fs(e,this._onOtherEvent,{enable:!1}),this.keyInput=new Ls(e,this._onOtherEvent,{enable:!1,tabIndex:t.tabIndex}),this.contextmenuInput=new Rs(e,this._onOtherEvent,{enable:!1}),this.on(this.options.events)}}getElement(){return this.element}destroy(){if(!this.element){this.wheelSession.destroy();return}this.wheelInput.destroy(),this.wheelSession.destroy(),this.moveInput.destroy(),this.keyInput.destroy(),this.contextmenuInput.destroy(),this.manager.destroy()}on(e,t,n){this._addEventHandler(e,t,n,!1)}once(e,t,n){this._addEventHandler(e,t,n,!0)}watch(e,t,n){this._addEventHandler(e,t,n,!1,!0)}off(e,t){this._removeEventHandler(e,t)}emit(e){this.manager?.emit(e.type,e)}_toggleRecognizer(e,t){let{manager:n}=this;if(!n)return;let r=n.get(e);r&&(r.set({enable:t,wheelSession:this.wheelSession}),n.touchAction.update()),this.wheelInput?.enableEventType(e,t),this.moveInput?.enableEventType(e,t),this.keyInput?.enableEventType(e,t),this.contextmenuInput?.enableEventType(e,t)}_addEventHandler(e,t,n,r,i){if(typeof e!=`string`){n=t;for(let[t,a]of Object.entries(e))this._addEventHandler(t,a,n,r,i);return}let{manager:a,events:o}=this;if(!a)return;let s=o.get(e);if(!s){let t=this._getRecognizerName(e)||e;s=new Qs(this,t),o.set(e,s),a&&a.on(e,s.handleEvent)}s.add(e,t,n,r,i),s.isEmpty()||this._toggleRecognizer(s.recognizerName,!0)}_removeEventHandler(e,t){if(typeof e!=`string`){for(let[t,n]of Object.entries(e))this._removeEventHandler(t,n);return}let{events:n}=this,r=n.get(e);if(r&&(r.remove(e,t),r.isEmpty())){let{recognizerName:e}=r,t=!1;for(let r of n.values())if(r.recognizerName===e&&!r.isEmpty()){t=!0;break}t||this._toggleRecognizer(e,!1)}}_getRecognizerName(e){return this.manager.recognizers.find(t=>t.getEventNames().includes(e))?.options.event}},tc={DEFAULT:`default`,LNGLAT:`lnglat`,METER_OFFSETS:`meter-offsets`,LNGLAT_OFFSETS:`lnglat-offsets`,CARTESIAN:`cartesian`};Object.defineProperty(tc,"IDENTITY",{get:()=>(R.deprecated(`COORDINATE_SYSTEM.IDENTITY`,`COORDINATE_SYSTEM.CARTESIAN`)(),tc.CARTESIAN)});var U={WEB_MERCATOR:1,GLOBE:2,WEB_MERCATOR_AUTO_OFFSET:4,IDENTITY:0},nc={common:0,meters:1,pixels:2},rc={click:`onClick`,dblclick:`onClick`,panstart:`onDragStart`,panmove:`onDrag`,panend:`onDragEnd`},ic={multipan:[fs,{threshold:10,pointers:2,trackpad:!0}],pinch:[ms,{trackpad:!0},null,[`multipan`]],pan:[fs,{threshold:1},[`pinch`],[`multipan`]],dblclick:[ls,{event:`dblclick`,taps:2,enable:!1}],dblclickdrag:[cs,{event:`dblclickdrag`,enable:!1},[`dblclick`],null],click:[ls,{event:`click`},[`dblclickdrag`],[`dblclick`,`dblclickdrag`]]};function ac(e,t){if(e===t)return!0;if(Array.isArray(e)){let n=e.length;if(!t||t.length!==n)return!1;for(let r=0;r<n;r++)if(e[r]!==t[r])return!1;return!0}return!1}function oc(e){let t={},n;return r=>{for(let i in r)if(!ac(r[i],t[i])){n=e(r),t=r;break}return n}}var sc=[0,0,0,0],cc=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],lc=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],uc=[0,0,0],dc=[0,0,0],fc={default:-1,cartesian:0,lnglat:1,"meter-offsets":2,"lnglat-offsets":3};function pc(e){let t=fc[e];if(t===void 0)throw Error(`Invalid coordinateSystem: ${e}`);return t}var mc=oc(vc);function hc(e,t,n=dc){n.length<3&&(n=[n[0],n[1],0]);let r=n,i,a=!0;switch(i=t===`lnglat-offsets`||t===`meter-offsets`?n:e.isGeospatial?[Math.fround(e.longitude),Math.fround(e.latitude),0]:null,e.projectionMode){case U.WEB_MERCATOR:(t===`lnglat`||t===`cartesian`)&&(i=[0,0,0],a=!1);break;case U.WEB_MERCATOR_AUTO_OFFSET:t===`lnglat`?r=i:t===`cartesian`&&(r=[Math.fround(e.center[0]),Math.fround(e.center[1]),0],i=e.unprojectPosition(r),r[0]-=n[0],r[1]-=n[1],r[2]-=n[2]);break;case U.IDENTITY:r=e.position.map(Math.fround),r[2]=r[2]||0;break;case U.GLOBE:a=!1,i=null;break;default:a=!1}return{geospatialOrigin:i,shaderCoordinateOrigin:r,offsetMode:a}}function gc(e,t,n){let{viewMatrixUncentered:r,projectionMatrix:i}=e,{viewMatrix:a,viewProjectionMatrix:o}=e,s=sc,c=sc,l=e.cameraPosition,{geospatialOrigin:u,shaderCoordinateOrigin:d,offsetMode:f}=hc(e,t,n);return f&&(c=e.projectPosition(u||d),l=[l[0]-c[0],l[1]-c[1],l[2]-c[2]],c[3]=1,s=ht([],c,o),a=r||a,o=$e([],i,a),o=$e([],o,cc)),{viewMatrix:a,viewProjectionMatrix:o,projectionCenter:s,originCommon:c,cameraPosCommon:l,shaderCoordinateOrigin:d,geospatialOrigin:u}}function _c({viewport:e,devicePixelRatio:t=1,modelMatrix:n=null,coordinateSystem:r=`default`,coordinateOrigin:i=dc,autoWrapLongitude:a=!1}){r==="default"&&(r=e.isGeospatial?`lnglat`:`cartesian`);let o=mc({viewport:e,devicePixelRatio:t,coordinateSystem:r,coordinateOrigin:i});return o.wrapLongitude=a,o.modelMatrix=n||lc,o}function vc({viewport:e,devicePixelRatio:t,coordinateSystem:n,coordinateOrigin:r}){let{projectionCenter:i,viewProjectionMatrix:a,originCommon:o,cameraPosCommon:s,shaderCoordinateOrigin:c,geospatialOrigin:l}=gc(e,n,r),u=e.getDistanceScales(),d=[e.width*t,e.height*t],f=ht([],[0,0,-e.focalDistance,1],e.projectionMatrix)[3]||1,p={coordinateSystem:pc(n),projectionMode:e.projectionMode,coordinateOrigin:c,commonOrigin:o.slice(0,3),center:i,pseudoMeters:!!e._pseudoMeters,viewportSize:d,devicePixelRatio:t,focalDistance:f,commonUnitsPerMeter:u.unitsPerMeter,commonUnitsPerWorldUnit:u.unitsPerMeter,commonUnitsPerWorldUnit2:uc,scale:e.scale,wrapLongitude:!1,viewProjectionMatrix:a,modelMatrix:lc,cameraPosition:s};if(l){let t=e.getDistanceScales(l);switch(n){case`meter-offsets`:p.commonUnitsPerWorldUnit=t.unitsPerMeter,p.commonUnitsPerWorldUnit2=t.unitsPerMeter2;break;case`lnglat`:case`lnglat-offsets`:e._pseudoMeters||(p.commonUnitsPerMeter=t.unitsPerMeter),p.commonUnitsPerWorldUnit=t.unitsPerDegree,p.commonUnitsPerWorldUnit2=t.unitsPerDegree2;break;case`cartesian`:p.commonUnitsPerWorldUnit=[1,1,t.unitsPerMeter[2]],p.commonUnitsPerWorldUnit2=[0,0,t.unitsPerMeter2[2]]}}if(e.projectionMode===U.GLOBE&&n===`meter-offsets`){let e=r[0]*Math.PI/180,t=r[1]*Math.PI/180,n=Math.cos(t),i=((r[2]||0)/6370972+1)*256;p.commonOrigin=[Math.sin(e)*n*i,-Math.cos(e)*n*i,Math.sin(t)*i]}return p}var yc=`\
${`\
${[`default`,`lnglat`,`meter-offsets`,`lnglat-offsets`,`cartesian`].map(e=>`const COORDINATE_SYSTEM_${e.toUpperCase().replaceAll(`-`,`_`)}: i32 = ${pc(e)};`).join(``)}
${Object.keys(U).map(e=>`const PROJECTION_MODE_${e}: i32 = ${U[e]};`).join(``)}
${Object.keys(nc).map(e=>`const UNIT_${e.toUpperCase()}: i32 = ${nc[e]};`).join(``)}

const TILE_SIZE: f32 = 512.0;
const PI: f32 = 3.1415926536;
const WORLD_SCALE: f32 = TILE_SIZE / (PI * 2.0);
const ZERO_64_LOW: vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);
const EARTH_RADIUS: f32 = 6370972.0; // meters
const GLOBE_RADIUS: f32 = 256.0;

// -----------------------------------------------------------------------------
// Uniform block (converted from GLSL uniform block)
// -----------------------------------------------------------------------------
struct ProjectUniforms {
  wrapLongitude: i32,
  coordinateSystem: i32,
  commonUnitsPerMeter: vec3<f32>,
  projectionMode: i32,
  scale: f32,
  commonUnitsPerWorldUnit: vec3<f32>,
  commonUnitsPerWorldUnit2: vec3<f32>,
  center: vec4<f32>,
  modelMatrix: mat4x4<f32>,
  viewProjectionMatrix: mat4x4<f32>,
  viewportSize: vec2<f32>,
  devicePixelRatio: f32,
  focalDistance: f32,
  cameraPosition: vec3<f32>,
  coordinateOrigin: vec3<f32>,
  commonOrigin: vec3<f32>,
  pseudoMeters: i32,
};

@group(0) @binding(auto)
var<uniform> project: ProjectUniforms;

// -----------------------------------------------------------------------------
// Geometry data shared across the project helpers.
// The active layer shader is responsible for populating this private module
// state before calling the project functions below.
// -----------------------------------------------------------------------------

// Structure to carry additional geometry data used by deck.gl filters.
struct Geometry {
  worldPosition: vec3<f32>,
  worldPositionAlt: vec3<f32>,
  position: vec4<f32>,
  normal: vec3<f32>,
  uv: vec2<f32>,
  pickingColor: vec3<f32>,
};

var<private> geometry: Geometry;
`}

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------

// Returns an adjustment factor for commonUnitsPerMeter
fn _project_size_at_latitude(lat: f32) -> f32 {
  let y = clamp(lat, -89.9, 89.9);
  return 1.0 / cos(radians(y));
}

// Overloaded version: scales a value in meters at a given latitude.
fn _project_size_at_latitude_m(meters: f32, lat: f32) -> f32 {
  return meters * project.commonUnitsPerMeter.z * _project_size_at_latitude(lat);
}

// Computes a non-linear scale factor based on geometry.
// (Note: This function relies on "geometry" being provided.)
fn project_size() -> f32 {
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR &&
      project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT &&
      project.pseudoMeters == 0) {
    if (geometry.position.w == 0.0) {
      return _project_size_at_latitude(geometry.worldPosition.y);
    }
    let y: f32 = geometry.position.y / TILE_SIZE * 2.0 - 1.0;
    let y2 = y * y;
    let y4 = y2 * y2;
    let y6 = y4 * y2;
    return 1.0 + 4.9348 * y2 + 4.0587 * y4 + 1.5642 * y6;
  }
  return 1.0;
}

// Overloads to scale offsets (meters to world units)
fn project_size_float(meters: f32) -> f32 {
  return meters * project.commonUnitsPerMeter.z * project_size();
}

fn project_size_vec2(meters: vec2<f32>) -> vec2<f32> {
  return meters * project.commonUnitsPerMeter.xy * project_size();
}

fn project_size_vec3(meters: vec3<f32>) -> vec3<f32> {
  return meters * project.commonUnitsPerMeter * project_size();
}

fn project_size_vec4(meters: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(meters.xyz * project.commonUnitsPerMeter, meters.w);
}

// Returns a rotation matrix aligning the z‑axis with the given up vector.
fn project_get_orientation_matrix(up: vec3<f32>) -> mat3x3<f32> {
  let uz = normalize(up);
  let ux = select(
    vec3<f32>(1.0, 0.0, 0.0),
    normalize(vec3<f32>(uz.y, -uz.x, 0.0)),
    abs(uz.z) == 1.0
  );
  let uy = cross(uz, ux);
  return mat3x3<f32>(ux, uy, uz);
}

// Since WGSL does not support "out" parameters, we return a struct.
struct RotationResult {
  needsRotation: bool,
  transform: mat3x3<f32>,
};

fn project_needs_rotation(commonPosition: vec3<f32>) -> RotationResult {
  if (project.projectionMode == PROJECTION_MODE_GLOBE) {
    return RotationResult(true, project_get_orientation_matrix(commonPosition));
  } else {
    return RotationResult(false, mat3x3<f32>());  // identity alternative if needed
  };
}

// Projects a normal vector from the current coordinate system to world space.
fn project_normal(vector: vec3<f32>) -> vec3<f32> {
  let normal_modelspace = project.modelMatrix * vec4<f32>(vector, 0.0);
  var n = normalize(normal_modelspace.xyz * project.commonUnitsPerMeter);
  let rotResult = project_needs_rotation(geometry.position.xyz);
  if (rotResult.needsRotation) {
    n = rotResult.transform * n;
  }
  return n;
}

// Applies a scale offset based on y-offset (dy)
fn project_offset_(offset: vec4<f32>) -> vec4<f32> {
  let dy: f32 = offset.y;
  let commonUnitsPerWorldUnit = project.commonUnitsPerWorldUnit + project.commonUnitsPerWorldUnit2 * dy;
  return vec4<f32>(offset.xyz * commonUnitsPerWorldUnit, offset.w);
}

// Projects lng/lat coordinates to a unit tile [0,1]
fn project_mercator_(lnglat: vec2<f32>) -> vec2<f32> {
  var x = lnglat.x;
  if (project.wrapLongitude != 0) {
    x = ((x + 180.0) % 360.0) - 180.0;
  }
  let y = clamp(lnglat.y, -89.9, 89.9);
  return vec2<f32>(
    radians(x) + PI,
    PI + log(tan_fp32(PI * 0.25 + radians(y) * 0.5))
  ) * WORLD_SCALE;
}

// Projects lng/lat/z coordinates for a globe projection.
fn project_globe_(lnglatz: vec3<f32>) -> vec3<f32> {
  let lambda = radians(lnglatz.x);
  let phi = radians(lnglatz.y);
  let cosPhi = cos(phi);
  let D = (lnglatz.z / EARTH_RADIUS + 1.0) * GLOBE_RADIUS;
  return vec3<f32>(
    sin(lambda) * cosPhi,
    -cos(lambda) * cosPhi,
    sin(phi)
  ) * D;
}

// Projects positions (with an optional 64-bit low part) from the input
// coordinate system to the common space.
fn project_position_vec4_f64(position: vec4<f32>, position64Low: vec3<f32>) -> vec4<f32> {
  var position_world = project.modelMatrix * position;

  // Work around for a Mac+NVIDIA bug:
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      return vec4<f32>(
        project_mercator_(position_world.xy),
        _project_size_at_latitude_m(position_world.z, position_world.y),
        position_world.w
      );
    }
    if (project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN) {
      position_world = vec4f(position_world.xyz + project.coordinateOrigin, position_world.w);
    }
  }
  if (project.projectionMode == PROJECTION_MODE_GLOBE) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      return vec4<f32>(
        project_globe_(position_world.xyz),
        position_world.w
      );
    }
    if (project.coordinateSystem == COORDINATE_SYSTEM_METER_OFFSETS) {
      let enuMatrix = project_get_orientation_matrix(project.commonOrigin);
      let metersToCommon = GLOBE_RADIUS / EARTH_RADIUS;
      let offsetCommon = (enuMatrix * vec3<f32>(-position_world.x, -position_world.y, position_world.z)) * metersToCommon;
      return vec4<f32>(project.commonOrigin + offsetCommon, position_world.w);
    }
  }
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      if (abs(position_world.y - project.coordinateOrigin.y) > 0.25) {
        return vec4<f32>(
          project_mercator_(position_world.xy) - project.commonOrigin.xy,
          project_size_float(position_world.z),
          position_world.w
        );
      }
    }
  }
  if (project.projectionMode == PROJECTION_MODE_IDENTITY ||
      (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET &&
       (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
        project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN))) {
    position_world = vec4f(position_world.xyz - project.coordinateOrigin, position_world.w);
  }

  return project_offset_(position_world) +
         project_offset_(project.modelMatrix * vec4<f32>(position64Low, 0.0));
}

// Overloaded versions for different input types.
fn project_position_vec4_f32(position: vec4<f32>) -> vec4<f32> {
  return project_position_vec4_f64(position, ZERO_64_LOW);
}

fn project_position_vec3_f64(position: vec3<f32>, position64Low: vec3<f32>) -> vec3<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 1.0), position64Low);
  return projected_position.xyz;
}

fn project_position_vec3_f32(position: vec3<f32>) -> vec3<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 1.0), ZERO_64_LOW);
  return projected_position.xyz;
}

fn project_position_vec2_f32(position: vec2<f32>) -> vec2<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 0.0, 1.0), ZERO_64_LOW);
  return projected_position.xy;
}

// Transforms a common space position to clip space.
fn project_common_position_to_clipspace_with_projection(position: vec4<f32>, viewProjectionMatrix: mat4x4<f32>, center: vec4<f32>) -> vec4<f32> {
  var clipPosition = viewProjectionMatrix * position + center;
  // deck.gl projection matrices use WebGL's [-w, w] depth range; WebGPU clips z to [0, w].
  clipPosition.z = (clipPosition.z + clipPosition.w) * 0.5;
  return clipPosition;
}

// Uses the project viewProjectionMatrix and center.
fn project_common_position_to_clipspace(position: vec4<f32>) -> vec4<f32> {
  return project_common_position_to_clipspace_with_projection(position, project.viewProjectionMatrix, project.center);
}

// Returns a clip space offset corresponding to a given number of screen pixels.
fn project_pixel_size_to_clipspace(pixels: vec2<f32>) -> vec2<f32> {
  let offset = pixels / project.viewportSize * project.devicePixelRatio * 2.0;
  return offset * project.focalDistance;
}

fn project_meter_size_to_pixel(meters: f32) -> f32 {
  return project_size_float(meters) * project.scale;
}

fn project_unit_size_to_pixel(size: f32, unit: i32) -> f32 {
  if (unit == UNIT_METERS) {
    return project_meter_size_to_pixel(size);
  } else if (unit == UNIT_COMMON) {
    return size * project.scale;
  }
  // UNIT_PIXELS: no scaling applied.
  return size;
}

fn project_pixel_size_float(pixels: f32) -> f32 {
  return pixels / project.scale;
}

fn project_pixel_size_vec2(pixels: vec2<f32>) -> vec2<f32> {
  return pixels / project.scale;
}
`,bc=`\
${[`default`,`lnglat`,`meter-offsets`,`lnglat-offsets`,`cartesian`].map(e=>`const int COORDINATE_SYSTEM_${e.toUpperCase().replaceAll(`-`,`_`)} = ${pc(e)};`).join(``)}
${Object.keys(U).map(e=>`const int PROJECTION_MODE_${e} = ${U[e]};`).join(``)}
${Object.keys(nc).map(e=>`const int UNIT_${e.toUpperCase()} = ${nc[e]};`).join(``)}
layout(std140) uniform projectUniforms {
bool wrapLongitude;
int coordinateSystem;
vec3 commonUnitsPerMeter;
int projectionMode;
float scale;
vec3 commonUnitsPerWorldUnit;
vec3 commonUnitsPerWorldUnit2;
vec4 center;
mat4 modelMatrix;
mat4 viewProjectionMatrix;
vec2 viewportSize;
float devicePixelRatio;
float focalDistance;
vec3 cameraPosition;
vec3 coordinateOrigin;
vec3 commonOrigin;
bool pseudoMeters;
} project;
const float TILE_SIZE = 512.0;
const float PI = 3.1415926536;
const float WORLD_SCALE = TILE_SIZE / (PI * 2.0);
const vec3 ZERO_64_LOW = vec3(0.0);
const float EARTH_RADIUS = 6370972.0;
const float GLOBE_RADIUS = 256.0;
float project_size_at_latitude(float lat) {
float y = clamp(lat, -89.9, 89.9);
return 1.0 / cos(radians(y));
}
float project_size() {
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR &&
project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT &&
project.pseudoMeters == false) {
if (geometry.position.w == 0.0) {
return project_size_at_latitude(geometry.worldPosition.y);
}
float y = geometry.position.y / TILE_SIZE * 2.0 - 1.0;
float y2 = y * y;
float y4 = y2 * y2;
float y6 = y4 * y2;
return 1.0 + 4.9348 * y2 + 4.0587 * y4 + 1.5642 * y6;
}
return 1.0;
}
float project_size_at_latitude(float meters, float lat) {
return meters * project.commonUnitsPerMeter.z * project_size_at_latitude(lat);
}
float project_size(float meters) {
return meters * project.commonUnitsPerMeter.z * project_size();
}
vec2 project_size(vec2 meters) {
return meters * project.commonUnitsPerMeter.xy * project_size();
}
vec3 project_size(vec3 meters) {
return meters * project.commonUnitsPerMeter * project_size();
}
vec4 project_size(vec4 meters) {
return vec4(meters.xyz * project.commonUnitsPerMeter, meters.w);
}
mat3 project_get_orientation_matrix(vec3 up) {
vec3 uz = normalize(up);
vec3 ux = abs(uz.z) == 1.0 ? vec3(1.0, 0.0, 0.0) : normalize(vec3(uz.y, -uz.x, 0));
vec3 uy = cross(uz, ux);
return mat3(ux, uy, uz);
}
bool project_needs_rotation(vec3 commonPosition, out mat3 transform) {
if (project.projectionMode == PROJECTION_MODE_GLOBE) {
transform = project_get_orientation_matrix(commonPosition);
return true;
}
return false;
}
vec3 project_normal(vec3 vector) {
vec4 normal_modelspace = project.modelMatrix * vec4(vector, 0.0);
vec3 n = normalize(normal_modelspace.xyz * project.commonUnitsPerMeter);
mat3 rotation;
if (project_needs_rotation(geometry.position.xyz, rotation)) {
n = rotation * n;
}
return n;
}
vec4 project_offset_(vec4 offset) {
float dy = offset.y;
vec3 commonUnitsPerWorldUnit = project.commonUnitsPerWorldUnit + project.commonUnitsPerWorldUnit2 * dy;
return vec4(offset.xyz * commonUnitsPerWorldUnit, offset.w);
}
vec2 project_mercator_(vec2 lnglat) {
float x = lnglat.x;
if (project.wrapLongitude) {
x = mod(x + 180., 360.0) - 180.;
}
float y = clamp(lnglat.y, -89.9, 89.9);
return vec2(
radians(x) + PI,
PI + log(tan_fp32(PI * 0.25 + radians(y) * 0.5))
) * WORLD_SCALE;
}
vec3 project_globe_(vec3 lnglatz) {
float lambda = radians(lnglatz.x);
float phi = radians(lnglatz.y);
float cosPhi = cos(phi);
float D = (lnglatz.z / EARTH_RADIUS + 1.0) * GLOBE_RADIUS;
return vec3(
sin(lambda) * cosPhi,
-cos(lambda) * cosPhi,
sin(phi)
) * D;
}
vec4 project_position(vec4 position, vec3 position64Low) {
vec4 position_world = project.modelMatrix * position;
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
return vec4(
project_mercator_(position_world.xy),
project_size_at_latitude(position_world.z, position_world.y),
position_world.w
);
}
if (project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN) {
position_world.xyz += project.coordinateOrigin;
}
}
if (project.projectionMode == PROJECTION_MODE_GLOBE) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
return vec4(
project_globe_(position_world.xyz),
position_world.w
);
}
if (project.coordinateSystem == COORDINATE_SYSTEM_METER_OFFSETS) {
mat3 enuMatrix = project_get_orientation_matrix(project.commonOrigin);
float metersToCommon = GLOBE_RADIUS / EARTH_RADIUS;
vec3 offsetCommon = (enuMatrix * vec3(-position_world.xy, position_world.z)) * metersToCommon;
return vec4(project.commonOrigin + offsetCommon, position_world.w);
}
}
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
if (abs(position_world.y - project.coordinateOrigin.y) > 0.25) {
return vec4(
project_mercator_(position_world.xy) - project.commonOrigin.xy,
project_size(position_world.z),
position_world.w
);
}
}
}
if (project.projectionMode == PROJECTION_MODE_IDENTITY ||
(project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET &&
(project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN))) {
position_world.xyz -= project.coordinateOrigin;
}
return project_offset_(position_world) + project_offset_(project.modelMatrix * vec4(position64Low, 0.0));
}
vec4 project_position(vec4 position) {
return project_position(position, ZERO_64_LOW);
}
vec3 project_position(vec3 position, vec3 position64Low) {
vec4 projected_position = project_position(vec4(position, 1.0), position64Low);
return projected_position.xyz;
}
vec3 project_position(vec3 position) {
vec4 projected_position = project_position(vec4(position, 1.0), ZERO_64_LOW);
return projected_position.xyz;
}
vec2 project_position(vec2 position) {
vec4 projected_position = project_position(vec4(position, 0.0, 1.0), ZERO_64_LOW);
return projected_position.xy;
}
vec4 project_common_position_to_clipspace(vec4 position, mat4 viewProjectionMatrix, vec4 center) {
return viewProjectionMatrix * position + center;
}
vec4 project_common_position_to_clipspace(vec4 position) {
return project_common_position_to_clipspace(position, project.viewProjectionMatrix, project.center);
}
vec2 project_pixel_size_to_clipspace(vec2 pixels) {
vec2 offset = pixels / project.viewportSize * project.devicePixelRatio * 2.0;
return offset * project.focalDistance;
}
float project_size_to_pixel(float meters) {
return project_size(meters) * project.scale;
}
vec2 project_size_to_pixel(vec2 meters) {
return project_size(meters) * project.scale;
}
float project_size_to_pixel(float size, int unit) {
if (unit == UNIT_METERS) return project_size_to_pixel(size);
if (unit == UNIT_COMMON) return size * project.scale;
return size;
}
float project_pixel_size(float pixels) {
return pixels / project.scale;
}
vec2 project_pixel_size(vec2 pixels) {
return pixels / project.scale;
}
`,xc={};function Sc(e=xc){return`viewport`in e?_c(e):{}}var Cc={name:`project`,dependencies:[_,po],source:yc,vs:bc,getUniforms:Sc,uniformTypes:{wrapLongitude:`f32`,coordinateSystem:`i32`,commonUnitsPerMeter:`vec3<f32>`,projectionMode:`i32`,scale:`f32`,commonUnitsPerWorldUnit:`vec3<f32>`,commonUnitsPerWorldUnit2:`vec3<f32>`,center:`vec4<f32>`,modelMatrix:`mat4x4<f32>`,viewProjectionMatrix:`mat4x4<f32>`,viewportSize:`vec2<f32>`,devicePixelRatio:`f32`,focalDistance:`f32`,cameraPosition:`vec3<f32>`,coordinateOrigin:`vec3<f32>`,commonOrigin:`vec3<f32>`,pseudoMeters:`f32`}},wc={name:`project32`,dependencies:[Cc],source:`// Define a structure to hold both the clip-space position and the common position.
struct ProjectResult {
  clipPosition: vec4<f32>,
  commonPosition: vec4<f32>,
};

// This function mimics the GLSL version with the 'out' parameter by returning both values.
fn project_position_to_clipspace_and_commonspace(
    position: vec3<f32>,
    position64Low: vec3<f32>,
    offset: vec3<f32>
) -> ProjectResult {
  // Compute the projected position.
  let projectedPosition: vec3<f32> = project_position_vec3_f64(position, position64Low);

  // Start with the provided offset.
  var finalOffset: vec3<f32> = offset;

  // Get whether a rotation is needed and the rotation matrix.
  let rotationResult = project_needs_rotation(projectedPosition);

  // If rotation is needed, update the offset.
  if (rotationResult.needsRotation) {
    finalOffset = rotationResult.transform * offset;
  }

  // Compute the common position.
  let commonPosition: vec4<f32> = vec4<f32>(projectedPosition + finalOffset, 1.0);

  // Convert to clip-space.
  let clipPosition: vec4<f32> = project_common_position_to_clipspace(commonPosition);

  return ProjectResult(clipPosition, commonPosition);
}

// A convenience overload that returns only the clip-space position.
fn project_position_to_clipspace(
    position: vec3<f32>,
    position64Low: vec3<f32>,
    offset: vec3<f32>
) -> vec4<f32> {
  return project_position_to_clipspace_and_commonspace(position, position64Low, offset).clipPosition;
}
`,vs:`vec4 project_position_to_clipspace(
  vec3 position, vec3 position64Low, vec3 offset, out vec4 commonPosition
) {
  vec3 projectedPosition = project_position(position, position64Low);
  mat3 rotation;
  if (project_needs_rotation(projectedPosition, rotation)) {
    // offset is specified as ENU
    // when in globe projection, rotate offset so that the ground alighs with the surface of the globe
    offset = rotation * offset;
  }
  commonPosition = vec4(projectedPosition + offset, 1.0);
  return project_common_position_to_clipspace(commonPosition);
}

vec4 project_position_to_clipspace(
  vec3 position, vec3 position64Low, vec3 offset
) {
  vec4 commonPosition;
  return project_position_to_clipspace(position, position64Low, offset, commonPosition);
}
`};function Tc(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function Ec(e,t){let n=ht([],t,e);return mt(n,n,1/n[3]),n}function Dc(e,t,n){return e<t?t:e>n?n:e}function Oc(e){return Math.log(e)*Math.LOG2E}var kc=Math.log2||Oc;function Ac(e,t){if(!e)throw Error(t||`@math.gl/web-mercator: assertion failed.`)}var jc=Math.PI,Mc=jc/4,W=jc/180,Nc=180/jc,Pc=512,Fc=4003e4,Ic=85.051129,Lc=1.5;function Rc(e){return kc(e)}function zc(e){let[t,n]=e;Ac(Number.isFinite(t)),Ac(Number.isFinite(n)&&n>=-90&&n<=90,`invalid latitude`);let r=t*W,i=n*W;return[Pc*(r+jc)/(2*jc),Pc*(jc+Math.log(Math.tan(Mc+i*.5)))/(2*jc)]}function Bc(e){let[t,n]=e,r=t/Pc*(2*jc)-jc,i=2*(Math.atan(Math.exp(n/Pc*(2*jc)-jc))-Mc);return[r*Nc,i*Nc]}function Vc(e){let{latitude:t}=e;return Ac(Number.isFinite(t)),Rc(Fc*Math.cos(t*W))-9}function Hc(e){let t=Math.cos(e*W);return Pc/Fc/t}function Uc(e){let{latitude:t,longitude:n,highPrecision:r=!1}=e;Ac(Number.isFinite(t)&&Number.isFinite(n));let i=Pc,a=Math.cos(t*W),o=i/360,s=o/a,c=i/Fc/a,l={unitsPerMeter:[c,c,c],metersPerUnit:[1/c,1/c,1/c],unitsPerDegree:[o,s,c],degreesPerUnit:[1/o,1/s,1/c]};if(r){let e=W*Math.tan(t*W)/a,n=o*e/2,r=i/Fc*e,u=r/s*c;l.unitsPerDegree2=[0,n,r],l.unitsPerMeter2=[u,0,u]}return l}function Wc(e,t){let[n,r,i]=e,[a,o,s]=t,{unitsPerMeter:c,unitsPerMeter2:l}=Uc({longitude:n,latitude:r,highPrecision:!0}),u=zc(e);u[0]+=a*(c[0]+l[0]*o),u[1]+=o*(c[1]+l[1]*o);let d=Bc(u),f=(i||0)+(s||0);return Number.isFinite(i)||Number.isFinite(s)?[d[0],d[1],f]:d}function Gc(e){let{height:t,pitch:n,bearing:r,altitude:i,scale:a,center:o}=e,s=Tc();et(s,s,[0,0,-i]),rt(s,s,-n*W),at(s,s,r*W);let c=a/t;return tt(s,s,[c,c,c]),o&&et(s,s,Pe([],o)),s}function Kc(e){let{width:t,height:n,altitude:r,pitch:i=0,offset:a,center:o,scale:s,nearZMultiplier:c=1,farZMultiplier:l=1}=e,{fovy:u=qc(Lc)}=e;r!==void 0&&(u=qc(r));let d=u*W,f=i*W,p=Jc(u),m=p;o&&(m+=o[2]*s/Math.cos(f)/n);let h=d*(.5+(a?a[1]:0)/n),g=Math.sin(h)*m/Math.sin(Dc(Math.PI/2-f-h,.01,Math.PI-.01)),_=Math.sin(f)*g+m,v=m*10,y=Math.min(_*l,v);return{fov:d,aspect:t/n,focalDistance:p,near:c,far:y}}function qc(e){return 2*Math.atan(.5/e)*Nc}function Jc(e){return .5/Math.tan(.5*e*W)}function Yc(e,t){let[n,r,i=0]=e;return Ac(Number.isFinite(n)&&Number.isFinite(r)&&Number.isFinite(i)),Ec(t,[n,r,i,1])}function Xc(e,t,n=0){let[r,i,a]=e;if(Ac(Number.isFinite(r)&&Number.isFinite(i),`invalid pixel coordinate`),Number.isFinite(a))return Ec(t,[r,i,a,1]);let o=Ec(t,[r,i,0,1]),s=Ec(t,[r,i,1,1]),c=o[2],l=s[2];return Ee([],o,s,c===l?0:((n||0)-c)/(l-c))}function Zc(e){let{width:t,height:n,bounds:r,minExtent:i=0,maxZoom:a=24,offset:o=[0,0]}=e,[[s,c],[l,u]]=r,d=Qc(e.padding),f=zc([s,Dc(u,-Ic,Ic)]),p=zc([l,Dc(c,-Ic,Ic)]),m=[Math.max(Math.abs(p[0]-f[0]),i),Math.max(Math.abs(p[1]-f[1]),i)],h=[t-d.left-d.right-Math.abs(o[0])*2,n-d.top-d.bottom-Math.abs(o[1])*2];Ac(h[0]>0&&h[1]>0);let g=h[0]/m[0],_=h[1]/m[1],v=(d.right-d.left)/2/g,y=(d.top-d.bottom)/2/_,b=Bc([(p[0]+f[0])/2+v,(p[1]+f[1])/2+y]),x=Math.min(a,kc(Math.abs(Math.min(g,_))));return Ac(Number.isFinite(x)),{longitude:b[0],latitude:b[1],zoom:x}}function Qc(e=0){return typeof e==`number`?{top:e,bottom:e,left:e,right:e}:(Ac(Number.isFinite(e.top)&&Number.isFinite(e.bottom)&&Number.isFinite(e.left)&&Number.isFinite(e.right)),e)}var $c=Math.PI/180;function el(e,t=0){let{width:n,height:r,unproject:i}=e,a={targetZ:t},o=i([0,r],a),s=i([n,r],a),c,l;return(e.fovy?.5*e.fovy*$c:Math.atan(.5/e.altitude))>(90-e.pitch)*$c-.01?(c=tl(e,0,t),l=tl(e,n,t)):(c=i([0,0],a),l=i([n,0],a)),[o,s,l,c]}function tl(e,t,n){let{pixelUnprojectionMatrix:r}=e,i=Ec(r,[t,0,1,1]),a=Ec(r,[t,e.height,1,1]),o=Bc(Ee([],i,a,(n*e.distanceScales.unitsPerMeter[2]-i[2])/(a[2]-i[2])));return o.push(n),o}var nl=`
layout(std140) uniform shadowUniforms {
  bool drawShadowMap;
  bool useShadowMap;
  vec4 color;
  highp int lightId;
  float lightCount;
  mat4 viewProjectionMatrix0;
  mat4 viewProjectionMatrix1;
  vec4 projectCenter0;
  vec4 projectCenter1;
} shadow;
`,rl=`
${nl}

const int max_lights = 2;

out vec3 shadow_vPosition[max_lights];

vec4 shadow_setVertexPosition(vec4 position_commonspace) {
  mat4 viewProjectionMatrices[max_lights];
  viewProjectionMatrices[0] = shadow.viewProjectionMatrix0;
  viewProjectionMatrices[1] = shadow.viewProjectionMatrix1;
  vec4 projectCenters[max_lights];
  projectCenters[0] = shadow.projectCenter0;
  projectCenters[1] = shadow.projectCenter1;

  if (shadow.drawShadowMap) {
    return project_common_position_to_clipspace(position_commonspace, viewProjectionMatrices[shadow.lightId], projectCenters[shadow.lightId]);
  }
  if (shadow.useShadowMap) {
    for (int i = 0; i < max_lights; i++) {
      if(i < int(shadow.lightCount)) {
        vec4 shadowMap_position = project_common_position_to_clipspace(position_commonspace, viewProjectionMatrices[i], projectCenters[i]);
        shadow_vPosition[i] = (shadowMap_position.xyz / shadowMap_position.w + 1.0) / 2.0;
      }
    }
  }
  return gl_Position;
}

`,il=`
${nl}

const int max_lights = 2;
uniform sampler2D shadow_uShadowMap0;
uniform sampler2D shadow_uShadowMap1;

in vec3 shadow_vPosition[max_lights];

const vec4 bitPackShift = vec4(1.0, 255.0, 65025.0, 16581375.0);
const vec4 bitUnpackShift = 1.0 / bitPackShift;
const vec4 bitMask = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0,  0.0);

float shadow_getShadowWeight(vec3 position, sampler2D shadowMap) {
  vec4 rgbaDepth = texture(shadowMap, position.xy);

  float z = dot(rgbaDepth, bitUnpackShift);
  return smoothstep(0.001, 0.01, position.z - z);
}

vec4 shadow_filterShadowColor(vec4 color) {
  if (shadow.drawShadowMap) {
    vec4 rgbaDepth = fract(gl_FragCoord.z * bitPackShift);
    rgbaDepth -= rgbaDepth.gbaa * bitMask;
    return rgbaDepth;
  }
  if (shadow.useShadowMap) {
    float shadowAlpha = 0.0;
    shadowAlpha += shadow_getShadowWeight(shadow_vPosition[0], shadow_uShadowMap0);
    if(shadow.lightCount > 1.0) {
      shadowAlpha += shadow_getShadowWeight(shadow_vPosition[1], shadow_uShadowMap1);
    }
    shadowAlpha *= shadow.color.a / shadow.lightCount;
    float blendedAlpha = shadowAlpha + color.a * (1.0 - shadowAlpha);

    return vec4(
      mix(color.rgb, shadow.color.rgb, shadowAlpha / blendedAlpha),
      blendedAlpha
    );
  }
  return color;
}

`,al=oc(ul),ol=oc(dl),sl=[0,0,0,1],cl=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0];function ll(e,t){let[n,r,i]=e,a=Xc([n,r,i],t);return Number.isFinite(i)?a:[a[0],a[1],0]}function ul({viewport:e,center:t}){return new St(e.viewProjectionMatrix).invert().transform(t)}function dl({viewport:e,shadowMatrices:t}){let n=[],r=e.pixelUnprojectionMatrix,i=e.isGeospatial?void 0:1,a=[[0,0,i],[e.width,0,i],[0,e.height,i],[e.width,e.height,i],[0,0,-1],[e.width,0,-1],[0,e.height,-1],[e.width,e.height,-1]].map(e=>ll(e,r));for(let r of t){let t=r.clone().translate(new qe(e.center).negate()),i=a.map(e=>t.transform(e)),o=new St().ortho({left:Math.min(...i.map(e=>e[0])),right:Math.max(...i.map(e=>e[0])),bottom:Math.min(...i.map(e=>e[1])),top:Math.max(...i.map(e=>e[1])),near:Math.min(...i.map(e=>-e[2])),far:Math.max(...i.map(e=>-e[2]))});n.push(o.multiplyRight(r))}return n}function fl(e){let{shadowEnabled:t=!0,project:n}=e;if(!t||!n||!e.shadowMatrices||!e.shadowMatrices.length)return{drawShadowMap:!1,useShadowMap:!1,shadow_uShadowMap0:e.dummyShadowMap,shadow_uShadowMap1:e.dummyShadowMap};let r=Cc.getUniforms(n),i=al({viewport:n.viewport,center:r.center}),a=[],o=ol({shadowMatrices:e.shadowMatrices,viewport:n.viewport}).slice();for(let t=0;t<e.shadowMatrices.length;t++){let e=o[t],s=e.clone().translate(new qe(n.viewport.center).negate());r.coordinateSystem===pc(`lnglat`)&&r.projectionMode===U.WEB_MERCATOR?(o[t]=s,a[t]=i):(o[t]=e.clone().multiplyRight(cl),a[t]=s.transform(i))}let s={drawShadowMap:!!e.drawToShadowMap,useShadowMap:e.shadowMaps?e.shadowMaps.length>0:!1,color:e.shadowColor||sl,lightId:e.shadowLightId||0,lightCount:e.shadowMatrices.length,shadow_uShadowMap0:e.dummyShadowMap,shadow_uShadowMap1:e.dummyShadowMap};for(let e=0;e<o.length;e++)s[`viewProjectionMatrix${e}`]=o[e],s[`projectCenter${e}`]=a[e];for(let t=0;t<2;t++)s[`shadow_uShadowMap${t}`]=e.shadowMaps&&e.shadowMaps[t]||e.dummyShadowMap;return s}var pl={name:`shadow`,dependencies:[Cc],vs:rl,fs:il,inject:{"vs:DECKGL_FILTER_GL_POSITION":`
    position = shadow_setVertexPosition(geometry.position);
    `,"fs:DECKGL_FILTER_COLOR":`
    color = shadow_filterShadowColor(color);
    `},getUniforms:fl,uniformTypes:{drawShadowMap:`f32`,useShadowMap:`f32`,color:`vec4<f32>`,lightId:`i32`,lightCount:`f32`,viewProjectionMatrix0:`mat4x4<f32>`,viewProjectionMatrix1:`mat4x4<f32>`,projectCenter0:`vec4<f32>`,projectCenter1:`vec4<f32>`}},ml=16777215;function hl(e,t){e.length===10?R.warn(`pickMultipleObjects can only exclude 10 previously picked objects for layers without picking buffers`)():e.push(t)}var gl=`  float disabledPickingIndexCount;
  vec4 disabledPickingIndices0;
  vec4 disabledPickingIndices1;
  vec4 disabledPickingIndices2;
`;function _l(e){return e.replace(`  vec4 highlightColor;
} picking;`,`  vec4 highlightColor;\n${gl}} picking;`)}function vl(e,t){return[e[t]||0,e[t+1]||0,e[t+2]||0,e[t+3]||0]}var yl=`\
vec3 picking_getPickingColorFromIndex(float objectIndex) {
  if (objectIndex < 0.0 || objectIndex >= ${ml}.0) {
    return vec3(0.0);
  }

  for (int i = 0; i < 10; i++) {
    if (float(i) >= picking.disabledPickingIndexCount) {
      break;
    }
    vec4 disabledIndices = i < 4
      ? picking.disabledPickingIndices0
      : (i < 8 ? picking.disabledPickingIndices1 : picking.disabledPickingIndices2);
    float disabledIndex = disabledIndices[i - (i / 4) * 4];
    if (disabledIndex == objectIndex) {
      return vec3(0.0);
    }
  }

  float encodedIndex = objectIndex + 1.0;
  return vec3(
    mod(encodedIndex, 256.0),
    mod(floor(encodedIndex / 256.0), 256.0),
    mod(floor(encodedIndex / 65536.0), 256.0)
  );
}

vec3 picking_getPickingColorFromIndex(uint objectIndex) {
  return picking_getPickingColorFromIndex(float(objectIndex));
}

vec3 picking_getPickingColorFromInstanceID() {
  return picking_getPickingColorFromIndex(float(gl_InstanceID));
}

void picking_setPickingColorFromInstanceID() {
  picking_setPickingColor(picking_getPickingColorFromInstanceID());
}
`,bl=`\
struct pickingUniforms {
  isActive: f32,
  isAttribute: f32,
  isHighlightActive: f32,
  useByteColors: f32,
  highlightedObjectColor: vec3<f32>,
  highlightColor: vec4<f32>,
  disabledPickingIndexCount: f32,
  disabledPickingIndices0: vec4<f32>,
  disabledPickingIndices1: vec4<f32>,
  disabledPickingIndices2: vec4<f32>,
};

@group(0) @binding(auto) var<uniform> picking: pickingUniforms;

fn picking_normalizeColor(color: vec3<f32>) -> vec3<f32> {
  return select(color, color / 255.0, picking.useByteColors > 0.5);
}

fn picking_normalizeColor4(color: vec4<f32>) -> vec4<f32> {
  return select(color, color / 255.0, picking.useByteColors > 0.5);
}

fn picking_isColorZero(color: vec3<f32>) -> bool {
  return dot(color, vec3<f32>(1.0)) < 0.00001;
}

fn picking_isColorValid(color: vec3<f32>) -> bool {
  return dot(color, vec3<f32>(1.0)) > 0.00001;
}

fn picking_getPickingColorFromIndex(objectIndex: u32) -> vec3<f32> {
  if (objectIndex >= ${ml}u) {
    return vec3<f32>(0.0);
  }

  for (var i = 0; i < 10; i = i + 1) {
    if (f32(i) >= picking.disabledPickingIndexCount) {
      break;
    }
    let disabledIndices = select(
      picking.disabledPickingIndices2,
      select(picking.disabledPickingIndices1, picking.disabledPickingIndices0, i < 4),
      i < 8
    );
    let disabledIndex = disabledIndices[i % 4];
    if (disabledIndex == f32(objectIndex)) {
      return vec3<f32>(0.0);
    }
  }

  let encodedIndex = objectIndex + 1u;
  return vec3<f32>(
    f32(encodedIndex % 256u),
    f32((encodedIndex / 256u) % 256u),
    f32((encodedIndex / 65536u) % 256u)
  ) / 255.0;
}
`,xl={...Kt,vs:`${_l(Kt.vs)}\n${yl}`,fs:_l(Kt.fs),source:bl,uniformTypes:{...Kt.uniformTypes,disabledPickingIndexCount:`f32`,disabledPickingIndices0:`vec4<f32>`,disabledPickingIndices1:`vec4<f32>`,disabledPickingIndices2:`vec4<f32>`},defaultUniforms:{...Kt.defaultUniforms,useByteColors:!0,disabledPickingIndexCount:0,disabledPickingIndices0:[0,0,0,0],disabledPickingIndices1:[0,0,0,0],disabledPickingIndices2:[0,0,0,0]},getUniforms(e,t){let n=Kt.getUniforms(e,t),r=e.disabledPickingIndices||[];return n.disabledPickingIndexCount=r.length,n.disabledPickingIndices0=vl(r,0),n.disabledPickingIndices1=vl(r,4),n.disabledPickingIndices2=vl(r,8),n},inject:{"vs:DECKGL_FILTER_GL_POSITION":`
    // for picking depth values
    picking_setPickingAttribute(position.z / position.w);
  `,"vs:DECKGL_FILTER_COLOR":`
  picking_setPickingColor(geometry.pickingColor);
  `,"fs:DECKGL_FILTER_COLOR":{order:99,injection:`
  // use highlight color if this fragment belongs to the selected object.
  color = picking_filterHighlightColor(color);

  // use picking color if rendering to picking FBO.
  color = picking_filterPickingColor(color);
    `}}},Sl=[po],Cl=[`vs:DECKGL_FILTER_SIZE(inout vec3 size, VertexGeometry geometry)`,`vs:DECKGL_FILTER_GL_POSITION(inout vec4 position, VertexGeometry geometry)`,`vs:DECKGL_FILTER_COLOR(inout vec4 color, VertexGeometry geometry)`,`fs:DECKGL_FILTER_COLOR(inout vec4 color, FragmentGeometry geometry)`],wl=[];function Tl(e){let t=f.getDefaultShaderAssembler(e);for(let e of Sl)t.addDefaultModule(e);t._hookFunctions.length=0;let n=e===`glsl`?Cl:wl;for(let e of n)t.addShaderHook(e);return t}var El=[255,255,255],Dl=1,Ol=0,kl=class{constructor(e={}){this.type=`ambient`;let{color:t=El}=e,{intensity:n=Dl}=e;this.id=e.id||`ambient-${Ol++}`,this.color=t,this.intensity=n}},Al=[255,255,255],jl=1,Ml=[0,0,-1],Nl=0,Pl=class{constructor(e={}){this.type=`directional`;let{color:t=Al}=e,{intensity:n=jl}=e,{direction:r=Ml}=e,{_shadow:i=!1}=e;this.id=e.id||`directional-${Nl++}`,this.color=t,this.intensity=n,this.type=`directional`,this.direction=new qe(r).normalize().toArray(),this.shadow=i}getProjectedLight(e){return this}},Fl=class{constructor(e,t={id:`pass`}){let{id:n}=t;this.id=n,this.device=e,this.props={...t}}setProps(e){Object.assign(this.props,e)}render(e){}cleanup(){}},Il={depthWriteEnabled:!0,depthCompare:`less-equal`,blendColorOperation:`add`,blendColorSrcFactor:`one`,blendColorDstFactor:`one-minus-src-alpha`,blendAlphaOperation:`add`,blendAlphaSrcFactor:`one`,blendAlphaDstFactor:`one-minus-src-alpha`},Ll=class extends Fl{constructor(){super(...arguments),this._lastRenderIndex=-1}render(e){this._render(e)}_render(e){let{canvasContext:t=this.device.canvasContext}=e,n=e.target??t.getCurrentFramebuffer(),[r,i]=t.getDrawingBufferSize(),a=e.clearCanvas??!0,o=e.clearColor??(a?[0,0,0,0]:!1),s=a?1:!1,c=a?0:!1,l=e.colorMask??15,u={viewport:[0,0,r,i]};e.colorMask&&(u.colorMask=l),e.scissorRect&&(u.scissorRect=e.scissorRect);let{shaderModuleProps:d,viewports:f,views:p,onViewportActive:m,clearStack:h=!0}=e,g=e.pass||`unknown`,_=this.device.type===`webgpu`;h&&(this._lastRenderIndex=-1);let v=[];if(!f.length)return this.device.beginRenderPass({framebuffer:n,parameters:u,clearColor:o,clearDepth:s,clearStencil:c}).end(),this.device.submit(),v;try{for(let r of f){m?.(r);let i=this._getDrawLayerParams(r,e),a=p&&p[r.id],l=r.subViewports||[r],f=_?l.map(e=>[e]):[l];for(let r of f){let l=this.device.beginRenderPass({framebuffer:n,parameters:u,clearColor:o,clearDepth:s,clearStencil:c});try{for(let o of r){let r=this._drawLayersInViewport(l,{target:n,canvasContext:t,shaderModuleProps:d,viewport:o,view:a,pass:g,layers:e.layers,isPicking:e.isPicking},i);v.push(r)}}finally{l.end(),_&&this.device.submit()}o=!1,s=!1,c=!1}}return v}finally{_||this.device.submit()}}_getDrawLayerParams(e,{layers:t,pass:n,isPicking:r=!1,layerFilter:i,cullRect:a,views:o,effects:s,canvasContext:c=this.device.canvasContext,shaderModuleProps:l},u=!1){let d=[],f=Rl(this._lastRenderIndex+1),p={layer:t[0],viewport:e,isPicking:r,renderPass:n,cullRect:a},m={};for(let r=0;r<t.length;r++){let a=t[r],h=this._shouldDrawLayer(a,p,i,m),g={shouldDrawLayer:h};h&&!u&&(g.shouldDrawLayer=!0,g.layerRenderIndex=f(a,h),g.shaderModuleProps=this._getShaderModuleProps(a,s,n,c,l),g.layerParameters={...a.context.device.type===`webgpu`?Il:null,...a.context.deck?.props.parameters,...o?.[e.id]?.props.parameters,...this.getLayerParameters(a,r,e)}),d[r]=g}return d}_drawLayersInViewport(e,{layers:t,shaderModuleProps:n,pass:r,target:i,canvasContext:a,viewport:o,view:s,isPicking:c},l){let u=zl(this.device,{canvasContext:a,shaderModuleProps:n,target:i,viewport:o});if(s){let{clear:e,clearColor:t,clearDepth:n,clearStencil:r}=s.props;if(e){let e=[0,0,0,0],a=1,o=0;Array.isArray(t)&&!c?e=[...t.slice(0,3),t[3]||255].map(e=>e/255):t===!1&&(e=!1),n!==void 0&&(a=n),r!==void 0&&(o=r),this.device.beginRenderPass({framebuffer:i,parameters:{viewport:u,scissorRect:u},clearColor:e,clearDepth:a,clearStencil:o}).end()}}let d={totalCount:t.length,visibleCount:0,compositeCount:0,pickableCount:0};e.setParameters({viewport:u});for(let n=0;n<t.length;n++){let i=t[n],a=l[n],{shouldDrawLayer:s}=a;if(s&&i.props.pickable&&d.pickableCount++,i.isComposite&&d.compositeCount++,i.isDrawable&&a.shouldDrawLayer){let{layerRenderIndex:t,shaderModuleProps:n,layerParameters:s}=a;d.visibleCount++,this._lastRenderIndex=Math.max(this._lastRenderIndex,t),n.project&&(n.project.viewport=o),i.context.renderPass=e;try{i._drawLayer({renderPass:e,shaderModuleProps:n,uniforms:{layerIndex:t},parameters:s})}catch(e){i.raiseError(e,`drawing ${i} to ${r}`)}}}return d}shouldDrawLayer(e){return!0}getShaderModuleProps(e,t,n){return null}getLayerParameters(e,t,n){return e.props.parameters}_shouldDrawLayer(e,t,n,r){if(!(e.props.visible&&this.shouldDrawLayer(e)))return!1;t.layer=e;let i=e.parent;for(;i;){if(!i.props.visible||!i.filterSubLayer(t))return!1;t.layer=i,i=i.parent}if(n){let e=t.layer.id;if(e in r||(r[e]=n(t)),!r[e])return!1}return e.activateViewport(t.viewport),!0}_getShaderModuleProps(e,t,n,r,i){let a=r.cssToDeviceRatio(),o=e.internalState?.propsInTransition||e.props,s={layer:o,picking:{isActive:!1},project:{viewport:e.context.viewport,devicePixelRatio:a,modelMatrix:o.modelMatrix,coordinateSystem:o.coordinateSystem,coordinateOrigin:o.coordinateOrigin,autoWrapLongitude:e.wrapLongitude}};if(t)for(let n of t)Bl(s,n.getShaderModuleProps?.(e,s));for(let t of e.context.defaultShaderModules)t.name in s||(s[t.name]={});return Bl(s,this.getShaderModuleProps(e,t,s),i)}};function Rl(e=0,t={}){let n={},r=(i,a)=>{let o=i.props._offset,s=i.id,c=i.parent&&i.parent.id,l;if(c&&!(c in t)&&r(i.parent,!1),c in n){let e=n[c]=n[c]||Rl(t[c],t);l=e(i,a),n[s]=e}else Number.isFinite(o)?(l=o+(t[c]||0),n[s]=null):l=e;return a&&l>=e&&(e=l+1),t[s]=l,l};return r}function zl(e,{canvasContext:t=e.canvasContext,shaderModuleProps:n,target:r,viewport:i}){let a=n?.project?.devicePixelRatio??t.cssToDeviceRatio(),[,o]=t.getDrawingBufferSize(),s=r?r.height:o,c=i;return[c.x*a,s-(c.y+c.height)*a,c.width*a,c.height*a]}function Bl(e,...t){for(let n of t)if(n)for(let t in n)e[t]?Object.assign(e[t],n[t]):e[t]=n[t];return e}var Vl=class extends Ll{constructor(e,t){super(e,t);let n=e.createTexture({format:`rgba8unorm`,width:1,height:1,sampler:{minFilter:`linear`,magFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`}}),r=e.createTexture({format:`depth16unorm`,width:1,height:1});this.fbo=e.createFramebuffer({id:`shadowmap`,width:1,height:1,colorAttachments:[n],depthStencilAttachment:r})}delete(){this.fbo&&=(this.fbo.destroy(),null)}getShadowMap(){return this.fbo.colorAttachments[0].texture}render(e){let t=this.fbo,n=this.device.canvasContext.cssToDeviceRatio(),r=e.viewports[0],i=r.width*n,a=r.height*n,o=[1,1,1,1];(i!==t.width||a!==t.height)&&t.resize({width:i,height:a}),super.render({...e,clearColor:o,target:t,pass:`shadow`})}getLayerParameters(e,t,n){return{...e.props.parameters,blend:!1,depthWriteEnabled:!0,depthCompare:`less-equal`}}shouldDrawLayer(e){return e.props.shadowEnabled!==!1}getShaderModuleProps(e,t,n){return{shadow:{project:n.project,drawToShadowMap:!0}}}},Hl={color:[255,255,255],intensity:1},Ul=[{color:[255,255,255],intensity:1,direction:[-1,3,-1]},{color:[255,255,255],intensity:.9,direction:[1,-8,-2.5]}],Wl=[0,0,0,200/255],Gl=class{constructor(e={}){this.id=`lighting-effect`,this.shadowColor=Wl,this.shadow=!1,this.directionalLights=[],this.pointLights=[],this.shadowPasses=[],this.dummyShadowMap=null,this.setProps(e)}setup(e){this.context=e;let{device:t,deck:n}=e;this.shadow&&!this.dummyShadowMap&&(this._createShadowPasses(t),n._addDefaultShaderModule(pl),this.dummyShadowMap=t.createTexture({width:1,height:1}))}setProps(e){this.ambientLight=void 0,this.directionalLights=[],this.pointLights=[];for(let t in e){let n=e[t];switch(n.type){case`ambient`:this.ambientLight=n;break;case`directional`:this.directionalLights.push(n);break;case`point`:this.pointLights.push(n)}}this._applyDefaultLights(),this.shadow=this.directionalLights.some(e=>e.shadow),this.context&&this.setup(this.context),this.props=e}preRender({layers:e,layerFilter:t,viewports:n,onViewportActive:r,views:i}){if(this.shadow){this.shadowMatrices=this._calculateMatrices();for(let a=0;a<this.shadowPasses.length;a++)this.shadowPasses[a].render({layers:e,layerFilter:t,viewports:n,onViewportActive:r,views:i,shaderModuleProps:{shadow:{shadowLightId:a,dummyShadowMap:this.dummyShadowMap,shadowMatrices:this.shadowMatrices}}})}}getShaderModuleProps(e,t){let n=this.shadow?{project:t.project,shadowMaps:this.shadowPasses.map(e=>e.getShadowMap()),dummyShadowMap:this.dummyShadowMap,shadowColor:this.shadowColor,shadowMatrices:this.shadowMatrices}:{},r={enabled:!0,lights:this._getLights(e)},i=e.props.material;return{shadow:n,lighting:r,phongMaterial:i,gouraudMaterial:i}}cleanup(e){for(let e of this.shadowPasses)e.delete();this.shadowPasses.length=0,this.dummyShadowMap&&(this.dummyShadowMap.destroy(),this.dummyShadowMap=null,e.deck._removeDefaultShaderModule(pl))}_calculateMatrices(){let e=[];for(let t of this.directionalLights){let n=new St().lookAt({eye:new qe(t.direction).negate()});e.push(n)}return e}_createShadowPasses(e){for(let t=0;t<this.directionalLights.length;t++){let n=new Vl(e);this.shadowPasses[t]=n}}_applyDefaultLights(){let{ambientLight:e,pointLights:t,directionalLights:n}=this;!e&&t.length===0&&n.length===0&&(this.ambientLight=new kl(Hl),this.directionalLights.push(new Pl(Ul[0]),new Pl(Ul[1])))}_getLights(e){let t=[];this.ambientLight&&t.push(this.ambientLight);for(let n of this.pointLights)t.push(n.getProjectedLight({layer:e}));for(let n of this.directionalLights)t.push(n.getProjectedLight({layer:e}));return t}},Kl=new class{constructor(e={}){this._pool=[],this.opts={overAlloc:2,poolSize:100},this.setOptions(e)}setOptions(e){Object.assign(this.opts,e)}allocate(e,t,{size:n=1,type:r,padding:i=0,copy:a=!1,initialize:o=!1,maxCount:s}){let c=r||e&&e.constructor||Float32Array,l=t*n+i;if(ArrayBuffer.isView(e)){if(l<=e.length)return e;if(l*e.BYTES_PER_ELEMENT<=e.buffer.byteLength)return new c(e.buffer,0,l)}let u=1/0;s&&(u=s*n+i);let d=this._allocate(c,l,o,u);return e&&a?d.set(e):o||d.fill(0,0,4),this._release(e),d}release(e){this._release(e)}_allocate(e,t,n,r){let i=Math.max(Math.ceil(t*this.opts.overAlloc),1);i>r&&(i=r);let a=this._pool,o=e.BYTES_PER_ELEMENT*i,s=a.findIndex(e=>e.byteLength>=o);if(s>=0){let t=new e(a.splice(s,1)[0],0,i);return n&&t.fill(0),t}return new e(i)}_release(e){if(!ArrayBuffer.isView(e))return;let t=this._pool,{buffer:n}=e,{byteLength:r}=n,i=t.findIndex(e=>e.byteLength>=r);i<0?t.push(n):(i>0||t.length<this.opts.poolSize)&&t.splice(i,0,n),t.length>this.opts.poolSize&&t.shift()}};function ql(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function Jl(e,t){let n=e%t;return n<0?t+n:n}function Yl(e){return[e[12],e[13],e[14]]}function Xl(e){let t=e[10],n=e[14];return{near:n/(t-1),far:n/(t+1)}}function Zl(e){return{left:$l(e[3]+e[0],e[7]+e[4],e[11]+e[8],e[15]+e[12]),right:$l(e[3]-e[0],e[7]-e[4],e[11]-e[8],e[15]-e[12]),bottom:$l(e[3]+e[1],e[7]+e[5],e[11]+e[9],e[15]+e[13]),top:$l(e[3]-e[1],e[7]-e[5],e[11]-e[9],e[15]-e[13]),near:$l(e[3]+e[2],e[7]+e[6],e[11]+e[10],e[15]+e[14]),far:$l(e[3]-e[2],e[7]-e[6],e[11]-e[10],e[15]-e[14])}}var Ql=new qe;function $l(e,t,n,r){Ql.set(e,t,n);let i=Ql.len();return{distance:r/i,normal:new qe(-e/i,-t/i,-n/i)}}function eu(e){return e-Math.fround(e)}var tu;function nu(e,t){let{size:n=1,startIndex:r=0}=t,i=t.endIndex===void 0?e.length:t.endIndex,a=(i-r)/n;tu=Kl.allocate(tu,a,{type:Float32Array,size:n*2});let o=r,s=0;for(;o<i;){for(let t=0;t<n;t++){let r=e[o++];tu[s+t]=r,tu[s+t+n]=eu(r)}s+=n*2}return tu.subarray(0,a*n*2)}function ru(e){let t=null,n=!1;for(let r of e)r&&(t?(n||=(t=[[t[0][0],t[0][1]],[t[1][0],t[1][1]]],!0),t[0][0]=Math.min(t[0][0],r[0][0]),t[0][1]=Math.min(t[0][1],r[0][1]),t[1][0]=Math.max(t[1][0],r[1][0]),t[1][1]=Math.max(t[1][1],r[1][1])):t=r);return t}var iu=Math.PI/180,au=ql(),ou=[0,0,0],su={unitsPerMeter:[1,1,1],metersPerUnit:[1,1,1]};function cu({width:e,height:t,orthographic:n,fovyRadians:r,focalDistance:i,padding:a,near:o,far:s}){let c=e/t,l=n?new St().orthographic({fovy:r,aspect:c,focalDistance:i,near:o,far:s}):new St().perspective({fovy:r,aspect:c,near:o,far:s});if(a){let{left:n=0,right:r=0,top:i=0,bottom:o=0}=a,s=I((n+e-r)/2,0,e)-e/2,c=I((i+t-o)/2,0,t)-t/2;l[8]-=s*2/e,l[9]+=c*2/t}return l}var lu=class e{constructor(e={}){this._frustumPlanes={},this.id=e.id||this.constructor.displayName||`viewport`,this.x=e.x||0,this.y=e.y||0,this.width=e.width||1,this.height=e.height||1,this.zoom=e.zoom||0,this.padding=e.padding,this.distanceScales=e.distanceScales||su,this.focalDistance=e.focalDistance||1,this.position=e.position||ou,this.modelMatrix=e.modelMatrix||null;let{longitude:t,latitude:n}=e;this.isGeospatial=Number.isFinite(n)&&Number.isFinite(t),this._initProps(e),this._initMatrices(e),this.equals=this.equals.bind(this),this.project=this.project.bind(this),this.unproject=this.unproject.bind(this),this.projectPosition=this.projectPosition.bind(this),this.unprojectPosition=this.unprojectPosition.bind(this),this.projectFlat=this.projectFlat.bind(this),this.unprojectFlat=this.unprojectFlat.bind(this)}get subViewports(){return null}get metersPerPixel(){return this.distanceScales.metersPerUnit[2]/this.scale}get projectionMode(){return this.isGeospatial?this.zoom<12?U.WEB_MERCATOR:U.WEB_MERCATOR_AUTO_OFFSET:U.IDENTITY}equals(t){return t instanceof e?this===t||t.width===this.width&&t.height===this.height&&t.scale===this.scale&&t.projectionMode===this.projectionMode&&t.resolution===this.resolution&&fe(t.distanceScales.unitsPerMeter,this.distanceScales.unitsPerMeter)&&fe(t.projectionMatrix,this.projectionMatrix)&&fe(t.viewMatrix,this.viewMatrix):!1}project(e,{topLeft:t=!0}={}){let n=Yc(this.projectPosition(e),this.pixelProjectionMatrix),[r,i]=n,a=t?i:this.height-i;return e.length===2?[r,a]:[r,a,n[2]]}unproject(e,{topLeft:t=!0,targetZ:n}={}){let[r,i,a]=e,o=t?i:this.height-i,s=n&&n*this.distanceScales.unitsPerMeter[2],c=Xc([r,o,a],this.pixelUnprojectionMatrix,s),[l,u,d]=this.unprojectPosition(c);return Number.isFinite(a)?[l,u,d]:Number.isFinite(n)?[l,u,n]:[l,u]}projectPosition(e){let[t,n]=this.projectFlat(e);return[t,n,(e[2]||0)*this.distanceScales.unitsPerMeter[2]]}unprojectPosition(e){let[t,n]=this.unprojectFlat(e);return[t,n,(e[2]||0)*this.distanceScales.metersPerUnit[2]]}projectFlat(e){if(this.isGeospatial){let t=zc(e);return t[1]=I(t[1],-318,830),t}return e}unprojectFlat(e){return this.isGeospatial?Bc(e):e}getBounds(e={}){let t={targetZ:e.z||0},n=this.unproject([0,0],t),r=this.unproject([this.width,0],t),i=this.unproject([0,this.height],t),a=this.unproject([this.width,this.height],t);return[Math.min(n[0],r[0],i[0],a[0]),Math.min(n[1],r[1],i[1],a[1]),Math.max(n[0],r[0],i[0],a[0]),Math.max(n[1],r[1],i[1],a[1])]}getDistanceScales(e){return e&&this.isGeospatial?Uc({longitude:e[0],latitude:e[1],highPrecision:!0}):this.distanceScales}containsPixel({x:e,y:t,width:n=1,height:r=1}){return e<this.x+this.width&&this.x<e+n&&t<this.y+this.height&&this.y<t+r}getFrustumPlanes(){return this._frustumPlanes.near||Object.assign(this._frustumPlanes,Zl(this.viewProjectionMatrix)),this._frustumPlanes}panByPosition(e,t,n){return null}_initProps(e){let t=e.longitude,n=e.latitude;this.isGeospatial&&(Number.isFinite(e.zoom)||(this.zoom=Vc({latitude:n})+Math.log2(this.focalDistance)),this.distanceScales=e.distanceScales||Uc({latitude:n,longitude:t}));let r=2**this.zoom;this.scale=r;let{position:i,modelMatrix:a}=e,o=ou;if(i&&(o=a?new St(a).transformAsVector(i,[]):i),this.isGeospatial){let e=this.projectPosition([t,n,0]);this.center=new qe(o).scale(this.distanceScales.unitsPerMeter).add(e)}else this.center=this.projectPosition(o)}_initMatrices(e){let{viewMatrix:t=au,projectionMatrix:n=null,orthographic:r=!1,fovyRadians:i,fovy:a=75,near:o=.1,far:s=1e3,padding:c=null,focalDistance:l=1}=e;this.viewMatrixUncentered=t,this.viewMatrix=new St().multiplyRight(t).translate(new qe(this.center).negate()),this.projectionMatrix=n||cu({width:this.width,height:this.height,orthographic:r,fovyRadians:i||a*iu,focalDistance:l,padding:c,near:o,far:s});let u=ql();$e(u,u,this.projectionMatrix),$e(u,u,this.viewMatrix),this.viewProjectionMatrix=u,this.viewMatrixInverse=Ze([],this.viewMatrix)||this.viewMatrix,this.cameraPosition=Yl(this.viewMatrixInverse);let d=ql(),f=ql();tt(d,d,[this.width/2,-this.height/2,1]),et(d,d,[1,-1,0]),$e(f,d,this.viewProjectionMatrix),this.pixelProjectionMatrix=f,this.pixelUnprojectionMatrix=Ze(ql(),this.pixelProjectionMatrix),this.pixelUnprojectionMatrix||R.warn(`Pixel project matrix not invertible`)()}};lu.displayName=`Viewport`;var uu=class e extends lu{constructor(e={}){let{latitude:t=0,longitude:n=0,zoom:r=0,pitch:i=0,bearing:a=0,nearZMultiplier:o=.1,farZMultiplier:s=1.01,nearZ:c,farZ:l,orthographic:u=!1,projectionMatrix:d,repeat:f=!1,worldOffset:p=0,position:m,padding:h,legacyMeterSizes:g=!1}=e,{width:_,height:v,altitude:y=1.5}=e,b=2**r;_||=1,v||=1;let x,S=null;if(d)y=d[5]/2,x=qc(y);else{e.fovy?(x=e.fovy,y=Jc(x)):x=qc(y);let n;if(h){let{top:e=0,bottom:t=0}=h;n=[0,I((e+v-t)/2,0,v)-v/2]}S=Kc({width:_,height:v,scale:b,center:m&&[0,0,m[2]*Hc(t)],offset:n,pitch:i,fovy:x,nearZMultiplier:o,farZMultiplier:s}),Number.isFinite(c)&&(S.near=c),Number.isFinite(l)&&(S.far=l)}let C=Gc({height:v,pitch:i,bearing:a,scale:b,altitude:y});p&&(C=new St().translate([512*p,0,0]).multiplyLeft(C)),super({...e,width:_,height:v,viewMatrix:C,longitude:n,latitude:t,zoom:r,...S,fovy:x,focalDistance:y}),this.latitude=t,this.longitude=n,this.zoom=r,this.pitch=i,this.bearing=a,this.altitude=y,this.fovy=x,this.orthographic=u,this._subViewports=f?[]:null,this._pseudoMeters=g,Object.freeze(this)}get subViewports(){if(this._subViewports&&!this._subViewports.length){let t=this.getBounds(),n=Math.floor((t[0]+180)/360),r=Math.ceil((t[2]-180)/360);for(let t=n;t<=r;t++){let n=t?new e({...this,worldOffset:t}):this;this._subViewports.push(n)}}return this._subViewports}equals(t){return t instanceof e&&t._pseudoMeters===this._pseudoMeters&&super.equals(t)}projectPosition(e){if(this._pseudoMeters)return super.projectPosition(e);let[t,n]=this.projectFlat(e);return[t,n,(e[2]||0)*Hc(e[1])]}unprojectPosition(e){if(this._pseudoMeters)return super.unprojectPosition(e);let[t,n]=this.unprojectFlat(e);return[t,n,(e[2]||0)/Hc(n)]}addMetersToLngLat(e,t){return Wc(e,t)}panByPosition(e,t,n){let r=Xc(t,this.pixelUnprojectionMatrix),i=Ce([],this.projectFlat(e),Te([],r)),a=Ce([],this.center,i),[o,s]=this.unprojectFlat(a);return{longitude:o,latitude:s}}panByPosition3D(e,t){let n=e[2]||0,r=Oe([],e,this.unproject(t,{targetZ:n}));return{longitude:this.longitude+r[0],latitude:this.latitude+r[1]}}getBounds(e={}){let t=el(this,e.z||0);return[Math.min(t[0][0],t[1][0],t[2][0],t[3][0]),Math.min(t[0][1],t[1][1],t[2][1],t[3][1]),Math.max(t[0][0],t[1][0],t[2][0],t[3][0]),Math.max(t[0][1],t[1][1],t[2][1],t[3][1])]}fitBounds(t,n={}){let{width:r,height:i}=this,{longitude:a,latitude:o,zoom:s}=Zc({width:r,height:i,bounds:t,...n});return new e({width:r,height:i,longitude:a,latitude:o,zoom:s})}};uu.displayName=`WebMercatorViewport`;var du=[0,0,0];function fu(e,t,n=!1){let r=t.projectPosition(e);if(n&&t instanceof uu){let[n,i,a=0]=e;r[2]=a*t.getDistanceScales([n,i]).unitsPerMeter[2]}return r}function pu(e){let{viewport:t,modelMatrix:n,coordinateOrigin:r}=e,{coordinateSystem:i,fromCoordinateSystem:a,fromCoordinateOrigin:o}=e;return i==="default"&&(i=t.isGeospatial?`lnglat`:`cartesian`),a===void 0?a=i:a==="default"&&(a=t.isGeospatial?`lnglat`:`cartesian`),o===void 0&&(o=r),{viewport:t,coordinateSystem:i,coordinateOrigin:r,modelMatrix:n,fromCoordinateSystem:a,fromCoordinateOrigin:o}}function mu(e,{viewport:t,modelMatrix:n,coordinateSystem:r,coordinateOrigin:i,offsetMode:a}){let[o,s,c=0]=e;switch(n&&([o,s,c]=ht([],[o,s,c,1],n)),r){case`default`:return mu(e,{viewport:t,modelMatrix:n,coordinateSystem:t.isGeospatial?`lnglat`:`cartesian`,coordinateOrigin:i,offsetMode:a});case`lnglat`:return fu([o,s,c],t,a);case`lnglat-offsets`:return fu([o+i[0],s+i[1],c+(i[2]||0)],t,a);case`meter-offsets`:return fu(Wc(i,[o,s,c]),t,a);case`cartesian`:return t.isGeospatial?[o+i[0],s+i[1],c+i[2]]:t.projectPosition([o,s,c]);default:throw Error(`Invalid coordinateSystem: ${r}`)}}function hu(e,t){let{viewport:n,coordinateSystem:r,coordinateOrigin:i,modelMatrix:a,fromCoordinateSystem:o,fromCoordinateOrigin:s}=pu(t),{autoOffset:c=!0}=t,{geospatialOrigin:l=du,shaderCoordinateOrigin:u=du,offsetMode:d=!1}=c?hc(n,r,i):{},f=mu(e,{viewport:n,modelMatrix:a,coordinateSystem:o,coordinateOrigin:s,offsetMode:d});return d&&We(f,f,n.projectPosition(l||u)),f}var gu={blendColorOperation:`add`,blendColorSrcFactor:`one`,blendColorDstFactor:`zero`,blendAlphaOperation:`add`,blendAlphaSrcFactor:`constant`,blendAlphaDstFactor:`zero`},_u=class extends Ll{constructor(){super(...arguments),this._colorEncoderState=null}render(e){return`pickingFBO`in e?this._drawPickingBuffer(e):{decodePickingColor:null,stats:super._render(e)}}_drawPickingBuffer({layers:e,layerFilter:t,views:n,viewports:r,onViewportActive:i,pickingFBO:a,deviceRect:{x:o,y:s,width:c,height:l},cullRect:u,effects:d,pass:f=`picking`,pickZ:p,canvasContext:m,shaderModuleProps:h,clearColor:g}){this.pickZ=p;let _=this._resetColorEncoder(p),v=[o,s,c,l],y=super._render({target:a,layers:e,layerFilter:t,views:n,viewports:r,onViewportActive:i,cullRect:u,effects:d?.filter(e=>e.useInPicking),pass:f,canvasContext:m,isPicking:!0,shaderModuleProps:h,clearColor:g??[0,0,0,0],colorMask:15,scissorRect:v});return this._colorEncoderState=null,{decodePickingColor:_&&yu.bind(null,_),stats:y}}shouldDrawLayer(e){let{pickable:t,operation:n}=e.props;return t&&n.includes(`draw`)||n.includes(`terrain`)||n.includes(`mask`)}getShaderModuleProps(e,t,n){return{picking:{isActive:1,isAttribute:this.pickZ,disabledPickingIndices:e.internalState?.disabledPickingIndices},lighting:{enabled:!1}}}getLayerParameters(e,t,n){let r={...e.props.parameters},{pickable:i,operation:a}=e.props;return this._colorEncoderState?i&&a.includes(`draw`)?(Object.assign(r,gu),r.blend=!0,this.device.type===`webgpu`?r.blendConstant=vu(this._colorEncoderState,e,n):r.blendColor=vu(this._colorEncoderState,e,n),a.includes(`terrain`)&&e.state?._hasPickingCover&&(r.blendAlphaSrcFactor=`one`)):a.includes(`terrain`)&&(r.blend=!1):r.blend=!1,r}_resetColorEncoder(e){return this._colorEncoderState=e?null:{byLayer:new Map,byAlpha:[]},this._colorEncoderState}};function vu(e,t,n){let{byLayer:r,byAlpha:i}=e,a,o=r.get(t);return o?(o.viewports.push(n),a=o.a):(a=r.size+1,a<=255?(o={a,layer:t,viewports:[n]},r.set(t,o),i[a]=o):(R.warn(`Too many pickable layers, only picking the first 255`)(),a=0)),[0,0,0,a/255]}function yu(e,t){let n=e.byAlpha[t[3]];return n&&{pickedLayer:n.layer,pickedViewports:n.viewports,pickedObjectIndex:n.layer.decodePickingColor(t)}}var bu={NO_STATE:`Awaiting state`,MATCHED:`Matched. State transferred from previous layer`,INITIALIZED:`Initialized`,AWAITING_GC:`Discarded. Awaiting garbage collection`,AWAITING_FINALIZATION:`No longer matched. Awaiting garbage collection`,FINALIZED:`Finalized! Awaiting garbage collection`},xu=Symbol.for(`component`),Su=Symbol.for(`propTypes`),Cu=Symbol.for(`deprecatedProps`),wu=Symbol.for(`asyncPropDefaults`),Tu=Symbol.for(`asyncPropOriginal`),Eu=Symbol.for(`asyncPropResolved`);function Du(e,t=()=>!0){return Array.isArray(e)?Ou(e,t,[]):t(e)?[e]:[]}function Ou(e,t,n){let r=-1;for(;++r<e.length;){let i=e[r];Array.isArray(i)?Ou(i,t,n):t(i)&&n.push(i)}return n}function ku({target:e,source:t,start:n=0,count:r=1}){let i=t.length,a=r*i,o=0;for(let r=n;o<i;o++)e[r++]=t[o];for(;o<a;)o<a-o?(e.copyWithin(n+o,n,n+o),o*=2):(e.copyWithin(n+o,n,n+a-o),o=a);return e}var Au=class{constructor(e,t,n){this._loadCount=0,this._subscribers=new Set,this.id=e,this.context=n,this.setData(t)}subscribe(e){this._subscribers.add(e)}unsubscribe(e){this._subscribers.delete(e)}inUse(){return this._subscribers.size>0}delete(){}getData(){return this.isLoaded?this._error?Promise.reject(this._error):this._content:this._loader.then(()=>this.getData())}setData(e,t){if(e===this._data&&!t)return;this._data=e;let n=++this._loadCount,r=e;typeof e==`string`&&(r=pa(e)),r instanceof Promise?(this.isLoaded=!1,this._loader=r.then(e=>{this._loadCount===n&&(this.isLoaded=!0,this._error=void 0,this._content=e)}).catch(e=>{this._loadCount===n&&(this.isLoaded=!0,this._error=e||!0)})):(this.isLoaded=!0,this._error=void 0,this._content=e);for(let e of this._subscribers)e.onChange(this.getData())}},ju=class{constructor(e){this.protocol=e.protocol||`resource://`,this._context={device:e.device,gl:e.device?.gl,resourceManager:this},this._resources={},this._consumers={},this._pruneRequest=null}contains(e){return e.startsWith(this.protocol)?!0:e in this._resources}add({resourceId:e,data:t,forceUpdate:n=!1,persistent:r=!0}){let i=this._resources[e];i?i.setData(t,n):(i=new Au(e,t,this._context),this._resources[e]=i),i.persistent=r}remove(e){let t=this._resources[e];t&&(t.delete(),delete this._resources[e])}unsubscribe({consumerId:e}){let t=this._consumers[e];if(t){for(let e in t){let n=t[e],r=this._resources[n.resourceId];r&&r.unsubscribe(n)}delete this._consumers[e],this.prune()}}subscribe({resourceId:e,onChange:t,consumerId:n,requestId:r=`default`}){let{_resources:i,protocol:a}=this;e.startsWith(a)&&(e=e.replace(a,``),i[e]||this.add({resourceId:e,data:null,persistent:!1}));let o=i[e];if(this._track(n,r,o,t),o)return o.getData()}prune(){this._pruneRequest||=setTimeout(()=>this._prune(),0)}finalize(){for(let e in this._resources)this._resources[e].delete()}_track(e,t,n,r){let i=this._consumers,a=i[e]=i[e]||{},o=a[t],s=o&&o.resourceId&&this._resources[o.resourceId];s&&(s.unsubscribe(o),this.prune()),n&&(o?(o.onChange=r,o.resourceId=n.id):o={onChange:r,resourceId:n.id},a[t]=o,n.subscribe(o))}_prune(){this._pruneRequest=null;for(let e of Object.keys(this._resources)){let t=this._resources[e];!t.persistent&&!t.inUse()&&(t.delete(),delete this._resources[e])}}},Mu=`layerManager.setLayers`,Nu=`layerManager.activateViewport`,Pu=class{constructor(e,t){this._lastRenderedLayers=[],this._needsRedraw=!1,this._needsUpdate=!1,this._nextLayers=null,this._debug=!1,this._defaultShaderModulesChanged=!1,this.activateViewport=e=>{z(Nu,this,e),e&&(this.context.viewport=e)};let{deck:n,stats:r,viewport:i,timeline:a}=t||{};this.layers=[],this.resourceManager=new ju({device:e,protocol:`deck://`}),this.context={mousePosition:null,userData:{},layerManager:this,device:e,gl:e?.gl,deck:n,shaderAssembler:Tl(e?.info?.shadingLanguage||`glsl`),defaultShaderModules:[co],renderPass:void 0,stats:r||new k({id:`deck.gl`}),viewport:i||new lu({id:`DEFAULT-INITIAL-VIEWPORT`}),timeline:a||new un,resourceManager:this.resourceManager,onError:void 0},Object.seal(this)}finalize(){this.resourceManager.finalize();for(let e of this.layers)this._finalizeLayer(e)}needsRedraw(e={clearRedrawFlags:!1}){let t=this._needsRedraw;e.clearRedrawFlags&&(this._needsRedraw=!1);for(let n of this.layers){let r=n.getNeedsRedraw(e);t||=r}return t}needsUpdate(){return this._nextLayers&&this._nextLayers!==this._lastRenderedLayers?`layers changed`:this._defaultShaderModulesChanged?`shader modules changed`:this._needsUpdate}setNeedsRedraw(e){this._needsRedraw=this._needsRedraw||e}setNeedsUpdate(e){this._needsUpdate=this._needsUpdate||e}getLayers({layerIds:e}={}){return e?this.layers.filter(t=>e.find(e=>t.id.indexOf(e)===0)):this.layers}setProps(e){`debug`in e&&(this._debug=e.debug),`userData`in e&&(this.context.userData=e.userData),`layers`in e&&(this._nextLayers=e.layers),`onError`in e&&(this.context.onError=e.onError)}setLayers(e,t){z(Mu,this,t,e),this._lastRenderedLayers=e;let n=Du(e,Boolean);for(let e of n)e.context=this.context;this._updateLayers(this.layers,n)}updateLayers(){let e=this.needsUpdate();e&&(this.setNeedsRedraw(`updating layers: ${e}`),this.setLayers(this._nextLayers||this._lastRenderedLayers,e)),this._nextLayers=null}addDefaultShaderModule(e){let{defaultShaderModules:t}=this.context;t.find(t=>t.name===e.name)||(t.push(e),this._defaultShaderModulesChanged=!0)}removeDefaultShaderModule(e){let{defaultShaderModules:t}=this.context,n=t.findIndex(t=>t.name===e.name);n>=0&&(t.splice(n,1),this._defaultShaderModulesChanged=!0)}_handleError(e,t,n){n.raiseError(t,`${e} of ${n}`)}_updateLayers(e,t){let n={};for(let t of e)n[t.id]?R.warn(`Multiple old layers with same id ${t.id}`)():n[t.id]=t;if(this._defaultShaderModulesChanged){for(let t of e)t.setNeedsUpdate(),t.setChangeFlags({extensionsChanged:!0});this._defaultShaderModulesChanged=!1}let r=[];this._updateSublayersRecursively(t,n,r),this._finalizeOldLayers(n);let i=!1;for(let e of r)if(e.hasUniformTransition()){i=`Uniform transition in ${e}`;break}this._needsUpdate=i,this.layers=r}_updateSublayersRecursively(e,t,n){for(let r of e){r.context=this.context;let e=t[r.id];e===null&&R.warn(`Multiple new layers with same id ${r.id}`)(),t[r.id]=null;let i=null;try{this._debug&&e!==r&&r.validateProps(),e?(this._transferLayerState(e,r),this._updateLayer(r)):this._initializeLayer(r),n.push(r),i=r.isComposite?r.getSubLayers():null}catch(e){this._handleError(`matching`,e,r)}i&&this._updateSublayersRecursively(i,t,n)}}_finalizeOldLayers(e){for(let t in e){let n=e[t];n&&this._finalizeLayer(n)}}_initializeLayer(e){try{e._initialize(),e.lifecycle=bu.INITIALIZED}catch(t){this._handleError(`initialization`,t,e)}}_transferLayerState(e,t){t._transferState(e),t.lifecycle=bu.MATCHED,t!==e&&(e.lifecycle=bu.AWAITING_GC)}_updateLayer(e){try{e._update()}catch(t){this._handleError(`update`,t,e)}}_finalizeLayer(e){this._needsRedraw=this._needsRedraw||`finalized ${e}`,e.lifecycle=bu.AWAITING_FINALIZATION;try{e._finalize(),e.lifecycle=bu.FINALIZED}catch(t){this._handleError(`finalization`,t,e)}}};function G(e,t,n){if(e===t)return!0;if(!n||!e||!t)return!1;if(Array.isArray(e)){if(!Array.isArray(t)||e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(!G(e[r],t[r],n-1))return!1;return!0}if(Array.isArray(t))return!1;if(typeof e==`object`&&typeof t==`object`){let r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(let i of r)if(!t.hasOwnProperty(i)||!G(e[i],t[i],n-1))return!1;return!0}return!1}var Fu=`default-canvas`,Iu=class{constructor(e){this.views=[],this.width=100,this.height=100,this.viewState={},this.controllers={},this.timeline=e.timeline,this._viewports=[],this._viewportMap={},this._isUpdating=!1,this._needsRedraw=`First render`,this._needsUpdate=`Initialize`,this._eventManager=e.eventManager,this._eventManagers=e.eventManagers||{},this._viewEventManagers={},this._eventCallbacks={onViewStateChange:e.onViewStateChange,onInteractionStateChange:e.onInteractionStateChange},this._pickPosition=e.pickPosition,this._getCanvasContext=e.getCanvasContext,Object.seal(this),this.setProps(e)}finalize(){for(let e in this.controllers){let t=this.controllers[e];t&&t.finalize()}this.controllers={}}needsRedraw(e={clearRedrawFlags:!1}){let t=this._needsRedraw;return e.clearRedrawFlags&&(this._needsRedraw=!1),t}setNeedsUpdate(e){this._needsUpdate=this._needsUpdate||e,this._needsRedraw=this._needsRedraw||e}updateViewStates(){for(let e in this.controllers){let t=this.controllers[e];t&&t.updateTransition()}}getViewports(e){return e?this._viewports.filter(t=>{let n=!e.canvasId||this.getCanvasId(t.id)===e.canvasId,r=!(`x`in e)||t.containsPixel(e);return n&&r}):this._viewports}getViews(){let e={};return this.views.forEach(t=>{e[t.id]=t}),e}getView(e){return this.views.find(t=>t.id===e)}getViewState(e){let t=typeof e==`string`?this.getView(e):e,n=t&&this.viewState[t.getViewStateId()]||this.viewState;return t?t.filterViewState(n):n}getViewport(e){return this._viewportMap[e]}getCanvasId(e){let t=typeof e==`string`?this.getView(e):e;return t?this._viewEventManagers[t.id]?.canvasId||this._getCanvasIdFromView(t):void 0}unproject(e,t){let n=this.getViewports(),r={x:e[0],y:e[1]};for(let i=n.length-1;i>=0;--i){let a=n[i];if(a.containsPixel(r)){let n=e.slice();return n[0]-=a.x,n[1]-=a.y,a.unproject(n,t)}}return null}setProps(e){e.views&&this._setViews(e.views),e.viewState&&this._setViewState(e.viewState),(`width`in e||`height`in e)&&this._setSize(e.width,e.height),`pickPosition`in e&&(this._pickPosition=e.pickPosition),`eventManagers`in e&&this._setEventManagers(e.eventManagers||{}),this._isUpdating||this._update()}_update(){this._isUpdating=!0,this._needsUpdate&&(this._needsUpdate=!1,this._rebuildViewports()),this._needsUpdate&&(this._needsUpdate=!1,this._rebuildViewports()),this._isUpdating=!1}_setSize(e,t){(e!==this.width||t!==this.height)&&(this.width=e,this.height=t,this.setNeedsUpdate(`Size changed`))}_setViews(e){e=Du(e,Boolean),this._diffViews(e,this.views)&&this.setNeedsUpdate(`views changed`),this.views=e}_setViewState(e){e?(G(e,this.viewState,3)||this.setNeedsUpdate(`viewState changed`),this.viewState=e):R.warn("missing `viewState` or `initialViewState`")()}_setEventManagers(e){this._eventManagers!==e&&(this._eventManagers=e,this.setNeedsUpdate(`eventManagers changed`))}_getCanvasIdFromView(e){return e.props.canvasId||this._getCanvasContext?.(e.id)?.id||`default-canvas`}_getCanvasDimensions(e){let[t,n]=(this._getCanvasContext?.(e.id))?.getCSSSize()||[this.width,this.height];return{width:t,height:n}}_getViewEventManager(e){let t=this.getCanvasId(e)||`default-canvas`;return{canvasId:t,eventManager:this._eventManagers[t]||this._eventManager}}_startViewportRebuild(){let e=this.controllers,t=this._viewEventManagers;return this._viewports=[],this.controllers={},this._viewEventManagers={},{oldControllers:e,oldViewEventManagers:t}}_getReusableController(e,t,n){return e&&(t?.canvasId!==n.canvasId||t?.eventManager!==n.eventManager)?(e.finalize(),null):e}_createController(e,t){let n=t.type;return new n({timeline:this.timeline,eventManager:this._getViewEventManager(e).eventManager,onViewStateChange:this._eventCallbacks.onViewStateChange,onStateChange:this._eventCallbacks.onInteractionStateChange,makeViewport:t=>this.getView(e.id)?.makeViewport({viewState:t,...this._getCanvasDimensions(e)}),pickPosition:(t,n)=>this._pickPosition?.(t,n,e.id)})}_updateController(e,t,n,r){let i=e.controller;if(i&&n){let a={...t,...i,id:e.id,x:n.x,y:n.y,width:n.width,height:n.height};return(!r||r.constructor!==i.type)&&(r=this._createController(e,a)),r&&r.setProps(a),r}return null}_rebuildViewports(){let{views:e}=this,{oldControllers:t,oldViewEventManagers:n}=this._startViewportRebuild(),r=!1;for(let i=e.length;i--;){let a=e[i],{width:o,height:s}=this._getCanvasDimensions(a),c=this._getViewEventManager(a);this._viewEventManagers[a.id]=c;let l=this.getViewState(a),u=a.makeViewport({viewState:l,width:o,height:s}),d=this._getReusableController(t[a.id],n[a.id],c),f=!!a.controller;f&&!d&&(r=!0),(r||!f)&&d&&(d.finalize(),d=null),this.controllers[a.id]=this._updateController(a,l,u,d),u&&this._viewports.unshift(u)}for(let e in t){let n=t[e];n&&!this.controllers[e]&&n.finalize()}this._buildViewportMap()}_buildViewportMap(){this._viewportMap={},this._viewports.forEach(e=>{e.id&&(this._viewportMap[e.id]=this._viewportMap[e.id]||e)})}_diffViews(e,t){return e.length!==t.length||e.some((n,r)=>!e[r].equals(t[r]))}},Lu=/^(?:\d+\.?\d*|\.\d+)$/;function K(e){switch(typeof e){case`number`:if(!Number.isFinite(e))throw Error(`Could not parse position string ${e}`);return{type:`literal`,value:e};case`string`:try{return new Bu(zu(e)).parseExpression()}catch(t){let n=t instanceof Error?t.message:String(t);throw Error(`Could not parse position string ${e}: ${n}`)}default:throw Error(`Could not parse position string ${e}`)}}function Ru(e,t){switch(e.type){case`literal`:return e.value;case`percentage`:return Math.round(e.value*t);case`binary`:let n=Ru(e.left,t),r=Ru(e.right,t);return e.operator===`+`?n+r:n-r;default:throw Error(`Unknown layout expression type`)}}function q(e,t){return Ru(e,t)}function zu(e){let t=[],n=0;for(;n<e.length;){let r=e[n];if(/\s/.test(r)){n++;continue}if(r===`+`||r===`-`||r===`(`||r===`)`||r===`%`){t.push({type:`symbol`,value:r}),n++;continue}if(Vu(r)||r===`.`){let i=n,a=r===`.`;for(n++;n<e.length;){let t=e[n];if(Vu(t)){n++;continue}if(t===`.`&&!a){a=!0,n++;continue}break}let o=e.slice(i,n);if(!Lu.test(o))throw Error(`Invalid number token`);t.push({type:`number`,value:parseFloat(o)});continue}if(Hu(r)){let r=n;for(;n<e.length&&Hu(e[n]);)n++;let i=e.slice(r,n).toLowerCase();t.push({type:`word`,value:i});continue}throw Error(`Invalid token in position string`)}return t}var Bu=class{constructor(e){this.index=0,this.tokens=e}parseExpression(){let e=this.parseBinaryExpression();if(this.index<this.tokens.length)throw Error(`Unexpected token at end of expression`);return e}parseBinaryExpression(){let e=this.parseFactor(),t=this.peek();for(;Uu(t);){this.index++;let n=this.parseFactor();e={type:`binary`,operator:t.value,left:e,right:n},t=this.peek()}return e}parseFactor(){let e=this.peek();if(!e)throw Error(`Unexpected end of expression`);if(e.type===`symbol`&&e.value===`+`)return this.index++,this.parseFactor();if(e.type===`symbol`&&e.value===`-`)return this.index++,{type:`binary`,operator:`-`,left:{type:`literal`,value:0},right:this.parseFactor()};if(e.type===`symbol`&&e.value===`(`){this.index++;let e=this.parseBinaryExpression();if(!this.consumeSymbol(`)`))throw Error(`Missing closing parenthesis`);return e}if(e.type===`word`&&e.value===`calc`){if(this.index++,!this.consumeSymbol(`(`))throw Error(`Missing opening parenthesis after calc`);let e=this.parseBinaryExpression();if(!this.consumeSymbol(`)`))throw Error(`Missing closing parenthesis`);return e}if(e.type===`number`){this.index++;let t=e.value,n=this.peek();return n&&n.type===`symbol`&&n.value===`%`?(this.index++,{type:`percentage`,value:t/100}):(n&&n.type===`word`&&n.value===`px`&&this.index++,{type:`literal`,value:t})}throw Error(`Unexpected token in expression`)}consumeSymbol(e){let t=this.peek();return t&&t.type===`symbol`&&t.value===e?(this.index++,!0):!1}peek(){return this.tokens[this.index]||null}};function Vu(e){return e>=`0`&&e<=`9`}function Hu(e){return e>=`a`&&e<=`z`||e>=`A`&&e<=`Z`}function Uu(e){return!!(e&&e.type===`symbol`&&(e.value===`+`||e.value===`-`))}function Wu(e,t){let n={...e};for(let e in t)e!==`id`&&(n[e]=Array.isArray(n[e])&&Array.isArray(t[e])?Gu(n[e],t[e]):t[e]);return n}function Gu(e,t){e=e.slice();for(let n=0;n<t.length;n++){let r=t[n];Number.isFinite(r)&&(e[n]=r)}return e}var Ku=class{constructor(e){let{id:t,x:n=0,y:r=0,width:i=`100%`,height:a=`100%`,padding:o=null}=e;this.id=t||this.constructor.displayName||`view`,this.props={...e,id:this.id},this._x=K(n),this._y=K(r),this._width=K(i),this._height=K(a),this._padding=o&&{left:K(o.left||0),right:K(o.right||0),top:K(o.top||0),bottom:K(o.bottom||0)},this.equals=this.equals.bind(this),Object.seal(this)}equals(e){return this===e||this.constructor===e.constructor&&G(this.props,e.props,2)}clone(e){let t=this.constructor;return new t({...this.props,...e})}makeViewport({width:e,height:t,viewState:n}){n=this.filterViewState(n);let r=this.getDimensions({width:e,height:t});return!r.height||!r.width?null:new(this.getViewportType(n))({...n,...this.props,...r})}getViewStateId(){let{viewState:e}=this.props;return typeof e==`string`?e:e?.id||this.id}filterViewState(e){return this.props.viewState&&typeof this.props.viewState==`object`?this.props.viewState.id?Wu(e,this.props.viewState):this.props.viewState:e}getDimensions({width:e,height:t}){let n={x:q(this._x,e),y:q(this._y,t),width:q(this._width,e),height:q(this._height,t)};return this._padding&&(n.padding={left:q(this._padding.left,e),top:q(this._padding.top,t),right:q(this._padding.right,e),bottom:q(this._padding.bottom,t)}),n}get controller(){let e=this.props.controller;return e?e===!0?{type:this.ControllerType}:typeof e==`function`?{type:e}:{type:this.ControllerType,...e}:null}},qu=class{constructor(e){this._inProgress=!1,this._handle=null,this.time=0,this.settings={duration:0},this._timeline=e}get inProgress(){return this._inProgress}start(e){this.cancel(),this.settings=e,this._inProgress=!0,this.settings.onStart?.(this)}end(){this._inProgress&&(this._timeline.removeChannel(this._handle),this._handle=null,this._inProgress=!1,this.settings.onEnd?.(this))}cancel(){this._inProgress&&=(this.settings.onInterrupt?.(this),this._timeline.removeChannel(this._handle),this._handle=null,!1)}update(){if(!this._inProgress)return!1;if(this._handle===null){let{_timeline:e,settings:t}=this;this._handle=e.addChannel({delay:e.getTime(),duration:t.duration})}return this.time=this._timeline.getTime(this._handle),this._onUpdate(),this.settings.onUpdate?.(this),this._timeline.isFinished(this._handle)&&this.end(),!0}_onUpdate(){}},Ju=()=>{},Yu={mode:`preserve`},Xu={mode:`hard`},Zu={BREAK:1,SNAP_TO_END:2,IGNORE:3},Qu=e=>e,$u=Zu.BREAK,ed=class{constructor(e){this._onTransitionUpdate=e=>{let{time:t,settings:{interpolator:n,startProps:r,endProps:i,duration:a,easing:o}}=e,s=o(t/a),c=n.interpolateProps(r,i,s);this.propsInTransition=this.getControllerState({...this.props,...c},Yu).getViewportProps(),this.onViewStateChange({viewState:this.propsInTransition,oldViewState:this.props})},this.getControllerState=e.getControllerState,this.propsInTransition=null,this.transition=new qu(e.timeline),this.onViewStateChange=e.onViewStateChange||Ju,this.onStateChange=e.onStateChange||Ju}finalize(){this.transition.cancel()}getViewportInTransition(){return this.propsInTransition}processViewStateChange(e){let t=!1,n=this.props;if(this.props=e,!n||this._shouldIgnoreViewportChange(n,e))return!1;if(this._isTransitionEnabled(e)){let r=n;if(this.transition.inProgress){let{interruption:e,endProps:t}=this.transition.settings;r={...n,...e===Zu.SNAP_TO_END?t:this.propsInTransition||n}}this._triggerTransition(r,e),t=!0}else this.transition.cancel();return t}updateTransition(){this.transition.update()}_isTransitionEnabled(e){let{transitionDuration:t,transitionInterpolator:n}=e;return(t>0||t===`auto`)&&!!n}_isUpdateDueToCurrentTransition(e){return this.transition.inProgress&&this.propsInTransition?this.transition.settings.interpolator.arePropsEqual(e,this.propsInTransition):!1}_shouldIgnoreViewportChange(e,t){return this.transition.inProgress?this.transition.settings.interruption===Zu.IGNORE||this._isUpdateDueToCurrentTransition(t):!this._isTransitionEnabled(t)||t.transitionInterpolator.arePropsEqual(e,t)}_triggerTransition(e,t){let n=this.getControllerState(e,Yu),r=this.getControllerState(t,Xu).shortestPathFrom(n),i=t.transitionInterpolator,a=i.getDuration?i.getDuration(e,t):t.transitionDuration;if(a===0)return;let o=i.initializeProps(e,r);this.propsInTransition={};let s={duration:a,easing:t.transitionEasing||Qu,interpolator:i,interruption:t.transitionInterruption||$u,startProps:o.start,endProps:o.end,onStart:t.onTransitionStart,onUpdate:this._onTransitionUpdate,onInterrupt:this._onTransitionEnd(t.onTransitionInterrupt),onEnd:this._onTransitionEnd(t.onTransitionEnd)};this.transition.start(s),this.onStateChange({inTransition:!0}),this.updateTransition()}_onTransitionEnd(e){return t=>{this.propsInTransition=null,this.onStateChange({inTransition:!1,isZooming:!1,isPanning:!1,isRotating:!1}),e?.(t)}}};function J(e,t){if(!e)throw Error(t||`deck.gl: assertion failed.`)}var td=class{constructor(e){let{compare:t,extract:n,required:r}=e;this._propsToCompare=t,this._propsToExtract=n||t,this._requiredProps=r}arePropsEqual(e,t){for(let n of this._propsToCompare)if(!(n in e)||!(n in t)||!fe(e[n],t[n]))return!1;return!0}initializeProps(e,t){let n={},r={};for(let i of this._propsToExtract)(i in e||i in t)&&(n[i]=e[i],r[i]=t[i]);return this._checkRequiredProps(n),this._checkRequiredProps(r),{start:n,end:r}}getDuration(e,t){return t.transitionDuration}_checkRequiredProps(e){this._requiredProps&&this._requiredProps.forEach(t=>{let n=e[t];J(Number.isFinite(n)||Array.isArray(n),`${t} is required for transition`)})}},nd=[`longitude`,`latitude`,`zoom`,`bearing`,`pitch`],rd=[`longitude`,`latitude`,`zoom`],id=class extends td{constructor(e={}){let t=Array.isArray(e)?e:e.transitionProps,n=Array.isArray(e)?{}:e;n.transitionProps=Array.isArray(t)?{compare:t,required:t}:t||{compare:nd,required:rd},super(n.transitionProps),this.opts=n}initializeProps(e,t){let n=super.initializeProps(e,t),{makeViewport:r,around:i}=this.opts;if(r&&i){let a=r(e),o=r(t),s=a.unproject(i);n.start.around=i,Object.assign(n.end,{around:o.project(s),aroundPosition:s,width:t.width,height:t.height})}return n}interpolateProps(e,t,n){let r={};for(let i of this._propsToExtract)r[i]=de(e[i]||0,t[i]||0,n);if(t.aroundPosition&&this.opts.makeViewport){let i=this.opts.makeViewport({...t,...r});Object.assign(r,i.panByPosition(t.aroundPosition,de(e.around,t.around,n)))}return r}},ad={transitionDuration:0},od=300,sd=300,cd=e=>1-(1-e)*(1-e),ld=e=>e===1?1:1-2**(-10*e),ud={WHEEL:[`wheel`],PAN:[`panstart`,`panmove`,`panend`],PINCH:[`pinchstart`,`pinchmove`,`pinchend`],MULTI_PAN:[`multipanstart`,`multipanmove`,`multipanend`],DOUBLE_CLICK:[`dblclick`],DOUBLE_CLICK_DRAG:[`dblclickdragstart`,`dblclickdragmove`,`dblclickdragend`,`dblclickdragcancel`],KEYBOARD:[`keydown`]},dd={},fd=class{constructor(e){this.state={},this._events={},this._interactionState={isDragging:!1},this._customEvents=[],this._eventStartBlocked=null,this._panMove=!1,this._multiPanMode=null,this._multiPanStartCenter=null,this._doubleClickDragAnchor=null,this._suppressDoubleClickUntil=0,this.invertPan=!1,this.dragMode=`rotate`,this.inertia=0,this.scrollZoom=!0,this.dragPan=!0,this.dragRotate=!0,this.doubleClickZoom=!0,this.doubleClickDragZoom=!0,this.touchZoom=!0,this.touchRotate=!1,this.multiTouchDrag=null,this.trackpadGesture=!1,this.zoomAround=`pointer`,this.keyboard=!0,this.transitionManager=new ed({...e,getControllerState:(t,n)=>new this.ControllerState({...t,constraintContext:n,makeViewport:e.makeViewport}),onViewStateChange:this._onTransition.bind(this),onStateChange:this._setInteractionState.bind(this)}),this.handleEvent=this.handleEvent.bind(this),this.eventManager=e.eventManager,this.onViewStateChange=e.onViewStateChange||(()=>{}),this.onStateChange=e.onStateChange||(()=>{}),this.makeViewport=e.makeViewport,this.pickPosition=e.pickPosition}set events(e){this.toggleEvents(this._customEvents,!1),this.toggleEvents(e,!0),this._customEvents=e,this.props&&this.setProps(this.props)}finalize(){for(let e in this._events)this._events[e]&&this.eventManager?.off(e,this.handleEvent);this.transitionManager.finalize()}handleEvent(e){this._controllerState=void 0;let t=this._eventStartBlocked;switch(e.type){case`panstart`:return!t&&this._onPanStart(e);case`panmove`:return this._onPan(e);case`panend`:return this._onPanEnd(e);case`pinchstart`:return t||!this._isTrackpadGestureAllowed(e)?!1:this._onPinchStart(e);case`pinchmove`:return this._isTrackpadGestureAllowed(e)?this._onPinch(e):!1;case`pinchend`:return this._isTrackpadGestureAllowed(e)?this._onPinchEnd(e):!1;case`multipanstart`:return!t&&this._onMultiPanStart(e);case`multipanmove`:return this._onMultiPan(e);case`multipanend`:return this._onMultiPanEnd(e);case`dblclick`:return this._onDoubleClick(e);case`dblclickdragstart`:return!t&&this._onDoubleClickDragStart(e);case`dblclickdragmove`:return this._onDoubleClickDrag(e);case`dblclickdragend`:case`dblclickdragcancel`:return this._onDoubleClickDragEnd(e);case`wheel`:return this._onWheel(e);case`keydown`:return this._onKeyDown(e);default:return!1}}get controllerState(){return this._controllerState=this._controllerState||new this.ControllerState({makeViewport:this.makeViewport,...this.props,...this.state}),this._controllerState}getCenter(e){let{x:t,y:n}=this.props,{offsetCenter:r}=e;return[r.x-t,r.y-n]}getZoomPosition(e){if(this.zoomAround===`pointer`)return e;let t=this.makeViewport(this.controllerState.getViewportProps()),[n,r]=Yc(t.center,t.pixelProjectionMatrix);return[n,r]}isPointInBounds(e,t){let{width:n,height:r}=this.props;if(t&&t.handled)return!1;let i=e[0]>=0&&e[0]<=n&&e[1]>=0&&e[1]<=r;return i&&t&&t.stopPropagation(),i}isFunctionKeyPressed(e){let{srcEvent:t}=e;return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}isDragging(){return this._interactionState.isDragging||!1}blockEvents(e){let t=setTimeout(()=>{this._eventStartBlocked===t&&(this._eventStartBlocked=null)},e);this._eventStartBlocked=t}setProps(e){e.maxBoundsPadding===void 0&&(e.maxBoundsPadding=null),e.dragMode&&(this.dragMode=e.dragMode);let t=this.props;this.props=e,`transitionInterpolator`in e||(e.transitionInterpolator=this._getTransitionProps().transitionInterpolator),this.transitionManager.processViewStateChange(e);let{inertia:n}=e;this.inertia=Number.isFinite(n)?n:n===!0?od:0;let{scrollZoom:r=!0,dragPan:i=!0,dragRotate:a=!0,doubleClickZoom:o=!0,doubleClickDragZoom:s=!1,touchZoom:c=!0,touchRotate:l=!1,multiTouchDrag:u=l?`rotate`:null,trackpadGesture:d=!1,zoomAround:f=`pointer`,keyboard:p=!0}=e,m=!!this.onViewStateChange;if(this.toggleEvents(ud.WHEEL,m&&r),this.toggleEvents(ud.PAN,m),this.toggleEvents(ud.PINCH,m&&(c||u===`rotate`)),this.toggleEvents(ud.MULTI_PAN,m&&!!u),this.toggleEvents(ud.DOUBLE_CLICK,m&&o),this.toggleEvents(ud.DOUBLE_CLICK_DRAG,m&&s),this.toggleEvents(ud.KEYBOARD,m&&p),this.scrollZoom=r,this.dragPan=i,this.dragRotate=a,this.doubleClickZoom=o,this.doubleClickDragZoom=s,this.touchZoom=c,this.touchRotate=u===`rotate`,this.multiTouchDrag=u,this.trackpadGesture=d,this.zoomAround=f,this.keyboard=p,(!t||t.height!==e.height||t.width!==e.width||t.maxBounds!==e.maxBounds||t.maxBoundsPadding!==e.maxBoundsPadding)&&e.maxBounds){let t=new this.ControllerState({...e,makeViewport:this.makeViewport}),n=t.getViewportProps();Object.keys(n).some(t=>!G(n[t],e[t],1))&&this.updateViewport(t)}}updateTransition(){this.transitionManager.updateTransition()}toggleEvents(e,t){this.eventManager&&e.forEach(e=>{this._events[e]!==t&&(this._events[e]=t,t?this.eventManager.on(e,this.handleEvent):this.eventManager.off(e,this.handleEvent))})}updateViewport(e,t=null,n={}){let r={...e.getViewportProps(),...t},i=this.controllerState!==e;if(this.state=e.getState(),this._setInteractionState(n),i){let e=this.controllerState&&this.controllerState.getViewportProps();this.onViewStateChange&&this.onViewStateChange({viewState:r,interactionState:this._interactionState,oldViewState:e,viewId:this.props.id})}}_onTransition(e){this.onViewStateChange({...e,interactionState:this._interactionState,viewId:this.props.id})}_setInteractionState(e){Object.assign(this._interactionState,e),this.onStateChange(this._interactionState)}_getConstraintContext(e,t){return this.props.rubberBand?{mode:t===`update`?`elastic`:t===`end`?`rebound`:`hard`}:{mode:`hard`}}_getReboundTransition(e,t){if(e.mode!==`rebound`)return null;let n=t.getViewportProps();return Object.keys(n).some(e=>!G(this.props[e],n[e],1))?{...this._getTransitionProps(),transitionDuration:sd,transitionEasing:ld}:null}_onPanStart(e){let t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;let n=this.isFunctionKeyPressed(e)||e.rightButton||!1;(this.invertPan||this.dragMode===`pan`)&&(n=!n);let r=n?`pan`:`rotate`,i=this._getConstraintContext(r,`start`),a=n?this.controllerState.panStart({pos:t},i):this.controllerState.rotateStart({pos:t},i);return this._panMove=n,this.updateViewport(a,ad,{isDragging:!0}),!0}_onPan(e){return this.isDragging()?this._panMove?this._onPanMove(e):this._onPanRotate(e):!1}_onPanEnd(e){return this.isDragging()?this._panMove?this._onPanMoveEnd(e):this._onPanRotateEnd(e):!1}_onPanMove(e){if(!this.dragPan)return!1;let t=this.getCenter(e),n=this.controllerState.pan({pos:t},this._getConstraintContext(`pan`,`update`));return this.updateViewport(n,ad,{isDragging:!0,isPanning:!0}),!0}_onPanMoveEnd(e){let{inertia:t}=this;if(this.dragPan&&t&&e.velocity){let n=this.getCenter(e),r=[n[0]+e.velocityX*t/2,n[1]+e.velocityY*t/2],i=this.controllerState.pan({pos:r}).panEnd();this.updateViewport(i,{...this._getTransitionProps(),transitionDuration:t,transitionEasing:cd},{isDragging:!1,isPanning:!0})}else{let e=this.controllerState,t=this._getConstraintContext(`pan`,`end`),n=e.panEnd(t),r=this._getReboundTransition(t,n);this.updateViewport(n,r,{isDragging:!1,isPanning:!!r})}return!0}_onPanRotate(e){if(!this.dragRotate)return!1;let t=this.getCenter(e),n=this.controllerState.rotate({pos:t},this._getConstraintContext(`rotate`,`update`));return this.updateViewport(n,ad,{isDragging:!0,isRotating:!0}),!0}_onPanRotateEnd(e){let{inertia:t}=this;if(this.dragRotate&&t&&e.velocity){let n=this.getCenter(e),r=[n[0]+e.velocityX*t/2,n[1]+e.velocityY*t/2],i=this.controllerState.rotate({pos:r}).rotateEnd();this.updateViewport(i,{...this._getTransitionProps(),transitionDuration:t,transitionEasing:cd},{isDragging:!1,isRotating:!0})}else{let e=this.controllerState,t=this._getConstraintContext(`rotate`,`end`),n=e.rotateEnd(t),r=this._getReboundTransition(t,n);this.updateViewport(n,r,{isDragging:!1,isRotating:!!r})}return!0}_onWheel(e){if(!this.scrollZoom||this.trackpadGesture&&e.device!==`mouse`)return!1;let t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;e.srcEvent.preventDefault();let{speed:n=.01,smooth:r=!1}=this.scrollZoom===!0?{}:this.scrollZoom,{delta:i}=e,a=2/(1+Math.exp(-Math.abs(i*n)));i<0&&a!==0&&(a=1/a);let o=this.getZoomPosition(t),s=r?{...this._getTransitionProps({around:o}),transitionDuration:250}:ad,c=this.controllerState.zoom({pos:o,scale:a});return this.updateViewport(c,s,{isZooming:!0,isPanning:!0}),r||this._setInteractionState({isZooming:!1,isPanning:!1}),!0}_onMultiPanStart(e){let{multiTouchDrag:t}=this;if(!t||!this._isMultiPanEventAllowed(e,t))return!1;let n=e.offsetCenter;if(!this.isPointInBounds(this.getCenter(e),e))return!1;let r=e.pointerType===`trackpad`,i={x:n.x-(r?0:e.deltaX),y:n.y-(r?0:e.deltaY)},a={...e,offsetCenter:i},o=this.getCenter(a),s=t===`pan`?this.controllerState.panStart({pos:o},this._getConstraintContext(`pan`,`start`)):this.controllerState.rotateStart({pos:o},this._getConstraintContext(`rotate`,`start`));return this._multiPanMode=t,this._multiPanStartCenter=i,this.updateViewport(s,ad,{isDragging:!0}),!0}_onMultiPan(e){let{mode:t,event:n}=this._getMultiPanEvent(e);return!t||!n||!this.isDragging()?!1:t===`pan`?this._onPanMove(n):this._onPanRotate(n)}_onMultiPanEnd(e){let{mode:t,event:n}=this._getMultiPanEvent(e);if(!t||!n||!this.isDragging())return this._resetMultiPan(),!1;let r=t===`pan`?this._onPanMoveEnd(n):this._onPanRotateEnd(n);return this._resetMultiPan(),r}_isTrackpadGestureAllowed(e){return e.pointerType!==`trackpad`||this.trackpadGesture}_isMultiPanEventAllowed(e,t){return e.pointerType===`trackpad`?this.trackpadGesture&&(t===`pan`?this.dragPan:this.dragRotate):e.pointerType===`touch`&&(t===`pan`?this.dragPan:this.dragRotate)}_getMultiPanEvent(e){let t=this._multiPanMode,n=this._multiPanStartCenter;return!t||!n?{mode:null,event:null}:{mode:t,event:{...e,offsetCenter:{x:n.x+e.deltaX,y:n.y+e.deltaY}}}}_resetMultiPan(){this._multiPanMode=null,this._multiPanStartCenter=null}_onPinchStart(e){this._doubleClickDragAnchor=null;let t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;let n=this.controllerState.zoomStart({pos:this.getZoomPosition(t)},this._getConstraintContext(`zoom`,`start`)).rotateStart({pos:t},this._getConstraintContext(`rotate`,`start`));return dd._startPinchRotation=e.rotation,dd._lastPinchEvent=e,this.updateViewport(n,ad,{isDragging:!0}),!0}_onPinch(e){if(!this.touchZoom&&!this.touchRotate||!this.isDragging())return!1;let t=this.controllerState;if(this.touchZoom){let{scale:n}=e,r=this.getCenter(e);t=t.zoom({pos:this.getZoomPosition(r),scale:n},this._getConstraintContext(`zoom`,`update`))}if(this.touchRotate){let{rotation:n}=e;t=t.rotate({deltaAngleX:dd._startPinchRotation-n},this._getConstraintContext(`rotate`,`update`))}return this.updateViewport(t,ad,{isDragging:!0,isPanning:this.touchZoom,isZooming:this.touchZoom,isRotating:this.touchRotate}),dd._lastPinchEvent=e,!0}_onPinchEnd(e){if(!this.isDragging())return!1;let{inertia:t}=this,{_lastPinchEvent:n}=dd;if(this.touchZoom&&t&&n&&e.scale!==n.scale){let r=this.getCenter(e),i=this.getZoomPosition(r),a=this.controllerState.rotateEnd(),o=Math.log2(e.scale),s=2**(o+(o-Math.log2(n.scale))/(e.deltaTime-n.deltaTime)*t/2);a=a.zoom({pos:i,scale:s}).zoomEnd(),this.updateViewport(a,{...this._getTransitionProps({around:i}),transitionDuration:t,transitionEasing:cd},{isDragging:!1,isPanning:this.touchZoom,isZooming:this.touchZoom,isRotating:!1}),this.blockEvents(t)}else{let e=this.controllerState,t=this._getConstraintContext(`zoom`,`end`),n=this._getConstraintContext(`rotate`,`end`),r=e.zoomEnd(t).rotateEnd(n),i=this._getReboundTransition(this.touchZoom?t:n,r);this.updateViewport(r,i,{isDragging:!1,isPanning:!!i&&this.touchZoom,isZooming:!!i&&this.touchZoom,isRotating:!!i&&this.touchRotate})}return dd._startPinchRotation=null,dd._lastPinchEvent=null,!0}_onDoubleClick(e){if(!this.doubleClickZoom||Date.now()<this._suppressDoubleClickUntil)return!1;let t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;let n=this.isFunctionKeyPressed(e),r=this.getZoomPosition(t),i=this.controllerState.zoom({pos:r,scale:n?.5:2});return this.updateViewport(i,this._getTransitionProps({around:r}),{isZooming:!0,isPanning:!0}),this.blockEvents(100),!0}_onDoubleClickDragStart(e){if(!this.doubleClickDragZoom)return this._doubleClickDragAnchor=null,!1;let t=this.getCenter(e);if(!this.isPointInBounds(t,e))return this._doubleClickDragAnchor=null,!1;this._doubleClickDragAnchor=this.getZoomPosition(t);let n=this.controllerState.zoomStart({pos:this._doubleClickDragAnchor},this._getConstraintContext(`zoom`,`start`));return e.scale!==1&&(n=n.zoom({pos:this._doubleClickDragAnchor,scale:e.scale},this._getConstraintContext(`zoom`,`update`))),this.updateViewport(n,ad,{isDragging:!0,isPanning:!0,isZooming:!0}),!0}_onDoubleClickDrag(e){let t=this._doubleClickDragAnchor;if(!t)return!1;let n=this.controllerState.zoom({pos:t,scale:e.scale},this._getConstraintContext(`zoom`,`update`));return this.updateViewport(n,ad,{isDragging:!0,isPanning:!0,isZooming:!0}),!0}_onDoubleClickDragEnd(e){if(!this._doubleClickDragAnchor)return!1;this._doubleClickDragAnchor=null;let t=this.controllerState,n=this._getConstraintContext(`zoom`,`end`),r=t.zoomEnd(n),i=this._getReboundTransition(n,r);return this.updateViewport(r,i,{isDragging:!1,isPanning:!!i,isZooming:!!i}),this._suppressDoubleClickUntil=Date.now()+100,this.blockEvents(100),!0}_onKeyDown(e){if(!this.keyboard)return!1;let t=this.isFunctionKeyPressed(e),{zoomSpeed:n,moveSpeed:r,rotateSpeedX:i,rotateSpeedY:a}=this.keyboard===!0?{}:this.keyboard,{controllerState:o}=this,s,c={};switch(e.srcEvent.code){case`Minus`:s=t?o.zoomOut(n).zoomOut(n):o.zoomOut(n),c.isZooming=!0;break;case`Equal`:s=t?o.zoomIn(n).zoomIn(n):o.zoomIn(n),c.isZooming=!0;break;case`ArrowLeft`:t?(s=o.rotateLeft(i),c.isRotating=!0):(s=o.moveLeft(r),c.isPanning=!0);break;case`ArrowRight`:t?(s=o.rotateRight(i),c.isRotating=!0):(s=o.moveRight(r),c.isPanning=!0);break;case`ArrowUp`:t?(s=o.rotateUp(a),c.isRotating=!0):(s=o.moveUp(r),c.isPanning=!0);break;case`ArrowDown`:t?(s=o.rotateDown(a),c.isRotating=!0):(s=o.moveDown(r),c.isPanning=!0);break;default:return!1}return this.updateViewport(s,this._getTransitionProps(),c),!0}_getTransitionProps(e){let{transition:t}=this;return!t||!t.transitionInterpolator?ad:e?{...t,transitionInterpolator:new id({...e,...t.transitionInterpolator.opts,makeViewport:this.controllerState.makeViewport})}:t}},pd=Symbol(`constraintAround`),md=class{constructor(e,t,n,r){this.makeViewport=n,this._viewportProps=this.applyConstraints(e,r),this._state=t}getViewportProps(){return this._viewportProps}getState(){return this._state}};function hd(e,t,n){let r=e-t;return r&&Number.isFinite(r)?t+r*n/(n+Math.abs(r)):t}function gd(e,t,n){let r=q(K(n?.left??0),e),i=q(K(n?.right??0),e),a=q(K(n?.top??0),t),o=q(K(n?.bottom??0),t);return{x:r,y:a,width:e-r-i,height:t-a-o}}function _d(e,t,n){let[r,i]=e.project(t);return r=Number.isFinite(r)?r:e.width/2,i=Number.isFinite(i)?i:e.height/2,{left:r-n.x,right:n.x+n.width-r,top:i-n.y,bottom:n.y+n.height-i}}var vd=5,yd=1.2,bd=512,xd=[[-1/0,-90],[1/0,90]],Sd=1;function Cd([e,t]){if(Math.abs(t)>90&&(t=Math.sign(t)*90),Number.isFinite(e)){let[n,r]=zc([e,t]);return[n,I(r,0,bd)]}let[,n]=zc([0,t]);return[e,I(n,0,bd)]}var wd=class extends md{constructor(e){let{width:t,height:n,latitude:r,longitude:i,zoom:a,bearing:o=0,pitch:s=0,altitude:c=1.5,position:l=[0,0,0],maxZoom:u=20,minZoom:d=0,maxPitch:f=60,minPitch:p=0,startPanLngLat:m,startZoomLngLat:h,startRotatePos:g,startRotateLngLat:_,startBearing:v,startPitch:y,startZoom:b,normalize:x=!0,rubberBand:S=!1}=e,{[pd]:C}=e;J(Number.isFinite(i)),J(Number.isFinite(r)),J(Number.isFinite(a));let w=e.maxBounds||(x?xd:null),T=e.maxBoundsPadding||null;super({width:t,height:n,latitude:r,longitude:i,zoom:a,bearing:o,pitch:s,altitude:c,maxZoom:u,minZoom:d,maxPitch:f,minPitch:p,normalize:x,position:l,maxBounds:w,maxBoundsPadding:T,rubberBand:S,[pd]:C},{startPanLngLat:m,startZoomLngLat:h,startRotatePos:g,startRotateLngLat:_,startBearing:v,startPitch:y,startZoom:b},e.makeViewport,e.constraintContext),this.getAltitude=e.getAltitude}panStart({pos:e},t){return this._getUpdatedState({startPanLngLat:this._unproject(e)},t)}pan({pos:e,startPos:t},n){let r=this.getState().startPanLngLat||this._unproject(t);if(!r)return this;let i=this.makeViewport(this.getViewportProps()).panByPosition(r,e);return this._getUpdatedState(i,n)}panEnd(e){return this._getUpdatedState({startPanLngLat:null},e)}rotateStart({pos:e}){let t=this.getAltitude?.(e);return this._getUpdatedState({startRotatePos:e,startRotateLngLat:t===void 0?void 0:this._unproject3D(e,t),startBearing:this.getViewportProps().bearing,startPitch:this.getViewportProps().pitch})}rotate({pos:e,deltaAngleX:t=0,deltaAngleY:n=0}){let{startRotatePos:r,startRotateLngLat:i,startBearing:a,startPitch:o}=this.getState();if(!r||a===void 0||o===void 0)return this;let s;if(s=e?this._getNewRotation(e,r,o,a):{bearing:a+t,pitch:o+n},i){let e=this.makeViewport({...this.getViewportProps(),...s}),t=`panByPosition3D`in e?`panByPosition3D`:`panByPosition`;return this._getUpdatedState({...s,...e[t](i,r)})}return this._getUpdatedState(s)}rotateEnd(){return this._getUpdatedState({startRotatePos:null,startRotateLngLat:null,startBearing:null,startPitch:null})}zoomStart({pos:e},t){return this._getUpdatedState({startZoomLngLat:this._unproject(e),startZoom:this.getViewportProps().zoom},t)}zoom({pos:e,startPos:t,scale:n},r){let{startZoom:i,startZoomLngLat:a}=this.getState();return a||=(i=this.getViewportProps().zoom,this._unproject(t)||this._unproject(e)),a?this._getUpdatedState({zoom:i+Math.log2(n),[pd]:{position:a,screenPosition:e}},r):this}zoomEnd(e){return this._getUpdatedState({startZoomLngLat:null,startZoom:null},e)}zoomIn(e=2,t){return this._zoomFromCenter(e,t)}zoomOut(e=2,t){return this._zoomFromCenter(1/e,t)}moveLeft(e=100,t){return this._panFromCenter([e,0],t)}moveRight(e=100,t){return this._panFromCenter([-e,0],t)}moveUp(e=100,t){return this._panFromCenter([0,e],t)}moveDown(e=100,t){return this._panFromCenter([0,-e],t)}rotateLeft(e=15){return this._getUpdatedState({bearing:this.getViewportProps().bearing-e})}rotateRight(e=15){return this._getUpdatedState({bearing:this.getViewportProps().bearing+e})}rotateUp(e=10){return this._getUpdatedState({pitch:this.getViewportProps().pitch+e})}rotateDown(e=10){return this._getUpdatedState({pitch:this.getViewportProps().pitch-e})}shortestPathFrom(e){let t=e.getViewportProps(),n={...this.getViewportProps()},{bearing:r,longitude:i}=n;return Math.abs(r-t.bearing)>180&&(n.bearing=r<0?r+360:r-360),Math.abs(i-t.longitude)>180&&(n.longitude=i<0?i+360:i-360),n}applyConstraints(e,t){let n=e,r=n[pd];delete n[pd];let{maxPitch:i,minPitch:a,pitch:o,bearing:s,normalize:c,maxBounds:l,rubberBand:u}=e;c&&(s<-180||s>180)&&(e.bearing=Jl(s+180,360)-180),e.pitch=I(o,a,i);let d=this._constrainZoom(e.zoom,e),f=u&&t?.mode===`elastic`;if(e.zoom=t?.mode===`preserve`?e.zoom:f?hd(e.zoom,d,Sd):d,r){let t=this.makeViewport(e);Object.assign(e,t.panByPosition(r.position,r.screenPosition))}if(c&&(e.longitude<-180||e.longitude>180)&&(e.longitude=Jl(e.longitude+180,360)-180),l){let n=gd(e.width,e.height,e.maxBoundsPadding),r=_d(this.makeViewport({...e,bearing:0,pitch:0}),[e.longitude,e.latitude],n),i=Cd(l[0]),a=Cd(l[1]),o=2**e.zoom,s=[i[0]+r.left/o,i[1]+r.bottom/o],c=[a[0]-r.right/o,a[1]-r.top/o],u=Cd([e.longitude,e.latitude]),d=[I(u[0],s[0],c[0]),I(u[1],s[1],c[1])],p=u.slice();if(n.width>=0&&(p[0]=t?.mode===`preserve`?u[0]:f?hd(u[0],d[0],n.width/2/o):d[0]),n.height>=0&&(p[1]=t?.mode===`preserve`?u[1]:f?hd(u[1],d[1],n.height/2/o):d[1]),p[0]!==u[0]||p[1]!==u[1]){let[t,n]=Bc(p);p[0]!==u[0]&&(e.longitude=t),p[1]!==u[1]&&(e.latitude=n)}}return e}_constrainZoom(e,t){t||=this.getViewportProps();let{maxZoom:n,maxBounds:r}=t,i=r!==null&&t.width>0&&t.height>0,{minZoom:a}=t;if(i){let e=gd(t.width,t.height,t.maxBoundsPadding),i=Cd(r[0]),o=Cd(r[1]),s=o[0]-i[0],c=o[1]-i[1];e.width>0&&Number.isFinite(s)&&s>0&&(a=Math.max(a,Math.log2(e.width/s))),e.height>0&&Number.isFinite(c)&&c>0&&(a=Math.max(a,Math.log2(e.height/c))),a>n&&(a=n)}return I(e,a,n)}_zoomFromCenter(e,t){let{width:n,height:r}=this.getViewportProps();return this.zoom({pos:[n/2,r/2],scale:e},t)}_panFromCenter(e,t){let{width:n,height:r}=this.getViewportProps();return this.pan({startPos:[n/2,r/2],pos:[n/2+e[0],r/2+e[1]]},t)}_getUpdatedState(e,t){return new this.constructor({makeViewport:this.makeViewport,...this.getViewportProps(),...this.getState(),...e,constraintContext:t})}_unproject(e){let t=this.makeViewport(this.getViewportProps());return e&&t.unproject(e)}_unproject3D(e,t){return this.makeViewport(this.getViewportProps()).unproject(e,{targetZ:t})}_getNewRotation(e,t,n,r){let i=e[0]-t[0],a=e[1]-t[1],o=e[1],s=t[1],{width:c,height:l}=this.getViewportProps(),u=i/c,d=0;a>0?Math.abs(l-s)>vd&&(d=a/(s-l)*yd):a<0&&s>vd&&(d=1-o/s),d=I(d,-1,1);let{minPitch:f,maxPitch:p}=this.getViewportProps(),m=r+180*u,h=n;return d>0?h=n+d*(p-n):d<0&&(h=n-d*(f-n)),{pitch:h,bearing:m}}},Td=class extends fd{constructor(){super(...arguments),this.ControllerState=wd,this.transition={transitionDuration:300,transitionInterpolator:new id({transitionProps:{compare:[`longitude`,`latitude`,`zoom`,`bearing`,`pitch`,`position`],required:[`longitude`,`latitude`,`zoom`]}})},this.dragMode=`pan`,this.rotationPivot=`center`,this._getAltitude=e=>{if(this.rotationPivot===`2d`)return 0;if(this.rotationPivot===`3d`&&this.pickPosition){let{x:t,y:n}=this.props,r=this.pickPosition(t+e[0],n+e[1]);if(r&&r.coordinate&&r.coordinate.length>=3)return r.coordinate[2]}}}setProps(e){`rotationPivot`in e&&(this.rotationPivot=e.rotationPivot||`center`),e.getAltitude=this._getAltitude,e.position=e.position||[0,0,0],e.maxBounds=e.maxBounds||(e.normalize===!1?null:xd),super.setProps(e)}updateViewport(e,t=null,n={}){let r=e.getState();n.isDragging&&r.startRotateLngLat?n={...n,rotationPivotPosition:r.startRotateLngLat}:n.isDragging===!1&&(n={...n,rotationPivotPosition:void 0}),super.updateViewport(e,t,n)}},Ed=class extends Ku{constructor(e={}){super(e)}getViewportType(){return uu}get ControllerType(){return Td}};Ed.displayName=`MapView`;var Dd=new Gl;function Od(e,t){return(e.order??1/0)-(t.order??1/0)}var kd=class{constructor(e){this._resolvedEffects=[],this._defaultEffects=[],this.effects=[],this._context=e,this._needsRedraw=`Initial render`,this._setEffects([])}addDefaultEffect(e){let t=this._defaultEffects;if(!t.find(t=>t.id===e.id)){let n=t.findIndex(t=>Od(t,e)>0);n<0?t.push(e):t.splice(n,0,e),e.setup(this._context),this._setEffects(this.effects)}}setProps(e){`effects`in e&&(G(e.effects,this.effects,1)||this._setEffects(e.effects))}needsRedraw(e={clearRedrawFlags:!1}){let t=this._needsRedraw;return e.clearRedrawFlags&&(this._needsRedraw=!1),t}getEffects(){return this._resolvedEffects}_setEffects(e){let t={};for(let e of this.effects)t[e.id]=e;let n=[];for(let r of e){let e=t[r.id],i=r;e&&e!==r?e.setProps?(e.setProps(r.props),i=e):e.cleanup(this._context):e||r.setup(this._context),n.push(i),delete t[r.id]}for(let e in t)t[e].cleanup(this._context);this.effects=n,this._resolvedEffects=n.concat(this._defaultEffects),e.some(e=>e instanceof Gl)||this._resolvedEffects.push(Dd),this._needsRedraw=`effects changed`}finalize(){for(let e of this._resolvedEffects)e.cleanup(this._context);this.effects.length=0,this._resolvedEffects.length=0,this._defaultEffects.length=0}},Ad=class extends Ll{shouldDrawLayer(e){let{operation:t}=e.props;return t.includes(`draw`)||t.includes(`terrain`)}render(e){return this._render(e)}},jd=`deckRenderer.renderLayers`,Md=class{constructor(e,t={}){this.device=e,this.stats=t.stats,this.layerFilter=null,this.drawPickingColors=!1,this.drawLayersPass=new Ad(e),this.pickLayersPass=new _u(e),this.renderCount=0,this._needsRedraw=`Initial render`,this.renderBuffers=[],this.lastPostProcessEffect=null}setProps(e){this.layerFilter!==e.layerFilter&&(this.layerFilter=e.layerFilter,this._needsRedraw=`layerFilter changed`),this.drawPickingColors!==e.drawPickingColors&&(this.drawPickingColors=e.drawPickingColors,this._needsRedraw=`drawPickingColors changed`)}renderLayers(e){let t=this.drawPickingColors?this.pickLayersPass:this.drawLayersPass,n={layerFilter:this.layerFilter,isPicking:this.drawPickingColors,...e};if(!e.viewports.length){let e=t.render(n),r=`stats`in e?e.stats:e;this._updateStats(r);return}n.effects&&this._preRender(n.effects,n);let r=this.lastPostProcessEffect?this.renderBuffers[0]:n.target;this.lastPostProcessEffect&&(n.clearColor=[0,0,0,0],n.clearCanvas=!0);let i=t.render({...n,target:r}),a=`stats`in i?i.stats:i;n.effects&&(this.lastPostProcessEffect&&(n.clearCanvas=e.clearCanvas===void 0||e.clearCanvas),this._postRender(n.effects,n)),this.renderCount++,z(jd,this,a,e),this._updateStats(a)}needsRedraw(e={clearRedrawFlags:!1}){let t=this._needsRedraw;return e.clearRedrawFlags&&(this._needsRedraw=!1),t}finalize(){let{renderBuffers:e}=this;for(let t of e)t.delete();e.length=0}_updateStats(e){if(!this.stats)return;let t=0;for(let{visibleCount:n}of e)t+=n;this.stats.get(`Layers rendered`).addCount(t)}_preRender(e,t){this.lastPostProcessEffect=null,t.preRenderStats=t.preRenderStats||{};for(let n of e)t.preRenderStats[n.id]=n.preRender(t),n.postRender&&(this.lastPostProcessEffect=n.id);this.lastPostProcessEffect&&this._resizeRenderBuffers(t.canvasContext)}_resizeRenderBuffers(e=this.device.canvasContext){let{renderBuffers:t}=this,n=e.getDrawingBufferSize(),[r,i]=n;t.length===0&&[0,1].map(e=>{let n=this.device.createTexture({sampler:{minFilter:`linear`,magFilter:`linear`},width:r,height:i});t.push(this.device.createFramebuffer({id:`deck-renderbuffer-${e}`,colorAttachments:[n]}))});for(let e of t)e.resize(n)}_postRender(e,t){let{renderBuffers:n}=this,r=t.target??t.canvasContext?.getCurrentFramebuffer()??t.target,i={...t,inputBuffer:n[0],swapBuffer:n[1]};for(let t of e)if(t.postRender){i.target=t.id===this.lastPostProcessEffect?r:void 0;let e=t.postRender(i);i.inputBuffer=e,i.swapBuffer=e===n[0]?n[1]:n[0]}}},Nd={pickedColor:null,pickedObjectIndex:-1};function Pd({pickedColors:e,decodePickingColor:t,deviceX:n,deviceY:r,deviceRadius:i,deviceRect:a}){let{x:o,y:s,width:c,height:l}=a,u=i*i,d=-1,f=0;for(let t=0;t<l;t++){let i=t+s-r,a=i*i;if(a>u)f+=4*c;else for(let t=0;t<c;t++){if(e[f+3]-1>=0){let e=t+o-n,r=e*e+a;r<=u&&(u=r,d=f)}f+=4}}if(d>=0){let n=e.slice(d,d+4),r=t(n);if(r){let e=Math.floor(d/4/c),t=d/4-e*c;return{...r,pickedColor:n,pickedX:o+t,pickedY:s+e}}R.error(`Picked non-existent layer. Is picking buffer corrupt?`)()}return Nd}function Fd({pickedColors:e,decodePickingColor:t}){let n=new Map;if(e){for(let r=0;r<e.length;r+=4)if(e[r+3]-1>=0){let i=e.slice(r,r+4),a=i.join(`,`);if(!n.has(a)){let e=t(i);e?n.set(a,{...e,color:i}):R.error(`Picked non-existent layer. Is picking buffer corrupt?`)()}}}return Array.from(n.values())}function Id({pickInfo:e,viewports:t,pixelRatio:n,x:r,y:i,z:a}){let o=t[0];t.length>1&&(o=zd(e?.pickedViewports||t,{x:r,y:i}));let s;if(o){let e=[r-o.x,i-o.y];a!==void 0&&(e[2]=a),s=o.unproject(e)}return{color:null,layer:null,viewport:o,index:-1,picked:!1,x:r,y:i,pixel:[r,i],coordinate:s,devicePixel:e&&`pickedX`in e?[e.pickedX,e.pickedY]:void 0,pixelRatio:n}}function Ld(e){let{pickInfo:t,lastPickedInfo:n,mode:r,layers:i}=e,{pickedColor:a,pickedLayer:o,pickedObjectIndex:s}=t,c=o?[o]:[];if(r===`hover`){let e=n.index,t=n.layerId,r=o?o.props.id:null;if(r!==t||s!==e){if(r!==t){let e=i.find(e=>e.props.id===t);e&&c.unshift(e)}n.layerId=r,n.index=s,n.info=null}}let l=Id(e),u=new Map;return u.set(null,l),c.forEach(e=>{let t={...l};e===o&&(t.color=a,t.index=s,t.picked=!0),t=Rd({layer:e,info:t,mode:r});let i=t.layer;e===o&&r===`hover`&&(n.info=t),u.set(i.id,t),r===`hover`&&i.updateAutoHighlight(t)}),u}function Rd({layer:e,info:t,mode:n}){for(;e&&t;){let r=t.layer||null;t.sourceLayer=r,t.layer=e,t=e.getPickingInfo({info:t,mode:n,sourceLayer:r}),e=e.parent}return t}function zd(e,t){for(let n=e.length-1;n>=0;n--){let r=e[n];if(r.containsPixel(t))return r}return e[0]}var Bd=class{constructor(e,t={}){this._pickable=!0,this.device=e,this.stats=t.stats,this.pickLayersPass=new _u(e),this.lastPickedInfo={index:-1,layerId:null,info:null}}setProps(e){`layerFilter`in e&&(this.layerFilter=e.layerFilter),`_pickable`in e&&(this._pickable=e._pickable)}finalize(){this.pickingFBO&&this.pickingFBO.destroy(),this.depthFBO&&this.depthFBO.destroy()}pickObjectAsync(e){return this._pickClosestObjectAsync(e)}pickObjectsAsync(e){return this._pickVisibleObjectsAsync(e)}pickObject(e){return this._pickClosestObject(e)}pickObjects(e){return this._pickVisibleObjects(e)}getLastPickedObject({x:e,y:t,layers:n,viewports:r},i=this.lastPickedInfo.info){let a=i&&i.layer&&i.layer.id,o=i&&i.viewport&&i.viewport.id,s=a?n.find(e=>e.id===a):null,c=o&&r.find(e=>e.id===o)||r[0],l={x:e,y:t,viewport:c,coordinate:c&&c.unproject([e-c.x,t-c.y]),layer:s};return{...i,...l}}_resizeBuffer(e=this.device.getDefaultCanvasContext()){if(!this.pickingFBO){let e=this.device.createTexture({format:`rgba8unorm`,width:1,height:1,usage:j.RENDER_ATTACHMENT|j.COPY_SRC});if(this.pickingFBO=this.device.createFramebuffer({colorAttachments:[e],depthStencilAttachment:`depth16unorm`}),this.device.isTextureFormatRenderable(`rgba32float`)){let e=this.device.createTexture({format:`rgba32float`,width:1,height:1,usage:j.RENDER_ATTACHMENT|j.COPY_SRC}),t=this.device.createFramebuffer({colorAttachments:[e],depthStencilAttachment:`depth16unorm`});this.depthFBO=t}}let[t,n]=e.getDrawingBufferSize();this.pickingFBO?.resize({width:t,height:n}),this.depthFBO?.resize({width:t,height:n})}_getPickable(e){if(this._pickable===!1)return null;let t=e.filter(e=>this.pickLayersPass.shouldDrawLayer(e)&&!e.isComposite);return t.length?t:null}async _pickClosestObjectAsync({layers:e,views:t,viewports:n,x:r,y:i,radius:a=0,depth:o=1,mode:s=`query`,unproject3D:c,canvasContext:l=this.device.getDefaultCanvasContext(),onViewportActive:u,effects:d}){let f=l.cssToDeviceRatio(),p=this._getPickable(e);if(!p||n.length===0)return{result:[],emptyInfo:Id({viewports:n,x:r,y:i,pixelRatio:f})};this._resizeBuffer(l);let m=l.cssToDevicePixels([r,i],!0),h=[m.x+Math.floor(m.width/2),m.y+Math.floor(m.height/2)],g=Math.round(a*f),{width:_,height:v}=this.pickingFBO,y=this._getPickingRect({deviceX:h[0],deviceY:h[1],deviceRadius:g,deviceWidth:_,deviceHeight:v}),b={x:r-a,y:i-a,width:a*2+1,height:a*2+1},x,S=[],C=new Set;for(let e=0;e<o;e++){let a;a=y?Pd({...await this._drawAndSampleAsync({layers:p,views:t,viewports:n,onViewportActive:u,deviceRect:y,cullRect:b,effects:d,pass:`picking:${s}`,canvasContext:l}),deviceX:h[0],deviceY:h[1],deviceRadius:g,deviceRect:y}):{pickedColor:null,pickedObjectIndex:-1};let m,_=this._getDepthLayers(a,p,c);if(_.length>0){let{pickedColors:e}=await this._drawAndSampleAsync({layers:_,views:t,viewports:n,onViewportActive:u,deviceRect:{x:a.pickedX??h[0],y:a.pickedY??h[1],width:1,height:1},cullRect:b,effects:d,pass:`picking:${s}:z`,canvasContext:l},!0);e[3]&&(m=e[0])}a.pickedLayer&&e+1<o&&(C.add(a.pickedLayer),a.pickedLayer.disablePickingIndex(a.pickedObjectIndex)),x=Ld({pickInfo:a,lastPickedInfo:this.lastPickedInfo,mode:s,layers:p,viewports:n,x:r,y:i,z:m,pixelRatio:f});for(let e of x.values())e.layer&&S.push(e);if(!a.pickedColor)break}for(let e of C)e.restorePickingColors();return{result:S,emptyInfo:x.get(null)}}_pickClosestObject({layers:e,views:t,viewports:n,x:r,y:i,radius:a=0,depth:o=1,mode:s=`query`,unproject3D:c,canvasContext:l=this.device.getDefaultCanvasContext(),onViewportActive:u,effects:d}){let f=l.cssToDeviceRatio(),p=this._getPickable(e);if(!p||n.length===0)return{result:[],emptyInfo:Id({viewports:n,x:r,y:i,pixelRatio:f})};this._resizeBuffer(l);let m=l.cssToDevicePixels([r,i],!0),h=[m.x+Math.floor(m.width/2),m.y+Math.floor(m.height/2)],g=Math.round(a*f),{width:_,height:v}=this.pickingFBO,y=this._getPickingRect({deviceX:h[0],deviceY:h[1],deviceRadius:g,deviceWidth:_,deviceHeight:v}),b={x:r-a,y:i-a,width:a*2+1,height:a*2+1},x,S=[],C=new Set;for(let e=0;e<o;e++){let a;a=y?Pd({...this._drawAndSample({layers:p,views:t,viewports:n,onViewportActive:u,deviceRect:y,cullRect:b,effects:d,pass:`picking:${s}`,canvasContext:l}),deviceX:h[0],deviceY:h[1],deviceRadius:g,deviceRect:y}):{pickedColor:null,pickedObjectIndex:-1};let m,_=this._getDepthLayers(a,p,c);if(_.length>0){let{pickedColors:e}=this._drawAndSample({layers:_,views:t,viewports:n,onViewportActive:u,deviceRect:{x:a.pickedX??h[0],y:a.pickedY??h[1],width:1,height:1},cullRect:b,effects:d,pass:`picking:${s}:z`,canvasContext:l},!0);e[3]&&(m=e[0])}a.pickedLayer&&e+1<o&&(C.add(a.pickedLayer),a.pickedLayer.disablePickingIndex(a.pickedObjectIndex)),x=Ld({pickInfo:a,lastPickedInfo:this.lastPickedInfo,mode:s,layers:p,viewports:n,x:r,y:i,z:m,pixelRatio:f});for(let e of x.values())e.layer&&S.push(e);if(!a.pickedColor)break}for(let e of C)e.restorePickingColors();return{result:S,emptyInfo:x.get(null)}}async _pickVisibleObjectsAsync({layers:e,views:t,viewports:n,x:r,y:i,width:a=1,height:o=1,mode:s=`query`,maxObjects:c=null,canvasContext:l=this.device.getDefaultCanvasContext(),onViewportActive:u,effects:d}){let f=this._getPickable(e);if(!f||n.length===0)return[];this._resizeBuffer(l);let p=l.cssToDeviceRatio(),m=l.cssToDevicePixels([r,i],!0),h=m.x,g=m.y+m.height,_=l.cssToDevicePixels([r+a,i+o],!0),v=_.x+_.width,y=_.y,b={x:h,y,width:v-h,height:g-y},x=Fd(await this._drawAndSampleAsync({layers:f,views:t,viewports:n,onViewportActive:u,deviceRect:b,cullRect:{x:r,y:i,width:a,height:o},effects:d,pass:`picking:${s}`,canvasContext:l})),S=new Map,C=[],w=Number.isFinite(c);for(let e=0;e<x.length&&!(w&&C.length>=c);e++){let t=x[e],n={color:t.pickedColor,layer:null,index:t.pickedObjectIndex,picked:!0,x:r,y:i,pixelRatio:p};n=Rd({layer:t.pickedLayer,info:n,mode:s});let a=n.layer.id;S.has(a)||S.set(a,new Set);let o=S.get(a),c=n.object??n.index;o.has(c)||(o.add(c),C.push(n))}return C}_pickVisibleObjects({layers:e,views:t,viewports:n,x:r,y:i,width:a=1,height:o=1,mode:s=`query`,maxObjects:c=null,canvasContext:l=this.device.getDefaultCanvasContext(),onViewportActive:u,effects:d}){let f=this._getPickable(e);if(!f||n.length===0)return[];this._resizeBuffer(l);let p=l.cssToDeviceRatio(),m=l.cssToDevicePixels([r,i],!0),h=m.x,g=m.y+m.height,_=l.cssToDevicePixels([r+a,i+o],!0),v=_.x+_.width,y=_.y,b={x:h,y,width:v-h,height:g-y},x=Fd(this._drawAndSample({layers:f,views:t,viewports:n,onViewportActive:u,deviceRect:b,cullRect:{x:r,y:i,width:a,height:o},effects:d,pass:`picking:${s}`,canvasContext:l})),S=new Map,C=[],w=Number.isFinite(c);for(let e=0;e<x.length&&!(w&&C.length>=c);e++){let t=x[e],n={color:t.pickedColor,layer:null,index:t.pickedObjectIndex,picked:!0,x:r,y:i,pixelRatio:p};n=Rd({layer:t.pickedLayer,info:n,mode:s});let a=n.layer.id;S.has(a)||S.set(a,new Set);let o=S.get(a),c=n.object??n.index;o.has(c)||(o.add(c),C.push(n))}return C}async _drawAndSampleAsync({layers:e,views:t,viewports:n,onViewportActive:r,deviceRect:i,cullRect:a,effects:o,pass:s,canvasContext:c},l=!1){let u=l?this.depthFBO:this.pickingFBO,d={layers:e,layerFilter:this.layerFilter,views:t,viewports:n,onViewportActive:r,pickingFBO:u,deviceRect:i,cullRect:a,effects:o,pass:s,canvasContext:c,pickZ:l,preRenderStats:{},isPicking:!0};for(let e of o)e.useInPicking&&(d.preRenderStats[e.id]=e.preRender(d));let{decodePickingColor:f,stats:p}=this.pickLayersPass.render(d);this._updateStats(p);let{x:m,y:h,width:g,height:_}=i,v=u.colorAttachments[0]?.texture;if(!v)throw Error(`Picking framebuffer color attachment is missing`);let y=await this._readTextureDataAsync(v,{x:m,y:h,width:g,height:_},l?Float32Array:Uint8Array);if(!l){let e=!1;for(let t=3;t<y.length;t+=4)if(y[t]!==0){e=!0;break}!e&&y.length>0&&R.warn(`Async pick readback returned only zero alpha values`,{deviceRect:i,bytes:Array.from(y.subarray(0,Math.min(y.length,16)))})()}return{pickedColors:y,decodePickingColor:f}}async _readTextureDataAsync(e,t,n){let{width:r,height:i}=t,a=e.computeMemoryLayout(t),o=this.device.createBuffer({byteLength:a.byteLength,usage:y.COPY_DST|y.MAP_READ});try{e.readBuffer(t,o);let s=await o.readAsync(0,a.byteLength),c=n.BYTES_PER_ELEMENT;if(a.bytesPerRow%c!==0)throw Error(`Texture readback row stride ${a.bytesPerRow} is not aligned to ${c}-byte elements.`);let l=new n(s.buffer,s.byteOffset,a.byteLength/c),u=r*4,d=a.bytesPerRow/c;if(d<u)throw Error(`Texture readback row stride ${d} is smaller than packed row length ${u}.`);let f=new n(r*i*4);for(let e=0;e<i;e++){let t=e*d;f.set(l.subarray(t,t+u),e*u)}return f}finally{o.destroy()}}_drawAndSample({layers:e,views:t,viewports:n,onViewportActive:r,deviceRect:i,cullRect:a,effects:o,pass:s,canvasContext:c},l=!1){let u=l?this.depthFBO:this.pickingFBO,d={layers:e,layerFilter:this.layerFilter,views:t,viewports:n,onViewportActive:r,pickingFBO:u,deviceRect:i,cullRect:a,effects:o,pass:s,canvasContext:c,pickZ:l,preRenderStats:{},isPicking:!0};for(let e of o)e.useInPicking&&(d.preRenderStats[e.id]=e.preRender(d));let{decodePickingColor:f,stats:p}=this.pickLayersPass.render(d);this._updateStats(p);let{x:m,y:h,width:g,height:_}=i,v=new(l?Float32Array:Uint8Array)(g*_*4);return this.device.readPixelsToArrayWebGL(u,{sourceX:m,sourceY:h,sourceWidth:g,sourceHeight:_,target:v}),{pickedColors:v,decodePickingColor:f}}_updateStats(e){if(!this.stats)return;let t=0;for(let{visibleCount:n}of e)t+=n;this.stats.get(`Layers picked`).addCount(t)}_getDepthLayers(e,t,n){if(!n||!this.depthFBO)return[];let{pickedLayer:r}=e,i=r?.state?.terrainDrawMode===`drape`;return r&&!i?[r]:t.filter(e=>e.props.operation.includes(`terrain`))}_getPickingRect({deviceX:e,deviceY:t,deviceRadius:n,deviceWidth:r,deviceHeight:i}){let a=Math.max(0,e-n),o=Math.max(0,t-n),s=Math.min(r,e+n+1)-a,c=Math.min(i,t+n+1)-o;return s<=0||c<=0?null:{x:a,y:o,width:s,height:c}}},Vd={"top-left":{top:0,left:0},"top-right":{top:0,right:0},"bottom-left":{bottom:0,left:0},"bottom-right":{bottom:0,right:0},fill:{top:0,left:0,bottom:0,right:0}},Hd=`top-left`,Ud=`root`,Wd=class{constructor({deck:e,parentElement:t}){this.defaultWidgets=[],this.widgets=[],this.resolvedWidgets=[],this.containers={},this.lastViewports={},this.deck=e,t?.classList.add(`deck-widget-container`),this.parentElement=t}getWidgets(){return this.resolvedWidgets}setProps(e){if(e.widgets&&!G(e.widgets,this.widgets,1)){let t=e.widgets.filter(Boolean);this._setWidgets(t)}}finalize(){for(let e of this.getWidgets())this._removeWidget(e);this.defaultWidgets.length=0,this.resolvedWidgets.length=0;for(let e in this.containers)this.containers[e].remove()}addDefault(e){this.defaultWidgets.find(t=>t.id===e.id)||(this._addWidget(e),this.defaultWidgets.push(e),this._setWidgets(this.widgets))}onRedraw({viewports:e,layers:t}){let n=e.reduce((e,t)=>(e[t.id]=t,e),{});for(let r of this.getWidgets()){let{viewId:i}=r;if(i){let e=n[i];e&&(r.onViewportChange&&r.onViewportChange(e),r.onRedraw?.({viewports:[e],layers:t}))}else{if(r.onViewportChange)for(let t of e)r.onViewportChange(t);r.onRedraw?.({viewports:e,layers:t})}}this.lastViewports=n,this._updateContainers()}onHover(e,t){for(let n of this.getWidgets()){let{viewId:r}=n;(!r||r===e.viewport?.id)&&n.onHover?.(e,t)}}getCanvasBounds(e){let t=(this.deck?.getCanvas?.())?.getBoundingClientRect(),n=this.parentElement?.getBoundingClientRect(),r=this.deck?.getCanvasContext?.(e?.id);if(r&&n){r.updatePosition();let[e,t]=r.getPosition(),[i,a]=r.getCSSSize();return{x:e-n.left,y:t-n.top,width:i,height:a}}return{x:t&&n?t.left-n.left:0,y:t&&n?t.top-n.top:0,width:t?.width||this.deck?.width||0,height:t?.height||this.deck?.height||0}}onEvent(e,t){let n=rc[t.type];if(n)for(let r of this.getWidgets()){let{viewId:i}=r;(!i||i===e.viewport?.id)&&r[n]?.(e,t)}}_setWidgets(e){let t={};for(let e of this.resolvedWidgets)t[e.id]=e;this.resolvedWidgets.length=0;for(let e of this.defaultWidgets)t[e.id]=null,this.resolvedWidgets.push(e);for(let n of e){let e=t[n.id];e?e.viewId!==n.viewId||e.placement!==n.placement?(this._removeWidget(e),this._addWidget(n)):n!==e&&(e.setProps(n.props),n=e):this._addWidget(n),t[n.id]=null,this.resolvedWidgets.push(n)}for(let e in t){let n=t[e];n&&this._removeWidget(n)}this.widgets=e}_addWidget(e){let{viewId:t=null,placement:n=Hd}=e,r=e.props._container??t;e.widgetManager=this,e.deck=this.deck,e.rootElement=e._onAdd({deck:this.deck,viewId:t}),e.rootElement&&this._getContainer(r,n).append(e.rootElement),e.updateHTML()}_removeWidget(e){e.onRemove?.(),e.rootElement&&e.rootElement.remove(),e.rootElement=void 0,e.deck=void 0,e.widgetManager=void 0}_getContainer(e,t){if(e&&typeof e!=`string`)return e;let n=e||Ud,r=this.containers[n];r||(r=document.createElement(`div`),r.style.pointerEvents=`none`,r.style.position=`absolute`,r.style.overflow=`hidden`,this.parentElement?.append(r),this.containers[n]=r);let i=r.querySelector(`.${t}`);return i||(i=globalThis.document.createElement(`div`),i.className=t,i.style.position=`absolute`,i.style.zIndex=`2`,Object.assign(i.style,Vd[t]),r.append(i)),i}_updateContainers(){for(let e in this.containers){let t=this.lastViewports[e]||null,n=e===Ud||t,r=this.containers[e];if(n){let e=this._getContainerBounds(t);r.style.display=`block`,r.style.left=`${e.x}px`,r.style.top=`${e.y}px`,r.style.width=`${e.width}px`,r.style.height=`${e.height}px`}else r.style.display=`none`}}_getContainerBounds(e){if(!e)return{x:0,y:0,width:this.parentElement?.clientWidth||this.deck.width,height:this.parentElement?.clientHeight||this.deck.height};let t=this.getCanvasBounds(e);return{x:t.x+e.x,y:t.y+e.y,width:e.width,height:e.height}}};function Gd(e,t){t&&Object.entries(t).map(([t,n])=>{t.startsWith(`--`)?e.style.setProperty(t,n):e.style[t]=n})}function Kd(e,t){t&&Object.keys(t).map(t=>{t.startsWith(`--`)?e.style.removeProperty(t):e.style[t]=``})}var qd=class{constructor(e){this.viewId=null,this.props={...this.constructor.defaultProps,...e},this.id=this.props.id}setProps(e){let t=this.props,n=this.rootElement;n&&t.className!==e.className&&(t.className&&n.classList.remove(t.className),e.className&&n.classList.add(e.className)),n&&!G(t.style,e.style,1)&&(Kd(n,t.style),Gd(n,e.style)),Object.assign(this.props,e),this.updateHTML()}updateHTML(){this.rootElement&&this.onRenderHTML(this.rootElement)}get viewIds(){return this.viewId?[this.viewId]:this.deck?.getViews().map(e=>e.id)??[]}getViewState(e){return this.deck?.viewManager?.getViewState(e)||{}}setViewState(e,t){this.deck?._onViewStateChange({viewId:e,viewState:t,interactionState:{}})}onCreateRootElement(){let e=[`deck-widget`,this.className,this.props.className],t=document.createElement(`div`);return e.filter(e=>typeof e==`string`&&e.length>0).forEach(e=>t.classList.add(e)),Gd(t,this.props.style),t}_onAdd(e){return this.onAdd(e)??this.onCreateRootElement()}onAdd(e){}onRemove(){}onViewportChange(e){}onRedraw(e){}onHover(e,t){}onClick(e,t){}onDrag(e,t){}onDragStart(e,t){}onDragEnd(e,t){}};qd.defaultProps={id:`widget`,style:{},_container:null,className:``};var Jd={zIndex:`1`,position:`absolute`,pointerEvents:`none`,color:`#a0a7b4`,backgroundColor:`#29323c`,padding:`10px`,top:`0`,left:`0`,display:`none`},Yd=class extends qd{constructor(e={}){super(e),this.id=`default-tooltip`,this.placement=`fill`,this.className=`deck-tooltip`,this.isVisible=!1,this.setProps(e)}onCreateRootElement(){let e=document.createElement(`div`);return e.className=this.className,Object.assign(e.style,Jd),e}onRenderHTML(e){}onViewportChange(e){this.isVisible&&e.id===this.lastViewport?.id&&!e.equals(this.lastViewport)&&this.setTooltip(null),this.lastViewport=e}onHover(e){let{deck:t}=this,n=t&&t.props.getTooltip;if(!n)return;let r=n(e),i=this.widgetManager?.getCanvasBounds(e.viewport),a=e.x+(i?.x||0),o=e.y+(i?.y||0);this.setTooltip(r,a,o)}setTooltip(e,t,n){let r=this.rootElement;if(r){if(typeof e==`string`)r.innerText=e;else if(e)e.text&&(r.innerText=e.text),e.html&&(r.innerHTML=e.html),e.className&&(r.className=e.className);else{this.isVisible=!1,r.style.display=`none`;return}this.isVisible=!0,r.style.display=`block`,r.style.transform=`translate(${t}px, ${n}px)`,e&&typeof e==`object`&&`style`in e&&Object.assign(r.style,e.style)}}};Yd.defaultProps={...qd.defaultProps};var Xd=class{constructor(e){this.targets={},this.order=[],this.eventManagers={},this._eventRootToCanvasId=new WeakMap,this._createEventManager=e.createEventManager,this._getEventRoot=e.getEventRoot}finalize(){for(let e of Object.values(this.targets))e.eventManager.destroy(),e.presentationContext.destroy();this.targets={},this.order=[],this.eventManagers={},this._eventRootToCanvasId=new WeakMap}syncCanvasEntries(e){let t=this._normalizeCanvasList(e.canvases),n={},r=[],i=new Map;for(let{canvas:e}of t){let t=this._getEventRoot(e);i.set(t,(i.get(t)||0)+1)}for(let{id:a,canvas:o}of t){let t=this._getEventRoot(o),s=i.get(t)===1?t:o,c=this.targets[a];if(!c||c.device!==e.device||c.canvas!==o||c.eventRoot!==s){c?.eventManager.destroy(),c?.presentationContext.destroy();let t=e.device.createPresentationContext({id:a,canvas:o,useDevicePixels:e.useDevicePixels,autoResize:!0});c={id:a,device:e.device,canvas:o,eventRoot:s,presentationContext:t,eventManager:this._createEventManager(s)}}this._eventRootToCanvasId.set(s,a),this._eventRootToCanvasId.set(o,a),n[a]=c,r.push(a)}for(let[e,t]of Object.entries(this.targets))n[e]||(t.eventManager.destroy(),t.presentationContext.destroy());this.targets=n,this.order=r;let a=Object.fromEntries(Object.entries(n).map(([e,t])=>[e,t.eventManager]));this._haveSameEventManagers(a)||(this.eventManagers=a)}getCanvasIdFromEvent(e){return e?this._eventRootToCanvasId.get(e):void 0}getTarget(e){return this.targets[e||this.order[0]||`default-canvas`]||null}_normalizeCanvasList(e=[]){let t=new Set;return e.map((e,n)=>{let r,i;return typeof e==`string`?(r=document.getElementById(e),J(r,`Canvas with id ${e} not found`),i=e):(r=e,i=r.id||`deckgl-canvas-${n}`),J(!t.has(i),`Duplicate canvas id ${i}`),t.add(i),{id:i,canvas:r}})}_haveSameEventManagers(e){let t=Object.keys(e),n=Object.keys(this.eventManagers);return t.length===n.length&&t.every(t=>e[t]===this.eventManagers[t])}};function Zd(){}var Qd={id:``,width:`100%`,height:`100%`,style:null,viewState:null,initialViewState:null,pickingRadius:0,pickAsync:`auto`,layerFilter:null,parameters:{},parent:null,device:null,deviceProps:{},gl:null,canvas:null,_canvases:null,layers:[],effects:[],views:null,controller:null,useDevicePixels:!0,touchAction:`none`,eventRecognizerOptions:{},_framebuffer:null,_animate:!1,_pickable:!0,_typedArrayManagerProps:{},_customRender:null,widgets:[],onDeviceInitialized:Zd,onWebGLInitialized:Zd,onResize:Zd,onViewStateChange:Zd,onInteractionStateChange:Zd,onBeforeRender:Zd,onAfterRender:Zd,onLoad:Zd,onError:e=>R.error(e.message,e.cause)(),onHover:null,onClick:null,onDragStart:null,onDrag:null,onDragEnd:null,_onMetrics:null,getCursor:({isDragging:e})=>e?`grabbing`:`grab`,getTooltip:null,debug:!1,drawPickingColors:!1},$d=class{constructor(e){this.width=0,this.height=0,this.userData={},this.device=null,this.canvas=null,this.viewManager=null,this.layerManager=null,this.effectManager=null,this.deckRenderer=null,this.deckPicker=null,this.eventManager=null,this.eventManagers={},this.widgetManager=null,this.tooltip=null,this.animationLoop=null,this._canvasContext=null,this._deviceResizeHandler=null,this.cursorState={isHovering:!1,isDragging:!1},this.stats=new k({id:`deck.gl`}),this.metrics={fps:0,setPropsTime:0,layersCount:0,drawLayersCount:0,updateLayersCount:0,updateAttributesCount:0,updateAttributesTime:0,framesRedrawn:0,pickTime:0,pickCount:0,pickLayersCount:0,gpuTime:0,gpuTimePerFrame:0,cpuTime:0,cpuTimePerFrame:0,bufferMemory:0,textureMemory:0,renderbufferMemory:0,gpuMemory:0},this._metricsCounter=0,this._hoverPickSequence=0,this._pointerDownPickSequence=0,this._needsRedraw=`Initial render`,this._canvasManager=new Xd({createEventManager:e=>this._createEventManager(e),getEventRoot:e=>this._getEventRoot(e)}),this._ownedCanvas=null,this._pickRequest={mode:`hover`,x:-1,y:-1,radius:0,canvasId:void 0,event:null,unproject3D:!1},this._lastPointerDownInfo=null,this._lastPointerDownInfoPromise=null,this._onPointerMove=e=>{let{_pickRequest:t}=this,n=this._getCanvasIdFromEvent(e);if(e.type===`pointerleave`)t.x=-1,t.y=-1,t.radius=0,t.canvasId=n;else if(e.leftButton||e.rightButton)return;else{let r=e.offsetCenter;if(!r)return;t.x=r.x,t.y=r.y,t.radius=this.props.pickingRadius,t.canvasId=n}this.layerManager&&(this.layerManager.context.mousePosition={x:t.x,y:t.y}),t.event=e},this._onEvent=e=>{let t=rc[e.type],n=e.offsetCenter,r=this._getCanvasIdFromEvent(e);if(!t||!n||!this.layerManager)return;let i=this.layerManager.getLayers(),a=this._getInternalPickingMode();if(a){if(a===`sync`){let t=e.type===`click`&&this._shouldUnproject3D(i)?this._getFirstPickedInfo(this._pickPointSync(this._getPointPickOptions(n.x,n.y,{unproject3D:!0,canvasId:r},i))):this._getLastPointerDownPickingInfo(n.x,n.y,r,i);this._dispatchPickingEvent(t,e);return}(this._lastPointerDownInfoPromise||Promise.resolve(this._getLastPointerDownPickingInfo(n.x,n.y,r,i))).then(t=>{this._dispatchPickingEvent(t,e)}).catch(e=>this.props.onError?.(e))}},this._onPointerDown=e=>{let t=e.offsetCenter,n=this._getCanvasIdFromEvent(e);if(!t)return;let r=this._getInternalPickingMode();if(!r)return;let i=this.layerManager?.getLayers()||[],a=++this._pointerDownPickSequence;if(r===`sync`){let e=this._pickPointSync({x:t.x,y:t.y,canvasId:n,radius:this.props.pickingRadius}),r=this._getFirstPickedInfo(e);this._lastPointerDownInfo=r,this._lastPointerDownInfoPromise=Promise.resolve(r);return}let o=this._pickPointAsync(this._getPointPickOptions(t.x,t.y,{canvasId:n},i)).then(e=>this._getFirstPickedInfo(e)).then(e=>(a===this._pointerDownPickSequence&&(this._lastPointerDownInfo=e),e)).catch(e=>{this.props.onError?.(e);let r=this.deckPicker&&this.viewManager?this._getLastPointerDownPickingInfo(t.x,t.y,n,i):{};return a===this._pointerDownPickSequence&&(this._lastPointerDownInfo=r),r});this._lastPointerDownInfo=null,this._lastPointerDownInfoPromise=o};let t=e;this.props={...Qd,...e},e=this.props,this._validateCanvasConfiguration(e),e.viewState&&e.initialViewState&&R.warn("View state tracking is disabled. Use either `initialViewState` for auto update or `viewState` for manual update.")(),this.viewState=this.props.initialViewState,e.device&&(this.device=e.device,this._setDeviceCanvasContext(e.device));let n=this.device;!n&&e.gl&&(e.gl instanceof WebGLRenderingContext&&R.error(`WebGL1 context not supported.`)(),n=En.attach(e.gl,{_cacheShaders:!0,_cachePipelines:!0,...this.props.deviceProps})),n||=this._createDevice(e),this.animationLoop=this._createAnimationLoop(n,e),this.setProps(t),e._typedArrayManagerProps&&Kl.setOptions(e._typedArrayManagerProps),this.animationLoop.start()}finalize(){this._restoreDeviceResizeHandler(),this.animationLoop?.stop(),this.animationLoop?.destroy(),this.animationLoop=null,this._hoverPickSequence++,this._pointerDownPickSequence++,this._lastPointerDownInfo=null,this._lastPointerDownInfoPromise=null,this.layerManager?.finalize(),this.layerManager=null,this.viewManager?.finalize(),this.viewManager=null,this.effectManager?.finalize(),this.effectManager=null,this.deckRenderer?.finalize(),this.deckRenderer=null,this.deckPicker?.finalize(),this.deckPicker=null,Object.keys(this._canvasManager.targets).length||this.eventManager?.destroy(),this.eventManager=null,this.eventManagers={},this.widgetManager?.finalize(),this.widgetManager=null,this._canvasManager.finalize(),this._isMultiCanvasMode()?this.canvas=null:this.canvas&&this.canvas===this._ownedCanvas&&(this.canvas.parentElement?.removeChild(this.canvas),this.canvas=null,this._ownedCanvas=null),this._canvasContext=null}setProps(e){this.stats.get(`setProps Time`).timeStart(),`onLayerHover`in e&&R.removed(`onLayerHover`,`onHover`)(),`onLayerClick`in e&&R.removed(`onLayerClick`,`onClick`)(),e.initialViewState&&!G(this.props.initialViewState,e.initialViewState,3)&&(this.viewState=e.initialViewState),J(!(`_canvases`in e)||Array.isArray(e._canvases)===this._isMultiCanvasMode()),Object.assign(this.props,e),this._validateCanvasConfiguration(this.props),this._validateInternalPickingMode(),this.device&&this._isMultiCanvasMode()&&this._syncCanvasTargets(),this._setCanvasSize(this.props);let t=Object.create(this.props);if(Object.assign(t,{views:this._getViews(),width:this.width,height:this.height,viewState:this._getViewState(),eventManagers:this.eventManagers}),e.device&&e.device.id!==this.device?.id){let t=e.device.getDefaultCanvasContext();this.animationLoop?.stop(),!this._isMultiCanvasMode()&&this.canvas!==t.canvas&&(this.canvas?.remove(),this.eventManager?.destroy(),this.canvas=null),this._setDeviceCanvasContext(e.device),R.log(`recreating animation loop for new device! id=${e.device.id}`)(),this.animationLoop=this._createAnimationLoop(e.device,e),this.animationLoop.start()}if(this.animationLoop?.setProps(t),e.useDevicePixels!==void 0&&this._canvasContext?.setProps){this._canvasContext.setProps({useDevicePixels:e.useDevicePixels});for(let t of Object.values(this._canvasManager.targets))t.presentationContext.setProps({useDevicePixels:e.useDevicePixels})}this.layerManager&&(this.viewManager.setProps(t),this.layerManager.activateViewport(this.getViewports()[0]),this.layerManager.setProps(t),this.effectManager.setProps(t),this.deckRenderer.setProps(t),this.deckPicker.setProps(t),this.widgetManager.setProps(t)),this.stats.get(`setProps Time`).timeEnd()}needsRedraw(e={clearRedrawFlags:!1}){if(!this.layerManager)return!1;if(this.props._animate)return`Deck._animate`;let t=this._needsRedraw;e.clearRedrawFlags&&(this._needsRedraw=!1);let n=this.viewManager.needsRedraw(e),r=this.layerManager.needsRedraw(e),i=this.effectManager.needsRedraw(e),a=this.deckRenderer.needsRedraw(e);return t=t||n||r||i||a,t}redraw(e){if(!this.layerManager)return;let t=this.needsRedraw({clearRedrawFlags:!0});t=e||t,t&&(this.stats.get(`Redraw Count`).incrementCount(),this.props._customRender?this.props._customRender(t):this._drawLayers(t))}get isInitialized(){return this.viewManager!==null}getViews(){return J(this.viewManager),this.viewManager.views}getView(e){return J(this.viewManager),this.viewManager.getView(e)}getViewports(e){return J(this.viewManager),this.viewManager.getViewports(e)}getCanvas(){return this.canvas}getCanvasContext(e){let t=e?this.viewManager?.getView(e)?.props.canvasId:void 0;return this._getCanvasContext(t)}getEventManager(e){if(!e||!this.viewManager)return this.eventManager;let t=this.viewManager.getCanvasId(e)||`default-canvas`;return this.eventManagers[t]||this.eventManager}async pickObjectAsync(e){let t=(await this._pickAsync(`pickObjectAsync`,`pickObject Time`,e)).result;return t.length?t[0]:null}async pickObjectsAsync(e){return await this._pickAsync(`pickObjectsAsync`,`pickObjects Time`,e)}pickObject(e){let t=this._pick(`pickObject`,`pickObject Time`,e).result;return t.length?t[0]:null}pickMultipleObjects(e){return e.depth=e.depth||10,this._pick(`pickObject`,`pickMultipleObjects Time`,e).result}pickObjects(e){return this._pick(`pickObjects`,`pickObjects Time`,e)}_pickPositionForController(e,t,n){return this._getInternalPickingMode()===`sync`?this.pickObject({x:e,y:t,radius:0,unproject3D:!0,canvasId:n?this.viewManager?.getCanvasId(n):void 0}):null}_addResources(e,t=!1){for(let n in e)this.layerManager.resourceManager.add({resourceId:n,data:e[n],forceUpdate:t})}_removeResources(e){for(let t of e)this.layerManager.resourceManager.remove(t)}_addDefaultEffect(e){this.effectManager.addDefaultEffect(e)}_addDefaultShaderModule(e){this.layerManager.addDefaultShaderModule(e)}_removeDefaultShaderModule(e){this.layerManager?.removeDefaultShaderModule(e)}_resolveInternalPickingMode(){let{pickAsync:e}=this.props,t=this.device?.type||this.props.deviceProps?.type;if(e===`auto`)return t===`webgpu`?`async`:`sync`;if(e===`sync`&&t===`webgpu`)throw Error('`pickAsync: "sync"` is not supported when Deck is using a WebGPU device.');return e}_getInternalPickingMode(){try{return this._resolveInternalPickingMode()}catch(e){return this.props.onError?.(e),null}}_validateInternalPickingMode(){this._getInternalPickingMode()}_getFirstPickedInfo({result:e,emptyInfo:t}){return e[0]||t}_shouldUnproject3D(e=this.layerManager?.getLayers()||[]){return e.some(e=>e.props.pickable===`3d`)}_getPointPickOptions(e,t,n={},r=this.layerManager?.getLayers()||[]){return{x:e,y:t,canvasId:n.canvasId,radius:this.props.pickingRadius,unproject3D:this._shouldUnproject3D(r),...n}}_pickPointSync(e){return this._pick(`pickObject`,`pickObject Time`,e)}_pickPointAsync(e){return this._pickAsync(`pickObjectAsync`,`pickObject Time`,e)}_getLastPointerDownPickingInfo(e,t,n,r=this.layerManager?.getLayers()||[]){return this.deckPicker.getLastPickedObject({x:e,y:t,layers:r,viewports:this.getViewports({x:e,y:t,canvasId:n})},this._lastPointerDownInfo)}_applyHoverCallbacks({result:e,emptyInfo:t},n){if(!this.widgetManager)return;this.cursorState.isHovering=e.length>0;let r=t,i=!1;for(let t of e)r=t,i=t.layer?.onHover(t,n)||i;i||(this.props.onHover?.(r,n),this.widgetManager.onHover(r,n))}_dispatchPickingEvent(e,t){if(!this.layerManager||!this.widgetManager)return;let n=rc[t.type];if(!n)return;let{layer:r}=e,i=r&&(r[n]||r.props[n]),a=this.props[n],o=!1;i&&(o=i.call(r,e,t)),o||(a?.(e,t),this.widgetManager.onEvent(e,t))}_pickAsync(e,t,n){J(this.deckPicker);let{stats:r}=this,i=this._isMultiCanvasMode()?n.canvasId||this._getDefaultCanvasId():n.canvasId,a=this._getCanvasContext(i)||void 0;r.get(`Pick Count`).incrementCount(),r.get(t).timeStart(),this._resizeForCanvasTarget(i);let o=this.deckPicker[e]({layers:this.layerManager.getLayers(n),views:this.viewManager.getViews(),viewports:this.getViewports({...n,canvasId:i}),onViewportActive:this.layerManager.activateViewport,effects:this.effectManager.getEffects(),...n,canvasId:i,canvasContext:a});return r.get(t).timeEnd(),o}_pick(e,t,n){J(this.deckPicker);let{stats:r}=this,i=this._isMultiCanvasMode()?n.canvasId||this._getDefaultCanvasId():n.canvasId,a=this._getCanvasContext(i)||void 0;r.get(`Pick Count`).incrementCount(),r.get(t).timeStart(),this._resizeForCanvasTarget(i);let o=this.deckPicker[e]({layers:this.layerManager.getLayers(n),views:this.viewManager.getViews(),viewports:this.getViewports({...n,canvasId:i}),onViewportActive:this.layerManager.activateViewport,effects:this.effectManager.getEffects(),...n,canvasId:i,canvasContext:a});return r.get(t).timeEnd(),o}_createCanvas(e){let t=e.canvas;return typeof t==`string`&&(t=document.getElementById(t),J(t)),t?this._ownedCanvas=null:(t=document.createElement(`canvas`),t.id=e.id||`deckgl-overlay`,e.width&&typeof e.width==`number`&&(t.width=e.width),e.height&&typeof e.height==`number`&&(t.height=e.height),(e.parent||document.body).appendChild(t),this._ownedCanvas=t),Object.assign(t.style,e.style),t}_isMultiCanvasMode(){return Array.isArray(this.props._canvases)}_getDefaultCanvasId(){return this._canvasManager.order[0]||`default-canvas`}_validateCanvasConfiguration(e){Array.isArray(e._canvases)&&(J(!e.canvas),J(!e.gl),J(!e.device?.canvasContext||e.device.getDefaultCanvasContext().offscreenCanvas))}_createEventManager(e){let t=new ec(e,{touchAction:this.props.touchAction,recognizers:Object.keys(ic).map(e=>{let[t,n,r,i]=ic[e],a=this.props.eventRecognizerOptions?.[e];return{recognizer:new t({...n,...a,event:e}),recognizeWith:r,requireFailure:i}}),events:{pointerdown:this._onPointerDown,pointermove:this._onPointerMove,pointerleave:this._onPointerMove}});for(let e in rc)e===`dblclick`?t.watch(e,this._onEvent):t.on(e,this._onEvent);return t}_getEventRoot(e){return e.closest(`.deck-events-root`)||this.props.parent?.querySelector(`.deck-events-root`)||e}_syncCanvasTargets(){if(!this.device||!this._isMultiCanvasMode())return;this._canvasManager.syncCanvasEntries({device:this.device,canvases:this.props._canvases||[],useDevicePixels:this.props.useDevicePixels}),this.eventManagers=this._canvasManager.eventManagers;let e=this._getDefaultCanvasId();this.eventManager=this.eventManagers[e]||null,this.canvas=this._canvasManager.targets[e]?.canvas||null}_setCanvasContext(e){this._canvasContext=e,`style`in e.canvas&&(this.canvas=e.canvas)}_setDeviceCanvasContext(e,t={}){let n=e.getDefaultCanvasContext();this._setCanvasContext(n),this._setDeviceResizeHandler(e,t)}_setDeviceResizeHandler(e,t={}){let n=!!t.syncDrawingBuffer;if(this._deviceResizeHandler?.device===e){this._deviceResizeHandler.syncDrawingBuffer=n;return}this._restoreDeviceResizeHandler();let r=e=>{this._isMultiCanvasMode()?this._updateMultiCanvasDimensions():e===this._canvasContext&&this._canvasContext&&this._onCanvasContextResize(this._canvasContext,{syncDrawingBuffer:this._deviceResizeHandler?.syncDrawingBuffer})};e.props.onResize=r,this._deviceResizeHandler={device:e,onResize:r,syncDrawingBuffer:n}}_restoreDeviceResizeHandler(){let e=this._deviceResizeHandler;e&&e.device.props?.onResize===e.onResize&&(e.device.props.onResize=Zd),this._deviceResizeHandler=null}_setCanvasSize(e){if(this._isMultiCanvasMode()||!this.canvas)return;let{width:t,height:n}=e;if(t||t===0){let e=Number.isFinite(t)?`${t}px`:t;this.canvas.style.width=e}if(n||n===0){let t=Number.isFinite(n)?`${n}px`:n;this.canvas.style.position=e.style?.position||`absolute`,this.canvas.style.height=t}}_getCanvasIdFromEvent(e){return this._canvasManager.getCanvasIdFromEvent(e?.rootElement)}_getCanvasContext(e){return this._canvasManager.getTarget(e)?.presentationContext||this._canvasContext}_resizeForCanvasTarget(e){let t=this._canvasManager.getTarget(e);if(!t||!this.device?.canvasContext)return;let[n,r]=t.presentationContext.getDrawingBufferSize();this.device.canvasContext.setDrawingBufferSize(n,r)}_createDeviceCanvas(e){if(this._isMultiCanvasMode()){let t=globalThis.OffscreenCanvas;if(!t)throw Error("`_canvases` requires OffscreenCanvas support.");return new t(typeof e.width==`number`&&Number.isFinite(e.width)?e.width:1,typeof e.height==`number`&&Number.isFinite(e.height)?e.height:1)}return this._createCanvas(e)}_updateCanvasSize(e=this._canvasContext){if(this._isMultiCanvasMode()){this._updateMultiCanvasDimensions();return}let{canvas:t}=this,[n,r]=e?e.getCSSSize():[t?.clientWidth??t?.width??0,t?.clientHeight??t?.height??0];(n!==this.width||r!==this.height)&&(this.width=n,this.height=r,this.viewManager?.setProps({width:n,height:r}),this.layerManager?.activateViewport(this.getViewports()[0]),this.props.onResize({width:n,height:r},e||void 0))}_onCanvasContextResize(e,t={}){if(t.syncDrawingBuffer){let{width:t,height:n}=e.canvas;e.setDrawingBufferSize(t,n)}this._needsRedraw=`Canvas resized`,this._updateCanvasSize(e)}_updateMultiCanvasDimensions(){let[e,t]=this._getCanvasContext()?.getCSSSize()||[0,0];(e!==this.width||t!==this.height)&&(this.width=e,this.height=t,this.props.onResize({width:e,height:t})),this._needsRedraw=`Canvas resized`,this.viewManager?.setNeedsUpdate(`Canvas resized`),this.viewManager?.setProps({width:this.width,height:this.height})}_createAnimationLoop(e,t){let{gl:n,onError:r}=t;return new gn({device:e,autoResizeDrawingBuffer:!n&&!Array.isArray(t._canvases),autoResizeViewport:!1,onInitialize:e=>this._setDevice(e.device),onRender:this._onRenderFrame.bind(this),onError:r})}_createDevice(e){let t=this.props.deviceProps?.createCanvasContext,n=typeof t==`object`?t:void 0,r={adapters:[],_cacheShaders:!0,_cachePipelines:!0,...e.deviceProps};r.adapters.includes(En)||r.adapters.push(En);let i={alphaMode:this.props.deviceProps?.type===`webgpu`?`premultiplied`:void 0};return ie.createDevice({_reuseDevices:!0,type:`webgl`,...r,createCanvasContext:{...i,...n,canvas:this._createDeviceCanvas(e),useDevicePixels:this.props.useDevicePixels,autoResize:!0}})}_getViewState(){return this.props.viewState||this.viewState}_getViews(){let{views:e}=this.props,t=Array.isArray(e)?e:e?[e]:[new Ed({id:`default-view`})];return t.length&&this.props.controller&&(t[0]=t[0].clone({controller:this.props.controller})),t}_onContextLost(){let{onError:e}=this.props;this.animationLoop&&e&&e(Error(`WebGL context is lost`))}_pickAndCallback(){let{_pickRequest:e}=this;if(e.event){let t=e.event,n=this.layerManager?.getLayers()||[],r=this._getPointPickOptions(e.x,e.y,{canvasId:e.canvasId,radius:e.radius,mode:e.mode},n),i=this._getInternalPickingMode(),a=++this._hoverPickSequence;if(e.event=null,e.canvasId=void 0,!i)return;if(i===`sync`){this._applyHoverCallbacks(this._pickPointSync(r),t);return}this._pickPointAsync(r).then(({result:e,emptyInfo:n})=>{a===this._hoverPickSequence&&this._applyHoverCallbacks({result:e,emptyInfo:n},t)}).catch(e=>this.props.onError?.(e))}}_updateCursor(){let e=this.props.getCursor(this.cursorState);if(this._isMultiCanvasMode()){for(let t of Object.values(this._canvasManager.targets))t.canvas.style.cursor=e;return}let t=this.props.parent||this.canvas;t&&(t.style.cursor=e)}_setDevice(e){if(this.device=e,this._validateInternalPickingMode(),!this.animationLoop)return;this._setDeviceCanvasContext(e,{syncDrawingBuffer:!!(this.props.gl&&this.props.device!==e)}),this._isMultiCanvasMode()?this._syncCanvasTargets():this.canvas&&!this.canvas.isConnected&&this.props.parent&&this.props.parent.insertBefore(this.canvas,this.props.parent.firstChild),this.device.type===`webgl`&&this.device.setParametersWebGL({blend:!0,blendFunc:[770,771,1,771],polygonOffsetFill:!0,depthTest:!0,depthFunc:515}),this.props.onDeviceInitialized(this.device),this.device.type===`webgl`&&this.props.onWebGLInitialized(this.device.gl);let t=new un;if(t.play(),this.animationLoop.attachTimeline(t),!this._isMultiCanvasMode()){let e=this.canvas&&this._getEventRoot(this.canvas);J(e),this.eventManager=this._createEventManager(e),this.eventManagers={[Fu]:this.eventManager}}this.viewManager=new Iu({timeline:t,eventManager:this.eventManager,eventManagers:this.eventManagers,getCanvasContext:this._isMultiCanvasMode()?this.getCanvasContext.bind(this):void 0,onViewStateChange:this._onViewStateChange.bind(this),onInteractionStateChange:this._onInteractionStateChange.bind(this),pickPosition:this._pickPositionForController.bind(this),views:this._getViews(),viewState:this._getViewState(),width:this.width,height:this.height});let n=this.viewManager.getViewports()[0];this.layerManager=new Pu(this.device,{deck:this,stats:this.stats,viewport:n,timeline:t}),this.effectManager=new kd({deck:this,device:this.device}),this.deckRenderer=new Md(this.device,{stats:this.stats}),this.deckPicker=new Bd(this.device,{stats:this.stats});let r=this.props.parent?.querySelector(`.deck-widgets-root`)||(this._isMultiCanvasMode()?this.props.parent||this.canvas?.parentElement:null)||this.canvas?.parentElement;this.widgetManager=new Wd({deck:this,parentElement:r}),this.widgetManager.addDefault(new Yd),this.setProps({}),this._updateCanvasSize(this._canvasContext),this.props.onLoad()}_drawLayers(e,t){let{device:n,gl:r}=this.layerManager.context;this.props.onBeforeRender({device:n,gl:r});let i={target:this.props._framebuffer,layers:this.layerManager.getLayers(),viewports:this.viewManager.getViewports(),onViewportActive:this.layerManager.activateViewport,views:this.viewManager.getViews(),pass:`screen`,effects:this.effectManager.getEffects(),...t};if(this._isMultiCanvasMode()&&i.pass===`screen`&&!i.target&&this._canvasManager.order.length)for(let e of this._canvasManager.order){let t=i.viewports.filter(t=>this.viewManager.getCanvasId(t.id)===e);if(!t.length){let t=this._canvasManager.targets[e];this._resizeForCanvasTarget(e),this.deckRenderer?.renderLayers({...i,canvasContext:t.presentationContext,target:t.presentationContext.getCurrentFramebuffer(),viewports:[],clearCanvas:!0}),t.presentationContext.present();continue}let n=this._canvasManager.targets[e];this._resizeForCanvasTarget(e);let r=n.presentationContext.getCurrentFramebuffer();this.deckRenderer?.renderLayers({...i,canvasContext:n.presentationContext,target:r,viewports:t}),n.presentationContext.present()}else this.deckRenderer?.renderLayers(i);i.pass===`screen`&&this.widgetManager.onRedraw({viewports:i.viewports,layers:i.layers}),this.props.onAfterRender({device:n,gl:r})}_onRenderFrame(){this._getFrameStats(),this._metricsCounter++%60==0&&(this._getMetrics(),this.stats.reset(),R.table(4,this.metrics)(),this.props._onMetrics&&this.props._onMetrics(this.metrics)),this._updateCursor(),this.layerManager.updateLayers(),this._pickAndCallback(),this.redraw(),this.viewManager&&this.viewManager.updateViewStates()}_onViewStateChange(e){let t=this.props.onViewStateChange(e)||e.viewState;this.viewState&&(this.viewState={...this.viewState,[e.viewId]:t},this.props.viewState||this.viewManager&&this.viewManager.setProps({viewState:this.viewState}))}_onInteractionStateChange(e){this.cursorState.isDragging=e.isDragging||!1,this.props.onInteractionStateChange(e)}_getFrameStats(){let{stats:e}=this;e.get(`frameRate`).timeEnd(),e.get(`frameRate`).timeStart();let t=this.animationLoop.stats;e.get(`GPU Time`).addTime(t.get(`GPU Time`).lastTiming),e.get(`CPU Time`).addTime(t.get(`CPU Time`).lastTiming)}_getMetrics(){let{metrics:e,stats:t}=this;e.fps=t.get(`frameRate`).getHz(),e.setPropsTime=t.get(`setProps Time`).time,e.updateAttributesTime=t.get(`Update Attributes`).time,e.framesRedrawn=t.get(`Redraw Count`).count,e.pickTime=t.get(`pickObject Time`).time+t.get(`pickMultipleObjects Time`).time+t.get(`pickObjects Time`).time,e.pickCount=t.get(`Pick Count`).count,e.layersCount=this.layerManager?.layers.length??0,e.drawLayersCount=t.get(`Layers rendered`).lastSampleCount,e.pickLayersCount=t.get(`Layers picked`).lastSampleCount,e.updateLayersCount=t.get(`Layer updates`).count,e.updateAttributesCount=t.get(`Attributes updated`).count,e.gpuTime=t.get(`GPU Time`).time,e.cpuTime=t.get(`CPU Time`).time,e.gpuTimePerFrame=t.get(`GPU Time`).getAverageTime(),e.cpuTimePerFrame=t.get(`CPU Time`).getAverageTime();let n=ie.stats.get(`GPU Time and Memory`);e.bufferMemory=n.get(`Buffer Memory`).count,e.textureMemory=n.get(`Texture Memory`).count,e.renderbufferMemory=n.get(`Renderbuffer Memory`).count,e.gpuMemory=n.get(`GPU Memory`).count}};$d.defaultProps=Qd,$d.VERSION=ao;function ef(e){switch(e){case`float64`:return Float64Array;case`uint8`:case`unorm8`:return Uint8ClampedArray;default:return x(e)}}var tf=S.getDataType.bind(S);function nf(e,t,n){if(t.size>4)return null;let r=n===`webgpu`&&t.type===`uint8`?`unorm8`:t.type,i=t.size,a=!!(n!==`webgpu`&&i===3&&r&&[`uint8`,`sint8`,`unorm8`,`snorm8`,`uint16`,`sint16`,`unorm16`,`snorm16`].includes(r));return{attribute:e,format:i>1?`${r}x${i}${a?`-webgl`:``}`:t.type,byteOffset:t.offset||0}}function rf(e){return e.stride||e.size*e.bytesPerElement}function af(e,t){return e.type===t.type&&e.size===t.size&&rf(e)===rf(t)&&(e.offset||0)===(t.offset||0)}function of(e,t){t.offset&&R.removed(`shaderAttribute.offset`,`vertexOffset, elementOffset`)();let n=rf(e),r=t.vertexOffset===void 0?e.vertexOffset||0:t.vertexOffset,i=t.elementOffset||0,a=r*n+i*e.bytesPerElement+(e.offset||0);return{...t,offset:a,stride:n}}function sf(e,t){let n=of(e,t);return{high:n,low:{...n,offset:n.offset+e.size*4}}}var cf=class{constructor(e,t,n){this._buffer=null,this.device=e,this.id=t.id||``,this.size=t.size||1;let r=t.logicalType||t.type,i=r===`float64`,{defaultValue:a}=t;a=Number.isFinite(a)?[a]:a||Array(this.size).fill(0);let o;o=i?`float32`:!r&&t.isIndexed?`uint32`:r||`float32`;let s=ef(r||o);this.doublePrecision=i,i&&t.fp64===!1&&(s=Float32Array),this.value=null,this.settings={...t,defaultType:s,defaultValue:a,logicalType:r,type:o,normalized:o.includes(`norm`),size:this.size,bytesPerElement:s.BYTES_PER_ELEMENT},this.state={...n,externalBuffer:null,bufferAccessor:this.settings,allocatedValue:null,numInstances:0,bounds:null,constant:!1}}get isConstant(){return this.state.constant}get buffer(){return this._buffer}get byteOffset(){let e=this.getAccessor();return e.vertexOffset?e.vertexOffset*rf(e):0}get numInstances(){return this.state.numInstances}set numInstances(e){this.state.numInstances=e}get isDoublePrecisionBuffer(){return this._shouldSplitDoublePrecisionValue(this.value)}delete(){this._buffer&&=(this._buffer.delete(),null),Kl.release(this.state.allocatedValue),this.state.allocatedValue=null}getBuffer(){return this.state.constant&&this.device.type!==`webgpu`?null:this.state.externalBuffer||this._buffer}getValue(e=this.id,t=null){let n={};if(this.state.constant){let r=this.value;if(this.device.type===`webgpu`&&this._buffer)n[e]=this._buffer;else if(t){let i=of(this.getAccessor(),t),a=i.offset/r.BYTES_PER_ELEMENT,o=i.size||this.size;n[e]=r.subarray(a,a+o)}else n[e]=r}else n[e]=this.getBuffer();return this.doublePrecision&&(this.isDoublePrecisionBuffer?n[`${e}64Low`]=n[e]:n[`${e}64Low`]=new Float32Array(this.size)),n}_getBufferLayout(e=this.id,t=null){let n=this.getAccessor(),r=[],i={name:this.id,byteStride:this.device.type===`webgpu`&&this.state.constant?0:rf(n)};if(this.doublePrecision){let i=sf(n,t||{});r.push(nf(e,{...n,...i.high},this.device.type),nf(`${e}64Low`,{...n,...i.low},this.device.type))}else if(t){let i=of(n,t);r.push(nf(e,{...n,...i},this.device.type))}else r.push(nf(e,n,this.device.type));return i.attributes=r.filter(Boolean),i}setAccessor(e){this.state.bufferAccessor=e}getAccessor(){return this.state.bufferAccessor}getBounds(){if(this.state.bounds)return this.state.bounds;let e=null;if(this.state.constant&&this.value){let t=Array.from(this.value);e=[t,t]}else{let{value:t,numInstances:n,size:r}=this,i=n*r;if(t&&i&&t.length>=i){let n=Array(r).fill(1/0),a=Array(r).fill(-1/0);for(let e=0;e<i;)for(let i=0;i<r;i++){let r=t[e++];r<n[i]&&(n[i]=r),r>a[i]&&(a[i]=r)}e=[n,a]}}return this.state.bounds=e,e}setData(e){let{state:t}=this,n;n=ArrayBuffer.isView(e)?{value:e}:e instanceof y?{buffer:e}:e;let r={...this.settings,...n};if(ArrayBuffer.isView(n.value)){if(!n.type){if(this.doublePrecision&&n.value instanceof Float64Array)r.type=`float32`;else{let e=tf(n.value);r.type=r.normalized?e.replace(`int`,`norm`):e}}r.bytesPerElement=n.value.BYTES_PER_ELEMENT,r.stride=rf(r)}if(t.bounds=null,n.constant){let e=n.value;if(e=this._normalizeValue(e,[],0),this.settings.normalized&&(e=this.normalizeConstant(e)),!(!t.constant||!this._areValuesEqual(e,this.value)))return!1;t.externalBuffer=null,t.constant=!0,this.value=ArrayBuffer.isView(e)?e:new Float32Array(e)}else if(n.buffer)t.externalBuffer=n.buffer,t.constant=!1,this.value=n.value||null;else if(n.value){this._checkExternalBuffer(n);let e=n.value,i=e;t.externalBuffer=null,t.constant=!1,this.value=e,this._shouldSplitDoublePrecisionValue(i)&&(i=nu(i,r),e instanceof Float32Array&&(r.stride=r.size*2*Float32Array.BYTES_PER_ELEMENT));let{buffer:a}=this,o=rf(r),s=(r.vertexOffset||0)*o;if(this.settings.isIndexed){let e=this.settings.defaultType;i.constructor!==e&&(i=new e(i))}let c=i.byteLength+s+o*2;(!a||a.byteLength<c)&&(a=this._createBuffer(c)),a.write(i,s)}return this.setAccessor(r),!0}updateSubBuffer(e={}){this.state.bounds=null;let t=this.value,{startOffset:n=0,endOffset:r}=e,i=this._shouldSplitDoublePrecisionValue(t);this.buffer.write(i?nu(t,{size:this.size,startIndex:n,endIndex:r}):t.subarray(n,r),n*(i?8:t.BYTES_PER_ELEMENT)+this.byteOffset)}allocate(e,t=!1){let{state:n}=this,r=n.allocatedValue,i=Kl.allocate(r,e+1,{size:this.size,type:this.settings.defaultType,copy:t});this.value=i;let a=this._shouldSplitDoublePrecisionValue(i),o=a&&i instanceof Float32Array?{...this.settings,stride:this.size*2*Float32Array.BYTES_PER_ELEMENT}:this.settings;this.setAccessor(o);let{byteOffset:s}=this,{buffer:c}=this,l=i.byteLength*(a&&i instanceof Float32Array?2:1);return(!c||c.byteLength<l+s)&&(c=this._createBuffer(l+s),t&&r&&c.write(this._shouldSplitDoublePrecisionValue(r)?nu(r,this):r,s)),n.allocatedValue=i,n.constant=!1,n.externalBuffer=null,!0}_shouldSplitDoublePrecisionValue(e){return!!(this.doublePrecision&&(e instanceof Float64Array||this.device.type===`webgpu`&&e instanceof Float32Array))}_checkExternalBuffer(e){let{value:t}=e;if(!ArrayBuffer.isView(t))throw Error(`Attribute ${this.id} value is not TypedArray`);let n=this.settings.defaultType,r=!1;if(this.doublePrecision&&(r=t.BYTES_PER_ELEMENT<4),r)throw Error(`Attribute ${this.id} does not support ${t.constructor.name}`);!(t instanceof n)&&this.settings.normalized&&!(`normalized`in e)&&R.warn(`Attribute ${this.id} is normalized`)()}normalizeConstant(e){switch(this.settings.type){case`snorm8`:return new Float32Array(e).map(e=>(e+128)/255*2-1);case`snorm16`:return new Float32Array(e).map(e=>(e+32768)/65535*2-1);case`unorm8`:return new Float32Array(e).map(e=>e/255);case`unorm16`:return new Float32Array(e).map(e=>e/65535);default:return e}}_normalizeValue(e,t,n){let{defaultValue:r,size:i}=this.settings;if(Number.isFinite(e))return t[n]=e,t;if(!e){let e=i;for(;--e>=0;)t[n+e]=r[e];return t}switch(i){case 4:t[n+3]=Number.isFinite(e[3])?e[3]:r[3];case 3:t[n+2]=Number.isFinite(e[2])?e[2]:r[2];case 2:t[n+1]=Number.isFinite(e[1])?e[1]:r[1];case 1:t[n+0]=Number.isFinite(e[0])?e[0]:r[0];break;default:let a=i;for(;--a>=0;)t[n+a]=Number.isFinite(e[a])?e[a]:r[a]}return t}_areValuesEqual(e,t){if(!e||!t)return!1;let{size:n}=this;for(let r=0;r<n;r++)if(e[r]!==t[r])return!1;return!0}_createBuffer(e){this._buffer&&this._buffer.destroy();let{isIndexed:t,type:n}=this.settings,r=this.device.type===`webgpu`&&!t?y.VERTEX|y.STORAGE|y.COPY_DST|y.COPY_SRC:(t?y.INDEX:y.VERTEX)|y.COPY_DST;return this._buffer=this.device.createBuffer({...this._buffer?.props,id:this.id,usage:r,indexType:t?n:void 0,byteLength:e}),this._buffer}},lf=[],uf=[];function df(e,t=0,n=1/0){let r=lf,i={index:-1,data:e,target:[]};return e?typeof e[Symbol.iterator]==`function`?r=e:e.length>0&&(uf.length=e.length,r=uf):r=lf,(t>0||Number.isFinite(n))&&(r=(Array.isArray(r)?r:Array.from(r)).slice(t,n),i.index=t-1),{iterable:r,objectInfo:i}}function ff(e){return e&&e[Symbol.asyncIterator]}function pf(e,t){let{size:n,stride:r,offset:i,startIndices:a,nested:o}=t,s=e.BYTES_PER_ELEMENT,c=r?r/s:n,l=i?i/s:0,u=Math.floor((e.length-l)/c);return(t,{index:r,target:i})=>{if(!a){let t=r*c+l;for(let r=0;r<n;r++)i[r]=e[t+r];return i}let s=a[r],d=a[r+1]||u,f;if(o){f=Array(d-s);for(let t=s;t<d;t++){let r=t*c+l;i=Array(n);for(let t=0;t<n;t++)i[t]=e[r+t];f[t-s]=i}}else if(c===n)f=e.subarray(s*n+l,d*n+l);else{f=new e.constructor((d-s)*n);let t=0;for(let r=s;r<d;r++){let i=r*c+l;for(let r=0;r<n;r++)f[t++]=e[i+r]}}return f}}var mf=[],hf=[[0,1/0]];function gf(e,t){if(e===hf||(t[0]<0&&(t[0]=0),t[0]>=t[1]))return e;let n=[],r=e.length,i=0;for(let a=0;a<r;a++){let r=e[a];r[1]<t[0]?(n.push(r),i=a+1):r[0]>t[1]?n.push(r):t=[Math.min(r[0],t[0]),Math.max(r[1],t[1])]}return n.splice(i,0,t),n}var _f={interpolation:{duration:0,easing:e=>e},spring:{stiffness:.05,damping:.5}};function vf(e,t){if(!e)return null;Number.isFinite(e)&&(e={type:`interpolation`,duration:e});let n=e.type||`interpolation`;return{..._f[n],...t,...e,type:n}}var yf=class extends cf{constructor(e,t){super(e,t,{startIndices:null,constantValue:null,lastExternalBuffer:null,binaryValue:null,binaryAccessor:null,needsUpdate:!0,needsRedraw:!1,layoutChanged:!1,updateRanges:hf}),this.constant=!1,this.settings.update=t.update||(t.accessor?this._autoUpdater:void 0),Object.seal(this.settings),Object.seal(this.state),this._validateAttributeUpdaters()}get startIndices(){return this.state.startIndices}set startIndices(e){this.state.startIndices=e}needsUpdate(){return this.state.needsUpdate}needsRedraw({clearChangedFlags:e=!1}={}){let t=this.state.needsRedraw;return this.state.needsRedraw=t&&!e,t}layoutChanged(){return this.state.layoutChanged}setAccessor(e){var t;(t=this.state).layoutChanged||(t.layoutChanged=!af(e,this.getAccessor())),super.setAccessor(e)}getUpdateTriggers(){let{accessor:e}=this.settings;return[this.id].concat(typeof e!=`function`&&e||[])}supportsTransition(){return!!this.settings.transition}getTransitionSetting(e){if(!e||!this.supportsTransition())return null;let{accessor:t}=this.settings,n=this.settings.transition;return vf(Array.isArray(t)?e[t.find(t=>e[t])]:e[t],n)}setNeedsUpdate(e=this.id,t){if(this.state.needsUpdate=this.state.needsUpdate||e,this.setNeedsRedraw(e),t){let{startRow:e=0,endRow:n=1/0}=t;this.state.updateRanges=gf(this.state.updateRanges,[e,n])}else this.state.updateRanges=hf}clearNeedsUpdate(){this.state.needsUpdate=!1,this.state.updateRanges=mf}setNeedsRedraw(e=this.id){this.state.needsRedraw=this.state.needsRedraw||e}allocate(e){let{state:t,settings:n}=this;if(n.noAlloc)return!1;if(n.update){let n=this.isConstant;return super.allocate(e,t.updateRanges!==hf),t.layoutChanged||=n&&this.device.type===`webgpu`,!0}return!1}updateBuffer({numInstances:e,data:t,props:n,context:r}){if(!this.needsUpdate())return!1;let{state:{updateRanges:i},settings:{update:a,noAlloc:o}}=this,s=!0;if(a){for(let[o,s]of i)a.call(r,this,{data:t,startRow:o,endRow:s,props:n,numInstances:e});if(this.value){if(this.constant||!this.buffer||this.buffer.byteLength<this.value.byteLength+this.byteOffset){if(this.constant){let e=this.value;this.value=null,this.setConstantValue(r,e)}else this.setData({value:this.value,constant:this.constant});this.constant=!1}else for(let[t,n]of i){let r=Number.isFinite(t)?this.getVertexOffset(t):0,i=Number.isFinite(n)?this.getVertexOffset(n):o||!Number.isFinite(e)?this.value.length:e*this.size;super.updateSubBuffer({startOffset:r,endOffset:i})}}this._checkAttributeArray()}else s=!1;return this.clearNeedsUpdate(),this.setNeedsRedraw(),s}setConstantValue(e,t){var n;if(t===void 0||typeof t==`function`)return!1;let r=this.isConstant,i=this.settings.transform&&e?this.settings.transform.call(e,t):t,a=this.settings.defaultType;this.state.constantValue=this._normalizeValue(i,new a(this.size),0);let o=this.setData({constant:!0,value:i});if(this.device.type===`webgpu`){let e=this.state.constantValue;this.doublePrecision&&(e instanceof Float32Array||e instanceof Float64Array)&&(e=nu(e,{size:this.size}),this.setAccessor({...this.getAccessor(),stride:this.size*2*Float32Array.BYTES_PER_ELEMENT}));let t=this._buffer;(!t||t.byteLength<e.byteLength)&&(t=this._createBuffer(e.byteLength)),t.write(e),(n=this.state).layoutChanged||(n.layoutChanged=!r),this.constant=!1}return o&&this.setNeedsRedraw(),this.clearNeedsUpdate(),!0}getConstantValue(){return this.isConstant?this.state.constantValue:null}setExternalBuffer(e){let{state:t}=this;return e?(this.clearNeedsUpdate(),t.lastExternalBuffer===e||(t.lastExternalBuffer=e,this.setNeedsRedraw(),this.setData(e),!0)):(t.lastExternalBuffer=null,!1)}setBinaryValue(e,t=null){let{state:n,settings:r}=this;if(!e)return n.binaryValue=null,n.binaryAccessor=null,!1;if(r.noAlloc)return!1;if(n.binaryValue===e)return this.clearNeedsUpdate(),!0;if(n.binaryValue=e,this.setNeedsRedraw(),r.transform||t!==this.startIndices){ArrayBuffer.isView(e)&&(e={value:e});let i=e;J(ArrayBuffer.isView(i.value),`invalid ${r.accessor}`);let a=!!i.size&&i.size!==this.size;return n.binaryAccessor=pf(i.value,{size:i.size||this.size,stride:i.stride,offset:i.offset,startIndices:t,nested:a}),!1}return this.clearNeedsUpdate(),this.setData(e),!0}getVertexOffset(e){let{startIndices:t}=this;return(t?e<t.length?t[e]:this.numInstances:e)*this.size}getValue(){let e=this.settings.shaderAttributes,t=super.getValue();if(!e)return t;for(let n in e)Object.assign(t,super.getValue(n,e[n]));return t}getBufferLayout(e){this.state.layoutChanged=!1;let t=this.settings.shaderAttributes,n=super._getBufferLayout(),{stepMode:r}=this.settings;if(n.stepMode=r===`dynamic`?e?e.isInstanced?`instance`:`vertex`:`instance`:r??`vertex`,!t)return n;for(let e in t){let r=super._getBufferLayout(e,t[e]);n.attributes.push(...r.attributes)}return n}_autoUpdater(e,{data:t,startRow:n,endRow:r,props:i,numInstances:a}){let{settings:o,state:s,value:c,size:l,startIndices:u}=e,{accessor:d,transform:f}=o,p=s.binaryAccessor||(typeof d==`function`?d:i[d]);J(typeof p==`function`,`accessor "${d}" is not a function`);let m=e.getVertexOffset(n),{iterable:h,objectInfo:g}=df(t,n,r);for(let t of h){g.index++;let n=p(t,g);if(f&&(n=f.call(this,n)),u){let t=(g.index<u.length-1?u[g.index+1]:a)-u[g.index];if(n&&Array.isArray(n[0])){let t=m;for(let r of n)e._normalizeValue(r,c,t),t+=l}else n&&n.length>l?c.set(n,m):(e._normalizeValue(n,g.target,0),ku({target:c,source:g.target,start:m,count:t}));m+=t*l}else e._normalizeValue(n,c,m),m+=l}}_validateAttributeUpdaters(){let{settings:e}=this;if(!(e.noAlloc||typeof e.update==`function`))throw Error(`Attribute ${this.id} missing update or accessor`)}_checkAttributeArray(){let{value:e}=this,t=Math.min(4,this.size);if(e&&e.length>=t){let n=!0;switch(t){case 4:n&&=Number.isFinite(e[3]);case 3:n&&=Number.isFinite(e[2]);case 2:n&&=Number.isFinite(e[1]);case 1:n&&=Number.isFinite(e[0]);break;default:n=!1}if(!n)throw Error(`Illegal attribute generated for ${this.id}`)}}},bf=class e{gpuDataEvaluators;format;length;id;_gpuVector;_ownsGPUDataEvaluators;_destroyed=!1;static fromGPUVector(t){if(t.bufferLayout)throw Error(`GPUVectorEvaluator.fromGPUVector() does not accept interleaved vector "${t.name}"`);if(t.data.length===0)throw Error(`GPUVectorEvaluator.fromGPUVector() requires GPUData for "${t.name}"`);return new e({id:t.name,gpuDataEvaluators:t.data.map(e=>g.fromGPUData(e,{id:t.name})),gpuVector:t,format:t.format})}static fromGPUDataEvaluators(t,n={}){return new e({id:n.id,gpuDataEvaluators:t,format:n.format})}constructor({id:e,gpuDataEvaluators:t,gpuVector:n,format:r}){if(t.length===0)throw Error(`GPUVectorEvaluator requires at least one GPUData evaluator`);xf(t),this.id=e,this.gpuDataEvaluators=t,this.format=r??t[0].format,this.length=t.reduce((e,t)=>e+t.length,0),this._gpuVector=n,this._ownsGPUDataEvaluators=!n}get evaluated(){return!!this._gpuVector}get gpuVector(){if(!this._gpuVector)throw Error(`${this} not evaluated`);return this._gpuVector}mapGPUData(t){return e.fromGPUDataEvaluators(this.gpuDataEvaluators.map((e,n)=>t(e,n)),{id:this.id})}async evaluate(e,t={}){if(this._destroyed)throw Error(`GPUVectorEvaluator ${this} already destroyed`);if(this._gpuVector)return this._gpuVector;let n=await Promise.all(this.gpuDataEvaluators.map(n=>n.evaluate(e,t))),r=n[0],i=n.map(Sf),a=t.format??this.format??r.format;return this._gpuVector=new m({type:`data`,name:t.name??this.id??`vector`,format:a,data:i,stride:r.stride,byteStride:r.byteStride,rowByteLength:r.rowByteLength,bufferLayout:r.bufferLayout}),this._gpuVector}evaluateSync(e,t={}){if(this._destroyed)throw Error(`GPUVectorEvaluator ${this} already destroyed`);if(this._gpuVector)return this._gpuVector;let n=this.gpuDataEvaluators.map(n=>n.evaluateSync(e,t)),r=n[0],i=n.map(Sf),a=t.format??this.format??r.format;return this._gpuVector=new m({type:`data`,name:t.name??this.id??`vector`,format:a,data:i,stride:r.stride,byteStride:r.byteStride,rowByteLength:r.rowByteLength,bufferLayout:r.bufferLayout}),this._gpuVector}destroy(){if(this._ownsGPUDataEvaluators)for(let e of this.gpuDataEvaluators)e.destroy();this._gpuVector=void 0,this._destroyed=!0}toString(){return this.id??this.constructor.name}};function xf(e){let t=e[0];for(let n of e.slice(1))if(n.type!==t.type||n.size!==t.size||n.normalized!==t.normalized||n.format!==t.format)throw Error(`GPUVectorEvaluator requires matching GPUData evaluator layouts`)}function Sf(e){let[t,...n]=e.data;if(!t||n.length>0)throw Error(`GPUVectorEvaluator requires one GPUData chunk for "${e.name}"`);return t}function Cf({elementWise:e,func:t,inputs:n,output:r,outputBuffer:i}){let a=Array.isArray(n)?n:Object.values(n);for(let e of a)if(!e.value)throw Error(`${e} does not have CPU value`);let o=r.length,s=r.size,c=new r.ValueType(o*s);for(let n=0;n<o;n++){let r=a.map(e=>Y(e,n));if(e)for(let e=0;e<s;e++)c[n*s+e]=t.apply(null,r.map(t=>t[e]));else t.call(null,c.subarray(n*s,n*s+s),...r)}let l=r.ValueType.BYTES_PER_ELEMENT,u=r.offset/l,d=r.stride/l,f=s,p=c;if(u!==0||d!==f){p=new r.ValueType(u+r.byteLength/l);for(let e=0;e<o;e++){let t=e*f,n=u+e*d,r=c.subarray(t,t+s);p.set(r,n),i.write(r,n*l)}}else i.write(c);return{success:!0,value:p}}function Y(e,t){let n=e.value,r=e.size,i=e.offset/e.ValueType.BYTES_PER_ELEMENT,a=e.stride/e.ValueType.BYTES_PER_ELEMENT,o=i+(e.isConstant?0:t)*a,s=n.slice(o,o+r);if(!e.normalized)return s;let c=new Float32Array(r);for(let t=0;t<r;t++)c[t]=wf(s[t],e.type);return c}function wf(e,t){switch(t){case`uint8`:return e/255;case`uint16`:return e/65535;case`uint32`:return e/4294967295;case`sint8`:return Math.max(e/127,-1);case`sint16`:return Math.max(e/32767,-1);case`sint32`:return Math.max(e/2147483647,-1);case`float32`:return e;default:throw Error(`Unsupported normalized source type ${t}`)}}var Tf=({inputs:e,output:t,target:n})=>{for(let t of Object.values(e.namedInputs))if(!t.value)throw Error(`${t} does not have CPU value`);let r=new t.ValueType(t.length*t.size);for(let n=0;n<t.length;n++){let i=Object.fromEntries(Object.entries(e.namedInputs).map(([e,t])=>[e,Y(t,n)]));for(let a=0;a<t.size;a++)r[n*t.size+a]=Ef(e.expression,i,a)}return n.write(r),{success:!0,value:r}};function Ef(e,t,n){switch(e.kind){case`input`:{let r=t[e.name];return n<r.length?r[n]:r.length===1?r[0]:0}case`literal`:return Array.isArray(e.value)?e.value[n]??0:e.value;case`call`:{Df(e.op,e.args.length);let r=e.args.map(e=>Ef(e,t,n));switch(e.op){case`add`:return r[0]+r[1];case`subtract`:return r[0]-r[1];case`multiply`:return r[0]*r[1];case`divide`:return r[0]/r[1];case`pow`:return r[0]**+r[1];case`sqrt`:return Math.sqrt(r[0]);case`abs`:return Math.abs(r[0]);case`sin`:return Math.sin(r[0]);case`cos`:return Math.cos(r[0]);case`tan`:return Math.tan(r[0]);case`exp`:return Math.exp(r[0]);case`log`:return Math.log(r[0]);default:{let t=e.op;throw Error(`Unsupported arithmetic op ${t}`)}}}default:throw Error(`Unsupported expression node ${e.kind}`)}}function Df(e,t){let n=p[e].arity;if(t!==n)throw Error(`Arithmetic op '${e}' expects ${n} args, got ${t}`)}var Of=({inputs:e,output:t,target:n})=>{let{sourceValues:r}=e;if(!r.value)throw Error(`${r} does not have CPU value`);let i=new t.ValueType(t.length*t.size);if(r.length===0)return{success:!1,error:Error(`${r} is empty`)};for(let e=0;e<r.size;e++){let n=Y(r,0)[e],a=e*t.size,o=a+1;i[a]=n,i[o]=n;for(let t=1;t<r.length;t++){let n=Y(r,t)[e];n<i[a]&&(i[a]=n),n>i[o]&&(i[o]=n)}}return n.write(i),{success:!0,value:i}},kf=({inputs:e,output:t,target:n})=>Cf({func:(e,t)=>{let n=e.length/2,r=new Float64Array(t.buffer);for(let t=0;t<n;t++){let i=r[t];e[t]=Math.fround(i),e[t+n]=i-e[t]}return e},inputs:e,output:t,outputBuffer:n}),Af=async({inputs:e,output:t,target:n})=>{let{ids:r,sourceValues:i}=e,a=r.value,o=i.value;if(!a)throw Error(`${r} does not have CPU value`);if(!o)throw Error(`${i} does not have CPU value`);let s=new t.ValueType(t.length*t.size),c=Array(t.size).fill(0);for(let e=0;e<t.length;e++){let n=Y(r,e),a=Number(n[0]),o=jf(a,i.length)?Y(i,a):c;s.set(o,e*t.size)}return n.write(s),{success:!0,value:s}};function jf(e,t){return Number.isInteger(e)&&e>=0&&e<t}var Mf=({inputs:e,output:t,target:n})=>Cf({func:(e,...t)=>{let n=0;for(let r of t)e.set(r,n),n+=r.length},inputs:e,output:t,outputBuffer:n}),Nf=({inputs:e,output:t,target:n})=>{let{x:r,y:i}=e,a=new t.ValueType(t.length);for(let e=0;e<t.length;e++){let t=Y(r,e),n=Y(i,e),o=0;for(let e=0;e<r.size;e++)o+=t[e]*n[e];a[e]=o}return n.write(a),{success:!0,value:a}},Pf=({inputs:e,output:t,target:n})=>{let{x:r,y:i}=e,a=new t.ValueType(t.length);for(let e=0;e<t.length;e++){let t=Y(r,e),n=Y(i,e),o=1;for(let e=0;e<r.size;e++)if(t[e]!==n[e]){o=0;break}a[e]=o}return n.write(a),{success:!0,value:a}},Ff=({inputs:e,output:t,target:n})=>{let{x:r}=e,i=new t.ValueType(t.length);for(let e=0;e<t.length;e++){let t=Y(r,e),n=0;for(let e=0;e<r.size;e++)n+=t[e]*t[e];i[e]=Math.sqrt(n)}return n.write(i),{success:!0,value:i}},If=async({inputs:e,output:t,target:n})=>{let{segments:r,vertexCount:i}=e,a=r.value;if(!a)throw Error(`${r} does not have CPU value`);Lf(a,r,i);let o=new t.ValueType(t.length*t.size),s=0;for(let e=0;e<i;e++){for(;s+1<r.length&&a[Rf(r,s+1)]<=e;)s++;let n=a[Rf(r,s)],i=e*t.size;o[i]=s,o[i+1]=e-n}return n.write(o),{success:!0,value:o}};function Lf(e,t,n){if(t.length<1)throw Error(`segmentedMap segments must contain at least one segment start`);let r=0;for(let n=0;n<t.length;n++){let i=e[Rf(t,n)];if(n===0&&i!==0)throw Error(`segmentedMap segments must start at 0, got ${i}`);if(n>0&&i<r)throw Error(`segmentedMap segments must be non-decreasing, got ${i} after ${r}`);r=i}if(r>n)throw Error(`segmentedMap last segment start must be <= vertexCount, got ${r} > ${n}`)}function Rf(e,t){return e.offset/e.ValueType.BYTES_PER_ELEMENT+t*(e.stride/e.ValueType.BYTES_PER_ELEMENT)}var zf=async({inputs:e,output:t,target:n})=>{let{condition:r,whenTrue:i,whenFalse:a}=e,o=new t.ValueType(t.length*t.size);for(let e=0;e<t.length;e++){let n=Y(r,e),s=Y(i,e),c=Y(a,e);for(let l=0;l<t.size;l++){let u=Bf(n,r.size,l);o[e*t.size+l]=u===0?Bf(c,a.size,l):Bf(s,i.size,l)}}return n.write(o),{success:!0,value:o}};function Bf(e,t,n){return n<t?e[n]:t===1?e[0]:0}var Vf=({inputs:e,output:t,target:n})=>{let r=new t.ValueType(t.length);for(let n=0;n<t.length;n++)r[n]=e.start+n*e.step;return n.write(r),{success:!0,value:r}},Hf=({inputs:e,output:t,target:n})=>{let{columns:r}=e;return Cf({func:(e,t)=>{for(let n=0;n<r.length;n++)e[n]=t[r[n]]},inputs:{x:e.x},output:t,outputBuffer:n})},Uf=t({arithmetic:()=>Tf,dot:()=>Nf,equalAll:()=>Pf,extent:()=>Of,fround:()=>kf,gather:()=>Af,interleave:()=>Mf,length:()=>Ff,segmentedMap:()=>If,select:()=>zf,sequence:()=>Vf,swizzle:()=>Hf}),Wf=new class{_modules={cpu:Uf};add(e,t){let n=this._modules[e];if(typeof t.then==`function`){let r=Promise.all([Promise.resolve(n||{}),t]).then(([e,t])=>({...e,...t}));return this._modules[e]=r,r.then(t=>{this._modules[e]=t}).catch(t=>{b.error(`Failed to register ${e} backend: ${t}`)()}),r}if(n&&typeof n.then==`function`){let r=Promise.resolve(n).then(e=>({...e,...t})).then(t=>(this._modules[e]=t,t)).catch(t=>{throw b.error(`Failed to register ${e} backend: ${t}`)(),t});return this._modules[e]=r,r}let r={...n||{},...t};return this._modules[e]=r,Promise.resolve(r)}async get(e,t){let n=this._modules[e];if(!n){if(e===`webgl`)n=this.add(`webgl`,u(()=>import(`./webgl-Cdg9BZKX.js`),__vite__mapDeps([4,5,2,3,6])));else if(e===`webgpu`)n=this.add(`webgpu`,u(()=>import(`./webgpu-liUQlMhj.js`).then(e=>e.t),__vite__mapDeps([7,1,5,2])));else throw Error(`${e} backend not registered`)}let r=(await n)[t];if(typeof r!=`function`)throw Error(`${e} backend does not implement ${t}`);return r}getSync(e,t){let n=this._modules[e];if(!n)throw Error(`${e} backend not registered`);if(typeof n.then==`function`)throw Error(`${e} backend is not loaded yet`);let r=n[t];if(typeof r!=`function`)throw Error(`${e} backend does not implement ${t}`);return r}clear(){this._modules={}}},Gf=class{inputs;dependencies;constructor(e){this.inputs=e,this.dependencies=Array.from(e instanceof Array?e:Object.values(e)).filter(e=>e instanceof g)}async execute(e,t){return await this._resolveDependencies(e),await this._executeWithHandler(await Wf.get(this._getHandlerRegistry(e),this.name),t)}executeSync(e,t){this._resolveDependenciesSync(e);let n=this._executeWithHandler(Wf.getSync(this._getHandlerRegistry(e),this.name),t);if(Kf(n))throw Error(`${this.name} returned a Promise in executeSync()`);return n}shouldExecuteOnCPU(){return this.output.length<=1&&Array.from(this.dependencies).every(e=>!!e.value)}_getHandlerRegistry(e){return this.shouldExecuteOnCPU()?`cpu`:e.type}async _resolveDependencies(e){for(let t of this.dependencies)await t.evaluate(e);if(this._getHandlerRegistry(e)===`cpu`||e.type===`null`)for(let e of this.dependencies)await e.ensureCPUValue()}_resolveDependenciesSync(e){for(let t of this.dependencies)t.evaluateSync(e);if(this._getHandlerRegistry(e)===`cpu`||e.type===`null`)for(let e of this.dependencies)e.ensureCPUValueSync()}_executeWithHandler(e,t){return e({device:t.device,inputs:this.inputs,output:this.output,target:t})}};function Kf(e){return typeof e?.then==`function`}function qf(...e){let t=Jf(e.map(e=>e.type));return t[0]!==`f`&&e.some(e=>e.normalized)&&(t=`float32`),{isConstant:e.every(e=>e.isConstant),type:t,size:e.reduce((e,t)=>Math.max(e,t.size),0),length:e.reduce((e,t)=>Math.max(e,t.length),0)}}function Jf(e){let t=0,n=0;for(let r of e){if(r[0]===`f`)return`float32`;let e=r.endsWith(`8`)?8:r.endsWith(`6`)?16:32;r[0]===`u`?t=Math.max(t,e):n=Math.max(n,e)}return t&&!n?`uint${t}`:n&&t<32?`sint${Math.max(n,t*2)}`:`float32`}var Yf=class extends Gf{name=`interleave`;output;constructor(e){super(e);let{isConstant:t,type:n,length:r}=qf(...e);this.output=new g({isConstant:t,type:n,size:e.reduce((e,t)=>e+t.size,0),length:r,source:this})}toString(){return`_${this.inputs.join(`_`)}_`}};function Xf(...e){if(e.length===0)throw Error(`interleave() requires at least one input`);return e.length===1?h(e[0]):new Yf(e.map(h)).output}function Zf(e,t){let n=$f(t);for(let t of n)t.evaluateSync(e);return Qf(n),t}function Qf(e){let t=new Set(e.flatMap(rp)),n=new Set;for(let t of e)np(t,n);for(let e of n)e.evaluated&&!t.has(e.buffer)&&e.destroy()}function $f(e){let t=new Set;return ep(e,t,new Set),Array.from(t)}function ep(e,t,n){if(ip(e)){t.add(e);return}if(!(!e||typeof e!=`object`||n.has(e))){if(n.add(e),Array.isArray(e)){for(let r of e)ep(r,t,n);return}if(tp(e))for(let r of Object.values(e))ep(r,t,n)}}function tp(e){let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null}function np(e,t){if(e instanceof bf){for(let n of e.gpuDataEvaluators)np(n,t);return}let n=e.source;if(n){if(n instanceof g){t.has(n)||(t.add(n),np(n,t));return}for(let e of n.dependencies)t.has(e)||(t.add(e),np(e,t))}}function rp(e){return e instanceof g?[e.buffer]:e.gpuVector.data.map(e=>e.buffer instanceof d?e.buffer.buffer:e.buffer)}function ip(e){return e instanceof g||e instanceof bf}var ap=class{constructor(e,{id:t,isTransitionAttribute:n}){this.packedBuffers={},this.device=e,this.id=t,this.isTransitionAttribute=n,this.device.type===`webgpu`&&Wf.add(`webgpu`,{interleave:te})}hasGroups(e){return this.device.type===`webgpu`&&Object.values(e).some(e=>!!e.settings.bufferGroup)}finalize(){for(let e of Object.values(this.packedBuffers))e.packed.destroy();this.packedBuffers={}}getBufferLayouts(e,t){let n=this._getPackedGroups(e,t,{requireValues:!1,excludeAttributes:{}});return this._getBufferLayouts(e,n,t)}getBindings(e,t,n,r){let i=this._getPackedGroups(e,n,{requireValues:!0,excludeAttributes:r}),a={},o=new Set;for(let e of i.values()){let n=!this.packedBuffers[e.id]||e.attributes.some(e=>!!t[e.id]);a[e.id]=this._getPackedBuffer(e,n);for(let t of e.attributes)o.add(t.id)}return{bufferLayouts:this._getBufferLayouts(e,i,n).filter(t=>!r[t.name]&&!e[t.name]?.settings.isIndexed),buffers:a,groupedAttributeIds:o}}_getPackedGroups(e,t,{requireValues:n,excludeAttributes:r}){let i=new Map;for(let t of Object.values(e)){let e=t.settings.bufferGroup;if(!e)continue;let n=i.get(e)||[];n.push(t),i.set(e,n)}let a=new Map;for(let[e,o]of i){let i=this._getPackedGroup(e,o,t,n,r);i&&a.set(e,i)}return a}_getPackedGroup(e,t,n,r,i){if(t.length<2)return null;let a=t.map(e=>e.getBufferLayout(n)),o=a[0].stepMode,s=Math.max(1,t[0].numInstances),c=r&&t.every(e=>e.isConstant);for(let e=0;e<t.length;e++){let n=t[e],c=n.getAccessor(),l=c.size*c.bytesPerElement;if(i[n.id]||n.settings.isIndexed||n.settings.noAlloc||n.doublePrecision||this.isTransitionAttribute(n.id)||a[e].stepMode!==o||n.numInstances!==t[0].numInstances||(c.offset||0)!==0||(c.vertexOffset||0)!==0||rf(c)!==l||r&&(n.isConstant?!n.getConstantValue()||n.getConstantValue().byteLength<l:!ArrayBuffer.isView(n.value)||n.value.byteLength<s*l))return null}let l={},u=[],d=0;for(let e=0;e<t.length;e++){let n=t[e];d=op(d),l[n.id]=d;for(let t of a[e].attributes||[])u.push({...t,byteOffset:d+(t.byteOffset||0)});d+=rf(n.getAccessor())}return d=op(d),{id:e,attributes:t,byteStride:d,byteOffsets:l,rowCount:s,layout:{name:e,byteStride:c?0:d,stepMode:o,attributes:u}}}_getBufferLayouts(e,t,n){let r=[],i=new Set,a=new Set;for(let e of t.values())for(let t of e.attributes)a.add(t.id);for(let o of Object.values(e)){let e=o.settings.bufferGroup,s=e&&t.get(e);s&&a.has(o.id)?i.has(s.id)||(r.push(s.layout),i.add(s.id)):r.push(o.getBufferLayout(n))}return r}_getPackedBuffer(e,t){let n=JSON.stringify({byteStride:e.layout.byteStride,attributes:e.layout.attributes}),r=this.packedBuffers[e.id];if((!r||r.layoutKey!==n)&&(t=!0),t){r&&(r.packed.destroy(),delete this.packedBuffers[e.id]);let t=this._interleavePackedGroup(e);return this.packedBuffers[e.id]={packed:t,layoutKey:n},t.buffer}if(!r)throw Error(`Attribute buffer group ${e.id} has no packed buffer`);return r.packed.buffer}_interleavePackedGroup(e){let t=Xf(...e.attributes.map(t=>this._getInterleaveInput(e,t)));return Zf(this.device,t),t}_getInterleaveInput(e,t){let n=rf(t.getAccessor()),r=e.byteOffsets[t.id];if(sp(`${e.id}.${t.id} rowByteLength`,n),sp(`${e.id}.${t.id} groupByteOffset`,r),t.isConstant){let r=t.getConstantValue();if(!r)throw Error(`Attribute group ${e.id} is missing constant value ${t.id}`);return sp(`${e.id}.${t.id} constant byteOffset`,r.byteOffset),new g({id:t.id,type:`uint32`,size:n/4,isConstant:!0,value:new Uint32Array(r.buffer,r.byteOffset,n/Uint32Array.BYTES_PER_ELEMENT)})}let i=t.getBuffer(),a=t.byteOffset,o=t.getAccessor().stride||n;if(sp(`${e.id}.${t.id} byteOffset`,a),sp(`${e.id}.${t.id} stride`,o),!i)throw Error(`Attribute group ${e.id} cannot interleave missing buffer ${t.id}`);return new g({id:t.id,type:`uint32`,size:n/4,offset:a,stride:o,length:e.rowCount,buffer:i})}};function op(e){return Math.ceil(e/4)*4}function sp(e,t){if(t%4!=0)throw Error(`Attribute buffer groups require 32-bit alignment: ${e}=${t}`)}function cp(e){let{source:t,target:n,start:r=0,size:i,getData:a}=e,o=e.end||n.length,s=t.length,c=o-r;if(s>c){n.set(t.subarray(0,c),r);return}if(n.set(t,r),!a)return;let l=s;for(;l<c;){let e=a(l,t);for(let t=0;t<i;t++)n[r+l]=e[t]||0,l++}}function lp({source:e,target:t,size:n,getData:r,sourceStartIndices:i,targetStartIndices:a}){if(!i||!a)return cp({source:e,target:t,size:n,getData:r}),t;let o=0,s=0,c=r&&((e,t)=>r(e+s,t)),l=Math.min(i.length,a.length);for(let r=1;r<l;r++){let l=i[r]*n,u=a[r]*n;cp({source:e.subarray(o,l),target:t,start:s,end:u,size:n,getData:c}),o=l,s=u}return s<t.length&&cp({source:[],target:t,start:s,size:n,getData:c}),t}function up(e){let{device:t,settings:n,value:r}=e,i=new yf(t,n);return i.setData({value:r instanceof Float64Array?new Float64Array:new Float32Array,normalized:n.normalized}),i}function dp(e){switch(e){case 1:return`float`;case 2:return`vec2`;case 3:return`vec3`;case 4:return`vec4`;default:throw Error(`No defined attribute type for size "${e}"`)}}function fp(e){switch(e){case 1:return`float32`;case 2:return`float32x2`;case 3:return`float32x3`;case 4:return`float32x4`;default:throw Error(`invalid type size`)}}function pp(e){e.push(e.shift())}function mp(e,t){let{settings:n,value:r,size:i}=e,a=e.isDoublePrecisionBuffer?2:1,o=0,{shaderAttributes:s}=e.settings;if(s)for(let e of Object.values(s))o=Math.max(o,e.vertexOffset??0);return(n.noAlloc?r.length:(t+o)*i)*a}function hp({device:e,source:t,target:n}){return(!n||n.byteLength<t.byteLength)&&(n?.destroy(),n=e.createBuffer({byteLength:t.byteLength,usage:t.usage})),n}function gp({device:e,buffer:t,attribute:n,fromLength:r,toLength:i,fromStartIndices:a,getData:o=e=>e}){let s=n.isDoublePrecisionBuffer?2:1,c=n.size*s,l=n.byteOffset,u=n.settings.bytesPerElement<4?l/n.settings.bytesPerElement*4:l,d=n.startIndices,f=a&&d,p=n.isConstant;if(!f&&t&&r>=i)return t;let m=n.value instanceof Float64Array?Float32Array:n.value.constructor,h=p?n.value:new m(n.getBuffer().readSyncWebGL(l,i*m.BYTES_PER_ELEMENT).buffer);if(n.settings.normalized&&!p){let e=o;o=(t,r)=>n.normalizeConstant(e(t,r))}let g=p?(e,t)=>o(h,t):(e,t)=>o(h.subarray(e+l,e+l+c),t),_=t?new Float32Array(t.readSyncWebGL(u,r*4).buffer):new Float32Array,v=new Float32Array(i);return lp({source:_,target:v,sourceStartIndices:a,targetStartIndices:d,size:c,getData:g}),(!t||t.byteLength<v.byteLength+u)&&(t?.destroy(),t=e.createBuffer({byteLength:v.byteLength+u,usage:35050})),t.write(v,u),t}var _p=class{constructor({device:e,attribute:t,timeline:n}){this.buffers=[],this.currentLength=0,this.device=e,this.transition=new qu(n),this.attribute=t,this.attributeInTransition=up(t),this.currentStartIndices=t.startIndices}get inProgress(){return this.transition.inProgress}start(e,t,n=1/0){this.settings=e,this.currentStartIndices=this.attribute.startIndices,this.currentLength=mp(this.attribute,t),this.transition.start({...e,duration:n})}update(){let e=this.transition.update();return e&&this.onUpdate(),e}setBuffer(e){let{stride:t}=this.attributeInTransition.getAccessor();this.attributeInTransition.setData({buffer:e,normalized:this.attribute.settings.normalized,value:this.attributeInTransition.value,stride:t})}cancel(){this.transition.cancel()}delete(){this.cancel();for(let e of this.buffers)e.destroy();this.buffers.length=0}},vp=class extends _p{constructor({device:e,attribute:t,timeline:n}){super({device:e,attribute:t,timeline:n}),this.type=`interpolation`,this.transform=Cp(e,t)}start(e,t){let n=this.currentLength,r=this.currentStartIndices;if(super.start(e,t,e.duration),e.duration<=0){this.transition.cancel();return}let{buffers:i,attribute:a}=this;pp(i),i[0]=gp({device:this.device,buffer:i[0],attribute:a,fromLength:n,toLength:this.currentLength,fromStartIndices:r,getData:e.enter}),i[1]=hp({device:this.device,source:i[0],target:i[1]}),this.setBuffer(i[1]);let{transform:o}=this,s=o.model,c=Math.floor(this.currentLength/a.size);Sp(a)&&(c/=2),s.setVertexCount(c),a.isConstant?(s.setAttributes({aFrom:i[0]}),s.setConstantAttributes({aTo:a.value})):s.setAttributes({aFrom:i[0],aTo:a.getBuffer()}),o.transformFeedback.setBuffers({vCurrent:i[1]})}onUpdate(){let{duration:e,easing:t}=this.settings,{time:n}=this.transition,r=n/e;t&&(r=t(r));let{model:i}=this.transform,a={time:r};i.shaderInputs.setProps({interpolation:a}),this.transform.run({discard:!0})}delete(){super.delete(),this.transform.destroy()}},yp={name:`interpolation`,vs:`layout(std140) uniform interpolationUniforms {
  float time;
} interpolation;
`,uniformTypes:{time:`f32`}},bp=`#version 300 es
#define SHADER_NAME interpolation-transition-vertex-shader

in ATTRIBUTE_TYPE aFrom;
in ATTRIBUTE_TYPE aTo;
out ATTRIBUTE_TYPE vCurrent;

void main(void) {
  vCurrent = mix(aFrom, aTo, interpolation.time);
  gl_Position = vec4(0.0);
}
`,xp=`#version 300 es
#define SHADER_NAME interpolation-transition-vertex-shader

in ATTRIBUTE_TYPE aFrom;
in ATTRIBUTE_TYPE aFrom64Low;
in ATTRIBUTE_TYPE aTo;
in ATTRIBUTE_TYPE aTo64Low;
out ATTRIBUTE_TYPE vCurrent;
out ATTRIBUTE_TYPE vCurrent64Low;

vec2 mix_fp64(vec2 a, vec2 b, float x) {
  vec2 range = sub_fp64(b, a);
  return sum_fp64(a, mul_fp64(range, vec2(x, 0.0)));
}

void main(void) {
  for (int i=0; i<ATTRIBUTE_SIZE; i++) {
    vec2 value = mix_fp64(vec2(aFrom[i], aFrom64Low[i]), vec2(aTo[i], aTo64Low[i]), interpolation.time);
    vCurrent[i] = value.x;
    vCurrent64Low[i] = value.y;
  }
  gl_Position = vec4(0.0);
}
`;function Sp(e){return e.isDoublePrecisionBuffer}function Cp(e,t){let n=t.size,r=dp(n),i=fp(n),a=t.getBufferLayout();return Sp(t)?new ee(e,{vs:xp,bufferLayout:[{name:`aFrom`,byteStride:8*n,attributes:[{attribute:`aFrom`,format:i,byteOffset:0},{attribute:`aFrom64Low`,format:i,byteOffset:4*n}]},{name:`aTo`,byteStride:8*n,attributes:[{attribute:`aTo`,format:i,byteOffset:0},{attribute:`aTo64Low`,format:i,byteOffset:4*n}]}],modules:[It,yp],defines:{ATTRIBUTE_TYPE:r,ATTRIBUTE_SIZE:n},moduleSettings:{},varyings:[`vCurrent`,`vCurrent64Low`],bufferMode:35980,disableWarnings:!0}):new ee(e,{vs:bp,bufferLayout:[{name:`aFrom`,format:i},{name:`aTo`,format:a.attributes[0].format}],modules:[yp],defines:{ATTRIBUTE_TYPE:r},varyings:[`vCurrent`],disableWarnings:!0})}var wp=class extends _p{constructor({device:e,attribute:t,timeline:n}){super({device:e,attribute:t,timeline:n}),this.type=`spring`,this.texture=kp(e),this.framebuffer=Ap(e,this.texture),this.transform=Op(e,t)}start(e,t){let n=this.currentLength,r=this.currentStartIndices;super.start(e,t);let{buffers:i,attribute:a}=this;for(let t=0;t<2;t++)i[t]=gp({device:this.device,buffer:i[t],attribute:a,fromLength:n,toLength:this.currentLength,fromStartIndices:r,getData:e.enter});i[2]=hp({device:this.device,source:i[0],target:i[2]}),this.setBuffer(i[1]);let{model:o}=this.transform;o.setVertexCount(Math.floor(this.currentLength/a.size)),a.isConstant?o.setConstantAttributes({aTo:a.value}):o.setAttributes({aTo:a.getBuffer()})}onUpdate(){let{buffers:e,transform:t,framebuffer:n,transition:r}=this,i=this.settings;t.model.setAttributes({aPrev:e[0],aCur:e[1]}),t.transformFeedback.setBuffers({vNext:e[2]});let a={stiffness:i.stiffness,damping:i.damping};t.model.shaderInputs.setProps({spring:a}),t.run({framebuffer:n,discard:!1,parameters:{viewport:[0,0,1,1]},clearColor:[0,0,0,0]}),pp(e),this.setBuffer(e[1]),this.device.readPixelsToArrayWebGL(n)[0]>0||r.end()}delete(){super.delete(),this.transform.destroy(),this.texture.destroy(),this.framebuffer.destroy()}},Tp={name:`spring`,vs:`layout(std140) uniform springUniforms {
  float damping;
  float stiffness;
} spring;
`,uniformTypes:{damping:`f32`,stiffness:`f32`}},Ep=`#version 300 es
#define SHADER_NAME spring-transition-vertex-shader

#define EPSILON 0.00001

in ATTRIBUTE_TYPE aPrev;
in ATTRIBUTE_TYPE aCur;
in ATTRIBUTE_TYPE aTo;
out ATTRIBUTE_TYPE vNext;
out float vIsTransitioningFlag;

ATTRIBUTE_TYPE getNextValue(ATTRIBUTE_TYPE cur, ATTRIBUTE_TYPE prev, ATTRIBUTE_TYPE dest) {
  ATTRIBUTE_TYPE velocity = cur - prev;
  ATTRIBUTE_TYPE delta = dest - cur;
  ATTRIBUTE_TYPE force = delta * spring.stiffness;
  ATTRIBUTE_TYPE resistance = velocity * spring.damping;
  return force - resistance + velocity + cur;
}

void main(void) {
  bool isTransitioning = length(aCur - aPrev) > EPSILON || length(aTo - aCur) > EPSILON;
  vIsTransitioningFlag = isTransitioning ? 1.0 : 0.0;

  vNext = getNextValue(aCur, aPrev, aTo);
  gl_Position = vec4(0, 0, 0, 1);
  gl_PointSize = 100.0;
}
`,Dp=`#version 300 es
#define SHADER_NAME spring-transition-is-transitioning-fragment-shader

in float vIsTransitioningFlag;

out vec4 fragColor;

void main(void) {
  if (vIsTransitioningFlag == 0.0) {
    discard;
  }
  fragColor = vec4(1.0);
}`;function Op(e,t){let n=dp(t.size),r=fp(t.size);return new ee(e,{vs:Ep,fs:Dp,bufferLayout:[{name:`aPrev`,format:r},{name:`aCur`,format:r},{name:`aTo`,format:t.getBufferLayout().attributes[0].format}],varyings:[`vNext`],modules:[Tp],defines:{ATTRIBUTE_TYPE:n},parameters:{depthCompare:`always`,blendColorOperation:`max`,blendColorSrcFactor:`one`,blendColorDstFactor:`one`,blendAlphaOperation:`max`,blendAlphaSrcFactor:`one`,blendAlphaDstFactor:`one`}})}function kp(e){return e.createTexture({data:new Uint8Array(4),format:`rgba8unorm`,width:1,height:1})}function Ap(e,t){return e.createFramebuffer({id:`spring-transition-is-transitioning-framebuffer`,width:1,height:1,colorAttachments:[t]})}var jp={interpolation:vp,spring:wp},Mp=class{constructor(e,{id:t,timeline:n}){if(!e)throw Error(`AttributeTransitionManager is constructed without device`);this.id=t,this.device=e,this.timeline=n,this.transitions={},this.needsRedraw=!1,this.numInstances=1}finalize(){for(let e in this.transitions)this._removeTransition(e)}update({attributes:e,transitions:t,numInstances:n}){this.numInstances=n||1;for(let n in e){let r=e[n],i=r.getTransitionSetting(t);i&&this._updateAttribute(n,r,i)}for(let n in this.transitions){let r=e[n];(!r||!r.getTransitionSetting(t))&&this._removeTransition(n)}}hasAttribute(e){let t=this.transitions[e];return t&&t.inProgress}getAttributes(){let e={};for(let t in this.transitions){let n=this.transitions[t];n.inProgress&&(e[t]=n.attributeInTransition)}return e}run(){if(this.numInstances===0)return!1;for(let e in this.transitions)this.transitions[e].update()&&(this.needsRedraw=!0);let e=this.needsRedraw;return this.needsRedraw=!1,e}_removeTransition(e){this.transitions[e].delete(),delete this.transitions[e]}_updateAttribute(e,t,n){let r=this.transitions[e],i=!r||r.type!==n.type;if(i){r&&this._removeTransition(e);let a=jp[n.type];a?this.transitions[e]=new a({attribute:t,timeline:this.timeline,device:this.device}):(R.error(`unsupported transition type '${n.type}'`)(),i=!1)}(i||t.needsRedraw())&&(this.needsRedraw=!0,this.transitions[e].start(n,this.numInstances))}},Np=`attributeManager.invalidate`,Pp=`attributeManager.updateStart`,Fp=`attributeManager.updateEnd`,Ip=`attribute.updateStart`,Lp=`attribute.allocate`,Rp=`attribute.updateEnd`,zp=class{constructor(e,{id:t=`attribute-manager`,stats:n,timeline:r}={}){this.mergeBoundsMemoized=oc(ru),this.id=t,this.device=e,this.attributes={},this.updateTriggers={},this.needsRedraw=!0,this.userData={},this.stats=n,this.attributeTransitionManager=new Mp(e,{id:`${t}-transitions`,timeline:r}),this.attributeBufferGroups=e.type===`webgpu`?new ap(e,{id:t,isTransitionAttribute:e=>this.attributeTransitionManager.hasAttribute(e)}):null,Object.seal(this)}finalize(){this.attributeBufferGroups?.finalize();for(let e in this.attributes)this.attributes[e].delete();this.attributeTransitionManager.finalize()}getNeedsRedraw(e={clearRedrawFlags:!1}){let t=this.needsRedraw;return this.needsRedraw=this.needsRedraw&&!e.clearRedrawFlags,t&&this.id}setNeedsRedraw(){this.needsRedraw=!0}add(e){this._add(e)}addInstanced(e){this._add(e,{stepMode:`instance`})}remove(e){for(let t of e)this.attributes[t]!==void 0&&(this.attributes[t].delete(),delete this.attributes[t])}invalidate(e,t){let n=this._invalidateTrigger(e,t);z(Np,this,e,n)}invalidateAll(e){for(let t in this.attributes)this.attributes[t].setNeedsUpdate(t,e);z(Np,this,`all`)}update({data:e,numInstances:t,startIndices:n=null,transitions:r,props:i={},buffers:a={},context:o={}}){let s=!1;z(Pp,this),this.stats&&this.stats.get(`Update Attributes`).timeStart();for(let r in this.attributes){let c=this.attributes[r],l=c.settings.accessor;c.startIndices=n,c.numInstances=t,i[r]&&R.removed(`props.${r}`,`data.attributes.${r}`)(),c.setExternalBuffer(a[r])||c.setBinaryValue(typeof l==`string`?a[l]:void 0,e.startIndices)||typeof l==`string`&&!a[l]&&c.setConstantValue(o,i[l])||c.needsUpdate()&&(s=!0,this._updateAttribute({attribute:c,numInstances:t,data:e,props:i,context:o})),this.needsRedraw=this.needsRedraw||c.needsRedraw()}s&&z(Fp,this,t),this.stats&&(this.stats.get(`Update Attributes`).timeEnd(),s&&this.stats.get(`Attributes updated`).incrementCount()),this.attributeTransitionManager.update({attributes:this.attributes,numInstances:t,transitions:r})}updateTransition(){let{attributeTransitionManager:e}=this,t=e.run();return this.needsRedraw=this.needsRedraw||t,t}getAttributes(){return{...this.attributes,...this.attributeTransitionManager.getAttributes()}}getBounds(e){let t=e.map(e=>this.attributes[e]?.getBounds());return this.mergeBoundsMemoized(t)}getChangedAttributes(e={clearChangedFlags:!1}){let{attributes:t,attributeTransitionManager:n}=this,r={...n.getAttributes()};for(let i in t){let a=t[i];a.needsRedraw(e)&&!n.hasAttribute(i)&&(r[i]=a)}return r}getBufferLayouts(e){return this.hasBufferGroups()?this.attributeBufferGroups.getBufferLayouts(this.getAttributes(),e):Object.values(this.getAttributes()).map(t=>t.getBufferLayout(e))}hasBufferGroups(){return!!this.attributeBufferGroups?.hasGroups(this.attributes)}getBufferGroupBindings(e,t,n={}){return this.attributeBufferGroups?this.attributeBufferGroups.getBindings(this.getAttributes(),e,t,n):{bufferLayouts:this.getBufferLayouts(t),buffers:{},groupedAttributeIds:new Set}}_add(e,t){for(let n in e){let r=e[n],i={...r,id:n,size:r.isIndexed&&1||r.size||1,...t};this.attributes[n]=new yf(this.device,i)}this._mapUpdateTriggersToAttributes()}_mapUpdateTriggersToAttributes(){let e={};for(let t in this.attributes)this.attributes[t].getUpdateTriggers().forEach(n=>{e[n]||(e[n]=[]),e[n].push(t)});this.updateTriggers=e}_invalidateTrigger(e,t){let{attributes:n,updateTriggers:r}=this,i=r[e];return i&&i.forEach(e=>{let r=n[e];r&&r.setNeedsUpdate(r.id,t)}),i}_updateAttribute(e){let{attribute:t,numInstances:n}=e;if(z(Ip,t),t.constant){t.setConstantValue(e.context,t.value);return}t.allocate(n)&&z(Lp,t,n),t.updateBuffer(e)&&(this.needsRedraw=!0,z(Rp,t,n))}},Bp=class extends qu{get value(){return this._value}_onUpdate(){let{time:e,settings:{fromValue:t,toValue:n,duration:r,easing:i}}=this,a=i(e/r);this._value=de(t,n,a)}},Vp=1e-5;function Hp(e,t,n,r,i){let a=t-e;return(n-t)*i+-a*r+a+t}function Up(e,t,n,r,i){if(Array.isArray(n)){let a=[];for(let o=0;o<n.length;o++)a[o]=Hp(e[o],t[o],n[o],r,i);return a}return Hp(e,t,n,r,i)}function Wp(e,t){if(Array.isArray(e)){let n=0;for(let r=0;r<e.length;r++){let i=e[r]-t[r];n+=i*i}return Math.sqrt(n)}return Math.abs(e-t)}var Gp={interpolation:Bp,spring:class extends qu{get value(){return this._currValue}_onUpdate(){let{fromValue:e,toValue:t,damping:n,stiffness:r}=this.settings,{_prevValue:i=e,_currValue:a=e}=this,o=Up(i,a,t,n,r),s=Wp(o,t),c=Wp(o,a);s<Vp&&c<Vp&&(o=t,this.end()),this._prevValue=a,this._currValue=o}}},Kp=class{constructor(e){this.transitions=new Map,this.timeline=e}get active(){return this.transitions.size>0}add(e,t,n,r){let{transitions:i}=this;if(i.has(e)){let n=i.get(e),{value:r=n.settings.fromValue}=n;t=r,this.remove(e)}if(r=vf(r),!r)return;let a=Gp[r.type];if(!a){R.error(`unsupported transition type '${r.type}'`)();return}let o=new a(this.timeline);o.start({...r,fromValue:t,toValue:n}),i.set(e,o)}remove(e){let{transitions:t}=this;t.has(e)&&(t.get(e).cancel(),t.delete(e))}update(){let e={};for(let[t,n]of this.transitions)n.update(),e[t]=n.value,n.inProgress||this.remove(t);return e}clear(){for(let e of this.transitions.keys())this.remove(e)}};function qp(e){let t=e[Su];for(let n in t){let r=t[n],{validate:i}=r;if(i&&!i(e[n],r))throw Error(`Invalid prop ${n}: ${e[n]}`)}}function Jp(e,t){let n=Xp({newProps:e,oldProps:t,propTypes:e[Su],ignoreProps:{data:null,updateTriggers:null,extensions:null,transitions:null}}),r=Qp(e,t),i=!1;return r||(i=$p(e,t)),{dataChanged:r,propsChanged:n,updateTriggersChanged:i,extensionsChanged:em(e,t),transitionsChanged:Yp(e,t)}}function Yp(e,t){if(!e.transitions)return!1;let n={},r=e[Su],i=!1;for(let a in e.transitions){let o=r[a],s=o&&o.type;(s===`number`||s===`color`||s===`array`)&&Zp(e[a],t[a],o)&&(n[a]=!0,i=!0)}return i?n:!1}function Xp({newProps:e,oldProps:t,ignoreProps:n={},propTypes:r={},triggerName:i=`props`}){if(t===e)return!1;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return`${i} changed shallowly`;for(let a of Object.keys(e))if(!(a in n)){if(!(a in t))return`${i}.${a} added`;let n=Zp(e[a],t[a],r[a]);if(n)return`${i}.${a} ${n}`}for(let a of Object.keys(t))if(!(a in n)){if(!(a in e))return`${i}.${a} dropped`;if(!Object.hasOwnProperty.call(e,a)){let n=Zp(e[a],t[a],r[a]);if(n)return`${i}.${a} ${n}`}}return!1}function Zp(e,t,n){let r=n&&n.equal;return r&&!r(e,t,n)||!r&&(r=e&&t&&e.equals,r&&!r.call(e,t))?`changed deeply`:!r&&t!==e?`changed shallowly`:null}function Qp(e,t){if(t===null)return`oldProps is null, initial diff`;let n=!1,{dataComparator:r,_dataDiff:i}=e;return r?r(e.data,t.data)||(n=`Data comparator detected a change`):e.data!==t.data&&(n=`A new data container was supplied`),n&&i&&(n=i(e.data,t.data)||n),n}function $p(e,t){if(t===null||`all`in e.updateTriggers&&tm(e,t,`all`))return{all:!0};let n={},r=!1;for(let i in e.updateTriggers)i!==`all`&&tm(e,t,i)&&(n[i]=!0,r=!0);return r?n:!1}function em(e,t){if(t===null)return!0;let n=t.extensions,{extensions:r}=e;if(r===n)return!1;if(!n||!r||r.length!==n.length)return!0;for(let e=0;e<r.length;e++)if(!r[e].equals(n[e]))return!0;return!1}function tm(e,t,n){let r=e.updateTriggers[n];r??={};let i=t.updateTriggers[n];return i??={},Xp({oldProps:i,newProps:r,triggerName:n})}var nm=`count(): argument not an object`,rm=`count(): argument not a container`;function im(e){if(!om(e))throw Error(nm);if(typeof e.count==`function`)return e.count();if(Number.isFinite(e.size))return e.size;if(Number.isFinite(e.length))return e.length;if(am(e))return Object.keys(e).length;throw Error(rm)}function am(e){return typeof e==`object`&&!!e&&e.constructor===Object}function om(e){return typeof e==`object`&&!!e}function sm(e,t){if(!t)return e;let n={...e,...t};if(`defines`in t&&(n.defines={...e.defines,...t.defines}),`modules`in t&&(n.modules=(e.modules||[]).concat(t.modules),t.modules.some(e=>e.name===`project64`))){let e=n.modules.findIndex(e=>e.name===`project32`);e>=0&&n.modules.splice(e,1)}if(`inject`in t){if(!e.inject)n.inject=t.inject;else{let r={...e.inject};for(let e in t.inject)r[e]=(r[e]||``)+t.inject[e];n.inject=r}}return n}var cm={minFilter:`linear`,mipmapFilter:`linear`,magFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`},lm={};function um(e,t,n,r){if(n instanceof j)return n;n.constructor&&n.constructor.name!==`Object`&&(n={data:n});let i=null;n.compressed&&(i={minFilter:`linear`,mipmapFilter:n.data.length>1?`nearest`:`linear`});let{width:a,height:o}=n.data,s=t.createTexture({...n,sampler:{...cm,...i,...r},mipLevels:t.getMipLevelCount(a,o)});return t.type===`webgl`?s.generateMipmapsWebGL():t.type===`webgpu`&&t.generateMipmapsWebGPU(s),lm[s.id]=e,s}function dm(e,t){!t||!(t instanceof j)||lm[t.id]===e&&(t.delete(),delete lm[t.id])}var fm={boolean:{validate(e,t){return!0},equal(e,t,n){return!!e==!!t}},number:{validate(e,t){return Number.isFinite(e)&&(!(`max`in t)||e<=t.max)&&(!(`min`in t)||e>=t.min)}},color:{validate(e,t){return t.optional&&!e||gm(e)&&(e.length===3||e.length===4)},equal(e,t,n){return G(e,t,1)}},accessor:{validate(e,t){let n=_m(e);return n===`function`||n===_m(t.value)},equal(e,t,n){return typeof t==`function`||G(e,t,1)}},array:{validate(e,t){return t.optional&&!e||gm(e)},equal(e,t,n){let{compare:r}=n;return r?G(e,t,Number.isInteger(r)?r:+!!r):e===t}},object:{equal(e,t,n){if(n.ignore)return!0;let{compare:r}=n;return r?G(e,t,Number.isInteger(r)?r:+!!r):e===t}},function:{validate(e,t){return t.optional&&!e||typeof e==`function`},equal(e,t,n){return!n.compare&&n.ignore!==!1||e===t}},data:{transform:(e,t,n)=>{if(!e)return e;let{dataTransform:r}=n.props;return r?r(e):typeof e.shape==`string`&&e.shape.endsWith(`-table`)&&Array.isArray(e.data)?e.data:e}},image:{transform:(e,t,n)=>{let r=n.context;return!r||!r.device?null:um(n.id,r.device,e,{...t.parameters,...n.props.textureParameters})},release:(e,t,n)=>{dm(n.id,e)}}};function pm(e){let t={},n={},r={};for(let[i,a]of Object.entries(e)){let e=a?.deprecatedFor;if(e)r[i]=Array.isArray(e)?e:[e];else{let e=mm(i,a);t[i]=e,n[i]=e.value}}return{propTypes:t,defaultProps:n,deprecatedProps:r}}function mm(e,t){switch(_m(t)){case`object`:return hm(e,t);case`array`:return hm(e,{type:`array`,value:t,compare:!1});case`boolean`:return hm(e,{type:`boolean`,value:t});case`number`:return hm(e,{type:`number`,value:t});case`function`:return hm(e,{type:`function`,value:t,compare:!0});default:return{name:e,type:`unknown`,value:t}}}function hm(e,t){return`type`in t?{name:e,...fm[t.type],...t}:`value`in t?{name:e,type:_m(t.value),...t}:{name:e,type:`object`,value:t}}function gm(e){return Array.isArray(e)||ArrayBuffer.isView(e)}function _m(e){return gm(e)?`array`:e===null?`null`:typeof e}function vm(e,t){let n;for(let e=t.length-1;e>=0;e--){let r=t[e];`extensions`in r&&(n=r.extensions)}let r=bm(e.constructor,n),i=Object.create(r);i[xu]=e,i[Tu]={},i[Eu]={};for(let e=0;e<t.length;++e){let n=t[e];for(let e in n)i[e]=n[e]}return Object.freeze(i),i}var ym=`_mergedDefaultProps`;function bm(e,t){if(!(e instanceof Am.constructor))return{};let n=ym;if(t)for(let e of t){let t=e.constructor;t&&(n+=`:${t.extensionName||t.name}`)}return Dm(e,n)||(e[n]=xm(e,t||[]))}function xm(e,t){if(!e.prototype)return null;let n=bm(Object.getPrototypeOf(e)),r=pm(Dm(e,`defaultProps`)||{}),i=Object.assign(Object.create(null),n,r.defaultProps),a=Object.assign(Object.create(null),n?.[Su],r.propTypes),o=Object.assign(Object.create(null),n?.[Cu],r.deprecatedProps);for(let e of t){let t=bm(e.constructor);t&&(Object.assign(i,t),Object.assign(a,t[Su]),Object.assign(o,t[Cu]))}return Sm(i,e),wm(i,a),Cm(i,o),i[Su]=a,i[Cu]=o,t.length===0&&!Em(e,`_propTypes`)&&(e._propTypes=a),i}function Sm(e,t){let n=Om(t);Object.defineProperties(e,{id:{writable:!0,value:n}})}function Cm(e,t){for(let n in t)Object.defineProperty(e,n,{enumerable:!1,set(e){let r=`${this.id}: ${n}`;for(let r of t[n])Em(this,r)||(this[r]=e);R.deprecated(r,t[n].join(`/`))()}})}function wm(e,t){let n={},r={};for(let e in t){let i=t[e],{name:a,value:o}=i;i.async&&(n[a]=o,r[a]=Tm(a))}e[wu]=n,e[Tu]={},Object.defineProperties(e,r)}function Tm(e){return{enumerable:!0,set(t){typeof t==`string`||t instanceof Promise||ff(t)?this[Tu][e]=t:this[Eu][e]=t},get(){if(this[Eu]){if(e in this[Eu])return this[Eu][e]||this[wu][e];if(e in this[Tu]){let t=this[xu]&&this[xu].internalState;if(t&&t.hasAsyncProp(e))return t.getAsyncProp(e)||this[wu][e]}}return this[wu][e]}}}function Em(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function Dm(e,t){return Em(e,t)&&e[t]}function Om(e){let t=e.componentName;return t||R.warn(`${e.name}.componentName not specified`)(),t||e.name}var km=0,Am=class{constructor(...e){this.props=vm(this,e),this.id=this.props.id,this.count=km++}clone(e){let{props:t}=this,n={};for(let e in t[wu])e in t[Eu]?n[e]=t[Eu][e]:e in t[Tu]&&(n[e]=t[Tu][e]);return new this.constructor({...t,...n,...e})}};Am.componentName=`Component`,Am.defaultProps={};var jm=Object.freeze({}),Mm=class{constructor(e){this.component=e,this.asyncProps={},this.onAsyncPropUpdated=()=>{},this.oldProps=null,this.oldAsyncProps=null}finalize(){for(let e in this.asyncProps){let t=this.asyncProps[e];t&&t.type&&t.type.release&&t.type.release(t.resolvedValue,t.type,this.component)}this.asyncProps={},this.component=null,this.resetOldProps()}getOldProps(){return this.oldAsyncProps||this.oldProps||jm}resetOldProps(){this.oldAsyncProps=null,this.oldProps=this.component?this.component.props:null}hasAsyncProp(e){return e in this.asyncProps}getAsyncProp(e){let t=this.asyncProps[e];return t&&t.resolvedValue}isAsyncPropLoading(e){if(e){let t=this.asyncProps[e];return!!(t&&t.pendingLoadCount>0&&t.pendingLoadCount!==t.resolvedLoadCount)}for(let e in this.asyncProps)if(this.isAsyncPropLoading(e))return!0;return!1}reloadAsyncProp(e,t){this._watchPromise(e,Promise.resolve(t))}setAsyncProps(e){this.component=e[xu]||this.component;let t=e[Eu]||{},n=e[Tu]||e,r=e[wu]||{};for(let e in t){let n=t[e];this._createAsyncPropData(e,r[e]),this._updateAsyncProp(e,n),t[e]=this.getAsyncProp(e)}for(let e in n){let t=n[e];this._createAsyncPropData(e,r[e]),this._updateAsyncProp(e,t)}}_fetch(e,t){return null}_onResolve(e,t){}_onError(e,t){}_updateAsyncProp(e,t){if(this._didAsyncInputValueChange(e,t)){if(typeof t==`string`&&(t=this._fetch(e,t)),t instanceof Promise){this._watchPromise(e,t);return}if(ff(t)){this._resolveAsyncIterable(e,t);return}this._setPropValue(e,t)}}_freezeAsyncOldProps(){if(!this.oldAsyncProps&&this.oldProps){this.oldAsyncProps=Object.create(this.oldProps);for(let e in this.asyncProps)Object.defineProperty(this.oldAsyncProps,e,{enumerable:!0,value:this.oldProps[e]})}}_didAsyncInputValueChange(e,t){let n=this.asyncProps[e];return t===n.resolvedValue||t===n.lastValue?!1:(n.lastValue=t,!0)}_setPropValue(e,t){this._freezeAsyncOldProps();let n=this.asyncProps[e];n&&(t=this._postProcessValue(n,t),n.resolvedValue=t,n.pendingLoadCount++,n.resolvedLoadCount=n.pendingLoadCount)}_setAsyncPropValue(e,t,n){let r=this.asyncProps[e];r&&n>=r.resolvedLoadCount&&t!==void 0&&(this._freezeAsyncOldProps(),r.resolvedValue=t,r.resolvedLoadCount=n,this.onAsyncPropUpdated(e,t))}_watchPromise(e,t){let n=this.asyncProps[e];if(n){n.pendingLoadCount++;let r=n.pendingLoadCount;t.then(t=>{this.component&&(t=this._postProcessValue(n,t),this._setAsyncPropValue(e,t,r),this._onResolve(e,t))}).catch(t=>{this._onError(e,t)})}}async _resolveAsyncIterable(e,t){if(e!==`data`){this._setPropValue(e,t);return}let n=this.asyncProps[e];if(!n)return;n.pendingLoadCount++;let r=n.pendingLoadCount,i=[],a=0;for await(let n of t){if(!this.component)return;let{dataTransform:t}=this.component.props;i=t?t(n,i):i.concat(n),Object.defineProperty(i,"__diff",{enumerable:!1,value:[{startRow:a,endRow:i.length}]}),a=i.length,this._setAsyncPropValue(e,i,r)}this._onResolve(e,i)}_postProcessValue(e,t){let n=e.type;return n&&this.component&&(n.release&&n.release(e.resolvedValue,n,this.component),n.transform)?n.transform(t,n,this.component):t}_createAsyncPropData(e,t){if(!this.asyncProps[e]){let n=this.component&&this.component.props[Su];this.asyncProps[e]={type:n&&n[e],lastValue:null,resolvedValue:t,pendingLoadCount:0,resolvedLoadCount:0}}}},Nm=class extends Mm{constructor({attributeManager:e,layer:t}){super(t),this.attributeManager=e,this.needsRedraw=!0,this.needsUpdate=!0,this.subLayers=null,this.usesPickingColorCache=!1,this.disabledPickingIndices=[]}get layer(){return this.component}_fetch(e,t){let n=this.layer,r=n?.props.fetch;return r?r(t,{propName:e,layer:n}):super._fetch(e,t)}_onResolve(e,t){let n=this.layer;if(n){let r=n.props.onDataLoad;e===`data`&&r&&r(t,{propName:e,layer:n})}}_onError(e,t){let n=this.layer;n&&n.raiseError(t,`loading ${e} of ${this.layer}`)}},Pm=`layer.changeFlag`,Fm=`layer.initialize`,Im=`layer.update`,Lm=`layer.finalize`,Rm=`layer.matched`,zm=2**24-1,Bm=Object.freeze([]),Vm=oc(({oldViewport:e,viewport:t})=>e.equals(t)),X=new Uint8ClampedArray;function Hm(e){return e.rowIndexes||e.pickingColors||e.instancePickingColors}function Um(e){return e.rowIndexes}function Wm(e){return e.pickingColors||e.instancePickingColors}var Gm={data:{type:`data`,value:Bm,async:!0},dataComparator:{type:`function`,value:null,optional:!0},_dataDiff:{type:`function`,value:e=>e&&e.__diff,optional:!0},dataTransform:{type:`function`,value:null,optional:!0},onDataLoad:{type:`function`,value:null,optional:!0},onError:{type:`function`,value:null,optional:!0},fetch:{type:`function`,value:(e,{propName:t,layer:n,loaders:r,loadOptions:i,signal:a})=>{let{resourceManager:o}=n.context;i||=n.getLoadOptions(),r||=n.props.loaders,a&&(i={...i,core:{...i?.core,fetch:{...i?.core?.fetch,signal:a}}});let s=o.contains(e);return!s&&!i&&(o.add({resourceId:e,data:pa(e,r),persistent:!1}),s=!0),s?o.subscribe({resourceId:e,onChange:e=>n.internalState?.reloadAsyncProp(t,e),consumerId:n.id,requestId:t}):pa(e,r,i)}},updateTriggers:{},visible:!0,pickable:!1,opacity:{type:`number`,min:0,max:1,value:1},operation:`draw`,onHover:{type:`function`,value:null,optional:!0},onClick:{type:`function`,value:null,optional:!0},onDragStart:{type:`function`,value:null,optional:!0},onDrag:{type:`function`,value:null,optional:!0},onDragEnd:{type:`function`,value:null,optional:!0},coordinateSystem:`default`,coordinateOrigin:{type:`array`,value:[0,0,0],compare:!0},modelMatrix:{type:`array`,value:null,compare:!0,optional:!0},wrapLongitude:!1,positionFormat:`XYZ`,colorFormat:`RGBA`,parameters:{type:`object`,value:{},optional:!0,compare:2},loadOptions:{type:`object`,value:null,optional:!0,ignore:!0},transitions:null,extensions:[],loaders:{type:`array`,value:[],optional:!0,ignore:!0},getPolygonOffset:{type:`function`,value:({layerIndex:e})=>[0,-e*100]},highlightedObjectIndex:null,autoHighlight:!1,highlightColor:{type:`accessor`,value:[0,0,128,128]}},Km=class extends Am{constructor(){super(...arguments),this.internalState=null,this.lifecycle=bu.NO_STATE,this.parent=null}static get componentName(){return Object.prototype.hasOwnProperty.call(this,`layerName`)?this.layerName:``}get root(){let e=this;for(;e.parent;)e=e.parent;return e}toString(){return`${this.constructor.layerName||this.constructor.name}({id: '${this.props.id}'})`}project(e){J(this.internalState);let t=this.internalState.viewport||this.context.viewport,[n,r,i]=Yc(mu(e,{viewport:t,modelMatrix:this.props.modelMatrix,coordinateOrigin:this.props.coordinateOrigin,coordinateSystem:this.props.coordinateSystem}),t.pixelProjectionMatrix);return e.length===2?[n,r]:[n,r,i]}unproject(e){return J(this.internalState),(this.internalState.viewport||this.context.viewport).unproject(e)}projectPosition(e,t){return J(this.internalState),hu(e,{viewport:this.internalState.viewport||this.context.viewport,modelMatrix:this.props.modelMatrix,coordinateOrigin:this.props.coordinateOrigin,coordinateSystem:this.props.coordinateSystem,...t})}get isComposite(){return!1}get isDrawable(){return!0}setState(e){this.setChangeFlags({stateChanged:!0}),Object.assign(this.state,e),this.setNeedsRedraw()}setNeedsRedraw(){this.internalState&&(this.internalState.needsRedraw=!0)}setNeedsUpdate(){this.internalState&&(this.context.layerManager.setNeedsUpdate(String(this)),this.internalState.needsUpdate=!0)}get isLoaded(){return this.internalState?!this.internalState.isAsyncPropLoading():!1}get wrapLongitude(){return this.props.wrapLongitude}isPickable(){return this.props.pickable&&this.props.visible}getModels(){let e=this.state;return e&&(e.models||e.model&&[e.model])||[]}setShaderModuleProps(...e){for(let t of this.getModels())t.shaderInputs.setProps(...e)}getAttributeManager(){return this.internalState&&this.internalState.attributeManager}getCurrentLayer(){return this.internalState&&this.internalState.layer}getLoadOptions(){return this.props.loadOptions}use64bitPositions(){let{coordinateSystem:e}=this.props;return e==="default"||e===`lnglat`||e===`cartesian`}onHover(e,t){return this.props.onHover&&this.props.onHover(e,t)||!1}onClick(e,t){return this.props.onClick&&this.props.onClick(e,t)||!1}nullPickingColor(){return[0,0,0]}encodePickingColor(e,t=[]){return t[0]=e+1&255,t[1]=e+1>>8&255,t[2]=e+1>>8>>8&255,t}decodePickingColor(e){J(e instanceof Uint8Array);let[t,n,r]=e;return t+n*256+r*65536-1}getNumInstances(){return Number.isFinite(this.props.numInstances)?this.props.numInstances:this.state&&this.state.numInstances!==void 0?this.state.numInstances:im(this.props.data)}getStartIndices(){return this.props.startIndices?this.props.startIndices:this.state&&this.state.startIndices?this.state.startIndices:null}getBounds(){return this.getAttributeManager()?.getBounds([`positions`,`instancePositions`])}getShaders(e){e=sm(e,{disableWarnings:!0,modules:this.context.defaultShaderModules});for(let t of this.props.extensions)e=sm(e,t.getShaders.call(this,t));return e}shouldUpdateState(e){return e.changeFlags.propsOrDataChanged}updateState(e){let t=this.getAttributeManager(),{dataChanged:n}=e.changeFlags;if(n&&t){if(Array.isArray(n))for(let e of n)t.invalidateAll(e);else t.invalidateAll()}if(t){let{props:n}=e,r=this.internalState.hasPickingBuffer,i=Number.isInteger(n.highlightedObjectIndex)||!!n.pickable||n.extensions.some(e=>e.getNeedsPickingBuffer.call(this,e));if(r!==i){this.internalState.hasPickingBuffer=i;let e=Hm(t.attributes);e&&(i&&e.constant&&(e.constant=!1,t.invalidate(e.id)),!e.value&&!i&&(e.constant=!0,e.value=Um(t.attributes)?[ml]:[0,0,0]))}}}finalizeState(e){for(let e of this.getModels())e.destroy();let t=this.getAttributeManager();t&&t.finalize(),this.context&&this.context.resourceManager.unsubscribe({consumerId:this.id}),this.internalState&&(this.internalState.uniformTransitions.clear(),this.internalState.finalize())}draw(e){for(let t of this.getModels())t.draw(e.renderPass)}getPickingInfo({info:e,mode:t,sourceLayer:n}){let{index:r}=e;return r>=0&&Array.isArray(this.props.data)&&(e.object=this.props.data[r]),e}raiseError(e,t){t&&(e=Error(`${t}: ${e.message}`,{cause:e})),this.props.onError?.(e)||this.context?.onError?.(e,this)}getNeedsRedraw(e={clearRedrawFlags:!1}){return this._getNeedsRedraw(e)}needsUpdate(){return this.internalState?this.internalState.needsUpdate||this.hasUniformTransition()||this.shouldUpdateState(this._getUpdateParams()):!1}hasUniformTransition(){return this.internalState?.uniformTransitions.active||!1}activateViewport(e){if(!this.internalState)return;let t=this.internalState.viewport;this.internalState.viewport=e,(!t||!Vm({oldViewport:t,viewport:e}))&&(this.setChangeFlags({viewportChanged:!0}),this.isComposite?this.needsUpdate()&&this.setNeedsUpdate():this._update())}invalidateAttribute(e=`all`){let t=this.getAttributeManager();t&&(e===`all`?t.invalidateAll():t.invalidate(e))}updateAttributes(e){let t=!1;for(let n in e)e[n].layoutChanged()&&(t=!0);for(let n of this.getModels())this._setModelAttributes(n,e,t)}_updateAttributes(){let e=this.getAttributeManager();if(!e)return;let t=this.props,n=this.getNumInstances(),r=this.getStartIndices();e.update({data:t.data,numInstances:n,startIndices:r,props:t,transitions:t.transitions,buffers:t.data.attributes,context:this});let i=e.getChangedAttributes({clearChangedFlags:!0});this.updateAttributes(i)}_updateAttributeTransition(){let e=this.getAttributeManager();e&&e.updateTransition()}_updateUniformTransition(){let{uniformTransitions:e}=this.internalState;if(e.active){let t=e.update(),n=Object.create(this.props);for(let e in t)Object.defineProperty(n,e,{value:t[e]});return n}return this.props}calculateInstancePickingColors(e,{numInstances:t}){if(e.constant)return;let n=Math.floor(X.length/4);this.internalState.usesPickingColorCache=!0;let r=t>0&&X[0]===0;if(n<t||r){t>zm&&R.warn(`Layer has too many data objects. Picking might not be able to distinguish all objects.`)(),X=Kl.allocate(X,t,{size:4,copy:!0,maxCount:Math.max(t,zm)});let e=Math.floor(X.length/4),i=[0,0,0],a=r?0:n;for(let t=a;t<e;t++)this.encodePickingColor(t,i),X[t*4+0]=i[0],X[t*4+1]=i[1],X[t*4+2]=i[2],X[t*4+3]=0}e.value=X.subarray(0,t*4)}_setModelAttributes(e,t,n=!1){if(!Object.keys(t).length)return;let r=this.getAttributeManager();if(r?.hasBufferGroups()){this._setGroupedModelAttributes(e,r,t);return}if(n){let n=this.getAttributeManager();e.setBufferLayout(n.getBufferLayouts(e)),t=n.getAttributes()}let i=e.userData?.excludeAttributes||{},a={},o={};for(let n in t){if(i[n])continue;let r=t[n].getValue();for(let i in r){let s=r[i];s instanceof y?t[n].settings.isIndexed?e.setIndexBuffer(s):a[i]=s:s&&(o[i]=s)}}e.setAttributes(a),e.setConstantAttributes(o)}_setGroupedModelAttributes(e,t,n){let r=e.userData?.excludeAttributes||{},i=t.getBufferGroupBindings(n,e,r);e.setBufferLayout(i.bufferLayouts);let a={...i.buffers},o={},s=t.getAttributes();for(let t in s){if(r[t]||i.groupedAttributeIds.has(t))continue;let n=s[t],c=n.getValue();for(let t in c){let r=c[t];r instanceof y?n.settings.isIndexed?e.setIndexBuffer(r):a[t]=r:r&&(o[t]=r)}}e.setAttributes(a),e.setConstantAttributes(o)}disablePickingIndex(e){let t=this.props.data;if(!(`attributes`in t)){this._disablePickingIndex(e);return}let n=this.getAttributeManager().attributes,r=Um(n),i=Wm(n),a=r&&t.attributes&&t.attributes[r.id];if(a&&a.value){let n=a.value;for(let i=0;i<t.length;i++)n[r.getVertexOffset(i)]===e&&this._disablePickingIndex(i);return}let o=i&&t.attributes&&t.attributes[i.id];if(o&&o.value){let n=o.value,r=this.encodePickingColor(e);for(let e=0;e<t.length;e++){let t=i.getVertexOffset(e);n[t]===r[0]&&n[t+1]===r[1]&&n[t+2]===r[2]&&this._disablePickingIndex(e)}}else this._disablePickingIndex(e)}_disablePickingIndex(e){let t=this.getAttributeManager().attributes,n=Um(t);if(n){let t=n.getVertexOffset(e),r=n.getVertexOffset(e+1),i=new Uint32Array(r-t);i.fill(ml),n.buffer.write(i,t*i.BYTES_PER_ELEMENT);return}let r=Wm(t);if(!r){this.internalState&&hl(this.internalState.disabledPickingIndices,e);return}let i=r.getVertexOffset(e),a=r.getVertexOffset(e+1);r.buffer.write(new Uint8Array(a-i),i)}restorePickingColors(){let e=this.getAttributeManager().attributes,t=Hm(e);if(!t){this.internalState&&(this.internalState.disabledPickingIndices.length=0);return}let n=Wm(e);this.internalState.usesPickingColorCache&&n&&n.value.buffer!==X.buffer&&(n.value=X.subarray(0,n.value.length)),t.updateSubBuffer({startOffset:0})}_initialize(){J(!this.internalState),z(Fm,this);let e=this._getAttributeManager();this.internalState=new Nm({attributeManager:e,layer:this}),this._clearChangeFlags(),this.state={},Object.defineProperty(this.state,"attributeManager",{get:()=>(R.deprecated(`layer.state.attributeManager`,`layer.getAttributeManager()`)(),e)}),this.internalState.uniformTransitions=new Kp(this.context.timeline),this.internalState.onAsyncPropUpdated=this._onAsyncPropUpdated.bind(this),this.internalState.setAsyncProps(this.props),this.initializeState(this.context);for(let e of this.props.extensions)e.initializeState.call(this,this.context,e);this.setChangeFlags({dataChanged:`init`,propsChanged:`init`,viewportChanged:!0,extensionsChanged:!0}),this._update()}_transferState(e){z(Rm,this,this===e);let{state:t,internalState:n}=e;this!==e&&(this.internalState=n,this.state=t,this.internalState.setAsyncProps(this.props),this._diffProps(this.props,this.internalState.getOldProps()))}_update(){let e=this.needsUpdate();if(z(Im,this,e),!e)return;this.context.stats.get(`Layer updates`).incrementCount();let t=this.props,n=this.context,r=this.internalState,i=n.viewport,a=this._updateUniformTransition();r.propsInTransition=a,n.viewport=r.viewport||i,this.props=a;try{let e=this._getUpdateParams(),t=this.getModels();if(n.device)this.updateState(e);else try{this.updateState(e)}catch{}for(let t of this.props.extensions)t.updateState.call(this,e,t);this.setNeedsRedraw(),this._updateAttributes();let r=this.getModels()[0]!==t[0];this._postUpdate(e,r)}finally{n.viewport=i,this.props=t,this._clearChangeFlags(),r.needsUpdate=!1,r.resetOldProps()}}_finalize(){z(Lm,this),this.finalizeState(this.context);for(let e of this.props.extensions)e.finalizeState.call(this,this.context,e)}_drawLayer({renderPass:e,shaderModuleProps:t=null,uniforms:n={},parameters:r={}}){this._updateAttributeTransition();let i=this.props,a=this.context;this.props=this.internalState.propsInTransition||i;try{t&&this.setShaderModuleProps(t);let{getPolygonOffset:i}=this.props,o=i&&i(n)||[0,0];a.device instanceof A&&a.device.setParametersWebGL({polygonOffset:o});let s=a.device instanceof A?null:qm(r);if(Jm(this.getModels(),e,r,s),a.device instanceof A)a.device.withParametersWebGL(r,()=>{let i={renderPass:e,shaderModuleProps:t,uniforms:n,parameters:r,context:a};for(let e of this.props.extensions)e.draw.call(this,i,e);this.draw(i)});else{s?.renderPassParameters&&e.setParameters(s.renderPassParameters);let i={renderPass:e,shaderModuleProps:t,uniforms:n,parameters:r,context:a};for(let e of this.props.extensions)e.draw.call(this,i,e);this.draw(i)}}finally{this.props=i}}getChangeFlags(){return this.internalState?.changeFlags}setChangeFlags(e){if(!this.internalState)return;let{changeFlags:t}=this.internalState;for(let n in e)if(e[n]){let r=!1;switch(n){case`dataChanged`:let i=e[n],a=t[n];i&&Array.isArray(a)&&(t.dataChanged=Array.isArray(i)?a.concat(i):i,r=!0);default:t[n]||(t[n]=e[n],r=!0)}r&&z(Pm,this,n,e)}let n=!!(t.dataChanged||t.updateTriggersChanged||t.propsChanged||t.extensionsChanged);t.propsOrDataChanged=n,t.somethingChanged=n||t.viewportChanged||t.stateChanged}_clearChangeFlags(){this.internalState.changeFlags={dataChanged:!1,propsChanged:!1,updateTriggersChanged:!1,viewportChanged:!1,stateChanged:!1,extensionsChanged:!1,propsOrDataChanged:!1,somethingChanged:!1}}_diffProps(e,t){let n=Jp(e,t);if(n.updateTriggersChanged)for(let e in n.updateTriggersChanged)n.updateTriggersChanged[e]&&this.invalidateAttribute(e);if(n.transitionsChanged)for(let r in n.transitionsChanged)this.internalState.uniformTransitions.add(r,t[r],e[r],e.transitions?.[r]);return this.setChangeFlags(n)}validateProps(){qp(this.props)}updateAutoHighlight(e){this.props.autoHighlight&&!Number.isInteger(this.props.highlightedObjectIndex)&&this._updateAutoHighlight(e)}_updateAutoHighlight(e){let t={highlightedObjectColor:e.picked?e.color:null},{highlightColor:n}=this.props;e.picked&&typeof n==`function`&&(t.highlightColor=n(e)),this.setShaderModuleProps({picking:t}),this.setNeedsRedraw()}_getAttributeManager(){let e=this.context;return new zp(e.device,{id:this.props.id,stats:e.stats,timeline:e.timeline})}_postUpdate(e,t){let{props:n,oldProps:r}=e,i=this.state.model;i?.isInstanced&&i.setInstanceCount(this.getNumInstances());let{autoHighlight:a,highlightedObjectIndex:o,highlightColor:s}=n;if(t||r.autoHighlight!==a||r.highlightedObjectIndex!==o||r.highlightColor!==s){let e={};Array.isArray(s)&&(e.highlightColor=s),(t||r.autoHighlight!==a||o!==r.highlightedObjectIndex)&&(e.highlightedObjectColor=Number.isFinite(o)&&o>=0?this.encodePickingColor(o):null),this.setShaderModuleProps({picking:e})}}_getUpdateParams(){return{props:this.props,oldProps:this.internalState.getOldProps(),context:this.context,changeFlags:this.internalState.changeFlags}}_getNeedsRedraw(e){if(!this.internalState)return!1;let t=!1;t||=this.internalState.needsRedraw&&this.id;let n=this.getAttributeManager(),r=n?n.getNeedsRedraw(e):!1;if(t||=r,t)for(let e of this.props.extensions)e.onNeedsRedraw.call(this,e);return this.internalState.needsRedraw=this.internalState.needsRedraw&&!e.clearRedrawFlags,t}_onAsyncPropUpdated(){this._diffProps(this.props,this.internalState.getOldProps()),this.setNeedsUpdate()}};Km.defaultProps=Gm,Km.layerName=`Layer`;function qm(e){let{blendConstant:t,...n}=e;return t?{pipelineParameters:n,renderPassParameters:{blendConstant:t}}:{pipelineParameters:n}}function Jm(e,t,n,r){for(let i of e)i.device.type===`webgpu`?(Ym(i,t),i.setParameters({...i.parameters,...r?.pipelineParameters})):i.setParameters(n)}function Ym(e,t){let n=t.props.framebuffer||(t.framebuffer??null);if(!n)return;let r=n.colorAttachments.map(e=>e?.texture?.format??null),i=n.depthStencilAttachment?.texture?.format,a=e;(!Xm(a.props.colorAttachmentFormats,r)||a.props.depthStencilAttachmentFormat!==i)&&(a.props.colorAttachmentFormats=r,a.props.depthStencilAttachmentFormat=i,a._setPipelineNeedsUpdate(`attachment formats`))}function Xm(e,t){if(e===t)return!0;if(!e||!t||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}var Zm=`compositeLayer.renderLayers`,Qm=class extends Km{get isComposite(){return!0}get isDrawable(){return!1}get isLoaded(){return super.isLoaded&&this.getSubLayers().every(e=>e.isLoaded)}getSubLayers(){return this.internalState&&this.internalState.subLayers||[]}initializeState(e){}setState(e){super.setState(e),this.setNeedsUpdate()}getPickingInfo({info:e}){let{object:t}=e;return t&&t.__source&&t.__source.parent&&t.__source.parent.id===this.id?(e.object=t.__source.object,e.index=t.__source.index,e):e}filterSubLayer(e){return!0}shouldRenderSubLayer(e,t){return t&&t.length}getSubLayerClass(e,t){let{_subLayerProps:n}=this.props;return n&&n[e]&&n[e].type||t}getSubLayerRow(e,t,n){return e.__source={parent:this,object:t,index:n},e}getSubLayerAccessor(e){if(typeof e==`function`){let t={index:-1,data:this.props.data,target:[]};return(n,r)=>n&&n.__source?(t.index=n.__source.index,e(n.__source.object,t)):e(n,r)}return e}getSubLayerProps(e={}){let{opacity:t,pickable:n,visible:r,parameters:i,getPolygonOffset:a,highlightedObjectIndex:o,autoHighlight:s,highlightColor:c,coordinateSystem:l,coordinateOrigin:u,wrapLongitude:d,positionFormat:f,modelMatrix:p,extensions:m,fetch:h,operation:g,_subLayerProps:_}=this.props,v={id:``,updateTriggers:{},opacity:t,pickable:n,visible:r,parameters:i,getPolygonOffset:a,highlightedObjectIndex:o,autoHighlight:s,highlightColor:c,coordinateSystem:l,coordinateOrigin:u,wrapLongitude:d,positionFormat:f,modelMatrix:p,extensions:m,fetch:h,operation:g},y=_&&e.id&&_[e.id],b=y&&y.updateTriggers,x=e.id||`sublayer`;if(y){let t=this.props[Su],n=e.type?e.type._propTypes:{};for(let e in y){let r=n[e]||t[e];r&&r.type===`accessor`&&(y[e]=this.getSubLayerAccessor(y[e]))}}Object.assign(v,e,y),v.id=`${this.props.id}-${x}`,v.updateTriggers={all:this.props.updateTriggers?.all,...e.updateTriggers,...b};for(let e of m){let t=e.getSubLayerProps.call(this,e);t&&Object.assign(v,t,{updateTriggers:Object.assign(v.updateTriggers,t.updateTriggers)})}return v}_updateAutoHighlight(e){for(let t of this.getSubLayers())t.updateAutoHighlight(e)}_getAttributeManager(){return null}_postUpdate(e,t){let n=this.internalState.subLayers,r=!n||this.needsUpdate();r&&(n=Du(this.renderLayers(),Boolean),this.internalState.subLayers=n),z(Zm,this,r,n);for(let e of n)e.parent=this}};Qm.layerName=`CompositeLayer`;var $m=Math.PI/180;function eh({height:e,focalDistance:t,orbitAxis:n,rotationX:r,rotationOrbit:i,zoom:a}){let o=n===`Z`?[0,0,1]:[0,1,0],s=n===`Z`?[0,-t,0]:[0,0,t],c=new St().lookAt({eye:s,up:o});c.rotateX(r*$m),n===`Z`?c.rotateZ(i*$m):c.rotateY(i*$m);let l=2**a/e;return c.scale(l),c}var th=class extends lu{constructor(e){let{height:t,projectionMatrix:n,fovy:r=50,orbitAxis:i=`Z`,target:a=[0,0,0],rotationX:o=0,rotationOrbit:s=0,zoom:c=0}=e,l=n?n[5]/2:Jc(r);super({...e,longitude:void 0,viewMatrix:eh({height:t||1,focalDistance:l,orbitAxis:i,rotationX:o,rotationOrbit:s,zoom:c}),fovy:r,focalDistance:l,position:a,zoom:c}),this.target=a,this.orbitAxis=i,this.rotationX=o,this.rotationOrbit=s,this.fovy=r,this.projectedCenter=this.project(this.center)}unproject(e,{topLeft:t=!0}={}){let[n,r,i=this.projectedCenter[2]]=e,[a,o,s]=Xc([n,t?r:this.height-r,i],this.pixelUnprojectionMatrix);return[a,o,s]}panByPosition(e,t,n){let r=this.project(e),{near:i,far:a}=Xl(this.projectionMatrix),o=i*a/(a-r[2]*(a-i))/(i*a/(a-this.projectedCenter[2]*(a-i))),s=[this.width/2+(r[0]-t[0])*o,this.height/2+(r[1]-t[1])*o,this.projectedCenter[2]];return{target:this.unproject(s)}}};th.displayName=`OrbitViewport`;var nh=class extends md{constructor(e){let{width:t,height:n,rotationX:r=0,rotationOrbit:i=0,target:a=[0,0,0],zoom:o=0,minRotationX:s=-90,maxRotationX:c=90,minZoom:l=-1/0,maxZoom:u=1/0,maxBounds:d=null,maxBoundsPadding:f=null,startPanPosition:p,startRotatePos:m,startRotationX:h,startRotationOrbit:g,startZoomPosition:_,startZoom:v}=e;super({width:t,height:n,rotationX:r,rotationOrbit:i,target:a,zoom:o,minRotationX:s,maxRotationX:c,minZoom:l,maxZoom:u,maxBounds:d,maxBoundsPadding:f},{startPanPosition:p,startRotatePos:m,startRotationX:h,startRotationOrbit:g,startZoomPosition:_,startZoom:v},e.makeViewport),this.unproject3D=e.unproject3D}panStart({pos:e}){return this._getUpdatedState({startPanPosition:this._unproject(e)})}pan({pos:e,startPosition:t}){let n=this.getState().startPanPosition||t;if(!n)return this;let r=this.makeViewport(this.getViewportProps()).panByPosition(n,e);return this._getUpdatedState(r)}panEnd(){return this._getUpdatedState({startPanPosition:null})}rotateStart({pos:e}){return this._getUpdatedState({startRotatePos:e,startRotationX:this.getViewportProps().rotationX,startRotationOrbit:this.getViewportProps().rotationOrbit})}rotate({pos:e,deltaAngleX:t=0,deltaAngleY:n=0}){let{startRotatePos:r,startRotationX:i,startRotationOrbit:a}=this.getState(),{width:o,height:s}=this.getViewportProps();if(!r||i===void 0||a===void 0)return this;let c;if(e){let t=(e[0]-r[0])/o,n=(e[1]-r[1])/s;(i<-90||i>90)&&(t*=-1),c={rotationX:i+n*180,rotationOrbit:a+t*180}}else c={rotationX:i+n,rotationOrbit:a+t};return this._getUpdatedState(c)}rotateEnd(){return this._getUpdatedState({startRotationX:null,startRotationOrbit:null})}shortestPathFrom(e){let t=e.getViewportProps(),n={...this.getViewportProps()},{rotationOrbit:r}=n;return Math.abs(r-t.rotationOrbit)>180&&(n.rotationOrbit=r<0?r+360:r-360),n}zoomStart({pos:e}){return this._getUpdatedState({startZoomPosition:this._unproject(e),startZoom:this.getViewportProps().zoom})}zoom({pos:e,startPos:t,scale:n}){let{startZoom:r,startZoomPosition:i}=this.getState();if(i||=(r=this.getViewportProps().zoom,this._unproject(t||e)),!i)return this;let a=this._calculateNewZoom({scale:n,startZoom:r}),o=this.makeViewport({...this.getViewportProps(),zoom:a});return this._getUpdatedState({zoom:a,...o.panByPosition(i,e)})}zoomEnd(){return this._getUpdatedState({startZoomPosition:null,startZoom:null})}zoomIn(e=2){return this._getUpdatedState({zoom:this._calculateNewZoom({scale:e})})}zoomOut(e=2){return this._getUpdatedState({zoom:this._calculateNewZoom({scale:1/e})})}moveLeft(e=50){return this._panFromCenter([-e,0])}moveRight(e=50){return this._panFromCenter([e,0])}moveUp(e=50){return this._panFromCenter([0,-e])}moveDown(e=50){return this._panFromCenter([0,e])}rotateLeft(e=15){return this._getUpdatedState({rotationOrbit:this.getViewportProps().rotationOrbit-e})}rotateRight(e=15){return this._getUpdatedState({rotationOrbit:this.getViewportProps().rotationOrbit+e})}rotateUp(e=10){return this._getUpdatedState({rotationX:this.getViewportProps().rotationX-e})}rotateDown(e=10){return this._getUpdatedState({rotationX:this.getViewportProps().rotationX+e})}_project(e){return this.makeViewport(this.getViewportProps()).project(e)}_unproject(e){return this.unproject3D?.(e)||this.makeViewport(this.getViewportProps()).unproject(e)}_calculateNewZoom({scale:e,startZoom:t}){t===void 0&&(t=this.getViewportProps().zoom);let n=t+Math.log2(e);return this._constrainZoom(n)}_panFromCenter(e){let{target:t}=this.getViewportProps(),n=this._project(t);return this.pan({startPosition:t,pos:[n[0]+e[0],n[1]+e[1]]})}_getUpdatedState(e){return new this.constructor({makeViewport:this.makeViewport,...this.getViewportProps(),...this.getState(),...e})}applyConstraints(e){let{maxRotationX:t,minRotationX:n,rotationOrbit:r}=e;return e.zoom=this._constrainZoom(e.zoom,e),e.rotationX=I(e.rotationX,n,t),(r<-180||r>180)&&(e.rotationOrbit=Jl(r+180,360)-180),e.target=this._constrainTarget(e),e}_constrainZoom(e,t){t||=this.getViewportProps();let{maxZoom:n,maxBounds:r}=t,{minZoom:i}=t;if(r&&t.width>0&&t.height>0){let a=gd(t.width,t.height,t.maxBoundsPadding),o=[];if(a.width>0||a.height>0){let s=_d(this.makeViewport({...t,zoom:e}),t.target,a);a.width>0&&o.push(s.left,s.right),a.height>0&&o.push(s.top,s.bottom);let c=Math.min(...o)*2,l=r[1][0]-r[0][0],u=r[1][1]-r[0][1],d=(r[1][2]??0)-(r[0][2]??0),f=Math.sqrt(l*l+u*u+d*d);c>0&&f>0&&(i=Math.max(i,Math.log2(c/f)),i>n&&(i=n))}}return I(e,i,n)}_constrainTarget(e){let{target:t,maxBounds:n}=e;if(!n)return t;let r=gd(e.width,e.height,e.maxBoundsPadding);if(r.width<0||r.height<0)return t;let[[i,a,o=0],[s,c,l=0]]=n;if(t[0]>=i&&t[0]<=s&&t[1]>=a&&t[1]<=c&&t[2]>=o&&t[2]<=l)return t;let u=this.makeViewport?.(e);if(u){let{cameraPosition:e}=u,n=e[0]-t[0],r=e[1]-t[1],d=e[2]-t[2],f=n*t[0]+r*t[1]+d*t[2],p=n*(n>=0?i:s)+r*(r>=0?a:c)+d*(d>=0?o:l),m=n*(n>=0?s:i)+r*(r>=0?c:a)+d*(d>=0?l:o);if((n||r||d)&&f>=p&&f<=m){let e=e=>I(e,i,s),u=e=>I(e,a,c),p=e=>I(e,o,l),m=i=>n*e(t[0]-i*n)+r*u(t[1]-i*r)+d*p(t[2]-i*d)-f,h=-1,g=1,_=m(h),v=m(g);for(;_<0;)g=h,v=_,h*=2,_=m(h);for(;v>0;)h=g,_=v,g*=2,v=m(g);for(let e=0;e<30;e++){let e=(h+g)/2;m(e)>0?h=e:g=e}let y=(h+g)/2;return[e(t[0]-y*n),u(t[1]-y*r),p(t[2]-y*d)]}}return[I(t[0],i,s),I(t[1],a,c),I(t[2],o,l)]}},rh=class extends fd{constructor(){super(...arguments),this.ControllerState=nh,this.transition={transitionDuration:300,transitionInterpolator:new id({transitionProps:{compare:[`target`,`zoom`,`rotationX`,`rotationOrbit`],required:[`target`,`zoom`]}})},this._unproject3D=e=>{if(this.pickPosition){let{x:t,y:n}=this.props,r=this.pickPosition(t+e[0],n+e[1]);if(r&&r.coordinate)return r.coordinate}return null}}setProps(e){e.unproject3D=this._unproject3D,super.setProps(e)}},ih=class extends Ku{constructor(e={}){super(e),this.props.orbitAxis=e.orbitAxis||`Z`}getViewportType(){return th}get ControllerType(){return rh}};ih.displayName=`OrbitView`;var ah=class{constructor(e){this.indexStarts=[0],this.vertexStarts=[0],this.vertexCount=0,this.instanceCount=0;let{attributes:t={}}=e;this.typedArrayManager=Kl,this.attributes={},this._attributeDefs=t,this.opts=e,this.updateGeometry(e)}updateGeometry(e){Object.assign(this.opts,e);let{data:t,buffers:n={},getGeometry:r,geometryBuffer:i,positionFormat:a,dataChanged:o,normalize:s=!0}=this.opts;if(this.data=t,this.getGeometry=r,this.positionSize=i&&i.size||(a===`XY`?2:3),this.buffers=n,this.normalize=s,i&&(J(t.startIndices),this.getGeometry=this.getGeometryFromBuffer(i),s||(n.vertexPositions=i)),this.geometryBuffer=n.vertexPositions,Array.isArray(o))for(let e of o)this._rebuildGeometry(e);else this._rebuildGeometry()}updatePartialGeometry({startRow:e,endRow:t}){this._rebuildGeometry({startRow:e,endRow:t})}getGeometryFromBuffer(e){let t=e.value||e;return ArrayBuffer.isView(t)?pf(t,{size:this.positionSize,offset:e.offset,stride:e.stride,startIndices:this.data.startIndices}):null}_allocate(e,t){let{attributes:n,buffers:r,_attributeDefs:i,typedArrayManager:a}=this;for(let o in i)if(o in r)a.release(n[o]),n[o]=null;else{let r=i[o];r.copy=t,n[o]=a.allocate(n[o],e,r)}}_forEachGeometry(e,t,n){let{data:r,getGeometry:i}=this,{iterable:a,objectInfo:o}=df(r,t,n);for(let t of a)o.index++,e(i?i(t,o):null,o.index)}_rebuildGeometry(e){if(!this.data)return;let{indexStarts:t,vertexStarts:n,instanceCount:r}=this,{data:i,geometryBuffer:a}=this,{startRow:o=0,endRow:s=1/0}=e||{},c={};if(e||(t=[0],n=[0]),this.normalize||!a)this._forEachGeometry((e,t)=>{let r=e&&this.normalizeGeometry(e);c[t]=r,n[t+1]=n[t]+(r?this.getGeometrySize(r):0)},o,s),r=n[n.length-1];else if(n=i.startIndices,r=n[i.length]||0,ArrayBuffer.isView(a))r||=a.length/this.positionSize;else if(a instanceof y){let e=this.positionSize*4;r||=a.byteLength/e}else if(a.buffer){let e=a.stride||this.positionSize*4;r||=a.buffer.byteLength/e}else if(a.value){let e=a.value,t=a.stride/e.BYTES_PER_ELEMENT||this.positionSize;r||=e.length/t}this._allocate(r,!!e),this.indexStarts=t,this.vertexStarts=n,this.instanceCount=r;let l={};this._forEachGeometry((e,i)=>{let a=c[i]||e;l.vertexStart=n[i],l.indexStart=t[i];let o=i<n.length-1?n[i+1]:r;l.geometrySize=o-n[i],l.geometryIndex=i,this.updateGeometryAttributes(a,l)},o,s),this.vertexCount=t[t.length-1]}},oh=`layout(std140) uniform iconUniforms {
  float sizeScale;
  vec2 iconsTextureDim;
  float sizeBasis;
  float sizeMinPixels;
  float sizeMaxPixels;
  bool billboard;
  highp int sizeUnits;
  float alphaCutoff;
} icon;
`,sh={name:`icon`,vs:oh,fs:oh,uniformTypes:{sizeScale:`f32`,iconsTextureDim:`vec2<f32>`,sizeBasis:`f32`,sizeMinPixels:`f32`,sizeMaxPixels:`f32`,billboard:`f32`,sizeUnits:`i32`,alphaCutoff:`f32`}},ch=`#version 300 es
#define SHADER_NAME icon-layer-vertex-shader
in vec2 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceSizes;
in float instanceAngles;
in vec4 instanceColors;
#ifdef USE_ROW_INDEXES
in float rowIndexes;
#endif
in vec4 instanceIconFrames;
in float instanceColorModes;
in vec2 instanceOffsets;
in vec2 instancePixelOffset;
out float vColorMode;
out vec4 vColor;
out vec2 vTextureCoords;
out vec2 uv;
vec2 rotate_by_angle(vec2 vertex, float angle) {
float angle_radian = angle * PI / 180.0;
float cos_angle = cos(angle_radian);
float sin_angle = sin(angle_radian);
mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
return rotationMatrix * vertex;
}
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = positions;
#ifdef USE_ROW_INDEXES
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
#else
geometry.pickingColor = picking_getPickingColorFromInstanceID();
#endif
uv = positions;
vec2 iconSize = instanceIconFrames.zw;
float sizePixels = clamp(
project_size_to_pixel(instanceSizes * icon.sizeScale, icon.sizeUnits),
icon.sizeMinPixels, icon.sizeMaxPixels
);
float iconConstraint = icon.sizeBasis == 0.0 ? iconSize.x : iconSize.y;
float instanceScale = iconConstraint == 0.0 ? 0.0 : sizePixels / iconConstraint;
vec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;
pixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * instanceScale;
pixelOffset += instancePixelOffset;
pixelOffset.y *= -1.0;
if (icon.billboard)  {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = vec3(pixelOffset, 0.0);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
DECKGL_FILTER_SIZE(offset_common, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vTextureCoords = mix(
instanceIconFrames.xy,
instanceIconFrames.xy + iconSize,
(positions.xy + 1.0) / 2.0
) / icon.iconsTextureDim;
vColor = instanceColors;
DECKGL_FILTER_COLOR(vColor, geometry);
vColorMode = instanceColorModes;
}
`,lh=`#version 300 es
#define SHADER_NAME icon-layer-fragment-shader
precision highp float;
uniform sampler2D iconsTexture;
in float vColorMode;
in vec4 vColor;
in vec2 vTextureCoords;
in vec2 uv;
out vec4 fragColor;
void main(void) {
geometry.uv = uv;
vec4 texColor = texture(iconsTexture, vTextureCoords);
vec3 color = mix(texColor.rgb, vColor.rgb, vColorMode);
float a = texColor.a * layer.opacity * vColor.a;
if (a < icon.alphaCutoff) {
discard;
}
fragColor = vec4(color, a);
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,uh=`struct IconUniforms {
  sizeScale: f32,
  iconsTextureDim: vec2<f32>,
  sizeBasis: f32,
  sizeMinPixels: f32,
  sizeMaxPixels: f32,
  billboard: i32,
  sizeUnits: i32,
  alphaCutoff: f32
};

@group(0) @binding(auto) var<uniform> icon: IconUniforms;
@group(0) @binding(auto) var iconsTexture : texture_2d<f32>;
@group(0) @binding(auto) var iconsTextureSampler : sampler;

fn rotate_by_angle(vertex: vec2<f32>, angle_deg: f32) -> vec2<f32> {
  let angle_radian = angle_deg * PI / 180.0;
  let c = cos(angle_radian);
  let s = sin(angle_radian);
  let rotation = mat2x2<f32>(vec2<f32>(c, s), vec2<f32>(-s, c));
  return rotation * vertex;
}

struct Attributes {
  @builtin(instance_index) instanceIndex : u32,
  @location(0) positions: vec2<f32>,

  @location(1) instancePositions: vec3<f32>,
  @location(2) instancePositions64Low: vec3<f32>,
  @location(3) instanceSizes: f32,
  @location(4) instanceAngles: f32,
  @location(5) instanceColors: vec4<f32>,
  @location(6) instanceIconFrames: vec4<f32>,
  @location(7) instanceColorModes: f32,
  @location(8) instanceOffsets: vec2<f32>,
  @location(9) instancePixelOffset: vec2<f32>,
  PICKING_COLOR_ATTRIBUTE
};

struct Varyings {
  @builtin(position) position: vec4<f32>,

  @location(0) vColorMode: f32,
  @location(1) vColor: vec4<f32>,
  @location(2) vTextureCoords: vec2<f32>,
  @location(3) uv: vec2<f32>,
  @location(4) pickingColor: vec3<f32>,
};

@vertex
fn vertexMain(inp: Attributes) -> Varyings {
  // write geometry fields used by filters + FS
  geometry.worldPosition = inp.instancePositions;
  geometry.uv = inp.positions;
  geometry.pickingColor = PICKING_COLOR_VALUE;

  var outp: Varyings;
  outp.uv = inp.positions;

  let iconSize = inp.instanceIconFrames.zw;

  // convert size in meters to pixels, then clamp
  let sizePixels = clamp(
    project_unit_size_to_pixel(inp.instanceSizes * icon.sizeScale, icon.sizeUnits),
    icon.sizeMinPixels, icon.sizeMaxPixels
  );

  // scale icon height to match instanceSize
  let iconConstraint = select(iconSize.y, iconSize.x, icon.sizeBasis == 0.0);
  let instanceScale = select(sizePixels / iconConstraint, 0.0, iconConstraint == 0.0);

  // scale and rotate vertex in "pixel" units; then add per-instance pixel offset
  var pixelOffset = inp.positions / 2.0 * iconSize + inp.instanceOffsets;
  pixelOffset = rotate_by_angle(pixelOffset, inp.instanceAngles) * instanceScale;
  pixelOffset = pixelOffset + inp.instancePixelOffset;
  pixelOffset.y = pixelOffset.y * -1.0;

  if (icon.billboard != 0) {
    var pos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, vec3<f32>(0.0)); // TODO, &geometry.position);
    // DECKGL_FILTER_GL_POSITION(pos, geometry);

    var offset = vec3<f32>(pixelOffset, 0.0);
    // DECKGL_FILTER_SIZE(offset, geometry);
    let clipOffset = project_pixel_size_to_clipspace(offset.xy);
    pos = vec4<f32>(pos.x + clipOffset.x, pos.y + clipOffset.y, pos.z, pos.w);
    outp.position = pos;
  } else {
    var offset_common = vec3<f32>(project_pixel_size_vec2(pixelOffset), 0.0);
    // DECKGL_FILTER_SIZE(offset_common, geometry);
    var pos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, offset_common); // TODO, &geometry.position);
    // DECKGL_FILTER_GL_POSITION(pos, geometry);
    outp.position = pos;
  }

  let uvMix = (inp.positions.xy + vec2<f32>(1.0, 1.0)) * 0.5;
  outp.vTextureCoords = mix(inp.instanceIconFrames.xy, inp.instanceIconFrames.xy + iconSize, uvMix) / icon.iconsTextureDim;

  outp.vColor = inp.instanceColors;
  // DECKGL_FILTER_COLOR(outp.vColor, geometry);

  outp.vColorMode = inp.instanceColorModes;
  outp.pickingColor = geometry.pickingColor;

  return outp;
}

@fragment
fn fragmentMain(inp: Varyings) -> @location(0) vec4<f32> {
  // expose to deck.gl filter hooks
  geometry.uv = inp.uv;

  let texColor = textureSample(iconsTexture, iconsTextureSampler, inp.vTextureCoords);

  // if colorMode == 0, use pixel color from the texture
  // if colorMode == 1 (or picking), use texture as transparency mask
  let rgb = mix(texColor.rgb, inp.vColor.rgb, inp.vColorMode);
  let a = texColor.a * layer.opacity * inp.vColor.a;

  if (a < icon.alphaCutoff) {
    discard;
  }

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(inp.pickingColor)) {
      discard;
    }
    return vec4<f32>(inp.pickingColor, 1.0);
  }

  var fragColor = deckgl_premultiplied_alpha(vec4<f32>(rgb, a));

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(inp.pickingColor - highlightedObjectColor))) {
      let highLightAlpha = picking.highlightColor.a;
      let blendedAlpha = highLightAlpha + fragColor.a * (1.0 - highLightAlpha);
      if (blendedAlpha > 0.0) {
        let highLightRatio = highLightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highLightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  return fragColor;
}
`;function dh(e){return uh.replace(`PICKING_COLOR_ATTRIBUTE`,e?`@location(10) rowIndexes: u32,`:``).replace(`PICKING_COLOR_VALUE`,e?`picking_getPickingColorFromIndex(inp.rowIndexes)`:`picking_getPickingColorFromIndex(inp.instanceIndex)`)}var fh=1024,ph=4,mh=()=>{},hh={minFilter:`linear`,mipmapFilter:`linear`,magFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`},gh={x:0,y:0,width:0,height:0};function _h(e){return 2**Math.ceil(Math.log2(e))}function vh(e,t,n,r){let i=Math.min(n/t.width,r/t.height),a=Math.floor(t.width*i),o=Math.floor(t.height*i);return i===1?{image:t,width:a,height:o}:(e.canvas.height=o,e.canvas.width=a,e.clearRect(0,0,a,o),e.drawImage(t,0,0,t.width,t.height,0,0,a,o),{image:e.canvas,width:a,height:o})}function yh(e){return e&&(e.id||e.url)}function bh(e){let{device:t}=e;t.type===`webgl`?e.generateMipmapsWebGL():t.type===`webgpu`&&t.generateMipmapsWebGPU(e)}function xh(e,t,n,r){let{width:i,height:a,device:o}=e,s=o.createTexture({format:`rgba8unorm`,width:t,height:n,sampler:r,mipLevels:o.getMipLevelCount(t,n)}),c=o.createCommandEncoder();c.copyTextureToTexture({sourceTexture:e,destinationTexture:s,width:i,height:a});let l=c.finish();return o.submit(l),bh(s),e.destroy(),s}function Sh(e,t,n){for(let r=0;r<t.length;r++){let{icon:i,xOffset:a}=t[r],o=yh(i);e[o]={...i,x:a,y:n}}}function Ch({icons:e,buffer:t,mapping:n={},xOffset:r=0,yOffset:i=0,rowHeight:a=0,canvasWidth:o}){let s=[];for(let c=0;c<e.length;c++){let l=e[c];if(!n[yh(l)]){let{height:e,width:c}=l;r+c+t>o&&(Sh(n,s,i),r=0,i=a+i+t,a=0,s=[]),s.push({icon:l,xOffset:r}),r=r+c+t,a=Math.max(a,e)}}return s.length>0&&Sh(n,s,i),{mapping:n,rowHeight:a,xOffset:r,yOffset:i,canvasWidth:o,canvasHeight:_h(a+i+t)}}function wh(e,t,n){if(!e||!t)return null;n||={};let r={},{iterable:i,objectInfo:a}=df(e);for(let e of i){a.index++;let i=t(e,a),o=yh(i);if(!i)throw Error(`Icon is missing.`);if(!i.url)throw Error(`Icon url is missing.`);!r[o]&&(!n[o]||i.url!==n[o].url)&&(r[o]={...i,source:e,sourceIndex:a.index})}return r}var Th=class{constructor(e,{onUpdate:t=mh,onError:n=mh}){this._loadOptions=null,this._texture=null,this._externalTexture=null,this._mapping={},this._samplerParameters=null,this._pendingCount=0,this._autoPacking=!1,this._xOffset=0,this._yOffset=0,this._rowHeight=0,this._buffer=ph,this._canvasWidth=fh,this._canvasHeight=0,this._canvas=null,this.device=e,this.onUpdate=t,this.onError=n}finalize(){this._texture?.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(e){let t=this._autoPacking?yh(e):e;return this._mapping[t]||gh}setProps({loadOptions:e,autoPacking:t,iconAtlas:n,iconMapping:r,textureParameters:i}){e&&(this._loadOptions=e),t!==void 0&&(this._autoPacking=t),r&&(this._mapping=r),n&&(this._texture?.delete(),this._texture=null,this._externalTexture=n),i&&(this._samplerParameters=i)}get isLoaded(){return this._pendingCount===0}packIcons(e,t){if(!this._autoPacking||typeof document>`u`)return;let n=Object.values(wh(e,t,this._mapping)||{});if(n.length>0){let{mapping:e,xOffset:t,yOffset:r,rowHeight:i,canvasHeight:a}=Ch({icons:n,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=i,this._mapping=e,this._xOffset=t,this._yOffset=r,this._canvasHeight=a,this._texture||=this.device.createTexture({format:`rgba8unorm`,data:null,width:this._canvasWidth,height:this._canvasHeight,sampler:this._samplerParameters||hh,mipLevels:this.device.getMipLevelCount(this._canvasWidth,this._canvasHeight)}),this._texture.height!==this._canvasHeight&&(this._texture=xh(this._texture,this._canvasWidth,this._canvasHeight,this._samplerParameters||hh)),this.onUpdate(!0),this._canvas=this._canvas||document.createElement(`canvas`),this._loadIcons(n)}}_loadIcons(e){let t=this._canvas.getContext(`2d`,{willReadFrequently:!0});for(let n of e)this._pendingCount++,pa(n.url,this._loadOptions).then(e=>{let r=yh(n),i=this._mapping[r],{x:a,y:o,width:s,height:c}=i,{image:l,width:u,height:d}=vh(t,e,s,c),f=a+(s-u)/2,p=o+(c-d)/2;this._texture?.copyExternalImage({image:l,x:f,y:p,width:u,height:d}),i.x=f,i.y=p,i.width=u,i.height=d,this._texture&&bh(this._texture),this.onUpdate(u!==s||d!==c)}).catch(e=>{this.onError({url:n.url,source:n.source,sourceIndex:n.sourceIndex,loadOptions:this._loadOptions,error:e})}).finally(()=>{this._pendingCount--})}},Eh=[0,0,0,255],Dh={iconAtlas:{type:`image`,value:null,async:!0},iconMapping:{type:`object`,value:{},async:!0},sizeScale:{type:`number`,value:1,min:0},billboard:!0,sizeUnits:`pixels`,sizeBasis:`height`,sizeMinPixels:{type:`number`,min:0,value:0},sizeMaxPixels:{type:`number`,min:0,value:2**53-1},alphaCutoff:{type:`number`,value:.05,min:0,max:1},getPosition:{type:`accessor`,value:e=>e.position},getIcon:{type:`accessor`,value:e=>e.icon},getColor:{type:`accessor`,value:Eh},getSize:{type:`accessor`,value:1},getAngle:{type:`accessor`,value:0},getPixelOffset:{type:`accessor`,value:[0,0]},onIconError:{type:`function`,value:null,optional:!0},textureParameters:{type:`object`,ignore:!0,value:null}},Oh=class extends Km{getShaders(){let e=!!this.props.data?.attributes?.rowIndexes;return super.getShaders({vs:ch,fs:lh,source:dh(e),defines:e?{USE_ROW_INDEXES:!0}:{},modules:[wc,lo,xl,sh]})}initializeState(){this.state={iconManager:new Th(this.context.device,{onUpdate:this._onUpdate.bind(this),onError:this._onError.bind(this)})},this.getAttributeManager().addInstanced({instancePositions:{size:3,type:`float64`,fp64:this.use64bitPositions(),transition:!0,accessor:`getPosition`},instanceSizes:{size:1,transition:!0,bufferGroup:`icon-instance-data`,accessor:`getSize`,defaultValue:1},instanceIconDefs:{size:7,bufferGroup:`icon-instance-data`,accessor:`getIcon`,transform:this.getInstanceIconDef,shaderAttributes:{instanceOffsets:{size:2,elementOffset:0},instanceIconFrames:{size:4,elementOffset:2},instanceColorModes:{size:1,elementOffset:6}}},instanceColors:{size:this.props.colorFormat.length,type:`unorm8`,transition:!0,bufferGroup:`icon-instance-data`,accessor:`getColor`,defaultValue:Eh},instanceAngles:{size:1,transition:!0,bufferGroup:`icon-instance-data`,accessor:`getAngle`},instancePixelOffset:{size:2,transition:!0,bufferGroup:`icon-instance-data`,accessor:`getPixelOffset`},...this.props.data?.attributes?.rowIndexes?{rowIndexes:{size:1,type:`uint32`,noAlloc:!0}}:{}})}updateState(e){super.updateState(e);let{props:t,oldProps:n,changeFlags:r}=e,i=this.getAttributeManager(),{iconAtlas:a,iconMapping:o,data:s,getIcon:c,textureParameters:l}=t,{iconManager:u}=this.state;if(typeof a==`string`)return;let d=a||this.internalState.isAsyncPropLoading(`iconAtlas`);u.setProps({loadOptions:t.loadOptions,autoPacking:!d,iconAtlas:a,iconMapping:d?o:null,textureParameters:l}),d?n.iconMapping!==t.iconMapping&&i.invalidate(`getIcon`):(r.dataChanged||r.updateTriggersChanged&&(r.updateTriggersChanged.all||r.updateTriggersChanged.getIcon))&&u.packIcons(s,c),r.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),i.invalidateAll())}get isLoaded(){return super.isLoaded&&this.state.iconManager.isLoaded}finalizeState(e){super.finalizeState(e),this.state.iconManager.finalize()}draw({uniforms:e}){this._drawModel(this.state.model)}_drawModel(e){let{sizeScale:t,sizeBasis:n,sizeMinPixels:r,sizeMaxPixels:i,sizeUnits:a,billboard:o,alphaCutoff:s}=this.props,{iconManager:c}=this.state,l=c.getTexture();if(l){let c={iconsTexture:l,iconsTextureDim:[l.width,l.height],sizeUnits:nc[a],sizeScale:t,sizeBasis:+(n===`height`),sizeMinPixels:r,sizeMaxPixels:i,billboard:o,alphaCutoff:s};e.shaderInputs.setProps({icon:c}),e.draw(this.context.renderPass)}}_getModel(e=this.props.id){let t=[-1,-1,1,-1,-1,1,1,1];return new M(this.context.device,{...this.getShaders(),id:e,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new N({topology:`triangle-strip`,attributes:{positions:{size:2,value:new Float32Array(t)}}}),isInstanced:!0})}_onUpdate(e){e?(this.getAttributeManager()?.invalidate(`getIcon`),this.setNeedsUpdate()):this.setNeedsRedraw()}_onError(e){let t=this.getCurrentLayer()?.props.onIconError;t?t(e):R.error(e.error.message)()}getInstanceIconDef(e){let{x:t,y:n,width:r,height:i,mask:a,anchorX:o=r/2,anchorY:s=i/2}=this.state.iconManager.getIconMapping(e);return[r/2-o,i/2-s,t,n,r,i,+!!a]}};Oh.defaultProps=Dh,Oh.layerName=`IconLayer`;var kh=`layout(std140) uniform scatterplotUniforms {
  float radiusScale;
  float radiusMinPixels;
  float radiusMaxPixels;
  float lineWidthScale;
  float lineWidthMinPixels;
  float lineWidthMaxPixels;
  float stroked;
  float filled;
  bool antialiasing;
  bool billboard;
  highp int radiusUnits;
  highp int lineWidthUnits;
} scatterplot;
`,Ah={name:`scatterplot`,vs:kh,fs:kh,source:``,uniformTypes:{radiusScale:`f32`,radiusMinPixels:`f32`,radiusMaxPixels:`f32`,lineWidthScale:`f32`,lineWidthMinPixels:`f32`,lineWidthMaxPixels:`f32`,stroked:`f32`,filled:`f32`,antialiasing:`f32`,billboard:`f32`,radiusUnits:`i32`,lineWidthUnits:`i32`}},jh=`#version 300 es
#define SHADER_NAME scatterplot-layer-vertex-shader
in vec3 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceRadius;
in float instanceLineWidths;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
#ifdef USE_ROW_INDEXES
in float rowIndexes;
#endif
in vec2 instancePixelOffset;
out vec4 vFillColor;
out vec4 vLineColor;
out vec2 unitPosition;
out float innerUnitRadius;
out float outerRadiusPixels;
void main(void) {
geometry.worldPosition = instancePositions;
outerRadiusPixels = clamp(
project_size_to_pixel(scatterplot.radiusScale * instanceRadius, scatterplot.radiusUnits),
scatterplot.radiusMinPixels, scatterplot.radiusMaxPixels
);
float lineWidthPixels = clamp(
project_size_to_pixel(scatterplot.lineWidthScale * instanceLineWidths, scatterplot.lineWidthUnits),
scatterplot.lineWidthMinPixels, scatterplot.lineWidthMaxPixels
);
outerRadiusPixels += scatterplot.stroked * lineWidthPixels / 2.0;
float edgePadding = scatterplot.antialiasing ? (outerRadiusPixels + SMOOTH_EDGE_RADIUS) / outerRadiusPixels : 1.0;
unitPosition = edgePadding * positions.xy;
geometry.uv = unitPosition;
#ifdef USE_ROW_INDEXES
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
#else
geometry.pickingColor = picking_getPickingColorFromInstanceID();
#endif
innerUnitRadius = 1.0 - scatterplot.stroked * lineWidthPixels / outerRadiusPixels;
if (scatterplot.billboard) {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = edgePadding * positions * outerRadiusPixels;
offset.xy += instancePixelOffset;
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset = edgePadding * positions * project_pixel_size(outerRadiusPixels);
offset.xy += project_pixel_size(instancePixelOffset);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vFillColor, geometry);
vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vLineColor, geometry);
}
`,Mh=`#version 300 es
#define SHADER_NAME scatterplot-layer-fragment-shader
precision highp float;
in vec4 vFillColor;
in vec4 vLineColor;
in vec2 unitPosition;
in float innerUnitRadius;
in float outerRadiusPixels;
out vec4 fragColor;
void main(void) {
geometry.uv = unitPosition;
float distToCenter = length(unitPosition) * outerRadiusPixels;
float inCircle = scatterplot.antialiasing ?
smoothedge(distToCenter, outerRadiusPixels) :
step(distToCenter, outerRadiusPixels);
if (inCircle == 0.0) {
discard;
}
if (scatterplot.stroked > 0.5) {
float isLine = scatterplot.antialiasing ?
smoothedge(innerUnitRadius * outerRadiusPixels, distToCenter) :
step(innerUnitRadius * outerRadiusPixels, distToCenter);
if (scatterplot.filled > 0.5) {
fragColor = mix(vFillColor, vLineColor, isLine);
} else {
if (isLine == 0.0) {
discard;
}
fragColor = vec4(vLineColor.rgb, vLineColor.a * isLine);
}
} else if (scatterplot.filled < 0.5) {
discard;
} else {
fragColor = vFillColor;
}
fragColor.a *= inCircle;
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,Nh=`// Main shaders

struct ScatterplotUniforms {
  radiusScale: f32,
  radiusMinPixels: f32,
  radiusMaxPixels: f32,
  lineWidthScale: f32,
  lineWidthMinPixels: f32,
  lineWidthMaxPixels: f32,
  stroked: f32,
  filled: i32,
  antialiasing: i32,
  billboard: i32,
  radiusUnits: i32,
  lineWidthUnits: i32,
};

@group(0) @binding(0) var<uniform> scatterplot: ScatterplotUniforms;

struct Attributes {
  @builtin(instance_index) instanceIndex : u32,
  @builtin(vertex_index) vertexIndex : u32,
  @location(0) positions: vec3<f32>,
  @location(1) instancePositions: vec3<f32>,
  @location(2) instancePositions64Low: vec3<f32>,
  @location(3) instanceRadius: f32,
  @location(4) instanceLineWidths: f32,
  @location(5) instanceFillColors: vec4<f32>,
  @location(6) instanceLineColors: vec4<f32>,
  @location(7) instancePixelOffset: vec2<f32>,
  PICKING_COLOR_ATTRIBUTE
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vFillColor: vec4<f32>,
  @location(1) vLineColor: vec4<f32>,
  @location(2) unitPosition: vec2<f32>,
  @location(3) innerUnitRadius: f32,
  @location(4) outerRadiusPixels: f32,
  @location(5) pickingColor: vec3<f32>,
  @location(6) clipCoordinates: vec2<f32>,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  // Draw an inline geometry constant array clip space triangle to verify that rendering works.
  // var positions = array<vec2<f32>, 3>(vec2(0.0, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5));
  // if (attributes.instanceIndex == 0) {
  //   varyings.position = vec4<f32>(positions[attributes.vertexIndex], 0.0, 1.0);
  //   return varyings;
  // }

  geometry.worldPosition = attributes.instancePositions;

  // Multiply out radius and clamp to limits
  varyings.outerRadiusPixels = clamp(
    project_unit_size_to_pixel(scatterplot.radiusScale * attributes.instanceRadius, scatterplot.radiusUnits),
    scatterplot.radiusMinPixels, scatterplot.radiusMaxPixels
  );

  // Multiply out line width and clamp to limits
  let lineWidthPixels = clamp(
    project_unit_size_to_pixel(scatterplot.lineWidthScale * attributes.instanceLineWidths, scatterplot.lineWidthUnits),
    scatterplot.lineWidthMinPixels, scatterplot.lineWidthMaxPixels
  );

  // outer radius needs to offset by half stroke width
  varyings.outerRadiusPixels += scatterplot.stroked * lineWidthPixels / 2.0;
  // Expand geometry to accommodate edge smoothing
  // WGSL selects the second value when the condition is true, so keep the antialiased path second.
  let edgePadding = select(
    1.0,
    (varyings.outerRadiusPixels + SMOOTH_EDGE_RADIUS) / varyings.outerRadiusPixels,
    scatterplot.antialiasing != 0
  );

  // position on the containing square in [-1, 1] space
  varyings.unitPosition = edgePadding * attributes.positions.xy;
  geometry.uv = varyings.unitPosition;
  geometry.pickingColor = PICKING_COLOR_VALUE;

  varyings.innerUnitRadius = 1.0 - scatterplot.stroked * lineWidthPixels / varyings.outerRadiusPixels;

  if (scatterplot.billboard != 0) {
    let projectedPosition = project_position_to_clipspace_and_commonspace(
      attributes.instancePositions,
      attributes.instancePositions64Low,
      vec3<f32>(0.0)
    );
    geometry.position = projectedPosition.commonPosition;
    varyings.position = projectedPosition.clipPosition;
    // DECKGL_FILTER_GL_POSITION(varyings.position, geometry);
    var offset = edgePadding * attributes.positions * varyings.outerRadiusPixels;
    offset = vec3<f32>(offset.xy + attributes.instancePixelOffset, offset.z);
    // DECKGL_FILTER_SIZE(offset, geometry);
    let clipPixels = project_pixel_size_to_clipspace(offset.xy);
    varyings.position = vec4<f32>(varyings.position.x + clipPixels.x, varyings.position.y + clipPixels.y, varyings.position.z, varyings.position.w);
    geometry.position = vec4<f32>(
      geometry.position.xy + project_pixel_size_vec2(offset.xy),
      geometry.position.zw
    );
  } else {
    var offset = edgePadding * attributes.positions * project_pixel_size_float(varyings.outerRadiusPixels);
    offset = vec3<f32>(offset.xy + project_pixel_size_vec2(attributes.instancePixelOffset), offset.z);
    // DECKGL_FILTER_SIZE(offset, geometry);
    let projectedPosition = project_position_to_clipspace_and_commonspace(
      attributes.instancePositions,
      attributes.instancePositions64Low,
      offset
    );
    geometry.position = projectedPosition.commonPosition;
    varyings.position = projectedPosition.clipPosition;
    // DECKGL_FILTER_GL_POSITION(varyings.position, geometry);
  }

  varyings.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&varyings.position, geometry.worldPosition.xy);

  // Apply opacity to instance color, or return instance picking color
  varyings.vFillColor = vec4<f32>(attributes.instanceFillColors.rgb, attributes.instanceFillColors.a * layer.opacity);
  // DECKGL_FILTER_COLOR(varyings.vFillColor, geometry);
  varyings.vLineColor = vec4<f32>(attributes.instanceLineColors.rgb, attributes.instanceLineColors.a * layer.opacity);
  // DECKGL_FILTER_COLOR(varyings.vLineColor, geometry);
  varyings.pickingColor = geometry.pickingColor;

  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  // var geometry: Geometry;
  // geometry.uv = unitPosition;

  let distToCenter = length(varyings.unitPosition) * varyings.outerRadiusPixels;
  let inCircle = select(
    step(distToCenter, varyings.outerRadiusPixels),
    smoothedge(distToCenter, varyings.outerRadiusPixels),
    scatterplot.antialiasing != 0
  );

  if (inCircle == 0.0) {
    discard;
  }

  var fragColor: vec4<f32>;

  if (scatterplot.stroked != 0) {
    let isLine = select(
      step(varyings.innerUnitRadius * varyings.outerRadiusPixels, distToCenter),
      smoothedge(varyings.innerUnitRadius * varyings.outerRadiusPixels, distToCenter),
      scatterplot.antialiasing != 0
    );

    if (scatterplot.filled != 0) {
      fragColor = mix(varyings.vFillColor, varyings.vLineColor, isLine);
    } else {
      if (isLine == 0.0) {
        discard;
      }
      fragColor = vec4<f32>(varyings.vLineColor.rgb, varyings.vLineColor.a * isLine);
    }
  } else if (scatterplot.filled == 0) {
    discard;
  } else {
    fragColor = varyings.vFillColor;
  }

  fragColor.a *= inCircle;

  clip_filterColor(varyings.clipCoordinates);

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(varyings.pickingColor)) {
      discard;
    }
    return vec4<f32>(varyings.pickingColor, 1.0);
  }

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(varyings.pickingColor - highlightedObjectColor))) {
      let highLightAlpha = picking.highlightColor.a;
      let blendedAlpha = highLightAlpha + fragColor.a * (1.0 - highLightAlpha);
      if (blendedAlpha > 0.0) {
        let highLightRatio = highLightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highLightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  // Apply premultiplied alpha as required by transparent canvas
  fragColor = deckgl_premultiplied_alpha(fragColor);

  return fragColor;
  // return vec4<f32>(0, 0, 1, 1);
}
`;function Ph(e){return Nh.replace(`PICKING_COLOR_ATTRIBUTE`,e?`@location(8) rowIndexes: u32,`:``).replace(`PICKING_COLOR_VALUE`,e?`picking_getPickingColorFromIndex(attributes.rowIndexes)`:`picking_getPickingColorFromIndex(attributes.instanceIndex)`)}var Fh=0,Ih=1,Lh={name:`clip`,source:`\
struct ClipUniforms {
  enabled: i32,
  mode: i32,
  bounds: vec4<f32>,
};

@group(2) @binding(auto) var<uniform> clipUniforms: ClipUniforms;

fn clip_isInBounds(coordinates: vec2<f32>) -> bool {
  return coordinates.x >= clipUniforms.bounds.x &&
    coordinates.y >= clipUniforms.bounds.y &&
    coordinates.x < clipUniforms.bounds.z &&
    coordinates.y < clipUniforms.bounds.w;
}

fn clip_filterPosition(position: ptr<function, vec4<f32>>, instanceCoordinates: vec2<f32>) {
  if (
    clipUniforms.enabled != 0 &&
    clipUniforms.mode == ${Ih} &&
    !clip_isInBounds(instanceCoordinates)
  ) {
    *position = vec4<f32>(2.0, 2.0, 2.0, 1.0);
  }
}

fn clip_filterColor(geometryCoordinates: vec2<f32>) {
  if (
    clipUniforms.enabled != 0 &&
    clipUniforms.mode == ${Fh} &&
    !clip_isInBounds(geometryCoordinates)
  ) {
    discard;
  }
}
`,props:{},uniforms:{},bindingLayout:[{name:`clip`,group:2}],uniformTypes:{enabled:`i32`,mode:`i32`,bounds:`vec4<f32>`},defaultUniforms:{enabled:0,mode:Fh,bounds:[0,0,1,1]},getUniforms(e={}){let t={};return e.enabled!==void 0&&(t.enabled=+!!e.enabled),e.mode!==void 0&&(t.mode=e.mode===`instance`?Ih:Fh),e.bounds!==void 0&&(t.bounds=e.bounds),t}},Rh=[0,0,0,255],zh={radiusUnits:`meters`,radiusScale:{type:`number`,min:0,value:1},radiusMinPixels:{type:`number`,min:0,value:0},radiusMaxPixels:{type:`number`,min:0,value:2**53-1},lineWidthUnits:`meters`,lineWidthScale:{type:`number`,min:0,value:1},lineWidthMinPixels:{type:`number`,min:0,value:0},lineWidthMaxPixels:{type:`number`,min:0,value:2**53-1},stroked:!1,filled:!0,billboard:!1,antialiasing:!0,getPosition:{type:`accessor`,value:e=>e.position},getRadius:{type:`accessor`,value:1},getFillColor:{type:`accessor`,value:Rh},getLineColor:{type:`accessor`,value:Rh},getLineWidth:{type:`accessor`,value:1},getPixelOffset:{type:`accessor`,value:[0,0]},strokeWidth:{deprecatedFor:`getLineWidth`},outline:{deprecatedFor:`stroked`},getColor:{deprecatedFor:[`getFillColor`,`getLineColor`]}},Bh=class extends Km{getShaders(){let e=!!this.props.data?.attributes?.rowIndexes;return super.getShaders({vs:jh,fs:Mh,source:Ph(e),defines:e?{USE_ROW_INDEXES:!0}:{},modules:[wc,lo,xl,Ah,...this.context.device.type===`webgpu`?[Lh]:[]]})}initializeState(){let e=this.props.data?.attributes?.rowIndexes?{rowIndexes:{size:1,type:`uint32`,noAlloc:!0}}:{};this.getAttributeManager().addInstanced({instancePositions:{size:3,type:`float64`,fp64:this.use64bitPositions(),transition:!0,accessor:`getPosition`},instanceRadius:{size:1,transition:!0,accessor:`getRadius`,defaultValue:1,bufferGroup:`scatterplot-instance-data`},instanceFillColors:{size:this.props.colorFormat.length,transition:!0,type:`unorm8`,accessor:`getFillColor`,defaultValue:[0,0,0,255],bufferGroup:`scatterplot-instance-data`},instanceLineColors:{size:this.props.colorFormat.length,transition:!0,type:`unorm8`,accessor:`getLineColor`,defaultValue:[0,0,0,255],bufferGroup:`scatterplot-instance-data`},instanceLineWidths:{size:1,transition:!0,accessor:`getLineWidth`,defaultValue:1,bufferGroup:`scatterplot-instance-data`},instancePixelOffset:{size:2,transition:!0,accessor:`getPixelOffset`,bufferGroup:`scatterplot-instance-data`},...e})}updateState(e){super.updateState(e),e.changeFlags.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),this.getAttributeManager().invalidateAll())}draw({uniforms:e}){let{radiusUnits:t,radiusScale:n,radiusMinPixels:r,radiusMaxPixels:i,stroked:a,filled:o,billboard:s,antialiasing:c,lineWidthUnits:l,lineWidthScale:u,lineWidthMinPixels:d,lineWidthMaxPixels:f}=this.props,p={stroked:a,filled:o,billboard:s,antialiasing:c,radiusUnits:nc[t],radiusScale:n,radiusMinPixels:r,radiusMaxPixels:i,lineWidthUnits:nc[l],lineWidthScale:u,lineWidthMinPixels:d,lineWidthMaxPixels:f},m=this.state.model;m.shaderInputs.setProps({scatterplot:p}),m.draw(this.context.renderPass)}_getModel(){let e=[-1,-1,0,1,-1,0,-1,1,0,1,1,0];return new M(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new N({topology:`triangle-strip`,attributes:{positions:{size:3,value:new Float32Array(e)}}}),isInstanced:!0})}};Bh.defaultProps=zh,Bh.layerName=`ScatterplotLayer`;var Vh={CLOCKWISE:1,COUNTER_CLOCKWISE:-1};function Hh(e,t,n={}){return Uh(e,n)!==t&&(Kh(e,n),!0)}function Uh(e,t={}){return Math.sign(Gh(e,t))}var Wh={x:0,y:1,z:2};function Gh(e,t={}){let{start:n=0,end:r=e.length,plane:i=`xy`}=t,a=t.size||2,o=0,s=Wh[i[0]],c=Wh[i[1]];for(let t=n,i=r-a;t<r;t+=a)o+=(e[t+s]-e[i+s])*(e[t+c]+e[i+c]),i=t;return o/2}function Kh(e,t){let{start:n=0,end:r=e.length,size:i=2}=t,a=(r-n)/i,o=Math.floor(a/2);for(let t=0;t<o;++t){let r=n+t*i,o=n+(a-1-t)*i;for(let t=0;t<i;++t){let n=e[r+t];e[r+t]=e[o+t],e[o+t]=n}}}function qh(e,t){let n=t.length,r=e.length;if(r>0){let i=!0;for(let a=0;a<n;a++)if(e[r-n+a]!==t[a]){i=!1;break}if(i)return!1}for(let i=0;i<n;i++)e[r+i]=t[i];return!0}function Jh(e,t){let n=t.length;for(let r=0;r<n;r++)e[r]=t[r]}function Yh(e,t,n,r,i=[]){let a=r+t*n;for(let t=0;t<n;t++)i[t]=e[a+t];return i}function Xh(e,t,n,r,i=[]){let a,o;if(n&8)a=(r[3]-e[1])/(t[1]-e[1]),o=3;else if(n&4)a=(r[1]-e[1])/(t[1]-e[1]),o=1;else if(n&2)a=(r[2]-e[0])/(t[0]-e[0]),o=2;else if(n&1)a=(r[0]-e[0])/(t[0]-e[0]),o=0;else return null;for(let n=0;n<e.length;n++)i[n]=(o&1)===n?r[o]:a*(t[n]-e[n])+e[n];return i}function Zh(e,t){let n=0;return e[0]<t[0]?n|=1:e[0]>t[2]&&(n|=2),e[1]<t[1]?n|=4:e[1]>t[3]&&(n|=8),n}function Qh(e,t){let{size:n=2,broken:r=!1,gridResolution:i=10,gridOffset:a=[0,0],startIndex:o=0,endIndex:s=e.length}=t||{},c=(s-o)/n,l=[],u=[l],d=Yh(e,0,n,o),f,p,m=rg(d,i,a,[]),h=[];qh(l,d);for(let t=1;t<c;t++){for(f=Yh(e,t,n,o,f),p=Zh(f,m);p;){Xh(d,f,p,m,h);let e=Zh(h,m);e&&(Xh(d,h,e,m,h),p=e),qh(l,h),Jh(d,h),ig(m,i,p),r&&l.length>n&&(l=[],u.push(l),qh(l,d)),p=Zh(f,m)}qh(l,f),Jh(d,f)}return r?u:u[0]}var $h=0,eg=1;function tg(e,t=null,n){if(!e.length)return[];let{size:r=2,gridResolution:i=10,gridOffset:a=[0,0],edgeTypes:o=!1}=n||{},s=[],c=[{pos:e,types:o?Array(e.length/r).fill(eg):null,holes:t||[]}],l=[[],[]],u=[];for(;c.length;){let{pos:e,types:t,holes:n}=c.shift();ag(e,r,n[0]||e.length,l),u=rg(l[0],i,a,u);let d=Zh(l[1],u);if(d){let i=ng(e,t,r,0,n[0]||e.length,u,d),a={pos:i[0].pos,types:i[0].types,holes:[]},s={pos:i[1].pos,types:i[1].types,holes:[]};c.push(a,s);for(let c=0;c<n.length;c++)i=ng(e,t,r,n[c],n[c+1]||e.length,u,d),i[0]&&(a.holes.push(a.pos.length),a.pos=og(a.pos,i[0].pos),o&&(a.types=og(a.types,i[0].types))),i[1]&&(s.holes.push(s.pos.length),s.pos=og(s.pos,i[1].pos),o&&(s.types=og(s.types,i[1].types)))}else{let r={positions:e};o&&(r.edgeTypes=t),n.length&&(r.holeIndices=n),s.push(r)}}return s}function ng(e,t,n,r,i,a,o){let s=(i-r)/n,c=[],l=[],u=[],d=[],f=[],p,m,h,g=Yh(e,s-1,n,r),_=Math.sign(o&8?g[1]-a[3]:g[0]-a[2]),v=t&&t[s-1],y=0,b=0;for(let i=0;i<s;i++)p=Yh(e,i,n,r,p),m=Math.sign(o&8?p[1]-a[3]:p[0]-a[2]),h=t&&t[r/n+i],m&&_&&_!==m&&(Xh(g,p,o,a,f),qh(c,f)&&u.push(v),qh(l,f)&&d.push(v)),m<=0?(qh(c,p)&&u.push(h),y-=m):u.length&&(u[u.length-1]=$h),m>=0?(qh(l,p)&&d.push(h),b+=m):d.length&&(d[d.length-1]=$h),Jh(g,p),_=m,v=h;return[y?{pos:c,types:t&&u}:null,b?{pos:l,types:t&&d}:null]}function rg(e,t,n,r){let i=Math.floor((e[0]-n[0])/t)*t+n[0],a=Math.floor((e[1]-n[1])/t)*t+n[1];return r[0]=i,r[1]=a,r[2]=i+t,r[3]=a+t,r}function ig(e,t,n){n&8?(e[1]+=t,e[3]+=t):n&4?(e[1]-=t,e[3]-=t):n&2?(e[0]+=t,e[2]+=t):n&1&&(e[0]-=t,e[2]-=t)}function ag(e,t,n,r){let i=1/0,a=-1/0,o=1/0,s=-1/0;for(let r=0;r<n;r+=t){let t=e[r],n=e[r+1];i=t<i?t:i,a=t>a?t:a,o=n<o?n:o,s=n>s?n:s}return r[0][0]=i,r[0][1]=o,r[1][0]=a,r[1][1]=s,r}function og(e,t){for(let n=0;n<t.length;n++)e.push(t[n]);return e}var sg=85.051129;function cg(e,t){let{size:n=2,startIndex:r=0,endIndex:i=e.length,normalize:a=!0}=t||{},o=e.slice(r,i);fg(o,n,0,i-r);let s=Qh(o,{size:n,broken:!0,gridResolution:360,gridOffset:[-180,-180]});if(a)for(let e of s)pg(e,n);return s}function lg(e,t=null,n){let{size:r=2,normalize:i=!0,edgeTypes:a=!1}=n||{};t||=[];let o=[],s=[],c=0,l=0;for(let i=0;i<=t.length;i++){let a=t[i]||e.length,u=l,d=ug(e,r,c,a);for(let t=d;t<a;t++)o[l++]=e[t];for(let t=c;t<d;t++)o[l++]=e[t];fg(o,r,u,l),dg(o,r,u,l,n?.maxLatitude),c=a,s[i]=l}s.pop();let u=tg(o,s,{size:r,gridResolution:360,gridOffset:[-180,-180],edgeTypes:a});if(i)for(let e of u)pg(e.positions,r);return u}function ug(e,t,n,r){let i=-1,a=-1;for(let o=n+1;o<r;o+=t){let t=Math.abs(e[o]);t>i&&(i=t,a=o-1)}return a}function dg(e,t,n,r,i=sg){let a=e[n],o=e[r-t];if(Math.abs(a-o)>180){let r=Yh(e,0,t,n);r[0]+=Math.round((o-a)/360)*360,qh(e,r),r[1]=Math.sign(r[1])*i,qh(e,r),r[0]=a,qh(e,r)}}function fg(e,t,n,r){let i=e[0],a;for(let o=n;o<r;o+=t){a=e[o];let t=a-i;(t>180||t<-180)&&(a-=Math.round(t/360)*360),e[o]=i=a}}function pg(e,t){let n,r=e.length/t;for(let i=0;i<r&&(n=e[i*t],(n+180)%360==0);i++);let i=-Math.round(n/360)*360;if(i!==0)for(let n=0;n<r;n++)e[n*t]+=i}function mg(e,t,n,r){let i;if(Array.isArray(e[0])){let n=e.length*t;i=Array(n);for(let n=0;n<e.length;n++)for(let r=0;r<t;r++)i[n*t+r]=e[n][r]||0}else i=e;return n?Qh(i,{size:t,gridResolution:n}):r?cg(i,{size:t}):i}var hg=1,gg=2,_g=4,vg=class extends ah{constructor(e){super({...e,attributes:{positions:{size:3,padding:18,initialize:!0,type:e.fp64?Float64Array:Float32Array},segmentTypes:{size:1,type:e.isWebGPU?Float32Array:Uint8ClampedArray}}})}get(e){return this.attributes[e]}getPathSegmentIndices(e){let t=this.attributes.segmentTypes,n=this.vertexStarts[e],r=Math.min(this.vertexStarts[e+1]??this.instanceCount,this.instanceCount),i=[];for(let e=n;e<r-1;e++)(t[e]&_g)===0&&i.push(e);return i.length&&(t[n]&_g)!==0&&i.unshift(i.pop()),i}getGeometryFromBuffer(e){return this.normalize||this.opts.isWebGPU?super.getGeometryFromBuffer(e):null}normalizeGeometry(e){return this.normalize?mg(e,this.positionSize,this.opts.resolution,this.opts.wrapLongitude):e}getGeometrySize(e){if(yg(e)){let t=0;for(let n of e)t+=this.getGeometrySize(n);return t}let t=this.getPathLength(e);return t<2?0:this.isClosed(e)?t<3?0:t+2:t}updateGeometryAttributes(e,t){if(t.geometrySize!==0){if(e&&yg(e))for(let n of e){let e=this.getGeometrySize(n);t.geometrySize=e,this.updateGeometryAttributes(n,t),t.vertexStart+=e}else this._updateSegmentTypes(e,t),this._updatePositions(e,t)}}_updateSegmentTypes(e,t){let n=this.attributes.segmentTypes,r=e?this.isClosed(e):!1,{vertexStart:i,geometrySize:a}=t;n.fill(0,i,i+a),r?(n[i]=_g,n[i+a-2]=_g):(n[i]+=hg,n[i+a-2]+=gg),n[i+a-1]=_g}_updatePositions(e,t){let{positions:n}=this.attributes;if(!n||!e)return;let{vertexStart:r,geometrySize:i}=t,a=[,,,];for(let t=r,o=0;o<i;t++,o++)this.getPointOnPath(e,o,a),n[t*3]=a[0],n[t*3+1]=a[1],n[t*3+2]=a[2]}getPathLength(e){return e.length/this.positionSize}getPointOnPath(e,t,n=[]){let{positionSize:r}=this;t*r>=e.length&&(t+=1-e.length/r);let i=t*r;return n[0]=e[i],n[1]=e[i+1],n[2]=r===3&&e[i+2]||0,n}isClosed(e){if(!this.normalize)return!!this.opts.loop;let{positionSize:t}=this,n=e.length-t;return e[0]===e[n]&&e[1]===e[n+1]&&(t===2||e[2]===e[n+2])}};function yg(e){return Array.isArray(e[0])}var bg=`struct PathUniforms {
  widthScale: f32,
  widthMinPixels: f32,
  widthMaxPixels: f32,
  jointType: f32,
  capType: f32,
  miterLimit: f32,
  billboard: f32,
  widthUnits: i32,
};

@group(0) @binding(auto)
var<uniform> path: PathUniforms;
`,xg=`layout(std140) uniform pathUniforms {
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  float jointType;
  float capType;
  float miterLimit;
  bool billboard;
  highp int widthUnits;
} path;
`,Sg={name:`path`,source:bg,vs:xg,fs:xg,uniformTypes:{widthScale:`f32`,widthMinPixels:`f32`,widthMaxPixels:`f32`,jointType:`f32`,capType:`f32`,miterLimit:`f32`,billboard:`f32`,widthUnits:`i32`}},Cg=`const EPSILON: f32 = 0.001;
const ZERO_OFFSET: vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);

struct JoinResult {
  offset: vec3<f32>,
  cornerOffset: vec2<f32>,
  miterLength: f32,
  pathPosition: vec2<f32>,
  pathLength: f32,
  jointType: f32,
};

struct Attributes {
  @location(0) positions: vec2<f32>,
  @location(1) instanceTypes: f32,
  @location(2) instanceLeftPositions: vec3<f32>,
  @location(3) instanceStartPositions: vec3<f32>,
  @location(4) instanceEndPositions: vec3<f32>,
  @location(5) instanceRightPositions: vec3<f32>,
  @location(6) instanceLeftPositions64Low: vec3<f32>,
  @location(7) instanceStartPositions64Low: vec3<f32>,
  @location(8) instanceEndPositions64Low: vec3<f32>,
  @location(9) instanceRightPositions64Low: vec3<f32>,
  @location(10) instanceStrokeWidths: f32,
  @location(11) instanceColors: vec4<f32>,
  @location(12) rowIndexes: u32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vColor: vec4<f32>,
  @location(1) vCornerOffset: vec2<f32>,
  @location(2) vMiterLength: f32,
  @location(3) vPathPosition: vec2<f32>,
  @location(4) vPathLength: f32,
  @location(5) vJointType: f32,
  // Location 6 is reserved for TripsLayer's injected vTime varying.
  @location(7) clipCoordinates: vec2<f32>,
#ifdef DASH_ENABLED
  @location(8) vPathBounds: vec2<f32>,
#endif
};

fn flipIfTrue(flag: bool) -> f32 {
  return select(1.0, -1.0, flag);
}

fn clipLine(position: vec4<f32>, refPosition: vec4<f32>) -> vec4<f32> {
  if (position.w < EPSILON) {
    let r = (EPSILON - refPosition.w) / (position.w - refPosition.w);
    return refPosition + (position - refPosition) * r;
  }
  return position;
}

#ifdef DASH_ENABLED
// Return the visible interval of the original segment before clipLine moves either endpoint.
fn getClippedPathRange(startW: f32, endW: f32) -> vec2<f32> {
  let startClipped = startW < EPSILON;
  let endClipped = endW < EPSILON;
  if (startClipped && endClipped) {
    return vec2<f32>(0.0, 0.0);
  }
  if (startClipped || endClipped) {
    let intersection = clamp((EPSILON - startW) / (endW - startW), 0.0, 1.0);
    if (startClipped) {
      return vec2<f32>(intersection, 1.0);
    }
    return vec2<f32>(0.0, intersection);
  }
  return vec2<f32>(0.0, 1.0);
}
#endif

fn getLineJoinOffset(
  prevPoint: vec3<f32>,
  currPoint: vec3<f32>,
  nextPoint: vec3<f32>,
  width: vec2<f32>,
#ifdef DASH_ENABLED
  sourcePathLength: f32,
  sourcePathRange: vec2<f32>,
#endif
#ifdef ANTIALIASING
  coverageScale: f32,
#endif
  positions: vec2<f32>,
  instanceTypes: f32
) -> JoinResult {
  let isEnd = positions.x > 0.0;
  let sideOfPath = positions.y;
  let isJoint = select(0.0, 1.0, sideOfPath == 0.0);

  var deltaA3 = currPoint - prevPoint;
  var deltaB3 = nextPoint - currPoint;

  let rotationResult = project_needs_rotation(currPoint);
  if (path.billboard == 0.0 && rotationResult.needsRotation) {
    deltaA3 = rotationResult.transform * deltaA3;
    deltaB3 = rotationResult.transform * deltaB3;
  }

  let deltaA = deltaA3.xy / width;
  let deltaB = deltaB3.xy / width;

  let lenA = length(deltaA);
  let lenB = length(deltaB);

  let dirA = select(vec2<f32>(0.0, 0.0), normalize(deltaA), lenA > 0.0);
  let dirB = select(vec2<f32>(0.0, 0.0), normalize(deltaB), lenB > 0.0);

  let perpA = vec2<f32>(-dirA.y, dirA.x);
  let perpB = vec2<f32>(-dirB.y, dirB.x);

  var tangent = dirA + dirB;
  tangent = select(perpA, normalize(tangent), length(tangent) > 0.0);
  let miterVec = vec2<f32>(-tangent.y, tangent.x);
  let dir = select(dirB, dirA, isEnd);
  let perp = select(perpB, perpA, isEnd);
#ifdef DASH_ENABLED
  let segmentLength2D = select(lenB, lenA, isEnd);

  // Extrusion happens in the XY plane, so segmentLength2D is a 2D length and pathPosition.y
  // below measures 2D distance along the segment. For a path that also moves in Z the true
  // arc length is longer by this ratio. Scaling pathLength and pathPosition.y by it makes
  // the coordinate measure real 3D distance while leaving the joint tests unchanged, since
  // they compare the two against each other and both are scaled alike. Billboard mode
  // extrudes in clip space, where the perspective divide has already reduced the segment to
  // its screen projection, so its complete common-space length is supplied by the caller.
  // Mirrors path-layer-vertex.glsl.ts.
  let currDelta3 = select(deltaB3, deltaA3, isEnd);
  let currLength2D = length(currDelta3.xy);
  // Do not clamp a valid denominator to EPSILON: high-zoom Web Mercator deltas are often
  // smaller than that in common space, and changing their scale corrupts even flat paths.
  let safeLength2D = select(1.0, currLength2D, currLength2D > 0.0);
  var arcLengthRatio = 1.0;
  var pathPositionOffset = 0.0;
  var pathLength = segmentLength2D;
  if (path.billboard != 0.0) {
    // clipLine may shorten the visible screen-space segment. Preserve the corresponding interval
    // of the complete common-space arclength instead of compressing the full dash period into the
    // visible span. Keep pathLength complete so justification is stable as the camera clips it.
    let visiblePathLength = sourcePathLength * (sourcePathRange.y - sourcePathRange.x);
    arcLengthRatio = 0.0;
    if (segmentLength2D > 0.0) {
      arcLengthRatio = visiblePathLength / segmentLength2D;
    }
    pathPositionOffset = sourcePathLength * sourcePathRange.x;
    pathLength = sourcePathLength;
  } else if (currLength2D > 0.0) {
    arcLengthRatio = length(currDelta3) / safeLength2D;
    pathLength = segmentLength2D * arcLengthRatio;
  }
#else
  let pathLength = select(lenB, lenA, isEnd);
#endif

  let sinHalfA = abs(dot(miterVec, perp));
  let cosHalfA = abs(dot(dirA, miterVec));
  let turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);
  let cornerPosition = sideOfPath * turnDirection;

  var miterSize = 1.0 / max(sinHalfA, EPSILON);
  miterSize = mix(
    min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),
    miterSize,
    step(0.0, cornerPosition)
  );

  var offsetVec =
    mix(miterVec * miterSize, perp, step(0.5, cornerPosition)) *
    (sideOfPath + isJoint * turnDirection);

  let isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));
  let isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));
  let isCap = isStartCap || isEndCap;

  var jointType = path.jointType;
  if (isCap) {
    offsetVec = mix(
      perp * sideOfPath,
      dir * path.capType * 4.0 * flipIfTrue(isStartCap),
      isJoint
    );
    jointType = path.capType;
  }

#ifdef ANTIALIASING
  let coverageOffsetVec = offsetVec * coverageScale;
  var miterLength = dot(coverageOffsetVec, miterVec * turnDirection);
#else
  var miterLength = dot(offsetVec, miterVec * turnDirection);
#endif
  miterLength = select(miterLength, isJoint, isCap);

#ifdef ANTIALIASING
  let offsetFromStartOfPath = coverageOffsetVec + deltaA * select(0.0, 1.0, isEnd);
#else
  let offsetFromStartOfPath = offsetVec + deltaA * select(0.0, 1.0, isEnd);
#endif
  let pathPosition = vec2<f32>(
    dot(offsetFromStartOfPath, perp),
#ifdef DASH_ENABLED
    pathPositionOffset + dot(offsetFromStartOfPath, dir) * arcLengthRatio
#else
    dot(offsetFromStartOfPath, dir)
#endif
  );
  let isValid = step(f32(instanceTypes), 3.5);
#ifdef ANTIALIASING
  var offset = vec3<f32>(coverageOffsetVec * width * isValid, 0.0);
#else
  var offset = vec3<f32>(offsetVec * width * isValid, 0.0);
#endif

  if (path.billboard == 0.0 && rotationResult.needsRotation) {
    offset = rotationResult.transform * offset;
  }

#ifdef ANTIALIASING
  return JoinResult(
    offset, coverageOffsetVec, miterLength, pathPosition, pathLength, jointType
  );
#else
  return JoinResult(offset, offsetVec, miterLength, pathPosition, pathLength, jointType);
#endif
}

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);

  let isEnd = attributes.positions.x;

  let prevPosition = mix(attributes.instanceLeftPositions, attributes.instanceStartPositions, isEnd);
  let prevPosition64Low = mix(
    attributes.instanceLeftPositions64Low,
    attributes.instanceStartPositions64Low,
    isEnd
  );
  let currPosition = mix(attributes.instanceStartPositions, attributes.instanceEndPositions, isEnd);
  let currPosition64Low = mix(
    attributes.instanceStartPositions64Low,
    attributes.instanceEndPositions64Low,
    isEnd
  );
  let nextPosition = mix(attributes.instanceEndPositions, attributes.instanceRightPositions, isEnd);
  let nextPosition64Low = mix(
    attributes.instanceEndPositions64Low,
    attributes.instanceRightPositions64Low,
    isEnd
  );

  geometry.worldPosition = currPosition;

  let widthPixels =
    clamp(
      project_unit_size_to_pixel(attributes.instanceStrokeWidths * path.widthScale, path.widthUnits),
      path.widthMinPixels,
      path.widthMaxPixels
    ) / 2.0;

  if (path.billboard != 0.0) {
#ifdef DASH_ENABLED
    let prevProjection = project_position_to_clipspace_and_commonspace(
      prevPosition, prevPosition64Low, ZERO_OFFSET
    );
    let nextProjection = project_position_to_clipspace_and_commonspace(
      nextPosition, nextPosition64Low, ZERO_OFFSET
    );
    let prevPositionCommon = prevProjection.commonPosition.xyz;
    let nextPositionCommon = nextProjection.commonPosition.xyz;
    var prevPositionScreen = prevProjection.clipPosition;
    var nextPositionScreen = nextProjection.clipPosition;
#else
    var prevPositionScreen = project_position_to_clipspace(
      prevPosition, prevPosition64Low, ZERO_OFFSET
    );
    var nextPositionScreen = project_position_to_clipspace(
      nextPosition, nextPosition64Low, ZERO_OFFSET
    );
#endif
    let currProjection = project_position_to_clipspace_and_commonspace(
      currPosition, currPosition64Low, ZERO_OFFSET
    );
    geometry.position = currProjection.commonPosition;
    var currPositionScreen = currProjection.clipPosition;
#ifdef DASH_ENABLED
    let currPositionCommon = currProjection.commonPosition.xyz;
    let sourcePathStartScreen = mix(currPositionScreen, prevPositionScreen, isEnd);
    let sourcePathEndScreen = mix(nextPositionScreen, currPositionScreen, isEnd);
    let billboardPathRange = getClippedPathRange(
      sourcePathStartScreen.w, sourcePathEndScreen.w
    );
#endif

    prevPositionScreen = clipLine(prevPositionScreen, currPositionScreen);
    nextPositionScreen = clipLine(nextPositionScreen, currPositionScreen);
    currPositionScreen = clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));

#ifdef ANTIALIASING
    let coverageScale = select(
      1.0,
      (widthPixels + 0.5 / project.devicePixelRatio) / max(widthPixels, 1e-6),
      widthPixels > 0.0
    );
#endif
#ifdef DASH_ENABLED
    let currentDeltaCommon = select(
      nextPositionCommon - currPositionCommon,
      currPositionCommon - prevPositionCommon,
      isEnd > 0.0
    );
    let billboardPathLength = select(
      0.0,
      length(currentDeltaCommon) * project.scale / (widthPixels * project.focalDistance),
      widthPixels > 0.0
    );
#endif
    let join = getLineJoinOffset(
      prevPositionScreen.xyz / prevPositionScreen.w,
      currPositionScreen.xyz / currPositionScreen.w,
      nextPositionScreen.xyz / nextPositionScreen.w,
      project_pixel_size_to_clipspace(vec2<f32>(widthPixels, widthPixels)),
#ifdef DASH_ENABLED
      billboardPathLength,
      billboardPathRange,
#endif
#ifdef ANTIALIASING
      coverageScale,
#endif
      attributes.positions,
      attributes.instanceTypes
    );
#ifdef DASH_ENABLED
    // Phase and justification use the complete source segment, while cap and joint coverage
    // must still recognize the endpoints moved by clipLine.
    varyings.vPathBounds = billboardPathLength * billboardPathRange;
#endif

    geometry.uv = join.pathPosition;
    varyings.position = vec4<f32>(
      currPositionScreen.xyz + join.offset * currPositionScreen.w,
      currPositionScreen.w
    );
    varyings.vCornerOffset = join.cornerOffset;
    varyings.vMiterLength = join.miterLength;
    varyings.vPathPosition = join.pathPosition;
    varyings.vPathLength = join.pathLength;
    varyings.vJointType = join.jointType;
  } else {
    let prevPositionCommon = project_position_vec3_f64(prevPosition, prevPosition64Low);
    let currPositionCommon = project_position_vec3_f64(currPosition, currPosition64Low);
    let nextPositionCommon = project_position_vec3_f64(nextPosition, nextPosition64Low);

    let width = vec2<f32>(
      project_pixel_size_float(widthPixels),
      project_pixel_size_float(widthPixels)
    );
#ifdef ANTIALIASING
    let coverageScale = select(
      1.0,
      (widthPixels + 0.5 / project.devicePixelRatio) / max(widthPixels, 1e-6),
      widthPixels > 0.0
    );
#endif
    let join = getLineJoinOffset(
      prevPositionCommon,
      currPositionCommon,
      nextPositionCommon,
      width,
#ifdef DASH_ENABLED
      1.0,
      vec2<f32>(0.0, 1.0),
#endif
#ifdef ANTIALIASING
      coverageScale,
#endif
      attributes.positions,
      attributes.instanceTypes
    );
#ifdef DASH_ENABLED
    varyings.vPathBounds = vec2<f32>(0.0, join.pathLength);
#endif

    geometry.position = vec4<f32>(currPositionCommon + join.offset, 1.0);
    geometry.uv = join.pathPosition;
    varyings.position = project_common_position_to_clipspace(geometry.position);
    varyings.vCornerOffset = join.cornerOffset;
    varyings.vMiterLength = join.miterLength;
    varyings.vPathPosition = join.pathPosition;
    varyings.vPathLength = join.pathLength;
    varyings.vJointType = join.jointType;
  }

  varyings.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&varyings.position, geometry.worldPosition.xy);

  varyings.vColor = vec4<f32>(
    attributes.instanceColors.rgb,
    attributes.instanceColors.a * layer.opacity
  );
  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = varyings.vPathPosition;

#ifdef ANTIALIASING
  // Coordinates of the outer silhouette, in units of half-width: rounded joints and caps are
  // bounded by the corner offset, everywhere else by the edge of the stroke. Dividing by the
  // screen-space derivative converts the distance to the boundary into device pixels, which stays
  // correct under perspective foreshortening and under extensions that rescale the stroke.
#ifdef DASH_ENABLED
  let isCorner =
    varyings.vPathPosition.y < varyings.vPathBounds.x ||
    varyings.vPathPosition.y > varyings.vPathBounds.y;
#else
  let isCorner = varyings.vPathPosition.y < 0.0 || varyings.vPathPosition.y > varyings.vPathLength;
#endif
  let isRound = varyings.vJointType > 0.5;

  // Distance to the silhouette in device pixels, from the derivative of the coordinate that
  // bounds it. Computed before the discards below: derivatives need uniform control flow and are
  // undefined after a discard in the quad. See dev-docs/RFCs/v9.4/analytic-antialiasing-rfc.md
  let bodyCoord = abs(varyings.vPathPosition.x);
  let cornerCoord = length(varyings.vCornerOffset);
  // Both evaluated so each derivative stays on one field across the corner/body boundary
  let bodyPixels = (1.0 - bodyCoord) / max(fwidth(bodyCoord), 1e-6);
  let cornerPixels = (1.0 - cornerCoord) / max(fwidth(cornerCoord), 1e-6);
#ifdef PATH_STYLE_OFFSET
  // Rounded corners still intersect the stroke-width envelope. Extensions may remap
  // vPathPosition.x independently of vCornerOffset, as PathStyleExtension does for offsets.
  let edgePixels = select(bodyPixels, min(cornerPixels, bodyPixels), isRound && isCorner);
#else
  let edgePixels = select(bodyPixels, cornerPixels, isRound && isCorner);
#endif

  // Fragments outside the coverage ramp must not write depth or picking colors.
  if (edgePixels <= -SMOOTH_EDGE_RADIUS) {
    discard;
  }

  if (isCorner) {
    if (!isRound && varyings.vMiterLength > path.miterLimit + 1.0) {
      discard;
    }
  }

  var color = varyings.vColor;

  // Feather one device pixel across the width only, before premultiplication. edgePixels is a
  // signed device-pixel distance and SMOOTH_EDGE_RADIUS is 0.5, so this ramps across one pixel.
  color.a *= smoothedge(0.0, edgePixels);
#else
#ifdef DASH_ENABLED
  if (
    varyings.vPathPosition.y < varyings.vPathBounds.x ||
    varyings.vPathPosition.y > varyings.vPathBounds.y
  ) {
#else
  if (
    varyings.vPathPosition.y < 0.0 ||
    varyings.vPathPosition.y > varyings.vPathLength
  ) {
#endif
    if (varyings.vJointType > 0.5 && length(varyings.vCornerOffset) > 1.0) {
      discard;
    }
    if (
      varyings.vJointType < 0.5 &&
      varyings.vMiterLength > path.miterLimit + 1.0
    ) {
      discard;
    }
  }
#endif

  // Fragment-layer injections that discard pixels must run after analytic coverage derivatives.
  // See TripsLayer, which rejects fragments outside of the active time window at this anchor.
  // DECKGL_FILTER_COLOR
  clip_filterColor(varyings.clipCoordinates);
#ifdef ANTIALIASING
  return deckgl_premultiplied_alpha(color);
#else
  return deckgl_premultiplied_alpha(varyings.vColor);
#endif
}
`,wg=`#version 300 es
#define SHADER_NAME path-layer-vertex-shader
in vec2 positions;
in float instanceTypes;
in vec3 instanceStartPositions;
in vec3 instanceEndPositions;
in vec3 instanceLeftPositions;
in vec3 instanceRightPositions;
in vec3 instanceLeftPositions64Low;
in vec3 instanceStartPositions64Low;
in vec3 instanceEndPositions64Low;
in vec3 instanceRightPositions64Low;
in float instanceStrokeWidths;
in vec4 instanceColors;
in float rowIndexes;
uniform float opacity;
out vec4 vColor;
out vec2 vCornerOffset;
out float vMiterLength;
out vec2 vPathPosition;
out float vPathLength;
out float vJointType;
#ifdef DASH_ENABLED
out vec2 vPathBounds;
#endif
const float EPSILON = 0.001;
const vec3 ZERO_OFFSET = vec3(0.0);
float flipIfTrue(bool flag) {
return -(float(flag) * 2. - 1.);
}
vec3 getLineJoinOffset(
vec3 prevPoint, vec3 currPoint, vec3 nextPoint,
vec2 width
#ifdef DASH_ENABLED
, float sourcePathLength, vec2 sourcePathRange
#endif
#ifdef ANTIALIASING
, float coverageScale
#endif
) {
bool isEnd = positions.x > 0.0;
float sideOfPath = positions.y;
float isJoint = float(sideOfPath == 0.0);
vec3 deltaA3 = (currPoint - prevPoint);
vec3 deltaB3 = (nextPoint - currPoint);
mat3 rotationMatrix;
bool needsRotation = !path.billboard && project_needs_rotation(currPoint, rotationMatrix);
if (needsRotation) {
deltaA3 = deltaA3 * rotationMatrix;
deltaB3 = deltaB3 * rotationMatrix;
}
vec2 deltaA = deltaA3.xy / width;
vec2 deltaB = deltaB3.xy / width;
float lenA = length(deltaA);
float lenB = length(deltaB);
vec2 dirA = lenA > 0. ? normalize(deltaA) : vec2(0.0, 0.0);
vec2 dirB = lenB > 0. ? normalize(deltaB) : vec2(0.0, 0.0);
vec2 perpA = vec2(-dirA.y, dirA.x);
vec2 perpB = vec2(-dirB.y, dirB.x);
vec2 tangent = dirA + dirB;
tangent = length(tangent) > 0. ? normalize(tangent) : perpA;
vec2 miterVec = vec2(-tangent.y, tangent.x);
vec2 dir = isEnd ? dirA : dirB;
vec2 perp = isEnd ? perpA : perpB;
float L = isEnd ? lenA : lenB;
#ifdef DASH_ENABLED
vec3 currDelta3 = isEnd ? deltaA3 : deltaB3;
float currLength2D = length(currDelta3.xy);
float arcLengthRatio = 1.0;
float pathPositionOffset = 0.0;
float pathLength = L;
if (path.billboard) {
float visiblePathLength = sourcePathLength * (sourcePathRange.y - sourcePathRange.x);
arcLengthRatio = L > 0.0 ? visiblePathLength / L : 0.0;
pathPositionOffset = sourcePathLength * sourcePathRange.x;
pathLength = sourcePathLength;
} else if (currLength2D > 0.0) {
arcLengthRatio = length(currDelta3) / currLength2D;
pathLength = L * arcLengthRatio;
}
#endif
float sinHalfA = abs(dot(miterVec, perp));
float cosHalfA = abs(dot(dirA, miterVec));
float turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);
float cornerPosition = sideOfPath * turnDirection;
float miterSize = 1.0 / max(sinHalfA, EPSILON);
miterSize = mix(
min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),
miterSize,
step(0.0, cornerPosition)
);
vec2 offsetVec = mix(miterVec * miterSize, perp, step(0.5, cornerPosition))
* (sideOfPath + isJoint * turnDirection);
bool isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));
bool isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));
bool isCap = isStartCap || isEndCap;
if (isCap) {
offsetVec = mix(perp * sideOfPath, dir * path.capType * 4.0 * flipIfTrue(isStartCap), isJoint);
vJointType = path.capType;
} else {
vJointType = path.jointType;
}
#ifdef ANTIALIASING
vec2 coverageOffsetVec = offsetVec * coverageScale;
#ifdef DASH_ENABLED
vPathLength = pathLength;
#else
vPathLength = L;
#endif
vCornerOffset = coverageOffsetVec;
vMiterLength = dot(vCornerOffset, miterVec * turnDirection);
vMiterLength = isCap ? isJoint : vMiterLength;
vec2 offsetFromStartOfPath = coverageOffsetVec + deltaA * float(isEnd);
vPathPosition = vec2(
dot(offsetFromStartOfPath, perp),
#ifdef DASH_ENABLED
pathPositionOffset + dot(offsetFromStartOfPath, dir) * arcLengthRatio
#else
dot(offsetFromStartOfPath, dir)
#endif
);
geometry.uv = vPathPosition;
float isValid = step(instanceTypes, 3.5);
vec3 offset = vec3(coverageOffsetVec * width * isValid, 0.0);
#else
#ifdef DASH_ENABLED
vPathLength = pathLength;
#else
vPathLength = L;
#endif
vCornerOffset = offsetVec;
vMiterLength = dot(vCornerOffset, miterVec * turnDirection);
vMiterLength = isCap ? isJoint : vMiterLength;
vec2 offsetFromStartOfPath = vCornerOffset + deltaA * float(isEnd);
vPathPosition = vec2(
dot(offsetFromStartOfPath, perp),
#ifdef DASH_ENABLED
pathPositionOffset + dot(offsetFromStartOfPath, dir) * arcLengthRatio
#else
dot(offsetFromStartOfPath, dir)
#endif
);
geometry.uv = vPathPosition;
float isValid = step(instanceTypes, 3.5);
vec3 offset = vec3(offsetVec * width * isValid, 0.0);
#endif
if (needsRotation) {
offset = rotationMatrix * offset;
}
return offset;
}
void clipLine(inout vec4 position, vec4 refPosition) {
if (position.w < EPSILON) {
float r = (EPSILON - refPosition.w) / (position.w - refPosition.w);
position = refPosition + (position - refPosition) * r;
}
}
#ifdef DASH_ENABLED
vec2 getClippedPathRange(float startW, float endW) {
bool startClipped = startW < EPSILON;
bool endClipped = endW < EPSILON;
if (startClipped && endClipped) {
return vec2(0.0);
}
if (startClipped || endClipped) {
float intersection = clamp((EPSILON - startW) / (endW - startW), 0.0, 1.0);
return startClipped ? vec2(intersection, 1.0) : vec2(0.0, intersection);
}
return vec2(0.0, 1.0);
}
#endif
void main() {
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
vColor = vec4(instanceColors.rgb, instanceColors.a * layer.opacity);
float isEnd = positions.x;
vec3 prevPosition = mix(instanceLeftPositions, instanceStartPositions, isEnd);
vec3 prevPosition64Low = mix(instanceLeftPositions64Low, instanceStartPositions64Low, isEnd);
vec3 currPosition = mix(instanceStartPositions, instanceEndPositions, isEnd);
vec3 currPosition64Low = mix(instanceStartPositions64Low, instanceEndPositions64Low, isEnd);
vec3 nextPosition = mix(instanceEndPositions, instanceRightPositions, isEnd);
vec3 nextPosition64Low = mix(instanceEndPositions64Low, instanceRightPositions64Low, isEnd);
geometry.worldPosition = currPosition;
vec2 widthPixels = vec2(clamp(
project_size_to_pixel(instanceStrokeWidths * path.widthScale, path.widthUnits),
path.widthMinPixels, path.widthMaxPixels) / 2.0);
vec3 width;
if (path.billboard) {
#ifdef DASH_ENABLED
vec4 prevPositionCommon;
vec4 nextPositionCommon;
vec4 prevPositionScreen = project_position_to_clipspace(
prevPosition, prevPosition64Low, ZERO_OFFSET, prevPositionCommon
);
#else
vec4 prevPositionScreen = project_position_to_clipspace(
prevPosition, prevPosition64Low, ZERO_OFFSET
);
#endif
vec4 currPositionScreen = project_position_to_clipspace(currPosition, currPosition64Low, ZERO_OFFSET, geometry.position);
#ifdef DASH_ENABLED
vec4 nextPositionScreen = project_position_to_clipspace(
nextPosition, nextPosition64Low, ZERO_OFFSET, nextPositionCommon
);
#else
vec4 nextPositionScreen = project_position_to_clipspace(
nextPosition, nextPosition64Low, ZERO_OFFSET
);
#endif
#ifdef DASH_ENABLED
vec4 sourcePathStartScreen = mix(currPositionScreen, prevPositionScreen, isEnd);
vec4 sourcePathEndScreen = mix(nextPositionScreen, currPositionScreen, isEnd);
vec2 billboardPathRange = getClippedPathRange(
sourcePathStartScreen.w, sourcePathEndScreen.w
);
#endif
clipLine(prevPositionScreen, currPositionScreen);
clipLine(nextPositionScreen, currPositionScreen);
clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));
width = vec3(widthPixels, 0.0);
DECKGL_FILTER_SIZE(width, geometry);
#ifdef ANTIALIASING
vec2 coveragePadding = vec2(0.5 / project.devicePixelRatio);
float coverageScale = length(width.xy) > 0.0
? length(width.xy + coveragePadding) / length(width.xy)
: 1.0;
#endif
#ifdef DASH_ENABLED
vec3 currentDeltaCommon = isEnd > 0.0
? geometry.position.xyz - prevPositionCommon.xyz
: nextPositionCommon.xyz - geometry.position.xyz;
float billboardPathLength = width.x > 0.0
? length(currentDeltaCommon) * project.scale / (width.x * project.focalDistance)
: 0.0;
#endif
vec3 offset = getLineJoinOffset(
prevPositionScreen.xyz / prevPositionScreen.w,
currPositionScreen.xyz / currPositionScreen.w,
nextPositionScreen.xyz / nextPositionScreen.w,
project_pixel_size_to_clipspace(width.xy)
#ifdef DASH_ENABLED
,
billboardPathLength, billboardPathRange
#endif
#ifdef ANTIALIASING
,
coverageScale
#endif
);
#ifdef DASH_ENABLED
vPathBounds = billboardPathLength * billboardPathRange;
#endif
DECKGL_FILTER_GL_POSITION(currPositionScreen, geometry);
gl_Position = vec4(currPositionScreen.xyz + offset * currPositionScreen.w, currPositionScreen.w);
} else {
prevPosition = project_position(prevPosition, prevPosition64Low);
currPosition = project_position(currPosition, currPosition64Low);
nextPosition = project_position(nextPosition, nextPosition64Low);
width = vec3(project_pixel_size(widthPixels), 0.0);
DECKGL_FILTER_SIZE(width, geometry);
#ifdef ANTIALIASING
vec2 coveragePadding = project_pixel_size(vec2(0.5 / project.devicePixelRatio));
float coverageScale = length(width.xy) > 0.0
? length(width.xy + coveragePadding) / length(width.xy)
: 1.0;
#endif
vec3 offset = getLineJoinOffset(
prevPosition, currPosition, nextPosition, width.xy
#ifdef DASH_ENABLED
, 1.0, vec2(0.0, 1.0)
#endif
#ifdef ANTIALIASING
, coverageScale
#endif
);
#ifdef DASH_ENABLED
vPathBounds = vec2(0.0, vPathLength);
#endif
geometry.position = vec4(currPosition + offset, 1.0);
gl_Position = project_common_position_to_clipspace(geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,Tg=`#version 300 es
#define SHADER_NAME path-layer-fragment-shader
precision highp float;
in vec4 vColor;
in vec2 vCornerOffset;
in float vMiterLength;
in vec2 vPathPosition;
in float vPathLength;
in float vJointType;
#ifdef DASH_ENABLED
in vec2 vPathBounds;
#endif
out vec4 fragColor;
void main(void) {
geometry.uv = vPathPosition;
#ifdef ANTIALIASING
#ifdef DASH_ENABLED
bool isCorner = vPathPosition.y < vPathBounds.x || vPathPosition.y > vPathBounds.y;
#else
bool isCorner = vPathPosition.y < 0.0 || vPathPosition.y > vPathLength;
#endif
bool isRound = vJointType > 0.5;
float bodyCoord = abs(vPathPosition.x);
float cornerCoord = length(vCornerOffset);
float bodyPixels = (1.0 - bodyCoord) / max(fwidth(bodyCoord), 1e-6);
float cornerPixels = (1.0 - cornerCoord) / max(fwidth(cornerCoord), 1e-6);
#ifdef PATH_STYLE_OFFSET
float edgePixels = isRound && isCorner ? min(cornerPixels, bodyPixels) : bodyPixels;
#else
float edgePixels = isRound && isCorner ? cornerPixels : bodyPixels;
#endif
if (edgePixels <= -SMOOTH_EDGE_RADIUS) {
discard;
}
if (isCorner) {
if (!isRound && vMiterLength > path.miterLimit + 1.0) {
discard;
}
}
fragColor = vColor;
fragColor.a *= smoothedge(0.0, edgePixels);
#else
#ifdef DASH_ENABLED
if (vPathPosition.y < vPathBounds.x || vPathPosition.y > vPathBounds.y) {
#else
if (vPathPosition.y < 0.0 || vPathPosition.y > vPathLength) {
#endif
if (vJointType > 0.5 && length(vCornerOffset) > 1.0) {
discard;
}
if (vJointType < 0.5 && vMiterLength > path.miterLimit + 1.0) {
discard;
}
}
fragColor = vColor;
#endif
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,Eg=[0,0,0,255],Dg={widthUnits:`meters`,widthScale:{type:`number`,min:0,value:1},widthMinPixels:{type:`number`,min:0,value:0},widthMaxPixels:{type:`number`,min:0,value:2**53-1},jointRounded:!1,capRounded:!1,miterLimit:{type:`number`,min:0,value:4},antialiasing:!1,billboard:!1,_pathType:null,getPath:{type:`accessor`,value:e=>e.path},getColor:{type:`accessor`,value:Eg},getWidth:{type:`accessor`,value:1},rounded:{deprecatedFor:[`jointRounded`,`capRounded`]}},Og={enter:(e,t)=>t.length?t.subarray(t.length-e.length):e};function kg(e){if(e.isGeospatial)return null;let{unitsPerMeter:t}=e.distanceScales;return[t[0],t[1],t[2]]}function Ag(e,t){return e===t||!!(e&&t&&e.length===t.length&&e.every((e,n)=>e===t[n]))}var jg=class extends Km{getShaders(){let{antialiasing:e}=this.props;return super.getShaders({vs:wg,fs:Tg,source:Cg,defines:e?{ANTIALIASING:1}:{},modules:[wc,lo,xl,Sg,...this.context.device.type===`webgpu`?[Lh]:[]]})}get wrapLongitude(){return!1}getBounds(){return this.context.device.type===`webgpu`?null:this.getAttributeManager()?.getBounds([`vertexPositions`])}getPathProjectionScale(e){let t=this.props.coordinateSystem;if(!this.getAttributeManager()?.getAttributes().instanceDashOffsets)return null;if(e instanceof uu&&e.zoom>=12&&(t==="default"||t===`lnglat`||t===`cartesian`)){let n=Cc.getUniforms({viewport:e,coordinateSystem:t,coordinateOrigin:this.props.coordinateOrigin,autoWrapLongitude:this.wrapLongitude});return[e.projectionMode,n.coordinateOrigin[1],n.commonOrigin[1],...n.commonUnitsPerWorldUnit,...n.commonUnitsPerWorldUnit2,n.commonUnitsPerMeter[2]]}let n=kg(e);return n?[e.projectionMode,...n]:[e.projectionMode]}shouldUpdateState(e){let{viewport:t}=this.context;return super.shouldUpdateState(e)||this.state?.tessellationResolution!==t.resolution||!Ag(this.state?.pathProjectionScale,this.getPathProjectionScale(t))}initializeState(){let e=this.context.device.type===`webgpu`;this.getAttributeManager().addInstanced({...e?{pathPositions:{size:24,type:`float32`,transition:!1,accessor:`getPath`,update:this.calculateWebGPUPositions,shaderAttributes:{instanceLeftPositions:{size:3,elementOffset:0},instanceStartPositions:{size:3,elementOffset:3},instanceEndPositions:{size:3,elementOffset:6},instanceRightPositions:{size:3,elementOffset:9},instanceLeftPositions64Low:{size:3,elementOffset:12},instanceStartPositions64Low:{size:3,elementOffset:15},instanceEndPositions64Low:{size:3,elementOffset:18},instanceRightPositions64Low:{size:3,elementOffset:21}},noAlloc:!0}}:{vertexPositions:{size:3,vertexOffset:1,type:`float64`,fp64:this.use64bitPositions(),transition:Og,accessor:`getPath`,update:this.calculatePositions,noAlloc:!0,shaderAttributes:{instanceLeftPositions:{vertexOffset:0},instanceStartPositions:{vertexOffset:1},instanceEndPositions:{vertexOffset:2},instanceRightPositions:{vertexOffset:3}}}},instanceTypes:{size:1,type:e?`float32`:`uint8`,update:this.calculateSegmentTypes,noAlloc:!0},instanceStrokeWidths:{size:1,accessor:`getWidth`,transition:!e&&Og,defaultValue:1,bufferGroup:`path-instance-data`},instanceColors:{size:this.props.colorFormat.length,type:`unorm8`,accessor:`getColor`,transition:!e&&Og,defaultValue:Eg,bufferGroup:`path-instance-data`},rowIndexes:{size:1,type:`uint32`,accessor:(e,{index:t})=>e&&e.__source?e.__source.index:t,bufferGroup:`path-instance-data`}}),this.setState({pathTesselator:new vg({fp64:this.use64bitPositions(),isWebGPU:e}),tessellationResolution:this.context.viewport.resolution,pathProjectionScale:this.getPathProjectionScale(this.context.viewport)})}updateState(e){super.updateState(e);let{props:t,oldProps:n,changeFlags:r}=e,i=this.getAttributeManager(),{viewport:a}=this.context,o=this.state.tessellationResolution!==a.resolution,s=this.getPathProjectionScale(a),c=!Ag(this.state.pathProjectionScale,s),l=r.updateTriggersChanged&&(r.updateTriggersChanged.all||r.updateTriggersChanged.getPath)||t._pathType!==n._pathType||t.positionFormat!==n.positionFormat||t.wrapLongitude!==n.wrapLongitude||o;if(r.dataChanged||l){let{pathTesselator:e}=this.state,n=t.data.attributes||{};e.updateGeometry({data:t.data,geometryBuffer:n.getPath,buffers:n,normalize:!t._pathType,loop:t._pathType===`loop`,getGeometry:t.getPath,positionFormat:t.positionFormat,wrapLongitude:t.wrapLongitude,resolution:a.resolution,dataChanged:l?void 0:r.dataChanged}),this.setState({numInstances:e.instanceCount,startIndices:e.vertexStarts,tessellationResolution:a.resolution,pathProjectionScale:s}),!r.dataChanged||l?i.invalidateAll():c&&i.invalidate(`instanceDashOffsets`)}else c&&(this.setState({pathProjectionScale:s}),i.invalidate(`instanceDashOffsets`));(r.extensionsChanged||t.antialiasing!==n.antialiasing)&&(this.state.model?.destroy(),this.state.model=this._getModel(),i.invalidateAll())}getPickingInfo(e){let t=super.getPickingInfo(e),{index:n}=t,r=this.props.data;return r[0]&&r[0].__source&&(t.object=r.find(e=>e.__source.index===n)),t}disablePickingIndex(e){let t=this.props.data;if(t[0]&&t[0].__source)for(let n=0;n<t.length;n++)t[n].__source.index===e&&this._disablePickingIndex(n);else super.disablePickingIndex(e)}draw({uniforms:e}){let{jointRounded:t,capRounded:n,billboard:r,miterLimit:i,widthUnits:a,widthScale:o,widthMinPixels:s,widthMaxPixels:c}=this.props,l=this.state.model,u={jointType:Number(t),capType:Number(n),billboard:r,widthUnits:nc[a],widthScale:o,miterLimit:i,widthMinPixels:s,widthMaxPixels:c};l.shaderInputs.setProps({path:u}),l.draw(this.context.renderPass)}_getModel(){let e=[0,1,2,1,4,2,1,3,4,3,5,4],t=[0,0,0,-1,0,1,1,-1,1,1,1,0];return new M(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new N({topology:`triangle-list`,attributes:{indices:new Uint16Array(e),positions:{value:new Float32Array(t),size:2}}}),isInstanced:!0})}calculatePositions(e){let{pathTesselator:t}=this.state;e.startIndices=t.vertexStarts,e.value=t.get(`positions`)}calculateSegmentTypes(e){let{pathTesselator:t}=this.state;e.startIndices=t.vertexStarts,e.value=t.get(`segmentTypes`)}calculateWebGPUPositions(e){let{pathTesselator:t}=this.state,n=t.get(`positions`);if(!n){e.value=null;return}let r=t.instanceCount,i=new Float32Array(r*24),a=[-1,0,1,2];for(let e=0;e<r;e++){let t=e*24;for(let o=0;o<4;o++){let s=e+a[o],c=t+o*3;for(let e=0;e<3;e++){let t=s>=0&&s<r?n[s*3+e]:0,a=Math.fround(t);i[c+e]=a,i[c+e+12]=t-a}}}e.startIndices=t.vertexStarts,e.value=i}};jg.defaultProps=Dg,jg.layerName=`PathLayer`;var Mg=e(r(((e,t)=>{t.exports=n,t.exports.default=n;function n(e,t,n){n||=2;var i=t&&t.length,o=i?t[0]*n:e.length,s=r(e,0,o,n,!0),c=[];if(!s||s.next===s.prev)return c;var l,d,f,p,m,h,g;if(i&&(s=u(e,t,s,n)),e.length>80*n){l=f=e[0],d=p=e[1];for(var _=n;_<o;_+=n)m=e[_],h=e[_+1],m<l&&(l=m),h<d&&(d=h),m>f&&(f=m),h>p&&(p=h);g=Math.max(f-l,p-d),g=g===0?0:32767/g}return a(s,c,n,l,d,g,0),c}function r(e,t,n,r,i){var a,o;if(i===N(e,t,n,r)>0)for(a=t;a<n;a+=r)o=A(a,e[a],e[a+1],o);else for(a=n-r;a>=t;a-=r)o=A(a,e[a],e[a+1],o);return o&&S(o,o.next)&&(j(o),o=o.next),o}function i(e,t){if(!e)return e;t||=e;var n=e,r;do if(r=!1,!n.steiner&&(S(n,n.next)||x(n.prev,n,n.next)===0)){if(j(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function a(e,t,n,r,u,d,f){if(e){!f&&d&&h(e,r,u,d);for(var p=e,m,g;e.prev!==e.next;){if(m=e.prev,g=e.next,d?s(e,r,u,d):o(e)){t.push(m.i/n|0),t.push(e.i/n|0),t.push(g.i/n|0),j(e),e=g.next,p=g.next;continue}if(e=g,e===p){f?f===1?(e=c(i(e),t,n),a(e,t,n,r,u,d,2)):f===2&&l(e,t,n,r,u,d):a(i(e),t,n,r,u,d,1);break}}}}function o(e){var t=e.prev,n=e,r=e.next;if(x(t,n,r)>=0)return!1;for(var i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=i<a?i<o?i:o:a<o?a:o,d=s<c?s<l?s:l:c<l?c:l,f=i>a?i>o?i:o:a>o?a:o,p=s>c?s>l?s:l:c>l?c:l,m=r.next;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&y(i,s,a,c,o,l,m.x,m.y)&&x(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function s(e,t,n,r){var i=e.prev,a=e,o=e.next;if(x(i,a,o)>=0)return!1;for(var s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=s<c?s<l?s:l:c<l?c:l,m=u<d?u<f?u:f:d<f?d:f,h=s>c?s>l?s:l:c>l?c:l,g=u>d?u>f?u:f:d>f?d:f,v=_(p,m,t,n,r),b=_(h,g,t,n,r),S=e.prevZ,C=e.nextZ;S&&S.z>=v&&C&&C.z<=b;){if(S.x>=p&&S.x<=h&&S.y>=m&&S.y<=g&&S!==i&&S!==o&&y(s,u,c,d,l,f,S.x,S.y)&&x(S.prev,S,S.next)>=0||(S=S.prevZ,C.x>=p&&C.x<=h&&C.y>=m&&C.y<=g&&C!==i&&C!==o&&y(s,u,c,d,l,f,C.x,C.y)&&x(C.prev,C,C.next)>=0))return!1;C=C.nextZ}for(;S&&S.z>=v;){if(S.x>=p&&S.x<=h&&S.y>=m&&S.y<=g&&S!==i&&S!==o&&y(s,u,c,d,l,f,S.x,S.y)&&x(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;C&&C.z<=b;){if(C.x>=p&&C.x<=h&&C.y>=m&&C.y<=g&&C!==i&&C!==o&&y(s,u,c,d,l,f,C.x,C.y)&&x(C.prev,C,C.next)>=0)return!1;C=C.nextZ}return!0}function c(e,t,n){var r=e;do{var a=r.prev,o=r.next.next;!S(a,o)&&C(a,r,r.next,o)&&D(a,o)&&D(o,a)&&(t.push(a.i/n|0),t.push(r.i/n|0),t.push(o.i/n|0),j(r),j(r.next),r=e=o),r=r.next}while(r!==e);return i(r)}function l(e,t,n,r,o,s){var c=e;do{for(var l=c.next.next;l!==c.prev;){if(c.i!==l.i&&b(c,l)){var u=k(c,l);c=i(c,c.next),u=i(u,u.next),a(c,t,n,r,o,s,0),a(u,t,n,r,o,s,0);return}l=l.next}c=c.next}while(c!==e)}function u(e,t,n,i){var a=[],o,s,c,l,u;for(o=0,s=t.length;o<s;o++)c=t[o]*i,l=o<s-1?t[o+1]*i:e.length,u=r(e,c,l,i,!1),u===u.next&&(u.steiner=!0),a.push(v(u));for(a.sort(d),o=0;o<a.length;o++)n=f(a[o],n);return n}function d(e,t){return e.x-t.x}function f(e,t){var n=p(e,t);if(!n)return t;var r=k(n,e);return i(r,r.next),i(n,n.next)}function p(e,t){var n=t,r=e.x,i=e.y,a=-1/0,o;do{if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){var s=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(s<=r&&s>a&&(a=s,o=n.x<n.next.x?n:n.next,s===r))return o}n=n.next}while(n!==t);if(!o)return null;var c=o,l=o.x,u=o.y,d=1/0,f;n=o;do r>=n.x&&n.x>=l&&r!==n.x&&y(i<u?r:a,i,l,u,i<u?a:r,i,n.x,n.y)&&(f=Math.abs(i-n.y)/(r-n.x),D(n,e)&&(f<d||f===d&&(n.x>o.x||n.x===o.x&&m(o,n)))&&(o=n,d=f)),n=n.next;while(n!==c);return o}function m(e,t){return x(e.prev,e,t.prev)<0&&x(t.next,e,e.next)<0}function h(e,t,n,r){var i=e;do i.z===0&&(i.z=_(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,g(i)}function g(e){var t,n,r,i,a,o,s,c,l=1;do{for(n=e,e=null,a=null,o=0;n;){for(o++,r=n,s=0,t=0;t<l&&(s++,r=r.nextZ,r);t++);for(c=l;s>0||c>0&&r;)s!==0&&(c===0||!r||n.z<=r.z)?(i=n,n=n.nextZ,s--):(i=r,r=r.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;n=r}a.nextZ=null,l*=2}while(o>1);return e}function _(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function v(e){var t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function y(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function b(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!E(e,t)&&(D(e,t)&&D(t,e)&&O(e,t)&&(x(e.prev,e,t.prev)||x(e,t.prev,t))||S(e,t)&&x(e.prev,e,e.next)>0&&x(t.prev,t,t.next)>0)}function x(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function S(e,t){return e.x===t.x&&e.y===t.y}function C(e,t,n,r){var i=T(x(e,t,n)),a=T(x(e,t,r)),o=T(x(n,r,e)),s=T(x(n,r,t));return!!(i!==a&&o!==s||i===0&&w(e,n,t)||a===0&&w(e,r,t)||o===0&&w(n,e,r)||s===0&&w(n,t,r))}function w(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function T(e){return e>0?1:e<0?-1:0}function E(e,t){var n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&C(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function D(e,t){return x(e.prev,e,e.next)<0?x(e,t,e.next)>=0&&x(e,e.prev,t)>=0:x(e,t,e.prev)<0||x(e,e.next,t)<0}function O(e,t){var n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function k(e,t){var n=new M(e.i,e.x,e.y),r=new M(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function A(e,t,n,r){var i=new M(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function j(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function M(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}n.deviation=function(e,t,n,r){var i=t&&t.length,a=i?t[0]*n:e.length,o=Math.abs(N(e,0,a,n));if(i)for(var s=0,c=t.length;s<c;s++){var l=t[s]*n,u=s<c-1?t[s+1]*n:e.length;o-=Math.abs(N(e,l,u,n))}var d=0;for(s=0;s<r.length;s+=3){var f=r[s]*n,p=r[s+1]*n,m=r[s+2]*n;d+=Math.abs((e[f]-e[m])*(e[p+1]-e[f+1])-(e[f]-e[p])*(e[m+1]-e[f+1]))}return o===0&&d===0?0:Math.abs((d-o)/o)};function N(e,t,n,r){for(var i=0,a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}n.flatten=function(e){for(var t=e[0][0].length,n={vertices:[],holes:[],dimensions:t},r=0,i=0;i<e.length;i++){for(var a=0;a<e[i].length;a++)for(var o=0;o<t;o++)n.vertices.push(e[i][a][o]);i>0&&(r+=e[i-1].length,n.holes.push(r))}return n}}))(),1),Ng=Vh.CLOCKWISE,Pg=Vh.COUNTER_CLOCKWISE,Fg={isClosed:!0};function Ig(e){if(e=e&&e.positions||e,!Array.isArray(e)&&!ArrayBuffer.isView(e))throw Error(`invalid polygon`)}function Lg(e){return`positions`in e?e.positions:e}function Rg(e){return`holeIndices`in e?e.holeIndices:null}function zg(e){return Array.isArray(e[0])}function Bg(e){return e.length>=1&&e[0].length>=2&&Number.isFinite(e[0][0])}function Vg(e){let t=e[0],n=e[e.length-1];return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]}function Hg(e,t,n,r){for(let i=0;i<t;i++)if(e[n+i]!==e[r-t+i])return!1;return!0}function Ug(e,t,n,r,i){let a=t,o=n.length;for(let t=0;t<o;t++)for(let i=0;i<r;i++)e[a++]=n[t][i]||0;if(!Vg(n))for(let t=0;t<r;t++)e[a++]=n[0][t]||0;return Fg.start=t,Fg.end=a,Fg.size=r,Hh(e,i,Fg),a}function Wg(e,t,n,r,i=0,a,o){a||=n.length;let s=a-i;if(s<=0)return t;let c=t;for(let t=0;t<s;t++)e[c++]=n[i+t];if(!Hg(n,r,i,a))for(let t=0;t<r;t++)e[c++]=n[i+t];return Fg.start=t,Fg.end=c,Fg.size=r,Hh(e,o,Fg),c}function Gg(e,t){Ig(e);let n=[],r=[];if(`positions`in e){let{positions:i,holeIndices:a}=e;if(a){let e=0;for(let o=0;o<=a.length;o++)e=Wg(n,e,i,t,a[o-1],a[o],o===0?Ng:Pg),r.push(e);return r.pop(),{positions:n,holeIndices:r}}e=i}if(!zg(e))return Wg(n,0,e,t,0,n.length,Ng),n;if(!Bg(e)){let i=0;for(let[a,o]of e.entries())i=Ug(n,i,o,t,a===0?Ng:Pg),r.push(i);return r.pop(),{positions:n,holeIndices:r}}return Ug(n,0,e,t,Ng),n}function Kg(e,t,n){let r=e.length/3,i=0;for(let a=0;a<r;a++){let o=(a+1)%r;i+=e[a*3+t]*e[o*3+n],i-=e[o*3+t]*e[a*3+n]}return Math.abs(i/2)}function qg(e,t,n,r){let i=e.length/3;for(let a=0;a<i;a++){let i=a*3,o=e[i+0],s=e[i+1],c=e[i+2];e[i+t]=o,e[i+n]=s,e[i+r]=c}}function Jg(e,t,n,r){let i=Rg(e);i&&=i.map(e=>e/t);let a=Lg(e),o=r&&t===3;if(n){let e=a.length;a=a.slice();let r=[];for(let i=0;i<e;i+=t){r[0]=a[i],r[1]=a[i+1],o&&(r[2]=a[i+2]);let e=n(r);a[i]=e[0],a[i+1]=e[1],o&&(a[i+2]=e[2])}}if(o){let e=Kg(a,0,1),t=Kg(a,0,2),r=Kg(a,1,2);if(!e&&!t&&!r)return[];e>t&&e>r||(t>r?(n||(a=a.slice()),qg(a,0,2,1)):(n||(a=a.slice()),qg(a,2,0,1)))}return(0,Mg.default)(a,i,t)}var Yg=class extends ah{constructor(e){let{fp64:t,IndexType:n=Uint32Array}=e;super({...e,attributes:{positions:{size:3,type:t?Float64Array:Float32Array},vertexValid:{type:Uint16Array,size:1},indices:{type:n,size:1}}})}get(e){let{attributes:t}=this;return e===`indices`?t.indices&&t.indices.subarray(0,this.vertexCount):t[e]}updateGeometry(e){super.updateGeometry(e);let t=this.buffers.indices;if(t)this.vertexCount=(t.value||t).length;else if(this.data&&!this.getGeometry)throw Error(`missing indices buffer`)}normalizeGeometry(e){if(this.normalize){let t=Gg(e,this.positionSize);return this.opts.resolution?tg(Lg(t),Rg(t),{size:this.positionSize,gridResolution:this.opts.resolution,edgeTypes:!0}):this.opts.wrapLongitude?lg(Lg(t),Rg(t),{size:this.positionSize,maxLatitude:86,edgeTypes:!0}):t}return e}getGeometrySize(e){if(Xg(e)){let t=0;for(let n of e)t+=this.getGeometrySize(n);return t}return Lg(e).length/this.positionSize}getGeometryFromBuffer(e){return this.normalize||!this.buffers.indices?super.getGeometryFromBuffer(e):null}updateGeometryAttributes(e,t){if(e&&Xg(e))for(let n of e){let e=this.getGeometrySize(n);t.geometrySize=e,this.updateGeometryAttributes(n,t),t.vertexStart+=e,t.indexStart=this.indexStarts[t.geometryIndex+1]}else{let n=e;this._updateIndices(n,t),this._updatePositions(n,t),this._updateVertexValid(n,t)}}_updateIndices(e,{geometryIndex:t,vertexStart:n,indexStart:r}){let{attributes:i,indexStarts:a,typedArrayManager:o}=this,s=i.indices;if(!s||!e)return;let c=r,l=Jg(e,this.positionSize,this.opts.preproject,this.opts.full3d);s=o.allocate(s,r+l.length,{copy:!0});for(let e=0;e<l.length;e++)s[c++]=l[e]+n;a[t+1]=r+l.length,i.indices=s}_updatePositions(e,{vertexStart:t,geometrySize:n}){let{attributes:{positions:r},positionSize:i}=this;if(!r||!e)return;let a=Lg(e);for(let e=t,o=0;o<n;e++,o++){let t=a[o*i],n=a[o*i+1],s=i>2?a[o*i+2]:0;r[e*3]=t,r[e*3+1]=n,r[e*3+2]=s}}_updateVertexValid(e,{vertexStart:t,geometrySize:n}){let{positionSize:r}=this,i=this.attributes.vertexValid,a=e&&Rg(e);if(e&&e.edgeTypes?i.set(e.edgeTypes,t):i.fill(1,t,t+n),a)for(let e=0;e<a.length;e++)i[t+a[e]/r-1]=0;i[t+n-1]=0}};function Xg(e){return Array.isArray(e)&&e.length>0&&!Number.isFinite(e[0])}var Zg=`struct SolidPolygonUniforms {
  extruded: f32,
  isWireframe: f32,
  elevationScale: f32,
};

@group(0) @binding(auto) var<uniform> solidPolygon: SolidPolygonUniforms;
`,Qg=`layout(std140) uniform solidPolygonUniforms {
  bool extruded;
  bool isWireframe;
  float elevationScale;
} solidPolygon;
`,$g={name:`solidPolygon`,source:Zg,vs:Qg,fs:Qg,uniformTypes:{extruded:`f32`,isWireframe:`f32`,elevationScale:`f32`}},e_=`in vec4 fillColors;
in vec4 lineColors;
in float rowIndexes;
out vec4 vColor;
struct PolygonProps {
vec3 positions;
vec3 positions64Low;
vec3 normal;
float elevations;
};
vec3 project_offset_normal(vec3 vector) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
return normalize(vector * project.commonUnitsPerWorldUnit);
}
return project_normal(vector);
}
void calculatePosition(PolygonProps props) {
vec3 pos = props.positions;
vec3 pos64Low = props.positions64Low;
vec3 normal = props.normal;
vec4 colors = solidPolygon.isWireframe ? lineColors : fillColors;
geometry.worldPosition = props.positions;
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
if (solidPolygon.extruded) {
pos.z += props.elevations * solidPolygon.elevationScale;
}
gl_Position = project_position_to_clipspace(pos, pos64Low, vec3(0.), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
if (solidPolygon.extruded) {
#ifdef IS_SIDE_VERTEX
normal = project_offset_normal(normal);
#else
normal = project_normal(normal);
#endif
geometry.normal = normal;
vec3 lightColor = lighting_getLightColor(colors.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
vColor = vec4(lightColor, colors.a * layer.opacity);
} else {
vColor = vec4(colors.rgb, colors.a * layer.opacity);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,t_=`\
#version 300 es
#define SHADER_NAME solid-polygon-layer-vertex-shader
in vec3 vertexPositions;
in vec3 vertexPositions64Low;
in float elevations;
${e_}
void main(void) {
PolygonProps props;
props.positions = vertexPositions;
props.positions64Low = vertexPositions64Low;
props.elevations = elevations;
props.normal = vec3(0.0, 0.0, 1.0);
calculatePosition(props);
}
`,n_=`\
#version 300 es
#define SHADER_NAME solid-polygon-layer-vertex-shader-side
#define IS_SIDE_VERTEX
in vec2 positions;
in vec3 vertexPositions;
in vec3 nextVertexPositions;
in vec3 vertexPositions64Low;
in vec3 nextVertexPositions64Low;
in float elevations;
in float instanceVertexValid;
${e_}
void main(void) {
if(instanceVertexValid < 0.5){
gl_Position = vec4(0.);
return;
}
PolygonProps props;
vec3 pos;
vec3 pos64Low;
vec3 nextPos;
vec3 nextPos64Low;
#if RING_WINDING_ORDER_CW == 1
pos = vertexPositions;
pos64Low = vertexPositions64Low;
nextPos = nextVertexPositions;
nextPos64Low = nextVertexPositions64Low;
#else
pos = nextVertexPositions;
pos64Low = nextVertexPositions64Low;
nextPos = vertexPositions;
nextPos64Low = vertexPositions64Low;
#endif
props.positions = mix(pos, nextPos, positions.x);
props.positions64Low = mix(pos64Low, nextPos64Low, positions.x);
props.normal = vec3(
pos.y - nextPos.y + (pos64Low.y - nextPos64Low.y),
nextPos.x - pos.x + (nextPos64Low.x - pos64Low.x),
0.0);
props.elevations = elevations * positions.y;
calculatePosition(props);
}
`,r_=`#version 300 es
#define SHADER_NAME solid-polygon-layer-fragment-shader
precision highp float;
in vec4 vColor;
out vec4 fragColor;
void main(void) {
fragColor = vColor;
geometry.uv = vec2(0.);
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;function i_(){return`fn project_offset_normal(vector: vec3<f32>) -> vec3<f32> {
  if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
      project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
    return normalize(vector * project.commonUnitsPerWorldUnit);
  }
  return project_normal(vector);
}

fn apply_polygon_color(
  colors: vec4<f32>,
  normal: vec3<f32>,
  position: vec4<f32>
) -> vec4<f32> {
  if (solidPolygon.extruded > 0.5) {
    let lightColor = lighting_getLightColor2(
      colors.rgb,
      project.cameraPosition,
      position.xyz,
      normal
    );
    return vec4<f32>(lightColor, colors.a * layer.opacity);
  }
  return vec4<f32>(colors.rgb, colors.a * layer.opacity);
}
`}function a_(){return`@fragment
fn fragmentMain(inp: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = vec2<f32>(0.0, 0.0);

  clip_filterColor(inp.clipCoordinates);

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(inp.pickingColor)) {
      discard;
    }
    return vec4<f32>(inp.pickingColor, 1.0);
  }

  var fragColor = inp.vColor;

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(inp.pickingColor - highlightedObjectColor))) {
      let highLightAlpha = picking.highlightColor.a;
      let blendedAlpha = highLightAlpha + fragColor.a * (1.0 - highLightAlpha);
      if (blendedAlpha > 0.0) {
        let highLightRatio = highLightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highLightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  return deckgl_premultiplied_alpha(fragColor);
}
`}function o_(){return`\
${i_()}

struct Attributes {
  @location(0) vertexPositions: vec3<f32>,
  @location(1) vertexPositions64Low: vec3<f32>,
  @location(2) elevations: f32,
  @location(3) fillColors: vec4<f32>,
  @location(4) lineColors: vec4<f32>,
  @location(5) rowIndexes: u32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vColor: vec4<f32>,
  @location(1) pickingColor: vec3<f32>,
  @location(2) clipCoordinates: vec2<f32>,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var outp: Varyings;

  var pos = attributes.vertexPositions;
  if (solidPolygon.extruded > 0.5) {
    pos.z += attributes.elevations * solidPolygon.elevationScale;
  }

  geometry.worldPosition = attributes.vertexPositions;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);

  let projectedPosition = project_position_to_clipspace_and_commonspace(
    pos,
    attributes.vertexPositions64Low,
    vec3<f32>(0.0)
  );
  geometry.position = projectedPosition.commonPosition;
  outp.position = projectedPosition.clipPosition;

  let normal = project_normal(vec3<f32>(0.0, 0.0, 1.0));
  geometry.normal = normal;

  let colors = select(
    attributes.fillColors,
    attributes.lineColors,
    solidPolygon.isWireframe > 0.5
  );
  outp.vColor = apply_polygon_color(colors, normal, geometry.position);
  outp.pickingColor = geometry.pickingColor;

  outp.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&outp.position, geometry.worldPosition.xy);

  return outp;
}

${a_()}
`}function s_(e){return`\
const RING_WINDING_ORDER_CW: bool = ${e?`true`:`false`};

${i_()}

struct Attributes {
  @location(0) positions: vec2<f32>,
  @location(1) vertexPositions: vec3<f32>,
  @location(2) vertexPositions64Low: vec3<f32>,
  @location(3) nextVertexPositions: vec3<f32>,
  @location(4) nextVertexPositions64Low: vec3<f32>,
  @location(5) vertexValid: f32,
  @location(6) elevations: f32,
  @location(7) fillColors: vec4<f32>,
  @location(8) lineColors: vec4<f32>,
  @location(9) rowIndexes: u32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vColor: vec4<f32>,
  @location(1) pickingColor: vec3<f32>,
  @location(2) clipCoordinates: vec2<f32>,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var outp: Varyings;
  outp.position = vec4<f32>(0.0);
  outp.vColor = vec4<f32>(0.0);
  outp.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);
  outp.clipCoordinates = vec2<f32>(0.0);

  if (attributes.vertexValid < 0.5) {
    return outp;
  }

  let pos = select(attributes.nextVertexPositions, attributes.vertexPositions, RING_WINDING_ORDER_CW);
  let pos64Low = select(
    attributes.nextVertexPositions64Low,
    attributes.vertexPositions64Low,
    RING_WINDING_ORDER_CW
  );
  let nextPos = select(attributes.vertexPositions, attributes.nextVertexPositions, RING_WINDING_ORDER_CW);
  let nextPos64Low = select(
    attributes.vertexPositions64Low,
    attributes.nextVertexPositions64Low,
    RING_WINDING_ORDER_CW
  );

  let position = mix(pos, nextPos, attributes.positions.x);
  let position64Low = mix(pos64Low, nextPos64Low, attributes.positions.x);

  var worldPosition = position;
  if (solidPolygon.extruded > 0.5) {
    worldPosition.z += attributes.elevations * attributes.positions.y * solidPolygon.elevationScale;
  }

  geometry.worldPosition = position;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);

  let projectedPosition = project_position_to_clipspace_and_commonspace(
    worldPosition,
    position64Low,
    vec3<f32>(0.0)
  );
  geometry.position = projectedPosition.commonPosition;
  outp.position = projectedPosition.clipPosition;

  let normal = project_offset_normal(vec3<f32>(
    pos.y - nextPos.y + (pos64Low.y - nextPos64Low.y),
    nextPos.x - pos.x + (nextPos64Low.x - pos64Low.x),
    0.0
  ));
  geometry.normal = normal;

  let colors = select(
    attributes.fillColors,
    attributes.lineColors,
    solidPolygon.isWireframe > 0.5
  );
  outp.vColor = apply_polygon_color(colors, normal, geometry.position);
  outp.pickingColor = geometry.pickingColor;

  outp.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&outp.position, geometry.worldPosition.xy);

  return outp;
}

${a_()}
`}function c_(e,t){return e===`top`?o_():s_(t)}var l_=[0,0,0,255],u_={filled:!0,extruded:!1,wireframe:!1,_normalize:!0,_windingOrder:`CW`,_full3d:!1,elevationScale:{type:`number`,min:0,value:1},getPolygon:{type:`accessor`,value:e=>e.polygon},getElevation:{type:`accessor`,value:1e3},getFillColor:{type:`accessor`,value:l_},getLineColor:{type:`accessor`,value:l_},material:!0},d_={enter:(e,t)=>t.length?t.subarray(t.length-e.length):e},f_=class extends Km{getShaders(e){let t=!this.props._normalize&&this.props._windingOrder===`CCW`?0:1;return super.getShaders({vs:e===`top`?t_:n_,fs:r_,source:c_(e,!!t),defines:{RING_WINDING_ORDER_CW:t},modules:[wc,lo,sn,xl,$g,...this.context.device.type===`webgpu`?[Lh]:[]]})}get wrapLongitude(){return!1}getBounds(){return this.getAttributeManager()?.getBounds([`vertexPositions`])}initializeState(){let{viewport:e}=this.context,{coordinateSystem:t}=this.props,{_full3d:n}=this.props;e.isGeospatial&&t==="default"&&(t=`lnglat`);let r;t===`lnglat`&&(r=n?e.projectPosition.bind(e):e.projectFlat.bind(e)),this.setState({numInstances:0,polygonTesselator:new Yg({preproject:r,fp64:this.use64bitPositions(),IndexType:Uint32Array})});let i=this.getAttributeManager(),a=this.context.device.type===`webgpu`;i.add({indices:{size:1,isIndexed:!0,update:this.calculateIndices,noAlloc:!0},vertexPositions:{size:3,type:`float64`,stepMode:`dynamic`,fp64:this.use64bitPositions(),transition:d_,accessor:`getPolygon`,update:this.calculatePositions,noAlloc:!0,...a?{}:{shaderAttributes:{nextVertexPositions:{vertexOffset:1}}}},...a?{nextVertexPositions:{size:3,type:`float64`,stepMode:`dynamic`,fp64:this.use64bitPositions(),transition:!1,update:this.calculateNextPositions,noAlloc:!0}}:{},[a?`vertexValid`:`instanceVertexValid`]:{size:1,type:a?`float32`:`uint16`,stepMode:`instance`,update:this.calculateVertexValid,noAlloc:!0},elevations:{size:1,stepMode:`dynamic`,transition:d_,accessor:`getElevation`,bufferGroup:`solid-polygon-instance-data`},fillColors:{size:this.props.colorFormat.length,type:`unorm8`,stepMode:`dynamic`,transition:d_,accessor:`getFillColor`,defaultValue:l_,bufferGroup:`solid-polygon-instance-data`},lineColors:{size:this.props.colorFormat.length,type:`unorm8`,stepMode:`dynamic`,transition:d_,accessor:`getLineColor`,defaultValue:l_,bufferGroup:`solid-polygon-instance-data`},rowIndexes:{size:1,type:`uint32`,stepMode:`dynamic`,accessor:(e,{index:t})=>e&&e.__source?e.__source.index:t,bufferGroup:`solid-polygon-instance-data`}})}getPickingInfo(e){let t=super.getPickingInfo(e),{index:n}=t,r=this.props.data;return r[0]&&r[0].__source&&(t.object=r.find(e=>e.__source.index===n)),t}disablePickingIndex(e){let t=this.props.data;if(t[0]&&t[0].__source)for(let n=0;n<t.length;n++)t[n].__source.index===e&&this._disablePickingIndex(n);else super.disablePickingIndex(e)}draw({uniforms:e}){let{extruded:t,filled:n,wireframe:r,elevationScale:i}=this.props,{topModel:a,sideModel:o,wireframeModel:s,polygonTesselator:c}=this.state,l={extruded:!!t,elevationScale:i,isWireframe:!1};s&&r&&(s.setInstanceCount(c.instanceCount-1),s.shaderInputs.setProps({solidPolygon:{...l,isWireframe:!0}}),s.draw(this.context.renderPass)),o&&n&&(o.setInstanceCount(c.instanceCount-1),o.shaderInputs.setProps({solidPolygon:l}),o.draw(this.context.renderPass)),a&&n&&(a.setVertexCount(c.vertexCount),a.shaderInputs.setProps({solidPolygon:l}),a.draw(this.context.renderPass))}updateState(e){super.updateState(e),this.updateGeometry(e);let{props:t,oldProps:n,changeFlags:r}=e,i=this.getAttributeManager();(r.extensionsChanged||t.filled!==n.filled||t.extruded!==n.extruded)&&(this.state.models?.forEach(e=>e.destroy()),this.setState(this._getModels()),i.invalidateAll())}updateGeometry({props:e,oldProps:t,changeFlags:n}){if(n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getPolygon)){let{polygonTesselator:t}=this.state,r=e.data.attributes||{};t.updateGeometry({data:e.data,normalize:e._normalize,geometryBuffer:r.getPolygon,buffers:this.context.device.type===`webgpu`?{...r}:r,getGeometry:e.getPolygon,positionFormat:e.positionFormat,wrapLongitude:e.wrapLongitude,resolution:this.context.viewport.resolution,fp64:this.use64bitPositions(),dataChanged:n.dataChanged,full3d:e._full3d}),this.setState({numInstances:t.instanceCount,startIndices:t.vertexStarts}),n.dataChanged||this.getAttributeManager().invalidateAll()}}_getModels(){let{id:e,filled:t,extruded:n}=this.props,r,i,a;if(t){let t=this.getShaders(`top`);t.defines={...t.defines,NON_INSTANCED_MODEL:1};let n=this.getAttributeManager().getBufferLayouts({isInstanced:!1});this.context.device.type===`webgpu`&&(n=n.filter(e=>e.name!==`indices`&&e.name!==`vertexValid`&&e.name!==`instanceVertexValid`&&e.name!==`nextVertexPositions`)),r=new M(this.context.device,{...t,id:`${e}-top`,topology:`triangle-list`,bufferLayout:n,isIndexed:!0,userData:{excludeAttributes:{vertexValid:!0,instanceVertexValid:!0,nextVertexPositions:!0}}})}if(n){let t=this.getAttributeManager().getBufferLayouts({isInstanced:!0});this.context.device.type===`webgpu`&&(t=t.filter(e=>e.name!==`indices`)),i=new M(this.context.device,{...this.getShaders(`side`),id:`${e}-side`,bufferLayout:t,geometry:new N({topology:`triangle-strip`,attributes:{positions:{size:2,value:new Float32Array([1,0,0,0,1,1,0,1])}}}),isInstanced:!0,userData:{excludeAttributes:{indices:!0}}}),a=new M(this.context.device,{...this.getShaders(`side`),id:`${e}-wireframe`,bufferLayout:t,geometry:new N({topology:`line-strip`,attributes:{positions:{size:2,value:new Float32Array([1,0,0,0,0,1,1,1])}}}),isInstanced:!0,userData:{excludeAttributes:{indices:!0}}})}return{models:[i,a,r].filter(Boolean),topModel:r,sideModel:i,wireframeModel:a}}calculateIndices(e){let{polygonTesselator:t}=this.state;e.startIndices=t.indexStarts,e.value=t.get(`indices`)}calculatePositions(e){let{polygonTesselator:t}=this.state;e.startIndices=t.vertexStarts;let n=this.props.data.attributes?.getPolygon;if(this.context.device.type===`webgpu`&&ArrayBuffer.isView(n?.value)){let{value:r,size:i=3,offset:a=0,stride:o}=n,s=a/r.BYTES_PER_ELEMENT,c=o?o/r.BYTES_PER_ELEMENT:i,l=new Float64Array(t.instanceCount*3);for(let e=0;e<t.instanceCount;e++){let t=s+e*c,n=e*3;l[n]=r[t],l[n+1]=r[t+1],l[n+2]=i>2?r[t+2]:0}e.value=l;return}e.value=t.get(`positions`)}calculateVertexValid(e){let t=this.props.data.attributes?.instanceVertexValid?.value,n=this.context.device.type===`webgpu`&&t?t:this.state.polygonTesselator.get(`vertexValid`);e.value=this.context.device.type===`webgpu`&&n?Float32Array.from(n):n}calculateNextPositions(e){let{polygonTesselator:t}=this.state,n=this.getAttributeManager().getAttributes(),r=n.vertexPositions.value,i=this.props.data.attributes?.instanceVertexValid?.value||n.vertexValid?.value||t.get(`vertexValid`);if(e.startIndices=t.vertexStarts,!r){e.value=r;return}let a=r.length/3,o=new r.constructor(r.length);for(let e=0;e<a;e++){let t=e*3,n=i?.[e]&&e+1<a?t+3:t;for(let e=0;e<3;e++)o[t+e]=r[n+e]}e.value=o}};f_.defaultProps=u_,f_.layerName=`SolidPolygonLayer`;function p_({data:e,getIndex:t,dataRange:n,replace:r}){let{startRow:i=0,endRow:a=1/0}=n,o=e.length,s=o,c=o;for(let n=0;n<o;n++){let r=t(e[n]);if(s>n&&r>=i&&(s=n),r>=a){c=n;break}}let l=s,u=c-s===r.length?void 0:e.slice(c);for(let t=0;t<r.length;t++)e[l++]=r[t];if(u){for(let t=0;t<u.length;t++)e[l++]=u[t];e.length=l}return{startRow:s,endRow:s+r.length}}var m_=[0,0,0,255],h_={stroked:!0,filled:!0,extruded:!1,elevationScale:1,wireframe:!1,_normalize:!0,_windingOrder:`CW`,lineWidthUnits:`meters`,lineWidthScale:1,lineWidthMinPixels:0,lineWidthMaxPixels:2**53-1,lineJointRounded:!1,lineMiterLimit:4,lineAntialiasing:!1,getPolygon:{type:`accessor`,value:e=>e.polygon},getFillColor:{type:`accessor`,value:[0,0,0,255]},getLineColor:{type:`accessor`,value:m_},getLineWidth:{type:`accessor`,value:1},getElevation:{type:`accessor`,value:1e3},material:!0},g_=class extends Qm{initializeState(){this.state={paths:[],pathsDiff:null},this.props.getLineDashArray&&R.removed(`getLineDashArray`,`PathStyleExtension`)()}updateState({changeFlags:e}){let t=e.dataChanged||e.updateTriggersChanged&&(e.updateTriggersChanged.all||e.updateTriggersChanged.getPolygon);if(t&&Array.isArray(e.dataChanged)){let t=this.state.paths.slice(),n=e.dataChanged.map(e=>p_({data:t,getIndex:e=>e.__source.index,dataRange:e,replace:this._getPaths(e)}));this.setState({paths:t,pathsDiff:n})}else t&&this.setState({paths:this._getPaths(),pathsDiff:null})}_getPaths(e={}){let{data:t,getPolygon:n,positionFormat:r,_normalize:i}=this.props,a=[],o=r===`XY`?2:3,{startRow:s,endRow:c}=e,{iterable:l,objectInfo:u}=df(t,s,c);for(let e of l){u.index++;let t=n(e,u);i&&(t=Gg(t,o));let{holeIndices:r}=t,s=t.positions||t;if(r)for(let t=0;t<=r.length;t++){let n=s.slice(r[t-1]||0,r[t]||s.length);a.push(this.getSubLayerRow({path:n},e,u.index))}else a.push(this.getSubLayerRow({path:s},e,u.index))}return a}renderLayers(){let{data:e,_dataDiff:t,stroked:n,filled:r,extruded:i,wireframe:a,_normalize:o,_windingOrder:s,elevationScale:c,transitions:l,positionFormat:u}=this.props,{lineWidthUnits:d,lineWidthScale:f,lineWidthMinPixels:p,lineWidthMaxPixels:m,lineJointRounded:h,lineMiterLimit:g,lineAntialiasing:_,lineDashJustified:v}=this.props,{getFillColor:y,getLineColor:b,getLineWidth:x,getLineDashArray:S,getElevation:C,getPolygon:w,updateTriggers:T,material:E}=this.props,{paths:D,pathsDiff:O}=this.state,k=this.getSubLayerClass(`fill`,f_),A=this.getSubLayerClass(`stroke`,jg),j=this.shouldRenderSubLayer(`fill`,D)&&new k({_dataDiff:t,extruded:i,elevationScale:c,filled:r,wireframe:a,_normalize:o,_windingOrder:s,getElevation:C,getFillColor:y,getLineColor:i&&a?b:m_,material:E,transitions:l},this.getSubLayerProps({id:`fill`,updateTriggers:T&&{getPolygon:T.getPolygon,getElevation:T.getElevation,getFillColor:T.getFillColor,lineColors:i&&a,getLineColor:T.getLineColor}}),{data:e,positionFormat:u,getPolygon:w}),M=!i&&n&&this.shouldRenderSubLayer(`stroke`,D)&&new A({_dataDiff:O&&(()=>O),widthUnits:d,widthScale:f,widthMinPixels:p,widthMaxPixels:m,jointRounded:h,miterLimit:g,antialiasing:_,dashJustified:v,_pathType:`loop`,transitions:l&&{getWidth:l.getLineWidth,getColor:l.getLineColor,getPath:l.getPolygon},getColor:this.getSubLayerAccessor(b),getWidth:this.getSubLayerAccessor(x),getDashArray:this.getSubLayerAccessor(S)},this.getSubLayerProps({id:`stroke`,updateTriggers:T&&{getWidth:T.getLineWidth,getColor:T.getLineColor,getDashArray:T.getLineDashArray}}),{data:D,positionFormat:u,getPath:e=>e.path});return[!i&&j,M,i&&j]}};g_.layerName=`PolygonLayer`,g_.defaultProps=h_;var __=`layout(std140) uniform sdfUniforms {
  float gamma;
  bool enabled;
  float buffer;
  float outlineBuffer;
  vec4 outlineColor;
} sdf;
`,v_={name:`sdf`,vs:__,fs:__,uniformTypes:{gamma:`f32`,enabled:`f32`,buffer:`f32`,outlineBuffer:`f32`,outlineColor:`vec4<f32>`}},y_={none:0,start:1,center:2,end:3},b_={name:`text`,vs:`\
layout(std140) uniform textUniforms {
  highp vec2 cutoffPixels;
  highp ivec2 align;
  highp float fontSize;
  bool flipY;
} text;

#define ALIGN_MODE_START ${y_.start}
#define ALIGN_MODE_CENTER ${y_.center}
#define ALIGN_MODE_END ${y_.end}
`,getUniforms:({contentCutoffPixels:e=[0,0],contentAlignHorizontal:t=`none`,contentAlignVertical:n=`none`,fontSize:r,viewport:i})=>({cutoffPixels:e,align:[y_[t],y_[n]],fontSize:r,flipY:i?.flipY??!1}),uniformTypes:{cutoffPixels:`vec2<f32>`,align:`vec2<i32>`,fontSize:`f32`,flipY:`f32`}},x_=`#version 300 es
#define SHADER_NAME multi-icon-layer-vertex-shader
in vec2 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceSizes;
in float instanceAngles;
in vec4 instanceColors;
in float rowIndexes;
in vec4 instanceIconFrames;
in float instanceColorModes;
in vec2 instanceOffsets;
in vec2 instancePixelOffset;
in vec4 instanceClipRect;
out float vColorMode;
out vec4 vColor;
out vec2 vTextureCoords;
out vec2 uv;
vec2 rotate_by_angle(vec2 vertex, float angle) {
float angle_radian = angle * PI / 180.0;
float cos_angle = cos(angle_radian);
float sin_angle = sin(angle_radian);
mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
return rotationMatrix * vertex;
}
float getPixelOffsetFromAlignment(float anchor, float extent, float clipStart, float clipEnd, int mode) {
if (clipEnd < clipStart) return 0.0;
if (mode == ALIGN_MODE_START) {
return max(- (anchor + clipStart), 0.0);
}
if (mode == ALIGN_MODE_CENTER) {
float _min = max(0., anchor + clipStart);
float _max = min(extent, anchor + clipEnd);
return _min < _max ? (_min + _max) / 2.0 - anchor : 0.0;
}
if (mode == ALIGN_MODE_END) {
return min(extent - (anchor + clipEnd), 0.);
}
return 0.0;
}
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = positions;
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
uv = positions;
vec2 iconSize = instanceIconFrames.zw;
float sizePixels = clamp(
project_size_to_pixel(instanceSizes * icon.sizeScale, icon.sizeUnits),
icon.sizeMinPixels, icon.sizeMaxPixels
);
float instanceScale = sizePixels / text.fontSize;
vec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;
pixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * instanceScale;
pixelOffset += instancePixelOffset;
pixelOffset.y *= -1.0;
vec2 anchorPosScreen;
if (icon.billboard)  {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
anchorPosScreen = gl_Position.xy / gl_Position.w;
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = vec3(pixelOffset, 0.0);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
if (text.flipY) {
offset_common.y *= -1.;
}
DECKGL_FILTER_SIZE(offset_common, geometry);
vec4 anchorPos = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0));
anchorPosScreen = anchorPos.xy / anchorPos.w;
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
anchorPosScreen = vec2(anchorPosScreen.x + 1.0, 1.0 - anchorPosScreen.y) / 2.0 * project.viewportSize / project.devicePixelRatio;
vec2 xy = project_size_to_pixel(instanceClipRect.xy);
vec2 wh = project_size_to_pixel(instanceClipRect.zw);
if (text.flipY) {
xy.y = -xy.y - wh.y;
}
if (text.align.x > 0 || text.align.y > 0) {
vec2 viewportPixels = project.viewportSize / project.devicePixelRatio;
vec2 scrollPixels = vec2(
getPixelOffsetFromAlignment(anchorPosScreen.x, viewportPixels.x, xy.x, xy.x + wh.x, text.align.x),
-getPixelOffsetFromAlignment(anchorPosScreen.y, viewportPixels.y, -xy.y - wh.y, -xy.y, text.align.y)
);
pixelOffset += scrollPixels;
gl_Position.xy += project_pixel_size_to_clipspace(scrollPixels);
}
if (instanceClipRect.z >= 0.) {
if (pixelOffset.x < xy.x || pixelOffset.x > xy.x + wh.x) {
gl_Position = vec4(0.0);
}
else if (text.cutoffPixels.x > 0.) {
float vpWidth = project.viewportSize.x / project.devicePixelRatio;
float l = max(anchorPosScreen.x + xy.x, 0.0);
float r = min(anchorPosScreen.x + xy.x + wh.x, vpWidth);
if (r - l < text.cutoffPixels.x) {
gl_Position = vec4(0.0);
}
}
}
if (instanceClipRect.w >= 0.) {
if (pixelOffset.y < xy.y || pixelOffset.y > xy.y + wh.y) {
gl_Position = vec4(0.0);
}
else if (text.cutoffPixels.y > 0.) {
float vpHeight = project.viewportSize.y / project.devicePixelRatio;
float t = max(anchorPosScreen.y - xy.y - wh.y, 0.0);
float b = min(anchorPosScreen.y - xy.y, vpHeight);
if (b - t < text.cutoffPixels.y) {
gl_Position = vec4(0.0);
}
}
}
vTextureCoords = mix(
instanceIconFrames.xy,
instanceIconFrames.xy + iconSize,
(positions.xy + 1.0) / 2.0
) / icon.iconsTextureDim;
vColor = instanceColors;
DECKGL_FILTER_COLOR(vColor, geometry);
vColorMode = instanceColorModes;
}
`,S_=`#version 300 es
#define SHADER_NAME multi-icon-layer-fragment-shader
precision highp float;
uniform sampler2D iconsTexture;
in vec4 vColor;
in vec2 vTextureCoords;
in vec2 uv;
out vec4 fragColor;
void main(void) {
geometry.uv = uv;
if (!bool(picking.isActive)) {
float alpha = texture(iconsTexture, vTextureCoords).a;
vec4 color = vColor;
if (sdf.enabled) {
float distance = alpha;
alpha = smoothstep(sdf.buffer - sdf.gamma, sdf.buffer + sdf.gamma, distance);
if (sdf.outlineBuffer > 0.0) {
float inFill = alpha;
float inBorder = smoothstep(sdf.outlineBuffer - sdf.gamma, sdf.outlineBuffer + sdf.gamma, distance);
color = mix(sdf.outlineColor, vColor, inFill);
alpha = inBorder;
}
}
float a = alpha * color.a;
if (a < icon.alphaCutoff) {
discard;
}
fragColor = vec4(color.rgb, a * layer.opacity);
}
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;function C_({collision:e=!1}={}){return`\
struct IconUniforms {
  sizeScale: f32,
  iconsTextureDim: vec2<f32>,
  sizeBasis: f32,
  sizeMinPixels: f32,
  sizeMaxPixels: f32,
  billboard: i32,
  sizeUnits: i32,
  alphaCutoff: f32
};

struct TextUniforms {
  cutoffPixels: vec2<f32>,
  align: vec2<i32>,
  fontSize: f32,
  flipY: f32
};

struct SdfUniforms {
  gamma: f32,
  enabled: f32,
  buffer: f32,
  outlineBuffer: f32,
  outlineColor: vec4<f32>
};

${e?`struct CollisionUniforms {
  sort: i32,
  enabled: i32
};
`:``}

const ALIGN_MODE_START: i32 = 1;
const ALIGN_MODE_CENTER: i32 = 2;
const ALIGN_MODE_END: i32 = 3;

@group(0) @binding(auto) var<uniform> icon: IconUniforms;
@group(0) @binding(auto) var<uniform> text: TextUniforms;
@group(0) @binding(auto) var<uniform> sdf: SdfUniforms;
${e?`@group(0) @binding(auto) var<uniform> collision: CollisionUniforms;`:``}
@group(0) @binding(auto) var iconsTexture : texture_2d<f32>;
@group(0) @binding(auto) var iconsTextureSampler : sampler;
${e?`@group(0) @binding(auto) var collision_texture : texture_2d<f32>;
`:``}

fn rotate_by_angle(vertex: vec2<f32>, angle_deg: f32) -> vec2<f32> {
  let angle_radian = angle_deg * PI / 180.0;
  let c = cos(angle_radian);
  let s = sin(angle_radian);
  let rotation = mat2x2<f32>(vec2<f32>(c, -s), vec2<f32>(s, c));
  return rotation * vertex;
}

fn get_pixel_offset_from_alignment(
  anchor: f32,
  extent: f32,
  clipStart: f32,
  clipEnd: f32,
  mode: i32
) -> f32 {
  if (clipEnd < clipStart) {
    return 0.0;
  }
  if (mode == ALIGN_MODE_START) {
    return max(-(anchor + clipStart), 0.0);
  }
  if (mode == ALIGN_MODE_CENTER) {
    let minValue = max(0.0, anchor + clipStart);
    let maxValue = min(extent, anchor + clipEnd);
    if (minValue < maxValue) {
      return (minValue + maxValue) / 2.0 - anchor;
    }
    return 0.0;
  }
  if (mode == ALIGN_MODE_END) {
    return min(extent - (anchor + clipEnd), 0.0);
  }
  return 0.0;
}

${e?`fn collision_match(texCoords: vec2<f32>, pickingColor: vec3<f32>) -> f32 {
  let textureSize = vec2<i32>(textureDimensions(collision_texture));
  let pixelCoords = clamp(
    vec2<i32>(texCoords * vec2<f32>(textureSize)),
    vec2<i32>(0),
    textureSize - vec2<i32>(1)
  );
  let collisionPickingColor = textureLoad(collision_texture, pixelCoords, 0);
  let delta = dot(abs(collisionPickingColor.rgb - pickingColor), vec3<f32>(1.0));
  return step(delta, 0.001);
}

fn collision_is_visible(texCoords: vec2<f32>, pickingColor: vec3<f32>) -> f32 {
  if (collision.enabled == 0) {
    return 1.0;
  }

  var accumulator = 0.0;
  let stepSize = vec2<f32>(1.0) / project.viewportSize;

  for (var i: i32 = -2; i <= 2; i = i + 1) {
    for (var j: i32 = -2; j <= 2; j = j + 1) {
      let delta = vec2<f32>(f32(j), f32(i)) * stepSize;
      accumulator = accumulator + collision_match(texCoords + delta, pickingColor);
    }
  }

  return pow(accumulator / 25.0, 2.2);
}
`:``}

struct Attributes {
  @location(0) positions: vec2<f32>,

  @location(1) instancePositions: vec3<f32>,
  @location(2) instancePositions64Low: vec3<f32>,
  @location(3) instanceSizes: f32,
  @location(4) instanceAngles: f32,
  @location(5) instanceColors: vec4<f32>,
  @location(6) instanceIconFrames: vec4<f32>,
  @location(7) instanceColorModes: f32,
  @location(8) instanceOffsets: vec2<f32>,
  @location(9) instancePixelOffset: vec2<f32>,
  @location(10) rowIndexes: u32,
  @location(11) instanceClipRect: vec4<f32>,
  ${e?`@location(12) collisionPriorities: f32,`:``}
};

struct Varyings {
  @builtin(position) position: vec4<f32>,

  @location(0) vColorMode: f32,
  @location(1) vColor: vec4<f32>,
  @location(2) vTextureCoords: vec2<f32>,
  @location(3) uv: vec2<f32>,
  @location(4) pickingColor: vec3<f32>,
};

@vertex
fn vertexMain(inp: Attributes) -> Varyings {
  geometry.worldPosition = inp.instancePositions;
  geometry.uv = inp.positions;
  geometry.pickingColor = picking_getPickingColorFromIndex(inp.rowIndexes);

  var outp: Varyings;
  outp.uv = inp.positions;

  let iconSize = inp.instanceIconFrames.zw;

  let sizePixels = clamp(
    project_unit_size_to_pixel(inp.instanceSizes * icon.sizeScale, icon.sizeUnits),
    icon.sizeMinPixels, icon.sizeMaxPixels
  );
  let instanceScale = sizePixels / text.fontSize;

  var pixelOffset = inp.positions / 2.0 * iconSize + inp.instanceOffsets;
  pixelOffset = rotate_by_angle(pixelOffset, inp.instanceAngles) * instanceScale;
  pixelOffset = pixelOffset + inp.instancePixelOffset;
  pixelOffset.y = pixelOffset.y * -1.0;

  var pos: vec4<f32>;
  var anchorPosScreen: vec2<f32>;
  if (icon.billboard != 0) {
    pos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, vec3<f32>(0.0));
    anchorPosScreen = pos.xy / pos.w;

    let clipOffset = project_pixel_size_to_clipspace(pixelOffset);
    pos = vec4<f32>(pos.x + clipOffset.x, pos.y + clipOffset.y, pos.z, pos.w);
  } else {
    var offsetCommon = vec3<f32>(project_pixel_size_vec2(pixelOffset), 0.0);
    if (text.flipY > 0.5) {
      offsetCommon.y = offsetCommon.y * -1.0;
    }
    let anchorPos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, vec3<f32>(0.0));
    anchorPosScreen = anchorPos.xy / anchorPos.w;
    pos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, offsetCommon);
  }

  anchorPosScreen = vec2<f32>(anchorPosScreen.x + 1.0, 1.0 - anchorPosScreen.y) / 2.0 *
    project.viewportSize / project.devicePixelRatio;
  var xy = project_size_vec2(inp.instanceClipRect.xy) * project.scale;
  var wh = project_size_vec2(inp.instanceClipRect.zw) * project.scale;

  if (text.flipY > 0.5) {
    xy.y = -xy.y - wh.y;
  }
  if (text.align.x > 0 || text.align.y > 0) {
    let viewportPixels = project.viewportSize / project.devicePixelRatio;
    let scrollPixels = vec2<f32>(
      get_pixel_offset_from_alignment(anchorPosScreen.x, viewportPixels.x, xy.x, xy.x + wh.x, text.align.x),
      -get_pixel_offset_from_alignment(anchorPosScreen.y, viewportPixels.y, -xy.y - wh.y, -xy.y, text.align.y)
    );
    pixelOffset = pixelOffset + scrollPixels;
    let scrollClipOffset = project_pixel_size_to_clipspace(scrollPixels);
    pos.x = pos.x + scrollClipOffset.x;
    pos.y = pos.y + scrollClipOffset.y;
  }

  if (inp.instanceClipRect.z >= 0.0) {
    if (pixelOffset.x < xy.x || pixelOffset.x > xy.x + wh.x) {
      pos = vec4<f32>(0.0);
    } else if (text.cutoffPixels.x > 0.0) {
      let viewportWidth = project.viewportSize.x / project.devicePixelRatio;
      let left = max(anchorPosScreen.x + xy.x, 0.0);
      let right = min(anchorPosScreen.x + xy.x + wh.x, viewportWidth);
      if (right - left < text.cutoffPixels.x) {
        pos = vec4<f32>(0.0);
      }
    }
  }
  if (inp.instanceClipRect.w >= 0.0) {
    if (pixelOffset.y < xy.y || pixelOffset.y > xy.y + wh.y) {
      pos = vec4<f32>(0.0);
    } else if (text.cutoffPixels.y > 0.0) {
      let viewportHeight = project.viewportSize.y / project.devicePixelRatio;
      let top = max(anchorPosScreen.y - xy.y - wh.y, 0.0);
      let bottom = min(anchorPosScreen.y - xy.y, viewportHeight);
      if (bottom - top < text.cutoffPixels.y) {
        pos = vec4<f32>(0.0);
      }
    }
  }

  ${e?`  if (collision.sort != 0) {
    pos.z = -0.001 * inp.collisionPriorities * pos.w;
  }
  `:``}

  let uvMix = (inp.positions.xy + vec2<f32>(1.0, 1.0)) * 0.5;
  outp.vTextureCoords = mix(inp.instanceIconFrames.xy, inp.instanceIconFrames.xy + iconSize, uvMix) / icon.iconsTextureDim;

  outp.position = pos;
  outp.vColor = inp.instanceColors;
  outp.vColorMode = inp.instanceColorModes;
  outp.pickingColor = picking_getPickingColorFromIndex(inp.rowIndexes);

  return outp;
}

@fragment
fn fragmentMain(inp: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = inp.uv;

  let texColor = textureSample(iconsTexture, iconsTextureSampler, inp.vTextureCoords);
  var alpha = texColor.a;
  var color = inp.vColor;

  if (sdf.enabled > 0.5) {
    let distance = alpha;
    alpha = smoothstep(sdf.buffer - sdf.gamma, sdf.buffer + sdf.gamma, distance);

    if (sdf.outlineBuffer > 0.0) {
      let inFill = alpha;
      let inBorder = smoothstep(sdf.outlineBuffer - sdf.gamma, sdf.outlineBuffer + sdf.gamma, distance);
      color = mix(sdf.outlineColor, inp.vColor, inFill);
      alpha = inBorder;
    }
  } else if (inp.vColorMode == 0.0) {
    color = texColor;
  }

  var a = alpha * color.a * layer.opacity;
  if (a < icon.alphaCutoff) {
    discard;
  }

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(inp.pickingColor)) {
      discard;
    }
    return vec4<f32>(inp.pickingColor, 1.0);
  }

  ${e?`  let collisionFade = collision_is_visible(inp.position.xy / project.viewportSize, inp.pickingColor);
  a = a * collisionFade;
  if (a <= 0.0001) {
    discard;
  }
  `:``}

  var fragColor = deckgl_premultiplied_alpha(vec4<f32>(color.rgb, a));

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(inp.pickingColor - highlightedObjectColor))) {
      let highLightAlpha = picking.highlightColor.a;
      let blendedAlpha = highLightAlpha + fragColor.a * (1.0 - highLightAlpha);
      if (blendedAlpha > 0.0) {
        let highLightRatio = highLightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highLightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  return fragColor;
}
`}var w_=C_(),T_=192/256,E_={getIconOffsets:{type:`accessor`,value:e=>e.offsets},getContentBox:{type:`accessor`,value:[0,0,-1,-1]},fontSize:1,alphaCutoff:.001,smoothing:.1,outlineWidth:0,outlineColor:{type:`color`,value:[0,0,0,255]},contentCutoffPixels:{type:`array`,value:[0,0]},contentAlignHorizontal:`none`,contentAlignVertical:`none`},D_=class extends Oh{getShaders(){let e=super.getShaders();return{...e,modules:[...e.modules,b_,v_],vs:x_,fs:S_,source:w_}}initializeState(){super.initializeState();let e=this.getAttributeManager(),t=e.attributes.instanceIconDefs;t.settings.update=this.calculateInstanceIconDefs,e.addInstanced({rowIndexes:{type:`uint32`,size:1,bufferGroup:`icon-instance-data`,accessor:(e,{index:t})=>t},instanceClipRect:{size:4,bufferGroup:`icon-instance-data`,accessor:`getContentBox`,defaultValue:[0,0,-1,-1]}})}updateState(e){super.updateState(e);let{props:t,oldProps:n,changeFlags:r}=e,{outlineColor:i}=t;if(r.extensionsChanged){this.state.fillModel?.destroy();let e=this.context.device.type===`webgpu`?this._getModel(`${this.props.id}-fill`):void 0;this.setState({fillModel:e,models:e?[this.state.model,e]:[this.state.model]})}if(r.updateTriggersChanged&&(r.updateTriggersChanged.getIcon||r.updateTriggersChanged.getIconOffsets)&&this.getAttributeManager().invalidate(`instanceIconDefs`),i!==n.outlineColor){let e=[i[0]/255,i[1]/255,i[2]/255,(i[3]??255)/255];this.setState({outlineColor:e})}!t.sdf&&t.outlineWidth&&R.warn(`${this.id}: fontSettings.sdf is required to render outline`)()}draw(e){let{sdf:t,smoothing:n,fontSize:r,outlineWidth:i,contentCutoffPixels:a,contentAlignHorizontal:o,contentAlignVertical:s}=this.props,{outlineColor:c}=this.state,l=i?Math.max(n,T_*(1-i)):-1,u=this.state.model,d={buffer:T_,outlineBuffer:l,gamma:n,enabled:!!t,outlineColor:c},f={contentCutoffPixels:a,contentAlignHorizontal:o,contentAlignVertical:s,fontSize:r,viewport:this.context.viewport};if(u.shaderInputs.setProps({sdf:d,text:f}),super.draw(e),t&&i){let{iconManager:e}=this.state;if(e.getTexture()){let e=this.state.fillModel||u;e.shaderInputs.setProps({sdf:{...d,outlineBuffer:T_},text:f}),this._drawModel(e)}}}calculateInstanceIconDefs(e,{startRow:t,endRow:n}){let{data:r,getIcon:i,getIconOffsets:a}=this.props,o=e.getVertexOffset(t),s=e.value,{iterable:c,objectInfo:l}=df(r,t,n);for(let t of c){l.index++;let n=i(t,l),r=a(t,l);if(n){let t=0;for(let i of Array.from(n)){let n=super.getInstanceIconDef(i);n[0]=r[t*2],n[1]+=r[t*2+1],n[6]=1,s.set(n,o),o+=e.size,t++}}}}};D_.defaultProps=E_,D_.layerName=`MultiIconLayer`;var O_=0x56bc75e2d63100000,k_=new Float64Array(256);for(let e=0;e<256;e++){let t=.5-(e/255)**(1/2.2);k_[e]=t*Math.abs(t)}k_[255]=-0x56bc75e2d63100000;var A_=class{constructor({fontSize:e=24,buffer:t=3,radius:n=8,cutoff:r=.25,fontFamily:i=`sans-serif`,fontWeight:a=`normal`,fontStyle:o=`normal`,lang:s=null}={}){this.buffer=t,this.radius=n,this.cutoff=r,this.lang=s;let c=this.size=e+t*4,l=this._createCanvas(c),u=this.ctx=l.getContext(`2d`,{willReadFrequently:!0});u.font=`${o} ${a} ${e}px ${i}`,u.textBaseline=`alphabetic`,u.textAlign=`left`,u.fillStyle=`black`,this.gridOuter=new Float64Array(c*c),this.gridInner=new Float64Array(c*c),this.f=new Float64Array(c),this.z=new Float64Array(c+1),this.v=new Uint16Array(c)}_createCanvas(e){if(typeof OffscreenCanvas<`u`)return new OffscreenCanvas(e,e);let t=document.createElement(`canvas`);return t.width=t.height=e,t}draw(e){let{width:t,actualBoundingBoxAscent:n,actualBoundingBoxDescent:r,actualBoundingBoxLeft:i,actualBoundingBoxRight:a}=this.ctx.measureText(e),o=Math.ceil(n),s=Math.floor(-i),c=Math.max(0,Math.min(this.size-this.buffer,Math.ceil(a)-s)),l=Math.max(0,Math.min(this.size-this.buffer,o+Math.ceil(r))),u=c+2*this.buffer,d=l+2*this.buffer,f=Math.max(u*d,0),p=new Uint8ClampedArray(f),m={data:p,width:u,height:d,glyphWidth:c,glyphHeight:l,glyphTop:o,glyphLeft:s,glyphAdvance:t};if(c===0||l===0)return m;let{ctx:h,buffer:g,gridInner:_,gridOuter:v}=this;this.lang&&(h.lang=this.lang),h.clearRect(g,g,c,l),h.fillText(e,g-s,g+o);let y=h.getImageData(g,g,c,l);v.fill(O_,0,f),_.fill(0,0,f);let b=3;for(let e=0;e<l;e++){let t=(e+g)*u+g;for(let e=0;e<c;e++,b+=4,t++){let e=y.data[b];if(e===0)continue;let n=k_[e];v[t]=Math.max(0,n),_[t]=Math.max(0,-n)}}j_(v,0,0,u,d,u,this.f,this.v,this.z);let x=Math.min(g,1);j_(_,g-x,g-x,c+2*x,l+2*x,u,this.f,this.v,this.z);let S=255/this.radius,C=255*(1-this.cutoff);for(let e=0;e<f;e++){let t=Math.sqrt(v[e])-Math.sqrt(_[e]);p[e]=Math.round(C-S*t)}return m}};function j_(e,t,n,r,i,a,o,s,c){for(let l=t;l<t+r;l++)M_(e,n*a+l,a,i,o,s,c);for(let l=n;l<n+i;l++)M_(e,l*a+t,1,r,o,s,c)}function M_(e,t,n,r,i,a,o){a[0]=0,o[0]=-0x56bc75e2d63100000,o[1]=O_,i[0]=e[t];for(let s=1,c=0,l=0;s<r;s++){i[s]=e[t+s*n];let r=s*s;do{let e=a[c];l=(i[s]-i[e]+r-e*e)/(s-e)/2}while(l<=o[c]&&--c>-1);c++,a[c]=s,o[c]=l,o[c+1]=O_}for(let s=0,c=0;s<r;s++){for(;o[c+1]<s;)c++;let r=a[c],l=s-r;e[t+s*n]=i[r]+l*l}}var N_=32,P_=[];function F_(e){return 2**Math.ceil(Math.log2(e))}function I_({characterSet:e,measureText:t,buffer:n,maxCanvasWidth:r,mapping:i={},xOffset:a=0,yOffsetMin:o=0,yOffsetMax:s=0}){let c=a,l=o,u=s;for(let a of e)if(!i[a]){let{advance:e,width:o,ascent:s,descent:d}=t(a),f=s+d;c+o+n*2>r&&(c=0,l=u),i[a]={x:c+n,y:l+n,width:o,height:f,advance:e,anchorX:o/2,anchorY:s},c+=o+n*2,u=Math.max(u,l+f+n*2)}return{mapping:i,xOffset:c,yOffsetMin:l,yOffsetMax:u,canvasHeight:F_(u)}}function L_(e,t,n,r){let i=0;for(let a=t;a<n;a++){let t=e[a];i+=r[t]?.advance||0}return i}function R_(e,t,n,r,i,a){let o=t,s=0;for(let c=t;c<n;c++){let t=L_(e,c,c+1,i);s+t>r&&(o<c&&a.push(c),o=c,s=0),s+=t}return s}function z_(e,t,n,r,i,a){let o=t,s=t,c=t,l=0;for(let u=t;u<n;u++)if((e[u]===` `||e[u+1]===` `||u+1===n)&&(c=u+1),c>s){let t=L_(e,s,c,i);l+t>r&&(o<s&&(a.push(s),o=s,l=0),t>r&&(t=R_(e,s,c,r,i,a),o=a[a.length-1])),s=c,l+=t}return l}function B_(e,t,n,r,i=0,a){a===void 0&&(a=e.length);let o=[];return t===`break-all`?R_(e,i,a,n,r,o):z_(e,i,a,n,r,o),o}function V_(e,t,n,r,i,a){let o=0,s=0;for(let i=t;i<n;i++){let t=r[e[i]];t&&(s=Math.max(s,t.height))}for(let a=t;a<n;a++){let t=e[a],n=r[t];n?(i[a]=o+n.anchorX,o+=n.advance):(R.warn(`Missing character: ${t} (${t.codePointAt(0)})`)(),i[a]=o,o+=N_)}a[0]=o,a[1]=s}function H_(e,t,n,r,i,a){let o=Array.from(e),s=o.length,c=Array(s),l=Array(s),u=Array(s),d=(r===`break-word`||r===`break-all`)&&isFinite(i)&&i>0,f=[0,0],p=[0,0],m=0,h=t+n/2,g=0,_=0;for(let e=0;e<=s;e++){let t=o[e];if((t===`
`||e===s)&&(_=e),_>g){let e=d?B_(o,r,i,a,g,_):P_;for(let t=0;t<=e.length;t++){let r=t===0?g:e[t-1],i=t<e.length?e[t]:_;V_(o,r,i,a,c,p);for(let e=r;e<i;e++)l[e]=h,u[e]=p[0];m++,h+=n,f[0]=Math.max(f[0],p[0])}g=_}t===`
`&&(c[g]=0,l[g]=0,u[g]=0,g++)}return f[1]=m*n,{x:c,y:l,rowWidth:u,size:f}}function U_({value:e,length:t,stride:n,offset:r,startIndices:i,characterSet:a}){let o=e.BYTES_PER_ELEMENT,s=n?n/o:1,c=r?r/o:0,l=i[t]||Math.ceil((e.length-c)/s),u=a&&new Set,d=Array(t),f=e;if(s>1||c>0){let t=e.constructor;f=new t(l);for(let t=0;t<l;t++)f[t]=e[t*s+c]}for(let e=0;e<t;e++){let t=i[e],n=i[e+1]||l,r=f.subarray(t,n);d[e]=String.fromCodePoint.apply(null,r),u&&r.forEach(u.add,u)}if(u)for(let e of u)a.add(String.fromCodePoint(e));return{texts:d,characterCount:l}}var W_=class{constructor(e=5){this._cache={},this._order=[],this.limit=e}get(e){let t=this._cache[e];return t&&(this._deleteOrder(e),this._appendOrder(e)),t}set(e,t){this._cache[e]?(this.delete(e),this._cache[e]=t,this._appendOrder(e)):(Object.keys(this._cache).length===this.limit&&this.delete(this._order[0]),this._cache[e]=t,this._appendOrder(e))}delete(e){this._cache[e]&&(delete this._cache[e],this._deleteOrder(e))}_deleteOrder(e){let t=this._order.indexOf(e);t>=0&&this._order.splice(t,1)}_appendOrder(e){this._order.push(e)}};function G_(){let e=[];for(let t=32;t<128;t++)e.push(String.fromCharCode(t));return e}var K_={fontFamily:`Monaco, monospace`,fontWeight:`normal`,characterSet:G_(),fontSize:64,buffer:4,sdf:!1,cutoff:.25,radius:12,smoothing:.1},q_=1024,J_=.9,Y_=.3,X_=3,Z_=new W_(X_);function Q_(e,t){let n;n=typeof t==`string`?new Set(Array.from(t)):new Set(t);let r=Z_.get(e);if(!r)return n;for(let e in r.mapping)n.has(e)&&n.delete(e);return n}function $_(e,t){for(let n=0;n<e.length;n++)t.data[4*n+3]=e[n]}function ev(e,t,n,r){e.font=`${r} ${n}px ${t}`,e.fillStyle=`#000`,e.textBaseline=`alphabetic`,e.textAlign=`left`}function tv(e,t,n){if(n===void 0){let n=e.measureText(`A`);return n.fontBoundingBoxAscent?{advance:0,width:0,ascent:Math.ceil(n.fontBoundingBoxAscent),descent:Math.ceil(n.fontBoundingBoxDescent)}:{advance:0,width:0,ascent:t*J_,descent:t*Y_}}let r=e.measureText(n);return r.actualBoundingBoxAscent?{advance:r.width,width:Math.ceil(r.actualBoundingBoxRight-r.actualBoundingBoxLeft),ascent:Math.ceil(r.actualBoundingBoxAscent),descent:Math.ceil(r.actualBoundingBoxDescent)}:{advance:r.width,width:r.width,ascent:t*J_,descent:t*Y_}}function nv(e){R.assert(Number.isFinite(e)&&e>=X_,`Invalid cache limit`),Z_=new W_(e)}var rv=class{constructor(){this.props={...K_}}get atlas(){return this._atlas}get mapping(){return this._atlas&&this._atlas.mapping}setProps(e={}){Object.assign(this.props,e),e._getFontRenderer&&(this._getFontRenderer=e._getFontRenderer),this._key=this._getKey();let t=Q_(this._key,this.props.characterSet),n=Z_.get(this._key);if(n&&t.size===0){this._atlas!==n&&(this._atlas=n);return}let r=this._generateFontAtlas(t,n);this._atlas=r,Z_.set(this._key,r)}_generateFontAtlas(e,t){let{fontFamily:n,fontWeight:r,fontSize:i,buffer:a,sdf:o,radius:s,cutoff:c}=this.props,l=t&&t.data;l||(l=document.createElement(`canvas`),l.width=q_);let u=l.getContext(`2d`,{willReadFrequently:!0});ev(u,n,i,r);let d=e=>tv(u,i,e),f;this._getFontRenderer?f=this._getFontRenderer(this.props):o&&(f={measure:d,draw:iv(this.props)});let{mapping:p,canvasHeight:m,xOffset:h,yOffsetMin:g,yOffsetMax:_}=I_({measureText:e=>f?f.measure(e):d(e),buffer:a,characterSet:e,maxCanvasWidth:q_,...t&&{mapping:t.mapping,xOffset:t.xOffset,yOffsetMin:t.yOffsetMin,yOffsetMax:t.yOffsetMax}});if(l.height!==m){let e=l.height>0?u.getImageData(0,0,l.width,l.height):null;l.height=m,e&&u.putImageData(e,0,0)}if(ev(u,n,i,r),f)for(let t of e){let e=p[t],n=e.width,{data:r,left:i=0,top:a=0}=f.draw(t),o=e.x-i,s=e.y-a,c=Math.max(0,Math.round(o)),d=Math.max(0,Math.round(s)),m=Math.min(r.width,l.width-c),h=Math.min(r.height,l.height-d);u.putImageData(r,c,d,0,0,m,h),e.x=c,e.y=d,e.width=m,e.height=h,e.anchorX+=m/2-i-n/2,e.anchorY+=a}else for(let t of e){let e=p[t];u.fillText(t,e.x,e.y+e.anchorY)}let v=f?f.measure():d();return{baselineOffset:(v.ascent-v.descent)/2,xOffset:h,yOffsetMin:g,yOffsetMax:_,mapping:p,data:l,width:l.width,height:l.height}}_getKey(){let{fontFamily:e,fontWeight:t,fontSize:n,buffer:r,sdf:i,radius:a,cutoff:o}=this.props;return i?`${e} ${t} ${n} ${r} ${a} ${o}`:`${e} ${t} ${n} ${r}`}};function iv({fontSize:e,buffer:t,radius:n,cutoff:r,fontFamily:i,fontWeight:a}){let o=new A_({fontSize:e,buffer:t,radius:n,cutoff:r,fontFamily:i,fontWeight:`${a}`});return e=>{let{data:n,width:r,height:i}=o.draw(e),a=new ImageData(r,i);return $_(n,a),{data:a,left:t,top:t}}}var av=`struct TextBackgroundUniforms {
  billboard: f32,
  sizeScale: f32,
  sizeMinPixels: f32,
  sizeMaxPixels: f32,
  borderRadius: vec4<f32>,
  padding: vec4<f32>,
  sizeUnits: i32,
  stroked: f32,
};

@group(0) @binding(auto) var<uniform> textBackground: TextBackgroundUniforms;
`,ov=`layout(std140) uniform textBackgroundUniforms {
  bool billboard;
  float sizeScale;
  float sizeMinPixels;
  float sizeMaxPixels;
  vec4 borderRadius;
  vec4 padding;
  highp int sizeUnits;
  bool stroked;
} textBackground;
`,sv={name:`textBackground`,source:av,vs:ov,fs:ov,uniformTypes:{billboard:`f32`,sizeScale:`f32`,sizeMinPixels:`f32`,sizeMaxPixels:`f32`,borderRadius:`vec4<f32>`,padding:`vec4<f32>`,sizeUnits:`i32`,stroked:`f32`}},cv=`#version 300 es
#define SHADER_NAME text-background-layer-vertex-shader
in vec2 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in vec4 instanceRects;
in vec4 instanceClipRect;
in float instanceSizes;
in float instanceAngles;
in vec2 instancePixelOffsets;
in float instanceLineWidths;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
out vec4 vFillColor;
out vec4 vLineColor;
out float vLineWidth;
out vec2 uv;
out vec2 dimensions;
vec2 rotate_by_angle(vec2 vertex, float angle) {
float angle_radian = radians(angle);
float cos_angle = cos(angle_radian);
float sin_angle = sin(angle_radian);
mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
return rotationMatrix * vertex;
}
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = positions;
geometry.pickingColor = picking_getPickingColorFromInstanceID();
uv = positions;
vLineWidth = instanceLineWidths;
float sizePixels = clamp(
project_size_to_pixel(instanceSizes * textBackground.sizeScale, textBackground.sizeUnits),
textBackground.sizeMinPixels, textBackground.sizeMaxPixels
);
float instanceScale = sizePixels / text.fontSize;
dimensions = instanceRects.zw * instanceScale + textBackground.padding.xy + textBackground.padding.zw;
vec2 pixelOffset = (positions * instanceRects.zw + instanceRects.xy) * instanceScale + mix(-textBackground.padding.xy, textBackground.padding.zw, positions);
pixelOffset = rotate_by_angle(pixelOffset, instanceAngles);
pixelOffset += instancePixelOffsets;
pixelOffset.y *= -1.0;
vec2 xy = project_size_to_pixel(instanceClipRect.xy);
vec2 wh = project_size_to_pixel(instanceClipRect.zw);
if (text.flipY) {
xy.y = -xy.y - wh.y;
}
if (instanceClipRect.z >= 0.0) {
dimensions.x = wh.x;
pixelOffset.x = xy.x + uv.x * wh.x + mix(-textBackground.padding.x, textBackground.padding.z, uv.x);
}
if (instanceClipRect.w >= 0.0) {
dimensions.y = wh.y;
pixelOffset.y = xy.y + uv.y * wh.y + mix(-textBackground.padding.y, textBackground.padding.w, uv.y);
}
if (textBackground.billboard)  {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = vec3(pixelOffset, 0.0);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
if (text.flipY) {
offset_common.y *= -1.;
}
DECKGL_FILTER_SIZE(offset_common, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vFillColor, geometry);
vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vLineColor, geometry);
}
`,lv=`#version 300 es
#define SHADER_NAME text-background-layer-fragment-shader
precision highp float;
in vec4 vFillColor;
in vec4 vLineColor;
in float vLineWidth;
in vec2 uv;
in vec2 dimensions;
out vec4 fragColor;
float round_rect(vec2 p, vec2 size, vec4 radii) {
vec2 pixelPositionCB = (p - 0.5) * size;
vec2 sizeCB = size * 0.5;
float maxBorderRadius = min(size.x, size.y) * 0.5;
vec4 borderRadius = vec4(min(radii, maxBorderRadius));
borderRadius.xy =
(pixelPositionCB.x > 0.0) ? borderRadius.xy : borderRadius.zw;
borderRadius.x = (pixelPositionCB.y > 0.0) ? borderRadius.x : borderRadius.y;
vec2 q = abs(pixelPositionCB) - sizeCB + borderRadius.x;
return -(min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - borderRadius.x);
}
float rect(vec2 p, vec2 size) {
vec2 pixelPosition = p * size;
return min(min(pixelPosition.x, size.x - pixelPosition.x),
min(pixelPosition.y, size.y - pixelPosition.y));
}
vec4 get_stroked_fragColor(float dist) {
float isBorder = smoothedge(dist, vLineWidth);
return mix(vFillColor, vLineColor, isBorder);
}
void main(void) {
geometry.uv = uv;
if (textBackground.borderRadius != vec4(0.0)) {
float distToEdge = round_rect(uv, dimensions, textBackground.borderRadius);
float shapeAlpha = smoothedge(-distToEdge, 0.0);
if (shapeAlpha == 0.0) {
discard;
}
if (textBackground.stroked) {
fragColor = get_stroked_fragColor(distToEdge);
} else {
fragColor = vFillColor;
}
fragColor.a *= shapeAlpha;
} else {
if (textBackground.stroked) {
float distToEdge = rect(uv, dimensions);
fragColor = get_stroked_fragColor(distToEdge);
} else {
fragColor = vFillColor;
}
}
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,uv=`struct TextUniforms {
  cutoffPixels: vec2<f32>,
  align: vec2<i32>,
  fontSize: f32,
  flipY: f32,
};

@group(0) @binding(auto) var<uniform> text: TextUniforms;

fn rotate_by_angle(vertex: vec2<f32>, angle: f32) -> vec2<f32> {
  let angleRadian = radians(angle);
  let cosine = cos(angleRadian);
  let sine = sin(angleRadian);
  let rotationMatrix = mat2x2<f32>(
    vec2<f32>(cosine, -sine),
    vec2<f32>(sine, cosine)
  );
  return rotationMatrix * vertex;
}

struct Attributes {
  @builtin(instance_index) instanceIndex: u32,
  @location(0) positions: vec2<f32>,
  @location(1) instancePositions: vec3<f32>,
  @location(2) instancePositions64Low: vec3<f32>,
  @location(3) instanceSizes: f32,
  @location(4) instanceAngles: f32,
  @location(5) instanceRects: vec4<f32>,
  @location(6) instanceClipRect: vec4<f32>,
  @location(7) instancePixelOffsets: vec2<f32>,
  @location(8) instanceFillColors: vec4<f32>,
  @location(9) instanceLineColors: vec4<f32>,
  @location(10) instanceLineWidths: f32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vFillColor: vec4<f32>,
  @location(1) vLineColor: vec4<f32>,
  @location(2) vLineWidth: f32,
  @location(3) uv: vec2<f32>,
  @location(4) dimensions: vec2<f32>,
  @location(5) pickingColor: vec3<f32>,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  geometry.worldPosition = attributes.instancePositions;
  geometry.uv = attributes.positions;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.instanceIndex);

  var varyings: Varyings;
  varyings.uv = attributes.positions;
  varyings.vLineWidth = attributes.instanceLineWidths;

  let sizePixels = clamp(
    project_unit_size_to_pixel(
      attributes.instanceSizes * textBackground.sizeScale,
      textBackground.sizeUnits
    ),
    textBackground.sizeMinPixels,
    textBackground.sizeMaxPixels
  );
  let instanceScale = sizePixels / text.fontSize;

  varyings.dimensions = attributes.instanceRects.zw * instanceScale +
    textBackground.padding.xy + textBackground.padding.zw;

  var pixelOffset =
    (attributes.positions * attributes.instanceRects.zw + attributes.instanceRects.xy) *
      instanceScale +
    mix(-textBackground.padding.xy, textBackground.padding.zw, attributes.positions);
  pixelOffset = rotate_by_angle(pixelOffset, attributes.instanceAngles);
  pixelOffset = pixelOffset + attributes.instancePixelOffsets;
  pixelOffset.y = pixelOffset.y * -1.0;

  var xy = project_size_vec2(attributes.instanceClipRect.xy) * project.scale;
  let wh = project_size_vec2(attributes.instanceClipRect.zw) * project.scale;
  if (text.flipY > 0.5) {
    xy.y = -xy.y - wh.y;
  }
  if (attributes.instanceClipRect.z >= 0.0) {
    varyings.dimensions.x = wh.x;
    pixelOffset.x = xy.x + varyings.uv.x * wh.x + mix(
      -textBackground.padding.x,
      textBackground.padding.z,
      varyings.uv.x
    );
  }
  if (attributes.instanceClipRect.w >= 0.0) {
    varyings.dimensions.y = wh.y;
    pixelOffset.y = xy.y + varyings.uv.y * wh.y + mix(
      -textBackground.padding.y,
      textBackground.padding.w,
      varyings.uv.y
    );
  }

  if (textBackground.billboard > 0.5) {
    var position = project_position_to_clipspace(
      attributes.instancePositions,
      attributes.instancePositions64Low,
      vec3<f32>(0.0)
    );
    let clipOffset = project_pixel_size_to_clipspace(pixelOffset);
    position = vec4<f32>(
      position.x + clipOffset.x,
      position.y + clipOffset.y,
      position.z,
      position.w
    );
    varyings.position = position;
  } else {
    var offsetCommon = vec3<f32>(project_pixel_size_vec2(pixelOffset), 0.0);
    if (text.flipY > 0.5) {
      offsetCommon.y = offsetCommon.y * -1.0;
    }
    varyings.position = project_position_to_clipspace(
      attributes.instancePositions,
      attributes.instancePositions64Low,
      offsetCommon
    );
  }

  varyings.vFillColor = vec4<f32>(
    attributes.instanceFillColors.rgb,
    attributes.instanceFillColors.a * layer.opacity
  );
  varyings.vLineColor = vec4<f32>(
    attributes.instanceLineColors.rgb,
    attributes.instanceLineColors.a * layer.opacity
  );
  varyings.pickingColor = geometry.pickingColor;
  return varyings;
}

fn round_rect(point: vec2<f32>, size: vec2<f32>, radii: vec4<f32>) -> f32 {
  let pixelPosition = (point - 0.5) * size;
  let halfSize = size * 0.5;
  let maxBorderRadius = min(size.x, size.y) * 0.5;
  var borderRadius = min(radii, vec4<f32>(maxBorderRadius));

  borderRadius = select(borderRadius.zwxy, borderRadius, pixelPosition.x > 0.0);
  let radius = select(borderRadius.y, borderRadius.x, pixelPosition.y > 0.0);
  let q = abs(pixelPosition) - halfSize + radius;
  return -(min(max(q.x, q.y), 0.0) + length(max(q, vec2<f32>(0.0))) - radius);
}

fn rect(point: vec2<f32>, size: vec2<f32>) -> f32 {
  let pixelPosition = point * size;
  return min(
    min(pixelPosition.x, size.x - pixelPosition.x),
    min(pixelPosition.y, size.y - pixelPosition.y)
  );
}

fn get_stroked_frag_color(
  distanceToEdge: f32,
  lineWidth: f32,
  fillColor: vec4<f32>,
  lineColor: vec4<f32>
) -> vec4<f32> {
  let isBorder = smoothedge(distanceToEdge, lineWidth);
  return mix(fillColor, lineColor, isBorder);
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = varyings.uv;
  var fragColor: vec4<f32>;

  if (any(textBackground.borderRadius != vec4<f32>(0.0))) {
    let distanceToEdge = round_rect(
      varyings.uv,
      varyings.dimensions,
      textBackground.borderRadius
    );
    let shapeAlpha = smoothedge(-distanceToEdge, 0.0);
    if (shapeAlpha == 0.0) {
      discard;
    }
    if (textBackground.stroked > 0.5) {
      fragColor = get_stroked_frag_color(
        distanceToEdge,
        varyings.vLineWidth,
        varyings.vFillColor,
        varyings.vLineColor
      );
    } else {
      fragColor = varyings.vFillColor;
    }
    fragColor.a = fragColor.a * shapeAlpha;
  } else if (textBackground.stroked > 0.5) {
    let distanceToEdge = rect(varyings.uv, varyings.dimensions);
    fragColor = get_stroked_frag_color(
      distanceToEdge,
      varyings.vLineWidth,
      varyings.vFillColor,
      varyings.vLineColor
    );
  } else {
    fragColor = varyings.vFillColor;
  }

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(varyings.pickingColor)) {
      discard;
    }
    return vec4<f32>(varyings.pickingColor, 1.0);
  }

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(varyings.pickingColor - highlightedObjectColor))) {
      let highlightAlpha = picking.highlightColor.a;
      let blendedAlpha = highlightAlpha + fragColor.a * (1.0 - highlightAlpha);
      if (blendedAlpha > 0.0) {
        let highlightRatio = highlightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highlightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  return deckgl_premultiplied_alpha(fragColor);
}
`,dv={billboard:!0,sizeScale:1,sizeUnits:`pixels`,sizeMinPixels:0,sizeMaxPixels:2**53-1,fontSize:1,borderRadius:{type:`object`,value:0},padding:{type:`array`,value:[0,0,0,0]},getPosition:{type:`accessor`,value:e=>e.position},getSize:{type:`accessor`,value:1},getAngle:{type:`accessor`,value:0},getPixelOffset:{type:`accessor`,value:[0,0]},getBoundingRect:{type:`accessor`,value:[0,0,0,0]},getClipRect:{type:`accessor`,value:[0,0,-1,-1]},getFillColor:{type:`accessor`,value:[0,0,0,255]},getLineColor:{type:`accessor`,value:[0,0,0,255]},getLineWidth:{type:`accessor`,value:1}},fv=class extends Km{getShaders(){return super.getShaders({vs:cv,fs:lv,source:uv,modules:[wc,lo,xl,sv,b_]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:`float64`,fp64:this.use64bitPositions(),transition:!0,accessor:`getPosition`},instanceSizes:{size:1,transition:!0,bufferGroup:`text-background-instance-data`,accessor:`getSize`,defaultValue:1},instanceAngles:{size:1,transition:!0,bufferGroup:`text-background-instance-data`,accessor:`getAngle`},instanceRects:{size:4,bufferGroup:`text-background-instance-data`,accessor:`getBoundingRect`},instanceClipRect:{size:4,bufferGroup:`text-background-instance-data`,accessor:`getClipRect`,defaultValue:[0,0,-1,-1]},instancePixelOffsets:{size:2,transition:!0,bufferGroup:`text-background-instance-data`,accessor:`getPixelOffset`},instanceFillColors:{size:4,transition:!0,type:`unorm8`,accessor:`getFillColor`,defaultValue:[0,0,0,255]},instanceLineColors:{size:4,transition:!0,type:`unorm8`,accessor:`getLineColor`,defaultValue:[0,0,0,255]},instanceLineWidths:{size:1,transition:!0,bufferGroup:`text-background-instance-data`,accessor:`getLineWidth`,defaultValue:1}})}updateState(e){super.updateState(e);let{changeFlags:t}=e;t.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),this.getAttributeManager().invalidateAll())}draw({uniforms:e}){let{billboard:t,sizeScale:n,sizeUnits:r,sizeMinPixels:i,sizeMaxPixels:a,getLineWidth:o,fontSize:s}=this.props,{padding:c,borderRadius:l}=this.props;c.length<4&&(c=[c[0],c[1],c[0],c[1]]),Array.isArray(l)||(l=[l,l,l,l]);let u=this.state.model,d={billboard:t,stroked:!!o,borderRadius:l,padding:c,sizeUnits:nc[r],sizeScale:n,sizeMinPixels:i,sizeMaxPixels:a},f={fontSize:s,viewport:this.context.viewport};u.shaderInputs.setProps({textBackground:d,text:f}),u.draw(this.context.renderPass)}_getModel(){let e=[0,0,1,0,0,1,1,1];return new M(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new N({topology:`triangle-strip`,vertexCount:4,attributes:{positions:{size:2,value:new Float32Array(e)}}}),isInstanced:!0})}};fv.defaultProps=dv,fv.layerName=`TextBackgroundLayer`;var pv={start:1,middle:0,end:-1},mv={top:1,center:0,bottom:-1},hv=[0,0,0,255],gv={billboard:!0,sizeScale:1,sizeUnits:`pixels`,sizeMinPixels:0,sizeMaxPixels:2**53-1,background:!1,getBackgroundColor:{type:`accessor`,value:[255,255,255,255]},getBorderColor:{type:`accessor`,value:hv},getBorderWidth:{type:`accessor`,value:0},backgroundBorderRadius:{type:`object`,value:0},backgroundPadding:{type:`array`,value:[0,0,0,0]},characterSet:{type:`object`,value:K_.characterSet},fontFamily:K_.fontFamily,fontWeight:K_.fontWeight,lineHeight:1,outlineWidth:{type:`number`,value:0,min:0},outlineColor:{type:`color`,value:hv},fontSettings:{type:`object`,value:{},compare:1},wordBreak:`break-word`,maxWidth:{type:`number`,value:-1},contentCutoffPixels:{type:`array`,value:[0,0]},contentAlignHorizontal:`none`,contentAlignVertical:`none`,getText:{type:`accessor`,value:e=>e.text},getPosition:{type:`accessor`,value:e=>e.position},getColor:{type:`accessor`,value:hv},getSize:{type:`accessor`,value:32},getAngle:{type:`accessor`,value:0},getTextAnchor:{type:`accessor`,value:`middle`},getAlignmentBaseline:{type:`accessor`,value:`center`},getPixelOffset:{type:`accessor`,value:[0,0]},getContentBox:{type:`accessor`,value:[0,0,-1,-1]},backgroundColor:{deprecatedFor:[`background`,`getBackgroundColor`]}},_v=class extends Qm{constructor(){super(...arguments),this.getBoundingRect=(e,t)=>{let{size:[n,r]}=this.transformParagraph(e,t),{getTextAnchor:i,getAlignmentBaseline:a}=this.props,o=pv[typeof i==`function`?i(e,t):i],s=mv[typeof a==`function`?a(e,t):a];return[(o-1)*n/2,(s-1)*r/2,n,r]},this.getIconOffsets=(e,t)=>{let{getTextAnchor:n,getAlignmentBaseline:r}=this.props,{x:i,y:a,rowWidth:o,size:[,s]}=this.transformParagraph(e,t),c=pv[typeof n==`function`?n(e,t):n],l=mv[typeof r==`function`?r(e,t):r],u=i.length,d=Array(u*2),f=0;for(let e=0;e<u;e++)d[f++]=(c-1)*o[e]/2+i[e],d[f++]=(l-1)*s/2+a[e];return d}}initializeState(){this.state={styleVersion:0,fontAtlasManager:new rv},this.props.maxWidth>0&&R.once(1,`v8.9 breaking change: TextLayer maxWidth is now relative to text size`)()}updateState(e){let{props:t,oldProps:n,changeFlags:r}=e;(r.dataChanged||r.updateTriggersChanged&&(r.updateTriggersChanged.all||r.updateTriggersChanged.getText))&&this._updateText(),(this._updateFontAtlas()||t.lineHeight!==n.lineHeight||t.wordBreak!==n.wordBreak||t.maxWidth!==n.maxWidth)&&this.setState({styleVersion:this.state.styleVersion+1})}getPickingInfo({info:e}){return e.object=e.index>=0?this.props.data[e.index]:null,e}_updateFontAtlas(){let{fontSettings:e,fontFamily:t,fontWeight:n,_getFontRenderer:r}=this.props,{fontAtlasManager:i,characterSet:a}=this.state,o={...e,characterSet:a,fontFamily:t,fontWeight:n,_getFontRenderer:r};if(!i.mapping)return i.setProps(o),!0;for(let e in o)if(o[e]!==i.props[e])return i.setProps(o),!0;return!1}_updateText(){let{data:e,characterSet:t}=this.props,n=e.attributes?.getText,{getText:r}=this.props,i=e.startIndices,a,o=t===`auto`&&new Set;if(n&&i){let{texts:t,characterCount:s}=U_({...ArrayBuffer.isView(n)?{value:n}:n,length:e.length,startIndices:i,characterSet:o});a=s,r=(e,{index:n})=>t[n]}else{let{iterable:t,objectInfo:n}=df(e);i=[0],a=0;for(let e of t){n.index++;let t=Array.from(r(e,n)||``);o&&t.forEach(o.add,o),a+=t.length,i.push(a)}}this.setState({getText:r,startIndices:i,numInstances:a,characterSet:o||t})}transformParagraph(e,t){let{fontAtlasManager:n}=this.state,r=n.mapping,{baselineOffset:i}=n.atlas,{fontSize:a}=n.props,o=this.state.getText,{wordBreak:s,lineHeight:c,maxWidth:l}=this.props;return H_(o(e,t)||``,i,c*a,s,l*a,r)}renderLayers(){let{startIndices:e,numInstances:t,getText:n,fontAtlasManager:{atlas:r,mapping:i},styleVersion:a}=this.state,{data:o,_dataDiff:s,getPosition:c,getColor:l,getSize:u,getAngle:d,getPixelOffset:f,getBackgroundColor:p,getBorderColor:m,getBorderWidth:h,getContentBox:g,backgroundBorderRadius:_,backgroundPadding:v,background:y,billboard:b,fontSettings:x,outlineWidth:S,outlineColor:C,sizeScale:w,sizeUnits:T,sizeMinPixels:E,sizeMaxPixels:D,contentCutoffPixels:O,contentAlignHorizontal:k,contentAlignVertical:A,transitions:j,updateTriggers:M}=this.props,N=this.getSubLayerClass(`characters`,D_),ee=this.getSubLayerClass(`background`,fv),{fontSize:te}=this.state.fontAtlasManager.props;return[y&&new ee({getFillColor:p,getLineColor:m,getLineWidth:h,borderRadius:_,padding:v,getPosition:c,getSize:u,getAngle:d,getPixelOffset:f,getClipRect:g,billboard:b,sizeScale:w,sizeUnits:T,sizeMinPixels:E,sizeMaxPixels:D,fontSize:te,transitions:j&&{getPosition:j.getPosition,getAngle:j.getAngle,getSize:j.getSize,getFillColor:j.getBackgroundColor,getLineColor:j.getBorderColor,getLineWidth:j.getBorderWidth,getPixelOffset:j.getPixelOffset}},this.getSubLayerProps({id:`background`,updateTriggers:{getPosition:M.getPosition,getAngle:M.getAngle,getSize:M.getSize,getFillColor:M.getBackgroundColor,getLineColor:M.getBorderColor,getLineWidth:M.getBorderWidth,getPixelOffset:M.getPixelOffset,getBoundingRect:{getText:M.getText,getTextAnchor:M.getTextAnchor,getAlignmentBaseline:M.getAlignmentBaseline,styleVersion:a}}}),{data:o.attributes&&o.attributes.background?{length:o.length,attributes:o.attributes.background}:o,_dataDiff:s,autoHighlight:!1,getBoundingRect:this.getBoundingRect}),new N({sdf:x.sdf,smoothing:Number.isFinite(x.smoothing)?x.smoothing:K_.smoothing,outlineWidth:S/(x.radius||K_.radius),outlineColor:C,iconAtlas:r,iconMapping:i,getPosition:c,getColor:l,getSize:u,getAngle:d,getPixelOffset:f,getContentBox:g,billboard:b,sizeScale:w,sizeUnits:T,sizeMinPixels:E,sizeMaxPixels:D,fontSize:te,contentCutoffPixels:O,contentAlignHorizontal:k,contentAlignVertical:A,transitions:j&&{getPosition:j.getPosition,getAngle:j.getAngle,getColor:j.getColor,getSize:j.getSize,getPixelOffset:j.getPixelOffset,getContentBox:j.getContentBox}},this.getSubLayerProps({id:`characters`,updateTriggers:{all:M.getText,getPosition:M.getPosition,getAngle:M.getAngle,getColor:M.getColor,getSize:M.getSize,getPixelOffset:M.getPixelOffset,getContentBox:M.getContentBox,getIconOffsets:{getTextAnchor:M.getTextAnchor,getAlignmentBaseline:M.getAlignmentBaseline,styleVersion:a}}}),{data:o,_dataDiff:s,startIndices:e,numInstances:t,getIconOffsets:this.getIconOffsets,getIcon:n})]}static set fontAtlasCacheLimit(e){nv(e)}};_v.defaultProps=gv,_v.layerName=`TextLayer`;var Z=e(n(),1),vv=typeof window<`u`?Z.useLayoutEffect:Z.useEffect;function yv(e,t){for(;e;){if(e===t)return!0;e=Object.getPrototypeOf(e)}return!1}var bv={position:`absolute`,zIndex:-1};function xv(e,t){if(typeof e==`function`)return e(t);if(Array.isArray(e))return e.map(e=>xv(e,t));if(Sv(e)){if(Cv(e))return t.style=bv,(0,Z.cloneElement)(e,t);if(wv(e))return(0,Z.cloneElement)(e,t)}return e}function Sv(e){return Z.isValidElement(e)}function Cv(e){return e.props?.mapStyle}function wv(e){let t=e.type;return t&&t.deckGLViewProps}function Tv(e){if(typeof e==`function`)return(0,Z.createElement)(Ku,{},e);if(Array.isArray(e))return e.map(Tv);if(Sv(e)){if(e.type===Z.Fragment)return Tv(e.props.children);if(yv(e.type,Ku))return e}return e}function Ev({children:e,layers:t=[],views:n}){let r=[],i=[],a={};return Z.Children.forEach(Tv(e),e=>{if(Sv(e)){let t=e.type;if(yv(t,Km)){let n=Dv(t,e.props);i.push(n)}else r.push(e);if(yv(t,Ku)&&t!==Ku&&e.props.id){let n=new t(e.props);a[n.id]=n}}else e&&r.push(e)}),Object.keys(a).length>0&&(Array.isArray(n)?n.forEach(e=>{a[e.id]=e}):n&&(a[n.id]=n),n=Object.values(a)),t=i.length>0?[i,t]:t,{layers:t,children:r,views:n}}function Dv(e,t){let n={},r=e.defaultProps||{};for(let e in t)r[e]!==t[e]&&(n[e]=t[e]);return new e(n)}var Ov=(0,Z.createContext)();function kv({children:e,deck:t,ContextProvider:n=Ov.Provider}){let{viewManager:r}=t||{};if(!r||!r.views.length)return[];let i={},a=r.views[0].id;for(let t of e){let e=a,n=t;Sv(t)&&yv(t.type,Ku)&&(e=t.props.id||a,n=t.props.children);let o=r.getViewport(e),s=r.getViewState(e);if(o){s.padding=o.padding;let{x:t,y:r,width:a,height:c}=o;n=xv(n,{x:t,y:r,width:a,height:c,viewport:o,viewState:s}),i[e]||(i[e]={viewport:o,children:[]}),i[e].children.push(n)}}return Object.keys(i).map(e=>{let{viewport:r,children:a}=i[e],{x:o,y:s,width:c,height:l}=r,u={position:`absolute`,left:o,top:s,width:c,height:l},d=`view-${e}`,f=(0,Z.createElement)(`div`,{key:d,id:d,style:u},...a),p={deck:t,viewport:r,container:t.canvas.offsetParent,eventManager:t.eventManager,onViewStateChange:n=>{n.viewId=e,t._onViewStateChange(n)},widgets:[]},m=`view-${e}-context`;return(0,Z.createElement)(n,{key:m,value:p},f)})}var Av={mixBlendMode:null};function jv({width:e,height:t,style:n}){let r={position:`absolute`,zIndex:0,left:0,top:0,width:e,height:t},i={left:0,top:0};if(n)for(let e in n)e in Av?i[e]=n[e]:r[e]=n[e];return{containerStyle:r,canvasStyle:i}}function Mv(e){return{get deck(){return e.deck},pickObjectAsync:t=>e.deck.pickObjectAsync(t),pickObjectsAsync:t=>e.deck.pickObjectsAsync(t),pickObject:t=>e.deck.pickObject(t),pickMultipleObjects:t=>e.deck.pickMultipleObjects(t),pickObjects:t=>e.deck.pickObjects(t)}}function Nv(e){e.redrawReason&&=(e.deck._drawLayers(e.redrawReason),null)}function Pv(e,t){let n=e.deck;return!!(n&&t&&n.width===t.clientWidth&&n.height===t.clientHeight)}function Fv(e,t,n){let r=new t({...n,_customRender:t=>{e.redrawReason=t;let i=r.device?.type===`webgpu`,a=r.getViewports();e.lastRenderedViewports!==a&&((!i||Pv(e,n.parent||null))&&e.forceUpdate(),!i)||Nv(e)}});return r}function Iv(e,t){let[n,r]=(0,Z.useState)(0),i=(0,Z.useRef)({control:null,version:n,forceUpdate:()=>r(e=>e+1)}).current,a=(0,Z.useRef)(null),o=(0,Z.useRef)(null),s=(0,Z.useMemo)(()=>Ev(e),[e.layers,e.views,e.children]),c=!0,l=t=>c&&e.viewState?(i.viewStateUpdateRequested=t,null):(i.viewStateUpdateRequested=null,e.onViewStateChange?.(t)),u=t=>{c?i.interactionStateUpdateRequested=t:(i.interactionStateUpdateRequested=null,e.onInteractionStateChange?.(t))},d=(0,Z.useMemo)(()=>{let t={widgets:[],...e,style:null,width:`100%`,height:`100%`,parent:a.current,canvas:o.current,layers:s.layers,onViewStateChange:l,onInteractionStateChange:u};return s.views&&(t.views=s.views),delete t._customRender,i.deck&&(i.deck.setProps(t),i.deck.isInitialized&&(i.lastRenderedViewports=i.deck.getViewports())),t},[e]);(0,Z.useEffect)(()=>{let t=e.Deck||$d;return i.deck=Fv(i,t,{...d,parent:a.current,canvas:o.current}),()=>i.deck?.finalize()},[]),vv(()=>{Nv(i);let{viewStateUpdateRequested:e,interactionStateUpdateRequested:t}=i;e&&l(e),t&&u(t)}),(0,Z.useImperativeHandle)(t,()=>Mv(i),[]);let f=i.deck&&i.deck.isInitialized?i.deck.getViewports():void 0,{ContextProvider:p,width:m=`100%`,height:h=`100%`,id:g,style:_}=e,{containerStyle:v,canvasStyle:y}=(0,Z.useMemo)(()=>jv({width:m,height:h,style:_}),[m,h,_]);if(!i.viewStateUpdateRequested&&i.lastRenderedViewports===f||i.version!==n){i.lastRenderedViewports=f,i.version=n;let e=kv({children:s.children,deck:i.deck,ContextProvider:p}),t=(0,Z.createElement)(`canvas`,{key:`canvas`,id:g||`deckgl-overlay`,ref:o,style:y}),r=(0,Z.createElement)(`div`,{key:`deck-events-root`,className:`deck-events-root`,style:{width:m,height:h}},[t,e]),c=(0,Z.createElement)(`div`,{key:`deck-widgets-root`,className:`deck-widgets-root`});i.control=(0,Z.createElement)(`div`,{id:`${g||`deckgl`}-wrapper`,ref:a,style:v},[r,c])}return c=!1,i.control}var Lv=Z.forwardRef(Iv),Rv={institutions:[87,131,125,72],communications:[87,111,148,64],markets:[156,117,72,70],health:[109,142,116,64],work:[143,105,79,66],commons:[118,119,103,54]},zv={licensing_office:[201,121,76,235],public_commons:[103,143,132,225],firm_workplace:[181,151,91,230],workplace:[181,151,91,230],residence:[116,126,136,218],organization:[126,142,162,225]},Bv={site:[128,132,124,150],foundation:[171,109,72,220],frame:[220,145,69,225],shell:[219,177,92,230],completed:[103,155,126,225],cancelled:[175,89,76,190]};function Q(e,t=0){let n=Number(e);return Number.isFinite(n)?n:t}function Vv(e){let t=Number(e);if(!Number.isFinite(t))return null;let n=Math.abs(t)<=1?t*100:t;return Math.max(2,Math.min(98,n))}function Hv(e){let t=String(e??``),n=2166136261;for(let e=0;e<t.length;e+=1)n^=t.charCodeAt(e),n=Math.imul(n,16777619);return n>>>0}function Uv(e,t,n){let r=n/2;return[[e-r,t-r],[e+r,t-r],[e+r,t+r],[e-r,t+r]]}function Wv(e,t,n){if(e===`completed`||n>0&&t>=n)return`completed`;if(t<=0&&e!==`building`)return`site`;let r=Math.max(1,Math.ceil(n/3));return t>=Math.max(r,Math.ceil(n*2/3))?`shell`:t>=r?`frame`:`foundation`}function Gv(e,t,n,r,i){let a=n/2,o=[[e-a,t-a],[e+a,t-a],[e+a,t+a],[e-a,t+a]],s=o.map(([e,t],n)=>({...i,key:`${i.key}:post:${n}`,path:[[e,t,.2],[e,t,r]]})),c=o.map(([e,t],n)=>{let[a,s]=o[(n+1)%o.length];return{...i,key:`${i.key}:beam:${n}`,path:[[e,t,r],[a,s,r]]}});return[...s,...c]}function Kv(e={}){let t=String(e.status||`proposed`).toLowerCase(),n=Math.max(0,Q(e.contributedWorkUnits??e.contributed?.work_units)),r=Math.max(0,Q(e.requiredWorkUnits??e.requirements?.work_units)),i=Math.max(0,Q(e.contributedFundingCents??e.contributed?.funding_cents)),o=Math.max(0,Q(e.requiredFundingCents??e.requirements?.funding_cents)),s=Math.max(1,Q(e.aggregateCount??e.aggregate_count,1)),c=Wv(t,n,r),l=Q(e.x??e.site?.x),u=Q(e.y??e.site?.y),d=2.6+Math.min(2.4,Math.sqrt(s)*.45),f=r>0?Math.min(r,n):n,p={site:.12,foundation:.45+Math.min(.55,f*.08),frame:2.4+Math.min(2.4,f*.18),shell:4.8+Math.min(3.2,f*.2),completed:7+Math.min(5,f*.22)}[c],m=e.privacy===`aggregated_private`,h=m&&s>1?`${s} HOMES · `:``,g=c===`site`?a(t).toUpperCase():c.toUpperCase(),_=`${h}${t===`cancelled`?`CANCELLED · `:``}${g} · ${n}/${r} WORK`,v={...e,entityKind:`construction`,id:e.project_id??e.id,key:`construction:${e.project_id??e.id}`,stage:c,status:t,position:[l,u,p+.45],polygon:Uv(l,u,d),elevation:p,color:t===`cancelled`?Bv.cancelled:Bv[c],lineColor:c===`frame`?[255,219,147,245]:[72,52,42,225],label:_,operationalPlace:c===`completed`&&e.place_id!=null,privacyAggregate:m,tooltip:[e.name||`Construction project ${e.project_id??e.id}`,`${a(t)} · ${a(c)}`,`Work: ${n}/${r} units`,`Funding: ${i}/${o} cents`,`Milestones: ${Q(e.milestone_count)}`,m?`${s} private homes aggregated by district; owner and exact sites withheld.`:`Exact public or policy-authorized site.`].join(`
`)};return{...v,framePaths:c===`frame`?Gv(l,u,d,p,v):[]}}function qv(e,t){return!e?.owner_type||e?.owner_id==null?`Ownership not exposed`:e.owner_type===`firm`?t.find(t=>String(t.id)===String(e.owner_id))?.name||`Firm #${e.owner_id}`:`${a(e.owner_type)} #${e.owner_id}`}function Jv(e){return e.origin_region_id??e.source_region_id}function Yv(e){return e.destination_region_id??e.target_region_id}function Xv(e){if(e.kind===`trade`){let t=e.invoice_cents==null?``:` · ${Q(e.invoice_cents)} ${e.invoice_currency||`minor units`}`;return[`Trade shipment #${e.id}`,`${e.originLabel} → ${e.destinationLabel}`,`${Q(e.quantity??e.magnitude)} units${t}`,`Status: ${a(e.status)}`].join(`
`)}let t=e.agent_id==null?``:`Agent #${e.agent_id} · `;return[`Migration #${e.id}`,`${t}${e.originLabel} → ${e.destinationLabel}`,`Status: ${a(e.status)}`].join(`
`)}function Zv(e={},t=[],{showClusters:n=!1}={}){let r=Array.isArray(e.firms)?e.firms:[],i=(Array.isArray(e.regions)?e.regions:[]).map(e=>({...e,x:Vv(e.x),y:Vv(e.y)})).filter(e=>e.x!==null&&e.y!==null),o=new Map(i.map(e=>[String(e.id),e])),s=Object.values(c).map(e=>{let{x:t,y:n,width:r,height:i}=e.bounds;return{...e,entityKind:`district`,color:Rv[e.id]||Rv.commons,polygon:[[t,n],[t+r,n],[t+r,n+i],[t,n+i]],center:[t+r/2,n+i/2,.12],elevation:.18,tooltip:`${e.name}\n${e.note}\nDistrict geometry is a derived civic layout.`}}),l=new Set,u=(Array.isArray(e.places)?e.places:[]).map(e=>{l.add(String(e.id));let t=Math.max(0,Q(e.capacity)),n=Math.max(0,Q(e.businessOccupancy)),i=Math.max(0,Q(e.queueDepth)),o=Math.max(t,n,i),s=1.7+Math.min(2.8,Math.sqrt(o)/3.5),c=1.8+Math.min(16,Math.sqrt(o)*1.35),u=Array.isArray(e.occupants)?e.occupants:[],d=u.length?u.map(e=>e.name||`Agent #${e.agent_id}`).join(`, `):e.privacyOccupancy>0?`${e.privacyOccupancy} occupants (privacy aggregate)`:`No public occupant identities at this tick`,f=qv(e,r);return{...e,entityKind:`place`,key:`place:${e.id}`,position:[Q(e.x),Q(e.y),c],polygon:Uv(Q(e.x),Q(e.y),s),elevation:c,color:zv[e.kind]||zv.organization,ownerLabel:f,occupantCopy:d,evidenceBasis:o?`Height derives from exposed capacity, occupancy, and queue magnitude.`:`Minimum marker height; no scale evidence is exposed.`,tooltip:[e.name||`Place #${e.id}`,a(e.kind),`Owner: ${f}`,`Present: ${n}/${t||`unbounded`} · queue ${i}`,d].join(`
`)}});r.filter(e=>e.place_id==null||!l.has(String(e.place_id))).forEach(e=>{let t=Math.max(0,Q(e.employees)),n=2+Math.min(16,Math.sqrt(t)*1.5),r=1.9+Math.min(2.5,Math.sqrt(t)/3.5);u.push({...e,entityKind:`organization`,key:`organization:${e.id}`,position:[Q(e.x),Q(e.y),n],polygon:Uv(Q(e.x),Q(e.y),r),elevation:n,color:zv.organization,ownerLabel:e.name||`Firm #${e.id}`,occupantCopy:t?`${t} employees`:`Employee count not exposed`,evidenceBasis:t?`Height derives from the committed employee count.`:`Minimum marker height; employee count is not exposed.`,tooltip:[e.name||`Firm #${e.id}`,a(e.sector||e.status),t?`${t} employees`:`Employee count not exposed`].join(`
`)})});let d=(Array.isArray(e.constructionProjects)?e.constructionProjects:[]).map(Kv);return{districts:s,regions:i,buildings:u,constructions:d,constructionFrames:d.flatMap(e=>e.framePaths),agents:t.map(e=>({...e,entityKind:`agent`,position:[Q(e.x),Q(e.y),.8],tooltip:[e.name||`Agent #${e.id}`,a(e.role||e.occupation||e.kind),a(e.activityState),e.place_name||e.district].join(`
`)})),clusters:n?(Array.isArray(e.clusters)?e.clusters:[]).map(e=>({...e,entityKind:`cluster`,position:[Q(e.x),Q(e.y),.5],tooltip:`${e.count} ${e.label}\nAggregated peripheral residents; individual placement is withheld.`})):[],flows:(Array.isArray(e.flows)?e.flows:[]).flatMap(e=>{let t=o.get(String(Jv(e))),n=o.get(String(Yv(e)));if(!t||!n)return[];let r=n.x-t.x,i=n.y-t.y,a=Math.max(1,Math.hypot(r,i)),s=Hv(`${e.kind}:${e.id}`)%2?1:-1,c=Math.min(6,a*.14)*s,l=[(t.x+n.x)/2-i/a*c,(t.y+n.y)/2+r/a*c,1.2],u={...e,entityKind:`flow`,originLabel:t.name||`Region #${t.id}`,destinationLabel:n.name||`Region #${n.id}`,path:[[t.x,t.y,1.2],l,[n.x,n.y,1.2]],color:e.kind===`trade`?[226,172,82,205]:[100,181,171,205]};return[{...u,tooltip:Xv(u)}]})}}var $=i(),Qv=new ih({id:`civic-diorama`,orbitAxis:`Z`}),$v={target:[50,50,0],rotationX:57,rotationOrbit:-28,zoom:3.05,minZoom:1.8,maxZoom:5.4},ey=420;function ty(){let[e,t]=(0,Z.useState)(()=>typeof window<`u`&&!!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches);return(0,Z.useEffect)(()=>{let e=window.matchMedia?.(`(prefers-reduced-motion: reduce)`);if(!e)return;let n=()=>t(e.matches);return e.addEventListener?.(`change`,n),()=>e.removeEventListener?.(`change`,n)},[]),e}function ny(e){return e.runtimeActivity?e.activityState===`queued`?[236,174,87,245]:[87,211,190,250]:e.activityState===`rejected`?[226,101,86,240]:e.activityState===`settled`?[109,178,126,240]:{institutions:[103,168,157,230],communications:[112,148,196,230],markets:[211,161,87,230],health:[132,185,143,230],work:[198,133,95,230]}[e.layer]||[174,178,171,225]}function ry({model:e,visibleAgents:t,showClusters:n,selectedAgentId:r,selectedPlaceId:i,selectedProjectId:c,selectedFirmId:u,camera:d,onCameraChange:f,onOpenEvidence:p,onSelectAgent:m,onSelectPlace:h,onSelectProject:g,onSelectFirm:_,onShowAllResidents:v,animateLiveActivity:y,tick:b,historical:x}){let[S,C]=(0,Z.useState)($v);(0,Z.useEffect)(()=>{let e=d||l;C({...$v,target:[e.x,e.y,0],zoom:e.zoom})},[d?.x,d?.y,d?.zoom]);let[w,T]=(0,Z.useState)(0),[E,D]=(0,Z.useState)(null),[O,k]=(0,Z.useState)(null),A=(0,Z.useRef)(typeof performance>`u`?0:performance.now()),j=(0,Z.useRef)(!1),M=ty(),N=Number.isFinite(Number(e.selectedTick))?Number(e.selectedTick):null,[ee,te]=(0,Z.useState)(null),[ne,re]=(0,Z.useState)(0);N!==ee&&(te(N),re(ee!==null&&N!==null&&N===ee+1?ey:0));let ie=x||M?0:ne,P=(0,Z.useMemo)(()=>Zv(e,t,{showClusters:n}),[e,n,t]);(0,Z.useEffect)(()=>{if(!ne)return;let e=window.setTimeout(()=>re(0),ne+40);return()=>window.clearTimeout(e)},[ne,ee]),(0,Z.useEffect)(()=>{if(!y||M){T(0);return}let e=0,t=n=>{T((Math.sin(n/360)+1)/2),e=window.requestAnimationFrame(t)};return e=window.requestAnimationFrame(t),()=>window.cancelAnimationFrame(e)},[y,M]),(0,Z.useEffect)(()=>{if(x||M){k(null);return}let e=[],t=null,n=0,r=i=>{if(t!==null&&e.push(i-t),t=i,e.length>=60){let t=e.slice().sort((e,t)=>e-t);k(t[Math.floor((t.length-1)*.95)]);return}n=window.requestAnimationFrame(r)};return n=window.requestAnimationFrame(r),()=>window.cancelAnimationFrame(n)},[x,M]);let ae=(0,Z.useMemo)(()=>{let t=P.constructions.find(e=>String(e.id)===String(c)),n=P.agents.find(e=>String(e.id)===String(r)),o=P.buildings.find(e=>e.entityKind===`place`&&String(e.id)===String(i)),s=e.firms.find(e=>String(e.id)===String(u)),l=s&&(P.buildings.find(e=>e.entityKind===`organization`&&String(e.id)===String(s.id))||P.buildings.find(e=>e.entityKind===`place`&&String(e.id)===String(s.place_id))),d=t||o||l&&{...l,name:s.name}||n;return d?[{text:d.entityKind===`construction`?`${d.name}\n${d.label}`:d.name||`${a(d.entityKind)} #${d.id}`,position:d.position}]:[]},[P,e.firms,r,i,c,u]),oe=e=>e.entityKind===`place`&&String(e.id)===String(i)||e.entityKind===`organization`&&String(e.id)===String(u)||u!=null&&e.entityKind===`place`&&e.owner_type===`firm`&&String(e.owner_id)===String(u),se=(0,Z.useMemo)(()=>[new g_({id:`civic-district-plates`,data:P.districts,getPolygon:e=>e.polygon,getFillColor:e=>e.color,getLineColor:[183,190,178,92],getElevation:e=>e.elevation,extruded:!0,filled:!0,stroked:!0,lineWidthUnits:`pixels`,getLineWidth:1,pickable:!0}),new jg({id:`civic-world-flows`,data:P.flows,getPath:e=>e.path,getColor:e=>e.color,getWidth:e=>e.kind===`trade`?3:2,widthUnits:`pixels`,capRounded:!0,jointRounded:!0,pickable:!0}),new g_({id:`civic-construction-sites`,data:P.constructions.filter(e=>!e.operationalPlace),getPolygon:e=>e.polygon,getFillColor:e=>e.color,getLineColor:e=>String(e.id)===String(c)?[255,244,191,255]:e.lineColor,getElevation:e=>e.elevation,extruded:!0,filled:!0,stroked:!0,wireframe:!1,lineWidthUnits:`pixels`,getLineWidth:e=>String(e.id)===String(c)?3:1.5,material:{ambient:.62,diffuse:.58,shininess:8,specularColor:[52,44,38]},updateTriggers:{getLineColor:[c],getLineWidth:[c]},pickable:!0}),new jg({id:`civic-construction-frames`,data:P.constructionFrames,getPath:e=>e.path,getColor:e=>String(e.id)===String(c)?[255,244,191,255]:e.lineColor,getWidth:e=>String(e.id)===String(c)?4:2.5,widthUnits:`pixels`,capRounded:!1,jointRounded:!1,updateTriggers:{getColor:[c],getWidth:[c]},pickable:!0}),new g_({id:`civic-buildings`,data:P.buildings,getPolygon:e=>e.polygon,getFillColor:e=>e.color,getLineColor:e=>oe(e)?[255,244,191,255]:[31,37,39,205],getElevation:e=>e.elevation,extruded:!0,wireframe:!1,filled:!0,stroked:!0,lineWidthUnits:`pixels`,getLineWidth:e=>oe(e)?3:1,material:{ambient:.55,diffuse:.65,shininess:22,specularColor:[64,69,67]},transitions:ie?{getPolygon:ie}:void 0,updateTriggers:{getLineColor:[i,u],getLineWidth:[i,u]},pickable:!0}),new Bh({id:`civic-population-clusters`,data:P.clusters,getPosition:e=>e.position,radiusUnits:`pixels`,getRadius:e=>12+Math.min(24,Math.sqrt(e.count)*1.4),getFillColor:[104,118,124,155],getLineColor:[204,211,201,220],lineWidthUnits:`pixels`,getLineWidth:2,filled:!0,stroked:!0,pickable:!0}),new Bh({id:`civic-agent-halos`,data:P.agents.filter(e=>e.runtimeActivity),getPosition:e=>e.position,radiusUnits:`pixels`,getRadius:13+w*9,getFillColor:[78,207,187,Math.round(35+w*65)],getLineColor:[78,207,187,Math.round(130+w*100)],lineWidthUnits:`pixels`,getLineWidth:1.5,filled:!0,stroked:!0,pickable:!1}),new Bh({id:`civic-agents`,data:P.agents,getPosition:e=>e.position,radiusUnits:`pixels`,getRadius:e=>String(e.id)===String(r)?8.5:5.5,getFillColor:ny,getLineColor:e=>String(e.id)===String(r)?[255,247,210,255]:[25,31,31,235],lineWidthUnits:`pixels`,getLineWidth:e=>String(e.id)===String(r)?3:1,transitions:ie?{getPosition:ie}:void 0,updateTriggers:{getRadius:[r],getLineColor:[r],getLineWidth:[r]},filled:!0,stroked:!0,pickable:!0}),new _v({id:`civic-district-labels`,data:P.districts,getPosition:e=>e.center,getText:e=>e.name.toUpperCase(),getColor:[215,216,202,150],getSize:11,sizeUnits:`pixels`,getTextAnchor:`middle`,getAlignmentBaseline:`center`,billboard:!0,pickable:!1}),new _v({id:`civic-selection-label`,data:ae,getPosition:e=>e.position,getText:e=>e.text,getColor:[255,247,210,255],getBackgroundColor:[20,25,26,225],background:!0,backgroundPadding:[5,3],getSize:12,sizeUnits:`pixels`,getPixelOffset:[0,-18],getTextAnchor:`middle`,getAlignmentBaseline:`bottom`,billboard:!0,pickable:!1})],[w,P,r,ae,i,c,u,ie]),ce=(0,Z.useCallback)((e,t)=>{let n=o(e),r={x:S.target[0],y:S.target[1],zoom:S.zoom};s(n)!==s(r)&&(C({...$v,target:[n.x,n.y,0],zoom:n.zoom}),f?.(n,t))},[S,f]),F=(0,Z.useCallback)(({viewState:e,interactionState:t})=>{let n=!!t?.isZooming||e.target[0]===S.target[0]&&e.target[1]===S.target[1];ce({x:e.target[0],y:e.target[1],zoom:e.zoom},{replace:!0,keepFollow:n})},[ce,S]);return(0,$.jsxs)(`div`,{className:`civic-diorama`,"data-testid":`civic-diorama`,"data-camera":`${S.target[0]},${S.target[1]},${S.zoom}`,children:[(0,$.jsx)(Lv,{views:Qv,viewState:S,controller:{dragMode:`pan`,doubleClickZoom:!1},layers:se,onViewStateChange:F,onClick:e=>{let t=e?.object;t&&(t.entityKind===`agent`&&m(t.id),t.entityKind===`place`&&h(t.id),t.entityKind===`construction`&&g?.(t.id),t.entityKind===`organization`&&_?.(t.id),t.entityKind===`cluster`&&v())},getTooltip:({object:e})=>e?.tooltip?{text:e.tooltip}:null,onAfterRender:()=>{j.current||typeof performance>`u`||(j.current=!0,D(Math.max(0,performance.now()-A.current)))},useDevicePixels:typeof window>`u`?1:Math.min(1.5,window.devicePixelRatio||1)}),(0,$.jsx)(`div`,{className:`civic-diorama__wash`,"aria-hidden":`true`}),(0,$.jsx)(`div`,{className:`civic-diorama__controls`,children:(0,$.jsx)(`button`,{type:`button`,className:`civic-diorama__open-evidence`,disabled:!ae.length,onClick:p,children:`Open selected evidence ↓`})}),(0,$.jsxs)(`div`,{className:`civic-diorama__footer`,children:[(0,$.jsxs)(`div`,{className:`civic-diorama__status`,"aria-live":`polite`,children:[(0,$.jsx)(`span`,{children:x?`Historical tick ${b} · motion off`:M?`Reduced motion`:y?`Live telemetry pulse`:ie?`Consecutive tick transition`:`Committed scene`}),(0,$.jsxs)(`span`,{children:[P.buildings.length,` buildings · `,P.constructions.length,` projects · `,P.agents.length,` agents · `,P.flows.length,` flows`]}),E!=null&&(0,$.jsxs)(`span`,{children:[`First frame `,Math.round(E),`ms`]}),O!=null&&(0,$.jsxs)(`span`,{children:[`Frame p95 `,Math.round(O),`ms`]})]}),(0,$.jsxs)(`details`,{className:`civic-diorama__method`,children:[(0,$.jsx)(`summary`,{children:`How this scene is drawn`}),(0,$.jsx)(`p`,{children:`Height is a derived visual encoding of exposed capacity, occupancy, queue, or employee counts. Construction geometry uses stored work units and exact foundation, frame, shell, and completed stages. Flow curves connect committed public region endpoints; they do not imply a traveled street. Position interpolation is limited to consecutive live projections.`})]})]})]})}export{ry as CivicDiorama};