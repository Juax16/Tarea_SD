var grpc = require("@grpc/grpc-js");
var protoLoader  = require("@grpc/proto-loader");
const express = require('express');
var PROTO_PATH = "./setup.proto";

var options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    arrays: true
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

var searchPckg = grpc.loadPackageDefinition(packageDefinition);

var searchitem = searchPckg.searchPackage;

var client = new searchitem.SearchItem("server:50051", grpc.credentials.createInsecure());

var item1 = "itemNro1";

client.getSearch(item1, function(err, blank) {
    if (err) {
        console.log('Error al enviar rpc');
    } else {
        console.log(blank);
    }    
});

const port = 30001;

const app = express();


app.use(express.json());

app.listen(port, () =>{
    console.log('Server running on port', port);
});
