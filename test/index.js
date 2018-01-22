const request = require('request')

const fileList = ['checkHealth', 'login', 'authorize', 'authorizationCode']
global.jar = request.jar()
for (let i = 0; i < fileList.length; i++) require(`./${fileList[i]}.test`)()
