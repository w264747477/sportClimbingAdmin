<template>
  <div>
    <div style="margin-bottom: 20px; margin-left: 10px">
      <h2>成年组</h2>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="男子" name="first">
          <ConfigTable :info="info.M.grownTableData" style="margin-bottom: 70px"></ConfigTable>
          <ConfigTable :info="info.M.allRoundTableData" style="margin-bottom: 20px"></ConfigTable>
          <YearPanal :info="info.M.yearConfig1"></YearPanal>

          <el-button type="primary" style="display: block; width: 5rem; margin: 0 auto" @click="saveGrown">保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="女子" name="second">
          <ConfigTable :info="info.F.grownTableData" style="margin-bottom: 70px"></ConfigTable>
          <ConfigTable :info="info.F.allRoundTableData" style="margin-bottom: 20px"></ConfigTable>
          <YearPanal :info="info.F.yearConfig1"></YearPanal>

          <el-button type="primary" style="display: block; width: 5rem; margin: 0 auto" @click="saveGrown">保存</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin-left: 10px">
      <h2>U系列</h2>
      <el-tabs v-model="uActiveName" class="demo-tabs">
        <el-tab-pane v-for="item in uList" :label="`U${item}`" :name="item">
          <ConfigTable :info="info[`u${item}`].uGrownTableDataMen" style="margin-bottom: 70px"></ConfigTable>
          <ConfigTable :info="info[`u${item}`].uGrownTableDataWomen" style="margin-bottom: 20px"></ConfigTable>
          <YearPanal :info="info[`u${item}`].yearConfig"></YearPanal>
        </el-tab-pane>
      </el-tabs>

      <el-button type="primary" style="display: block; width: 5rem; margin: 0 auto; margin-bottom: 2rem"
        @click="saveU">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, TabsPaneContext } from 'element-plus'
import { color } from 'echarts/core'
import ConfigTable from './components/configTable/index.vue'
import Service from './api/index'
import YearPanal from './components/yearPanal/index.vue'
import { matchObj } from '@/constant'

const info = reactive({
  // 成年组男子
  M: {
    grownTableData: {
      title: '单项',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    allRoundTableData: {
      title: '全能',
      iptSec: {
        hasSemifinals: true,
        semifinalsNum: 0,
        finalNum: 0
      },
      tableData: [
        {
          type: '难度赛',
          preliminariesCount: 0,
          semifinalsCount: 0,
          finalCount: 0
        }
      ]
    },
    yearConfig1: {
      btnTxt: '一键同步所有成年组',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  // 成年组女子
  F: {
    grownTableData: {
      title: '单项',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    allRoundTableData: {
      title: '全能',
      iptSec: {
        hasSemifinals: true,
        semifinalsNum: 0,
        finalNum: 0
      },
      tableData: [
        {
          type: '难度赛',
          preliminariesCount: 0,
          semifinalsCount: 0,
          finalCount: 0
        }
      ]
    },
    yearConfig1: {
      btnTxt: '一键同步所有成年组',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  // u系列
  u5: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u6: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u7: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u8: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u9: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u10: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u11: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u12: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u13: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u14: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u15: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u16: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u17: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  },
  u18: {
    uGrownTableDataMen: {
      title: '男子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    uGrownTableDataWomen: {
      title: '女子',
      tableData: [
        {
          type: '难度赛',
          numOfCt: 0,
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: 0,
          hasSemifinals: true,
          semifinalsNum: 20,
          finalNum: 6
        }
      ]
    },
    yearConfig: {
      btnTxt: '一键同步U系列',
      data: {
        S: [],
        B: [],
        L: [],
        A: []
      }
    }
  }
})
const activeName = ref('first')
const uActiveName = ref(5)
const grownTableData = reactive({
  val: {
    title: '单项',
    tableData: [
      {
        type: '难度赛',
        numOfCt: 0,
        hasSemifinals: true,
        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: 0,
        hasSemifinals: true,
        semifinalsNum: 20,
        finalNum: 6
      }
    ]
  }
})
const allRoundTableData = reactive({
  val: {
    title: '全能',
    iptSec: {
      hasSemifinals: true,
      semifinalsNum: 0,
      finalNum: 0
    },
    tableData: [
      {
        type: '难度赛',
        preliminariesCount: 0,
        semifinalsCount: 0,
        finalCount: 0
      }
    ]
  }
})
const grownTableDataWomen = reactive({
  val: {
    title: '单项',
    tableData: [
      {
        type: '难度赛',
        numOfCt: 0,
        hasSemifinals: true,
        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: 0,
        hasSemifinals: true,
        semifinalsNum: 20,
        finalNum: 6
      }
    ]
  }
})
const allRoundTableDataWomen = reactive({
  val: {
    title: '全能',
    iptSec: {
      hasSemifinals: true,
      semifinalsNum: 0,
      finalNum: 0
    },
    tableData: [
      {
        type: '难度赛',
        preliminariesCount: 0,
        semifinalsCount: 0,
        finalCount: 0
      }
    ]
  }
})

const uGrownTableDataMen = reactive({
  val: {
    title: '男子',
    tableData: [
      {
        type: '难度赛',
        numOfCt: 0,
        hasSemifinals: true,
        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: 0,
        hasSemifinals: true,
        semifinalsNum: 20,
        finalNum: 6
      }
    ]
  }
})
const uGrownTableDataWomen = reactive({
  val: {
    title: '女子',
    tableData: [
      {
        type: '难度赛',
        numOfCt: 0,
        hasSemifinals: true,

        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: 0,
        hasSemifinals: true,
        semifinalsNum: 20,
        finalNum: 6
      }
    ]
  }
})

const uList = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

const changeCellStyle = ({ row, column, rowIndex, columnIndex }) => {
  const obj = {
    borderTop: '1px solid #eaeef5',
    borderBottom: '1px solid #eaeef5'
  }
  if (columnIndex == 0) {
    obj.borderLeft = '1px solid #eaeef5'
  }
  if (columnIndex == 4) {
    obj.borderRight = '1px solid #eaeef5'
  }
  return obj
}
const headerRowStyle = ({ row, column, rowIndex, columnIndex }) => {
  const obj = {
    border: 'none',
    color: '#2c3e50'
  }

  return obj
}
const saveGrown = async () => {
  let obj;

  let genderObj = {
    'first': 'M',
    'second': 'F'
  }
  obj = {
    "match": "M",
    "dftSigQ0RtNum": info[genderObj[activeName.value]].grownTableData.tableData[0].numOfCt,
    "dftSigHasF2": info[genderObj[activeName.value]].grownTableData.tableData[0].hasSemifinals == true ? 1 : 0,
    "dftSigF2PromNum": info[genderObj[activeName.value]].grownTableData.tableData[0].semifinalsNum,
    "dftSigF0PromNum": info[genderObj[activeName.value]].grownTableData.tableData[0].finalNum,
    "dftFullQ0HandNum": info[genderObj[activeName.value]].allRoundTableData.tableData[0].preliminariesCount,
    "dftFullF2HandNum": info[genderObj[activeName.value]].allRoundTableData.tableData[0].semifinalsCount,
    "dftFullF0HandNum": info[genderObj[activeName.value]].allRoundTableData.tableData[0].finalCount,
    "bldSigHasF2": info[genderObj[activeName.value]].grownTableData.tableData[1].hasSemifinals == true ? 1 : 0,
    "bldSigF2PromNum": info[genderObj[activeName.value]].grownTableData.tableData[1].semifinalsNum,
    "bldSigF0PromNum": info[genderObj[activeName.value]].grownTableData.tableData[1].finalNum,
    "fullHasF2": info[genderObj[activeName.value]].allRoundTableData.iptSec.hasSemifinals == true ? 1 : 0,
    "fullF2PromNum": info[genderObj[activeName.value]].allRoundTableData.iptSec.semifinalsNum,
    "fullF0PromNum": info[genderObj[activeName.value]].allRoundTableData.iptSec.finalNum
  }

  const res = await Service.setGameConfig(obj)
  if (res) {
    ElMessage({
      type: 'success',
      message: '配置成功'
    })
  }
}
const saveU = async () => {
  let obj;

  obj = {
    "match": "M",
    "dftSigQ0RtNum": info[`u${uActiveName.value}`].grownTableData.tableData[0].numOfCt,
    "dftSigHasF2": info[`u${uActiveName.value}`].grownTableData.tableData[0].hasSemifinals == true ? 1 : 0,
    "dftSigF2PromNum": info[`u${uActiveName.value}`].grownTableData.tableData[0].semifinalsNum,
    "dftSigF0PromNum": info[`u${uActiveName.value}`].grownTableData.tableData[0].finalNum,
    "dftFullQ0HandNum": info[`u${uActiveName.value}`].allRoundTableData.tableData[0].preliminariesCount,
    "dftFullF2HandNum": info[`u${uActiveName.value}`].allRoundTableData.tableData[0].semifinalsCount,
    "dftFullF0HandNum": info[`u${uActiveName.value}`].allRoundTableData.tableData[0].finalCount,
    "bldSigHasF2": info[`u${uActiveName.value}`].grownTableData.tableData[1].hasSemifinals == true ? 1 : 0,
    "bldSigF2PromNum": info[`u${uActiveName.value}`].grownTableData.tableData[1].semifinalsNum,
    "bldSigF0PromNum": info[`u${uActiveName.value}`].grownTableData.tableData[1].finalNum,
    "fullHasF2": info[`u${uActiveName.value}`].allRoundTableData.iptSec.hasSemifinals == true ? 1 : 0,
    "fullF2PromNum": info[`u${uActiveName.value}`].allRoundTableData.iptSec.semifinalsNum,
    "fullF0PromNum": info[`u${uActiveName.value}`].allRoundTableData.iptSec.finalNum
  }

  const res = await Service.setGameConfig(obj)
  if (res) {
    ElMessage({
      type: 'success',
      message: '配置成功'
    })
  }
}
const handleAdult = (val: matchObj) => {

  let obj = {
    'M': 'M',
    'F': 'F'
  }

  info[obj[val.match]].grownTableData.tableData[0] = {
    type: '难度赛',
    numOfCt: val.dftSigQ0RtNum,
    hasSemifinals: val.dftSigHasF2 == 0 ? false : true,
    semifinalsNum: val.dftSigF2PromNum,
    finalNum: val.dftSigF0PromNum
  }
  info[obj[val.match]].grownTableData.tableData[1] = {
    type: '攀石赛',
    hasSemifinals: val.bldSigHasF2 == 0 ? false : true,
    semifinalsNum: val.bldSigF2PromNum,
    finalNum: val.bldSigF0PromNum
  }
  info[obj[val.match]].allRoundTableData.iptSec = {
    hasSemifinals: val.fullHasF2 == 0 ? false : true,
    semifinalsNum: val.fullF2PromNum,
    finalNum: val.fullF0PromNum
  }
  info[obj[val.match]].allRoundTableData.tableData = [{
    type: '难度赛',
    preliminariesCount: val.dftFullQ0HandNum,
    semifinalsCount: val.dftFullF2HandNum,
    finalCount: val.dftFullF0HandNum
  }]

}
const handleU = (val: matchObj) => {
  let uObj = {}
  for (let i = 5; i < 18; i++) {
    let s = `U${i}`
    uObj[s] = `u${i}`

  }
  let genderObj = {
    'M': 'uGrownTableDataMen',
    'F': 'uGrownTableDataWomen'
  }
  let gender = val.match.slice(-1)
  let u = val.match.slice(0, val.match.length - 1)
  let obj = {
    'M': 'M',
    'F': 'F'
  }

  if (gender == 'M' && info[uObj[u]]) {
    info[uObj[u]].uGrownTableDataMen.tableData[0] = {
      type: '难度赛',
      numOfCt: val.dftSigQ0RtNum,
      hasSemifinals: val.dftSigHasF2 == 0 ? false : true,
      semifinalsNum: val.dftSigF2PromNum,
      finalNum: val.dftSigF0PromNum
    }
    info[uObj[u]].uGrownTableDataMen.tableData[1] = {
      type: '攀石赛',
      hasSemifinals: val.bldSigHasF2 == 0 ? false : true,
      semifinalsNum: val.bldSigF2PromNum,
      finalNum: val.bldSigF0PromNum
    }
  } else if (gender == 'F' && info[uObj[u]]) {
    info[uObj[u]].uGrownTableDataWomen.tableData[0] = {
      type: '难度赛',
      numOfCt: val.dftSigQ0RtNum,
      hasSemifinals: val.dftSigHasF2 == 0 ? false : true,
      semifinalsNum: val.dftSigF2PromNum,
      finalNum: val.dftSigF0PromNum
    }
    info[uObj[u]].uGrownTableDataWomen.tableData[1] = {
      type: '攀石赛',
      hasSemifinals: val.bldSigHasF2 == 0 ? false : true,
      semifinalsNum: val.bldSigF2PromNum,
      finalNum: val.bldSigF0PromNum
    }
  }


  if (['U6M', 'U6F'].includes(val.match)) {
    console.log(info[uObj[u]])
  }



}
const getInfo = async () => {

  let res = await Service.getGameConfig()

  if (res != undefined) {
    res.map(item => {
      if (['M', 'F'].includes(item.match)) {
        handleAdult(item)
      } else {
        handleU(item)
      }
    })


  } else {
    ElMessage({ type: 'error', message: res.msg })
  }
}
onMounted(() => {
  getInfo()
})
const options = [
  {
    value: true,
    label: '有'
  },
  {
    value: false,
    label: '无'
  }
]
const tableData = [
  {
    type: '难度赛',
    numOfCt: 0,
    hasSemifinals: true,

    semifinalsNum: 0,
    finalNum: 0
  },
  {
    type: '攀石赛',
    numOfCt: 0,
    hasSemifinals: true,
    semifinalsNum: 0,
    finalNum: 0
  }
]
</script>
<style scoped lang="scss">
.yearConfig {
  display: flex;
  flex-direction: column;

  .title {
    font-weight: 700;
    margin-bottom: 1rem;
  }
}

:deep .el-table__body {
  //-webkit-border-horizontal-spacing: 13px;  // 水平间距
  -webkit-border-vertical-spacing: 10px; // 垂直间距
  border: none;
}
</style>
