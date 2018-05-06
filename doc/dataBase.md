```js
meta: {
  createAt: {//registDate
    type: Date,
    default: Date.now()
  },
  updateAt: {//lastLogin
    type: Date,
    default: Date.now()
  },
}
```

> user

字段名|字段类型|备注|默认值
--|--|--|--
_id|ObjectId|唯一id
user_name| String| 用户昵称
user_email| String| 用户邮箱
user_password| String| 用户密码
verified|Boolean|用户注册邮箱是否通过|false
user_loginIp|[String]|用户登录时的IP
user_friends|[ObjectId]|用户的好友

> file

字段名|字段类型|备注|默认值 
--|--|--|--
_id|ObjectId|唯一id
file_title|String|文件名
file_type|String|文件类型
file_content|String|文件内容
file_owner|ObjectId|文件拥有者
file_partner|[ObjectId]|文件协作者

> notice

字段名|字段类型|备注|默认值
--|--|--|--
_id|ObjectId|唯一id
notice_title|ObjectId|通知标题
notice_content|ObjectId|通知内容
notice_read|Boolean|通知是否已读|false
notice_sender|String|通知发送者
notice_receiver|String|通知接收者

