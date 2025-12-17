import { createContext, useContext, useState } from "react";
import { executeClientRegistrationService3, executeFreelancerRegistrationService, executeLoginService, executeRegistrationService } from "../Api/AuthenticationApiService";
import { apiClient } from "../Api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState(null);
    const [userID, setUserID] = useState(null);
    const [token, setToken] = useState(null);

    async function registration(registrationRequestBody) {
        try {
            const response = await executeRegistrationService(registrationRequestBody);
            if(response.status === 200){
                setEmail(registrationRequestBody.email);
                setRole(registrationRequestBody.role);
                console.log("Registration success!");
                return true;
            }else{
                console.log("respose is not 200!");
                return false;
            }
        } catch (error) {
            console.log("Exception during registration process!");
            return false;
        }
    }

    async function login(loginRequestBody){
        try{
            const response = await executeLoginService(loginRequestBody);
            if(response.status === 200){
                console.log(response);
                console.log(response.data);

                setAuthenticated(true);
                setUsername(response.data.username)
                setUserID(response.data.userID);
                setToken(response.data.token);
                localStorage.setItem('userID', response.data.userID);
                localStorage.setItem('token', 'Bearer ' + response.data.token);

                const jwtToken = 'Bearer ' + response.data.token;

                apiClient.interceptors.request.use(
                    (config) =>{
                    console.log('Intercepting and adding a token');
                    config.headers.Authorization = jwtToken;
                    return config;
                    }
                )
                return true;
            }else{
                console.log("status is not ok");
                return false;
            }
        }catch(error){
            console.log("exception");
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ registration, login, username, userID, email, role }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
