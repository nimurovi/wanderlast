'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import { Destination } from "./destination-card";
import { redirect } from "next/navigation";

const DeleteDestinationDialog = ({ destination }:{destination:Destination}) => {
    const { _id } = destination;

    async function handleDelete() {
        const res = await fetch(`http://localhost:8000/destinations/${_id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        redirect('/destinations');
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger  >
                <Button
                    type="button"
                    variant="outline"
                    className="border-red-200 bg-white text-red-500 hover:border-red-300 hover:bg-red-50"
                >
                    <Trash2Icon className="h-4 w-4" />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDestinationDialog;