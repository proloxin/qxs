(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-newpage-address-list"],{"0db7":function(t,n,e){"use strict";e.r(n);var i=e("1f15"),a=e("8335");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);var r,s=e("f0c5"),o=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"a6b7061a",null,!1,i["a"],r);n["default"]=o.exports},"1f15":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}));var i={uniClientdb:e("10d0").default,uniTable:e("b23a").default,uniTr:e("56d9").default,uniTh:e("1795").default,uniTd:e("994c").default,uniPagination:e("3f8a").default},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[e("v-uni-view",{staticClass:"uni-header"},[e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-view",{staticClass:"uni-title"},[t._v("收货信息列表")]),e("v-uni-view",{staticClass:"uni-sub-title"})],1),e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-input",{staticClass:"uni-search",attrs:{type:"text",placeholder:"请输入搜索内容"},model:{value:t.query,callback:function(n){t.query=n},expression:"query"}}),e("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.search.apply(void 0,arguments)}}},[t._v("搜索")]),e("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.navigateTo("./add")}}},[t._v("新增")]),e("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.delTable.apply(void 0,arguments)}}},[t._v("批量删除")])],1)],1),e("v-uni-view",{staticClass:"uni-container"},[e("uni-clientdb",{ref:"udb",attrs:{collection:t.collectionName,options:t.options,where:t.where,"page-data":"replace",orderby:t.orderby,getcount:!0,"page-size":t.options.pageSize,"page-current":t.options.pageCurrent},scopedSlots:t._u([{key:"default",fn:function(n){var i=n.data,a=n.pagination,u=n.loading,r=n.error;return[e("uni-table",{attrs:{loading:u,emptyText:r.message||"没有更多数据",border:!0,stripe:!0,type:"selection"},on:{"selection-change":function(n){arguments[0]=n=t.$handleEvent(n),t.selectionChange.apply(void 0,arguments)}}},[e("uni-tr",[e("uni-th",{attrs:{align:"center"}},[t._v("收件人")]),e("uni-th",{attrs:{align:"center"}},[t._v("收件地址")]),e("uni-th",{attrs:{align:"center"}},[t._v("收件手机号")]),e("uni-th",{attrs:{align:"center"}},[t._v("备注")]),e("uni-th",{attrs:{width:"204",align:"center"}},[t._v("操作")])],1),t._l(i,(function(n,i){return e("uni-tr",{key:i},[e("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.name))]),e("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.addr))]),e("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.phone))]),e("uni-td",{attrs:{align:"center"}},[t._v(t._s(n.comment))]),e("uni-td",{attrs:{align:"center"}},[e("v-uni-view",{staticClass:"uni-group"},[e("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navigateTo("./edit?id="+n._id)}}},[t._v("修改")]),e("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"warn"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirmDelete(n._id)}}},[t._v("删除")])],1)],1)],1)}))],2),e("v-uni-view",{staticClass:"uni-pagination-box"},[e("uni-pagination",{attrs:{"show-icon":!0,"page-size":a.size,total:a.count},on:{change:function(n){arguments[0]=n=t.$handleEvent(n),t.onPageChanged.apply(void 0,arguments)}},model:{value:a.current,callback:function(n){t.$set(a,"current",n)},expression:"pagination.current"}})],1)]}}])})],1)],1)},u=[]},"810b":function(t,n,e){"use strict";(function(t){e("a15b"),e("d81d"),e("4d63"),e("ac1f"),e("25f0"),e("498a"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;t.database();var i="qxs-address",a="",u=["name","addr","phone","comment"],r=20,s=1,o={data:function(){return{query:"",where:"",orderby:a,collectionName:i,options:{pageSize:r,pageCurrent:s}}},methods:{getWhere:function(){var t=this.query.trim();if(!t)return"";var n=new RegExp(t,"i");return u.map((function(t){return n+".test("+t+")"})).join(" || ")},search:function(){var t=this.getWhere(),n=t===this.where;this.where=t,n&&this.loadData()},loadData:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.udb.loadData({clear:t})},onPageChanged:function(t){this.$refs.udb.loadData({current:t.current})},navigateTo:function(t){var n=this;uni.navigateTo({url:t,events:{refreshData:function(){n.loadData()}}})},selectedItems:function(){var t=this.$refs.udb.dataList;return this.selectedIndexs.map((function(n){return t[n]._id}))},delTable:function(){this.$refs.udb.remove(this.selectedItems())},selectionChange:function(t){this.selectedIndexs=t.detail.index},confirmDelete:function(t){this.$refs.udb.remove(t)}}};n.default=o}).call(this,e("a9ff")["default"])},8335:function(t,n,e){"use strict";e.r(n);var i=e("810b"),a=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=a.a}}]);