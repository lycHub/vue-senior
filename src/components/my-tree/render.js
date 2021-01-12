export default {
    name: 'TreeRender',
    functional: true,
    props: {
      render: Function,
      node: Object,
      vNode: Object
    },
    render: (h, ctx) => {
      // console.log('vNode', ctx.props.vNode);
      const { vNode, render } = ctx.props;
      if (render) {
        return render(h, ctx.props.node);
      }
      return vNode;
    }
};
