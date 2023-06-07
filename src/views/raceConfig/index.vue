<template>
  <div>
    <div style="margin-bottom: 20px; margin-left: 10px">
      <h2>成年组测试2</h2>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="男子" name="first">
          <ConfigTable :info="info.adultMen.grownTableData" style="margin-bottom: 70px"></ConfigTable>
          <ConfigTable :info="info.adultMen.allRoundTableData" style="margin-bottom: 20px"></ConfigTable>
          <YearPanal :info="info.adultMen.yearConfig1"></YearPanal>

          <el-button type="primary" style="display: block; width: 5rem; margin: 0 auto" @click="saveGrown">保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="女子" name="second">
          <ConfigTable :info="info.adultWomen.grownTableData" style="margin-bottom: 70px"></ConfigTable>
          <ConfigTable :info="info.adultWomen.allRoundTableData" style="margin-bottom: 20px"></ConfigTable>
          <YearPanal :info="info.adultWomen.yearConfig1"></YearPanal>

          <el-button type="primary" style="display: block; width: 5rem; margin: 0 auto" @click="saveGrown">保存</el-button></el-tab-pane
        >
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

      <el-button type="primary" style="display: block; width: 5rem; margin: 0 auto; margin-bottom: 2rem" @click="saveGrown">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, TabsPaneContext } from 'element-plus'
import { color } from 'echarts/core'
import ConfigTable from './components/configTable/index.vue'
import Service from './api/index'
import YearPanal from './components/yearPanal/index.vue'

const info = reactive({
  // 成年组男子
  adultMen: {
    grownTableData: {
      title: '单项',
      tableData: [
        {
          type: '难度赛',
          numOfCt: '',
          hasSemifinals: true,
          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
  adultWomen: {
    grownTableData: {
      title: '单项',
      tableData: [
        {
          type: '难度赛',
          numOfCt: '',
          hasSemifinals: true,
          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
          numOfCt: '',
          hasSemifinals: true,

          semifinalsNum: 26,
          finalNum: 8
        },
        {
          type: '攀石赛',
          numOfCt: '',
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
        numOfCt: '',
        hasSemifinals: true,
        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: '',
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
        numOfCt: '',
        hasSemifinals: true,
        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: '',
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
        numOfCt: '',
        hasSemifinals: true,

        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: '',
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
        numOfCt: '',
        hasSemifinals: true,

        semifinalsNum: 26,
        finalNum: 8
      },
      {
        type: '攀石赛',
        numOfCt: '',
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
  const res = await Service.setGrown(Object.assign(grownTableData.val, allRoundTableData.val))
  if (res) {
    ElMessage({
      type: 'success',
      message: '配置成功'
    })
  } else {
    ElMessage({
      type: 'warning',
      message: res.message
    })
  }
}
const saveU = async () => {
  const res = await Service.setU(Object.assign(uGrownTableDataMen.val, uGrownTableDataWomen.val))
  if (res) {
    ElMessage({
      type: 'success',
      message: '配置成功'
    })
  } else {
    ElMessage({
      type: 'warning',
      message: res.message
    })
  }
}
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
    numOfCt: '',
    hasSemifinals: true,

    semifinalsNum: 0,
    finalNum: 0
  },
  {
    type: '攀石赛',
    numOfCt: '',
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
