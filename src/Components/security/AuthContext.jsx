import { createContext, useContext, useState } from "react";
import { executeRegistrationService } from "../Api/AuthenticationApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    async function registration(email, password, role) {
        try {
            const requestBody = { email, password, role };
            const response = await executeRegistrationService(requestBody);
            if(response.status === 200){
                setEmail(email);
                setRole(role);
                return true;
            }else{
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ registration, email, role }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
