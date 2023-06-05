import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Protected = ({children}) => {

    
    const {token, setNotification} = useStateContext()
    
    if (!token) {
        // Must do on other place bc got error message.
        // setNotification('You are log outed!!!')
        return <Navigate to="/brbrlogin" replace />;
    }
        
    return children;
};

export default Protected;