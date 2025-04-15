import ProductImageUpload from "../../../components/admin/image-upload";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { fetchDashboardStats } from "../../../store/admin/stats";
import { fetchAllUsersForAdmin } from "../../../store/admin/users";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "../../../store/common";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Users, Cat, ClipboardCheck, Loader2, Trash2, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function AdminDashboard()
{
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [statsLoadingState, setStatsLoadingState] = useState(false);
    const [statsData, setStatsData] = useState(null);

    const dispatch = useDispatch();

    const { featureImageList } = useSelector((state) => state.commonFeature);
    const { stats, isLoading: isLoadingStats, error: statsError } = useSelector((state) => state.adminStats);
    const { userList, isLoading: isLoadingUsers, error: usersError } = useSelector((state) => state.adminUsers);

    useEffect(() => {
        console.log("Fetching feature images and dashboard stats...");
        dispatch(getFeatureImages());
        fetchStats();
        dispatch(fetchAllUsersForAdmin());
    }, [dispatch]);

    const fetchStats = async () => {
        try {
            setStatsLoadingState(true);
            const result = await dispatch(fetchDashboardStats());
            if (result?.payload?.success) {
                setStatsData(result.payload.data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
            toast.error("Error fetching statistics");
        } finally {
            setStatsLoadingState(false);
        }
    };

    useEffect(() => {
        console.log("Feature Image List:", featureImageList);
        console.log("Dashboard Stats:", stats);
        console.log("User List:", userList);
    }, [featureImageList, stats, userList]);

    function handleUploadFeatureImage()
    {
        if (!uploadedImageUrl) return;
        console.log("Uploading image:", uploadedImageUrl);
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
            console.log("Upload response:", data);
            if (data?.payload?.success) {
                dispatch(getFeatureImages()); 
                setImageFile(null);
                setUploadedImageUrl("");
                toast.success("Image added successfully.");
            } else {
                toast.error("Failed to add image. Please try again.");
            }
        });
    }

    function handleDeleteFeatureImage(id)
    {
         if (!window.confirm("Are you sure you want to delete this banner image?")) {
            return;
         }
        console.log("Deleting image with ID:", id);
        dispatch(deleteFeatureImage(id)).then((data) => {
            console.log("Delete response:", data);
            if (data?.payload?.success) {
                dispatch(getFeatureImages()); 
                 toast.success("Image deleted successfully.");
            } else {
                 toast.error("Failed to delete image. Please try again.");
            }
        });
    }

    const renderStat = (value) => {
        return value ?? 'N/A';
    };

    return (
        <div className="dashboard-container"> 
            {/* Section 1: Quick Stats */}
            <section className="stats-section">
                <h2 className="section-header">Quick Stats</h2>
                <div className="stats-grid">
                    {/* Stat Card: Total Pets */}
                    <Card className="stats-card">
                        <CardHeader className="stats-card-header">
                            <CardTitle className="stats-card-title">Total Pets Available</CardTitle>
                            <Cat className="stats-card-icon" />
                        </CardHeader>
                        <CardContent>
                            <div className="stats-card-value">{stats?.totalPets || 0}</div>
                        </CardContent>
                    </Card>

                    {/* Stat Card: Pending Applications */}
                    <Card className="stats-card">
                        <CardHeader className="stats-card-header">
                            <CardTitle className="stats-card-title">Pending Applications</CardTitle>
                            <ClipboardCheck className="stats-card-icon" />
                        </CardHeader>
                        <CardContent>
                            <div className="stats-card-value">{stats?.pendingApplications || 0}</div>
                        </CardContent>
                    </Card>

                    {/* Stat Card: Total Users */}
                    <Card className="stats-card">
                        <CardHeader className="stats-card-header">
                            <CardTitle className="stats-card-title">Total Users</CardTitle>
                            <Users className="stats-card-icon" />
                        </CardHeader>
                        <CardContent>
                            <div className="stats-card-value">{stats?.totalUsers || 0}</div>
                        </CardContent>
                    </Card>

                    {/* Stat Card: Contact Messages */}
                    <Card className="stats-card">
                        <CardHeader className="stats-card-header">
                            <CardTitle className="stats-card-title">Contact Messages</CardTitle>
                            <Mail className="stats-card-icon" />
                        </CardHeader>
                        <CardContent>
                            <div className="stats-card-value">{stats?.totalContactMessages || 0}</div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <hr className="section-separator" />

            {/* Section 2: User Management Summary */}
            <section>
                 <div className="section-header-with-action">
                    <h2 className="section-header">User Overview</h2>
                    <Button variant="outline" size="sm" onClick={() => navigate('/admin/users')}>
                        Manage All Users
                    </Button>
                 </div>
                  <Card>
                     <CardHeader>
                        <CardTitle>Recent Users</CardTitle>
                        <CardDescription>A quick look at registered users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       {/* User List Loading State */}
                       {isLoadingUsers && <div className="loading-container"><Loader2 className="loading-spinner"/></div>}
                       {usersError && !isLoadingUsers && <p className="error-message">Could not load users: {usersError}</p>}
                       {!isLoadingUsers && !usersError && userList.length === 0 && <p className="empty-state-message">No users found.</p>}
                       {!isLoadingUsers && !usersError && userList.length > 0 && (
                           <div className="user-list-container custom-scrollbar">
                              {userList.slice(0, 10).map((user) => (
                                 <div key={user._id} className="user-list-item">
                                      <div className="user-info">
                                          <Avatar className="user-avatar">
                                             <AvatarFallback>{user.userName?.substring(0, 1).toUpperCase() || 'U'}</AvatarFallback>
                                          </Avatar>
                                          <div className="user-details">
                                              <p className="user-name">{user.userName}</p>
                                              <p className="user-email">{user.email}</p>
                                          </div>
                                      </div>
                                       <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className="user-role-badge">
                                          {user.role || 'User'}
                                       </Badge>
                                  </div>
                              ))}
                              {userList.length > 10 && <p className="more-items-indicator">... and {userList.length - 10} more</p>}
                            </div>
                       )}
                    </CardContent>
                 </Card>
            </section>

            <hr className="section-separator" />

            {/* Section 3: Manage Feature Images */}
            <section>
                 <h2 className="section-header">Manage Homepage Banner Images</h2>
                 <div className="feature-images-grid">
                    <div>
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-lg">Upload New Image</CardTitle>
                                <CardDescription>Select or paste an image URL to add to the banner.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ProductImageUpload
                                     imageFile={imageFile}
                                     setImageFile={setImageFile}
                                     uploadedImageUrl={uploadedImageUrl}
                                     setUploadedImageUrl={setUploadedImageUrl}
                                     setImageLoadingState={setImageLoadingState} 
                                     imageLoadingState={imageLoadingState}  
                                     isCustomStyling={true}
                                     isEditMode={false}
                                />
                                <Button
                                   onClick={handleUploadFeatureImage}
                                   className="w-full"
                                   disabled={!uploadedImageUrl || imageLoadingState}
                                >
                                   {imageLoadingState ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                                   {imageLoadingState ? "Processing..." : "Add Image to Banner"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                     {/* Existing Images List */}
                     <div>
                        <h3 className="section-header">Current Banner Images</h3>
                         {/* Scrollable container for image list */}
                         <div className="feature-images-list custom-scrollbar">
                            {featureImageList && featureImageList.length > 0
                            ? featureImageList.map((featureImgItem) => (
                                <div key={featureImgItem._id} className="feature-image-container">
                                    <img
                                        src={featureImgItem.image}
                                        className="feature-image"
                                        alt="Feature banner image"
                                    />
                                    {/* Overlay and Delete Button */}
                                    <div className="feature-image-overlay">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="delete-button"
                                            onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                                            aria-label="Delete image"
                                        >
                                            Delete
                                            <Trash2 className="delete-icon"/>
                                        </Button>
                                    </div>
                                </div>
                                ))
                            : <p className="empty-state-message">No feature images uploaded yet.</p>}
                        </div>
                     </div>
                 </div>
            </section>

            <hr className="section-separator" />

            {/* Section 4: About Page Management */}
            <section>
                <div className="section-header-with-action">
                    <h2 className="section-header">About Page Content</h2>
                    <Button variant="outline" size="sm" onClick={() => navigate('/admin/about')}>
                        Manage About Page
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>About Page Overview</CardTitle>
                        <CardDescription>Manage the content of your About page, including mission statement, goals, and services.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Click the button above to manage your About page content. You can update your organization's mission, goals, and the services you offer to potential pet adopters.
                        </p>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}

export default AdminDashboard;