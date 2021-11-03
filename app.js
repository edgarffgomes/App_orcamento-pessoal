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

	recuperarTodosRegistros(){

		//array de despesa
		let despesas = Array()
		//recuperação do id para ser usado como parâmetro no loop de repetição para recuperar os objetos literais
		let id = localStorage.getItem('id')

		for (let i =1 ; i<=id; i++){

			//recuperar a despesa
			//A função JSON.parse() é utilizada para converter as strings JSON de volta para objetos literais
			let despesa = JSON.parse(localStorage.getItem(i))

			//caso o índice em questão tenha sido removido, o mesmo deverá ser pulado
			if(despesa === null){
				continue
			}
			//recuperando id para ser a utilizado na exclusão de despesas
			despesa.id = i
			despesas.push(despesa)
		}
		return despesas
	}

	pesquisar(despesa){
		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()

		//Comparando os registros com os parâmetros da pesquisa
		//ano
		if(despesa.ano != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano )
		}

		//mes

		if(despesa.mes != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes )
		}

		//dia

		if(despesa.dia != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		//descrição

		if(despesa.descricao != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//tipo

		if(despesa.tipo != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//valor

		if(despesa.valor != ''){
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}
		console.log(despesasFiltradas)
		return despesasFiltradas
	}

	remover(id){
		//removendo itens do local storage
		localStorage.removeItem(id)
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

		//formatação dialog sucesso:
		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!'
		document.getElementById('modal-titulo-div').className = 'modal-header text-success'

		document.getElementById('modal-conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'

		document.getElementById('btn_dismiss').innerHTML = 'Voltar'
		document.getElementById('btn_dismiss').className = 'btn btn-success'

		//dialog de sucesso
		$('#registraDespesa').modal('show')

		//limpando campos de inserção, após registro bem-sucedido
		ano.value = ''
		mes.value = ''
		dia.value=''
		descricao. value = ''
		tipo.value=''
		valor.value = ''
	} else{

		//formatação dialog erro:
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro!'
		document.getElementById('modal-titulo-div').className = 'modal-header text-danger'

		document.getElementById('modal-conteudo').innerHTML = 'Erro na gravação, verifique se todos os elementos foram incluídos corretamente!'

		document.getElementById('btn_dismiss').innerHTML = 'Voltar e corrigir'
		document.getElementById('btn_dismiss').className = 'btn btn-danger'

		$('#registraDespesa').modal('show')

	}
}

//função para carregar a lista de despesas pra página de consultas
function carregaListaDespesas(despesas = Array()){
	
	//caso não haja nenhuma pesquisa a ser feita, todas as despesas contidas no localStorage serão retornadas
	if(despesas.length == 0){
	despesas = bd.recuperarTodosRegistros()
	}

	//selecionando o elemento tbody da tabela
	let listaDespesas = document.getElementById('lista-despesas')
	listaDespesas.innerHTML = ''

	//percorrer o array despesa, listando cada despesa de forma dinâmica
	despesas.forEach(function(d){
		
		//criando a linha(<tr>)
		let linha = listaDespesas.insertRow()

		//criando as colunas (<td>)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

		//ajustar o tipo para aparecer os títulos, não os números
		switch(parseInt(d.tipo)){
			case 1:
				d.tipo = 'Alimentação'
			break

			case 2:
				d.tipo = 'Educação'
			break

			case 3:
				d.tipo = 'Lazer'
			break

			case 4:
				d.tipo = 'Saúde'
			break

			case 5:
				d.tipo = 'Transporte'
			break
		}
		linha.insertCell(1).innerHTML = `${d.tipo}`
		linha.insertCell(2).innerHTML = `${d.descricao}`
		linha.insertCell(3).innerHTML = `${d.valor}`

		//criar botão de exclusao
		let btn = document.createElement("button")
		btn.className = "btn btn-danger"
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id_despesas: ${d.id}`
		btn.onclick = function(){

			let id = this.id.replace('id_despesas: ', '')
			bd.remover(id)
			window.location.reload()
		}
		linha.insertCell(4).append(btn)

	})

}

	function pesquisarDespesa(){
		//instanciando objeto a ser pesquisado
		let ano = document.getElementById('ano').value
		let mes = document.getElementById('mes').value
		let dia = document.getElementById('dia').value
		let descricao = document.getElementById('descricao').value
		let tipo = document.getElementById('tipo').value
		let valor = document.getElementById('valor').value

		let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

		//realizando pesquisa no local storage
		let despesas = bd.pesquisar(despesa)

		//carregando lista de despesas correspondentes à pesquisa 
		carregaListaDespesas(despesas)

}


