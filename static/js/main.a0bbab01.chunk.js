(this["webpackJsonpjavascript-games"]=this["webpackJsonpjavascript-games"]||[]).push([[0],[,,,,,,function(e,t,i){e.exports=i.p+"static/media/thrust.1a67a2d9.wav"},function(e,t,i){e.exports=i.p+"static/media/fire.c4dc2846.wav"},function(e,t,i){e.exports=i.p+"static/media/beat1.a014226b.wav"},function(e,t,i){e.exports=i.p+"static/media/beat2.a02b010d.wav"},function(e,t,i){e.exports=i(16)},,,,,function(e,t,i){},function(e,t,i){"use strict";i.r(t);var a,n=i(0),s=i.n(n),r=i(5),o=i.n(r),h=(i(15),i(3)),c=function(e){var t=e.message,i=e.onClick;return t?s.a.createElement("div",{id:"message",onClick:i},t.map((function(e,t){return s.a.createElement("div",{key:t},e)}))):null},l=function(e){var t=e.control;return s.a.createElement("div",{className:"control"},t.description)},u=function(e){for(var t=e.control,i=[],a=0;a<t.options.length;a++)i.push(s.a.createElement("option",{key:a,value:a},t.options[a]));return s.a.createElement("div",{className:"control"},s.a.createElement("label",{htmlFor:t.name},t.name),s.a.createElement("select",{id:t.name,className:"select-css",value:t.value,onChange:function(i){e.onChange(t,i.target.value)}},i))},d=function(e){var t=e.control;return s.a.createElement("div",{className:"control"},s.a.createElement("label",{className:"clickable",htmlFor:t.name},s.a.createElement("input",{className:"clickable",id:t.name,type:"checkbox",checked:t.value,onChange:function(i){e.onChange(t,i.target.checked)}}),t.name))},f=function(e){var t=e.control;return s.a.createElement("div",{className:"control"},s.a.createElement("label",{htmlFor:t.name},t.name," ",t.value),s.a.createElement("input",{id:t.name,className:"clickable",type:"range",min:t.min,max:t.max,value:t.value,onChange:function(i){e.onChange(t,i.target.value)}}))},y=function(e){var t=e.control;return s.a.createElement("div",{className:"control"},s.a.createElement("label",{htmlFor:t.name},t.name," ",t.value.toFixed(3)),s.a.createElement("input",{id:t.name,className:"clickable",type:"range",min:Math.floor(1e3*t.min),max:Math.floor(1e3*t.max),value:Math.floor(1e3*t.value),onChange:function(i){e.onChange(t,i.target.value/1e3)}}))},m=function(e){var t=e.control;return s.a.createElement("div",{className:"control"},s.a.createElement("button",{onClick:function(e){t.function()}},t.name))},v=function(e){var t,i=e.show,a=e.onClickPrevious,n=e.onClickNext,r=e.onChange,o=e.title,h=e.options;return i?(h&&(t=h.map((function(e,t){switch(e.type){case"description":return s.a.createElement(l,{key:t,control:e});case"select":return s.a.createElement(u,{key:t,control:e,onChange:r});case"bool":return s.a.createElement(d,{key:t,control:e,onChange:r});case"int":return s.a.createElement(f,{key:t,control:e,onChange:r});case"float":return s.a.createElement(y,{key:t,control:e,onChange:r});case"function":return s.a.createElement(m,{key:t,control:e});default:return s.a.createElement("div",{key:t,className:"control"},e.type," is not supported")}}))),s.a.createElement("div",{id:"menu-container"},s.a.createElement("div",{id:"menu"},s.a.createElement("div",{className:"none center"},s.a.createElement("span",{className:"left",onClick:a},"\u276e PREV"),o,s.a.createElement("span",{className:"right",onClick:n},"NEXT \u276f")),s.a.createElement("div",null,t)))):null},p=i(1),g=i(2),x=i(6),w=i.n(x),k=i(7),b=i.n(k),E=i(8),C=i.n(E),S=i(9),P=i.n(S),T={},M={width:1440,height:1080},O={thrust:U(w.a,10),fire:U(b.a,10),beat1:U(C.a,1),beat2:U(P.a,1)};function D(e,t){a.width=e,a.height=t,M.scale=Math.min(e/M.width,t/M.height),M.x=(e-M.width*M.scale)/2,M.y=(t-M.height*M.scale)/2}var N="KeyA",R="KeyD",j="KeyW",K="Space";function A(){var e=T;D(e.width,e.height)}function F(){a.isPaused=!1,a.player.update(),a.bullets=a.bullets.filter((function(e){return e.frameCount<75}));for(var e=0;e<a.bullets.length;e++)a.bullets[e].update();for(var t=0;t<a.asteroids.length;t++)a.asteroids[t].update()}function z(){var e=T,t=e.ctx,i=e.width,n=e.height;t.clearRect(0,0,i,n),t.fillStyle="#111",t.fillRect(M.x,M.y,M.width*M.scale,M.height*M.scale),t.save(),t.rect(M.x,M.y,M.width*M.scale,M.height*M.scale),t.clip(),a.player.render();for(var s=0;s<a.bullets.length;s++)a.bullets[s].render();for(var r=0;r<a.asteroids.length;r++)a.asteroids[r].render();t.restore()}function I(e,t,i,a,n,s){var r=[0];t<a&&r.push(M.width),t>M.width-a&&r.push(-M.width);var o=[0];i<a&&o.push(M.height),i>M.height-a&&o.push(-M.height);for(var h=0;h<o.length;h++)for(var c=0;c<r.length;c++)n(e,t+r[c],i+o[h],s)}function X(e){a.keyState[e.code]=!0}function Y(e){a.keyState[e.code]=!1}function B(e){a.ambientSound.isPaused=e}function L(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function U(e,t){for(var i=[],a=0;a<t;a++)i.push(new Audio(e));return{index:0,samples:i}}function W(e){e.samples[e.index].play(),e.index=(e.index+1)%e.samples.length}function _(e,t){e.timeout||(e.delay=t,e.continueSoundLoop=q.bind(e),e.continueSoundLoop())}function q(){W(this),this.timeout=setTimeout(this.continueSoundLoop,this.delay)}var J=function(){function e(t,i,a){Object(p.a)(this,e),this.sounds=t,this.maxDelay=i,this.updateDelay=a,this.isPlaying=!1,this.isPaused=!1,this.start=this.start.bind(this),this.stop=this.stop.bind(this),this.playNextSound=this.playNextSound.bind(this)}return Object(g.a)(e,[{key:"start",value:function(){this.isPlaying||this.stop(),this.isPlaying=!0,this.isPaused=a.isPaused,this.count=0,this.index=0,this.delay=this.maxDelay,this.playNextSound()}},{key:"stop",value:function(){this.isPlaying&&clearTimeout(this.timeout),this.isPlaying=!1}},{key:"playNextSound",value:function(){if(this.isPlaying){var e=this.delay,t=this.index;this.isPaused||(this.count++,this.delay=this.updateDelay(this.count,this.delay),this.delay!==e&&(this.count=0),this.index=(this.index+1)%this.sounds.length,W(this.sounds[t])),this.timeout=setTimeout(this.playNextSound,e)}}}]),e}(),V=function(){function e(){Object(p.a)(this,e),this.x=M.width/2,this.y=M.height/2,this.dx=0,this.dy=0,this.rotation=0,this.fireDelay=0,this.thrusting=!1}return Object(g.a)(e,[{key:"update",value:function(){this.fireDelay-=T.deltaTime,this.fireDelay<0&&(this.fireDelay=0);var e=T.deltaTime/16;a.keyState[N]?this.rotation-=5*e:a.keyState[R]&&(this.rotation+=5*e);var t=Math.cos((this.rotation-90)*(Math.PI/180)),i=Math.sin((this.rotation-90)*(Math.PI/180));a.keyState[K]&&0===this.fireDelay&&(W(O.fire),a.bullets.push(new $(this.x+7*t,this.y+7*i,12*t,12*i)),this.fireDelay=150);var n,s=.2*e*t,r=.2*e*i;a.keyState[j]?(this.thrusting=!0,_(O.thrust,275),this.dx+=s,this.dy+=r):((n=O.thrust).timeout&&(clearInterval(n.timeout),n.timeout=void 0),this.thrusting=!1,this.dx<=-.01?this.dx+=.01:this.dx>=.01&&(this.dx-=.01),this.dy<=-.01?this.dy+=.01:this.dy>=.01&&(this.dy-=.01)),this.dx>6?this.dx=6:this.dx<-6&&(this.dx=-6),this.dy>6?this.dy=6:this.dy<-6&&(this.dy=-6);var o=M.width,h=M.height;this.x+=this.dx,this.y+=this.dy,this.x>o?this.x-=o:this.x<0&&(this.x+=o),this.y>h?this.y-=h:this.y<0&&(this.y+=h)}},{key:"render",value:function(){I(T.ctx,this.x,this.y,20,this._render,{rotation:this.rotation,thrusting:this.thrusting})}},{key:"_render",value:function(e,t,i,a){var n=a.rotation,s=a.thrusting;e.save(),e.translate(M.x+t*M.scale,M.y+i*M.scale),e.rotate(Math.PI/180*n),e.scale(M.scale,M.scale),e.strokeStyle="white",e.lineWidth=1,e.beginPath(),e.moveTo(0,7),e.lineTo(10,15),e.lineTo(0,-15),e.lineTo(-10,15),e.lineTo(0,7),e.closePath(),e.stroke(),s&&(e.moveTo(0,17),e.lineTo(5,20),e.lineTo(-5,20),e.closePath(),e.stroke()),e.restore()}}]),e}(),G=function(){function e(t,i,a,n){Object(p.a)(this,e),this.x=t,this.y=i,this.dx=Math.cos((a-90)*(Math.PI/180)),this.dy=Math.sin((a-90)*(Math.PI/180)),this.size=n,this.points=[];for(var s=0;s<10;s++){var r=L(0,n/6)-n/3;this.points.push((o=36*s,h=n/2+r,{x:Math.cos((o-90)*(Math.PI/180))*h,y:Math.sin((o-90)*(Math.PI/180))*h}))}var o,h}return Object(g.a)(e,[{key:"update",value:function(){var e=T.deltaTime/16,t=M.width,i=M.height;this.x+=e*this.dx,this.y+=e*this.dy,this.x>t?this.x-=t:this.x<0&&(this.x+=t),this.y>i?this.y-=i:this.y<0&&(this.y+=i)}},{key:"render",value:function(){I(T.ctx,this.x,this.y,this.size,this._render,{points:this.points})}},{key:"_render",value:function(e,t,i,a){e.save(),e.translate(M.x+t*M.scale,M.y+i*M.scale),e.scale(M.scale,M.scale),e.strokeStyle="white",e.lineWidth=1,e.beginPath(),e.moveTo(a.points[0].x,a.points[0].y);for(var n=1;n<a.points.length;n++)e.lineTo(a.points[n].x,a.points[n].y);e.closePath(),e.stroke(),e.restore()}}]),e}(),$=function(){function e(t,i,a,n){Object(p.a)(this,e),this.x=t,this.y=i,this.dx=a,this.dy=n,this.frameCount=0}return Object(g.a)(e,[{key:"update",value:function(){var e=T.deltaTime/16,t=M.width,i=M.height;this.x+=e*this.dx,this.y+=e*this.dy,this.x>t?this.x-=t:this.x<0&&(this.x+=t),this.y>i?this.y-=i:this.y<0&&(this.y+=i),this.frameCount++}},{key:"render",value:function(){I(T.ctx,this.x,this.y,1,this._render)}},{key:"_render",value:function(e,t,i){e.save(),e.translate(M.x+t*M.scale,M.y+i*M.scale),e.scale(M.scale,M.scale),e.strokeStyle="white",e.lineWidth=1,e.beginPath(),e.arc(0,0,1,0,2*Math.PI),e.stroke(),e.restore()}}]),e}();function H(e,t){switch(e.type){case 1:switch(t.type){case 1:return function(e,t){if(e.x2<=t.x1||e.x1>=t.x2||e.y2<=t.y1||e.y1>=t.y2)return!1;return!0}(e,t);case 2:return Q(t,e);default:throw new Error("cannot collide "+e.type+" "+t.type)}case 2:switch(t.type){case 1:return Q(e,t);case 2:return function(e,t){var i=e.cx-t.cx,a=e.cy-t.cy,n=i*i+a*a,s=e.radius+t.radius;if(n<s*s)return!0;return!1}(e,t);default:throw new Error("cannot collide "+e.type+" "+t.type)}default:throw new Error("cannot collide "+e.type+" "+t.type)}}function Q(e,t){var i=0,a=e.cx,n=e.cy;e.cx<t.x1?(i|=1,a=t.x1):e.cx>t.x2&&(i|=1,a=t.x2),e.cy<t.y1?(i|=2,n=t.y1):e.cy>t.y2&&(i|=2,n=t.y2);var s=e.cx-a,r=e.cy-n;return s*s+r*r<=e.radius*e.radius?i:0}var Z={},ee={},te=320,ie=180;function ae(e,t){Z.width=e,Z.height=t,Z.scale=Math.min(e/te,t/ie),Z.offsetX=(e-te*Z.scale)/2,Z.offsetY=(t-ie*Z.scale)/2}function ne(){var e=ee;ae(e.width,e.height)}function se(){var e=Z,t=e.player,i=e.obstacles,a=e.score,n=e.keyState;if(!Z.gameOver){if(Z.frameCount++,Z.frameCount%150===1){var s=le(20,100),r=le(50,100),o=Math.floor(Z.width/Z.scale);i.push(new fe(o,0,10,s,"green")),i.push(new fe(o,s+r,10,ie-s-r,"green"))}t.update(n);for(var h=0;h<i.length;h++)i[h].update();Z.obstacles=i.filter((function(e){return e.onScreen})),a.text="SCORE: "+Z.frameCount;for(var c=t.getCollisionBounds(),l=0;l<i.length;l+=1)H(c,i[l].getCollisionBounds())&&(Z.gameOver=!0);Z.gameOver&&(ee.showMessage(["GAME OVER"]),ee.setOptions([{type:"function",name:"RESTART",function:oe}]))}}function re(){var e=ee.ctx,t=Z,i=t.width,a=t.height,n=t.player,s=t.obstacles,r=t.score;e.clearRect(0,0,i,a),e.fillStyle="#111",e.fillRect(Z.offsetX,Z.offsetY,te*Z.scale,ie*Z.scale),e.save(),e.rect(Z.offsetX,Z.offsetY,te*Z.scale,ie*Z.scale),e.clip(),n.render(e);for(var o=0;o<s.length;o+=1)s[o].render(e);r.render(e),e.restore()}function oe(){Z.gameOver=!1,Z.frameCount=0,Z.obstacles=[],Z.player.x=15,Z.player.y=75,ee.setOptions()}function he(e){Z.keyState[e.code]=!0}function ce(e){Z.keyState[e.code]=!1}function le(e,t){return Math.floor(Math.random()*(t-e+1)+e)}var ue=function(){function e(t,i,a,n,s,r){Object(p.a)(this,e),this.x=t,this.y=i,this.color=a,this.fontName=n,this.fontSize=s,this.text=r}return Object(g.a)(e,[{key:"render",value:function(e){e.font=(this.fontSize*Z.scale).toFixed(0)+"px "+this.fontName,e.fillStyle=this.color,e.textAlign="right",e.textBaseline="top";var t=this.x,i=this.y;t=t*Z.scale+Z.offsetX,i=i*Z.scale+Z.offsetY,e.fillText(this.text,t,i)}}]),e}(),de=function(){function e(t,i,a,n){Object(p.a)(this,e),this.x=t,this.y=i,this.radius=a,this.color=n,this.speedX=0,this.speedY=0}return Object(g.a)(e,[{key:"update",value:function(e){this.speedX=0,this.speedY=0,(e.KeyW||e.ArrowUp)&&(this.speedY-=1),(e.KeyS||e.ArrowDown)&&(this.speedY+=1),(e.KeyA||e.ArrowLeft)&&(this.speedX-=1),(e.KeyD||e.ArrowRight)&&(this.speedX+=1),this.x+=this.speedX,this.y+=this.speedY,this.x<this.radius?this.x=this.radius:this.x+this.radius>te&&(this.x=te-this.radius),this.y<this.radius?this.y=this.radius:this.y+this.radius>ie&&(this.y=ie-this.radius)}},{key:"render",value:function(e){e.fillStyle=this.color;var t=this.x,i=this.y,a=this.radius;t=t*Z.scale+Z.offsetX,i=i*Z.scale+Z.offsetY,a*=Z.scale,e.beginPath(),e.arc(t,i,a,0,2*Math.PI,!0),e.fill()}},{key:"getCollisionBounds",value:function(){return e=this.x,t=this.y,i=this.radius,{type:2,cx:e,cy:t,radius:i};var e,t,i}}]),e}(),fe=function(){function e(t,i,a,n,s){Object(p.a)(this,e),this.x=t,this.y=i,this.width=a,this.height=n,this.color=s,this.onScreen=!0}return Object(g.a)(e,[{key:"update",value:function(){this.x--,this.x+this.width<=0&&(this.onScreen=!1)}},{key:"render",value:function(e){e.fillStyle=this.color;var t=this.x,i=this.y,a=this.width,n=this.height;t=t*Z.scale+Z.offsetX,i=i*Z.scale+Z.offsetY,a*=Z.scale,n*=Z.scale,e.fillRect(t,i,a,n)}},{key:"getCollisionBounds",value:function(){return e=this.x,t=this.y,i=this.x+this.width,a=this.y+this.height,{type:1,x1:e,y1:t,x2:i,y2:a};var e,t,i,a}}]),e}(),ye={},me={};function ve(){var e=me,t=e.ctx,i=e.width,a=e.height;ye.width=i,ye.height=a,ye.image=t.createImageData(i,a)}function pe(){var e=ye,t=e.size,i=e.width,a=e.height,n=e.keyState;n.ArrowDown&&ye.size>1&&ye.size--,n.ArrowUp&&ye.size<100&&ye.size++;for(var s=ye.image.data,r=0;r<a;r+=t)for(var o=0;o<i;o+=t)for(var h=Math.floor(256*Math.random()),c=r;c<Math.min(r+t,a);c++)for(var l=o;l<Math.min(o+t,i);l++){var u=4*(c*i+l);s[u]=h,s[u+1]=h,s[u+2]=h,s[u+3]=255}}function ge(){me.ctx.putImageData(ye.image,0,0)}function xe(e){ye.keyState[e.code]=!0}function we(e){ye.keyState[e.code]=!1}var ke=[function(e){var t=T=e,i=t.width,n=t.height;a={player:new V,bullets:[],asteroids:[],ambientSound:new J([O.beat1,O.beat2],800,(function(e,t){return e>9&&t>200?t-50:t})),isPaused:!0,keyState:{}};for(var s=0;s<4;s++)a.asteroids.push(new G(L(0,M.width),L(0,M.height),L(0,360),150));return D(i,n),setTimeout(a.ambientSound.start,100),{name:"asteroids",resize:A,update:F,render:z,handleKeyDown:X,handleKeyUp:Y,handlePause:B}},function(e){var t=ee=e,i=t.width,a=t.height;return Z={gameOver:!1,frameCount:0,obstacles:[],player:new de(15,75,15,"red"),score:new ue(te,0,"white","Consolas",8,"SCORE: 0"),keyState:{}},ae(i,a),{name:"dodge",resize:ne,update:se,render:re,handleKeyDown:he,handleKeyUp:ce}},function(e){var t=me=e,i=t.ctx,a=t.width,n=t.height;return ye={size:1,width:a,height:n,image:i.createImageData(a,n),keyState:{}},{name:"noise",resize:ve,update:pe,render:ge,handleKeyDown:xe,handleKeyUp:we}}],be=0,Ee={},Ce={totalFrameTime:0,frameCount:0,paused:!0},Se={ctx:null,deltaTime:0,width:0,height:0};var Pe=function(){var e=s.a.useRef(null),t=s.a.useRef(null),i=s.a.useRef(0),a=s.a.useState(0),n=Object(h.a)(a,2)[1],r=s.a.useState(),o=Object(h.a)(r,2),l=o[0],u=o[1],d=s.a.useState(),f=Object(h.a)(d,2),y=f[0],m=f[1],p=s.a.useState(),g=Object(h.a)(p,2),x=g[0],w=g[1];function k(){be=(be+ke.length-1)%ke.length,(Ee=ke[be](Se)).handlePause&&Ee.handlePause(Ce.paused),m(Ee.name),w(Ee.options),Ce.totalFrameTime=0,Ce.frameCount=0}function b(){be=(be+1)%ke.length,(Ee=ke[be](Se)).handlePause&&Ee.handlePause(Ce.paused),m(Ee.name),w(Ee.options),Ce.totalFrameTime=0,Ce.frameCount=0}var E=function(){u(),Ce.messageTimer=void 0},C=s.a.useCallback((function(){clearTimeout(Ce.messageTimer),E()}),[]);Se.showMessage=function(e){u(e),Ce.messageTimer=setTimeout(E,1e4)},Se.setOptions=w;var S=s.a.useCallback((function(){n((function(e){return e+1}))}),[]),P=s.a.useCallback((function(e){"PageDown"===e.code?(e.preventDefault(),b()):"PageUp"===e.code?(e.preventDefault(),k()):"Escape"===e.code?(e.preventDefault(),Ce.paused=!Ce.paused,Ee.handlePause&&Ee.handlePause(Ce.paused),C(),S()):Ee.handleKeyDown&&Ee.handleKeyDown(e)}),[S,C]),T=function(e){Ee.handleKeyUp&&Ee.handleKeyUp(e)};return s.a.useEffect((function(){var a=e.current,n=a.getBoundingClientRect();Se.ctx=a.getContext("2d"),Se.width=n.width*window.devicePixelRatio,Se.height=n.height*window.devicePixelRatio,(Ee=ke[be](Se)).handlePause&&Ee.handlePause(Ce.paused),m(Ee.name),w(Ee.options);return window.addEventListener("keydown",P),window.addEventListener("keyup",T),t.current=requestAnimationFrame((function e(n){if(void 0!==i.current){Se.deltaTime=n-i.current;var s=a.getBoundingClientRect();a.width=s.width*window.devicePixelRatio,a.height=s.height*window.devicePixelRatio,a.width===Se.width&&a.height===Se.height||(Ce.totalFrameTime=0,Ce.frameCount=0,Se.width=a.width,Se.height=a.height,Ee.resize&&Ee.resize());var r=performance.now();Ee.update&&!Ce.paused&&Ee.update(),Ee.render&&Ee.render();var o=performance.now();Ce.totalFrameTime+=o-r,Ce.frameCount++,function(){var e=Ce.totalFrameTime,t=Ce.frameCount,i=Se.ctx,a=Se.width,n=Ee.name+" ("+(e/t).toFixed(2)+" ms)";i.fillStyle="white",i.font="20px monospace",i.textAlign="center",i.textBaseline="top",i.shadowOffsetX=1,i.shadowOffsetY=1,i.shadowColor="rgba(0.2,0.2,0.2,1.0)",i.shadowBlur=4,i.fillText(n,a/2,0)}()}i.current=n,t.current=requestAnimationFrame(e)})),function(){window.removeEventListener("keydown",P),window.removeEventListener("keyup",T),cancelAnimationFrame(t.current)}}),[e,P]),s.a.createElement("div",{className:"screen"},s.a.createElement("canvas",{id:"canvas",ref:e}),s.a.createElement(c,{message:l,onClick:function(e){e.preventDefault(),Ce.messageTimer&&C()}}),s.a.createElement(v,{show:Ce.paused,onClickPrevious:function(e){e.preventDefault(),b()},onClickNext:function(e){e.preventDefault(),k()},onChange:function(e,t){t!==e.value&&(Ee.setOption(e,t),S())},title:y,options:x}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(Pe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.a0bbab01.chunk.js.map