// 校验规则由 schema 生成，请不要直接修改当前文件，如果需要请在uniCloud控制台修改schema
// uniCloud: https://unicloud.dcloud.net.cn/



export default {
  "no": {
    "rules": [
      {
        "required": true,
        "errorMessage": "项目编号为必填项"
      },
      {
        "format": "string",
        "errorMessage": "项目编号为必填项"
      }
    ],
    "label": "项目编号"
  },
  "name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "项目名称"
  },
  "soldprice": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "抢购价格"
  },
  "buyprice": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "label": "回收价格"
  },
  "desc": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "项目简介"
  }
}

