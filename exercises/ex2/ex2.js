function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
var response ={};
function getFile(file) {
	var val,fn;
	//what we do is to determine who finish first
	fakeAjax(file,function(text){
		
		// return function get call first before fakeAjax return
		if(fn){
			//run call back
			fn(val);
		}else{
			//fn is not set meaning that return function not get call yet
			val = text;
		}
	});

	return function(cb){
		// fakeAjax return call back before this getcall we just run the call back
		if(val) cb(val); 
		//fakeAjax not comback yet store the cb
		 else fn = cb;

	}
}


var th1 =getFile("file1");
var th2 = getFile("file2"); 
var th3 = getFile("file3");
// request all files at once in "parallel"
// ???

th1(function ready(text){
	output(text);
	th2(function ready(text){
		output(text);
		th3(function ready(text){
			output(text);
			output("Complete!");
		});
	});
});
