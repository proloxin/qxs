<template>
	<view>
		<view class="uni-header">
			<view class="uni-group">
				<view class="uni-title">我的报单</view>
				<view class="uni-sub-title"></view>
			</view>
			<view class="uni-group">
				<!-- <input class="uni-search" type="text" v-model="query" placeholder="请输入搜索内容" />
				<button class="uni-button" type="default" size="mini" @click="search">搜索</button> -->
				<button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button>
				<button class="uni-button" type="default" size="mini" @click="refreshData">刷新</button>
				
				<!-- <button class="uni-button" type="default" size="mini" @click="delTable">批量删除</button> -->
			</view>
		</view>
		
		<view class="uni-container">
			<uni-clientdb ref="udb" :collection="collectionName" :options="options" :where="where" page-data="replace" field="no{no,name,soldprice,buyprice},amount,express,expressno,address,receive,receivesu,close,create_date,userid,lock,closeprice"
			 :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
			 v-slot:default="{data,pagination,loading,error}">
				<uni-table :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection"
				 @selection-change="selectionChange">
					<uni-tr>
						<uni-th align="center">序号</uni-th>
						<uni-th align="center">项目编号</uni-th>
						<uni-th align="center">项目名称</uni-th>
						<uni-th align="center">指导回收单价（元）</uni-th>
						<uni-th align="center">商品数量</uni-th>
						<uni-th align="center">指导回收总价（元）</uni-th>
						<uni-th align="center">本单预估利润（元）</uni-th>
						<uni-th align="center">快递名称</uni-th>
						<uni-th align="center">快递单号</uni-th>
						<uni-th align="center">收件信息</uni-th>

						<uni-th align="center">报单时间</uni-th>
						<uni-th align="center">签收状态</uni-th>

						<uni-th align="center">实际结算利润</uni-th>
						<uni-th width="204" align="center">操作</uni-th>

					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td align="center">{{index+1}}</uni-td>
						<uni-td align="center">{{item.no[0].no}}</uni-td>
						<uni-td align="center">{{item.no[0].name}}</uni-td>
						<uni-td align="center">{{item.no[0].buyprice/100}}</uni-td>
						<uni-td align="center">{{item.amount}}</uni-td>
						<uni-td align="center">{{(item.amount)*(item.no[0].buyprice*100)/10000}}</uni-td>
						<uni-td align="center">{{(item.amount)*(item.no[0].buyprice-item.no[0].soldprice)*100/10000}}</uni-td>
						<uni-td align="center">{{item.express}}</uni-td>
						<uni-td align="center">{{item.expressno}}</uni-td>
						<uni-td align="center">{{item.address}}</uni-td>

						<uni-td align="center">
							<uni-dateformat :date="item.create_date" :threshold="[0, 0]" />
						</uni-td>
						<uni-td align="center">
							<button v-if="item.receive==true" type="default" size="mini" disabled="" class="uni-button" style="background-color: #4CD964;color: #FFFFFF;">已签收</button>
							<button v-else class="uni-button" disabled="" size="mini" style="background-color: #FFFFFF;color: #333333;" type="default">未签收</button>
						</uni-td>

						<uni-td align="center">
							<button v-if="item.close==true" type="default" size="mini" disabled="" class="uni-button" style="background-color: #4CD964;color: #FFFFFF;">{{(item.amount)*(item.closeprice-item.no[0].soldprice)*100/10000}}元</button>
							<button v-else class="uni-button" disabled="" style="background-color: #FFFFFF;color: #333333;" size="mini" type="default">未结算</button>
						</uni-td>
						
						<uni-td align="center">
							<view class="uni-group">
								<button v-if="item.lock==true" class="uni-button" size="mini" type="default" disabled="">已锁单</button>
								<button v-else @click="confirmDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
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
		
	const db = uniCloud.database()
	// 表查询配置
	const dbCollectionName = 'qxs-orders,qxs-project'
	const dbOrderBy = 'create_date desc' // 排序字段
	const dbSearchFields = ['no.no', 'no.name', 'express', 'expressno'] // 支持模糊搜索的字段列表
	// 分页配置
	const pageSize = 20
	const pageCurrent = 1

	export default {

		data() {
			return {
				query: '',
				where: '', //userinfo需预先加载为字符串，不支持变量
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
		onLoad() {
			//console.log(this.userInfo)
			let whstr = 'uid =="' + this.userInfo._id + '"'
			this.where = whstr
		},
		methods: {
			refreshData() {
				uni.showLoading({
					mask: true
				})
				let whstr = 'uid =="' + this.userInfo._id + '"'
				this.where = whstr
				setTimeout(() => {
					uni.hideLoading()
				}, 700)
				this.$refs.udb.loadData()
			},
			// getWhere() {
			// 	const query = this.query.trim()
			// 	if (!query) {
			// 		return ''
			// 	}
			// 	const queryRe = new RegExp(query, 'i')
			// 	return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			// },
			// search() {

			// 	const newWhere = this.getWhere()
			// 	const isSameWhere = newWhere === this.where
			// 	this.where = newWhere
			// 	if (isSameWhere) { // 相同条件时，手动强制刷新
			// 		this.loadData()
			// 	}
			// },
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
			// 多选处理
			selectedItems() {
				var dataList = this.$refs.udb.dataList
				return this.selectedIndexs.map(i => dataList[i]._id)
			},
			//批量删除
			delTable() {
				this.$refs.udb.remove(this.selectedItems())
			},
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			confirmDelete(id) {
				this.$refs.udb.remove(id)
			},

		}
	}
</script>
<style>
</style>
