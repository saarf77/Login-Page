'use strict'

function onInit() {
    _createUsers()
    _saveUsers()
}

function onInitAdmin() {
    renderBoard('.board')
}

function onClickLogin() {
    var elUserName = document.getElementById('username')
    var elPassword = document.getElementById('password')
    var currUserName = elUserName.value
    var currPassword = elPassword.value
    var isUser = doLogin(currUserName, currPassword)
    if (isUser === null) {
        alert('Wrong user name or password')
        return
    }
    var elForm = document.getElementById('form')
    if (isUser.isAdmin) {
        elForm.action = "admin.html"

    } else {

        elForm.action = "user_page.html"
    }

}




