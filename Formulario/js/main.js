'use strict'; //Modo restrirto de programação

const deleteForm = async(endereco) =>{ // Apaga as informações dos input's a cada nova pesquisa do CEP
    document.getElementById('address').value ="";
    document.getElementById('neighborhood').value = "";
    document.getElementById('city').value = "";
    document.getElementById('state').value = "";
}

const completeForm = async(endereco) =>{ // Completa as informações que foram validadas do CEP
    document.getElementById('address').value = endereco.logradouro;
    document.getElementById('neighborhood').value = endereco.bairro;
    document.getElementById('city').value = endereco.localidade;
    document.getElementById('state').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero); // Valida se todos os caractéres da variável (cep) são números
const validaCep = (cep) => cep.length == 8 && eNumero(cep); // Valida se a variável (cep) tem oito caractéres e se todos são números

const pesquisaCep = async () =>{ //Pesquisa o CEP
    deleteForm();
    const cep = document.getElementById('cep').value;
    const url =`https://viacep.com.br/ws/${cep}/json/`;

    if(validaCep(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if(endereco.hasOwnProperty('erro')){ // Essa condição serve para ver se a pesquisa do CEP obteve a propriedade 'erro', caso sim aparece a mensagem de erro, caso não preenche o formulário
            document.getElementById('address').value = "CEP não existe!";
        }else{
            completeForm(endereco);
        }
    }else{
        document.getElementById('address').value = "CEP incorreto!";
    }
    
}

document.getElementById('cep').addEventListener('focusout', pesquisaCep); // Faz a função quando tira o foco fo input (cep)