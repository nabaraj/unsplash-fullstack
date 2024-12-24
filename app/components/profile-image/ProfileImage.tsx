import { GenericUser } from "@/types/api-response";
import Image from "next/image";
import React from "react";
interface ProfileImageProps {
  // Add your props here
  profileDetails: GenericUser;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  profileDetails
}) => {
  // Add your component logic here
  return (
    <div className='flex items-center gap-2'>
      <div>
        <Image
          className='rounded-full'
          src={profileDetails.profile_image.small}
          width={50}
          height={50}
          alt={profileDetails.first_name}
        />
      </div>
      <div className='text-lg font-medium'>
        {profileDetails.first_name} {profileDetails.last_name}
      </div>
    </div>
  );
};
