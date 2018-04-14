const elasticsearch = require('elasticsearch');
const database = require('../../database/index');

const client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'trace'
});

var indexData = function() {
    database.getAllQuestions().then(function (questions) {
        var indexId = 1;
        var myString;

        client.indices.delete({
            index: 'questions',
        })
            .then(function () {
                questions.forEach(item => {
                    console.log(typeof (myString));
                    myString = item._id + "";
                    client.index({
                        index: 'questions',
                        type: 'question',
                        id: myString,
                        body: {
                            title: item.title,
                            description: item.description,
                            author: item.author,
                            authorname: item.authorname,
                            dateofcreation: item.dateofcreation,
                            dateofupdate: item.dateofupdate,
                            rating: item.rating
                        }
                    });
                });
            })
            .catch(function (err) {
                console.log("ERROR");
                questions.forEach(item => {
                    console.log(typeof (myString));
                    myString = item._id + "";
                    client.index({
                        index: 'questions',
                        type: 'question',
                        id: myString,
                        body: {
                            title: item.title,
                            description: item.description,
                            author: item.author,
                            authorname: item.authorname,
                            dateofcreation: item.dateofcreation,
                            dateofupdate: item.dateofupdate,
                            rating: item.rating
                        }
                    });
                });
        });
    });
}

module.exports = indexData;