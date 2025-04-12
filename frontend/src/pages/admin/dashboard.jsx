import ProductImageUpload from "../../components/admin/image-upload";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { fetchDashboardStats } from "../../store/admin/stats";
import { fetchAllUsersForAdmin } from "../../store/admin/users";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "../../store/common";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Users, Cat, ClipboardCheck, Loader2, Trash2, UserCog } from "lucide-react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { toast } from "sonner";

function AdminDashboard()
{
    const [imageFile, setImageFile] = useState(null);
    
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);

    const dispatch = useDispatch();

    const { featureImageList } = useSelector((state) => state.commonFeature);
    const { stats, isLoading: isLoadingStats, error: statsError } = useSelector((state) => state.adminStats);
    const { userList, isLoading: isLoadingUsers, error: usersError } = useSelector((state) => state.adminUsers);

 
    function handleUploadFeatureImage()
    {
        if (!uploadedImageUrl) return;
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
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
        dispatch(deleteFeatureImage(id)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages()); 
                 toast.success("Image deleted successfully.");
            } else {
                 toast.error("Failed to delete image. Please try again.");
            }
        });
    }

    useEffect(() => {
        dispatch(getFeatureImages());
        dispatch(fetchDashboardStats());
        dispatch(fetchAllUsersForAdmin());
    }, [dispatch]); 


    const renderStat = (value) => {
        if (isLoadingStats) return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
        if (statsError) return <span className="text-destructive text-sm">Error</span>;
        return value ?? 'N/A';
    };


    return (
        <div className="space-y-8 p-4 md:p-6"> 
            {/* Section 1: Quick Stats */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
                {/* Optional: Show general stats loading error message */}
                {statsError && !isLoadingStats && <p className="text-red-500 text-center mb-4">Could not load statistics: {statsError}</p>}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> {/* Responsive grid */}
                    {/* Stat Card: Total Pets */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pets Available</CardTitle>
                            <Cat className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{renderStat(stats?.totalPets)}</div>
                        </CardContent>
                    </Card>

                    {/* Stat Card: Pending Applications */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{renderStat(stats?.pendingApplications)}</div>
                        </CardContent>
                    </Card>

                    {/* Stat Card: Total Users */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{renderStat(stats?.totalUsers)}</div>
                        </CardContent>
                    </Card>

                    {/* Placeholder Card */}
                    <Card className="bg-muted/40 border-dashed flex flex-col justify-center">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">More Analytics</CardTitle>
                            <BarChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground">Detailed site analytics coming soon.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <hr/> {/* Visual separator */}

            {/* Section 2: User Management Summary */}
            <section>
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">User Overview</h2>
                     {/* Optional: Link to a full user management page - needs routing setup */}
                     {/* <Button variant="outline" size="sm" onClick={() => navigate('/admin/users')}>Manage All Users</Button> */}
                 </div>
                  <Card>
                     <CardHeader>
                        <CardTitle>Recent Users</CardTitle>
                        <CardDescription>A quick look at registered users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       {/* User List Loading State */}
                       {isLoadingUsers && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/></div>}
                       {usersError && !isLoadingUsers && <p className="text-red-500 text-center">Could not load users: {usersError}</p>}
                       {!isLoadingUsers && !usersError && userList.length === 0 && <p className="text-muted-foreground text-center">No users found.</p>}
                       {!isLoadingUsers && !usersError && userList.length > 0 && (
                           <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                              {/* Display first 10 users or fewer */}
                              {userList.slice(0, 10).map((user) => (
                                 <div key={user._id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                                      <div className="flex items-center gap-3">
                                          {/* Simple Avatar Fallback */}
                                          <Avatar className="h-8 w-8 text-xs">
                                             <AvatarFallback>{user.userName?.substring(0, 1).toUpperCase() || 'U'}</AvatarFallback>
                                          </Avatar>
                                          <div>
                                              <p className="text-sm font-medium leading-none">{user.userName}</p>
                                              <p className="text-xs text-muted-foreground">{user.email}</p>
                                          </div>
                                      </div>
                                       {/* Display Role */}
                                       <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className="text-xs">
                                          {user.role || 'User'}
                                       </Badge>
                                  </div>
                              ))}
                              {/* Indicator if more users exist */}
                              {userList.length > 10 && <p className="text-center text-xs text-muted-foreground pt-2">... and {userList.length - 10} more</p>}
                            </div>
                       )}
                    </CardContent>
                 </Card>
            </section>


            <hr/> {/* Visual separator */}

            {/* Section 3: Manage Feature Images */}
            <section>
                 <h2 className="text-2xl font-semibold mb-4">Manage Homepage Banner Images</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload Card */}
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
                        <h3 className="text-lg font-semibold mb-3">Current Banner Images</h3>
                         {/* Scrollable container for image list */}
                         <div className="grid grid-cols-1 gap-4 max-h-[350px] overflow-y-auto pr-2 border rounded-lg p-2 bg-muted/20">
                            {featureImageList && featureImageList.length > 0
                            ? featureImageList.map((featureImgItem) => (
                                <div key={featureImgItem._id} className="relative group border rounded-lg overflow-hidden shadow-sm bg-card">
                                    <img
                                        src={featureImgItem.image}
                                        className="w-full h-[150px] object-cover transition-transform duration-300 group-hover:scale-105"
                                        alt="Feature banner image"
                                    />
                                    {/* Overlay and Delete Button */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-2">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="opacity-90 hover:opacity-100 flex items-center"
                                            onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                                            aria-label="Delete image"
                                        >
                                            Delete
                                            <Trash2 className="h-4 w-4 ml-1"/>
                                        </Button>
                                    </div>
                                </div>
                                ))
                            : <p className="text-center text-muted-foreground py-6">No feature images uploaded yet.</p>}
                        </div>
                     </div>
                 </div>
            </section>
        </div>
    );
}

export default AdminDashboard;