const http = require("http");
const data = require("./data"); 
http.createServer((req,res) => {  
    const path = req.url.toLowerCase();
    switch(path) {
        case '/':
            let authors = data.getAll()
            let numItems = authors.length
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Welcome to my home page. I have ' + numItems + ' items in my array');  
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('My name is Annette Ringe and I am in the Web Dev Cert program.');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not found');
            break;
    }

 }).listen(process.env.PORT || 3000);

