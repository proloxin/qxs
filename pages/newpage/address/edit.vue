<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" validateTrigger="bind">
			<uni-forms-item name="name" label="收件人">
				<uni-easyinput v-model="formData.name" />
			</uni-forms-item>
			<uni-forms-item name="addr" label="收件地址">
				<uni-easyinput v-model="formData.addr" />
			</uni-forms-item>
			<uni-forms-item name="phone" label="收件手机号">
				<uni-easyinput v-model="formData.phone" />
			</uni-forms-item>
			<uni-forms-item name="comment" label="备注">
				<uni-easyinput v-model="formData.comment" />
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
	import validator from '@/js_sdk/validator/qxs-address.js';

	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'qxs-address';

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
					"name": "",
					"addr": "",
					"phone": "",
					"comment":""
				},
				formOptions: {},
				rules: {
					...getValidator(["name", "addr", "phone"])
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
					res.show = res.addr + '，' + res.name + '，' + res.phone + ' (' + res.comment +')'
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
