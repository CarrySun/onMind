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
              <!-- <th>操作</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
            v-for = "(item, index) in FileListData"
            :key = index>
              <td>{{item.file_title}}</td>
              <td>{{item.file_owner}}</td>
              <td>{{new Date(item.updateTime).toLocaleString()}}</td>
              <!-- <td>
                <ul class="todo" v-if = "type === 'owner'">
                  <li class="item">操作</li>
                  <li class="item">浏览</li>
                  <li class="item">重命名</li>
                  <li class="item">协作</li>
                  <li class="item">分享</li>
                  <li class="item">克隆</li>
                </ul>
                <ul class="todo" v-else-if = "type === 'partner'">
                  <li class="item">浏览</li>
                  <li class="item">退出协作</li>
                </ul>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "fileList",
  computed: {
    ...mapState({
      FileList: "FileList"
    }),
    ...mapGetters({
      FileListData: "FileListData"
    })
  },
  data() {
    return {
      type: this.$store.state.FileList.type,
      noFiles: true,
      pageName: this.$store.state.FileList.pageName
    };
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
      if (e.target.nextElementSibling.style.display == "inline") {
        e.target.nextElementSibling.style.display = "none";
      } else {
        e.target.nextElementSibling.style.display = "inline";
      }
    }
  }
};
</script>
<style scopt lang = "scss">
tr:hover{
  cursor: pointer;
}
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
.todo {
  position: absolute;
  right: 0;
  top: 0;
  list-style: none;
  width: 80px;
  line-height: 38px;
  overflow: hidden;
  background-color: #eee;
  height: 38px;
  margin-top: 1px;

  &:hover {
    height: auto;
  }

  > .item {
    height: 38px;
    cursor: pointer;
    letter-spacing: 2px;

    &:hover {
      background-color: #ddd;
    }
  }
}
</style>
