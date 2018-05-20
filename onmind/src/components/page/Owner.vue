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
        <div>
          <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="dialogFormVisible = true">新建文件</el-button>
          <el-dialog title="新建文件" :visible.sync="dialogFormVisible" width="40%">
            <el-form :rules="rules" ref="newFile" :model="newFile">
              <el-form-item label="文件名" prop="file_title" :label-width="formLabelWidth" placeholder="请输入文件名">
                <el-input autofocus="autofocus" v-model="newFile.file_title" auto-complete="off" style="width:80%"></el-input>
              </el-form-item>
              <!-- <el-form-item label="文件类型" prop="file_type" :label-width="formLabelWidth">
                <el-select v-model="newFile.file_type" placeholder="请选择文件类型" style="width: 80%;">
                    <el-option label="文档" value="normal"></el-option>
                    <el-option label="思维导图" value="mind"></el-option>
                  </el-select>
              </el-form-item> -->
              <el-form-item label="协作者" :label-width="formLabelWidth">
                <el-select v-model="newFile.file_partner" multiple filterable default-first-option placeholder="请选择协作者" style="width: 80%;">
                  <el-option v-for="(item, index) in friend" :key="index" :label="item.user_name" :value="item.user_name"></el-option>
                </el-select>
                <div style="color:#ccc">
                  <i class="el-icon-info"></i> 协作者必须为好友</div>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">取 消</el-button>
              <el-button type="primary" @click="submit('newFile')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <el-dialog title="协作成员" :visible.sync="dialogPartnerVisible" width="40%">
        <el-form :rules="rules" ref="newPartner" :model="newPartner">
          <el-form-item label="协作者" :label-width="formLabelWidth">
            <el-select v-model="newPartner.file_partner" multiple filterable default-first-option placeholder="请选择协作者" style="width: 80%;">
              <el-option v-for="(item, index) in friend" :key="index" :label="item.user_name" :value="item.user_name"></el-option>
            </el-select>
            <div style="color:#ccc">
              <i class="el-icon-info"></i> 协作者必须为好友</div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelPartner">取 消</el-button>
          <el-button type="primary" @click="submitPartner">确 定</el-button>
        </div>
      </el-dialog>
      <el-table v-loading="loading" :data="data" style="width: 100%; text-align:center" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column prop="file_title" label="文件名">
        </el-table-column>
        <!-- <el-table-column prop="file_type" label="文件类型">
        </el-table-column> -->
        <el-table-column prop="file_owner.user_name" label="拥有者">
        </el-table-column>
        <el-table-column label="协作者">
          <template slot-scope="scope">
            <el-tag style="margin-right:3px" v-for="(item, index) in scope.row.file_partner" :key="index">{{ item.user_name }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最后修改时间" sortable>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.updateTime | moment("YYYY-MM-DD HH:mm:ss") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="310">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleInfo(scope.$index, scope.row)">浏览</el-button>
            <el-button size="mini" @click="handleRename(scope.$index, scope.row)">重命名</el-button>
            <el-button size="mini" @click="handlePartner(scope.$index, scope.row)">协作</el-button>
            <el-button size="mini" disabled @click="handleExport(scope.$index, scope.row)">导出</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
    var validateTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入文件名"));
      } else if (value.length > 15) {
        return callback(new Error("文件名长度在 15 个字符之内"));
      } else {
        this.$store
          .dispatch("isTitleRepeat", {
            file_title: this.newFile.file_title
          })
          .then(data => {
            if (data.success) {
              callback();
            } else {
              callback(new Error("文件名重复"));
            }
          })
          .catch(err => {
            callback(new Error("网络错误" + err));
          });
      }
    };
    return {
      loading: true,
      // adding: false,
      tableData: [],
      multipleSelection: [],
      select_word: "",
      dialogFormVisible: false,
      dialogPartnerVisible: false,
      newFile: {
        file_title: "",
        file_partner: [],
        file_type: "mind"
      },
      newPartner: {
        index: "",
        _id: "",
        file_partner: []
      },
      smallFormLabelWidth: "50px",
      formLabelWidth: "120px",
      rules: {
        // file_title: [
        //   { required: true, message: "请输入文件名称", trigger: "blur" },
        // { min: 0, max: 15, message: "长度在 15 个字符之内", trigger: "blur" }
        // ],
        file_title: [{ validator: validateTitle, trigger: ["blur", "change"] }],
        file_type: [
          { required: true, message: "请输入选择文件类型", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getData();
    this.getFriendData();
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
    getFriendData() {
      let self = this;
      this.$store.dispatch("friendList", {
        self: self
      });
    },
    cancel() {
      this.newFile = {
        file_title: "",
        file_partner: [],
        file_type: "mind"
      };
      this.dialogFormVisible = false;
    },
    cancelPartner() {
      this.newPartner = {
        file_partner: [],
        index: 0,
        _id: ""
      };
    },
    submitPartner() {
      var self = this;
      this.$store.dispatch("updateFilePartner", {
        self: self,
        index: self.newPartner.index,
        _id: self.newPartner._id,
        file_partner: self.newPartner.file_partner
      });
    },
    submit(formName) {
      const self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("addFile", {
            file_title: this.newFile.file_title,
            file_type: this.newFile.file_type,
            file_partner: this.newFile.file_partner,
            self: self
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getData() {
      let self = this;
      this.$store.dispatch("fileList", {
        listType: "file_owner",
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
    handleRename(index, row) {
      var self = this;
      this.$prompt("", "重命名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\S{1,15}$/,
        inputValue: row.file_title,
        inputErrorMessage: "文件名长度在 15 个字符之内"
      })
        .then(({ value }) => {
          if (value && value === row.file_title) {
          } else if (value) {
            this.$store.dispatch("updateFileTitle", {
              self: self,
              row: row,
              _id: row._id,
              file_title: value
            });
          }
        })
        .catch(() => {});
    },
    handlePartner(index, row) {
      this.dialogPartnerVisible = true;
      var arr = [];
      for(var i in row.file_partner){
        arr.push(row.file_partner[i].user_name)
      }
      this.newPartner = {
        index: index,
        file_partner: arr,
        _id: row._id
      };
    },
    handleExport(index, row) {
      this.$message("第" + (index + 1) + "行");
    },
    handleDel(index, row) {
      const self = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("delFile", {
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