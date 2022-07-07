$(function () {
  var form = layui.form
  var layer = layui.layer

  // 表单验证
  form.verify({
    nickname: [/^[\S]{1,6}$/, '昵称必须1到6位，且不能出现空格'],
  })

  // 获取用户信息
  initUserInfo()

  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        console.log(res)
        form.val('formUserInfo', res.data)
      },
    })
  }

  // 提交修改按钮的监听事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户数据失败！')
        }
        layer.msg('更新用户数据成功！')
        // 侧边栏头像、昵称 -> 重新获取用户的信息
        window.parent.getUserInfo()
      },
    })
  })

  // 重置按钮的监听事件
  $('#btnReset').on('click', function (e) {
    // 阻止默认行为: 清空输入框的内容
    e.preventDefault()
    initUserInfo()
  })
})
