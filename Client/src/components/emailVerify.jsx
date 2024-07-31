import { Link } from "react-router-dom";
import {toast} from "react-hot-toast";
import axiuos from "../axious";
import {  useEffect,useState } from "react";


const EmailVerify = () => {

    const [isVerified, setisVerified] = useState(false)



    const success = async () => {
      try {
        const currentUrl = window.location.href;
    
        // Parse the URL to extract the path
        const urlParts = currentUrl.split('/');
    
        // Extract the userId from the path
        const userId = urlParts[urlParts.length - 1];
       
   
        // Wait for the axios post request to complete
        const response = await axiuos.get(`/auth/everify/${userId}`);
    
        // Set isVerified to true
        setisVerified(true);
    
        // Log the response data
        console.log(response.data);
    
        // Display a success toast with the response message
        toast.success(response.user);
    
      } catch (error) {
        // Log the error
        console.log(error);
    
        // Display an error toast with the error message
        toast.error(error.message);
    
        // Set isVerified to false
        setisVerified(false);
      }
    };
    

    useEffect(() => {
      
    
      success()
      
    })
    
   
    

 

  return (
    <div>

        {isVerified ? 
        (<>
        <p>Email Verified <Link to="/login">Login here</Link></p>
        
        </>)
        :
        (<>
        <p>Something Went Wrong Plaese Try again.</p>
        </>)
        }
      
    </div>
  )
}

export default EmailVerify
