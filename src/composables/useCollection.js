import { ref } from "vue"
import { projectFirestore } from "../firebase/config"

const useCollection = (collection) => {
    const error = ref("")
    const addDoc = async (doc) => {
        try {
            await projectFirestore.collection(collection).add(doc)
        }
        catch (err) {
            console.log(err.message)
            error.value('Could not send message')
        }

    }

    return { error, addDoc }
}

export { useCollection }