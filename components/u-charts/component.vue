<template>
	<canvas v-if="canvasId" :id="canvasId" :canvasId="canvasId" :style="{'width':cWidth*pixelRatio*1.5+'px','height':cHeight*pixelRatio*1.5+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':cWidth*(pixelRatio-1)/2+'px','margin-top':cHeight*(pixelRatio-1)/2+'px'}"
	 @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @error="error">
	</canvas>
</template>

<script>
	import uCharts from './u-charts.js';
	var canvases = {};
	const db = uniCloud.database()
	
	export default {
		data(){
			return{
				
				newDatacategories:[],
				newDataseries:[{
								color:'#facc14',
								data:[],
								index:0,
								legendShape:'rect',
								name:"会员利润统计",
								show:true,
								
							}]
			}
		},
		props: {
			chartType: {
				required: true,
				type: String,
				default: 'column'
			},
			opts: {
				required: true,
				type: Object,
				default () {
					return null;
				},
			},
			canvasId: {
				type: String,
				default: 'u-canvas',
			},
			cWidth: {
				default: 375,
			},
			cHeight: {
				default: 250,
			},
			pixelRatio: {
				type: Number,
				default: 1,
			},
		},
		mounted() {
			this.init();
			this.getData()
		},
		methods: {
			init() {
				switch (this.chartType) {
					case 'column':
						this.initColumnChart();
						break;
					case 'line':
						this.initLineChart();
						break;
					default:
						break;
				}
			},
			initColumnChart() {
				canvases[this.canvasId] = new uCharts({
					$this: this,
					canvasId: this.canvasId,
					type: 'column',
					legend: true,
					fontSize: 15,
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					animation: true,
					categories: this.opts.categories,
					series: this.opts.series,
					enableScroll: true,
					xAxis: {
						disableGrid: true,
						itemCount: 10,
						// scrollShow: true
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 0,
						max: 250,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					dataLabel: true,
					width: this.cWidth * this.pixelRatio+130,
					height: this.cHeight * this.pixelRatio+130,
					extra: {
						column: {
							type: 'group',
						}
					}
				});
			},
			initLineChart() {
				canvases[this.canvasId] = new uCharts({
					$this: this,
					canvasId: this.canvasId,
					type: 'line',
					fontSize: 12,
					legend: false,
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					categories: this.opts.categories,
					series: this.opts.series,
					animation: true,
					enableScroll: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						itemCount: 5,
						// scrollShow: true
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 0,
						max: 250,
						// format: (val) => {
						// 	return val.toFixed(0)
						// }
					},
					width: this.cWidth * this.pixelRatio+130,
					height: this.cHeight * this.pixelRatio+130,
					extra: {
						line: {
							type: 'curve'
						}
					}
				});
			},
			
			getData(){
				db.collection("qxs-total-price")
					.orderBy("_id desc")
					.limit(5)
					.get()
					.then((res) => {
						//console.log(res)
						for(let i=0;i<res.result.data.length;i++){
							
							this.newDataseries[0].data.unshift(res.result.data[i].price/100) 
							this.newDatacategories.unshift(res.result.data[i].date) 
						}
						this.changeData('aa',this.newDataseries,this.newDatacategories)
						//console.log(this.LineList.opts)
					}).catch((err) => {
						console.log(err)
					})	
			},
			// 这里仅作为示例传入两个参数，cid为canvas-id,newdata为更新的数据，需要更多参数请自行修改
			changeData(cid,series,categories) {
				canvases[cid].updateData({
					series: series,
					categories: categories
				});
			},
			touchStart(e) {
				canvases[this.canvasId].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
				canvases[this.canvasId].scrollStart(e);
			},
			touchMove(e) {
				canvases[this.canvasId].scroll(e);
			},
			touchEnd(e) {
				canvases[this.canvasId].scrollEnd(e);
			},
			error(e) {
				console.log(e)
			}
		},
	};
</script>

<style scoped>
	.charts {
		width: 100%;
		height: 100%;
		flex: 1;
		background-color: #FFFFFF;
	}
</style>
