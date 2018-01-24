/* 
 ***************************************************
 *     APLICACIONES Y SERVICIOS EN LA NUBE         *
 *                   ITESO                         *
 *                                                 * 
 *    Actividad 1: Diseño de un WebService         *
 *    Codigo Base: Alvaro Parres (parres@iteso.mx) * 
 *                                                 * 
 *    Alumno: Rodolfo Carrillo Cuevas              *
 *    Exp: is700829                                *
 *                                                 *
 ***************************************************
 *                                                 *
 * Instrucciones: Complete el codigo basado en     * 
 * las indicaciones descritas en el documento      *
 *                                                 *
 ***************************************************
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Routes
var wines = require('./routes/wines');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
/*
 * ********************************************
 * @TODO Complete las funciones a fin de tener 
 * todas las funciones RESTful. 
 * ********************************************
 */

// Phase 1:  First Routes.
app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);

/*
 * Phase 2: 
 * Add the missing RESTfull methods 
 * Method: POST URL: /wines  CallBack: wines.addWine
 * Method: PUT URL: /wines/:id  CallBack: wines.updateWine       
 * Method: DELETE URL: /wines/:id  CallBack: wines.deleteWine
*/

app.post('/wines', wines.addWine);
app.put('/wines/:id', wines.updateWine);
app.delete('/wines/:id', wines.deleteWine);


/*
 * Phase 2: 
  * Uncomment Database Connection Lines
*/
//Database Connection
mongoose.connect('mongodb://localhost/wines',(err, res) => {  
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
});
          
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
