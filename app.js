const express = require('express')
const app = express()
const port = 4000
app.use(express.static('public'))

var produtos=[
    {codigo:1, nome:'Fone de Ouvido', preco:219.56},
    {codigo:2, nome:'Caneca', preco:7.12},
    {codigo:3, nome:'Mochila', preco: 120} ]
    
app.get('/', (req, res) => {
 res.send('E aê!!');
})
app.get("/produtos",(req,res)=>{
    var nomeProduto = req.query.nome;
    console.log('Produto : '+nomeProduto)
    var codigoQueVeio = req.query.codigo
    console.log('O codigo q venho '+codigoQueVeio)
    var todosProdutos = "";
   for(var i = 0; i <produtos.length;i++){
    todosProdutos+= '<p><b>Nome</b>: '+produtos[i].nome+' / <b>Preço</b>: '+produtos[i].preco;
   }
   res.send(todosProdutos)
});
app.get("/produtos",(req,res)=>{
    var todosProdutos = "";
   for(var i = 0; i <produtos.length;i++){
    todosProdutos+= '<p><b>Nome</b>: '+produtos[i].nome+' / <b>Preço</b>: '+produtos[i].preco;
   }
   res.send(todosProdutos)
});
app.get("/pessoa",(req,res)=>{
    res.send("<p style='color:blue;'>Vejaaa</p>")
});
app.listen(port, () => {
 console.log(`Esta aplicação está escutando a
porta ${port}`)
})

