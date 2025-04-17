# Appointment Management System (Frontend)

## Steps

- Install prject dependency

```bash
npm install
```

- Run web app

```bash
npm run dev
```

- Open the page in browser
Check the localhost link and port, then paste the url in browser to open.

## Modify Clarification

1. Search

```Typescript
const filteredAppointments = appointments.filter(appointment => {
  const searchValue = searchTerm.toLowerCase();
  return Object.values(appointment).some(value =>
    value.toString().toLowerCase().includes(searchValue)
  );
});
```

- Global field search
Automatically checks all fields of the appointment object (e.g., email, phone, name, etc.).
- Consistent Case Handling
Converts all field values to lowercase strings, ensuring case-insensitive matching across all fields.
- Data Type Resilience
Uses value.toString() to safely handle non-string fields (e.g. date values).
- Future-Proof Design
Automatically adapts to new fields added to the appointment object without code changes.

2. Database integration

- Connect to backend service
This frontend implementation integrates with a Flask-based backend service to perform database operations through RESTful API endpoints.
- Base Configuration

    ```Typescript
    const API_BASE = 'http://127.0.0.1:5000/api';
    ```

    When run flask service in python, this is localhost url.
- API
    All apis are executed by axios requests, which are implements in '/src/api/appointmentApi.ts'.

    ```Typescript
    create: async (data: Omit<Appointment, 'id'>) => {
        try {
            const response = await axios.post(`${API_BASE}/saveappointment`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create appointment. Reason: ' + error);
        }
    }
    ```

    This api sends appointment data (excluding auto-generated id) as a JSON payload.

    ```Typescript
    getAll: async () => {
        try {
            const response = await axios.get(`${API_BASE}/appointments`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch appointments. Reason: ' + error);
        }
    }
    ```

    This api querys all appointments details stored in database.

    In the frontend, I use useEffect hooks to achieve querying data from database by calling api.

    ```Typescript
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await appointmentApi.getAll();
                setAppointments(data);
            } catch (err) {
                setError(err.error || 'Failed to load appointments');
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []); 
    ```

    This useEffect hook fetches appointment data when the component first loads (on mount) and manages the component’s loading and error states. Here’s how it works:

  - Async Data Fetching:

    Defines an asynchronous function fetchAppointments that calls appointmentApi.getAll() to retrieve data from the backend.

    Updates the appointments state with the fetched data on success.

    Catches errors and sets an error message if the request fails.

    Uses a finally block to ensure the loading state is always set to false, whether the request succeeds or fails.
  - Single Execution on Mount:

    The empty dependency array [] ensures the effect runs only once, when the component is first rendered.

  - State Management:

    Loading State: Shows a loading indicator while data is being fetched.

    Error Handling: Displays user-friendly error messages for failed requests.

    Data Hydration: Populates the UI with fetched data once available.

