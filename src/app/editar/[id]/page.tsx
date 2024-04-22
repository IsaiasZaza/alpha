"use client"
import axios from "axios"
import { useTokenStore } from "../../../context/auth";
import { FormEvent, useEffect, useState } from "react";
import { Produto } from "@/types/Produto";
import { useRouter } from "next/navigation";

export default function Editar({ params }: { params: { id: Number } }) {
    const router = useRouter()

    const token = useTokenStore(state => state.token)

    const [atualizar, setAtualizar] = useState(false);

    const [produto, setProduto] = useState<Produto | null>(null)

    const getProduto = async () => {
        try {
            const { data } = await axios.get(`https://interview.t-alpha.com.br/api/products/get-one-product/${params.id}`, { headers: { Authorization: `Bearer ${token}` } });
            setProduto(data.data);
        } catch (err) {
            console.log('Não foi possível buscar o produto');
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.patch(`https://interview.t-alpha.com.br/api/products/update-product/${params.id}`, produto, { headers: { Authorization: `Bearer ${token}` } });
            setAtualizar(true);
            setTimeout(() => {
                router.push('/Crud');
            }, 2000)

        } catch (log) {
            console.log('Não foi possível atualizar o produto.');
        }
    }

    const handleVoltar = () => {
        router.push('/Crud')
    }

    useEffect(() => {
        getProduto();
    }, []);

    if (produto === null) return (
        <h1 className="text-center justify-center">Buscando o produto...</h1>
    )

    return (
        <>
            <div className="bg-gray-300 min-h-screen flex flex-col items-center justify-center">
                <main>
                    <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                        <h1 className="text-gray-500 text-2xl font-semibold text-center mb-4 ">Alpha Projeto</h1>
                        <form className="mb-4" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-black">Nome do Produto:</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="mt-1 block w-full text-black border-gray-400 px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:border-gray-800 focus:shadow-md"
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
                                    className="mt-1 block w-full text-black border-gray-400 px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:border-gray-800 focus:shadow-md"
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
                                        className="mt-1 block w-full text-black border-gray-400 px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:border-gray-800 focus:shadow-md"
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
                                        className="mt-1 block w-full text-black border-gray-400 px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:border-gray-800 focus:shadow-md"
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
                                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
                                </div>

                            </div>
                            {atualizar &&
                                <p className="text-center mt-2 font-semibold text-green-700">O produto foi atualizado com sucesso.</p>
                            }

                        </form>
                    </div>
                </main>
            </div>
        </>
    )
}