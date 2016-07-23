// this is Node.js app

var remoteCouch = 'https://xxx:yyy@abc.com';
// For example, on Bluemix it looks like below:
// https://enderandsherseastai:d5ea78d306ea31234bf587034a96bf60731@6e7e-7b24-477d-b32c-115730e85f5f-bluemix.cloudant.com

var nano = require('nano')(remoteCouch);
var db = nano.db.use(process.argv[2]);

if (process.argv.length != 3) {
    console.log("\nUsage: \n\n  node bulkdelete.js <db name>\n");
    process.exit(1);
};
var a = [];
db.list(function(err, body) {
    if (!err) {
	body.rows.forEach(function(doc) {
	    console.log(doc);
	    var rev = doc.value.rev;
	    var id = doc.id;
	    a.push({_id: id, _rev: rev, _deleted: true});
	});
	var doc_del = {docs: a};
	db.bulk(doc_del, function(err, body) {
	    if (!err) {
		console.log(body);
	    } else {
		console.log(err);
	    }
	});
    } else {
	console.log(err);
    }
});
