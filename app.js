//Classe Despesa
class Despesa{
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano =ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}
	//método para verificar se há algum dado faltando para registrar a despesa
	validarDados(){
		//for in percorrendo cada atributo do objeto despesa
		for(let i in this){
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
				}
		}
		return true
	}
}

//Classe Bd, criada para resolver o problema de sobreposição de objetos na aplicação local storage
class Bd{

	constructor(){
		//chave ID para que seja feita a inserção dinâmica de objetos de Despesa no local storage
		let id = localStorage.getItem('id')

		//Caso não haja um ID inicial, o mesmo será setado em local storage com o valor 0
		if(id === null){
			localStorage.setItem('id', 0)
		}
	}

	//método feito para retornar o ID a ser utilizado em gravações posteriores à primeira
	getProximoID(){
		let proximoId = localStorage.getItem('id')
		return (parseInt(proximoId) + 1)
	}

	//método utilizado para gravar os atributos das intâncias da classe Despesa na aplicação Local Storage do browser
	gravar(d){
		// variável ID recebe o retorno da função próximo ID para que novos documentos sejam inseridos dinamicamente no local storage
		let  id = this.getProximoID()

		/* A biblioteca JSON é utilizada para realizar a comunicação de objetos literais da aplicação WEB com aplicações externas.
		No caso em questão, está sendo utilizado para converter o objeto despesa em string e
		enviá-lo para a aplicação local storage d browser. */

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}
}

//instância da classe Bd
let bd =  new Bd()

//função para instanciamento da classe despesa a partir de dados resgatados dos formulários da aplicação WEB
function cadastrarDespesa(){
	let ano =document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia =document.getElementById('dia')
	let tipo =document.getElementById('tipo')
	let descricao =document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

	//verificação se há dados faltando, antes do instanciamento da despesa
	if(despesa.validarDados()){
		bd.gravar(despesa)
		//dialog de sucesso
		$('#sucessoGravacao').modal('show')
	} else{
		//dialog de erro
		$('#erroGravacao').modal('show')
	}
}


