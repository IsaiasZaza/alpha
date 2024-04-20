"use client"
import axios from "axios"
import Router from "next/router";
import { useSearchParams } from "next/navigation"
import { useTokenStore } from "../context/auth";

export default function editar() {
    const searchParams = useSearchParams()
    const idProduto = searchParams.get('idProduto')
    const token = useTokenStore(state => state.token)

    const editarProduto = (idProduto: number) => {
        Router.push(`/editar?idProduto=${idProduto}`)
    }


    const EditProduto = async (event: any, idProduto: number) => {
        event.preventDefault();
        const { name, description, price, stock } = event.target
        const editarProduct = {
            name: name.value,
            description: description.value,
            stock: Number(stock.value),
            price: Number(price.value)
        }
        try{
            await axios.patch(`https://interview.t-alpha.com.br/api/products/update-product/${idProduto}`, {
            editarProduct, 
            headers: {
                Authorization: `Bearer ${token}`
            }
            
        })
        }catch(err){
            console.log(err)
           
    }
        
    }

        
    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
                <main>
                    <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
                        <form className="mb-4" onSubmit={EditProduto}>
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
                    </div>
                </main>
            </div>


            <h1>O produto com id: {idProduto}</h1>




        </>
    )
}