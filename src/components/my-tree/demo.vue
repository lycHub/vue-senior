<template>
  <div>
    <my-tree
      :source="data4"
      @select="onSelect"
      @expand-change="expandChange">
      <template #title0010102>
        <h1>Here might be a page title</h1>
      </template>
    </my-tree>
  </div>
</template>
<script>
  import MyTree from './my-tree';
  export default {
    components: { MyTree },
    name: 'TreeDemo',
    data() {
      return {
        data4: [
          {
            title: 'parent 1',
            expand: true,
            id: '001',
            pid: '0',
            children: [
              {
                title: 'parent 1-1',
                expand: true,
                pid: '001',
                id: '00101',
                render: this.renderSingle,
                children: [
                  {
                    title: 'leaf 1-1-1',
                    pid: '00101',
                    id: '0010101',
                    selected: true
                  },
                  {
                    pid: '00101',
                    id: '0010102',
                    title: 'leaf 1-1-2',
                    slot: 'title0010102'
                  }
                ]
              },
              {
                title: 'parent 1-2',
                expand: true,
                pid: '001',
                id: '00102',
                children: [
                  {
                    title: 'leaf 1-2-1',
                    pid: '00102',
                    id: '0010201',
                  },
                  {
                    title: 'leaf 1-2-2',
                    pid: '00102',
                    id: '0010202',
                  }
                ]
              }
            ]
          },
          {
            title: 'parent 2',
            expand: true,
            id: '002',
            pid: '0',
            children: [
              {
                title: 'parent 2-1',
                expand: true,
                pid: '002',
                id: '00201',
                children: [
                  {
                    title: 'leaf 2-1-1',
                    pid: '00201',
                    id: '0020101'
                  },
                  {
                    pid: '00201',
                    id: '0020102',
                    title: 'leaf 2-1-2'
                  }
                ]
              },
              {
                title: 'parent 2-2',
                expand: true,
                pid: '002',
                id: '00202',
                children: [
                  {
                    title: 'leaf 2-2-1',
                    pid: '00202',
                    id: '0020201',
                  },
                  {
                    title: 'leaf 2-2-2',
                    pid: '00202',
                    id: '0020202',
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {
      renderContent (h, node) {
        return (
          <b style="color: #f60;">{ node.title }</b>
        );
      },
      renderSingle (h, node) {
        return (
          <b style="color: green;">{ node.title }</b>
        );
      },
      onSelect(curArr) {
        console.log('onSelect', curArr);
      },

      expandChange(node) {
        console.log('expandChange', node);
      }
    }
  }
</script>
