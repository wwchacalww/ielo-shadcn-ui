import { LogoLightIcon } from '@/components/icons/logo-light'

export function ProgressHeader() {
  return (
    <div className="flex">
      <div>
        <LogoLightIcon width={120} height={110} />
      </div>
      <div className="flex h-full flex-1 flex-col items-start justify-center p-2">
        <h1 className="text-xl font-semibold text-black">
          Instituto Elo Terapêutico de Psicologia
        </h1>
        <span className="text-sm text-slate-700">
          Rua das Figueiras lote 07, 1º andar, loja 60 – Águas Claras/DF – CEP
          71.906-750.
        </span>
        <span className="text-sm text-slate-700">
          Telefone: (61) 9 9973-1541
        </span>
        <span className="text-sm text-slate-700">
          E-mail:{' '}
          <strong className="text-blue-500">
            institutoeloterapeutico@gmail.com
          </strong>
        </span>
      </div>
    </div>
  )
}
