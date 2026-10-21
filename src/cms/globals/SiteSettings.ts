import type { Field, GlobalConfig } from 'payload'
import { anyone, isAdmin } from '../access'
import { isSafeHref } from '../document/fields'
import { revalidatePaths } from '../revalidate'
import { defaultSiteSettings as d } from '@/lib/site-settings'

const linkValidate = (value: unknown) => (!value || (typeof value === 'string' && isSafeHref(value)) ? true : 'Links must start with /, #, https://, mailto: or tel:')
const httpsValidate = (value: unknown) => (!value || (typeof value === 'string' && /^https:\/\/[^\s]+$/.test(value)) ? true : 'Use a full https:// address')

const link = (name: string, label: string, extra: Partial<Field> = {}): Field =>
  ({ name, label, type: 'text', maxLength: 500, validate: linkValidate, ...extra }) as Field

const navChildFields: Field[] = [
  { name: 'text', type: 'text', required: true, maxLength: 60, label: 'Label' },
  link('href', 'Link', { required: true }),
  { name: 'external', type: 'checkbox', label: 'Opens another website or a document (new tab)' },
]

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: {
    group: 'Website',
    description: 'School details, menu, header and footer, shared by every page. Changes go live when you save.',
  },
  access: { read: anyone, update: isAdmin, readVersions: isAdmin },
  versions: { max: 30 },
  hooks: {
    afterChange: [({ req }) => revalidatePaths(req.payload, [], { layout: true })],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'identity',
          label: 'School',
          fields: [
            { name: 'name', type: 'text', required: true, maxLength: 60, defaultValue: d.identity.name, label: 'Short name (header, footer)' },
            { name: 'fullName', type: 'text', required: true, maxLength: 100, defaultValue: d.identity.fullName, label: 'Full name' },
            { name: 'tagline', type: 'text', maxLength: 120, defaultValue: d.identity.tagline },
            { name: 'affiliation', type: 'text', maxLength: 80, defaultValue: d.identity.affiliation },
            { name: 'established', type: 'number', min: 1800, max: 2100, defaultValue: d.identity.established, label: 'Year established' },
            { name: 'management', type: 'text', maxLength: 120, defaultValue: d.identity.management, label: 'Managed by' },
            { name: 'principal', type: 'text', maxLength: 80, defaultValue: d.identity.principal },
            { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo', admin: { description: 'Square image, at least 180 × 180 pixels. Leave empty to keep the current school logo.' } },
          ],
        },
        {
          name: 'contact',
          label: 'Contact',
          fields: [
            { name: 'phones', type: 'array', maxRows: 6, labels: { singular: 'Phone number', plural: 'Phone numbers' }, defaultValue: d.contact.phones.map((number) => ({ number })), fields: [{ name: 'number', type: 'text', required: true, maxLength: 30, validate: (v: unknown) => (typeof v === 'string' && /^[+\d][\d\s()-]{5,}$/.test(v) ? true : 'Enter a phone number, for example 01892-222428') }] },
            { name: 'emails', type: 'array', maxRows: 4, labels: { singular: 'Email address', plural: 'Email addresses' }, defaultValue: d.contact.emails.map((email) => ({ email })), fields: [{ name: 'email', type: 'email', required: true }] },
            {
              name: 'address',
              type: 'group',
              fields: [
                { name: 'street', type: 'text', maxLength: 80, defaultValue: d.contact.address.street },
                { name: 'tehsil', type: 'text', maxLength: 60, defaultValue: d.contact.address.tehsil, label: 'Town / tehsil' },
                { name: 'district', type: 'text', maxLength: 60, defaultValue: d.contact.address.district },
                { name: 'state', type: 'text', maxLength: 60, defaultValue: d.contact.address.state },
                { name: 'pincode', type: 'text', maxLength: 10, defaultValue: d.contact.address.pincode, label: 'PIN code' },
              ],
            },
            { name: 'mapPlusCode', type: 'text', maxLength: 80, defaultValue: d.contact.mapPlusCode, label: 'Google Maps plus code', admin: { description: 'Used for the directions link, for example 59R3+G4 Sidhpur, Himachal Pradesh' } },
          ],
        },
        {
          name: 'onlineServices',
          label: 'Online services',
          description: 'Links to the fee portal, registration and the school app (run by the school’s software provider).',
          fields: (Object.keys(d.onlineServices) as (keyof typeof d.onlineServices)[]).map((key) => ({
            name: key,
            type: 'text' as const,
            maxLength: 500,
            defaultValue: d.onlineServices[key],
            validate: httpsValidate,
            label: { feePortal: 'Fee payment portal', registrationPortal: 'Online registration portal', alumniRegistration: 'Alumni registration', androidApp: 'School app (Android)', iosApp: 'School app (iPhone)' }[key],
          })),
        },
        {
          label: 'Menu',
          fields: [
            {
              name: 'navigation',
              type: 'array',
              maxRows: 10,
              label: 'Main menu',
              labels: { singular: 'Menu item', plural: 'Menu items' },
              admin: { description: 'The order here is the order in the header and footer. Drag to reorder.' },
              defaultValue: d.navigation,
              fields: [
                ...navChildFields,
                { name: 'summary', type: 'text', maxLength: 140, label: 'Summary at the top of the dropdown (optional)' },
                { name: 'children', type: 'array', maxRows: 12, label: 'Sub-pages', labels: { singular: 'Sub-page', plural: 'Sub-pages' }, fields: navChildFields },
              ],
            },
          ],
        },
        {
          name: 'header',
          label: 'Header',
          fields: [
            { name: 'applyLabel', type: 'text', maxLength: 30, defaultValue: d.header.applyLabel, label: 'Header button text' },
            link('applyHref', 'Header button link', { defaultValue: d.header.applyHref }),
            { name: 'mobileApplyLabel', type: 'text', maxLength: 40, defaultValue: d.header.mobileApplyLabel, label: 'Button text in the phone menu' },
          ],
        },
        {
          name: 'footer',
          label: 'Footer',
          fields: [
            { name: 'description', type: 'textarea', maxLength: 300, defaultValue: d.footer.description, label: 'Text under the school name' },
            {
              name: 'quickLinks',
              type: 'array',
              maxRows: 8,
              label: 'Quick links',
              defaultValue: d.footer.quickLinks,
              fields: [
                { name: 'text', type: 'text', required: true, maxLength: 60, label: 'Label' },
                link('href', 'Link', { required: true }),
              ],
            },
            {
              name: 'social',
              type: 'array',
              maxRows: 6,
              label: 'Social media',
              admin: { description: 'Shown in the footer when added.' },
              fields: [
                { name: 'platform', type: 'select', required: true, options: ['Facebook', 'Instagram', 'YouTube', 'X', 'LinkedIn', 'WhatsApp'].map((p) => ({ label: p, value: p })) },
                { name: 'url', type: 'text', required: true, maxLength: 500, validate: httpsValidate, label: 'Address' },
              ],
            },
          ],
        },
        {
          name: 'announcement',
          label: 'Announcement',
          description: 'An optional message shown at the bottom of every page, for example for admissions or a holiday.',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: false, label: 'Show the announcement' },
            { name: 'message', type: 'text', maxLength: 160, label: 'Message' },
            { name: 'linkLabel', type: 'text', maxLength: 40, label: 'Button text (optional)' },
            link('linkHref', 'Button link (optional)'),
            { name: 'tone', type: 'select', defaultValue: 'info', options: [{ label: 'Green (general)', value: 'info' }, { label: 'Gold (important)', value: 'important' }] },
          ],
        },
      ],
    },
  ],
}
