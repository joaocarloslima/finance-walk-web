import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Pencil, Trash } from "lucide-react"
interface CrudDropdownProps {
    onDelete?: () => void,
    onEdit?: () => void
}

export default function CrudDropdown({onDelete, onEdit}: CrudDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={onEdit}>
                    <Pencil />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>
                    <Trash />
                    Apagar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}