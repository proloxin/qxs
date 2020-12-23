<template>
	<view class="uni-container">
		<!-- 弹出框，项目搜索 -->
		<uni-popup ref="popup" type="message">
		    <uni-popup-message type="success" :message=proMsg :duration="5000"></uni-popup-message>
		</uni-popup>
		
		<uni-forms ref="form" v-model="formData" :rules="rules" validateTrigger="bind">
			<uni-forms-item name="no" label="项目搜索" >
				<uni-easyinput v-model="proName" placeholder="记不清编号？在此输入关键词搜索"/>
				<button class="uni-button" style="display: block;" size="mini" @click="click_Search">搜索</button>
			</uni-forms-item>
			<uni-forms-item name="no" label="项目编号" required="">
				<uni-easyinput v-model="formData.no" @blur="blur"/>
			</uni-forms-item>
			<uni-forms-item  label="项目名称" >
				<uni-easyinput v-model="projectName" disabled=""/>
			</uni-forms-item>
			<uni-forms-item name="amount" label="商品数量">
				<uni-easyinput type="number" v-model="formData.amount" />
			</uni-forms-item>
			<uni-forms-item name="express" label="快递名称" required="">
				<uni-easyinput v-model="formData.express" />
			</uni-forms-item>
			<uni-forms-item name="expressno" label="快递单号" required="">
				<uni-easyinput v-model="formData.expressno" />
			</uni-forms-item>
			<uni-forms-item name="address" label="收件地址" required="">
				<uni-data-checkbox :multiple="false" v-model="formData.address" collection="qxs-address" field="show as text, phone as value"  />
			</uni-forms-item>
			<!-- <uni-forms-item name="userid" label="报单人">
			  <uni-easyinput v-model="formData.userid" />
			</uni-forms-item>
			<uni-forms-item name="receive" label="签收状态">
			  <switch @change="binddata('receive', $event.detail.value)" :checked="formData.receive" />
			</uni-forms-item>
			<uni-forms-item name="receivesu" label="签收人">
			  <uni-easyinput v-model="formData.receivesu" />
			</uni-forms-item>
			<uni-forms-item name="close" label="结算状态">
			  <switch @change="binddata('close', $event.detail.value)" :checked="formData.close" />
			</uni-forms-item> -->

			<view class="uni-button-group">
				<button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
				<navigator open-type="navigateBack" style="margin-left: 15px;">
					<button class="uni-button" style="width: 100px;">返回</button>
				</navigator>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	import validator from '@/js_sdk/validator/qxs-orders.js';

	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'qxs-orders';

	function getValidator(fields) {
		let reuslt = {}
		for (let key in validator) {
			if (fields.includes(key)) {
				reuslt[key] = validator[key]
			}
		}
		return reuslt
	}

	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				proName:'',		//搜索用
				proMsg:'',
				projectName:'',
				formOptions: {},
				formData: {
					"no": "",
					"amount": 1,
					"express": "",
					"expressno": "",
					"address": [],
					"userid": "",
				},
				rules: {
					...getValidator(["no", "amount", "express", "expressno"])
				},
				perPrice:0	//单利润
			}
		},
		computed: {
			...mapState('user', ['userInfo']),
			
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			click_Search(){
				let str = "/" + this.proName.trim() + "/.test(name)"
				let sst = ""
				db.collection('qxs-project')
				  .where(str).get()
				  .then((res)=>{
					  if(res.result.data.length>0){
						for(let i=0;i<res.result.data.length;i++){ 
							sst = sst + "编号:"+res.result.data[i].no+", 名称："+res.result.data[i].name+"\n"
							this.proMsg =sst 
						}
					  }else{
						  this.proMsg = '没有搜索到，请联系管理员核实'
					  }
				  }).catch((err)=>{
					this.proMsg = '网络错误'
				  })
				
				this.$refs.popup.open()
			},
			//项目编号失去焦点触发
			blur(){
				this.getProjectName()
			},
			//查询项目名称
			getProjectName(){
				db.collection('qxs-project')
				  .where({
				    no: this.formData.no //传统MongoDB写法，不是jql写法。实际开发中推荐使用jql写法
				  }).get()
				  .then((res)=>{
				    this.projectName = res.result.data[0].name
					this.perPrice = res.result.data[0].buyprice-res.result.data[0].soldprice
				  }).catch((err)=>{
					this.projectName = '没有该项目，请检查项目编号'
				  })
			},
			/**
			 * 触发表单提交
			 */
			submit() {
				if(this.projectName){
					uni.showLoading({
						mask: true
					})
					let arr =[]
					this.$refs.form.submit().then((res) => {
						res.userid = this.userInfo.username
						res.uid = this.userInfo._id
						
						this.submitForm(res)
						//this.addBalance()
					}).catch((errors) => {
						console.log(errors)
						uni.hideLoading()
					})
				}else{
					uni.showToast({
						title: '项目编号错误！没有该项目！',
						icon: 'none'
					})
				}
				
			},

			submitForm(value) {
				
				//使用 uni-clientDB 提交数据
				db.collection(dbCollectionName).add(value).then((res) => {
					
					uni.showToast({
						title: '新增成功'
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
				
			}
		}
	}
</script>
