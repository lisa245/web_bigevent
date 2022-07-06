// 每次调用ajax时，预先调用这个函数
$.ajaxPrefilter(function (options) {
  // console.log(options.url)
  // 在正式发起请求之前，拼接真正的根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url
})
