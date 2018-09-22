const w2v = require( 'word2vec' )
const fs = require('fs-extra')

exports.analyze = (argv) => {
  w2v.loadModel(__dirname + '/vector.txt', (err, model) => {
    fs.writeJSONSync('./word2vec/result.json', model.mostSimilar(argv , 10))
  })
}