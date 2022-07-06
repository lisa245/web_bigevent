$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 自定义校验规则
  var form = layui.form
  form.verify({
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  })

  // 监听注册表单的事件
  var layer = layui.layer
  $('#form_reg').on('submit', function (e) {
    // 1. 阻止事件的默认行为
    e.preventDefault()
    // 2. 发起ajax的post请求
    $.post(
      '/api/reguser',
      {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      function (res) {
        if (res.status !== 0) {
          // return console.log(res.message)
          return layer.msg(res.message)
        }
        // console.log('注册成功')
        layer.msg('注册成功，请登录！')
        // 模拟人的点击事件，自动跳转到登录界面
        $('#link_login').click()
      }
    )
  })

  // 监听登录表单的事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      type: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        // console.log(res.token)
        localStorage.setItem('token', res.token)
        layer.msg('登录成功！')
        location.href = '/index.html'
      },
    })
  })
})
