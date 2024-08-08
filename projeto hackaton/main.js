let verificaEmail = "", verificaSenha = "", verificaConfirmaSenha = "", usuariosRegistrados = "", log = ""
let nomeFormu, emailFormu, cpfFormu, telFormu, parcelaFormu
let textoComprovante

function verificaRegistro(){
    verificaEmail = document.getElementById("gmail").value
    verificaSenha = document.getElementById("senha").value
    verificaConfirmaSenha = document.getElementById("confirmaSenha").value


    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {}; // Obte os usuários registrados
    if(verificaEmail != "" && verificaSenha != "" && verificaConfirmaSenha != ""){
        if (usuariosRegistrados.hasOwnProperty(verificaEmail)) {
            document.getElementById("aviso").innerHTML = `O email ${verificaEmail} já foi cadastrado!`

        } else if (verificaSenha != verificaConfirmaSenha) {
            document.getElementById("aviso").innerHTML = `As senhas não são iguais. Tente novamente!`
        } else {
            let email = []
            for(let i = 0; i < verificaEmail.length; i++){
                email[i] = verificaEmail[i]
            }
            if(!email.includes('@' && '.')){
                document.getElementById("aviso").innerHTML = `é necessário um email valido!`
            }else{
                registrar(verificaEmail, verificaSenha)
                alert(`O email ${verificaEmail} foi cadastrado com sucesso!`)
                window.location.href = "login.html"
            } 
        }
    }else{
        document.getElementById("aviso").innerHTML = `Preencha todos os campos!`
    }
}

function registro(){
    window.location.href = "registro.html"
}



function registrar(emailUsuario, senhaUsuario) {

    usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {}; // Verificar se já existe algum dado armazenado para evitar sobrescrever


    usuariosRegistrados[emailUsuario] = { // Adicionar o novo usuário
        email: emailUsuario,
        senha: senhaUsuario
    };
    localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
}

function login(){
    window.location.href = "login.html"
}

function verificarLogin() {
    let emailDigitado = "", senhaDigitada = ""
    emailDigitado = document.getElementById("mail").value; // Obtem os dados de usuários registrados
    senhaDigitada = document.getElementById("pass").value; // Obtem os dados de usuários registrados


    usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {};


    if (usuariosRegistrados.hasOwnProperty(emailDigitado)) { // Verificar se o email do usuário existe nos email registrados
        if(localStorage.getItem("usuarioLogado")){
            document.getElementById("respLogin").innerHTML = `Você já está logado!`
            document.getElementById("pass").value = ""
            document.getElementById("mail").value = ""
            
        }else{
            if (usuariosRegistrados[emailDigitado].senha === senhaDigitada){  // Verificar se a senha corresponde ao email fornecido
                alert(`Login bem-sucedido, Bem vindo(a) ${emailDigitado}!`)
                let nome = nomeUsuario(emailDigitado)
                localStorage.setItem("usuarioLogado", nome)
                window.location.href = "index.html"
            }else{
                document.getElementById("respLogin").innerHTML = `Senha incorreta, digite novamente!`
                
            }
        }
    } else {
        document.getElementById("respLogin").innerHTML = `O email: ${emailDigitado} não possue uma conta ainda!`
    }
}

function mostraLogin() {

    let senhaInput = document.getElementById("pass")
    if (senhaInput.type === "password") {
        senhaInput.type = "text"
        document.querySelector("button").textContent = "Ocultar Senha"
    } else {
        senhaInput.type = "password"
        document.querySelector("button").textContent = "Mostrar Senha"
    }
}

function mostraRegistro(){
    let senhaInput = document.getElementById("senha")
    let confirmaSenhaInput = document.getElementById("confirmaSenha")
    if (senhaInput.type === "password" && confirmaSenhaInput.type === "password") {
        senhaInput.type = "text"
        confirmaSenhaInput.type = "text"
        document.querySelector("button").textContent = "Ocultar Senha"
    } else {
        senhaInput.type = "password"
        confirmaSenhaInput.type = "password"
        document.querySelector("button").textContent = "Mostrar Senha"
    }
}

function recuperaSenha(){
    let emailRecupera = document.getElementById("mail").value
    if(emailRecupera == ""){
        alert("Digite um email na opção E-mail")
    }else{
        usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || {};


        if (!usuariosRegistrados.hasOwnProperty(emailRecupera)) {
            alert("o email nao foi registrado")
        }else{
            let text = `Realmente deseja redefinir a senha do email ${emailRecupera}`
            if(confirm(text)){
                let senhaRedifinida = ""
                senhaRedifinida = prompt("Digite sua nova senha")
                    usuariosRegistrados[emailRecupera] = {
                        email: emailRecupera,
                        senha: senhaRedifinida
                    }
                localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados))
            }
        }  
    }   
}

function nomeUsuario(emailNome){
    return emailNome.slice(0, -10)
}


function bemVindo() {
    let nomeUs = localStorage.getItem("nome");
    let bios = localStorage.getItem("bio");
    let emailPerfil = localStorage.getItem("emailPerfil")
    let x = localStorage.getItem("x")
    let tel = localStorage.getItem("telefone")
    let insta =  localStorage.getItem("insta")
    const savedImage = localStorage.getItem('ftPerfil');

    // Atualiza o nome do usuário
    if (nomeUs && nomeUs.trim() !== "") {
        document.getElementById("nomeTitulo").innerHTML = `Perfil de ${nomeUs}`;
        document.getElementById("nomePrincipal").innerHTML = `Perfil de ${nomeUs}`;
        document.getElementById("nomePerfil").innerHTML = `${nomeUs}`;
    } else {
        document.getElementById("nomeTitulo").innerHTML = `Perfil de [Seu Nome]`;
        document.getElementById("nomePrincipal").innerHTML = `Perfil de [Seu Nome]`;
        document.getElementById("nomePerfil").innerHTML = `[Seu Nome]`;
    }

    if(emailPerfil){
        document.getElementById("emailPerfil").innerHTML = emailPerfil
    }else{
        "[seuemail@example.com]"
    }

    if(x){
        document.getElementById("x").innerHTML = x
    }else{
        document.getElementById("x").innerHTML = "[Seu Twitter]"
    }

    if(tel){
        document.getElementById("telefone").innerHTML = tel
    }else{
        document.getElementById("telefone").innerHTML = "[Seu número de telefone]"
    }

    if(insta){
        document.getElementById("insta").innerHTML = insta
    }else{
        document.getElementById("insta").innerHTML = "[Seu Instagram]"
    }

    // Atualiza a descrição do usuário
    if (bios && bios.trim() !== "") {
        document.getElementById("descricao").innerHTML = `${bios}`;
    } else {
        document.getElementById("descricao").innerHTML = `[Conte um pouco mais sobre você, seus interesses, e suas experiências]`;
    }

    // Atualiza a imagem do perfil
    if (savedImage && savedImage.trim() !== "") {
        displayImageFromLocalStorage('ftPerfil', 'imgPerfil'); // Certifique-se de que 'imgPerfil' é o ID correto do elemento de imagem
        document.getElementById("imgPerfil").removeAttribute('hidden')
    } else {
        console.log('Nenhuma imagem salva encontrada no Local Storage.');
    }
}

function displayImageFromLocalStorage(chave, imgElementId) {
    const dataURL = localStorage.getItem(chave);
    if (dataURL) {
        const imgElement = document.getElementById(imgElementId);
        imgElement.src = dataURL;
    } else {
        console.log('Nenhuma imagem encontrada para a chave fornecida.');
    }
}

document.addEventListener('DOMContentLoaded', bemVindo)

function mudarNome(){
    let nomeUsu = prompt("digite seu nome")
    if(nomeUsu != "" && nomeUsu != null){
        localStorage.setItem("nome", nomeUsu)
        document.getElementById("nomeTitulo").innerHTML = `Perfil de ${nomeUsu}`
        document.getElementById("nomePrincipal").innerHTML = `Perfil de ${nomeUsu}`
        document.getElementById("nomePerfil").innerHTML = `${nomeUsu}`
    }else{
        document.getElementById("nomeTitulo").innerHTML = `Perfil de [Seu Nome]`
        document.getElementById("nomePrincipal").innerHTML = `Perfil de [Seu Nome]`
        document.getElementById("nomePerfil").innerHTML = `[Seu Nome]`
    }
}



function mudarBio(){
    let bio = prompt("Conte um pouco mais sobre você")
    if(bio != "" && bio != null){
        localStorage.setItem("bio", bio)
        document.getElementById("descricao").innerHTML = `${bio}`
    }else{
        document.getElementById("nomeTitulo").innerHTML = `[Conte um pouco mais sobre você, seus interesses, e suas experiências]`
    }
}

function sair(){
    localStorage.removeItem("usuarioLogado") // Remove o nome do usuário logado do Local Storage
    alert("Você saiu da sua conta com sucesso!")
    window.location = "login.html"
}


const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");

inputFile.addEventListener("change", function (e) {
    const file = e.target.files[0];
    
    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function (e) {
            const dataURL = e.target.result;

            // Atualiza a imagem exibida na página
            const img = document.createElement("img");
            img.src = dataURL;
            img.classList.add("picture__img");

            pictureImage.innerHTML = ""; // Limpa o conteúdo atual
            pictureImage.appendChild(img);
            // Armazena o Data URL no localStorage
            storeImageInLocalStorage(dataURL, 'ftPerfil');
        });

        reader.readAsDataURL(file);
    }
});

function storeImageInLocalStorage(dataURL, chave) {
    localStorage.setItem(chave, dataURL);
}


function mudarEmail(){
    let emailMudado = prompt("Digite seu novo email")
    document.getElementById("emailPerfil").innerHTML = emailMudado
    localStorage.setItem("emailPerfil", emailMudado)
}

function mudarTel(){
    let tel = prompt("Digite seu telefone")
    document.getElementById("telefone").innerHTML = tel
    localStorage.setItem("telefone", tel)
}

function mudarInsta(){
    let insta = prompt("Digite seu instagram")
    document.getElementById("insta").innerHTML = insta
    localStorage.setItem("insta", insta)
}

function mudarX(){
    let x = prompt("Digite seu Twitter")
    document.getElementById("x").innerHTML = x
    localStorage.setItem("x", x)
}


function verificaPerfil(){
    let log = localStorage.getItem("usuarioLogado")
    if(log){
        window.location.href = "perfil.html"
    }else{
        window.location.href = "login.html"
    }
}