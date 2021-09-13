<template>
  <div class="login">
    <div>
      <img class="bgimg" src="../assets/images/loginbg.png" alt="" />
    </div>
    <div class="card">
      <el-tabs type="border-card">
        <el-tab-pane label="用户登录">
          <el-form
            label-width="80px"
            :model="loginForm"
            ref="loginForm"
            :rules="rules"
          >
            <el-form-item label="用户名" prop="loginname">
              <el-input v-model="loginForm.loginname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <span slot="label">密&emsp;码</span>
              <el-input v-model="loginForm.pwd" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="tologin('loginForm')">登录</el-button>
              <el-button type="primary" @click="reset('loginForm')">重置</el-button>
              <el-button type="primary" @click="toHome">回到首页</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="用户注册">
          <Register></Register>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Register from "@/components/Register";
export default {
  components: {
    Register
  },
  data() {
    return {
      loginForm: {
        loginname: "",
        pwd: ""
      },
      rules: {
        loginname: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    tologin(loginForm) {
      let loginStr ="loginname=" + this.loginForm.loginname + "&pwd=" + this.loginForm.pwd;
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.$http.post("/userlogin",loginStr).then(result => {
              // console.log(result);
              if (result.data.LoginState) {
                sessionStorage.setItem("uid",result.data.uid);
                this.$router.push("/");
                this.$message.success(result.data.statusdesc);
              } else {
                this.$message.error(result.data.statusdesc);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset(loginForm){
      this.$refs[loginForm].resetFields();
    },
    toHome(){
          this.$router.push("/");
    }
  }
};
</script>

<style scoped>
@import "../assets/css/login.css";
</style>