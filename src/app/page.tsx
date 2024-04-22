"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useTokenStore } from '../context/auth'
import { setTimeout } from "timers";
import { IoAlertCircleSharp } from "react-icons/io5";

export default function Home() {

  const addToken = useTokenStore(state => state.setToken)
  const router = useRouter()

  const [correta, setCorreta] = useState(false)

  const [incorreta, setIncorreta] = useState(false)

  const [registroIncorreto, setegistroIncorreto] = useState(false);

  const [usuarioCriado, setUsuarioCriado] = useState(false)


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
    setRegistro(false)
    setLogin(true)
  }

  const registroIr = (e: any) => {
    e.preventDefault();
    setRegistro(true)
    setLogin(true)
    setLogin(false)
  }

  const handleChange = (e: any, formType: string) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setEntrar({ ...entrar, [name]: value });
    } else if (formType === "registro") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const RegistroSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://interview.t-alpha.com.br/api/auth/register', formData);
      console.log(response.data)

      if (response.data.success === false) {
        setegistroIncorreto(true);

        setTimeout(() => {
          setegistroIncorreto(false)
        }, 2000)
      } else if (response.data.success === true) {

        setUsuarioCriado(true);
        e.target.reset();

        setTimeout(() => {
          setUsuarioCriado(false)
          setRegistro(false)
          setLogin(true)
        }, 2000)

      }

    } catch (error) {
      console.error(error);

    }

  };

  const loginSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://interview.t-alpha.com.br/api/auth/login', entrar);

      const newToken = response.data.data.token;

      addToken(newToken)

      if (response.data.success === true) {
        setCorreta(true)

        setTimeout(() => {
          setCorreta(false)
          router.push('/Crud')
        }, 2000)

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gray-300">

        <div className="flex justify-center items-center h-screen">

          <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={RegistroSubmit}>
            <p className="text-gray-500 text-center m-3 font-semibold text-lg">Alpha Project</p>
            {login &&
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
                    Tax Number
                  </label>
                  <input
                    className="text-black block border border-gray-300 rounded py-2 px-3 mb-3"
                    type="text"
                    name="taxNumber"
                    value={entrar.taxNumber} onChange={(e) => handleChange(e, "login")} placeholder="TaxNumber"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
                    Senha
                  </label>
                  <input
                    className="text-black block border border-gray-300 rounded py-2 px-3 mb-3"
                    type="password"
                    name="password"
                    value={entrar.password} onChange={(e) => handleChange(e, "login")} placeholder="Senha"
                    required
                  />
                  {correta &&
                    <p className="text-green-600 text-center font-semibold">Senha correta</p>
                  }
                  {
                    incorreta &&
                    <p className="text-red-600 text-center">Senha incorreta</p>
                  }

                </div>
                <button onClick={loginSubmit} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                  Login
                </button>
                <div className="text-center">
                  <button onClick={registroIr} className="mt-3 font-semibold text-blue-400 hover:text-blue-800 transition-all">Não possui conta? Clique aqui.</button>
                </div>

              </div>

            }

            {registro &&
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="txNumber">
                    Nome
                  </label>
                  <input
                    className="text-black block border border-gray-300 rounded py-2 px-3 mb-3"
                    type="text"
                    name="name"
                    value={formData.name} onChange={(e) => handleChange(e, "registro")} placeholder="Nome"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taxNumber">
                    Tax Number
                  </label>
                  <input
                    className="text-black block border border-gray-300 rounded py-2 px-3 mb-3"
                    type="text"
                    name="taxNumber"
                    value={formData.taxNumber} onChange={(e) => handleChange(e, "registro")} placeholder="Tax Number"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mail">
                    Email
                  </label>
                  <input
                    className="text-black block border border-gray-300 rounded py-2 px-3 mb-3"
                    type="email"
                    name="mail"
                    value={formData.mail} onChange={(e) => handleChange(e, "registro")} placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Telefone
                  </label>
                  <input
                    className="text-black block border border-gray-300 rounded py-2 px-3 mb-3"
                    type="tel"
                    name="phone"
                    value={formData.phone} onChange={(e) => handleChange(e, "registro")} placeholder="Telefone"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Senha
                  </label>
                  <input
                    className="text-black block border border-gray-300 rounded py-2 px-3 mb-3"
                    type="password"
                    name="password"
                    value={formData.password} onChange={(e) => handleChange(e, "registro")} placeholder="Senha"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all" type="submit">
                    Cadastrar
                  </button>
                </div>
                {registroIncorreto &&
                  <p className="mt-1 text-red-600 font-semibold flex justify-center">Usuario já cadastrado<IoAlertCircleSharp className="text-2xl ml-1" />
                  </p>
                }
                {usuarioCriado &&
                  <p className="text-center mt-2 font-semibold text-green-700">Usuario criado com sucesso</p>
                }
                <div className="text-center mt-2">
                  <button onClick={loginIr} className="font-semibold text-blue-400 hover:text-blue-800 transition-all">Fazer Login</button>
               </div>
              </div>
            }

          </form>
        </div>

      </div>

    </>
  );
}
