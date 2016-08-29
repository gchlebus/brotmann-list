'use strict';

var itemCount = 0;

function addItem(item) {
  $('#list').append(
    `<li id="${item._id}" class="w3-card-4">
      <div class="w3-container w3-xlarge">${item.text}</div>
      <div class="w3-container">${moment().startOf('day').fromNow()}</div>
    </li>`
  ); 
}

var socket = io();
var app = feathers();
app.configure(feathers.socketio(socket));
app.configure(feathers.hooks());

var listitems = app.service('listitems');
listitems.on('created', function(listitem) {
});

addItem({
  "_id": "blabasasd",
  "text": "Kartofle"
});

