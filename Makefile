setup:
	npm i
	touch database.json
	echo '[]' > database.json
	cp .env.example .env
	brew install mecab
	brew install mecab-ipadic
	git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git
	touch word2vec/wakati.txt
	touch word2vec/wakati.txt
	touch word2vec/vector.txt
	touch word2vec/result.json
	cd mecab-ipadic-neologd
	./bin/install-mecab-ipadic-neologd -n
