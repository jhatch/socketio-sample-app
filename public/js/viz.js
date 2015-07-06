var socket = io.connect('/data-set');

socket.emit('listen', {
  name: 'sample'
});

socket.on('data', function (data) {
  alert(data);
  $('body').html(data);
});
