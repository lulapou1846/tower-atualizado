import { FC, useState, useEffect } from 'react'
import { X, Plus, Lock } from 'lucide-react'

/* Tipagem do produto (todos opcionais porque podem vir vazios ao criar) */
interface Product {
  codigo?: string
  descricao?: string
  tipo?: string
  categoria?: string
  unidade?: string
  qtdEmbalagem?: number
  custoEmbalagem?: number
  custoUnitario?: number
}

/* Props do modal */
interface ProductModalProps {
  product?: Product
  onSave: (product: Product) => void
  onClose: () => void
}

/* Estado do formulário (strings porque inputs trabalham com string) */
interface FormData {
  codigo: string
  descricao: string
  tipo: string
  categoria: string
  unidade: string
  qtdEmbalagem: string
  custoEmbalagem: string
  custoUnitario: string
}

const ProductModal: FC<ProductModalProps> = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    codigo: '',
    descricao: '',
    tipo: '',
    categoria: '',
    unidade: '',
    qtdEmbalagem: '',
    custoEmbalagem: '',
    custoUnitario: ''
  })

  const [isInsumo, setIsInsumo] = useState<boolean>(false)

  useEffect(() => {
    if (product) {
      setFormData({
        codigo: product.codigo ?? '',
        descricao: product.descricao ?? '',
        tipo: product.tipo ?? '',
        categoria: product.categoria ?? '',
        unidade: product.unidade ?? '',
        qtdEmbalagem: product.qtdEmbalagem?.toString() ?? '',
        custoEmbalagem: product.custoEmbalagem?.toString() ?? '',
        custoUnitario: product.custoUnitario?.toString() ?? ''
      })
      setIsInsumo(product.tipo === 'Insumo')
    } else {
      // limpa quando não há produto (novo)
      setFormData({
        codigo: '',
        descricao: '',
        tipo: '',
        categoria: '',
        unidade: '',
        qtdEmbalagem: '',
        custoEmbalagem: '',
        custoUnitario: ''
      })
      setIsInsumo(false)
    }
  }, [product])

  const calcularCustoUnitario = (custoEmbalagemStr: string, qtdEmbalagemStr: string) => {
    const custo = parseFloat(custoEmbalagemStr || '0')
    const qtd = parseFloat(qtdEmbalagemStr || '0')
    if (custo > 0 && qtd > 0) {
      return (custo / qtd).toFixed(2)
    }
    return '0.00'
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => {
      const next = { ...prev, [name as keyof FormData]: value }

      // se alterou custoEmbalagem ou qtdEmbalagem, recalcula o custoUnitario
      if (name === 'custoEmbalagem' || name === 'qtdEmbalagem') {
        const custoEmbalagemStr =
          name === 'custoEmbalagem' ? value : prev.custoEmbalagem
        const qtdEmbalagemStr =
          name === 'qtdEmbalagem' ? value : prev.qtdEmbalagem

        next.custoUnitario = calcularCustoUnitario(custoEmbalagemStr, qtdEmbalagemStr)
      }

      return next
    })
  }

  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, tipo: value }))
    setIsInsumo(value === 'Insumo')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const produtoParaSalvar: Product = {
      codigo: formData.codigo || undefined,
      descricao: formData.descricao || undefined,
      tipo: formData.tipo || undefined,
      categoria: formData.categoria || undefined,
      unidade: formData.unidade || undefined,
      qtdEmbalagem: formData.qtdEmbalagem ? parseFloat(formData.qtdEmbalagem) : undefined,
      custoEmbalagem: formData.custoEmbalagem ? parseFloat(formData.custoEmbalagem) : undefined,
      custoUnitario: formData.custoUnitario ? parseFloat(formData.custoUnitario) : undefined
    }

    onSave(produtoParaSalvar)
  }

  const tiposDisponiveis = [
    'Produto',
    'Insumo',
    'Matéria Prima',
    'Componente',
    'Ferramenta',
    'Equipamento'
  ]

  const categoriasDisponiveis = [
    'Eletrônicos',
    'Ferramentas',
    'Materiais',
    'Químicos',
    'Acessórios',
    'Estrutural',
    'Acabamento'
  ]

  const unidadesDisponiveis = [
    'Peça',
    'Kg',
    'Litro',
    'Metro',
    'Medida',
    'Unidade',
    'Caixa',
    'Pacote'
  ]

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {product ? 'Editar Item' : 'Adicionar Novo Item'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Tipo <span className="text-red-500">*</span>
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleTipoChange}
              required
              className="w-full bg-gray-800 border-2 border-blue-500 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="">Selecione um tipo</option>
              {tiposDisponiveis.map(tipo => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Categoria <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">Selecione uma categoria</option>
                {categoriasDisponiveis.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-3 py-3 text-gray-300 transition-colors"
                title="Adicionar categoria"
                onClick={() => {
                  /* implementar se quiser abrir criação de categoria */
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Descrição <span className="text-red-500">*</span>
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Digite a descrição do item"
              required
              rows={3}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Unidade */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Unidade <span className="text-red-500">*</span>
            </label>
            <select
              name="unidade"
              value={formData.unidade}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">Selecione uma unidade</option>
              {unidadesDisponiveis.map(unidade => (
                <option key={unidade} value={unidade}>
                  {unidade}
                </option>
              ))}
            </select>
          </div>

          {/* Campos Insumo */}
          {isInsumo && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Qtd da Embalagem</label>
                  <input
                    type="number"
                    name="qtdEmbalagem"
                    value={formData.qtdEmbalagem}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Custo da Embalagem (R$)</label>
                  <input
                    type="number"
                    name="custoEmbalagem"
                    value={formData.custoEmbalagem}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Custo Unitário (R$)</label>
                <input
                  type="text"
                  value={`R$ ${formData.custoUnitario || '0.00'}`}
                  readOnly
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-400"
                />
              </div>
            </>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-transparent border border-gray-600 hover:bg-gray-800 text-white py-3 rounded-lg transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Lock size={16} />
              <span>{product ? 'Salvar' : 'Adicionar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal
