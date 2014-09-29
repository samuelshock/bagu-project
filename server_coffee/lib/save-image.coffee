###
Required modules
Defines the modules necessaries
###
fs = require 'fs'
easyimg = require 'easyimage'
uuid = require 'node-uuid'
util = require 'util'
mkdirp = require 'mkdirp'
sys = require 'sys'
Q = require 'q'

RE_SIZE_HEIGHT = 480
RE_SIZE_WIDTH = 640
BAD_REQUEST = 400

class SaveImage

  constructor: (file, statuCodes, pathUpload, pathUploadThumbs) ->
    @file = file
    @statusCodes = statuCodes
    @pathUpload = pathUpload
    @pathUploadThumbs = pathUploadThumbs

  ###
  Creates the properties of the image
  @private
  @param files [Object] is imagen file
  @return [Promise] Resolved all properties of the current imagen
  ###
  getPropImage: (files) ->
    promise = Q.defer()
    formatFile = files.uploadedFile.originalFilename.split(".").pop()
    fileName = util.format '%s.%s', uuid.v1(), formatFile
    src = util.format '%s%s%s', __dirname, @pathUpload, fileName
    dst = util.format '%s%s%s',__dirname , @pathUploadThumbs, fileName
    originPath = util.format '%s%s',__dirname, @pathUpload
    thumbPath =  util.format '%s%s',__dirname, @pathUploadThumbs
    imageProperties =
      fileName: fileName
      originPath: originPath
      thumbPath: thumbPath
      src: src
      dst: dst
      width: RE_SIZE_WIDTH
      height: RE_SIZE_HEIGHT
      gravity: "NorthWest"
      x: 0
      y: 0
      croopCoord: files.coords
    promise.resolve imageProperties
    promise.promise

  ###
  Creates all things necessary for uploading a image
  @param data [Image] is the entry file image
  @return [Promise] resolve the name of image and reject anyerror found
  ###
  createImage: (data) ->
    infoImages = {}
    promise = Q.defer()
    @getPropImage(@file)
    .then (imageProperties) =>
      @imageProperties = imageProperties
      @createFolder(@imageProperties.originPath)
    .then (path) =>
      @createFolder(@imageProperties.thumbPath)
    .then (path) =>
      @writeFile @imageProperties.src, data
    .then =>
      @reSizeFiles @imageProperties
    .then =>
      @getInfoImage @imageProperties.dst
    .then (infoDst) =>
      infoImages.resizedWidth = infoDst.width
      infoImages.resizedHeight = infoDst.height
      infoImages.infoDst = infoDst
      @getInfoImage @imageProperties.src
    .then (infoSrc) =>
      infoImages.originWidth = infoSrc.width
      infoImages.originHeight = infoSrc.height
      @cropImage(infoImages, @imageProperties, infoImages.infoDst)
    .then (image) =>
      promise.resolve @imageProperties.fileName
    .fail (msgError) ->
      error =
        statusCode: BAD_REQUEST
        message: msgError
      promise.reject error
    promise.promise


  ###
  Creates folder if do not exist
  @param path [String] Default save image path
  @return [Promise] resolve the path of folder images and
  reject if there are anyerror
  ###
  createFolder: (path) ->
    promise = Q.defer()
    mkdirp path, (error) ->
      if error
        promise.reject error
      else
        promise.resolve path
    promise.promise

  ###
  Writes file in a directory
  @param path [String] Default save image path
  @param image [Image] Current image file
  @return [Promise] resolve the path of image and
  reject if there are anyerror of 'fs' library
  ###
  writeFile: (path, image) ->
    promise = Q.defer()
    fs.writeFile path, image, (error) ->
      if error
        promise.reject error
      else
        promise.resolve path
    promise.promise

  ###
  Resizes the current image
  @param imageProperties [object] all properties of the imagen
  @return [Promise] resolve properties of the imagen and
  reject if there are anyerror of 'easyimg' library
  ###
  reSizeFiles: (imageProperties) ->
    promise = Q.defer()
    easyimg.resize imageProperties, (error) ->
      if error
        promise.reject error
      else
        promise.resolve imageProperties
    promise.promise

  ###
  Verifies if the data has a coords crop or not and execute the current
  function
  @param infoImg [Image] has all information about the an image source
  @param imgProp [Image] icontain all properties of the current image
  @param infoDst [Image] has all information about the an image target
  ###
  cropImage: (infoImg, imgProp, infoDst) ->
    if imgProp.croopCoord?
      @cropFileCoord infoImg, imgProp
    else
      @cropFile infoDst, imgProp

  ###
  Obtain all information of an image
  @param path [String] Path of image to be found
  @return [Promise] resolve all information about image and
  reject if there are anyerror of 'easyimg' library
  ###
  getInfoImage: (path) ->
    promise = Q.defer()
    easyimg.info path, (error, stdout) ->
      if error
        promise.reject error
      else
        promise.resolve stdout
    promise.promise

  ###
  Crop square image according to their properties
  @param infoImg [Object] this object has information of the image
  @param imgProp [Object] this object has properties of the imagen
  @return [Promise] resolve the image result and reject if there are anyerror
  of 'easyimg' library
  ###
  cropFile: (infoImg, imgProp) ->
    promise = Q.defer()
    sizeCrop = _lowest infoImg.width, infoImg.height
    imgProp.src = imgProp.dst
    imgProp.cropwidth = sizeCrop
    imgProp.cropheight = sizeCrop

    easyimg.rescrop imgProp, (err, image) ->
      if err
        promise.reject error
      else
        promise.resolve image
    promise.promise

  ###
  Crop an image based on coordinates
  @param infoImg [object] this object has information of the image
  @param imgProp [object] this object has properties of the imagen
  @return [Promise] resolve the image result and reject if there are anyerror
  of 'easyimg' library
  ###
  cropFileCoord: (infoImg, imgProp) ->
    promise = Q.defer()
    imgProp.src = imgProp.dst
    x1 = imgProp.croopCoord.x1
    y1 = imgProp.croopCoord.y1
    x2 = imgProp.croopCoord.x2
    y2 = imgProp.croopCoord.y2
    imgProp.x = parseInt (x1 * infoImg.resizedWidth) / infoImg.originWidth
    imgProp.y = parseInt (y1 * infoImg.resizedHeight) / infoImg.originHeight
    x2 = parseInt (x2 * infoImg.resizedWidth) / infoImg.originWidth
    y2 = parseInt (y2 * infoImg.resizedHeight) / infoImg.originHeight
    imgProp.cropwidth = x2 - imgProp.x
    imgProp.cropheight = y2 -  imgProp.y
    easyimg.crop imgProp, (err, image) ->
      if err
        promise.reject error
      else
        promise.resolve image
    promise.promise

  ###
  Obtains the lower side of an image
  @private
  @param width [Number] is a width to the image
  @param height [Number] is a heigth to the image
  @return [Int] return height if the entry height is less than entry width
  otherwise return width
  ###
  _lowest = (width, height) ->
    if width>height then height else width

  ###
  Delete image
  @param idImage [String] name of image
  @return [Promise] resolve the id image and reject if there are anyerror of
  'easyimg' library
  ###
  deleteImage: (idImage) ->
    promise = Q.defer()
    src = util.format '%s%s%s', __dirname, @pathUpload, idImage
    srcThumbs = util.format '%s%s%s',__dirname , @pathUploadThumbs, idImage
    fs.unlink src, (errorImage) ->
      fs.unlink srcThumbs, (errorThumbs) ->
        if !errorImage && !errorThumbs
          promise.resolve idImage
        else
          promise.reject 'Error at delete origi Imange', errorImage?.message
          promise.reject 'Error at delete Imange thumbs', errorThumbs?.message

    promise.promise

# > Export a class
module.exports = SaveImage