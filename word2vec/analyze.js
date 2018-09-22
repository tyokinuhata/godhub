const w2v = require( 'word2vec' )
const search = process.argv[2].trim()
console.log(search)
w2v.loadModel(__dirname + '/vector.txt', (err, model) => {
  console.log(model.mostSimilar(search , 10))
  return model.mostSimilar(search , 10)
})