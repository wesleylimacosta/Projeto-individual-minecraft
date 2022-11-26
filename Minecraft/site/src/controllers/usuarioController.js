


// Aqui é onde ficará uma das partes da configuração do banco de dados

var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha errado(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // A variavel a ser criada tem que fazer parte da tabela do banco de dados, ja que aqui é um dos passos para configurar o sistema de cadastro
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var ConfirmarSenha = req.body.senhaconfirmaServer;

    // Faça as validações dos valores
    if (nome == '') {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == '') {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == '' || senha != ConfirmarSenha) {
        res.status(400).send("Sua senha está undefined ou não foi confirmada corretamente!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome,email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function  RespostasQUIZ(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // A variavel a ser criada tem que fazer parte da tabela do banco de dados, ja que aqui é um dos passos para configurar o sistema de cadastro
    var parte1 = req.body.parte1Server;
    var parte2 = req.body.parte2Server;
    var parte3 = req.body.parte3Server;
    var parte4 = req.body.parte4Server;
    var parte5 = req.body.parte5Server;
    var pontos = req.body.pontosServer;
    var ID_USUARIO = req.body.ID_USUARIOServer;

    // Faça as validações dos valores
    if (parte1 == '') {
        res.status(400).send("Algum quiz não foi preenchido");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.RespostasQUIZ(parte1,parte2,parte3,parte4,parte5,pontos,ID_USUARIO)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function media(req, res) {
    // Pesquisar req.params
    usuarioModel.media()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    RespostasQUIZ,
    media,
    testar
}