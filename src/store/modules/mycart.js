const state ={
  // 商品列表
//   book:JSON.parse(sessionStorage.getItem("mycartbook")),
  shop_list:[       
      // {
      //     bid:"4957",bookimg:"http://localhost:8088/BookShop/Images/9787111108078.jpg",
      //     booktype:"C C++ VC VC++",goodsName:"C++编程思想（第2版）第1卷",price:59
      // },
      // {
      //   bid:"4958",bookimg:"http://localhost:8088/BookShop/Images/9787111108078.jpg",
      //   booktype:"C C++ VC VC++",goodsName:"C++编程思想（第2版）第1卷",price:26
      // },
      // {
      //   bid:"4959",bookimg:"http://localhost:8088/BookShop/Images/9787111108078.jpg",
      //   booktype:"C C++ VC VC++",goodsName:"C++编程思想（第2版）第1卷",price:69
      // }
  ],

      // shop_list:JSON.parse(sessionStorage.getItem("mycartbook"))||[],
  // 添加到购物车的商品
  added:[]
}

const getters = {
  // 商品列表
  shoplist:state => state.shop_list,
  // 购物车列表
  cartProducts:state=>{
        return state.added.map(({bid,num})=>{
              let product=state.shop_list.find(n=>n.bid == bid)
              return {
                    ...product,
                    num
              }
        })
  },
  // 计算总价
  totalPrice:(state,getters)=>{
        var total=0;
        // getters.cartProducts.forEach
        getters.cartProducts.forEach(n => {
              total+=n.price*n.num;
        });
        return total;
  },
  // 计算总数量
  totalNum:(state,getters)=>{
        var total=0;
        // getters.cartProducts.array.forEach
        getters.cartProducts.forEach(n => {
              total+=n.num;
        });
        return total;
  }
}

// 异步操作
const actions = {
  // 添加到购物车
  addToCart({commit},product){
        commit('add',{  //传递add方法，并携带参数id
              bid:product.bid
        })
      //   console.log(product)
  },
  // 清空购物车
  clearAll({commit}){
        commit('clear')
  },
  // 删除购物车中指定商品
  delProduct({commit},product){
      commit('delete',{
            bid:product.bid
      })
  }
}

const mutations = {
  // 添加购物车
  add(state,{bid}){
        let record=state.added.find(n => n.bid == bid);
        if(!record){
              state.added.push({
                    bid,
                    num:1
              })
        }else{
              record.num++
        }
      //   console.log(state.added)
  },
  // 清空购物车
  clear(state){
        state.added=[];
  },
  // 删除购物车中指定商品
  delete(state,{bid}){
        state.added.forEach((n,i)=>{
              if(n.bid==bid){
                    state.added.splice(i,1);
              }
        })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}