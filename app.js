class Despesa{
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano =ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}
}
function cadastrarDespesa(){
	let ano =document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia =document.getElementById('dia')
	let tipo =document.getElementById('tipo')
	let descricao =document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

	gravar(despesa)
}

function gravar(d){
	/* A biblioteca JSON é utilizada para realizar a comunicação de objetos literais da aplicação WEB com aplicações externas.
	No caso em questão, está sendo utilizado para converter o objeto despesa em string e
	enviá-lo para a aplicação local storage d browser. */
	localStorage.setItem('despesa', JSON.stringify(d))
}

