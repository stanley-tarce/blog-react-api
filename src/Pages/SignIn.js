import React, { useRef, useContext } from 'react'
import { CreateContext } from '../ContextStore'
import { sign_in } from '../API/api'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import signinsvg from '../assets/undraw_dreamer_re_9tua.svg'

function SignIn() {
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    const { setHeaders, setUser } = useContext(CreateContext)
    const SignInDetails = [
        { label: 'Email:', type: 'email', placeholder: 'stanleytare18@gmail.com', ref: emailRef, },
        { label: 'Password:', type: 'password', placeholder: 'StanleyPogi123', ref: passwordRef, required: true }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        sign_in(emailRef.current.value, passwordRef.current.value)
            .then(response => {
                setHeaders({
                    'access-token': response.headers['access-token'],
                    'client': response.headers.client,
                    'uid': response.headers.uid,
                    'token-type': response.headers['token-type'],
                })
                console.log(response)
                setUser({
                    id: response.data.data.id,
                    email: response.data.data.email
                })
                toast.success('Successfully signed in!')
                return navigate('/main')
            })
            .catch((error) => { error.response.data.errors.forEach(error => toast.error(error)) })
    }

    return (
        <div className="w-screen h-screen flex justify-start items-center text-[14px]">
            <div className="h-full w-[70%] bg-main-purple flex justify-center items-center">
                <img className='w-full h-full p-[200px]' src={signinsvg} alt="undraw_dreamer_re_9tua" />
            </div>
            <div className="h-full w-[30%] bg-main-purple flex items-center justify-center">
                <div className="font-roboto w-[100%] h-[70%] bg-white flex flex-col justify-center items-center gap-4 px-10 mr-10">
                    <p className=" font-bold text-2xl w-full h-auto">Sign In</p>
                    <form className="w-full h-auto flex flex-col justify-start gap-4">
                        {SignInDetails.map(({ label, ...others }) => (
                            <div className="w-full h-auto flex flex-col gap-3">
                                <label className="text-[14px] w-auto h-auto">{label}</label>
                                <input className="outline-none border-[1px] border-solid border-main-purple p-[10px] rounded-[5px]" {...others} />
                            </div>
                        ))}
                        <button onClick={(e) => handleSubmit(e)} className="w-[50%] h-[50px] bg-main-purple text-white text-[14px] font-bold px-2 rounded-[5px] hover:bg-purple-500">Enter</button>
                        <p className="w-full h-auto text-[14px]">Not yet a member?<span className="text-main-purple cursor-pointer hover:text-purple-500" onClick={() => { navigate('/signup') }}> Click Here!</span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
