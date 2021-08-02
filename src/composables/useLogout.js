import { ref } from "vue";
import { projectAuth } from "../firebase/config";


const error = ref(null)
const logout = async () => {
    try {
        await projectAuth.signOut()
    } catch (err) {
        console.log(err.message)
        error.value = 'Logout fail'
    }
}

const useLogout = () => {
    return { error, logout }
}

export { useLogout }