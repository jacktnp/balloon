(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{240:function(e,t,n){var content=n(244);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(69).default)("17c99a07",content,!0,{sourceMap:!1})},243:function(e,t,n){"use strict";n(240)},244:function(e,t,n){var r=n(68)((function(i){return i[1]}));r.push([e.i,"input[data-v-291374a9]{\n  text-align:center\n}\n[data-v-291374a9]::-webkit-input-placeholder{\n  text-align:center\n}\n[data-v-291374a9]:-moz-placeholder,[data-v-291374a9]::-moz-placeholder{\n  text-align:center\n}\n[data-v-291374a9]:-ms-input-placeholder{\n  text-align:center\n}",""]),e.exports=r},249:function(e,t,n){"use strict";n.r(t);var r=n(2),o=(n(27),{data:function(){return{username:"sp1",password:""}},methods:{login:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={email:e.username},t.prev=1,t.next=4,e.$auth.loginWith("local",{data:n});case 4:console.log("Login success with",e.username),e.$router.push({path:"/support"}),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),console.log(t.t0),e.$router.push("/login");case 12:case"end":return t.stop()}}),t,null,[[1,8]])})))()}}}),l=(n(243),n(45)),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"h-screen md:w-1/5 w-full container mx-auto p-5 flex flex-col items-center"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"form-input block border w-full rounded-md shadow-sm mt-6",attrs:{type:"text",placeholder:"User name"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-input block border w-full rounded-md shadow-sm mt-4",attrs:{type:"password",placeholder:"Password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),e._v(" "),n("button",{staticClass:"group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4",on:{click:e.login}},[e._v("\n    Login\n  ")])])}),[],!1,null,"291374a9",null);t.default=component.exports}}]);