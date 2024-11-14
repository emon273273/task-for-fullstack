import { useEffect, useState } from "react";
import axios from "axios";

interface Content {
  id: number;
  user_id: number;
  image_path: string | null;
  notes: string;
  private_notes: string;
  created_at: string;
}

const Dashboard = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:3001/api/content", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setContent(response.data);
      setLoading(false);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Unauthorized access. Please login again.");
      } else {
        setError("Failed to fetch content");
      }
      setLoading(false);
      console.error("Error fetching content:", err);
    }
  };

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return null;
    return `http://localhost:3001/${imagePath}`;
  };

  return (
    <div className="p-6">
     <h1 className="mb-12 text-center text-8xl">Admin Dasboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Private Notes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {content.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.image_path ? (
                    <div className="relative group">
                      <img
                        src={getImageUrl(item.image_path)}
                        alt={`Content ${item.id}`}
                        className="h-20 w-20 object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "placeholder.png"; // Add a placeholder image
                          target.onerror = null; // Prevent infinite loop
                        }}
                      />
                      {/* Hover preview */}
                      <div className="hidden group-hover:block absolute z-50 left-full ml-2 top-0">
                        <img
                          src={getImageUrl(item.image_path)}
                          alt={`Content ${item.id} preview`}
                          className="max-w-none w-64 h-64 object-contain bg-white shadow-lg rounded"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-20 w-20 flex items-center justify-center bg-gray-200 rounded">
                      <span className="text-sm text-gray-500">No Image</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs overflow-hidden text-ellipsis">
                    {item.notes || "No notes"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs overflow-hidden text-ellipsis">
                    {item.private_notes || "No private notes"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {content.length === 0 && (
        <div className="text-center py-10 text-gray-500">No content found</div>
      )}
    </div>
  );
};

export default Dashboard;
