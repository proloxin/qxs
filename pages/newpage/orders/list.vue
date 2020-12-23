<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<view class="uni-title">报单列表</view>
				<view class="uni-sub-title"></view>
			</view>
			<view class="uni-group ">
				<!-- <input class="uni-search" type="text" v-model="query" placeholder="请输入搜索内容" />
				<button class="uni-button" type="default" size="mini" @click="search">搜索</button> -->
				<!-- <button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button> -->
				<button class="uni-button" type="default" size="mini" @click="showPop">批量改单价</button>
				<button class="uni-button" type="default" size="mini" @click="lockTable">批量锁单</button>
				<button class="uni-button" type="default" size="mini" @click="receiveTable">批量签收</button>
				<button class="uni-button" type="default" size="mini" @click="closeTable">批量结算</button>
				<button class="uni-button" type="default" size="mini" @click="delTable">批量删除</button>
			</view>
		</view>
		<view class="uni-group search-ctr">
			<input class="uni-search" type="text" v-model="query1" placeholder="项目编号" />
			<input class="uni-search" type="text" v-model="query2" placeholder="项目名" />
			<input class="uni-search" type="text" v-model="query3" placeholder="快递单号" />
			<input class="uni-search" type="text" v-model="query4" placeholder="报单人" />
			<input class="uni-search" type="text" v-model="query5" placeholder="团队/群" />
			<button class="uni-button" type="default" size="mini" @click="search">搜索</button>
			<button class="uni-button" type="default" size="mini" @click="searchClear">清除搜索</button>
			<button class="uni-button" type="primary" size="mini" @click="searchNoRec">未签收</button>
		</view>
		<!-- 弹出框，修改价格 -->
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog title="输入收购单价" placeholder="单位:元,最多2位小数!" mode="input"  :before-close="true" @close="closePop" @confirm="confirmPop"></uni-popup-dialog>
		</uni-popup>
		
		<view class="uni-container">
			<uni-clientdb ref="udb" :collection="collectionName" :options="options" :where="where" page-data="replace" field="no{no,name,soldprice,buyprice},amount,express,expressno,address,userid{username,nickname,wx_unionid,comment},receive,receivesu,close,create_date,lock,closeprice"
			 :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
			 v-slot:default="{data,pagination,loading,error}">
				<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection"
				 @selection-change="selectionChange">
					<uni-tr>
						<uni-th align="center">序号</uni-th>
						<uni-th align="center">项目编号</uni-th>
						<uni-th align="center">项目名称</uni-th>
						<uni-th align="center">回收单价（元）</uni-th>
						<uni-th align="center">商品数量</uni-th>
						<uni-th align="center">回收总价（元）</uni-th>
						<uni-th align="center">快递名称</uni-th>
						<uni-th align="center">快递单号</uni-th>
						<uni-th align="center">收件手机号</uni-th>
						<uni-th align="center">报单人</uni-th>
						<uni-th align="center">真实姓名</uni-th>
						<uni-th align="center">微信号</uni-th>
						<uni-th align="center">团队名称</uni-th>
						<uni-th align="center">报单时间</uni-th>
						<uni-th align="center">锁单</uni-th>
						<uni-th align="center">签收状态</uni-th>
						<uni-th align="center">签收人</uni-th>
						<uni-th align="center">结算状态</uni-th>
						<uni-th width="204" align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">{{index+1}}</uni-td>
						<uni-td align="center">{{item.no[0].no}}</uni-td>
						<uni-td align="center">{{item.no[0].name}}</uni-td>
						<!-- 回收单价需自己填 -->
						<uni-td align="center">{{item.closeprice/100}}</uni-td>
						<uni-td align="center">{{item.amount}}</uni-td>
						<uni-td align="center">{{(item.amount)*(item.closeprice*100)/10000}}</uni-td>
						<uni-td align="center">{{item.express}}</uni-td>
						<uni-td align="center">{{item.expressno}}</uni-td>
						<uni-td align="center">{{item.address}}</uni-td>
						<uni-td align="center">{{item.userid[0].username}}</uni-td>
						<uni-td align="center">{{item.userid[0].nickname}}</uni-td>
						<uni-td align="center">{{item.userid[0].wx_unionid}}</uni-td>
						<uni-td align="center">{{item.userid[0].comment}}</uni-td>
						<uni-td align="center">
							<uni-dateformat :date="item.create_date" :threshold="[0, 0]" />
						</uni-td>
						<uni-td align="center">
							<button v-if="item.lock==true" type="default" size="mini" disabled="" class="uni-button" style="background-color: #FFFFFF;color: #333333;">已锁单</button>
							<button v-else @click="lock(item)" class="uni-button" style="background-color: #4CD964;color: #FFFFFF;" 
							 size="mini" type="default">锁单</button>
						</uni-td>
						<uni-td align="center">
							<button v-if="item.receive==true" type="default" size="mini" disabled="" class="uni-button" style="background-color: #FFFFFF;color: #333333;">已签收</button>
							<button v-else @click="checkReceive(item._id)" class="uni-button" style="background-color: #4CD964;color: #FFFFFF;"
							 size="mini" type="default">签收</button>
						</uni-td>
						<uni-td align="center">{{item.receivesu}}</uni-td>
						<uni-td align="center">
							<button v-if="item.close==true" type="default" size="mini" disabled="" class="uni-button" style="background-color: #FFFFFF;color: #333333;">已结算</button>
							<button v-else @click="checkClose(item)" class="uni-button" style="background-color: #4CD964;color: #FFFFFF;"
							 size="mini" type="default">结算</button>
						</uni-td>
						<uni-td align="center">
							<view class="uni-group">
								<button @click="navigateTo('./edit?id='+item._id)" class="uni-button" size="mini" type="primary">修改</button>
								<button @click="confirmDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="uni-pagination-box">
					<uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current" :total="pagination.count"
					 @change="onPageChanged" />
				</view>
			</uni-clientdb>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'


	const db = uniCloud.database()
	// 表查询配置
	const dbCollectionName = 'qxs-orders,qxs-project,uni-id-users'
	const dbOrderBy = 'create_date desc' // 排序字段
	const dbSearchFields = ['userid.username', 'no.no', 'no.name', 'express', 'expressno', 'userid.nickname',
		'userid.wx_unionid', 'receivesu'
	] // 支持模糊搜索的字段列表
	// 分页配置
	const pageSize = 20
	const pageCurrent = 1

	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				query1: '',
				query2: '',
				query3: '',
				query4: '',
				query5: '',
				where: '',
				orderby: dbOrderBy,
				collectionName: dbCollectionName,
				options: {
					pageSize,
					pageCurrent
				}

			}
		},
		computed: {
			...mapState('user', ['userInfo']),
		},
		methods: {
			showPop(){
				this.$refs.popup.open()
			},
			closePop(done){
				done()
			},
			//批量改单价
			confirmPop(done,value){
				let str = JSON.stringify(this.selectedItems())
				db.collection('qxs-orders')
				//.where('_id in'+this.selectedItems())
				.where('_id in '+str)
				.update({
					"closeprice": value*100,
				}).then((res) => {
					uni.showToast({
						title: '批量改单价成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
					done()
				})
				
			},
			// getWhere() {
			// 	const query = this.query1.trim()
			// 	if (!query) {
			// 		return ''
			// 	}
			// 	const queryRe = new RegExp(query, 'i')
			// 	return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			// },
			searchClear(){
				this.where =''
			},
			searchNoRec(){
				this.where = 'receive == false'
			},
			search() {
				let mywhere = []
				if(this.query1.trim()){
					mywhere.push(" /"+this.query1.trim()+"/i.test(no.no)")
				}
				if(this.query2.trim()){
					mywhere.push(" /"+this.query2.trim()+"/i.test(no.name)")
				}
				if(this.query3.trim()){
					mywhere.push(" /"+this.query3.trim()+"/i.test(expressno)")
				}
				if(this.query4.trim()){
					mywhere.push(" /"+this.query4.trim()+"/i.test(userid.username)")
				}
				if(this.query5.trim()){
					mywhere.push(" /"+this.query5.trim()+"/i.test(userid.comment)")
				}
				
				//const newWhere = this.getWhere()
				//console.log(mywhere.join("&&"))
				this.where = mywhere.join("&&")
				//const isSameWhere = newWhere === this.where
				//this.where = newWhere
				// if (isSameWhere) { // 相同条件时，手动强制刷新
				// 	this.loadData()
				// }
			},
			loadData(clear = true) {
				this.$refs.udb.loadData({
					clear
				})
			},
			onPageChanged(e) {
				this.$refs.udb.loadData({
					current: e.current
				})
			},
			navigateTo(url) {
				uni.navigateTo({
					url,
					events: {
						refreshData: () => {
							this.loadData()
						}
					}
				})
			},
			// 多选处理，返回[_id]
			selectedItems() {
				var dataList = this.$refs.udb.dataList
				return this.selectedIndexs.map(i => dataList[i]._id)
			},
			//多选，返回[{mobile,balance}]，balance为预估价格
			selectedItemsObj() {
				var dataList = this.$refs.udb.dataList
				
				return this.selectedIndexs.map(i => {
					return {
						mobile: dataList[i].userid[0].username,
						balance: dataList[i].amount * (dataList[i].no[0].buyprice - dataList[i].no[0].soldprice)
					}
				})
			},
			//多选，返回[{mobile,balance}],balance为结算价格
			selectedItemsObj2() {
				var dataList = this.$refs.udb.dataList
				
				return this.selectedIndexs.map(i => {
					
					return {
						mobile: dataList[i].userid[0].username,
						balance: dataList[i].amount * (dataList[i].closeprice - dataList[i].no[0].soldprice),
						decbalance: (dataList[i].amount)*(dataList[i].no[0].buyprice - dataList[i].no[0].soldprice),
						closeprice: dataList[i].closeprice
					}
				})
			},
	
			//批量删除
			delTable() {
				this.$refs.udb.remove(this.selectedItems())
			},
			
			//批量锁单   
			lockTable() {
				let str = JSON.stringify(this.selectedItems())			
				db.collection('qxs-orders')
				//.where('_id in'+this.selectedItems())
				.where('_id in '+str)
				.update({
					"lock": true,
				}).then((res) => {
					uni.showToast({
						title: '批量锁单成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
				console.log(this.selectedItemsObj())
				this.selectedItemsObj().forEach(i=>{
					uniCloud.callFunction({
					    name: 'inc_order_sort',
					    data: { 
							mobile: i.mobile,
							balance: i.balance
						}
					  })
					  .then(res => {
						  console.log(res)
					  })
					  .catch(err=>{
						  console.log(err)
					  })
				})
			},
			//批量签收
			receiveTable() {
				db.collection('qxs-orders')
				.where('_id in '+JSON.stringify(this.selectedItems()))
				.update({
					"receive": true,
					"receivesu": this.userInfo.username
				}).then((res) => {
					uni.showToast({
						title: '批量签收成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			//批量结算  
			closeTable() {
				db.collection('qxs-orders')
				.where('_id in '+ JSON.stringify(this.selectedItems()))
				.update({
					"close": true,
				}).then((res) => {
					uni.showToast({
						title: '批量结算成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
				
				this.selectedItemsObj2().forEach(i=>{
					uniCloud.callFunction({
					    name: 'inc_balance_sort',
					    data: { 
							mobile: i.mobile,
							balance: i.balance,
							decbalance: i.decbalance,
							closeprice: i.closeprice
						}
					  })
					  .then(res => {});
				})
			},
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			confirmDelete(id) {
				this.$refs.udb.remove(id)
			},
			//签收
			checkReceive(value) {
				// 使用 uni-clientDB 提交数据
				db.collection(dbCollectionName).doc(value).update({
					"receive": true,
					"receivesu": this.userInfo.username
				}).then((res) => {
					uni.showToast({
						title: '签收成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			//结算
			checkClose(item) {
				// 使用 uni-clientDB 提交数据
				db.collection(dbCollectionName).doc(item._id).update({
					"close": true,
				}).then((res) => {
					uni.showToast({
						title: '结算成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
				
				//调用函数，改sort表
				uniCloud.callFunction({
				    name: 'inc_balance_sort',
				    data: { 
						mobile: item.userid[0].username,
						balance: (item.amount)*(item.closeprice-item.no[0].soldprice),
						decbalance: (item.amount)*(item.no[0].buyprice-item.no[0].soldprice),
						closeprice: item.closeprice
					}
				  })
				  .then(res => {
					  console.log(res)
				  })
				  .catch(err=>{
					  console.log(err)
				  })
			},
			//锁单
			lock(item){
				db.collection(dbCollectionName).doc(item._id).update({
					"lock": true,
				
				}).then((res) => {
					uni.showToast({
						title: '锁单成功'
					})
				
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
				//调用函数，改sort表
				uniCloud.callFunction({
				    name: 'inc_order_sort',
				    data: { 
						mobile: item.userid[0].username,
						balance: (item.amount)*(item.no[0].buyprice-item.no[0].soldprice)
					}
				  })
				  .then(res => {});
			}
		}
	}
</script>
<style>


@media (max-width:500px) {
	.uni-group{
		display: inline-block;
		/* margin-top: 30px;; */
	}
	.uni-header{
		height: auto;
	}

}

@media (max-width:550px) {
	.uni-group{
		display: inline-block;
	}
	.uni-header{
		height: auto;
	}
}

@media (max-width:1024px) {

}

</style>
