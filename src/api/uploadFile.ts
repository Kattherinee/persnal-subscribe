import { createAuthenticatedAdminRequest, createAuthenticateUserRequest } from './baseRequest';

export const GetUploadLinkPlugin = async () => {
  const request = createAuthenticatedAdminRequest();
  const response = await request.get('/AdminPlugin/GetUploadLinkPlugin');
  return response.data;
};
//Выкачиваем для админа
export const GetActivePluginLink = async () => {
  const request = createAuthenticatedAdminRequest();
  const response = await request.get('/AdminPlugin/GetActivePluginLink');
  return response.data;
};

export const ConfirmUploadPlugin = async ({ storageFileId }: { storageFileId: string }) => {
  const request = createAuthenticatedAdminRequest();
  const response = await request.get(
    `/AdminPlugin/ConfirmUploadPlugin?storageFileId=${storageFileId}`,
  );
  return response.data;
};
//Выкачиваем для юзера
export const GetPluginLink = async () => {
  const request = createAuthenticateUserRequest();
  const response = await request.get('/Plugin/GetPluginLink');
  return response.data;
};
