import { useQuery } from '@tanstack/react-query';
import { INSTITUTE_DETAILS_QUERY_KEY } from '../../constant/constant';
import { getPublicInstituteProfileApi } from '../../store/apis';
import { Academy, PublicInstituteProfile } from '../../types/academy';

/**
 * Transforms the public institute profile API response to the UI-friendly Academy type
 */
const transformPublicProfileToAcademy = (profile: PublicInstituteProfile): Academy => {
  return {
    id: profile._id,
    name: profile.instituteName || 'Unknown Institute',
    logo: profile.logo || undefined,
    description: profile.description,
    location: {
      city: profile.address.city,
      state: profile.address.state,
      fullAddress: `${profile.address.street}\n${profile.address.city}, ${profile.address.state}${profile.address.pincode ? `, ${profile.address.pincode}` : ''}`,
    },
    website: profile.contact.website,
    phone: profile.contact.phone,
    email: profile.contact.email,
  };
};

/**
 * Hook to fetch public institute profile data
 */
export const usePublicInstituteProfile = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...INSTITUTE_DETAILS_QUERY_KEY, 'public', id],
    queryFn: async () => {
      const response = await getPublicInstituteProfileApi(id);
      return response.data.profile;
    },
    enabled: !!id && enabled,
    select: data => transformPublicProfileToAcademy(data),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
