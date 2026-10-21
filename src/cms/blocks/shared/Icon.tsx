import {
  AlertCircle, AlertTriangle, Award, Backpack, Banknote, Bell, BookOpen, Brain, Briefcase, Building, Bus, Calculator, Calendar,
  CalendarCheck, CalendarDays, CalendarX, Camera, CheckCircle, Clipboard, ClipboardCheck, ClipboardList, Clock, Compass,
  CreditCard, Crown, Download, Dumbbell, ExternalLink, Eye, FileText, FlaskConical, Flower2, Globe, GraduationCap, HandHeart,
  Heart, HeartHandshake, History, Image, Images, Info, Landmark, Languages, Laptop, Leaf, Library, Lightbulb, Lock, Mail, MapPin,
  Medal, MessageCircle, MessageSquareQuote, Monitor, Music, NotebookPen, Palette, PartyPopper, Pen, PenLine, Phone, Quote,
  Receipt, Repeat, Rocket, Ruler, Satellite, Scale, Scissors, ScrollText, Send, Shield, ShieldCheck, Shirt, ShoppingBag,
  Smartphone, Sparkles, Star, Stethoscope, Target, Trophy, User, UserPlus, Users, Wallet, Wind, Zap, type LucideIcon, type
  LucideProps,
} from 'lucide-react'
import type { IconName } from './icon-names'

export const ICON_COMPONENTS: Record<IconName, LucideIcon> = {
  AlertCircle, AlertTriangle, Award, Backpack, Banknote, Bell, BookOpen, Brain, Briefcase, Building, Bus, Calculator, Calendar,
  CalendarCheck, CalendarDays, CalendarX, Camera, CheckCircle, Clipboard, ClipboardCheck, ClipboardList, Clock, Compass,
  CreditCard, Crown, Download, Dumbbell, ExternalLink, Eye, FileText, FlaskConical, Flower2, Globe, GraduationCap, HandHeart,
  Heart, HeartHandshake, History, Image, Images, Info, Landmark, Languages, Laptop, Leaf, Library, Lightbulb, Lock, Mail, MapPin,
  Medal, MessageCircle, MessageSquareQuote, Monitor, Music, NotebookPen, Palette, PartyPopper, Pen, PenLine, Phone, Quote,
  Receipt, Repeat, Rocket, Ruler, Satellite, Scale, Scissors, ScrollText, Send, Shield, ShieldCheck, Shirt, ShoppingBag,
  Smartphone, Sparkles, Star, Stethoscope, Target, Trophy, User, UserPlus, Users, Wallet, Wind, Zap,
}

/** Renders a chosen icon by name; unknown names fall back to the given icon (or nothing) */
export function Icon({ name, fallback, ...props }: LucideProps & { name: string | null | undefined; fallback?: LucideIcon }) {
  const C = (name && ICON_COMPONENTS[name as IconName]) || fallback
  return C ? <C aria-hidden {...props} /> : null
}
