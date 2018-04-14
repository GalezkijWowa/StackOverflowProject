var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

function search(text) {
    return client.search({
        q: text
    });
}

module.exports.search = search;