import { useState } from "react";
import { Calendar } from "./ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Doctor, Appointment } from "../types";
import { saveAppointment } from "../lib/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

interface AppointmentModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AppointmentModal({
  doctor,
  isOpen,
  onClose,
  onSuccess,
}: AppointmentModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [patientName, setPatientName] = useState("");

  const handleDateSelect = (selectedDate: Date) => {
    const dateWithoutTime = new Date(selectedDate.setHours(0, 0, 0, 0));
    setDate(dateWithoutTime);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor || !date || !time || !patientName) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authorization token found");
      return;
    }

    const appointment: Appointment = {
      doctorId: doctor._id,
      patientName,
      date: date.toISOString().split("T")[0],
      time,
      status: "scheduled",
    };

    try {
      await saveAppointment(appointment, token);
      onSuccess();

      // Show success toast
      toast.success("Appointment booked successfully!");

      onClose();
    } catch (err) {
      console.error("Error saving appointment:", err);
      toast.error("Failed to book the appointment. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <ToastContainer/>
        <DialogHeader>
          <DialogTitle>Book Appointment with {doctor?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name</label>
            <Input
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <div className="border rounded-md p-3 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                classNames={{
                  day_selected: "bg-blue-500 text-white rounded-full",
                  day_today: "bg-gray-200 text-black",
                  day: "h-9 w-9 p-0 font-normal",
                  day_disabled: "text-muted-foreground opacity-50",
                  head_cell: "text-muted-foreground font-normal text-[0.8rem]",
                  cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                  nav_button: "h-7 w-7 bg-gray-100 rounded-full p-1 hover:bg-gray-300",
                  nav_button_previous: "absolute top-1/2 left-2 transform -translate-y-1/2",
                  nav_button_next: "absolute top-1/2 right-2 transform -translate-y-1/2",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  row: "flex w-full mt-2",
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Time</label>
            <select
              className="w-full rounded-md border p-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="">Select a time</option>
              {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full">
            Confirm Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
