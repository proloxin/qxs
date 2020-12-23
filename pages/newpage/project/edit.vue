<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" validateTrigger="bind">
			<uni-forms-item name="no" required label="项目编号">
				<uni-easyinput placeholder="项目编号" v-model="formData.no" />
			</uni-forms-item>
			<uni-forms-item name="name" label="项目名称">
				<uni-easyinput placeholder="项目名称" v-model="formData.name" />
			</uni-forms-item>
			<uni-forms-item name="soldprice" label="抢购价格">
				<uni-easyinput placeholder="抢购价格(元)" v-model="formData.soldprice" />
			</uni-forms-item>
			<uni-forms-item name="buyprice" label="回收价格">
				<uni-easyinput placeholder="回收价格(元)" v-model="formData.buyprice" />
			</uni-forms-item>
			<uni-forms-item name="desc" label="项目简介">
				<uni-easyinput type="textarea" placeholder="项目简介" v-model="formData.desc" />
			</uni-forms-item>

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
	import validator from '@/js_sdk/validator/qxs-project.js';

	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'qxs-project';

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
					"name": "",
					"soldprice": "",
					"buyprice": "",
					"desc": ""
				},
				formOptions: {},
				rules: {
					...getValidator(["no", "name",  "desc","buyprice","soldprice"])
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
				//console.log(this.formData)
				// 使用 uni-clientDB 提交数据
				db.collection(dbCollectionName).doc(this.formDataId).update({
					no:this.formData.no,
					name:this.formData.name,
					soldprice:this.formData.soldprice*100,
					buyprice:this.formData.buyprice*100,
					desc:this.formData.desc
				}).then((res) => {
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
						this.formData = {
							no:data.no,
							name:data.name,
							soldprice:data.soldprice/100,
							buyprice:data.buyprice/100,
							desc:data.desc
							
						}
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
