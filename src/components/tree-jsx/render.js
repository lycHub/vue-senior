export default {
    name: 'TreeRender',
    functional: true,
    props: {
      render: Function,
      node: Object,
      slotNode: Object
    },
    render: (h, ctx) => {
      console.log('slotNode', ctx.props.slotNode, ctx.props.node.title);
      const { slotNode, render } = ctx.props;
      if (render) {
        return render(h, ctx.props.node);
      }
      return slotNode;
    }
};
