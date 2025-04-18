import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { fetchDashboardStats } from "../../store/admin/stats";
import { Loader2 } from "lucide-react";
import "./dashboard/dashboard.css";
import PieStatsChart from "../../components/ui/PieStatsChart";

function AdminStats() {
  const dispatch = useDispatch();
  const { stats, isLoading: isLoadingStats, error: statsError } = useSelector((state) => state.adminStats);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const renderDetailedStats = (title, data, type = "list") => {
    if (!data || !Array.isArray(data)) return null;

    return (
      <Card className="detailed-stats-card">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="detailed-stats-content">
            {data.map((item, index) => (
              <div key={index} className="detailed-stats-item">
                <span className="detailed-stats-label">{item._id || 'Unknown'}</span>
                <span className="detailed-stats-value">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoadingStats) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading statistics: {statsError}
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <section className="detailed-stats-section">
        <h2 className="section-header">Detailed Statistics</h2>
        <div className="detailed-stats-grid">
          {/* Pet Statistics */}
          <div className="detailed-stats-column">
            <h3 className="subsection-header">Pet Statistics</h3>
            <PieStatsChart 
              data={stats?.petStats?.byAge} 
              title="Pets by Age" 
            />
            <PieStatsChart 
              data={stats?.petStats?.byGender} 
              title="Pets by Gender" 
            />
          </div>

          {/* Adoption Statistics */}
          <div className="detailed-stats-column">
            <h3 className="subsection-header">Adoption Statistics</h3>
            {renderDetailedStats("Adoptions by Status", stats?.adoptionStats?.byStatus)}
            <Card className="recent-adoptions-card">
              <CardHeader>
                <CardTitle>Recent Adoptions</CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.adoptionStats?.recentAdoptions?.map((adoption, index) => (
                  <div key={index} className="recent-item">
                    <span>{adoption.petName}</span>
                    <span>{new Date(adoption.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* User Statistics */}
          <div className="detailed-stats-column">
            <h3 className="subsection-header">User Statistics</h3>
            {renderDetailedStats("Users by Role", stats?.userStats?.byRole)}
            <Card className="recent-users-card">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.userStats?.recentUsers?.map((user, index) => (
                  <div key={index} className="recent-item">
                    <span>{user.userName}</span>
                    <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Message Statistics */}
          <div className="detailed-stats-column">
            <h3 className="subsection-header">Message Statistics</h3>
            {renderDetailedStats("Messages by Status", stats?.messageStats?.byStatus)}
            <Card className="recent-messages-card">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.messageStats?.recentMessages?.map((message, index) => (
                  <div key={index} className="recent-item">
                    <span>{message.subject}</span>
                    <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminStats;
