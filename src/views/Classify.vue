<template>
  <div>
    <el-container>
      <el-aside   style="
      /*background-color: #bbbbbb;*/
      margin: 0 auto;
      height: auto;
      width: 14%">
        <div>

<!--          <el-link v-for="item in defaultProps" :key="item.id" style="font-size: 18px;color: black;" :underline="false"  @click="titileclick(item.titlekey)">{{item.titlekey}}&#12288;-->

<!--          </el-link>-->
          <el-menu class="el-menu-vertical-demo" style="background-color: #DCDFE6;">

            <el-menu-item-group>
              <el-menu-item v-for="item in defaultProps" :key="item.id" style="font-size: 20px;color: black;margin: 0 auto" :underline="false"  @click="titileclick(item.titlekey)">&#12288;&#12288;&#12288;{{item.titlekey}}</el-menu-item>
            </el-menu-item-group>

          </el-menu>
        </div>
      </el-aside>

      <el-main style="background-color: #eeeeee">
        <div class="demo" id="box" >
          <ul>
            <li v-for="item in jsonlist"  :key="item.id" @click="click(item.id)">
              <img :src="item.imgsrc" alt="" style="width: 120px">
              <h4 align="center" style="width: 120px">{{item.bookname}}</h4>
              <p align="center" style="width: 120px">￥：{{item.price}}</p>
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

  name:"Classify",

  data() {
    return {
      ys,
      jsonlist: [],
      defaultProps:[],


    }
  },

  methods: {
    titileclick(titlekey){
      this.$router.push('/ClassifySearch/'+titlekey)
    },
    handleNodeClick(data) {
      console.log(data);
    },
    click(id){
      this.$router.push('/Detail/'+id)
    }
  },

  created: function () {
    let promise = axios.post('http://localhost:8181/booksrc/findAll/').then((resp) => {
      // console.log(resp.data)
      this.jsonlist = resp.data
      // console.log(this.jsonlist)
    });

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
