"use client"
import axios from "axios"
import { useTokenStore } from "../../../context/auth";
import { FormEvent, useEffect, useState } from "react";
import { Produto } from "@/types/Produto";
import { useRouter } from "next/navigation";

export default function Editar({ params }: { params: { id: Number } }) {
    const router = useRouter()

    const token = useTokenStore(state => state.token)

    const [produto, setProduto] = useState<Produto | null>(null)

    const getProduto = async () => {
        try {
            const { data } = await axios.get(`https://interview.t-alpha.com.br/api/products/get-one-product/${params.id}`, { headers: { Authorization: `Bearer ${token}` } });
            setProduto(data.data);
        } catch (err) {
            console.error('Não foi possível buscar o produto');
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.patch(`https://interview.t-alpha.com.br/api/products/update-product/${params.id}`, produto, { headers: { Authorization: `Bearer ${token}` } });
            alert('O produto foi atualizado com sucesso.');
            router.push('/Crud');
        } catch (error) {
            console.error('Não foi possível atualizar o produto.');
        }
    }

    const handleVoltar = () => {
        router.push('/Crud')
    }

    useEffect(() => {
        getProduto();
    }, []);

    if (produto === null) return (<h1>Buscando o produto...</h1>)

    return (
        <>
            <div className="bg-gray-300 min-h-screen flex flex-col items-center justify-center">
                <main>
                    <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                        <form className="mb-4" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-black">Nome do Produto:</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="mt-1 block w-full text-black border-gray-400 px-3 py-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"
                                    value={produto.name}
                                    onChange={(event) => setProduto({ ...produto, name: event.currentTarget.value })}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="mt-1 block w-full text-black border-gray-400 px-3 py-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"
                                    onChange={(event) => setProduto({ ...produto, description: event.currentTarget.value })}
                                    value={produto.description}
                                    required
                                />
                            </div>
                            <div className="mb-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço:</label>
                                    <input
                                        id="price"
                                        type="number"
                                        name="price"
                                        className="mt-1 block w-full text-black border-gray-400 px-3 py-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"
                                        value={produto.price}
                                        onChange={(event) => setProduto({ ...produto, price: Number(event.currentTarget.value) })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Estoque:</label>
                                    <input
                                        id="stock"
                                        type="number"
                                        name="stock"
                                        className="mt-1 block w-full text-black border-gray-400 px-3 py-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:outline-none focus:border-indigo-500"
                                        value={produto.stock}
                                        onChange={(event) => setProduto({ ...produto, stock: Number(event.currentTarget.value) })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="text-end flex justify-end">
                                <div>
                                    <button onClick={handleVoltar} type="reset" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Voltar</button>
                                </div>
                                <div>
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </main>
            </div>


            <h1>O produto com nome: {produto.name}</h1>
            <h1>O produto com descrição: {produto.description}</h1>
            <h1>O produto com stock: {produto.stock}</h1>
            <h1>O produto com preço: {produto.price}</h1>

        </>
    )
}