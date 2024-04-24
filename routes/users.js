var express = require('express');
var router = express.Router();
const User = require('../model/User');


const users = [
  {id: 1, nome: "Ana", email: "ana@a.com"},
  {id: 2,nome: "Julio", email: "j@a.com"},
  {id: 3, nome: "Mauro", email:"mauro@a.com"},
  {id: 4, nome: "Mateus", email: "mateus@a.com"}
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/", function(req, res){
  console.log("Obter todos");
  res.json(users);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params)

  var user = users.find(e => e.id === id);

  return user 
   ? res.json(user)
   : res.status(404).json({message: "id inválido"});

});


router.post("/", async (req, res) => {
  const json = req.body;

  const user = new User(json);

  const hasErrors = user.validateSync();

  return hasErrors
    ? res.status(400).json(hasErrors)
    : res.status(201).json(await user.save());

});


module.exports = router;
