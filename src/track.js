import { script } from 'cy-lib/helper'
import _ from 'lodash'
import qs from 'query-string'
import cyConfig from 'cy-lib/config'

const debug = require('cy-lib/debug')('track')
window._hmt = window._hmt || []

const storage = store.namespace(cyConfig.name + '_' + cyConfig.version)
 
const TRACK_CONFIG = {
  huoDongYeShow: {
    tid: 'huoDongYeShow',
    ptid: '',
    cat: 12
  },
  shelfShow: {
    tid: '',
    ptid: '',
    cat: 12,
  }, 
  giftClick: {
    tid: 'giftClick',
    ptid: '',
    cat: 9,
  },
  musicClick: {
    tid: 'musicClick',
    ptid: '',
    cat: 9,
  },
  startTheLotteryClick: {
    tid: 'startTheLotteryClick',
    ptid: '',
    cat: 9,
  },
  openGiftClick: {
    tid: 'openGiftClick',
    ptid: '',
    cat: 9,
  },
  huoDongGuiZeClick: {
    tid: 'huoDongGuiZeClick',
    ptid: '',
    cat: 9,
  },
  jingPinLiBaoClick: {
    tid: 'jingPinLiBaoClick',
    ptid: '',
    cat: 9,
  },
  shenTanDanPinClick: {
    tid: 'shenTanDanPinClick',
    ptid: '',
    cat: 9,
  },
  xianShiGouClick: {
    tid: 'xianShiGouClick',
    ptid: '',
    cat: 9,
  },
  lingQuClick: {
    tid: 'lingQuClick',
    ptid: '',
    cat: 9,
  },
  rewardCenterShow: {
    tid: '_rewardCenterShow',
    ptid: '',
    cat: 12,
  },
  rewardCenterTabClick: {
    tid: 'rewardCenterTabClick',
    ptid: '',
    cat: 9,
  },
  shelfProductClick: {
    tid: 'product',
    ptid: 'productTab',
    cat: 9,
  }
}
export default class Track {
  constructor(opts) {
    this.check(opts)
    this.host = opts.host
    this.trackConstParams = {
      vid: opts.video || '',
      proj: opts.project || '',
      bu: opts.bu || '',
      rs: opts.rs || '',
      n: opts.n || '',
      sdk: opts.sdk || '',
      appkey: opts.appkey || '',
      client: opts.client || storage.get('trackClient'),
      lang: opts.lang || '',
      ssid: opts.ssid || storage.get('ssid'),
      ext: {
        resource: opts.ext && opts.ext.resource || '',
        user: opts.user && opts.ext.user || '',
        phone: opts.phone && opts.ext.phone || '',
      }
    }
  }

  controller = (params) => {
    const { event, phone, ssid } = params
    if (!_.isEmpty(phone)) {
      this.trackConstParams.ext.phone = phone
    }
    if (!_.isEmpty(ssid)) {
      this.trackConstParams.ssid = ssid
    }
    
    if (_.isEmpty(TRACK_CONFIG[event])) {
      debug(`Track: ${event} 事件不存在`)
    }
    const trackUrl = this.makeRequestUrl(params)
    console.log(trackUrl)
    this.send(trackUrl)
  }
  check = (opts) => {
    // video为必要字段
    if (_.isEmpty(opts.video)) {
      debug('Track: video字段不能为空')
    }
    // project项目字段不能为空
    if (_.isEmpty(opts.project)) {
      debug('Track: project不能为空')
    }
    if (_.isEmpty(opts.bu)) {
      debug('Track: bu不能为空, 你可以按照业务选择对应的bu(videojj, videoos, liveos)')
    }
    if (_.isEmpty(opts.sdk)) {
      debug('Track: sdk字段不能为空, 请传入正确的值')
    }
    if (_.isEmpty(opts.client)) {
      debug('Track: client字段不能为空, client字段代表客户端的唯一表示')
    }
    if (_.isEmpty(opts.ext)) {
      debug('Track: ext表示为拓展字段, 不能为空')
    }
  }

  makeRequestUrl = (opts) => {
    const { event, phone } = opts
    const tmpUrlParams = {
      ..._.cloneDeep(this.trackConstParams),
      ...TRACK_CONFIG[event],
    }
    tmpUrlParams.ext = JSON.stringify(tmpUrlParams.ext)

    debug(`Track: 最终发送的参数, ${JSON.stringify(tmpUrlParams)}`)
    const url = this.host + '/track/v5/va.gif?' + qs.stringify(tmpUrlParams)
    return url
  }

  send = (url) => {
    const caller = new Image(1, 1)
    caller.onload = caller.onerror = (error) => {
      debug(`Track: send error, ${JSON.stringify(error)}(${url})`)
    }
    caller.src = url
  }
}