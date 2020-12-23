<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" validateTrigger="bind">
			<uni-forms-item name="no" label="项目编号">
				<uni-easyinput v-model="formData.no" disabled />
			</uni-forms-item>
			<uni-forms-item name="amount" label="商品数量">
				<uni-easyinput type="number" v-model="formData.amount" />
			</uni-forms-item>
			<uni-forms-item name="express" label="快递名称">
				<uni-easyinput v-model="formData.express" disabled />
			</uni-forms-item>
			<uni-forms-item name="expressno" label="快递单号">
				<uni-easyinput v-model="formData.expressno" disabled />
			</uni-forms-item>
			<uni-forms-item name="phone" label="收件手机号">
				<uni-easyinput v-model="formData.phone" disabled />
			</uni-forms-item>
			<uni-forms-item name="userid" label="报单人">
				<uni-easyinput v-model="formData.userid" disabled />
			</uni-forms-item>
			<!-- <uni-forms-item name="receive" label="签收状态">
				<switch @change="binddata('receive', $event.detail.value)" :checked="formData.receive" />
			</uni-forms-item> -->
			<uni-forms-item name="receivesu" label="签收人">
				<uni-easyinput v-model="formData.receivesu" disabled/>
			</uni-forms-item>
			<!-- <uni-forms-item name="close" label="结算状态">
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
		data() {
			return {
				formData: {
					"no": "",
					"amount": 1,
					"express": "",
					"expressno": "",
					"phone": "",
					"userid": "",
					"receive": false,
					"receivesu": "",
					"close": false
				},
				formOptions: {},
				rules: {
					...getValidator(["no", "amount", "express", "expressno", "phone", "userid", "receive", "receivesu", "close"])
				}
			}
		},
		onLoad(e) {
			const id = e.id
			this.formDataId = id
			this.getDetail(id)
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
					this.submitForm(res)
				}).catch((errors) => {
					uni.hideLoading()
				})
			},

			submitForm(value) {
				// 使用 uni-clientDB 提交数据
				db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
					uni.showToast({
						title: '修改成功'
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

			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({
					mask: true
				})
				db.collection(dbCollectionName).doc(id).get().then((res) => {
					const data = res.result.data[0]
					if (data) {
						this.formData = data
					}
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
