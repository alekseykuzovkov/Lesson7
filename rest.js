const util = require('util');
const restify = require('restify');
const tasks = require('./models/tasks');

rest = restify.createServer({
	name: 'Lesson 7'
});

rest.use(restify.queryParser());

rest.get('/', function(req, res) {
	res.send(200, "Ok");;
});


rest.get('/tasks', function(req, res) {
	tasks.list((err, tasks) => {
		if (err) {
			console.log(err);
			return;
		}
		res.send(JSON.stringify(tasks));
	});
});
rest.post('/tasks/text/:text/priority/:priority', function(req, res) {
	tasks.add(req.params.text, req.params.priority, (err, insertid) => {
		if (err) {
			console.log(err);
			return;
		}
		res.send({result:'Task added', text:req.params.text, priority:req.params.priority});
	});
});

rest.put('/tasks/:id/text/:text/priority/:priority', function(req, res) {
	tasks.change(req.params.id, req.params.text, req.params.priority, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		res.send({result:'Task edited', text:req.params.text, priority:req.params.priority});
	});
});

rest.put('/tasks/:id/text/:text', function(req, res) {
	tasks.change(req.params.id, req.params.text, req.params.priority, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		res.send({result:'New task text set', text:req.params.text});
	});
});

rest.put('/tasks/:id/priority/:priority', function(req, res) {
	tasks.change(req.params.id, req.params.text, req.params.priority, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		res.send({result:'New task priority set', priority:req.params.priority});
	});
});

rest.put('/tasks/:id/complete', function(req, res) {
	tasks.complete(req.params.id, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		res.send({result:'Task completed'});
	});
});

rest.del('/tasks/:id', function(req, res) {
	tasks.delete(req.params.id, (err, insertid) => {
		if (err) {
			console.log(err);
			return;
		}
		res.send({result:'Task removed'});
	});
});


rest.listen(8080, function() {
	console.log('API launched');
});
