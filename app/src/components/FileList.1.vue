<template>
  <div class="right">
      <div class="title">{{pageName}}</div>
      <div v-if = "noFiles" class="noFiles">
        <img class="logo" src="../assets/images/owner/folder.svg">
        <div style="color:#ccc">当前文件夹暂无文件</div>
      </div>
      <div v-else>
         <table width = "100%">
          <thead>
            <tr>
              <th>文件名</th>
              <th>拥有者</th>
              <th>最后修改时间</th>
            </tr>
          </thead>
          <tbody>
            <tr
            v-for = "(item, index) in FileListData"
            :key = index>
              <td>{{item.fileName}}</td>
              <td class="flex">
                {{item.author}}
                <img @click = "doList" class="doIcon" src="../assets/images/owner/list.svg"/>
                <div class="menu">
                  <ul>
                    <li tit="view"><span class="icons"></span> &nbsp;&nbsp;浏览</li>
                    <li tit="rename"><span class="icons"></span> &nbsp;&nbsp;重命名</li>
                    <li tit="colla"><span class="icons"></span> &nbsp;&nbsp;协作</li>
                    <li tit="share"><span class="icons"></span> &nbsp;&nbsp;分享</li>
                    <li tit="clone"><span class="icons"></span> &nbsp;&nbsp;克隆</li>
                    <li class="sep"></li>
                    <li tit="del"><span class="icons"></span> &nbsp;&nbsp;删除</li></ul>
                </div>
              </td>
              <td>{{new Date(item.updateTime).toLocaleString()}}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>
<style scopt lang = "less">
th {
  text-align: left;
  padding: 20px 10px 15px 0;
}
td {
  position: relative;
  padding: 10px 10px 10px 0;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}
td:nth-child(1) {
  width: 40%;
}
td:nth-child(2) {
  width: 30%;
}
td:nth-child(3) {
  width: 30%;
}
tbody {
  .doIcon {
    width: 20px;
    display: none;
    position: absolute;
    right: 0;
  }
  tr:hover {
    cursor: pointer;
    .doIcon {
      display: inline;
    }
  }
}
.menu {
  display: none;
  position: absolute;
  right: 0;
  z-index:5;
  background: #fff;
  border-radius: 5px;
}
.menu ul,
li {
  list-style: none;
}
.menu li:hover {
  cursor: pointer;
  background: #ccc;
}
.menu li {
  padding: 7px 10px;
  cursor: default;
  color: #444;
  line-height: 20px;
}
.menu li.sep {
  margin: 3px 0;
  padding: 0;
  height: 1px;
  background: #e7e7e7;
}
</style>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "fileList",
  data() {
    return {
      noFiles: true,
      pageName: this.$store.state.FileList.pageName
    };
  },
  computed: {
    ...mapState({
      FileList: "FileList"
    }),
    ...mapGetters({
      FileListData: "FileListData"
    })
  },
  watch: {
    FileListData() {
      if (this.FileList.data.length > 0) {
        this.noFiles = false;
      } else {
        this.noFiles = true;
      }
    }
  },
  methods: {
    doList(e) {
      if (e.target.nextElementSibling.style.display == "block") {
        e.target.nextElementSibling.style.display = "none";
      } else {
        e.target.nextElementSibling.style.display = "block";
      }
    }
  }
};
</script>
