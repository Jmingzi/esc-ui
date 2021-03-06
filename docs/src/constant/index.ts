import Dialog from '@@/dialog/README.md'
import Button from '@@/button/README.md'
import Loading from '@@/loading/README.md'
import Popup from '@@/popup/README.md'
import Field from '@@/field/README.md'
import Photo from '@@/photo/README.md'
import InfiniteScroll from '@@/infinite-scroll/README.md'
import Sentry from '@@/sentry/README.md'
import Dot from '@@/dot/README.md'
import Http from '@@/http/README.md'
import Bem from '@@/bem/README.md'
import SaasUtils from '@@/saas-utils/README.md'
import SlideDelete from '@@/slide-delete/README.md'
import Toast from '@@/toast/README.md'
import TabNav from '@@/tab-nav/README.md'
import ContentCard from '@@/content-card/README.md'
import Empty from '@@/empty/README.md'
import Skeleton from '@@/skeleton/README.md'
import PageButton from '@@/page-button/README.md'
import CitySelect from '@@/city-select/README.md'
import Tag from '@@/tag/README.md'
import Avatar from '@@/avatar/README.md'
/* inject import */

export interface PackageItem {
  title: string
  name: string
  noDemo?: boolean
}

export interface PackageItemGroup {
  items: PackageItem[]
  title: string
}

export const routerDir: PackageItemGroup[] = [
  {
    title: '全局工具函数',
    items: [
      {
        title: 'Http 请求库',
        noDemo: true,
        name: 'http'
      },
      {
        title: 'Bem 样式函数',
        noDemo: true,
        name: 'bem'
      },
      {
        title: 'Sentry 错误捕获',
        noDemo: true,
        name: 'sentry'
      },
      {
        title: 'Dot 打点',
        noDemo: true,
        name: 'dot'
      }
    ]
  },
  {
    title: '基础组件',
    items: [
      {
        title: 'Avatar 头像',
        name: 'avatar'
      },
      {
        title: 'Dialog 弹出框',
        name: 'dialog'
      },
      {
        title: 'Button 按钮',
        name: 'button'
      },
      {
        title: 'Loading 加载',
        name: 'loading'
      },
      {
        title: 'Toast 提示',
        name: 'toast'
      },
      {
        title: 'Popup 弹出层',
        name: 'popup'
      },
      {
        title: 'Tag 标签',
        name: 'tag'
      },
      {
        title: 'Empty 空组件',
        name: 'empty'
      },
      {
        title: 'Skeleton 骨架',
        name: 'skeleton'
      }
    ]
  },
  {
    title: '高级组件',
    items: [
      {
        title: 'PageButton 页面按钮',
        name: 'page-button'
      },
      {
        title: 'Field 字段输入',
        name: 'field'
      },
      {
        title: 'Photo 图片',
        name: 'photo'
      },
      {
        title: 'InfiniteScroll 列表',
        name: 'infinite-scroll'
      },
      {
        title: 'SlideDelete 左滑删除',
        name: 'slide-delete'
      },
      {
        title: 'TabNav 底部菜单',
        name: 'tab-nav'
      },
      {
        title: 'ContentCard 内容卡片',
        name: 'content-card'
      },
      {
        title: 'CitySelect 级联选择',
        name: 'city-select'
      }
    ]
  },
  {
    title: 'Saas业务组件',
    items: [
      {
        title: '工具库',
        noDemo: true,
        name: 'saas-utils'
      }
    ]
  }
]

export const markdown = {
  Skeleton,
  PageButton,
  CitySelect,
  Tag,
  Avatar,
  /* inject export */
  Dialog,
  Button,
  Loading,
  Popup,
  Field,
  Photo,
  InfiniteScroll,
  Sentry,
  Dot,
  Bem,
  Http,
  SaasUtils,
  SlideDelete,
  Toast,
  TabNav,
  ContentCard,
  Empty
}
