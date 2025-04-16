import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersForAdmin, deleteUser } from "../../store/admin/users";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Loader2, Search, Trash2 } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

function UserManagement() 
{
    const dispatch = useDispatch();
    const { userList, isLoading, error } = useSelector((state) => state.adminUsers);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchAllUsersForAdmin());
    }, [dispatch]);

    const filteredUsers = userList.filter(user => 
        user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            dispatch(deleteUser(userId)).then((result) => {
                if (result.payload?.success) {
                    toast.success("User deleted successfully");
                } else {
                    toast.error(result.payload?.message || "Failed to delete user");
                }
            });
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">User Management</h1>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
                            className="pl-8 w-[300px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                        <div className="flex justify-center p-4">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    )}
                    {error && (
                        <p className="text-red-500 text-center">Error: {error}</p>
                    )}
                    {!isLoading && !error && (
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50"
                                >
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback>
                                                {user.userName?.substring(0, 1).toUpperCase() || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user.userName}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                                            {user.role || 'User'}
                                        </Badge>
                                        <Button 
                                            variant="destructive" 
                                            size="sm"
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="flex items-center gap-2"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {filteredUsers.length === 0 && (
                                <p className="text-center text-muted-foreground py-4">
                                    No users found matching your search.
                                </p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default UserManagement; 