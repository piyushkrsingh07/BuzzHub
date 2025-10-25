import User from "../model/user";

export default function crudRepository(model){
    return {
       
        create:async function (data){
      try {
        console.log("📦 Creating new document:", data);
        const newDoc = await model.create(data);
        return newDoc;
      } catch (err) {
        console.error("❌ Error creating document:", err);
        throw err;
      }
    },
        getAll:async function (){
            const allDocs=await model.find()
            return allDocs
        },
        getById:async function (id){
            const doc=await model.findById(id)
            return doc
        },
        delete:async function (id){
            const response=await model.findByIdAndDelete(id)
            return response
        },
        update:async function (id,data){
            const updatedDoc=await model.findByIdAndUpdate(id,data,{new:true})
            return updatedDoc
        }
    }
}