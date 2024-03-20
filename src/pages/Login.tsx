import { Button } from "antd"
import { FieldValues, useForm } from "react-hook-form"
import { useLoginMutation } from "../redux/features/auth/authApi"
import { useAppDispatch } from "../redux/hook"
import { TUser, setUser } from "../redux/features/auth/authSlice"
import { verifyToken } from "../utils/verifyToken"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = () => {
   const {register, handleSubmit} = useForm()
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

    const [login,{error}] = useLoginMutation()
  
   const onSubmit =async (data:FieldValues)=>{
    const toastId = toast.loading('Loggin In ')
      try {
       
    const userInfo = {
      id:data.id,
      password:data.password
    }

  const res= await  login(userInfo).unwrap()
   const user = verifyToken(res.data.accessToken) as TUser

   dispatch(setUser({user:user, token:res.data.accessToken}))
   toast.success('LoggIn success',{id:toastId,duration:2000})
      navigate(`/${user.role}/dashboard`)
      } catch (error) {
        toast.error('Something went wrong',{id:toastId,duration:2000})
      }
     
   }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       <div>
         <label htmlFor="id">Id</label>
         <br />
         <input type="text" id="id" {...register('id')}/>
       </div> 
       
       <div>
         <label htmlFor="password">Password</label>
         <br />
         <input type="text" id="password" {...register('password')}/>
       </div>

        <Button htmlType="submit">Login</Button>
    </form>
  )
}

export default Login