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

var Wine = require('../models/wine');

//Phase 1
exports.findAll = (req, res) => {
    
    console.log('All Wines Request');
    //Modified the res.send code to return two JSON Objects 
    //res.send([{"id":"ID", "name":"nombre", "description":"DESCRIPCION"}, {"id":"ID2", "name":"nombre2", "description":"DESCRIPCION2"}]);

    /*
     *Put Phase2 Code here.
     */ 

    Wine.find().then(wines => {
        res.status(200).jsonp(wines);
    }).catch(err => {
        res.status(500).send(err.message)
    });

};

exports.findById = (req, res) => {

    console.log('ID: '+req.params.id+' Wine Request');
    //Modified the res.send line to send a JSON Object with the requested ID. 
    //res.send({"id":req.params.id, "name":"nombre", "description":"DESCRIPCION"});    

    Wine.findById(req.params.id).then(wine => {
        res.status(200).jsonp(wine);
    }).catch(err => {
        res.status(500).send(err.message)
    })
    /*
     * The next code is for Phase 2.
     * 
     * Modified this method to return one specific wine from collection.
     * You have to use the method findById which has the next syntaxis:
     *      findById(id, callback(err, result))
     *   
     */                            

};

/*
* The next code is for Phase 2.
* 
*  Create the methods:
*    addWine
*    deleteWine
*    updateWine
*    
*  Some hints about this tree method are in HomeWork document.
*/

exports.addWine = (req, res) => {
  let newWine = new Wine({
      ...req.body
  });

  newWine.save((err, addedElement) => {
    if(err) res.status(500).send(err.message);
    res.status(200).jsonp(addedElement);
  });

}

exports.deleteWine = (req, res) => {
  Wine.findByIdAndRemove(req.params.id).then((wine) => {
    res.status(200).send(wine);
  }).catch(err => {
    res.status(500).send(err);
  })
}

exports.updateWine = (req, res) => {
  let updateWine = { ...req.body }
  Wine.findByIdAndUpdate(req.params.id, updateWine).then(updated => {
    res.status(200).send(updated);
  }).catch(err => {
    res.status(500).send(err.message);
  })
}

          