const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model : Product}],
    });
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id,{
      include : [{model : Product}],
    });
    if(!tagData){
      res.status(404).json({message: 'No tag found with that id'});
      return;
    }
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async(req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    }); 
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const tagData = await Tag.update({
      tag_name: req.body.tag_name},
      {where:{
        id: req.params.id,
      },
      });
    res.status(200).json({message: 'tag updated succesfully'});
    if (!tagData) {
      res.status(404).json({message: 'No tag found with that id'});
      return;
    } 
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const tagData = await Tag.destroy({
      where:{
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({message: 'No tag found with that id'});
      return;
    }
    res.status(200).json({message: 'tag deleted succesfully'});
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
