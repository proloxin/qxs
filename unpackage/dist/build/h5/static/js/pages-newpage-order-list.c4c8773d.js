(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-newpage-order-list"],{1351:function(t,e,n){"use strict";n.r(e);var a=n("29f6"),i=n("905c");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);var u,s=n("f0c5"),o=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"808c1684",null,!1,a["a"],u);e["default"]=o.exports},"18aa":function(t,e,n){"use strict";n.r(e);var a=n("3b5f"),i=n("b8fe");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);var u,s=n("f0c5"),o=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"6da969e3",null,!1,a["a"],u);e["default"]=o.exports},"29f6":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-text",[t._v(t._s(t.dateShow))])},r=[]},"3b5f":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={uniClientdb:n("10d0").default,uniTable:n("b23a").default,uniTr:n("56d9").default,uniTh:n("1795").default,uniTd:n("994c").default,uniDateformat:n("1351").default,uniPagination:n("3f8a").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"uni-header"},[n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-view",{staticClass:"uni-title"},[t._v("我的报单")]),n("v-uni-view",{staticClass:"uni-sub-title"})],1),n("v-uni-view",{staticClass:"uni-group"},[n("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navigateTo("./add")}}},[t._v("新增")]),n("v-uni-button",{staticClass:"uni-button",attrs:{type:"default",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.refreshData.apply(void 0,arguments)}}},[t._v("刷新")])],1)],1),n("v-uni-view",{staticClass:"uni-container"},[n("uni-clientdb",{ref:"udb",attrs:{collection:t.collectionName,options:t.options,where:t.where,"page-data":"replace",field:"no{no,name,soldprice,buyprice},amount,express,expressno,address,receive,receivesu,close,create_date,userid,lock,closeprice",orderby:t.orderby,getcount:!0,"page-size":t.options.pageSize,"page-current":t.options.pageCurrent},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.data,i=e.pagination,r=e.loading,u=e.error;return[n("uni-table",{attrs:{loading:r,emptyText:u.message||"没有更多数据",border:!0,stripe:!0,type:"selection"},on:{"selection-change":function(e){arguments[0]=e=t.$handleEvent(e),t.selectionChange.apply(void 0,arguments)}}},[n("uni-tr",[n("uni-th",{attrs:{align:"center"}},[t._v("序号")]),n("uni-th",{attrs:{align:"center"}},[t._v("项目编号")]),n("uni-th",{attrs:{align:"center"}},[t._v("项目名称")]),n("uni-th",{attrs:{align:"center"}},[t._v("指导回收单价（元）")]),n("uni-th",{attrs:{align:"center"}},[t._v("商品数量")]),n("uni-th",{attrs:{align:"center"}},[t._v("指导回收总价（元）")]),n("uni-th",{attrs:{align:"center"}},[t._v("本单预估利润（元）")]),n("uni-th",{attrs:{align:"center"}},[t._v("快递名称")]),n("uni-th",{attrs:{align:"center"}},[t._v("快递单号")]),n("uni-th",{attrs:{align:"center"}},[t._v("收件信息")]),n("uni-th",{attrs:{align:"center"}},[t._v("报单时间")]),n("uni-th",{attrs:{align:"center"}},[t._v("签收状态")]),n("uni-th",{attrs:{align:"center"}},[t._v("实际结算利润")]),n("uni-th",{attrs:{width:"204",align:"center"}},[t._v("操作")])],1),t._l(a,(function(e,a){return n("uni-tr",{key:a},[n("uni-td",{attrs:{align:"center"}},[t._v(t._s(a+1))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.no[0].no))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.no[0].name))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.no[0].buyprice/100))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.amount))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.amount*(100*e.no[0].buyprice)/1e4))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.amount*(e.no[0].buyprice-e.no[0].soldprice)*100/1e4))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.express))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.expressno))]),n("uni-td",{attrs:{align:"center"}},[t._v(t._s(e.address))]),n("uni-td",{attrs:{align:"center"}},[n("uni-dateformat",{attrs:{date:e.create_date,threshold:[0,0]}})],1),n("uni-td",{attrs:{align:"center"}},[1==e.receive?n("v-uni-button",{staticClass:"uni-button",staticStyle:{"background-color":"#4CD964",color:"#FFFFFF"},attrs:{type:"default",size:"mini",disabled:""}},[t._v("已签收")]):n("v-uni-button",{staticClass:"uni-button",staticStyle:{"background-color":"#FFFFFF",color:"#333333"},attrs:{disabled:"",size:"mini",type:"default"}},[t._v("未签收")])],1),n("uni-td",{attrs:{align:"center"}},[1==e.close?n("v-uni-button",{staticClass:"uni-button",staticStyle:{"background-color":"#4CD964",color:"#FFFFFF"},attrs:{type:"default",size:"mini",disabled:""}},[t._v(t._s(e.amount*(e.closeprice-e.no[0].soldprice)*100/1e4)+"元")]):n("v-uni-button",{staticClass:"uni-button",staticStyle:{"background-color":"#FFFFFF",color:"#333333"},attrs:{disabled:"",size:"mini",type:"default"}},[t._v("未结算")])],1),n("uni-td",{attrs:{align:"center"}},[n("v-uni-view",{staticClass:"uni-group"},[1==e.lock?n("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"default",disabled:""}},[t._v("已锁单")]):n("v-uni-button",{staticClass:"uni-button",attrs:{size:"mini",type:"warn"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.confirmDelete(e._id)}}},[t._v("删除")])],1)],1)],1)}))],2),n("v-uni-view",{staticClass:"uni-pagination-box"},[n("uni-pagination",{attrs:{"show-icon":!0,"page-size":i.size,total:i.count},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.onPageChanged.apply(void 0,arguments)}},model:{value:i.current,callback:function(e){t.$set(i,"current",e)},expression:"pagination.current"}})],1)]}}])})],1)],1)},r=[]},"905c":function(t,e,n){"use strict";n.r(e);var a=n("f824"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},a4e0:function(t,e,n){"use strict";(function(t){var a=n("4ea4");n("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("5530")),r=n("2f62"),u=(t.database(),"qxs-orders,qxs-project"),s="create_date desc",o=20,c=1,l={data:function(){return{query:"",where:"",orderby:s,collectionName:u,options:{pageSize:o,pageCurrent:c}}},computed:(0,i.default)({},(0,r.mapState)("user",["userInfo"])),onLoad:function(){var t='uid =="'+this.userInfo._id+'"';this.where=t},methods:{refreshData:function(){uni.showLoading({mask:!0});var t='uid =="'+this.userInfo._id+'"';this.where=t,setTimeout((function(){uni.hideLoading()}),700),this.$refs.udb.loadData()},loadData:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.$refs.udb.loadData({clear:t})},onPageChanged:function(t){this.$refs.udb.loadData({current:t.current})},navigateTo:function(t){var e=this;uni.navigateTo({url:t,events:{refreshData:function(){e.loadData()}}})},selectedItems:function(){var t=this.$refs.udb.dataList;return this.selectedIndexs.map((function(e){return t[e]._id}))},delTable:function(){this.$refs.udb.remove(this.selectedItems())},selectionChange:function(t){this.selectedIndexs=t.detail.index},confirmDelete:function(t){this.$refs.udb.remove(t)}}};e.default=l}).call(this,n("a9ff")["default"])},b8fe:function(t,e,n){"use strict";n.r(e);var a=n("a4e0"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},f824:function(t,e,n){"use strict";n("a9e3"),n("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("9006"),i={name:"uniDateformat",props:{date:{type:[Object,String,Number],default:function(){return Date.now()}},locale:{type:String,default:"zh"},threshold:{type:Array,default:function(){return[0,0]}},format:{type:String,default:"yyyy/MM/dd hh:mm:ss"},refreshRate:{type:[Number,String],default:0}},data:function(){return{refreshMark:0}},computed:{dateShow:function(){return this.refreshMark,(0,a.friendlyDate)(this.date,{locale:this.locale,threshold:this.threshold,format:this.format})}},watch:{refreshRate:{handler:function(){this.setAutoRefresh()},immediate:!0}},methods:{refresh:function(){this.refreshMark++},setAutoRefresh:function(){var t=this;clearInterval(this.refreshInterval),this.refreshRate&&(this.refreshInterval=setInterval((function(){t.refresh()}),parseInt(this.refreshRate)))}}};e.default=i}}]);