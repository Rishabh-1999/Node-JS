var http = require('http');
var url = require('url');
var fs = require('fs');

/* Reads the file at the given path and serves it to the client. The
 * Content-Type header will be set to the provided contentType. */
function readAndServe(path, contentType, response) 
{
  fs.readFile(path, function(error, data) {
    if (error) {
      throw error;
    }

    response.writeHead(200, {'Content-type': contentType});
    response.write(data);
    response.end();
  });
}

/* Creates a task with the given text. Calls the callback when finished. */
function createTask(dir,text, callback) 
{
  readTasks(dir,function(tasks) 
  {
    tasks.push({ text: text });
    writeTasks(dir,tasks, callback);
  });
}

function deleteTask(dir,index,callback)
{
  console.log("delete"+index);
  readTasksForDelete(dir,index,function(tasks,index) 
  {
    tasks=deleteInIndex(tasks,index);
    writeTasks(dir,tasks, callback);
    callback();
  });
}

function deleteInIndex(tasks,index)
{
  tasks.splice(index, 1);
  return tasks;
}

function readTasksForDelete(dir,index,callback) 
{
  fs.readFile(dir, function(error, contents) 
  {
    if (error) 
    {
      throw error;
    }

    var tasks;
    if (contents.length === 0) 
    {
      tasks = [];
    } 
    else 
    {
      tasks = JSON.parse(contents);
    }
    callback(tasks,index);
  });
}

/* Reads all tasks from the filesystem. Calls the given callback, passing in an
 * array of tasks, when finished. */
function readTasks(dir,callback) 
{
  fs.readFile(dir, function(error, contents) 
  {
    if (error) 
    {
      throw error;
    }

    var tasks;
    if (contents.length === 0) 
    {
      tasks = [];
    } 
    else 
    {
      tasks = JSON.parse(contents);
    }
    callback(tasks);
  });
}

/* Writes the given tasks to the filesystem. Calls the given callback when
 * finished. */
function writeTasks(dir,tasks, callback) 
{
  var tasksJSON = JSON.stringify(tasks);
  fs.writeFile(dir, tasksJSON, function(error) {
  if (error) 
  {
    throw error;
  }
    callback();
  });
}

/* Reads the JSON body of the request and parses it. Calls the given callback,
 * passing in the parsed object. */
function readJSONBody(request, callback) 
{
  var body = '';
  request.on('data', function(chunk) {
           body += chunk;
      });

  request.on('end', function() {
          var data = JSON.parse(body);
          callback(data);
       });
}

/* Serves files for the task list, and provides routes to create/delete tasks. */
http.createServer(function(request, response) 
{
  var pathname = url.parse(request.url).pathname;
  console.log(pathname);
  if (request.method === "GET") {
    if (pathname === "/") {
      readAndServe('index.html', 'text/html', response);
    } else if (pathname === "/css/style.css") {
      readAndServe('.' + pathname, 'text/css', response);
    } else if (pathname === "/js/script.js") {
      readAndServe('.' + pathname, 'text/javascript', response);
    } else if (pathname === "/name1") {
      readTasks('name1',function(tasks) {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
      });
    } else if (pathname === "/name2") {
      readTasks('name2',function(tasks) {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
      });
    } else if (pathname === "/name3") {
      readTasks('name3',function(tasks) {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
      });
    } else if (pathname === "/name4") {
      readTasks('name4',function(tasks) {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
      });
    } else {
      response.end();
    }
  } else if (request.method === "POST") {
     if (pathname === "/name1") {
      readJSONBody(request, function(task) {
        createTask('name1',task.text, function() {
          // must wait until task is stored before returning response
          response.end();
        });
      });
    } else if (pathname === "/name2") {
      readJSONBody(request, function(task) {
        createTask('name2',task.text, function() {
          // must wait until task is stored before returning response
          response.end();
        });
      });
    } else if (pathname === "/name3") {
      readJSONBody(request, function(task) {
        createTask('name3',task.text, function() {
          // must wait until task is stored before returning response
          response.end();
        });
      });
    } else if (pathname === "/name4") {
      readJSONBody(request, function(task) {
        createTask('name4',task.text, function() {
          // must wait until task is stored before returning response
          response.end();
        });
      });
    } else {
      response.end();
    }
  } else if(request.method=="DELETE"){
    if (pathname=="/name1" )
    {
       readJSONBody(request, function(task) {
        deleteTask('name1',task.text,function() {
          // must wait until task is stored before returning response
          response.end();
        });
      });
    } else if (pathname=="/name2" ) {
       readJSONBody(request, function(task) {
        deleteTask('name2',task.text,function() {
          // must wait until task is stored before returning response
          response.end();
        });
      });
    } else if (pathname=="/name3" ) {
       readJSONBody(request, function(task) {
        deleteTask('name3',task.text,function() {
          // must wait until task is stored before returning response
          response.end();
        });
      });
    } else if (pathname=="/name4" ) {
       readJSONBody(request, function(task) {
        deleteTask('name4',task.text,function() {
          // must wait until task is stored before returning response
          response.end();
        });
      });
    }
  } else {
    response.end();
  }
}).listen(3000, '127.0.0.1');

console.log('Running on 127.0.0.1:3000');
