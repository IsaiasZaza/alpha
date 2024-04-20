"use client"
import axios from "axios";
import { useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {useTokenStore} from './context/auth'
import { setTimeout } from "timers";
export default function Home() {

  const addToken = useTokenStore(state => state.setToken)
  const router = useRouter()
  const [correta, setCorreta] = useState(false)             /*Senha Correta*/

  const [incorreta, setIncorreta] = useState(false)         /*Senha Incorreta*/


  const [formData, setFormData] = useState({
    name: '',
    taxNumber: '',
    mail: '',
    phone: '',
    password: ''
  });

  const [entrar, setEntrar] = useState({
    taxNumber: '',
    password: ''
  })

  const [login, setLogin] = useState(true)
  const [registro, setRegistro] = useState(false)


  const loginIr = (e: any) => {
    e.preventDefault();
    setRegistro(false)                 /*IR PARA AREA DE LOGIN*/
    setLogin(true)
  }

  const registroIr = (e: any) => {
    e.preventDefault();
    setRegistro(true)                /*IR PARA AREA DE REGISTRO*/
    setLogin(true)
    setLogin(false)
  }

  const handleChange = (e: any, formType : string) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setEntrar({ ...entrar, [name]: value });
    } else if (formType === "registro") {
      setFormData({ ...formData, [name]: value });
    }
  };

  /*Registro/Submit*/
  const RegistroSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://interview.t-alpha.com.br/api/auth/register', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const loginSubmit = async (e: any) => {
    e.preventDefault();
    console.log(entrar)
    try {
      const response = await axios.post('https://interview.t-alpha.com.br/api/auth/login', entrar);

      const newToken =  response.data.data.token;
      console.log(response.data.data.token);
      
      addToken(newToken)

      if (response.data.success === true) {
        setCorreta(true)
        
        setTimeout(() => {
          setCorreta(false)
          router.push('/Crud')
        }, 3000)
        
      } else {
        window.prompt('deu errado');
      }

    } catch (error) {
      console.log(error);
    }
  };

  
  /*PRODUTOS*/


  return (
    <>
      <div className="bg-gray-100">
        
        <div className="flex justify-center items-center h-screen">

          <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={RegistroSubmit}>
            <p className="text-black text-center m-3 font-semibold text-lg">Alpha Project</p>
            {login &&
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
                  Tax Number
                  </label>
                  <input className="text-black block border border-gray-300 rounded py-2 px-3 mb-3" type="text" name="taxNumber" value={entrar.taxNumber} onChange={(e) => handleChange(e, "login")} placeholder="Nome" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
                    Senha
                  </label>
                  <input className="text-black block border border-gray-300 rounded py-2 px-3 mb-3" type="password" name="password" value={entrar.password} onChange={(e) => handleChange(e, "login")} placeholder="Tax Number" required />
                  {correta &&
                    <p className="text-black text-center">Senha correta</p>
                  }
                  {
                    incorreta &&
                    <p className="text-red-600 text-center">Senha incorreta</p>
                  }

                </div>
                <button onClick={loginSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                  Login
                </button>
                <div className="text-end">
                  <button onClick={registroIr} className=" font-semibold text-red-400 hover:text-red-800 transition-all">Registrar-se</button>
                </div>

              </div>

            }

            {registro &&
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txNumber">
                    Nome
                  </label>
                  <input className="text-black block border border-gray-300 rounded py-2 px-3 mb-3" type="text" name="name" value={formData.name} onChange={(e) => handleChange(e, "registro")} placeholder="Nome" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taxNumber">
                    Tax Number
                  </label>
                  <input className="text-black block border border-gray-300 rounded py-2 px-3 mb-3" type="text" name="taxNumber" value={formData.taxNumber} onChange={(e) => handleChange(e, "registro")} placeholder="Tax Number" required />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mail">
                    Email
                  </label>
                  <input className="text-black block border border-gray-300 rounded py-2 px-3 mb-3" type="email" name="mail" value={formData.mail} onChange={(e) => handleChange(e, "registro")} placeholder="Email" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Telefone
                  </label>
                  <input className="text-black block border border-gray-300 rounded py-2 px-3 mb-3" type="tel" name="phone" value={formData.phone} onChange={(e) => handleChange(e, "registro")} placeholder="Telefone" required />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Senha
                  </label>
                  <input className="text-black block border border-gray-300 rounded py-2 px-3 mb-3" type="password" name="password" value={formData.password} onChange={(e) => handleChange(e, "registro")} placeholder="Senha" required />
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Registrar
                  </button>
                </div>
                <div className="text-end">
                  <button onClick={loginIr} className="font-semibold text-red-400 hover:text-red-800 transition-all">Ir para o login</button>
                </div>

              </div>

            }

          </form>
        </div>

      </div>

    </>
  );
}
