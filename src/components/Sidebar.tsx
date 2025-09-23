import { FC } from "react"
import { useAuth } from "../hooks/useAuth"
import {
  LayoutDashboard,
  Package,
  Zap,
  FileText,
  Puzzle,
  GraduationCap,
  Headphones,
  Settings,
  LogOut,
  User,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const Sidebar: FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  // pega o objeto inteiro do hook e trata de forma defensiva
  const auth: any = useAuth()
  const user = auth?.user
  // aceita tanto "logout" quanto "signOut" caso seu hook use um ou outro
  const logoutFn: (() => void) = auth?.logout ?? auth?.signOut ?? (() => {})

  const menuItems = [
    {
      category: "Funcionalidades",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "cadastramento", label: "Cadastramento", icon: Package },
        { id: "sintese", label: "Síntese", icon: Zap },
        { id: "ficha-tecnica", label: "Ficha Técnica", icon: FileText },
      ],
    },
    {
      category: "Mini Estratégias",
      items: [
        { id: "integracoes", label: "Integrações", icon: Puzzle },
        { id: "aprendizado", label: "Aprendizado", icon: GraduationCap },
        { id: "suporte", label: "Suporte", icon: Headphones },
        { id: "configuracoes", label: "Configurações", icon: Settings },
      ],
    },
  ]

  const handleSignOut = () => {
    try {
      logoutFn()
    } catch (err) {
      console.error("Erro ao realizar logout:", err)
    }
  }

  return (
    <aside className="w-64 bg-gray-800 text-sm min-h-screen">
      <nav className="p-4">
        {menuItems.map((category) => (
          <div key={category.category} className="mb-6">
            <p className="text-xs text-gray-400 uppercase mb-2">{category.category}</p>
            <div className="space-y-1">
              {category.items.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"}`}
                    title={item.label}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-300" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user?.name ?? "Nome do usuário"}</p>
              <p className="text-gray-400 text-xs">Admin</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="text-gray-400 hover:text-red-400 transition-colors p-1"
            title="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
