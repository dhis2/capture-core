class DomLocalStorageAdapter {
    static localStorage = window.localStorage;

    static adapterName = 'DomLocalStorageAdapter';

    static isSupported() {
        return DomLocalStorageAdapter.localStorage;
    }

    constructor(options) {
        this.name = options.name;
        this.version = options.version;
        this.objectStoreNames = options.objectStore;
        this.keyPath = options.keyPath;
    }

    open() {
        
    }
}

export default DomLocalStorageAdapter;
