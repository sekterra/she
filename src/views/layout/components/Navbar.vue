<template>
  <div class="navbar">
    <div class="menuSide" @click="toggleSideBar"></div>
    <!-- <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/> -->

    <el-menu
      :default-active="activeIndex2"
      id="top-menu"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fff"
      text-color="#545c64"
      active-text-color="#545c64">
      <el-submenu index="1" class="top-menu">
        <template slot="title">
          <b-row align-v="center" class="text-center" style="height: 100%;">
            <b-col sm="2"><h5><strong>안전</strong></h5></b-col>
            <b-col sm="2"><h5><strong>보건</strong></h5></b-col>
            <b-col sm="2"><h5><strong>환경</strong></h5></b-col>
            <b-col sm="2"><h5><strong>위험성평가</strong></h5></b-col>
            <b-col sm="2"><h5><strong>기초정보</strong></h5></b-col>
            <b-col sm="2"><h5><strong>시스템 관리</strong></h5></b-col>
          </b-row>
        </template>
        <el-menu-item index="1-1" class="sub-menu">
          <b-row align-h="center" class="text-center">
            <b-col sm="2" @click.stop="route('/hea/user/userCheckupReserve')">보건홈</b-col>
            <b-col sm="2" @click.stop="route('/saf/wkod/wkodRequest')">작업허가서</b-col>
            <b-col sm="2">준비중</b-col>
            <b-col sm="2">준비중</b-col>
            <b-col sm="2">준비중</b-col>
            <b-col sm="2">공정</b-col>
          </b-row>
        </el-menu-item>
        <el-menu-item index="1-1" class="sub-menu">
          <b-row align-h="center" class="text-center">
            <b-col sm="2" @click.stop="route('/hea/baseInfo/baseInfoTest')">기준정보</b-col>
            <b-col sm="2" @click.stop="route('/saf/check/checkResultPlanList')">안전점검관리</b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
          </b-row>
        </el-menu-item>
        <el-menu-item index="1-1" class="sub-menu">
          <b-row align-h="center" class="text-center">
            <b-col sm="2" @click.stop="route('/hea/checkup/checkupPlan')">검진</b-col>
            <b-col sm="2" @click.stop="route('/saf/accident/nearmiss')">사고관리</b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
          </b-row>
        </el-menu-item>
        <el-menu-item index="1-1" class="sub-menu">
          <b-row align-h="center" class="text-center">
            <b-col sm="2" @click.stop="route('/hea/infirmary/generalBusiness')">건강관리실</b-col>
            <b-col sm="2" @click.stop="route('/saf/facility/facilityCheckResultPlanList')">설비점검</b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
          </b-row>
        </el-menu-item>
        <el-menu-item index="1-1" class="sub-menu">
          <b-row align-h="center" class="text-center">
            <b-col sm="2" @click.stop="route('/hea/workingEnvManage/hazard')">유해인자</b-col>
            <b-col sm="2" @click.stop="route('/saf/imprAct/imprAct')">개선관리</b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
          </b-row>
        </el-menu-item>
        <el-menu-item index="1-1" class="sub-menu">
          <b-row align-h="center" class="text-center">
            <b-col sm="2"></b-col>
            <b-col sm="2" @click.stop="route('/saf/spe/spe')">보호구관리</b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
          </b-row>
        </el-menu-item>
        <el-menu-item index="1-1" class="sub-menu">
          <b-row align-h="center" class="text-center">
            <b-col sm="2"></b-col>
            <b-col sm="2" @click.stop="route('/saf/safetyEducation/edueResult')">교육</b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
          </b-row>
        </el-menu-item>
        <el-menu-item index="1-1" class="sub-menu">
          <b-row align-h="center" class="text-center">
            <b-col sm="2"></b-col>
            <b-col sm="2" @click.stop="route('/saf/noaccident/noAccidentResult')">사업장 무재해</b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
          </b-row>
        </el-menu-item>
        <el-menu-item index="1-1" class="sub-menu">
          <b-row align-h="center" class="text-center">
            <b-col sm="2"></b-col>
            <b-col sm="2" @click.stop="route('/saf/baseinfo/wkodChkItem')">기준정보</b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
          </b-row>
        </el-menu-item>
        <el-menu-item index="1-1" class="sub-menu">
          <b-row align-h="center" class="text-center">
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
            <b-col sm="2"></b-col>
          </b-row>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <!-- <b-navbar toggleable>
      <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown text="보건" class="mx-5" left>
            <b-dropdown-item href="#"  @click.stop="route('/hea/baseInfo/baseInfoTest')">기준정보</b-dropdown-item>
            <b-dropdown-item href="#" @click.stop="route('/hea/checkup/checkupPlan')">검진</b-dropdown-item>
            <b-dropdown-item href="#" @click.stop="route('/hea/infirmary/generalBusiness')">건강관리실</b-dropdown-item>
            <b-dropdown-item href="#" @click.stop="route('hea/user/checkupReserve')">보건홈</b-dropdown-item>
            <b-dropdown-item href="#" @click.stop="route('/hea/workingEnvManage/hazard')">유해인자</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="안전" class="mx-5" left>
            <b-dropdown-item href="#">준비중</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="환경" class="mx-5" left>
            <b-dropdown-item href="#">준비중</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="시스템 관리" class="mx-5" left>
            <b-dropdown-item href="#" @click.stop="route('manage/process/process')">공정</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> -->

    <!-- <breadcrumb class="breadcrumb-container"/> -->

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item"/>

        <!-- <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="international right-menu-item"/>
        </el-tooltip>

        <lang-select class="international right-menu-item"/>

        <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip> -->
      </template>

      <!-- <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
// import { asyncRouterMap } from '@/router/index';

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  mounted () {
    this.$nextTick(() => {
      $('.el-menu-demo .el-icon-arrow-down').hide();
    });
  },
  data () {
    return {
      activeIndex2: '1'
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    route(_url) {
      console.log(_url);
      console.log(this.$router);
      this.$comm.movePage(this.$router, _url);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  // height: 40px;
  // line-height: 40px;
  height: 65px;
  line-height: 65px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0px 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style scoped>
.el-menu--horizontal {
  border-right: none;
  border-bottom: solid 1px #ffffff;
}

.top-menu {
  width: 60vw;
}
.sub-menu {
  width: 60vw;
}

.menuSide {
  width:30px;
  height:30px;
  background: url('./image/yullin.png');
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
}
.openSidebar .menuSide:hover {
  background: url('./image/left_btn.png');
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
}
.hideSidebar .menuSide:hover {
  background: url('./image/right_btn.png');
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
}
</style>
