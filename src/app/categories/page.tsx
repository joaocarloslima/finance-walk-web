import { getCategories } from "@/actions/category-actions";
import CategoryItem from "@/components/category-item";
import NavBar from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function CategoriesPage() {

    const data: Category[] = await getCategories()

    return (
        <>
            <NavBar active="categorias" />

            <main className="flex justify-center">
                <div className="bg-slate-900 m-4 p-4 rounded min-w-2/3">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-semibold">Categorias</h2>
                        <Button asChild>
                            <Link href="/categories/form">
                                <Plus />
                                nova categoria
                            </Link>
                        </Button>
                    </div>

                    {data.map(category => <CategoryItem key={category.id} category={category} />)}

                   
                </div>
            </main>
        </>
    )
}