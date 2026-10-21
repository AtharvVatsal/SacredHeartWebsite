// Content of the Rules & Regulations page (admission/rules), as used by the CMS migration.
// Lists are one item per entry. The original page (legacy-page.tsx) keeps its own copy of the same text.
import type { IconName } from '@/cms/blocks/shared/icon-names'

export interface RuleCard {
  title: string
  icon: IconName
  tone: 'green' | 'red'
  intro: string
  numbered: string[]
  bullets: string[]
  bulletIcon: 'CheckCircle' | 'Scissors' | 'AlertCircle'
  bulletTone: 'green' | 'red'
  alertTone: 'none' | 'red' | 'yellow'
  alert: string
  note: string
}

const card = (c: Partial<RuleCard> & Pick<RuleCard, 'title' | 'icon'>): RuleCard => ({
  tone: 'green',
  intro: '',
  numbered: [],
  bullets: [],
  bulletIcon: 'CheckCircle',
  bulletTone: 'green',
  alertTone: 'none',
  alert: '',
  note: '',
  ...c,
})

export const ruleCards: RuleCard[] = [
  card({
    title: 'General Rules',
    icon: 'BookOpen',
    intro: 'The school day commences with a prayer at assembly. At the sound of the bell, all must line up for the assembly after which they shall walk in silence to their respective class rooms.',
    bullets: [
      'All the students should attend the morning and afternoon assembly.',
      'The students should come to school daily in full uniform; they must be clean and tidy.',
      'Rules of politeness must be observed by all the pupils; they must respect everyone.',
      'Every student is expected to have a school diary which must be brought to school daily.',
      'All must speak English only on the school premises and in their respective vehicles while travelling in a group.',
      'Except when it rains, no one is allowed inside the classroom during games and break.',
      'Students are forbidden to write or scribble on the walls, desks, or throw paper or ink in the classroom or outside.',
      'Any damage to school property is to be made good by the defaulter. In case the defaulter is not traceable, then collectively all the students of the particular class shall make good the loss. This is intended to develop a civil sense.',
    ],
  }),
  card({
    title: 'Uniform & Grooming',
    icon: 'Users',
    bulletIcon: 'Scissors',
    bullets: [
      'Wearing of jewelry of any sort is not allowed in school except for a pair of simple earrings in case of girl students.',
      'Students are not allowed to come to school with any fancy haircut following the fashion of the day.',
      'Girls with long hair must make two plaits with white ribbons and those with short hair must have plain bob and wear a white hair band.',
      'Use of henna/mehandi, nail polish, kajal etc. is forbidden in the school.',
    ],
  }),
  card({
    title: 'Prohibited Items',
    icon: 'AlertCircle',
    tone: 'red',
    intro:
      'Students are forbidden to bring to school articles such as mobile phones, walkman, watches, iPods, cameras, CDs, video games, other games, cassettes, other valuables, objectionable literature or any equipment which may cause injury or hurt others. Silver foil and tissue papers are also not allowed in the school.',
    alertTone: 'red',
    alert: 'If any student is seen with any of these items, it will be taken away and never returned and the student will be suspended from the school.',
  }),
  card({
    title: 'School Bag & Property',
    icon: 'Backpack',
    bullets: [
      'Pupils are responsible for the safe custody of their books and belongings.',
      'Metal cases and fancy bags should not be used as school bags. Proposed colors are brown, black, dark blue or grey.',
    ],
  }),
  card({
    title: 'Attendance & Discipline',
    icon: 'Clock',
    intro: 'The school accepts no responsibility if a student is obliged to return home during class hours because of failure to:',
    numbered: ['Wear proper school uniform.', 'Bring proper class books.', "Get parent's/guardian's signature wherever necessary.", 'Attend the class on time.'],
    bullets: [
      'Every student must take part in the school games and other activities unless found physically unfit or exempted by the principal for a specific reason.',
      'Exemption from P.T. and Judo/Karate will require explicit written application from the parents.',
      'Sick students should not be sent to school.',
      'If a student falls sick or gets hurt in the school, the parents will be informed. The student will be sent home only with the parents. Under unavoidable circumstances, the student may be sent home with a guardian, provided there is a written authority letter from the parents concerned.',
      'Attendance for all school functions is compulsory. Irregular attendance, habitual idleness, disobedience or conduct injurious to the moral tone of the school will be dealt with severely.',
    ],
  }),
  card({
    title: 'Discipline Card System',
    icon: 'Shield',
    intro:
      'To ensure proper discipline, pink, grey and white card system is introduced. For minor breach of discipline a pink card and for major ones grey card is given. Three pink cards are equivalent to one grey card. These cards are cumulative.',
    alertTone: 'yellow',
    alert:
      'A student who possesses a grey card will neither be allowed to take part in any school functions like annual function, cultural programmes, election of office bearers, etc., nor represent the school in outside activities. A holder of three grey cards will have to leave the school.',
    note: 'A white card is given for outstanding meritorious deeds.',
  }),
  card({
    title: 'Important Notes',
    icon: 'AlertCircle',
    bulletIcon: 'AlertCircle',
    bulletTone: 'red',
    bullets: [
      'The school authorities reserve the right to dismiss any student at any time if they deem it necessary.',
      'Students are not allowed to receive visitors, make phone calls or leave the school premises during school hours without the permission of the principal.',
      'No books or magazines other than the text or library books may be brought to school.',
      'No collection of money for any purpose whatsoever may be made in the school without the permission of the Principal.',
      'If the report card is lost, parents must apply in writing for issuing a new one with a fine of Rs. 100/-.',
      'To ensure their own safety, students are not permitted to visit shops or buy from vendors outside the school gate. In case of breach of this rule, the school does not accept responsibility for any mishap.',
    ],
  }),
]

export const rulesClosing = {
  title: 'Our Expectation',
  text: 'Sacred Heart school students should be polite among themselves and behave at all times in a friendly and loving manner, remembering that their school is judged by their conduct. They should maintain cleanliness and discipline everywhere.',
}
