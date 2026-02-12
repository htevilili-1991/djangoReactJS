import { useState, useRef } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useDropzone } from "react-dropzone";
import type { Profile } from "../../api/client";

interface UserMetaCardProps {
  profile: Profile;
  onUpdate: (data: Partial<Profile>) => Promise<void>;
  onAvatarUpload: (file: File) => Promise<void>;
}

export default function UserMetaCard({
  profile,
  onUpdate,
  onAvatarUpload,
}: UserMetaCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const displayName =
    [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
    profile.username;
  const location = [profile.city_state, profile.country]
    .filter(Boolean)
    .join(", ") || "—";

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      await onAvatarUpload(file);
      closeModal();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
    maxFiles: 1,
    disabled: uploading,
  });

  const avatarUrl = profile.avatar_url || "/images/user/owner.jpg";

  const socialLinks = [
    { url: profile.facebook_url, label: "Facebook" },
    { url: profile.x_url, label: "X" },
    { url: profile.linkedin_url, label: "LinkedIn" },
    { url: profile.instagram_url, label: "Instagram" },
  ];

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="relative group">
              <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                onClick={openModal}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                title="Change photo"
              >
                <svg
                  className="fill-white w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              </button>
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {displayName}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile.bio || "—"}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {location}
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              {socialLinks.map(
                (link) =>
                  link.url && (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                    >
                      {link.label === "Facebook" && (
                        <svg className="fill-current w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11.6666 11.2503H13.7499L14.5833 7.91699H11.6666V6.25033C11.6666 5.39251 11.6666 4.58366 13.3333 4.58366H14.5833V1.78374C14.3118 1.7477 13.2858 1.66699 12.2023 1.66699C9.94025 1.66699 8.33325 3.04771 8.33325 5.58342V7.91699H5.83325V11.2503H8.33325V18.3337H11.6666V11.2503Z" />
                        </svg>
                      )}
                      {link.label === "X" && (
                        <svg className="fill-current w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M15.1708 1.875H17.9274L11.9049 8.75833L18.9899 18.125H13.4424L9.09742 12.4442L4.12578 18.125H1.36745L7.80912 10.7625L1.01245 1.875H6.70078L10.6283 7.0675L15.1708 1.875ZM14.2033 16.475H15.7308L5.87078 3.43833H4.23162L14.2033 16.475Z" />
                        </svg>
                      )}
                      {link.label === "LinkedIn" && (
                        <svg className="fill-current w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5.78381 4.16645C5.78351 4.84504 5.37181 5.45569 4.74286 5.71045C4.11391 5.96521 3.39331 5.81321 2.92083 5.32613C2.44836 4.83904 2.31837 4.11413 2.59216 3.49323C2.86596 2.87233 3.48886 2.47942 4.16715 2.49978C5.06804 2.52682 5.78422 3.26515 5.78381 4.16645ZM5.83381 7.06645H2.50048V17.4998H5.83381V7.06645ZM11.1005 7.06645H7.78381V17.4998H11.0672V12.0248C11.0672 8.97475 15.0422 8.69142 15.0422 12.0248V17.4998H18.3338V10.8914C18.3338 5.74978 12.4505 5.94145 11.0672 8.46642L11.1005 7.06645Z" />
                        </svg>
                      )}
                      {link.label === "Instagram" && (
                        <svg className="fill-current w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.0002 5.83308C7.69781 5.83308 5.83356 7.69935 5.83356 9.99972C5.83356 12.3021 7.69984 14.1664 10.0002 14.1664C12.3027 14.1664 14.1669 12.3001 14.1669 9.99972C14.1669 7.69732 12.3006 5.83308 10.0002 5.83308ZM10.0002 7.49974C11.381 7.49974 12.5002 8.61863 12.5002 9.99972C12.5002 11.3805 11.3813 12.4997 10.0002 12.4997C8.6195 12.4997 7.50023 11.3809 7.50023 9.99972C7.50023 8.61897 8.61908 7.49974 10.0002 7.49974Z" />
                        </svg>
                      )}
                    </a>
                  )
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-md m-4">
        <div className="relative w-full overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900">
          <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Change Profile Picture
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Upload a new photo. PNG, JPG, GIF or WebP. Max 5MB.
          </p>
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
              isDragActive
                ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
            } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <p className="text-gray-500">Uploading...</p>
            ) : (
              <>
                <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                  {isDragActive ? "Drop the image here" : "Drag & drop an image"}
                </p>
                <p className="text-sm text-gray-500">or click to browse</p>
              </>
            )}
          </div>
          {uploadError && (
            <p className="mt-2 text-sm text-red-500">{uploadError}</p>
          )}
          <div className="flex justify-end gap-3 mt-6">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
