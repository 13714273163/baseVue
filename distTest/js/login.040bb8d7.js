(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{a55b:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-wrapper"},[s("div",{staticClass:"form-wrapper"},[s("div",{staticClass:"field"},[s("div",{staticClass:"form-item user-item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"field-ipt",attrs:{type:"text",placeholder:"请输入会员名",autocomplete:"off"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),s("div",{staticClass:"form-item pwd-item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"field-ipt",attrs:{type:"password",placeholder:"请输入登录密码",autocomplete:"off"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),s("div",{staticClass:"form-item"},[s("button",{staticClass:"field-btn",class:{disable:""===e.username||""===e.password},attrs:{type:"button"},on:{click:e.onSubmit}},[e._v(" 登录 ")])])])])])},r=[],n=(s("96cf"),s("1da1")),o=s("7ded"),i={data:function(){return{username:"madsports_xiezg",password:"hzi*JQJx4W"}},watch:{},created:function(){},methods:{onSubmit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var s,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(s=e,""!==s.username){t.next=3;break}return t.abrupt("return",s.$Toast("请输入用户名"));case 3:if(""!==s.password){t.next=5;break}return t.abrupt("return",s.$Toast("请输入密码"));case 5:return t.next=7,Object(o["b"])({username:s.username,password:s.password});case 7:a=t.sent,s.$store.dispatch("user/setInfo",a),s.$router.push("/home");case 10:case"end":return t.stop()}}),t)})))()}}},u=i,c=s("2877"),p=Object(c["a"])(u,a,r,!1,null,"79ae406b",null);t["default"]=p.exports}}]);