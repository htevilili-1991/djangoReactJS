import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { useAuth } from "../context/AuthContext";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import {
  apiGetProfile,
  apiUpdateProfile,
  apiUploadAvatar,
  type Profile,
} from "../api/client";

export default function UserProfiles() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { refreshUser } = useAuth();

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetProfile();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (data: Partial<Profile>) => {
    const updated = await apiUpdateProfile(data);
    setProfile(updated);
  };

  const handleAvatarUpload = async (file: File) => {
    const updated = await apiUploadAvatar(file);
    setProfile(updated);
    await refreshUser(); // Update header avatar
  };

  if (loading) {
    return (
      <>
        <PageMeta
          title="Profile | Django + React Admin Dashboard"
          description="User profile page"
        />
        <PageBreadcrumb pageTitle="Profile" />
        <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-12 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageMeta
          title="Profile | Django + React Admin Dashboard"
          description="User profile page"
        />
        <PageBreadcrumb pageTitle="Profile" />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-red-500">{error}</p>
        </div>
      </>
    );
  }

  if (!profile) return null;

  return (
    <>
      <PageMeta
        title="Profile | Django + React Admin Dashboard"
        description="User profile page"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard
            profile={profile}
            onUpdate={handleUpdateProfile}
            onAvatarUpload={handleAvatarUpload}
          />
          <UserInfoCard profile={profile} onUpdate={handleUpdateProfile} />
          <UserAddressCard profile={profile} onUpdate={handleUpdateProfile} />
        </div>
      </div>
    </>
  );
}
