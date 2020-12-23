<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" :rules="rules" validateTrigger="bind" @submit="submit">
			<uni-forms-item name="mobile" label="手机号">
				<input placeholder="手机号" @input="binddata('mobile', $event.detail.value)" class="uni-input-border" :value="formData.mobile" />
			</uni-forms-item>
			<uni-forms-item name="nickname" label="真实姓名">
				<input placeholder="请输入姓名" @input="binddata('nickname', $event.detail.value)" class="uni-input-border" :value="formData.nickname" />
			</uni-forms-item>
			
			<!-- <uni-forms-item name="role" label="角色列表">
				<uni-data-checklist v-if="roles.length" multiple :range="roles" @change="binddata('role', $event.detail.value)"></uni-data-checklist>
				<view v-else class="uni-form-item-empty">
					暂无
				</view>
			</uni-forms-item> -->
			
			<!-- <uni-forms-item name="email" label="邮箱">
				<input placeholder="邮箱" @input="binddata('email', $event.detail.value)" class="uni-input-border" :value="formData.email" />
			</uni-forms-item> -->
			<uni-forms-item name="wx_unionid" label="微信号">
				<input placeholder="微信号" @input="binddata('wx_unionid', $event.detail.value)" class="uni-input-border" :value="formData.wx_unionid" />
			</uni-forms-item>
			<uni-forms-item name="comment" label="团队名称">
				<input placeholder="请输入团队名称" @input="binddata('comment', $event.detail.value)" class="uni-input-border" :value="formData.comment" />
			</uni-forms-item>
			<uni-forms-item name="password" label="初始密码">
				<input placeholder="请输入初始密码" @input="binddata('password', $event.detail.value)" class="uni-input-border" :value="formData.password" />
			</uni-forms-item>
			<uni-forms-item name="status" label="是否启用">
				<switch @change="binddata('status', $event.detail.value)" :checked="formData.status" />
			</uni-forms-item>
			<view class="uni-button-group">
				<button style="width: 100px;" type="primary" class="uni-button" @click="submitForm">提交</button>
				<navigator open-type="navigateBack" style="margin-left: 15px;"><button style="width: 100px;" class="uni-button">返回</button></navigator>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import validator from '@/js_sdk/validator/uni-id-users.js';

	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'uni-id-users';

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
					"nickname": "",
					"password": "",
					"role": [],
					"mobile": "",
					"wx_unionid": "",		//微信号
					"comment": "",			//微信群编号
					"status": true  //默认启用
				},
				rules: {
					...getValidator(["nickname", "password", "role", "mobile", "wx_unionid","comment"]),
					"status": {
						"rules": [{
							"format": "bool"
						}]
					}
				},
				roles: []
			}
		},
		onLoad() {
			//this.loadroles()
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submitForm() {
				this.$refs.form.submit();
			},

			/**
			 * 表单提交
			 * @param {Object} event 回调参数 Function(callback:{value,errors})
			 */
			submit(event) {
				const {
					value,
					errors
				} = event.detail
				
				// 表单校验失败页面会提示报错 ，要停止表单提交逻辑
				if (errors) {
					return
				}
				uni.showLoading({
					title: '提交中...',
					mask: true
				})
				// 是否启用功能的数据类型转换， 0 正常， 1 禁用
				if (typeof value.status === "boolean") {
					value.status = Number(!value.status)
				}
				
				value.role = ["user"]
				value.username = value.mobile
				// db.collection(dbCollectionName).add(value).then(res => {
				// 		uni.showToast({
				// 			title: '新增成功'
				// 		})
				// 		this.getOpenerEventChannel().emit('refreshData')
				// 		setTimeout(() => uni.navigateBack(), 500)
				//     }).catch(err => {
				// 		uni.showModal({
				// 			content: err.message || '请求服务失败',
				// 			showCancel: false
				// 		})
				// 	}).finally(() => {
				// 		uni.hideLoading()
				// })
				
				
				this.$request('system/user/addUser', value)
				    .then(res => {
						
						uni.showToast({
							title: '新增成功'
						})
						this.getOpenerEventChannel().emit('refreshData')
						setTimeout(() => uni.navigateBack(), 500)
				    }).catch(err => {
						
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
					}).finally(err => {
				        uni.hideLoading()
				    })
					
				//插入排序表，创建用户的同时创建该键值	
				db.collection('user-sort').add({
					mobile:this.formData.mobile,
					wx:this.formData.wx_unionid,
					balance:0,
					tempbalance:0,
					count_order:0,
					balance_today:0
				}).then(res=>{
					//console.log(res)
				}).catch(err=>{
					//console.log(err)
				})
			},
			// loadroles() {
			// 	db.collection('uni-id-roles').limit(500).get().then(res => {
			// 		const roleIds = []
			// 		this.roles = res.result.data.map(item => {
			// 			roleIds.push(item.role_id)
			// 			return {
			// 				value: item.role_id,
			// 				text: item.role_name
			// 			}
			// 		})
			// 		if (roleIds.indexOf('admin') === -1) {
			// 			this.roles.unshift({
			// 				value: 'admin',
			// 				text: '超级管理员'
			// 			})
			// 		}
			// 	}).catch(err => {
			// 		uni.showModal({
			// 			title: '提示',
			// 			content: err.message,
			// 			showCancel: false
			// 		})
			// 	})
			// }
		}
	}
</script>
