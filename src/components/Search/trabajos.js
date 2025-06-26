// import img from 'http://localhost:3000/uploads/services/ae237ba3-4783-45e2-86c6-df825f3bb1a0.png'; // Importar la imagen
const img = "http://localhost:3000/uploads/services/ae237ba3-4783-45e2-86c6-df825f3bb1a0.png";

//arreglo para los trabajos
export const trabajos = [
  {
    titulo: 'Desarrollador Frontend',
    prestamista: 'Juan Pérez',
    imagen: img,
    categoria: 'Tecnología',
    alcaldia: 'Cuauhtémoc',
    descripcion: 'Buscamos un desarrollador frontend con experiencia en React y JavaScript.',
    fecha: '2023-10-01',
    incluyeMateriales: true,
    garantia: '15 días',
    direccionReferencia: 'Av. Paseo de la Reforma 123, Col. Juárez, CDMX',
    modalidadesCobro: [
      { modalidad: 'Por hora', costo: 500 },
      { modalidad: 'Por Proyecto' }, // Sin costo definido
    ],
    disponibilidad: [
      { dia: 'Lunes', horario: '9:00 AM - 5:00 PM' },
      { dia: 'Martes', horario: '9:00 AM - 5:00 PM' },
    ],
    evidencias: [img, img, img],
  },
  {
    titulo: 'Diseñador Gráfico',
    prestamista: 'María López',
    imagen: img,
    categoria: 'Diseño',
    alcaldia: 'Benito Juárez',
    descripcion: 'Se requiere diseñador gráfico con habilidades en Adobe Photoshop e Illustrator.',
    fecha: '2023-10-02',
    incluyeMateriales: false,
    garantia: null,
    direccionReferencia: null,
    modalidadesCobro: [
      { modalidad: 'Por Proyecto', costo: 8000 },
    ],
    disponibilidad: [
      { dia: 'Miércoles', horario: '10:00 AM - 4:00 PM' },
      { dia: 'Jueves', horario: '10:00 AM - 4:00 PM' },
    ],
    evidencias: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
  },  {
    titulo: 'Desarrollador Frontend',
    prestamista: 'Juan Pérez',
    imagen: img,
    categoria: 'Tecnología',
    alcaldia: 'Cuauhtémoc',
    descripcion: 'Buscamos un desarrollador frontend con experiencia en React y JavaScript.',
    fecha: '2023-10-01',
    incluyeMateriales: true,
    garantia: '15 días',
    direccionReferencia: 'Av. Paseo de la Reforma 123, Col. Juárez, CDMX',
    modalidadesCobro: [
      { modalidad: 'Por hora', costo: 500 },
      { modalidad: 'Por Proyecto' }, // Sin costo definido
    ],
    disponibilidad: [
      { dia: 'Lunes', horario: '9:00 AM - 5:00 PM' },
      { dia: 'Martes', horario: '9:00 AM - 5:00 PM' },
    ],
    evidencias: [img, img, img],
  },
  {
    titulo: 'Diseñador Gráfico',
    prestamista: 'María López',
    imagen: img,
    categoria: 'Diseño',
    alcaldia: 'Benito Juárez',
    descripcion: 'Se requiere diseñador gráfico con habilidades en Adobe Photoshop e Illustrator.',
    fecha: '2023-10-02',
    incluyeMateriales: false,
    garantia: null,
    direccionReferencia: 'Av. Insurgentes Sur 456, Col. Del Valle, CDMX',
    modalidadesCobro: [
      { modalidad: 'Por Proyecto', costo: 8000 },
    ],
    disponibilidad: [
      { dia: 'Miércoles', horario: '10:00 AM - 4:00 PM' },
      { dia: 'Jueves', horario: '10:00 AM - 4:00 PM' },
    ],
    evidencias: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
  },  {
    titulo: 'Desarrollador Frontend',
    prestamista: 'Juan Pérez',
    imagen: img,
    categoria: 'Tecnología',
    alcaldia: 'Cuauhtémoc',
    descripcion: 'Buscamos un desarrollador frontend con experiencia en React y JavaScript.',
    fecha: '2023-10-01',
    incluyeMateriales: true,
    garantia: '15 días',
    direccionReferencia: 'Av. Paseo de la Reforma 123, Col. Juárez, CDMX',
    modalidadesCobro: [
      { modalidad: 'Por hora', costo: 500 },
      { modalidad: 'Por Proyecto' }, // Sin costo definido
    ],
    disponibilidad: [
      { dia: 'Lunes', horario: '9:00 AM - 5:00 PM' },
      { dia: 'Martes', horario: '9:00 AM - 5:00 PM' },
    ],
    evidencias: [img, img, img],
  },
  {
    titulo: 'Diseñador Gráfico',
    prestamista: 'María López',
    imagen: img,
    categoria: 'Diseño',
    alcaldia: 'Benito Juárez',
    descripcion: 'Se requiere diseñador gráfico con habilidades en Adobe Photoshop e Illustrator.',
    fecha: '2023-10-02',
    incluyeMateriales: false,
    garantia: null,
    direccionReferencia: 'Av. Insurgentes Sur 456, Col. Del Valle, CDMX',
    modalidadesCobro: [
      { modalidad: 'Por Proyecto', costo: 8000 },
    ],
    disponibilidad: [
      { dia: 'Miércoles', horario: '10:00 AM - 4:00 PM' },
      { dia: 'Jueves', horario: '10:00 AM - 4:00 PM' },
    ],
    evidencias: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
  },  {
    titulo: 'Desarrollador Frontend',
    prestamista: 'Juan Pérez',
    imagen: img,
    categoria: 'Tecnología',
    alcaldia: 'Cuauhtémoc',
    descripcion: 'Buscamos un desarrollador frontend con experiencia en React y JavaScript.',
    fecha: '2023-10-01',
    incluyeMateriales: true,
    garantia: '15 días',
    direccionReferencia: 'Av. Paseo de la Reforma 123, Col. Juárez, CDMX',
    modalidadesCobro: [
      { modalidad: 'Por hora', costo: 500 },
      { modalidad: 'Por Proyecto' }, // Sin costo definido
    ],
    disponibilidad: [
      { dia: 'Lunes', horario: '9:00 AM - 5:00 PM' },
      { dia: 'Martes', horario: '9:00 AM - 5:00 PM' },
    ],
    evidencias: [img, img, img],
  },
  {
    titulo: 'Desarrollador Frontend',
    prestamista: 'Juan Pérez',
    imagen: img,
    categoria: 'Tecnología',
    alcaldia: 'Cuauhtémoc',
    descripcion: 'Buscamos un desarrollador frontend con experiencia en React y JavaScript.',
    fecha: '2023-10-01',
    incluyeMateriales: true,
    garantia: '15 días',
    direccionReferencia: 'Av. Paseo de la Reforma 123, Col. Juárez, CDMX',
    modalidadesCobro: [
      { modalidad: 'Por hora', costo: 500 },
      { modalidad: 'Por Proyecto' }, // Sin costo definido
    ],
    disponibilidad: [
      { dia: 'Lunes', horario: '9:00 AM - 5:00 PM' },
      { dia: 'Martes', horario: '9:00 AM - 5:00 PM' },
    ],
    evidencias: [img, img, img],
  },
  {
    titulo: 'Diseñador Gráfico',
    prestamista: 'María López',
    imagen: img,
    categoria: 'Diseño',
    alcaldia: 'Benito Juárez',
    descripcion: 'Se requiere diseñador gráfico con habilidades en Adobe Photoshop e Illustrator.',
    fecha: '2023-10-02',
    incluyeMateriales: false,
    garantia: null,
    direccionReferencia: 'Av. Insurgentes Sur 456, Col. Del Valle, CDMX',
    modalidadesCobro: [
      { modalidad: 'Por Proyecto', costo: 8000 },
    ],
    disponibilidad: [
      { dia: 'Miércoles', horario: '10:00 AM - 4:00 PM' },
      { dia: 'Jueves', horario: '10:00 AM - 4:00 PM' },
    ],
    evidencias: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
  },{
    imagen: img,
    categoria: 'Diseño',
    alcaldia: 'Benito Juárez',
    descripcion: 'Se requiere diseñador gráfico con habilidades en Adobe Photoshop e Illustrator.',
    fecha: '2023-10-02',
    incluyeMateriales: false,
    garantia: null,
    direccionReferencia: 'Av. Insurgentes Sur 456, Col. Del Valle, CDMX',
    modalidadesCobro: [
      { modalidad: 'Por Proyecto', costo: 8000 },
    ],
    disponibilidad: [
      { dia: 'Miércoles', horario: '10:00 AM - 4:00 PM' },
      { dia: 'Jueves', horario: '10:00 AM - 4:00 PM' },
    ],
    evidencias: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
  },
];