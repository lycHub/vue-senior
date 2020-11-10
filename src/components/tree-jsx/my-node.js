// import CollapseTransition from '../../../src/components/base/collapse-transition';
import TreeRender from './render';
export default {
  name: 'MyNode',
  inject: ['myTree'],
  components: { TreeRender },
  props: {
    node: {
      type: Object,
      default () {
        return {};
      }
    },
    slotNodes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasChildren () {
      return this.node.children && this.node.children.length;
    },
    showNode () {
      return this.hasChildren && this.node.expand;
    },
    trueRender () {
      // console.log('myTree rr', this.myTree.render);
      return this.node.render || this.myTree.renderFunc;
    },
    vNode () {
      return this.slotNodes.find(item => item.id === this.node.id);
    }
  },
  methods: {
    handleSelect () {
      this.myTree.addSelected(this.node);
    },
    handleExpand () {
      this.myTree.handleExpand(this.node);
    }
  },
  created () {
    if (this.node.selected) {
      this.myTree.addSelected(this.node, true);
    }
  },
  render (h) {
    const { selected, expand, title, children } = this.node;
    const nodeCls = selected ? 'my-tree-node node-selected' : 'my-tree-node';
    const iconCls = expand ? 'my-tree-arrow expand' : 'my-tree-arrow';
    const myNodes = (children || []).map(item => {
      return <my-node node={ item } slotNodes={ this.slotNodes }></my-node>;
    });
    let titleContent = <span>{ title }</span>;
    if (this.vNode) {
      titleContent = <tree-render slot-node={ this.vNode.slotVNode } node={ this.node }></tree-render>;
      // titleContent = <span>vnode</span>;
    }
    if (this.trueRender) {
      titleContent = <tree-render render={ this.trueRender } node={ this.node }></tree-render>;
    }
    return (
      <div class="my-tree-children">
        <div class={ nodeCls }>
          { this.hasChildren ? <i class={ iconCls } onClick={ this.handleExpand.bind(this) }>&gt;</i> : '' }
          <span class="my-tree-title" onClick={ this.handleSelect.bind(this) }>
            { titleContent }
          </span>
        </div>
        { expand ? myNodes : '' }
      </div>
    );
  }
}
