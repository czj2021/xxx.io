<template>
  <div>

    <el-container>
      <el-aside width="25%">
        <div class="demo-image__preview">
          <el-image
            style="width: 300px; height: 300px"
            :src="imgsrc"
            :preview-src-list="srcList">
          </el-image>
        </div>
      </el-aside>

      <el-main>
        <el-form ref="ruleForm" :model="ruleForm"  label-width="80px" >
          <el-form-item label="书名：" prop="bookname">
            <!--        这是详情页{{id}}-->
            {{ruleForm.bookname}}
          </el-form-item>
          <el-form-item label="作者" prop="author">
            {{ruleForm.author}}
          </el-form-item>
          <el-form-item label="出版社" prop="publish">
            {{ruleForm.publish}}
          </el-form-item>
          <el-form-item label="价格" prop="price">
            {{ruleForm.price}}
          </el-form-item>
          <el-form-item label="类别" prop="titlekey">
            {{ruleForm.titlekey}}
          </el-form-item>
          <el-form-item label="库存" prop="nums">
            {{ruleForm.nums}}
          </el-form-item>
          <el-form-item label="页数" prop="pages">
            {{ruleForm.pages}}
          </el-form-item>
          <el-form-item  label="数量" prop="num">
            <el-input-number v-model="ruleForm.num" :min="1" :max="ruleForm.nums" label="描述文字"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-table-column label="操作">
<!--              <template v-if="userName!==null">-->
                <el-button type="primary" icon="el-icon-plus"   @click="submitForm('ruleForm')">加入购物车</el-button>
                <el-button   @click="AddBook" type="primary" plain >现在购买</el-button>
<!--              </template>-->
            </el-table-column>
          </el-form-item>

        </el-form>

      </el-main>
    </el-container>


<!--    <el-divider></el-divider>-->
<!--    -->
<!--    <el-container class="center" style="width: 50%">-->
<!--      <div class="demo-image__lazy" >-->
<!--        <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>-->
<!--      </div>-->
<!--    </el-container>-->

    <!--    <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">-->
    <!--      <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>-->
    <!--      <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>-->
    <!--    </el-form-item>-->
  </div>
</template>

<script>


export default {
  name: "Detail",


  data(){
    return{
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [],
      id:null,
      num:1,
      // imgsrc: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      ruleForm:[],
      userId:'',
      userName:window.sessionStorage.getItem('userName'),
    }
  },
  computed:{

  },
  methods:{
    AddBook(){
      // this.userId=window.sessionStorage.getItem('userId')

      if (this.userName !== null) {
        axios.post('http://localhost:8181/orderform/saveAll/', this.ruleForm).then((resp) => {

          this.$message({
            message: '选择购买成功，请到订单查看',
            type: 'success'
          });

        })
      }else{
        this.$message.warning('选择购买失败，请先登录')
        this.$router.push('/Login')
      }
    },
    // handleChange(value) {
    //    // console.log(value);
    //    this.ruleForm.num=value
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(this.ruleForm)



        // this.userId=window.sessionStorage.getItem('userId')

        if (this.userName !== null) {

          let promise = axios.post('http://localhost:8181/cart/save/', this.ruleForm).then((resp) => {
            this.$message({
              message: '加入购物车成功',
              type: 'success'
            });
            // console.log(this.ruleForm)
          })

        } else {
          this.$message.warning('加入购物车失败，请先登录')
          this.$router.push('/Login')


        }
        // this.$router.push('/Cart')
      })
      // addToCart(id){
      //   console.log('点击添加到购物车')
      //   // this.$router.push('/Cart')
      //   // this.$store.commit('ADD_TO_CART')
      // },

    }
  },
  created:function () {


    this.id=this.$route.params.id

    let promise = axios.post('http://localhost:8181/booksrc/findById/'+this.id).then((resp) => {
      this.ruleForm = resp.data
      this.ruleForm.userid=window.sessionStorage.getItem('userId')
      this.imgsrc=resp.data.imgsrc
      // console.log(this.id)
      // console.log(this.ruleForm)
    })



  }
}
</script>

<style scoped>

</style>
