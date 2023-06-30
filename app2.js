const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
//
const Sequelize = require('sequelize')

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
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('E aê!!');
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

app.get("/buscaProdutos",(req,res)=>{
  var codigoProcurado = req.query.codigo;
  Produto.Produto.findAll({
    where:{id:codigoProcurado}
  }
  ).
      then(function(produtos){
        console.log(produtos);
        var tabela = ''
        for(var i = 0;i< produtos.length;i++){
          tabela+=" Id :"+produtos[i]['id'];
          tabela+=" Nome :"+produtos[i]['nome'];
          tabela+=" Valor :"+produtos[i]['valor'];
          tabela+="<br>";
        }
        console.log(tabela);
        res.send(tabela)
      }). 
      catch(function(erro){
        console.log('Erro na busca'+erro);
        res.send("Erro na busca")
      })
})

app.listen(port, () => {
  console.log(`Esta aplicação está escutando a porta ${port}`);
});
