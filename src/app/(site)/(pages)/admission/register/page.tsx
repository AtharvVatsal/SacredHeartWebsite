'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Phone, Mail, Calendar, GraduationCap, MapPin, BookOpen, Users, CheckCircle, Loader2 } from 'lucide-react'
import { m } from 'framer-motion'
import Field, { fieldA11y } from '@/components/forms/Field'
import SubmissionNotice from '@/components/forms/SubmissionNotice'
import { mailtoHref } from '@/lib/contact'
import HeroDecor from '@/components/layout/HeroDecor'
import { ClipboardList as HeroMotif, PenLine as HeroMotifSmall } from 'lucide-react'
import {
  type FieldErrors,
  checkDateOfBirth,
  checkEmail,
  checkName,
  checkPhone,
  checkPincode,
  checkRequired,
  deliverForm,
  firstErrorId,
  formatForEmail,
} from '@/lib/forms'

const classes = [
  'Nursery',
  'Kindergarten 1',
  'Kindergarten 2',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
]

const streams = [
  'Science (Medical)',
  'Science (Non-Medical)',
  'Commerce',
  'Humanities',
  'Not Applicable',
]

// Set this to a service that accepts a JSON POST (e.g. a route handler that emails the office).
// Until it is configured the form prepares an email instead and never claims to have sent anything.
const ENDPOINT = process.env.NEXT_PUBLIC_ADMISSION_FORM_ENDPOINT

const emptyForm = {
  studentName: '',
  dateOfBirth: '',
  gender: '',
  class: '',
  stream: '',
  previousSchool: '',
  fatherName: '',
  motherName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  message: '',
}
type RegistrationForm = typeof emptyForm

const fieldOrder = Object.keys(emptyForm) as (keyof RegistrationForm)[]

function validate(form: RegistrationForm): FieldErrors<RegistrationForm> {
  return {
    studentName: checkName(form.studentName),
    dateOfBirth: checkDateOfBirth(form.dateOfBirth),
    gender: checkRequired(form.gender),
    class: checkRequired(form.class),
    fatherName: checkName(form.fatherName),
    motherName: checkName(form.motherName),
    email: checkEmail(form.email),
    phone: checkPhone(form.phone),
    address: checkRequired(form.address),
    city: checkName(form.city),
    pincode: checkPincode(form.pincode),
  }
}

function emailBody(form: RegistrationForm) {
  return formatForEmail([
    ['Student name', form.studentName],
    ['Date of birth', form.dateOfBirth],
    ['Gender', form.gender],
    ['Class applying for', form.class],
    ['Stream preference', form.stream],
    ['Previous school', form.previousSchool],
    ["Father's name", form.fatherName],
    ["Mother's name", form.motherName],
    ['Email', form.email],
    ['Phone', form.phone],
    ['Address', form.address],
    ['City', form.city],
    ['PIN code', form.pincode],
    ['Additional information', form.message],
  ])
}

const inputClass = (error?: string, extra = '') =>
  `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
    error ? 'border-red-400 bg-red-50/40' : 'border-gray-200'
  } ${extra}`

export default function RegisterPage() {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState<FieldErrors<RegistrationForm>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'failed' | 'email'>('idle')
  const noticeRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear a field's error as soon as it is edited
    if (errors[name as keyof RegistrationForm]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const mailto = mailtoHref(`Admission enquiry: ${formData.studentName || 'new student'}`, emailBody(formData))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(formData)
    setErrors(found)
    const firstId = firstErrorId(found, fieldOrder, 'register')
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
    const result = await deliverForm(ENDPOINT, { form: 'admission-registration', ...formData })
    setStatus(result.status)
  }

  // Bring whatever the outcome is into view and give it focus
  useEffect(() => {
    if (status === 'sent') {
      window.scrollTo({ top: 0 })
      successRef.current?.focus()
    } else if (status === 'email' || status === 'failed') {
      noticeRef.current?.scrollIntoView({ block: 'center' })
      noticeRef.current?.focus({ preventScroll: true })
    }
  }, [status])

  if (status === 'sent') {
    return (
      <section className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center pt-20">
        <div className="max-w-lg mx-auto text-center px-4">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle aria-hidden className="w-12 h-12 text-green-700" />
          </div>
          <h1 ref={successRef} tabIndex={-1} className="text-3xl font-display font-bold text-primary-900 mb-4 outline-none">
            Registration received
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            The school has received your details for {formData.studentName}. The admission office will contact you at {formData.phone} or {formData.email}.
          </p>
          <Link
            href="/admission"
            className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-800 transition-all shadow-lg"
          >
            <ArrowLeft size={18} />
            Back to Admission
          </Link>
        </div>
      </section>
    )
  }

  const submitLabel = ENDPOINT ? 'Submit Registration' : 'Prepare email to the school'

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white pt-32 pb-20 overflow-hidden">
        <HeroDecor icon={HeroMotif} secondaryIcon={HeroMotifSmall} />
        <div className="absolute inset-0 overflow-hidden">
          <m.div
            className="absolute top-20 left-10 w-64 h-64 bg-secondary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <m.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        <m.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl">
            <div className="flex flex-col gap-3">
              <Link href="/admission" className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors">
                <ArrowLeft size={16} />Back to Admission
              </Link>
              <m.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/20 w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <GraduationCap className="w-4 h-4 text-secondary-400" />
                Admissions
              </m.div>
            </div>
            <m.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Register Interest
            </m.h1>
            <m.p
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Take the first step towards your child&apos;s bright future
            </m.p>
          </div>
        </m.div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none -mt-1">
          <svg className="relative block w-[calc(130%+1.3px)] h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary-50"></path>
          </svg>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Info Card */}
            <m.div
              className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-2xl p-6 mb-8 border border-secondary-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-secondary-700" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-primary-900 mb-2">How This Works</h2>
                  {ENDPOINT ? (
                    <p className="text-gray-700 text-sm">
                      Fill out this form to register your interest in admission. The admission office will contact you to guide you through the next steps.
                    </p>
                  ) : (
                    <p className="text-gray-700 text-sm">
                      Fill out this form, then press <strong>Prepare email to the school</strong>. Your email app will open with your details filled in — press Send there to register your interest. Nothing is sent from this website itself. You can also call the school office.
                    </p>
                  )}
                </div>
              </div>
            </m.div>

            {/* Form */}
            <m.form
              noValidate
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-gray-600 mb-8">Fields marked * are required.</p>

              {/* Student Details */}
              <div className="mb-10">
                <h3 className="text-lg font-display font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-700" />
                  </div>
                  Student Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field id="register-studentName" label="Student Name" required error={errors.studentName}>
                    <input
                      {...fieldA11y('register-studentName', errors.studentName)}
                      type="text"
                      name="studentName"
                      autoComplete="name"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                      className={inputClass(errors.studentName)}
                      placeholder="Enter student's full name"
                    />
                  </Field>
                  <Field id="register-dateOfBirth" label="Date of Birth" required error={errors.dateOfBirth}>
                    <div className="relative">
                      <Calendar aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        {...fieldA11y('register-dateOfBirth', errors.dateOfBirth)}
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        className={inputClass(errors.dateOfBirth, 'pl-12')}
                      />
                    </div>
                  </Field>
                  <Field id="register-gender" label="Gender" required error={errors.gender}>
                    <select
                      {...fieldA11y('register-gender', errors.gender)}
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className={inputClass(errors.gender, 'bg-white')}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                  <Field id="register-class" label="Class Applying For" required error={errors.class}>
                    <div className="relative">
                      <GraduationCap aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <select
                        {...fieldA11y('register-class', errors.class)}
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        required
                        className={inputClass(errors.class, 'pl-12 bg-white appearance-none')}
                      >
                        <option value="">Select Class</option>
                        {classes.map(cls => (
                          <option key={cls} value={cls}>{cls}</option>
                        ))}
                      </select>
                    </div>
                  </Field>
                  {parseInt(formData.class?.replace('Class ', '')) >= 11 && (
                    <Field id="register-stream" label="Stream Preference">
                      <select
                        id="register-stream"
                        name="stream"
                        value={formData.stream}
                        onChange={handleChange}
                        className={inputClass(undefined, 'bg-white')}
                      >
                        <option value="">Select Stream</option>
                        {streams.map(stream => (
                          <option key={stream} value={stream}>{stream}</option>
                        ))}
                      </select>
                    </Field>
                  )}
                  <Field id="register-previousSchool" label="Previous School (if any)" className="md:col-span-2">
                    <input
                      id="register-previousSchool"
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      className={inputClass()}
                      placeholder="Name of previous school"
                    />
                  </Field>
                </div>
              </div>

              {/* Parent Details */}
              <div className="mb-10 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-display font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-secondary-700" />
                  </div>
                  Parent/Guardian Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field id="register-fatherName" label="Father's Name" required error={errors.fatherName}>
                    <input
                      {...fieldA11y('register-fatherName', errors.fatherName)}
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                      className={inputClass(errors.fatherName)}
                      placeholder="Enter father's full name"
                    />
                  </Field>
                  <Field id="register-motherName" label="Mother's Name" required error={errors.motherName}>
                    <input
                      {...fieldA11y('register-motherName', errors.motherName)}
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      required
                      className={inputClass(errors.motherName)}
                      placeholder="Enter mother's full name"
                    />
                  </Field>
                </div>
              </div>

              {/* Contact Details */}
              <div className="mb-10 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-display font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary-700" />
                  </div>
                  Contact Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field id="register-email" label="Email Address" required error={errors.email}>
                    <div className="relative">
                      <Mail aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        {...fieldA11y('register-email', errors.email)}
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass(errors.email, 'pl-12')}
                        placeholder="parent@email.com"
                      />
                    </div>
                  </Field>
                  <Field id="register-phone" label="Phone Number" required error={errors.phone}>
                    <div className="relative">
                      <Phone aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        {...fieldA11y('register-phone', errors.phone)}
                        type="tel"
                        name="phone"
                        inputMode="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={inputClass(errors.phone, 'pl-12')}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </Field>
                  <Field id="register-address" label="Address" required error={errors.address} className="md:col-span-2">
                    <div className="relative">
                      <MapPin aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <input
                        {...fieldA11y('register-address', errors.address)}
                        type="text"
                        name="address"
                        autoComplete="street-address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className={inputClass(errors.address, 'pl-12')}
                        placeholder="House No., Street, Village/Town"
                      />
                    </div>
                  </Field>
                  <Field id="register-city" label="City" required error={errors.city}>
                    <input
                      {...fieldA11y('register-city', errors.city)}
                      type="text"
                      name="city"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className={inputClass(errors.city)}
                      placeholder="City"
                    />
                  </Field>
                  <Field id="register-pincode" label="PIN Code" required error={errors.pincode}>
                    <input
                      {...fieldA11y('register-pincode', errors.pincode)}
                      type="text"
                      name="pincode"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      maxLength={6}
                      className={inputClass(errors.pincode)}
                      placeholder="176057"
                    />
                  </Field>
                </div>
              </div>

              {/* Additional Message */}
              <Field id="register-message" label="Additional Information (Optional)" className="mb-10 pt-8 border-t border-gray-100">
                <textarea
                  id="register-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={inputClass(undefined, 'resize-none')}
                  placeholder="Any specific questions or information you'd like to share..."
                />
              </Field>

              {/* Submit Button */}
              <m.button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-primary-700 to-primary-800 text-white py-4 px-8 rounded-xl font-semibold hover:from-primary-800 hover:to-primary-900 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                whileHover={{ scale: status === 'submitting' ? 1 : 1.01 }}
                whileTap={{ scale: status === 'submitting' ? 1 : 0.99 }}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    {submitLabel}
                    <ArrowLeft className="rotate-180" size={18} />
                  </>
                )}
              </m.button>

              {status === 'email' && (
                <div className="mt-6">
                  <SubmissionNotice ref={noticeRef} tone="info" title="Finish in your email app" mailto={mailto}>
                    <p>
                      Your email app should have opened with your details filled in. <strong>Nothing has been sent yet</strong> — press Send in your email app to register your interest. If it didn&apos;t open, use the button below or call the school office.
                    </p>
                  </SubmissionNotice>
                </div>
              )}
              {status === 'failed' && (
                <div className="mt-6">
                  <SubmissionNotice ref={noticeRef} tone="error" title="Your registration could not be sent" mailto={mailto}>
                    <p>
                      The school has <strong>not</strong> received your details. Your answers are still in the form — try again in a moment, or send them by email or phone instead.
                    </p>
                  </SubmissionNotice>
                </div>
              )}

              <p className="text-center text-gray-600 text-sm mt-6">
                By submitting this form, you agree to our{' '}
                <Link href="/privacy" className="text-primary-800 underline hover:text-primary-900">Privacy Policy</Link>
                {' '}and{' '}
                <Link href="/terms" className="text-primary-800 underline hover:text-primary-900">Terms of Use</Link>.
              </p>
            </m.form>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <m.h2
            className="text-2xl md:text-3xl font-display font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Need Immediate Assistance?
          </m.h2>
          <p className="text-gray-200 mb-6">
            Call or email the school office for help with admissions
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary-400 text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-secondary-300 transition-all shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
