"use client";

import React, { useState, useEffect } from "react";
import { getAllDoctors } from "@/services/doctors/doctor.service";
import { toast } from "react-hot-toast";
import FindDoctorHeader from "./FindDoctorHeader";
import FindDoctorAside from "./FindDoctorAside";
import FindDoctorMain from "./FindDoctorMain";

export default function FindDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileAsideOpen, setIsMobileAsideOpen] = useState(false); // Modal drawer visibility switch

  const [filters, setFilters] = useState({
    searchTerm: "",
    specialization: "",
    minFee: "",
    maxFee: "",
    page: 1,
    limit: 4,
  });

  const [searchInput, setSearchInput] = useState("");

  const specializationsList = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Gynecology",
    "General Medicine",
    "Psychiatry",
  ];

  const fetchDoctorsList = async (currentFilters) => {
    try {
      setIsLoading(true);
      const cleanParams = {
        ...currentFilters,
        searchTerm: currentFilters.searchTerm.trim() || undefined,
        specialization: currentFilters.specialization || undefined,
        minFee:
          currentFilters.minFee !== ""
            ? Number(currentFilters.minFee)
            : undefined,
        maxFee:
          currentFilters.maxFee !== ""
            ? Number(currentFilters.maxFee)
            : undefined,
      };

      const res = await getAllDoctors(cleanParams);
      if (res?.success) {
        setDoctors(res.data || []);
        setPagination(res.pagination || { page: 1, totalPages: 1, total: 0 });
      } else {
        setDoctors([]);
      }
    } catch (error) {
      toast.error(error.message || "Failed to retrieve specialist directory.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorsList(filters);
    setIsMobileAsideOpen(false); // Smoothly snap close drawer whenever filter changes are requested
  }, [filters]);

  const handleApplyTextFilters = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, searchTerm: searchInput, page: 1 }));
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setFilters({
      searchTerm: "",
      specialization: "",
      minFee: "",
      maxFee: "",
      page: 1,
      limit: 4,
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 md:p-10 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto">
        <FindDoctorHeader
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleApplyTextFilters={handleApplyTextFilters}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setIsMobileAsideOpen={setIsMobileAsideOpen}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <FindDoctorAside
            filters={filters}
            setFilters={setFilters}
            handleClearFilters={handleClearFilters}
            specializationsList={specializationsList}
            isOpen={isMobileAsideOpen}
            setIsMobileAsideOpen={setIsMobileAsideOpen}
          />

          <div className="lg:col-span-3">
            <FindDoctorMain
              doctors={doctors}
              pagination={pagination}
              isLoading={isLoading}
              filters={filters}
              handlePageChange={handlePageChange}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
