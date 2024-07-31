import { useSelector } from "react-redux";
import { useNavigate,  } from "react-router-dom";
import { useEffect } from "react";

const EmailConfirmation = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)

    const usercheck = () => {
        if (user === null) {
            navigate('/')

            
        }

    }
    useEffect(() => {
      usercheck()
    }, [])
    
    return (
        <div className="flex items-center justify-center h-[80vh]  p-4">
            <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <svg
                        className="w-12 h-12 text-red-500 mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 8l9 6 9-6" />
                        <path d="M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8l9 6 9-6z" />
                    </svg>

                    <h2 className="text-2xl font-semibold text-white mb-2">
                        Email Sent
                    </h2>
                    <p className="text-gray-300">
                        An email has been sent to your email address. Please check your inbox and confirm your email.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmailConfirmation;
