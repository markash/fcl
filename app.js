var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeType = function(extension) {

    if (extension == 'html' || extension == 'HTML') {
        return 'text/html';
    } else if (extension == 'ico' || extension == 'ICO') {
        return 'image/x-icon';
    } 

    return 'text/html';
};

var server = http.createServer(function(request, response) {
    console.log(request.method + " : " + request.url);

    if (request.method == 'GET') {

        if (request.url == '/') {
            request.url = '/index.html';
        }

        var filePath =  path.resolve("./public" + request.url);
        var extension = path.extname(filePath);

        console.log('Extension : ' + extension);

        fs.exists(filePath, function(exists) {
            if (exists) {

                response.writeHead(200, {'ContentType': mimeType(extension)});
                fs.createReadStream(filePath).pipe(response);
            }
            else {
                response.writeHead(404, {'ContentType': 'text/html'});
                response.end('<html><body>Not found</body></html>')
            }
        });
    }
    else {
        response.statusCode = 403;
        response.end('<html><body>Not supported</body></html>')
    }

    
});

server.listen(3001);