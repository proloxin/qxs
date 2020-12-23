// 校验规则由 schema 生成，请不要直接修改当前文件，如果需要请在uniCloud控制台修改schema
// uniCloud: https://unicloud.dcloud.net.cn/



export default {
  "no": {
    "rules": [
      {
        "required": true,
        "errorMessage": "{label}不能为空"
      },
      {
        "format": "string",
        "errorMessage": "{label}不能为空"
      }
    ],
    "label": "项目编号"
  },
  "amount": {
    "rules": [
      {
        "required": true,
        "errorMessage": "{label}不能为空"
      },
      {
        "format": "int",
        "errorMessage": "{label}不能为空"
      }
    ],
    "label": "商品数量",
    "defaultValue": 1
  },
  "express": {
    "rules": [
      {
        "required": true,
        "errorMessage": "{label}不能为空"
      },
      {
        "format": "string",
        "errorMessage": "{label}不能为空"
      }
    ],
    "label": "快递名称"
  },
  "expressno": {
    "rules": [
      {
        "required": true,
        "errorMessage": "{label}不能为空"
      },
      {
        "format": "string",
        "errorMessage": "{label}不能为空"
      }
    ],
    "label": "快递单号"
  },
  "address": {
    "rules": [
      {
        "required": true,
        "errorMessage": "{label}不能为空"
      },
      {
        "format": "string",
        "errorMessage": "{label}不能为空"
      }
    ],
    "label": "收件信息"
  },
  "userid": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "报单人"
  },
  "receive": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "label": "签收状态",
    "defaultValue": false
  },
  "receivesu": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "签收人"
  },
  "close": {
    "rules": [
      {
        "format": "bool"
      }
    ],
    "label": "结算状态",
    "defaultValue": false
  }
}
