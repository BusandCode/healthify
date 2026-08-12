import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding hospitals...')

  // Clear existing hospitals (and bookings via cascade)
  await prisma.hospital.deleteMany({})

  const hospitalsData = [
    {
      name: 'Ikeja General Hospital',
      image: '/ikeja.jpg',
      distance: '3.5 miles',
      fee: 8000,
      address: 'Opebi Link Road, Ikeja',
      rating: 4.8,
      reviews: 120,
      specializations: ['General Medicine', 'Radiography', 'Pediatrician'],
      insurances: ['NHIS', 'HMO', 'Self Pay'],
    },
    {
      name: 'Lagos State Teaching Hospital',
      image: '/lagos.jpg',
      distance: '5.2 miles',
      fee: 20000,
      address: 'Idi-Araba, Surulere',
      rating: 4.5,
      reviews: 89,
      specializations: ['Cardiology', 'Neurology', 'General Medicine', 'Radiography'],
      insurances: ['NHIS', 'Private Insurance', 'HMO', 'Self Pay'],
    },
    {
      name: 'National OrthoRx Hospital',
      image: '/national.jpg',
      distance: '4.1 miles',
      fee: 10000,
      address: 'Igbobi, Lagos',
      rating: 4.7,
      reviews: 156,
      specializations: ['Orthopedics', 'Radiography'],
      insurances: ['Private Insurance', 'HMO', 'Self Pay'],
    },
    {
      name: 'Lagos University Hospital',
      image: '/lagos.jpg',
      distance: '6.8 miles',
      fee: 7000,
      address: 'Ikeja, Lagos',
      rating: 4.3,
      reviews: 203,
      specializations: ['General Medicine', 'Pediatrician', 'Dermatology'],
      insurances: ['NHIS', 'HMO', 'Self Pay'],
    },
    {
      name: 'Federal Medical Centre',
      image: '/federal.jpg',
      distance: '7.5 miles',
      fee: 5000,
      address: 'Ebute Metta, Lagos',
      rating: 4.6,
      reviews: 134,
      specializations: ['General Medicine', 'Neurology', 'Cardiology'],
      insurances: ['NHIS', 'Private Insurance', 'HMO', 'Self Pay'],
    },
    {
      name: 'Gbagada General Hospital',
      image: '/gbagada.jpg',
      distance: '8.2 miles',
      fee: 4000,
      address: 'Gbagada, Lagos',
      rating: 4.4,
      reviews: 98,
      specializations: ['General Medicine', 'Radiography', 'Dermatology'],
      insurances: ['NHIS', 'Self Pay'],
    },
  ]

  for (const hospital of hospitalsData) {
    await prisma.hospital.create({
      data: hospital,
    })
  }

  console.log('Successfully seeded hospitals.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
