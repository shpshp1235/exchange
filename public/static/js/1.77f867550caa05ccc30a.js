webpackJsonp([1],{gfaH:function(e,t){},tqxN:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:function(){return{currency_list:[],currency_name:"",id:"",rate:"",number:""}},filters:{toFixeds:function(e){return(e=Number(e)).toFixed(2)}},computed:{},created:function(){this.getlist()},mounted:function(){},methods:{currency_click:function(e){this.currency_name=e.currency_name,this.id=e.id,this.rate=e.number},getlist:function(){var e=this,t=this;this.$http({url:"/api/exchange/list",method:"GET",headers:{Authorization:localStorage.getItem("token")}}).then(function(n){if("ok"==n.data.type){var a=n.data.message;t.currency_list=a,e.currency_name=a[0].currency_name,e.id=a[0].id,e.rate=a[0].number}}).catch(function(e){})},submit:function(){var e=this;if(!e.number||e.number<0)return layer.msg("请输入数量");var t=layer.load();this.$http({url:"/api/exchange/exchange",method:"POST",data:{number:e.number,id:e.id},headers:{Authorization:localStorage.getItem("token")}}).then(function(n){layer.close(t),layer.msg(n.data.message),"ok"==n.data.type&&(e.number="")}).catch(function(e){})}}},r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"account-main wrap fColor1"},[e._m(0),e._v(" "),n("div",{staticClass:"main-content mt20"},[n("div",{staticClass:"mauto",staticStyle:{width:"80%"}},[n("div",{staticClass:"flex alcenter exbox"},[n("div",[n("el-select",{attrs:{placeholder:e.$t("fat.pselect")},on:{change:e.currency_click},model:{value:e.currency_name,callback:function(t){e.currency_name=t},expression:"currency_name"}},e._l(e.currency_list,function(t){return n("el-option",{key:t.id,attrs:{value:t}},[e._v(e._s(t.currency_name)+"\n                        ")])}))],1),e._v(" "),n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.number,expression:"number"}],staticClass:"number-input",attrs:{type:"number",name:"",id:"",placeholder:"兑换数量"},domProps:{value:e.number},on:{input:function(t){t.target.composing||(e.number=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"tc btn-btn white bgBlue radius4 pointer",on:{click:e.submit}},[e._v("兑换")])]),e._v(" "),n("div",{staticClass:"mt10 ft14"},[e._v("兑换比例：1"+e._s(e.currency_name)+" 兑换 "+e._s(e.rate)+"USDT")])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"title flex"},[t("span",[this._v("币币兑换")])])}]};var i=n("VU/8")(a,r,!1,function(e){n("gfaH")},null,null);t.default=i.exports}});
//# sourceMappingURL=1.77f867550caa05ccc30a.js.map