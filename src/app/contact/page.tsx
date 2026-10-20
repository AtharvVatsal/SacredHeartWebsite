'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, Phone, Mail, Send, CheckCircle, MessageCircle, Clock, User, Calendar, Building, Heart, Star, ArrowRight, BookOpen, GraduationCap, Users, Loader2, Briefcase } from 'lucide-react'
import { schoolInfo, statistics, schoolLocation } from '@/data/school'
import { m, AnimatePresence, useInView } from 'framer-motion'
import Field, { fieldA11y } from '@/components/forms/Field'
import SubmissionNotice from '@/components/forms/SubmissionNotice'
import { mailtoHref, schoolEmail, schoolPhones, telHref } from '@/lib/contact'
import { type FieldErrors, checkEmail, checkName, checkPhone, checkRequired, deliverForm, firstErrorId, formatForEmail } from '@/lib/forms'
import { formatStat } from '@/lib/stats'

// Set this to a service that accepts a JSON POST. Until then the form prepares an email instead.
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT

const emptyForm = { name: '', email: '', phone: '', subject: '', message: '' }
type ContactForm = typeof emptyForm
const fieldOrder = Object.keys(emptyForm) as (keyof ContactForm)[]

const statIcons = [Star, Users, GraduationCap, BookOpen]

function validate(form: ContactForm): FieldErrors<ContactForm> {
  return {
    name: checkName(form.name),
    email: checkEmail(form.email),
    phone: checkPhone(form.phone, false),
    subject: checkRequired(form.subject),
    message: checkRequired(form.message),
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 }
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

const labelClass = "text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"

const inputClass = (error?: string, extra = "") =>
  `w-full px-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${error ? "border-red-400" : "border-gray-200"} ${extra}`

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'failed' | 'email'>('idle')
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState<FieldErrors<ContactForm>>({})
  const noticeRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  const mailto = mailtoHref(
    formData.subject || 'Enquiry from the school website',
    formatForEmail([
      ['Name', formData.name],
      ['Email', formData.email],
      ['Phone', formData.phone],
      ['Message', formData.message],
    ])
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(formData)
    setErrors(found)
    const firstId = firstErrorId(found, fieldOrder, 'contact')
    if (firstId) {
      document.getElementById(firstId)?.focus()
      return
    }

    if (!ENDPOINT) {
      setStatus('email')
      window.location.href = mailto
      return
    }

    setStatus('submitting')
    const result = await deliverForm(ENDPOINT, { form: 'contact', ...formData })
    setStatus(result.status)
  }

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus()
    else if (status === 'email' || status === 'failed') {
      noticeRef.current?.scrollIntoView({ block: 'center' })
      noticeRef.current?.focus({ preventScroll: true })
    }
  }, [status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactForm]) setErrors(prev => ({ ...prev, [name]: undefined }))
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
      links: schoolPhones.map(phone => ({ label: phone, href: telHref(phone) })),
      color: 'from-secondary-500 to-secondary-700'
    },
    {
      icon: Mail,
      title: 'Email Us',
      links: schoolInfo.contact.emails.map(email => ({ label: email, href: `mailto:${email}` })),
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      content: 'Monday – Saturday: 8:00 AM – 2:30 PM\nSunday: Holiday\nThe office is closed on non-working days, including national and state holidays.',
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
              <a
                href={telHref(schoolPhones[0])}
                className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/25 flex items-center gap-3 hover:bg-white/20 transition-colors"
              >
                <Phone aria-hidden className="w-5 h-5 text-secondary-400" />
                <span className="text-white text-sm font-medium">Call {schoolPhones[0]}</span>
              </a>
              <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/25 flex items-center gap-3">
                <Clock aria-hidden className="w-5 h-5 text-secondary-400" />
                <span className="text-white text-sm font-medium">Mon-Sat: 8AM-4PM</span>
              </div>
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
              {statistics.map((stat, i) => {
                const Icon = statIcons[i % statIcons.length]
                return (
                  <m.div
                    key={stat.label}
                    className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100"
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                  >
                    <Icon aria-hidden className="w-6 h-6 text-primary-700 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary-900">{formatStat(stat)}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </m.div>
                )
              })}
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
                    Call or email the school office, or visit during office hours.
                  </m.p>

                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <m.div
                        key={index}
                        variants={itemVariants}
                        className="group bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
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
                            {info.links ? (
                              <ul className="space-y-1">
                                {info.links.map(link => (
                                  <li key={link.href}>
                                    <a href={link.href} className="text-sm font-medium text-primary-800 underline underline-offset-2 hover:text-primary-900 break-all">
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-600 text-sm whitespace-pre-line">{info.content}</p>
                            )}
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
                    {status === 'sent' ? (
                      <m.div
                        key="success"
                        className="bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-3xl p-10 text-center border border-green-200 shadow-xl"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                      >
                        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                          <CheckCircle aria-hidden className="w-12 h-12 text-white" />
                        </div>
                        <h3 ref={successRef} tabIndex={-1} className="text-3xl font-display font-bold text-green-800 mb-3 outline-none">
                          Message received
                        </h3>
                        <p className="text-green-800 mb-6 max-w-md mx-auto">
                          The school office has received your message and will reply to {formData.email}.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setStatus('idle')
                            setFormData(emptyForm)
                          }}
                          className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors"
                        >
                          Send Another Message
                          <ArrowRight aria-hidden className="w-4 h-4" />
                        </button>
                      </m.div>
                    ) : (
                      <m.form
                        key="form"
                        noValidate
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
                          {!ENDPOINT && (
                            <m.p className="mb-6 rounded-xl bg-secondary-50 border border-secondary-100 p-4 text-sm text-gray-700" variants={itemVariants}>
                              Pressing <strong>Prepare email</strong> opens your email app with your message filled in — press Send there to reach the school. Nothing is sent from this website itself.
                            </m.p>
                          )}
                          <m.div className="grid md:grid-cols-2 gap-6 mb-6" variants={itemVariants}>
                            <Field
                              id="contact-name"
                              required
                              error={errors.name}
                              labelClassName={labelClass}
                              label={<><User aria-hidden className="w-4 h-4 text-primary-700" />Your Name</>}
                            >
                              <input
                                {...fieldA11y('contact-name', errors.name)}
                                type="text"
                                name="name"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={inputClass(errors.name)}
                                placeholder="Your full name"
                              />
                            </Field>
                            <Field
                              id="contact-email"
                              required
                              error={errors.email}
                              labelClassName={labelClass}
                              label={<><Mail aria-hidden className="w-4 h-4 text-primary-700" />Email Address</>}
                            >
                              <input
                                {...fieldA11y('contact-email', errors.email)}
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={inputClass(errors.email)}
                                placeholder="name@example.com"
                              />
                            </Field>
                          </m.div>

                          <m.div className="grid md:grid-cols-2 gap-6 mb-6" variants={itemVariants}>
                            <Field
                              id="contact-phone"
                              error={errors.phone}
                              labelClassName={labelClass}
                              label={<><Phone aria-hidden className="w-4 h-4 text-primary-700" />Phone Number (optional)</>}
                            >
                              <input
                                {...fieldA11y('contact-phone', errors.phone)}
                                type="tel"
                                name="phone"
                                inputMode="tel"
                                autoComplete="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className={inputClass(errors.phone)}
                                placeholder="+91 98765 43210"
                              />
                            </Field>
                            <Field
                              id="contact-subject"
                              required
                              error={errors.subject}
                              labelClassName={labelClass}
                              label={<><MessageCircle aria-hidden className="w-4 h-4 text-primary-700" />Subject</>}
                            >
                              <input
                                {...fieldA11y('contact-subject', errors.subject)}
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className={inputClass(errors.subject)}
                                placeholder="How can we help?"
                              />
                            </Field>
                          </m.div>

                          <m.div className="mb-8" variants={itemVariants}>
                            <Field
                              id="contact-message"
                              required
                              error={errors.message}
                              labelClassName={labelClass}
                              label={<><MessageCircle aria-hidden className="w-4 h-4 text-primary-700" />Your Message</>}
                            >
                              <textarea
                                {...fieldA11y('contact-message', errors.message)}
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className={inputClass(errors.message, 'resize-none')}
                                placeholder="Tell us more about your inquiry..."
                              />
                            </Field>
                          </m.div>

                          <m.button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full bg-gradient-to-r from-primary-700 to-primary-800 text-white py-4 rounded-xl font-bold text-lg hover:from-primary-800 hover:to-primary-900 hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                            variants={itemVariants}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="flex items-center gap-3">
                              {status === 'submitting' ? (
                                <><Loader2 aria-hidden className="w-5 h-5 animate-spin" />Sending...</>
                              ) : (
                                <><Send aria-hidden className="w-5 h-5" />{ENDPOINT ? 'Send Message' : 'Prepare email'}</>
                              )}
                            </span>
                          </m.button>

                          {status === 'email' && (
                            <div className="mt-6">
                              <SubmissionNotice ref={noticeRef} tone="info" title="Finish in your email app" mailto={mailto}>
                                <p>
                                  Your email app should have opened with your message filled in. <strong>Nothing has been sent yet</strong> — press Send in your email app. If it didn&apos;t open, use the button below or call the school office.
                                </p>
                              </SubmissionNotice>
                            </div>
                          )}
                          {status === 'failed' && (
                            <div className="mt-6">
                              <SubmissionNotice ref={noticeRef} tone="error" title="Your message could not be sent" mailto={mailto}>
                                <p>
                                  The school has <strong>not</strong> received your message. It is still in the form — try again in a moment, or email or call the school instead.
                                </p>
                              </SubmissionNotice>
                            </div>
                          )}
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

      {/* Careers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <m.div
            className="max-w-5xl mx-auto rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-8 md:p-10 grid md:grid-cols-5 gap-8 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:col-span-3">
              <p className="text-sm font-semibold text-secondary-800 tracking-wider uppercase mb-2 inline-flex items-center gap-2">
                <Briefcase aria-hidden className="w-4 h-4" /> Join Our Team
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-900 mb-3">Career Opportunities</h2>
              <p className="text-gray-700 leading-relaxed">
                Be a part of our dedicated team and help inspire, educate and shape the future of young minds. To apply, email your resume to the school with the post you are applying for in the subject line.
              </p>
              <p className="text-sm text-gray-600 mt-3">Send your resume as a .doc or .pdf file, up to 5 MB. If it is larger, please compress it.</p>
            </div>
            <div className="md:col-span-2 flex md:justify-end">
              <a
                href={mailtoHref('Job application: [post you are applying for]', 'Name:\nContact number:\nPost applied for:\n\nPlease attach your resume.')}
                className="active:scale-95 inline-flex items-center gap-2 bg-primary-700 text-white px-7 py-4 rounded-full font-semibold hover:bg-primary-800 transition-colors shadow-lg"
              >
                <Mail aria-hidden className="w-5 h-5" /> Email your resume
              </a>
            </div>
          </m.div>
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
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schoolLocation.plusCode)}`}
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
