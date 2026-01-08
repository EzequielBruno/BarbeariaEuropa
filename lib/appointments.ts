export type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  price: string;
};

export type Barber = {
  id: string;
  name: string;
  specialty: string;
};

export type Appointment = {
  id: string;
  customerName: string;
  email?: string;
  phone: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
};

export type AvailabilityResult = {
  date: string;
  times: string[];
  services: Service[];
  barbers: Barber[];
  businessHours: {
    start: string;
    end: string;
    breaks: { start: string; end: string }[];
  };
};

const services: Service[] = [
  {
    id: "corte-classico",
    name: "Corte clássico",
    durationMinutes: 30,
    price: "R$ 45",
  },
  {
    id: "corte-premium",
    name: "Corte premium + lavagem",
    durationMinutes: 45,
    price: "R$ 70",
  },
  {
    id: "barba-terapia",
    name: "Barba terapia",
    durationMinutes: 30,
    price: "R$ 40",
  },
  {
    id: "combo-completo",
    name: "Combo corte + barba",
    durationMinutes: 60,
    price: "R$ 95",
  },
  {
    id: "infantil",
    name: "Corte infantil",
    durationMinutes: 30,
    price: "R$ 40",
  },
];

const barbers: Barber[] = [
  {
    id: "marcelo",
    name: "Marcelo Santos",
    specialty: "Fade e cortes clássicos",
  },
  {
    id: "lucas",
    name: "Lucas Oliveira",
    specialty: "Barbas e designs personalizados",
  },
  {
    id: "rafael",
    name: "Rafael Costa",
    specialty: "Visagismo e atendimento premium",
  },
];

const businessHours = {
  start: "09:00",
  end: "19:00",
  breaks: [{ start: "12:00", end: "13:00" }],
};

const appointments: Appointment[] = [];

const allowedWeekDays = new Set([1, 2, 3, 4, 5, 6]);

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
};

const isValidDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date);

const isDateInPast = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const selected = new Date(year, month - 1, day, 0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected < today;
};

const getServiceById = (serviceId: string) =>
  services.find((service) => service.id === serviceId);

const getAppointmentEndMinutes = (appointment: Appointment) => {
  const service = getServiceById(appointment.serviceId);
  const duration = service?.durationMinutes ?? 30;
  return timeToMinutes(appointment.time) + duration;
};

const overlaps = (
  start: number,
  end: number,
  existingStart: number,
  existingEnd: number
) => start < existingEnd && end > existingStart;

const isWithinBreak = (start: number, end: number) =>
  businessHours.breaks.some((pause) => {
    const pauseStart = timeToMinutes(pause.start);
    const pauseEnd = timeToMinutes(pause.end);
    return overlaps(start, end, pauseStart, pauseEnd);
  });

const isWithinBusinessHours = (start: number, end: number) => {
  const open = timeToMinutes(businessHours.start);
  const close = timeToMinutes(businessHours.end);
  return start >= open && end <= close && !isWithinBreak(start, end);
};

const getAppointmentsForDate = (date: string) =>
  appointments.filter((appointment) => appointment.date === date);

const getAvailability = (
  date: string,
  serviceId?: string,
  barberId?: string
): AvailabilityResult => {
  const service = serviceId ? getServiceById(serviceId) : services[0];
  const duration = service?.durationMinutes ?? 30;
  const bookings = barberId
    ? getAppointmentsForDate(date).filter(
        (appointment) => appointment.barberId === barberId
      )
    : getAppointmentsForDate(date);

  const openMinutes = timeToMinutes(businessHours.start);
  const closeMinutes = timeToMinutes(businessHours.end);
  const times: string[] = [];

  for (let start = openMinutes; start + duration <= closeMinutes; start += 30) {
    const end = start + duration;
    if (!isWithinBusinessHours(start, end)) {
      continue;
    }

    const hasOverlap = bookings.some((appointment) => {
      const appointmentStart = timeToMinutes(appointment.time);
      const appointmentEnd = getAppointmentEndMinutes(appointment);
      return overlaps(start, end, appointmentStart, appointmentEnd);
    });

    if (!hasOverlap) {
      times.push(minutesToTime(start));
    }
  }

  return {
    date,
    times,
    services,
    barbers,
    businessHours,
  };
};

const createAppointment = (payload: Omit<Appointment, "id" | "createdAt">) => {
  if (!isValidDate(payload.date)) {
    throw new Error("Data inválida.");
  }
  if (isDateInPast(payload.date)) {
    throw new Error("Selecione uma data futura.");
  }

  const selected = new Date(`${payload.date}T00:00:00`);
  if (!allowedWeekDays.has(selected.getDay())) {
    throw new Error("Não abrimos aos domingos.");
  }

  const service = getServiceById(payload.serviceId);
  if (!service) {
    throw new Error("Serviço inválido.");
  }

  const barber = barbers.find((item) => item.id === payload.barberId);
  if (!barber) {
    throw new Error("Barbeiro inválido.");
  }

  const requestedStart = timeToMinutes(payload.time);
  const requestedEnd = requestedStart + service.durationMinutes;

  if (!isWithinBusinessHours(requestedStart, requestedEnd)) {
    throw new Error("Horário fora do expediente.");
  }

  const isSlotAvailable = !appointments.some((appointment) => {
    if (appointment.date !== payload.date) {
      return false;
    }
    if (appointment.barberId !== payload.barberId) {
      return false;
    }
    const appointmentStart = timeToMinutes(appointment.time);
    const appointmentEnd = getAppointmentEndMinutes(appointment);
    return overlaps(requestedStart, requestedEnd, appointmentStart, appointmentEnd);
  });

  if (!isSlotAvailable) {
    throw new Error("Horário indisponível. Escolha outro horário.");
  }

  const appointment: Appointment = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  appointments.push(appointment);
  return appointment;
};

export const appointmentStore = {
  services,
  barbers,
  businessHours,
  getAvailability,
  createAppointment,
  getAppointmentsForDate,
};
