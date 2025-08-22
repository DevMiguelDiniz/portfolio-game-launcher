"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/hooks/use-language"

export default function ContactView() {
    const { t } = useLanguage()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })

        setTimeout(() => setIsSubmitted(false), 5000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="h-full overflow-y-auto bg-gray-950">
            {/* Hero Section */}
            <div className="bg-gray-900 border-b border-gray-800 p-4 lg:p-8">
                <div className="max-w-4xl mx-auto text-center">
                    <MessageCircle className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-4" />
                    <h1 className="text-2xl lg:text-4xl font-bold text-white mb-4 lg:mb-4">{t('contact.title')}</h1>
                    <p className="text-gray-400 text-sm lg:text-lg">
                        {t('contact.subtitle')}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8">{t('contact.letsTalk')}</h2>

                            {/* Contact Methods */}
                            <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
                                <div className="flex items-center space-x-3 lg:space-x-4">
                                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <Mail className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-base lg:text-lg">{t('contact.email')}</h3>
                                        <p className="text-gray-300 text-sm lg:text-base">miguelfdiniz@gmail.com</p>
                                        <p className="text-gray-400 text-xs lg:text-sm">{t('contact.response24h')}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 lg:space-x-4">
                                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-green-600 rounded-lg flex items-center justify-center">
                                        <Phone className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-base lg:text-lg">{t('contact.phone')}</h3>
                                        <p className="text-gray-300 text-sm lg:text-base">+55 (31) 99565-6669</p>
                                        <p className="text-gray-400 text-xs lg:text-sm">{t('contact.weekdays')}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 lg:space-x-4">
                                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-600 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-base lg:text-lg">{t('contact.location')}</h3>
                                        <p className="text-gray-300 text-sm lg:text-base">{t('profile.location')}</p>
                                        <p className="text-gray-400 text-xs lg:text-sm">{t('contact.remoteAvailable')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800">
                                <div className="flex items-center space-x-3 mb-3 lg:mb-4">
                                    <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                                    <h3 className="text-white font-semibold text-base lg:text-lg">{t('contact.availability')}</h3>
                                </div>
                                <div className="space-y-2 text-gray-300 text-sm lg:text-base">
                                    <p>✅ {t('contact.available')}</p>
                                    <p>✅ {t('contact.remote')}</p>
                                    <p>✅ {t('contact.freelance')}</p>
                                    <p>✅ {t('contact.consulting')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-900 rounded-lg p-4 lg:p-8 border border-gray-800">
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">{t('contact.sendMessage')}</h3>

                            {isSubmitted && (
                                <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-green-600/20 border border-green-600/50 rounded-lg flex items-center space-x-3">
                                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
                                    <span className="text-green-400 text-sm lg:text-base">
                    {t('contact.success')}
                  </span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                                <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
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
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-600 text-sm lg:text-base"
                                            placeholder={t('contact.namePlaceholder')}
                                            required
                                            disabled={isSubmitting}
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
                                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-600 text-sm lg:text-base"
                                            placeholder={t('contact.emailPlaceholder')}
                                            required
                                            disabled={isSubmitting}
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
                                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-600 text-sm lg:text-base"
                                        placeholder={t('contact.subjectPlaceholder')}
                                        required
                                        disabled={isSubmitting}
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
                                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[120px] lg:min-h-[150px] focus:border-blue-600 text-sm lg:text-base"
                                        placeholder={t('contact.messagePlaceholder')}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 lg:py-3 text-sm lg:text-base"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            {t('contact.sending')}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                                            {t('contact.send')}
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-800">
                                <p className="text-gray-400 text-xs lg:text-sm text-center">
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