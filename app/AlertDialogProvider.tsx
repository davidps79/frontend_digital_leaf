"use client"

import React, { createContext, useState } from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';

export const AlertDialogContext = createContext<any>(null);

const AlertDialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<{ title: string, content: string } | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();

    const showAlertDialog = (title: string, content: string) => {
        setAlert({ title, content });
        setOpen(true);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContext.Provider value={{ showAlertDialog }}>
                {children}
            </AlertDialogContext.Provider>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {alert?.title}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {alert?.content}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    {
                        alert?.title == "Inicia sesión" ?
                            <>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => router.push("/login")}>Iniciar sesión</AlertDialogAction>
                            </>
                            :
                            <AlertDialogAction>Entendido</AlertDialogAction>

                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogProvider