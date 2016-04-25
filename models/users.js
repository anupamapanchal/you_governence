var db = require('../db.js');
var dateFormat = require('dateformat');

exports.getUsersSince = function(from, to, done){
	db.get().query('SELECT	* FROM users WHERE (active = 1) AND (created  between ? AND ?) LIMIT 50', [from, to],  function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  });
}

exports.getWorkspaceCounts = function(ids, done){
	ids = ids.split(",");
	db.get().query('SELECT user_networks.user_id, COUNT(DISTINCT user_networks.network_id) AS count FROM user_networks WHERE user_networks.user_id IN ( ? ) GROUP BY user_networks.user_id', [ids],  function (err, rows) {
    	if (err) return done(err)
    	done(null, rows)
  	});
}

exports.getTaskCounts = function(ids, done){
	ids = ids.split(",");
	db.get().query('SELECT task_assignments.user_id, COUNT(DISTINCT task_assignments.task_id) AS count, COUNT(DISTINCT task_assignments.project_id) AS project_count FROM task_assignments WHERE task_assignments.user_id IN ( ? ) GROUP BY task_assignments.user_id', [ids],  function (err, rows) {
    	if (err) return done(err)
    	done(null, rows)
  	});
}

exports.getUserFilesCounts = function(ids, done){
	ids = ids.split(",");
	db.get().query('SELECT docs_assignment.user_id, COUNT(DISTINCT docs_assignment.doc_id) AS count FROM docs_assignment WHERE docs_assignment.user_id IN ( ? ) GROUP BY docs_assignment.user_id', [ids],  function (err, rows) {
    	if (err) return done(err)
    	done(null, rows)
  	});
}