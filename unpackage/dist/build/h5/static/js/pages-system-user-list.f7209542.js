(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-system-user-list"],{1351:function(n,t,e){"use strict";e.r(t);var i=e("29f6"),a=e("905c");for(var r in a)"default"!==r&&function(n){e.d(t,n,(function(){return a[n]}))}(r);var u,s=e("f0c5"),o=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"808c1684",null,!1,i["a"],u);t["default"]=o.exports},"29f6":function(n,t,e){"use strict";var i;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return i}));var a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-text",[n._v(n._s(n.dateShow))])},r=[]},"3f37":function(n,t,e){var i=e("24fb");t=i(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""]),n.exports=t},"49cc":function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return i}));var i={uniClientdb:e("10d0").default,uniTable:e("b23a").default,uniTr:e("56d9").default,uniTh:e("1795").default,uniTd:e("994c").default,uniDateformat:e("1351").default,uniPagination:e("3f8a").default},a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",[e("v-uni-view",{staticClass:"uni-header"},[e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-view",{staticClass:"uni-title"}),e("v-uni-view",{staticClass:"uni-sub-title"})],1),e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-input",{staticClass:"uni-search",attrs:{type:"text",placeholder:"请输入搜索内容"},on:{confirm:function(t){arguments[0]=t=n.$handleEvent(t),n.search.apply(void 0,arguments)}},model:{value:n.query,callback:function(t){n.query=t},expression:"query"}}),e("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.search.apply(void 0,arguments)}}},[n._v("搜索")]),e("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.navigateTo("./add")}}},[n._v("新增")]),e("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(t){arguments[0]=t=n.$handleEvent(t),n.delTable.apply(void 0,arguments)}}},[n._v("批量删除")])],1)],1),e("v-uni-view",{staticClass:"uni-container"},[e("uni-clientdb",{ref:"udb",attrs:{collection:n.collectionName,options:n.options,where:n.where,field:"username,role{role_id,role_name},mobile,email,status,register_date","page-data":"replace",orderby:n.orderby,getcount:!0,"page-size":n.options.pageSize,"page-current":n.options.pageCurrent},scopedSlots:n._u([{key:"default",fn:function(t){var i=t.data,a=t.pagination,r=t.loading,u=t.error;return[e("uni-table",{attrs:{loading:r,emptyText:u.message||"没有更多数据",border:!0,stripe:!0,type:"selection"},on:{"selection-change":function(t){arguments[0]=t=n.$handleEvent(t),n.selectionChange.apply(void 0,arguments)}}},[e("uni-tr",[e("uni-th",{attrs:{align:"center"}},[n._v("用户名")]),e("uni-th",{attrs:{align:"center"}},[n._v("角色")]),e("uni-th",{attrs:{align:"center"}},[n._v("手机号")]),e("uni-th",{attrs:{align:"center"}},[n._v("邮箱")]),e("uni-th",{attrs:{align:"center"}},[n._v("用户状态")]),e("uni-th",{attrs:{width:"170",align:"center"}},[n._v("创建时间")]),e("uni-th",{attrs:{width:"204",align:"center"}},[n._v("操作")])],1),n._l(i,(function(t,i){return e("uni-tr",{key:i},[e("uni-td",{attrs:{align:"center"}},[n._v(n._s(t.username))]),e("uni-td",{attrs:{align:"center"}},[n._v(n._s(t.role?t.role.map((function(n){return n.role_name})).join("、"):"-"))]),e("uni-td",{attrs:{align:"center"}},[n._v(n._s(t.mobile))]),e("uni-td",{attrs:{align:"center"}},[n._v(n._s(t.email))]),e("uni-td",{attrs:{align:"center"}},[n._v(n._s(t.role&&t.role.includes("admin")?"启用":n.parseUserStatus(t.status)))]),e("uni-td",{attrs:{align:"center"}},[e("uni-dateformat",{attrs:{date:t.register_date,threshold:[0,0]}})],1),e("uni-td",{attrs:{align:"center"}},[t._id===n.userInfo._id?e("v-uni-view",[n._v("-")]):e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"primary"},on:{click:function(e){arguments[0]=e=n.$handleEvent(e),n.navigateTo("./edit?id="+t._id)}}},[n._v("修改")]),e("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"warn"},on:{click:function(e){arguments[0]=e=n.$handleEvent(e),n.confirmDelete(t)}}},[n._v("删除")])],1)],1)],1)}))],2),e("v-uni-view",{staticClass:"uni-pagination-box"},[e("uni-pagination",{attrs:{"show-icon":!0,"page-size":a.size,total:a.count},on:{change:function(t){arguments[0]=t=n.$handleEvent(t),n.onPageChanged.apply(void 0,arguments)}},model:{value:a.current,callback:function(t){n.$set(a,"current",t)},expression:"pagination.current"}})],1)]}}])})],1)],1)},r=[]},"5df1":function(n,t,e){"use strict";(function(n){var i=e("4ea4");e("caad"),e("a15b"),e("d81d"),e("4d63"),e("ac1f"),e("25f0"),e("2532"),e("498a"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(e("5530")),r=e("2f62"),u=(n.database(),"uni-id-users,uni-id-roles"),s="register_date desc",o=["username","role_name","mobile","email"],c=10,l=1,d={data:function(){return{query:"",where:"",orderby:s,collectionName:u,options:{pageSize:c,pageCurrent:l}}},computed:(0,a.default)({},(0,r.mapState)("user",["userInfo"])),methods:{getWhere:function(){var n=this.query.trim();if(!n)return"";var t=new RegExp(n,"i");return o.map((function(n){return t+".test("+n+")"})).join(" || ")},search:function(n){var t=this.getWhere(),e=t===this.where;this.where=t,e&&this.loadData()},loadData:function(){var n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.udb.loadData({clear:n})},onPageChanged:function(n){this.$refs.udb.loadData({current:n.current})},navigateTo:function(n){var t=this;uni.navigateTo({url:n,events:{refreshData:function(){t.loadData()}}})},selectedItems:function(){var n=this.$refs.udb.dataList;return this.selectedIndexs.map((function(t){return n[t]._id}))},delTable:function(){var n=this.selectedItems(),t=this.userInfo._id;n.includes(t)?uni.showToast({icon:"none",title:"当前账号不能删除自己",duration:1500}):this.$refs.udb.remove(n)},selectionChange:function(n){this.selectedIndexs=n.detail.index},confirmDelete:function(n){var t=this.userInfo._id;t!==n._id?this.$refs.udb.remove(n._id):uni.showToast({icon:"none",title:"不允许账号删除自己",duration:1500})},parseUserStatus:function(n){return 0===n?"启用":1===n?"禁用":2===n?"审核中":3===n?"审核拒绝":"未知"}}};t.default=d}).call(this,e("a9ff")["default"])},"7b06":function(n,t,e){"use strict";e.r(t);var i=e("49cc"),a=e("c608");for(var r in a)"default"!==r&&function(n){e.d(t,n,(function(){return a[n]}))}(r);e("f7d3");var u,s=e("f0c5"),o=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"1335266b",null,!1,i["a"],u);t["default"]=o.exports},"905c":function(n,t,e){"use strict";e.r(t);var i=e("f824"),a=e.n(i);for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);t["default"]=a.a},c608:function(n,t,e){"use strict";e.r(t);var i=e("5df1"),a=e.n(i);for(var r in i)"default"!==r&&function(n){e.d(t,n,(function(){return i[n]}))}(r);t["default"]=a.a},f7d3:function(n,t,e){"use strict";var i=e("ff11"),a=e.n(i);a.a},f824:function(n,t,e){"use strict";e("a9e3"),e("e25e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=e("9006"),a={name:"uniDateformat",props:{date:{type:[Object,String,Number],default:function(){return Date.now()}},locale:{type:String,default:"zh"},threshold:{type:Array,default:function(){return[0,0]}},format:{type:String,default:"yyyy/MM/dd hh:mm:ss"},refreshRate:{type:[Number,String],default:0}},data:function(){return{refreshMark:0}},computed:{dateShow:function(){return this.refreshMark,(0,i.friendlyDate)(this.date,{locale:this.locale,threshold:this.threshold,format:this.format})}},watch:{refreshRate:{handler:function(){this.setAutoRefresh()},immediate:!0}},methods:{refresh:function(){this.refreshMark++},setAutoRefresh:function(){var n=this;clearInterval(this.refreshInterval),this.refreshRate&&(this.refreshInterval=setInterval((function(){n.refresh()}),parseInt(this.refreshRate)))}}};t.default=a},ff11:function(n,t,e){var i=e("3f37");"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var a=e("4f06").default;a("22a1c968",i,!0,{sourceMap:!1,shadowMode:!1})}}]);