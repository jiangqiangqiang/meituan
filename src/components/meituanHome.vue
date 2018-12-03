<template>
  <div>
    <div class="customerService">
      <audio id="audio1"
             src="../../static/audio/dd.mp3">
      </audio>
      <div class="menu_main">
        <div class="dialog_top_party">
          <div class="dialog_menu">
            <div class="dialog_menu_top">
              <div class="content">客服系统</div>
            </div>
            <div class="chatContent">
              <el-button style="margin-left: 5px" @click="recieveAllMessage">接收全部消息</el-button>
              <!--@mouseup="toDetailShop1(index)"-->
              <div class="dialog_menu_list" v-for="(list,index) in shopList" :key="index"
                   :class="!list.initFlag? list.robot?'artificialStyle4':'artificialStyle3' : list.robot ? list.toArtificialFlag? 'artificialStyle' : 'artificialStyle1' : 'artificialStyle' "
                   @click="toDetailShop(index,'aa',list.shopName,list.shopId)"
                   v-show="list.initFlag"
                   style="color: #333;height: 60px;border-bottom: .5px solid #fff">
                <i></i>
                <div class="shop_main">
                  <div class="img">
                  </div>
                  <div class="content">（{{list.shopName}}）<span class="justSelect" v-show="justSelect"></span></div>
                  <div class="content" v-show="list.initFlag">
                    <span class="dialog_logo"></span> 正在对话 . . .
                  </div>
                </div>
              </div>
            </div>
            <div class="sysName">
              <i></i>
              <div class="sysNameMian">
                <div class="logo" style="height: 40px;">
                  <!--<img src="../assets/img/meituan/meituanlogo.png"/>-->
                </div>
                <div class="content">美团TV客服系统</div>
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
                  <div class="artificial_list" v-for="(apply,index) in applyList" :key="index">
                    <div class="logo">智</div>
                    <div class="content">{{apply.Message}}</div>
                    <div class="set" @click="toSetArtificial(apply)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="dialog_top_party_main">
            <div class="dialog_top_party_top">
              <div class="name">{{listName}}</div>
              <div class="dialog_type" @click="loginBombFlag=true">关闭订单</div>
            </div>
            <div class="dialog_content_main">
              <div class="AudioProgress">
                <div class="block">
                  <span class="demonstration" style="color: rgba(246, 83, 2, 0.7)">语音速度</span>
                  <br/>
                  <span class="demonstration" style="color: #409EFF">&nbsp;&nbsp;&nbsp;2倍</span>
                  <el-slider v-model="value4" :format-tooltip="formatTooltip" vertical height="200px"
                             style="margin: 10px 10px;"></el-slider>
                  <span class="demonstration" style="color: #409EFF">&nbsp;&nbsp;&nbsp;1倍</span>
                </div>
              </div>
              <div class="dialog_content">
                <div class="null_order" v-show="dialogList.length == 0">
                  <div class="null_order_content">
                    暂无订单
                  </div>
                </div>
                <div class="dialog_content_main" id="dialog_content_main" v-show="dialogList.length != 0">
                  <div class="dialog_lists" v-for="(l,index) in dialogList" :key="index">
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
                        <div class="typecmd">{{typeCMD[index]}}</div>
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
        </div>
        <div class="dialog_top_party">
          <div class="partyRight">
            <div class="productListPage">
              <div class="topVioce"><img src="../assets/img/yinfu.png" alt="" style="width: 12px;margin-right: 10px">主人您可以跟我说：
                <el-tag type="warning">吉野家</el-tag>
                <el-tag type="warning">饺子</el-tag>
                <el-tag type="warning">早点</el-tag>
              </div>
              <transition name="slide-fade1">
                <div class="audioText" v-if="audioTextShow">{{audioText}}</div>
              </transition>
              <div v-if="shopListShow">
                <div class="logo"></div>
                <div class="menu">
                  <ul v-for="(menus,index) in typeList1" :key="index">
                    <li
                      :class="activeMenu==menus?'menuActive':null" @click="changeTab2(menus,index)">
                      {{menus}}
                    </li>
                  </ul>
                </div>
                <div class="shopContainer">
                  <div class="shopList">
                    <ul class="shopListCon">
                      <li v-for="(item,index) in shopList11" ref="shopLis" @click="shopLisFn(index+1,item.name)"
                          :key="index">
                        <div class="pic" :index="item.wm_poi_id"><img :src="item.pic_url" alt=""></div>
                        <div class="desc" :index="item.wm_poi_id">
                          <div class="shopTitle">{{item.name}}</div>
                          <div class="grade"><span>*****</span>{{item.wm_poi_score}}分</div>
                          <div>
                            <span>起送：￥{{item.min_price}}&nbsp; </span><span>&nbsp; 配送：￥{{item.shipping_fee}} &nbsp;</span><span>&nbsp; 人均：￥23 &nbsp;</span>
                            <span>&nbsp;{{item.avg_delivery_time}}分钟&nbsp;</span><span> &nbsp;{{item.distance}}</span>
                          </div>
                        </div>
                        <div class="topTip">{{index+1}}</div>
                      </li>
                    </ul>
                    <div style="color: #fff;width: 200px;margin: 2px auto"><span
                      style="cursor: pointer;margin-right: 3px" @click="bbbb">上一页</span><span
                      style="color: rgba(255, 152, 0, .9);">{{shopPage}}</span><span>/{{shopPageTotal}}</span><span
                      style="cursor: pointer;margin-left: 3px" @click="aaaa">下一页</span></div>
                  </div>
                  <div class="rightBar">
                    <img src="../assets/img/meituan/meituan-apple-tv_03.png" alt="" v-show="tab1"
                         @click="tabChange(tab1,'1')">
                    <img src="../assets/img/meituan/meituan-apple-tv_05.png" alt="" v-show="!tab1"
                         @click="tabChange(tab1,'1')">
                    <img src="../assets/img/meituan/meituan-apple-tv_08.png" alt="" v-show="tab2"
                         @click="tabChange(tab2,'2')">
                    <img src="../assets/img/meituan/meituan-apple-tv_10.png" alt="" v-show="!tab2"
                         @click="tabChange(tab2,'2')">
                    <img src="../assets/img/meituan/meituan-apple-tv_14.png" alt="" v-show="tab3"
                         @click="tabChange(tab3,'3')">
                    <img src="../assets/img/meituan/meituan-apple-tv_12.png" alt="" v-show="!tab3"
                         @click="tabChange(tab3,'3')">
                    <img src="../assets/img/meituan/meituan-apple-tv_19.png" alt="" v-show="tab4"
                         @click="tabChange(tab4,'4')">
                    <img src="../assets/img/meituan/meituan-apple-tv_17.png" alt="" v-show="!tab4"
                         @click="tabChange(tab4,'4')">
                  </div>
                </div>
              </div>
              <div v-if="DetailListShow">
                <div class="diologBox"
                     v-if="(dishesSpecification.length>1&&diologBoxShow)||(Attrs.length>0&&diologBoxShow)">
                  <div class="specification">
                    <div><span style="font-size: 20px;line-height: 40px;margin-left: 15px;font-weight: bold">{{SpecificationName}}</span><span
                      style="float: right;color: #f65302;line-height: 40px;font-size: 20px;margin-right: 15px">{{SpecificationPrice}}元</span>
                    </div>
                    <div style="margin:0 15px 10px 15px" v-show="dishesSpecification.length>1">规格</div>
                    <el-radio-group v-model="radio2" style="margin-left: 15px"
                                    v-show="dishesSpecification.length>1"
                                    v-for="(item,index) in dishesSpecification" :key="index"
                                    @change="guiGeChange(index)">
                      <el-radio :label="item.spec" size="mini" :border="true">{{item.spec}}</el-radio>
                    </el-radio-group>
                    <div v-for="(item,index) in Attrs" :key="index+10" v-show="Attrs.length>0">
                      <div style="margin:0 15px 10px 15px" v-show="Attrs.length>0">{{item.name}}</div>
                      <el-radio-group style="margin-left: 15px"
                                      v-for="(item1,index1) in item.values" v-model="item['Attrs'+index]" :key="index1"
                                      v-show="Attrs.length>0" @change="guiGeChange1(index1,index)">
                        <el-radio :label="item1.value" size="mini" :border="true">{{item1.value}}</el-radio>
                      </el-radio-group>
                    </div>
                    <div style="margin:5px auto 50px;width: 130px;">
                      <el-input-number v-model="num1" @change="handleChange" :min="1" :max="1000" size="mini"
                                       label="描述文字"></el-input-number>
                    </div>
                    <div
                      style="position: absolute;bottom: 0;left: 0;right: 0;height: 40px;background: #a0cfff;color: #fff;line-height: 40px;text-align: center;cursor: pointer"
                      @click="submitFn">
                      选好了
                    </div>
                  </div>
                </div>
                <div style="width: 150px;height: 50px;"><img :src="dishes1.poi_info.pic_url" alt=""
                                                             style="width: 50px;height: 50px;padding-left: 50px">
                </div>
                <div class="menu" style="height: 293px;">
                  <ul class="foodList" v-for="(menus,index) in dishes1.food_spu_tags" :key="index">
                    <li
                      :class="activeMenu1==menus.name?'menuActive':null" :key="index"
                      @click="changeTab3(menus.name,index)" ref="activeMenu1">{{menus.name}}
                    </li>
                  </ul>
                </div>
                <div class="shopContainer">
                  <div class="shopList">
                    <ul class="shopListCon" style="width: 70%;margin: 0;float: left;" ref="detailScroll"
                        id="detailScroll">
                      <!--<li v-for="(item,index) in dishes22" :key="index" ref="dishesLi" @click="dishesLisFn(index+1)">-->
                      <li v-for="(item,index) in dishes22" :key="index" ref="dishesLi">
                        <div class="pic" :index="item.id"><img :src="item.picture" alt=""></div>
                        <div class="desc" :index="item.id" style="position: relative;">
                          <div class="shopTitle">{{item.name}}</div>
                          <div class="grade"><span>月售</span>{{item.month_saled}}笔</div>
                          <div>
                            <span style="font-size: 22px;color: red">￥{{item.min_price}}&nbsp; </span>
                          </div>
                          <div class="numList">
                            <span v-for="l in numList" @click="goDishesByNum(index,l)">{{l}}</span>
                          </div>
                        </div>
                        <div class="topTip">{{index+1}}</div>
                        <div class="topTip"
                             style="bottom: 5px;right: 20px;top: auto;background: #fff;color: #f65302;border: 1px solid #f65302;cursor: pointer">
                          +
                        </div>
                      </li>
                    </ul>
                    <div style="color: #fff;width: 200px;margin: 2px auto"><span
                      style="cursor: pointer;margin-right: 3px" @click="bbbb">上一页</span><span
                      style="color: rgba(255, 152, 0, .9);">{{shopDishesPage}}</span><span>/{{shopDishesPageTotal}}</span><span
                      style="cursor: pointer;margin-left: 3px" @click="aaaa">下一页</span></div>
                    <div
                      style="width: 28%;height: 230px;background: rgba(0,0,0,.5);margin: 90px 0 0 8px;position: absolute;top:-10px;right: 48px;">
                      <div class="cartList">
                        <el-button type="text" class="cartButton" @click="seeCart">查看购物车</el-button>
                        <div class="cartPic" v-show="shopCardList.length == 0"><img
                          src="../assets/img/meituan/iconcart.png" alt=""
                          style="width: 70px;height: 70px;"><span>购物车是空的哦</span>
                        </div>
                        <ul class="shopListCon1" v-show="shopCardList.length != 0"
                            style="width: 100%;margin: 0;float: left;height: 100%;">
                          <li v-for="(item,index) in shopCardList" :key="index">
                            <div class="desc1" :index="item.id">
                              <div class="shopTitle1"
                                   style="height: 27px;line-height: 27px;color: black;width: calc(100% - 25px);overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                                {{item.name}}<!--({{item.radio2}})-->
                              </div>
                              <div style="width: 100%;height: 27px;line-height: 27px;">
                                <span style="font-size: 16px;color: red;float: left;">{{item.skus.length>1?item.skus[radio2Index].price:item.min_price}}&nbsp; 元</span>
                                <div class="shopCaidNumMian">
                                  <div class="operate">
                                    <!--<div class="reduce"></div>-->
                                    <i class="el-icon-delete" @click="removeFn(index+4)"
                                       style="color: #333333;font-size: 16px;margin-right: 25px;height: 20px;line-height: 20px"></i>
                                    <div class="num"><input
                                      style="width: 30px;height: 20px;border: 1px solid #e5e5e5;border-radius: 6px;text-align: center;margin-right: 10px;outline: none;"
                                      v-model="item.num" @blur="updateShopNum(index+4,item.num)"/></div>
                                    <!--<div class="increase"></div>-->
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="topTip1">{{index+4}}</div>
                          </li>
                        </ul>
                      </div>
                      <div class="cartFoot">
                        <div class="cartFootImf">
                          <div class="imf" v-show="shopCardList.length===0">￥{{dishes1.poi_info.min_price}}起送</div>
                          <div class="imf" v-show="shopCardList.length>0">{{totalPrice1 | numFilter}}元</div>
                          <div class="imf">另需配送费￥{{dishes1.poi_info.shipping_fee}}</div>
                        </div>
                        <div class="bottom" @click="toOder">去下单</div>
                      </div>
                    </div>
                  </div>
                  <div class="rightBar">
                    <img src="../assets/img/meituan/meituan-apple-tv_03.png" alt="" v-show="tab1"
                         @click="tabChange(tab1,'1')">
                    <img src="../assets/img/meituan/meituan-apple-tv_05.png" alt="" v-show="!tab1"
                         @click="tabChange(tab1,'1')">
                    <img src="../assets/img/meituan/meituan-apple-tv_08.png" alt="" v-show="tab2"
                         @click="tabChange(tab2,'2')">
                    <img src="../assets/img/meituan/meituan-apple-tv_10.png" alt="" v-show="!tab2"
                         @click="tabChange(tab2,'2')">
                    <img src="../assets/img/meituan/meituan-apple-tv_14.png" alt="" v-show="tab3"
                         @click="tabChange(tab3,'3')">
                    <img src="../assets/img/meituan/meituan-apple-tv_12.png" alt="" v-show="!tab3"
                         @click="tabChange(tab3,'3')">
                    <img src="../assets/img/meituan/meituan-apple-tv_19.png" alt="" v-show="tab4"
                         @click="tabChange(tab4,'4')">
                    <img src="../assets/img/meituan/meituan-apple-tv_17.png" alt="" v-show="!tab4"
                         @click="tabChange(tab4,'4')">
                  </div>
                </div>
              </div>
              <div v-if="OrderShow">
                <div class="orderDetail">
                  <div class="orderShop"><img :src="prevelOrder.poi_pic" alt="">{{prevelOrder.poi_name}}</div>
                  <div class="orderDishesList">
                    <ul>
                      <li v-for="(list,index) in prevelOrderDishes" :key="index">
                        <span class="orderDishesName">{{list.food_name}}</span>
                        <span class="orderDishesNum">×{{list.count}}</span>
                        <span class="orderDishesNum">￥{{list.food_price}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="desName">
                    <div><span class="LeftS">商品总价</span><span class="RightS">￥{{prevelOrder.total-prevelOrder.box_total_price-prevelOrder.shipping_fee| numFilter}}</span>
                    </div>
                    <div><span class="LeftS">餐盒费</span><span class="RightS">￥{{prevelOrder.box_total_price}}</span>
                    </div>
                    <div><span class="LeftS">起距加价</span><span class="RightS"></span></div>
                    <div><span class="LeftS">配送费</span><span class="RightS">￥{{prevelOrder.shipping_fee}}</span></div>
                  </div>
                  <div class="footerCount">&nbsp;&nbsp;合计金额<span class="priceStyle">￥{{prevelOrder.total}}</span></div>
                </div>
                <div class="adressPay">
                  <div class="adressCon">
                    <div class="AdressLogo"><i class="el-icon-location-outline"></i></div>
                    <div>
                      <div class="phoneName">{{prevelOrder.recipient_name}}
                        &nbsp;&nbsp;{{prevelOrder.recipient_phone}}
                      </div>
                      <div class="adressA">{{prevelOrder.recipient_address}}</div>
                    </div>
                  </div>
                  <div class="payButton" @click="toOder">下单并支付</div>
                </div>
                <div class="rightBar">
                  <img src="../assets/img/meituan/meituan-apple-tv_03.png" alt="" v-show="tab1"
                       @click="tabChange(tab1,'1')">
                  <img src="../assets/img/meituan/meituan-apple-tv_05.png" alt="" v-show="!tab1"
                       @click="tabChange(tab1,'1')">
                  <img src="../assets/img/meituan/meituan-apple-tv_08.png" alt="" v-show="tab2"
                       @click="tabChange(tab2,'2')">
                  <img src="../assets/img/meituan/meituan-apple-tv_10.png" alt="" v-show="!tab2"
                       @click="tabChange(tab2,'2')">
                  <img src="../assets/img/meituan/meituan-apple-tv_14.png" alt="" v-show="tab3"
                       @click="tabChange(tab3,'3')">
                  <img src="../assets/img/meituan/meituan-apple-tv_12.png" alt="" v-show="!tab3"
                       @click="tabChange(tab3,'3')">
                  <img src="../assets/img/meituan/meituan-apple-tv_19.png" alt="" v-show="tab4"
                       @click="tabChange(tab4,'4')">
                  <img src="../assets/img/meituan/meituan-apple-tv_17.png" alt="" v-show="!tab4"
                       @click="tabChange(tab4,'4')">
                </div>
                <div class="diologBox" v-if="payShow">
                  <div class="payContent">
                    <div class="payPrice">
                      <p style="color: red;font-size: 24px;line-height: 22px">￥{{prevelOrder.total}}</p>
                      <p style="font-size: 18px;color: #333333">请扫码完成付款</p>
                    </div>
                    <div class="payPic"><img :src="payOrder.pay_url" alt=""></div>
                  </div>
                </div>
              </div>
              <div v-if="AdressShow">
                <div class="diologBox">
                  <img src="../assets/img/meituan/page-1-iptv_adress.png" alt="" style="width: 75%;height: 60%;">
                </div>
              </div>
              <div v-if="shopCartListShow">
                <div class="diologBox">
                  <div class="cartBox">
                    <div class="cartTop">购物车</div>
                    <div class="cartContent">
                      <ul class="shopListCon1" v-show="shopCardList.length != 0"
                          style="width: 100%;margin: 0;float: left;height: 100%;">
                        <li v-for="(item,index) in shopCardList1" :key="index"
                            style="width: 48%;float: left;box-shadow: 1px 3px 3px rgba(0,0,0,.4);">
                          <div class="desc1" :index="item.id">
                            <div class="shopTitle1"
                                 style="height: 27px;line-height: 27px;color: black;width: calc(100% - 25px);overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                              {{item.name}}
                            </div>
                            <div style="width: 100%;height: 27px;line-height: 27px;">
                              <span style="font-size: 16px;color: red;float: left;">{{item.skus.length>1?item.skus[radio2Index].price:item.min_price}}&nbsp; 元</span>
                              <div class="shopCaidNumMian">
                                <div class="operate">
                                  <!--<div class="reduce"></div>-->
                                  <i class="el-icon-delete" @click="removeFn(index+1)"
                                     style="color: #333333;font-size: 16px;margin-right: 25px;height: 20px;line-height: 20px"></i>
                                  <div class="num"><input
                                    style="width: 30px;height: 20px;border: 1px solid #e5e5e5;border-radius: 6px;text-align: center;margin-right: 10px;outline: none;"
                                    v-model="item.num" @blur="updateShopNum(index+1,item.num)"/></div>
                                  <!--<div class="increase"></div>-->
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="topTip1">{{index+1}}</div>
                        </li>
                      </ul>
                    </div>
                    <div class="cartFooter">
                      <div style="color: black;width: 130px;margin: 2px auto"><span
                        style="cursor: pointer;margin-right: 3px" @click="bbbb">上一页</span><span
                        style="color: rgba(255, 152, 0, .9);">{{cartDishesPage}}</span><span>/{{cartDishesPageTotal}}</span><span
                        style="cursor: pointer;margin-left: 3px" @click="aaaa">下一页</span></div>
                      <div class="cartFoot" style="position: relative;height: 44px;">
                        <div class="cartFootImf" style="background: #8c939d">
                          <div class="imf" v-show="shopCardList.length===0">￥{{dishes1.poi_info.min_price}}起送</div>
                          <div class="imf" v-show="shopCardList.length>0">{{totalPrice1 | numFilter}}元</div>
                          <div class="imf">另需配送费￥{{dishes1.poi_info.shipping_fee}}</div>
                        </div>
                        <div class="bottom" @click="toOder" style="flex: 2">去下单</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div v-if="OrderListShow">
                <div class="diologBox" style="background: rgba(255,255,255,.6)">
                  <img src="../assets/img/meituan/page-1-iptv_orderList.png" alt="" style="width: 75%;height: 60%;">
                </div>
              </div>
              <div v-if="shopDetailShow">
                <div class="diologBox" style="background: rgba(255,255,255,.8)">
                  <img src="../assets/img/meituan/page-1-iptv_shopDetail.png" alt="" style="width: 80%;height: 70%;">
                </div>
              </div>
              <div v-if="shopSortShow">
                <div class="diologBox">
                  <div class="shopSort">
                    <el-radio-group v-model="radio33" style="font-size: 24px" @change="shopSortFn">
                      <el-radio :label="33" style="color: rgba(255,255,255,.7)" :border="true">智能排序</el-radio>
                      <br/>
                      <el-radio :label="63" style="color: rgba(255,255,255,.7)" :border="true">好评优先</el-radio>
                      <br/>
                      <el-radio :label="93" style="color: rgba(255,255,255,.7)" :border="true">人气最高</el-radio>
                      <br/>
                      <el-radio :label="103" style="color: rgba(255,255,255,.7)" :border="true">距离最近</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
              <div class="help">
                <el-button type="text" @click="helpFn" style="color: rgba(246, 83, 2, 1)">查看帮助</el-button>
              </div>
              <transition name="slide-fade">
                <div class="diologBox1" v-show="helpShow">
                  <div id="picHelp">
                    <img src="../assets/img/meituan/help.png" alt="">
                  </div>
                </div>
              </transition>
            </div>

            <div class="searchContainer">
              <div class="foodSearch">
                <h3 class="h3">
                  <el-button type="warning" @click="backFn" size="mini">返回</el-button>
                  <el-button type="warning" @click="clearCart" size="mini">清空购物车</el-button>
                  <el-button type="warning" @click="banckHome" size="mini">返回首页</el-button>
                  <el-button type="warning" @click="failFn" size="mini">返回失败</el-button>
                  <el-button type="warning" @click="toOder" size="mini">下单</el-button>
                  <el-button type="warning" @click="submitFn" size="mini">选好了</el-button>
                  <el-button type="warning" @click="detailFn" size="mini">详情</el-button>
                  <el-button type="warning" @click="orderListFn" size="mini">订单</el-button>

                </h3>
                <div class="searchCon">
                  <el-input v-model="audioText" placeholder="请输入内容" size="small"
                            style="display: inline-block;width: 200px"></el-input>
                  <el-button type="warning" @click="searchItem" size="mini">搜索</el-button>
                  <el-button type="warning" @click="Recommend" size="mini">搜索附近美食</el-button>
                  <br/>
                  <br/>
                  <el-radio v-model="radio11" label="1" size="mini">第一个</el-radio>
                  <el-radio v-model="radio11" label="2" size="mini">第二个</el-radio>
                  <el-radio v-model="radio11" label="3" size="mini">第三个</el-radio>
                  <el-radio v-model="radio11" label="4" size="mini">第四个</el-radio>
                  <br/>
                  <br/>
                  <el-radio v-model="radio11" label="5" size="mini">第五个</el-radio>
                  <el-radio v-model="radio11" label="6" size="mini">第六个</el-radio>
                  <el-radio v-model="radio11" label="7" size="mini">第七个</el-radio>
                  <el-input type="number" v-model="numText" placeholder="请输入内容" size="small"
                            style="display: inline-block;width: 100px"></el-input>
                  <el-button type="warning" @click="goDishes" size="mini">增加</el-button>
                  <el-button type="warning" @click="goDishes1" size="mini">减少</el-button>
                </div>
              </div>
              <div class="foodSearch" v-show="false">
                <h3 class="h3">点击选中侧边栏商品</h3>
                <div class="" :change="tabChange1(radio3)">
                  <el-radio-group size="small" fill="#E6A23C" v-for="(menus,index) in typeList1" v-model="radio3"
                                  :key="index">
                    <el-radio-button :label="menus" :key="index"></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="foodSearch">
                <h3 class="h3">到第几页</h3>
                <div v-if="shopListShow">
                  <el-radio-group v-model="radio4" size="small" fill="#E6A23C" v-for="(item,index) in shopPageTotal"
                                  @change="sendPages(index+1)" :key="index">
                    <el-radio-button :label="index+1"></el-radio-button>
                  </el-radio-group>
                </div>
                <div v-if="DetailListShow">
                  <el-radio-group v-model="radio5" size="small" fill="#E6A23C"
                                  v-for="(item,index) in shopDishesPageTotal" @change="sendPages(index+1)" :key="index">
                    <el-radio-button :label="index+1"></el-radio-button>
                  </el-radio-group>
                </div>
                <div class="pageTab">
                  <el-button size="medium" round @click="bbbb">上一页</el-button>
                  <el-button size="medium" round @click="aaaa">下一页</el-button>
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
          <img src="../assets/img/meituan/meituanlogo.png"/>
        </div>
        <div class="content">美团TV客服系统V1.0</div>
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
  </div>
</template>

<script>
  import http from "../assets/js/base/http.js";
  import {
    setCookie,
    getCookie
  } from "../assets/js/base/reg.js"

  export default {
    data() {
      return {
        radio11: "1", //第几个
        numText: 0, //第几个来几份
        diologBoxShow: false, //规格页是否展示
        dishesSpecification: [], //菜品规格
        Attrs: [], //菜品规格其它属性
        SpecificationPrice: 0, //规格价格
        SpecificationName: "", //菜品名称
        num1: 1, //规格页计数
        radio2: "", //规格选项
        radio33: 33, //排序
        radio2Index: 0, //规格选项索引
        shopPage: 1, //商店当前页码
        shopPageTotal: 1, //商店总页数
        shopDishesPage: 1, //商店商品列表当前页码
        cartDishesPage: 1, //商店商品列表当前页码
        shopDishesPageTotal: 1, //商店商品总页数
        cartDishesPageTotal: 1, //商店商品总页数
        shopListShow: true, //商店列表展示
        DetailListShow: false, //商店详情页展示
        OrderShow: false, //订单页展示
        payShow: false, //支付页展示
        AdressShow: false, //地址页展示
        shopCartListShow: false, //地址页展示
        OrderListShow: false, //订单列表页展示
        shopDetailShow: false, //商店详情页展示
        shopSortShow: false, //排序页展示
        helpShow: false, //帮助页展示
        justSelect: false, //只接受当前消息
        activeMenu: "",
        activeMenu1: "",
        longitude: 116.404,
        latitude: 39.915,
        loginBombFlag: false,
        shopName: "",
        websock: null,
        setBombFlag: false,
        edibleFlag: false,
        orderFlag: false,
        robot: true,
        payFlag: false,
        initFlag: false, //对话菜单展示
        setPage: "",
        setPosition: "",
        applyContent: "",
        timing: "00:00",
        mapId: "suggestId",
        mapId1: "suggestId1",
        findMapId: "searchResultPanel",
        findMapId1: "searchResultPanel1",
        endVal: "",
        startVal: "",
        login_account: "",
        login_pwd: "",
        state4: "",
        timeout: null,
        radio3: "包子粥铺",
        radio4: "1",
        radio5: "1",
        shopList: [],
        shopList1: [], //商店列表
        shopList11: [], //商店列表分页
        typeList1: [], //商店分类
        dialogList: [], //对话
        audioUrl: "", //语音地址
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
        totalPrice: 0,
        tab1: true, //地址
        tab2: false, //订单
        tab3: false, //排序
        tab4: false, //返回
        dishes1: {}, //商店数据
        dishes2: [], //商店菜品
        dishes22: [], //商店菜品
        chatId: "",
        shopMenuIndex: 0,
        dishesMenuIndex: 0,
        shopCardList: [], //购物车列表
        shopCardList1: [], //购物车列表
        shopCardList11: [], //购物车列表
        totalPrice1: 0,
        prevelOrder: {}, //订单预览
        prevelOrderDishes: [], //订单菜品列表
        prevelOrderCode: 0, //订单菜品列表
        payOrder: {}, //支付信息
        shopListSelectIndex: [], //主页选中索引集合
        dishesListSelectIndex: [], //商品页选中索引集合
        SelectNum: 0, //主页命中个数
        SelectNum1: 0, //商品栏命中个数
        MTUserInfo: {},
        audioText: "", //语音文字
        audioTextShow: false, //语音文字
        dishesSelect: false, //菜单选中状态
        shopSelect: false, //商店列表选中状态
        orderSelect: false, //食品页订单按钮选中状态
        shopCartSelect: false, //购物车选中状态
        audio1: null,
        numList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        listName: "Lily",
        helpFlag: 0,//帮助标志
        userData: [],
        AttrsCartName: "",
        audioText11: "",//语音文本
        audioDuration: 0,//语音时长
        value4: 70,//语音播放速度
        typeCMD:[],//命令显示
      };
    },
    methods: {
      //进度条
      formatTooltip(val) {
        return val / 100;
      },
      //提示音播放
      aplayAudio() {
        this.$nextTick(() => {
          if (!this.audio1) {
            this.audio1 = document.getElementById("audio1");
          }
          this.audio1.currentTime = 0;
          this.audio1.play();
        });
      },
      handleChange(value) {
        console.log(value);
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "ChangeByItem",
            data: {
              num: parseInt(value),
            }
          }
        });
      },
      //下一页
      aaaa() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "PageDown",
            betterSay: "如果想更快的翻页您可以说：下一页"
          }
        });
      },
      //上一页
      bbbb() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "PageUp",
            betterSay: "如果想更快的翻页您可以说：上一页"
          }
        });
      },
      //帮助
      helpFn() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "HelpMT"
          }
        });
      },
      //商店列表点击
      shopLisFn(index, item) {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "SelectIndex",
            data: {
              index: index,
              betterSay: "如果想快速的进入" + item + " 您可以说：第" + index + "个"
            }
          }
        });
      },
      //改变购物车数量
      updateShopNum(index, num) {
        console.log(index);
        if (index > 3) {
          // this.diologBoxShow = false;
          this.$store.dispatch("changObjByBotIdAndObj", {"botId": this.botId, "obj": {diologBoxShow: false}});
        } else if (this.shopCartListShow) {
          // this.diologBoxShow = false;
          this.$store.dispatch("changObjByBotIdAndObj", {"botId": this.botId, "obj": {diologBoxShow: false}});
        }
        var obj = this.$store.getters.getShopImfByBotId(this.botId);
        let backStatus = {diologBoxShow: this.diologBoxShow} = obj
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "ChangeByIndex",
            data: {
              index: parseInt(index),
              num: parseInt(num)
            }
          }
        })
      },
      //菜品列表点击
      dishesLisFn(index) {
        const self = this;
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "SelectIndex",
            data: {
              index: index
            }
          }
        });
        this.$refs.dishesLi.forEach((item, index1) => {
          if (index1 == index) {
            item.style.transform = "scale(1.1)";
          } else {
            item.style.transform = "scale(.9)";
          }
        });
        // self.diologBoxShow = true;
        this.$store.dispatch("changObjByBotIdAndObj", {"botId": this.botId, "obj": {diologBoxShow: true}});
        var obj = this.$store.getters.getShopImfByBotId(this.botId);
        let backStatus = {diologBoxShow: this.diologBoxShow} = obj
        /* self.dishesSelect = true;*/
        var index = index;
        var obj = this.dishes22[index];
        self.getGuiGe(obj);
      },
      //点击页码
      sendPages(index) {
        // this.shopPage = index;
        // this.radio4 = "" + index;
        this.$store.dispatch("changObjByBotIdAndObj", {
          "botId": this.botId,
          "obj": {shopPage: index, radio4: "" + index}
        });
        var obj = this.$store.getters.getShopImfByBotId(this.botId);
        let backStatus = {shopPage: this.shopPage, radio4: this.radio4} = obj
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "PageIndex",
            data: {
              index: index,
              betterSay: "如果想快速的到达第" + index + "页 您可以说：第" + index + "页"
            }
          }
        });
      },
      //搜索
      searchItem() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "SearchItem",
            data: {
              item: this.audioText,
              betterSay: "如果想更快的搜索店铺或者美食您可以说：搜索 " + " XXX"
            }
          }
        });
      },
      //第几个来几份
      goDishesByNum(index, num) {
        this.$store.dispatch("changObjByBotIdAndObj", {"botId": this.botId, "obj": {numText: num, radio11: index + 1}});
        var obj = this.$store.getters.getShopImfByBotId(this.botId);
        let backStatus = {numText: this.numText, radio11: this.radio11} = obj
        // this.radio11 = index + 1;
        // this.numText = num;
        var index1 = index + 1;
        var num1 = num;
        console.log(index1, num1);
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "ChangeByIndex",
            data: {
              index: parseInt(index1),
              num: parseInt(num1),
              betterSay: "如果想更快的执行 把XXX份“XXXX”加入购物车的命令 您可以说：第" + index1 + "个来" + num1 + "份"
            }
          }
        });
      },
      //第几个加几份
      goDishes() {
        var index = this.radio11;
        var num = this.numText;
        console.log(index, num);
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "AddByIndex",
            data: {
              index: parseInt(index),
              num: parseInt(num),
              betterSay: "如果想更快的执行 “XXXX”商品从购物车中加几份您可以说：第" + index + "个加" + num + "份"
            }
          }
        });
      },
      //第几个减几份
      goDishes1() {
        var index = this.radio11;
        var num = this.numText;
        console.log(index, num);
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "ReduceByIndex",
            data: {
              index: parseInt(index),
              num: parseInt(num),
              betterSay: "如果想更快的执行 “XXXX”商品从购物车中减几份您可以说：第" + index + "个减" + num + "份"
            }
          }
        });
      },
      //规格改变
      guiGeChange(index) {
        var obj = this.$store.getters.getShopImfByBotId(this.botId);
        this.$store.dispatch("changObjByBotIdAndObj", {
          "botId": this.botId,
          "obj": {radio2Index: index, radio2: obj.dishesSpecification[index].spec}
        });
        let backStatus = {numText: this.numText, radio11: this.radio11} = obj
        this.getGuiGe(obj.shopCardList[0], "11");
        this.radio2Index = index;
        this.radio2 = obj.dishesSpecification[index].spec
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "Fail",
            data: {
              speak: this.radio2
            }
          }
        });
      },
      //接收全部消息
      recieveAllMessage() {
        this.justSelect = false;
        this.websocketsend({
          "botId": this.botId,
          "deviceId": this.deviceId,
          "appId": this.appId,
          "msgType": "CHATALL",
          "data": {}
        });
      },
      guiGeChange1(index1, index) {
        var AttrRadio = "Attrs" + index;
        var obj = this.$store.getters.getShopImfByBotId(this.botId);
        // this.Attrs=obj.Attrs
        // this.$store.dispatch("changObjByBotIdAndObj", {"botId": this.botId, "obj": {Attrs: obj.Attrs,radio2Index:this.radio2Index}});
        // let TT={Attrs:this.Attrs}=obj;
        // this.Attrs[index][AttrRadio]=obj.Attrs[index][AttrRadio]
        let userDataStatus = {Attrs: this.Attrs} = obj;
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "Fail",
            data: {
              speak: obj.Attrs[index][AttrRadio]
            }
          }
        });
      },
      //选好了
      submitFn() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "Submit"
          }
        });
        this.$store.dispatch("changObjByBotIdAndObj", {"botId": this.botId, "obj": {totalPrice1: 0}});

        // this.totalPrice1 = 0;
        var obj = this.$store.getters.getShopImfByBotId(this.botId);
        obj.shopCardList.forEach((item, index) => {
          if (item.skus.length > 1) {
            obj.totalPrice1 += parseFloat(
              item.skus[obj.radio2Index].price * item.num
            );
          } else {
            obj.totalPrice1 += parseFloat(item.min_price * item.num);
          }
          this.$store.dispatch("changObjByBotIdAndObj", {"botId": this.botId, "obj": {totalPrice1: obj.totalPrice1}});
        });
        obj = this.$store.getters.getShopImfByBotId(this.botId);
        let backStatus = {totalPrice1: this.totalPrice1} = obj
      },
      //返回
      backFn() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "Return"
          }
        });
      },
      //清空购物车
      clearCart() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "Clear"
          }
        });
      },
      //返回首页
      banckHome() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "HomePage"
          }
        });
      },
      //去下单
      toOder() {
        var obj = this.$store.getters.getShopImfByBotId(this.botId);
        if (obj.DetailListShow) {
          this.$store.dispatch("changObjByBotIdAndObj", {"botId": this.botId, "obj": {orderSelect: true}});
          var obj = this.$store.getters.getShopImfByBotId(this.botId);
          let backStatus = {orderSelect: this.orderSelect} = obj
          // this.orderSelect = true;
        }
        // for (var i = 0; i < obj.dishes1.food_spu_tags.length; i++) {
        //   var menu2 = obj.dishes1.food_spu_tags[i];
        //   if (/必选/.test(menu2.name)) {
        //     for (var j = 0; j < obj.shopCardList.length; j++) {
        //       var item = obj.shopCardList[j]
        //       if (/必选/.test(item.name)) {
        //         break
        //       } else {
        //         this.$message.warning("缺少必选商品");
        //         return
        //       }
        //     }
        //   }
        // }
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "Payment"
          }
        });
      },
      //查看购物车
      seeCart() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "Review"
          }
        });
      },
      //删除购物车一项
      //返回失败
      failFn() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "Fail",
            data: {
              speak: "失败喽"
            }
          }
        });
      },
      detailFn() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "StoreDetail"
          }
        });
      },
      orderListFn() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "OpenOrder"
          }
        });
      },
      Recommend() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "Recommend"
          }
        });
      },
      adressFn() {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "OpenAddress"
          }
        });
      },
      removeFn(index) {
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: "RemoveByIndex",
            data: {
              index: index,
              betterSay: "如果想更快的执行 从购物车中删除“XXXX”的命令您可以说：第" + index + "个不要了"
            }
          }
        });
      },
      shopSortFn() {
        var sortFlag = "";
        if (this.radio33 == 33) {
          sortFlag = "SmartSort";
        } else if (this.radio33 == 63) {
          sortFlag = "PraisePriority";
        } else if (this.radio33 == 93) {
          sortFlag = "MostPopular";
        } else if (this.radio33 == 103) {
          sortFlag = "DistanceNearest";
        }
        this.websocketsend({
          msgFlag: window.msgFlag,
          deviceId: parseInt(window.redata.deviceId),
          appId: parseInt(window.redata.appId),
          botId: parseInt(window.redata.botId),
          msgType: "cmd",
          data: {
            cmd: sortFlag
          }
        });
      },
      pageSlice(pageNo, pageSize, array) {
        if (array) {
          var offset = (pageNo - 1) * pageSize;
          return offset + pageSize >= array.length
            ? array.slice(offset, array.length)
            : array.slice(offset, offset + pageSize);
        }
      },
      initWebSocket() {
        //初始化weosocket
        const wsuri = "ws://47.92.93.152:8000/v1/cs/wmelody?mobile=" + this.login_account; //ws地址
        //const wsuri = "ws://192.168.1.223:8000/v1/cs/wmelody"; //ip
        this.websock = new WebSocket(wsuri);
        this.websock.onopen = this.websocketonopen;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
        this.dialogList = [];
      },
      websocketonopen() {
        console.log("WebSocket连接成功");
      },
      websocketonerror(e) {
        //错误
        console.log("WebSocket连接发生错误");
      },
      websocketsend(agentData) {
        //数据发送
        this.websock.send(JSON.stringify(agentData));
      },
      websocketclose(e) {
        this.initWebSocket();
      },
      websocketonmessage(e) {
        const redata = JSON.parse(e.data);
        console.log(redata);
        const self = this;
        self.addImfById("appId", redata.appId, redata.botId);
        self.addImfById("initFlag", true, redata.botId);
        if (redata.msgType == "SellerList") {
          //商家首页
          var param = {
            "botId": redata.botId,
            "obj": {
              AdressShow: false,
              shopCartListShow: false,
              OrderListShow: false,
              shopDetailShow: false,
              shopSortShow: false,
              shopListShow: true,
              DetailListShow: false,
              dishesSelect: false,
              diologBoxShow: false,
              OrderShow: false,
              payShow: false,
              shopPage: 1,
              shopList1: JSON.parse(JSON.stringify(redata.data)), //商家信息列表
              shopList11: this.pageSlice(1, 3, JSON.parse(JSON.stringify(redata.data))),
              shopPageTotal: Math.ceil(redata.data.length / 3),
              radio3: JSON.parse(JSON.stringify(redata.data))[0],
              radio4: "1"
            }
          }
          self.$store.dispatch("changObjByBotIdAndObj", param);
          var obj = this.$store.getters.getShopImfByBotId(redata.botId);
          if (this.botId == redata.botId) {
            let backStatus = {
              AdressShow: self.AdressShow,
              shopCartListShow: self.shopCartListShow,
              OrderListShow: self.OrderListShow,
              shopDetailShow: self.shopDetailShow,
              shopSortShow: self.shopSortShow,
              shopListShow: self.shopListShow,
              DetailListShow: self.DetailListShow,
              dishesSelect: self.dishesSelect,
              diologBoxShow: self.diologBoxShow,
              OrderShow: self.OrderShow,
              payShow: self.payShow,
              shopPage: self.shopPage,
              shopList1: self.shopList1, //商家信息列表
              shopList11: self.shopList11,
              shopPageTotal: self.shopPageTotal,
              radio3: self.radio3,
              radio4: self.radio4
            } = obj;
          }
          localStorage.setItem("shopList1", JSON.stringify(redata.data));
          return;
        }
        if (redata.msgType == "GetWmLaunch") {
          //分类
          var param = {
            "botId": redata.botId,
            "obj": {
              typeList1: JSON.parse(JSON.stringify(redata.data)).menus
            }
          }
          self.$store.dispatch("changObjByBotIdAndObj", param);
          var obj = this.$store.getters.getShopImfByBotId(redata.botId);
          if (this.botId == redata.botId) {
            let backStatus = {
              typeList1: self.typeList1
            } = obj;
          }
          localStorage.setItem("typeList1", JSON.stringify(redata.data));
          return
        }
        if (redata.msgType == "SellerDetails") {
          //商家详情
          localStorage.setItem("shopDetail", JSON.stringify(redata.data));
        }
        if (redata.msgType == "GetDishes") {
          //商家餐品
          /*this.$refs.dishesLi.forEach((item, index) => {
            item.style.transform = "scale(.9)";
          });*/
          var param = {
            "botId": redata.botId,
            "obj": {
              helpShow: false,
              DetailListShow: true,
              dishesMenuIndex: 0,
              shopCardList: [],
              shopListShow: false,
              OrderShow: false,
              payShow: false,
              AdressShow: false,
              shopCartListShow: false,
              OrderListShow: false,
              shopDetailShow: false,
              shopSortShow: false,
              diologBoxShow: false,
              dishesSelect: false,
              shopDishesPage: 1,
              dishes1: JSON.parse(JSON.stringify(redata.data)),
              activeMenu1: JSON.parse(JSON.stringify(redata.data)).food_spu_tags[0].name,
              shopDishesPageTotal: Math.ceil(JSON.parse(JSON.stringify(redata.data)).food_spu_tags[0].spus.length / 3),
              dishes22: self.pageSlice(
                1,
                3,
                JSON.parse(JSON.stringify(redata.data)).food_spu_tags[0].spus
              )
            }
          }
          self.$store.dispatch("changObjByBotIdAndObj", param);
          var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
          if (this.botId == redata.botId) {
            let userDataStatus = {
              helpShow: self.helpShow,
              DetailListShow: self.DetailListShow,
              dishesMenuIndex: self.dishesMenuIndex,
              shopCardList: self.shopCardList,
              shopListShow: self.shopListShow,
              OrderShow: self.OrderShow,
              payShow: self.payShow,
              AdressShow: self.AdressShow,
              shopCartListShow: self.shopCartListShow,
              OrderListShow: self.OrderListShow,
              shopDetailShow: self.shopDetailShow,
              shopSortShow: self.shopSortShow,
              diologBoxShow: self.diologBoxShow,
              dishesSelect: self.dishesSelect,
              shopDishesPage: self.shopDishesPage,
              dishes1: self.dishes1,
              activeMenu1: self.activeMenu1,
              shopDishesPageTotal: self.shopDishesPageTotal,
              dishes22: self.dishes22
            } = obj3;
          }
          localStorage.setItem("dishes1", JSON.stringify(redata.data));
          setTimeout(() => {
            self.$refs.dishesLi.forEach((item, index) => {
              item.style.transform = "scale(.9)";
            });
          }, 10)

          return;
        }
        if (redata.msgType == "PrewOrder") {
          //订单预览
          var helpShow = this.$store.getters.getShopImfByBotId(redata.botId).helpShow;

          if (helpShow) {
            self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {helpShow: 0}});
          }
          localStorage.setItem("order1", JSON.stringify(redata.data));
          self.$store.dispatch("changObjByBotIdAndObj", {
            "botId": redata.botId, "obj": {
              shopCartListShow: false,
              prevelOrder: redata.data.wm_ordering_preview_order_vo,
              prevelOrderDishes: redata.data.wm_ordering_preview_detail_vo_list,
              prevelOrderCode: redata.data.code
            }
          });
          var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
          if (this.botId == redata.botId) {
            let userDataStatus = {
              shopCartListShow: self.shopCartListShow,
              prevelOrder: self.prevelOrder,
              prevelOrderDishes: self.prevelOrderDishes,
              helpShow: self.helpShow,
              prevelOrderCode: self.prevelOrderCode
            } = obj3;
          }
          return
        }
        if (redata.msgType == "MTUserInfo") {
        }
        if (redata.msgType == "GetAddrQrcode") {
          //查看订单
          localStorage.setItem("address1", JSON.stringify(redata.data));
        }
        if (redata.msgType == "QueryOrder") {
          //查看订单
          localStorage.setItem("QueryOrder", JSON.stringify(redata.data));
        }
        if (redata.msgType == "CreateOrder") {
          //订单到付款页
          localStorage.setItem("CreateOrder", JSON.stringify(redata.data));
          self.$store.dispatch("changObjByBotIdAndObj", {
            "botId": redata.botId,
            "obj": {payOrder: JSON.parse(JSON.stringify(redata.data))}
          });
          var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
          if (this.botId == redata.botId) {
            let userDataStatus = {
              payOrder: this.payOrder, //订单预览
            } = obj3;
          }
          return
        }
        if (redata.deviceId == 0) {
          self.addImfById("toArtificialFlag", false, redata.botId);
        }
        let shopIndexById = "";
        $.each(self.shopList, function (k, v) {
          if (v["shopId"] == redata.botId) {
            shopIndexById = k;
          }
        });

        if (
          this.deviceId == "" ||
          this.deviceId == undefined ||
          this.deviceId == undefined
        ) {
          if (redata.deviceId != 0) {
            this.addImfById("deviceId", redata.deviceId, redata.botId);
            //						this.deviceId = redata.deviceId;
          }
        }
        if (redata.msgType == "audio") {
          console.log($(".phoneticsMain").last()[0]);
          if (self.botId == redata.botId) {
            if (redata.msgFlag.length > 1) {
              self.$message.success("请开始点击");
              self.aplayAudio();
              window.msgFlag = redata.msgFlag;
              window.redata = redata;
              setTimeout(() => {
                $(".phoneticsMain")
                  .last()
                  .click();
              }, 650);
            }
            self.audioTextShow = true;
            self.audioText = redata.data.text;
            setTimeout(() => {
              self.audioTextShow = false
            }, 3000)
          }
          if (redata.data.text == "start") {
            return;
          } else {
            if (
              this.checkVal(redata.data.text) &&
              this.checkVal(redata.data.audio)
            ) {
              var obj1 = {
                audioContent: redata.data.text,
                audioUrl: redata.data.audio,
                autoContent: "",
                audioTittle: ""
              };
              $.each(self.shopList, function (k, v) {
                if (v.shopId == redata.botId) {
                  //302
                  self.shopList[k]["shopDialogList"].push(obj1);
                  self.scrollButtom();
                }
              });
            }
          }
          this.audioText11 = redata.data.text;
          return
        } else if (redata.msgType == "cmd") {
            if (self.botId == redata.botId) {
              self.typeCMD.push(redata.data.cmd) ;
            }

          var obj = this.$store.getters.getShopImfByBotId(redata.botId);
          if (redata.data.domain == "chat" && redata.data.cmd == "Fail") {
            self.$message.warning("语音超时");
          }
          if (redata.data[redata.msgType] == "Fail") {
            if (obj.DetailListShow) {
              if (obj.diologBoxShow) {
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {radio2: redata.data.speak}
                });
                // self.radio2 = redata.data.speak;
                if (obj.dishesSpecification.length > 1) {
                  obj.dishesSpecification.forEach((item, index) => {
                    if (item.spec == redata.data.speak) {
                      self.$store.dispatch("changObjByBotIdAndObj", {
                        "botId": redata.botId,
                        "obj": {SpecificationPrice: item.price, radio2Index: index}
                      });
                    }
                  });
                }
                this.getGuiGe(obj.shopCardList[0], "11", redata.botId)
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    radio2: this.radio2, //第几个
                    SpecificationPrice: this.SpecificationPrice, //第几个来几份
                    radio2Index: this.radio2Index, //规格页是否展示
                  } = obj3;
                }
                return
              }
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {dishesListSelectIndex: [], SelectNum1: 0}
              });
              var reg = new RegExp(redata.data.speak);
              for (var i = 0; i < obj.dishes22.length; i++) {
                var item = obj.dishes22[i];
                if (reg.test(item.name)) {
                  console.log(22222, item.name, obj);
                  obj.dishesListSelectIndex.push(i);
                  obj.SelectNum1 += 1;
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {SelectNum1: obj.SelectNum1, dishesListSelectIndex: obj.dishesListSelectIndex}
                  });
                }
              }
              if (obj.SelectNum1 == 0) {
                obj.dishes1.food_spu_tags.forEach((item, index) => {
                  var reg = new RegExp("" + redata.data.speak);
                  if (reg.test(item.name)) {
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId, "obj": {
                        activeMenu1: redata.data.speak,
                        dishesMenuIndex: index,
                        shopDishesPage: 1,
                        shopDishesPageTotal: Math.ceil(obj.dishes1.food_spu_tags[index].spus.length / 3),
                        dishes22: self.pageSlice(
                          obj.shopDishesPage,
                          3,
                          obj.dishes1.food_spu_tags[index].spus
                        )
                      }
                    });
                  }
                });
              } else if (obj.SelectNum1 == 1) {
                self.$refs.dishesLi.forEach((item, index) => {
                  if (index == obj.dishesListSelectIndex[0]) {
                    item.style.transform = "scale(1.1)";
                  } else {
                    item.style.transform = "scale(.9)";
                  }
                });
                if (obj.dishes22[obj.dishesListSelectIndex[0]].skus.length > 1 || obj.dishes22[obj.dishesListSelectIndex[0]].Attrs.length > 0) {
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {diologBoxShow: true}
                  });
                }
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {dishesSelect: true}
                });
                // self.diologBoxShow = true;
                var index = obj.dishesListSelectIndex[0];
                var obj2 = obj.dishes22[index];
                self.getGuiGe(obj2, "11", redata.botId);
                var thisId = obj2["id"];
                var cardListIndex = "";
                var flag = false;
                for (var i = 0; i < obj.shopCardList.length; i++) {
                  if (obj.shopCardList[i]["id"] == thisId) {
                    cardListIndex = i;
                    flag = true;
                  }
                }
                if (flag) {
                  if (!obj.diologBoxShow) {
                    obj.shopCardList[cardListIndex]["num"] =
                      obj.shopCardList[cardListIndex]["num"] + 1;
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {shopCardList: obj.shopCardList}
                    });
                  } else {
                    obj2["num"] = 1;
                    obj.shopCardList.unshift(obj2);
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {shopCardList: obj.shopCardList}
                    });
                  }
                } else {
                  obj2["num"] = 1;
                  this.shopCardList.unshift(obj2);
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {shopCardList: obj.shopCardList}
                  });
                  // this.shopCardList.push(obj2);
                }
                console.log(obj.shopCardList);
                // this.totalPrice1 = 0;
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {totalPrice1: 0}
                });
                obj.shopCardList.forEach((item, index) => {
                  if (item.skus.length > 1) {
                    obj.totalPrice1 += parseFloat(
                      item.skus[obj.radio2Index].price * item.num
                    );
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {totalPrice1: obj.totalPrice1}
                    });
                  } else {
                    obj.totalPrice1 += parseFloat(item.min_price * item.num);
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {totalPrice1: obj.totalPrice1}
                    });
                  }
                });
                if (obj.DetailListShow) {
                  obj.shopCardList11 = [];
                  for (var i = 0; i < obj.shopCardList.length; i++) {
                    if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                      obj.shopCardList11.unshift(obj.shopCardList[i])
                    }
                  }
                }
              } else if (obj.SelectNum1 == 2 || obj.SelectNum1 == 3) {
                if (self.DetailListShow) {
                  this.$refs.dishesLi[obj.dishesListSelectIndex[0]].style.transform =
                    "scale(1.1)";
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {dishesSelect: true}
                  });
                } else if (self.shopListShow) {
                  this.$refs.shopLis[obj.dishesListSelectIndex[0]].style.transform =
                    "scale(1.1)";
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {shopSelect: true}
                  });
                }

              }
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              this.getUserDataStatus(redata.botId)
            } else if (obj.shopListShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {shopListSelectIndex: [], SelectNum: 0}
              });
              obj.shopList11.forEach((item, index) => {
                var reg = new RegExp("" + redata.data.text);
                if (reg.test(item.name)) {
                  obj.SelectNum += 1;
                  obj.shopListSelectIndex.push(index);
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {SelectNum: obj.SelectNum, shopListSelectIndex: obj.shopListSelectIndex}
                  });
                }
              });
              console.log(obj.SelectNum);
              if (obj.SelectNum == 0) {
                obj.typeList1.forEach((item, index) => {
                  var reg = new RegExp("" + redata.data.text);
                  if (reg.test(item)) {
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {
                        activeMenu: redata.data.text,
                        shopMenuIndex: index,
                        radio3: obj.typeList1[index],
                        shopPage: 1,
                        radio4: "1"
                      }
                    });
                  }
                });
              } else if (obj.SelectNum == 1) {
                self.$refs.shopLis.forEach((item, index) => {
                  item.style.transform = "scale(.9)";
                });
                self.$refs.shopLis[obj.shopListSelectIndex[0]].style.transform =
                  "scale(1.1)";
              } else if (obj.SelectNum == 2) {
                self.$refs.shopLis[obj.shopListSelectIndex[0]].style.transform =
                  "scale(1.1)";
              } else if (obj.SelectNum == 3) {
                console.log(self.$refs.shopLis[obj.shopListSelectIndex[0]]);
                self.$refs.shopLis[obj.shopListSelectIndex[0]].style.transform =
                  "scale(1.1)";
              }
            }
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                activeMenu: this.activeMenu,
                shopMenuIndex: this.shopMenuIndex,
                radio3: this.radio3,
                shopPage: this.shopPage,
                radio4: this.radio4,
                shopListSelectIndex: this.shopListSelectIndex,
                SelectNum: this.SelectNum,
              } = obj3;
            }

            return
          }
          if (redata.data[redata.msgType] == "Review") {
            if ((obj.dishesSpecification.length > 1 && obj.diologBoxShow) || (obj.Attrs.length > 0 && obj.diologBoxShow)) {
              return
            }
            if (obj.DetailListShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {
                  cartDishesPage: 1,
                  shopCartListShow: true,
                  shopCardList1: self.pageSlice(1, 6, obj.shopCardList11),
                  cartDishesPageTotal: Math.ceil(obj.shopCardList.length / 6)
                }
              })
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  cartDishesPage: this.cartDishesPage,
                  shopCartListShow: this.shopCartListShow,
                  shopCardList1: this.shopCardList1,
                  cartDishesPageTotal: this.cartDishesPageTotal,
                } = obj3;
              }
            }
            /*this.getUserDataStatus(redata.botId)*/
          } else if (redata.data[redata.msgType] == "Help" || redata.data[redata.msgType] == "HelpMT") {
            if (obj.diologBoxShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {helpShow: true, helpFlag: 1}
              });
              $("#picHelp").css("right", 0)
            } else if (obj.shopCartListShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {helpShow: true, helpFlag: 2}
              });
              $("#picHelp").css("right", 0)
            } else {
              self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {helpShow: true}});
              $("#picHelp").css("right", 0)
            }
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                helpShow: this.helpShow,
                helpFlag: this.helpFlag,
              } = obj3;
            }
          }
          if (redata.data[redata.msgType] == "Return") {
            if (obj.helpShow && obj.shopCartListShow) {
              if (obj.helpFlag == 2) {
                self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {helpShow: false}});
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    helpShow: this.helpShow
                  } = obj3;
                }
                return
              }
              // self.shopCartListShow = false
              self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {shopCartListShow: false}});
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopCartListShow: this.shopCartListShow
                } = obj3;
              }
              return
            }
            if (obj.helpShow && obj.diologBoxShow) {
              if (obj.helpFlag == 1) {
                self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {helpShow: false}});
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    helpShow: this.helpShow
                  } = obj3;
                }
                return
              }
              var index1 = 0;
              obj.shopCardList.splice(index1, 1);
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {diologBoxShow: false, shopCardList: obj.shopCardList, totalPrice1: 0}
              });
              obj.shopCardList.forEach((item, index) => {
                if (item.skus.length > 1) {
                  obj.totalPrice1 += parseFloat(
                    item.skus[obj.radio2Index].price * item.num
                  );
                } else {
                  obj.totalPrice1 += parseFloat(item.min_price * item.num);
                }
              });
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {totalPrice1: obj.totalPrice1}
              });
              if (obj.DetailListShow) {
                obj.shopCardList11 = [];
                for (var i = 0; i < obj.shopCardList.length; i++) {
                  if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                    obj.shopCardList11.unshift(obj.shopCardList[i])
                  }
                }
              }
              this.getUserDataStatus(redata.botId)
              // var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              // if (this.botId == redata.botId) {
              //   let userDataStatus = {
              //     diologBoxShow: this.diologBoxShow,
              //     shopCardList: this.shopCardList,
              //     totalPrice1: this.totalPrice1,
              //   } = obj3;
              // }
              return
            }
            if (obj.helpShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {helpShow: false}});
              $("#picHelp").css("right", -1000);
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  helpShow: this.helpShow
                } = obj3;
              }
              return
            }
            if (obj.OrderListShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {OrderListShow: false}});
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  OrderListShow: this.OrderListShow
                } = obj3;
              }
              return;
            }
            if (obj.OrderShow || obj.payShow) {
              if (obj.payShow) {
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId, "obj": {
                    payShow: false,
                    DetailListShow: false,
                    shopListShow: false,
                    OrderShow: true
                  }
                });
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    payShow: this.payShow,
                    DetailListShow: this.DetailListShow,
                    shopListShow: this.shopListShow,
                    OrderShow: this.OrderShow,
                  } = obj3;
                }
                return
              } else {
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId, "obj": {
                    shopCartListShow: false,
                    DetailListShow: true,
                    activeMenu1: obj.dishes1.food_spu_tags[obj.dishesMenuIndex].name,
                    shopListShow: false,
                    OrderShow: false,
                    payShow: false
                  }
                });
                this.getUserDataStatus(redata.botId)
                // var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                // if (this.botId == redata.botId) {
                //   let userDataStatus = {
                //     shopCartListShow: this.shopCartListShow,
                //     DetailListShow: this.DetailListShow,
                //     activeMenu1: this.activeMenu1,
                //     shopListShow: this.shopListShow,
                //     OrderShow: this.OrderShow,
                //     payShow: this.payShow,
                //   } = obj3;
                // }
                return
              }
            }
            if (obj.helpShow === 0) {
              if (obj.DetailListShow) {
                self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {helpShow: true}});
                // self.helpShow = true;
                $("#picHelp").css("right", 0);
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    helpShow: this.helpShow
                  } = obj3;
                }
                return
              }
            }

            if (obj.AdressShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {AdressShow: false}});
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  AdressShow: this.AdressShow,
                } = obj3;
              }
              return;
            } else if (obj.shopDetailShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {shopDetailShow: false}});
              // self.shopDetailShow = false;
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopDetailShow: this.shopDetailShow,
                } = obj3;
              }
              return;
            } else if (obj.OrderListShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {OrderListShow: false}});
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  OrderListShow: this.OrderListShow,
                } = obj3;
              }
              return;
            } else if (obj.shopSortShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {shopSortShow: false}});
              // self.shopSortShow = false;
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopSortShow: this.shopSortShow,
                } = obj3;
              }
              return;
            }
            if (obj.DetailListShow) {
              if (obj.shopCartListShow) {
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {shopCartListShow: false}
                });
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    shopCartListShow: this.shopCartListShow,
                  } = obj3;
                }
                return
              }
              if (obj.orderSelect) {
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId, "obj": {
                    orderSelect: false,
                    shopCartSelect: false,
                    DetailListShow: false,
                    shopListShow: true,
                    OrderShow: false,
                    payShow: false,
                    dishesSelect: false
                  }
                });
                self.$refs.dishesLi.forEach((item, index) => {
                  item.style.transform = "scale(.9)";
                });
                self.getUserDataStatus(redata.botId)
                // var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                // if(this.botId==redata.botId){
                //   let userDataStatus = {
                //     orderSelect: this.orderSelect,
                //     shopCartSelect: this.shopCartSelect,
                //     DetailListShow: this.DetailListShow,
                //     shopListShow: this.shopListShow,
                //     OrderShow: this.OrderShow,
                //     payShow: this.payShow,
                //     dishesSelect: this.dishesSelect,
                //   } = obj3;
                return;
              }
              if (obj.shopCartSelect) {
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId, "obj": {
                    orderSelect: false,
                    shopCartSelect: false,
                    DetailListShow: false,
                    shopListShow: true,
                    OrderShow: false,
                    payShow: false,
                    dishesSelect: false
                  }
                });
                self.getUserDataStatus(redata.botId)
                // var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                // if(this.botId==redata.botId){
                //   let userDataStatus = {
                //     orderSelect: this.orderSelect,
                //     shopCartSelect: this.shopCartSelect,
                //     DetailListShow: this.DetailListShow,
                //     shopListShow: this.shopListShow,
                //     OrderShow: this.OrderShow,
                //     payShow: this.payShow,
                //     dishesSelect: this.dishesSelect,
                //   } = obj3;
                // }
                return
              }
            }
            if ((obj.dishesSpecification.length > 1 && obj.diologBoxShow) || (obj.Attrs.length > 0 && obj.diologBoxShow)) {
              var index1 = 0;
              obj.shopCardList.splice(index1, 1)
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {diologBoxShow: false, shopCardList: obj.shopCardList, totalPrice1: 0}
              });
              obj.shopCardList.forEach((item, index) => {
                if (item.skus.length > 1) {
                  obj.totalPrice1 += parseFloat(
                    item.skus[obj.radio2Index].price * item.num
                  );
                } else {
                  obj.totalPrice1 += parseFloat(item.min_price * item.num);
                }
              });
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {totalPrice1: obj.totalPrice1}
              });
              if (obj.DetailListShow) {
                obj.shopCardList11 = [];
                for (var i = 0; i < obj.shopCardList.length; i++) {
                  if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                    obj.shopCardList11.unshift(obj.shopCardList[i])
                  }
                }
              }
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  diologBoxShow: this.diologBoxShow,
                  shopCardList: this.shopCardList,
                  totalPrice1: this.totalPrice1,
                } = obj3;
              }
              return;
            } else if (obj.dishesSelect) {
              self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {dishesSelect: false}});
              self.$refs.dishesLi.forEach((item, index) => {
                item.style.transform = "scale(.9)";
              });
              self.getUserDataStatus(redata.botId)
              return
            } else if (obj.shopListShow) {
              self.$refs.shopLis.forEach((item, index) => {
                item.style.transform = "scale(.9)";
              });
              self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {shopListSelectIndex: []}});
              self.getUserDataStatus(redata.botId)
            } else {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId, "obj": {
                  DetailListShow: false,
                  shopListShow: true,
                  OrderShow: false,
                  payShow: false
                }
              });
            }
            self.getUserDataStatus(redata.botId)
          } else if (redata.data[redata.msgType] == "Submit") {
            /*self.diologBoxShow = false;*/
            if (obj.DetailListShow) {
              let newVal1 = obj.shopCardList.slice(1);
              var tag = 0;
              var indexA = 0;
              var indexFlag = true;
              var guiGePriceFlag = false;
              if (obj.diologBoxShow) {
                newVal1.forEach((item, index) => {
                  if (obj.shopCardList[0].id == item.id) {
                    if (item.radio2 == obj.shopCardList[0].radio2) {
                      guiGePriceFlag = true
                    }
                    obj.shopCardList[0].Attrs.forEach((newValE, j) => {
                      if (newValE['Attrs' + j] == item.Attrs[j]['Attrs' + j]) {
                        tag++
                      }
                      if (tag == obj.shopCardList[0].Attrs.length) {
                        if (indexFlag) {
                          indexFlag = false;
                          indexA = index;
                        }
                      }
                    })
                  }
                });
                if (tag == obj.shopCardList[0].Attrs.length && tag != 0 && guiGePriceFlag) {
                  newVal1[indexA]['num']++
                } else {
                  newVal1 = obj.shopCardList
                }
              } else {
                newVal1 = obj.shopCardList
              }
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {shopCardList: newVal1, diologBoxShow: false}
              });
              if (obj.DetailListShow) {
                obj.shopCardList11 = [];
                for (var i = 0; i < obj.shopCardList.length; i++) {
                  if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                    obj.shopCardList11.unshift(obj.shopCardList[i])
                  }
                }
              }
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopCardList: this.shopCardList,
                  diologBoxShow: this.diologBoxShow,
                } = obj3;
              }
              console.log(obj.shopCardList);
              if (obj.shopCardList.length == 0) {
                self.$message.error("购物车不能为空");
                return;
              } else if (obj.totalPrice1 < obj.dishes1.poi_info.min_price) {
                self.$message.error(
                  `最低起送价为${self.dishes1.poi_info.min_price}`
                );
                return;
              }
            } else if (obj.OrderShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {DetailListShow: false, shopListShow: false, payShow: true}
              });
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  DetailListShow: this.DetailListShow,
                  shopListShow: this.shopListShow,
                  payShow: this.payShow,
                } = obj3;
              }
            }
          } else if (
            redata.data[redata.msgType] == "PlaceOrder" ||
            redata.data[redata.msgType] == "Payment"
          ) {
            setTimeout(() => {
              if (obj.DetailListShow) {
                if (obj.shopCardList.length == 0) {
                  self.$message.error("购物车不能为空");
                  return;
                } else if (obj.totalPrice1 < obj.dishes1.poi_info.min_price) {
                  self.$message.error(
                    `最低起送价为${obj.dishes1.poi_info.min_price}`
                  );
                  return;
                }
                if (obj.prevelOrderCode != 0) {
                  var prevelOrderCodeText = "";
                  if (obj.prevelOrderCode == 1) {
                    prevelOrderCodeText = "失败"
                  } else if (obj.prevelOrderCode == 2) {
                    prevelOrderCodeText = "商家不可买"
                  } else if (obj.prevelOrderCode == 3) {
                    prevelOrderCodeText = "菜品不可买"
                  } else if (obj.prevelOrderCode == 4) {
                    prevelOrderCodeText = "不在配送时间内"
                  } else if (obj.prevelOrderCode == 15) {
                    prevelOrderCodeText = "未达到最小菜品起送份数"
                  } else if (obj.prevelOrderCode == 20) {
                    prevelOrderCodeText = "缺少必选菜品"
                  } else if (obj.prevelOrderCode == 21) {
                    prevelOrderCodeText = "菜品信息为空"
                  } else if (obj.prevelOrderCode == 26) {
                    prevelOrderCodeText = "商家不支持此配送类型"
                  } else {
                    prevelOrderCodeText = "系统维护,稍后重试"
                  }
                  self.$message.warning(prevelOrderCodeText);
                  return
                }

                // for (var i = 0; i < obj.dishes1.food_spu_tags.length; i++) {
                //   var menu2 = obj.dishes1.food_spu_tags[i];
                //   if (/必选|必点|餐盒|打包盒/.test(menu2.name)) {
                //     for (var j = 0; j < obj.shopCardList.length; j++) {
                //       var item = obj.shopCardList[j]
                //       if (/必选|必点|餐盒|打包盒/.test(item.name)) {
                //         break
                //       } else {
                //         self.$message.warning("缺少必选商品");
                //         return
                //       }
                //     }
                //   }
                // }

                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {
                    OrderShow: true,
                    DetailListShow: false,
                    shopCartListShow: false,
                    shopListShow: false,
                    payShow: false,
                    orderSelect: true
                  }
                });
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    OrderShow: this.OrderShow,
                    DetailListShow: this.DetailListShow,
                    shopCartListShow: this.shopCartListShow,
                    shopListShow: this.shopListShow,
                    payShow: this.payShow,
                    orderSelect: this.orderSelect,
                  } = obj3;
                }
                return;
              } else if (obj.OrderShow) {
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {payShow: true, DetailListShow: false, shopListShow: false}
                });
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    payShow: this.payShow,
                    DetailListShow: this.DetailListShow,
                    shopListShow: this.shopListShow,
                  } = obj3;
                }
              }
            }, 500);
          } else if (redata.data[redata.msgType] == "HomePage") {
            if (obj.shopCartListShow) {
              return
            }
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {shopListShow: true, OrderShow: false, DetailListShow: false, payShow: false}
            });
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                shopListShow: this.shopListShow,
                OrderShow: this.OrderShow,
                DetailListShow: this.DetailListShow,
                payShow: this.payShow,
              } = obj3;
            }
            return;
          } else if (redata.data[redata.msgType] == "Clear") {
            self.$store.dispatch("changObjByBotIdAndObj", {"botId": redata.botId, "obj": {shopCardList: []}});
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                shopCardList: this.shopCardList,
              } = obj3;
            }
            return
            // self.shopCardList = [];
          } else if (redata.data[redata.msgType] == "PageIndex") {
            if (obj.shopListShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {
                  shopPage: redata.data.data.index,
                  radio4: "" + redata.data.data.index,
                  shopList11: self.pageSlice(obj.shopPage, 3, obj.shopList1)
                }
              });
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopPage: this.shopPage,
                  radio4: this.radio4,
                  shopList11: this.shopList11,
                } = obj3;
              }
            } else if (obj.DetailListShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {
                  shopDishesPage: redata.data.data.index,
                  dishes22: self.pageSlice(redata.data.data.index, 3, obj.dishes1.food_spu_tags[obj.dishesMenuIndex].spus)
                }
              });
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopDishesPage: this.shopDishesPage,
                  dishes22: this.dishes22,
                } = obj3;
              }
            }
          } else if (redata.data[redata.msgType] == "OpenAddress") {
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {tab1: true, tab2: false, tab3: false, tab4: false, AdressShow: true}
            });
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                tab1: this.tab1,
                tab2: this.tab2,
                tab3: this.tab3,
                tab4: this.tab4,
                AdressShow: this.AdressShow,
              } = obj3;
            }
          } else if (
            redata.data[redata.msgType] == "StoreDetail" &&
            obj.DetailListShow
          ) {
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {shopDetailShow: true}
            });
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                shopDetailShow: this.shopDetailShow,
              } = obj3;
            }
          } else if (redata.data[redata.msgType] == "OpenOrder") {
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {tab1: false, tab2: true, tab3: false, tab4: false, OrderListShow: true}
            });
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                tab1: this.tab1,
                tab2: this.tab2,
                tab3: this.tab3,
                tab4: this.tab4,
                OrderListShow: this.OrderListShow,
              } = obj3;
            }
          } else if (redata.data[redata.msgType] == "OpenSort") {
            if (obj.shopListShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {tab1: false, tab2: false, tab3: true, tab4: false, shopSortShow: true}
              });
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  tab1: this.tab1,
                  tab2: this.tab2,
                  tab3: this.tab3,
                  tab4: this.tab4,
                  shopSortShow: this.shopSortShow,
                } = obj3;
              }
            }
          } else if (redata.data[redata.msgType] == "SmartSort") {
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {radio33: 33, shopSortShow: false}
            });
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                radio33: this.radio33,
                shopSortShow: this.shopSortShow,
              } = obj3;
            }
          } else if (redata.data[redata.msgType] == "PraisePriority") {
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {radio33: 63, shopSortShow: false}
            });
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                radio33: this.radio33,
                shopSortShow: this.shopSortShow,
              } = obj3;
            }
          } else if (redata.data[redata.msgType] == "MostPopular") {
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {radio33: 93, shopSortShow: false}
            });
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                radio33: this.radio33,
                shopSortShow: this.shopSortShow,
              } = obj3;
            }
          } else if (redata.data[redata.msgType] == "DistanceNearest") {
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {radio33: 103, shopSortShow: false}
            });
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                radio33: this.radio33,
                shopSortShow: this.shopSortShow,
              } = obj3;
            }
          } else if (redata.data[redata.msgType] == "SearchItem") {
            if (obj.DetailListShow) {
              var data11 = redata.data.data.item;
              var index = 0;
              obj.num1 = 1;
              var reg = new RegExp("" + data11);
              var dishesA = [];
              obj.dishes1.food_spu_tags.forEach((item, index) => {
                dishesA = dishesA.concat(item.spus)
              });
              for (var i = 0; i < dishesA.length; i++) {
                const item = dishesA[i];
                const index1 = i
                if (reg.test(item.name)) {
                  if (item.skus.length > 1 || item.Attrs.length > 0) {
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {diologBoxShow: true}
                    });
                  }
                  // self.diologBoxShow = true;
                  index = index1;
                  var obj2 = dishesA[index];
                  self.getGuiGe(obj2, 0, redata.botId);
                  var thisId = obj2["id"];
                  var cardListIndex = "";
                  var flag = false;
                  if (redata.data.data.index > 3) {
                    cardListIndex = index;
                    flag = true;
                  }
                  for (var i = 0; i < obj.shopCardList.length; i++) {
                    if (obj.shopCardList[i]["id"] == thisId) {
                      cardListIndex = i;
                      flag = true;
                    }
                  }
                  if (flag) {
                    if (!obj.diologBoxShow) {
                      obj.shopCardList[cardListIndex]["num"] =
                        obj.shopCardList[cardListIndex]["num"] + 1;
                      self.$store.dispatch("changObjByBotIdAndObj", {
                        "botId": redata.botId,
                        "obj": {shopCardList: obj.shopCardList}
                      });
                    } else {
                      obj2["num"] = 1;
                      obj.shopCardList.unshift(obj2);
                      self.$store.dispatch("changObjByBotIdAndObj", {
                        "botId": redata.botId,
                        "obj": {shopCardList: obj.shopCardList}
                      });
                    }
                    if (obj.DetailListShow) {
                      obj.shopCardList11 = [];
                      for (var i = 0; i < obj.shopCardList.length; i++) {
                        if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                          obj.shopCardList11.unshift(obj.shopCardList[i])
                        }
                      }
                    }
                    var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                    if (this.botId == redata.botId) {
                      let userDataStatus = {
                        diologBoxShow: this.diologBoxShow,
                        shopCardList: this.shopCardList,
                      } = obj3;
                    }
                    return
                  } else {
                    obj2["num"] = parseInt(obj.num1);
                    obj.shopCardList.unshift(obj2);
                    if (obj2.skus.length > 1 || obj2.Attrs.length > 0) {
                      self.$store.dispatch("changObjByBotIdAndObj", {
                        "botId": redata.botId,
                        "obj": {diologBoxShow: true, helpFlag: 1}
                      });
                    }
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {shopCardList: obj.shopCardList}
                    });
                    // this.shopCardList.push(obj2);
                  }
                  console.log(obj.shopCardList);
                  // self.totalPrice1 = 0;
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {totalPrice1: 0}
                  });
                  obj.shopCardList.forEach((item, index) => {
                    if (item.skus.length > 1) {
                      obj.totalPrice1 += parseFloat(
                        item.skus[obj.radio2Index].price * item.num
                      );
                      self.$store.dispatch("changObjByBotIdAndObj", {
                        "botId": redata.botId,
                        "obj": {totalPrice1: obj.totalPrice1}
                      });
                    } else {
                      obj.totalPrice1 += parseFloat(item.min_price * item.num);
                      self.$store.dispatch("changObjByBotIdAndObj", {
                        "botId": redata.botId,
                        "obj": {totalPrice1: obj.totalPrice1}
                      });
                    }
                  });
                  this.getUserDataStatus(redata.botId);
                  return
                }
              }
              // dishesA.forEach((item, index1) => {
              //
              // })
            }
            if (obj.DetailListShow) {
              obj.shopCardList11 = [];
              for (var i = 0; i < obj.shopCardList.length; i++) {
                if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                  obj.shopCardList11.unshift(obj.shopCardList[i])
                }
              }
            }
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                diologBoxShow: this.diologBoxShow,
                shopCardList: this.shopCardList,
                totalPrice1: this.totalPrice1,
              } = obj3;
            }
          }
          if (
            redata.data[redata.msgType] == "Previous" ||
            redata.data[redata.msgType] == "Up"
          ) {
            /*if (self.shopListShow) {
              if (self.shopMenuIndex == 0) {
                return;
              }
              self.shopMenuIndex--;
              self.changeTab2();
            } else if (self.DetailListShow) {
              if (self.dishesMenuIndex == 0) {
                return;
              }
              self.dishesMenuIndex--;
              self.dishes22 =
                self.dishes1.food_spu_tags[self.dishesMenuIndex].spus;
              self.dishes22 = self.pageSlice(
                self.shopDishesPage,
                3,
                self.dishes1.food_spu_tags[self.dishesMenuIndex].spus
              );
              self.shopDishesPageTotal = Math.ceil(self.dishes22.length / 3);
              self.changeTab3();
            }*/
          } else if (
            redata.data[redata.msgType] == "Next" ||
            redata.data[redata.msgType] == "Down"
          ) {
            /*if (self.shopListShow) {
              if (self.shopMenuIndex == self.typeList1.length) {
                return;
              }
              self.shopMenuIndex++;
              self.changeTab2();
            } else if (self.DetailListShow) {
              if (
                self.dishesMenuIndex ==
                this.dishes1.food_spu_tags[this.dishesMenuIndex].length
              ) {
                return;
              }
              self.dishesMenuIndex++;
              self.dishes22 = self.pageSlice(
                self.shopDishesPage,
                3,
                self.dishes1.food_spu_tags[self.dishesMenuIndex].spus
              );
              self.shopDishesPageTotal = Math.ceil(self.dishes22.length / 3);
              self.changeTab3();
            }*/
          }
          if (redata.data[redata.msgType] == "PageUp") {
            if (obj.shopListShow) {
              obj.shopPage--;
              if (obj.shopPage < 1) {
                obj.shopPage = 1;
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {shopPage: 1}
                });
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    shopPage: this.shopPage
                  } = obj3;
                }
                return
              }
              obj.radio4 = obj.radio4 - 1 + "";
              obj.shopList11 = self.pageSlice(obj.shopPage, 3, obj.shopList1);
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {shopPage: obj.shopPage, radio4: obj.radio4, shopList11: obj.shopList11}
              });
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopPage: this.shopPage,
                  radio4: this.radio4,
                  shopList11: this.shopList11,
                } = obj3;
              }
            } else if (obj.DetailListShow) {
              if (obj.shopCartListShow) {
                obj.cartDishesPage--;
                if (obj.cartDishesPage < 1) {
                  obj.cartDishesPage = 1;
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {cartDishesPage: 1}
                  });
                  var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                  if (this.botId == redata.botId) {
                    let userDataStatus = {
                      cartDishesPage: this.cartDishesPage,
                    } = obj3;
                  }
                  return
                }
                /* self.shopCardList1=self.pageSlice(
                   self.cartDishesPage,
                   6,
                   self.shopCardList
                 );*/
                obj.shopCardList1 = self.pageSlice(obj.cartDishesPage, 6, obj.shopCardList11);
                obj.cartDishesPageTotal = Math.ceil(obj.shopCardList11.length / 6);
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {
                    cartDishesPage: obj.cartDishesPage,
                    shopCardList1: obj.shopCardList1,
                    cartDishesPageTotal: obj.cartDishesPageTotal
                  }
                });
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    cartDishesPage: this.cartDishesPage,
                    shopCardList1: this.shopCardList1,
                    cartDishesPageTotal: this.cartDishesPageTotal,
                  } = obj3;
                }
                return
              }
              obj.shopDishesPage--;
              if (obj.shopDishesPage < 1) {
                obj.shopDishesPage = 1;
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {shopDishesPage: 1}
                });
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    shopDishesPage: this.shopDishesPage,
                  } = obj3;
                }
                return
              }
              obj.dishes22 = self.pageSlice(
                obj.shopDishesPage,
                3,
                obj.dishes1.food_spu_tags[obj.dishesMenuIndex].spus
              );
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {shopDishesPage: obj.shopDishesPage, dishes22: obj.dishes22, dishesSelect: false}
              });
              self.$refs.dishesLi.forEach((item, index) => {
                item.style.transform = "scale(.9)";
              });
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopDishesPage: this.shopDishesPage,
                  dishes22: this.dishes22,
                  dishesSelect: this.dishesSelect
                } = obj3;
              }
            }
          } else if (redata.data[redata.msgType] == "PageDown") {
            if (obj.shopListShow) {
              obj.shopPage++;
              obj.radio4 = parseInt(obj.radio4) + 1 + "";
              obj.shopList11 = self.pageSlice(obj.shopPage, 3, obj.shopList1);
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {shopPage: obj.shopPage, radio4: obj.radio4, shopList11: obj.shopList11}
              });
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopPage: this.shopPage,
                  radio4: this.radio4,
                  shopList11: this.shopList11,
                } = obj3;
              }
            } else if (obj.DetailListShow) {
              if (obj.shopCartListShow) {
                obj.cartDishesPage++;
                if (obj.cartDishesPage > obj.cartDishesPageTotal) {
                  obj.cartDishesPage = obj.cartDishesPageTotal;
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {cartDishesPage: obj.cartDishesPage}
                  });
                  var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                  if (this.botId == redata.botId) {
                    let userDataStatus = {
                      cartDishesPage: this.cartDishesPage,
                    } = obj3;
                  }
                  return
                }
                /*self.shopCardList1=self.pageSlice(
                  self.cartDishesPage,
                  6,
                  self.shopCardList
                );*/
                obj.shopCardList1 = self.pageSlice(obj.cartDishesPage, 6, obj.shopCardList11);
                obj.cartDishesPageTotal = Math.ceil(obj.shopCardList11.length / 6);
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {
                    cartDishesPage: obj.cartDishesPage,
                    shopCardList1: obj.shopCardList1,
                    cartDishesPageTotal: obj.cartDishesPageTotal
                  }
                });
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    cartDishesPage: this.cartDishesPage,
                    shopCardList1: this.shopCardList1,
                    cartDishesPageTotal: this.cartDishesPageTotal,
                  } = obj3;
                }
                return
              }
              obj.shopDishesPage++;
              if (obj.shopDishesPage > obj.shopDishesPageTotal) {
                obj.shopDishesPage = obj.shopDishesPageTotal;
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {shopDishesPage: obj.shopDishesPage}
                });
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    shopDishesPage: this.shopDishesPage,
                  } = obj3;
                }
                return
              }
              obj.dishes22 = self.pageSlice(
                obj.shopDishesPage,
                3,
                obj.dishes1.food_spu_tags[obj.dishesMenuIndex].spus
              );
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {shopDishesPage: obj.shopDishesPage, dishes22: obj.dishes22, dishesSelect: false}
              });
              self.$refs.dishesLi.forEach((item, index) => {
                item.style.transform = "scale(.9)";
              });
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopDishesPage: this.shopDishesPage,
                  dishes22: this.dishes22,
                  dishesSelect: this.dishesSelect
                } = obj3;
              }
            }
          } else if (redata.data[redata.msgType] == "SelectIndex") {
            if (obj.DetailListShow) {
              self.$refs.dishesLi.forEach((item, index) => {
                if (index == redata.data.data.index - 1) {
                  item.style.transform = "scale(1.1)";
                } else {
                  item.style.transform = "scale(.9)";
                }
              });
              if (redata.data.data.index < 4) {
                if (obj.diologBoxShow) {
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {diologBoxShow: true, dishesSelect: true, helpFlag: 1}
                  });
                  obj.shopCardList.splice(index1, 1);
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {diologBoxShow: false, shopCardList: obj.shopCardList, totalPrice1: 0}
                  });
                  obj.shopCardList.forEach((item, index) => {
                    if (item.skus.length > 1) {
                      obj.totalPrice1 += parseFloat(
                        item.skus[obj.radio2Index].price * item.num
                      );
                    } else {
                      obj.totalPrice1 += parseFloat(item.min_price * item.num);
                    }
                  });
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {totalPrice1: obj.totalPrice1}
                  });
                  if (obj.DetailListShow) {
                    obj.shopCardList11 = [];
                    for (var i = 0; i < obj.shopCardList.length; i++) {
                      if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                        obj.shopCardList11.unshift(obj.shopCardList[i])
                      }
                    }
                  }
                  this.getUserDataStatus(redata.botId);
                }
                if (self.dishes22[redata.data.data.index - 1].skus.length > 1 || self.dishes22[redata.data.data.index - 1].Attrs.length > 0) {
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {diologBoxShow: true, helpFlag: 1}
                  });
                }
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {dishesSelect: true}
                });
                // self.diologBoxShow = true;
                // self.dishesSelect = true;
              } else if (redata.data.data.index > obj.shopCardList.length + 3) {
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {shopCartSelect: true}
                });
                // self.shopCartSelect = true;
              }
              var index = redata.data.data.index;
              var obj2 = JSON.parse(JSON.stringify(obj.dishes22[index - 1]));
              self.getGuiGe(obj2, 0, redata.botId);
              var thisId = obj2["id"];
              var cardListIndex = "";
              var flag = false;
              if (obj.diologBoxShow) {
                for (var i = obj.shopCardList.length - 2; i >= 0; i--) {
                  if (obj.shopCardList[i]["id"] == thisId) {
                    cardListIndex = i;
                    flag = true;
                  }
                }
              } else {
                for (var i = 0; i < obj.shopCardList.length; i++) {
                  if (obj.shopCardList[i]["id"] == thisId) {
                    cardListIndex = i;
                    flag = true;
                  }
                }
              }
              if (flag) {
                var numAdd = false;
                var num2 = 0;
                if (!obj.diologBoxShow) {
                  obj.shopCardList[cardListIndex]["num"] =
                    obj.shopCardList[cardListIndex]["num"] + 1
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {shopCardList: obj.shopCardList}
                  });
                } else {
                  if (obj.dishesSpecification.length > 1 && obj.diologBoxShow) {
                    if (obj.SpecificationPrice == obj.shopCardList[cardListIndex].min_price) {
                      numAdd = true;
                    }
                  }
                  if (numAdd) {
                    obj2["num"] = 1;
                    obj.shopCardList.unshift(obj2);
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {shopCardList: obj.shopCardList}
                    });
                  } else {
                    obj2["num"] = 1;
                    obj.shopCardList.unshift(obj2);
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {shopCardList: obj.shopCardList}
                    });
                  }
                }
                if (obj.DetailListShow) {
                  obj.shopCardList11 = [];
                  for (var i = 0; i < obj.shopCardList.length; i++) {
                    if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                      obj.shopCardList11.unshift(obj.shopCardList[i])
                    }
                  }
                }
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    diologBoxShow: this.diologBoxShow,
                    dishesSelect: this.dishesSelect,
                    shopCartSelect: this.shopCartSelect,
                    shopCardList: this.shopCardList,
                  } = obj3;
                }
              } else {
                obj2["num"] = 1;
                obj.shopCardList.unshift(obj2);
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {shopCardList: obj.shopCardList}
                });
                // this.shopCardList.push(obj2);
              }
              console.log(obj.shopCardList);

              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {totalPrice1: 0}
              });
              obj.shopCardList.forEach((item, index) => {
                if (item.skus.length > 1) {
                  obj.totalPrice1 += parseFloat(
                    item.skus[obj.radio2Index].price * item.num
                  );
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {totalPrice1: obj.totalPrice1}
                  });
                } else {
                  obj.totalPrice1 += parseFloat(item.min_price * item.num);
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {totalPrice1: obj.totalPrice1}
                  });
                }
              });
              if (obj.DetailListShow) {
                obj.shopCardList11 = [];
                for (var i = 0; i < obj.shopCardList.length; i++) {
                  if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                    obj.shopCardList11.unshift(obj.shopCardList[i])
                  }
                }
              }
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  diologBoxShow: this.diologBoxShow,
                  dishesSelect: this.dishesSelect,
                  shopCartSelect: this.shopCartSelect,
                  shopCardList: this.shopCardList,
                  totalPrice1: this.totalPrice1
                } = obj3;
              }
              // self.totalPrice1 = 0;
              // self.shopCardList.forEach((item, index) => {
              //   if (item.skus.length > 1) {
              //     self.totalPrice1 += parseFloat(
              //       item.skus[self.radio2Index].price * item.num
              //     );
              //   } else {
              //     self.totalPrice1 += parseFloat(item.min_price * item.num);
              //   }
              // });
              return
            } else if (self.shopListShow) {
              self.$refs.shopLis.forEach((item, index) => {
                if (index == redata.data.data.index - 1) {
                  item.style.transform = "scale(1.1)";
                } else {
                  item.style.transform = "scale(.9)";
                }
              });
              return
            }
          } else if (redata.data[redata.msgType] == "RemoveByIndex") {
            if (obj.shopCartListShow) {
              var index = redata.data.data.index;
              var index2 = obj.shopCardList.length - (index + (obj.cartDishesPage - 1) * 6);
              var index3 = index + (obj.cartDishesPage - 1) * 6 - 1;
              obj.shopCardList11.splice(index3, 1)
              obj.shopCardList.splice(index2, 1);
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {shopCardList: obj.shopCardList, totalPrice1: 0, shopCardList11: obj.shopCardList11}
              });
              obj.shopCardList.forEach((item, index) => {
                if (item.skus.length > 1) {
                  obj.totalPrice1 += parseFloat(
                    item.skus[obj.radio2Index].price * item.num
                  );
                } else {
                  obj.totalPrice1 += parseFloat(item.min_price * item.num);
                }
              });
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {totalPrice1: obj.totalPrice1}
              });
              if (obj.DetailListShow) {
                obj.shopCardList11 = [];
                for (var i = 0; i < obj.shopCardList.length; i++) {
                  if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                    obj.shopCardList11.unshift(obj.shopCardList[i])
                  }
                }
              }
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  shopCardList: this.shopCardList,
                  totalPrice1: this.totalPrice1,
                  shopCardList11: this.shopCardList11,
                } = obj3;
              }
              return
            }
            if (redata.data.data.index < 4) {
              return
            }
            var index1 = redata.data.data.index - 4;
            obj.shopCardList.splice(index1, 1);
            // self.totalPrice1 = 0;
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {totalPrice1: 0, shopCardList: obj.shopCardList}
            });
            obj.shopCardList.forEach((item, index) => {
              if (item.skus.length > 1) {
                obj.totalPrice1 += parseFloat(
                  item.skus[obj.radio2Index].price * item.num
                );
              } else {
                obj.totalPrice1 += parseFloat(item.min_price * item.num);
              }
            });
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {totalPrice1: obj.totalPrice1}
            });
            if (obj.DetailListShow) {
              obj.shopCardList11 = [];
              for (var i = 0; i < obj.shopCardList.length; i++) {
                if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                  obj.shopCardList11.unshift(obj.shopCardList[i])
                }
              }
            }
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                totalPrice1: this.totalPrice1,
                shopCardList: this.shopCardList,
              } = obj3;
            }
          } else if (
            redata.data[redata.msgType] == "AddByIndex" ||
            redata.data[redata.msgType] == "ChangeByIndex"
          ) {
            if (obj.DetailListShow) {
              obj.num1 = redata.data.data.num;
              var index = redata.data.data.index;
              if (obj.shopCartListShow) {
                if (redata.data.data.index > 6) {
                  return
                }
                /* if (redata.data[redata.msgType] == "AddByIndex") {
                   self.diologBoxShow = false;
                   /!*self.shopCardList1[index-1]["num"] =
                     self.shopCardList1[index-1]["num"] + parseInt(self.num1);*!/
                   var indexA=self.shopCardList.length-(index+(self.cartDishesPage-1)*6);
                   self.shopCardList[indexA]['num']=self.shopCardList[indexA]['num']+parseInt(self.num1)
                 } else*/
                if (redata.data[redata.msgType] == "ChangeByIndex") {
                  // self.diologBoxShow = false;
                  /*self.shopCardList1[index-1]["num"] = parseInt(self.num1);*/
                  var indexA = obj.shopCardList.length - (index + (obj.cartDishesPage - 1) * 6);
                  obj.shopCardList[indexA]['num'] = parseInt(obj.num1);
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {diologBoxShow: false, shopCardList: obj.shopCardList}
                  });
                }
                // self.totalPrice1 = 0;
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {totalPrice1: 0}
                });
                obj.shopCardList.forEach((item, index) => {
                  if (item.skus.length > 1) {
                    obj.totalPrice1 += parseFloat(
                      item.skus[obj.radio2Index].price * item.num
                    );
                  } else {
                    obj.totalPrice1 += parseFloat(item.min_price * item.num);
                  }
                });
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {totalPrice1: obj.totalPrice1}
                });
                if (obj.DetailListShow) {
                  obj.shopCardList11 = [];
                  for (var i = 0; i < obj.shopCardList.length; i++) {
                    if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                      obj.shopCardList11.unshift(obj.shopCardList[i])
                    }
                  }
                }
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    diologBoxShow: this.diologBoxShow,
                    shopCardList: this.shopCardList,
                    totalPrice1: this.totalPrice1,
                  } = obj3;
                }
                return
              }
              if (obj.dishesSpecification.length > 1 || obj.Attrs.length > 0) {
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {diologBoxShow: true, helpFlag: 1}
                });
                // self.diologBoxShow = true;
              }
              if (index > 3) {
                index = index - 3;
              }
              var obj2 = obj.dishes22[index - 1];
              self.getGuiGe(obj2, 0, redata.botId);
              var thisId = obj2["id"];
              var cardListIndex = "";
              var flag = false;
              if (redata.data.data.index > 3) {
                cardListIndex = index - 1;
                flag = true;
              }
              for (var i = 0; i < obj.shopCardList.length; i++) {
                if (obj.shopCardList[i]["id"] == thisId) {
                  cardListIndex = i;
                  flag = true;
                }
              }
              if (flag) {
                if (redata.data[redata.msgType] == "AddByIndex") {
                  // self.diologBoxShow = false;
                  obj.shopCardList[cardListIndex]["num"] =
                    obj.shopCardList[cardListIndex]["num"] + parseInt(obj.num1);
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {diologBoxShow: false, shopCardList: obj.shopCardList}
                  });
                } else if (redata.data[redata.msgType] == "ChangeByIndex") {
                  // self.diologBoxShow = false;
                  obj.shopCardList[cardListIndex]["num"] = parseInt(obj.num1);
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {diologBoxShow: false, shopCardList: obj.shopCardList}
                  });
                }
              } else {
                obj2["num"] = parseInt(obj.num1);
                obj.shopCardList.unshift(obj2);
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {shopCardList: obj.shopCardList}
                });
                // this.shopCardList.push(obj2);
              }
              console.log(obj.shopCardList);
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {totalPrice1: 0}
              });
              // self.totalPrice1 = 0;
              obj.shopCardList.forEach((item, index) => {
                if (item.skus.length > 1) {
                  obj.totalPrice1 += parseFloat(
                    item.skus[obj.radio2Index].price * item.num
                  );
                } else {
                  obj.totalPrice1 += parseFloat(item.min_price * item.num);
                }
              });
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {totalPrice1: obj.totalPrice1}
              });
            }
            if (obj.DetailListShow) {
              obj.shopCardList11 = [];
              for (var i = 0; i < obj.shopCardList.length; i++) {
                if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                  obj.shopCardList11.unshift(obj.shopCardList[i])
                }
              }
            }
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                diologBoxShow: this.diologBoxShow,
                shopCardList: this.shopCardList,
                totalPrice1: this.totalPrice1,
              } = obj3;
            }
            return
          } else if (redata.data[redata.msgType] == "ReduceByIndex") {
            /*if(self.shopCartListShow){
                self.diologBoxShow = false;
                /!*self.shopCardList1[index-1]["num"] =
                  self.shopCardList1[index-1]["num"] - parseInt(self.num1);*!/
                var indexA=self.shopCardList.length-(index+(self.cartDishesPage-1)*6);
                self.shopCardList[indexA]['num']=self.shopCardList[indexA]['num']-parseInt(self.num1)
              return
            }*/
            var index = redata.data.data["index"];
            var num = redata.data.data["num"];
            if (Number.parseInt(obj.shopCardList[index - 4]["num"] - num) <= 0) {
              obj.shopCardList.splice(index - 4, 1);
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {shopCardList: obj.shopCardList}
              });
            } else {
              obj.shopCardList[index - 4]["num"] =
                obj.shopCardList[index - 4]["num"] - num;
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {shopCardList: obj.shopCardList}
              });
            }
            // self.totalPrice1 = 0;
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {totalPrice1: 0}
            });
            obj.shopCardList.forEach((item, index) => {
              if (item.skus.length > 1) {
                obj.totalPrice1 += parseFloat(
                  item.skus[obj.radio2Index].price * item.num
                );
              } else {
                obj.totalPrice1 += parseFloat(item.min_price * item.num);
              }
            });
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {totalPrice1: obj.totalPrice1}
            });
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (obj.DetailListShow) {
              obj.shopCardList11 = [];
              for (var i = 0; i < obj.shopCardList.length; i++) {
                if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                  obj.shopCardList11.unshift(obj.shopCardList[i])
                }
              }
            }
            if (this.botId == redata.botId) {
              let userDataStatus = {
                shopCardList: this.shopCardList,
                totalPrice1: this.totalPrice1,
              } = obj3;
            }
          } else if (redata.data[redata.msgType] == "AddByItem") {
            var item = redata.data.data["item"];
            var num = redata.data.data["num"];
            var index = 0;
            var reg = new RegExp("" + item);
            obj.shopCardList.forEach((lis, index1) => {
              if (reg.test(lis.name)) {
                index = index1;
              }
            });
            obj.shopCardList[index]["num"] =
              obj.shopCardList[index]["num"] + num;
            self.totalPrice1 = 0;
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {totalPrice1: 0, shopCardList: obj.shopCardList}
            });
            obj.shopCardList.forEach((item, index) => {
              if (item.skus.length > 1) {
                obj.totalPrice1 += parseFloat(
                  item.skus[obj.radio2Index].price * item.num
                );
              } else {
                obj.totalPrice1 += parseFloat(item.min_price * item.num);
              }
            });
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {totalPrice1: obj.totalPrice1}
            });
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (obj.DetailListShow) {
              obj.shopCardList11 = [];
              for (var i = 0; i < obj.shopCardList.length; i++) {
                if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                  obj.shopCardList11.unshift(obj.shopCardList[i])
                }
              }
            }
            if (this.botId == redata.botId) {
              let userDataStatus = {
                totalPrice1: this.totalPrice1,
                shopCardList: this.shopCardList,
              } = obj3;
            }
          } else if (redata.data[redata.msgType] == "RemoveByItem") {
          } else if (redata.data[redata.msgType] == "ChangeByItem") {
            if (obj.DetailListShow) {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": redata.botId,
                "obj": {num1: redata.data.data.num}
              });
              var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
              if (this.botId == redata.botId) {
                let userDataStatus = {
                  num1: this.num1,
                } = obj3;
              }
              // self.num1 = redata.data.data.num;
              var item = redata.data.data.item;
              var index = 0;
              if (obj.shopCartListShow) {
                if (redata.data.data.index > 6) {
                  return
                }
                // self.diologBoxShow = false;
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {diologBoxShow: false}
                });
                obj.shopCardList.forEach((item2, index22) => {
                  if (item2.name == item) {
                    obj.shopCardList[index22]['num'] = parseInt(obj.num1);
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {shopCardList: obj.shopCardList}
                    });
                  }
                });
                // self.totalPrice1 = 0;
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {totalPrice1: 0}
                });
                obj.shopCardList.forEach((item, index) => {
                  if (item.skus.length > 1) {
                    obj.totalPrice1 += parseFloat(
                      item.skus[obj.radio2Index].price * item.num
                    );
                  } else {
                    obj.totalPrice1 += parseFloat(item.min_price * item.num);
                  }
                });
                self.$store.dispatch("changObjByBotIdAndObj", {
                  "botId": redata.botId,
                  "obj": {totalPrice1: obj.totalPrice1}
                });
                if (obj.DetailListShow) {
                  obj.shopCardList11 = [];
                  for (var i = 0; i < obj.shopCardList.length; i++) {
                    if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                      obj.shopCardList11.unshift(obj.shopCardList[i])
                    }
                  }
                }
                var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                if (this.botId == redata.botId) {
                  let userDataStatus = {
                    diologBoxShow: this.diologBoxShow,
                    shopCardList: this.shopCardList,
                    totalPrice1: this.totalPrice1,
                  } = obj3;
                }
                return
              }

              var reg = new RegExp("" + item);
              for (var index1 = 0; index1 < obj.dishes22.length; index1++) {
                var lis = obj.dishes22[index1];
                if (reg.test(lis.name)) {
                  // if (obj.dishes22[index1].Attrs.length > 0 || obj.dishes22[index1].skus.length > 1) {
                  //   self.$store.dispatch("changObjByBotIdAndObj", {
                  //     "botId": redata.botId,
                  //     "obj": {diologBoxShow: true}
                  //   });
                  //   for (var i = 0; i < obj.shopCardList.length; i++) {
                  //     if (obj.shopCardList[i]["id"] == obj.dishes22[index1].id) {
                  //       self.$store.dispatch("changObjByBotIdAndObj", {
                  //         "botId": redata.botId,
                  //         "obj": {diologBoxShow: false}
                  //       });
                  //       obj.shopCardList[cardListIndex]["num"] = parseInt(obj.num1);
                  //     }
                  //   }
                  //   return
                  // }
                  var index = index1;
                  var obj2 = obj.dishes22[index];
                  var thisId = obj2["id"];
                  var cardListIndex = "";
                  var flag = false;
                  for (var i = 0; i < obj.shopCardList.length; i++) {
                    if (obj.shopCardList[i]["id"] == thisId) {
                      cardListIndex = i;
                      flag = true;
                    }
                  }
                  if (flag) {
                    obj.shopCardList[cardListIndex]["num"] = parseInt(obj.num1);
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {shopCardList: obj.shopCardList, diologBoxShow: false}
                    });
                  } else {
                    self.getGuiGe(obj2, 0, redata.botId);
                    if (obj.dishes22[index1].Attrs.length > 0 || obj.dishes22[index1].skus.length > 1) {
                      self.$store.dispatch("changObjByBotIdAndObj", {
                        "botId": redata.botId,
                        "obj": {diologBoxShow: true, helpFlag: 1}
                      });
                    }
                    obj2["num"] = parseInt(obj.num1);
                    obj.shopCardList.unshift(obj2);
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {shopCardList: obj.shopCardList}
                    });
                    // this.shopCardList.push(obj2);
                  }
                  console.log(obj.shopCardList);
                  // self.totalPrice1 = 0;
                  self.$store.dispatch("changObjByBotIdAndObj", {
                    "botId": redata.botId,
                    "obj": {totalPrice1: 0}
                  });
                  obj.shopCardList.forEach((item, index) => {
                    if (item.skus.length > 1) {
                      obj.totalPrice1 += parseFloat(
                        item.skus[obj.radio2Index].price * item.num
                      );
                    } else {
                      obj.totalPrice1 += parseFloat(item.min_price * item.num);
                    }
                    self.$store.dispatch("changObjByBotIdAndObj", {
                      "botId": redata.botId,
                      "obj": {totalPrice1: obj.totalPrice1}
                    });
                  });
                  if (obj.DetailListShow) {
                    obj.shopCardList11 = [];
                    for (var i = 0; i < obj.shopCardList.length; i++) {
                      if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                        obj.shopCardList11.unshift(obj.shopCardList[i])
                      }
                    }
                  }
                  var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
                  if (this.botId == redata.botId) {
                    let userDataStatus = {
                      diologBoxShow: this.diologBoxShow,
                      shopCardList: this.shopCardList,
                      totalPrice1: this.totalPrice1,
                      helpFlag: this.helpFlag
                    } = obj3;
                  }
                  return
                }
              }
            }
          } else if (redata.data[redata.msgType] == "ReduceByItem") {
            var item = redata.data.data["item"];
            var num = redata.data.data["num"];
            var index = 0;
            var reg = new RegExp("" + item);
            obj.shopCardList.forEach((lis, index1) => {
              if (reg.test(lis.name)) {
                index = index1;
              }
            });
            if (Number.parseInt(obj.shopCardList[index]["num"] - num) <= 0) {
              obj.shopCardList.splice(index, 1);
            } else {
              obj.shopCardList[index]["num"] =
                obj.shopCardList[index]["num"] - num;
            }

            // self.totalPrice1 = 0;
            obj.shopCardList.forEach((item, index) => {
              if (item.skus.length > 1) {
                obj.totalPrice1 += parseFloat(
                  item.skus[obj.radio2Index].price * item.num
                );
              } else {
                obj.totalPrice1 += parseFloat(item.min_price * item.num);
              }
            });
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": redata.botId,
              "obj": {shopCardList: obj.shopCardList, totalPrice1: 0}
            });
            if (obj.DetailListShow) {
              obj.shopCardList11 = [];
              for (var i = 0; i < obj.shopCardList.length; i++) {
                if (obj.shopCardList11.indexOf(obj.shopCardList[i]) == -1) {
                  obj.shopCardList11.unshift(obj.shopCardList[i])
                }
              }
            }
            var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
            if (this.botId == redata.botId) {
              let userDataStatus = {
                shopCardList: this.shopCardList,
                totalPrice1: this.totalPrice1,
              } = obj3;
            }
          }
        }
        setTimeout(() => {
          self.toDetailShop(self.shopIndex);
        }, 0);
        var obj = this.$store.getters.getShopImfByBotId(redata.botId)
        if (obj.shopCardList.length == 0) {
          self.$store.dispatch("changObjByBotIdAndObj", {
            "botId": redata.botId,
            "obj": {shopCartListShow: false}
          });
          var obj3 = this.$store.getters.getShopImfByBotId(redata.botId);
          if (this.botId == redata.botId) {
            let userDataStatus = {
              shopCartListShow: this.shopCartListShow,
            } = obj3;
          }
        }
      },
      tabChange1(item) {
        /*console.log(this.typeList1.indexOf(item));*/
        this.$store.dispatch("changObjByBotIdAndObj", {
          "botId": this.botId,
          "obj": {activeMenu: item}
        });
        var obj3 = this.$store.getters.getShopImfByBotId(this.botId);
        let userDataStatus = {
          activeMenu: this.activeMenu,
        } = obj3;
        // this.activeMenu = item;
      },
      //商店侧边栏点击
      changeTab2(item, index) {
        console.log(this.botId);
        this.$store.dispatch("changObjByBotIdAndObj", {
          "botId": this.botId,
          "obj": {radio3: this.typeList1[this.shopMenuIndex], shopPage: 1, radio4: "1"}
        });
        if (item) {
          this.$store.dispatch("changObjByBotIdAndObj", {
            "botId": this.botId,
            "obj": {shopMenuIndex: index, radio3: this.typeList1[index]}
          });
          var obj3 = this.$store.getters.getShopImfByBotId(this.botId);
          let userDataStatus = {
            radio3: this.radio3,
            shopPage: this.shopPage,
            radio4: this.radio4,
            shopMenuIndex: this.shopMenuIndex,
          } = obj3;
          this.websocketsend({
            msgFlag: window.msgFlag,
            deviceId: parseInt(window.redata.deviceId),
            appId: parseInt(window.redata.appId),
            botId: parseInt(window.redata.botId),
            msgType: "cmd",
            data: {
              cmd: "Fail",
              data: {
                speak: item
              }
            }
          });
        }
      },
      //详情页侧边栏点击
      changeTab3(item, index) {
        let obj = this.$store.getters.getShopImfByBotId(this.botId);

        this.$store.dispatch("changObjByBotIdAndObj", {
          "botId": this.botId,
          "obj": {
            "dishesMenuIndex": index,
            "activeMenu1": obj.dishes1.food_spu_tags[obj.dishesMenuIndex].name,
            "shopDishesPageTotal": Math.ceil(obj.dishes1.food_spu_tags[obj.dishesMenuIndex].spus.length / 3),
            "shopDishesPage": 1,
            "dishes22": this.pageSlice(obj.shopDishesPage, 3, obj.dishes1.food_spu_tags[obj.dishesMenuIndex].spus)
          }
        });
        var obj3 = this.$store.getters.getShopImfByBotId(this.botId);
        let userDataStatus = {
          dishesMenuIndex: this.dishesMenuIndex,
          activeMenu1: this.activeMenu1,
          shopDishesPageTotal: this.shopDishesPageTotal,
          shopDishesPage: this.shopDishesPage,
          dishes22: this.dishes22,
        } = obj3;
        if (item) {
          console.log(item);
          this.websocketsend({
            msgFlag: window.msgFlag,
            deviceId: parseInt(window.redata.deviceId),
            appId: parseInt(window.redata.appId),
            botId: parseInt(window.redata.botId),
            msgType: "cmd",
            data: {
              cmd: "Fail",
              data: {
                speak: item
              }
            }
          });
        }
      },
      autoScroll(scroll) {
        var S = this.$refs.detailScroll.scrollTop;
        if (S > scroll) {
          var timer = setInterval(() => {
            S -= 100;
            if (S <= scroll) {
              clearInterval(timer);
            }
            this.$refs.detailScroll.scrollTop = S;
          }, 10);
        } else {
          var timer = setInterval(() => {
            S += 100;
            if (S >= scroll) {
              clearInterval(timer);
            }
            this.$refs.detailScroll.scrollTop = S;
          }, 10);
        }
      },
      login_close() {
        //清空登录信息
        this.login_account = "";
        this.login_pwd = "";
        this.loginBombFlag = false;
      },
      checkVal(val) {
        //判断是否为空
        if (val == "" || val == null || val == undefined) return false;
        return true;
      },
      tabChange(tab, type) {
        this.$store.dispatch("changObjByBotIdAndObj", {
          "botId": this.botId,
          "obj": {
            "tab1": false,
            "tab2": false,
            "tab3": false,
            "tab4": false
          }
        });
        if (type == "1") {
          this.$store.dispatch("changObjByBotIdAndObj", {
            "botId": this.botId,
            "obj": {
              "tab1": true,
              "tab2": false,
              "tab3": false,
              "tab4": false
            }
          });
          this.adressFn();
        } else if (type == "2") {
          this.$store.dispatch("changObjByBotIdAndObj", {
            "botId": this.botId,
            "obj": {
              "tab1": false,
              "tab2": true,
              "tab3": false,
              "tab4": false
            }
          });
          this.orderListFn();
        } else if (type == "3") {
          this.$store.dispatch("changObjByBotIdAndObj", {
            "botId": this.botId,
            "obj": {
              "tab1": false,
              "tab2": false,
              "tab3": true,
              "tab4": false
            }
          });
          this.websocketsend({
            msgFlag: window.msgFlag,
            deviceId: parseInt(window.redata.deviceId),
            appId: parseInt(window.redata.appId),
            botId: parseInt(window.redata.botId),
            msgType: "cmd",
            data: {
              cmd: "OpenSort"
            }
          });
        } else if (type == "4") {
          this.$store.dispatch("changObjByBotIdAndObj", {
            "botId": this.botId,
            "obj": {
              "tab1": false,
              "tab2": false,
              "tab3": false,
              "tab4": true
            }
          });
          this.websocketsend({
            msgFlag: window.msgFlag,
            deviceId: parseInt(window.redata.deviceId),
            appId: parseInt(window.redata.appId),
            botId: parseInt(window.redata.botId),
            msgType: "cmd",
            data: {
              cmd: "Return"
            }
          });
        }
        var obj3 = this.$store.getters.getShopImfByBotId(this.botId);
        let userDataStatus = {
          tab1: this.tab1,
          tab2: this.tab2,
          tab3: this.tab3,
          tab4: this.tab4,
        } = obj3;
      },
      async getShopList() {
        //得到商店列表
        let self = this;
        this.$layer.loading("加载中...");
        let data = await http.get("/cs/listdevice", {});
        this.$layer.close();
        console.log(data);
        if (data.code == "0000") {
          let list = data.data;
          this.userData = list[0].devs;
          for (let i = 0; i < list.length; i++) {
            var devsList = list[i]["devs"];
            for (let b = 0; b < devsList.length; b++) {
              var obj = devsList[b];
              if (b == 0) {
                self.botId = obj.id;
              }
              if (obj.style == "iptv") {
                self.$store.dispatch("create_shop", {
                  "botId": obj.id
                });
                var shopListObj = {
                  shopName: "客服" + obj.id,
                  shopId: obj.id,
                  shopDialogList: [],
                  status: {
                    init: false,
                    mode: false,
                    menu: false,
                    paymode: false
                  },
                  orderList: [],
                  choiceOrderList: [],
                  initFlag: false,
                  robot: true,
                  toArtificialFlag: false,
                  deviceId: "",
                  totalPrice: 0,
                  appId: "",
                  stepObj: {
                    tangshiOrWaidai: "方式",
                    tangshiOrWaidaiF: false,
                    orderEdit: "点餐",
                    orderEditF: false,
                    payType: "选择支付方式",
                    payTypeF: false,
                    payContent: "支付方式",
                    payContentF: false
                  }
                };
                self.shopList.push(shopListObj);

              }
            }
          }
          console.log(self.shopList);
          setTimeout(() => {
            $(".dialog_menu .dialog_menu_list")
              .first()
              .click();
          }, 500);
        } else {
          this.layerToast(data.desc);
        }
      },
      async login_submit() {
        //登录操作
        if (!this.checkVal(this.login_account)) {
          this.layerToast("请输入账号");
          return;
        }
        if (!this.checkVal(this.login_pwd)) {
          this.layerToast("请输入密码");
          return;
        }

        let params = {
          login: this.login_account,
          password: this.login_pwd
        };
        let self = this;
        this.$layer.loading("登录中...");
        let data = await http.post("/user/login", params);
        this.$layer.close();
        if (data.code == "0000") {
          sessionStorage.setItem("loginUser", true);
          sessionStorage.setItem("loginUserId", data.data.useId);
          setCookie(
            "loginImf",
            JSON.stringify({
              name: this.login_account,
              pwd: this.login_pwd
            })
          );
          this.loginBombFlag = false;
          self.initWebSocket();
          this.getShopList();
        } else {
          this.layerToast(data.desc);
        }
      },
      layerToast(val) {
        //弹框
        this.$layer.toast({
          content: val,
          time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
        });
      },
      changeAudio(obj, event) {
        //语音播放
        $(".phoneticsMain i")
          .removeClass("focus")
          .addClass("nomal");
        let thisEvent = event.target;
        $("audio").remove();
        var srcs = obj.audioUrl,
          that = $("body"),
          audioWav =
            '<audio controls="controls" id="audioObj" autobuffer="autobuffer"  autoplay="autoplay" hidden>' +
            '<source src="data:audio/wav;base64,' +
            srcs +
            '" type="audio/ogg">' +
            '<source src="data:audio/acc;base64,' +
            srcs +
            '" type="audio/ogg">' +
            "</audio>";
        that.append(audioWav);
        $(thisEvent)
          .find("i")
          .removeClass("nomal")
          .addClass("focus");
        document.getElementById("audioObj").addEventListener("ended", function () {
          $(thisEvent)
            .find("i")
            .removeClass("focus")
            .addClass("nomal");
        });
        document.getElementById("audioObj").ondurationchange = () => {
          var audioTime = document.getElementById("audioObj").duration / this.audioText11.length;
          // document.getElementById("audioObj").playbackRate = 1.8
          console.log(audioTime);
        };
        var num = 1 + parseFloat(this.value4 / 100);
        document.getElementById("audioObj").playbackRate = num
      },
      toDetailShop(index, aa, listName, botId) {
        var obj = this.$store.getters.getShopImfByBotId(botId);
        console.log(obj);
        //商店详情
        let self = this;
        listName ? localStorage.setItem("listName", listName) : null;
        self.listName = localStorage.getItem("listName");
        if (index > self.shopList.length) {
          return;
        }
        self.chatId = self.shopList[index].shopId;
        self.shopIndex = index;
        self.botId = self.shopList[index]["shopId"];
        self.appId = self.shopList[index]["appId"];
        if (!self.checkVal(self.shopList[index]["deviceId"])) {
          self.deviceId = 0;
        } else {
          self.deviceId = self.shopList[index]["deviceId"];
        }
        self.dialogList = self.shopList[index]["shopDialogList"];
        self.scrollButtom();
        self.getUserDataStatus(botId)
      },
      getUserDataStatus(botId) {
        if (botId == this.botId) {
          var obj = this.$store.getters.getShopImfByBotId(botId);
          let userDataStatus = {
            radio11: this.radio11, //第几个
            numText: this.numText, //第几个来几份
            diologBoxShow: this.diologBoxShow, //规格页是否展示
            dishesSpecification: this.dishesSpecification, //菜品规格
            Attrs: this.Attrs, //菜品规格其它属性
            SpecificationPrice: this.SpecificationPrice, //规格价格
            SpecificationName: this.SpecificationName, //菜品名称
            num1: this.num1, //规格页计数
            radio2: this.radio2, //规格选项
            radio33: this.radio33, //排序
            shopPage: this.shopPage, //商店当前页码
            shopPageTotal: this.shopPageTotal, //商店总页数
            shopDishesPage: this.shopDishesPage, //商店商品列表当前页码
            cartDishesPage: this.cartDishesPage, //商店商品列表当前页码
            shopDishesPageTotal: this.shopDishesPageTotal, //商店商品总页数
            cartDishesPageTotal: this.cartDishesPageTotal, //商店商品总页数
            shopListShow: this.shopListShow, //商店列表展示
            DetailListShow: this.DetailListShow, //商店详情页展示
            OrderShow: this.OrderShow, //订单页展示
            payShow: this.payShow, //支付页展示
            AdressShow: this.AdressShow, //地址页展示
            shopCartListShow: this.shopCartListShow, //地址页展示
            OrderListShow: this.OrderListShow, //订单列表页展示
            shopDetailShow: this.shopDetailShow, //商店详情页展示
            shopSortShow: this.shopSortShow, //排序页展示
            helpShow: this.helpShow, //帮助页展示
            activeMenu: this.activeMenu,
            activeMenu1: this.activeMenu1,
            radio3: this.radio3,
            radio4: this.radio4,
            radio5: this.radio5,
            shopList1: this.shopList1, //商店列表
            shopList11: this.shopList11, //商店列表分页
            typeList1: this.typeList1, //商店分类
            orderList: this.orderList,
            tab1: this.tab1, //地址
            tab2: this.tab2, //订单
            tab3: this.tab3, //排序
            tab4: this.tab4, //返回
            dishes1: this.dishes1, //商店数据
            dishes2: this.dishes2, //商店菜品
            dishes22: this.dishes22, //商店菜品
            shopMenuIndex: this.shopMenuIndex,
            dishesMenuIndex: this.dishesMenuIndex,
            shopCardList: this.shopCardList, //购物车列表
            shopCardList1: this.shopCardList1, //购物车列表
            shopCardList11: this.shopCardList11, //购物车列表
            totalPrice1: this.totalPrice1,
            prevelOrder: this.prevelOrder, //订单预览
            prevelOrderDishes: this.prevelOrderDishes, //订单菜品列表
            payOrder: this.payOrder, //支付信息
            shopListSelectIndex: this.shopListSelectIndex, //主页选中索引集合
            dishesListSelectIndex: this.dishesListSelectIndex, //商品页选中索引集合
            SelectNum: this.SelectNum, //主页命中个数
            SelectNum1: this.SelectNum1, //商品栏命中个数
            dishesSelect: this.dishesSelect, //菜单选中状态
            shopSelect: this.shopSelect, //商店列表选中状态
            orderSelect: this.orderSelect, //食品页订单按钮选中状态
            shopCartSelect: this.shopCartSelect, //购物车选中状态
            numList: this.numList,
            helpFlag: this.helpFlag,//帮助标志
            AttrsCartName: this.AttrsCartName
          } = obj
        }
      },
      toDetailShop1(index) {
        const self = this;
        this.shopList.forEach((item, index1) => {
          if (index1 == index) {
            self.justSelect = true
          }
        })
        console.log(self.botId, self.deviceId, self.appId);
        self.websocketsend({
          "botId": self.botId,
          "deviceId": self.deviceId,
          "appId": self.appId,
          "msgType": "CMDCHAT",
          "data": {}
        });
      },
      scrollButtom() {
        //输入框滚动条到底部
        setTimeout(() => {
          var div = document.getElementById("dialog_content_main");
          div.scrollTop = div.scrollHeight;
        }, 100);
      },
      toSetArtificial(obj) {
        //语音识别是被操作
        console.log(obj);
        this.replyObj = obj;
        this.setPage = obj.Scenes;
        this.setPosition = obj.LocationId;
        this.setBombFlag = true;
        this.applyContent = obj.Message;
      },
      addImfById(type, val, id) {
        //根据id修改数据
        let self = this;
        $.each(self.shopList, function (k, v) {
          if (v["shopId"] == id) {
            v[type] = val;
            self.shopList[k] = v;
          }
        });
      },
      getGuiGe(obj, tag, botId) {
        console.log(obj);
        const self = this;
        var obj11 = this.$store.getters.getShopImfByBotId(self.botId);
        /*this.dishes1.food_spu_tags.forEach((item, index) => {
            this.dishes2 = this.dishes2.concat(item.spus)
          });
          this.dishes22 = this.pageSlice(1, 3, this.dishes1.food_spu_tags[0].spus)
          console.log(this.dishes1);
          this.activeMenu1 = this.dishes1.food_spu_tags[0].name;
          console.log(this.dishes22[0].skus);*/
        var SS = obj.Attrs.slice(0)
        obj11.Attrs = SS;
        obj11.Attrs.forEach((item, index) => {
          var AttrRadio = "Attrs" + index;
          item[AttrRadio] = "";
        });
        if (obj.skus.length > 1) {
          obj.skus.forEach((item, index) => {
            if (item.spec == obj.skus[0].spec) {
              self.$store.dispatch("changObjByBotIdAndObj", {
                "botId": self.botId,
                "obj": {radio2Index: index}
              });
            }
          });
        }
        self.$store.dispatch("changObjByBotIdAndObj", {
          "botId": self.botId,
          "obj": {SpecificationName: obj.name, dishesSpecification: obj.skus, Attrs: obj11.Attrs}
        });
        // self.SpecificationName = obj.name;
        // self.dishesSpecification = obj.skus;
        // obj.radio2Index=obj.skus[0].spec;
        /*obj.SpecificationPrice=item.price*/
        obj11.shopCardList.forEach((item5, index5) => {
          if (item5.id == obj.id) {
            if (item5.skus.length > 0) {
              if (obj.skus.length > 0) {
                obj.skus.forEach((item, index4) => {
                  if (item.spec == obj11.radio2) {
                    obj.radio2Index = index4
                  }
                });
              }
              /*item.skus[self.radio2Index].price*/

            }
          }
        })
        if (!tag) {
          obj.radio2 = obj11.dishesSpecification[0].spec;
          obj.radio2Index = 0;
          self.$store.dispatch("changObjByBotIdAndObj", {
            "botId": self.botId,
            "obj": {radio2: obj11.dishesSpecification[0].spec, radio2Index: obj11.radio2Index}
          });
          // self.radio2 = self.dishesSpecification[0].spec;

        } else {
          obj.radio2 = obj11.radio2;
          obj.skus.forEach((item, index) => {
            if (item.spec == obj11.radio2) {
              obj.radio2Index = index;
            }
          })
        }
        obj11.dishesSpecification.forEach((item, index) => {
          if (item.spec == obj11.radio2) {
            self.$store.dispatch("changObjByBotIdAndObj", {
              "botId": self.botId,
              "obj": {SpecificationPrice: item.price, radio2Index: index}
            });
            // self.SpecificationPrice = item.price;
            // self.radio2Index = index;
          }
        });
        /*obj["radio"+self.radio2Index]=self.radio2*/
        var obj3 = this.$store.getters.getShopImfByBotId(this.botId);
        if (this.botId == botId) {
          let userDataStatus = {
            SpecificationName: this.SpecificationName,
            dishesSpecification: this.dishesSpecification,
            Attrs: this.Attrs,
            radio2: this.radio2,
            SpecificationPrice: this.SpecificationPrice,
            radio2Index: this.radio2Index,
          } = obj3;
        }
      }
    },
    filters: {
      numFilter(value) {
        let realVal = Number(value).toFixed(2);
        return Number(realVal);
      }
    },
    computed: {
      reverseSum() {
        return Array.prototype.reverse.call(this.shopCardList)
      },
      shopCartListAA() {
        if (this.diologBoxShow) {
          var newVal1 = this.shopCardList.slice(1);
          var tag = 0;
          var indexA = 0;
          newVal1.forEach((item, index) => {
            if (this.shopCardList[0].id == item.id) {
              for (var i = 0; i < this.shopCardList[0].Attrs.length; i++) {
                const newValE = this.shopCardList[0].Attrs[i];
                if (newValE['Attrs' + i] == item['Attrs' + i]) {
                  tag++
                }
              }
              if (tag == this.shopCardList[0].Attrs.length) {
                indexA = index
              }
            }
          })
          if (tag == this.shopCardList[0].Attrs.length && tag != 0) {
            newVal1[indexA]['num']++
          } else {
            newVal1 = this.shopCardList
          }

        } else {
          newVal1 = this.shopCardList
        }
        return newVal1
      }
    },
    watch: {
      shopCardList11: function (newVal) {
        this.shopCardList1 = this.pageSlice(this.cartDishesPage, 6, newVal);
        if (newVal) {
          this.cartDishesPageTotal = Math.ceil(newVal.length / 6);
        }
        if (this.cartDishesPage > this.cartDishesPageTotal) {
          this.cartDishesPage = this.cartDishesPageTotal;
        }
      },
      shopCardList: function (newVal) {
        console.log(newVal);
        if (this.DetailListShow) {
          this.shopCardList11 = [];
          for (var i = 0; i < newVal.length; i++) {
            if (this.shopCardList11.indexOf(newVal[i]) == -1) {
              this.shopCardList11.unshift(newVal[i])
            }
          }
        }
      },
      deep: true    //深度监听
    },
    created() {
      this.initWebSocket();
      var obj = {
        shopSortShow: false,
        dishesSelect: true
      };
    },
    mounted() {
      if (sessionStorage.getItem("loginUser")) {
        var loginObj = JSON.parse(getCookie("loginImf"));
        this.login_account = loginObj.name;
        this.login_pwd = loginObj.pwd;
        this.login_submit();
      }
    },
    destroyed: function () {
      //页面销毁时关闭长连接
      let self = this;
      let list = self.shopList;

      list.forEach((v, k) => {
        if (!self.checkVal(v["deviceId"])) {
          v["deviceId"] = 0;
        }
        let obj = {
          deviceId: parseInt(v["deviceId"]),
          botId: parseInt(v["shopId"]),
          msgType: "unLockArtificialService"
        };
        self.websocketsend(obj);
      });
      this.websocketclose();
    }
  };
</script>
<style scoped lang='css'>
  @import "../assets/css/HomePage.css";
  @import "../assets/css/TakeATaxiByDiDi.css";

  .productListPage {
    width: 100%;
    height: 400px;
    position: relative;
    background: url("../assets/img/meituan/meituanPic.png") no-repeat center;
    background-size: cover;
    border-bottom: 1px solid #e5e5e5;
  }

  .diologBox {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 22;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .diologBox1 {
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0;
    width: 200px;
    background: rgba(0, 0, 0, 0);
    z-index: 999;
  }

  #picHelp {
    height: 100%;
    width: 200px;
    position: absolute;
    top: 0;
    right: -1000px;
    transition: all ease 1s;
  }

  .diologBox1 img {
    width: 100%;
    height: 100%;
  }

  .cartBox {
    width: 70%;
    height: 73%;
    background: #fff;
    border-radius: 8px;
  }

  .cartTop {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
  }

  .cartContent {
    margin: 5px 0;
    height: 70%;
    background: #f2f6fc;
  }

  .specification {
    width: 60%;
    /*height: 200px;*/
    background: #fff;
    position: relative;
  }

  .searchContainer {
    width: 90%;
    margin: 0 5% 5%;
  }

  .foodSearch {
    width: 100%;
  }

  .h3 {
    color: #666666;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
  }

  .searchCon {
    /*width: 290px;*/
    margin: 0 auto;
  }

  .el-radio-button,
  .el-radio-button__inner {
    margin: 0 5px 20px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
  }

  .pageTab {
    width: 200px;
    margin: 0 auto;
  }

  .topVioce {
    position: relative;
    z-index: 100;
    padding: 15px 10px;
    height: 25px;
    color: rgba(255, 152, 0, 0.8);
    background: rgba(0, 0, 0, 0.7);
  }

  /* .el-menu-vertical-demo {

    } */

  .logo {
    width: 150px;
    height: 40px;
    background: url("../assets/img/meituan/meituanlogo.png") no-repeat center rgba(0, 0, 0, 0.6);
    background-size: contain;
  }

  .menu {
    width: 150px;
    height: 305px;
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.6);
  }

  .menu::-webkit-scrollbar {
    width: 15px;
    background-color: rgba(213, 213, 213, 0.8);
  }

  .menu ul {
    padding: 0;
    text-align: center;
    margin: 0;
  }

  .menu ul li {
    width: 100%;
    list-style: none;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
    line-height: 24px;
    font-size: 14px;
    border-bottom: 1px solid rgba(211, 200, 230, 0.2);
  }

  .shopContainer {
    position: absolute;
    top: 55px;
    bottom: 0;
    left: 150px;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .shopList {
    float: left;
    width: 94%;
    height: 100%;
  }

  .shopListCon {
    list-style-type: none;
    width: 94%;
    height: 90%;
    padding: 0;
    margin: 0 auto;
    overflow-y: scroll;
  }

  .shopListCon1 {
    list-style-type: none;
    width: 94%;
    height: 90%;
    padding: 0;
    margin: 0 auto;
    overflow-y: scroll;
  }

  .shopListCon1::-webkit-scrollbar {
    display: none;
  }

  .shopListCon li {
    cursor: pointer;
    transition: all ease 1s;
    transform: scale(0.9);
    margin-bottom: 10px;
    width: 100%;
    height: 100px;
    background: white;
    position: relative;
    display: flex;
  }

  .shopListCon1 li {
    cursor: pointer;
    transition: all ease 1s;
    transform: scale(0.9);
    margin-bottom: 1px;
    width: 100%;
    height: 60px;
    background: white;
    position: relative;
    display: flex;
  }

  .rightBar {
    position: relative;
    z-index: 100;
    margin-top: 50px;
    float: right;
    width: 6%;
    height: 200px;
  }

  .rightBar img {
    margin: 0;
    width: 30px;
    height: 50px;
    cursor: pointer;
  }

  .pic img {
    margin-right: 20px;
    width: 100px;
    height: 100%;
  }

  .grade {
    margin: 5px 0;
  }

  .shopTitle {
    font-size: 18px;
    line-height: 30px;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .shopTitle1 {
    font-size: 16px;
    line-height: 27px;
  }

  .desc {
    font-size: 13px;
  }

  .desc .numList {
    position: absolute;
    height: 60px;
    width: 165px;
    bottom: 0px;
    right: -35px;
  }

  .desc .numList span {
    width: 25px;
    height: 25px;
    display: inline-block;
    border-radius: 100%;
    border: 1px solid #e5e5e5;
    cursor: pointer;
    margin-left: 3px;
    text-align: center;
    line-height: 25px;
    font-size: 12px;
    margin-bottom: 3px;
  }

  .desc .numList span:hover {
    background-color: rgba(246, 83, 2, 0.8);
    color: white;
  }

  .desc1 {
    font-size: 13px;
    width: 100%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .artificial_main {
    height: auto;
  }

  .aaa {
    transform: scale(1);
  }

  .menuActive {
    background: rgba(255, 152, 0, 0.9);
  }

  .cartList {
    color: rgba(255, 255, 255, 0.7);
    height: 80%;
  }

  .cartFoot {
    height: 20%;
    font-size: 14px;
    width: 100%;
    background: rgb(0, 0, 0);
    position: absolute;
    bottom: 0;
    color: rgba(255, 255, 255, 0.7);
    display: flex;
  }

  .cartButton {
    position: absolute;
    top: -40px;
    right: 0;
    color: #fff;
    z-index: 1111;
  }

  .cartFoot .cartFootImf {
    height: 100%;
    flex: 1;
  }

  .cartFoot .cartFootImf .imf {
    width: 100%;
    text-indent: 5px;
    color: white;
    overflow: hidden;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cartFoot .cartFootImf .imf:first-child {
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }

  .cartFoot .cartFootImf .imf:last-child {
    font-size: 10px;
    height: 16px;
    line-height: 16px;
  }

  .cartFoot .bottom {
    width: 48%;
    height: 100%;
    text-align: center;
    line-height: 46px;
    background-color: red;
    font-size: 16px;
    color: white;
    cursor: pointer;
  }

  .cartPic {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }

  .foodList {
    padding: 0;
    text-align: center;
    margin: 0;
  }

  .foodList li {
    width: 100%;
    list-style: none;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    border-bottom: 1px solid rgba(211, 200, 230, 0.2);
    overflow: hidden;
  }

  .foodList::-webkit-scrollbar {
    display: none;
  }

  .shopListCon::-webkit-scrollbar {
    display: none;
  }

  .menu::-webkit-scrollbar {
    display: none;
  }

  .topTip {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: rgba(246, 83, 2, 0.8);
  }

  .topTip1 {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background: rgba(246, 83, 2, 0.8);
  }

  .shopCaidNumMian {
    width: auto;
    height: 27px;
    float: right;
    min-width: 80px;
  }

  .shopCaidNumMian .operate {
    flex: 2;
    line-height: 25px;
    height: 25px;
    text-align: right;
  }

  .shopCaidNumMian .operate .reduce {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    display: inline-block;
    background: url(../assets/img/reduceProduct.png) no-repeat center;
    background-size: 15px;
    border-radius: 4px;
    cursor: pointer;
  }

  .shopCaidNumMian .operate .num {
    width: auto;
    min-width: 20px;
    text-align: center;
    font-size: 12px;
    color: #000000;
    display: inline-block;
  }

  .shopCaidNumMian .operate .increase {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    display: inline-block;
    background: url(../assets/img/increaseProduce.png) no-repeat center;
    background-size: 15px;
    border-radius: 4px;
    cursor: pointer;
  }

  .orderDetail {
    float: left;
    margin-left: 3%;
    margin-top: 10px;
    width: 38%;
    height: 300px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    font-size: 17px;
    position: relative;
    font-weight: bolder;
  }

  .orderShop {
    height: 24px;
    line-height: 24px;
    border-bottom: 1px solid #d3d4d6;
  }

  .orderDishesList {
    height: 80px;
    overflow: auto;
    line-height: 24px;
    border-bottom: 1px solid #d3d4d6;
  }

  .orderDishesList::-webkit-scrollbar {
    display: none;
  }

  .orderDishesList ul {
    padding: 0;
    font-weight: 500;
  }

  .orderDishesList ul li {
    list-style: none;
    font-size: 16px;
    line-height: 20px;
    overflow: hidden;
    display: flex;
  }

  .orderDishesName {
    flex: 2;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
  }

  .orderDishesNum {
    flex: 1;
    width: 30px;
    color: #b4bccc;
    /*float: right;*/
  }

  .desName {
    height: 150px;
    line-height: 28px;
  }

  .desName .RightS {
    float: right;
  }

  .footerCount {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: #f5dab1;
    border-radius: 0 0 10px 10px;
    color: red;
    font-size: 20px;
    line-height: 50px;
  }

  .priceStyle {
    float: right;
    margin-right: 10px;
  }

  .adressPay {
    float: left;
    margin-left: 3%;
    margin-top: 10px;
    width: 45%;
    height: 320px;
    position: relative;
  }

  .adressCon {
    width: 100%;
    height: 100px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }

  .phoneName {
    font-size: 20px;
    line-height: 25px;
  }

  .adressA {
    font-size: 16px;
    color: darkslategray;
    margin-top: 5px;
  }

  .AdressLogo {
    width: 25px;
    margin-left: 15px;
    font-size: 20px;
  }

  .payButton {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: red;
    border-radius: 10px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 23px;
    cursor: pointer;
  }

  .payContent {
    width: 32%;
    height: 82%;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .payPrice {
    height: 25%;
    width: 100%;
  }

  .payPrice p {
    margin: 15px 0;
  }

  .payPic {
    height: 70%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .payPic img {
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.3);
  }

  .shopSort {
    position: absolute;
    bottom: 0;
    right: 40px;
    width: 110px;
    padding: 10px;
    height: 180px;
    background: rgba(0, 0, 0, 0.6);
  }

  .chatContent {
    height: 587px;
    overflow-y: scroll;
  }

  .chatContent::-webkit-scrollbar {
    display: none;
  }

  .help {
    position: absolute;
    top: 10px;
    right: 50px;
    z-index: 999;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(200px);
  }

  .slide-fade1-enter-active {
    transition: all .8s ease;
  }

  .slide-fade1-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade1-enter, .slide-fade1-leave-to {
    opacity: 0;
  }

  .audioText {
    position: absolute;
    top: 0;
    left: 25%;
    width: 330px;
    height: 46px;
    overflow: hidden;
    font-size: 35px;
    text-align: center;
    color: white;
    z-index: 10000;
    background: rgba(255, 255, 255, .5);
  }

  .el-slider.is-vertical .el-slider__runway {
    margin: 0 24px !important;
  }

  .typecmd {
    position: absolute;
    right: 200px;
    top: 4px;
    color: rgba(246, 83, 2, 0.8);
  }
</style>
