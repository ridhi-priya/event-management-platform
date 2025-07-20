import { Calendar, Clock, MapPin, Trash2, Edit } from 'lucide-react';

/* eslint-disable react/prop-types */


const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      {/* Event Image and Category */}
      <div className="relative h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {event.category}
        </span>
      </div>
      
      {/* Event Details */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <div className="space-y-2 text-gray-600">
          {/* Date */}
          <div className="flex items-center gap-2"> 
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          {/* Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>
        
        {/* Description */}
        {/* <p className="mt-4 text-gray-600 line-clamp-2">{event.description}</p> */}
<div
  className="mt-4 text-gray-600 line-clamp-2"
  dangerouslySetInnerHTML={{ __html: event.description }}
/>        
        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={() => onEdit(event.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
