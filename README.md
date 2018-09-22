# GodHub

```bash
$ npm i
$ touch database.json
$ echo '[]' > database.json
$ cp .env.example .env
$ node app.js
```

### word2vecの設定

```bash
$ git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git
$ vim word2vec/word.txt // 辞書データを書き込む
$ touch word2vec/wakati.txt & touch word2vec/vector.txt
$ cd mecab-ipadic-neologd
$ ./bin/install-mecab-ipadic-neologd -n
$ echo `mecab-config --dicdir`"/mecab-ipadic-neologd"
> XXX
$ mecab -d XXX -Owakati ../word2vec/word.txt > ../word2vec/wakati.txt
$ cd ..
$ node word2vec/make.js
$ node word2vec/analyze.js
```