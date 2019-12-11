# 建立專案
$ npm init -y

# 安裝 express-generator
$ sudo npm i -g express-generator

# 使用 express-generator
# -e 使用 ejs, -f 強迫使用在非空的資料夾
$ express -e -f ./html5-api-examples

# 安裝 packages
$ npm i

# 將 package.json 的啟動修改，使之使用 nodemon 啟動（之前必須全域安裝 nodemon）
    "start": "nodemon ./bin/www"



