$(function() {
  var socket = io()
  $("form").submit(function (e) {
    e.preventDefault() 
    socket.emit("shorten url", $("#m").val())
    $("#m").val("")
    return false
  })
  socket.on("shortened url", function (ret) {
    const {
      protocol,
      hostname,
      port
    } = window.location
    const base = `${protocol}//${hostname}:${port}/${ret.shortened}`
    let link = $('<a>').attr('href', base).text(base)
    $("#messages").html(link)
  })
  socket.on('shorten failed', function (error) {
    let msg = $('<p>').text(error.message)
    $("#messages").html(msg)
  })
})