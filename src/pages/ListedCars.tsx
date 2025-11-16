import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Loader2 } from "lucide-react";
import { useListedCarsStore } from "../store/listedCars.store";
import { useLocation } from "../store/location.context";
import apiService from "../services/api.service";
import AvailabilityDateTimeModal from "../components/AvailabilityDateTimeModal";
import BlackCar from "../assets/images/BlackCar.png";
import AutomaticLogo from "../assets/icons/AutomaticLogo.png";
import DriverLogo from "../assets/icons/DriverLogo.png";
import CarLogo from "../assets/icons/CarLogo.png";
import FilterLogo from "../assets/icons/FilterLogo.png";
import BikeLogo from "../assets/icons/BikeLogo.png";
import Petrol from "../assets/icons/Petrol.png";
import Location from "../assets/icons/Location.png";
import Search from "../assets/icons/Search.png";
import FilterCard from "../components/ui/FilterCard";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

interface Vehicle {
  name: string;
  price: string;
  transmission: string;
  fuel: string;
  seats: string;
  location: string;
  rating: string;
  available: boolean;
  image: string;
  id?: string;
}

interface ApiCar {
  _id: string;
  carName: string;
  carModel: string;
  carNumber: string;
  pricePerHour: number;
  transmission?: string;
  fuelType?: string;
  seatingCapacity?: number;
  location?: string;
  carImages?: string[];
  rating?: number;
  isAvailable?: boolean;
}

const initialCars: Vehicle[] = [
  
];

const ListedCars: React.FC = () => {
  const navigate = useNavigate();
  const { currentCity } = useLocation();
  const { cars: userListedCars, deleteCar } = useListedCarsStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  const [cars, setCars] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<"both" | "cars" | "bikes">("cars");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [deletingCarId, setDeletingCarId] = useState<string | null>(null);

  // Fetch cars from API
  useEffect(() => {
    const fetchMyCars = async () => {
      try {
        setLoading(true);
        setError("");

        // Get userId from environment or localStorage
        const userId = process.env.REACT_APP_USER_ID || localStorage.getItem('userId') || '68f32259cea8a9fa88029262';
        
        console.log('Fetching cars for userId:', userId);

        const response = await apiService.car.getMyVehicles(userId);
        console.log('My vehicles response:', response);

        // Handle different response structures
        const responseData = response.data || response;
        const carsArray = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData.data)
          ? responseData.data
          : responseData.cars || [];

        // Transform API response to Vehicle interface
        const formattedCars: Vehicle[] = carsArray.map((car: ApiCar) => ({
          id: car._id,
          name: `${car.carName} ${car.carModel}`,
          price: car.pricePerHour?.toString() || "0",
          transmission: car.transmission || "Manual",
          fuel: car.fuelType || "Petrol",
          seats: `${car.seatingCapacity || 5} Seaters`,
          location: car.location || currentCity,
          rating: car.rating?.toString() || "4.0",
          available: car.isAvailable !== false,
          image: car.carImages && car.carImages.length > 0 
            ? car.carImages[0] 
            : BlackCar,
        }));

        setCars(formattedCars);
      } catch (err: any) {
        console.error("Error fetching my cars:", err);
        setError(err.message || "Failed to fetch your cars. Please try again.");
      } finally {        
        setLoading(false);
      }
    };

    fetchMyCars();
  }, [currentCity]);

  // Combine default cars with user-listed cars and filter by location
  const allCars = useMemo(() => {
    const userCars: Vehicle[] = userListedCars.map((car) => ({
      name: `${car.carName} ${car.model}`,
      price: car.rentPrice,
      transmission: car.transmission,
      fuel: car.fuel,
      seats: "5 Seaters",
      location: `${car.city}, ${car.street}`,
      rating: car.rating.toString(),
      available: true,
      image: car.photos[0] || BlackCar,
      id: car.id,
    }));

    const allVehicles = [...userCars, ...cars];

    return allVehicles.filter((vehicle) => {
      const vehicleCity = vehicle.location?.split(",")[0].trim() || "";
      return vehicleCity.toLowerCase() === currentCity.toLowerCase();
    });
  }, [userListedCars, cars, currentCity]);

  // Show calendar when "Not Available"
  const handleStatusChange = (index: number, value: string) => {
    const updatedCars = [...cars];
    const vehicle = updatedCars[index];
    const isNowAvailable = value === "Available";

    vehicle.available = isNowAvailable;
    setCars(updatedCars);

    // If user selects "Not Available", open the calendar modal
    if (!isNowAvailable) {
      setSelectedVehicle(vehicle);
      setShowCalendarModal(true);
    }
  };

  // Edit vehicle handler
  const handleEdit = (vehicle: Vehicle) => {
    navigate("/Car-Details", {
      state: {
        carData: vehicle,
        openEditForm: true,
      },
    });
    setMenuOpenIndex(null);
  };

  const handleDeleteVehicle = async (vehicle: Vehicle) => {
    if (!vehicle.id) {
      alert('Cannot delete vehicle without ID');
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete ${vehicle.name}?`);
    if (!confirmDelete) {
      setMenuOpenIndex(null);
      return;
    }

    try {
      setDeletingCarId(vehicle.id);
      console.log('Deleting car with ID:', vehicle.id);

      // Call delete API
      await apiService.car.deleteCarById(vehicle.id);
      
      console.log('Car deleted successfully');

      // Remove from local state
      setCars(cars.filter((car) => car.id !== vehicle.id));
      
      // Also remove from store if it exists there
      if (vehicle.id) {
        deleteCar(vehicle.id);
      }

      alert(`${vehicle.name} has been deleted successfully.`);
    } catch (error: any) {
      console.error('Error deleting car:', error);
      alert(`Failed to delete ${vehicle.name}. ${error.message || 'Please try again.'}`);
    } finally {
      setDeletingCarId(null);
      setMenuOpenIndex(null);
    }
  };

  const handleMenuToggle = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const handleCarClick = (vehicle: Vehicle) => {
    navigate(`/vehicle-details/${vehicle.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const filteredCars = allCars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dropdownIcon =
    selectedList === "both" ? CarLogo :
    selectedList === "cars" ? CarLogo :
    BikeLogo;

  return (
    <>
      <div
        className={`p-4 sm:p-6 bg-gray-50 min-h-screen transition-all duration-300 ${
          showCalendarModal ? "blur-sm" : ""
        }`}
      >
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
          {/* Dropdown */}
          <div className="flex items-center w-full md:w-[300px] h-[50px] border rounded-lg px-3">
            <img src={dropdownIcon} alt="Dropdown Logo" className="w-[24px] h-[24px]" />
            <select
              className="flex-1 ml-2 border-none outline-none text-sm"
              value={selectedList}
              onChange={(e) => {
                const value = e.target.value as "both" | "cars" | "bikes";
                setSelectedList(value);

                // Navigate based on selection
                if (value === "both") {
                  navigate("/listed-vehicles");
                } else if (value === "bikes") {
                  navigate("/listed-bikes");
                }
           
              }}
            >
              <option value="both">Both </option>
              <option value="cars">Listed Cars</option>
              <option value="bikes">Listed Bikes</option>
            </select>
          </div>

          {/* Search + Filter */}
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px] h-[40px]">
              <img
                src={Search}
                alt="Search "
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full rounded-full border pl-12 pr-4 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white text-sm font-semibold px-4 py-1 rounded-md hover:opacity-100 transition-all"
            >
              <img src={FilterLogo} alt="Filter" className="w-6 h-6" />
              Filter
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
          Listed Cars in {currentCity}
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-60 text-gray-600">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>Loading your cars...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center text-red-500 mt-10">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        )}

        {/* Listed Cars */}
        {!loading && !error && (
          <div className="flex flex-col gap-6">
            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-2">
                  No cars listed yet
                </p>
                <p className="text-gray-400 text-sm">
                  Start listing your cars to earn money!
                </p>
                <button
                  onClick={() => navigate('/list-car')}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white rounded-lg hover:opacity-90"
                >
                  List Your First Car
                </button>
              </div>
            ) : (
            filteredCars.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row justify-between items-start bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition w-full max-w-full lg:max-w-[800px] min-h-[100px] overflow-hidden cursor-pointer"
                onClick={() => handleCarClick(item)}
              >
                {/* Car Image */}
                <div className="w-full sm:w-[270px] h-[150px] sm:h-[200px] overflow-hidden rounded-lg flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center sm:object-[85%_50%]"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 mt-3 lg:mt-0 lg:ml-4 w-full lg:w-auto">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
                    <span className="flex items-center justify-center w-[72px] h-[32px] text-gray-700 text-sm">
                      ⭐ {item.rating}
                    </span>
                  </div>

                  <p className="font-bold text-blue-600 text-base sm:text-lg mt-1">
                    ₹{item.price}/hr
                  </p>

                  <div className="flex flex-col gap-2 mt-2 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <img
                        src={AutomaticLogo}
                        alt="Transmission"
                        className="w-[25px] h-[25px]"
                      />
                      <span>{item.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={DriverLogo} alt="Seats" className="w-[25px] h-[25px]" />
                      <span>{item.seats}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={Petrol} alt="Fuel" className="w-[25px] h-[25px]" />
                      <span>{item.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={Location} alt="Location" className="w-[25px] h-[25px]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Menu and Status */}
                <div className="flex flex-col items-end w-full lg:w-auto mt-3 lg:mt-0">
                  <div className="flex items-center gap-2 justify-end">
                    <select
                      className={`text-sm font-medium px-2 py-1 rounded-lg border ${
                        item.available
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "bg-red-100 text-red-700 border-red-300"
                      }`}
                      value={item.available ? "Available" : "Not Available"}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusChange(index, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>

                    <div className="relative">
                      <button
                        className="p-2 rounded hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuToggle(index);
                        }}
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>

                      {menuOpenIndex === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-100 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(item);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            disabled={deletingCarId === item.id}
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteVehicle(item);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50 flex items-center gap-2"
                            disabled={deletingCarId === item.id}
                          >
                            {deletingCarId === item.id ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              'Delete'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        )}
      </div>

      {/* Calendar Modal */}
      {showCalendarModal && selectedVehicle && (
        <AvailabilityDateTimeModal
          isOpen={showCalendarModal}
          onClose={() => setShowCalendarModal(false)}
          onConfirm={(startDate, endDate, startTime, endTime) => {
            console.log(
              `Vehicle: ${selectedVehicle.name}, Unavailable from ${startDate} to ${endDate}, ${startTime}-${endTime}`
            );
            setShowCalendarModal(false);
          }}
        />
      )}

      {/* Filter Modal */}
      {showFilter && <FilterCard onApply={() => setShowFilter(false)} />}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && vehicleToDelete && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onConfirm={() => {
            if (vehicleToDelete.id) {
              deleteCar(vehicleToDelete.id);
            } else {
              setCars(cars.filter((car) => car.name !== vehicleToDelete.name));
            }
            setShowDeleteModal(false);
            setVehicleToDelete(null);
          }}
          onCancel={() => {
            setShowDeleteModal(false);
            setVehicleToDelete(null);
          }}
        />
      )}
    </>
  );
};

export default ListedCars;



