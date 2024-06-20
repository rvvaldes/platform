import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";

const handleDateSelect = (selectInfo) => {
  let title = prompt("Enter a new event title");
  let calendarApi = selectInfo.view.calendar;

  calendarApi.unselect(); // Limpiar la selección de fecha

  if (title) {
    calendarApi.addEvent({
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  }
};
const handleCustomButton = () => {
  alert("Botón personalizado pulsado!");
};
export const Calendar = () => (
  <>
    <style>
      {`
        .fc .fc-button {
          background-color: #007bff; /* Azul */
          color: white;
          border: none;
        }

        .fc .fc-button:hover {
          background-color: #0056b3; /* Azul más oscuro */
        }
      `}
    </style>
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      initialView="listWeek"
      weekends={false}
      locale={esLocale}
      customButtons={{
        myCustomButton: {
          text: "Custom",
          click: handleCustomButton,
        },
      }}
      selectable={true}
      editable={true}
      headerToolbar={{
        start: "prev,next today myCustomButton", // Botones para navegar al día anterior, siguiente y hoy
        center: "title", // Título del calendario (mes actual)
        end: "dayGridMonth,timeGridWeek,timeGridDay", // Botones para cambiar las vistas
      }}
      select={handleDateSelect}
      events={[
        {
          title: "event 1",
          start: "2024-05-01T10:00:00",
          end: "2024-05-01T12:00:00",
          backgroundColor: "green",
          borderColor: "green",
          extendedProps: {
            status: "done",
          },
        },
        {
          title: "event 2",
          start: "2024-05-02T14:00:00",
          end: "2024-05-02T16:00:00",
        },
      ]}
    />
  </>
);
