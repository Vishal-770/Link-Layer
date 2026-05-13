import axios from "axios";

export const BaseURL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BaseURL || "",
  withCredentials: true,
});

export async function AddNewUrl(originalUrl: string, customSlug?: string) {
  const response = await api.post("/api/add-url", { originalUrl, customSlug });
  return response.data;
}

export async function GetAllUrl() {
  const response = await api.get("/api/get-url");
  return response.data.data;
}

export async function DeleteUrl(slug: string) {
  const response = await api.delete("/api/delete-url", {
    data: { slug: slug },
  });
  return response.data;
}
export async function UpdateUrlSlug(urlId: string, newSlug: string) {
  const response = await api.patch("/api/update-slug", { urlId, newSlug });
  return response.data;
}
