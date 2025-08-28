"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/hooks/use-language"
import { useEmailJS, type EmailData } from "@/hooks/use-emailjs"

export default function ContactView() {
    const { t } = useLanguage()
    const { sendEmail, isLoading, error, clearError } = useEmailJS()
    const [formData, setFormData] = useState<EmailData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Limpa erros anteriores
        clearError()

        // Validação básica
        if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
            return
        }

        const success = await sendEmail(formData)

        if (success) {
            setIsSubmitted(true)
            setFormData({ name: "", email: "", subject: "", message: "" })

            // Remove a mensagem de sucesso após 7 segundos
            setTimeout(() => setIsSubmitted(false), 7000)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800/50 p-4 lg:p-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-float-delayed"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 animate-bounce-in">
                        <MessageCircle className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in">
                        {t('contact.title')}
                    </h1>
                    <p className="text-gray-400 text-base lg:text-xl max-w-2xl mx-auto leading-relaxed animate-slide-in-right">
                        {t('contact.subtitle')}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8 flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3"></div>
                                {t('contact.letsTalk')}
                            </h2>

                            {/* Contact Methods */}
                            <div className="space-y-4 lg:space-y-6">
                                {[
                                    {
                                        icon: <Mail className="w-6 h-6 lg:w-7 lg:h-7 text-white" />,
                                        title: t('contact.email'),
                                        value: "miguelfdiniz@gmail.com",
                                        subtitle: t('contact.response24h'),
                                        bgColor: "from-blue-500 to-blue-600",
                                        delay: "0ms"
                                    },
                                    {
                                        icon: <Phone className="w-6 h-6 lg:w-7 lg:h-7 text-white" />,
                                        title: t('contact.phone'),
                                        value: "+55 (31) 99565-6669",
                                        subtitle: t('contact.weekdays'),
                                        bgColor: "from-green-500 to-green-600",
                                        delay: "150ms"
                                    },
                                    {
                                        icon: <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-white" />,
                                        title: t('contact.location'),
                                        value: t('profile.location'),
                                        subtitle: t('contact.remoteAvailable'),
                                        bgColor: "from-purple-500 to-purple-600",
                                        delay: "300ms"
                                    }
                                ].map((contact, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-4 p-4 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover-lift group"
                                        style={{ animationDelay: contact.delay }}
                                    >
                                        <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${contact.bgColor} rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                            {contact.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-semibold text-base lg:text-lg group-hover:text-blue-400 transition-colors duration-300">
                                                {contact.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm lg:text-base font-medium">{contact.value}</p>
                                            <p className="text-gray-400 text-xs lg:text-sm">{contact.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Availability */}
                            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-green-500/30 transition-all duration-300 steam-glow">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center animate-pulse">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-white font-semibold text-base lg:text-lg">{t('contact.availability')}</h3>
                                </div>
                                <div className="space-y-3 text-gray-300 text-sm lg:text-base">
                                    {[
                                        t('contact.available'),
                                        t('contact.remote'),
                                        t('contact.freelance'),
                                        t('contact.consulting')
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3 group">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 steam-glow">
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 flex items-center">
                                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3"></div>
                                {t('contact.sendMessage')}
                            </h3>

                            {/* Success Message */}
                            {isSubmitted && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/50 rounded-xl flex items-center space-x-3 animate-bounce-in">
                                    <CheckCircle className="w-5 h-5 text-green-400 animate-pulse" />
                                    <span className="text-green-400 text-sm lg:text-base font-medium">
                                        {t('contact.success')}
                                    </span>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-red-600/20 to-red-600/20 border border-red-500/50 rounded-xl flex items-center space-x-3 animate-bounce-in">
                                    <AlertCircle className="w-5 h-5 text-red-400" />
                                    <div className="flex-1">
                                        <span className="text-red-400 text-sm lg:text-base font-medium block">
                                            Erro ao enviar mensagem
                                        </span>
                                        <span className="text-red-300 text-xs lg:text-sm">
                                            {error}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-white font-semibold mb-2 text-sm lg:text-base">
                                            {t('contact.name')} *
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input-enhanced text-white placeholder-gray-400"
                                            placeholder={t('contact.namePlaceholder')}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-white font-semibold mb-2 text-sm lg:text-base">
                                            {t('contact.email')} *
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input-enhanced text-white placeholder-gray-400"
                                            placeholder={t('contact.emailPlaceholder')}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-white font-semibold mb-2 text-sm lg:text-base">
                                        {t('contact.subject')} *
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="input-enhanced text-white placeholder-gray-400"
                                        placeholder={t('contact.subjectPlaceholder')}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-white font-semibold mb-2 text-sm lg:text-base">
                                        {t('contact.message')} *
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="input-enhanced min-h-[120px] lg:min-h-[150px] text-white placeholder-gray-400 resize-none"
                                        placeholder={t('contact.messagePlaceholder')}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="btn-enhanced w-full py-3 lg:py-4 text-sm lg:text-base font-semibold"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="spinner-enhanced w-4 h-4 mr-2" />
                                            {t('contact.sending')}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                                            {t('contact.send')}
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-gray-800/50">
                                <p className="text-gray-400 text-xs lg:text-sm text-center leading-relaxed">
                                    {t('contact.agreement')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}