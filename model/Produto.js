const Sequelize = require('sequelize')
//
const sequelize = new Sequelize('lojinha', 'aluno', 'ifpe2023', {
  host: 'localhost',
  dialect: 'mysql'
})
//
sequelize.authenticate().then(function () {
  console.log("Conectado!!")
}).catch(function (erro) {
  console.log("Erro ao conectar: " + erro)
})
//
const Produto = sequelize.define('produto',
  {
    valor: {
      type: Sequelize.DOUBLE(10, 2),
     
    },
    nome: {
      type: Sequelize.STRING(100)
    },
    foto: {
      type: Sequelize.STRING
    },
    detalhes: {
      type: Sequelize.TEXT
    },
    qtdEstoque: {
      type: Sequelize.INTEGER
    }
  },{
    freezeTableName: true
  })
//
function insereProduto(valorRecebido,nomeRecebido,fotoRecebida,qtdEstoqueRecebida,detalhesRecebidos){
  Produto.create({
    valor:valorRecebido,
    nome:nomeRecebido,
    foto:fotoRecebida,
    qtdEstoque:qtdEstoqueRecebida,
    detalhes:detalhesRecebidos
    }).then(function(){
    console.log("Produto inserido com sucesso!")
    return('<b>Produto inserido com sucesso!<b>');
    }).catch(function(erro){
    console.log("Erro ao inserir produto: "+erro)
    return('<b>Erro ao inserir produto!<b>');
    })
  }
//
  function buscaProdutos(){
    
  }
//
  module.exports = {
    Produto,
    insereProduto,
    buscaProdutos
  };
 

  Produto.sync();