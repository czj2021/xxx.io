<template>
  <div>

    <el-divider content-position="left"></el-divider>

    <div>
      <template>
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="item in imgList2" :key="item.id"><img :src="item.logoimg"  >
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>

    <el-divider content-position="left" >推荐图书</el-divider>

    <div class="demo" id="box" style="background-color: #eeeeee"><br>
      <ul>
        <li v-for="item in jsonlist" :key="item.id" @click="click(item.id)">
          <img :src="item.imgsrc" alt="" style="width: 200px;height: auto">
          <h4 align="center" style="width: 200px">{{item.bookname}}</h4>
          <p align="center" style="width: 200px">￥：{{item.price}}</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import ys from './ys.css'
export default {
  name: "Home",
  el:'#box',
  ys,

  data(){
    return{
      imgList2:[],
      jsonlist:[]
    }
  },

  methods:{
    click(id){
      this.$router.push('/HeaderDetail/'+id)
    }
  },

  created: function () {
    let promise = axios.post('http://localhost:8181/bookheader/findAll/').then((resp) => {
      // console.log(resp.data)
      this.jsonlist = resp.data
      // console.log(this.jsonlist)
    });
    let promise2 = axios.post('http://localhost:8181/losrc/findAll/').then((resp) => {
      // console.log(resp.data)
      this.imgList2 = resp.data
      // console.log(this.jsonlist)
    });
  }
}
</script>

<style scoped>
img{
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  /*height: inherit;*/
}
</style>
