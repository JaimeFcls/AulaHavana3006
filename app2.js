const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Sequelize = require('sequelize')
const {Op} = require('sequelize')

app.set('view engine', 'ejs');
app.set('views', './views');
const Produto = require('./model/Produto')

const sequelize = new Sequelize('lojinha', 'aluno', 'ifpe2023', {
  host: 'localhost',
  dialect: 'mysql'
})
sequelize.authenticate().then(function () {
  console.log("Conectado!!")
}).catch(function (erro) {
  console.log("Erro ao conectar: " + erro)
})
//

//Produto.sync();
//Usuario.sync();

//
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
 }); 

app.post('/cadastroProduto', (req, res) => {
  var valorRecebido = req.body.valor;
  var nomeRecebido = req.body.nome;
  var fotoRecebida = req.body.foto;
  var qtdEstoqueRecebida = req.body.qtdEstoque;
  var detalhesRecebidos = req.body.detalhes;

  var mensagem = Produto.insereProduto(valorRecebido,nomeRecebido,fotoRecebida,qtdEstoqueRecebida,detalhesRecebidos);

  res.send(mensagem);
});
app.post('/excluiProduto', express.urlencoded({ extended: true }), (req, res) => {
  var idProduto = req.body.id;
  Produto.Produto.destroy({
    where: {
      id: idProduto
    }
  }).then(function() {
    console.log("Excluido com sucesso");
    res.send("Excluido com sucesso");
  }).catch(function(erro) {
    console.log("Erro na alteração: " + erro);
    res.send("Erro na alteração");
  });
});
app.post('/atualizaProduto', express.urlencoded({ extended: true }), (req, res) => {
  var valorAtual = req.body.valor;
  var idProduto = req.body.id;
  Produto.Produto.update({ valor: valorAtual }, {
    where: {
      id: idProduto
    }
  }).then(function() {
    console.log("Alteração realizada com sucesso");
    res.send("Alteração realizada com sucesso");
  }).catch(function(erro) {
    console.log("Erro na alteração: " + erro);
    res.send("Erro na alteração");
  });
});


app.get("/buscaProdutos", (req, res) => {
  var nomeProduto = req.query.nome;
  var valorProduto = req.query.valor;
  Produto.findAll({
    where: {
      [Op.and]: [{ nome: nomeProduto }, { valor: valorProduto }]
    }
  }).then(function (produtos) {
    console.log(produtos);
    var tabela = "<table>";
    for (var i = 0; i < produtos.length; i++) {
      tabela += " Id :" + produtos[i]['id'];
      tabela += " Nome :" + produtos[i]['nome'];
      tabela += " Valor :" + produtos[i]['valor'];
      tabela += "<br>";
    }
    tabela += "</table>";
    console.log(tabela);
    res.send(tabela);
  }).catch(function (erro) {
    console.log('Erro na busca: ' + erro);
    res.send("Erro na busca");
  });
});

app.listen(port, () => {
  console.log(`Esta aplicação está escutando a porta ${port}`);
});
