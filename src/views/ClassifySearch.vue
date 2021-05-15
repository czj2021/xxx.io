<template>
  <div>
    <el-page-header @back="goBack"  title="返回" >
    </el-page-header>
    <el-container>


      <el-main style="background-color: #eeeeee">
        <div class="demo" id="box" >
          <ul>
            <li v-for="item in jsonlist"  :key="item.id" @click="click(item.id)">
              <img :src="item.imgsrc" alt="" style="width: 120px">
              <h4 align="center" style="width: 120px">{{item.bookname}}</h4>
              <p align="center" style="width: 120px">价格：{{item.price}}</p>
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

  name:"ClassifySearch",

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
      this.$router.push('/Classify')
    },
    handleNodeClick(data) {
      console.log(data);
    },
    click(id){
      this.$router.push('/Detail/'+id)
    },
    classify(titlekey) {
      console.log(titlekey)

      let promise1 = axios.post('http://localhost:8181/booksrc/findAllByTitleKey/' + titlekey).then((resp) => {
        // console.log(resp.data)
        this.jsonlist = resp.data

        // console.log(this.jsonlist)
      });

    }
  },

  created () {
    this.titlekey=this.$route.params.titlekey
    console.log(this.titlekey)


    let promise = axios.post('http://localhost:8181/booksrc/findAllByTitleKey/'+this.titlekey).then((resp) => {
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
