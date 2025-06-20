
function onChangeEmail() {

    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisable();

}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {

    validatePasswordMatch();
    toggleRegisterButtonDisable();
}

function validatePasswordMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display = 
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButtor().disabled = !isFormvalid();
}

//essa functio retorna um promisser, entao usar a function reduzida .then (() =>...)
function register() {
    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        window.location.href = "../../home.html";
    }).catch(error => {
        alert("Usuario ja cadastrado");
    })
}

function getErrorMessage(){
    return;
}

function isFormvalid() {
    const email = form.email().value;

    if(!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;

    if(!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;

    if(password != confirmPassword) {
        return false;
    }

    return true;
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),

    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),

    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doenst-match-error'),

    registerButtor: () => document.getElementById('register-button')
    
    }