<template>
  <div>
    <toast></toast>
    <div class="table">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-friend"></i> 我的好友</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="handle-box">
        <div style="position:relative; margin-right:20px">
          <el-input v-model="select_word" prefix-icon="el-icon-search" placeholder="" class="handle-input mr10"></el-input>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="dialogFormVisible = true">添加好友</el-button>
          <el-dialog title="添加好友" :visible.sync="dialogFormVisible">
            <div style="margin-top: 15px;">
              <el-input placeholder="" v-model="input5" class="input-with-select">
                <el-select style="width: 130px;"  v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="邮箱" value="email"></el-option>
                  <el-option label="用户名" value="name"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" style="width:100px"></el-button>
              </el-input>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="release">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>

      <el-table :data="data" style="width: 100%; text-align:center" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="用户名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <!-- <el-table-column prop="updateTime" label="最后修改时间" sortable width="130">
            <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="note" label="标注规范" width="100">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p style="width:250px">{{ scope.row.note }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">规范详情</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="310">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpload(scope.$index, scope.row)">浏览</el-button>
            <el-button size="mini" @click="handleUpload(scope.$index, scope.row)">与他协作</el-button>
            <el-button size="mini" type="danger" @click="handleExport(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :page-size = "page_size" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "../common/Toast";
import friends from "../../assets/friend.json";
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
      num1: 1,
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
      input3: '',
      input4: '',
      input5: '',
      select: '邮箱'
    };
  },
  created() {
    this.getData();
  },
  computed: {
    total() {
      return friends.list.length;
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
      var data = friends.list.slice(start, end);
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
