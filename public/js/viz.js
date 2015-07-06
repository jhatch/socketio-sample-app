var socket = io.connect('/data-set');

socket.emit('listen', {
  name: 'sample'
});

socket.on('data', function (data) {
  $('body').append(data);
});
