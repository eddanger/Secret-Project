$(document).ready(function() {   
  socket = new io.Socket(null, { 
    port: 8080
  });
  socket.connect();

  $('.my_secret').keypress(function(e) {
    if(e.which == 13) {
      socket.send($('.my_secret').val());
      $('.my_secret').val('');
    }
  });

  socket.on('message', function(data) {
    parsed_data = JSON.parse(data);

    if (parsed_data.message)
    {
      $('.secrets').prepend('<div class="secret">' + parsed_data.message + '</div>');
    }
    else if (parsed_data.online)
    {
      if (parsed_data.online == 1)
      {
        $('.listening').html("Nobody else is here. Give it a minute or two, someone might arrive.");
        $('.my_secret').hide(true);
      }
      else if (parsed_data.online == 2)
      {
        $('.listening').html("Someone else is listening! Spill your guts...");
        $('.my_secret').show(true);
      }
      else
      {
        $('.listening').html(parsed_data.online + " people are listening... secret party!");
        $('.my_secret').show(true);
      }
      
    }
    
  });

});
