var express = require('express');
var router = express.Router();
const User = require('../model/User');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/", async function(req, res){
  return await res.json(User.find());
});

router.get("/:id", async (req, res) => {
  const {id} = req.params;

  const result = await User.findById(id);
  return result
    ? res.json(result)
    : res.status(404).send();
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
