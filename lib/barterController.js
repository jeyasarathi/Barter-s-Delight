/**
 * Created by Jeyasarathi T S on 11/3/2014.
 */
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, 'file_1.json');  // Source JSON file
var targetFilePath = path.join(__dirname, 'file_2_target.json'); // Target JSON file

exports.getProducts =  function(req, res) {
    // Function to read and manipulate the JSON data from the source file
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){
            // Content of the file
            console.log('File Content: ' + data);
            res.send(data);
        }else{
            console.log(err);
        }
    });

};

// Function to update the product details
exports.updateProductDetails = function(req, res) {
    // Stringify : To convert JSON object to a String to be written in file
    console.log("Received request data : "+ JSON.stringify(req.body));
// Function to read and manipulate the JSON data from the source file
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){
            // Demo Blocking Code
            console.log('File Content: ' + data);

            // New object to be replaced in the original JSON data
            var replace = req.body;
            var json_data = JSON.parse(data);

            // Construct a new json_data to write in a new file
            for(var i in json_data) {
                var id = json_data[i].productId;
                if (id == replace.productId) {
                    json_data[i].productName = replace.productName;
                    json_data[i].vendor      = replace.vendor;
                    json_data[i].type        = replace.type;
                    json_data[i].costPrice   = replace.costPrice;
                    json_data[i].mrp         = replace.mrp;
                    json_data[i].quantity    = replace.quantity;
                }
            }

            // Stringify : To convert JSON object to a String to be written in file
            var modified_data = JSON.stringify(json_data);
            console.log("Modified Data : " + modified_data);

            // Writing in to new file
            fs.writeFile(filePath, modified_data, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
        }else{
            console.log(err);
        }

    });
};

exports.deleteProduct = function (req, res) {

    // Stringify : To convert JSON object to a String to be written in file
    console.log("Received request data : "+ JSON.stringify(req.body));

// Function to read and manipulate the JSON data from the source file
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){
            // Demo Blocking Code
            console.log('File Content: ' + data);
            var details = JSON.parse(data);
            var delete_prod_id = req.body.id;

            var flag = 0;
            for (var i = 0; i < details.length; i++) {
                if (details[i].productId == delete_prod_id) {
                    details.splice(i, 1);
                    flag = 1;
                }
            }

            // Stringify : To convert JSON object to a String to be written in file
            var modified_data = JSON.stringify(details);
            console.log("Modified Data : " + modified_data);

            // Writing in to new file
            fs.writeFile(filePath, modified_data, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
        }else{
            console.log(err);
        }

    });
};

exports.addProduct = function (req, res) {
// Function to read and manipulate the JSON data from the source file
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err){
            // Demo Blocking Code
            console.log('File Content: ' + data);
            var details = JSON.parse(data);
            var new_product = req.body;

            details.push(new_product);
            // Stringify : To convert JSON object to a String to be written in file
            var modified_data = JSON.stringify(details);
            console.log("Modified Data : " + modified_data);

            // Writing in to new file
            fs.writeFile(filePath, modified_data, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
        }else{
            console.log(err);
        }

    });
};
