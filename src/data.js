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
