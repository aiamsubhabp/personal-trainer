import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppointmentsList from './AppointmentsList';
import { useFormik } from 'formik';
import * as yup from 'yup';

const AppointmentsCalendar = ({ appointments, setAppointments }) => {

    const formSchema = yup.object().shape({
        name: yup.string().required('Name is required').min(3).max(30),
        date: yup.date().required('Date is required'),
        hour: yup.number().required('Hour is required'),
        minute: yup.number().required('Minute is required'),
    });


    const formik = useFormik({
        initialValues: {
        name: '',
        date: new Date(),
        hour: 0,
        minute: 0,
        },
        validationSchema: formSchema,
        onSubmit: async (values, { resetForm }) => {
        const { name, date, hour, minute } = values

        const appointmentTime = new Date(date)
        appointmentTime.setHours(hour)
        appointmentTime.setMinutes(minute)

        // CHECK TIME SLOT BOOKED OR NOT
        const isTimeSlotBooked = appointments.some(appointment => {
            const existingAppointmentTime = new Date(appointment.appointment_time)
            return existingAppointmentTime.getTime() === appointmentTime.getTime()
        });

        if (isTimeSlotBooked) {
            console.error('This time slot is already booked.')
            alert('This time slot has already been booked. Please select a different time.')
            return
        }

        // FORMAT DATE TIME
        const formattedAppointmentTime = appointmentTime.toISOString().split('T')[0] + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)

        const appointment = {
            client_name: name,
            appointment_time: formattedAppointmentTime,
        }

        console.log('Creating appointment:', appointment)

        try {
            const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointment),
            })

            if (response.ok) {
            const responseData = await response.json()
            setAppointments([...appointments, responseData])
            resetForm()
            } else {
            console.error('Failed to create appointment:', response.status)
            }
        } catch (error) {
            console.error('Error creating appointment:', error)
        }
        },
    })

    const hoursArray = Array.from({ length: 24 }, (_, i) => i)
    const minutesArray = [0, 30]

    return (
        <div className='app'>
            <header>
                <h2>Create Appointment</h2>
            </header>
        
        <form onSubmit={formik.handleSubmit}>
            <div>
            <Calendar onChange={date => formik.setFieldValue('date', date)} value={formik.values.date} />
            {formik.touched.date && formik.errors.date ? <div>{formik.errors.date}</div> : null}
            </div>
            <div>
            <label>Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
                <div style={{color:'red'}}>{formik.errors.name}</div>
            ) : null}
            </div>
            <div>
            <label>Time:</label>
            <select
                id="hour"
                name="hour"
                onChange={formik.handleChange}
                value={formik.values.hour}
            >
                {hoursArray.map(hour => (
                <option key={hour} value={hour}>{hour < 10 ? `0${hour}` : hour}</option>
                ))}
            </select>
            :
            <select
                id="minute"
                name="minute"
                onChange={formik.handleChange}
                value={formik.values.minute}
            >
                {minutesArray.map(minute => (
                <option key={minute} value={minute}>{minute < 10 ? `0${minute}` : minute}</option>
                ))}
            </select>
            {formik.touched.hour && formik.errors.hour ? <div>{formik.errors.hour}</div> : null}
            {formik.touched.minute && formik.errors.minute ? <div>{formik.errors.minute}</div> : null}
            </div>
            <button type="submit" disabled={formik.isSubmitting}>
            Create Appointment
            </button>
            {formik.errors.date && <div>{formik.errors.date}</div>}
        </form>
        <AppointmentsList appointments={appointments} setAppointments={setAppointments} />
        </div>
    )
    }

export default AppointmentsCalendar
