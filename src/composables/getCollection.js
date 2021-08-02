import { ref, watchEffect } from "vue"
import { projectFirestore } from "../firebase/config"



const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)

    const collectionRef = projectFirestore.collection(collection)
        .orderBy('createAt')

    const unsub = collectionRef.onSnapshot((snap) => {
        // console.log('onSnapshot')
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        error.value = err.message
    })

    watchEffect((onInvalidate) => {
        // unsub from prev collection when watcher is stopped (component unmount)
        onInvalidate(() => unsub())
    })

    return { error, documents }

}


export { getCollection }