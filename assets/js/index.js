$(function () {
  getUserInfo()

  var layer = layui.layer
  // 点击退出按钮的监听事件
  $('.btnLogOut').on('click', function () {
    // 弹出层
    layer.confirm(
      '确定退出登录?',
      { icon: 3, title: '提示' },
      function (index) {
        // 1. 清空本地存储的token
        localStorage.removeItem('token')
        // 2. 跳转页面
        location.href = '/login.html'

        layer.close(index)
      }
    )
  })
})

// 获取用户的信息
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取信息失败')
      }
      // 渲染用户头像
      renderAvatar(res.data)
    },
  })
}

// 渲染用户头像
function renderAvatar(user) {
  // 1.渲染名称
  var name = user.nickname || user.username
  $('#welcome').html('欢迎：' + name)
  // 2.渲染头像
  if (user.user_pic != null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
