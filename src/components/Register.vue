<template>
  <div>
    <el-form
      label-width="80px"
      :model="registerForm"
      ref="regForm"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <span slot="label">密&emsp;码</span>
        <el-input v-model="registerForm.pwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <span slot="label">邮&emsp;箱</span>
        <el-input v-model="registerForm.mail"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <span slot="label">姓&emsp;名</span>
        <el-input v-model="registerForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <span slot="label">电&emsp;话</span>
        <el-input v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="registerUser('regForm')">注册</el-button>
        <el-button type="primary" @click="reset('regForm')">重置</el-button>
        <el-button type="primary" @click="toHome">回到首页</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        pwd: "",
        mail: "",
        name: "",
        phone: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    registerUser(regForm) {
      // 请求失败
      // let fd = new FormData();
      // let r=this.registerForm;
      // Object.keys(r).forEach(key => {
      //   fd.append(key, r[key]);
      // });
      let regStr = `username=${this.registerForm.username}&pwd=${this.registerForm.pwd}
      &mail=${this.registerForm.mail}&name=${this.registerForm.name}
      &phone=${this.registerForm.phone}`;
      this.$refs[regForm].validate(valid => {
        if (valid) {
          this.$http.post("/regedituser", regStr).then(result => {
              // console.log(result.data);
              if (result.data.regeditState) {
                this.$message.success(result.data.statedesc + ",赶紧去登录吧!");
                this.registerForm={};
              } else {
                this.$message.error("请求失败!");
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

<style>
</style>