'use strict';

var itemCount = 0;

function addItem(item) {
  $('#list').append(
    `<li id="${item._id}" class="w3-row">
      <div class="w3-col s11">
        <div class="w3-container w3-xlarge">${item.text}</div>
        <div class="w3-container">${moment(item.createdAt).fromNow()}</div>
      </div>
      <div class="w3-col s1">
	<div class="w3-closebtn w3-margin-right w3-xxlarge fa fa-times"></div>
      </div>
    </li>`
  ); 
}

function removeItem(item) {
  $('#' + item._id).remove();
}

var socket = io();
var app = feathers();
app.configure(feathers.socketio(socket));
app.configure(feathers.hooks());

var listitems = app.service('listitems');
listitems.on('created', addItem);
listitems.on('removed', removeItem);

listitems.find().then(function(result) {
  result.data.forEach(addItem);
});

$('#add-button').on('click', function(event) {
  var input = $('#item-text');
  var itemText = input.val();
  if (itemText) {
    listitems.create({'text': itemText});
    input.val("");
  }
});

$('#list').ready(function() {
  $('#list').on('click', '.w3-closebtn', function(event) {
    var id = $(this).parent().parent().attr('id');
    listitems.remove(id);
  });
});

