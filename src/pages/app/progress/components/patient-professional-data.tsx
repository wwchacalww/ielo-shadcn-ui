interface PatientProfessionalDataProps {
  name: string
  birthDate: string
  phoneNumber: string
  paymentMethod: string
  psychologistName: string
  psychologistRegister: string
  supervisorName: string
  supervisorRegister: string
}
export function PatientProfessionalData({
  name,
  birthDate,
  phoneNumber,
  paymentMethod,
  psychologistName,
  psychologistRegister,
  supervisorName,
  supervisorRegister,
}: PatientProfessionalDataProps) {
  return (
    <div className="flex flex-col border-2">
      <div className="w-full items-center justify-center bg-slate-600 text-center">
        <h1 className="font-semibold">Paciente</h1>
      </div>
      <div className="flex border-y-2">
        <div className="px-2 font-semibold text-black">Nome:</div>
        <div className="flex-1 px-2 text-black">{name}</div>
        <div className="px-2 font-semibold text-black">Data de Nascimento:</div>
        <div className="px-2 text-black">{birthDate}</div>
      </div>
      <div className="flex border-b-2">
        <div className="px-2 font-semibold text-black">Telefone:</div>
        <div className="px-2 text-black">{phoneNumber}</div>
        <div className="px-2 font-semibold text-black">Forma de Pagamento:</div>
        <div className="px-2 text-black">{paymentMethod}</div>
      </div>
      <div className="w-full items-center justify-center bg-slate-600 text-center">
        <h1 className="font-semibold">Psicólogo e Supervisor</h1>
      </div>
      <div className="flex border-y-2">
        <div className="px-2 font-semibold text-black">Psicólogo:</div>
        <div className="flex-1 px-2 text-black">{psychologistName}</div>
        <div className="px-2 font-semibold text-black">Registro:</div>
        <div className="px-2 text-black">{psychologistRegister}</div>
      </div>

      <div className="flex">
        <div className="px-2 font-semibold text-black">Supervisor:</div>
        <div className="flex-1 px-2 text-black">{supervisorName}</div>
        <div className="px-2 font-semibold text-black">Registro:</div>
        <div className="px-2 text-black">{supervisorRegister}</div>
      </div>
    </div>
  )
}
