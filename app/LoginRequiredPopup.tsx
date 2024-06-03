'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface LoginRequiredPopupProps {
    onClose: () => void;
}

const LoginRequiredPopup: React.FC<LoginRequiredPopupProps> = ({ onClose }) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLoginRedirect = () => {
        router.push('/login');
        onClose();
    };

    return (
        <div style={styles.overlay}>
            <div ref={popupRef} className="bg-white p-6 rounded shadow-lg z-[100000]">
                <h2 className="text-2xl mb-4">You must log in to perform this action</h2>
                <div className="flex justify-end">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="px-4 py-2 mr-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        onClick={handleLoginRedirect}
                        className="px-4 py-2 bg-black text-white"
                    >
                        Log In
                    </Button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 99999,
    },
};

export default LoginRequiredPopup;
