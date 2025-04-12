import ProductImageUpload from "../../components/admin/image-upload";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { fetchDashboardStats } from "../../store/admin/stats";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "../../store/common"; // Adjust path if needed
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Users, Cat, ClipboardCheck, Loader2 } from "lucide-react"; // Added Loader2

function AdminDashboard()
{
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const { featureImageList } = useSelector((state) => state.commonFeature);
    const { stats, isLoading: isLoadingStats, error: statsError } = useSelector((state) => state.adminStats);

    function handleUploadFeatureImage()
    {
        if (!uploadedImageUrl) return;
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
                setImageFile(null);
                setUploadedImageUrl("");
            }
        });
    }

    function handleDeleteFeatureImage(id)
    {
         if (!window.confirm("Are you sure you want to delete this image?")) 
            return;
        dispatch(deleteFeatureImage(id)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
            }
        });
    }

    useEffect(() => {
        dispatch(getFeatureImages());
        dispatch(fetchDashboardStats());
    }, [dispatch]);

    const renderStat = (value) => {
        if (isLoadingStats) return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
        if (statsError) return <span className="text-destructive text-sm">Error</span>;
        return value ?? 'N/A';
    };


    return (
        <div className="space-y-8">

            {/* Section 1: Quick Stats */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
                {/* Optional: Show general stats loading error */}
                {statsError && !isLoadingStats && <p className="text-red-500 text-center mb-4">Could not load statistics: {statsError}</p>}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Stat Card 1 */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pets Available</CardTitle>
                            <Cat className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {/* Use renderStat helper */}
                            <div className="text-2xl font-bold">{renderStat(stats?.totalPets)}</div>
                        </CardContent>
                    </Card>

                    {/* Stat Card 2 */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {/* Use renderStat helper */}
                            <div className="text-2xl font-bold">{renderStat(stats?.pendingApplications)}</div>
                        </CardContent>
                    </Card>

                    {/* Stat Card 3 */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {/* Use renderStat helper */}
                            <div className="text-2xl font-bold">{renderStat(stats?.totalUsers)}</div>
                        </CardContent>
                    </Card>

                    {/* Placeholder for future complex stats */}
                    <Card className="md:col-span-2 lg:col-span-1 bg-muted/40 border-dashed">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Search/Click Analytics</CardTitle>
                            <BarChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground">Detailed analytics coming soon.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <hr/>

            <section>
                 <h2 className="text-2xl font-semibold mb-4">Manage Homepage Banner Images</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-lg">Upload New Image</CardTitle>
                                <CardDescription>Select an image file to add to the homepage banner.</CardDescription>
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
                                   {imageLoadingState ? "Uploading..." : "Add Image to Banner"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                     <div>
                        <h3 className="text-lg font-semibold mb-3">Current Banner Images</h3>
                         <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2">
                
                            {featureImageList && featureImageList.length > 0
                            ? featureImageList.map((featureImgItem) => (
                                <div key={featureImgItem._id} className="relative group border rounded-lg overflow-hidden shadow">
                                    <img
                                        src={featureImgItem.image}
                                        className="w-full h-[150px] object-cover transition-transform duration-300 group-hover:scale-105"
                                        alt="Feature banner image"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-2">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="opacity-90 hover:opacity-100"
                                            onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                                            aria-label="Delete image"
                                        >
                                            Delete
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