
<template>
  <view class="uni-container">
    <uni-forms ref="form" v-model="formData" :rules="rules" validateTrigger="bind">
      <uni-forms-item name="no" required label="项目编号">
  <uni-easyinput placeholder="项目编号 , 必填" v-model="formData.no" />
</uni-forms-item>
<uni-forms-item name="name" label="项目名称">
  <uni-easyinput placeholder="项目名称" v-model="formData.name" />
</uni-forms-item>
<uni-forms-item name="soldprice" label="抢购价格">
  <uni-easyinput placeholder="抢购价格" v-model="formData.soldprice" />
</uni-forms-item>
<uni-forms-item name="buyprice" label="指导回收价">
  <uni-easyinput placeholder="指导回收价" v-model="formData.buyprice" />
</uni-forms-item>
<uni-forms-item name="desc" label="项目简介">
  <uni-easyinput  type="textarea" placeholder="项目简介" v-model="formData.desc" />
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
        formOptions: {},
        formData: {
  "no": "",
  "name": "",
  "soldprice": "",
  "buyprice": "",
  "desc": ""
},
        rules: {
          ...getValidator(["no","name","soldprice","buyprice","desc"])
        }
      }
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
			res.soldprice *= 100
			res.buyprice *= 100
          this.submitForm(res)
        }).catch((errors) => {
          uni.hideLoading()
        })
      },

      submitForm(value) {
        // 使用 uni-clientDB 提交数据
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

