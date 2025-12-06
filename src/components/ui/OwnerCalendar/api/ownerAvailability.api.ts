
export const API_BASE = "http://3.110.122.127:3000";

export const ownerAvailabilityAPI = {
    getVehicleAvailability: async (vehicleId: string, vechileType: string, startDate: string, endDate: string) => {
        const response = await fetch(
            `${API_BASE}/getVehicleAvailability?VechileId=${vehicleId}&vechileType=${vechileType}&startDate=${startDate}&endDate=${endDate}`
        );
        return response.json();
    },

    createNotAvailability: async (data: URLSearchParams) => {
        const response = await fetch(`${API_BASE}/createNotAvailability`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: data,
        });
        return {
            ok: response.ok,
            status: response.status,
            data: await response.json()
        };
    },

    updateNotAvailability: async (id: string, data: URLSearchParams) => {
        const response = await fetch(`${API_BASE}/updateNotAvailability/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: data,
        });
        return {
            ok: response.ok,
            status: response.status,
            data: await response.json()
        };
    },

    deleteNotAvailability: async (id: string) => {
        const response = await fetch(`${API_BASE}/deleteNotAvailability/${id}`, {
            method: "DELETE",
        });

        // Handle 204 No Content
        if (response.status === 204) {
            return { ok: true, status: 204, data: {} };
        }

        return {
            ok: response.ok,
            status: response.status,
            data: await response.json()
        };
    }
};
