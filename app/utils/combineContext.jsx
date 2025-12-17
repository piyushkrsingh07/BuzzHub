export default function combineContext(...providers){
    return ({children})=>{
        console.log(typeof providers,Array.isArray(providers),'see provider type')
        return providers.reduceRight((accumulator,CurrentProvider)=>{
            return <CurrentProvider>{accumulator}</CurrentProvider>
        },children) //INTIAIL VALUE
    }
}


