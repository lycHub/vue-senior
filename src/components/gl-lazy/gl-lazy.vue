<template>
<!--  v-intersect.quiet  -->
    <div class="gl-lazy" v-intersect="onIntersect">
        <transition :name="transit ? 'fade' : ''">
            <template v-if="isVisible">
                <slot></slot>
            </template>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'GlLazy',
        props: {
          transit: Boolean
        },
        data() {
          return {
              isVisible: false
          }
        },
        methods: {
            onIntersect({ isVisible }) {
                if (!this.isVisible) {
                    this.isVisible = isVisible
                }
            }
        }
    }
</script>
