const express = require("express")
const Film = require("./model")
const {Op} = require("sequelize")
const multer = require("multer")
const cloudinary = require("../cloudinary")
const {CloudinaryStorage} = require("multer-storage-cloudinary")

const router = express.Router()

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "amazonSQL",
//   },
// })

const cloudinaryMulter = multer({storage: storage})

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Film.findAll({
        where: req.query.category
          ? {name: {[Op.iLike]: "%" + req.query.category + "%"}}
          : {},
        offset: parseInt(req.query.offset) | 0,
        limit: parseInt(req.query.limit) | 10,
      })
      res.send(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await Film.create(req.body)
      res.send(newElement)
    } catch (err) {
      console.log(err)
      next(err)
    }
  })

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Film.findByPk(req.params.id)
      res.send(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Film.update(req.body, {
        returning: true,
        plain: true,
        where: {id: req.params.id},
      })
      res.send(updatedData[1])
    } catch (err) {
      console.log(err)
      next(err)
    }
  })
  .delete(async (req, res, next) => {
    try {
      Film.destroy({where: {id: req.params.id}}).then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.send("Deleted")
        } else {
          res.send("no match")
        }
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  })

router
  .route("/:filmId/upload")
  .post(cloudinaryMulter.single("image"), async (req, res, next) => {
    try {
      const Film = await Film.findByPk(req.params.filmId)
      console.log(Film.imageurl)
      Film.imageurl = req.file.path
      await Film.save()

      res.send(Film)
    } catch (err) {}
  })

module.exports = router
