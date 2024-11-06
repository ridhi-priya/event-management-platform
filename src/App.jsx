import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { EventProvider, useEvents } from './context/EventContext';
import EventCard from './components/EventCard';
import EventForm from './components/EventForm';

const EventDashboard = () => {
  const { state, dispatch } = useEvents();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddEvent = (eventData) => {
    dispatch({ type: 'ADD_EVENT', payload: eventData });
  };

  const handleUpdateEvent = (eventData) => {
    dispatch({ type: 'UPDATE_EVENT', payload: eventData });
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch({ type: 'DELETE_EVENT', payload: id });
    }
  };

  const handleEditClick = (id) => {
    const event = state.events.find((e) => e.id === id);
    setEditingEvent(event);
    setShowForm(true);
  };

  const filteredEvents = state.events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(state.events.map((event) => event.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Event Management</h1>
          <button
            onClick={() => {
              setEditingEvent(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Event
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEditClick}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found</p>
          </div>
        )}

        {showForm && (
          <EventForm
            onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
            onClose={() => {
              setShowForm(false);
              setEditingEvent(null);
            }}
            initialData={editingEvent}
          />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <EventProvider>
      <EventDashboard />
    </EventProvider>
  );
}

export default App;
