.PHONY: install
install:
	npm install

.PHONY: start
start:
	npm start

.PHONY: run
run:
	node --loader ts-node/esm $(FILE_PATH)

.PHONY: test
test:
	npm test

.PHONY: build
build:
	npm run build
