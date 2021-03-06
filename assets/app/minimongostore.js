exports.MemoryDb = require('./lib/MemoryDb');
exports.LocalStorageDb = require('./lib/LocalStorageDb');
exports.IndexedDb = require('./lib/IndexedDb');
exports.WebSQLDb = require('./lib/WebSQLDb');
exports.RemoteDb = require('./lib/RemoteDb');
exports.HybridDb = require('./lib/HybridDb');
exports.ReplicatingDb = require('./lib/ReplicatingDb');
exports.utils = require('./lib/utils');
var minimongo = require("minimongo");

var LocalDb = minimongo.MemoryDb;

// Create local db (in memory database with no backing)
db = new LocalDb();

// Add a collection to the database
db.addCollection("animals");

doc = { species: "dog", name: "Bingo" };

// Always use upsert for both inserts and modifies
db.animals.upsert(doc, function() {
	// Success:

	// Query dog (with no query options beyond a selector)
	db.animals.findOne({ species:"dog" }, {}, function(res) {
		alert("Dog's name is: " + res.name);
	});
});