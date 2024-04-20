"use client"

import { useState, useEffect } from "react"
import axios from "axios";
import { Produtos } from "../types/Produtos";


export default function Crud() {

  /*const [deletar, setDeletar] = useState({
    setDeletar(produtos.id)
  })*/

  const [criarItem, setCriarItem] = useState({
    name: '',
    description: '',                        /*para Criar item*/
    price: '',
    stock: '',
  });
  const [produtos, setProdutos] = useState<Produtos[]>([]);


  /*COLOCAR NA TELA OS PRODUTOS*/
  const getProdutos = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcxMzU4NDM1Mn0.obaTJ74KKmKE58WJjD0wf7F66NV72cmlZ8N3U9nr0I4";

      const response = await axios.get('https://interview.t-alpha.com.br/api/products/get-all-products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProdutos(response.data.data);
      console.log(response.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  /*DELETAR*/
 const deletarProdutos = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcxMzU4NDM1Mn0.obaTJ74KKmKE58WJjD0wf7F66NV72cmlZ8N3U9nr0I4";
      getProdutos();
      const response = await axios.delete(`https://interview.t-alpha.com.br/api/products/delete-product/65`, {
        id: 66,
        data: {
          id: 58
        },
          headers: {
          Authorization: `Bearer ${token}`
        },

      });
      console.log(response.data);

    } catch (err) {
      console.log(err);
    }
  }

  /*Criar Produto */
  const pegarProdutos = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcxMzU4NDM1Mn0.obaTJ74KKmKE58WJjD0wf7F66NV72cmlZ8N3U9nr0I4";

      const response = await axios.post('https://interview.t-alpha.com.br/api/products/create-product', {
          criarItem,
          headers: {
          Authorization: `Bearer ${token}`          /*erro de autorização*/
        },

      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    getProdutos();
  
    pegarProdutos();
  }, []);



  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <main className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-center mb-4">CRUD Produtos</h1>

          {/* Formulário de Criação/Atualização */}
          <form className="mb-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-black">Nome do Produto:</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full text-black border-gray-400 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição:</label>
              <textarea id="description" name="description" rows="3" className="mt-1 block w-full text-black border-gray-400 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"></textarea>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço:</label>
                <input type="text" id="price" name="price" className="mt-1 block w-full text-black border-gray-400 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Estoque:</label>
                <input type="text" id="stock" name="stock" className="mt-1 block w-full text-black border-gray-400 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="text-end">
              <button type="submit" className="w-1/4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Salvar</button>
            </div>
          </form>

          {/* Tabela de Produtos */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Cabeçalho da Tabela */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>




                </tr>
              </thead>
              {/* Corpo da Tabela */}
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Linhas de Produtos (serão dinâmicas) */}

                {produtos.map(item => (
                  <>
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.id}{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
                        <button onClick={deletarProdutos} className="text-red-600 hover:text-red-900 ml-2">Excluir</button>
                      </td>
                    </tr>
                  </>
                ))}

                {/* Mais linhas de produtos (dinâmicas) */}
              </tbody>
            </table>
          </div>
        </main>
      </div>

    </>
  )
}