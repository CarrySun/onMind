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
          <el-input v-model="select_word" prefix-icon="el-icon-search" placeholder="请输入用户名或邮箱" class="handle-input mr10"></el-input>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="dialogFormVisible = true">添加好友</el-button>
          <el-dialog :before-close="cancelAdd" title="添加好友" :visible.sync="dialogFormVisible">
            <div style="margin-top: 15px;">
              <p class="title">请输入邮箱或用户名添加好友</p>
              <el-input placeholder="" v-model="friendName" class="input-with-select">
                <el-select style="width: 130px;" v-model="type" slot="prepend" placeholder="请选择">
                  <el-option label="邮箱" value="email"></el-option>
                  <el-option label="用户名" value="name"></el-option>
                </el-select>
                <el-button @click="searchFriend" slot="append" icon="el-icon-search" style="width:200px">搜索</el-button>
              </el-input>
              <p class="title">搜索结果</p>
              <el-card class="box-card" v-if='searchData'>
                <div class="card-info">
                  <div>
                    <span>{{searchData.user_name}}</span>
                    <span>{{searchData.user_email}}</span>
                  </div>
                  <el-button @click="addFriend" icon="el-icon-plus" style="float: right; padding: 3px 0" type="text">加为好友</el-button>
                </div>
              </el-card>
            </div>
            <!-- <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="release">确 定</el-button>
            </div> -->
          </el-dialog>
          <el-dialog :before-close="cancel" title="选择要与他协作的文件" :visible.sync="dialogPartnerVisible" width="40%">
            <div>
              <el-checkbox-group v-model="checked" size="medium">
                <el-checkbox v-for="(item,index) in tableData" :key="index" :name="item._id" :label="item.file_title" border></el-checkbox>
              </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>

      <el-table v-loading="loading" :data="data" style="width: 100%; text-align:center" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column prop="user_name" label="用户名">
        </el-table-column>
        <el-table-column prop="user_email" label="邮箱">
        </el-table-column>
        <el-table-column label="操作" width="310">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleParter(scope.$index, scope.row)">与他协作</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" v-if="total > page_size">
        <el-pagination :page-size="page_size" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "../common/Toast";
import friends from "../../assets/friend.json";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    Toast
  },
  data() {
    return {
      tableData: [],
      select_word: "",
      loading: true,
      cur_page: 1,
      page_size: 6,
      dialogFormVisible: false,
      dialogPartnerVisible: false,
      friendName: "3400840017@qq.com",
      type: "email",
      sending: false,
      searching: false,
      searchData: null,
      checked: [],
      activeFriendId: ""
    };
  },
  created() {
    // this.getFileData();
    this.getFriendData();
  },
  computed: {
    ...mapState(["friend"]),
    total() {
      return this.friend.length;
    },
    data() {
      var self = this;
      return self.friend.filter(function(d) {
        var str = JSON.stringify(d);
        if (str.indexOf(self.select_word) > -1) {
          return d;
        }
      });
    }
  },
  methods: {
    cancelAdd() {
      this.dialogFormVisible = false
    },
    cancel() {
      this.checked = [];
      this.dialogPartnerVisible = false;
    },
    submit() {
      var self = this;
      var checked = self.checked.concat();
      var uncheck = [];
      var index = [];
      for (var i = 0; i < self.tableData.length; i++) {
        var flag = false;
        for (var j in self.checked) {
          if (self.tableData[i].file_title == self.checked[j]) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          uncheck.push(self.tableData[i].file_title);
        }
      }
      this.$store.dispatch("addPartner", {
        self: self,
        checked: checked,
        uncheck: uncheck,
        file_partner: self.activeFriendId
      });
    },
    getFileData() {
      let self = this;
      this.$store
        .dispatch("fileList", {
          listType: "file_owner",
          self: self
        })
        .then(function(res) {
          self.loading = false;
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
            } else if (data.success) {
              self.tableData = data.data;
            }
          }
        })
        .catch(err => {
          self.loading = false;
          console.log(err);
          self.$message({
            message: "文件列表获取失败，请重试",
            type: "error"
          });
        });
    },
    getFriendData() {
      let self = this;
      this.$store.dispatch("friendList", {
        self: self
      });
    },
    searchFriend() {
      var self = this;
      this.searching = true;
      this.$store.dispatch("searchFriend", {
        self: self,
        type: self.type,
        friend: self.friendName
      });
    },
    addFriend() {
      var self = this;
      this.sending = true;
      this.$store.dispatch("addFriend", {
        self: self,
        type: self.type,
        friend: self.friendName
      });
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getFriendData();
    },
    handleParter(index, row) {
      var self = this;
      this.$store
        .dispatch("fileList", {
          listType: "file_owner",
          self: self
        })
        .then(function(res) {
          self.loading = false;
          if (res.data) {
            var data = res.data;
            if (!data.success) {
              self.$message({
                message: data.err,
                type: "error"
              });
            } else if (data.success) {
              self.tableData = data.data;
              self.activeFriendId = row.user_id;
              var data = self.tableData.concat();
              for (var i in data) {
                for (var j = 0; j < data[i].file_partner.length; j++) {
                  if (data[i].file_partner[j]._id == self.activeFriendId) {
                    self.checked.push(data[i].file_title);
                    break;
                  }
                }
              }
              self.dialogPartnerVisible = true;
            }
          }
        })
        .catch(err => {
          self.loading = false;
          console.log(err);
          self.$message({
            message: "文件列表获取失败，请重试",
            type: "error"
          });
        });
    },
    handleDelete(index, row) {
      const self = this;
      this.$confirm("确定删除该好友么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("delFriend", {
            self: self,
            index: index,
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

.title {
  margin: 10px 0;
}

.card-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}

.el-checkbox {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
