<template>
  <div>
    <toast></toast>
    <div class="table">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-partner"></i> 与我协作</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="handle-box">
        <div style="position:relative; margin-right:20px">
          <el-input v-model="select_word" prefix-icon="el-icon-search" placeholder="" class="handle-input mr10"></el-input>
        </div>
      </div>
      <el-table :data="data" style="width: 100%; text-align:center" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文件名">
                <span>{{ props.row.file_title }}</span>
              </el-form-item>
              <el-form-item label="拥有者">
                <span>{{ props.row.file_owner }}</span>
              </el-form-item>
              <el-form-item label="协作者">
                <span v-for="(item, index) in props.row.file_partner" :key="index">{{ item }} </span>
              </el-form-item>
              <el-form-item label="最后修改时间">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="file_title" label="文件名">
        </el-table-column>
        <el-table-column prop="file_owner" label="拥有者">
        </el-table-column>
        <el-table-column prop="file_partner" label="协作者">
          <template slot-scope="scope">
            <el-tag style="margin-right:5px;cursor:pointer" v-for="(item, index) in scope.row.file_partner" :key="index">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最后修改时间" sortable width="130">
            <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="310">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpload(scope.$index, scope.row)">浏览</el-button>
            <el-button size="mini" type="danger" @click="handleExport(scope.$index, scope.row)">退出协作</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagination">
        <el-pagination :page-size = "page_size" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>

<script>
import Toast from "../common/Toast";
import files from "../../assets/file.json";
export default {
  components: {
    Toast
  },
  data() {
    return {
      // url: '../../assets/vuetable.json',
      tableData: [],
      cur_page: 1,
      page_size: 6,
      multipleSelection: [],
      select_word: "",
      dialogFormVisible: false,
      newFile: {
        name: "",
        partner: "",
        type: ""
      },
      form: {
        file_title: "",
        file_owner: "",
        updateTime: "",
      },
      smallFormLabelWidth: "50px",
      formLabelWidth: "120px",
      tags: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" }
      ]
    };
  },
  created() {
    this.getData();
  },
  computed: {
    total() {
      return files.list.length;
    },
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
    delTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    handleChange(value) {
      console.log(value);
    },
    release() {
      this.dialogFormVisible = false;
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    getData() {
      let self = this;
      var start = (self.cur_page - 1) * self.page_size;
      var end = self.cur_page * self.page_size;
      var data = files.list.slice(start, end);
      self.tableData = data;
      // if (process.env.NODE_ENV === "development") {
      //   self.url = "/ms/table/list";
      // }
      // self.$axios.post(self.url, { page: self.cur_page }).then(res => {
      //   self.tableData = res.data.list;
      // });
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleUpload(index, row) {
      this.$message("上传-第" + (index + 1) + "行");
    },
    handleSpider(index, row) {
      this.$message.error("抓取-第" + (index + 1) + "行");
    },
    handlePreprocess(index, row) {
      this.$message("预处理-第" + (index + 1) + "行");
    },
    handleTag(index, row) {
      this.$message("标注-第" + (index + 1) + "行");
    },
    handleExport(index, row) {
      this.$message.error("导出-第" + (index + 1) + "行");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
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
