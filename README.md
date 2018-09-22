# GodHub

神と神が争い合うゲームです.

### 環境構築

```bash
$ make setup
```

### word2vecの設定

##### 辞書データの書き込み

```bash
$ vim word2vec/word.txt
```

##### 分かちファイルの作成

```bash
$ cd mecab-ipadic-neologd
$ echo `mecab-config --dicdir`"/mecab-ipadic-neologd"
> XXX
$ mecab -d XXX -Owakati ../word2vec/word.txt > ../word2vec/wakati.txt
```

##### vector.txtの作成

```bash
$ node word2vec/make.js
```

##### 解析の実行

```bash
$ node word2vec/analyze.js
```