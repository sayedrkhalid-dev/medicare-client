"use client";

import AppointmentHistory from "./components/AppointmentHistory";
import AppointmentTrends from "./components/AppointmentTrends";
import FavoriteDoctors from "./components/FavoriteDoctors";
import PatientStats from "./components/PatientStats";
import RecentActivities from "./components/RecentActivities";
import TransactionHistory from "./components/TransactionHistory";
import { getMe } from "@/services/users/user.service";
import { getMyAppointments } from "@/services/appointments/appointment.service";
import { getMyReviews } from "@/services/reviews/review.service";
import { getMyPayments } from "@/services/payments/payment.service";

// const me = await getMe();
// const appointments = await getMyAppointments();
// const reviews = await getMyReviews();
// const payments = await getMyPayments();

export default function PatientDashboardPage() {
  // Centralized Mock Data Engine
  const portalStats = {
    upcomingAppointments: 3,
    newPendingRequests: 1,
    totalPayments: 1450.0,
    paymentTargetLimit: 2500.0,
    favoriteDoctorsCount: 2,
    reviewCount: 14,
  };

  const trendData = [
    { month: "Jan", appointments: 1, virtualVisits: 2 },
    { month: "Feb", appointments: 3, virtualVisits: 1 },
    { month: "Mar", appointments: 2, virtualVisits: 4 },
    { month: "Apr", appointments: 5, virtualVisits: 3 },
    { month: "May", appointments: 4, virtualVisits: 6 },
    { month: "Jun", appointments: 6, virtualVisits: 5 },
  ];

  const savedDoctors = [
    {
      id: "doc-1",
      name: "Dr. Sarah Mitchell",
      specialization: "Cardiology",
      experience: "12 years",
      rating: 4.9,
      reviewCount: 142,
      fee: 150,
      avatarUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: "doc-2",
      name: "Dr. James Rahman",
      specialization: "Neurology",
      experience: "9 years",
      rating: 4.8,
      reviewCount: 98,
      fee: 180,
      avatarUrl:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format&fit=crop",
    },
  ];

  const telemetryLogs = [
    {
      id: "act-1",
      type: "appointment_confirmed",
      title: "Appointment Confirmed",
      description:
        "Your booking with Dr. Sarah Mitchell has been approved for July 08.",
      timestamp: "12 mins ago",
      status: "success",
    },
    {
      id: "act-2",
      type: "payment_success",
      title: "Invoice Paid Successfully",
      description:
        "Payment of $150.00 for consultation invoice #MC-8492 was completed.",
      timestamp: "3 hours ago",
      status: "success",
    },
    {
      id: "act-3",
      type: "review_submitted",
      title: "Review Published",
      description:
        "You rated Dr. James Rahman 5 stars for his neurology check-up guidance.",
      timestamp: "Yesterday",
      status: "neutral",
    },
  ];

  const historicalVisits = [
    {
      id: "APT-9921",
      doctorName: "Dr. Sarah Mitchell",
      specialization: "Cardiology",
      date: "Jul 08, 2026",
      time: "10:30 AM",
      type: "Telemedicine",
      status: "Scheduled",
    },
    {
      id: "APT-9840",
      doctorName: "Dr. James Rahman",
      specialization: "Neurology",
      date: "Jun 15, 2026",
      time: "02:15 PM",
      type: "In-Person",
      status: "Completed",
      hasPrescription: true,
    },
    {
      id: "APT-9711",
      doctorName: "Dr. Alex Rivera",
      specialization: "Dermatology",
      date: "May 12, 2026",
      time: "11:00 AM",
      type: "In-Person",
      status: "Cancelled",
    },
  ];

  const transactionLedger = [
    {
      id: "TXN-8492",
      doctorName: "Dr. Sarah Mitchell",
      specialization: "Cardiology",
      date: "Jun 28, 2026",
      amount: 150.0,
      method: "Stripe (Visa •••• 4242)",
      status: "Paid",
    },
    {
      id: "TXN-7103",
      doctorName: "Dr. James Rahman",
      specialization: "Neurology",
      date: "Jun 15, 2026",
      amount: 180.0,
      method: "Stripe (Mastercard •••• 5555)",
      status: "Paid",
    },
  ];

  // Router Action Handlers
  const handleBookingAction = (id) =>
    console.log(`Triggering route session creation for doctor: ${id}`);
  const handleCancellation = (id) =>
    console.log(`Processing drop hook request for appointment: ${id}`);
  const handlePrescriptionView = (id) =>
    console.log(`Fetching secure prescription asset data link for: ${id}`);
  const handleInvoiceDownload = (id) =>
    console.log(
      `Generating cryptographically signed client statements PDF receipt for ledger element: ${id}`,
    );

  return (
    <div className="space-y-8 overflow-visible">
      {/* 1. Global High-Density Metrics Block */}
      <section className="overflow-visible">
        <PatientStats statsData={portalStats} />
      </section>

      {/* 2. Analytical Trends */}
      <section className="overflow-visible">
        <AppointmentTrends chartData={trendData} />
      </section>

      {/* 3. Real-time Feeds Split Grid Layer */}
      <section className="overflow-visible">
        <RecentActivities activitiesList={telemetryLogs} />
      </section>

      {/* 4. Favorite Medical Personnel Management Grid Layout */}
      <section className="overflow-visible">
        <FavoriteDoctors
          doctorsList={savedDoctors}
          onBookAppointment={handleBookingAction}
        />
      </section>

      {/* 5. Complete System Scheduling History Ledger */}
      <section className="overflow-visible">
        <AppointmentHistory
          appointmentsList={historicalVisits}
          onCancelAppointment={handleCancellation}
          onViewPrescription={handlePrescriptionView}
        />
      </section>

      {/* 6. Complete Financial Platform Statement List */}
      <section className="overflow-visible">
        <TransactionHistory
          transactionsList={transactionLedger}
          onDownloadInvoice={handleInvoiceDownload}
        />
      </section>
    </div>
  );
}
