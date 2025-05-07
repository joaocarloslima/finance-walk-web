"use client"

import { deleteCategory } from "@/actions/category-actions";
import CrudDropdown from "./crud-dropdown";
import Icon from "./icon";
import { useState } from "react";
import { toast } from "sonner";

interface CategoryItemProps {
    category: Category
}

export default function CategoryItem({ category }: CategoryItemProps){
    const [visible, setVisible] = useState(true)
   
    function handleDelete() {
        toast.promise(
            deleteCategory(category.id),
            {
                loading: "Apagando...",
                success: () => {
                    setVisible(false)
                    return "Categoria apagada com sucesso"
                },
                error: (error: any) => error.message
            }
        )
    }

    if (!visible) return null
    return(
        <div className="flex justify-between mt-2">
            <div className="flex gap-2">
                <Icon name={category.icon}/>
                <span>{category.name}</span>
            </div>

            <div>
                <CrudDropdown onDelete={handleDelete} />
            </div>
        </div>
    )
}