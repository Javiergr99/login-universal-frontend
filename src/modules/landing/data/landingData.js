export const heroContent = {
  description:
    "Accede a la información oficial sobre la protección y restitución de derechos de niñas, niños y adolescentes en México.",
  buttonText: "Consulta la Información Pública",
};

export const aboutParagraphs = [
  "El Sistema de Información Por Tus Derechos: Niñas, Niños y Adolescentes Protegidos es una herramienta tecnológica creada y operada por la Procuraduría Federal de Protección de Niñas, Niños y Adolescentes (PFPNNA) del Sistema Nacional para el Desarrollo Integral de la Familia (SNDIF) en México.",
  "Su objetivo es concentrar y difundir información oficial sobre la protección y restitución de derechos de niñas, niños y adolescentes. Los datos provienen de registros administrativos generados y actualizados de forma regular por autoridades federales y estatales, garantizando que sea información accesible, confiable y verificable.",
];

export const faqItems = [
  {
    id: "faq-1",
    displayNumber: "1.",
    question: "¿Quién recopila esta información?",
    answer:
      "La información es recopilada por la PFPNNA y las Procuradurías de Protección de todo el país.",
  },
  {
    id: "faq-2",
    displayNumber: "2.",
    question: "¿Desde cuándo existe este sistema?",
    answer:
      "El sistema concentra datos desde 2014 y se actualiza de forma continua.",
  },
  {
    id: "faq-3",
    displayNumber: "3.",
    question: "¿Qué tipo de información puedo consultar?",
    answer:
      "Encontrarás información pública y estadística sobre distintos aspectos relacionados con la protección de niñas, niños y adolescentes en México. Esto incluye datos sobre los Centros de Asistencia Social y su funcionamiento; información de niñas, niños y adolescentes en contexto de movilidad humana; datos sobre los procedimientos vinculados al derecho a vivir en familia, como adopciones y acogimiento familiar; así como registros sobre medidas de protección dictadas por las Procuradurías de Protección.",
  },
  {
    id: "faq-4",
    displayNumber: "4.",
    question: "¿Con qué frecuencia se actualiza la información?",
    answer:
      "Los registros se actualizan periódicamente por las autoridades responsables en cada estado y a nivel federal.",
  },
  {
    id: "faq-5",
    displayNumber: "5.",
    question: "¿Puedo descargar los datos?",
    answer:
      "Sí. Puedes descargar tablas y gráficas desde la versión pública del sistema.",
  },
];

export const statsInitial = [
  {
    id: "estados",
    value: 32,
    suffix: "",
    label: "Estados tienen Procuraduría de Protección (PPNNA)",
  },
  {
    id: "procuradurias",
    value: 300,
    suffix: "+",
    label: "Procuradurías activas",
  },
  {
    id: "registros",
    value: 2500,
    suffix: "+",
    label: "Registros completados",
  },
  {
    id: "usuarios",
    value: 12,
    suffix: "",
    label: "Usuarios en PPNNA que están alimentando el sistema",
  },
];

export const registryOptions = [
  {
    key: "rncas",
    label: "RNCAS",
    route: "/login",
    fullName: "Registro Nacional de Centros de Asistencia Social",
  },
  {
    key: "rmh",
    label: "RMH",
    route: "/login",
    fullName:
      "Registro de Niñas, Niños y Adolescentes en Contexto de Movilidad Humana",
  },
  {
    key: "rdvf",
    label: "RDVF",
    route: "/login",
    fullName: "Registro del Derecho a Vivir en Familia",
  },
  {
    key: "rmp",
    label: "RMP",
    route: "/login",
    fullName: "Registro de Medidas de Protección",
  },
];

export const interestCards = [
  {
    id: "rncas",
    title: "Registro Nacional de Centros de Asistencia Social (RNCAS)",
    description:
      "Consulta aquí información sobre los Centros de Asistencia Social en el país y su funcionamiento.",
    iconKey: "casita",
    accent: "#3a3a3a",
  },
  {
    id: "rmh",
    title: "Registro de Niñas, Niños y Adolescentes en Contexto de Movilidad Humana (RMH)",
    description:
      "Consulta aquí información sobre niñas, niños y adolescentes en contexto de movilidad humana.",
    iconKey: "planeta",
    accent: "#b88412",
  },
  {
    id: "rdvf",
    title: "Registro del Derecho a Vivir en Familia (DVF)",
    description:
      "Consulta aquí información sobre los procedimientos vinculados al derecho de niñas, niños y adolescentes a vivir en familia.",
    iconKey: "manoCorazon",
    accent: "#b01446",
  },
  {
    id: "rmp",
    title: "Registro de Medidas de Protección (RMP)",
    description:
      "Consulta aquí información sobre niñas, niños y adolescentes que cuentan con medidas de protección dictadas por las Procuradurías de Protección.",
    iconKey: "personasCorazon",
    accent: "#0b6b57",
  },
];