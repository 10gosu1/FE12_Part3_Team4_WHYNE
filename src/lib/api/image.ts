import apiClient from "./api";

// ✅ 이미지 업로드 (서버에서 URL 반환)
export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post("/images/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.url; // 서버에서 반환한 이미지 URL
  } catch (error) {
    console.error("❌ 이미지 업로드 실패:", error);
    throw error;
  }
};
