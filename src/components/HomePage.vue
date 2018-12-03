<template>
  <div>
    <div class="customerService">
      <div class="menu_main">
        <div class="dialog_top">
          <div class="dialog_top_party">
            <div class="dialog_menu">
              <div class="dialog_menu_top">
                <div class="content">
                  客服系统
                </div>
              </div>
              <!--
                                initFlag -- 是否初始化
                                robot -- 自动还是人工  true - 自动  false - 人工
                                toArtificialFlag -- 是不是需要转为人工 false 不需要  ture 需要
                            -->
              <div class="dialog_menu_list" v-for="(list,index) in shopList"
                   :class="!list.initFlag? list.robot?'artificialStyle4':'artificialStyle3' : list.robot ? list.toArtificialFlag? 'artificialStyle' : 'artificialStyle1' : 'artificialStyle' "
                   @click="toDetailShop(index)">
                <i></i>
                <div class="shop_main">
                  <div class="logo">
                    <img src="../assets/img/xiaomanniulogo.png"/>
                  </div>
                  <div class="content">（{{list.shopName}}）</div>
                  <div class="content" v-show="list.initFlag">
                    <span class="dialog_logo"></span> 正在对话 . . .
                  </div>
                </div>
              </div>
            </div>
            <div class="dialog_top_party_main">
              <div class="dialog_top_party_top">
                <div class="name">（{{shopName}}）</div>
                <div class="dialog_type" @click="toChangeRobot()">
                  {{robot?"转至人工客服":"转至机器人"}}
                </div>
              </div>
              <div class="dialog_content">
                <div class="null_order" v-show="dialogList.length == 0">
                  <div class="null_order_content">
                    暂无订单
                  </div>
                </div>
                <div class="dialog_content_main" id="dialog_content_main" v-show="dialogList.length != 0">
                  <div class="dialog_lists" v-for="l in dialogList">
                    <div class="dialog_tittle" v-show="l.audioTittle">{{l.audioTittle}}</div>
                    <div class="dialog_customer">
                      <div class="headLogo" v-show="l.audioUrl && l"></div>
                      <div class="dialog_content">
                        <div class="phonetics" v-show="l.audioUrl">
                          <div class="phoneticsMain" @click="changeAudio(l,$event)">
                            <i class="nomal"></i>
                          </div>
                        </div>
                        <div class="words" v-show="l.audioContent">
                          {{l.audioContent}}
                        </div>
                      </div>
                    </div>
                    <div class="dialog_xiaomanniu" v-show="l.autoContent">
                      <div class="dialog_content">
                        <div class="words">{{l.autoContent}}</div>
                      </div>
                      <div class="headLogo"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dialog_top_party">
            <div class="order_no_main">
              <i></i>
              <div class="order_no">
                <div class="order_no_null" v-show="dialogList.length == 0">订单编号：空</div>
                <div class="order_flow" v-show="dialogList.length != 0">
                  <div class="orderNo">订单编号：2018070711231234</div>
                  <div class="orderTime">订单已持续：{{timing}}分钟</div>
                  <div class="order_flow_main">
                    <div class="circle focus">开始</div>
                    <div class="line"></div>
                    <div class="content" id="tangshiOrWaidai">方式</div>
                    <div class="line"></div>
                    <div class="content" id="orderEdit">点餐</div>
                    <div class="line"></div>
                    <div class="content" id="payType">选择支付方式</div>
                    <div class="line"></div>
                    <div class="content" id="payContent">微信支付</div>
                    <div class="line"></div>
                    <div class="circle">结束</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="now_Shop">当前{{shopName}}页面</div>
          </div>
        </div>
        <div class="dialog_buttom">
          <div class="dialog_buttom_party">
            <div class="sysName">
              <i></i>
              <div class="sysNameMian">
                <div class="logo">
                  <img src="../assets/img/xiaomanniulogo.png"/>
                </div>
                <div class="content">点餐客服系统</div>
                <div class="content">V1.0</div>
              </div>
            </div>
            <div class="artificial_main">
              <div class="artificial_close" v-show="robot"></div>
              <div class="artificial_open" v-show="!robot">
                <div class="enterImf">
                  <textarea style="resize:none" v-model="areaVal" @keyup.enter="textareaEnter"></textarea>
                </div>
                <div class="artificial_lists">
                  <div class="artificial_list" v-for="apply in applyList">
                    <div class="logo">智</div>
                    <div class="content">{{apply.Message}}</div>
                    <div class="set" @click="toSetArtificial(apply)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dialog_buttom_party">
            <div class="null_order" v-show="!edibleFlag && !orderFlag && !payFlag">
              <div class="null_order_content">
                暂无订单
              </div>
            </div>

            <!--<div class="orderingFood">-->
            <div class="orderingFood" v-show="orderFlag">
              <!--订单-->
              <div class="tittle">
                <div class="logo">
                  <img src="../assets/img/xiaomanniulogo.png" width="100%" height="100%"/>
                </div>
                <div class="content">客官，您想吃什么？（180s）</div>
              </div>
              <div class="orderingFoodMain">
                <div class="foodMains">
                  <div class="foodMain">
                    <div class="food">
                      <!--<div class="food_tittle">
                                                经典系列
                                            </div>-->
                      <div class="foodLists">
                        <div class="foodList" v-for="(o,index) in orderList">
                          <div class="name">{{o.name}}</div>
                          <div class="price">{{o.price}}元/个</div>
                          <div class="operate">
                            <div class="reduce" @click="changeNumToOrder(o,index,'reduce')" v-show="o.num > 0"></div>
                            <div class="num" v-show="o.num > 0">{{o.num}}</div>
                            <div class="increase" @click="changeNumToOrder(o,index,'add')"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="foodMain">
                    <div class="food">
                      <div class="food_tittle">
                        我的订单 (堂食)
                      </div>
                      <div class="foodLists" style="height: calc(100% - 120px);">
                        <div class="foodList" v-for="(o,index) in choiceOrderList">
                          <div class="name">{{o.name}}</div>
                          <div class="price">{{o.price}}元/个</div>
                          <div class="operate">
                            <div class="reduce" @click="changeNumToOrder(o,index,'reduce')" v-show="o.num > 0"></div>
                            <div class="num" v-show="o.num > 0">{{o.num}}</div>
                            <div class="increase" @click="changeNumToOrder(o,index,'add')"></div>
                          </div>
                        </div>
                      </div>
                      <div class="buttom_main">
                        <div class="totalPrice">
                          <div class="main">
                            总价:<span>{{totalPrice}}元</span>
                          </div>
                        </div>
                        <div class="tisi">请说：</div>
                        <div class="buttom">
                          <span @click="editbleFun('XMNCancel')">“不要了”</span>
                          <span @click="editbleFun1('XMNConfirm')">“选好了”</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="orderingFood" v-show="payFlag">
              <!--支付方式-->
              <div class="tittle">
                <div class="logo">
                  <img src="../assets/img/xiaomanniulogo.png" width="100%" height="100%"/>
                </div>
                <div class="content">客官,微信支付还是现金支付（180s）</div>
              </div>
              <div class="orderingFoodMain">
                <div class="foodMains">
                  <div class="paymentMain">
                    <div class="contentMain">
                      <div class="content">请通过语音告诉我支付方式</div>
                      <div class="content">30秒后自动返回</div>
                    </div>
                    <div class="contentImg">
                      <i></i>
                      <div class="imgList" style="margin-right: 30px">
                        <div class="imgMain">
                          <img src="../assets/img/weixinzhifu.png" height="100%"/>
                        </div>
                        <div class="content">微信支付</div>
                      </div>
                      <div class="imgList">
                        <div class="imgMain">
                          <img src="../assets/img/xianjinzhifu.png" height="100%"/>
                        </div>
                        <div class="content">现金支付</div>
                      </div>
                    </div>
                  </div>
                  <div class="foodMain">
                    <div class="food">
                      <div class="food_tittle">
                        我的订单 (堂食)
                      </div>
                      <div class="foodLists" style="height: calc(100% - 120px);">
                        <div class="foodList" v-for="(o,index) in choiceOrderList">
                          <div class="name">{{o.name}}</div>
                          <div class="price">{{o.price}}元/个</div>
                          <div class="operate">
                            <div class="reduce" v-show="o.num > 0"></div>
                            <div class="num" v-show="o.num > 0">{{o.num}}</div>
                            <div class="increase"></div>
                          </div>
                        </div>
                      </div>
                      <div class="buttom_main">
                        <div class="totalPrice">
                          <div class="main">
                            总价:<span>{{totalPrice}}元</span>
                          </div>
                        </div>
                        <div class="tisi">请说：</div>
                        <div class="buttom">
                          <span @click="editbleFun('XMNCancel')">“不要了”</span>
                          <span @click="editbleFun('XMNConfirm')">“选好了”</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="orderingFood" v-show="edibleFlag">
              <!--堂食、外带-->
              <div class="tittle">
                <div class="logo">
                  <img src="../assets/img/xiaomanniulogo.png" width="100%" height="100%"/>
                </div>
                <div class="content">你好客官,您在这吃还是带走（180s）</div>
              </div>
              <div class="toLogin" v-show="loginBombFlag">登录</div>
              <div class="orderingFoodMain">
                <div class="foodMains">
                  <div class="paymentMain">
                    <div class="contentImg" style="padding-top: 0px">
                      <i></i>
                      <div class="imgList" style="margin-right: 30px" id="tangshi"
                           @click="editbleFun('XMNChooseEatIn')">
                        <div class="imgMain">
                          <img src="../assets/img/tangshi.png" height="100%"/>
                        </div>
                        <div class="content">堂食</div>
                      </div>
                      <div class="imgList">
                        <div class="imgMain" id="waidai" @click="editbleFun('XMNChooseTakeOut')">
                          <img src="../assets/img/waidai.png" height="100%"/>
                        </div>
                        <div class="content">外带</div>
                      </div>
                    </div>
                    <div class="leave" @click="editbleFun('XMNCancel')">
                      <span>离开请说“不要了”</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="login_main" v-show="loginBombFlag">
      <i></i>
      <div class="loginMain">
        <div class="logo">
          <img src="../assets/img/xiaomanniulogo.png"/>
        </div>
        <div class="content">小馒牛客服系统V1.0</div>
        <div class="inputMain">
          <div class="input_key">账号:</div>
          <div class="input_value">
            <input v-model="login_account" type="text" placeholder="请输入账号"/>
          </div>
        </div>
        <div class="inputMain">
          <div class="input_key">密码:</div>
          <div class="input_value">
            <input v-model="login_pwd" type="password" placeholder="请输入密码"/>
          </div>
        </div>
        <div class="buttom_main">
          <div class="close" @click="login_close">取消</div>
          <div class="close" @click="login_submit">登录</div>
        </div>
      </div>
    </div>
    <div class="login_main" v-show="setBombFlag">
      <i></i>
      <div class="loginMain" style="height: auto;width: 420px;">
        <div class="content" style="margin-top: 0px;">编辑智能回复</div>
        <div class="inputMain">
          <div class="input_key" style="width: 90px;">所属页面:</div>
          <div class="input_value">
            <select v-model="setPage">
              <option :value="o.id" v-for="o in pageOption">{{o.name}}</option>
            </select>
          </div>
        </div>
        <div class="inputMain">
          <div class="input_key" style="width: 90px;">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置:</div>
          <div class="input_value">
            <select v-model="setPosition">
              <option :value="o.id" v-for="o in positionOption">{{o.name}}</option>
            </select>
          </div>
        </div>
        <div class="inputMain" style="height: 115px;">
          <div class="input_key" style="width: 90px;"></div>
          <div class="input_value" style="height: 115px;">
            <textarea maxlength="10" v-model="applyContent"></textarea>
            <div class="num">限制10个字</div>
          </div>
        </div>
        <div class="buttom_main" style="padding-left: 100px;">
          <div class="close" @click="setClose">取消</div>
          <div class="close" @click="setSave">保存</div>
        </div>
        <div class="close_box" @click="setClose"></div>
      </div>
    </div>
    <!--<audio controls="controls" id="audioObj" autobuffer="autobuffer" autoplay="autoplay" hidden>
      <source src="../assets/mp3/jq22m1.mp3" type="audio/ogg">
      <source src="../assets/mp3/jq22m1.mp3" type="audio/mpeg">
      您的浏览器不支持 audio 元素。
    </audio>-->
  </div>
</template>

<script>
  var time = 0;
  import http from '../assets/js/base/http.js'
  import {
    checkVal,
    checkPass,
    setCookie,
    getCookie,
  } from '../assets/js/base/reg.js'

  export default {
    name: 'HomePage',
    data() {
      return {
        shopName: "",
        websock: null,
        loginBombFlag: true,
        setBombFlag: false,
        edibleFlag: false,
        orderFlag: false,
        robot: true,
        payFlag: false,
        initFlag: false,
        login_account: "",
        login_pwd: "",
        setPage: "",
        setPosition: "",
        applyContent: "",
        timing: "00:00",
        pageOption: [{
          id: "",
          name: "请选择所属页面"
        }, {
          id: "address",
          name: "选择方式页面"
        }, {
          id: "order",
          name: "点餐页面"
        }, {
          id: "payment",
          name: "选择支付方式页面"
        }],
        positionOption: [{
          id: "",
          name: "请选择位置"
        }, {
          id: "1",
          name: "1"
        }, {
          id: "2",
          name: "2"
        }],
        timeInterVal: null,
        dialogList: [],
        audioUrl: "",
        shopList: [],
        shopIndex: "",
        shopDialogList: [],
        orderList: [],
        choiceOrderList: [],
        applyList: [],
        applyListAll: [],
        replyObj: {},
        loginUserData: "",
        appId: "",
        botId: "",
        deviceId: "125",
        toArtificialFlag: false,
        areaVal: "",
        loginUserId:"",
        totalPrice: 0
      }
    },
    created() {
      if (sessionStorage.getItem("loginUser")) {
        var loginObj = JSON.parse(getCookie("loginImf"));
        this.login_account = loginObj.name;
        this.login_pwd = loginObj.pwd;
        this.login_submit();
      }
      this.calTime();
      let self = this;
      window.onbeforeunload = () => {
        let list = self.shopList;
        list.forEach((v, k) => {
          if (!self.checkVal(v["deviceId"])) {
            v["deviceId"] = 0;
          }
          let obj = {
            "deviceId": parseInt(v["deviceId"]),
            "botId": parseInt(v["shopId"]),
            "msgType": "unLockArtificialService",
          };
          self.websocketsend(obj);
        })
      }
    },
    destroyed: function () {
      //页面销毁时关闭长连接
      let self = this;
      let list = self.shopList;
      if (!self.checkVal(v["deviceId"])) {
        v["deviceId"] = 0;
      }
      list.forEach((v, k) => {
        let obj = {
          "deviceId": parseInt(v["deviceId"]),
          "botId": parseInt(v["shopId"]),
          "msgType": "unLockArtificialService",
        };
        self.websocketsend(obj);
      })

      this.websocketclose();
    },
    methods: {
      scrollButtom() { //输入框滚动条到底部
        setTimeout(() => {
          var div = document.getElementById("dialog_content_main");
          div.scrollTop = div.scrollHeight;
        }, 100)
      },
      textareaEnter(e) { //文本框enter触发事件
        if (e.keyCode == 13) {
          var obj = {
            "audioContent": "",
            "audioUrl": "",
            "autoContent": this.areaVal
          }
          this.shopList[this.shopIndex]["shopDialogList"].push(obj);
          this.scrollButtom();
          this.scrollButtom();
          this.areaVal = "";
        }
      },
      toDetailShop(index) { //商店详情
        let self = this;
        /*if(index == self.shopIndex && !this.checkVal(self.shopIndex+"")){
                    return;
                }*/
        /*if(this.checkVal(self.shopIndex+"")){
                    if(index == self.shopIndex){
                        return;
                    }
                }*/
        self.shopIndex = index;
        self.changeStatus(self.shopList[index]["status"]);
        self.botId = self.shopList[index]["shopId"];
        self.appId = self.shopList[index]["appId"];
        if (!checkVal(self.shopList[index]["deviceId"])) {
          self.deviceId = 0;
        } else {
          self.deviceId = self.shopList[index]["deviceId"];
        }

        self.initFlag = self.shopList[index]["initFlag"];
        self.shopName = self.shopList[index]["shopName"];
        self.totalPrice = self.shopList[index]["totalPrice"];
        self.robot = self.shopList[index]["robot"];
        self.toArtificialFlag = self.shopList[index]["toArtificialFlag"];
        self.changeStep(index);
        self.dialogList = self.shopList[index]["shopDialogList"];
        self.scrollButtom();
        if (self.shopList[index]["status"]["menu"]) {
          self.orderList = self.shopList[index]["orderList"];
          self.choiceOrderList = self.shopList[index]["choiceOrderList"];
        }
        self.getReplyList(self.shopList[index]["status"]);
      },
      changeStep(i) { //修改步骤
        var obj = this.shopList[i]["stepObj"];
        $(".order_flow_main div").removeClass("focus");
        let step = "";
        if (obj["tangshiOrWaidaiF"]) {
          step = "1";
        }
        if (obj["orderEditF"]) {
          step = "2";
        }
        if (obj["payTypeF"]) {
          step = "3";
        }
        if (obj["payContentF"]) {
          step = "4";
        }
        switch (step) {
          case '1':
            $("#tangshiOrWaidai").addClass("focus");
            break;
          case '2':
            $("#orderEdit").addClass("focus");
            break;
          case '3':
            $("#payType").addClass("focus");
            break;
          case '4':
            $("#payContent").addClass("focus");
            break;
        }
        if (!this.checkVal(step)) {
          $(".order_flow_main div").first().addClass("focus");
        }
        $("#tangshiOrWaidai").html(obj["tangshiOrWaidai"]);
        $("#orderEdit").html(obj["orderEdit"]);
        $("#payType").html(obj["payType"]);
        $("#payContent").html(obj["payContent"]);
      },
      async getReplyList(status) { //回复列表
        var endStatus = "";
        for (let i in status) {
          if (status[i]) {
            endStatus = i;
          }
        }
        let self = this;
        var payment = "";
        if (endStatus == "mode") {
          payment = "address";
        } else if (endStatus == "menu") {
          payment = "order";
        } else if (endStatus == "paymode") {
          payment = "payment";
        }
        if (!this.checkVal(this.applyListAll[payment])) {
          if (!this.checkVal(payment)) {
            return;
          }
          let data = await http.get('/cs/smartreply', {
            "scenes": payment,
            "userId": sessionStorage.getItem("loginUserId")
          });
          if (data.code == "0000") {
            this.applyListAll[payment] = data.data;
            this.applyList = data.data;
          } else {
            this.layerToast(data.desc);
          }
        } else {
          this.applyList = this.applyListAll[payment];
        }
      },
      changeNumToOrder(obj, index, type) { //修改订单数量
        let self = this;
        if (self.shopList[self.shopIndex]["robot"]) {
          return;
        }
        let cmdType = "";
        if (type == "reduce") {
          this.orderList[index]["num"]--;
          cmdType = "XMNRemoveItem";

        } else if (type == "add") {
          this.orderList[index]["num"]++;
          cmdType = "XMNAddItem";
        }

        this.websocketsend({
          "deviceId": parseInt(this.deviceId),
          "appId": parseInt(this.appId),
          "botId": parseInt(this.botId),
          "msgType": "cmd",
          "data": {
            "cmd": cmdType,
            "data": {
              "num": 1,
              "name": this.orderList[index]["name"]
            }

          }
        });
        let indexThis = "";
        $.each(this.choiceOrderList, function (k, v) {
          if (v.id == obj.id) {
            indexThis = k;
          }
        });
        if (!this.checkVal("" + indexThis)) {
          this.choiceOrderList.push(obj);
        } else {
          if (this.choiceOrderList[indexThis]["num"] == 0) {
            this.choiceOrderList.splice(indexThis, 1);
          }
        }
        self.shopList[self.shopIndex]["choiceOrderList"] = this.choiceOrderList;
        self.shopList[self.shopIndex]["totalPrice"] = this.getTotalPriceByOrderList(self.shopList[self.shopIndex]["choiceOrderList"]);
        self.totalPrice = self.shopList[self.shopIndex]["totalPrice"];
      },
      toChangeRobot() { //人工机器人互转
        //				this.toArtificialFlag = false;
        this.shopList[this.shopIndex]["toArtificialFlag"] = false;
        this.shopList[this.shopIndex]["robot"] = !this.shopList[this.shopIndex]["robot"];
        this.robot = this.shopList[this.shopIndex]["robot"];
        let msgType = "";
        if (this.shopList[this.shopIndex]["robot"]) { //机器人
          msgType = 'unLockArtificialService';
          this.$layer.toast({
            // className: 'icon-check', // 图标className 如果为空 toast位置位于下方,否则居中
            content: "跳转至机器人",
            time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
          })
        } else {
          msgType = 'lockArtificialService';
          this.$layer.toast({
            // className: 'icon-check', // 图标className 如果为空 toast位置位于下方,否则居中
            content: "跳转至人工客服",
            time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
          })
        }
        let obj = {
          "deviceId": parseInt(this.deviceId),
          "botId": parseInt(this.botId),
          "msgType": msgType,
        };
        this.websocketsend(obj);
      },
      changeStatus(status) { //修改步骤状态
        var endStatus = "";
        for (let i in status) {
          if (status[i]) {
            endStatus = i;
          }
        }
        let self = this;
        self.edibleFlag = false;
        self.orderFlag = false;
        self.payFlag = false;
        switch (endStatus) {
          case 'mode':
            var flag = false;
            var l = this.shopList[this.shopIndex]["shopDialogList"];
            for (var i = 0; i < l.length; i++) {
              if ("在这吃还是带走" == l[i]["autoContent"]) {
                flag = true;
              }
            }
            if (!flag) {
              var obj = {
                "audioContent": "",
                "audioUrl": "",
                "autoContent": "在这吃还是带走",
                "audioTittle": ''
              }
              this.shopList[this.shopIndex]["shopDialogList"].push(obj);

              this.scrollButtom();
            }
            this.shopList[this.shopIndex]["stepObj"]["tangshiOrWaidaiF"] = true;
            self.edibleFlag = true;
            break;
          case 'menu':
            var flag = false;
            var l = this.shopList[this.shopIndex]["shopDialogList"];
            for (var i = 0; i < l.length; i++) {
              if ("客官，想吃点什么" == l[i]["autoContent"]) {
                flag = true;
              }
            }
            if (!flag) {
              var obj = {
                "audioContent": "",
                "audioUrl": "",
                "autoContent": "客官，想吃点什么",
                "audioTittle": ''
              }
              this.shopList[this.shopIndex]["shopDialogList"].push(obj);

              this.scrollButtom();
            }
            self.orderFlag = true;
            self.shopList[self.shopIndex]["stepObj"]["orderEditF"] = true;
            break;
          case 'paymode':
            var flag = false;
            var l = this.shopList[this.shopIndex]["shopDialogList"];
            for (var i = 0; i < l.length; i++) {
              if ("微信支付还是现金支付" == l[i]["autoContent"]) {
                flag = true;
              }
            }
            if (!flag) {
              var obj = {
                "audioContent": "",
                "audioUrl": "",
                "autoContent": "微信支付还是现金支付",
                "audioTittle": ''
              }
              this.shopList[this.shopIndex]["shopDialogList"].push(obj);

              this.scrollButtom();
            }
            self.payFlag = true;
            this.shopList[this.shopIndex]["stepObj"]["payTypeF"] = true;
            break;
        }
      },
      async getShopList() { //得到商店列表
        let self = this;
        this.$layer.loading('加载中...');
        let data = await http.get('/cs/listdevice', {});
        this.$layer.close();
        if (data.code == "0000") {
          let list = data.data;
          for (let i = 0; i < list.length; i++) {
            var devsList = list[i]["devs"];
            for (let b = 0; b < devsList.length; b++) {
              var obj = devsList[b];
              if (b == 0) {
                self.botId = obj.id;
              }
              if (obj.style == "xmnbot") {
                var shopListObj = {
                  "shopName": "小馒牛",
                  "shopId": obj.id,
                  "shopDialogList": [],
                  "status": {
                    "init": false,
                    "mode": false,
                    "menu": false,
                    "paymode": false
                  },
                  "orderList": [],
                  "choiceOrderList": [],
                  "initFlag": false,
                  "robot": true,
                  "toArtificialFlag": false,
                  "deviceId": "",
                  "totalPrice": 0,
                  "appId": "",
                  "stepObj": {
                    "tangshiOrWaidai": "方式",
                    "tangshiOrWaidaiF": false,
                    "orderEdit": "点餐",
                    "orderEditF": false,
                    "payType": "选择支付方式",
                    "payTypeF": false,
                    "payContent": "支付方式",
                    "payContentF": false
                  }

                };
                self.shopList.push(shopListObj);
              }
            }
          }
          setTimeout(() => {
            $(".dialog_menu .dialog_menu_list").first().click();
          }, 500);
        } else {
          this.layerToast(data.desc);
        }
      },
      changeAudio(obj, event) { //语音播放
        $(".phoneticsMain i").removeClass("focus").addClass("nomal");
        let thisEvent = event.target;
        $("audio").remove();
        var srcs = obj.audioUrl, that = $("body"),
          audioWav = '<audio controls="controls" id="audioObj" autobuffer="autobuffer" autoplay="autoplay" hidden>' +
            '<source src="data:audio/wav;base64,' + srcs + '" type="audio/ogg">' +
            '<source src="data:audio/acc;base64,' + srcs + '" type="audio/ogg">' +
            '</audio>';
        /*  var audioMp3 = '<audio controls="controls" id="audioObj" autobuffer="autobuffer" autoplay="autoplay" hidden>' +
            '<source src="data:audio/acc;base64,' + srcs + '" type="audio/ogg">' +
            '</audio>'*/
        // this.myBrowser(that, audioMp3, audioWav, thisEvent);
        that.append(audioWav);
        $(thisEvent).find("i").removeClass("nomal").addClass("focus");
        document.getElementById("audioObj").addEventListener("ended", function () {
          $(thisEvent).find("i").removeClass("focus").addClass("nomal");
        });
      },
      myBrowser(that, audioMp3, audioWav, thisEvent) { //浏览器判断语音播放
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
          //return "Opera"
          that.append(audioWav);
        } //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
          //					return "FF";
          that.append(audioWav);
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1) {
          that.append(audioWav);
          //					return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
          //					return "Safari";
          that.append(audioMp3);
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
          that.append(audioMp3);
          //					return "IE";
        }//判断是否IE浏览器
        $(thisEvent).find("i").removeClass("nomal").addClass("focus");
        var thisObj = document.getElementById("audioObj");
        thisObj.addEventListener("ended", function () {
          $(thisEvent).find("i").removeClass("focus").addClass("nomal");
        });
      },
      calTime() { //订单事件
        let t = this;
        this.timeInterVal = setInterval(function () {
          time++;
          t.timing = t.countDown(time);
        }, 1000);
      },
      countDown(time) {
        var spit = ":";
        var hour = "00";
        var second = "00";
        var min = "00";
        var result = "";
        if (time % 60 != 0) { //秒
          if (time % 60 >= 10) {
            second = time % 60;
          } else {
            second = "0" + time % 60;
          }
        }
        if (parseInt(time / 60) != 0) { //分
          if (parseInt(time / 60) >= 10) {
            min = parseInt(time / 60);
          } else {
            min = "0" + parseInt(time / 60);
          }
        }
        result = /*hour + spit*/ +min + spit + second;
        return result;
      },
      editbleFun(type) { //操作按钮
        if (this.shopList[this.shopIndex]["robot"]) {
          return;
        }
        var thisObj = this.shopList[this.shopIndex];
        let obj = {
          "deviceId": parseInt(this.deviceId),
          "appId": parseInt(this.appId),
          "botId": parseInt(this.botId),
          "msgType": "cmd",
          "data": {
            "cmd": type,
            "answer": ""
          }
        };
        var content = "";
        if (type == "XMNChooseEatIn") {
          content = "堂食";
        } else if (type == "XMNChooseTakeOut") {
          content = "外带";
        }
        if (this.checkVal(content)) {
          this.shopList[this.shopIndex]["stepObj"]["tangshiOrWaidai"] = content;
          this.shopList[this.shopIndex]["stepObj"]["tangshiOrWaidaiF"] = true;
        }
        this.websocketsend(obj);
        if ("XMNCancel" == type) {
          var shopObj = this.getThisShopObj();
          this.clearData(shopObj["shopId"]);
          return;
        } else if ("XMNConfirm" == type) {
          this.edibleFlag = false;
          this.shopList[this.shopIndex]["orderEdit"]["orderEditF"] = true;
        }
        this.changeStep(this.shopIndex);
      },
      getThisShopObj() { //得到当前商店信息
        return this.shopList[this.shopIndex];
      },
      editbleFun1(type) {
        if (this.shopList[this.shopIndex]["robot"]) {
          return;
        }
        let obj = {
          "deviceId": parseInt(this.deviceId),
          "appId": parseInt(this.appId),
          "botId": parseInt(this.botId),
          "msgType": "cmd",
          "data": {
            "cmd": type,
            "answer": ""
          }
        };
        this.websocketsend(obj);
        this.shopList[this.shopIndex]["status"]["paymode"] = true;
        this.toDetailShop(this.shopIndex);
      },
      layerToast(val) { //弹框
        this.$layer.toast({
          content: val,
          time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
        })
      },
      initWebSocket() { //初始化weosocket
        const wsUrl = "ws://47.92.93.152:8000/v1/cs/wmelody?mobile="+sessionStorage.getItem("loginUserId"); //ws地址
        // const wsUrl = "ws://192.168.1.234:8081/v1/student/wmelody"; //ip
        this.websock = new WebSocket(wsUrl);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
        this.dialogList = [];
      },
      websocketonopen() {
        console.log("WebSocket连接成功");
      },
      websocketonerror(e) { //错误
        console.log("WebSocket连接发生错误");
      },
      getTotalPriceByOrderList(list) {
        var total = 0;
        let self = this;
        list.forEach((v, k) => {
          if (self.checkVal(v["num"]) && self.checkVal(v["price"])) {
            total = parseFloat(total) + parseFloat(v["num"]) * parseFloat(v["price"]);
          }
        });
        if (Number.isNaN(total))return 0;
        return total;
      },
      getThisTime() {
        var date = new Date();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return hour + ":" + minute + ":" + second;
      },
      clearData(botId) { //根据商店id清空数据
        var list = this.shopList;
        var i = "";
        $.each(this.shopList, function (k, v) {
          if (botId == v.shopId) {
            i = k;
            v.status = {
              "init": false,
              "mode": false,
              "menu": false,
              "paymode": false
            };
            v.totalPrice = 0;
            v.stepObj = {
              "tangshiOrWaidai": "方式",
              "tangshiOrWaidaiF": false,
              "orderEdit": "点餐",
              "orderEditF": false,
              "payType": "选择支付方式",
              "payTypeF": false,
              "payContent": "支付方式",
              "payContentF": false
            }
            v.orderList = [];
            v.shopDialogList = [];
            v.choiceOrderList = [];
            v.initFlag = false;
            v.robot = true;
            v.toArtificialFlag = false;
          }

        }),
          this.shopList = list;
        this.changeStep(i);
      },
      addImfById(type, val, id) { //根据id修改数据
        let self = this;
        $.each(self.shopList, function (k, v) {
          if (v["shopId"] == id) {
            v[type] = val;
            self.shopList[k] = v;
          }
        });
      },
      websocketonmessage(e) { //数据接收
        const redata = JSON.parse(e.data);
        let self = this;
        console.log(redata);
        if (redata.deviceId == 0) {
          self.addImfById("toArtificialFlag", false, redata.botId);
        }
        let shopIndexById = "";
        $.each(self.shopList, function (k, v) {
          if (v["shopId"] == redata.botId) {
            shopIndexById = k;
          }
        });
        self.addImfById("appId", redata.appId, redata.botId);
        self.addImfById("initFlag", true, redata.botId);
        if (this.deviceId == "" || this.deviceId == undefined || this.deviceId == undefined) {
          if (redata.deviceId != 0) {
            this.addImfById("deviceId", redata.deviceId, redata.botId);
            //						this.deviceId = redata.deviceId;
          }
        }
        if (redata.msgType == "audio") {
          if (redata.data.text == 'start') {
            return;
          } else {
            if (this.checkVal(redata.data.text) && this.checkVal(redata.data.audio)) {
              var obj = {
                "audioContent": redata.data.text,
                "audioUrl": redata.data.audio,
                "autoContent": "",
                "audioTittle": ''
              };
              $.each(self.shopList, function (k, v) {
                if (v.shopId == redata.botId) { //302
                  self.shopList[k]["shopDialogList"].push(obj);
                  self.scrollButtom();
                }
              });
            }
          }

        } else if (redata.msgType == 'status') {
          if (redata.data[redata.msgType] == 'start') {
            var flag = true;
            //						var obj = $(".dialog_content_main span");
            var obj = self.shopList[shopIndexById]["shopDialogList"];
            for (var i = 0; i < obj.length; i++) {
              if (obj[i]["audioTittle"] == "开始点餐") {
                flag = false;
              }
            }
            if (flag) {
              var obj = {
                "audioContent": "",
                "audioUrl": "",
                "autoContent": "",
                "audioTittle": this.getThisTime() + '开始点餐'
              }
              $.each(self.shopList, function (k, v) {
                if (v.shopId == redata.botId) {
                  self.shopList[k]["shopDialogList"].push(obj);
                  self.scrollButtom();
                }
              });
            }
            this.websocketsend({
              "deviceId": parseInt(redata.deviceId),
              "appId": parseInt(redata.appId),
              "botId": parseInt(redata.botId),
              "msgType": "cmd",
              "data": {
                "cmd": "XMNActivate"
              }
            });
          } else if (redata.data[redata.msgType] == "mode") {
            var flag = true;
            var obj = self.shopList[shopIndexById]["shopDialogList"];
            for (var i = 0; i < obj.length; i++) {
              if (obj[i]["audioTittle"] == "选择方式") {
                flag = false;
              }
            }
            if (flag) {
              var obj = {
                "audioContent": "",
                "audioUrl": "",
                "autoContent": "",
                "audioTittle": this.getThisTime() + '选择方式'
              }
              $.each(self.shopList, function (k, v) {
                if (v.shopId == redata.botId) {
                  self.shopList[k]["shopDialogList"].push(obj);
                }
              });
            }

            $.each(self.shopList, function (k, v) {
              if (v.shopId == redata.botId) {
                self.shopList[k]["status"]["mode"] = true;
              }
            });
          } else if (redata.data[redata.msgType] == "orderwd") {
            this.shopList[shopIndexById]["status"]["paymode"] = false;
            this.shopList[shopIndexById]["stepObj"]["tangshiOrWaidai"] = "外带";
            this.shopList[shopIndexById]["orderEditF"] = true;
          } else if (redata.data[redata.msgType] == "orderts") {
            this.shopList[shopIndexById]["stepObj"]["tangshiOrWaidai"] = "堂食";
            this.shopList[shopIndexById]["orderEditF"] = true;
            this.shopList[shopIndexById]["status"]["paymode"] = false;
          } else if (redata.data[redata.msgType] == 'init') {
            this.clearData(redata.botId);
            this.addImfById("initFlag", false, redata.botId);
            //						this.initFlag = false;
            this.websocketsend({
              "deviceId": parseInt(this.deviceId),
              "botId": parseInt(this.botId),
              "msgType": "unLockArtificialService",
            });
          }

        } else if (redata.msgType == "menu") {
          var flag = true;
          var obj = self.shopList[shopIndexById]["shopDialogList"];
          for (var i = 0; i < obj.length; i++) {
            if (obj[i]["audioTittle"] == "点餐") {
              flag = false;
            }
          }
          if (flag) {
            var obj = {
              "audioContent": "",
              "audioUrl": "",
              "autoContent": "",
              "audioTittle": this.getThisTime() + '点餐'
            };
            $.each(self.shopList, function (k, v) {
              if (v.shopId == redata.botId) {
                self.shopList[k]["shopDialogList"].push(obj);
                self.scrollButtom();
              }
            });
          }
          $.each(self.shopList, function (k, v) {
            if (v.shopId == redata.botId) { //302
              self.shopList[k]["orderList"] = [];
              self.shopList[k]["status"]["menu"] = true;

              $.each(redata.data, function (k1, v1) {
                v1["num"] = 0;
                if (v1["name"] != undefined && v1["name"] != null && v1["name"] != "") {
                  self.shopList[k]["orderList"].push(v1);
                }
              });
            }
          });

        } else if (redata.msgType == "cmd") {
          if (redata.data[redata.msgType] == "XMNAddItem" || redata.data[redata.msgType] == "XMNRemoveItem") {
            var num = redata.data.data.num;
            var name = redata.data.data.name;
            var choiceOrderList = this.shopList[shopIndexById]["choiceOrderList"];
            var orderList = this.shopList[shopIndexById]["orderList"];
            var shopListFlag = false;
            $.each(choiceOrderList, function (k, v) {
              if (v.name == name) {
                shopListFlag = true;
                /*if (redata.data[redata.msgType] == "XMNAddItem") {
                  v.num = v.num + parseInt(num);
                } else {
                  v.num = v.num - parseInt(num);
                }*/
              }
            });
            $.each(orderList, function (k, v) {
              if (v.name == name) {
                if (redata.data[redata.msgType] == "XMNAddItem") {
                  v.num = v.num + parseInt(num);
                } else {
                  v.num = v.num - parseInt(num);
                }
                if (!shopListFlag) {
                  choiceOrderList.push(v);
                }
              }
            });
            this.shopList[shopIndexById]["orderList"] = orderList;
            this.shopList[shopIndexById]["choiceOrderList"] = choiceOrderList;
            this.shopList[shopIndexById]["totalPrice"] = this.getTotalPriceByOrderList(this.shopList[shopIndexById]["orderList"]);
            // this.choiceOrderList = choiceOrderList;
          } else if (redata.data[redata.msgType] == "XMNConfirm") {
            this.shopList[shopIndexById]["status"]["paymode"] = true;
          } else if (redata.data[redata.msgType] == "XMNUNKNOW") {
            console.log(redata.data[redata.msgType]);
            this.addImfById("toArtificialFlag", true, redata.botId);
            this.$layer.toast({
              content: "请跳转至人工客服",
              time: 3000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            })
          } else if (redata.data[redata.msgType] == "XMNBack") {
            this.shopList[this.shopIndex]["stepObj"]["payTypeF"] = false;
          }
        }
        setTimeout(() => {
          self.toDetailShop(self.shopIndex);
        }, 0);
      },
      websocketsend(agentData) { //数据发送
        this.websock.send(JSON.stringify(agentData));
      },
      websocketclose(e) { //关闭

      },
      login_close() { //清空登录信息
        this.login_account = "";
        this.login_pwd = "";
      },

      async login_submit() { //登录操作
        if (!this.checkVal(this.login_account)) {
          this.layerToast("请输入账号");
          return;
        }
        if (!this.checkVal(this.login_pwd)) {
          this.layerToast("请输入账号");
          return;
        }

        let params = {
          login: this.login_account,
          password: this.login_pwd
        };
        let self = this;
        this.$layer.loading('登录中...');
        let data = await http.post('/user/login', params);
        this.$layer.close();
        if (data.code == "0000") {
          sessionStorage.setItem("loginUser", true);
          sessionStorage.setItem("loginUserId", data.data.mobile);
          setCookie("loginImf", JSON.stringify({
            "name": this.login_account,
            "pwd": this.login_pwd
          }));
          this.loginBombFlag = false;
          self.initWebSocket();
          self.getShopList();
        } else {
          this.layerToast(data.desc);
        }
      },
      checkVal: function (val) { //判断是否为空
        return !(val === "" || val == null || val == undefined);
      },
      toSetArtificial(obj) { //语音识别是被操作
        console.log(obj);
        this.replyObj = obj;
        this.setPage = obj.Scenes;
        this.setPosition = obj.LocationId;
        this.setBombFlag = true;
        this.applyContent = obj.Message;
      },
      setClose() { //修改回复
        this.setPage = "";
        this.setPosition = "";
        this.setBombFlag = false;
      },
      async setSave() { //回复保存
        if (!this.checkVal(this.setPage)) {
          this.layerToast("请选择所属页面");
          return;
        }
        if (!this.checkVal(this.setPosition)) {
          this.layerToast("请选择位置");
          return;
        }
        if (!this.checkVal(this.applyContent)) {
          this.layerToast("请输入回复内容");
          return;
        }
        var obj = this.replyObj;
        let params = {
          "userId": obj.userId,
          "appId": obj.appId,
          "locationId": parseInt(this.setPosition),
          "scenes": this.setPage,
          "message": this.applyContent
        }
        let self = this;
        this.$layer.loading('修改...');
        let data = await http.post('/cs/smartupdate', params);
        this.$layer.close();
        if (data.code == "0000") {
          self.toDetailShop(self.shopIndex);
          self.setBombFlag = false;
        } else {
          this.layerToast(data.desc);
        }
      }
    }
  }
</script>
<style scoped lang='css'>
  @import "../assets/css/HomePage.css";
</style>
