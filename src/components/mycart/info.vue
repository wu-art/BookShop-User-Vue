<template>
  <div>
    <div class="item-warpper">
      <div class="item">
        总数:
        <strong>{{ totalNum }}</strong>
      </div>
      <div class="item">
        总价:
        <strong>{{ totalPrice }}</strong>
      </div>
      <div class="item btn btn-danger">
        <el-button type="success" @click="toJieSuan" class="jiesuan"
          >去结算</el-button
        >
        <el-button type="danger" @click="clearAll">清空购物车</el-button>
        <el-button type="primary" @click="myorder">我的订单</el-button>
      </div>
    </div>
    <!-- 订单弹窗 -->
    <el-dialog title="订单信息" :visible.sync="orderDialog" width="60%">
      <el-form ref="goodsForm" :model="goodsInfo" label-width="80px">
        <el-form-item label="买家姓名" prop="name">
          <el-input @change="changeNum" v-model="goodsInfo.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="goodsInfo.goodsName" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="发货地址" prop="address">
          <el-select
            v-model="goodsInfo.address.pid"
            @change="getCity($event)"
            placeholder="请选择省份"
          >
            <el-option
              v-for="item in province"
              :label="item.pv"
              :value="item.pk"
              :key="item.pk"
            ></el-option>
          </el-select>
          <el-select
            v-model="goodsInfo.address.cid"
            @change="getXian($event)"
            placeholder="请选择城市"
          >
            <el-option
              v-for="item in city"
              :label="item.cv"
              :value="item.ck"
              :key="item.ck"
            ></el-option>
          </el-select>
          <el-select
            v-model="goodsInfo.address.cyk"
            @change="getCun($event)"
            placeholder="请选择区县"
          >
            <el-option
              v-for="item in xian"
              :label="item.cyv"
              :value="item.cyk"
              :key="item.cyk"
            ></el-option>
          </el-select>
          <el-select
            v-model="goodsInfo.address.tk"
            @change="getMyCun($event)"
            placeholder="请选择村镇"
          >
            <el-option
              v-for="item in cun"
              :label="item.tv"
              :value="item.tk"
              :key="item.tk"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="goodsInfo.tel"></el-input>
        </el-form-item>
        <el-form-item label="商品总价" prop="price">
          <el-input v-model="goodsInfo.priceSum" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="price">
          <el-input v-model="goodsInfo.sumNum" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="">确认订单</el-button>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitOrder(goodsInfo)"
          >确认订单</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      orderDialog: false,
      goodsInfo: {
        bid: "",
        name: "",
        goodsName: "", //书籍名称
        address: {
          province: "",
          pid: "",
          city: "",
          cid: "",
          xian: "",
          cyk: "",
          cun: "",
          tk: ""
        },
        tel: "",
        price: "",
        bookimg: "",
        booktype: "",
        priceSum: "",
        sumNum: ""
      },
      newOrder: {
        OrderId: 0,
        BookId: "",
        Quantity: "",
        UnitPrice: ""
      },
      province: [],
      city: [],
      xian: [],
      cun: []
    };
  },
  computed: {
    ...mapGetters(["totalPrice", "totalNum"])
  },
  created() {
    this.getProvince();
  },
  methods: {
    ...mapActions(["clearAll"]),
    toJieSuan() {
      // this.$router.push("/jiesuan");
      this.orderDialog = true;
    },
    //获取省份信息
    getProvince() {
      this.$http.get("/getsheng").then(res => {
        // console.log(res.data);
        this.province = res.data;
      });
    },
    // 城市   四个函数中的for循环为获取详细的地址信息
    getCity(event) {
      this.$http
        .get("/getchengshibysid?pk=" + this.goodsInfo.address.pid)
        .then(res => {
          // console.log(res.data);
          this.city = res.data;
          // 获取订单省份
          for (let i = 0; i < this.province.length; i++) {
            if (this.province[i].pk == event) {
              // console.log(this.province[i].pv);
              this.goodsInfo.address.province = this.province[i].pv;
            }
          }
        });
    },
    // 县级信息
    getXian(val) {
      this.$http
        .get("/getcountrybycityid?ck=" + this.goodsInfo.address.cid)
        .then(res => {
          // console.log(res.data);
          this.xian = res.data;
          for (let i = 0; i < this.city.length; i++) {
            if (this.city[i].ck == val) {
              this.goodsInfo.address.city = this.city[i].cv;
            }
          }
        });
    },
    // 村镇信息
    getCun(val) {
      this.$http
        .get("/gettownbycid?cyk=" + this.goodsInfo.address.cyk)
        .then(res => {
          // console.log(res.data);
          this.cun = res.data;

          for (let i = 0; i < this.xian.length; i++) {
            if (this.xian[i].cyk == val) {
              this.goodsInfo.address.xian = this.xian[i].cyv;
            }
          }
        });
    },
    getMyCun(val) {
      // console.log(val)
      for (let i = 0; i < this.cun.length; i++) {
        if (this.cun[i].tk == val) {
          this.goodsInfo.address.cun = this.cun[i].tv;
        }
      }
    },
    //     提交订单
    submitOrder(goodsInfo) {
      // console.log(goodsInfo)
      let order = [];
      this.newOrder.BookId = goodsInfo.bid;
      this.newOrder.Quantity = goodsInfo.sumNum;
      this.newOrder.UnitPrice = goodsInfo.priceSum;
      order.push(this.newOrder);
      let uid = sessionStorage.getItem("uid");
      if (uid != null) {
        this.$http.post("/createorder", order).then(res => {
          //     console.log(res);
          if (res.status == 200) {
            this.$message.success(res.data.statedesc);
            this.orderDialog = false;
          } else {
            this.$message.error(res.data.statedesc);
          }
        });
      } else {
        this.$message.error("请先登录");
      }
    },
    //     查看订单
    myorder() {
      this.$router.push("/myorder");
    },
    changeNum() {
      let book = JSON.parse(sessionStorage.getItem("mycartbook"));
      this.goodsInfo.bid = book.bid;
      this.goodsInfo.price = book.price;
      this.goodsInfo.priceSum = this.totalPrice;
      this.goodsInfo.sumNum = this.totalNum;
    }
  }
};
</script>

<style scoped>
.item-warpper {
  display: flex;
  background-color: #dfdfdf;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-left: 10%;
  margin-top: 10px;
}
.item {
  flex: 1;
}
.jiesuan {
  margin-left: 60px;
}
.el-select {
  width: 20%;
}
</style>