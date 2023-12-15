import React, { useEffect } from "react";
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const useNotification = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const { log } = useSelector((state) => state.Log)

    useEffect(() => {
        if (log)
            toast({
                title: 'Notify',
                description: log.message,
                action: (
                    <ToastAction altText="Goto schedule to undo" onClick={() => {
                        () => {
                            navigate(`/${ref[0].ref}/${ref[0].id}`)
                        }
                    }
                    }>Undo</ToastAction>
                ),
            })
    }, [log])
    return {}
}

export default useNotification