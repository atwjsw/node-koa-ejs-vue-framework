var fs = require('fs');

//获取mock数据
exports.get_test_data = function() {
    var content = fs.readFileSync('./mock/test.json', 'utf-8');
    console.log('read data: ' + content);
    return content;
};

//异步方式获取mock数据
exports.get_test_data_async = function() {
	var readfile = function(callback) {
		fs.readFile('./mock/test.json', 'utf8', (err, data) => {
  			if (err) throw err;
  			callback(null, data);
  		});
  	};
  	return readfile;
  };

//获取http接口数据
exports.get_search_data = function(start, end, keyword) {
    // body...
    return function(cb) {
        var http = require('http');
        var qs = require('querystring');
        var data = { s: keyword, start: start, end: end }
        var content = qs.stringify(data);
        var options = {
            host: 'dushu.xiaomi.com',
            port: 80,
            path: '/store/v0/lib/query/onebox?' + content,
            method: 'GET'
        };

        var req = http.request(options, function(res) {
        	var content = '';            
            res.setEncoding('utf8');
            res.on('data', function(chunk) {                
                content += chunk;
            });
            res.on('end', function() {
            	// console.log('res body: ' + content);
            	cb(null, content);
            });
        });

        req.on('error', function(e) {
            console.log("Error in http request: " + e.message);
        });

        req.end();
    };
};
