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
} from "@/components/ui/alert-dialog"

export const AlertDialogContext = createContext<any>(null);

const AlertDialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<{ title: string, content: string } | null>(null);
    const [open, setOpen] = useState<boolean>(false);

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
                    <AlertDialogAction>Entendido</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogProvider