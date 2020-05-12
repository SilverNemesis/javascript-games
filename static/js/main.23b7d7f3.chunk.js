(this["webpackJsonpjavascript-games"]=this["webpackJsonpjavascript-games"]||[]).push([[0],{11:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(5),o=n.n(r),c=(n(11),n(1)),s=function(e){var t=e.message,n=e.onClick;return t?i.a.createElement("div",{id:"message",onClick:n},t.map((function(e,t){return i.a.createElement("div",{key:t},e)}))):null},l=function(e){var t=e.control;return i.a.createElement("div",{className:"control"},t.description)},u=function(e){for(var t=e.control,n=[],a=0;a<t.options.length;a++)n.push(i.a.createElement("option",{key:a,value:a},t.options[a]));return i.a.createElement("div",{className:"control"},i.a.createElement("label",{htmlFor:t.name},t.name),i.a.createElement("select",{id:t.name,className:"select-css",value:t.value,onChange:function(n){e.onChange(t,n.target.value)}},n))},h=function(e){var t=e.control;return i.a.createElement("div",{className:"control"},i.a.createElement("label",{className:"clickable",htmlFor:t.name},i.a.createElement("input",{className:"clickable",id:t.name,type:"checkbox",checked:t.value,onChange:function(n){e.onChange(t,n.target.checked)}}),t.name))},d=function(e){var t=e.control;return i.a.createElement("div",{className:"control"},i.a.createElement("label",{htmlFor:t.name},t.name," ",t.value),i.a.createElement("input",{id:t.name,className:"clickable",type:"range",min:t.min,max:t.max,value:t.value,onChange:function(n){e.onChange(t,n.target.value)}}))},f=function(e){var t=e.control;return i.a.createElement("div",{className:"control"},i.a.createElement("label",{htmlFor:t.name},t.name," ",t.value.toFixed(3)),i.a.createElement("input",{id:t.name,className:"clickable",type:"range",min:Math.floor(1e3*t.min),max:Math.floor(1e3*t.max),value:Math.floor(1e3*t.value),onChange:function(n){e.onChange(t,n.target.value/1e3)}}))},m=function(e){var t=e.control;return i.a.createElement("div",{className:"control"},i.a.createElement("button",{onClick:function(e){t.function()}},t.name))},v=function(e){var t,n=e.show,a=e.onClickPrevious,r=e.onClickNext,o=e.onChange,c=e.title,s=e.options;return n?(s&&(t=s.map((function(e,t){switch(e.type){case"description":return i.a.createElement(l,{key:t,control:e});case"select":return i.a.createElement(u,{key:t,control:e,onChange:o});case"bool":return i.a.createElement(h,{key:t,control:e,onChange:o});case"int":return i.a.createElement(d,{key:t,control:e,onChange:o});case"float":return i.a.createElement(f,{key:t,control:e,onChange:o});case"function":return i.a.createElement(m,{key:t,control:e});default:return i.a.createElement("div",{key:t,className:"control"},e.type," is not supported")}}))),i.a.createElement("div",{id:"menu-container"},i.a.createElement("div",{id:"menu"},i.a.createElement("div",{className:"none center"},i.a.createElement("span",{className:"left",onClick:a},"\u276e PREV"),c,i.a.createElement("span",{className:"right",onClick:r},"NEXT \u276f")),i.a.createElement("div",null,t)))):null},p=n(2),y=n(3);function g(e,t){switch(e.type){case 1:switch(t.type){case 1:return function(e,t){if(e.x2<=t.x1||e.x1>=t.x2||e.y2<=t.y1||e.y1>=t.y2)return!1;return!0}(e,t);case 2:return w(t,e);default:throw new Error("cannot collide "+e.type+" "+t.type)}case 2:switch(t.type){case 1:return w(e,t);case 2:return function(e,t){var n=e.cx-t.cx,a=e.cy-t.cy,i=n*n+a*a,r=e.radius+t.radius;if(i<r*r)return!0;return!1}(e,t);default:throw new Error("cannot collide "+e.type+" "+t.type)}default:throw new Error("cannot collide "+e.type+" "+t.type)}}function w(e,t){var n=0,a=e.cx,i=e.cy;e.cx<t.x1?(n|=1,a=t.x1):e.cx>t.x2&&(n|=1,a=t.x2),e.cy<t.y1?(n|=2,i=t.y1):e.cy>t.y2&&(n|=2,i=t.y2);var r=e.cx-a,o=e.cy-i;return r*r+o*o<=e.radius*e.radius?n:0}var x={},E={},k=320,C=180;function b(e,t){x.width=e,x.height=t,x.scale=Math.min(e/k,t/C),x.offsetX=(e-k*x.scale)/2,x.offsetY=(t-C*x.scale)/2}function S(){var e=E;b(e.width,e.height)}function O(){var e=x,t=e.player,n=e.obstacles,a=e.score,i=e.keyState;if(!x.gameOver){if(x.frameCount++,x.frameCount%150===1){var r=F(20,100),o=F(50,100),c=Math.floor(x.width/x.scale);n.push(new X(c,0,10,r,"green")),n.push(new X(c,r+o,10,C-r-o,"green"))}t.update(i);for(var s=0;s<n.length;s++)n[s].update();x.obstacles=n.filter((function(e){return e.onScreen})),a.text="SCORE: "+x.frameCount;for(var l=t.getCollisionBounds(),u=0;u<n.length;u+=1)g(l,n[u].getCollisionBounds())&&(x.gameOver=!0);x.gameOver&&(E.showMessage(["GAME OVER"]),E.setOptions([{type:"function",name:"RESTART",function:R}]))}}function N(){var e=E.ctx,t=x,n=t.width,a=t.height,i=t.player,r=t.obstacles,o=t.score;e.clearRect(0,0,n,a),e.fillStyle="#111",e.fillRect(x.offsetX,x.offsetY,k*x.scale,C*x.scale),e.save(),e.rect(x.offsetX,x.offsetY,k*x.scale,C*x.scale),e.clip(),i.render(e);for(var c=0;c<r.length;c+=1)r[c].render(e);o.render(e),e.restore()}function R(){x.gameOver=!1,x.frameCount=0,x.obstacles=[],x.player.x=15,x.player.y=75,E.setOptions()}function T(e){x.keyState[e.code]=!0}function D(e){x.keyState[e.code]=!1}function F(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var M=function(){function e(t,n,a,i,r,o){Object(p.a)(this,e),this.x=t,this.y=n,this.color=a,this.fontName=i,this.fontSize=r,this.text=o}return Object(y.a)(e,[{key:"render",value:function(e){e.font=(this.fontSize*x.scale).toFixed(0)+"px "+this.fontName,e.fillStyle=this.color,e.textAlign="right",e.textBaseline="top";var t=this.x,n=this.y;t=t*x.scale+x.offsetX,n=n*x.scale+x.offsetY,e.fillText(this.text,t,n)}}]),e}(),A=function(){function e(t,n,a,i){Object(p.a)(this,e),this.x=t,this.y=n,this.radius=a,this.color=i,this.speedX=0,this.speedY=0}return Object(y.a)(e,[{key:"update",value:function(e){this.speedX=0,this.speedY=0,(e.KeyW||e.ArrowUp)&&(this.speedY-=1),(e.KeyS||e.ArrowDown)&&(this.speedY+=1),(e.KeyA||e.ArrowLeft)&&(this.speedX-=1),(e.KeyD||e.ArrowRight)&&(this.speedX+=1),this.x+=this.speedX,this.y+=this.speedY,this.x<this.radius?this.x=this.radius:this.x+this.radius>k&&(this.x=k-this.radius),this.y<this.radius?this.y=this.radius:this.y+this.radius>C&&(this.y=C-this.radius)}},{key:"render",value:function(e){e.fillStyle=this.color;var t=this.x,n=this.y,a=this.radius;t=t*x.scale+x.offsetX,n=n*x.scale+x.offsetY,a*=x.scale,e.beginPath(),e.arc(t,n,a,0,2*Math.PI,!0),e.fill()}},{key:"getCollisionBounds",value:function(){return e=this.x,t=this.y,n=this.radius,{type:2,cx:e,cy:t,radius:n};var e,t,n}}]),e}(),X=function(){function e(t,n,a,i,r){Object(p.a)(this,e),this.x=t,this.y=n,this.width=a,this.height=i,this.color=r,this.onScreen=!0}return Object(y.a)(e,[{key:"update",value:function(){this.x--,this.x+this.width<=0&&(this.onScreen=!1)}},{key:"render",value:function(e){e.fillStyle=this.color;var t=this.x,n=this.y,a=this.width,i=this.height;t=t*x.scale+x.offsetX,n=n*x.scale+x.offsetY,a*=x.scale,i*=x.scale,e.fillRect(t,n,a,i)}},{key:"getCollisionBounds",value:function(){return e=this.x,t=this.y,n=this.x+this.width,a=this.y+this.height,{type:1,x1:e,y1:t,x2:n,y2:a};var e,t,n,a}}]),e}(),j={},z={};function K(){var e=z,t=e.ctx,n=e.width,a=e.height;j.width=n,j.height=a,j.image=t.createImageData(n,a)}function Y(){var e=j,t=e.size,n=e.width,a=e.height,i=e.keyState;i.ArrowDown&&j.size>1&&j.size--,i.ArrowUp&&j.size<100&&j.size++;for(var r=j.image.data,o=0;o<a;o+=t)for(var c=0;c<n;c+=t)for(var s=Math.floor(256*Math.random()),l=o;l<Math.min(o+t,a);l++)for(var u=c;u<Math.min(c+t,n);u++){var h=4*(l*n+u);r[h]=s,r[h+1]=s,r[h+2]=s,r[h+3]=255}}function B(){z.ctx.putImageData(j.image,0,0)}function P(e){j.keyState[e.code]=!0}function U(e){j.keyState[e.code]=!1}var I=[function(e){var t=E=e,n=t.width,a=t.height;return x={gameOver:!1,frameCount:0,obstacles:[],player:new A(15,75,15,"red"),score:new M(k,0,"white","Consolas",8,"SCORE: 0"),keyState:{}},b(n,a),{name:"dodge",resize:S,update:O,render:N,handleKeyDown:T,handleKeyUp:D}},function(e){var t=z=e,n=t.ctx,a=t.width,i=t.height;return j={size:1,width:a,height:i,image:n.createImageData(a,i),keyState:{}},{name:"noise",resize:K,update:Y,render:B,handleKeyDown:P,handleKeyUp:U}}],L=0,W={},q={totalFrameTime:0,frameCount:0,paused:!0},J={ctx:null,deltaTime:0,width:0,height:0};var V=function(){var e=i.a.useRef(null),t=i.a.useRef(null),n=i.a.useRef(0),a=i.a.useState(0),r=Object(c.a)(a,2)[1],o=i.a.useState(),l=Object(c.a)(o,2),u=l[0],h=l[1],d=i.a.useState(),f=Object(c.a)(d,2),m=f[0],p=f[1],y=i.a.useState(),g=Object(c.a)(y,2),w=g[0],x=g[1];function E(){L=(L+I.length-1)%I.length,W=I[L](J),p(W.name),q.totalFrameTime=0,q.frameCount=0}function k(){L=(L+1)%I.length,W=I[L](J),p(W.name),q.totalFrameTime=0,q.frameCount=0}var C=function(){h(),q.messageTimer=void 0},b=i.a.useCallback((function(){clearTimeout(q.messageTimer),C()}),[]);J.showMessage=function(e){h(e),q.messageTimer=setTimeout(C,1e4)},J.setOptions=x;var S=i.a.useCallback((function(){r((function(e){return e+1}))}),[]),O=i.a.useCallback((function(e){"PageDown"===e.code?(e.preventDefault(),k()):"PageUp"===e.code?(e.preventDefault(),E()):"Escape"===e.code?(e.preventDefault(),q.paused=!q.paused,b(),S()):W.handleKeyDown&&W.handleKeyDown(e)}),[S,b]),N=function(e){W.handleKeyUp&&W.handleKeyUp(e)};return i.a.useEffect((function(){var a=e.current,i=a.getBoundingClientRect();J.ctx=a.getContext("2d"),J.width=i.width*window.devicePixelRatio,J.height=i.height*window.devicePixelRatio,W=I[L](J),p(W.name);return window.addEventListener("keydown",O),window.addEventListener("keyup",N),t.current=requestAnimationFrame((function e(i){if(void 0!==n.current){J.deltaTime=i-n.current;var r=a.getBoundingClientRect();a.width=r.width*window.devicePixelRatio,a.height=r.height*window.devicePixelRatio,a.width===J.width&&a.height===J.height||(q.totalFrameTime=0,q.frameCount=0,J.width=a.width,J.height=a.height,W.resize&&W.resize());var o=performance.now();W.update&&!q.paused&&W.update(),W.render&&W.render();var c=performance.now();q.totalFrameTime+=c-o,q.frameCount++,function(){var e=q.totalFrameTime,t=q.frameCount,n=J.ctx,a=J.width,i=W.name+" ("+(e/t).toFixed(2)+" ms)";n.fillStyle="white",n.font="20px monospace",n.textAlign="center",n.textBaseline="top",n.shadowOffsetX=1,n.shadowOffsetY=1,n.shadowColor="rgba(0.2,0.2,0.2,1.0)",n.shadowBlur=4,n.fillText(i,a/2,0)}()}n.current=i,t.current=requestAnimationFrame(e)})),function(){window.removeEventListener("keydown",O),window.removeEventListener("keyup",N),cancelAnimationFrame(t.current)}}),[e,O]),i.a.createElement("div",{className:"screen"},i.a.createElement("canvas",{id:"canvas",ref:e}),i.a.createElement(s,{message:u,onClick:function(e){e.preventDefault(),q.messageTimer&&b()}}),i.a.createElement(v,{show:q.paused,onClickPrevious:function(e){e.preventDefault(),k()},onClickNext:function(e){e.preventDefault(),E()},onChange:function(e,t){t!==e.value&&(W.setOption(e,t),S())},title:m,options:w}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(V,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t,n){e.exports=n(12)}},[[6,1,2]]]);
//# sourceMappingURL=main.23b7d7f3.chunk.js.map