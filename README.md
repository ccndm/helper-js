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
