// dummyHcfData.ts

export const dummyHcfData = {
    hospitals: [
        {
            _id: '1',
            name: 'Global Care Hospital',
            establishedYear: '1995',
            city: 'Delhi',
            country: 'India',
            images: [
                'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80',
            ],
            infrastructure: {
                bedCount: '300',
            },
        },
        {
            _id: '2',
            name: 'Sunshine Medical Center',
            establishedYear: '2005',
            city: 'Mumbai',
            country: 'India',
            images: [],
            galleryImages: [
                'https://images.unsplash.com/photo-1576765607924-745bc9f3f2aa?auto=format&fit=crop&w=900&q=80',
            ],
            infrastructure: {
                bedCount: '200',
            },
        },
        {
            _id: '3',
            name: 'Lotus Heart Institute',
            establishedYear: '2010',
            city: 'Bangalore',
            country: 'India',
            images: [],
            galleryImages: [],
            infrastructure: {
                bedCount: '150',
            },
        },
    ],
}
