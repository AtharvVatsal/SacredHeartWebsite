import {
  AlertCircle, AlertTriangle, Award, Backpack, Banknote, Bell, BookOpen, Brain, Briefcase, Building, Bus, Calculator, Calendar,
  CalendarCheck, CalendarDays, CalendarX, Camera, CheckCircle, Clipboard, ClipboardCheck, ClipboardList, Clock, Compass, CreditCard,
  Crown, Dumbbell, Eye, FileText, FlaskConical, Flower2, Globe, GraduationCap, HandHeart, Heart, HeartHandshake, History, Image,
  Info, Landmark, Languages, Laptop, Leaf, Library, Lightbulb, Lock, Mail, MapPin, Medal, MessageSquareQuote, Monitor, Music,
  Palette, PartyPopper, PenLine, Phone, Quote, Receipt, Rocket, Ruler, Scale, ScrollText, Shield, ShieldCheck, Shirt, Smartphone,
  Sparkles, Star, Stethoscope, Target, Trophy, User, UserPlus, Users, Wallet, Zap, type LucideIcon, type LucideProps,
} from 'lucide-react'
import type { IconName } from './icon-names'

export const ICON_COMPONENTS: Record<IconName, LucideIcon> = {
  AlertCircle, AlertTriangle, Award, Backpack, Banknote, Bell, BookOpen, Brain, Briefcase, Building, Bus, Calculator, Calendar,
  CalendarCheck, CalendarDays, CalendarX, Camera, CheckCircle, Clipboard, ClipboardCheck, ClipboardList, Clock, Compass, CreditCard,
  Crown, Dumbbell, Eye, FileText, FlaskConical, Flower2, Globe, GraduationCap, HandHeart, Heart, HeartHandshake, History, Image,
  Info, Landmark, Languages, Laptop, Leaf, Library, Lightbulb, Lock, Mail, MapPin, Medal, MessageSquareQuote, Monitor, Music,
  Palette, PartyPopper, PenLine, Phone, Quote, Receipt, Rocket, Ruler, Scale, ScrollText, Shield, ShieldCheck, Shirt, Smartphone,
  Sparkles, Star, Stethoscope, Target, Trophy, User, UserPlus, Users, Wallet, Zap,
}

/** Renders a chosen icon by name; unknown names fall back to the given icon (or nothing) */
export function Icon({ name, fallback, ...props }: LucideProps & { name: string | null | undefined; fallback?: LucideIcon }) {
  const C = (name && ICON_COMPONENTS[name as IconName]) || fallback
  return C ? <C aria-hidden {...props} /> : null
}
