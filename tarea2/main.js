const fs = require('fs')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const bucketName = 'rodolfo-test01'

s3.listBuckets({}).promise().then(console.log).catch(console.log)

let paramsBucket = {
  Bucket: bucketName,
  CreateBucketConfiguration: {
    LocationConstraint: 'us-west-2'
  }
}

s3.createBucket(paramsBucket).promise().then( data => {
  let file = {
    Bucket: bucketName,
    Key: 'archivo01.txt',
    Body: 'Hola mundo',
  }
  s3.putObject(file).promise().then( ({ETag}) => {
    console.log('Archivo agredado Etag: ', ETag)
  }).catch(console.log)
}).catch(console.log)

let object = {
  Bucket: bucketName,
  Key: 'archivo01.txt'
}

s3.getObject(object).promise().then( data => {
  console.log(data)
  console.log(data.Body.toString())
}).catch(console.log)

fs.readFile('main.js', (err, data) => {
  if(err) throw err;
  let base64data = new Buffer(data, 'binary')
  let params = {
    Bucket: bucketName,
    Key: 'main.js',
    Body: base64data,
  }
  s3.putObject(params).promise().then( ({ETag}) => {
    console.log('Archivo agredado Etag: ', ETag)
  }).catch(console.log)
})
