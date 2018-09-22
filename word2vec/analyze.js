const w2v = require( 'word2vec' )
w2v.loadModel(__dirname + '/vector.txt', (err, model) => {
  console.log(model.mostSimilar( '人間' , 10 ))
})