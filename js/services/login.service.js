'use strict'
var gUsers = new Array()
var Sorting = ""

function _createUsers() {
    gUsers.push({
        id: 'u101',
        username: 'puki',
        password: 'secret',
        lastLoginTime: 1601891998864,
        isAdmin: true
    })
    gUsers.push({
        id: 'u102',
        username: 'saar',
        password: 'fridman',
        lastLoginTime: 1601891998864,
        isAdmin: true
    })
    gUsers.push({
        id: 'u103',
        username: 'hasel',
        password: 'thebazel',
        lastLoginTime: 1601891998864,
        isAdmin: false
    })


}

//  saves the users to localStorage
function _saveUsers() {
    for (let i = 0; i < gUsers.length; i++) {
        var currKey = gUsers[i].username + gUsers[i].password
        saveToStorage(currKey, gUsers[i])
    }
}

// returns users by the current sorting
function getUsersToShow() {
    var currStorageInfo = getAllStorage()
    if (Sorting === "Name") {
        currStorageInfo.sort((a, b) => {
            const nameA = a.username.toUpperCase(); // ignore upper and lowercase
            const nameB = b.username.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    }
    else if (Sorting === "Last Login") {
        currStorageInfo.sort((a, b) => {
            a.lastLoginTime - b.lastLoginTime
        });
    }
    // console.log(currStorageInfo)
    return currStorageInfo

}

//the function should return the user object if found or null if not
// (HINT: use array.find)
//If the user successfully log-in, update his lastLoginDate
//Also save the loggedinUser to localStorage

function doLogin(userName, password) {
    var currKey = userName + password
    console.log('currname', currKey);
    var currentUser = loadFromStorage(currKey)
    if (currentUser === null) {
        return null
    }
    console.log('currUser', currentUser);
    currentUser.lastLoginTime = Date.now()
    saveToStorage(currKey, currentUser)
    return currentUser
}


function renderBoard(selector) {
    var strHTML = ``
    var currStorageInfo = getUsersToShow()
    for (let i = 0; i < currStorageInfo.length; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < 4; j++) {
            var currCell
            switch (j) {
                case 0:
                    currCell = currStorageInfo[i].username
                    break;
                case 1:
                    currCell = currStorageInfo[i].password
                    break;
                case 2:
                    currCell = currStorageInfo[i].lastLoginTime
                    break;
                case 3:
                    currCell = currStorageInfo[i].isAdmin
                    break;
                default:
                    break;
            }



            strHTML += `<td class="cell" onclick="cellClicked(this,${i},${j})" 
        oncontextmenu="cellMarked(this,${i},${j}), event.preventDefault();">${currCell}</td>`
        }
        strHTML += `</tr>`
    }
    var elBoard = document.querySelector(selector)
    elBoard.innerHTML = strHTML
}

function onSetFilter(value) {

    switch (value) {
        case 'Name':
            Sorting = 'Name'
            renderBoard(".board")
            break;
        case 'Last Login':
            Sorting = 'Last Login'
            renderBoard(".board")
            break;

        default:
            break;
    }
}