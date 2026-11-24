// 消费者端 Mock 数据

export const NOTICE_CONTENT = {
  title: '平台公告',
  sections: [
    {
      title: '公文通知',
      content: '根据《天津市金融消费纠纷调解工作指引》要求，天津众和金融消保平台自2025年1月起全面启用线上调解服务。消费者可通过本平台查询调解进度、确认调解意愿并在线签署调解协议。'
    },
    {
      title: '收费标准',
      content: '本平台调解服务不向消费者收取任何费用。调解过程中产生的文书制作、电子签章等费用由参与调解的金融机构承担。如涉及第三方鉴定费用，按照"谁申请、谁承担"原则执行。'
    },
    {
      title: '服务承诺',
      content: '工作日受理投诉后3个工作日内完成初步审核；一般调解案件自受理之日起30个工作日内办结。复杂案件经双方同意可延长不超过15个工作日。'
    }
  ]
}

export const DEPT_TYPE = {
  area: "0", // 地区
  center: "1", // 中心
  centerDept: "2", // 内部管理机构
  bank1: "bank1", // 银行机构 / 天津法人银行
  bank2: "bank2", // 银行机构 / 民营银行
  bank3: "bank4", // 银行机构 / 政策性银行
  bank4: "bank4", // 银行机构 / 国有商业银行
  bank5: "bank5", // 银行机构 / 股份制商业银行
  bank6: "bank6", // 银行机构 / 城市商业银行
  bank7: "bank7", // 银行机构 / 金融资产管理公司
  bank8: "bank8", // 银行机构 / 信托公司
  bank9: "bank9", // 银行机构 / 住房储蓄银行
  bank10: "bank10", // 银行机构 / 村镇银行
  bank11: "bank11", // 银行机构 / 工行票据、财务公司
  bank12: "bank12", // 银行机构 / 外商独资法人银行
  bank13: "bank13", // 银行机构 / 外商独资银行天津分行
  bank14: "bank14", // 银行机构 / 中外合资银行
  nonBank1: "nonBank1", // 非银机构 / 华宝押运
  nonBank2: "nonBank2", // 非银机构 / 金融公司
  insurance1: "insurance1", // 保险机构 / 财产险
  insurance2: "insurance2", // 保险机构 / 人身险
  bankList: ["bank1", "bank2", "bank3", "bank4", "bank5", "bank6", "bank7", "bank8", "bank9", "bank10", "bank11", "bank12", "bank13", "bank14"],
  nonBankList: ["nonBank1", "nonBank2"],
  insuranceList: ["insurance1", "insurance2"],
};

// export const WORK_ORDER_STATUS = {
//   // pending: '待受理',
//   // processing: '调解中',
//   // confirmed: '已确认',
//   // signed: '已签署',
//   // closed: '已结案',
//   // rejected: '不予受理'
//   pending: '待受理',
//   processing: '调解中',
//   confirmed: '已确认',
//   signed: '已签署',
//   closed: '已结案',
//   rejected: '不予受理'
// }

export const STATUS_COLOR = {
  pending: '#FF9500',
  processing: '#007FFF',
  confirmed: '#5856D6',
  signed: '#34C759',
  closed: '#8E8E93',
  rejected: '#FF3B30'
}

// const PROGRESS_TEMPLATES = {
//   pending: [
//     { title: '提交投诉', desc: '消费者提交金融消费纠纷投诉', time: '2025-03-10 09:30', done: true },
//     { title: '受理审核', desc: '平台正在审核投诉材料', time: '', done: false },
//     { title: '调解协商', desc: '安排调解员与双方沟通', time: '', done: false },
//     { title: '签署协议', desc: '双方确认并签署调解协议', time: '', done: false },
//     { title: '结案归档', desc: '调解完成，案件归档', time: '', done: false }
//   ],
//   processing: [
//     { title: '提交投诉', desc: '消费者提交金融消费纠纷投诉', time: '2025-02-15 14:20', done: true },
//     { title: '受理审核', desc: '投诉材料审核通过，已分配调解员', time: '2025-02-16 10:00', done: true },
//     { title: '调解协商', desc: '调解员正在组织双方协商', time: '2025-02-20 15:30', done: true },
//     { title: '签署协议', desc: '待双方确认调解方案', time: '', done: false },
//     { title: '结案归档', desc: '调解完成，案件归档', time: '', done: false }
//   ],
//   confirmed: [
//     { title: '提交投诉', desc: '消费者提交金融消费纠纷投诉', time: '2025-01-08 11:15', done: true },
//     { title: '受理审核', desc: '投诉材料审核通过', time: '2025-01-09 09:00', done: true },
//     { title: '调解协商', desc: '双方就调解方案达成一致', time: '2025-01-15 16:00', done: true },
//     { title: '调解意愿确认', desc: '消费者已确认调解意愿', time: '2025-01-18 10:30', done: true },
//     { title: '签署协议', desc: '待签署调解协议书', time: '', done: false },
//     { title: '结案归档', desc: '调解完成，案件归档', time: '', done: false }
//   ],
//   signed: [
//     { title: '提交投诉', desc: '消费者提交金融消费纠纷投诉', time: '2024-12-05 08:45', done: true },
//     { title: '受理审核', desc: '投诉材料审核通过', time: '2024-12-06 09:30', done: true },
//     { title: '调解协商', desc: '双方就调解方案达成一致', time: '2024-12-12 14:00', done: true },
//     { title: '调解意愿确认', desc: '消费者已确认调解意愿', time: '2024-12-14 11:00', done: true },
//     { title: '签署协议', desc: '双方已签署调解协议书', time: '2024-12-16 15:20', done: true },
//     { title: '结案归档', desc: '调解完成，案件归档', time: '2024-12-18 09:00', done: true }
//   ],
//   closed: [
//     { title: '提交投诉', desc: '消费者提交金融消费纠纷投诉', time: '2024-11-01 10:00', done: true },
//     { title: '受理审核', desc: '投诉材料审核通过', time: '2024-11-02 09:00', done: true },
//     { title: '调解协商', desc: '调解协商完成', time: '2024-11-10 14:00', done: true },
//     { title: '签署协议', desc: '双方已签署调解协议书', time: '2024-11-12 16:00', done: true },
//     { title: '结案归档', desc: '案件已归档', time: '2024-11-15 10:00', done: true }
//   ],
//   rejected: [
//     { title: '提交投诉', desc: '消费者提交金融消费纠纷投诉', time: '2025-03-01 16:00', done: true },
//     { title: '不予受理', desc: '投诉事项不属于本平台调解范围', time: '2025-03-02 10:00', done: true }
//   ]
// }

// export const MOCK_WORK_ORDERS = [
//   {
//     workOrderId: 'TJ20250310001',
//     title: '信用卡分期手续费争议',
//     deptName: '天津某商业银行',
//     status: 'processing',
//     disputeDate: '2025-02-15 14:20:00',
//     mediatorName: '苏明华'
//   },
//   {
//     workOrderId: 'TJ20250108002',
//     title: '理财产品收益纠纷',
//     deptName: '天津某证券公司',
//     status: 'confirmed',
//     disputeDate: '2025-01-08 11:15:00',
//     mediatorName: '孙建国'
//   },
//   {
//     workOrderId: 'TJ20241205003',
//     title: '贷款提前还款违约金争议',
//     deptName: '天津某农村商业银行',
//     status: 'signed',
//     disputeDate: '2024-12-05 08:45:00',
//     mediatorName: '尤文静',
//     signedAt: '2024-12-16 15:20:00'
//   },
//   {
//     workOrderId: 'TJ20241101004',
//     title: '保险理赔金额争议',
//     deptName: '天津某人寿保险公司',
//     status: 'closed',
//     disputeDate: '2024-11-01 10:00:00',
//     mediatorName: '刘志强'
//   },
//   {
//     workOrderId: 'TJ20250301005',
//     title: '网贷利率争议',
//     deptName: '天津某消费金融公司',
//     status: 'pending',
//     disputeDate: '2025-03-10 09:30:00',
//     mediatorName: ''
//   },
//   {
//     workOrderId: 'TJ20250302006',
//     title: '银行卡盗刷赔偿争议',
//     deptName: '天津某城市商业银行',
//     status: 'rejected',
//     disputeDate: '2025-03-01 16:00:00',
//     mediatorName: ''
//   }
// ]

export function validateIdCard(idCard) {
  if (!idCard) return false
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)
}

// export function getWorkOrdersByIdCard(idCard) {
//   if (!validateIdCard(idCard)) return []
//   return [...MOCK_WORK_ORDERS]
// }

// export function getWorkOrderById(id) {
//   const order = MOCK_WORK_ORDERS.find(item => item.workOrderId === id)
//   if (!order) return null
//   return {
//     ...order,
//     statusLabel: WORK_ORDER_STATUS[order.status],
//     progress: PROGRESS_TEMPLATES[order.status] || PROGRESS_TEMPLATES.pending
//   }
// }

export const MOCK_MEDIATORS = [
  { id: 1, name: '苏明华', caseCount: 12, rating: 3.5, avatar: '' },
  { id: 2, name: '孙建国', caseCount: 32, rating: 1.5, avatar: '' },
  { id: 3, name: '尤文静', caseCount: 25, rating: 3, avatar: '' },
  { id: 4, name: '刘志强', caseCount: 29, rating: 4.5, avatar: '' },
  { id: 5, name: '王海燕', caseCount: 12, rating: 1.5, avatar: '' },
  { id: 6, name: '梁伟民', caseCount: 18, rating: 1.5, avatar: '' }
]

export const MOCK_REGULATIONS = [
  {
    id: 1,
    title: '中华人民共和国消费者权益保护法',
    category: '法律',
    date: '2014-03-15',
    summary: '保护消费者的合法权益，维护社会经济秩序，促进社会主义市场经济健康发展。'
  },
  {
    id: 2,
    title: '中国人民银行金融消费者权益保护实施办法',
    category: '部门规章',
    date: '2020-11-01',
    summary: '规范金融机构提供金融产品和服务的行为，保护金融消费者合法权益。'
  },
  {
    id: 3,
    title: '银行业保险业消费投诉处理管理办法',
    category: '部门规章',
    date: '2020-01-01',
    summary: '规范银行业保险业消费投诉处理工作，保护消费者合法权益。'
  },
  {
    id: 4,
    title: '天津市金融消费纠纷调解工作指引',
    category: '地方规范',
    date: '2023-06-01',
    summary: '明确天津市金融消费纠纷调解的组织形式、调解程序和工作要求。'
  },
  {
    id: 5,
    title: '最高人民法院关于审理银行卡民事纠纷案件若干问题的规定',
    category: '司法解释',
    date: '2021-05-24',
    summary: '正确审理银行卡民事纠纷案件，保护当事人合法权益，促进银行卡市场健康发展。'
  },
  {
    id: 6,
    title: '金融纠纷调解中心调解规则',
    category: '行业规范',
    date: '2022-01-01',
    summary: '规范金融纠纷调解中心的调解活动，保障调解的公正、高效进行。'
  }
]
