// Head Boy and Head Girl messages, as used by the CMS migration (copied from the original page).

export const headBoyMessage = `Respected Members of the School Community,

I am Udit Thakur, privileged to serve as the Head Boy of this esteemed institution for the academic year 2026-27.

Having been a part of this school for many years, I have witnessed its legacy of academic excellence, co-curricular achievements, and strong values. It is with gratitude that I accept this responsibility, aware of both the honour it brings and the duties it demands.

The opportunity to lead the student council, a role I have aspired to, is a milestone made possible through the trust and encouragement of my principal, mentors, peers, and the school administration.

As Head Boy, I am committed to serving with diligence, integrity, and fairness. I will strive to be an approachable leader, representing students with honesty while upholding the values of our institution.

I pledge to lead by example and foster an environment that is inclusive and respectful. Together, I hope to make this academic year one of achievement and meaningful experiences for all.

With highest regards,
Udit Thakur`

export const headGirlMessage = `Greetings to all our Readers,

I am Mehul Dhiman, honored to serve as the Head Girl of Sacred Heart Senior Secondary School, Sidhpur.

This school has been more than just a place of learning for me – it has been a second home where I have grown, discovered myself, and built dreams for the future.

My journey here, which began 7 years ago as a young and curious student, has gradually shaped me into the person I am today. From the nervous excitement of my early days to the confidence I carry now as a senior student, every moment has contributed to my growth.

The memories I have created here – whether in classrooms, during school events, or through meaningful friendships – will always hold a special place in my heart.

Our school has not only focused on academics but has also encouraged us to explore our talents, develop values, and become confident and responsible individuals.

I am deeply grateful to our principal, mentors, teachers, and the entire school community for their constant guidance, encouragement, and support.

As I take on this responsibility, I will carry out my duties with honesty and dedication. And I look forward to contributing positively and upholding the values our school stands for.

With gratitude and pride,
Mehul Dhiman`

export const leaderMessageCards = [
  {
    look: 'green' as const,
    photo: { src: '/images/Students/HeadBoy.webp', alt: 'Udit Thakur, Head Boy' },
    role: 'Head Boy',
    name: 'Udit Thakur',
    subtitle: 'Academic Year 2026-27',
    heading: 'A Message to the Sacred Heart Family',
    message: headBoyMessage,
  },
  {
    look: 'gold' as const,
    photo: { src: '/images/Students/HeadGirl.webp', alt: 'Mehul Dhiman, Head Girl' },
    role: 'Head Girl',
    name: 'Mehul Dhiman',
    subtitle: 'Academic Year 2026-27',
    heading: 'A Message to the Sacred Heart Family',
    message: headGirlMessage,
  },
]
