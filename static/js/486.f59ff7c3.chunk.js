"use strict";(self.webpackChunkreact_notes_app=self.webpackChunkreact_notes_app||[]).push([[486],{2741:function(e,r,t){t.d(r,{B:function(){return _}});var s=t(1413),n=t(4165),a=t(5861),o=t(885),i=t(2791),l=t(7689),m=t(1134),c=t(2385),u=t(1087);var d=t.p+"static/media/login.79872296556418253ca4b3289f856112.svg",h=t(4906),p=t(361),x=t(8570),g=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,f=t(8788),j=t(9425),w=t(7937),Z=t(4006),v=t(184),_=function(){var e=(0,m.cI)(),r=e.register,t=e.handleSubmit,_=e.formState.errors,C=(0,i.useContext)(f.V),N=C.loginUser,b=C.registerUser,k=(0,l.TH)(),F=(0,l.s0)(),L=(0,i.useState)(!0),B=(0,o.Z)(L,2),y=B[0],S=B[1],A=(0,i.useState)(!1),q=(0,o.Z)(A,2),z=q[0],T=q[1],P="/register"===k.pathname,Y=P?p.LP:p.Kk,H=(0,Z.x)().fullDate,U=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(r){var t,s,a,o,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return T(!0),t="".concat(r.name).concat(r.surname).toLowerCase(),s={name:r.name,surname:r.surname,email:r.email,password:r.password,returnSecureToken:!0,created:H,nick:t,image:"https://us.123rf.com/450wm/afe207/afe2071602/afe207160200158/52329668-m%C4%99%C5%BCczyzna-obraz-profilu-awatara-cie%C5%84-sylwetka-%C5%9Bwiat%C5%82a.jpg?ver=6"},e.prev=3,e.next=6,fetch(Y,{method:"POST",body:JSON.stringify(s),headers:{"Content-type":"application/json"}});case 6:return a=e.sent,e.next=9,a.json();case 9:o=e.sent,a.ok?(T(!1),P?b(s,o.idToken):N(o.idToken,s),F(P?"/login":"/user")):(i="Authentication failed",o&&o.error&&o.error.message&&(i=o.error.message),alert(i)),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),console.log(e.t0);case 16:T(!1);case 17:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(r){return e.apply(this,arguments)}}();return P?(0,v.jsxs)("div",{className:c.Z.authForm,children:[(0,v.jsxs)("form",{onSubmit:t(U),className:c.Z.form,children:[z&&(0,v.jsx)(x.k,{}),(0,v.jsx)(w.X,{paddingBottom:!0,title:"Create new account!"}),(0,v.jsxs)("div",{className:c.Z.rowFormControl,children:[(0,v.jsxs)("div",{className:c.Z.formControl,children:[(0,v.jsx)("label",{htmlFor:"name",children:"Name"}),(0,v.jsx)("input",(0,s.Z)((0,s.Z)({},r("name",{required:!0,minLength:2,maxLength:20})),{},{autoComplete:"off",id:"name",placeholder:"Your name",type:"text"})),_.name&&(0,v.jsx)(j.B,{title:"Name is required"})]}),(0,v.jsxs)("div",{className:c.Z.formControl,children:[(0,v.jsx)("label",{htmlFor:"surname",children:"Surname"}),(0,v.jsx)("input",(0,s.Z)({autoComplete:"off",id:"surname",placeholder:"Your surname",type:"text"},r("surname",{required:!0,minLength:2,maxLength:20}))),_.surname&&(0,v.jsx)(j.B,{title:"Surname is required"})]})]}),(0,v.jsxs)("div",{className:c.Z.formControl,children:[(0,v.jsx)("label",{htmlFor:"email",children:"Email"}),(0,v.jsx)("input",(0,s.Z)({id:"email",placeholder:"Your email",type:"email"},r("email",{required:!0,minLength:5,maxLength:40,pattern:g}))),_.email&&(0,v.jsx)(j.B,{title:"Email is invalid"})]}),(0,v.jsxs)("div",{className:c.Z.formControl,children:[(0,v.jsx)("label",{htmlFor:"password",children:"Password"}),(0,v.jsxs)("div",{className:c.Z.passwordInput,children:[(0,v.jsx)("input",(0,s.Z)({autoComplete:"off",id:"password",placeholder:"Your password",type:y?"password":" text"},r("password",{required:!0,minLength:8,maxLength:25}))),(0,v.jsxs)("button",{onClick:function(){return S((function(e){return!e}))},type:"button",className:c.Z.passwordToggleButton,children:[y?"Show":"Hide"," password"]})]}),_.password&&(0,v.jsx)(j.B,{title:"Password is invalid, min. 8 letters"})]}),(0,v.jsx)(u.rU,{className:c.Z.loginLink,to:"/login",children:"Are you have an account? Log in"}),(0,v.jsx)(h.c,{type:"submit",title:"".concat(z?"Sending":"Create account")})]}),(0,v.jsx)("div",{className:c.Z.features,children:(0,v.jsx)("img",{src:d,alt:"login"})})]}):(0,v.jsxs)("div",{className:c.Z.authForm,children:[(0,v.jsxs)("form",{onSubmit:t(U),className:c.Z.form,children:[z&&(0,v.jsx)(x.k,{}),(0,v.jsx)(w.X,{paddingBottom:!0,title:"Login to your account!"}),(0,v.jsxs)("div",{className:c.Z.formControl,children:[(0,v.jsx)("label",{htmlFor:"email",children:"Email"}),(0,v.jsx)("input",(0,s.Z)({id:"email",placeholder:"Your email",type:"email"},r("email",{required:!0,minLength:5,maxLength:40,pattern:g}))),_.email&&(0,v.jsx)(j.B,{title:"Email is invalid"})]}),(0,v.jsxs)("div",{className:c.Z.formControl,children:[(0,v.jsx)("label",{htmlFor:"password",children:"Password"}),(0,v.jsxs)("div",{className:c.Z.passwordInput,children:[(0,v.jsx)("input",(0,s.Z)({id:"password",placeholder:"Your password",type:y?"password":" text"},r("password",{required:!0,minLength:8,maxLength:25}))),(0,v.jsxs)("button",{onClick:function(){return S((function(e){return!e}))},type:"button",className:c.Z.passwordToggleButton,children:[y?"Show":"Hide"," password"]})]}),_.password&&(0,v.jsx)(j.B,{title:"Password is invalid, min. 8 letters"})]}),(0,v.jsx)(u.rU,{className:c.Z.loginLink,to:"/register",children:"You not have an account? Register"}),(0,v.jsx)(h.c,{type:"submit",title:z?"Sending":"Log in"})]}),(0,v.jsx)("div",{className:c.Z.features,children:(0,v.jsx)("img",{src:d,alt:"login"})})]})}},9425:function(e,r,t){t.d(r,{B:function(){return o}});var s=t(5146),n=t(2385),a=t(184),o=function(e){var r=e.title;return(0,a.jsxs)("p",{className:n.Z.errorMessage,children:[(0,a.jsx)(s.Z,{}),r]})}},7937:function(e,r,t){t.d(r,{X:function(){return o}});var s="Heading_heading__zCqcD",n="Heading_paddingBottom__Vh+55",a=t(184),o=function(e){var r=e.title,t=e.children,o=e.paddingBottom;return(0,a.jsxs)("h1",{className:"".concat(s," ").concat(o?n:""),children:[r,t]})}},4486:function(e,r,t){t.r(r);var s=t(2741),n=t(7338),a=t(184);r.default=function(){return(0,a.jsx)(n.A,{children:(0,a.jsx)(s.B,{})})}},2385:function(e,r){r.Z={authForm:"AuthForm_authForm__6PARk",form:"AuthForm_form__qxaDd",rowFormControl:"AuthForm_rowFormControl__0UbWb",formControl:"AuthForm_formControl__KcrP6",passwordInput:"AuthForm_passwordInput__mi2CR",passwordToggleButton:"AuthForm_passwordToggleButton__HwwQ2",errorMessage:"AuthForm_errorMessage__UOutx",loginLink:"AuthForm_loginLink__Ejzzz"}}}]);
//# sourceMappingURL=486.f59ff7c3.chunk.js.map