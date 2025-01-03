const RANDOM_IMAGES = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",  // Tech
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2032",  // Education
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",  // Classroom
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",  // Coding
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071",  // Group Study
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070",  // Library
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",  // Learning
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074",  // Math
];

export const getRandomImage = () => {
    return RANDOM_IMAGES[Math.floor(Math.random() * RANDOM_IMAGES.length)];
}; 