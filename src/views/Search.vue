<template>
  <div>
    <el-page-header @back="goBack" content="搜索列表" title="返回首页">
    </el-page-header>
    <el-container>
      <!--      <el-aside width="15%" style="background-color: #bbbbbb">-->
      <!--&lt;!&ndash;        <div><el-link v-for="item in defaultProps" :key="item.id" :underline="false" >{{item.titlekey}}&#12288;</el-link></div>&ndash;&gt;-->
      <!--      </el-aside>-->

      <el-main style="background-color: #eeeeee">
        <div class="demo" id="box" >
          <ul>
            <li v-for="item in jsonlist"  :key="item.id" @click="click(item.id)">
              <img :src="item.imgsrc" alt="">
              <h4 align="center">{{item.bookname}}</h4>
              <p align="center">￥：{{item.price}}</p>
            </li>
          </ul>
        </div>
      </el-main>


    </el-container>
  </div>
</template>

<script>
import ys from './ys.css'
export default {

  name:"Search",

  data() {
    return {
      ys,
      user:null,
      jsonlist: [],
      defaultProps:[]

    }
  },

  methods: {
    goBack() {
      this.$router.push('/Home')
    },
    handleNodeClick(data) {
      console.log(data);
    },
    click(id){
      this.$router.push('/Detail/'+id)
    },
    find(){
      this.user=this.$route.params.user
      let promise = axios.post('http://localhost:8181/booksrc/findAllByKeyword/' + this.user).then((resp) => {
        // console.log(resp.data)
        this.jsonlist = resp.data
        // console.log(this.jsonlist)
      });
    }
  },

  created () {

    this.user=this.$route.params.user
    if (this.user!==null) {
      this.find()
    }


    let promise2 = axios.post('http://localhost:8181/classify/findAll/').then((resp) => {
      // console.log(resp.data)
      this.defaultProps = resp.data
      // console.log(this.jsonlist)
    });

  }
}
</script>

<style scoped>

</style>
