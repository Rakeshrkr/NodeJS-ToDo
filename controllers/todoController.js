var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds053206.mlab.com:53206/todo');

var todoSchema = new mongoose.Schema({item: String});
var Todo = mongoose.model('Todo',todoSchema);
// var itemOne = Todo({item:'buy one'}).save(function(err) {
//   if(err) throw err ;
//   console.log('saved');
// })
// var data = [{item:'item'},{item:'item2'},{item:'item3'}]
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function(app){
  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
      if(err) throw err ;
      res.render('todo',{todos: data});
    })

  });

  app.post('/todo',urlencodedParser,function(req,res){
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err ;
      res.json(data);
    })

  });
  app.delete('/todo/:item',function(req,res){
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
  if(err) throw err ;
  res.json(data);
});
  });
}
