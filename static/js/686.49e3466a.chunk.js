"use strict";(self.webpackChunkreact_notes_app=self.webpackChunkreact_notes_app||[]).push([[686],{7937:function(e,t,n){n.d(t,{X:function(){return r}});var s="Heading_heading__zCqcD",i="Heading_paddingBottom__Vh+55",a=n(184),r=function(e){var t=e.title,n=e.children,r=e.paddingBottom;return(0,a.jsxs)("h1",{className:"".concat(s," ").concat(r?i:""),children:[t,n]})}},2307:function(e,t,n){n.d(t,{x:function(){return l}});var s=n(2791),i=n(1087),a=n(3978),r=n(8788),o=n(8634),c=n(184),l=function(){var e=(0,s.useContext)(r.V),t=e.userData,n=e.isLoggedIn;return(0,c.jsxs)(i.rU,{to:n?"/user":"/login",className:o.Z.user,children:[(0,c.jsx)(a.Z,{alt:"user profile",src:t.image}),(0,c.jsx)("p",{children:n?t.name:"Guest"})]})}},4099:function(e,t,n){n.d(t,{k:function(){return a}});n(2791);var s=n(610),i=n(184),a=function(e){var t=e.title,n=e.type,a=e.disabled,r=e.onClick;return(0,i.jsx)("button",{onClick:r,className:s.Z.secondaryButton,disabled:a,type:n,children:t})}},716:function(e,t,n){n.d(t,{o:function(){return s}});var s={hidden:{opacity:0,x:-200,y:0},enter:{opacity:1,x:0,y:0},exit:{opacity:0,x:0,y:-200}}},2686:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var s=n(2791),i=n(1413),a=n(8634),r=n(1881),o=n(5649),c=n(4906),l=n(4099),_=n(2307),d=n(184),u=function(e){var t=e.id,n=e.note,u=e.title,h=e.category,m=e.description,p=(0,s.useContext)(o.U),x=p.permRemove,N=p.undoNote;return(0,d.jsxs)(r.E.li,{layout:!0,initial:{x:30,opacity:0},animate:{x:0,opacity:1},exit:{x:30,opacity:0},className:a.Z.note,children:[(0,d.jsxs)("div",{className:a.Z.header,children:[(0,d.jsx)(_.x,{}),(0,d.jsx)("h2",{children:u})]}),(0,d.jsxs)("div",{className:a.Z.content,children:[(0,d.jsx)("h3",{children:h}),(0,d.jsx)("p",{children:m})]}),(0,d.jsxs)("div",{className:a.Z.buttons,children:[(0,d.jsx)(c.c,{onClick:function(){x(t)},type:"button",title:"Delete"}),(0,d.jsx)(l.k,{onClick:function(){N(t,(0,i.Z)({},n))},type:"button",title:"Undo"})]})]})},h=n(9780);var m=n.p+"static/media/trash.2b1b4fd796f9bfcc30d86cee04ba9ec3.svg",p=n(4549),x=n(1087),N=n(7937),j=function(){var e=(0,s.useContext)(o.U),t=e.trashNotes,n=e.clearTrash,i=(0,d.jsxs)("div",{className:h.Z.emptyWrapper,children:[(0,d.jsx)("img",{src:m,alt:"empty"}),(0,d.jsx)("h3",{className:h.Z.empty,children:"Trash is empty"}),(0,d.jsxs)("div",{className:h.Z.buttons,children:[t.length?(0,d.jsx)(x.rU,{to:"/trash",children:(0,d.jsx)(c.c,{title:"Check trash"})}):null,(0,d.jsx)(x.rU,{to:"/create",children:(0,d.jsx)(c.c,{title:"Create new"})})]})]});return(0,d.jsxs)("div",{className:h.Z.notesModules,children:[(0,d.jsxs)("div",{className:h.Z.header,children:[(0,d.jsx)(N.X,{title:"Trash",children:(0,d.jsx)("span",{className:h.Z.notesLength,children:t.length})}),t.length?(0,d.jsx)("div",{className:h.Z.buttons,children:(0,d.jsx)(c.c,{title:"Delete all",onClick:n})}):null]}),(0,d.jsx)("ul",{className:h.Z.list,children:(0,d.jsx)(p.M,{children:t.map((function(e){return(0,d.jsx)(u,{id:e.id,title:e.title,category:e.category,description:e.description,note:e},e.id)}))})}),!t.length&&i]})},y=n(5156),g=n(716),f=function(){return(0,d.jsx)(r.E.div,{variants:g.o,initial:"hidden",animate:"enter",exit:"exit",transition:{type:"linear"},className:h.Z.mainWrapper,children:(0,d.jsx)(y.i,{children:(0,d.jsx)(j,{})})})}},8634:function(e,t){t.Z={note:"NoteItem_note__hZnBq",header:"NoteItem_header__gtdUF",headerTitle:"NoteItem_headerTitle__DCKZF",user:"NoteItem_user__qm92p",content:"NoteItem_content__+4ExI",buttons:"NoteItem_buttons__nOYdH",form:"NoteItem_form__mG-7q",contentParams:"NoteItem_contentParams__u47lG",heading:"NoteItem_heading__UvUYJ",detailPageWrapper:"NoteItem_detailPageWrapper__Q2LDx",singleItemWrapper:"NoteItem_singleItemWrapper__emSxl",details:"NoteItem_details__yKSw3",noteDetailsWrapper:"NoteItem_noteDetailsWrapper__5TzI3",historyList:"NoteItem_historyList__wWTIF",historyItem:"NoteItem_historyItem__9g0Q1",icon:"NoteItem_icon__taUqY",detailsControls:"NoteItem_detailsControls__rUDzm",tags:"NoteItem_tags__+klpR",saveButton:"NoteItem_saveButton__eB1yv"}},9780:function(e,t){t.Z={notesModules:"Notes_notesModules__Dv1jQ",header:"Notes_header__EoysZ",heading:"Notes_heading__Q-NwA",buttons:"Notes_buttons__TZOMa",notesLength:"Notes_notesLength__9Z-gT",list:"Notes_list__XZ4Ok",mainWrapper:"Notes_mainWrapper__pov5v",emptyWrapper:"Notes_emptyWrapper__902nR",empty:"Notes_empty__2Iy24"}}}]);
//# sourceMappingURL=686.49e3466a.chunk.js.map