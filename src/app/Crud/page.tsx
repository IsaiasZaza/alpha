"use client"

import { useState, useEffect } from "react"
import axios from "axios";
import { Produtos } from "../types/Produtos";
import { useTokenStore } from "../context/auth";
import { useRouter } from 'next/navigation'

export default function Crud() {
  const token = useTokenStore(state => state.token)
  console.log(token)
  const router = useRouter()

  const [produtos, setProdutos] = useState<Produtos[]>([]);

  const getProdutos = async () => {
    try {
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

 const deletarProdutos = async (idProduto : number) => {
    try {
      await axios.delete(`https://interview.t-alpha.com.br/api/products/delete-product/${idProduto}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        console.log(`${idProduto} foi apagado`)
        getProdutos()
      })
    } catch (err) {
      console.log(err);
    }
  }

  const editarProduto = (idProduto : number) => {
      router.push(`/editar?idProduto=${idProduto}`)
  } 

  const criarProduto = async(event : any) => {
    event.preventDefault();
    const {name, description, price, stock } =  event.target
    const newProduct = {
      name: name.value,
      description: description.value,
      stock: Number(stock.value),
      price: Number(price.value)
    }
    await axios.post('https://interview.t-alpha.com.br/api/products/create-product', newProduct, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    }).then(() => {
      getProdutos()
    }) 
  }


  
  useEffect(() => {

    if(!token) {
      router.push('/')  /*Caso não exista token - Volta pra tela inicial*/
      return
    }
    getProdutos();

  }, [token]);


  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <main className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-center mb-4">CRUD Produtos</h1>
          <form className="mb-4" onSubmit={criarProduto}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-black">Nome do Produto:</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full text-black border-gray-400 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição:</label>
              <textarea id="description" name="description" className="mt-1 block w-full text-black border-gray-400 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"></textarea>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço:</label>
                <input type="number" id="price" name="price" className="mt-1 block w-full text-black border-gray-400 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Estoque:</label>
                <input type="number" id="stock" name="stock" className="mt-1 block w-full text-black border-gray-400 px-3 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="text-end">
              <button type="submit" className="w-1/4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Salvar</button>
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtos.map(item => (
                  <>
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">

                        <button onClick={() => editarProduto(item.id)}className="text-indigo-600 hover:text-indigo-900">Editar</button>
                        <button onClick={() => deletarProdutos(item.id)} className="text-red-600 hover:text-red-900 ml-2">Excluir</button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

    </>
  )
}