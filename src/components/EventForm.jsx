import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

/* eslint-disable react/prop-types */

const EventForm = ({ onSubmit, onClose, initialData, startDate }) => {
  const [formData, setFormData] = useState({
    title: "",
    datetime: null,
    location: "",
    description: "",
    image: "",
    category: "Technology",
  });
  const [showEmoji, setShowEmoji] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        datetime: initialData.date
          ? new Date(`${initialData.date}T${initialData.time}`)
          : null,
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateISO = formData.datetime?.toISOString().split("T")[0];
    const timeISO = formData.datetime?.toTimeString().split(" ")[0].slice(0, 5);

    onSubmit({
      ...formData,
      id: initialData?.id || crypto.randomUUID(),
      date: dateISO,
      time: timeISO,
    });

    onClose();
  };

  const handleEmojiSelect = (emoji) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    editor.insertText(range ? range.index : 0, emoji.native);
    setShowEmoji(false);
  };

  const modules = {
    toolbar: {
      container: [["bold", "italic", "underline"], ["link"]],
    },
  };

  const formats = ["bold", "italic", "underline", "link"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          {initialData ? "Edit Event" : "Create New Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date & Time
            </label>
            <DatePicker
              selected={formData.datetime}
              onChange={(date) => setFormData({ ...formData, datetime: date })}
              showTimeSelect
              timeFormat="HH:mm aa"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-2 p-2"
              minDate={startDate ? new Date(startDate) : undefined}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-2"
            >
              <option>Technology</option>
              <option>Entertainment</option>
              <option>Business</option>
              <option>Sports</option>
              <option>Education</option>
              <option>Marriage</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="relative">
              <ReactQuill
                ref={quillRef}
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                modules={modules}
                formats={formats}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-2"
              />
              <button
                type="button"
                onClick={() => setShowEmoji(!showEmoji)}
                className="absolute right-2 top-2 text-l"
              >
                Emoji
              </button>
              {showEmoji && (
                <div
                  className="fixed z-50"
                  style={{
                    left: "50%",
                    top: "30%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: "90vw",
                    maxHeight: "80vh",
                    overflow: "auto",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    previewPosition="none"
                    skinTonePosition="none"
                    theme="light"
                    style={{ maxHeight: "300px" }}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border-2"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {initialData ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
