

export default{
  install (app, options) {
    app.config.globalProperties.$message = function(text) {
      M.toast({html : text, classes: 'purple darken-4'})
    }

    app.config.globalProperties.$error = function(text) {
      M.toast({html : '[Ошибка]: ' + text, classes: 'pink darken-1' })
    }
  }
}
