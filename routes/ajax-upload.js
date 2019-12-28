const express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const upload = multer({dest: __dirname + '/../tmp-uploads'});
const router = express.Router();
router.post('/profile', upload.single('avatar'), function(req, res) {
	let data;
	const extMap = {
	  'image/jpeg': '.jpg',
	  'image/png': '.png',
	};
	const output = { body: req.body }; // 先預放傳入的 POST 資料
	try {
		data = require(__dirname + '/../public/json/profile'); // 取資料
	} catch (ex) {
		console.log(ex);
		data = {}; // 預設值
	}
	data.user = req.body.user; // 變更資料
	data.description = req.body.description;
	if(req.file && req.file.originalname){
		let ext = extMap[req.file.mimetype]; // 副檔名
		if(ext) {
			output.upload = uuidv4() + ext; // 接上副檔名
			data.avatar = '/img-uploads/' + output.upload;
			fs.rename(req.file.path, __dirname + '/../public' + data.avatar, error=>{});
		} else {
			output.error = '上傳的檔案格式錯誤';
			fs.unlink(req.file.path, error=>{}); // 刪除暫存檔
		}
	}
	fs.writeFile(__dirname+'/../public/json/profile.json', JSON.stringify(data), error=>{
		if(error) return console.log(error);
	});
	res.json(output);
});
module.exports = router;
