#!/usr/bin/env bash
composer install --no-dev
rm -rf node_modules/
rm -rf resources/js/
rm -rf tests/
rm .env
rm .env.test
rm .babelrc
rm .editorconfig
rm .eslintrc.js
rm .gitattributes
rm .gitignore
rm .travis.yml
rm Vagrantfile
rm after.sh
rm aliases
rm composer.json
rm composer.lock
rm package-lock.json
rm package.json
rm phpunit.xml
rm tsconfig.json
rm webpack.mix.js
rm .git
cd ..
GZIP=-9 tar -zcvf $TRAVIS_BUILD_DIR-$TRAVIS_TAG.tar.gz -C $TRAVIS_BUILD_DIR  *
rm -rf $TRAVIS_BUILD_DIR
