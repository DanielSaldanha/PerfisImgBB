export const IMGBB_BASE_URL = 'https://i.ibb.co';

export const getImageUrl = (imageId: string): string => {
    if (imageId.startsWith('http')) {
        return imageId;
    }
    return `${IMGBB_BASE_URL}/${imageId}`;
};
//comentario