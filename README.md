# helper-js
JS助手库

> url
```javascript
    const {url} = require('helper-js');

    //获取URL参数
    url.getParams();
    
    //获取hash参数
    url.getHash();
    
    //获取url，默认获取当前URL不带参数，传入params为需要生成URL的参数对象
    //url.getUrl(params);
    
    //当前URL为http://example.com?a=1
    url.getUrl();//http://example.com
    url.getUrl({token:1});//http://example.com?token=1
```

> platform
```javascript
    const {platform} = require('helper-js');

    //判断是否IOS
    platform.isIOS();
    
    //判断是否安卓
    platform.isAndroid();
    
    //判断是否微信
    platform.isWeiXin();
    
    //手机端初始化
    //1.禁止微信浏览器修改字体大小
    //2.修正IOS失去焦点后页面滚动条问题
    //3.修正安卓浏览器键盘弹出导致页面高度变化问题
    platform.mobileInit();
```

> cache
```javascript
    const {cache} = require('helper-js');

    cache.setItem('键名','键值','过期秒数');
    
    cache.getItem('键名');
    
    cache.removeItem('键名');
```

> validate
```javascript
    const {validate} = require('helper-js');

    //是否为空，用于判断必填
    validate.required(value);
    
    //最大长度
    validate.max(value, length);
    
    //最小长度
    validate.min(value, length);
    
    //最小值
    validate.minValue(value, min);
    
    //最大值
    validate.maxValue(value, max);
    
    //是否数值
    validate.numeric(value);
    
    //长度是否相等
    validate.exactLength(value, length);
    
    //是否手机号
    validate.mobilePhone('手机号');
```

> date 

|  Format   | Description  |
|  ----     |   ----       |
|  YY       |  两位数的年份 |
|  YYYY       |  四位数的年份 |
|  M       |  月份，从 1 开始 |
|  MM       |  月份，两位数（补0） |
|  D       |  月份里的一天 |
|  DD       |  月份里的一天，两位数（补0） |
|  H       |  24小时 |
|  HH       |  24小时(补0) |
|  h       |  12小时 |
|  hh       |  12小时(补0) |
|  m       |  分钟 |
|  mm       |  分钟，两位数(补0) |
|  s       |  秒 |
|  ss       |  秒 两位数(补0) |

```javascript
    const {date} = require('helper-js');
    date.format(new Date(), 'YY年M月D日');
```