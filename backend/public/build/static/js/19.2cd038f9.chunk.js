(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{305:function(e,t){e.exports={youtube:"AIzaSyB1msCdExGF2q9oyAjUq4bmSQq6i89VId8"}},306:function(e,t,n){"use strict";var a=n(1),r=n(2),i=n(0),o=(n(5),n(3)),c=n(4),u=n(103),s=i.forwardRef(function(e,t){var n=e.classes,c=e.className,s=Object(r.a)(e,["classes","className"]),l=i.useContext(u.a);return i.createElement("div",Object(a.a)({className:Object(o.a)(n.root,c,"flex-start"===l.alignItems&&n.alignItemsFlexStart),ref:t},s))});t.a=Object(c.a)(function(e){return{root:{minWidth:56,color:e.palette.action.active,flexShrink:0,display:"inline-flex"},alignItemsFlexStart:{marginTop:8}}},{name:"MuiListItemIcon"})(s)},315:function(e,t,n){"use strict";var a=n(6),r=n.n(a),i=n(12),o=n(14);function c(e){var t={};if(1===e.nodeType){if(e.attributes.length>0){t.attributes={};for(var n=0;n<e.attributes.length;n++){var a=e.attributes.item(n);t.attributes[a.nodeName]=a.nodeValue}}}else 3===e.nodeType&&(t=e.nodeValue);var r=[].slice.call(e.childNodes).filter(function(e){return 3===e.nodeType});if(e.hasChildNodes()&&e.childNodes.length===r.length)t=[].slice.call(e.childNodes).reduce(function(e,t){return e+t.nodeValue},"");else if(e.hasChildNodes())for(var i=0;i<e.childNodes.length;i++){var o=e.childNodes.item(i),u=o.nodeName;if("undefined"==typeof t[u])t[u]=c(o);else{if("undefined"==typeof t[u].push){var s=t[u];t[u]=[],t[u].push(s)}t[u].push(c(o))}}return t}var u=n(305),s=n.n(u),l=n(53);function f(e){return p.apply(this,arguments)}function p(){return(p=Object(i.a)(r.a.mark(function e(t){var n,a,i,u=arguments;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:new AbortController,e.next=3,fetch(o.a.getSuggestionFake(t),{signal:n.signal}).then(function(e){return e.text()});case 3:return a=e.sent,i=c((new DOMParser).parseFromString(a,"text/xml")),e.abrupt("return",i.toplevel?i.toplevel.CompleteSuggestion:[]);case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}function d(e){return m.apply(this,arguments)}function m(){return(m=Object(i.a)(r.a.mark(function e(t){var n,a=arguments;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.length>1&&void 0!==a[1]?a[1]:new AbortController,e.abrupt("return",Object(l.a)().then(function(e){return fetch(o.a.searchYoutube(s.a.youtube,t),{headers:new Headers({"Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer ".concat(e)}),signal:n.signal}).then(function(e){return e.json()})}).catch(function(e){return e}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function h(){return(h=Object(i.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e)}))).apply(this,arguments)}n.d(t,"b",function(){return f}),n.d(t,"a",function(){return d}),function(){h.apply(this,arguments)}()},337:function(e,t,n){},386:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(253);t.a=Object(i.a)(r.a.createElement("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"SearchOutlined")},416:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n.n(a),i=n(12),o=n(39),c=n(0),u=n.n(c),s=(n(337),n(129)),l=n(279),f=n(319),p=n(272),d=n(386),m=n(413),h=n(135),b=n(315),g=n(280),v=n(306),y=n(282),w=n(262),x=n.n(w),E=n(18),j=n(105),O=n(60),S=n(106),C=n(36),N=n(109),k=n(21),F=n(172),I=n(51),T=u.a.forwardRef(function(e,t){return u.a.createElement(F.a,Object.assign({direction:"left",ref:t},e))}),q=x()(function(e){return{root:{marginTop:"1rem",padding:"2px 4px",display:"flex",alignItems:"center",width:"100%"},input:{marginLeft:e.spacing(1),flex:1},iconButton:{padding:10},divider:{height:28,margin:4}}}),L=function(e){var t=Object(E.e)(),n=u.a.useState(!0),a=Object(o.a)(n,2),w=a[0],x=a[1],S=u.a.useState([]),F=Object(o.a)(S,2),I=F[0],L=F[1],A=new AbortController,M=u.a.useState(u.a.createElement("div",{className:"errorPage text-center",style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}},u.a.createElement("img",{src:"./assets/icons/darkmode_nothingfound.svg",style:{width:"8rem",height:"auto"},alt:"Kabeers Music Logo"}),u.a.createElement("br",null),u.a.createElement("div",null,navigator.onLine?"Results will appear as you type":"Searching In Downloads"))),z=Object(o.a)(M,2),P=z[0],B=z[1],K=q(),R=function(){var n=Object(i.a)(r.a.mark(function n(a){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if("Enter"!==a.key){n.next=2;break}return n.abrupt("return",O.a.getState().q?t.push("/search/results"):null);case 2:navigator.onLine?Object(b.b)(a.target.value,A).then(function(e){return e&&e.length?L(e):L([])}):Object(N.a)(a.target.value).then(function(e){return L(e.map(function(e){return{suggestion:{attributes:{data:e.item.title}}}}))}),I&&B(function(){return I.map(function(e,t){if(e)return u.a.createElement(g.a,{button:!0,key:t,onClick:function(){O.a.dispatch(Object(C.i)(e.suggestion.attributes.data))},component:j.b,to:"/search/results"},u.a.createElement(v.a,null,u.a.createElement(d.a,null)),u.a.createElement(y.a,{primary:"".concat(e.suggestion.attributes.data)}))})}),e.history.push({pathname:"search",search:"?"+new URLSearchParams({q:a.target.value}).toString()}),O.a.dispatch(Object(C.i)(a.target.value));case 6:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}();return Object(c.useEffect)(function(){return function(){A.abort()}},[]),u.a.createElement("div",{className:"SearchComponent"},u.a.createElement(s.a,{fullScreen:!0,open:w,onClose:function(){},TransitionComponent:T},u.a.createElement(l.a,{className:"fixed-top"},u.a.createElement(f.a,null,window.history?u.a.createElement(p.a,{onClick:function(){x(!1)},component:j.b,to:"/home",color:"primary.light",visibility:!1},u.a.createElement(m.a,{color:"#FFF"})):u.a.createElement(u.a.Fragment,null),u.a.createElement(h.a,{autoCapitalize:!0,autoComplete:!0,autoFocus:!0,onKeyUp:R,onFocus:function(){},onBlur:function(){},className:"".concat(K.input," text-light"),placeholder:"Search Kabeers Music",inputProps:{"aria-label":"Search Kabeers Music"}}))),u.a.createElement("div",{className:"container px-3",style:{marginTop:"4rem"}},u.a.createElement("div",{className:"row"},P,P?null:u.a.createElement(k.default,null)))))};L.defaultProps={};t.default=Object(S.b)(function(e){return{query:e.q}})(Object(I.a)(L))}}]);
//# sourceMappingURL=19.2cd038f9.chunk.js.map