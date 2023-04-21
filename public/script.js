const socket = io();


$('#chat-box').hide();

$('#log-btn').click(()=>{
    const username= $('#username').val();
    socket.emit('login',{
        username:username
    })
    $('#username').val("");
    $('#login').hide();
    $('#chat-box').show();
})



$('#btn').click(()=>{
    const msg=$('#message').val();
    // console.log(msg);
    socket.emit('send-msg',{
        msgg:msg
    });
    $('#message').val("");
});

socket.on('received-msg',(data)=>{
    // console.log(data);
    $('#chat').append(`<li class="list-group-item "><strong>${data.id}</strong> : <span>${data.msgg}</span></li> `)
})