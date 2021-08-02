import { ref } from "vue";
import { projectAuth } from "../firebase/config";


const error = ref(null)

const signup = async (email, password, displayName) => {
    error.value = null
    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw Error('request not complete')
        }

        await res.user.updateProfile({ displayName })
        return res
    } catch (err) {
        error.value = err.message
        console.log(err.message)
    }
}

const useSignup = () => {
    return { error, signup }
}

export { useSignup }