// School fee structure, session 2026-27, as published by the school (LKG to Class VIII, and Class XI).
// Amounts in rupees. Each class lists its fee by quarter; LKG, UKG and XI show itemised heads,
// Classes I to VIII show the total payable for each quarter. Classes IX, X and XII are not published.

export interface FeeRow {
  item: string
  period: string
  amount: number
}

export interface FeeQuarter {
  rows: FeeRow[]
  total: number
}

export interface FeeCategory {
  name: string
  quarters: FeeQuarter[]
}

export interface ClassFees {
  id: string
  label: string
  categories: FeeCategory[]
}

export const feeSession = '2026-27'

// One-time admission fee, charged once whichever class (LKG to XI) a student joins
export const admissionFee = 14000

export const classFees: ClassFees[] = [
  {
    id: 'lkg',
    label: 'LKG',
    categories: [
      {
        name: 'New admission',
        quarters: [
          {
            rows: [
              { item: 'Admission Fee', period: 'February 2026', amount: 14000 },
              { item: 'Development Fee', period: 'February 2026', amount: 3000 },
              { item: 'Craft', period: 'February 2026', amount: 300 },
              { item: 'Exam Fee', period: 'February 2026', amount: 1000 },
              { item: 'Annual Requisites', period: 'February 2026', amount: 3000 },
              { item: 'Tuition Fee', period: 'February 2026 to March 2026', amount: 4800 },
              { item: 'Campus Care', period: 'February 2026 to March 2026', amount: 200 },
              { item: 'Smart Class', period: 'February 2026 to March 2026', amount: 500 },
            ],
            total: 26800,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'April 2026 to June 2026', amount: 7200 },
              { item: 'Campus Care', period: 'April 2026 to June 2026', amount: 300 },
              { item: 'Smart Class', period: 'April 2026 to June 2026', amount: 750 },
            ],
            total: 8250,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'July 2026 to October 2026', amount: 9600 },
              { item: 'Campus Care', period: 'July 2026 to October 2026', amount: 400 },
              { item: 'Smart Class', period: 'July 2026 to October 2026', amount: 1000 },
            ],
            total: 11000,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'November 2026 to January 2027', amount: 7200 },
              { item: 'Campus Care', period: 'November 2026 to January 2027', amount: 300 },
              { item: 'Smart Class', period: 'November 2026 to January 2027', amount: 750 },
            ],
            total: 8250,
          },
        ],
      },
    ],
  },
  {
    id: 'ukg',
    label: 'UKG',
    categories: [
      {
        name: 'New admission',
        quarters: [
          {
            rows: [
              { item: 'Admission Fee', period: 'February 2026', amount: 14000 },
              { item: 'Development Fee', period: 'February 2026', amount: 3000 },
              { item: 'Craft', period: 'February 2026', amount: 300 },
              { item: 'Exam Fee', period: 'February 2026', amount: 1000 },
              { item: 'Annual Requisites', period: 'February 2026', amount: 3000 },
              { item: 'Tuition Fee', period: 'February 2026 to March 2026', amount: 4800 },
              { item: 'Smart Class', period: 'February 2026 to March 2026', amount: 500 },
              { item: 'Campus Care', period: 'February 2026 to March 2026', amount: 200 },
            ],
            total: 26800,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'April 2026 to June 2026', amount: 7200 },
              { item: 'Smart Class', period: 'April 2026 to June 2026', amount: 750 },
              { item: 'Campus Care', period: 'April 2026 to June 2026', amount: 300 },
            ],
            total: 8250,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'July 2026 to October 2026', amount: 9600 },
              { item: 'Smart Class', period: 'July 2026 to October 2026', amount: 1000 },
              { item: 'Campus Care', period: 'July 2026 to October 2026', amount: 400 },
            ],
            total: 11000,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'November 2026 to January 2027', amount: 7200 },
              { item: 'Smart Class', period: 'November 2026 to January 2027', amount: 750 },
              { item: 'Campus Care', period: 'November 2026 to January 2027', amount: 300 },
            ],
            total: 8250,
          },
        ],
      },
      {
        name: 'Promoted students',
        quarters: [
          {
            rows: [
              { item: 'Development Fee', period: 'February 2026', amount: 2500 },
              { item: 'Exam Fee', period: 'February 2026', amount: 1000 },
              { item: 'Annual Requisites', period: 'February 2026', amount: 3000 },
              { item: 'Tuition Fee', period: 'February 2026 to March 2026', amount: 4800 },
              { item: 'Smart Class', period: 'February 2026 to March 2026', amount: 500 },
              { item: 'Campus Care', period: 'February 2026 to March 2026', amount: 200 },
            ],
            total: 12000,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'April 2026 to June 2026', amount: 7200 },
              { item: 'Smart Class', period: 'April 2026 to June 2026', amount: 750 },
              { item: 'Campus Care', period: 'April 2026 to June 2026', amount: 300 },
            ],
            total: 8250,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'July 2026 to October 2026', amount: 9600 },
              { item: 'Smart Class', period: 'July 2026 to October 2026', amount: 1000 },
              { item: 'Campus Care', period: 'July 2026 to October 2026', amount: 400 },
            ],
            total: 11000,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'November 2026 to January 2027', amount: 7200 },
              { item: 'Smart Class', period: 'November 2026 to January 2027', amount: 750 },
              { item: 'Campus Care', period: 'November 2026 to January 2027', amount: 300 },
            ],
            total: 8250,
          },
        ],
      },
    ],
  },
  {
    id: 'class1',
    label: 'I',
    categories: [
      {
        name: 'Promoted and regular students',
        quarters: [
          {
            rows: [
              { item: 'Quarter fee', period: 'February 2026 to March 2026', amount: 13500 },
            ],
            total: 13500,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'April 2026 to June 2026', amount: 10300 },
            ],
            total: 10300,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'July 2026 to October 2026', amount: 12000 },
            ],
            total: 12000,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'November 2026 to January 2027', amount: 9000 },
            ],
            total: 9000,
          },
        ],
      },
    ],
  },
  {
    id: 'class2',
    label: 'II',
    categories: [
      {
        name: 'Promoted and regular students',
        quarters: [
          {
            rows: [
              { item: 'Quarter fee', period: 'February 2026 to March 2026', amount: 12500 },
            ],
            total: 12500,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'April 2026 to June 2026', amount: 10300 },
            ],
            total: 10300,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'July 2026 to October 2026', amount: 12000 },
            ],
            total: 12000,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'November 2026 to January 2027', amount: 9000 },
            ],
            total: 9000,
          },
        ],
      },
    ],
  },
  {
    id: 'class3',
    label: 'III',
    categories: [
      {
        name: 'Promoted and regular students',
        quarters: [
          {
            rows: [
              { item: 'Quarter fee', period: 'February 2026 to March 2026', amount: 12500 },
            ],
            total: 12500,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'April 2026 to June 2026', amount: 10300 },
            ],
            total: 10300,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'July 2026 to October 2026', amount: 12000 },
            ],
            total: 12000,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'November 2026 to January 2027', amount: 9000 },
            ],
            total: 9000,
          },
        ],
      },
    ],
  },
  {
    id: 'class4',
    label: 'IV',
    categories: [
      {
        name: 'Promoted and regular students',
        quarters: [
          {
            rows: [
              { item: 'Quarter fee', period: 'February 2026 to March 2026', amount: 12500 },
            ],
            total: 12500,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'April 2026 to June 2026', amount: 10300 },
            ],
            total: 10300,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'July 2026 to October 2026', amount: 12000 },
            ],
            total: 12000,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'November 2026 to January 2027', amount: 9000 },
            ],
            total: 9000,
          },
        ],
      },
    ],
  },
  {
    id: 'class5',
    label: 'V',
    categories: [
      {
        name: 'Promoted and regular students',
        quarters: [
          {
            rows: [
              { item: 'Quarter fee', period: 'February 2026 to March 2026', amount: 13500 },
            ],
            total: 13500,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'April 2026 to June 2026', amount: 10300 },
            ],
            total: 10300,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'July 2026 to October 2026', amount: 12000 },
            ],
            total: 12000,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'November 2026 to January 2027', amount: 9000 },
            ],
            total: 9000,
          },
        ],
      },
    ],
  },
  {
    id: 'class6',
    label: 'VI',
    categories: [
      {
        name: 'Promoted and regular students',
        quarters: [
          {
            rows: [
              { item: 'Quarter fee', period: 'February 2026 to March 2026', amount: 12500 },
            ],
            total: 12500,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'April 2026 to June 2026', amount: 9700 },
            ],
            total: 9700,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'July 2026 to October 2026', amount: 12000 },
            ],
            total: 12000,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'November 2026 to January 2027', amount: 9000 },
            ],
            total: 9000,
          },
        ],
      },
    ],
  },
  {
    id: 'class7',
    label: 'VII',
    categories: [
      {
        name: 'Promoted and regular students',
        quarters: [
          {
            rows: [
              { item: 'Quarter fee', period: 'February 2026 to March 2026', amount: 12500 },
            ],
            total: 12500,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'April 2026 to June 2026', amount: 9700 },
            ],
            total: 9700,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'July 2026 to October 2026', amount: 12000 },
            ],
            total: 12000,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'November 2026 to January 2027', amount: 9000 },
            ],
            total: 9000,
          },
        ],
      },
    ],
  },
  {
    id: 'class8',
    label: 'VIII',
    categories: [
      {
        name: 'Promoted and regular students',
        quarters: [
          {
            rows: [
              { item: 'Quarter fee', period: 'February 2026 to March 2026', amount: 13700 },
            ],
            total: 13700,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'April 2026 to June 2026', amount: 9700 },
            ],
            total: 9700,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'July 2026 to October 2026', amount: 12000 },
            ],
            total: 12000,
          },
          {
            rows: [
              { item: 'Quarter fee', period: 'November 2026 to January 2027', amount: 9000 },
            ],
            total: 9000,
          },
        ],
      },
    ],
  },
  {
    id: 'class11',
    label: 'XI',
    // From the school's 2026-27 Class XI bank fee slips; includes the one-time admission fee in the first quarter
    categories: [
      {
        name: 'Non-Medical',
        quarters: [
          {
            rows: [
              { item: 'Tuition Fee', period: 'April to June 2026', amount: 7800 },
              { item: 'Admission Fee', period: 'April to June 2026', amount: 14000 },
              { item: 'Exam Fee', period: 'April to June 2026', amount: 1200 },
              { item: 'Development Fund', period: 'April to June 2026', amount: 3000 },
              { item: 'Science Fee', period: 'April to June 2026', amount: 3000 },
              { item: 'Annual Requisites', period: 'April to June 2026', amount: 3000 },
              { item: 'Smart Class', period: 'April to June 2026', amount: 750 },
              { item: 'Campus Care', period: 'April to June 2026', amount: 300 },
            ],
            total: 33050,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'July to September 2026', amount: 7800 },
              { item: 'Science Fee', period: 'July to September 2026', amount: 3000 },
              { item: 'Smart Class', period: 'July to September 2026', amount: 750 },
              { item: 'Campus Care', period: 'July to September 2026', amount: 300 },
            ],
            total: 11850,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'October to December 2026', amount: 7800 },
              { item: 'Science Fee', period: 'October to December 2026', amount: 3000 },
              { item: 'Smart Class', period: 'October to December 2026', amount: 750 },
              { item: 'Campus Care', period: 'October to December 2026', amount: 300 },
            ],
            total: 11850,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'January to March 2027', amount: 7800 },
              { item: 'Science Fee', period: 'January to March 2027', amount: 3000 },
              { item: 'Smart Class', period: 'January to March 2027', amount: 750 },
              { item: 'Campus Care', period: 'January to March 2027', amount: 300 },
            ],
            total: 11850,
          },
        ],
      },
      {
        name: 'Medical / Both',
        quarters: [
          {
            rows: [
              { item: 'Tuition Fee', period: 'April to June 2026', amount: 7800 },
              { item: 'Admission Fee', period: 'April to June 2026', amount: 14000 },
              { item: 'Exam Fee', period: 'April to June 2026', amount: 1200 },
              { item: 'Development Fund', period: 'April to June 2026', amount: 3000 },
              { item: 'Science Fee', period: 'April to June 2026', amount: 4500 },
              { item: 'Annual Requisites', period: 'April to June 2026', amount: 3000 },
              { item: 'Smart Class', period: 'April to June 2026', amount: 750 },
              { item: 'Campus Care', period: 'April to June 2026', amount: 300 },
            ],
            total: 34550,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'July to September 2026', amount: 7800 },
              { item: 'Science Fee', period: 'July to September 2026', amount: 4500 },
              { item: 'Smart Class', period: 'July to September 2026', amount: 750 },
              { item: 'Campus Care', period: 'July to September 2026', amount: 300 },
            ],
            total: 13350,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'October to December 2026', amount: 7800 },
              { item: 'Science Fee', period: 'October to December 2026', amount: 4500 },
              { item: 'Smart Class', period: 'October to December 2026', amount: 750 },
              { item: 'Campus Care', period: 'October to December 2026', amount: 300 },
            ],
            total: 13350,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'January to March 2027', amount: 7800 },
              { item: 'Science Fee', period: 'January to March 2027', amount: 4500 },
              { item: 'Smart Class', period: 'January to March 2027', amount: 750 },
              { item: 'Campus Care', period: 'January to March 2027', amount: 300 },
            ],
            total: 13350,
          },
        ],
      },
      {
        name: 'Commerce',
        quarters: [
          {
            rows: [
              { item: 'Tuition Fee', period: 'April to June 2026', amount: 7800 },
              { item: 'Admission Fee', period: 'April to June 2026', amount: 14000 },
              { item: 'Exam Fee', period: 'April to June 2026', amount: 1200 },
              { item: 'Development Fund', period: 'April to June 2026', amount: 3000 },
              { item: 'Annual Requisites', period: 'April to June 2026', amount: 3000 },
              { item: 'Smart Class', period: 'April to June 2026', amount: 750 },
              { item: 'Campus Care', period: 'April to June 2026', amount: 300 },
            ],
            total: 30050,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'July to September 2026', amount: 7800 },
              { item: 'Smart Class', period: 'July to September 2026', amount: 750 },
              { item: 'Campus Care', period: 'July to September 2026', amount: 300 },
            ],
            total: 8850,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'October to December 2026', amount: 7800 },
              { item: 'Smart Class', period: 'October to December 2026', amount: 750 },
              { item: 'Campus Care', period: 'October to December 2026', amount: 300 },
            ],
            total: 8850,
          },
          {
            rows: [
              { item: 'Tuition Fee', period: 'January to March 2027', amount: 7800 },
              { item: 'Smart Class', period: 'January to March 2027', amount: 750 },
              { item: 'Campus Care', period: 'January to March 2027', amount: 300 },
            ],
            total: 8850,
          },
        ],
      },
    ],
  },
]

export const formatRupees = (n: number) => '₹' + n.toLocaleString('en-IN')
