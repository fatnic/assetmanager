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

} 