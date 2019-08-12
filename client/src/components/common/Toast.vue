<template>
  <div class="toast" v-if="isShow">
      <div class="mask">
      </div>
      <template v-if="type === 'success'">
      <div class="toast-success">
          <img src="@/assets/images/toast/icon-checkcircle.svg">
          <div class="text">{{text}}</div>
      </div>
      </template>
      <template v-else-if="type === 'loading'">
      <div class="toast-loading">
          <img src="@/assets/images/toast/loading.gif">
          <div class="text">{{text}}</div>
      </div>
      </template>
      <template v-else-if="type === 'error'">
      <div class="toast-error">
          <img src="@/assets/images/toast/icon-error-big.svg">
          <div class="text">{{text}}</div>
          <div class="detail">{{detail}}</div>
          <img class="close-btn" src="@/assets/images/toast/close-icon.svg" @click="close"/>
      </div>
      </template>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
      props: ['namespace'],
      computed: {
          ...mapState({
              type(state){
                  return state.toast.type
              },
              isShow(state) {
                  return state.toast.isShow
              },
              text(state) {
                  return state.toast.text
              },
              detail(state) {
                  return state.toast.detail
              }
          })
      },
      methods: {
          close(){
              this.$store.dispatch(`${this.namespace}/hide`);
          }
      },
  }
</script>
<style scopt lang = "scss">
    .toast {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 9999;
        .mask {
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        .toast-success {
            position: fixed;
            top: 180px;
            left: 50%;
            transform: translate(-50%, 0);
            width: 300px;
        	height: 72px;
        	background-color: #ffffff;
        	box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.2);
            img {
                position: absolute;
                width: 24px;
                height: 24px;
                left: 86px;
                top: 25px;
            }
            .text {
                position: absolute;
                left: 122px;
                top: 28px;
                font-size: 14px;
                font-weight: 600;
                color: #666666;
            }
        }

        .toast-loading {
            position: fixed;
            top: 45%;
            left: 54%;
            transform: translate(-50%, 0);
            width: 300px;
        	height: 72px;
        	background-color: #ffffff;
        	box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.2);
            img {
                position: absolute;
                width: 44px;
                height: 44px;
                left: 71px;
                top: 16px;
            }
            .text {
                position: absolute;
                left: 135px;
                top: 28px;
                font-size: 14px;
                font-weight: 600;
                color: #666666;
            }
        }

        .toast-error {
            position: fixed;
            top: 180px;
            left: 50%;
            transform: translate(-50%, 0);
            width: 416px;
        	min-height: 130px;
        	background-color: #ffffff;
        	box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.2);
            img {
                position: absolute;
                width: 24px;
                height: 24px;
                left: 44px;
                top: 39px;
            }
            .text {
                position: absolute;
                left: 80px;
                top: 39px;
                font-size: 16px;
                font-weight: 500;
                line-height: 1.31;
                color: #666666;
            }
            .detail {
                position: relative;
                left: 80px;
                top: 70px;
                font-size: 12px;
            	line-height: 1.75;
            	color: #666666;
                word-break: break-all;
                max-width: 300px;
                margin-bottom: 80px;
            }
            .close-btn {
                position: absolute;
                width: 14px;
                height: 14px;
                left: 385px;
                top: 16px;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }


</style>
