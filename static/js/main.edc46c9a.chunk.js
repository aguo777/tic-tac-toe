(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{44:function(e,t,n){e.exports=n(75)},49:function(e,t,n){},56:function(e,t,n){},58:function(e,t,n){},75:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(38),o=n.n(c),l=(n(49),n(24)),u=n(18),i=n(76),m=n(77),s=n(78),f=n(40),p=n(80),v=n(81),E=n(82),y=n(79),O=n(39);n(56);function b(e){var t=e.square,n=e.disabled,a=e.isPartOfWinner,c=e.onClick;return r.a.createElement(f.a,{className:"square",outline:!a,color:"primary",size:"lg",onClick:c,disabled:n},t)}var d,w,h=n(25),j=n(12);!function(e){e.X="X",e.O="O"}(d||(d={})),function(e){e.X="X",e.O="O",e.Empty=" "}(w||(w={}));var X=[[w.Empty,w.Empty,w.Empty],[w.Empty,w.Empty,w.Empty],[w.Empty,w.Empty,w.Empty]];function k(e){var t=0,n=0;if(e.forEach((function(e){return e.forEach((function(e){switch(e){case w.X:t++;break;case w.O:n++}}))})),t===n)return d.X;if(t===n+1)return d.O;throw console.log({state:e,numX:t,numO:n}),new Error("Invalid board state!")}function g(e){var t=k(e);return Object(j.flatMap)(e,(function(e,t){return e.map((function(e,n){return{square:e,position:{row:t,col:n}}}))})).filter((function(e){return e.square===w.Empty})).map((function(e){var n=e.position;return{player:t,position:n}}))}function C(e,t){var n=t.player,a=t.position,r=a.row,c=a.col;if(e[r][c]!==w.Empty)throw new Error("Square is not empty!");var o=n===d.X?w.X:w.O;return e.map((function(e,t){return e.map((function(e,n){return t!==r||n!==c?e:o}))}))}var N=[0,1,2];function S(e){var t=[].concat(Object(h.a)(N.map((function(e){return N.map((function(t){return{row:e,col:t}}))}))),Object(h.a)(N.map((function(e){return N.map((function(t){return{row:t,col:e}}))}))),Object(h.a)([N.map((function(e){return{row:e,col:e}})),N.map((function(e){return{row:e,col:2-e}}))])),n=!0,a=!1,r=void 0;try{for(var c,o=t[Symbol.iterator]();!(n=(c=o.next()).done);n=!0){var l=c.value;if(l.every((function(t){var n=t.row,a=t.col;return e[n][a]===w.X})))return{player:d.X,triple:l};if(l.every((function(t){var n=t.row,a=t.col;return e[n][a]===w.O})))return{player:d.O,triple:l}}}catch(u){a=!0,r=u}finally{try{n||null==o.return||o.return()}finally{if(a)throw r}}if(!e.some((function(e){return e.some((function(e){return e===w.Empty}))})))return null}function q(e){var t=e.board,n=e.player,a=e.winner,c=e.onAction,o=void 0!==a;return r.a.createElement("div",null,t.map((function(e,t){return r.a.createElement("div",{key:t},e.map((function(e,l){return r.a.createElement(b,{key:l+e,square:e,isPartOfWinner:null===a||void 0===a?void 0:a.triple.some((function(e){return e.row===t&&e.col===l})),disabled:o||e!==w.Empty,onClick:function(){return null===c||void 0===c?void 0:c({player:n,position:{row:t,col:l}})}})})))})))}n(58);var T,I,x=n(14),A=n(15),B=n(21),F=n(19),H=n(22),W=function(){function e(t){Object(x.a)(this,e),this.player=void 0,this.name=void 0,this.player=t}return Object(A.a)(e,[{key:"act",value:function(e){throw new Error("Not implemented")}}]),e}(),P=function(e){function t(e){var n;return Object(x.a)(this,t),(n=Object(B.a)(this,Object(F.a)(t).call(this,e))).name="Random AI (".concat(e,")"),n}return Object(H.a)(t,e),Object(A.a)(t,[{key:"act",value:function(e){var t=g(e);return Object(j.sample)(t)}}]),t}(W),J=function(e){function t(e){var n;return Object(x.a)(this,t),(n=Object(B.a)(this,Object(F.a)(t).call(this,e))).name="Minmax AI (".concat(e,")"),n}return Object(H.a)(t,e),Object(A.a)(t,[{key:"act",value:function(e){return function e(t){var n=S(t);if(n)return n.player===d.X?[1,null]:[-1,null];if(null===n)return[0,null];var a=g(t).map((function(n){return[e(C(t,n))[0],n]}));return k(t)===d.X?Object(j.maxBy)(a,(function(e){return e[0]})):Object(j.minBy)(a,(function(e){return e[0]}))}(e)[1]}}]),t}(W);var M=(T={},Object(u.a)(T,d.X,new P(d.X)),Object(u.a)(T,d.O,new P(d.O)),T),R=(I={},Object(u.a)(I,d.X,new J(d.X)),Object(u.a)(I,d.O,new J(d.O)),I);function z(e){var t=e.label,n=e.player,a=e.onSelect,c=M[n],o=R[n];return r.a.createElement(p.a,null,r.a.createElement(v.a,{caret:!0},t),r.a.createElement(E.a,null,r.a.createElement(y.a,{onClick:function(){return a()}},"Human (",n,")"),r.a.createElement(y.a,{onClick:function(){return a(c)}},c.name),r.a.createElement(y.a,{onClick:function(){return a(o)}},o.name)))}var G=function(){var e,t,n=Object(a.useState)(X),c=Object(l.a)(n,2),o=c[0],u=c[1],p=Object(a.useState)(),v=Object(l.a)(p,2),E=v[0],y=v[1],b=Object(a.useState)(),w=Object(l.a)(b,2),h=w[0],j=w[1],g=function(e){var t=C(o,e);u(t)},N=S(o),T=k(o);return void 0===N&&(T===(null===E||void 0===E?void 0:E.player)?setTimeout(g,100,E.act(o)):T===(null===h||void 0===h?void 0:h.player)&&setTimeout(g,100,h.act(o))),r.a.createElement(r.a.Fragment,null,r.a.createElement(O.Helmet,null,r.a.createElement("title",null,"Tic Tac Toe")),r.a.createElement(i.a,{className:"app"},r.a.createElement(m.a,{className:"title"},r.a.createElement(s.a,null,r.a.createElement("h1",null,"Tic tac toe"))),r.a.createElement(m.a,{className:"players"},r.a.createElement(s.a,{sm:3},r.a.createElement(z,{label:null!==(e=null===E||void 0===E?void 0:E.name)&&void 0!==e?e:"Human (X)",player:d.X,onSelect:function(e){return y(e)}})),r.a.createElement(s.a,{sm:3},r.a.createElement(z,{label:null!==(t=null===h||void 0===h?void 0:h.name)&&void 0!==t?t:"Human (O)",player:d.O,onSelect:function(e){return j(e)}}))),r.a.createElement(m.a,{className:"player"},r.a.createElement(s.a,null,r.a.createElement("h3",null,void 0===N&&r.a.createElement(r.a.Fragment,null,"Current Player: ",T),null===N&&r.a.createElement(r.a.Fragment,null,"It's a draw!"),!!N&&r.a.createElement(r.a.Fragment,null,N.player," has won the game!")))),r.a.createElement(m.a,{className:"board"},r.a.createElement(s.a,null,r.a.createElement(q,{board:o,player:T,winner:N,onAction:g}))),r.a.createElement(m.a,{className:"buttons"},r.a.createElement(s.a,null,r.a.createElement(f.a,{onClick:function(){u(X)}},"Reset Game")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(74);o.a.render(r.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[44,1,2]]]);
//# sourceMappingURL=main.edc46c9a.chunk.js.map