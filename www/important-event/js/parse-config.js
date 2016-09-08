'use strict';
angular.module('impApp')
  .constant('provkey', {
    "100": "北京",
    "200": "广东",
    "210": "上海",
    "220": "天津",
    "230": "重庆",
    "240": "辽宁",
    "250": "江苏",
    "270": "湖北",
    "280": "四川",
    "290": "陕西",
    "311": "河北",
    "351": "山西",
    "371": "河南",
    "431": "吉林",
    "451": "黑龙江",
    "471": "内蒙",
    "531": "山东",
    "551": "安徽",
    "571": "浙江",
    "591": "福建",
    "731": "湖南",
    "771": "广西",
    "791": "江西",
    "851": "贵州",
    "871": "云南",
    "891": "西藏",
    "898": "海南",
    "931": "甘肃",
    "951": "宁夏",
    "971": "青海",
    "991": "新疆"
  }).constant('parseKey', {
  BearerBusinessDetail: {
    title: '全国业务承载情况',
    dataByMonth: {
      formatter: 'wan',
      visiable: true,
      title: '近一年各月实体厅、电子渠道业务量月总值',
      legend: ['电子渠道', '实体厅']
    },
    dataByProv: {
      formatter: 'wan',
      visiable: true,
      title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['电子渠道', '实体厅']
    },
    leftRaise: {
      formatter: 'wan',
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      formatter: 'wan',
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      formatter: 'wan',
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      formatter: 'wan',
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  BillSystemDetail: {
    title: '全国业务承载情况',
    dataByMonth: {
      formatter: 'billion',
      visiable: true,
      title: '近一年各月计费系统总值',
      legend: ['话单量']
    },
    dataByProv: {
      formatter: 'billion',
      visiable: true,
      title: '当期各省计费系统话单量排名',
      legend: ['话单量']
    },
    leftRaise: {
      formatter: 'billion',
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      formatter: 'billion',
      visiable: false
    },
    leftDrop: {
      formatter: 'billion',
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      formatter: 'wan',
      visiable: false
    }
  },
  FinancialDetail: {
    title: '全国业务承载情况',
    dataByMonth: {
      formatter: 'wan',
      visiable: true,
      title: '近一年各月账单用户数、HLR工单量月总值',
      legend: ['账单用户数', 'HLR工单量']
    },
    dataByProv: {
      formatter: 'billion',
      visiable: true,
      title: '当期各省话单量排名账单用户数、HLR工单量排名',
      legend: ['账单用户数', 'HLR工单量']
    },
    leftRaise: {
      formatter: 'billion',
      visiable: true,
      legend: ['上期', '本期']
    },
    rightRaise: {
      formatter: 'billion',
      visiable: true,
      legend: ['上期', '本期']
    },
    leftDrop: {
      formatter: 'billion',
      visiable: true,
      legend: ['上期', '本期']
    },
    rightDrop: {
      formatter: 'billion',
      visiable: true,
      legend: ['上期', '本期']
    }
  },
  ComplaintOverall: {
    dataByMonth: {
      formatter: 'jian',
      visiable: true,
      title: '近一年业务支撑网投诉总量',
      legend: ['投诉量']
    },
    dataByProv: {
      formatter: 'jian',
      visiable: true,
      title: '当期各省业务支撑网投诉总量',
      legend: ['投诉量']
    },
    leftRaise: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ComplaintPoint: {
    dataByMonth: {
      formatter: 'jian',
      visiable: true,
      title: '第四级投诉分类主要类型分组统计结果',
      legend: ['投诉量']
    },
    dataByCenter: {
      formatter: 'value',
      visiable: true,
      title: ''
    },
    dataByProv: {
      formatter: 'jian',
      visiable: true,
      title: '全国各省焦点投诉前四类投诉图',
      legend: ['投诉量']
    },
    leftRaise: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    }
  },
  ComplaintReason: {
    dataByMonth: {
      formatter: 'jian',
      visiable: true,
      title: '全国责任原因数据分布',
      legend: ['投诉量']
    },
    dataByProv: {
      formatter: 'jian',
      visiable: true,
      title: '责任原因前四名按省统计图',
      legend: ['投诉量']
    },
    leftRaise: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    }
  },
  ComplaintRecallAll: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: '投诉回复及时率',
      legend: ['回复率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '全国各省投诉回复及时率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    }
  },
  ComplaintTimeAll: {
    dataByMonth: {
      formatter: 'value',
      visiable: true,
      title: '客户投诉解决时长（分）',
      legend: ['分']
    },
    dataByProv: {
      formatter: 'value',
      visiable: true,
      title: '全国客户投诉解决时长（分）',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  HostStatus: {
    dataByMonth: {
      formatter: 'percent',
      visiable: true,
      title: '全网主机可用性',
      legend: ['可用性']
    },
    dataByProv: {
      formatter: 'percent',
      visiable: true,
      title: '全网主机平均可用性',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    }
  },
  DbStatus: {
    dataByMonth: {
      formatter: 'percent',
      visiable: true,
      title: '全网数据库可用性',
      legend: ['可用性']
    },
    dataByProv: {
      formatter: 'percent',
      visiable: true,
      title: '全网数据库平均可用性',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    }
  },
  MainDetect: {
    dataByMonth: {
      formatter: 'percent',
      visiable: true,
      title: '关键业务繁忙时段平均可用性',
      legend: ['网厅', '实体厅']
    },
    dataByProv: {
      formatter: 'percent',
      visiable: true,
      title: '全国关键业务繁忙时段平均可用性',
      legend: ['网厅', '实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      formatter: 'percent',
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      formatter: 'percent',
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      visiable: true,
      formatter: 'percent',
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      formatter: 'percent',
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  InfoQueryDetect: {
    dataByMonth: {
      formatter: 'percent',
      visiable: true,
      title: '资料查询可用性',
      legend: ['网厅', '实体厅']
    },
    dataByProv: {
      formatter: 'percent',
      visiable: true,
      title: '全国资料查询库平均可用性',
      legend: ['网厅', '实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  InfoChangeDetect: {
    dataByMonth: {
      formatter: 'percent',
      visiable: true,
      title: '资料变更可用性',
      legend: ['实体厅']
    },
    dataByProv: {
      formatter: 'percent',
      visiable: true,
      title: '全国资料变更可用性',
      legend: ['实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  RealTimeDetect: {
    dataByMonth: {
      formatter: 'percent',
      visiable: true,
      title: '实时话费查询可用性',
      legend: ['网厅', '实体厅']
    },
    dataByProv: {
      formatter: 'percent',
      visiable: true,
      title: '全国实时话费查询平均可用性',
      legend: ['网厅', '实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  BillQueryDetect: {
    dataByMonth: {
      formatter: 'percent',
      visiable: true,
      title: '账单查询可用性',
      legend: ['网厅', '实体厅']
    },
    dataByProv: {
      formatter: 'percent',
      visiable: true,
      title: '全国账单查询平均可用性',
      legend: ['网厅', '实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  DetailBillDetect: {
    dataByMonth: {
      formatter: 'percent',
      visiable: true,
      title: '详单查询可用性',
      legend: ['网厅', '实体厅']
    },
    dataByProv: {
      formatter: 'percent',
      visiable: true,
      title: '全国详单查询平均可用性',
      legend: ['网厅', '实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  PaymentDetect: {
    dataByMonth: {
      formatter: 'percent',
      visiable: true,
      title: ' 缴费复机可用性',
      legend: ['实体厅']
    },
    dataByProv: {
      formatter: 'percent',
      visiable: true,
      title: '全国缴费复机平均可用性',
      legend: ['实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  InfoQuerydetect: {
    dataByMonth: {
      formatter: 'second',
      visiable: true,
      title: '资料查询响应时长',
      legend: ['网厅', '实体厅']
    },
    dataByProv: {
      formatter: 'second',
      visiable: true,
      title: '全国资料查询库平均响应时长',
      legend: ['网厅', '实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  InfoChangedetect: {
    dataByMonth: {
      formatter: 'second',
      visiable: true,
      title: '资料变更响应时长',
      legend: ['实体厅']
    },
    dataByProv: {
      formatter: 'second',
      visiable: true,
      title: '全国资料变更响应时长',
      legend: ['实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  RealTimedetect: {
    dataByMonth: {
      formatter: 'second',
      visiable: true,
      title: '实时话费查询响应时长',
      legend: ['网厅', '实体厅']
    },
    dataByProv: {
      formatter: 'second',
      visiable: true,
      title: '全国实时话费查询平均响应时长',
      legend: ['网厅', '实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  BillQuerydetect: {
    dataByMonth: {
      formatter: 'second',
      visiable: true,
      title: '账单查询响应时长',
      legend: ['网厅', '实体厅']
    },
    dataByProv: {
      formatter: 'second',
      visiable: true,
      title: '全国账单查询平均响应时长',
      legend: ['网厅', '实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  DetailBilldetect: {
    dataByMonth: {
      formatter: 'second',
      visiable: true,
      title: '详单查询响应时长',
      legend: ['网厅', '实体厅']
    },
    dataByProv: {
      formatter: 'second',
      visiable: true,
      title: '全国详单查询平均响应时长',
      legend: ['网厅', '实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  Paymentdetect: {
    dataByMonth: {
      formatter: 'second',
      visiable: true,
      title: ' 缴费复机响应时长',
      legend: ['实体厅']
    },
    dataByProv: {
      formatter: 'second',
      visiable: true,
      title: '全国缴费复机平均响应时长',
      legend: ['实体厅']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    leftDrop: {
      // visiable: false
      visiable: true,
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    }
  },
  ZC_03_KSF_02_01c_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: '5 分钟缴费开机及时率',
      legend: ['及时率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省 5 分钟缴费开机及时率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      // visiable: false
      visiable: true,
      // // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      // visiable:
      visiable: true,
      // // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    }
  },
  ZC_03_KSF_02_01e_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: '10 分钟缴费开机延迟率',
      legend: ['延迟率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省 10 分钟缴费开机延迟率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_03_KSF_01_03a_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: '欠费停机前短信提醒成功率',
      legend: ['成功率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省欠费停机前短信提醒成功率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_03_KSF_01_13_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: 'GPRS流量用尽提醒成功率',
      legend: ['成功率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省GPRS流量用尽提醒成功率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_03_KSF_01_08_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: '话费回馈到账提醒成功率',
      legend: ['成功率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省话费回馈到账提醒成功率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_04_KSF_01_01a_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: '充值业务成功率',
      legend: ['成功率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省充值业务成功率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_04_KSF_01_01b_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: '银行业务成功率',
      legend: ['成功率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省银行业务成功率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_04_KSF_01_01e_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: 'HLR业务成功率',
      legend: ['成功率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省HLR业务成功率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_04_KSF_01_01f_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: '客服业务成功率',
      legend: ['成功率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省客服业务成功率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_04_KSF_01_01c_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: '短厅业务成功率',
      legend: ['成功率']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省短厅业务成功率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_04_KSF_01_01d_MON: {
    dataByMonth: {
      formatter: 'originpercent',
      visiable: true,
      title: '网厅业务成功率',
      legend: ['可用性']
    },
    dataByProv: {
      formatter: 'originpercent',
      visiable: true,
      title: '各省网厅业务成功率',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  MO_04_KSF_02_08_01_MON: {
    dataByMonth: {
      formatter: 'minute',
      visiable: true,
      title: '话单计费处理平均时长',
      legend: ['时长']
    },
    dataByProv: {
      formatter: 'minute',
      visiable: true,
      title: '各省话单计费处理平均时长',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_04_KSF_02_01_MON: {
    dataByMonth: {
      formatter: 'minute',
      visiable: true,
      title: '日常开机工单处理时长',
      legend: ['时长']
    },
    dataByProv: {
      formatter: 'minute',
      visiable: true,
      title: '各省日常开机工单处理时长',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_04_KSF_02_03_MON: {
    dataByMonth: {
      formatter: 'minute',
      visiable: true,
      title: '日常停机工单处理时长',
      legend: ['时长']
    },
    dataByProv: {
      formatter: 'minute',
      visiable: true,
      title: '各省日常停机工单处理时长',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_04_KSF_02_02_MON: {
    dataByMonth: {
      formatter: 'minute',
      visiable: true,
      title: '业务高峰期开机工单处理时长',
      legend: ['时长']
    },
    dataByProv: {
      formatter: 'minute',
      visiable: true,
      title: '各省业务高峰期开机工单处理时长',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  },
  ZC_04_KSF_02_04_MON: {
    dataByMonth: {
      formatter: 'minute',
      visiable: true,
      title: '业务高峰期停机工单处理时长',
      legend: ['时长']
    },
    dataByProv: {
      formatter: 'minute',
      visiable: true,
      title: '各省业务高峰期停机工单处理时长',
      legend: ['上期', '本期']
    },
    leftRaise: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: true,
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    }
  },
  InterruptOut: {
    dataByMonth: {
      formatter: 'minute',
      visiable: true,
      title: '全网各客服渠道计划外中断时长',
      legend: ['实体厅', '网厅', '短厅', 'IWP']
    },
    dataByProv: {
      formatter: 'minute',
      visiable: true,
      title: '各省公司计划外中断时长',
      legend: ['时长']
    },
    leftRaise: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    }
  },
  InterruptIn: {
    dataByMonth: {
      formatter: 'minute',
      visiable: true,
      title: '全网各客服渠道计划内中断时长',
      legend: ['实体厅', '网厅', '短厅', 'IWP']
    },
    dataByProv: {
      formatter: 'minute',
      visiable: true,
      title: '各省公司计划内中断时长',
      legend: ['时长']
    },
    leftRaise: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightRaise: {
      visiable: false
    },
    leftDrop: {
      visiable: false
      // title: '当期各省实体厅、电子渠道各省业务量排名',
      // legend: ['上期', '本期']
    },
    rightDrop: {
      visiable: false
    },
  }

})
  .constant('httpKey', [{
    url: '/bearer/detaile/bus',
    parseKey: 'BearerBusinessDetail',
    dataSource: [{
      title: '实体营业厅业务受理成功量',
      collectWay: '采集方式：CAPES直采',
      collectFrequency: '采集频率：30min',
      formula: '计算公式：∑（ZC_Sale_001）'
    }, {
      title: '电子渠道业务受理成功量',
      collectWay: '采集方式：CAPES直采',
      collectFrequency: '采集频率：30min',
      formula: '计算公式：∑（ZC_Sale_009+ ZC_Sale_013+ ZC_Sale_015+ ZC_Sale_017+ ZC_Sale_011+ ZC_Sale_033）'
    }]
  }, {
    url: '/bearer/detaile/bill',
    parseKey: 'BillSystemDetail',
    dataSource: [{
      title: '计费系统原始话单量',
      collectWay: '采集方式：CAPES直采',
      collectFrequency: '采集频率：30min',
      formula: '计算公式：∑（ZC_Sale_001）'
    }, {
      title: '计费系统计费话单量',
      collectWay: '采集方式：CAPES直采',
      collectFrequency: '采集频率：30min',
      formula: '计算公式：∑（ZC_CC_014）'
    }, {
      title: '计费系统GPRS话单量',
      collectWay: '采集方式：CAPES直采',
      collectFrequency: '采集频率：30min',
      formula: '计算公式：∑（ZC_CC_014_04）'
    }, {
      title: '计费系统短信话单量',
      collectWay: '采集方式：CAPES直采',
      collectFrequency: '采集频率：30min',
      formula: '计算公式：∑（ZC_CC_014_05）'
    }, {
      title: '计费系统语言话单量',
      collectWay: '采集方式：CAPES直采',
      collectFrequency: '采集频率：30min',
      formula: '计算公式：计费系统计费话单量-计费系统GPRS话单量-计费系统短信话单量-计费系统语言话单量'
    }, {
      title: '计费系统其他话单量',
      collectWay: '采集方式：CAPES直采',
      collectFrequency: '采集频率：30min',
      formula: '计算公式：∑（ZC_CC_014）'
    }]
  }, {
    url: '/bearer/detaile/financial',
    parseKey: 'FinancialDetail',
    dataSource: [{
      title: '用户数',
      collectWay: '采集方式：CAPES直采',
      collectFrequency: '采集频率：30min',
      formula: '计算公式：当期最新一个月的用户数，例如2016年1季度用户数，采用的是2016年3月的直采数据。'
    }, {
      title: '工单总量',
      collectWay: '采集方式：CAPES直采',
      collectFrequency: '采集频率：30min',
      formula: '计算公式：求和'
    }]
  }, {
    url: '/complaint/getDetailCompaintAllSituation/month',
    parseKey: 'ComplaintOverall',
    dataSource: [{
      title: '投诉总量',
      collectWay: '采集方式：一级客服业支详单，仅包括分类归责为支撑的投诉',
      collectFrequency: '',
      formula: '计算公式：按省汇总'
    }]
  }, {
    url: '/complaint/getDetailMainCompaintAll/month',
    parseKey: 'ComplaintPoint',
    dataSource: [{
      title: '焦点投诉',
      collectWay: '采集方式：一级客服业支详单，仅包括分类归责为支撑的投诉',
      collectFrequency: '',
      formula: '计算公式：按照投诉原因分组统计。'
    }]
  }, {
    url: '/complaint/getDetailCompaintReasonAll/month',
    parseKey: 'ComplaintReason',
    dataSource: [{
      title: '责任原因',
      collectWay: '采集方式：一级客服业支详单',
      collectFrequency: '',
      formula: '计算公式：按照责任原因分组统计'
    }]
  }, {
    paramsKey: 'PM_DM_HostStatus',
    url: '/system/detail/all',
    parseKey: 'HostStatus',
    dataSource: [{
      title: '主机系统运行情况',
      collectWay: '采集方式：平台直采',
      collectFrequency: '统计时段：全天',
      formula: ''
    }]
  }, {
    paramsKey: 'PM_DM_DbStatus',
    url: '/system/detail/all',
    parseKey: 'DbStatus',
    dataSource: [{
      title: '数据库系统运行情况',
      collectWay: '采集方式：平台直采',
      collectFrequency: '统计时段：全天',
      formula: ''
    }]
  }, {
    paramsProId: true,
    paramsKey: 'main',
    url: '/detect/echo/mult/detail',
    parseKey: 'MainDetect',
    dataSource: [{
      title: '查询类关键业务繁忙时段可用性',
      collectWay: '采集方式：实体厅探测、网厅流量监测',
      collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
      formula: '计算公式：所有查询类业务平均可用性'
    }]
  }, {
    paramsProId: true,
    paramsKey: 'infoQuery',
    url: '/detect/echo/mult/detail',
    parseKey: 'InfoQueryDetect',
    dataSource: [{
      title: '账单查询',
      collectWay: '采集方式：实体厅探测、网厅流量监测',
      collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
      formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
    }]
  }, {
    paramsProId: true,
    paramsKey: 'infoChange',
    url: '/detect/echo/mult/detail',
    parseKey: 'InfoChangeDetect',
    dataSource: [{
      title: '资料变更',
      collectWay: '采集方式：实体厅探测',
      collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
      formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
    }]
  }, {//12
    paramsProId: true,
    paramsKey: 'sshf',
    url: '/detect/echo/other/detail',
    parseKey: 'RealTimeDetect',
    dataSource: [{
      title: '实时话费查询',
      collectWay: '采集方式：实体厅探测、网厅流量监测',
      collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
      formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
    }]
  }, {//13
    paramsProId: true,
    paramsKey: 'zdcx',
    url: '/detect/echo/other/detail',
    parseKey: 'BillQueryDetect',
    dataSource: [{
      title: '账单查询',
      collectWay: '采集方式：实体厅探测、网厅流量监测',
      collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
      formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
    }]
  }, {//14
    paramsProId: true,
    paramsKey: 'xdcx',
    url: '/detect/echo/other/detail',
    parseKey: 'DetailBillDetect',
    dataSource: [{
      title: '详单查询',
      collectWay: '采集方式：实体厅探测、网厅流量监测',
      collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
      formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
    }]
  }, {//15
    paramsProId: true,
    paramsKey: 'jfyw',
    url: '/detect/echo/other/detail',
    parseKey: 'PaymentDetect',
    dataSource: [{
      title: '缴费业务',
      collectWay: '采集方式：实体厅探测',
      collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
      formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
    }]
  }, {//16
    paramsProId: true,
    paramsKpiName: 'ZC_03_KSF_02_01c_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_03_KSF_02_01c_MON',
    dataSource: [{
      title: '5分钟缴费开机及时率',
      collectWay: '',
      collectFrequency: '统计频率：1小时/次',
      formula: '计算方式：用户缴费而出发的开机业务在5分钟内完成开机的及时率'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_03_KSF_02_01e_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_03_KSF_02_01e_MON',
    dataSource: [{
      title: '10分钟缴费开机延迟率',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1小时/次',
      formula: '计算方式：用户缴费而出发的开机业务在10分钟内完成开机的延迟率'
    }]
  }, {
    paramsKpiName: 'ZC_03_KSF_01_03a_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_03_KSF_01_03a_MON',
    dataSource: [{
      title: '欠费停机前短信提醒成功率',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1小时/次',
      formula: '计算方式：网关接收成功催缴短信数量/BOSS系统生成的催缴短信数量'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_03_KSF_01_13_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_03_KSF_01_13_MON',
    dataSource: [{
      title: 'GPRS流量用尽提醒成功',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：全月网关GRPS套餐流量用尽提醒短信成功发送数量(笔)/GPRS套餐流量用尽的用户数'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_03_KSF_01_08_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_03_KSF_01_08_MON',
    dataSource: [{
      title: '话费汇款到账提醒成功率',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1月/次',
      formula: '计算方式：全月话费到账提醒短信网关返还发送成功量(笔)/应生成话费回馈的提醒短信数量'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_04_KSF_01_01a_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_04_KSF_01_01a_MON',
    dataSource: [{
      title: '充值业务成功率',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1小时/次',
      formula: '计算方式：缴费卡充值业务成功量/(缴费卡充值业务成功量+缴费卡充值业务失败量)'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_04_KSF_01_01b_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_04_KSF_01_01b_MON',
    dataSource: [{
      title: '银行业务成功率',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：银行缴费业务成功量/(银行缴费业务受理成功量+银行缴费业务受理失败量)'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_04_KSF_01_01e_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_04_KSF_01_01e_MON',
    dataSource: [{
      title: 'HLR业务成功率',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：HLR成功执行数量/BOSS向HLR发送工单总量'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_04_KSF_01_01f_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_04_KSF_01_01f_MON',
    dataSource: [{
      title: '客服业务成功率',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：全月客服人工与自助渠道成功完成的业务受理量/全月客服人工与自助渠道总体业务受理量'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_04_KSF_01_01c_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_04_KSF_01_01c_MON',
    dataSource: [{
      title: '短厅业务成功率',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：短信渠道业务受理成功量/(短信渠道业务受理成功量+短信渠道业务受理失败量)'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_04_KSF_01_01d_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_04_KSF_01_01d_MON',
    dataSource: [{
      title: '网厅业务成功率',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：网上营业厅业务受理成功量/(网上营业厅业务受理成功量+网上营业厅业务受理失败量)'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'MO_04_KSF_02_08_01_MON',
    url: '/opreation/detail',
    parseKey: 'MO_04_KSF_02_08_01_MON',
    dataSource: [{
      title: '话单计费处理平均时长',
      collectWay: '采集方式:CAPES上报',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：∑（清单入库完成时间-采集到话单时间）/总话单量'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_04_KSF_02_01_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_04_KSF_02_01_MON',
    dataSource: [{
      title: '日常开机工单处理时长',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：∑（除当月开机工单量最大一天的日开机成功工单平均处理时间）/(当月天数-1)'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_04_KSF_02_03_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_04_KSF_02_03_MON',
    dataSource: [{
      title: '日常停机工单处理时长',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：∑（除当月停机工单量最大一天的日停机成功工单平均处理时间）/(当月天数-1)'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_04_KSF_02_02_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_04_KSF_02_02_MON',
    dataSource: [{
      title: '业务高峰期开机工单处理时长',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：∑（当月开机工单量最大一天的日开机成功工单平均处理时间）/(当月天数-1)'
    }]
  }, {
    paramsProId: true,
    paramsKpiName: 'ZC_04_KSF_02_04_MON',
    url: '/opreation/detail',
    parseKey: 'ZC_04_KSF_02_04_MON',
    dataSource: [{
      title: '业务高峰期停机工单处理时长',
      collectWay: '采集方式:CAPES直采',
      collectFrequency: '统计频率：1天/次',
      formula: '计算方式：∑（当月停机工单量最大一天的日开机成功工单平均处理时间）/(当月天数-1)'
    }]
  }, {//32
    url: '/interrupt/in/detail/all',
    parseKey: 'InterruptIn',
    dataSource: [{
      title: '计划内中断',
      collectWay: '省公司上报集团变更和省公司月报上报的计划内中断都作为计划内中断。因两者存在重复上报的可能，故针对两者计划中断区间重叠时，取省公司月报中的计划内中断。省公司上报集团变更未区分渠道，此部分的渠道暂写做“其他”。通报中只统计8:00-22:00范围内的计划内中断。',
      collectFrequency: '',
      formula: ''
    }]
  }, {
    url: '/interrupt/out/detail/all',
    parseKey: 'InterruptOut',
    dataSource: [{
      title: '计划外中断',
      collectWay: '取实体厅主探测、网厅流量探测、其他电子渠道探测的协查单。协查单类型剔除计划内中断类型（网厅、短厅不统计省内变更、主动维护类）；协查单等级剔除“高”以外的部分；协查单时间剔除8:00-22：59时间段以外的影响时长；协查单中断起止时间剔除计划内中断中同省、同中断原因、同渠道、同时间段部分；剩余协查单的剩余影响时长作为可能中断区间。通过可能中断区间前一段时间的CAPES直采变量中各渠道业务成功量，预测出可能中断区间的业务量，对比预测业务量与直采实际业务量，如果实际业务量低于预测业务量50%以上，则认为该采集时刻前30分钟业务中断。',
      collectFrequency: '',
      formula: ''
    }]
  }, {
    url: '/complaint/getDetailUserComplaintTimeAll/month',
    parseKey: 'ComplaintTimeAll'
  }, {
    url: '/complaint/getDetailUserComplaintRecallAll/month',
    parseKey: 'ComplaintRecallAll'
  },//用户感知响应时长
    {
      paramsProId: true,
      paramsKey: 'infoQuery',
      url: '/detect/echo/mult/detail',
      parseKey: 'InfoQuerydetect',
      isCap: 1,
      dataSource: [{
        title: '账单查询',
        collectWay: '采集方式：实体厅探测、网厅流量监测',
        collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
        formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
      }]
    }, {
      paramsProId: true,
      paramsKey: 'infoChange',
      url: '/detect/echo/mult/detail',
      parseKey: 'InfoChangedetect',
      isCap: 1,
      dataSource: [{
        title: '资料变更',
        collectWay: '采集方式：实体厅探测',
        collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
        formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
      }]
    }, {//12
      paramsProId: true,
      paramsKey: 'sshf',
      url: '/detect/echo/other/detail',
      parseKey: 'RealTimedetect',
      isCap: 1,
      dataSource: [{
        title: '实时话费查询',
        collectWay: '采集方式：实体厅探测、网厅流量监测',
        collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
        formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
      }]
    }, {//13
      paramsProId: true,
      paramsKey: 'zdcx',
      url: '/detect/echo/other/detail',
      parseKey: 'BillQuerydetect',
      isCap: 1,
      dataSource: [{
        title: '账单查询',
        collectWay: '采集方式：实体厅探测、网厅流量监测',
        collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
        formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
      }]
    }, {//14
      paramsProId: true,
      paramsKey: 'xdcx',
      url: '/detect/echo/other/detail',
      parseKey: 'DetailBilldetect',
      isCap: 1,
      dataSource: [{
        title: '详单查询',
        collectWay: '采集方式：实体厅探测、网厅流量监测',
        collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
        formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
      }]
    }, {//15
      paramsProId: true,
      paramsKey: 'jfyw',
      url: '/detect/echo/other/detail',
      parseKey: 'Paymentdetect',
      isCap: 1,
      dataSource: [{
        title: '缴费业务',
        collectWay: '采集方式：实体厅探测',
        collectFrequency: '统计时段：8:00-22:00 15分钟一轮',
        formula: '响应时长：探测响应时长的算数平均值（小于0.01秒的均显示为0.01秒）'
      }]
    }, {//16
      paramsProId: true,
      paramsKpiName: 'ZC_03_KSF_02_01c_MON',
      url: '/opreation/detail',
      parseKey: 'ZC_03_KSF_02_01c_MON',
      dataSource: [{
        title: '5分钟缴费开机及时率',
        collectWay: '',
        collectFrequency: '统计频率：1小时/次',
        formula: '计算方式：用户缴费而出发的开机业务在5分钟内完成开机的及时率'
      }]
    }
  ])
  .constant('DetailTitleKey', {
    ZC_03_KSF_02_01c_MON: '5分钟缴费开机及时率',
    ZC_03_KSF_02_01e_MON: '10分钟缴费开机延迟率',
    ZC_03_KSF_01_03a_MON: '欠费停机前短信提醒成功率',
    ZC_03_KSF_01_13_MON: 'GPRS流量用尽提醒成功率',
    ZC_03_KSF_01_08_MON: '话费汇款到账提醒成功率',
    ZC_04_KSF_01_01a_MON: '充值业务成功率',
    ZC_04_KSF_01_01b_MON: '银行业务成功率',
    ZC_04_KSF_01_01f_MON: '客服业务成功率',
    ZC_04_KSF_01_01e_MON: 'HLR业务成功率',
    ZC_04_KSF_01_01c_MON: '短厅业务成功率',
    ZC_04_KSF_01_01d_MON: '网厅业务成功率',
    MO_04_KSF_02_08_01_MON: '话单计费处理平均时长',
    ZC_04_KSF_02_01_MON: '日常开机工单处理时长',
    ZC_04_KSF_02_03_MON: '日常停机工单处理时长',
    ZC_04_KSF_02_02_MON: '业务高峰期开机工单处理时长',
    ZC_04_KSF_02_04_MON: '业务高峰期停机工单处理时长',
    MainDetect: '关键业务可用性',
    InfoQueryDetect: '资料查询可用性',
    InfoChangeDetect: '资料变更可用性',
    RealTimeDetect: '实时话费查询可用性',
    BillQueryDetect: '账单查询可用性',
    DetailBillDetect: '详单查询可用性',
    PaymentDetect: '缴费业务可用性',
    InfoQuerydetect: '资料查询响应时长',
    InfoChangedetect: '资料变更响应时长',
    RealTimedetect: '实时话费查询响应时长',
    BillQuerydetect: '账单查询响应时长',
    DetailBilldetect: '详单查询响应时长',
    Paymentdetect: '缴费业务响应时长',
    CostComplaint: '',
    FourGComplaint: '',
    GPRSComplaint: ''
  })
  .constant('echartsColor', {
    pie: ['#9ddbbb', '#a9a9ce', '#3c80c4', '#f2c854', '#fc6e0f'],
    stick: ['#047ff9', '#f23590', '#c4f791', '#e58787', '#5f5f5f', '#047ff9', '#4bb43c', '#74f774'],
    raise:['#047ff9','#13db13'],
    drop:['#047ff9','#f23590']
  })
  .constant('detailHttpKey',{
    CostComplaint:{
      routes:[{
        requestCodeName:'COMPLAINT_COST_DETAIL',
        route:'/point/cost/dept/by/class?date='
      },{
        requestCodeName:'COMPLAINT_COSTBYDEPT_DETAIL',
        route:'/point/cost/dept/by/dept?date='
      },{
        requestCodeName:'COMPLAINT_COSTBYDEPTSOURCE_DETAIL',
        route:'/point/cost/dept/by/source?date='
      },{
        requestCodeName:'COMPLAINT_COSTBYUSER_DETAIL',
        route:'/point/cost/dept/by/user?date='
      },{
        requestCodeName:'COMPLAINT_COSTBYREASON_DETAIL',
        route:'/point/cost/dept/by/reason?date='
      }]
    },
    fourGComplaint:{
      routes:[{
        requestCodeName:'COMPLAINT_4G_DETAIL',
        route:'/point/4g/dept/by/class?date='
      },{
        requestCodeName:'COMPLAINT_4GBYDEPT_DETAIL',
        route:'/point/4g/dept/by/dept?date='
      },{
        requestCodeName:'COMPLAINT_4GBYDEPTSOURCE_DETAIL',
        route:'/point/4g/dept/by/source?date='
      },{
        requestCodeName:'COMPLAINT_4GBYUSER_DETAIL',
        route:'/point/4g/dept/by/user?date='
      },{
        requestCodeName:'COMPLAINT_4GBYREASON_DETAIL',
        route:'/point/4g/dept/by/reason?date='
      }]
    },
    GPRSComplaint:{
      routes:[{
        requestCodeName:'COMPLAINT_GPRS_DETAIL',
        route:'/point/flow/dept/by/class?date='
      },{
        requestCodeName:'COMPLAINT_GPRSBYDEPT_DETAIL',
        route:'/point/flow/dept/by/dept?date='
      },{
        requestCodeName:'COMPLAINT_GPRSBYDEPTSOURCE_DETAIL',
        route:'/point/flow/dept/by/source?date='
      },{
        requestCodeName:'COMPLAINT_GPRSBYUSER_DETAIL',
        route:'/point/flow/dept/by/user?date='
      },{
        requestCodeName:'COMPLAINT_GPRSBYREASON_DETAIL',
        route:'/point/flow/dept/by/reason?date='
      }]
    }
  })
