import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'
import { schoolInfo, navigation } from '@/data/school'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Sacred Heart Sr. Sec. School</h3>
            <p className="text-gray-300 text-sm mb-4">
              Nurturing Hearts, Shaping Futures since 1969. Providing quality education rooted in Christian values.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.slice(0, 5).map((item) => (
                <li key={item.text}>
                  <Link href={item.href} className="text-gray-300 hover:text-white text-sm">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
                <span>
                  P.O. Sidhpur, Tehsil Dharamshala<br />
                  District Kangra, HP - 176057
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>01892-222428, 86290-99633</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>scjmshs.sidhpur@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Office Hours</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Monday - Friday: 8:00 AM - 3:00 PM</li>
              <li>Saturday: 8:00 AM - 12:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Sacred Heart Sr. Sec. School. All rights reserved.</p>
          <p className="mt-2">Affiliated to CISCE, New Delhi | Managed by Sisters of Charity of Jesus and Mary</p>
        </div>
      </div>
    </footer>
  )
}
