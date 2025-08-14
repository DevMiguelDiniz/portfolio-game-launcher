"use client"

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
      <div className="h-full overflow-y-auto bg-gray-950">
        {/* Hero Section */}
        <div className="bg-gray-900 border-b border-gray-800 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">Entre em contato</h1>
            <p className="text-gray-400 text-lg">
              Tem um projeto em mente? Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Vamos conversar</h2>

                {/* Contact Methods */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Email</h3>
                      <p className="text-gray-300">seu.email@exemplo.com</p>
                      <p className="text-gray-400 text-sm">Resposta em até 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Telefone</h3>
                      <p className="text-gray-300">+55 (11) 99999-9999</p>
                      <p className="text-gray-400 text-sm">Seg-Sex, 9h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Localização</h3>
                      <p className="text-gray-300">São Paulo, Brasil</p>
                      <p className="text-gray-400 text-sm">Disponível para trabalho remoto</p>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-green-500" />
                    <h3 className="text-white font-semibold text-lg">Disponibilidade</h3>
                  </div>
                  <div className="space-y-2 text-gray-300">
                    <p>✅ Disponível para novos projetos</p>
                    <p>✅ Trabalho remoto ou presencial</p>
                    <p>✅ Projetos freelance e full-time</p>
                    <p>✅ Consultoria técnica</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6">Envie uma mensagem</h3>

                {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-600/20 border border-green-600/50 rounded-lg flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-400">Mensagem enviada com sucesso! Retornarei em breve.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-white font-semibold mb-2">
                        Nome *
                      </label>
                      <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-600"
                          placeholder="Seu nome completo"
                          required
                          disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-white font-semibold mb-2">
                        Email *
                      </label>
                      <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-600"
                          placeholder="seu.email@exemplo.com"
                          required
                          disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-white font-semibold mb-2">
                      Assunto *
                    </label>
                    <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-600"
                        placeholder="Sobre o que você gostaria de conversar?"
                        required
                        disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-semibold mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[150px] focus:border-blue-600"
                        placeholder="Conte-me sobre seu projeto, suas necessidades e como posso ajudar..."
                        required
                        disabled={isSubmitting}
                    />
                  </div>

                  <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                      disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Enviando...
                        </>
                    ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar mensagem
                        </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-800">
                  <p className="text-gray-400 text-sm text-center">
                    Ao enviar esta mensagem, você concorda que eu entre em contato sobre seu projeto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
