import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import { VNode } from 'vue/types'
import EscMask from '../../mask-layer/index.vue'
import context from './context'

interface layerVNode extends VNode{
  visible: boolean,
  $el: Node
}

let layerInstance: layerVNode
const layerInstanceInit = (): void => {
  const MaskConstructor = Vue.extend(EscMask)
  layerInstance = new MaskConstructor({
    el: document.createElement('div')
  })
}

@Component
export default class Popup extends Vue {
  show: boolean = false

  containerElement: Node = document.body

  @Prop() readonly container!: string

  @Watch('container')
  onContainerChange(): void {
    this.initContainer()
    this.open()
  }

  @Watch('show')
  onVisibleChange(val: boolean): void {
    if (val) {
      this.open()
    }
  }

  mounted() {
    if (this.show) {
    }
  }

  initContainer() {
    if (this.container) {
      this.containerElement = document.querySelector(this.container) || document.body
    }
  }

  open() {
    this.showLayer()
    // @ts-ignore
    this.$el.style.zIndex = context.index++
    this.containerElement.appendChild(this.$el)
  }

  close() {
    this.show = false
    layerInstance.visible = false
  }

  showLayer() {
    if (!layerInstance) {
      layerInstanceInit()
    }
    Object.assign(layerInstance, {
      zIndex: context.index++,
      visible: true
    })
    this.containerElement.appendChild(layerInstance.$el)
  }
}
