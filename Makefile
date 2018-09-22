setup:
	npm i
	touch database.json
	echo '[]' > database.json
	cp .env.example .env
	git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git
	touch word2vec/wakati.txt
	touch word2vec/wakati.txt
	touch word2vec/vector.txt
	cd mecab-ipadic-neologd
	./bin/install-mecab-ipadic-neologd -n
