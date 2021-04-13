export const treeData = [
  {
    name: 'parent 1',
    expand: true,
    id: '001',
    pid: '0',
    isLeaf: false,
    children: [
      {
        name: 'parent 1-1',
        expand: true,
        checked: true,
        pid: '001',
        id: '00101',
        isLeaf: false,
        children: [
          {
            name: 'leaf 1-1-1',
            pid: '00101',
            id: '0010101',
            isLeaf: true,
            selected: true
          },
          {
            pid: '00101',
            id: '0010102',
            name: 'leaf 1-1-2',
            isLeaf: true
          }
        ]
      },
      {
        name: 'parent 1-2',
        expand: false,
        pid: '001',
        id: '00102',
        isLeaf: false,
        children: [
          {
            name: 'leaf 1-2-1',
            pid: '00102',
            id: '0010201',
            isLeaf: true,
          },
          {
            name: 'leaf 1-2-2',
            pid: '00102',
            id: '0010202',
            isLeaf: true,
          }
        ]
      }
    ]
  },
  {
    name: 'parent 2',
    expand: false,
    checked: true,
    id: '002',
    pid: '0',
    isLeaf: false,
    children: [
      {
        name: 'parent 2-1',
        expand: false,
        pid: '002',
        id: '00201',
        isLeaf: false,
        children: [
          {
            name: 'leaf 2-1-1',
            pid: '00201',
            isLeaf: true,
            id: '0020101'
          },
          {
            pid: '00201',
            id: '0020102',
            isLeaf: true,
            name: 'leaf 2-1-2'
          }
        ]
      },
      {
        name: 'parent 2-2',
        expand: false,
        pid: '002',
        id: '00202',
        isLeaf: false,
        children: [
          {
            name: 'leaf 2-2-1',
            pid: '00202',
            id: '0020201',
            isLeaf: false,
          },
          {
            name: 'leaf 2-2-2',
            pid: '00202',
            id: '0020202',
            isLeaf: false,
          }
        ]
      }
    ]
  }
];
export const singlePicker = [
  {
    value: 'a0',
    label: '东城区'
  },
  {
    value: 'a1',
    label: '西城区'
  },
  {
    value: 'a2',
    label: '崇文区'
  },
  {
    value: 'a3',
    label: '宣武区'
  },
  {
    value: 'a4',
    label: '朝阳区'
  },
  {
    value: 'a5',
    label: '丰台区'
  },
  {
    value: 'a6',
    label: '石景山区'
  },
  {
    value: 'a7',
    label: '海淀区'
  },
  {
    value: 'a8',
    label: '门头沟区'
  },
  {
    value: 'a9',
    label: '房山区'
  },
  {
    value: 'a10',
    label: '通州区'
  },
  {
    value: 'a11',
    label: '顺义区'
  },
  {
    value: 'a12',
    label: '昌平区'
  },
  {
    value: 'a13',
    label: '大兴区'
  },
  {
    value: 'a14',
    label: '平谷区'
  },
  {
    value: 'a15',
    label: '怀柔区'
  },
  {
    value: 'a16',
    label:  '密云县'
  },
  {
    value: 'a17',
    label: '延庆县'
  }
];
