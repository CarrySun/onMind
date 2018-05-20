<template>
  <div>
    <div class="table">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-file"></i> 我的文件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="handle-box">
        <div style="position:relative; margin-right:20px">
          <el-input v-model="select_word" prefix-icon="el-icon-search" placeholder="" class="handle-input mr10"></el-input>
        </div>
      </div>

      <el-table v-loading="loading" :data="data" style="width: 100%; text-align:center">
        <el-table-column prop="file_title" label="文件名">
        </el-table-column>
        <!-- <el-table-column prop="file_type" label="文件类型">
        </el-table-column> -->
        <el-table-column prop="file_owner.user_name" label="拥有者">
        </el-table-column>
        <el-table-column label="协作者">
          <template slot-scope="scope">
            <el-tag v-for="(item, index) in scope.row.file_partner" :key="index">{{ item.user_name }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最后修改时间" sortable>
            <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <!-- <span>{{ scope.row.updateTime | moment("from", "now") }}</span> -->
            <span>{{ scope.row.updateTime | moment("YYYY-MM-DD HH:mm:ss") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="310">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleInfo(scope.$index, scope.row)">浏览</el-button>
            <el-button size="mini" type="danger" @click="handleQuit(scope.$index, scope.row)">退出协作</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true,
      adding: false,
      tableData: [],
      multipleSelection: [],
      select_word: "",
      dialogFormVisible: false,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState(["friend"]),
    data() {
      const self = this;
      return self.tableData.filter(function(d) {
        var str = JSON.stringify(d);
        if (str.indexOf(self.select_word) > -1) {
          return d;
        }
      });
    }
  },
  methods: {
    getData() {
      let self = this;
      this.$store.dispatch("fileList", {
        listType: "file_partner",
        self: self
      });
    },
    handleInfo(index, row) {
      let { href } = this.$router.resolve({
        name: "file",
        query: {
          id: row._id
        }
      });
      window.open(href, "_blank");
    },
    handleQuit(index, row) {
      const self = this;
      this.$confirm("确定退出协作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("quitPartner", {
            index: index,
            self: self,
            _id: row._id
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  }
};
</script>

<style scoped lang="scss">
.handle-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.name-wrapper {
  cursor: pointer;
}
table {
  .el-button {
    margin-left: 2px;
    padding: 7px 10px;
  }
  .el-button:nth-child(1) {
    margin-left: 0px;
  }
}
</style>
