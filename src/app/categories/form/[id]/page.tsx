import { getCategoryById } from "@/actions/category-actions"
import FormEdit from "./form-edit"


interface Params {
    params: Promise<{id: number}>
}

export default async function CategoryFormEditPage({params}: Params) {
    const {id} = await params
    const category = await getCategoryById(id)

    return <FormEdit category={category} />
       
    
}

