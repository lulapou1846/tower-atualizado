import { FC } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const RegisterPage: FC = () => {
  const { isAuthenticated } = useAuth() // mantemos só o que é usado

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-blue-500 text-4xl font-bold mr-2">⛛</div>
            <span className="text-white text-3xl font-bold">TOWER</span>
          </div>
        </div>

        {/* Register Card */}
        <div className="bg-gray-900 border border-blue-500/30 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-white text-2xl font-semibold mb-2">Criar nova conta</h2>
            <p className="text-gray-400 text-sm">Comece sua jornada conosco</p>
          </div>

          <div className="space-y-4 mb-6">
            {/* Nome completo */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Nome completo</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Senha</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Crie uma senha"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6-2a6 6 0 1112 0v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Confirmar senha */}
            <div>
              <label className="block text-gray-300 text-sm mb-2">Confirme sua senha</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirme sua senha"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6-2a6 6 0 1112 0v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors">
              Voltar
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors">
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
