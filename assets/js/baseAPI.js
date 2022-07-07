// 每次调用ajax时，预先调用这个函数
$.ajaxPrefilter(function (options) {
  // console.log(options.url)
  // 在正式发起请求之前，拼接真正的根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url

  // 统一为有权限的接口设置headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || '',
    }
  }

  // 全局挂载complete函数
  // 不论请求成功还是失败，都会执行complete回到函数
  options.complete = function (res) {
    if (
      //  res.responseJSON: 服务器响应回来的数据
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      localStorage.removeItem('token')
      location.href = '/login.html'
    }
  }
})
