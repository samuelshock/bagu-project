
/*
A key-value pair map collection.
 */

(function() {
  var Map,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Map = (function() {

    /*
    Instanciates a Map object
     */
    function Map() {
      this.exists = __bind(this.exists, this);
      this.data = {};
    }


    /*
    Sets a key-value pair map
    @param key [string] The key
    @param value [object] The value
     */

    Map.prototype.set = function(key, value) {
      return this.data[key] = value;
    };


    /*
    Gets the value for the specified key
    @param key [string] The key for which to get the value
     */

    Map.prototype.get = function(key) {
      return this.data[key];
    };


    /*
    Removes a value specified by key
    @param key [string] The specified key
     */

    Map.prototype.remove = function(key) {
      return delete this.data[key];
    };


    /*
    Gets the index of the specified key
    @param key [string] The specified key
    @return [number] The index of the specified key. -1 if the key cannot be found
     */

    Map.prototype.indexOf = function(key) {
      var index, indexOf, key1, _i, _len, _ref;
      indexOf = -1;
      index = 0;
      _ref = this.keys();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key1 = _ref[_i];
        if (key1 === key) {
          indexOf = index;
          break;
        }
        index++;
      }
      return indexOf;
    };


    /*
    Verifies the existence of key in the collection
    @param key [string] The key
    @return [boolean] true if the key exists; otherwise, false
     */

    Map.prototype.exists = function(key) {
      return this.data[key] != null;
    };


    /*
    Gets the keys collection associated to this map
    @return [Array[string]] The keys collection
     */

    Map.prototype.keys = function() {
      return Object.keys(this.data);
    };


    /*
    Clears the contents of the map
    @return [undefined]
     */

    Map.prototype.clear = function() {
      this.data = {};
    };


    /*
    Gets the length of the map
    @return [number] The length of the map
     */

    Map.prototype.length = function() {
      return this.keys().length;
    };


    /*
    Verifies if the map is empty
    @return [boolean] true if map is empty; otherwise, false
     */

    Map.prototype.isEmpty = function() {
      var key, _i, _len, _ref;
      _ref = this.keys();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        return false;
      }
      return true;
    };

    return Map;

  })();

  module.exports = Map;

}).call(this);

//# sourceMappingURL=map.js.map
