import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import AppointmentForm from './AppointmentForm';
import AppointmentSearch from './AppointmentSearch';
import AppointmentList from './AppointmentList';
import { appointmentApi } from '../api/appointmentApi.ts';

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState([]);
  /**
   * Declare a state variable 'loading' with initial value true,
   * which will be used to indicate if the data is being fetched.
   */
  const [loading, setLoading] = useState(true);
  /**
   * Declare another state variable 'error' with initial value null,
   * which will be used to store any error message that occurs during data fetching.
   * The type of 'error' is either a string or null. 
   */
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  
  // This useEffect hook runs once when the component mounts.
useEffect(() => {
    // Define an asynchronous function to fetch appointments.
    const fetchAppointments = async () => {
      try {
        // Use the appointmentApi to fetch all appointments.
        const data = await appointmentApi.getAll();
        // Update the appointments state with the fetched data.
        setAppointments(data);
      } catch (err) {
        // Handle any errors that might occur during the fetch operation.
        setError(err.error || 'Failed to load appointments');
      } finally {
        // Ensure that loading is set to false after the fetch operation completes.
        setLoading(false);
      }
    };

    // Call the fetchAppointments function to load data on mount.
    fetchAppointments();
  }, []); // The empty dependency array ensures that this effect runs only once.



  // Generate available time slots from 9 AM to 5 PM
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use the appointmentApi to insert formData into database through sending request to backend server.
      const newAppointment = await appointmentApi.create(formData);
      // Add new appointment
      setAppointments([...appointments, newAppointment]);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        notes: ''
      });
    } catch (err) {
      setError(err.error || 'Failed to create appointment');
    }
  };

  if (loading) return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-2">Loading appointments...</p>
    </div>
  );
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <AppointmentForm 
        formData={formData}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        timeSlots={timeSlots}
      />
      
      <AppointmentSearch appointments={appointments} />

      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <AppointmentList appointments={appointments} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentScheduler;