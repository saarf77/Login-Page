'use strict'

// use local storgae inside my device, add them
function saveToStorage(key, val) {
    const str = JSON.stringify(val)
    localStorage.setItem(key, str)
}

function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    return JSON.parse(str)
}

function getAllStorage() {
    var allStorage = new Array ()
    for (let i = 0; i < localStorage.length; i++) {
        const str = localStorage.getItem(localStorage.key(i))
        allStorage.push(JSON.parse(str))
    }
    return allStorage
}