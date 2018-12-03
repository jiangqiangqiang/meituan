/**
 * Created by 开心 on 2018/11/11
 */
export default {
  state: {
    "name":"wuzhibin",
    "thisBotId":"",
    "shopList":[]
  },
  mutations: {
    create_shop(state,params){
      let obj = {};
      obj["botId"] = params["botId"];
      obj["obj"] = {
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
        seeMoreShow: false, //首页查看更多
        justSelect: false, //只接受当前消息
        activeMenu: "",
        activeMenu1: "",
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
        dishesSelect: false, //菜单选中状态
        shopSelect: false, //商店列表选中状态
        orderSelect: false, //食品页订单按钮选中状态
        shopCartSelect: false, //购物车选中状态
        audio1: null,
        numList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        food_spu_tagsStart:0,
        food_spu_tagsEnd:6,
      };
      state.shopList.push(obj)
    },
    changObjByBotIdAndAttribute(state,params){
      let botId = params["botId"],attribute = params["attribute"],value = params["value"];
      state.shopList.forEach((item)=>{
        if (item["botId"] === botId){
          item[attribute] = value;
        }
      })
    },
    changObjByBotIdAndObj(state,params){
      let botId = params["botId"],obj = params["obj"];
      state.shopList.forEach((item,index)=>{
        if (item["botId"] === botId){
          Object.assign(state.shopList[index]["obj"],obj);
        }
      })
    },
    updateFood_spu_tags(state,params){
      let botId = params["botId"],obj = params["obj"],type = params["type"];
      state.shopList.forEach((item,index)=>{
        if (item["botId"] === botId){
          state.shopList[index]["obj"];
          if (type == "down"){
            state.shopList[index]["obj"]["food_spu_tagsStart"] += 6;
            state.shopList[index]["obj"]["food_spu_tagsEnd"] += 6;
          } else if (type == "upper"){
            state.shopList[index]["obj"]["food_spu_tagsStart"] -= 6;
            state.shopList[index]["obj"]["food_spu_tagsEnd"] -= 6;
          }
        }
      })
    }
  },
  getters:{
    getShopImfByBotId:(state)=>{
      return (botId)=>{
        let obj = {};
        state.shopList.forEach((k)=>{
          if (k["botId"] === botId){
            obj = k["obj"];
          }
        });
        return obj;
      }
    }
  },
  actions: {
    create_shop:(context,params)=>{
      context.commit("create_shop",params);
    },
    changObjByBotIdAndAttribute:(context,params)=>{
      context.commit("changObjByBotIdAndAttribute",params);
    },
    changObjByBotIdAndObj:(context,params)=>{//根据对象修改列表
      context.commit("changObjByBotIdAndObj",params);
    updateFood_spu    },
  _tags:(context,params)=>{
      context.commit("updateFood_spu_tags",params);
    }
  }
}
