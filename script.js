const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sID = document.querySelector('#m-id')
const sCliente = document.querySelector('#m-cliente')
const sTelefone = document.querySelector('#m-telefone')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
      sID.value = itens[index].id
      sCliente.value = itens[index].cliente
      sTelefone.value = itens[index].telefone
      id = index
    } else {
      sID.value = ''
      sCliente.value = ''
      sTelefone.value = ''
    }
    
  }
  
  function editItem(index) {
  
    openModal(true, index)
  }
  
  function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
  }
  
  function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.cliente}</td>
      <td>R$ ${item.telefone}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
  }
  
  btnSalvar.onclick = e => {
  
    if (sID.value == '' || sCliente.value == '' || sTelefone.value == '') {
      return
   
  }
  e.preventDefault();
    
    
      
    
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].id = sID.value
      itens[id].cliente = sCliente.value
      itens[id].telefone = sTelefone.value
    
    } else {
      itens.push({'id': sID.value, 'cliente': sCliente.value, 'telefone': sTelefone.value})
    }
    setItensBD()
      
   
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
  }
  
  function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
      insertItem(item, index)
    })
  
  }
  
  const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
  const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))
  
  loadItens()