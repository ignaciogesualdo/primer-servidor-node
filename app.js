const express = require('express')
const multer  = require('multer')
const sharp = require('sharp')
const fs = require('fs')

const storageStrategy = multer.memoryStorage()
const upload = multer({ storage: storageStrategy })

const app = express()

app.use(express.json())

app.get('/' , function(req, res) {

    res.send('Hola mundo desde HEROKU!')
})

app.post('/imagen', upload.single('imagen') , async function (req, res) {

    const imagen = req.file

    const processedImage = sharp(imagen.buffer)

    const resizedImage = processedImage.resize(800, 800, {
        fit: "contain",
        background: "#FFF"
    })

    const resizedImageBuffer = await resizedImage.toBuffer()

    fs.writeFileSync('nuevaruta/prueba.png', resizedImageBuffer)

    console.log(resizedImageBuffer)

    res.send({ resizedImage: resizedImageBuffer})

})

const PORT = process.env.PORT || 4000


app.listen(PORT, function() {

    console.log("Servidor escuchando en el puerto", PORT)
})

