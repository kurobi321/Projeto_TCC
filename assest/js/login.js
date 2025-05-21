//Function de validade de email
//Javascript e formado basicamente por functions

//metodo que verifica com frequencia a conexao com o sistema de login
firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        window.location.href = "index.html";
    }
})


//Function que que chama as outras funcoes e desabilita os BT
function onChangeEmail() {
    
    toggleButtonsDisable();
    toggleEmailErrors();
}

//Criar essa function para separar as mensagens de erro
function onChangePassword() {

    toggleButtonsDisable();
    togglePasswordErrors();
}
//Funcao para navegar nas paginas
function login() {
   
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        window.location.href = "index.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}
function register() {
    window.location.href = "cadastro.html"; 
}
function getErrorMessage(error) {
    if(error.code == "auth/invalid-credential") {
        return "Usuário não encontrado";
    }
    if(error.code == "auth/invalid-credential") {
        return "Senha inválida";
    }
    return error.message;
}

function recoverPassword() {
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        alert("Email enviado com sucesso");
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

//Exibir mensagem de erro
function toggleEmailErrors() {

    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    
}

//Function que mostra erro de password
function togglePasswordErrors() {

    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

//Alternar BT 
function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

//Function de validade de email
function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

//Function de validade de password
function isPasswordValid() {
   return form.password().value ? true : false;
}

//criando uma arrow Function para simplificar o codigo
const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-invalid-error'),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
}
