<template>
    <div class="footer">
        <div class="text">
            <p>—— 反馈和联系 ——</p>
            <p>Email: CarrySun@163.com</p>
            <p>© 2018</p>
        </div>
     </div>
</template>

<script>
export default {    
  name: 'footer-view',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scopt lang = "scss">
.footer {
    // height: 119px;
    background-color: #404655;
    flex: 0 0 auto;
    overflow: hidden;
    font-family: PingFangSC;
}
p {
    margin:  0;
    padding: 0;
    text-align: center;
    font-size: 14px;
    line-height: 1.86;
    color: #ffffff;
}
p:nth-child(1) {
    margin-top: 18px;
}
p:nth-child(3) {
    height: 17px;
    font-size: 12px;
    color: #afafaf;
    margin-top: 9px;
}
p:last-child {
    margin-bottom: 17px;
}
</style>
