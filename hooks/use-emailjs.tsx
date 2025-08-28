"use client"

import { useState } from 'react'
import emailjs from '@emailjs/browser'

export interface EmailData {
    name: string
    email: string
    subject: string
    message: string
}

export const useEmailJS = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendEmail = async (formData: EmailData): Promise<boolean> => {
        setIsLoading(true)
        setError(null)

        try {
            // Verifica se as variáveis de ambiente estão configuradas
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

            if (!publicKey || !serviceId || !templateId) {
                throw new Error('EmailJS não está configurado corretamente. Verifique as variáveis de ambiente.')
            }

            // Inicializa o EmailJS
            emailjs.init(publicKey)

            // Prepara os dados do template
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_name: 'Miguel Diniz', // Seu nome
                reply_to: formData.email,
            }

            // Envia o email
            const response = await emailjs.send(
                serviceId,
                templateId,
                templateParams
            )

            if (response.status === 200) {
                return true
            } else {
                throw new Error('Falha ao enviar email')
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao enviar email'
            setError(errorMessage)
            console.error('Erro no EmailJS:', err)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    return {
        sendEmail,
        isLoading,
        error,
        clearError: () => setError(null)
    }
}