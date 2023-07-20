/** sdk版本号 ,跳转appId解析错误问题*/
window.ELEX_APP_VERSION = "0.0.1";
/** 分配的项目唯一id */
window.ELEX_APP_ID = "999999";
/** 默认打开BI打点数据通讯 */
window.ELEX_APP_BI_ONOFF = true;
/** 开启debug打印log*/
window.ELEX_BI_APP_LOG = false;
/** 开发和运行环境 */
window.ELEX_APP_IS_DEVELOP = true;
/** 报错信息捕获提交 */
window.ELEX_APP_ERROR = true;
/** 本地缓存数据是否开启 */
window.ELEX_APP_STORAGE = false;
/** 数据缓存的key */
window.ELEX_STORAGE_KEY = 'ELEX_STATS_KEY';
/** 数据缓存的value的数组长度 */
window.ELEX_STORAGE_MAX_LENGTH = 200;
/** 数据缓存的心跳清理时间*100*/
window.ELEX_STORAGE_TIMTS = 100;
/** uid和opendid数据缓存的key */
window.ELEX_STATS_UID_AND_OPENID_KEY = 'ELEX_STATS_UID_AND_OPENID_KEY';
/** 发送心跳强制进行刷新时间*100*/
window.ELEX_CHECK_HEARTBEAT_TIMTS = 100;
/** 是否开启sdk设置唯一标识 用以区分用户 */
window.ELEX_APP_IS_OPEN_UNIQUE_ID = false;
/** 唯一标识ID 和本身uid重复 暂时放ext里面*/
window.ELEX_APP_BI_UNIQUE_ID='';
/** channel*/
window.ELEX_APP_BI_CHANNEL_ID='default';
/** country*/
window.ELEX_APP_BI_COUNTRY_ID='CN';
/** platform*/
window.ELEX_APP_BI_PLATFORM_ID='web_h5';
/** deviceOs设备操作系统*/
window.ELEX_APP_BI_DEVICEOS_ID='';
/** deviceModel设备机型*/
window.ELEX_APP_BI_DEVICEMODEL_ID='';
/** deviceBrand设备品牌*/
window.ELEX_APP_BI_DEVICEBRAND_ID='';
/** 打包发送开关 */
window.ELEX_APP_QUEUE_SPLICE_ONOFF=true;
/** 打包发送条数 */
window.ELEX_APP_QUEUE_SPLICE=10;
/** action白名单 */
window.ELEX_ACTION_WHITELIST='';
/** action黑名单 */
window.ELEX_ACTION_BLACKLIST='';
//初始化配置
window.elex_bi_init=function(params){
    if(params.ELEX_APP_ID != null){
        window.ELEX_APP_ID = params.ELEX_APP_ID;
    }
    if(params.ELEX_APP_BI_ONOFF != null){
        window.ELEX_APP_BI_ONOFF = params.ELEX_APP_BI_ONOFF;
    }
    if(params.ELEX_BI_APP_LOG != null){
        window.ELEX_BI_APP_LOG = params.ELEX_BI_APP_LOG;
    }
    if(params.ELEX_APP_IS_DEVELOP != null){
        window.ELEX_APP_IS_DEVELOP = params.ELEX_APP_IS_DEVELOP;
    }
    if(params.ELEX_APP_STORAGE != null){
        window.ELEX_APP_STORAGE = params.ELEX_APP_STORAGE;
    }
    if(params.ELEX_STORAGE_MAX_LENGTH != null){
        window.ELEX_STORAGE_MAX_LENGTH = params.ELEX_STORAGE_MAX_LENGTH;
    }
    if(params.ELEX_STORAGE_TIMTS != null){
        window.ELEX_STORAGE_TIMTS = params.ELEX_STORAGE_TIMTS;
    }
    if (params.ELEX_APP_IS_OPEN_UNIQUE_ID) {
      window.ELEX_APP_IS_OPEN_UNIQUE_ID = params.ELEX_APP_IS_OPEN_UNIQUE_ID;
      if(params.ELEX_APP_BI_UNIQUE_ID != null){
        window.ELEX_APP_BI_UNIQUE_ID = params.ELEX_APP_BI_UNIQUE_ID;
        localStorage.setItem('ELEX_APP_BI_UNIQUE_ID', params.ELEX_APP_BI_UNIQUE_ID)
      } else {
        if (!localStorage.getItem('ELEX_APP_BI_UNIQUE_ID')) {
          var tempUniqueId = 'elex-' + parseInt(Math.random() * 100000000) + '-' + new Date().getTime()
          window.ELEX_APP_BI_UNIQUE_ID = tempUniqueId;
          localStorage.setItem('ELEX_APP_BI_UNIQUE_ID', tempUniqueId)
        }
      }
    }
    if(params.ELEX_APP_BI_CHANNEL_ID != null){
        window.ELEX_APP_BI_CHANNEL_ID = params.ELEX_APP_BI_CHANNEL_ID;
    }
    if(params.ELEX_APP_BI_COUNTRY_ID != null){
        window.ELEX_APP_BI_COUNTRY_ID = params.ELEX_APP_BI_COUNTRY_ID;
    }
    if(params.ELEX_APP_BI_DEVICEOS_ID != null){
        window.ELEX_APP_BI_DEVICEOS_ID = params.ELEX_APP_BI_DEVICEOS_ID;
    }
    if(params.ELEX_APP_BI_DEVICEMODEL_ID != null){
        window.ELEX_APP_BI_DEVICEMODEL_ID = params.ELEX_APP_BI_DEVICEMODEL_ID;
    }
    if(params.ELEX_APP_BI_DEVICEBRAND_ID != null){
        window.ELEX_APP_BI_DEVICEBRAND_ID = params.ELEX_APP_BI_DEVICEBRAND_ID;
    }
    if(params.ELEX_APP_QUEUE_SPLICE != null){
        window.ELEX_APP_QUEUE_SPLICE = params.ELEX_APP_QUEUE_SPLICE;
    }
    if(params.ELEX_APP_QUEUE_SPLICE_ONOFF != null){
        window.ELEX_APP_QUEUE_SPLICE_ONOFF = params.ELEX_APP_QUEUE_SPLICE_ONOFF;
    }
    if(params.ELEX_APP_BI_PLATFORM_ID != null){
        window.ELEX_APP_BI_PLATFORM_ID = params.ELEX_APP_BI_PLATFORM_ID;
    }
    if(params.success){
        var data={tempId:window.BIUtils.tempId};
        params.success(data);
    }
    //远程开关获取
    var getswitch={
        TempID:window.BIUtils.tempId,
        prod:window.ELEX_APP_ID
    };
    window.BIUtils.wxpost(window.ELEX_POST_SWITCH_URL, getswitch, function(res){
        if(res==null || res==undefined){
            return;
        }
        try {
            var data = JSON.parse(res);
            if(data.ELEX_BI_APP_LOG !=null){
                window.ELEX_BI_APP_LOG = data.ELEX_BI_APP_LOG;
            }
            if(data.ELEX_POST_IS_QUEUE !=null){
                window.ELEX_POST_IS_QUEUE = data.ELEX_POST_IS_QUEUE;
            }
            if(data.ELEX_POST_FAILE_RETRY !=null){
                window.ELEX_POST_FAILE_RETRY = data.ELEX_POST_FAILE_RETRY;
            }
            if(data.ELEX_APP_STORAGE != null){
                window.ELEX_APP_STORAGE = data.ELEX_APP_STORAGE;
            }
            if(data.ELEX_STORAGE_MAX_LENGTH != null){
                window.ELEX_STORAGE_MAX_LENGTH = data.ELEX_STORAGE_MAX_LENGTH;
            }
            if(data.ELEX_STORAGE_TIMTS != null){
                window.ELEX_STORAGE_TIMTS = data.ELEX_STORAGE_TIMTS;
            }
            if(data.ELEX_ACTION_WHITELIST != null){
                window.ELEX_ACTION_WHITELIST = data.ELEX_ACTION_WHITELIST;
            }
            if(data.ELEX_ACTION_BLACKLIST != null){
                window.ELEX_ACTION_BLACKLIST = data.ELEX_ACTION_BLACKLIST;
            }
           window.ELEX_BI_APP_LOG &&  window.BIlog("init switch:",data);
        } catch (error) {
           window.ELEX_BI_APP_LOG &&  window.BIlog("init ELEX_POST_SWITCH_URL catch",error.message);
        }

    }, null);
};

window.BIlog=function(message, optionalParams){

    //上报catch
    if(message !=null && "catch"==message){
        var ret={error:optionalParams};
        ELEX_BI.toBI(BI_API.WXChatchError,ret);
    }

    if(!window.ELEX_BI_APP_LOG){
        return;
    }

    if(optionalParams !=null){
        console.log(message,optionalParams);
    }else{
        console.log(message);
    }

}

/** 登录消息 */
window.BI_API = {
    /** 初始化时执行 */
    Launch: 'Launch',
    /** 初始化时执行 */
    LaunchEnd: 'LaunchEnd',
    /** 开始加载游戏 */
    LoadingStart: 'LoadingStart',
    /** 开始加载表 */
    DownLoadDataTable: 'DownLoadDataTable',
    /** 结束加载表 */
    DownLoadDataTableRet: 'DownLoadDataTableRet',
    /** 开始加载资源 */
    DownLoadGameScene: 'DownLoadGameScene',
    /** 结束加载资源 */
    DownLoadGameSceneRet: 'DownLoadGameSceneRet',
    /** 加载数据成功 */
    LoadingFinish: 'LoadingFinish',
    /** 获得服务器信息 */
    GetServerInfo: 'GetServerInfo',
    /** 获取服务器信息结果 */
    GetServerInfoRet: 'GetServerInfoRet',
    /** 登录微信 */
    WXLogin: 'WXLogin',
    /** 登录微信结果 */
    WXLoginRet: 'WXLoginRet',
    /** 登录游戏 */
    GameServerLogin: 'GameServerLogin',
    /** 登录游戏结果 */
    GameServerLoginRet: 'GameServerLoginRet',
    /** 进入场景 */
    EnterGame: 'EnterGame',

    /** 分享页面打开 */
    WXShareAppMessagePre: 'WXShareAppMessagePre',
    /** 发起分享 */
    WXShareAppMessage: 'WXShareAppMessage',
    /** 分享返回 */
    WXShareAppMessageRet: 'WXShareAppMessageRet',

    /** 游戏商城购买之前的验证 */
    PayBefore: 'PayBefore',
    /** 游戏商城购买之前的验证返回 */
    PayBeforeRet: 'PayBeforeRet',
    /** 游戏商城购买 */
    PayBuy: 'PayBuy',
    /** 游戏商城购买返回 */
    PayBuyRet: 'PayBuyRet',
    /** 购买米大师币 */
    PayMidas: 'PayMidas',
    /** 购买米大师币返回 */
    PayMidasRet: 'PayMidasRet',
    /** 取消米大师币购买 */
    PayCancel: 'PayCancel',
    /** 取消米大师币购买返回 */
    PayCancelRet: 'PayCancelRet',

    /** 点击视频广告 */
    SeeVideo: 'SeeVideo',
    /** 视频广告播放状态 */
    SeeVideoRet: 'SeeVideoRet',
    /** 视频广告加载状态 */
    SeeVideoPre: 'SeeVideoPre',

    /** 打开某个界面 */
    UiOpen: 'UiOpen',
    /** 加载成功或者失败 */
    UiOpenRet: 'UiOpenRet',
    /** 界面关闭 */
    UiClose: 'UiClose',

    /** 打开其他小程序 */
    gotoOther: 'gotoOther',
    /** 打开其他小程序结果 */
    gotoOtherRet: 'gotoOtherRet',
    /** 取消打开小程序 */
    gotoOtherCancel: 'gotoOtherCancel',
    /** 手势不对的错误 */
    gotoOtherTAP: 'gotoOtherTAP',

    /** 新手引导 */
    NewUserGuide: 'NewUserGuide',
    /** 任务 */
    DoTask: 'DoTask',

    /** 自定义事件 */
    CustomEvent: 'CustomEvent',
    /** 自定义事件 */
    test: 'test',

    /** onshow事件 */
    WXOnShow:'WXOnShow',
    /** WXonError事件 */
    WXonError:'WXonError',
    /** WXChatchError事件 */
    WXChatchError:'WXChatchError',
    /** GameError事件 */
    GameError:'GameError'

};
window.BI_API=window.BI_API;

var ElexBiQueue = /** @class */ (function () {
    function ElexBiQueue(capacity) {
        this.elements = new Array();
        this._size = capacity;
    }
    ElexBiQueue.prototype.push = function (o) {
        if (o == null) {
            return false;
        }
        //如果传递了size参数就设置了队列的大小
        if (this._size != undefined && !isNaN(this._size)) {
            if (this.elements.length == this._size) {
                this.pop();
            }
        }
        this.elements.unshift(o);
        return true;
    };
    ElexBiQueue.prototype.pop = function () {
        return this.elements.pop();
    };
    ElexBiQueue.prototype.size = function () {
        return this.elements.length;
    };
    ElexBiQueue.prototype.empty = function () {
        return this.size() == 0;
    };
    ElexBiQueue.prototype.clear = function () {
        delete this.elements;
        this.elements = new Array();
    };
    ElexBiQueue.prototype.concat = function (arr) {
        for(var param in arr){
            this.push(param);
        }
    };
    //要取出数组的数量
    ElexBiQueue.prototype.splice = function () {
        var begin = 0;
        var howmany = window.ELEX_APP_QUEUE_SPLICE;
        if(this.elements.length > howmany){
            begin = this.elements.length - howmany;
        }else{
            howmany = this.elements.length;
        }
        return this.elements.splice(begin,howmany);
    };
    return ElexBiQueue;
}());
window.ElexBiQueue = ElexBiQueue;
/** 是否是队列发送 */
window.ELEX_POST_IS_QUEUE = true;
/** POST超时时间 */
window.ELEX_POST_OVERTIME = 10000;
/** 失败重试次数 */
window.ELEX_POST_FAILE_RETRY = 10;
/** 链接url */
window.ELEX_POST_URL ="https://public-bi-cn.elexapp.com/client/loading";  //"https://syqgs.rivergame.net:8081/clientloading.php";
/** 获得远程 */
window.ELEX_POST_SWITCH_URL ="https://bisdk.elexapp.com/clientloading_switch.php";
/**
 * BI接口管理
 * 单接口封装
 **/
var ElexBiHttpUtils = /** @class */ (function () {
    function ElexBiHttpUtils() {
        this.queue = new ElexBiQueue();
        this.tempId=this.guid()+""+this.guid();
        this.storageTime=0;
        this.onHiedTimes=0;
        this.blockHeartbeatTimes=0;
        this.nowSendPack = new Array();
        setInterval(this.checkQueue, 100);
    }
    /**
     * 单例接口
     */
    ElexBiHttpUtils.getInstance = function () {
        if (ElexBiHttpUtils._instance == null) {
            this._instance = new ElexBiHttpUtils();
        }
        return ElexBiHttpUtils._instance;
    };
    /** 获取一个guid */
    ElexBiHttpUtils.prototype.guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    /** 清空打包发送的列表 */
    ElexBiHttpUtils.prototype.clearSendPack = function () {
        delete this.nowSendPack;
        this.nowSendPack = new Array();
    }
    /**
     * send消息，做拦截以及开关验证
     * @param params 传递的参数
     */
    ElexBiHttpUtils.prototype.sendUtils = function (params) {

        try {
           if (window.ELEX_BI_APP_LOG ){
                window.BIlog("BI send post:", JSON.stringify(params));
           }

            if (window.ELEX_POST_IS_QUEUE) {
                if(window.ELEX_BI_APP_LOG){
                    window.BIlog("add queue");
                }
                this.queue.push(params);
            }

            //this.post(window.ELEX_POST_URL, params, this.successHandler, this.failHandler);

        } catch (error) {
           window.ELEX_BI_APP_LOG &&  window.BIlog("catch", error.message);

        }

    };
    /**
     * 处理队列
     * @param params 传递的参数
     */
    ElexBiHttpUtils.prototype.checkQueue = function () {

        var BIUtils=window["BIUtils"];
        if(BIUtils ==null || BIUtils == undefined){
           window.ELEX_BI_APP_LOG &&  window.BIlog("bi send post fail BIUtils undefined");
            return;
        }

        BIUtils.checkStorageAddQueue();

        if(window.ELEX_APP_QUEUE_SPLICE_ONOFF){
            BIUtils.checkQueuePack();
        }else{
            BIUtils.checkQueueOne();
        }
    };

        /**
     * 消息打包发送
     */
    ElexBiHttpUtils.prototype.checkQueuePack = function () {
        try {
            while (BIUtils.queue.size() > 0) {
                window.BIlog("BIUtils queue:",BIUtils.queue);
                BIUtils.blockHeartbeatTimes = 0;
                BIUtils.clearSendPack();
                var myArray = BIUtils.queue.splice();
                if(myArray.launch == 0 ){
                    continue;
                }
                window.BIlog("BIUtils nowSendPack:",myArray);
                BIUtils.nowSendPack=BIUtils.nowSendPack.concat(myArray);

                var params = {paramsList:JSON.stringify(myArray)};

                BIUtils.wxpost(window.ELEX_POST_URL, params, BIUtils.successHandler, BIUtils.failHandler);
                break;
            }
        } catch (error) {
            window.BIlog("catch", error.message);
        }
    }

    /**
     * 消息单条发送
     */
    ElexBiHttpUtils.prototype.checkQueueOne = function () {
        try {

            while (BIUtils.queue.size() > 0) {
               window.ELEX_BI_APP_LOG &&  window.BIlog("BIUtils queue:",BIUtils.queue);
                BIUtils.blockHeartbeatTimes = 0;
                var params = BIUtils.queue.pop();
                if (params && params.ext) {
                    var ext = JSON.parse(params.ext);
                    if (ext.retryNum >= window.ELEX_POST_FAILE_RETRY) {
                       window.ELEX_BI_APP_LOG &&  window.BIlog("ext retryNum",ext.retryNum);
                        continue;
                    }
                }
                BIUtils.wxpost(window.ELEX_POST_URL, params, BIUtils.successHandler, BIUtils.failHandler);
                break;
            }
        } catch (error) {
           window.ELEX_BI_APP_LOG &&  window.BIlog("catch", error.message);
        }
    }

    /**
     * 处理onHide时心跳发送
     * @param params 传递的参数
     */
    ElexBiHttpUtils.prototype.checkOnHide = function () {
        var BIUtils=window["BIUtils"];
        if(BIUtils ==null || BIUtils == undefined){
           window.ELEX_BI_APP_LOG &&  window.BIlog("checkOnHide",BIUtils);
            return
        }
        //暂时设定5秒
        this.onHiedTimes+=1;
        if(this.onHiedTimes >= 50){
            this.onHiedTimes=0;
            //发送消息
            ELEX_BI.toBI("Hide",{});
        }
    }

    /**
     * 处理数据缓存里的数据
     * @param params 传递的参数
     */
    ElexBiHttpUtils.prototype.checkStorageAddQueue = function () {
        if(!window.ELEX_APP_STORAGE){
            return;
        }
        var BIUtils=window["BIUtils"];
        if(BIUtils ==null || BIUtils == undefined){
           window.ELEX_BI_APP_LOG &&  window.BIlog("checkStorageAddQueue",BIUtils);
            return
        }
        //暂时设定5秒
        this.storageTime+=1;
        if(this.storageTime >= window.ELEX_STORAGE_TIMTS){
            this.storageTime=0;
            //插入队列
            try {
                var valueList = window.ELEX_STORAGE.getStorageSync();
               window.ELEX_BI_APP_LOG &&  window.BIlog("数据缓存：10秒心跳处理",valueList);
                while (valueList.length > 0) {
                    var obj = valueList.pop();
                    BIUtils.queue.push(obj);
                }
            } catch (error) {
               window.ELEX_BI_APP_LOG &&  window.BIlog("checkStorageAddQueue catch",error.message);
            }

        }

    }


    /**
     * post消息成功回调
     */
    ElexBiHttpUtils.prototype.successHandler = function (request) {

        if(request == "fail"){
           window.ELEX_BI_APP_LOG &&  window.BIlog("bi send post fail");
            return;
        }
       window.ELEX_BI_APP_LOG &&  window.BIlog("bi send post success",request);

        //成功了就不管了接着check
        var BIUtils=window["BIUtils"];
        if(BIUtils ==null || BIUtils == undefined){
           window.ELEX_BI_APP_LOG &&  window.BIlog("bi send post fail BIUtils undefined",BIUtils);
            return
        }

        if(window.ELEX_APP_QUEUE_SPLICE_ONOFF){
            BIUtils.clearSendPack();
        }
    };
    /**
     * POST失败消息回调
     * @param params 传递的参数
     */
    ElexBiHttpUtils.prototype.failHandler = function (request,params) {
       window.ELEX_BI_APP_LOG &&  window.BIlog("bi send post fail",JSON.stringify(params));
        var BIUtils=window["BIUtils"];
        if(BIUtils ==null || BIUtils == undefined){
           window.ELEX_BI_APP_LOG &&  window.BIlog("bi send post fail BIUtils undefined");
            return
        }

        if(window.ELEX_APP_QUEUE_SPLICE_ONOFF){
            BIUtils.failHandlerPack();
        }else{
            BIUtils.failHandlerOne();
        }

    };


    ElexBiHttpUtils.prototype.failHandlerPack = function (request) {
        try {
            if(BIUtils.nowSendPack == undefined || BIUtils.nowSendPack.length ==0){
                return;
            }
            window.BIlog("failHandlerPack ext ext begin");
            for(var k in BIUtils.nowSendPack){
                //重试时没必要深拷贝，所以打印log时会看着retryNum为最大值
                var params = BIUtils.nowSendPack[k];
                //var params=JSON.parse(JSON.stringify(BIUtils.nowSendPack[k]));

                var ext=JSON.parse(params.ext);
                window.BIlog("failHandlerPack ext ext",ext);
                ext.statusCode=408;
                ext.retryNum += 1;
                if (ext.retryNum >= window.ELEX_POST_FAILE_RETRY) {
                    //加入数据缓存
                    window.ELEX_STORAGE.setStorageSync(params);
                    window.BIlog("failHandlerPack ext retryNum",ext.retryNum);
                }else{
                    params.ext=JSON.stringify(ext);

                    BIUtils.queue.push(params);
                }
            }
            window.BIlog("failHandlerPack ext ext end");
        } catch (error) {
            window.BIlog("catch", error.message);
        }
    }

    ElexBiHttpUtils.prototype.failHandlerOne = function (request) {
        try {
            var ext=JSON.parse(params.ext);
            if (request == null || request=="" || request== undefined) {
                ext.statusCode=0;
            }else{
                ext.statusCode=408;
            }

            ext.retryNum += 1;
            if (ext.retryNum >= window.ELEX_POST_FAILE_RETRY) {
                //加入数据缓存
                window.ELEX_STORAGE.setStorageSync(params);
               window.ELEX_BI_APP_LOG &&  window.BIlog("failHandler ext retryNum",ext.retryNum);
            }else{
                params.ext=JSON.stringify(ext);
                BIUtils.queue.push(params);
            }
        } catch (error) {
           window.ELEX_BI_APP_LOG &&  window.BIlog("catch", error.message);
        }
    }


    /**
     * POST参数检查器
     * @param data 要发送的参数
     */
    ElexBiHttpUtils.prototype.postChecker = function (data) {
        if (typeof (data) !== "object")
            return "";
        var arr = new Array();
        var i = 0;
        for (var attr in data) {
            arr[i] = attr + "=" + encodeURIComponent(data[attr]);
            i++;
        }
        return arr.join("&");
    };
    /**
     * 发起POST请求
     * @param url 通知地址
     * @param postData 发送的参数
     * @param successHandler 成功回调
     * @param failHandler 失败回调
     */
    ElexBiHttpUtils.prototype.wxpost = function (url, data, successHandler, failHandler) {
        this.post(url, data, successHandler, failHandler);
    };
    /**
     * 发起POST请求
     * @param url 通知地址
     * @param postData 发送的参数
     * @param successHandler 成功回调
     * @param failHandler 失败回调
     */
    ElexBiHttpUtils.prototype.post = function (url, postData, successHandler, failHandler) {

        try {

              var isIE = window.XDomainRequest ? true : false;
              if (isIE) {
                var xdr = new window.XDomainRequest();
                xdr.open('POST', url, true);
                xdr.timeout = window.ELEX_POST_OVERTIME;
                xdr.onload = function() {
                  successHandler(xdr.responseText);
                };
                xdr.onerror = function () {
                  if (xdr.responseText === 'Request Entity Too Large') {
                    failHandler(JSON.stringify(xdr.responseText),postData);
                  } else {
                    failHandler(JSON.stringify(xdr.responseText),postData);
                  }
                };
                xdr.ontimeout = function () {};
                xdr.onprogress = function() {};
                var sendpostData = this.postChecker(postData);
                xdr.send(sendpostData);
                window.ELEX_BI_APP_LOG &&  window.BIlog("elex bi xdr success");
              } else {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.timeout = window.ELEX_POST_OVERTIME;
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    successHandler( xhr.responseText);
                  }
                };
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                var sendpostData = this.postChecker(postData);
                xhr.send(sendpostData);
                window.ELEX_BI_APP_LOG &&  window.BIlog("elex bi xhr success");
              }

        } catch (error) {
           window.ELEX_BI_APP_LOG &&  window.BIlog("elex bi post error:",error.message);
        }

    };
    ElexBiHttpUtils._instance = null;
    return ElexBiHttpUtils;
}());
window.BIUtils = ElexBiHttpUtils.getInstance();
window.BIUtils = window.BIUtils;
/**
 * BI接口管理
 * 单接口封装
 * 如果吐槽为啥变量不直接赋值，原因就是怕各位大大忘记某个变量没给赋值
 * 欢迎给优化建议，我尽量优化
 **/
var ElexBiManager = /** @class */ (function () {
    /**
     * 构造函数
     */
    function ElexBiManager() {
        /** 用户id*/
        this.uid = '';
        /** 用户opendid*/
        this.openid = '';
        /** 游戏版本号*/
        this.version = '';
        /** 服务器id*/
        this.connection = '';
        /** 用户unoinid*/
        this.unionid = '';
        /** 用户等级*/
        this.level = 0;
        /** 网络状态*/
        this.networkstatus = '-1';
        /** 该次打点的唯一id*/
        this.tempId = window.BIUtils.tempId;
        /** 获取userinfo信息*/
        this.userinfo = null;
        this.beginGameTime = 0;
        this.lastShowGameTime = 0;
        this.lastHideGameTime = 0;
        this.cumulastGideGameTime = 0;
        this.index = 0;
    }
    /**
     * 单例接口
     */
    ElexBiManager.getInstance = function () {
        if (ElexBiManager._instance == null) {
            this._instance = new ElexBiManager();
        }
        return ElexBiManager._instance;
    };
    /**
    * 更新游戏内必要信息,
    * @param uid 玩家的游戏uid
    * @param openid 用户opendid对应的设备id
    * @param version 游戏版本号
    * @param serverid 服务器id
    * @param networkstatus 网络状态
    * @param unionid 用户unoinid对应广告id
    */
    ElexBiManager.prototype.updateGameBiInfo = function (uid, openid, version, serverid, unionid) {
        if(uid != null && uid != undefined){
          if (window.ELEX_APP_IS_OPEN_UNIQUE_ID) {
            this.uid = window.ELEX_APP_BI_UNIQUE_ID || localStorage.getItem('ELEX_APP_BI_UNIQUE_ID')
          } else {
            this.uid = uid;
          }
        }
        if(openid != null && openid != undefined){
            this.openid = openid;
        }
        if(version != null && version != undefined){
            this.version = version;
        }
        if(serverid != null && serverid != undefined){
            this.connection = serverid;
        }
        if(unionid != null && unionid != undefined){
            this.unionid = unionid;
        }
    };

    ElexBiManager.prototype.updateInit = function (params) {
        if(params==null){
            params={};
        }
        window.elex_bi_init(params);
        window.localStorage.removeItem("ELEX_STATS_UID_AND_OPENID_KEY");
    };

    /**
    * game.7afa2.js初始化第一行记录时间
    */
    ElexBiManager.prototype.onBeginGame = function () {
        this.beginGameTime = new Date().getTime();
    };


    /*
     * 消息发送
     * @param name 发送的类型
     * @param openid 传递的参数
     */
    ElexBiManager.prototype.sendHttpPost = function (name, ext) {

        this.index += 1;
        var paramData = {};

        if(this.uid == '' && window.ELEX_STORAGE.localUid != ''){
          if (window.ELEX_APP_IS_OPEN_UNIQUE_ID) {
            paramData.uid = window.ELEX_APP_BI_UNIQUE_ID || localStorage.getItem('ELEX_APP_BI_UNIQUE_ID')
          } else {
            paramData.uid = window.ELEX_STORAGE.localUid
          }
        }else{
          if (window.ELEX_APP_IS_OPEN_UNIQUE_ID) {
            paramData.uid = window.ELEX_APP_BI_UNIQUE_ID || localStorage.getItem('ELEX_APP_BI_UNIQUE_ID')
          } else {
            paramData.uid = this.uid
          }
        }
        if (paramData.uid == undefined) {
          if (window.ELEX_APP_IS_OPEN_UNIQUE_ID) {
            paramData.uid = window.ELEX_APP_BI_UNIQUE_ID || localStorage.getItem('ELEX_APP_BI_UNIQUE_ID')
          } else {
            paramData.uid = ''
          }
        }
        if(this.openid == '' && window.ELEX_STORAGE.localOpenid != ''){
            paramData.openid = window.ELEX_STORAGE.localOpenid;
        }else{
            paramData.openid = this.openid;
        }
        if (paramData.openid == undefined) {paramData.openid ='';}
        if(this.connection == '' && window.ELEX_STORAGE.localConnection != ''){
            paramData.connection = window.ELEX_STORAGE.localConnection;
        }else{
            paramData.connection = this.connection;
        }
        if (paramData.connection == undefined) {paramData.connection='';}
        paramData.country = window.ELEX_APP_BI_COUNTRY_ID;
        paramData.ip = '';
        paramData.version = this.version;
        paramData.platform = window.ELEX_APP_BI_PLATFORM_ID;
        paramData.step = name; //打点关键字
        paramData.networkstatus = this.networkstatus;
        paramData.unionid = this.unionid;
        paramData.prod = window.ELEX_APP_ID; //该应用的id
        paramData.queueNum=this.index;
        //============================================
        if (ext == null) {
            ext = {};
        }
        ext.index = this.index;
        ext.retryNum = 0;
        ext.storage = 0;
        ext.statusCode=0;
        var nowTime = new Date().getTime();
        ext.Time = Math.round(nowTime - this.beginGameTime - this.cumulastGideGameTime); //当前时间-启动时间-切后台的耗时
        if (ext.Time < 0) {
            ext.beginGameTime = this.beginGameTime;
            ext.cumulastGideGameTime = this.cumulastGideGameTime;
        }
        ext.TempID = this.tempId; //生成规则为：当前毫秒时间戳+随机数
        ext.sdkVersion=window.ELEX_APP_VERSION;    //sdk版本号
        ext.sdkVersionName="js_web";
        ext.adid=window.ELEX_APP_BI_CHANNEL_ID;//渠道
        ext.localTime = nowTime;
        if(window.ELEX_APP_QUEUE_SPLICE_ONOFF){
            ext.packMsg=1;
        }
        //开发环境
        if(window.ELEX_APP_IS_DEVELOP){
            ext.evn='debug';
        }else{
            ext.evn='release';
        }
        var szExt = JSON.stringify(ext);
        paramData.ext = szExt;
        //=============================================

        //接口总开关
        if (!window.ELEX_APP_BI_ONOFF)
            return;

        window.BIUtils.sendUtils(paramData);
    };
    /**
     * 消息发送
     * @param name elex_bi_type的类型
     * @param params 传递的参数
     */
    ElexBiManager.prototype.toBI = function (name, params) {
        if (params == null) {
            params = {};
        }
        if (name == window.BI_API.Launch) {
            this.onLaunch();
            return;
        }

        if (!this.checkActionWhiteAndBlack(name)) {
            return ;
        }

        if (name == window.BI_API.GameServerLogin){
            this.onGameServerLoginInit();
        }else if(name == window.BI_API.EnterGame){
            this.onEnterGameInit(params);
        }else if (name == window.BI_API.GameError) {
            this.onGameError(params);
        }

        var newObj=JSON.parse(JSON.stringify(params));
        this.sendHttpPost(name, newObj);


    };


    /**
     *
     * 检查action的白名单和黑名单
     *
     */
    ElexBiManager.prototype.checkActionWhiteAndBlack = function (params) {
        //白名单
        if (window.ELEX_ACTION_WHITELIST != "") {
            var whiteList = new Array();
            whiteList = window.ELEX_ACTION_WHITELIST.split("|");
            for (var i = 0; i < whiteList.length; i++) {
                if (whiteList[i] == params) {
                    exports.BIlog("The information white list is currently opened :",window.ELEX_ACTION_WHITELIST);
                    return true;
                }
            }

            return false;
        }else{
            //黑名单
            if (window.ELEX_ACTION_BLACKLIST != "") {
                var blackList = new Array();
                blackList = window.ELEX_ACTION_BLACKLIST.split("|");
                for (var i = 0; i < blackList.length; i++) {
                    if (blackList[i] == params) {
                        exports.BIlog("The information blacklist is currently open :",window.ELEX_ACTION_BLACKLIST);
                        return false;
                    }
                }

            }
            return true;
        }
    }

    /**
     *
     * 给GameServerLogin获取userInfo
     *
     */
    ElexBiManager.prototype.onGameServerLoginInit = function () {
    }
    /**
     *
     * 给EnterGame赋值userInfo
     */
    ElexBiManager.prototype.onEnterGameInit = function (params) {
        window.ELEX_STORAGE.setStorageUidAndOpendid(this.uid,this.openid,this.connection);
    }

    /**
     * 错误修改
     */
    ElexBiManager.prototype.onGameError = function (params) {
        if(params.errMsgInfo==null || params.errMsgInfo==''){
            return;
        }
        var info=params.errMsgInfo;
        var str1 = info.replace(/"/g, '|');
        //var str2 = str1.replace(/}/g, ')');
        params.errMsgInfo=str1;
    }

    /**
     * 错误修改
     */
    ElexBiManager.prototype.onRequestError = function (params) {
        if(params.errMsg==null || params.errMsg==''){
            return;
        }
        var info=params.errMsg;
        var str1 = info.replace(/"/g, '|');
        //var str2 = str1.replace(/}/g, ')');
        params.errMsg=str1;
    }

    /**
     * 初始化时执行
     */
    ElexBiManager.prototype.onLaunch = function () {
        var _this = this;
        this.onBeginGame();

        window.ELEX_STORAGE.getStorageUidAndOpendid();

       window.ELEX_BI_APP_LOG &&  window.BIlog("sys.getNetworkType:",getNetworkType())
        try {
            //获取网络状态
            this.networkstatus=getNetworkType();
            var extData = {};
            var systeminfo = {};
            systeminfo.os=window.ELEX_APP_BI_DEVICEOS_ID;
            systeminfo.brand=window.ELEX_APP_BI_DEVICEBRAND_ID;
            systeminfo.model=window.ELEX_APP_BI_DEVICEMODEL_ID;
            extData.systeminfo = systeminfo;
            this.sendHttpPost(window.BI_API.Launch, extData);
        } catch (error) {
           window.ELEX_BI_APP_LOG &&  window.BIlog("catch",error.message);

        }

    };


    ElexBiManager.prototype.getNetworkType= function() {
            var ua = navigator.userAgent;
            var networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
            networkStr = networkStr.toLowerCase().replace('nettype/', '');
            var networkType;
            switch (networkStr) {
                case 'wifi':
                    networkType = 'wifi';
                    break;
                case '4g':
                    networkType = '4g';
                    break;
                case '3g':
                    networkType = '3g';
                    break;
                case '3gnet':
                    networkType = '3g';
                    break;
                case '2g':
                    networkType = '2g';
                    break;
                default:
                    networkType = 'other';
            }
            return networkType;
    }

    ElexBiManager._instance = null;
    return ElexBiManager;
}());
window.ELEX_BI = ElexBiManager.getInstance();
window.ELEX_BI = window.ELEX_BI;


/**
 * 数据缓存
 * 所有队列发送失败的数据
 **/
var ElexWxStorage = /** @class */ (function () {
    /**
     * 构造函数
     */
    function ElexWxStorage() {
        this.valueList=new Array();
        this.localUid = '';
        this.localOpenid ='';
        this.localConnection='';
        this.getStorageUidAndOpendid();
    }

    /**
     * 构造函数
     */
    ElexWxStorage.getInstance = function () {
        if(ElexWxStorage._instance == null){
            ElexWxStorage._instance = new ElexWxStorage();
        }
        return ElexWxStorage._instance;
    }


    /**
     * 获取key数据
     * 读取为同步读取
     */
    ElexWxStorage.prototype.getStorageSync = function () {
        if(!window.ELEX_APP_STORAGE){
            return new Array();
        }

        try {
            var value = window.localStorage.getItem(window.ELEX_STORAGE_KEY);
            if (value) {
                return JSON.parse(value);
            }
        } catch (e) {
           window.ELEX_BI_APP_LOG &&  window.BIlog("get getStorageSync error",e.message);
        }
        return new Array();
    }

    /**
     * 设置key数据,单条失败写入
     */
    ElexWxStorage.prototype.setStorageSync = function (params) {
        if(!window.ELEX_APP_STORAGE){
            return;
        }

       window.ELEX_BI_APP_LOG &&  window.BIlog("数据缓存：失败单条插入",params);
        try {

            var ext=JSON.parse(params.ext);
            if(ext){
                ext.storage+=1;
                ext.retryNum = 0;
                params.ext=JSON.stringify(ext);
            }

            this.valueList = this.getStorageSync();
            if(this.valueList.length < window.ELEX_STORAGE_MAX_LENGTH){
                this.valueList.unshift(params);
                window.localStorage.setItem(window.ELEX_STORAGE_KEY,JSON.stringify(this.valueList));
            }

        } catch (e) {
           window.ELEX_BI_APP_LOG &&  window.BIlog("get setStorageSync error",e.message);
        }
    }

    /**
     * 设置uid和opendid进入数据缓存
     */
    ElexWxStorage.prototype.setStorageUidAndOpendid = function (uid,openid,connection) {
        try {

            var value={
                localUid:uid,
                localOpenid:openid,
                localConnection:connection
            };
            this.localUid = uid;
            this.localOpenid = openid;
            this.localConnection=connection;


            window.localStorage.setItem(window.ELEX_STATS_UID_AND_OPENID_KEY,JSON.stringify(value));
           window.ELEX_BI_APP_LOG &&  window.BIlog("setStorageUidAndOpendid value:",value);
        } catch (e) {
           window.ELEX_BI_APP_LOG &&  window.BIlog("setStorageUidAndOpendid error",e.message);
        }
    }

    /**
     * 获取uid和opendid进入数据缓存
     */
    ElexWxStorage.prototype.getStorageUidAndOpendid = function () {

        try {
            var valueJson=window.localStorage.getItem(window.ELEX_STATS_UID_AND_OPENID_KEY);
            var value = JSON.parse(valueJson);
            if (value) {
                this.localUid = value.localUid;
                this.localOpenid = value.localOpenid;
                this.localConnection= value.localConnection;
            }
           window.ELEX_BI_APP_LOG &&  window.BIlog("getStorageUidAndOpendid value:",value);
        } catch (e) {
           window.ELEX_BI_APP_LOG &&  window.BIlog("getStorageUidAndOpendid error",e);
        }

    }


    ElexWxStorage._instance = null;
    return ElexWxStorage;
}());
window.ELEX_STORAGE = ElexWxStorage.getInstance();
