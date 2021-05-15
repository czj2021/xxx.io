<template>
  <div>
    <!--    <el-page-header @back="goBack" content="首页">-->
    <!--    </el-page-header>-->
    <el-container>
      <el-aside style="background-color: #DCDFE6;width: 15%">
        <div>
          <el-main>
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8181/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              accept="image/*"
              name="picture"
              :data="{uploadType:'avatar',id:ruleForm.id}">
              <img v-if="ruleForm.avatar" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload><br>
            <div><el-button type="text" plain style="width:180px;background-color: white"  @click="src1">个人资料</el-button></div><br>
            <div><el-button type="text" plain style="width:180px;background-color: white" @click="src2">个人订单</el-button></div><br>
            <div><el-button type="text" plain style="width:180px;background-color: white" @click="src3">收货地址</el-button></div><br>
            <div><el-button type="text" plain style="width:180px;background-color: white" @click="src4">购物车</el-button></div><br>
            <div><el-tooltip class="item" effect="dark" content="联系邮箱944453040@qq.com" placement="right">

              <el-button type="text" plain style="width:180px;background-color: white">售后服务</el-button></el-tooltip></div><br>
          </el-main>


        </div>

      </el-aside>
      <el-main style="background-color: #eeeeee">
<!--        <div class="left">-->

<!--          <br><br><br>-->
<!--          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">-->

<!--            <el-form-item label="ID" prop="id">-->
<!--              <el-input v-model="ruleForm.id" disabled ></el-input>-->
<!--            </el-form-item>-->

<!--            <el-form-item label="用户名" prop="username">-->
<!--              <el-input v-model="ruleForm.username"></el-input>-->
<!--            </el-form-item>-->

<!--            <el-form-item label="密码" prop="password">-->
<!--              <el-input type="password" v-model="ruleForm.password"></el-input>-->
<!--            </el-form-item>-->

<!--            <el-form-item label="手机号" prop="phone">-->
<!--              <el-input v-model="ruleForm.phone"></el-input>-->
<!--            </el-form-item>-->

<!--            <el-form-item label="性别" prop="sex">-->
<!--              <el-select v-model="ruleForm.sex" placeholder="请选择" style="width: 250px;">-->
<!--                <el-option label="男" value="男"></el-option>-->
<!--                <el-option label="女" value="女"></el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->

<!--            <el-form-item label="出生日期" required>-->
<!--              <el-col :span="11">-->
<!--                <el-form-item prop="birthday">-->
<!--                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 250px;" format="yyyy 年 MM 月 dd 日"-->
<!--                                  value-format="yyyy-MM-dd" >-->
<!--                  </el-date-picker>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-form-item>-->

<!--            <el-form-item>-->
<!--              <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>-->
<!--              <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--            </el-form-item>-->

<!--          </el-form>-->
<!--        </div>-->
        <router-view></router-view>
      </el-main></el-container>
  </div></template>
<script>
export default {
  name:"UserPage",

  data() {
    return {
      userNameImgUrl:'',//图片路径
      userNameImgDisk:'',//上传的磁盘路径
      userNameImg:'',//上传前图片原名称
      // dislogVisible:false,
      user: {
        userId:'',
        avatar:'',
      },
      ruleForm: {
        // id:'',
        // username:'',
        // password:'',
        // phone:'',
        // sex:'',
        // birthday:''
      },
      rules:{
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码',trigger: 'blur'},
          {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {min: 3, max: 11,message: '手机号长度为11位',trigger: 'blur'}
        ],
      },
      imageUrl: './static/images/logo.png',
      // circleUrl: "./static/images/logo.png",
      userName:window.sessionStorage.getItem('userName'),
    };
  },

  methods: {


    src1(){
      this.$router.push('/User')
    },
    src2(){
      this.$router.push('/UserOrder')
    },
    src3(){
      this.$router.push('/Address')
    },
    src4(){
      this.$router.push('/Cart')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          axios.put('http://localhost:8181/user/updateAllById',this.ruleForm).then((resp)=>{
            // console.log(this.ruleForm)
            if(resp!==null){

              this.$message.success({
                message:"修改成功",
                showClose:true
              });
            }
          })
        }else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);

      this.$router.push('/UserPage')
      console.log(this.imageUrl)

      // axios.post('http://localhost:8181/user/updateAllById/'+this.userName).then((resp)=>{
      //
      //   console.log(resp.data)
      // })


    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },

  created() {
    axios.post('http://localhost:8181/user/findAllByUsername/'+this.userName).then((resp)=>{
      // console.log(resp.data)
      //  window.sessionStorage.setItem("userId",resp.data.id);
      //  this.$store.dispatch("setUser",resp.data.id);

      // this.ruleForm.id=resp.data.id
      // this.ruleForm.username = resp.data.username
      // this.ruleForm.password=resp.data.password
      // this.ruleForm.phone = resp.data.phone
      // this.ruleForm.sex = resp.data.sex
      // this.ruleForm.birthday=resp.data.birthday
      this.ruleForm=resp.data

      this.imageUrl=resp.data.avatar
      // console.log(this.ruleForm)
      // console.log(this.ruleForm)
      // this.imageUrl='./static/images/'+resp.data.head
      // console.log(this.imageUrl)
    })
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
