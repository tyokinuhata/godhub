const w2v = require( 'word2vec' )
w2v.word2vec(__dirname + '/wakati.txt', __dirname + '/vector.txt', {
  cbow: 1,
  size: 200,
  window: 8,
  negative: 25,
  hs: 0,
  sample: 1e-4,
  threads: 20,
  iter: 30,
  minCount: 2,
})