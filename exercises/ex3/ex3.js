function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url + " " +randomDelay);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	// what do we do here?
	//console.log(file);
	return new Promise(function(resolve,reject){
		fakeAjax(file,resolve);
	});
}


var pr1 =getFile('file1');
var pr2 =getFile('file2');
var pr3 =getFile('file3');

// pr1.then(function(text){
// 	output(text);
// 	pr2.then(function(text){
// 		output(text);
// 		pr3.then(function(text){
// 			output(text);
// 		})
// 	})
// });


pr1.then(output)
.then(function(){ return pr2;})
.then(output)
.then(function(){ return pr3;})
.then(output)
.then(function(){
	output('complete');
})


// request all files at once in "parallel"
// ???
