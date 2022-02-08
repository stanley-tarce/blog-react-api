import React, { useRef } from 'react'
import { sign_up } from '../API/api'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import signinsvg from '../assets/undraw_dreamer_re_9tua.svg'


function SignUp() {
    const emailRef = useRef('')
    const navigate = useNavigate()

    const [passwordRef, passwordConfirmRef] = [useRef(''), useRef('')]
    const SignUpDetails = [
        { label: 'Email:', type: 'email', placeholder: 'stanleytare18@gmail.com', ref: emailRef, },
        { label: 'Password:', type: 'password', placeholder: 'StanleyPogi123', ref: passwordRef, required: true },
        { label: 'Password Confirmation:', type: 'password', placeholder: 'StanleyPogi123', ref: passwordConfirmRef, required: true }
    ]
    const handleSubmit = (e) => {
        e.preventDefault()
        sign_up(emailRef.current.value, passwordRef.current.value, passwordConfirmRef.current.value)
            .then(response => {
                console.log(response)
                toast.success('Successfully signed up!')
                return navigate('/')
            })
            .catch((error) => {
                let errors = error.response.data.errors.full_messages
                errors.forEach(error => toast.error(error))
            })
    }

    return (
        <div className="w-screen h-screen flex justify-start items-center">
            <div className="h-full w-[70%] bg-main-purple flex justify-center items-center">
                <img className='w-full h-full p-[200px]' src={signinsvg} alt="undraw_dreamer_re_9tua" />
            </div>
            <div className="h-full w-[30%] bg-main-purple flex items-center justify-center">
                <div className="font-roboto w-[100%] h-[70%] bg-white flex flex-col justify-center items-center gap-4 px-10 mr-10">
                    <p className=" font-bold text-2xl w-full h-auto">Sign Up</p>
                    <form className="w-full h-auto flex flex-col justify-start gap-2">
                        {SignUpDetails.map(({ label, ...others }) => (
                            <div className="w-full h-auto flex flex-col gap-3">
                                <label className="text-[14px] w-auto h-auto">{label}</label>
                                <input className="outline-none border-[1px] border-solid border-main-purple p-[10px] rounded-[5px]" {...others} />
                            </div>
                        ))}
                        <button onClick={(e) => handleSubmit(e)} className="w-[50%] h-[50px] bg-main-purple text-white text-[14px] font-bold px-2 rounded-[5px] hover:bg-purple-500">Sign Up</button>
                        <p className="w-full h-auto text-[14px]">Already a member?<span className="text-main-purple cursor-pointer hover:text-purple-500" onClick={() => { navigate(-1) }}> Click Here!</span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
