function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The 1 text",
		"file2": "The 2 text",
		"file3": "The 3 text",
		"file4": "The 4 text",
		"file5": "The 5 text"
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
// The old-n-busted callback way
var cb = [];
var result = [];
var index = 0;
function handleAsync(file,text){
	if(file){
		result[file] =  text;
	}
	if(result[cb[index]]){
			output(result[cb[index]]);
			index++;
			handleAsync();
	}
}

function getFile(file) {
	cb.push(file);
	fakeAjax(file,function(text){
		// what do we do here?
		handleAsync(file,text);
		
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
getFile("file4");
getFile("file5");