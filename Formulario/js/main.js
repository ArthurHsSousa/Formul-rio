'use strict';

const deleteForm = async(endereco) =>{
    document.getElementById('address').value ="";
    document.getElementById('neighborhood').value = "";
    document.getElementById('city').value = "";
    document.getElementById('state').value = "";
}

const completeForm = async(endereco) =>{
    document.getElementById('address').value = endereco.logradouro;
    document.getElementById('neighborhood').value = endereco.bairro;
    document.getElementById('city').value = endereco.localidade;
    document.getElementById('state').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const validaCep = (cep) => cep.length == 8 && eNumero(cep);

const pesquisaCep = async () =>{
    deleteForm();
    const cep = document.getElementById('cep').value;
    const url =`https://viacep.com.br/ws/${cep}/json/`;

    if(validaCep(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if(endereco.hasOwnProperty('erro')){
            document.getElementById('address').value = "CEP não existe!";
        }else{
            completeForm(endereco);
        }
    }else{
        document.getElementById('address').value = "CEP incorreto!";
    }
    
}

document.getElementById('cep').addEventListener('focusout', pesquisaCep);