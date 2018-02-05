const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const s3 = new aws.S3();

const fileUpload = require('express-fileupload');
router.use(fileUpload());


router.get('/', (req, res) => {
  s3.listBuckets({}).promise().then( data => {
    console.log(data)
    res.render('listBuckets', {buckets: data.Buckets})
  }).catch( err => {
    throw err;
  })
});

router.get('/:bucket/', (req, res) => {
  s3.listObjects({ Bucket: req.params.bucket}).promise().then(data => {
    console.log('this data ', data)
    res.render('listObjects', {bucket:req.params.bucket ,contents: data.Contents})
    console.log('rendered')
  }).catch(err => { console.log('this error ', err)})
});

router.get('/:bucket/:key', (req, res) => {
  let object = {
    Bucket: req.params.bucket,
    Key: req.params.key
  }

  s3.getObject(object).promise().then( data => {
    console.log(data)
    res.type(data.ContentType)
    res.send(data.Body)
  }).catch(console.log)
});


router.post('/', (req,res) => {
  let paramsBucket = {
    Bucket: req.body.bucket,
    CreateBucketConfiguration: {
      LocationConstraint: 'us-west-2'
    }
  }
  
  s3.createBucket(paramsBucket).promise().then(data => {
    console.log(data)
    s3.listBuckets({}).promise().then( data => {
      console.log(data)
      res.render('listBuckets', {buckets: data.Buckets})
    }).catch( err => {
      throw err;
    })
  }).catch(console.log)
    /*
     * @TODO - Programa la logica para crear un Bucket.
    */
});

router.post('/:bucket', (req,res) => {
  console.log(req.params)
  console.log(req.files)

  if(req.files.object) {
    let file = {
      Bucket: req.params.bucket,
      Key: req.files.object.name,
      Body: req.files.object.data,
    }
    s3.putObject(file).promise().then( ({ETag}) => {
      console.log('Archivo agredado Etag: ', ETag)
      s3.listObjects({ Bucket: req.params.bucket}).promise().then(data => {
        console.log('this data ', data)
        res.render('listObjects', {bucket:req.params.bucket ,contents: data.Contents})
        console.log('rendered')
      }).catch(err => { console.log('this error ', err)})
    }).catch(console.log)
  }
  
    /*
     * @TODO - Programa la logica para crear un nuevo objeto.
     * TIPS:
     *  req.files contiene todo los archivos enviados mediante post.
     *  cada elemento de files contiene multiple información algunos campos
     *  importanets son:
     *      data -> Buffer con los datos del archivo.
     *      name -> Nombre del archivo original
     *      mimetype -> tipo de archivo.
     *  el conjunto files dentro del req es generado por el modulo 
     *  express-fileupload
     *  
    */
     
});

module.exports = router;