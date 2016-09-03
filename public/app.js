'use strict';

var itemCount = 0;

function addItem(item) {
  $('#list').prepend(
    `<li id="${item._id}" class="w3-row">
      <div class="w3-col s11">
        <div class="w3-container w3-medium">${item.text}</div>
        <div class="w3-container w3-small w3-text-grey">${moment(item.createdAt).fromNow()}</div>
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

function populateList(skip) {
  listitems.find({
      query: {
        $skip: skip,
        $sort: { createdAt: 1 }
      }
    }).then(function(result){
    result.data.forEach(addItem);
    if (result.data.length !== 0) {
      populateList(result.skip + result.data.length);
    }

  });
}
populateList(0);

// returns id if present, null otherwise
function isPresentInDB(itemText) {
  return new Promise(function(resolve, reject){
    listitems.find({
        query: {
          text: itemText.toLowerCase()
        } 
      }).then(function(result){
        if (result.data.length === 0){
          resolve(null);
        }
        else{
          resolve(result.data[0]._id);
        }
    });
  });
}

function onAddItem(){
  console.log('onAddItem');
  var input = $('#item-text');
  var itemText = input.val();
  if (itemText) {
    isPresentInDB(itemText).then(function(id){
      if (id){
        listitems.remove(id);
      }
      listitems.create({'text': itemText});
    });
  }
  input.val("");
}

$('#add-button').on('click', onAddItem);
$('#item-text').keyup(function(event){
  if(event.keyCode == 13){
    console.log('siemno');
    onAddItem();
  }
});

$('#list').ready(function() {
  $('#list').on('click', '.w3-closebtn', function(event) {
    var id = $(this).parent().parent().attr('id');
    listitems.remove(id);
  });
});

