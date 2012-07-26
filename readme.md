# node-cgi

This library is a CGI adaptor for node.js

It is designed to help people run node.js websites off of a shared server (CGI is so old it's available almost *everywhere*).

## Usage

You'll have to create a `.htaccess` file that rewrites everything to a CGI script:

    Options +ExecCGI
    AddHandler cgi-script cgi
    
    RewriteEngine on
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule (.*) server.cgi

Copy `cgi.js` to the same directory and make the actual CGI script (`server.cgi` in this example):

    #!/usr/bin/env node
    
    var cgi = require('./cgi');
    
    var server = cgi.createServer(function(request, response) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('This is CGI!');
        response.end();
    });
    server.listen();

As you can see, using the `cgi` library is very similar to the `http` library in node.js

## License

The `cgi.js` library is released under an MIT license.  See `LICENSE` for the full text of the license.
