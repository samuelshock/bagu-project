
/*
Required modules
Defines the modules necessaries
 */

(function() {
  var BAD_REQUEST, Q, RE_SIZE_HEIGHT, RE_SIZE_WIDTH, SaveImage, easyimg, fs, mkdirp, sys, util, uuid;

  fs = require('fs');

  easyimg = require('easyimage');

  uuid = require('node-uuid');

  util = require('util');

  mkdirp = require('mkdirp');

  sys = require('sys');

  Q = require('q');

  RE_SIZE_HEIGHT = 480;

  RE_SIZE_WIDTH = 640;

  BAD_REQUEST = 400;

  SaveImage = (function() {
    var _lowest;

    function SaveImage(file, statuCodes, pathUpload, pathUploadThumbs) {
      this.file = file;
      this.statusCodes = statuCodes;
      this.pathUpload = pathUpload;
      this.pathUploadThumbs = pathUploadThumbs;
    }


    /*
    Creates the properties of the image
    @private
    @param files [Object] is imagen file
    @return [Promise] Resolved all properties of the current imagen
     */

    SaveImage.prototype.getPropImage = function(files) {
      var dst, fileName, formatFile, imageProperties, originPath, promise, src, thumbPath;
      promise = Q.defer();
      formatFile = files.uploadedFile.originalFilename.split(".").pop();
      fileName = util.format('%s.%s', uuid.v1(), formatFile);
      src = util.format('%s%s%s', __dirname, this.pathUpload, fileName);
      dst = util.format('%s%s%s', __dirname, this.pathUploadThumbs, fileName);
      originPath = util.format('%s%s', __dirname, this.pathUpload);
      thumbPath = util.format('%s%s', __dirname, this.pathUploadThumbs);
      imageProperties = {
        fileName: fileName,
        originPath: originPath,
        thumbPath: thumbPath,
        src: src,
        dst: dst,
        width: RE_SIZE_WIDTH,
        height: RE_SIZE_HEIGHT,
        gravity: "NorthWest",
        x: 0,
        y: 0,
        croopCoord: files.coords
      };
      promise.resolve(imageProperties);
      return promise.promise;
    };


    /*
    Creates all things necessary for uploading a image
    @param data [Image] is the entry file image
    @return [Promise] resolve the name of image and reject anyerror found
     */

    SaveImage.prototype.createImage = function(data) {
      var infoImages, promise;
      infoImages = {};
      promise = Q.defer();
      this.getPropImage(this.file).then((function(_this) {
        return function(imageProperties) {
          _this.imageProperties = imageProperties;
          return _this.createFolder(_this.imageProperties.originPath);
        };
      })(this)).then((function(_this) {
        return function(path) {
          return _this.createFolder(_this.imageProperties.thumbPath);
        };
      })(this)).then((function(_this) {
        return function(path) {
          return _this.writeFile(_this.imageProperties.src, data);
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.reSizeFiles(_this.imageProperties);
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.getInfoImage(_this.imageProperties.dst);
        };
      })(this)).then((function(_this) {
        return function(infoDst) {
          infoImages.resizedWidth = infoDst.width;
          infoImages.resizedHeight = infoDst.height;
          infoImages.infoDst = infoDst;
          return _this.getInfoImage(_this.imageProperties.src);
        };
      })(this)).then((function(_this) {
        return function(infoSrc) {
          infoImages.originWidth = infoSrc.width;
          infoImages.originHeight = infoSrc.height;
          return _this.cropImage(infoImages, _this.imageProperties, infoImages.infoDst);
        };
      })(this)).then((function(_this) {
        return function(image) {
          return promise.resolve(_this.imageProperties.fileName);
        };
      })(this)).fail(function(msgError) {
        var error;
        error = {
          statusCode: BAD_REQUEST,
          message: msgError
        };
        return promise.reject(error);
      });
      return promise.promise;
    };


    /*
    Creates folder if do not exist
    @param path [String] Default save image path
    @return [Promise] resolve the path of folder images and
    reject if there are anyerror
     */

    SaveImage.prototype.createFolder = function(path) {
      var promise;
      promise = Q.defer();
      mkdirp(path, function(error) {
        if (error) {
          return promise.reject(error);
        } else {
          return promise.resolve(path);
        }
      });
      return promise.promise;
    };


    /*
    Writes file in a directory
    @param path [String] Default save image path
    @param image [Image] Current image file
    @return [Promise] resolve the path of image and
    reject if there are anyerror of 'fs' library
     */

    SaveImage.prototype.writeFile = function(path, image) {
      var promise;
      promise = Q.defer();
      fs.writeFile(path, image, function(error) {
        if (error) {
          return promise.reject(error);
        } else {
          return promise.resolve(path);
        }
      });
      return promise.promise;
    };


    /*
    Resizes the current image
    @param imageProperties [object] all properties of the imagen
    @return [Promise] resolve properties of the imagen and
    reject if there are anyerror of 'easyimg' library
     */

    SaveImage.prototype.reSizeFiles = function(imageProperties) {
      var promise;
      promise = Q.defer();
      easyimg.resize(imageProperties, function(error) {
        if (error) {
          return promise.reject(error);
        } else {
          return promise.resolve(imageProperties);
        }
      });
      return promise.promise;
    };


    /*
    Verifies if the data has a coords crop or not and execute the current
    function
    @param infoImg [Image] has all information about the an image source
    @param imgProp [Image] icontain all properties of the current image
    @param infoDst [Image] has all information about the an image target
     */

    SaveImage.prototype.cropImage = function(infoImg, imgProp, infoDst) {
      if (imgProp.croopCoord != null) {
        return this.cropFileCoord(infoImg, imgProp);
      } else {
        return this.cropFile(infoDst, imgProp);
      }
    };


    /*
    Obtain all information of an image
    @param path [String] Path of image to be found
    @return [Promise] resolve all information about image and
    reject if there are anyerror of 'easyimg' library
     */

    SaveImage.prototype.getInfoImage = function(path) {
      var promise;
      promise = Q.defer();
      easyimg.info(path, function(error, stdout) {
        if (error) {
          return promise.reject(error);
        } else {
          return promise.resolve(stdout);
        }
      });
      return promise.promise;
    };


    /*
    Crop square image according to their properties
    @param infoImg [Object] this object has information of the image
    @param imgProp [Object] this object has properties of the imagen
    @return [Promise] resolve the image result and reject if there are anyerror
    of 'easyimg' library
     */

    SaveImage.prototype.cropFile = function(infoImg, imgProp) {
      var promise, sizeCrop;
      promise = Q.defer();
      sizeCrop = _lowest(infoImg.width, infoImg.height);
      imgProp.src = imgProp.dst;
      imgProp.cropwidth = sizeCrop;
      imgProp.cropheight = sizeCrop;
      easyimg.rescrop(imgProp, function(err, image) {
        if (err) {
          return promise.reject(error);
        } else {
          return promise.resolve(image);
        }
      });
      return promise.promise;
    };


    /*
    Crop an image based on coordinates
    @param infoImg [object] this object has information of the image
    @param imgProp [object] this object has properties of the imagen
    @return [Promise] resolve the image result and reject if there are anyerror
    of 'easyimg' library
     */

    SaveImage.prototype.cropFileCoord = function(infoImg, imgProp) {
      var promise, x1, x2, y1, y2;
      promise = Q.defer();
      imgProp.src = imgProp.dst;
      x1 = imgProp.croopCoord.x1;
      y1 = imgProp.croopCoord.y1;
      x2 = imgProp.croopCoord.x2;
      y2 = imgProp.croopCoord.y2;
      imgProp.x = parseInt((x1 * infoImg.resizedWidth) / infoImg.originWidth);
      imgProp.y = parseInt((y1 * infoImg.resizedHeight) / infoImg.originHeight);
      x2 = parseInt((x2 * infoImg.resizedWidth) / infoImg.originWidth);
      y2 = parseInt((y2 * infoImg.resizedHeight) / infoImg.originHeight);
      imgProp.cropwidth = x2 - imgProp.x;
      imgProp.cropheight = y2 - imgProp.y;
      easyimg.crop(imgProp, function(err, image) {
        if (err) {
          return promise.reject(error);
        } else {
          return promise.resolve(image);
        }
      });
      return promise.promise;
    };


    /*
    Obtains the lower side of an image
    @private
    @param width [Number] is a width to the image
    @param height [Number] is a heigth to the image
    @return [Int] return height if the entry height is less than entry width
    otherwise return width
     */

    _lowest = function(width, height) {
      if (width > height) {
        return height;
      } else {
        return width;
      }
    };


    /*
    Delete image
    @param idImage [String] name of image
    @return [Promise] resolve the id image and reject if there are anyerror of
    'easyimg' library
     */

    SaveImage.prototype.deleteImage = function(idImage) {
      var promise, src, srcThumbs;
      promise = Q.defer();
      src = util.format('%s%s%s', __dirname, this.pathUpload, idImage);
      srcThumbs = util.format('%s%s%s', __dirname, this.pathUploadThumbs, idImage);
      fs.unlink(src, function(errorImage) {
        return fs.unlink(srcThumbs, function(errorThumbs) {
          if (!errorImage && !errorThumbs) {
            return promise.resolve(idImage);
          } else {
            promise.reject('Error at delete origi Imange', errorImage != null ? errorImage.message : void 0);
            return promise.reject('Error at delete Imange thumbs', errorThumbs != null ? errorThumbs.message : void 0);
          }
        });
      });
      return promise.promise;
    };

    return SaveImage;

  })();

  module.exports = SaveImage;

}).call(this);

//# sourceMappingURL=save-image.js.map
