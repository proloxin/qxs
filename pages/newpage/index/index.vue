<template>
	<div class="dashboard-container">
		<div class="dashboard-editor-container">
		<view style="margin-bottom: 10px; font-weight: bold;color: #676767;">
			钱先生报单系统
		</view>

			<el-row :gutter="10" class="panel-group">
				<el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
					<div class="card-panel blue">
						<div class="card-panel-description">
							<div class="card-panel-text">
								今日交易额
							</div>
							<span class="card-panel-num">{{jrjy}}</span>
							<span class="card-panel-unit">元</span>
						</div>
					</div>
				</el-col>
				<el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
					<div class="card-panel pink">
						<div class="card-panel-description">
							<div class="card-panel-text">
								今日利润
							</div>
							<span class="card-panel-num">{{jrlr}}</span>
							<span class="card-panel-unit">元</span>
						</div>
					</div>
				</el-col>
				<el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
					<div class=" purple card-panel">
						<div class="card-panel-description">
							<div class="card-panel-text">
								今日报单数
							</div>
							<span class="card-panel-num">{{jrbd}}</span>
							<span class="card-panel-unit">单</span>
						</div>
					</div>
				</el-col>
				<el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
					<div class="card-panel aqua">
						<div class="card-panel-description">
							<div class="card-panel-text">
								待收快递数
							</div>
							<span class="card-panel-num">{{dskd}}</span>
							<span class="card-panel-unit">件</span>
						</div>
					</div>
				</el-col>
				<el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
					<div class="card-panel orange">
						<div class="card-panel-description">
							<div class="card-panel-text">
								待结算单数
							</div>
							<span class="card-panel-num">{{djs}}</span>
							<span class="card-panel-unit">单</span>
						</div>
					</div>
				</el-col>
				<el-col :xs="8" :sm="8" :lg="4" class="card-panel-col">
					<div class="card-panel gray">
						<div class="card-panel-description">
							<div class="card-panel-text">
								总利润
							</div>
							<span class="card-panel-num">{{zlr}}</span>
							<span class="card-panel-unit">元</span>
						</div>
					</div>
				</el-col>
			</el-row>

			<el-row :gutter="32" class="chat">
				<!-- chart列 -->
				<el-col :xs="24" :sm="24" :lg="16">
					<view class="chart-wrapper">
						
							<view class="qiun-columns" style="background-color: #FFFFFF;">
								<u-charts :canvas-id="LineList.id" :chartType="LineList.chartType" cWidth="430" cHeight="250" :opts="LineList.opts" :ref="LineList.id"/>
							</view>
						
					</view>
				</el-col>
				<!-- rank列 -->
				<el-col :xs="24" :sm="24" :lg="8">
					<el-row :gutter="30" class="rank-wrapper">
						<div class="top-10">
							<div style="text-align: center;margin:5px 0;font-weight: bold;color: rgba(0, 0, 0, 0.45)">抢单达人榜</div>
							<ul>
								<li v-for="(item,id) in qddrArr" :key="item.mobile">
									<a>{{strToStar(item.wx)}}</a><a style="float: right;margin-right: 20px;font-size: 16px;font-weight: bold;">{{item.count_order}}单</a>
								</li>
							</ul>
						</div>
					</el-row>

					<el-row :gutter="30">
						<div class="top-10">
							<div style="text-align: center;margin:5px 0;font-weight: bold;color: rgba(0, 0, 0, 0.45)">今日收益排行榜</div>
							<ul>
								<li v-for="(item,id) in zsyArr" :key="item.mobile">
									<a>{{strToStar(item.wx)}}</a><a style="float: right;margin-right: 10px;font-size: 16px;font-weight: bold;">￥{{item.balance_today/100}}</a>
								</li>
							</ul>
						</div>

					</el-row>
				</el-col>
			</el-row>

		</div>
	</div>
</template>

<script>
	import uCharts from '@/components/u-charts/component.vue';
	import Charts from '@/components/u-charts/u-charts.js';
	import {
		mapState
	} from 'vuex'
	const db = uniCloud.database()

	function getToday0() {
		let today = new Date();
		today.setHours(0, 0, 0, 0);
		return today.getTime();
	}

	export default {
		name: 'Dashboard',
		components: {
			uCharts,
			Charts
		},
		data() {
			return {
				
				LineList:{
					chartType: "line",
					id: 'aa',
					opts: {
						categories:[],
						series:[
							{
								color:'#facc14',
								data:[],
								index:0,
								legendShape:'rect',
								name:"会员利润统计",
								show:true,
								
							}
						]
					},
				},
				cWidth:'',
				cHeight:'',
				
				
				qddrArr: [], //抢单达人榜
				zsyArr: [], //今日收益榜
				djs: 0, //待结算单
				dskd: 0, //待签收数
				jrbd: 0, //今日报单数
				jrlr: 0, //今日利润
				jrjy: 0, //今日交易额
				zlr: 0,
			}
		},
		computed: {
			...mapState('user', ['userInfo']),
		},
		onLoad() {
			this.show()

		},
		methods: {
			show() {
				db.collection("user-sort")
					.orderBy('count_order desc')
					.limit(5)
					.get()
					.then((res) => {
						this.qddrArr.push(...res.result.data)
					}).catch((err) => {

					})
				db.collection("user-sort")
					.orderBy('balance_today desc')
					.limit(5)
					.get()
					.then((res) => {
						this.zsyArr.push(...res.result.data)
					}).catch((err) => {

					})
				db.collection("qxs-orders")
					.where('close == false')
					.get({
						getCount: true
					})
					.then((res) => {
						this.djs = res.result.count
					}).catch((err) => {

					})
				db.collection("qxs-orders")
					.where('receive == false')
					.get({
						getCount: true
					})
					.then((res) => {
						this.dskd = res.result.count
					}).catch((err) => {

					})
				let time0 = 'create_date > ' + getToday0()
				db.collection("qxs-orders")
					.where(time0)
					.get({
						getCount: true
					})
					.then((res) => {
						this.jrbd = res.result.count
					}).catch((err) => {

					})
				// db.collection("qxs-total-price")
				// 	.orderBy("create_date")
				// 	.limit(5)
				// 	.get()
				// 	.then((res) => {
				// 		console.log(res)
				// 		for(let i=0;i<res.result.data.length;i++){
				// 			this.LineList.opts.categories.push(res.result.data[i].date) 
				// 			this.LineList.opts.series[0].data.push(res.result.data[i].price) 
							
				// 		}
				// 		console.log(this.LineList.opts)
				// 	}).catch((err) => {
				// 		console.log(err)
				// 	})	

				uniCloud.callFunction({
						name: 'sum_sort_today'
					})
					.then(res => {
						this.jrlr = res.result.data[0].count / 100
					});

				uniCloud.callFunction({
						name: 'sum_closeprice_today'
					})
					.then(res => {
						this.jrjy = res.result.data[0].count / 100
					});

				uniCloud.callFunction({
						name: 'sum_totle_price'
					})
					.then(res => {
						this.zlr = res.result.data[0].count / 100
					});

			},
			strToStar(str){
				return str.substr(0,4)+'***'+str.substr(5,str.split('').length)
			}

		}
	}
</script>

<style lang="scss" scoped>

	.dashboard-editor-container {
		padding: 32px;
		background-color: rgb(240, 242, 245);
		position: relative;
		max-width: 1100px;
		.chat {
			margin-top: 10px;
		}

		.chart-wrapper {
			background: #fff;
			height: 400px;

			padding: 16px 16px 0;
			margin-bottom: 32px;
		}

		.rank-wrapper {
			margin-bottom: 20px;

		}

	}



	.panel-group {

		.card-panel-col {
			margin-bottom: 12px;
		}
		
		.blue{
			border: 3px solid #FFFFFF;
			border-left-color: #cae260;
		}
		
		.pink{
			border: 3px solid #FFFFFF;
			border-left-color: #FFC0CB;
		}
		
		.purple{
			border: 3px solid #FFFFFF;
			border-left-color: #EE82EE;
		}
		
		.aqua{
			border: 3px solid #FFFFFF;
			border-left-color: #00FFFF;
		}
		
		.orange{
			border: 3px solid #FFFFFF;
			border-left-color: 	#FFA500;
		}
		
		.gray{
			border: 3px solid #FFFFFF;
			border-left-color: #800000;
		}
		
		.card-panel {

			height: 80px;
			cursor: pointer;
			font-size: 10px;
			position: relative;
			overflow: hidden;
			color: #666;
			background: #fff;
			box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
			//border-color: rgba(0, 0, 0, .05);

			&:hover {
				.card-panel-icon-wrapper {
					color: #fff;
				}

			}

			.card-panel-description {
				float: left;
				font-weight: bold;
				margin: 15px 10px 6px 10px;

				.card-panel-text {
					line-height: 18px;
					color: rgba(0, 0, 0, 0.45);
					font-size: 14px;
					margin-bottom: 12px;
				}

				.card-panel-num {
					font-size: 18px;
				}

				.card-panel-unit {
					font-size: 14px;
					color: rgba(0, 0, 0, 0.45);
					margin-left: 5px;
				}
			}
		}
	}

	.top-10 {

		float: left;
		width: 100%;
		max-width: 340px;
		background: #fff;
		border: 1px solid #FFF;
		box-shadow: #d0d0d0 1px 1px 10px 0px;
	}

	.top-10 ul {
		counter-reset: section;
	}

	.top-10 li {
		float: left;
		width: 260px;
		border-bottom: 1px solid #b8c2cc;
		line-height: 32px;
		height: 32px;
		overflow: hidden;
		color: #525C66;
		font-size: 12px;

	}

	.top-10 li:before {
		counter-increment: section;
		content: counter(section);
		display: inline-block;
		padding: 0 12px;
		margin-right: 10px;
		height: 14px;
		line-height: 14px;
		background: #b8c2cc;
		color: #fff;
		border-radius: 3px;
		font-size: 8px
	}

	.top-10 li:nth-child(1):before {
		background: #df0d10
	}

	.top-10 li:nth-child(2):before {
		background: #b46d2f
	}

	.top-10 li:nth-child(3):before {
		background: #227ab4
	}



	@keyframes octocat-wave {

		0%,
		100% {
			transform: rotate(0)
		}

		20%,
		60% {
			transform: rotate(-25deg)
		}

		40%,
		80% {
			transform: rotate(10deg)
		}
	}

	@media (max-width:500px) {}
		.chart-wrapper {
			display: block;
		}
		.card-panel-text {	
			font-size: 12px;
		}
	@media (max-width:550px) {
		.panel-group .card-panel .card-panel-description .card-panel-text{
			font-size: 10px;
		}
		.panel-group .card-panel .card-panel-description .card-panel-num {
			font-size: 16px;
		}
		.panel-group .card-panel .card-panel-description .card-panel-unit{
			font-size: 10px;
		}
		
	}

	@media (max-width:1024px) {
		.chart-wrapper {
			display: none;
		}

	}
</style>
