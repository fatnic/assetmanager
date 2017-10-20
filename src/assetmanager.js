class AssetManager {

  constructor() {
    this._queue = []
    this._successCount = 0
    this._errorCount = 0
    this._cache = {}
  }

  add(path) {
    this._queue.push(path)
  }

  downloadAll(callback) {

    if (this._queue.length === 0) callback()

    for (let i = 0; i < this._queue.length; i++) {
      let path = this._queue[i]
      let ext = path.split('.').pop()

      switch (ext) {
        case 'png':
        case 'jpg':
        case 'jpeg':
          this._loadImage(path, callback)
          break

        case 'json':
          this._loadJSON(path, callback)
          break

        default:
          console.log('AssetManager: Unknown filetype')
          break
      }

    }

  }

  get(key) {
    return this._cache[key]
  }

  _isDone() {
    return this._queue.length == this._successCount + this._errorCount
  }
  
  _loadImage(path, callback) {
    let img = new Image()

    img.addEventListener('load', () => {
      this._successCount++
      if (this._isDone()) { callback() }
    }, false)

    img.addEventListener('error', () => {
      this._errorCount++
      if (this._isDone()) { callback() }
    })

    img.src = path
    this._cache[path] = img
  } 

  _loadJSON(path, callback) {

  }

} 

if (typeof module != 'undefined' && module.exports) module.exports = AssetManager