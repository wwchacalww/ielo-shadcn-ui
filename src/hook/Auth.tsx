import { jwtDecode } from 'jwt-decode'
import { createContext, ReactNode, useContext, useState } from 'react'

import { getProfile } from '@/api/get-profile'
import { PayLoad, signIn as Authenticate } from '@/api/sign-in'
import { ProfessionalProps } from '@/dtos'

interface User {
  id: string
  name: string
  email: string
  role: string
  professional?: ProfessionalProps | null
}
interface SignInCredencials {
  email: string
  password: string
}

interface AuthContextProps {
  user: User
  SignIn(input: SignInCredencials): Promise<{ role: string; sub: string }>
}

type AuthProviderProps = {
  children: ReactNode
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(() => {
    const token = localStorage.getItem('@ielo:token')
    if (token) {
      const { role, sub } = jwtDecode<PayLoad>(token)
      return {
        id: sub,
        name: '',
        email: '',
        role,
      }
    }
    return {
      id: 'deu ruim',
      name: '',
      email: '',
      role: 'deu ruim',
    } as User
  })

  async function SignIn({ email, password }: SignInCredencials) {
    const { sub, role } = await Authenticate({ email, password })
    const data = await getProfile()
    if (!data) {
      throw new Error('Não foi possível consultar o perfil')
    }
    let professional: ProfessionalProps | null = null
    if (role === 'profissional') {
      const { Professional: pro } = data
      professional = {
        id: pro[0].id,
        name: pro[0].name,
        birthDate: String(pro[0].birthDate),
        email: pro[0].email,
        cpf: pro[0].cpf,
        fone: pro[0].fone,
        address: pro[0].address,
        register: pro[0].register,
        specialty: pro[0].specialty,
        description: pro[0].description,
        status: pro[0].status,
        createdAt: String(pro[0].createdAt),
      }
    }
    setUser({
      id: sub,
      name: data.name,
      email: data.email,
      role,
      professional,
    })

    return { sub, role }
  }

  return (
    <AuthContext.Provider value={{ user, SignIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
