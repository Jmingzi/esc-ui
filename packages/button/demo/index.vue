<template>
  <demo-wrap
    class="demo-button"
    name="button"
  >
    <div>
      <p>按钮尺寸</p>
      <esc-button url="/">
        普通按钮
      </esc-button>
      <esc-button
        text="小号按钮"
        size="small"
      />
      <esc-button
        text="迷你按钮"
        size="mini"
      />
      <esc-button
        text="大号按钮"
        size="large"
      />
    </div>
    <div>
      <p>按钮颜色</p>
      <esc-button
        text="default按钮"
      />
      <esc-button
        type="primary"
        text="primary按钮"
      />
    </div>
    <div>
      <p>圆形按钮</p>
      <esc-button
        text="全圆角按钮"
        round
      />
      <esc-button
        text="按钮"
        size="mini"
        round
      />
    </div>
    <div>
      <p>方形按钮</p>
      <esc-button
        text="全圆角按钮"
        square
      />
    </div>
    <div>
      <p>镂空按钮</p>
      <esc-button
        type="primary"
        text="镂空按钮"
        square
        plain
      />
      <esc-button
        type="primary"
        text="镂空按钮"
        size="small"
        plain
      />
    </div>
    <div>
      <p>自定义按钮</p>
      <esc-button
        text="定制色值"
        color="red"
        square
        plain
      />
      <esc-button
        text="定制色值"
        color="red"
      />
      <esc-button
        text="定制圆角"
        color="red"
        :radius="10"
      />
    </div>
    <div>
      <p>按钮状态</p>
      <esc-button
        type="primary"
        text="禁用按钮"
        disabled
      />
      <esc-button
        type="primary"
        text="灰色 - 禁用按钮"
        disabled-gray
      />
      <esc-button
        type="primary"
        loading-text="加载按钮"
        loading
      />
      <esc-button
        loading
        color="red"
      />
      <esc-button
        size="small"
        loading-text="加载按钮"
        loading
      />
    </div>
    <div>
      <p>块级按钮</p>
      <esc-button
        text="块级按钮"
        size="large"
        block
      />
    </div>
  </demo-wrap>
</template>

<script>
import EscButton from '../'
import '../index.styl'
import '../../loading/index.styl'
import DemoWrap from '@/components/DemoWrap.vue'

export default {
  name: 'Index',

  components: {
    EscButton,
    DemoWrap
  }
}
</script>

<style lang="stylus">
.demo-button
  .esc-button
    margin-right 10px
</style>
