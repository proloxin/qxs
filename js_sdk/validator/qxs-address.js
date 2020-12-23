// 校验规则由 schema 生成，请不要直接修改当前文件，如果需要请在uniCloud控制台修改schema
// uniCloud: https://unicloud.dcloud.net.cn/



export default {
  "name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "收件人"
  },
  "addr": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "收件地址"
  },
  "phone": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "收件手机号"
  },
    "comment": {
      "rules": [
        {
          "format": "string"
        }
      ],
      "label": "备注"
    }
}
