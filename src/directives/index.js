import Vue from 'vue'
import Intersect from './intersect'

const directives = [Intersect]

directives.forEach(({ name, directive }) => {
  Vue.directive(name, directive)
})
