'use client'

import { useState, useRef } from 'react'
import { MapPin, Phone, Mail, Send, CheckCircle, MessageCircle, Clock, User, Calendar, Building, Heart, Star, ArrowRight } from 'lucide-react'
import { schoolInfo } from '@/data/school'
import { m, AnimatePresence, useInView } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
}

const cardHoverVariants = {
  rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
}

const inputFocusVariants = {
  focus: { scale: 1.01, boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.15)" }
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      content: `${schoolInfo.address.street}, ${schoolInfo.address.tehsil}, District ${schoolInfo.address.district}, ${schoolInfo.address.state} - ${schoolInfo.address.pincode}`,
      color: 'from-primary-500 to-primary-700'
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      content: schoolInfo.contact.phones.join('\n'),
      color: 'from-secondary-500 to-secondary-700'
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: schoolInfo.contact.emails.join('\n'),
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      content: 'Monday - Saturday: 8:00 AM - 4:00 PM\nSunday: Closed',
      color: 'from-emerald-500 to-emerald-700'
    }
  ]

  const quickActions = [
    { icon: Building, label: 'About Us', desc: 'Learn about our school', href: '/about' },
    { icon: Calendar, label: 'Admissions', desc: 'Join our community', href: '/admission' },
    { icon: Star, label: 'Achievements', desc: 'Celebrate with us', href: '/achievements' },
  ]

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <m.div
            className="absolute top-20 left-10 w-72 h-72 bg-secondary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <m.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/5 rounded-full blur-[150px]" />

          {[...Array(5)].map((_, i) => (
            <m.div
              key={i}
              className="absolute text-secondary-400/30"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              <Star className="w-4 h-4" fill="currentColor" />
            </m.div>
          ))}

          <m.div
            className="absolute top-20 right-20 w-20 h-20 border-2 border-secondary-400/20 rounded-full"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <m.div
            className="absolute bottom-32 left-32 w-16 h-16 border-2 border-white/10 rounded-lg"
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <m.div
            className="absolute top-40 right-1/4 w-8 h-8 bg-secondary-400/10 rounded-full"
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
          <m.div
            className="absolute bottom-20 right-40 w-6 h-6 bg-white/10 rounded-full"
            animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <m.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <m.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
                <m.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle className="w-4 h-4 text-secondary-400" />
                </m.div>
                <span>Get in Touch</span>
              </div>
            </m.div>

            <m.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              variants={itemVariants}
            >
              Contact Us
            </m.h1>

            <m.p
              className="text-xl md:text-2xl text-gray-300 mb-8"
              variants={itemVariants}
            >
              We&apos;d love to hear from you. Reach out anytime!
            </m.p>

            <m.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <m.div
                className="glass px-5 py-3 rounded-xl border border-white/20 flex items-center gap-3"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
              >
                <m.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <Mail className="w-5 h-5 text-secondary-400" />
                </m.div>
                <span className="text-white/90 text-sm">Quick Response</span>
              </m.div>
              <m.div
                className="glass px-5 py-3 rounded-xl border border-white/20 flex items-center gap-3"
                whileHover={{ scale: 1.05, borderColor: "rgb(41, 32, 32)" }}
              >
                <Clock className="w-5 h-5 text-secondary-400" />
                <span className="text-white/90 text-sm">Mon-Sat: 8AM-4PM</span>
              </m.div>
            </m.div>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      <section ref={statsRef} className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <m.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
            >
              {[
                { value: '50+', label: 'Years of Excellence', icon: Star, color: 'text-secondary-500' },
                { value: '1000+', label: 'Alumni Network', icon: User, color: 'text-primary-500' },
                { value: '500+', label: 'Students Enrolled', icon: Building, color: 'text-blue-500' },
                { value: '100%', label: 'Dedication', icon: Heart, color: 'text-red-500' },
              ].map((stat, i) => (
                <m.div
                  key={i}
                  className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-primary-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <m.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <m.h2
                    className="text-2xl font-display font-bold text-primary-900 mb-2"
                    variants={itemVariants}
                  >
                    Contact Information
                  </m.h2>
                  <m.p className="text-gray-600 mb-8" variants={itemVariants}>
                    Fill up the form and our team will get back to you within 24 hours.
                  </m.p>

                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <m.div
                        key={index}
                        variants={itemVariants}
                        className="group bg-gray-50 rounded-xl p-5 hover:bg-gradient-to-br hover:shadow-lg transition-all duration-300 cursor-pointer"
                        whileHover={{ x: 5 }}
                        custom={index}
                      >
                        <div className="flex items-start gap-4">
                          <m.div
                            className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <info.icon className="w-6 h-6 text-white" />
                          </m.div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-primary-900 mb-1">{info.title}</h3>
                            <p className="text-gray-600 text-sm whitespace-pre-line">{info.content}</p>
                          </div>
                        </div>
                      </m.div>
                    ))}
                  </div>

                  <m.div
                    className="mt-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100"
                    variants={itemVariants}
                  >
                    <h3 className="font-semibold text-primary-900 mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-secondary-500" />
                      Quick Links
                    </h3>
                    <div className="space-y-2">
                      {quickActions.map((action, i) => (
                        <m.a
                          key={i}
                          href={action.href}
                          className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-primary-50 transition-colors group"
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-center gap-3">
                            <action.icon className="w-5 h-5 text-primary-600" />
                            <div>
                              <p className="font-medium text-primary-900 text-sm">{action.label}</p>
                              <p className="text-xs text-gray-500">{action.desc}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                        </m.a>
                      ))}
                    </div>
                  </m.div>
                </m.div>
              </div>

              <div className="lg:col-span-3">
                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <m.h2
                    className="text-2xl font-display font-bold text-primary-900 mb-2"
                    variants={itemVariants}
                  >
                    Send us a Message
                  </m.h2>
                  <m.p className="text-gray-600 mb-8" variants={itemVariants}>
                    Have questions? We&apos;re here to help!
                  </m.p>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <m.div
                        key="success"
                        className="bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-3xl p-10 text-center border border-green-200 shadow-xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      >
                        <m.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                          className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                          style={{ boxShadow: "0 20px 40px -10px rgba(34, 197, 94, 0.4)" }}
                        >
                          <CheckCircle className="w-12 h-12 text-white" />
                        </m.div>
                        <m.h3
                          className="text-3xl font-display font-bold text-green-800 mb-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          Message Sent!
                        </m.h3>
                        <m.p
                          className="text-green-700 mb-6 max-w-md mx-auto"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          Thank you for reaching out. Our team will get back to you within 24 hours.
                        </m.p>
                        <m.button
                          onClick={() => {
                            setSubmitted(false)
                            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
                          }}
                          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Send Another Message
                          <ArrowRight className="w-4 h-4" />
                        </m.button>
                      </m.div>
                    ) : (
                      <m.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <m.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <m.div className="grid md:grid-cols-2 gap-6 mb-6" variants={itemVariants}>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <User className="w-4 h-4 text-primary-600" />
                                Your Name
                              </label>
                              <m.input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                required
                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                placeholder="John Doe"
                                variants={inputFocusVariants}
                                animate={focusedField === 'name' ? 'focus' : 'rest'}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary-600" />
                                Email Address
                              </label>
                              <m.input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                required
                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                placeholder="john@example.com"
                                variants={inputFocusVariants}
                                animate={focusedField === 'email' ? 'focus' : 'rest'}
                              />
                            </div>
                          </m.div>

                          <m.div className="grid md:grid-cols-2 gap-6 mb-6" variants={itemVariants}>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary-600" />
                                Phone Number
                              </label>
                              <m.input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('phone')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                placeholder="+91 98765 43210"
                                variants={inputFocusVariants}
                                animate={focusedField === 'phone' ? 'focus' : 'rest'}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-primary-600" />
                                Subject
                              </label>
                              <m.input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('subject')}
                                onBlur={() => setFocusedField(null)}
                                required
                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                placeholder="How can we help?"
                                variants={inputFocusVariants}
                                animate={focusedField === 'subject' ? 'focus' : 'rest'}
                              />
                            </div>
                          </m.div>

                          <m.div className="mb-8" variants={itemVariants}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <MessageCircle className="w-4 h-4 text-primary-600" />
                              Your Message
                            </label>
                            <m.textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              onFocus={() => setFocusedField('message')}
                              onBlur={() => setFocusedField(null)}
                              required
                              rows={6}
                              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none bg-gray-50 focus:bg-white"
                              placeholder="Tell us more about your inquiry..."
                              variants={inputFocusVariants}
                              animate={focusedField === 'message' ? 'focus' : 'rest'}
                            />
                          </m.div>

                          <m.button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary-900/20 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <m.div
                              className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <span className="relative z-10 flex items-center gap-3">
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              Send Message
                            </span>
                          </m.button>

                          <m.p
                            className="text-center text-gray-500 text-sm mt-4"
                            variants={itemVariants}
                          >
                            We typically respond within 24 hours
                          </m.p>
                        </m.div>
                      </m.form>
                    )}
                  </AnimatePresence>
                </m.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <m.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <m.div
              className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
              style={{ boxShadow: "0 0 40px rgba(251, 191, 36, 0.5)" }}
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 40px rgba(251, 191, 36, 0.5)",
                  "0 0 60px rgba(251, 191, 36, 0.7)",
                  "0 0 40px rgba(251, 191, 36, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-10 h-10 text-primary-900" />
            </m.div>
            <m.h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Visit Us Today!
            </m.h3>
            <m.p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
              Experience the warmth and excellence of Sacred Heart Senior Secondary School in person
            </m.p>
            <m.a
              href={`https://maps.google.com/?q=${encodeURIComponent(schoolInfo.address.street + ', ' + schoolInfo.address.tehsil)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 px-10 py-4 rounded-full font-bold text-lg hover:from-secondary-300 hover:to-secondary-400 transition-all duration-300 shadow-xl group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-5 h-5" />
              <span>Get Directions</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </m.a>
          </m.div>
        </div>
      </section>
    </>
  )
}
