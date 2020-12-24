export const treeData = [
  {
    title: 'parent 1',
    expand: false,
    id: '001',
    pid: '0',
    isLeaf: false,
    children: [
      {
        title: 'parent 1-1',
        expand: false,
        pid: '001',
        id: '00101',
        isLeaf: false,
        children: [
          {
            title: 'leaf 1-1-1',
            pid: '00101',
            id: '0010101',
            isLeaf: true,
            selected: true
          },
          {
            pid: '00101',
            id: '0010102',
            title: 'leaf 1-1-2',
            isLeaf: true
          }
        ]
      },
      {
        title: 'parent 1-2',
        expand: false,
        pid: '001',
        id: '00102',
        isLeaf: false,
        children: [
          {
            title: 'leaf 1-2-1',
            pid: '00102',
            id: '0010201',
            isLeaf: true,
          },
          {
            title: 'leaf 1-2-2',
            pid: '00102',
            id: '0010202',
            isLeaf: true,
          }
        ]
      }
    ]
  },
  {
    title: 'parent 2',
    expand: false,
    id: '002',
    pid: '0',
    isLeaf: false,
    children: [
      {
        title: 'parent 2-1',
        expand: false,
        pid: '002',
        id: '00201',
        isLeaf: false,
        children: [
          {
            title: 'leaf 2-1-1',
            pid: '00201',
            isLeaf: true,
            id: '0020101'
          },
          {
            pid: '00201',
            id: '0020102',
            isLeaf: true,
            title: 'leaf 2-1-2'
          }
        ]
      },
      {
        title: 'parent 2-2',
        expand: false,
        pid: '002',
        id: '00202',
        isLeaf: false,
        children: [
          {
            title: 'leaf 2-2-1',
            pid: '00202',
            id: '0020201',
            isLeaf: true,
          },
          {
            title: 'leaf 2-2-2',
            pid: '00202',
            id: '0020202',
            isLeaf: false,
          }
        ]
      }
    ]
  }
];
