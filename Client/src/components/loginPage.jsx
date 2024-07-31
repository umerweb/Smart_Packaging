import LoginForm from './login';
import RegisterForm from './register';
import {  useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    
  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)

  const usercheck = () => {
    if (user !== null) {
      navigate('/')
      console.log("ok if")


    }else{
        console.log("ok not else")
    }

  }
  useEffect(() => {
    usercheck()
  }, [])

    const [SelectForm, setSelectForm] = useState("login");

    // const login = document.getElementById('login');
    // const register = document.getElementById('regitr')

    const handleLoginForm = () => {
        setSelectForm('login');
        console.log(SelectForm)
        // login.style.display = 'flex';
        // register.style.display = 'none';
    }
    const handleRegisterForm = () => {
        setSelectForm('register')
        console.log(SelectForm)
        // login.style.display = 'none';
        // register.style.display = 'register';
    }






    return (
        <div>
           



            <div className='flex min-h-[100vh]'>




                {/*           LOGIN FORM                    */}
                {SelectForm === 'login' &&
                    <div id='login' className="flex w-[100%]">
                        <div className="flex justify-center items-center  min-w-[50%] animate-slide-from-right">
                            <LoginForm handleRegisterForm={handleRegisterForm} />

                        </div>
                        <div className="flex bg-fuchsia-300 min-w-[50%]  animate-slide-from-left items-center">
                            <div className='w-[100%] h-[100%]' style={{ backgroundImage: 'url(image.png)', backgroundSize:'cover', backgroundPosition: 'center'}}></div>


                        </div>
                    </div>
                }




                {/*           REGISTER FORM                    */}
                {SelectForm === 'register' &&
                    <div id='regitr' className="flex w-[100%]">
                        <div className=" flex  bg-rose-300 w-[50%] animate-slide-from-right">
                        <div className='w-[100%]  h-[100%]' style={{ backgroundImage: 'url(image.png)', backgroundSize:'cover', backgroundPosition: 'center'}}></div>

                        </div>
                        <div className=" flex justify-center items-center  w-[50%] animate-slide-from-left">
                            <RegisterForm handleLoginForm={handleLoginForm} />

                        </div>
                    </div>
                }


            </div>



        </div>
    )
}

export default LoginPage
